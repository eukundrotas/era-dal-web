# ERA DAL — Автоустановка и запуск (PowerShell)
# Запустите: правая кнопка на этом файле -> "Выполнить с помощью PowerShell"

$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "  ERA DAL — Автозапуск" -ForegroundColor Magenta
Write-Host "  ─────────────────────" -ForegroundColor DarkGray
Write-Host ""

# ── Найти ZIP ─────────────────────────────────────────────────────────────────
$searchPaths = @(
    "$env:USERPROFILE\Downloads",
    "$env:USERPROFILE\Desktop",
    "$env:USERPROFILE\Documents",
    "C:\Users\Public\Downloads"
)

$zipFile = $null
foreach ($path in $searchPaths) {
    $found = Get-ChildItem -Path $path -Filter "era-dal-v*.zip" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) { $zipFile = $found.FullName; break }
}

if (-not $zipFile) {
    Write-Host "  [!] Файл era-dal-v*.zip не найден в:" -ForegroundColor Yellow
    foreach ($p in $searchPaths) { Write-Host "      $p" }
    Write-Host ""
    Write-Host "  Скопируйте era-dal-v1.0.0.zip в папку Загрузки и запустите снова." -ForegroundColor Cyan
    Read-Host "  Нажмите Enter для выхода"
    exit
}

Write-Host "  [OK] Найден: $zipFile" -ForegroundColor Green

# ── Распаковать ───────────────────────────────────────────────────────────────
$destDir = Split-Path $zipFile -Parent
$appDir  = Join-Path $destDir "era-dal-v1.0.0"

if (-not (Test-Path $appDir)) {
    Write-Host "  [>>] Распаковка..." -ForegroundColor Yellow
    Expand-Archive -Path $zipFile -DestinationPath $destDir -Force
    Write-Host "  [OK] Распаковано в: $appDir" -ForegroundColor Green
} else {
    Write-Host "  [OK] Папка уже есть: $appDir" -ForegroundColor Green
}

Set-Location $appDir

# ── Проверить Node.js ─────────────────────────────────────────────────────────
$nodeVer = & node -v 2>&1
if ($LASTEXITCODE -ne 0 -or $nodeVer -like "*not recognized*") {
    Write-Host ""
    Write-Host "  [!] Node.js НЕ установлен!" -ForegroundColor Red
    Write-Host "  Скачайте с https://nodejs.org (кнопка LTS) и установите." -ForegroundColor Cyan
    Write-Host "  Затем запустите этот скрипт снова." -ForegroundColor Cyan
    Start-Process "https://nodejs.org"
    Read-Host "  Нажмите Enter для выхода"
    exit
}
Write-Host "  [OK] Node.js $nodeVer" -ForegroundColor Green

# ── npm install ───────────────────────────────────────────────────────────────
if (-not (Test-Path "node_modules")) {
    Write-Host "  [>>] Установка пакетов (1-2 минуты)..." -ForegroundColor Yellow
    & npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  [!] npm install не удался. Проверьте интернет-соединение." -ForegroundColor Red
        Read-Host "  Нажмите Enter для выхода"
        exit
    }
    Write-Host "  [OK] Пакеты установлены" -ForegroundColor Green
} else {
    Write-Host "  [OK] Пакеты уже установлены" -ForegroundColor Green
}

# ── Build ─────────────────────────────────────────────────────────────────────
Write-Host "  [>>] Сборка..." -ForegroundColor Yellow
& npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "  [!] Сборка не удалась. Смотрите ошибки выше." -ForegroundColor Red
    Read-Host "  Нажмите Enter для выхода"
    exit
}
Write-Host "  [OK] Сборка завершена" -ForegroundColor Green

# ── Инициализация базы данных ─────────────────────────────────────────────────
Write-Host "  [>>] Инициализация базы данных..." -ForegroundColor Yellow
& npx wrangler d1 execute era-dal --local --file=migrations/001_core.sql 2>&1 | Out-Null
Write-Host "  [OK] База данных готова" -ForegroundColor Green

# ── Запуск ────────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "  ═══════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host "    ERA DAL запускается..." -ForegroundColor Green
Write-Host "    Адрес: http://localhost:8788" -ForegroundColor Cyan
Write-Host "  ═══════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host ""

# Открыть браузер через 5 секунд
Start-Job -ScriptBlock {
    Start-Sleep 6
    Start-Process "http://localhost:8788/meta"
} | Out-Null

& npx wrangler pages dev --port 8788
