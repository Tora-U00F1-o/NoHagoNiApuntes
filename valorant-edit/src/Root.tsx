
import {AbsoluteFill, Composition, Series, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {Video, Audio} from '@remotion/media';
import type {Caption} from '@remotion/captions';
import './style.css';

const Captions = ({captions}: {captions: Caption[]}) => {
  const frame=useCurrentFrame(); const {fps}=useVideoConfig(); const ms=frame/fps*1000;
  const c=captions.find(c=>ms>=c.startMs && ms<c.endMs);
  if (!c) return null;
  const enter=interpolate(ms-c.startMs,[0,90],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <div className="captions" style={{opacity:enter,transform:`translateY(${(1-enter)*5}px)`}}>
    {c.text.split(/(OP|guárdala|Guárdala)/g).map((part,i)=><span key={i} style={{color:/^(OP|guárdala|Guárdala)$/.test(part)?'#7ef8d0':'white'}}>{part}</span>)}
  </div>;
};

// Children inherit source time from the parent Sequence, including captions and camera cues.
const Gameplay = () => {
 const frame=useCurrentFrame(); const {fps}=useVideoConfig(); const s=frame/fps;
 // Detail window: 1.5x relative to the full-width view; follows the enemy only at the final encounter.
 const focusX=interpolate(s,[15.3,16.1,26.3,31.5,32.5,35.5,36.3,36.8,37.2],[960,960,960,960,960,960,960,760,960],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const focusY=interpolate(s,[15,26,30,31,32,35,36,37,37.5,38.5],[540,540,650,650,540,540,540,500,380,540],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <>
  <Video src={staticFile('background.mp4')} muted style={{position:'absolute',inset:0,width:1080,height:1920,opacity:0.30}}/>
  <div className="shade"/>
  <div className="headline"><div className="eyebrow">UNA MISIÓN SENCILLA</div><div>GUARDA LA <span>OP.</span></div></div>
  <div className="full-game"><Video src={staticFile('source.mp4')} muted style={{width:960,height:540}}/></div>
  <div className="detail-game"><Video src={staticFile('source.mp4')} muted style={{position:'absolute',width:1440,height:810,left:480-focusX*.75,top:250-focusY*.75}}/></div>
  <Audio src={staticFile('mix.wav')} />
 </>;
};

export const Edit = () => {
 const {fps}=useVideoConfig();
 return <AbsoluteFill style={{background:'#0a1012'}}><Series>
  <Series.Sequence name="El enemigo aparece y cae la Operator" trimBefore={896} durationInFrames={111} premountFor={fps}>
    <Gameplay/>
  </Series.Sequence>
  <Series.Sequence name="El compañero continúa la ronda" trimBefore={1130} durationInFrames={357} premountFor={fps}>
    <Gameplay/>
    <Captions captions={[
      {text:'¡Ay, madre!',startMs:19520,endMs:20620,timestampMs:null,confidence:null},
      {text:'Queda un enemigo.',startMs:22600,endMs:24780,timestampMs:null,confidence:null},
    ]}/>
  </Series.Sequence>
  <Series.Sequence name="Guárdame la OP: recogida, recarga y desenlace" trimBefore={1579} durationInFrames={731} premountFor={fps}>
    <Gameplay/>
    <Captions captions={[
      {text:'Guárdame la OP.',startMs:26600,endMs:27680,timestampMs:null,confidence:null},
      {text:'Guárdame la OP.',startMs:28500,endMs:29500,timestampMs:null,confidence:null},
      {text:'La OP.',startMs:30340,endMs:31000,timestampMs:null,confidence:null},
      {text:'Pero a mí\nno me gusta.',startMs:32920,endMs:34180,timestampMs:null,confidence:null},
      {text:'Guárdala, guárdala, guárdala.',startMs:35000,endMs:36080,timestampMs:null,confidence:null},
    ]}/>
  </Series.Sequence>
 </Series></AbsoluteFill>;
};
export const Root = () => <Composition id="GuardaLaOP" component={Edit} durationInFrames={1199} fps={60000/1001} width={1080} height={1920}/>;




