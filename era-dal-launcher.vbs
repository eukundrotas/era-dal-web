' ERA DAL — Desktop Launcher
' Запускает сервер (если не запущен) и открывает браузер.

Dim oShell, oFSO, sDir, iPort
Set oShell = CreateObject("WScript.Shell")
Set oFSO   = CreateObject("Scripting.FileSystemObject")

sDir  = oFSO.GetParentFolderName(WScript.ScriptFullName)
iPort = 8788

' ── Проверяем: сервер уже запущен? ───────────────────────────────────────────
Dim bRunning
bRunning = False
On Error Resume Next
Dim oHTTP
Set oHTTP = CreateObject("MSXML2.XMLHTTP")
oHTTP.Open "GET", "http://localhost:" & iPort & "/", False
oHTTP.Send
If Err.Number = 0 Then
    If oHTTP.Status = 200 Then bRunning = True
End If
Err.Clear
On Error GoTo 0

' ── Запускаем сервер в свёрнутом окне ────────────────────────────────────────
If Not bRunning Then
    Dim sCmd
    ' Используем cmd /k чтобы окно сервера оставалось в панели задач
    sCmd = "cmd /k ""title ERA DAL Server & " & _
           "cd /d """ & sDir & """ & " & _
           "npx wrangler pages dev --port " & iPort & """"
    ' 7 = SW_SHOWMINNOACTIVE (свёрнутое, без фокуса), False = не ждать
    oShell.Run sCmd, 7, False

    ' Ждём до 20 секунд пока сервер поднимется
    Dim i
    For i = 1 To 20
        WScript.Sleep 1000
        On Error Resume Next
        Set oHTTP = CreateObject("MSXML2.XMLHTTP")
        oHTTP.Open "GET", "http://localhost:" & iPort & "/", False
        oHTTP.Send
        If Err.Number = 0 Then
            If oHTTP.Status = 200 Then
                bRunning = True
                Exit For
            End If
        End If
        Err.Clear
        On Error GoTo 0
    Next
End If

' ── Открываем браузер ─────────────────────────────────────────────────────────
If bRunning Then
    oShell.Run "http://localhost:" & iPort & "/meta"
Else
    MsgBox "ERA DAL не запустился за 20 секунд." & vbCrLf & vbCrLf & _
           "Проверьте:" & vbCrLf & _
           "1. Node.js установлен: win+R -> cmd -> node -v" & vbCrLf & _
           "2. Папка приложения: " & sDir & vbCrLf & _
           "3. Запустите install-windows.ps1 снова", _
           16, "ERA DAL — Не удалось запустить"
End If
