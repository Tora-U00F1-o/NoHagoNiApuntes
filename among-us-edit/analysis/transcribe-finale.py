import sys,subprocess,json
sys.path.insert(0,'among-us-edit/.tools')
import imageio_ffmpeg
from faster_whisper import WhisperModel
subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-y','-hide_banner','-loglevel','error','-ss','134','-i','among-us-edit/analysis/audio.wav','-t','46.31','among-us-edit/analysis/finale.wav'],check=True)
m=WhisperModel('medium',device='cpu',compute_type='int8',download_root='among-us-edit/analysis/models',cpu_threads=8)
segments,info=m.transcribe('among-us-edit/analysis/finale.wav',language='es',word_timestamps=True,vad_filter=False,initial_prompt='Conversación de jugadores españoles de Among Us. Jorge, Eloy, Lucas, Lui. Impostor, cambiaformas, votación.')
out=[]
for s in segments:
 d={'start':s.start+134,'end':s.end+134,'text':s.text,'words':[{'word':w.word,'start':w.start+134,'end':w.end+134,'probability':w.probability} for w in s.words]};out.append(d);print(f'{d["start"]:.2f} - {d["end"]:.2f}: {s.text}',flush=True)
 with open('among-us-edit/analysis/finale-transcript.json','w',encoding='utf-8') as f:json.dump(out,f,ensure_ascii=False,indent=2)
