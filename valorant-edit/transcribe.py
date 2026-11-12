import sys,json
sys.path.insert(0,'../among-us-edit/.tools')
from faster_whisper import WhisperModel
model=WhisperModel('medium',device='cpu',compute_type='int8',download_root='../among-us-edit/analysis/models',local_files_only=True)
segments,info=model.transcribe('analysis/audio.wav',language='es',word_timestamps=True,vad_filter=True,condition_on_previous_text=False)
out=[]
for s in segments:
 d={'start':s.start,'end':s.end,'text':s.text,'words':[{'word':w.word,'start':w.start,'end':w.end,'probability':w.probability} for w in s.words]}
 out.append(d)
 print(f'{s.start:.2f} - {s.end:.2f}: {s.text}',flush=True)
 with open('analysis/transcript.json','w',encoding='utf-8') as f: json.dump(out,f,ensure_ascii=False,indent=2)
