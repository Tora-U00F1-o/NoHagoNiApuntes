import json
from pathlib import Path
p=Path('among-us-edit');old=json.loads((p/'public/speakers.json').read_text());full=json.loads((p/'analysis/speakers-full.json').read_text());mapping={}
for t in full:
 if t['start']<134:continue
 for o in old:
  overlap=max(0,min(t['end']*1000,o['endMs'])-max(t['start']*1000,o['startMs']))
  if overlap>0:
   key=(t['speaker'],o['color'],o['label']);mapping[key]=mapping.get(key,0)+overlap
labels={}
for sp in set(t['speaker'] for t in full):
 candidates=[(v,c,l) for (i,c,l),v in mapping.items() if i==sp]
 if candidates:_,c,l=max(candidates);labels[sp]=(c,l)
 else:labels[sp]=(['#70e8ff','#ffe082','#ff94c6','#ffb67b','#8af0a4','#c7abff'][sp%6],f'Voz detectada {sp}')
extra=[dict(startMs=round(t['start']*1000),endMs=round(t['end']*1000),speaker=t['speaker'],color=labels[t['speaker']][0],label=labels[t['speaker']][1]) for t in full if t['end']<134]
turns=extra+old
(p/'src/speakers.ts').write_text('export const speakerTurns = '+json.dumps(turns,ensure_ascii=False)+' as const;\n',encoding='utf-8')
phrases=[(74.34,75.75,'No voy a dar explicaciones.'),(75.75,77.24,'¡Que fue Eloy!'),(77.34,78.26,'¿Dónde estaba el cuerpo?'),(79.36,81.3,'El cuerpo estaba en el pasillo'),(81.3,83.4,'de ala médica, de arriba.'),(84.8,86,'Que he ido yo para allá, coño.'),(87.6,89,'Yo estaba en electricidad, o sea que…'),(90.62,92.34,'¡Que lo vi por cámaras, coño!'),(94.82,96.5,'¿Pero lo viste matarlo?'),(96.84,99.1,'Lo vi matarlo.'),(99.96,100.88,'¿No lo viste matarlo?')]
def cap(s,e,t):return dict(text=t,startMs=round(s*1000),endMs=round(e*1000),timestampMs=None,confidence=None,pageBreakAfter=True)
def component(name,start,duration,caps):
 return f'''const {name}: React.FC = () => {{
 const {{fps}} = useVideoConfig();
 return <Sequence name="Acusación y defensa" trimBefore={{{start} * fps}} durationInFrames={{{duration} * fps}} premountFor={{fps}}>
 <Video src={{staticFile('gameplay.mp4')}} premountFor={{fps}} objectFit="cover" style={{{{width:'100%',height:'100%'}}}} />
 <CaptionPop><BasicCaptions name="Acusación y defensa · subtítulos" width={{1500}} combineTokensWithinMilliseconds={{1600}} premountFor={{fps}} style={{{{position:'absolute',left:210,bottom:100}}}} captions={{{json.dumps([cap(*a) for a in caps],ensure_ascii=False)}}} /></CaptionPop>
 </Sequence>;
}};
'''
s=(p/'src/Composition.tsx').read_text(encoding='utf-8-sig')
s=s.replace("import {speakerTurns} from './speakers';", "import {speakerTurns} from './speakers';\nimport {emphasisEnvelope, emphasisStepMs} from './emphasis';")
s=s.replace('const age = page ?', '''const energyIndex = Math.max(0, Math.min(emphasisEnvelope.length - 1, Math.floor(frame * 1000 / fps / emphasisStepMs)));
  const energy = emphasisEnvelope[energyIndex] ?? 0;
  const intensity = page ? Math.max(...emphasisEnvelope.slice(Math.floor(page.startMs / emphasisStepMs), Math.ceil((page.startMs + Math.min(page.durationMs, 1500)) / emphasisStepMs)), .1) : .1;
  const age = page ?''')
s=s.replace('[.96, 1.025, 1]', '[.985 - intensity * .055, 1.01 + intensity * .065, 1]')
s=s.replace("transformOrigin: '50% 88%'} as React.CSSProperties", "translate: `${intensity > .85 && age < .18 * fps ? Math.sin(age * 2.1) * 3 * energy : 0}px ${interpolate(age, [0, .2 * fps], [8 + intensity * 12, 0], clamp)}px`, transformOrigin: '50% 88%'} as React.CSSProperties")
s=s.replace('export const Highlight: React.FC', component('Accusation',74.2,27,phrases)+component('Defense',126.9,3.1,[(126.98,128.68,'¡Es que no fue así! No me dio tiempo ni a acercarme.'),(128.68,129.84,'Lo vi en el rango de vista.')])+'\nexport const Highlight: React.FC')
s=s.replace('<Sequence name="Discusión y expulsión" from={14 * fps}', '<Sequence name="Acusación a Eloy" from={14 * fps} durationInFrames={27 * fps} premountFor={fps}><Accusation /></Sequence>\n    <Sequence name="Defensa de Eloy" from={41 * fps} durationInFrames={3.1 * fps} premountFor={fps}><Defense /></Sequence>\n    <Sequence name="Discusión y expulsión" from={44.1 * fps}')
s=s.replace('durationInFrames={1497}', 'durationInFrames={2400}')
(p/'src/Composition.tsx').write_text(s,encoding='utf-8')
