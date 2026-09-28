Add-Type -AssemblyName System.Drawing
$imgPath = (Resolve-Path "public/images/unico-brand-seal.png").Path
$src = [System.Drawing.Bitmap]::FromFile($imgPath)

# Locate garment on the right side of the 1024x1024 seal
$cropX = 695
$cropY = 170
$cropW = 295
$cropH = 640

$rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$cropped = $src.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Save as transparent or high-res dress asset
$outPath = (Join-Path (Get-Location) "public/images/hero-atelier-garment.png")
$cropped.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$cropped.Dispose()
$src.Dispose()
Write-Host "Saved cropped garment to $outPath"
