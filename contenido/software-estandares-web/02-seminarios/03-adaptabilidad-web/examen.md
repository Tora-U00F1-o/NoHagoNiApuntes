---
asignatura: Software y Estándares para la Web
titulo: Adaptabilidad Web — claves de examen
resumen: Lista de comprobación para repasar conceptos, detalles y errores de esta unidad.
---

# Adaptabilidad Web: claves de examen

Guía de repaso basada en los apuntes, sin garantizar qué preguntará el profesor. Estudia también tablas, código, figuras y advertencias del [desarrollo completo](?u=software-estandares-web%2Fseminarios-adaptabilidad-web). Las fechas y estados documentales se entienden según el material docente.

## Diversidad móvil

[Apartado de los apuntes](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#evolucion-desde-el-escritorio-a-la-diversidad-movil).

- **Diversidad móvil:** La adaptabilidad responde a diversidad de pantallas y dispositivos, no solo a reducir una maqueta de escritorio.
- **Cronología docente:** La cronología del PDF asocia iPhone con 2007, Android con 2008 e iPad con 2010.

## Viewport

[Apartado de los apuntes](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#viewport).

- **Viewport:** El viewport interviene en el área de representación y debe configurarse para el dispositivo.
- **Escala inicial:** La declaración de ejemplo combina width=device-width con initial-scale=1.

## Imágenes flexibles

[Apartado de los apuntes](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#evitar-desbordamientos).

- **Imágenes flexibles:** Las imágenes deben ajustarse para evitar desbordamiento conservando proporciones.
- **Proporciones:** height:auto junto con anchura flexible permite conservar proporciones de la imagen.

## Width y max-width

[Apartado de los apuntes](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#width-frente-a-max-width).

- **Width y max-width:** max-width:100% limita anchura sin forzar ampliar una imagen pequeña; width:100% ocupa el ancho indicado.

## Picture

[Apartado de los apuntes](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#versiones-alternativas-con-picture).

- **Picture:** picture permite seleccionar fuentes alternativas según condiciones mediante source y un img de reserva.
- **Orden de fuentes:** El orden y las condiciones de source importan para seleccionar versiones de imagen.

## Multimedia

[Apartado de los apuntes](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#video-y-audio).

- **Multimedia:** video y audio requieren considerar fuentes, formatos, controles y alternativas.

## Unidades relativas

[Apartado de los apuntes](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#diseno-fluido-y-sistemas-de-distribucion).

- **Unidades relativas:** Porcentajes, em, rem y unidades de viewport tienen referencias distintas.

## Modelos de distribución

[Apartado de los apuntes](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#flexbox-y-grid).

- **Modelos de distribución:** Flexbox organiza principalmente un eje y Grid filas y columnas.
- **Adaptación interna:** Flexbox y Grid pueden adaptar distribución, sin eliminar todas las necesidades de media queries.

## Estrategia

[Apartado de los apuntes](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#mobile-first).

- **Estrategia:** Mobile First parte de pantallas pequeñas y amplía progresivamente una experiencia completa.

## Umbrales

[Apartado de los apuntes](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#breakpoints).

- **Umbrales:** Los breakpoints marcan cambios de distribución y los valores del PDF son orientativos.

## Min-width

[Apartado de los apuntes](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#aplicacion-con-media-queries).

- **Min-width:** @media (min-width:768px) aplica desde ese ancho incluido, según el ejemplo.
- **Reglas base:** El comportamiento por debajo del breakpoint depende de las reglas base declaradas.
- **Condiciones de medio:** Las media queries pueden atender a ancho, alto, orientación o tipo de medio.

## Frameworks

[Apartado de los apuntes](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#frameworks-y-referencias-de-estandarizacion).

- **Frameworks:** Los frameworks facilitan técnicas y componentes, pero no son una técnica de diseño por sí mismos.
- **Referencia W3C:** El PDF cita Mobile Web Best Practices 1.0 con fecha 29 de julio de 2008.

## Herramientas históricas

[Apartado de los apuntes](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#herramientas-citadas).

- **Herramientas históricas:** El material marca Mobile Checker como suspendido; una captura no prueba disponibilidad actual de un servicio.

## Dispositivos reales

[Apartado de los apuntes](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#herramientas-y-procedimiento-de-comprobacion).

- **Dispositivos reales:** La emulación ayuda, pero el procedimiento contempla dispositivos físicos, sistemas operativos y navegadores.
- **Rendimiento:** La comprobación incluye carga de código e imágenes y limitaciones de ancho de banda.

## Interacción táctil

[Apartado de los apuntes](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#usabilidad-movil).

- **Interacción táctil:** La adaptación debe considerar legibilidad, navegación y facilidad de pulsar las acciones.
- **Pruebas y calidad:** Girar pantalla o ampliar texto son casos útiles; adaptabilidad se relaciona con usabilidad y accesibilidad.

## Casos y matices que debes justificar

- Limitar un máximo y fijar anchura no son operaciones equivalentes; debe comprobarse el caso de imagen menor que su contenedor. [Revisar](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#width-frente-a-max-width).
- Min-width incluye el umbral y las reglas base siguen siendo necesarias para los anchos donde la condición no se aplica. [Revisar](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#aplicacion-con-media-queries).
- Los breakpoints son decisiones de distribución orientadas a necesidades reales; las cifras docentes no norman dimensiones de todos los dispositivos. [Revisar](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#breakpoints).
- Picture selecciona recursos según condiciones y orden; no debe describirse como descarga y visualización simultánea obligatoria de todas las versiones. [Revisar](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#versiones-alternativas-con-picture).
- La adaptación interna de los sistemas de distribución y los cambios condicionales de diseño son mecanismos complementarios. [Revisar](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#flexbox-y-grid).
- La emulación ayuda a revisar dimensiones, pero no sustituye todo el procedimiento de dispositivos, sistemas y navegadores que describe el material. [Revisar](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#herramientas-y-procedimiento-de-comprobacion).
- La calidad adaptable incluye condiciones de carga y ancho de banda; encajar geométricamente no demuestra eficiencia de recursos. [Revisar](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#herramientas-y-procedimiento-de-comprobacion).
- Adaptar exige conservar tareas, legibilidad y facilidad de interacción; el ancho de una captura es solo una dimensión del problema. [Revisar](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#usabilidad-movil).
- Las herramientas del material deben interpretarse con sus advertencias temporales; Mobile Checker se presenta expresamente como suspendido. [Revisar](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#herramientas-citadas).
- Mobile First organiza primero lo esencial y amplía después; debe comprobarse que reorganización y priorización no se conviertan en pérdida injustificada de funcionalidad. [Revisar](?u=software-estandares-web%2Fseminarios-adaptabilidad-web#mobile-first).

## Cómo afrontar opciones combinadas

- Decide por separado si cada afirmación es verdadera, incluida su condición, cuantificador y contexto. Una fecha histórica no describe necesariamente el estado actual.
- «Todas las anteriores son correctas» exige que no haya ninguna excepción; «todas son falsas» exige que no haya ninguna verdadera.
- «Alguna es incorrecta» significa al menos una; no equivale a «todas son incorrectas» ni a «exactamente una».
- En preguntas de conjunto exacto, marca una sola opción que enumere todas y solo las verdaderas. Justifica también las falsas.
- En código, identifica primero contexto, orden, tipos, cardinalidad, nombres y límites inclusivos/exclusivos; después calcula el resultado.

## Autoevaluación

- [Test fácil: 50 preguntas](?cuestionario=software-estandares-web--seminarios-adaptabilidad-web--facil)
- [Test medio: 50 preguntas](?cuestionario=software-estandares-web--seminarios-adaptabilidad-web--medio)
- [Test difícil: 50 preguntas](?cuestionario=software-estandares-web--seminarios-adaptabilidad-web--dificil)
