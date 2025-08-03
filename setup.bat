@echo off
echo Installing requirements for Ekko...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed or not in PATH
    pause
    exit /b 1
)

echo Found Node.js and npm...
echo.

REM Install dependencies
echo Installing npm dependencies...
npm install

if %errorlevel% neq 0 (
    echo Error: Failed to install npm dependencies
    pause
    exit /b 1
)

echo.
echo Setup completed successfully!
echo You can now run the application using run.bat
echo.
pause
