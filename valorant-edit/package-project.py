import zipfile
from pathlib import Path
root=Path('.')
paths=[Path(p) for p in ['package.json','package-lock.json','tsconfig.json','remotion.config.ts','README.md']]
paths+=list(Path('src').glob('*'))+list(Path('public').glob('*'))
paths+=[Path(p) for p in ['out/guarda-la-op.srt','out/captions.json','analysis/edit-decisions.json','analysis/audio-sync-check.json','analysis/final-probe.json','analysis/final-levels.txt']]
with zipfile.ZipFile('out/valorant-remotion-editable.zip','w',compression=zipfile.ZIP_DEFLATED,compresslevel=5) as z:
 for p in paths:
  if p.is_file():z.write(p,Path('valorant-edit')/p)
print('ZIP listo:',Path('out/valorant-remotion-editable.zip').stat().st_size)
