Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('public/3d_book_icon.png')
$bmp = New-Object System.Drawing.Bitmap($img)
$bmp.MakeTransparent([System.Drawing.Color]::White)
$bmp.Save('public/3d_book_icon_transparent.png', [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
$bmp.Dispose()
Write-Host 'Background removed successfully!'
