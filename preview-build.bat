@echo off
REM ============================================================
REM  Apercu de la VERSION DE PRODUCTION (le site final).
REM  Construit le site (npm run build) puis le sert localement.
REM  Utilise ceci pour une verification finale avant de push.
REM  Pour le travail au quotidien, prefere start-dev.bat.
REM ============================================================
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  [!] Node.js est introuvable. Installe-le depuis https://nodejs.org
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo  Installation des dependances...
  call npm install
)

echo.
echo  Construction du site...
call npm run build

echo.
echo  Demarrage de l'apercu de production...
call npm run preview

pause
