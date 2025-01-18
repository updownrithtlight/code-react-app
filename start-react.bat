@echo off
set "project_path=C:\noneSystem\bj\code-react-app"

:menu
echo ===================================
echo        React Project Control Menu
echo ===================================
echo [1] Start React Project
echo [2] Build React Project
echo [3] Exit
echo ===================================
set /p choice=Enter your choice (1-3): 

if "%choice%"=="1" (
    cd /d "%project_path%"
    echo Starting React Project...
    echo To stop the project, use Ctrl + C in the terminal.
    cmd /k "npm start"
    goto menu
) else if "%choice%"=="2" (
    cd /d "%project_path%"
    echo Building React Project...
    npm run build
    echo Build process completed.
    pause
    goto menu
) else if "%choice%"=="3" (
    echo Exiting...
    exit
) else (
    echo Invalid choice, please try again.
    goto menu
)
