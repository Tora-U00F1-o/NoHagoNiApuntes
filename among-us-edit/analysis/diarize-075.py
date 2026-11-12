import sys,wave,tarfile,json
from pathlib import Path
p=Path('among-us-edit'); sys.path.insert(0,str(p/'.tools'))
sys.path.insert(0,str(p/'.speaker-tools'))
import numpy as np
import sherpa_onnx
models=p/'analysis/models'
with tarfile.open(models/'segmentation.tar.bz2') as t:
 for member in t.getmembers():
  if member.isfile() and member.name.endswith('/model.onnx'):
   (models/'segmentation.onnx').write_bytes(t.extractfile(member).read())
config=sherpa_onnx.OfflineSpeakerDiarizationConfig(
 segmentation=sherpa_onnx.OfflineSpeakerSegmentationModelConfig(pyannote=sherpa_onnx.OfflineSpeakerSegmentationPyannoteModelConfig(model=str(models/'segmentation.onnx'),window_shift_ratio=0.1),num_threads=4),
 embedding=sherpa_onnx.SpeakerEmbeddingExtractorConfig(model=str(models/'speaker-embedding.onnx'),num_threads=4),
 clustering=sherpa_onnx.FastClusteringConfig(num_clusters=-1,threshold=0.75),min_duration_on=0.2,min_duration_off=0.3)
sd=sherpa_onnx.OfflineSpeakerDiarization(config)
with wave.open(str(p/'analysis/finale.wav')) as w:
 x=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float32)/32768
result=sd.process(x).sort_by_start_time()
out=[{'start':r.start+134,'end':r.end+134,'speaker':r.speaker} for r in result]
(models.parent/'speakers-075.json').write_text(json.dumps(out,indent=2),encoding='utf-8')
for r in out:print(r,flush=True)


