import sys
sys.path.insert(0,'../among-us-edit/.tools')
from PIL import Image,ImageOps,ImageDraw
from pathlib import Path
files=sorted(Path('out/review').glob('*.jpeg'))+sorted(Path('out/review').glob('*.jpg'))
canvas=Image.new('RGB',(5*324,3*600),(25,25,25)); d=ImageDraw.Draw(canvas)
for i,p in enumerate(files):
 im=Image.open(p);im.thumbnail((324,576))
 x=i%5*324;y=i//5*600
 canvas.paste(im,(x,y));d.text((x+10,y+578),p.name,fill='white')
canvas.save('analysis/review-sheet.jpg')
