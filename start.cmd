@echo off
setlocal
cd /d "%~dp0"

set "SHOPPING_NODE="
for /f "delims=" %%N in ('where node.exe 2^>nul') do if not defined SHOPPING_NODE set "SHOPPING_NODE=%%N"
if not defined SHOPPING_NODE (
  for /d %%D in ("%LOCALAPPDATA%\Codex\runtimes\node-*-win-x64") do (
    if exist "%%D\node.exe" set "SHOPPING_NODE=%%D\node.exe"
  )
)

if not defined SHOPPING_NODE (
  echo Install Node.js 22.12+ from https://nodejs.org and try again.
  pause
  exit /b 1
)

for %%N in ("%SHOPPING_NODE%") do set "PATH=%%~dpN;%PATH%"
if not exist "node_modules\vite\bin\vite.js" (
  for %%N in ("%SHOPPING_NODE%") do "%SHOPPING_NODE%" "%%~dpNnode_modules\npm\bin\npm-cli.js" install
  if errorlevel 1 (
    pause
    exit /b 1
  )
)

"%SHOPPING_NODE%" "node_modules\vite\bin\vite.js" --host 127.0.0.1 --open
