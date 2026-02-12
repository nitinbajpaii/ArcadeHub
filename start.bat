@echo off
echo ========================================
echo   Starting ArcadeHub Gaming Platform
echo ========================================
echo.

echo [1/2] Starting Backend Server...
start cmd /k "cd backend && npm start"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend App...
start cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo   ArcadeHub is starting!
echo   Backend: http://localhost:5000
echo   Frontend: http://localhost:3000
echo ========================================
echo.
echo Press any key to exit this window...
pause >nul
