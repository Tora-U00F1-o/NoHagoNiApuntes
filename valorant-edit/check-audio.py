import sys,wave,json
sys.path.insert(0,'../among-us-edit/.tools')
import numpy as np


def read(p):
 with wave.open(p,'rb') as w:
  rate=w.getframerate();ch=w.getnchannels();a=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float32).reshape(-1,ch).mean(axis=1)
 return rate,a
rate,source=read('public/mix.wav');rate2,output=read('analysis/final-audio.wav')
assert rate==rate2
source=source[:len(source)//8*8].reshape(-1,8).mean(axis=1);output=output[:len(output)//8*8].reshape(-1,8).mean(axis=1);rate=rate//8
meta=json.load(open('analysis/edit-decisions.json',encoding='utf8'))
checks=[]
for clip in meta['clips']:
 offset=0.35;duration=min(1.0,clip['frames']/meta['fps']-offset-.1)
 src=int((clip['sourceStartSeconds']+offset)*rate);out=int((clip['outputStartFrame']/meta['fps']+offset)*rate)
 n=int(duration*rate);pad=int(.12*rate)
 template=source[src:src+n];search=output[max(0,out-pad):out+n+pad]
 corr=np.correlate(search,template,mode='valid');index=int(np.argmax(corr));lag=index-pad
 test=search[index:index+n]
 similarity=float(np.dot(template,test)/(np.linalg.norm(template)*np.linalg.norm(test)))
 checks.append({'clip':clip['name'],'offsetMs':round(lag/rate*1000,3),'correlation':round(similarity,4)})
print(json.dumps(checks,ensure_ascii=False,indent=2))
with open('analysis/audio-sync-check.json','w',encoding='utf8') as f:json.dump(checks,f,ensure_ascii=False,indent=2)
assert all(abs(c['offsetMs'])<35 and c['correlation']>.85 for c in checks)


