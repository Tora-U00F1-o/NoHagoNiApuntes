import React from 'react';
import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Composition, Easing, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BasicCaptions} from './basic-captions';
import {createTikTokStyleCaptions, type Caption} from '@remotion/captions';
import {speakerTurns} from './speakers';
import {emphasisEnvelope, emphasisStepMs} from './emphasis';
import './style.css';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const CaptionPop: React.FC<{children: React.ReactElement<{captions: Caption[]}>}> = ({children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {pages} = React.useMemo(() => createTikTokStyleCaptions({captions: children.props.captions, combineTokensWithinMilliseconds: 1600}), [children.props.captions]);
  const page = pages.find((p) => frame * 1000 / fps >= p.startMs && frame * 1000 / fps < p.startMs + p.durationMs);
  const energyIndex = Math.max(0, Math.min(emphasisEnvelope.length - 1, Math.floor(frame * 1000 / fps / emphasisStepMs)));
  const energy = emphasisEnvelope[energyIndex] ?? 0;
  const intensity = page ? Math.max(...emphasisEnvelope.slice(Math.floor(page.startMs / emphasisStepMs), Math.ceil((page.startMs + Math.min(page.durationMs, 1500)) / emphasisStepMs)), .1) : .1;
  const age = page ? frame - page.startMs * fps / 1000 : 0;
  const caption = children.props.captions.find((c) => c.startMs === page?.startMs);
  const speaker = caption && !caption.text.startsWith('[') ? speakerTurns.reduce<{color: string; overlap: number} | null>((best, turn) => {
    const overlap = Math.max(0, Math.min(caption.endMs, turn.endMs) - Math.max(caption.startMs, turn.startMs));
    return overlap > (best?.overlap ?? 0) ? {color: turn.color, overlap} : best;
  }, null) : null;
  return <AbsoluteFill className="captions" style={{'--speaker-color': speaker?.color ?? '#e2e8f0', scale: interpolate(age, [0, .1 * fps, .2 * fps], [.985 - intensity * .055, 1.01 + intensity * .065, 1], clamp), opacity: interpolate(age, [0, .07 * fps], [.35, 1], clamp), translate: `${intensity > .85 && age < .18 * fps ? Math.sin(age * 2.1) * 3 * energy : 0}px ${interpolate(age, [0, .2 * fps], [8 + intensity * 12, 0], clamp)}px`, transformOrigin: '50% 88%'} as React.CSSProperties}>{children}</AbsoluteFill>;
};

const StoryLabel: React.FC<{title: string; detail: string; color: string}> = ({title, detail, color}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <div style={{position: 'absolute', top: 88, left: 100, opacity: interpolate(frame, [0, .12 * fps, 2.5 * fps, 2.8 * fps], [0, 1, 1, 0], clamp), translate: interpolate(frame, [0, .4 * fps], ['0px 24px', '0px 0px'], {...clamp, easing: Easing.bezier(.16, 1, .3, 1)})}}>
    <div style={{fontSize: 25, fontWeight: 800, letterSpacing: 5, color, marginBottom: 10}}>{detail}</div>
    <div style={{fontSize: 74, lineHeight: 1, fontWeight: 900, color: 'white', textShadow: '0 4px 18px #000', WebkitTextStroke: '1px #111'}}>{title}</div>
  </div>;
};

const Footage: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{overflow: 'hidden'}}>
    <Video name="Partida · juego y micrófono" src={staticFile('gameplay.mp4')} premountFor={fps} objectFit="cover" volume={(sourceFrame) => interpolate(sourceFrame, [162.4 * fps, 162.6 * fps, 164.7 * fps, 164.9 * fps], [1, .5, .5, 1], clamp)} style={{width: '100%', height: '100%', scale: interpolate(frame, [142.4 * fps, 145.9 * fps, 146.4 * fps, 155.4 * fps, 156 * fps, 161 * fps, 161.5 * fps, 170.5 * fps, 171.4 * fps, 173.8 * fps, 174.4 * fps], [1.015, 1.06, 1.015, 1.015, 1.075, 1.075, 1, 1, 1.14, 1.14, 1.04], clamp), transformOrigin: '50% 42%'}} />
    <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(0,0,0,.6), transparent 30%, transparent 78%, rgba(0,0,0,.32))', pointerEvents: 'none'}} />
  </AbsoluteFill>;
};

const Debate: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const durationInFrames = 35.9 * fps;
  return <AbsoluteFill style={{backgroundColor: '#080c13', fontFamily: 'Arial, Helvetica, sans-serif'}}>
    <Sequence name="Votación, expulsión y giro final" trimBefore={142.4 * fps} durationInFrames={35.9 * fps} premountFor={fps}>
      <Footage />
      <CaptionPop>
        <BasicCaptions name="Diálogo en español" width={1500} combineTokensWithinMilliseconds={1600} premountFor={fps} style={{position: 'absolute', left: 210, bottom: 100}} captions={[
  {
    "text": "Yo voté a Jorge.",
    "startMs": 142640,
    "endMs": 143580,
    "timestampMs": 143110,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "Bueno, hacemos una cosa:",
    "startMs": 143920,
    "endMs": 144780,
    "timestampMs": 144350,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "se va uno fuera y después el otro.",
    "startMs": 144800,
    "endMs": 145900,
    "timestampMs": 145350,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "Eloy, Lucas…",
    "startMs": 146300,
    "endMs": 147400,
    "timestampMs": 146850,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "¿A quién quieres votar?",
    "startMs": 147400,
    "endMs": 148680,
    "timestampMs": 148040,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "[Voces superpuestas]",
    "startMs": 148680,
    "endMs": 150300,
    "timestampMs": 149490,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "Lucas, votamos al que quieras.",
    "startMs": 150700,
    "endMs": 151640,
    "timestampMs": 151170,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "Y luego largamos a Jorge.",
    "startMs": 151760,
    "endMs": 152700,
    "timestampMs": 152230,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "Pero luego largamos a Jorge.",
    "startMs": 152800,
    "endMs": 153700,
    "timestampMs": 153250,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "Venga, pues Eloy. Venga.",
    "startMs": 153820,
    "endMs": 154620,
    "timestampMs": 154220,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "¡A tomar por culo!",
    "startMs": 154860,
    "endMs": 155560,
    "timestampMs": 155210,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "Eloy y luego largamos a Jorge.",
    "startMs": 155840,
    "endMs": 156940,
    "timestampMs": 156390,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "¡A tomar por culo!",
    "startMs": 157080,
    "endMs": 157550,
    "timestampMs": 157315,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "¡Ay, la leche!",
    "startMs": 157680,
    "endMs": 158540,
    "timestampMs": 158110,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "Eres un paquete de la Virgen.",
    "startMs": 159060,
    "endMs": 160700,
    "timestampMs": 159880,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "De la Virgen, un paquete.",
    "startMs": 161000,
    "endMs": 162050,
    "timestampMs": 161525,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "Primero uno y luego el otro.",
    "startMs": 162700,
    "endMs": 163740,
    "timestampMs": 163220,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "[Voces superpuestas]",
    "startMs": 163800,
    "endMs": 166000,
    "timestampMs": 164900,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "Hasta el final la tira, ¿eh?",
    "startMs": 167400,
    "endMs": 168920,
    "timestampMs": 168160,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "Vale, pido perdón.",
    "startMs": 170600,
    "endMs": 171500,
    "timestampMs": 171050,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "Hay un cambio de forma.",
    "startMs": 171580,
    "endMs": 172500,
    "timestampMs": 172040,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "Pido perdón.",
    "startMs": 172820,
    "endMs": 173980,
    "timestampMs": 173400,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "¿Es Jorge, no?",
    "startMs": 174780,
    "endMs": 175480,
    "timestampMs": 175130,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "¿Pero por qué dices eso entonces?",
    "startMs": 175560,
    "endMs": 176980,
    "timestampMs": 176270,
    "confidence": null,
    "pageBreakAfter": true
  },
  {
    "text": "Pero me cago, tío.",
    "startMs": 177080,
    "endMs": 178200,
    "timestampMs": 177640,
    "confidence": null,
    "pageBreakAfter": true
  }
]} />
      </CaptionPop>
    </Sequence>
    <Sequence name="Gancho" durationInFrames={2.8 * fps} premountFor={fps}>
      <StoryLabel title="EL PLAN ERA PERFECTO…" detail="AMONG US / LA VOTACIÓN" color="#7cf0dc" />
    </Sequence>
    <Sequence name="Grito Wilhelm · expulsión" from={20.2 * fps} durationInFrames={2.2 * fps} premountFor={fps}>
      <Audio src={staticFile('wilhelm-scream.wav')} volume={0.65} premountFor={fps} />
    </Sequence>
    <Sequence name="Expulsión" from={19.1 * fps} durationInFrames={2.8 * fps} premountFor={fps}>
      <StoryLabel title="UNO FUERA." detail="DECISIÓN TOMADA" color="#ffb36b" />
    </Sequence>
    <Sequence name="Giro final" from={29.1 * fps} durationInFrames={2.8 * fps} premountFor={fps}>
      <StoryLabel title="HABÍA UN CAMBIAFORMAS." detail="EL GIRO" color="#ff7a8e" />
    </Sequence>
    <div style={{position: 'absolute', left: 0, bottom: 0, height: 6, width: `${100 * frame / (durationInFrames - 1)}%`, background: '#7cf0dc'}} />
    <AbsoluteFill style={{background: '#080c13', opacity: interpolate(frame, [durationInFrames - .25 * fps, durationInFrames - 1], [0, 1], clamp), pointerEvents: 'none'}} />
  </AbsoluteFill>;
};

const GameplayIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{backgroundColor: '#080c13', overflow: 'hidden', fontFamily: 'Arial, Helvetica, sans-serif'}}>
    <Video name="Nave · kill y reporte" src={staticFile('gameplay.mp4')} trimBefore={20 * fps} premountFor={fps} objectFit="cover" style={{width: '100%', height: '100%', transformOrigin: '10% 48%', scale: interpolate(frame, [0, 9.25 * fps, 9.65 * fps, 10.6 * fps, 11.35 * fps, 11.7 * fps], [1, 1, 1.95, 1.95, 1.35, 1], clamp)}} />
    <Sequence name="Contexto de la nave" durationInFrames={2.8 * fps} premountFor={fps}>
      <StoryLabel title="UNOS SEGUNDOS ANTES…" detail="EN LA NAVE" color="#70e8ff" />
    </Sequence>
    <Sequence name="Énfasis en la kill" from={9.55 * fps} durationInFrames={1.6 * fps} premountFor={fps}>
      <StoryLabel title="¿LO HAS VISTO?" detail="LA KILL" color="#ff7a8e" />
    </Sequence>
  </AbsoluteFill>;
};

const Accusation: React.FC = () => {
 const {fps} = useVideoConfig();
 return <Sequence name="Acusación y defensa" trimBefore={74.2 * fps} durationInFrames={27 * fps} premountFor={fps}>
 <Video src={staticFile('gameplay.mp4')} premountFor={fps} objectFit="cover" style={{width:'100%',height:'100%'}} />
 <CaptionPop><BasicCaptions name="Acusación y defensa · subtítulos" width={1500} combineTokensWithinMilliseconds={1600} premountFor={fps} style={{position:'absolute',left:210,bottom:100}} captions={[{"text": "No voy a dar explicaciones.", "startMs": 74340, "endMs": 75750, "timestampMs": null, "confidence": null, "pageBreakAfter": true}, {"text": "¡Que fue Eloy!", "startMs": 75750, "endMs": 77240, "timestampMs": null, "confidence": null, "pageBreakAfter": true}, {"text": "¿Dónde estaba el cuerpo?", "startMs": 77340, "endMs": 78260, "timestampMs": null, "confidence": null, "pageBreakAfter": true}, {"text": "El cuerpo estaba en el pasillo", "startMs": 79360, "endMs": 81300, "timestampMs": null, "confidence": null, "pageBreakAfter": true}, {"text": "de ala médica, de arriba.", "startMs": 81300, "endMs": 83400, "timestampMs": null, "confidence": null, "pageBreakAfter": true}, {"text": "Que he ido yo para allá, coño.", "startMs": 84800, "endMs": 86000, "timestampMs": null, "confidence": null, "pageBreakAfter": true}, {"text": "Yo estaba en electricidad, o sea que…", "startMs": 87600, "endMs": 89000, "timestampMs": null, "confidence": null, "pageBreakAfter": true}, {"text": "¡Que lo vi por cámaras, coño!", "startMs": 90620, "endMs": 92340, "timestampMs": null, "confidence": null, "pageBreakAfter": true}, {"text": "¿Pero lo viste matarlo?", "startMs": 94820, "endMs": 96500, "timestampMs": null, "confidence": null, "pageBreakAfter": true}, {"text": "Lo vi matarlo.", "startMs": 96840, "endMs": 99100, "timestampMs": null, "confidence": null, "pageBreakAfter": true}, {"text": "¿No lo viste matarlo?", "startMs": 99960, "endMs": 100880, "timestampMs": null, "confidence": null, "pageBreakAfter": true}]} /></CaptionPop>
 </Sequence>;
};
const Defense: React.FC = () => {
 const {fps} = useVideoConfig();
 return <Sequence name="Acusación y defensa" trimBefore={126.9 * fps} durationInFrames={3.1 * fps} premountFor={fps}>
 <Video src={staticFile('gameplay.mp4')} premountFor={fps} objectFit="cover" style={{width:'100%',height:'100%'}} />
 <CaptionPop><BasicCaptions name="Acusación y defensa · subtítulos" width={1500} combineTokensWithinMilliseconds={1600} premountFor={fps} style={{position:'absolute',left:210,bottom:100}} captions={[{"text": "¡Es que no fue así! No me dio tiempo ni a acercarme.", "startMs": 126980, "endMs": 128680, "timestampMs": null, "confidence": null, "pageBreakAfter": true}, {"text": "Lo vi en el rango de vista.", "startMs": 128680, "endMs": 129840, "timestampMs": null, "confidence": null, "pageBreakAfter": true}]} /></CaptionPop>
 </Sequence>;
};

export const Highlight: React.FC = () => {
  const {fps} = useVideoConfig();
  return <AbsoluteFill>
    <Sequence name="Gameplay · muerte en la nave" durationInFrames={14 * fps} premountFor={fps}><GameplayIntro /></Sequence>
    <Sequence name="Acusación a Eloy" from={14 * fps} durationInFrames={27 * fps} premountFor={fps}><Accusation /></Sequence>
    <Sequence name="Defensa de Eloy" from={41 * fps} durationInFrames={3.1 * fps} premountFor={fps}><Defense /></Sequence>
    <Sequence name="Discusión y expulsión" from={44.1 * fps} durationInFrames={35.9 * fps} premountFor={fps}><Debate /></Sequence>
  </AbsoluteFill>;
};

export const MyComposition: React.FC = () => <Composition id="AmongUs-Highlight" component={Highlight} durationInFrames={2400} fps={30} width={1920} height={1080} />;


