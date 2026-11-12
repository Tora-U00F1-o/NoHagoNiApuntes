---
name: apuntes-calculo
description: Crea, amplía o revisa apuntes de Cálculo en el visor NoHagoNiApuntes a partir de PDF, con teoría desarrollada, notación matemática, ejemplos gráficos plegables y ejercicios con solución. Úsala para nuevos temas o subunidades de Cálculo y para reproducir el estilo de sus unidades existentes.
---

# Apuntes de Cálculo

## Fuentes y alcance

- Localiza y lee todos los PDF que correspondan al encargo. Haz un esquema por página con apartados, definiciones, hipótesis, teoremas, demostraciones, fórmulas, observaciones, ejemplos y ejercicios. Contrasta visualmente la extracción con el PDF cuando haya fracciones, radicales, sumatorios, índices, signos, tablas o diagramas.
- Sigue el orden, los nombres, la notación y las convenciones de las fuentes. Redacta la explicación con tus palabras. Desarrolla los pasos que justifican cada resultado y resuelve las ambigüedades indicando la convención usada. Si corriges una errata que cambia una fórmula o conclusión, explícalo donde se utiliza.
- Identifica la edición y las páginas en la unidad. Si hace falta completar una parte con otra fuente, identifica esa procedencia y el curso cuando se conozca. Reserva la etiqueta «Ejemplo del PDF» para ejemplos que realmente aparecen en la fuente indicada.

## Estructura del visor

Trabaja desde la raíz de NoHagoNiApuntes. Consulta [FORMATO.md](../../FORMATO.md) y el [tema de funciones reales](../../contenido/calculo/01-funciones-reales/) para usar el formato y los estilos que ya interpreta el visor.

- Usa una carpeta de tema con prefijo numérico bajo `contenido/calculo/`. Crea `_grupo.md` con la cabecera `titulo` y `orden`. Cada subunidad vive en su propia carpeta con `unidad.md` y `graficas/`.
- En `unidad.md` usa cabecera entre `---` con `id` estable en minúsculas y guiones, `asignatura: Cálculo`, `unidad` con el número del tema, `parte` con el número de subunidad, `orden`, `titulo` y `resumen`. Añade `fuente: apuntes-originales.pdf` si incluyes ese archivo junto a la unidad. Enlaza el PDF en la introducción. Para una fuente web, enlázala directamente desde la unidad.
- Usa `# N.M Título` seguido de un `## Título {#ancla-estable}` por apartado teórico. Conserva las anclas de los apartados existentes al actualizarlos.
- En cada apartado presenta la teoría, después **Ejemplos resueltos** y luego **Ejercicios para resolver**. Incluye al menos tres ejemplos nuevos con gráfica propia y solución explicada, además de los ejemplos de la fuente que correspondan. Usa `::: ejemplo Ejemplo N · Título` para plegar cada ejemplo nuevo por defecto. Usa `::: original Ejemplo del PDF · Título` para un ejemplo de la fuente, abierto por defecto y plegable.
- Incluye al menos cuatro ejercicios distintos por apartado. Deja el enunciado numerado visible y coloca su desarrollo en el bloque siguiente `::: solucion`, sin encabezado adicional. Cierra cada bloque con `:::` en una línea propia y deja una línea en blanco entre bloques y párrafos. El visor añade «Mostrar solución» y «Ocultar solución».

## Notación y diseño

- Usa `\( ... \)` para matemática en línea. Coloca las fórmulas centrales y los pasos largos en párrafos propios con una línea en blanco antes y después. Así se aplican el fondo, el margen y el espaciado matemático del visor.
- Usa `_{n+1}`, `^{n+1}` y `\frac{numerador}{denominador}` con el subconjunto de notación del visor. Escribe operadores y conjuntos en Unicode cuando proceda, como `−`, `≤`, `⇒`, `∀`, `∈`, `ℝ` y `∑`. Con `∑_{k=1}^{n}` el visor coloca ambos límites en la misma columna. Usa fórmulas independientes si una tabla quedaría estrecha en móvil. En tablas usa `∣x∣` para valores absolutos. La barra de Markdown separa columnas. Divide expresiones con fracciones anidadas en pasos sencillos si el visor presenta comandos en crudo.
- El visor colorea variables, constantes y operadores con los estilos de Cálculo. Conserva los estilos compartidos. Deja aire alrededor de las fórmulas y entre ideas. Usa tablas para contrastar hipótesis y conclusiones, listas para procedimientos y negrita para definiciones o puntos de interés.
- Usa un PNG compacto, aproximadamente de 540 px de ancho, por ejemplo. Colócalo dentro de su bloque con `![Descripción del rasgo matemático](graficas/ancla-n.png)`. Dibuja ejes y unidades legibles, una cuadrícula suave y pocas series. Como referencia, el tema 1 usa fondo claro, azul para la traza principal y magenta o verde para comparaciones. Diferencia trazas también mediante formas, rótulos o líneas discontinuas. Para sucesiones y sumas parciales representa puntos en índices enteros y distingue los términos `aₙ` de las sumas `Sₙ`. Indica qué muestra la gráfica en la explicación.
- Resuelve y comprueba de forma independiente cada ejercicio y gráfica. Haz visibles las hipótesis que habilitan cada paso. Incluye comparaciones o contraejemplos cuando aclaren qué conclusión permite aplicar un criterio.

## Verificación

Ejecuta `npm run check`, `npm test` y `npm run build`. Audita por apartado los mínimos, el texto alternativo, los enlaces a gráficas y las soluciones. Abre la unidad en el visor y comprueba el índice y sus anclas, la notación y las tablas a ancho estrecho, la carga de las gráficas, los ejemplos nuevos plegados y la apertura y el cierre independiente de las soluciones. Revisa en escritorio y móvil una muestra que cubra las fórmulas y los gráficos más exigentes. Identifica en la entrega las fuentes utilizadas y cualquier parte cuyo material de origen no hayas podido cotejar.
