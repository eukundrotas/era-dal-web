# ERA DAL — Windows Installer
# Creates Desktop shortcut with custom icon.
# Run: right-click -> "Run with PowerShell"

$ErrorActionPreference = "Stop"

function Write-Step($msg, $color = "Cyan") {
    Write-Host "  $msg" -ForegroundColor $color
}

Write-Host ""
Write-Host "  ERA DAL — Установка на Windows" -ForegroundColor Magenta
Write-Host "  ────────────────────────────────" -ForegroundColor DarkGray
Write-Host ""

# ── Locate app folder ─────────────────────────────────────────────────────────
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $scriptDir) { $scriptDir = Get-Location }
Write-Step "Папка приложения: $scriptDir" "Green"

# ── Check Node.js ─────────────────────────────────────────────────────────────
try {
    $nodeVer = & node -v 2>&1
    Write-Step "Node.js $nodeVer" "Green"
} catch {
    Write-Step "Node.js не найден! Скачайте с https://nodejs.org" "Red"
    Start-Process "https://nodejs.org"
    Read-Host "  Установите Node.js и запустите этот скрипт снова. Enter для выхода"
    exit 1
}

# ── npm install ───────────────────────────────────────────────────────────────
if (-not (Test-Path (Join-Path $scriptDir "node_modules"))) {
    Write-Step "Установка пакетов (1-2 минуты)..." "Yellow"
    Push-Location $scriptDir
    & npm install
    Pop-Location
}
Write-Step "Пакеты готовы" "Green"

# ── Build ─────────────────────────────────────────────────────────────────────
Write-Step "Сборка приложения..." "Yellow"
Push-Location $scriptDir
& npm run build | Out-Null
Pop-Location
Write-Step "Сборка завершена" "Green"

# ── Init D1 database ──────────────────────────────────────────────────────────
Write-Step "Инициализация базы данных..." "Yellow"
Push-Location $scriptDir
& npx wrangler d1 execute era-dal --local --file=migrations/001_core.sql 2>$null
Pop-Location
Write-Step "База данных готова" "Green"

# ── Create ERA DAL .ico icon ──────────────────────────────────────────────────
Write-Step "Создание иконки..." "Yellow"
$icoPath = Join-Path $scriptDir "era-dal.ico"

Add-Type -AssemblyName System.Drawing

function New-EraIcon($path) {
    $size = 32
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g   = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint  = [System.Drawing.Text.TextRenderingHint]::AntiAlias

    # Background: violet
    $bg = [System.Drawing.Color]::FromArgb(255, 79, 70, 229)
    $g.Clear($bg)

    # Rounded rect (simulate via filled ellipses + rect)
    $pen = New-Object System.Drawing.SolidBrush($bg)

    # Dots (nodes of neural net)
    $white = [System.Drawing.Brushes]::White
    $gray  = [System.Drawing.Color]::FromArgb(180, 255, 255, 255)
    $grayB = New-Object System.Drawing.SolidBrush($gray)

    # Lines
    $linePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(120, 255, 255, 255), 1)
    $g.DrawLine($linePen,  4,  8, 16,  4)
    $g.DrawLine($linePen,  4,  8, 16, 16)
    $g.DrawLine($linePen,  4, 24, 16, 16)
    $g.DrawLine($linePen,  4, 24, 16, 28)
    $g.DrawLine($linePen, 16,  4, 28,  8)
    $g.DrawLine($linePen, 16, 16, 28,  8)
    $g.DrawLine($linePen, 16, 16, 28, 24)
    $g.DrawLine($linePen, 16, 28, 28, 24)

    # Node circles
    $g.FillEllipse($grayB,  1,  5,  6,  6)   # left top
    $g.FillEllipse($grayB,  1, 21,  6,  6)   # left bot
    $g.FillEllipse($grayB, 13,  1,  6,  6)   # mid top
    $g.FillEllipse($white, 13, 13,  6,  6)   # center (bright)
    $g.FillEllipse($grayB, 13, 25,  6,  6)   # mid bot
    $g.FillEllipse($grayB, 25,  5,  6,  6)   # right top
    $g.FillEllipse($grayB, 25, 21,  6,  6)   # right bot

    # Save PNG into ICO wrapper
    $ms  = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $png = $ms.ToArray()

    $fs = [System.IO.File]::OpenWrite($path)
    $bw = New-Object System.IO.BinaryWriter($fs)

    # ICO header (ICONDIR)
    $bw.Write([uint16]0)   # Reserved
    $bw.Write([uint16]1)   # Type = ICO
    $bw.Write([uint16]1)   # Count = 1

    # ICONDIRENTRY
    $bw.Write([byte]32)    # Width
    $bw.Write([byte]32)    # Height
    $bw.Write([byte]0)     # ColorCount
    $bw.Write([byte]0)     # Reserved
    $bw.Write([uint16]1)   # Planes
    $bw.Write([uint16]32)  # BitCount
    $bw.Write([uint32]$png.Length)   # Size
    $bw.Write([uint32]22)            # Offset (6 header + 16 entry)

    $bw.Write($png)
    $bw.Close(); $fs.Close()
    $g.Dispose(); $bmp.Dispose(); $ms.Dispose()
}

New-EraIcon $icoPath
Write-Step "Иконка создана: $icoPath" "Green"

# ── Create Desktop shortcut ───────────────────────────────────────────────────
Write-Step "Создание ярлыка на рабочем столе..." "Yellow"

$desktop   = [System.Environment]::GetFolderPath("Desktop")
$lnkPath   = Join-Path $desktop "ERA DAL.lnk"
$vbsLauncher = Join-Path $scriptDir "era-dal-launcher.vbs"

$wsh = New-Object -ComObject WScript.Shell
$lnk = $wsh.CreateShortcut($lnkPath)
$lnk.TargetPath       = "wscript.exe"
$lnk.Arguments        = "`"$vbsLauncher`""
$lnk.WorkingDirectory = $scriptDir
$lnk.IconLocation     = "$icoPath,0"
$lnk.Description      = "ERA DAL — Digital AI Layer"
$lnk.WindowStyle      = 7   # minimized
$lnk.Save()

Write-Step "Ярлык создан: $lnkPath" "Green"

# ── Done ──────────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "  ════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host "    ERA DAL установлен!" -ForegroundColor Green
Write-Host ""
Write-Host "    Значок ERA DAL появился на рабочем столе." -ForegroundColor Cyan
Write-Host "    Двойной клик — и приложение запустится!" -ForegroundColor Cyan
Write-Host "  ════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host ""

$launch = Read-Host "  Запустить ERA DAL прямо сейчас? (Y/N)"
if ($launch -match "^[Yy]$") {
    & wscript.exe "`"$vbsLauncher`""
}
