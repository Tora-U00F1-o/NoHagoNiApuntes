import sys,json
sys.path.insert(0,'../among-us-edit/.tools')
from faster_whisper import WhisperModel
model=WhisperModel('small',device='cpu',compute_type='int8',download_root='../among-us-edit/analysis/models',local_files_only=True)
segments,info=model.transcribe('analysis/dialogue.wav',language='es',word_timestamps=True,vad_filter=False,condition_on_previous_text=False)
out=[]
for s in segments:
 d={'start':s.start+24,'end':s.end+24,'text':s.text,'words':[{'word':w.word,'start':w.start+24,'end':w.end+24,'probability':w.probability} for w in s.words]}
 out.append(d)
 print(d,flush=True)
 with open('analysis/dialogue-transcript.json','w',encoding='utf-8') as f: json.dump(out,f,ensure_ascii=False,indent=2)
