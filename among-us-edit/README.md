# Among Us · El plan era perfecto…

Montaje editable en Remotion, 1920 × 1080, 30 fps, 80 segundos.

La apertura añade el gameplay de 00:20–00:34 del original, con zoom hacia el cuerpo en la kill (aproximadamente 00:29,6), seguido del reporte. Después se ha seleccionado el tramo **02:22,400–02:58,300** del original: acuerdo de votación, expulsión y reacción al cambiaformas. Incluye subtítulos en español con entrada animada, tres rótulos, acercamientos y cierre en negro. Se combinan las pistas de sonido del sistema y micrófono con limitador.

## Vista previa

```powershell
cd 'D:/Ingenieria/INGEN/2627/NoHagoNiApuntes/among-us-edit'
npx remotion studio --no-open
```

Abrir http://localhost:3000/AmongUs-Highlight. La composición se llama `AmongUs-Highlight`.

## Subtítulos

Los subtítulos se generaron localmente con Whisper y se ajustaron comparando transcripciones. Las voces solapadas y los nombres propios pueden necesitar corrección al escucharlos. Dos intervenciones poco claras se indican como `[Voces superpuestas]`.

- `src/Composition.tsx`: montaje y subtítulos editables en línea.
- `public/captions.json`: subtítulos con tiempos relativos al original.
- `public/highlight.es.srt`: subtítulos con tiempos relativos al recorte.
- `src/basic-captions.tsx`: componente oficial de Remotion sin modificar; su color se aplica desde el contenedor.
- `out/preview-plan.png` y `out/preview-twist.png`: fotogramas de comprobación.
- `public/gameplay.mp4`: copia de trabajo compatible con navegador, con audio combinado. El original permanece en su ubicación de NVIDIA.

## Voces y efecto de expulsión

Los subtítulos usan seis colores pastel estables según la voz detectada automáticamente. No se asocian nombres ni colores de personajes a las voces. Las intervenciones superpuestas se muestran en gris; la identificación automática puede confundir intervenciones muy cortas o solapadas.

- `src/speakers.ts` y `public/speakers.json`: turnos detectados y colores, con tiempos relativos al original.
- `public/wilhelm-scream.wav`: grito Wilhelm de la biblioteca de efectos de Remotion (`https://remotion.media/wilhelm-scream.wav`).
- Efecto a **01:04,300 del montaje / 02:42,600 del original**, al entrar el personaje expulsado. Volumen del efecto al 65 %, con bajada suave del audio original al 50 % durante el grito.

La diarización local utiliza Sherpa-ONNX y modelos de segmentación y embeddings publicados por el proyecto: https://k2-fsa.github.io/sherpa/onnx/speaker-diarization/index.html.

## Exportar cuando se desee

```powershell
npx remotion render AmongUs-Highlight out/among-us-highlight.mp4 --codec=h264
```

## Comprobaciones

`npm run lint` comprueba ESLint y TypeScript. Se han renderizado dos fotogramas para revisar encuadre y subtítulos. La vista previa queda disponible en Studio; el montaje final todavía no se ha exportado a MP4.

## Ampliación de conversación

Tras el gameplay se incluyen 01:14,200–01:41,200 del original (acusación a Eloy y explicación de electricidad/cámaras) y 02:06,900–02:10,000 (defensa), antes de la resolución existente. Total: 80 segundos. Los subtítulos aumentan su rebote de entrada con la intensidad acústica de la frase y añaden una vibración breve en las intervenciones más fuertes. La envolvente se calcula localmente del audio original cada 50 ms; puede responder también a voces solapadas o sonidos de juego.
