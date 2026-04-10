$sourceDir = "C:\Users\Nuc2020\Desktop\Claude Code\my-new-project\weddings page 3D videos\parker piano, weddings page 3D embeds"
$destDir = "C:\Users\Nuc2020\Desktop\Claude Code\my-new-project\public\weddings-sequence"

# Refresh environment variables so ffmpeg is in path
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

if (-Not (Test-Path -Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
}

for ($i = 1; $i -le 8; $i++) {
    $sectionName = "Section $i"
    $sectionPath = Join-Path $sourceDir $sectionName
    
    if (Test-Path -Path $sectionPath) {
        $videoFile = Get-ChildItem -Path $sectionPath -Filter "*.mp4" | Select-Object -First 1
        
        if ($videoFile) {
            $outputDir = Join-Path $destDir $sectionName
            if (-Not (Test-Path -Path $outputDir)) {
                New-Item -ItemType Directory -Path $outputDir | Out-Null
            }
            
            Write-Host "Processing $($videoFile.Name) for $sectionName..."
            $ffmpegCmd = "ffmpeg"
            $args = @(
                "-i", "`"$($videoFile.FullName)`"",
                "-q:v", "3", 
                "-vf", "scale=-1:1080",
                "`"$outputDir\frame_%04d.jpg`""
            )
            
            $process = Start-Process -FilePath $ffmpegCmd -ArgumentList $args -Wait -NoNewWindow -PassThru
            Write-Host "Finished $sectionName with exit code $($process.ExitCode)."
        } else {
            Write-Host "No video found in $sectionName"
        }
    }
}
Write-Host "All videos processed!"
