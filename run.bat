@echo off
echo Starting Ekko Website Builder...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Error: Dependencies not installed
    echo Please run setup.bat first to install requirements
    pause
    exit /b 1
)

REM Check if Node.js is available
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Starting development server...
echo.
echo The application will open in your default browser
echo Press Ctrl+C to stop the server
echo.

REM Start the development server
npm start

if %errorlevel% neq 0 (
    echo.
    echo Error: Failed to start the application
    echo Make sure all dependencies are installed by running setup.bat
    pause
    exit /b 1
)

pause
