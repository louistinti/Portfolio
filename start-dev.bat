@echo off
REM ============================================================
REM  Apercu local du portfolio (serveur de developpement Vite)
REM  Double-clique sur ce fichier pour lancer le site en local.
REM  Les changements s'affichent en direct (hot reload).
REM  Ferme cette fenetre (ou Ctrl+C) pour arreter le serveur.
REM ============================================================
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  [!] Node.js est introuvable.
  echo      Installe-le depuis https://nodejs.org puis relance ce fichier.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo.
  echo  Premiere utilisation : installation des dependances...
  echo.
  call npm install
)

echo.
echo  Demarrage du serveur local... (le navigateur va s'ouvrir sur http://localhost:5173)
echo  Laisse cette fenetre ouverte tant que tu travailles.
echo.
call npm run dev

pause
