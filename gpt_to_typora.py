#!/usr/bin/env python3
"""Clean GPT-copied Markdown so Typora renders it more reliably.

Typical fixes:
- repair common mojibake caused by UTF-8/GBK copy or terminal display issues
- unwrap a whole-document Markdown code fence
- unescape Markdown symbols that GPT sometimes protects with backslashes
- convert LaTeX delimiters \( \) and \[ \] to Typora-friendly $ / $$
- convert standalone parenthesized LaTeX-like lines, e.g. (x=A\cos t), to $$...$$
"""

from __future__ import annotations

import argparse
import re
import shutil
import sys
from pathlib import Path


TEXT_EXTENSIONS = {".md", ".markdown", ".txt"}

MOJIBAKE_MARKERS = (
    "涓",
    "鎸",
    "绠",
    "锛",
    "銆",
    "€",
    "�",
)

LATEX_COMMAND = re.compile(
    r"\\(?:frac|sum|int|sqrt|cos|sin|tan|cot|sec|csc|ln|log|exp|"
    r"omega|varphi|phi|pi|alpha|beta|gamma|delta|Delta|theta|lambda|mu|nu|"
    r"rho|sigma|tau|varepsilon|zeta|eta|xi|psi|Omega|"
    r"land|lor|lnot|neg|wedge|vee|to|rightarrow|leftarrow|leftrightarrow|"
    r"Rightarrow|Leftarrow|Leftrightarrow|implies|iff|forall|exists)\b"
)

LATEX_HINT = re.compile(
    LATEX_COMMAND.pattern
    + r"|[=^_<>+\-*/]|\\left|\\right|\\dot|\\ddot"
)

SIMPLE_MATH_TOKEN = re.compile(r"[A-Za-z](?:_\{?[A-Za-z0-9]+\}?|\^\{?[A-Za-z0-9]+\}?)*$")


def read_text_safely(path: Path) -> str:
    data = path.read_bytes()
    for encoding in ("utf-8-sig", "utf-8", "gb18030", "gbk", "cp936"):
        try:
            return data.decode(encoding)
        except UnicodeDecodeError:
            continue
    return data.decode("utf-8", errors="replace")


def mojibake_score(text: str) -> int:
    return sum(text.count(marker) for marker in MOJIBAKE_MARKERS)


def maybe_fix_mojibake(text: str) -> str:
    """Try common round trips and keep the version that looks least broken."""
    candidates = [text]

    round_trips = (
        ("gb18030", "utf-8"),
        ("gbk", "utf-8"),
        ("cp936", "utf-8"),
        ("latin1", "utf-8"),
    )
    for source_encoding, target_encoding in round_trips:
        try:
            candidates.append(text.encode(source_encoding).decode(target_encoding))
        except UnicodeError:
            pass

    return min(candidates, key=mojibake_score)


def unwrap_outer_markdown_fence(text: str) -> str:
    stripped = text.strip()
    match = re.fullmatch(r"```(?:markdown|md)?\s*\n(.*?)\n```", stripped, flags=re.S | re.I)
    if not match:
        return text
    return match.group(1).strip() + "\n"


def unescape_markdown(text: str) -> str:
    # GPT/browser copy sometimes turns valid Markdown syntax into literal text.
    # Keep \(...\) and \[...\] for the math normalizer.
    return re.sub(r"\\([#*_`>{}.!+-])", r"\1", text)


def normalize_math_delimiters(text: str) -> str:
    text = re.sub(r"\\\[(.*?)\\\]", lambda m: "\n$$\n" + m.group(1).strip() + "\n$$\n", text, flags=re.S)
    text = re.sub(r"\\\((.*?)\\\)", lambda m: "$" + m.group(1).strip() + "$", text, flags=re.S)

    lines = text.splitlines()
    fixed_lines: list[str] = []
    for line in lines:
        stripped = line.strip()
        if (
            stripped.startswith("(")
            and stripped.endswith(")")
            and len(stripped) > 4
            and LATEX_HINT.search(stripped)
            and not stripped.startswith("(http")
        ):
            indent = line[: len(line) - len(line.lstrip())]
            formula = stripped[1:-1].strip()
            fixed_lines.append(f"{indent}$${formula}$$")
        else:
            fixed_lines.append(line)
    text = "\n".join(fixed_lines) + ("\n" if text.endswith("\n") else "")
    return normalize_inline_parenthesized_math(text)


def is_math_fragment(value: str) -> bool:
    value = value.strip()
    if not value or value.startswith(("http://", "https://", "www.")):
        return False
    if any(char.isspace() for char in value) and not LATEX_COMMAND.search(value):
        return False
    if LATEX_HINT.search(value):
        return True
    return bool(SIMPLE_MATH_TOKEN.fullmatch(value))


def find_matching_paren(text: str, start: int) -> int:
    depth = 0
    index = start
    while index < len(text):
        char = text[index]
        if char == "\\":
            index += 2
            continue
        if char == "(":
            depth += 1
        elif char == ")":
            depth -= 1
            if depth == 0:
                return index
        index += 1
    return -1


def normalize_inline_parenthesized_math(text: str) -> str:
    fixed_lines: list[str] = []
    for line in text.splitlines():
        if "$$" in line:
            fixed_lines.append(line)
            continue

        result: list[str] = []
        index = 0
        while index < len(line):
            if line[index] != "(":
                result.append(line[index])
                index += 1
                continue

            previous = line[index - 1] if index > 0 else ""
            if (previous and previous in "$]!") or line.startswith("(http", index):
                result.append(line[index])
                index += 1
                continue

            end = find_matching_paren(line, index)
            if end == -1:
                result.append(line[index])
                index += 1
                continue

            inner = line[index + 1 : end].strip()
            if is_math_fragment(inner):
                result.append(f"${inner}$")
            else:
                result.append(line[index : end + 1])
            index = end + 1
        fixed_lines.append("".join(result))
    return "\n".join(fixed_lines) + ("\n" if text.endswith("\n") else "")


def normalize_lists(text: str) -> str:
    # Put blank lines around headings and lists so Typora parses block structure cleanly.
    text = re.sub(r"\n(#{1,6}\s+)", r"\n\n\1", text)
    text = re.sub(r"(?<!\n)\n([ \t]*[-*+]\s+)", r"\n\n\1", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip() + "\n"


def clean_markdown(text: str) -> str:
    text = maybe_fix_mojibake(text)
    text = unwrap_outer_markdown_fence(text)
    text = normalize_math_delimiters(text)
    text = unescape_markdown(text)
    text = normalize_lists(text)
    return text


def output_path_for(path: Path) -> Path:
    return path.with_name(f"{path.stem}_typora{path.suffix or '.md'}")


def iter_input_files(paths: list[Path]) -> list[Path]:
    files: list[Path] = []
    for path in paths:
        if path.is_dir():
            files.extend(
                child
                for child in sorted(path.iterdir())
                if child.is_file()
                and child.suffix.lower() in TEXT_EXTENSIONS
                and not child.stem.endswith("_typora")
            )
        else:
            files.append(path)
    return files


def process_file(path: Path, in_place: bool) -> Path:
    original = read_text_safely(path)
    cleaned = clean_markdown(original)

    if in_place:
        backup = path.with_name(f"{path.name}.bak")
        if not backup.exists():
            shutil.copy2(path, backup)
        target = path
    else:
        target = output_path_for(path)

    with target.open("w", encoding="utf-8", newline="\n") as file:
        file.write(cleaned)
    return target


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Clean GPT-copied Markdown for Typora.")
    parser.add_argument("files", nargs="*", type=Path, help="Markdown/text files or folders to clean.")
    parser.add_argument("--in-place", action="store_true", help="Overwrite files after creating .bak backups.")
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    if not args.files:
        sys.stdout.write(clean_markdown(sys.stdin.read()))
        return 0

    for path in iter_input_files(args.files):
        if not path.exists():
            print(f"Not found: {path}", file=sys.stderr)
            return 1
        if path.suffix.lower() not in TEXT_EXTENSIONS:
            print(f"Skipped unsupported file: {path}")
            continue
        target = process_file(path, args.in_place)
        print(f"Cleaned: {path} -> {target}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
