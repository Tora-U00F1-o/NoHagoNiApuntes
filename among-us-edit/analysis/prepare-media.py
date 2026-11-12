import sys,subprocess
sys.path.insert(0,'among-us-edit/.tools')
import imageio_ffmpeg
subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-y','-hide_banner','-loglevel','warning','-i','C:/Users/jorge/Videos/NVIDIA/Among Us/Among Us 2026.11.02 - 01.19.37.02.DVR.mp4','-filter_complex','[0:a:0][0:a:1]amix=inputs=2:normalize=0,alimiter=limit=0.95:level=0[a]','-map','0:v:0','-map','[a]','-c:v','libx264','-preset','veryfast','-crf','20','-r','30','-threads','8','-c:a','aac','-b:a','192k','-movflags','+faststart','among-us-edit/public/gameplay.mp4'],check=True)
