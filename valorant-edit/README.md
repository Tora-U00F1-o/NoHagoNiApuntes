# Guarda la OP — proyecto editable de Remotion

## Entrega
- `out/guarda-la-op-final.mp4`: 1080 × 1920, 60000/1001 FPS (59,94), H.264, AAC.
- `src/Root.tsx`: montaje, puntos de corte, encuadres y subtítulos editables.
- `src/style.css`: tipografía, posición, acento verde menta y márgenes.
- `public/source.mp4`: copia sin modificar del original aportado.
- `public/background.mp4`: derivado desenfocado para el fondo, a los FPS originales.
- `public/mix.wav`: mezcla estéreo nivelada del audio original.
- `out/guarda-la-op.srt`: subtítulos externos con los tiempos del montaje.
- `analysis/edit-decisions.json`: correspondencia entre original y montaje.

## Abrir y exportar
Requiere Node.js 22.13 o superior y npm. Desde esta carpeta:

```powershell
npm ci
npm run dev
npm run render
```

Seleccionar `GuardaLaOP` en Studio. La exportación no genera fotogramas por interpolación.

En este equipo se reutilizan las dependencias ya instaladas del proyecto vecino mediante una unión de directorios. El ZIP no contiene node_modules; `npm ci` instala sus propias dependencias.

## Criterio de edición
Se revisaron láminas del original a intervalos de 2 segundos, la primera muerte a intervalos de 0,25 segundos y el desenlace a intervalos de 0,5 segundos. La secuencia seleccionada empieza con la aparición del enemigo y la muerte del portador de la Operator, pasa al compañero y termina después de recoger el arma, recargar y morir ante el último enemigo. No es una victoria ni un clutch, y no se presenta como tal.

Se recortan el inicio de la grabación, esperas apuntando, la colocación del humo, parte de la cámara del cadáver y el final al cambiar de espectador. Los tres clips conservan velocidad normal y orden cronológico. No hay música ni efectos añadidos. La mezcla original es una sola pista estéreo; no hay pistas separadas de voz y juego para equilibrarlas de manera independiente.

El original es horizontal 1920 × 1080. La vista superior mantiene todo el cuadro, minimapa y HUD. La inferior amplía la acción aproximadamente 1,5 veces respecto a esa vista y sigue brevemente al enemigo del cierre. El fondo se oscurece y desenfoca. No hay facecam en el material.

## Transcripción y límites de revisión
Whisper WebGPU produjo texto repetitivo no fiable y fue descartado. Se contrastaron transcripciones locales con faster-whisper small y medium, incluido un pase de las voces finales con filtro de banda. Se conservaron las frases reconocibles relacionadas con la OP y el aviso de un enemigo. Las frases superpuestas o de reconocimiento dudoso no se completaron por conjetura y no llevan subtítulo. Los resultados automáticos se conservan en `analysis/` para revisión.

La comprobación visual se realizó con Studio y fotogramas renderizados. No se ha realizado una escucha humana del audio ni una revisión humana palabra por palabra; la transcripción y la sincronía verbal deben considerarse automáticas. No se afirma esa revisión auditiva. Se comprueban técnicamente códecs, resolución, frecuencia, decodificación y niveles del archivo final.

