@echo off
setlocal
cd /d "%~dp0"
for /d %%N in ("%LOCALAPPDATA%\Codex\runtimes\node-*-win-x64") do set "PATH=%%N;%PATH%"
node node_modules\vite\bin\vite.js --host 127.0.0.1 --open
