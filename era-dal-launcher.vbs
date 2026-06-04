' ERA DAL — Desktop Launcher
' Double-click this or the Desktop shortcut to start the app.

Dim oShell, oFSO, sDir, iPort
Set oShell = CreateObject("WScript.Shell")
Set oFSO   = CreateObject("Scripting.FileSystemObject")

sDir  = oFSO.GetParentFolderName(WScript.ScriptFullName)
iPort = 8788

' ── Check if server already running ─────────────────────────────────────────
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
On Error GoTo 0

' ── Start server if not running ──────────────────────────────────────────────
If Not bRunning Then
    ' Show small status window
    Dim sCmd
    sCmd = "cmd /k title ERA DAL Server && " & _
           "cd /d """ & sDir & """ && " & _
           "npx wrangler pages dev --port " & iPort
    oShell.Run sCmd, 7, False   ' 7 = minimized, False = don't wait

    ' Wait for server to start (up to 15 sec)
    Dim i
    For i = 1 To 15
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
        On Error GoTo 0
    Next
End If

' ── Open browser ─────────────────────────────────────────────────────────────
If bRunning Then
    oShell.Run "http://localhost:" & iPort & "/meta"
Else
    MsgBox "ERA DAL не запустился. Проверьте:" & vbCrLf & _
           "1. Node.js установлен (node -v в cmd)" & vbCrLf & _
           "2. Папка: " & sDir & vbCrLf & _
           "3. Попробуйте запустить setup.bat", _
           16, "ERA DAL — Ошибка"
End If
