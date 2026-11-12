import json,re
from pathlib import Path
p=Path('among-us-edit')
# Phrase times remain relative to the original recording.
phrases=[
(142.64,143.58,'Yo voté a Jorge.'),
(143.92,144.78,'Bueno, hacemos una cosa:'),
(144.8,145.9,'se va uno fuera y después el otro.'),
(146.3,147.4,'Eloy, Lucas…'),
(147.4,148.68,'¿A quién quieres votar?'),
(148.68,150.3,'[Voces superpuestas]'),
(150.7,151.64,'Lucas, votamos al que quieras.'),
(151.76,152.7,'Y luego largamos a Jorge.'),
(152.8,153.7,'Pero luego largamos a Jorge.'),
(153.82,154.62,'Venga, pues Eloy. Venga.'),
(154.86,155.56,'¡A tomar por culo!'),
(155.84,156.94,'Eloy y luego largamos a Jorge.'),
(157.08,157.55,'¡A tomar por culo!'),
(157.68,158.54,'¡Ay, la leche!'),
(159.06,160.7,'Eres un paquete de la Virgen.'),
(161.0,162.05,'De la Virgen, un paquete.'),
(162.7,163.74,'Primero uno y luego el otro.'),
(163.8,166.0,'[Voces superpuestas]'),
(167.4,168.92,'Hasta el final la tira, ¿eh?'),
(170.6,171.5,'Vale, pido perdón.'),
(171.58,172.5,'Hay un cambio de forma.'),
(172.82,173.98,'Pido perdón.'),
(174.78,175.48,'¿Es Jorge, no?'),
(175.56,176.98,'¿Pero por qué dices eso entonces?'),
(177.08,178.2,'Pero me cago, tío.')]
caps=[{'text':t,'startMs':round(s*1000),'endMs':round(e*1000),'timestampMs':round((s+e)*500),'confidence':None,'pageBreakAfter':True} for s,e,t in phrases]
(p/'public/captions.json').write_text(json.dumps(caps,ensure_ascii=False,indent=2),encoding='utf-8')
s=(p/'src/Composition.tsx').read_text(encoding='utf-8-sig'); s=s.replace('captions={[]}', 'captions={'+json.dumps(caps,ensure_ascii=False,indent=2)+'}')
(p/'src/Composition.tsx').write_text(s,encoding='utf-8')
def stamp(ms):
 ms=round(ms);return f'{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d},{ms%1000:03d}'
srt='\n\n'.join(f'{i+1}\n{stamp(c["startMs"]-142400)} --> {stamp(c["endMs"]-142400)}\n{c["text"]}' for i,c in enumerate(caps))+'\n'
(p/'public/highlight.es.srt').write_text(srt,encoding='utf-8')
