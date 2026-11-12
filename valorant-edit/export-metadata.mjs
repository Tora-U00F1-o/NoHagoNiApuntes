import fs from 'node:fs';
const code=fs.readFileSync('src/Root.tsx','utf8');
const clips=[{name:'Primera muerte',sourceStartFrame:896,frames:111},{name:'Combate del compañero',sourceStartFrame:1130,frames:357},{name:'Guardar la OP y desenlace',sourceStartFrame:1579,frames:731}];
const fps=60000/1001;
let start=0;for(const c of clips){c.outputStartFrame=start;c.sourceStartSeconds=c.sourceStartFrame/fps;c.sourceEndSeconds=(c.sourceStartFrame+c.frames)/fps;start+=c.frames;}
fs.writeFileSync('analysis/edit-decisions.json',JSON.stringify({fps,width:1080,height:1920,frames:1199,durationSeconds:1199/fps,clips},null,2));
const groups=[...code.matchAll(/<Series.Sequence[\s\S]*?<\/Series.Sequence>/g)];
let all=[];
for(let i=0;i<groups.length;i++){
 for(const m of groups[i][0].matchAll(/\{text:'([^']*)',startMs:(\d+),endMs:(\d+),timestampMs:null,confidence:null\}/g)){
 const caption={text:m[1].replaceAll('\\n','\n'),startMs:+m[2],endMs:+m[3],timestampMs:null,confidence:null};
 const c=clips[i];const off=(c.outputStartFrame-c.sourceStartFrame)/fps*1000;
 all.push({...caption,startMs:caption.startMs+off,endMs:caption.endMs+off});
 }
}
fs.writeFileSync('out/captions.json',JSON.stringify(all,null,2));
const stamp=ms=>{ms=Math.round(Math.max(0,ms));return `${String(Math.floor(ms/3600000)).padStart(2,'0')}:${String(Math.floor(ms/60000)%60).padStart(2,'0')}:${String(Math.floor(ms/1000)%60).padStart(2,'0')},${String(ms%1000).padStart(3,'0')}`;};
fs.writeFileSync('out/guarda-la-op.srt',all.map((c,i)=>`${i+1}\n${stamp(c.startMs)} --> ${stamp(c.endMs)}\n${c.text}\n`).join('\n'));
console.log(JSON.stringify({clips,captions:all.length,duration:1199/fps},null,2));

