(function () {
  const TEXT_EXTENSIONS = [".md", ".markdown", ".txt"];
  const MOJIBAKE_MARKERS = ["娑?", "閹?", "缁?", "閿?", "閵?", "鈧?", "锟?"];

  const COMMON_LATEX_COMMANDS = [
    "alpha", "beta", "gamma", "delta", "epsilon", "varepsilon", "zeta", "eta",
    "theta", "vartheta", "iota", "kappa", "lambda", "mu", "nu", "xi", "pi",
    "varpi", "rho", "varrho", "sigma", "varsigma", "tau", "upsilon", "phi",
    "varphi", "chi", "psi", "omega", "Gamma", "Delta", "Theta", "Lambda",
    "Xi", "Pi", "Sigma", "Upsilon", "Phi", "Psi", "Omega",
    "frac", "dfrac", "tfrac", "binom", "sqrt", "sum", "prod", "coprod", "int",
    "iint", "iiint", "oint", "lim", "limsup", "liminf", "sin", "cos", "tan",
    "cot", "sec", "csc", "arcsin", "arccos", "arctan", "sinh", "cosh", "tanh",
    "ln", "log", "lg", "exp", "max", "min", "sup", "inf", "det", "dim", "gcd",
    "Pr", "partial", "nabla", "infty", "cdot", "times", "div", "pm", "mp",
    "circ", "bullet", "ast", "star", "leq", "geq", "neq", "approx", "sim",
    "simeq", "equiv", "propto", "parallel", "perp", "angle", "degree", "prime",
    "ldots", "cdots", "vdots", "ddots",
    "in", "not", "notin", "ni", "subset", "supset", "subseteq", "supseteq",
    "subsetneq", "supsetneq", "cup", "cap", "emptyset", "varnothing",
    "setminus", "forall", "exists", "nexists", "land", "lor", "lnot", "neg",
    "wedge", "vee", "oplus", "otimes", "to", "mapsto", "gets", "leftarrow",
    "rightarrow", "leftrightarrow", "Leftarrow", "Rightarrow", "Leftrightarrow",
    "longleftarrow", "longrightarrow", "longleftrightarrow", "Longleftarrow",
    "Longrightarrow", "Longleftrightarrow", "implies", "iff", "therefore",
    "because", "mid",
    "left", "right", "big", "Big", "bigg", "Bigg", "langle", "rangle",
    "lfloor", "rfloor", "lceil", "rceil", "overline", "underline", "hat",
    "bar", "vec", "dot", "ddot", "tilde", "mathbb", "mathbf", "mathrm",
    "mathit", "mathcal", "mathfrak", "operatorname", "text", "quad", "qquad",
    "begin", "end"
  ];

  const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const latexCommand = new RegExp(String.raw`\\(?:${COMMON_LATEX_COMMANDS.map(escapeRegExp).join("|")})\b`);
  const unicodeMathSymbol = /[∀∃∄∈∉∋⊂⊃⊆⊇∪∩∧∨¬⇒⇐⇔→←↔≤≥≠≈≡∞±∓×÷·√∑∏∫∂∇]/;
  const latexHint = new RegExp(`${latexCommand.source}|[=^_<>+\\-*/]|${unicodeMathSymbol.source}`);
  const simpleMathToken = /^[A-Za-z](?:_\{?[A-Za-z0-9]+\}?|\^\{?[A-Za-z0-9]+\}?)*$/;

  const state = {
    results: [],
    currentIndex: -1
  };

  function mojibakeScore(text) {
    return MOJIBAKE_MARKERS.reduce((score, marker) => score + countOccurrences(text, marker), 0);
  }

  function countOccurrences(text, marker) {
    return text.split(marker).length - 1;
  }

  function maybeFixMojibake(text) {
    return text;
  }

  function unwrapOuterMarkdownFence(text) {
    const stripped = text.trim();
    const match = stripped.match(/^```(?:markdown|md)?\s*\n([\s\S]*?)\n```$/i);
    return match ? `${match[1].trim()}\n` : text;
  }

  function unescapeMarkdown(text) {
    return text.replace(/\\([#*_`>{}.!+\-])/g, "$1");
  }

  function normalizeMathDelimiters(text) {
    let fixed = text
      .replace(/\\\[([\s\S]*?)\\\]/g, (_, formula) => `\n$$\n${formula.trim()}\n$$\n`)
      .replace(/^[ \t]*\[[ \t]*\r?\n([\s\S]*?)\r?\n[ \t]*\][ \t]*\r?$/gm, (block, formula) => {
        const trimmed = formula.trim();
        const repaired = trimmed
          .replace(/(?<!\\)\$([^$\n]*?)(?<!\\)\$/g, "($1)")
          .replace(/(?<!\\)\$/g, "");
        return trimmed ? `\n$$\n${repaired}\n$$\n` : block;
      })
      .replace(/\\\(([\s\S]*?)\\\)/g, (_, formula) => `$${formula.trim()}$`);

    const hadFinalNewline = fixed.endsWith("\n");
    const lines = fixed.split(/\r?\n/).map((line) => {
      const stripped = line.trim();
      if (
        stripped.startsWith("(") &&
        stripped.endsWith(")") &&
        stripped.length > 4 &&
        latexHint.test(stripped) &&
        !stripped.startsWith("(http")
      ) {
        const indent = line.slice(0, line.length - line.trimStart().length);
        return `${indent}$$${stripped.slice(1, -1).trim()}$$`;
      }
      return line;
    });

    fixed = lines.join("\n") + (hadFinalNewline ? "\n" : "");
    return normalizeInlineParenthesizedMath(fixed);
  }

  function isMathFragment(value) {
    const trimmed = value.trim();
    if (!trimmed || /^(https?:\/\/|www\.)/.test(trimmed)) return false;
    if (/\s/.test(trimmed) && !(latexCommand.test(trimmed) || unicodeMathSymbol.test(trimmed))) {
      return false;
    }
    if (latexHint.test(trimmed)) return true;
    return simpleMathToken.test(trimmed);
  }

  function findMatchingParen(text, start) {
    let depth = 0;
    let index = start;
    while (index < text.length) {
      const char = text[index];
      if (char === "\\") {
        index += 2;
        continue;
      }
      if (char === "(") depth += 1;
      if (char === ")") {
        depth -= 1;
        if (depth === 0) return index;
      }
      index += 1;
    }
    return -1;
  }

  function normalizeInlineParenthesizedMath(text) {
    const hadFinalNewline = text.endsWith("\n");
    let inDisplayMath = false;
    const fixedLines = text.split(/\r?\n/).map((line) => {
      const displayDelimiters = line.match(/\$\$/g);
      if (inDisplayMath || displayDelimiters) {
        if (displayDelimiters && displayDelimiters.length % 2 === 1) {
          inDisplayMath = !inDisplayMath;
        }
        return line;
      }

      let result = "";
      let index = 0;
      while (index < line.length) {
        if (line[index] !== "(") {
          result += line[index];
          index += 1;
          continue;
        }

        const previous = index > 0 ? line[index - 1] : "";
        if ((previous && "$]!".includes(previous)) || line.startsWith("(http", index)) {
          result += line[index];
          index += 1;
          continue;
        }

        const end = findMatchingParen(line, index);
        if (end === -1) {
          result += line[index];
          index += 1;
          continue;
        }

        const inner = line.slice(index + 1, end).trim();
        result += isMathFragment(inner) ? `$${inner}$` : line.slice(index, end + 1);
        index = end + 1;
      }
      return result;
    });
    return fixedLines.join("\n") + (hadFinalNewline ? "\n" : "");
  }

  function normalizeLists(text) {
    return text
      .replace(/\n(#{1,6}\s+)/g, "\n\n$1")
      .replace(/(?<!\n)\n([ \t]*[-*+]\s+)/g, "\n\n$1")
      .replace(/\n{3,}/g, "\n\n")
      .trim() + "\n";
  }

  function cleanMarkdown(text) {
    let fixed = maybeFixMojibake(text);
    fixed = unwrapOuterMarkdownFence(fixed);
    fixed = normalizeMathDelimiters(fixed);
    fixed = unescapeMarkdown(fixed);
    fixed = normalizeLists(fixed);
    return fixed;
  }

  function outputNameFor(name) {
    const dot = name.lastIndexOf(".");
    if (dot <= 0) return `${name}_typora.md`;
    return `${name.slice(0, dot)}_typora${name.slice(dot)}`;
  }

  async function readFileText(file) {
    const buffer = await file.arrayBuffer();
    const encodings = ["utf-8", "gb18030", "gbk"];
    let best = "";
    let bestScore = Number.POSITIVE_INFINITY;

    encodings.forEach((encoding) => {
      try {
        const text = new TextDecoder(encoding, { fatal: false }).decode(buffer);
        const score = mojibakeScore(text);
        if (score < bestScore) {
          best = text;
          bestScore = score;
        }
      } catch (_) {
        // Some browsers may not support every legacy encoding.
      }
    });

    return best || new TextDecoder("utf-8").decode(buffer);
  }

  function isSupportedFile(file) {
    const lower = file.name.toLowerCase();
    return TEXT_EXTENSIONS.some((extension) => lower.endsWith(extension));
  }

  function addResult(name, source, cleaned) {
    const result = {
      name,
      source,
      cleaned,
      size: new Blob([cleaned]).size
    };
    state.results.push(result);
    state.currentIndex = state.results.length - 1;
    renderResults();
  }

  function renderResults() {
    const resultList = document.querySelector("#result-list");
    const outputText = document.querySelector("#output-text");
    const fileCount = document.querySelector("#file-count");
    const hasResults = state.results.length > 0;

    fileCount.textContent = String(state.results.length);
    document.querySelector("#copy-current").disabled = !hasResults;
    document.querySelector("#download-current").disabled = !hasResults;
    document.querySelector("#download-all").disabled = !hasResults;

    if (!hasResults) {
      resultList.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon" aria-hidden="true">⌁</div>
          <p>转换后的文件会出现在这里</p>
        </div>
      `;
      outputText.value = "";
      return;
    }

    resultList.innerHTML = state.results.map((result, index) => `
      <button class="result-item ${index === state.currentIndex ? "active" : ""}" type="button" data-index="${index}">
        <span>${escapeHtml(result.name)}</span>
        <small>${formatBytes(result.size)}</small>
      </button>
    `).join("");

    outputText.value = state.results[state.currentIndex].cleaned;
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  function downloadText(name, text) {
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = name;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  async function processFiles(files) {
    const supported = Array.from(files).filter(isSupportedFile);
    for (const file of supported) {
      const source = await readFileText(file);
      addResult(outputNameFor(file.name), source, cleanMarkdown(source));
    }
  }

  function bindUi() {
    const fileInput = document.querySelector("#file-input");
    const dropZone = document.querySelector("#drop-zone");
    const sourceText = document.querySelector("#source-text");

    fileInput.addEventListener("change", (event) => processFiles(event.target.files));
    dropZone.addEventListener("click", () => fileInput.click());
    dropZone.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") fileInput.click();
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropZone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropZone.classList.add("dragging");
      });
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropZone.addEventListener(eventName, () => dropZone.classList.remove("dragging"));
    });

    dropZone.addEventListener("drop", (event) => {
      event.preventDefault();
      processFiles(event.dataTransfer.files);
    });

    document.querySelector("#convert-text").addEventListener("click", () => {
      if (!sourceText.value.trim()) return;
      addResult("pasted_typora.md", sourceText.value, cleanMarkdown(sourceText.value));
    });

    document.querySelector("#clear-all").addEventListener("click", () => {
      state.results = [];
      state.currentIndex = -1;
      sourceText.value = "";
      fileInput.value = "";
      renderResults();
    });

    document.querySelector("#result-list").addEventListener("click", (event) => {
      const item = event.target.closest(".result-item");
      if (!item) return;
      state.currentIndex = Number(item.dataset.index);
      renderResults();
    });

    document.querySelector("#copy-current").addEventListener("click", async () => {
      if (state.currentIndex < 0) return;
      await navigator.clipboard.writeText(state.results[state.currentIndex].cleaned);
    });

    document.querySelector("#download-current").addEventListener("click", () => {
      if (state.currentIndex < 0) return;
      const result = state.results[state.currentIndex];
      downloadText(result.name, result.cleaned);
    });

    document.querySelector("#download-all").addEventListener("click", () => {
      state.results.forEach((result) => downloadText(result.name, result.cleaned));
    });
  }

  if (typeof document !== "undefined") {
    bindUi();
    renderResults();
  }

  if (typeof module !== "undefined") {
    module.exports = { cleanMarkdown, outputNameFor };
  }
})();
