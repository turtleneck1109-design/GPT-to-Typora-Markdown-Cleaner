@echo off
chcp 65001 >nul
setlocal

set "SCRIPT=%~dp0gpt_to_typora.py"

if not exist "%SCRIPT%" (
    echo Cannot find gpt_to_typora.py.
    echo Please keep this .bat file in the same folder as gpt_to_typora.py.
    echo.
    pause
    exit /b 1
)

if "%~1"=="" (
    echo Drag one or more .md / .txt files onto this .bat file.
    echo.
    echo Output files will be created next to the original files,
    echo with _typora added before the extension.
    echo.
    pause
    exit /b 0
)

echo GPT to Typora Markdown Cleaner
echo.

:loop
if "%~1"=="" goto done
echo Processing: %~1
python "%SCRIPT%" "%~1"
if errorlevel 1 (
    echo Failed: %~1
) else (
    echo Done.
)
echo.
shift
goto loop

:done
echo All finished.
echo.
pause
