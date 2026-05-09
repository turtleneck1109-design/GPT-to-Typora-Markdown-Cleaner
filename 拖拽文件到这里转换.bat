@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion

set "SCRIPT=%~dp0gpt_to_typora.py"
set "OUT_COUNT=0"

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
    call :collect_outputs "%~1"
)
echo.
shift
goto loop

:done
echo All finished.
echo.
if "%OUT_COUNT%"=="0" (
    echo No converted file was recorded.
    echo.
    pause
    exit /b 0
)

echo Converted file(s):
for /l %%I in (1,1,%OUT_COUNT%) do echo   %%I. !OUT_%%I!
echo.
choice /c OC /n /m "Open converted file(s) now? [O] Open  [C] Close: "
if errorlevel 2 exit /b 0

for /l %%I in (1,1,%OUT_COUNT%) do (
    if exist "!OUT_%%I!" start "" "!OUT_%%I!"
)
exit /b 0

:collect_outputs
set "INPUT=%~1"
if exist "%INPUT%\" (
    for %%F in ("%INPUT%\*.md" "%INPUT%\*.markdown" "%INPUT%\*.txt") do (
        if exist "%%~fF" (
            set "STEM=%%~nF"
            if /i not "!STEM:~-7!"=="_typora" call :remember_output "%%~dpnF_typora%%~xF"
        )
    )
) else (
    call :remember_output "%~dpn1_typora%~x1"
)
exit /b 0

:remember_output
if exist "%~1" (
    set /a OUT_COUNT+=1
    set "OUT_!OUT_COUNT!=%~1"
)
exit /b 0
