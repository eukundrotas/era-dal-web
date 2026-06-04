# ERA DAL — Windows Installer
# Правая кнопка -> "Выполнить с помощью PowerShell"

# ── Путь к папке приложения (работает при любом способе запуска) ──────────────
$appDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
if (-not $appDir -or $appDir -eq '') { $appDir = (Get-Location).Path }

function Step($msg, $col = 'Cyan') { Write-Host "  $msg" -ForegroundColor $col }

Write-Host ''
Write-Host '  ╔══════════════════════════════════════╗' -ForegroundColor Magenta
Write-Host '  ║   ERA DAL — Установка на Windows     ║' -ForegroundColor Magenta
Write-Host '  ╚══════════════════════════════════════╝' -ForegroundColor Magenta
Write-Host ''
Step "Папка: $appDir" Green

# ── Node.js ───────────────────────────────────────────────────────────────────
$nodeOk = $false
try { $v = & node -v 2>&1; $nodeOk = ($LASTEXITCODE -eq 0) } catch {}
if (-not $nodeOk) {
    Step 'Node.js не найден! Открываю сайт для скачивания...' Red
    Start-Process 'https://nodejs.org'
    Read-Host '  Установите Node.js LTS и запустите скрипт снова. Enter = выход'
    exit 1
}
Step "Node.js $v" Green

# ── npm install ───────────────────────────────────────────────────────────────
Set-Location $appDir
if (-not (Test-Path 'node_modules')) {
    Step 'Установка пакетов npm (1-2 минуты)...' Yellow
    & npm install
    if ($LASTEXITCODE -ne 0) { Step 'npm install не удался!' Red; Read-Host; exit 1 }
}
Step 'Пакеты готовы' Green

# ── Build ─────────────────────────────────────────────────────────────────────
Step 'Сборка приложения...' Yellow
& npm run build
if ($LASTEXITCODE -ne 0) { Step 'Сборка не удалась!' Red; Read-Host; exit 1 }
Step 'Сборка завершена' Green

# ── D1 database ───────────────────────────────────────────────────────────────
Step 'Инициализация базы данных...' Yellow
$env:WRANGLER_LOG = 'none'
try { & npx wrangler d1 execute era-dal --local --file=migrations/001_core.sql *>$null } catch {}
Step 'База данных готова' Green

# ── Создаём иконку ERA DAL (.ico) ─────────────────────────────────────────────
Step 'Создание иконки...' Yellow
$icoPath = Join-Path $appDir 'era-dal.ico'

Add-Type -AssemblyName System.Drawing

function New-EraIco {
    param($path)

    function Make-Frame($sz) {
        $bmp = New-Object System.Drawing.Bitmap($sz, $sz)
        $g   = [System.Drawing.Graphics]::FromImage($bmp)
        $g.SmoothingMode     = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

        # Фиолетовый фон с закруглёнными углами
        $radius = [int]($sz * 0.22)
        $violet = [System.Drawing.Color]::FromArgb(255, 79, 70, 229)
        $bgBrush = New-Object System.Drawing.SolidBrush($violet)
        $path2 = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path2.AddArc(0, 0, $radius*2, $radius*2, 180, 90)
        $path2.AddArc($sz - $radius*2, 0, $radius*2, $radius*2, 270, 90)
        $path2.AddArc($sz - $radius*2, $sz - $radius*2, $radius*2, $radius*2, 0, 90)
        $path2.AddArc(0, $sz - $radius*2, $radius*2, $radius*2, 90, 90)
        $path2.CloseFigure()
        $g.FillPath($bgBrush, $path2)

        # Рисуем нейросеть: 7 узлов + линии
        $scale = $sz / 32.0
        $white      = [System.Drawing.Brushes]::White
        $semiWhite  = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(180,255,255,255))
        $linePen    = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(110,255,255,255), [float]($scale * 1.2))

        # Координаты узлов (в 32px масштабе): L=4, C=16, R=28; T=6, M=16, B=26
        $nodes = @(
            @{x=4;y=8},  @{x=4;y=24},  @{x=16;y=4},
            @{x=16;y=16}, @{x=16;y=28}, @{x=28;y=8}, @{x=28;y=24}
        )
        # Соединения
        $edges = @((0,2),(0,3),(1,3),(1,4),(2,5),(3,5),(3,6),(4,6))
        foreach ($e in $edges) {
            $a = $nodes[$e[0]]; $b = $nodes[$e[1]]
            $g.DrawLine($linePen, [float]($a.x*$scale), [float]($a.y*$scale),
                                  [float]($b.x*$scale), [float]($b.y*$scale))
        }
        # Узлы
        $r = [float]($scale * 3)
        foreach ($i in 0..6) {
            $n = $nodes[$i]
            $brush = if ($i -eq 3) { $white } else { $semiWhite }
            $x = [float]($n.x * $scale - $r)
            $y = [float]($n.y * $scale - $r)
            $g.FillEllipse($brush, $x, $y, $r*2, $r*2)
        }

        $g.Dispose()
        $bgBrush.Dispose(); $semiWhite.Dispose(); $linePen.Dispose()
        return $bmp
    }

    # Генерируем 3 размера: 16, 32, 48
    $sizes = @(16, 32, 48)
    $frames = @{}
    $pngs   = @{}
    foreach ($sz in $sizes) {
        $frames[$sz] = Make-Frame $sz
        $ms = New-Object System.IO.MemoryStream
        $frames[$sz].Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
        $pngs[$sz] = $ms.ToArray()
        $ms.Dispose()
    }

    # ICO: заголовок + N записей + N PNG-блоков
    $count = $sizes.Count
    $headerSize = 6                    # ICONDIR
    $entrySize  = 16                   # ICONDIRENTRY × count
    $dataOffset = $headerSize + $entrySize * $count

    $fs = [System.IO.File]::OpenWrite($path)
    $bw = New-Object System.IO.BinaryWriter($fs)

    # ICONDIR
    $bw.Write([uint16]0)         # Reserved
    $bw.Write([uint16]1)         # Type = ICO
    $bw.Write([uint16]$count)    # Count

    # Entries
    $offset = $dataOffset
    foreach ($sz in $sizes) {
        $bw.Write([byte]($sz -band 0xFF))  # Width (0 = 256)
        $bw.Write([byte]($sz -band 0xFF))  # Height
        $bw.Write([byte]0)                 # ColorCount
        $bw.Write([byte]0)                 # Reserved
        $bw.Write([uint16]1)               # Planes
        $bw.Write([uint16]32)              # BitCount
        $bw.Write([uint32]$pngs[$sz].Length)
        $bw.Write([uint32]$offset)
        $offset += $pngs[$sz].Length
    }

    # PNG data
    foreach ($sz in $sizes) { $bw.Write($pngs[$sz]) }

    $bw.Close(); $fs.Close()
    foreach ($sz in $sizes) { $frames[$sz].Dispose() }
}

New-EraIco $icoPath
Step "Иконка готова: $icoPath" Green

# ── Ярлык на рабочем столе ────────────────────────────────────────────────────
Step 'Создание ярлыка на рабочем столе...' Yellow

$desktop    = [System.Environment]::GetFolderPath('Desktop')
$lnkPath    = Join-Path $desktop 'ERA DAL.lnk'
$launcherVbs = Join-Path $appDir 'era-dal-launcher.vbs'

$wsh = New-Object -ComObject WScript.Shell
$lnk = $wsh.CreateShortcut($lnkPath)
$lnk.TargetPath       = 'wscript.exe'
$lnk.Arguments        = "`"$launcherVbs`""
$lnk.WorkingDirectory = $appDir
$lnk.IconLocation     = "$icoPath,0"
$lnk.Description      = 'ERA DAL — Digital AI Layer'
$lnk.WindowStyle      = 7
$lnk.Save()
Step "Ярлык создан: $lnkPath" Green

# ── Готово ────────────────────────────────────────────────────────────────────
Write-Host ''
Write-Host '  ╔══════════════════════════════════════════╗' -ForegroundColor Green
Write-Host '  ║   ERA DAL установлен!                    ║' -ForegroundColor Green
Write-Host '  ║                                          ║' -ForegroundColor Green
Write-Host '  ║   Значок ERA DAL — на рабочем столе.    ║' -ForegroundColor Cyan
Write-Host '  ║   Двойной клик — браузер откроется!      ║' -ForegroundColor Cyan
Write-Host '  ╚══════════════════════════════════════════╝' -ForegroundColor Green
Write-Host ''

$ans = Read-Host '  Запустить ERA DAL прямо сейчас? (Y/N)'
if ($ans -match '^[YyДд]') {
    Start-Process 'wscript.exe' -ArgumentList "`"$launcherVbs`""
}
