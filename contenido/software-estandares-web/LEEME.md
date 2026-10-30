# Software y Estándares para la Web: apuntes y resúmenes

## Alcance de la entrega

Se han completado **12 unidades**: Diseño con estándares, Lenguajes de marcado, las seis unidades de Tecnologías XML y los cuatro seminarios, incluido Accesibilidad Web. Se mantienen los cuatro desarrollos ya existentes de HTML y presentación/CSS.

Las **16 unidades de teoría y seminarios** disponen de `unidad.md`, PDF original, `resumen.md` y `examen.md`. Las siete carpetas de prácticas quedan fuera por indicación del usuario.

Los resúmenes ofrecen tablas y distinciones clave, código y fechas cuando el material los proporciona. Están pensados para una primera lectura antes de estudiar los apuntes completos; su extensión se adapta al contenido de cada unidad.

## Fuentes y cobertura

| Unidad | Páginas del PDF | Trabajo |
|---|---:|---|
| [Diseño con estándares](01-teoria/01-diseno-con-estandares/unidad.md) | 55 | Desarrollo completo y resumen |
| [Lenguajes de marcado](01-teoria/02-lenguajes-de-marcado/unidad.md) | 14 | Desarrollo completo y resumen |
| [Introducción a XML](01-teoria/03-tecnologias-xml/01-introduccion-xml/unidad.md) | 109 | Desarrollo completo y resumen |
| [DTDs](01-teoria/03-tecnologias-xml/02-dtds/unidad.md) | 69 | Desarrollo completo y resumen |
| [Schemas](01-teoria/03-tecnologias-xml/03-schemas/unidad.md) | 130 | Desarrollo completo y resumen |
| [XPath](01-teoria/03-tecnologias-xml/04-xpath/unidad.md) | 35 | Desarrollo completo y resumen |
| [XSLT](01-teoria/03-tecnologias-xml/05-xslt/unidad.md) | 148 | Desarrollo completo y resumen |
| [Procesamiento de XML](01-teoria/03-tecnologias-xml/06-procesamiento-xml/unidad.md) | 126 | Desarrollo completo y resumen |
| [HTML](01-teoria/04-lenguajes-de-marcado-html/unidad.md) | 180 | Apuntes existentes y nuevo resumen |
| [Lenguajes de presentación](01-teoria/05-lenguajes-de-presentacion/01-lenguajes-de-presentacion/unidad.md) | 20 | Apuntes existentes y nuevo resumen |
| [CSS](01-teoria/05-lenguajes-de-presentacion/02-css/unidad.md) | 98 | Apuntes existentes y nuevo resumen |
| [Posicionamiento CSS](01-teoria/05-lenguajes-de-presentacion/03-css-posicionamiento/unidad.md) | 69 | Apuntes existentes y nuevo resumen |
| [Usabilidad, parte 1](02-seminarios/01-usabilidad-web-parte1/unidad.md) | 63 | Desarrollo completo y resumen |
| [Usabilidad, parte 2](02-seminarios/02-usabilidad-web-parte2/unidad.md) | 67 | Desarrollo completo y resumen |
| [Adaptabilidad](02-seminarios/03-adaptabilidad-web/unidad.md) | 64 | Desarrollo completo y resumen |
| [Accesibilidad](02-seminarios/04-accesibilidad-web/unidad.md) | 142 | Desarrollo completo, seis figuras originales, resumen, claves y tres test |

El conjunto de fuentes suma **1.389 páginas**. Los doce desarrollos completados corresponden a **1.022 páginas analizadas**, incluidas sus figuras, tablas y capturas. Cada unidad incluye índice, objetivos, teoría, comparaciones, repaso y referencias con páginas. No se han utilizado fuentes externas para ampliar la teoría.

## Ejemplos y límites

- XML: pizzas, libros y poemas; árboles DOM; vocabularios KML, SVG y WaterML.
- DTD/XSD: gramáticas, atributos, entidades, namespaces, facetas, RGB, claves, recetas y artículos.
- XPath/XSLT: biblioteca, ElementTree/lxml, poemas, música, artículos, recetas y transformaciones de estructura.
- Procesamiento: lectores y DOM de C#, LINQ, Python, AJAX meteorológico y generación de KML/SVG.
- Seminarios: interpretación de capturas e interfaces; pequeños fragmentos didácticos de navegación y diseño adaptable.

Se enlazan los archivos originales y se insertan los fragmentos pertinentes junto a la teoría. Los ejemplos añadidos se identifican como didácticos. Los archivos originales no se modifican ni ejecutan.

Las erratas o diferencias entre diapositiva y archivo se explican expresamente: cierres, nombres de atributos, contexto XPath, consultas escalares, constantes de año, intervalos y salidas sin raíz común, entre otras. Las capturas antiguas no se presentan como funcionamiento actual de servicios o navegadores. Cuando el material no precisa una fecha, resultado o comportamiento, se señala el límite en lugar de completarlo con teoría externa. No se deducen fechas de examen: los seminarios remiten a la planificación del Campus Virtual.

## Lectura desde la web

Cada una de las **16 unidades de teoría y seminarios** incluye `examen.md` y una carpeta `test/` con `facil.csv`, `medio.csv` y `dificil.csv`: **48 test de 50 preguntas, 2.400 en total**. Las prácticas no se incluyen. Los test tienen una sola respuesta correcta, explicaciones y referencias a apartados exactos. El nivel difícil combina diez casos explícitos con preguntas de conjuntos y cantidades de afirmaciones verdaderas/falsas.

El visor ofrece **Claves de examen** y **Test de esta unidad**. El selector general permite buscar, filtrar por asignatura, unidad o dificultad y ver juntos los niveles en orden. Los tres cuestionarios HTML anteriores se guardan en `test/anteriores/` dentro de HTML y conservan sus identificadores históricos.

Las claves se comparten con `?u=asignatura%2Funidad&vista=examen`. Para regenerar bancos y guías: `npm run generate:sew-tests`; para verificarlos: `npm test`, `npm run check` y `npm run build`.

El catálogo detecta `resumen.md` automáticamente. El botón **Resumen** abre ese documento y cambia a **Apuntes completos** para regresar. Sin archivo, el botón permanece oculto. La dirección `?u=asignatura%2Funidad&vista=resumen` permite compartir o recargar un resumen.

PDF, imágenes y ejemplos se resuelven desde la carpeta de la unidad, también al servir la web bajo una subcarpeta de GitHub Pages.

## Comprobaciones y paquete

Accesibilidad Web añade un paquete local `apuntes-accesibilidad-web.zip`, con los tres documentos de estudio, el PDF original sin cambios, las seis figuras y los tres CSV. Se han señalado los límites y discrepancias de las diapositivas sobre lenguas de signos, versiones normativas y herramientas. El generador conserva sus fichas y casos en `scripts/sew-banks/seminarios-accesibilidad-web*.txt`.

La revisión inicial de las unidades anteriores incluyó las comprobaciones siguientes:

- Cabeceras originales conservadas; nuevas cabeceras de resumen válidas.
- 30 documentos comprobados: 15 apuntes y 15 resúmenes.
- 787 enlaces relativos a archivos existentes, incluidos 582 enlaces a páginas de PDF dentro de sus límites.
- `npm test`, `npm run check` y `npm run build`.
- Revisión con Chrome: las 30 vistas, alternancia de documentos, recarga del resumen, ausencia de botón sin resumen, navegación rápida y rutas bajo `/curso/`; sin errores JavaScript.
- Revisión de presentación en escritorio y móvil.

El paquete `apuntes-software-estandares-web.zip`, generado en la raíz del repositorio, incluye teoría, seminarios, resúmenes, PDF y materiales de ejemplo con sus nombres y rutas originales. Excluye prácticas, ZIP previos y directorios de compilación `bin/obj`. El ZIP es un artefacto local ignorado por Git; la publicación web se genera desde los Markdown y los recursos de `contenido/`.
