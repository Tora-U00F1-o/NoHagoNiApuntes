import sys,json
sys.path.insert(0,'among-us-edit/.tools')
from faster_whisper import WhisperModel
model=WhisperModel('small',device='cpu',compute_type='int8',download_root='among-us-edit/analysis/models')
segments,info=model.transcribe('among-us-edit/analysis/audio.wav',language='es',word_timestamps=True,vad_filter=True)
out=[]
for s in segments:
 d={'start':s.start,'end':s.end,'text':s.text,'words':[{'word':w.word,'start':w.start,'end':w.end,'probability':w.probability} for w in s.words]}
 out.append(d)
 print(f'{s.start:.2f} - {s.end:.2f}: {s.text}',flush=True)
 with open('among-us-edit/analysis/transcript.json','w',encoding='utf-8') as f: json.dump(out,f,ensure_ascii=False,indent=2)
