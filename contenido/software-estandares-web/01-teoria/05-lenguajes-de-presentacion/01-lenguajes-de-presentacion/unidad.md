---
asignatura: Software y Estándares para la Web
titulo: Lenguajes de presentación
resumen: Introducción a los lenguajes de presentación.
fuente: 1 Lenguajes de presentación.pdf
---

# Lenguajes de presentación

## Contenido

1. [Introducción e ideas fundamentales](#introduccion-e-ideas-fundamentales)
2. [Contenido y presentación](#contenido-y-presentacion)
3. [HTML y la necesidad de controlar la apariencia](#html-y-la-necesidad-de-controlar-la-apariencia)
4. [Evolución de CSS](#evolucion-de-css)
5. [Principios de diseño de CSS](#principios-de-diseno-de-css)
6. [Preguntas de repaso](#preguntas-de-repaso)
7. [Resumen final](#resumen-final)
8. [Referencias y cobertura del documento](#referencias-y-cobertura-del-documento)

## Introducción e ideas fundamentales

Un sitio web contiene información y una forma de mostrarla. La unidad introduce los **lenguajes de presentación** a partir de esa distinción: **HTML describe el contenido** y **CSS describe su presentación**. Separar ambas responsabilidades permite modificar la apariencia sin tener que alterar el contenido del documento.

El hilo conductor del PDF comienza con los fundamentos de esa separación, muestra la evolución visual de sitios universitarios, recorre la evolución de CSS y termina con sus principios de diseño y conclusiones. Los objetivos de estudio son distinguir contenido y presentación, explicar las ventajas de separarlos, comprender la diferencia entre niveles y versiones de CSS y reconocer su organización modular.

**Fuente y alcance:** se han revisado las **20 páginas** del PDF, incluidas sus capturas y diagramas. Las fechas y estados de las especificaciones se reproducen como información del material de clase; no se han actualizado mediante fuentes externas. Las aclaraciones añadidas se identifican como **Explicación didáctica**.

[Ver presentación de la unidad](<1 Lenguajes de presentación.pdf#page=1>).

## Contenido y presentación

### Qué es el contenido

El **contenido** es la información de un sitio web. En HTML se expresa mediante títulos, párrafos, tablas, listas, imágenes y otros elementos del documento. La elección de estos elementos describe la organización de esa información.

### Qué es la presentación

La **presentación** define cómo se muestra visualmente el contenido. CSS permite determinar, entre otros aspectos, los colores, los tipos de letra o fuentes y la disposición de los elementos.

| Aspecto | Contenido | Presentación |
|---|---|---|
| Responsabilidad | Describir la información del sitio | Definir cómo se muestra esa información |
| Lenguaje asociado | HTML | CSS |
| Ejemplos del PDF | Títulos, párrafos, tablas, listas e imágenes | Colores, fuentes y disposición |

**Explicación didáctica:** que un texto sea un encabezado pertenece a la descripción del contenido; la elección de su fuente o color pertenece a la presentación. Esta distinción permite razonar sobre cada responsabilidad por separado.

[Ver diapositiva 3](<1 Lenguajes de presentación.pdf#page=3>).

### Ventajas de separar ambas responsabilidades

La separación facilita el **mantenimiento**: los cambios visuales pueden realizarse sin modificar la información. También permite **reutilizar el contenido**, mejora la **accesibilidad**, reduce la **duplicación de código** y facilita la **adaptación a distintos dispositivos**.

La figura de la diapositiva 4 relaciona documentos HTML y XML con varias hojas CSS y con su visualización en ordenador, tableta y móvil. Su propósito es mostrar que contenido, estilos y dispositivo de salida son partes diferenciadas de la presentación final. La misma idea reaparece entre los principios de diseño: una hoja de estilo puede aplicarse a múltiples documentos y la presentación puede adaptarse a diferentes dispositivos.

[Ver ventajas y esquema](<1 Lenguajes de presentación.pdf#page=4>).

## HTML y la necesidad de controlar la apariencia

### Ejemplos originales de descripción de documentos

HTML se diseñó para **describir documentos**. La diapositiva 5 muestra cuatro construcciones: encabezados, párrafos, listas e hipervínculos.

**Origen:** ejemplos originales de la diapositiva 5.

```html
<h1>Universidad de Oviedo</h1>

<p>Pública y de calidad, UniOvi te ofrece más de 120 títulos
en una completa oferta académica.</p>

<ul>
    <li>Grados</li>
    <li>Másteres</li>
</ul>

<a href=https://www.uniovi.es/ title=“página principal de la Universidad de Oviedo”>Universidad de Oviedo</a>
```

El encabezado identifica el título del contenido; el párrafo contiene la descripción de la oferta académica; la lista agrupa «Grados» y «Másteres»; el hipervínculo presenta un acceso a la Universidad de Oviedo. La captura que acompaña el código muestra esos elementos con una presentación sencilla: título, párrafo, lista y enlace uno tras otro. El ejemplo demuestra que la estructura informativa ya está descrita aunque no se haya definido un diseño visual elaborado.

::: aviso Transcripción del enlace original
El atributo `title` aparece con comillas tipográficas `“ ”` en la diapositiva. Se conserva aquí para no corregir silenciosamente el ejemplo. Al reutilizarlo como código, esas comillas deben sustituirse explícitamente por comillas rectas. El PDF no desarrolla las consecuencias de esta errata.
:::

[Ver código y resultado](<1 Lenguajes de presentación.pdf#page=5>).

### Por qué apareció la necesidad de un lenguaje de presentación

Con el crecimiento de la Web surgió la necesidad de controlar la apariencia de los contenidos: **cambiar colores**, utilizar diferentes **tipografías**, controlar los **márgenes** y **organizar visualmente los elementos**. El PDF ilustra esa necesidad con una captura de la web de la Universidad de Oviedo fechada el 25/01/1999.

La evolución visual se desarrolla en dos comparaciones de capturas. No son ejemplos de código ni demuestran qué reglas CSS se utilizaron; permiten observar cambios en la organización, la navegación, los colores, las imágenes y la jerarquía visual de los sitios.

| Figura | Capturas y fechas que aparecen | Qué se observa |
|---|---|---|
| Web de la Universidad de Oviedo, página 7 | 25/01/1999; 24/04/2005; 01/06/2021; 30/07/2026 | Desde una distribución con numerosos enlaces y bloques de texto hasta portadas con imágenes grandes, navegación y contenido destacado |
| Web de la escuela, página 8 | 24/12/1997; 09/07/2012; 17/02/2011; 30/07/2026 | Diferentes composiciones de cabeceras, menús, enlaces, fotografías e información académica |

**Limitación del material:** la página 8 coloca las capturas de 2012 y 2011 sin un orden cronológico estricto; se conservan sus fechas, sin deducir una secuencia que la figura no establece. En esa página, la captura reciente corresponde visualmente a la Escuela de Ingeniería Informática, aunque el rótulo de la fuente muestra `www.uniovi.es`. Los textos pequeños de las capturas no constituyen una explicación técnica adicional y no todos son legibles con precisión.

[Ver necesidad de controlar la apariencia](<1 Lenguajes de presentación.pdf#page=6>), [comparación de la Universidad](<1 Lenguajes de presentación.pdf#page=7>) y [comparación de la escuela](<1 Lenguajes de presentación.pdf#page=8>).

## Evolución de CSS

### Niveles en lugar de versiones

El documento subraya que en CSS se habla de **Levels, o niveles**, y no de versiones. Cada nivel se construye sobre el anterior: refina definiciones y añade características. Así, presenta las características de un nivel superior como un **superconjunto** de las de un nivel inferior.

La figura de la diapositiva 10 representa CSS1, CSS2 y sus revisiones como documentos y CSS3 como un documento compuesto por varios módulos. El cambio de representación anticipa el paso desde las especificaciones monolíticas a la arquitectura modular.

[Ver niveles y esquema de evolución](<1 Lenguajes de presentación.pdf#page=10>).

### CSS Level 1

**CSS Level 1** fue el primer estándar CSS. El PDF destaca tres ámbitos: **colores, tipografía y márgenes**. Su publicación se identifica como **Recomendación (REC) del 17/12/1996**.

[Ver diapositiva 11](<1 Lenguajes de presentación.pdf#page=11>).

### CSS Level 2 y sus revisiones

**CSS Level 2** se publicó como Recomendación y amplió las posibilidades de diseño con posicionamiento y nuevos tipos de medios. La detección de numerosos problemas dio lugar a revisiones, en lugar de resolverlos únicamente mediante una lista de erratas, que resultaba demasiado extensa.

| Especificación | Fecha recogida en el PDF | Estado recogido en el PDF | Relación |
|---|---|---|---|
| CSS Level 1 | 17/12/1996 | REC | Primer estándar CSS |
| CSS Level 2 | 12/05/1998 | REC | Amplía posicionamiento, medios y diseño |
| CSS 2.1 | 07/06/2011 | REC | Revisión 1 de CSS Level 2 |
| CSS 2.2 | 12/04/2016 | WD | Revisión 2 de CSS Level 2 |

Las siglas **REC** y **WD** son los estados que aparecen en las diapositivas. Se recogen como parte del recorrido histórico presentado por el profesor.

[Ver CSS2 y revisiones](<1 Lenguajes de presentación.pdf#page=12>).

### CSS Level 3 y la arquitectura modular

**CSS Level 3** utiliza CSS 2.1 como núcleo y se construye **módulo a módulo**. En lugar de un único documento monolítico, existen muchos documentos diferentes que agregan funcionalidad y refinan definiciones, sin contradecir CSS 2.1.

El nivel inicial de cada módulo depende de su relación con CSS 2.1:

- Los módulos que **no existían en CSS 2.1** comienzan en el **nivel 1**.
- Los módulos que **actualizan contenido de CSS 2.1** comienzan en el **nivel 3** y pueden alcanzar el nivel 4 o superior.

La denominación **CSS3** sirve para distinguir esta organización modular de las especificaciones monolíticas anteriores, CSS1 y CSS2. No significa que todos los módulos deban tener el mismo número de nivel.

[Ver arquitectura modular](<1 Lenguajes de presentación.pdf#page=13>).

### Por qué no existe un CSS Level 4 global

El PDF indica que **CSS Level 4 y siguientes no existen como especificaciones globales**. Son los módulos independientes los que pueden alcanzar el nivel 4 o niveles superiores. Los ejemplos citados son **[CSS-COLOR-4]** y **[SELECTORS-4]**.

**Explicación didáctica:** decir que un módulo de color o de selectores está en nivel 4 no equivale a afirmar que toda la tecnología CSS haya pasado conjuntamente a un «CSS4». La evolución de cada módulo es independiente.

[Ver diapositiva 14](<1 Lenguajes de presentación.pdf#page=14>).

## Principios de diseño de CSS

La diapositiva 16 reúne ocho principios. Todos se relacionan con la separación de responsabilidades y con la posibilidad de reutilizar y adaptar la presentación.

| Principio | Desarrollo según el documento |
|---|---|
| **Separación entre contenido y presentación** | El contenido se define en HTML y la apariencia mediante CSS |
| **Compatibilidad entre navegadores** | Los documentos deben funcionar en diferentes navegadores y versiones |
| **Independencia de dispositivo, plataforma o agente** | Un mismo documento puede visualizarse en ordenadores, tabletas y móviles |
| **Mantenibilidad** | Es posible modificar el estilo sin alterar el contenido |
| **Flexibilidad y reutilización** | Una misma hoja de estilo puede aplicarse a múltiples páginas o documentos |
| **Accesibilidad** | La presentación se adapta a diferentes usuarios, dispositivos y tecnologías de apoyo |
| **Simplicidad de uso** | CSS dispone de una sintaxis relativamente simple y fácil de aprender |
| **Evolución continua mediante módulos** | Los módulos incorporan funcionalidades manteniendo la compatibilidad con lo anterior |

La **mantenibilidad** se centra en facilitar los cambios; la **reutilización**, en aplicar estilos a múltiples documentos; la **independencia de dispositivo**, en permitir distintas salidas; y la **accesibilidad**, en atender a diferentes usuarios y tecnologías de apoyo. Son aspectos relacionados, pero el PDF los presenta como principios diferenciados.

[Ver principios de diseño](<1 Lenguajes de presentación.pdf#page=16>).

## Preguntas de repaso

Las siguientes preguntas son de elaboración didáctica y se responden exclusivamente con el contenido de la unidad.

::: pregunta ¿Qué diferencia hay entre contenido y presentación?
El contenido es la información del sitio, descrita mediante HTML: títulos, párrafos, tablas, listas o imágenes. La presentación define cómo se muestra esa información, mediante CSS: colores, fuentes y disposición.
:::

::: pregunta ¿Qué cinco ventajas tiene separar contenido y presentación?
Facilita el mantenimiento, permite reutilizar el contenido, mejora la accesibilidad, reduce la duplicación de código y facilita la adaptación a distintos dispositivos.
:::

::: pregunta ¿Qué muestran los ejemplos HTML de la diapositiva 5?
Un encabezado con el nombre de la Universidad, un párrafo sobre su oferta académica, una lista de grados y másteres y un hipervínculo. Describen la estructura informativa sin definir un diseño visual elaborado.
:::

::: pregunta ¿Por qué CSS habla de niveles y qué relación existe entre ellos?
Cada nivel refina las definiciones del anterior y añade características. El PDF presenta un nivel superior como un superconjunto del inferior.
:::

::: pregunta ¿Qué diferencia existe entre CSS2, CSS 2.1 y CSS 2.2?
CSS2 es el segundo nivel. CSS 2.1 y CSS 2.2 son sus revisiones 1 y 2. El documento recoge CSS2 y CSS 2.1 como Recomendaciones y CSS 2.2 como WD, con las fechas indicadas en la tabla histórica.
:::

::: pregunta ¿Todos los módulos introducidos con la arquitectura de CSS3 empiezan en el nivel 3?
No. Los módulos nuevos que no existían en CSS 2.1 comienzan en nivel 1. Los que actualizan contenido de CSS 2.1 comienzan en nivel 3 y pueden avanzar a niveles superiores.
:::

::: pregunta ¿Por qué un módulo Selectors de nivel 4 no implica que exista CSS4?
Porque los módulos evolucionan de forma independiente. El PDF niega la existencia de un nivel 4 global de CSS y cita CSS-COLOR-4 y SELECTORS-4 como ejemplos de niveles de módulos concretos.
:::

::: practica Relacionar decisiones con principios de CSS
**Origen:** ejercicio didáctico. Relaciona estas decisiones con los principios del PDF: aplicar una hoja a muchas páginas; cambiar colores sin tocar el texto; adaptar la salida a móvil; atender a tecnologías de apoyo.

**Resolución:** corresponden, respectivamente, a flexibilidad y reutilización; mantenibilidad y separación entre contenido y presentación; independencia de dispositivo; y accesibilidad. Varias decisiones pueden contribuir a más de un principio.
:::

## Resumen final

**HTML describe el contenido y CSS describe la presentación.** CSS nació para separar información y apariencia y se convirtió en el estándar para definir la presentación de documentos web. La separación permite mantener y reutilizar el contenido y los estilos, reducir duplicaciones y adaptar la salida a usuarios y dispositivos diferentes.

La evolución comienza con CSS1, continúa con CSS2 y sus revisiones y desemboca en una **arquitectura modular**. El término CSS3 distingue esa arquitectura de las especificaciones monolíticas anteriores. Los módulos tienen niveles propios; no existe un CSS4 global. Los principios de diseño añaden compatibilidad, independencia de plataforma o agente, accesibilidad, simplicidad y evolución compatible.

[Ver conclusiones originales](<1 Lenguajes de presentación.pdf#page=18>).

## Referencias y cobertura del documento

- [Documento teórico original](<1 Lenguajes de presentación.pdf>), material de la Universidad de Oviedo, Dra. B. Cristina Pelayo García-Bustelo.
- [Página de referencia del W3C para CSS](https://www.w3.org/Style/CSS/), citada en las páginas 14 y 20.
- [Lista de módulos y estado de los trabajos CSS](https://www.w3.org/Style/CSS/current-work), citada en la página 14.
- [CSS Level 1, recomendación fechada en 1996](https://www.w3.org/TR/REC-CSS1-961217.html), citada en la página 11.
- [CSS Level 2](https://www.w3.org/TR/REC-CSS2/), [CSS 2.1](https://www.w3.org/TR/CSS21/) y [CSS 2.2](https://www.w3.org/TR/CSS22/), citadas en la página 12.
- [Internet Archive](https://web.archive.org/), fuente indicada en las capturas históricas de las páginas 6 a 8; [Universidad de Oviedo](https://www.uniovi.es/), fuente rotulada para las capturas del 30/07/2026.

Los enlaces externos anteriores se recogen por estar citados en el PDF; no se han utilizado para ampliar la teoría.

| Páginas revisadas | Contenido incorporado |
|---|---|
| 1-2 | Portada e inicio de fundamentos |
| 3-4 | Definiciones, ventajas y esquema de separación |
| 5 | Cuatro ejemplos HTML y su resultado visual |
| 6-8 | Necesidad de controlar la apariencia y comparaciones históricas |
| 9-14 | Inicio de evolución, niveles, CSS1, CSS2, revisiones y módulos |
| 15-16 | Inicio y desarrollo de los ocho principios de diseño |
| 17-18 | Inicio de conclusión y conclusiones originales |
| 19-20 | Inicio de referencias y recurso del W3C |

**Comprobación final:** 20 de 20 páginas analizadas; ejemplos originales incorporados; sin ejemplos de código nuevos; preguntas y un ejercicio didácticos identificados. Se han descrito las figuras. Las limitaciones son la legibilidad de detalles pequeños de las capturas, las particularidades de sus rótulos y fechas y las comillas del enlace HTML original, señaladas en sus apartados.
