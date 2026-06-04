@echo off
chcp 65001 >nul
cls

echo.
echo  ████████████████████████████████████████████████
echo  ██                                            ██
echo  ██    ERA DAL — Digital AI Layer              ██
echo  ██    Meta-Orchestrator Platform              ██
echo  ██                                            ██
echo  ████████████████████████████████████████████████
echo.

:: ── Check Node.js ───────────────────────────────────────────────────────────
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Node.js not found.
    echo  Install from https://nodejs.org ^(v18+^)
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VER=%%i
echo  [OK] Node.js %NODE_VER%

:: ── Install dependencies ────────────────────────────────────────────────────
if not exist "node_modules\" (
    echo  [>>] Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo  [ERROR] npm install failed
        pause
        exit /b 1
    )
    echo  [OK] Dependencies installed
) else (
    echo  [OK] Dependencies ready
)

:: ── Build ────────────────────────────────────────────────────────────────────
echo  [>>] Building application...
call npm run build
if %errorlevel% neq 0 (
    echo  [ERROR] Build failed
    pause
    exit /b 1
)
echo  [OK] Build complete

:: ── Initialize D1 database ──────────────────────────────────────────────────
echo  [>>] Initializing database...
call npx wrangler d1 execute era-dal --local --file=migrations/001_core.sql 2>nul
echo  [OK] Database ready ^(or already initialized^)

:: ── Launch ──────────────────────────────────────────────────────────────────
echo.
echo  ════════════════════════════════════════════════
echo    ERA DAL is starting...
echo    Open browser: http://localhost:8788
echo  ════════════════════════════════════════════════
echo.
echo  Press Ctrl+C to stop
echo.

call npx wrangler pages dev --port 8788
pause
