---
asignatura: Software y Estándares para la Web
titulo: Adaptabilidad Web
resumen: Adaptabilidad de las páginas web.
fuente: 3-Adaptabilidad-Web.pdf
---

# Adaptabilidad Web

## Contenido

1. [Introducción y objetivos](#introduccion-y-objetivos)
2. [Evolución desde el escritorio a la diversidad móvil](#evolucion-desde-el-escritorio-a-la-diversidad-movil)
3. [Viewport](#viewport)
4. [Imágenes y contenido flexible](#imagenes-y-contenido-flexible)
5. [Diseño fluido y sistemas de distribución](#diseno-fluido-y-sistemas-de-distribucion)
6. [Mobile First, breakpoints y media queries](#mobile-first-breakpoints-y-media-queries)
7. [Frameworks y referencias de estandarización](#frameworks-y-referencias-de-estandarizacion)
8. [Herramientas y procedimiento de comprobación](#herramientas-y-procedimiento-de-comprobacion)
9. [Usabilidad móvil](#usabilidad-movil)
10. [Evaluación y preguntas de repaso](#evaluacion-y-preguntas-de-repaso)
11. [Resumen final](#resumen-final)
12. [Referencias y cobertura](#referencias-y-cobertura)

## Introducción y objetivos

El **diseño web adaptable**, *Responsive Web Design*, permite que una misma aplicación ajuste automáticamente su distribución a diferentes dispositivos y tamaños de pantalla. Su objetivo es ofrecer una experiencia adecuada al medio de acceso y aplicar los principios de usabilidad y UX.

Para las personas, el PDF destaca legibilidad, navegación e interacción táctil; para desarrolladores y organizaciones, un único sitio, menor mantenimiento, mayor alcance y accesibilidad. La unidad estudia viewport, contenido flexible, unidades relativas, Flexbox/Grid, Mobile First y media queries, y termina con comprobación y uso móvil.

[Ver definición y ventajas](3-Adaptabilidad-Web.pdf#page=4).

## Evolución desde el escritorio a la diversidad móvil

Hasta mediados de los años 2000 predominan escritorio, teclado/ratón, resoluciones como **640 × 480** y **800 × 600**, y diseños de ancho fijo. La captura de la página 8 utiliza una referencia de archivo web de **24/04/2005** para ilustrar un diseño destinado principalmente a ordenador personal.

La presentación sitúa la revolución móvil tras **2007** y enumera primer iPhone en **2007**, primeros dispositivos Android en **2008** y primer iPad en **2010**. La línea sobre Android agrupa teléfonos y tabletas: se reproduce como cronología del PDF, sin desglosar modelos ni ampliar fechas externas.

Las figuras de las páginas 9–10 muestran distintos tamaños y orientaciones. El cambio relevante es pasar de un dispositivo predominante a un mismo sitio que debe funcionar en diversos espacios y con interacción táctil. «Un desarrollo» no significa «una distribución fija».

[Ver evolución](3-Adaptabilidad-Web.pdf#page=7).

## Viewport

El **viewport** es el área visible de una página en el dispositivo y determina cuánto contenido puede mostrarse simultáneamente. El PDF presenta el metadato HTML que indica dimensiones y escalado:

```html title="Configuración de la página 15"
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

`width=device-width` indica usar el ancho del dispositivo para la visualización; `initial-scale=1.0` fija la escala inicial. El bloque muestra comillas rectas; en la diapositiva aparece una comilla tipográfica de cierre. Las figuras 13 y 16 contrastan escritorio, tableta y móvil y una vista reducida de la página frente a una distribución adecuada a pantalla pequeña.

**Explicación didáctica:** declarar viewport es parte de la configuración; el contenido y las reglas de distribución todavía deben poder ajustarse. El metadato por sí solo no cambia un ancho fijo de 1200 px.

[Ver viewport](3-Adaptabilidad-Web.pdf#page=14).

## Imágenes y contenido flexible

### Evitar desbordamientos

Una imagen de ancho fijo puede exceder el espacio disponible. La propuesta del PDF utiliza un límite relativo y altura automática:

```css title="Imagen flexible del PDF"
img {
  max-width: 100%;
  height: auto;
}
```

El objetivo es evitar desplazamiento horizontal, conservar proporciones y mantener la imagen dentro del espacio disponible. La altura automática acompaña al cambio de ancho.

### width frente a max-width

| Caso del PDF | `width: 100%` | `max-width: 100%` con tamaño natural del ejemplo |
|---|---|---|
| Imagen 300 px, contenedor 500 px | La imagen ocupa 500 px | Mantiene 300 px |
| Imagen 300 px, contenedor 250 px | Se ajusta a 250 px | Se limita a 250 px |

`width` fija el ancho utilizado; `max-width` establece un límite. En el ejemplo, la segunda opción no obliga a ampliar una imagen pequeña para llenar un contenedor mayor. La figura 22 representa el mismo plano aéreo dentro de ambos tamaños.

**Precisación del original:** la página 20 dice que la imagen puede «deformarse» al ampliarla. Con `height:auto`, el ejemplo mantiene la proporción; la diferencia demostrada en la figura es la ampliación por encima del tamaño natural. Se conserva la advertencia sobre ampliar sin confundirla con cambiar obligatoriamente la proporción.

### Versiones alternativas con picture

La página 23 ofrece variantes de una imagen para umbrales de 600 y 1024 px:

```html title="picture de la página 23"
<picture>
  <source media="(max-width: 600px)" srcset="bora-mobile.jpg">
  <source media="(max-width: 1024px)" srcset="bora-tablet.jpg">
  <img src="BoraBora.jpg"
       alt="Vista aérea de la laguna de Bora Bora, Polinesia Francesa"
       width="800" height="533">
</picture>
```

La primera alternativa cubre el rango pequeño; la segunda, el siguiente; `img` ofrece el recurso general y texto alternativo. Las imágenes se mencionan en el código del PDF, **no están adjuntas a esta carpeta**: el fragmento explica la selección de recursos sin ofrecer un paquete ejecutable con fotografías inexistentes.

La página 24 usa un detalle de la EII para móvil y una imagen general para pantallas mayores. Las figuras muestran que adaptar una imagen también puede significar **elegir un encuadre apropiado**, además de redimensionar el mismo recurso.

### Vídeo y audio

El vídeo aplica las mismas dos estrategias de ancho que las imágenes y mantiene `height:auto`. Para audio, el reproductor tiene controles de tamaño relativamente fijo y el PDF combina ancho completo con un máximo:

```css title="Multimedia del PDF"
video {
  max-width: 100%;
  height: auto;
}

audio {
  width: 100%;
  max-width: 600px;
}
```

No se fuerza el alto del reproductor de audio. El límite impide que crezca indefinidamente en una pantalla grande.

[Ver imágenes](3-Adaptabilidad-Web.pdf#page=18) · [Ver picture](3-Adaptabilidad-Web.pdf#page=23) · [Ver vídeo y audio](3-Adaptabilidad-Web.pdf#page=25).

## Diseño fluido y sistemas de distribución

Un **diseño fluido** usa medidas relativas y elementos que crecen o disminuyen según el espacio disponible. El PDF contrasta `.contenedor { width:1200px; }` con `.contenedor { width:90%; }` para reducir desbordamientos y facilitar varios dispositivos.

La metáfora visual «el contenido es como el agua» de la página 27 expresa que la información puede conservarse mientras cambia la forma del recipiente. No se trata de escalar toda la página como una imagen.

| Unidad | Referencia indicada en el PDF | Ejemplo |
|---|---|---|
| `%` | Contenedor | `width:80%` |
| `em` | Tamaño de fuente en el contexto de los elementos | `font-size:1.2em` |
| `rem` | Tamaño de fuente de la raíz | `font-size:1rem` |
| `vw` | Porcentaje del ancho del viewport | `width:50vw` |
| `vh` | Porcentaje del alto del viewport | `height:100vh` |

La página 29 presenta `em` como relativo a la fuente del padre y destaca que `rem` evita encadenamientos de escalado de elementos anidados. El ejemplo de `em` es precisamente `font-size`; la tabla se mantiene en ese alcance sin generalizar todas las propiedades que pueden utilizar la unidad.

### Flexbox y Grid

Los diseños fluidos también emplean sistemas de distribución. **Flexbox** organiza en una dimensión, fila o columna; **Grid** organiza bidimensionalmente por filas y columnas. La figura 30 contrapone esa diferencia de organización.

Ambos pueden adaptar parte de la distribución automáticamente y reducir la necesidad de reglas especiales para cada ancho. No eliminan las media queries cuando se necesita cambiar el comportamiento en rangos concretos.

[Ver fluidez y unidades](3-Adaptabilidad-Web.pdf#page=28) · [Ver Flexbox/Grid](3-Adaptabilidad-Web.pdf#page=31).

## Mobile First, breakpoints y media queries

### Mobile First

El enfoque **Mobile First** empieza por pantallas pequeñas y amplía progresivamente. La limitación de espacio obliga a priorizar lo esencial y facilita escalar el diseño. La página 33 lo presenta como estrategia predominante en su contexto docente; no se convierte aquí en una afirmación estadística sobre todos los proyectos actuales.

El principio es diseñar primero una experiencia completa y comprensible en el espacio reducido, no crear una versión que pierda información sin criterio.

### Breakpoints

Los **breakpoints** son umbrales donde cambia la distribución. El PDF ofrece estos rangos orientativos:

| Rango del ejemplo | Clasificación |
|---|---|
| Menor de 768 px | Móvil |
| Entre 768 y 1024 px | Tableta |
| Mayor de 1024 px | Escritorio |

Son umbrales del ejemplo y no dimensiones universales de todos los dispositivos. Lo que describen es el punto donde conviene reorganizar la interfaz.

### Aplicación con media queries

Una **media query** aplica reglas según condiciones como ancho, alto, orientación o tipo de medio. El documento la relaciona con la implementación de los breakpoints:

```css title="Ejemplo de las páginas 37–38"
@media (min-width: 768px) {
  nav {
    display: flex;
    flex-direction: row;
  }
}
```

Desde ese ancho se aplica la distribución indicada. El estado por debajo del umbral depende de las reglas base de la página. Los dos fragmentos originales se reúnen aquí, manteniendo sus propiedades.

Las media queries siguen siendo necesarias si se desea modificar número de columnas, posición, tipografía, visibilidad, menús o una interfaz compleja. Flexbox/Grid resuelven adaptación interna; las condiciones permiten cambios de diseño explícitos.

[Ver Mobile First](3-Adaptabilidad-Web.pdf#page=33) · [Ver breakpoints](3-Adaptabilidad-Web.pdf#page=35) · [Ver media queries](3-Adaptabilidad-Web.pdf#page=37).

## Frameworks y referencias de estandarización

Los frameworks reúnen componentes y sistemas que implementan técnicas de adaptación. El PDF aclara que **no son una técnica de diseño por sí mismos**: facilitan su uso. La página 40 enumera Bootstrap, Tailwind CSS, Foundation, Bulma, React, Angular y Vue, sin desarrollar ni equiparar sus arquitecturas.

Las ventajas citadas son rapidez de desarrollo, reutilización, componentes adaptables y compatibilidad. Usar uno no sustituye comprobar el resultado de la interfaz.

La página 41 cita **Mobile Web Best Practices 1.0, 29/07/2008**, y un documento de estándares para aplicaciones móviles de **septiembre de 2020**, dentro de la Mobile Web Initiative del W3C. La figura 42 relaciona aplicaciones y contenido, red, almacenamiento, gráficos, multimedia, entradas y distintos dispositivos. Son referencias de la presentación, sin actualizarlas mediante fuentes externas.

[Ver frameworks](3-Adaptabilidad-Web.pdf#page=40) · [Ver W3C](3-Adaptabilidad-Web.pdf#page=41).

## Herramientas y procedimiento de comprobación

### Herramientas citadas

| Grupo | Herramientas del documento |
|---|---|
| Navegadores | Chrome DevTools, Firefox Responsive Design Mode; Edge y Opera se agrupan con las herramientas de Chrome en el PDF |
| Servicios | BrowserStack para distintos navegadores/dispositivos; Screenfly para tamaños de pantalla |
| Extensiones | Window Resizer para cambiar tamaño; Responsive Viewer para múltiples vistas |
| W3C | Mobile Checker, marcado expresamente como servicio suspendido en la página 47 |

Para abrir las herramientas del navegador, el material indica **F12 o Inspeccionar** y después el modo de dispositivos o diseño adaptable. Esta descripción reproduce el flujo de las diapositivas y no afirma que todos los productos conserven la misma interfaz en cualquier versión.

**Procedimiento didáctico basado en el PDF:** abrir la página, probar varios anchos y orientaciones, comprobar que imágenes y contenido caben, revisar menús y texto, comparar el comportamiento antes/después de cada breakpoint y completar la prueba con dispositivos, sistemas y navegadores distintos. La simulación visual ayuda a revisar el layout; los apartados móviles piden además comprobar uso y carga.

El PDF lista también herramientas históricas en sus referencias finales. Esas direcciones no se ofrecen aquí como garantía de servicio disponible; la suspensión explícita del comprobador W3C se conserva.

[Ver herramientas](3-Adaptabilidad-Web.pdf#page=44).

## Usabilidad móvil

Los principios generales de usabilidad se mantienen. Cambian las restricciones: menos espacio, exploración más rápida, menor lectura e interfaces más limitadas. El material contrasta las antiguas versiones reducidas para móviles con la tendencia a ofrecer el mismo contenido **adaptado** al dispositivo.

Lo más frecuente o urgente debe estar a mano; el resto puede requerir más clics si el recorrido es **obvio**. El menor ancho produce páginas más largas y profundas y obliga a desplazarse más. Eso conecta con la regla de Krug: importa la claridad de las decisiones, no solo su cantidad.

El PDF advierte sobre tiempos de carga por limitaciones de ancho de banda y pide probar código e imágenes. También señala que los navegadores móviles pueden comportarse de forma diferente, por lo que deben comprobarse HTML, CSS y JavaScript.

Las pruebas recomendadas abarcan:

- Usabilidad y adaptación de la página.
- Distintos dispositivos y hardware.
- Distintos sistemas operativos.
- Distintos navegadores.

**Explicación didáctica:** que una página quepa en una captura pequeña solo responde a parte del problema. Todavía hay que poder orientarse, leer, interactuar y completar tareas.

[Ver usabilidad móvil](3-Adaptabilidad-Web.pdf#page=49).

## Evaluación y preguntas de repaso

Las páginas 62–63 indican un test tras el seminario y preguntas en parciales/finales sobre las diapositivas y el libro de Krug. Las **fechas de apertura y cierre se remiten a Planificación del Campus Virtual**; el PDF no proporciona fechas concretas, así que no se añaden aquí.

::: pregunta ¿Qué diferencia width:100% de max-width:100% en el ejemplo de 300 y 500 px?
width obliga a la imagen a ocupar los 500 px del contenedor. max-width fija un límite y, en el ejemplo sin otra anchura impuesta, conserva sus 300 px naturales. Ambas opciones se acompañan de height:auto para mantener proporciones.
:::

::: pregunta ¿Por qué Flexbox y Grid no eliminan todas las media queries?
Porque resuelven adaptaciones de su distribución, pero todavía pueden necesitarse cambios explícitos de columnas, posición, tipografía, visibilidad o navegación a partir de un umbral.
:::

1. Explica por qué el viewport es necesario pero no sustituye un diseño flexible.
2. Interpreta las alternativas del ejemplo `picture` en 500, 900 y 1200 px.
3. Distingue porcentaje, em, rem, vw y vh en los ejemplos del PDF.
4. Explica Mobile First y su relación con priorizar contenido.
5. Distingue breakpoint de media query.
6. Diseña una comprobación que incluya ancho, orientación, interacción y carga.
7. Relaciona clics, profundidad y claridad de navegación en móvil.

## Resumen final

La adaptabilidad modifica la distribución de un mismo sitio según el espacio y medio de acceso. Viewport, límites relativos del multimedia, unidades flexibles, Flexbox/Grid y media queries se complementan. Mobile First ayuda a priorizar; los breakpoints expresan cambios concretos. El resultado se comprueba con herramientas y dispositivos, manteniendo la usabilidad y sin reducir la adaptación a una captura que simplemente cabe en pantalla.

## Referencias y cobertura

- [Documento original](3-Adaptabilidad-Web.pdf): **64 páginas analizadas**, incluidas comparación de dispositivos, imágenes fluidas, esquemas de distribución y capturas de herramientas.
- Cobertura: definición (4–5), evolución (7–10), técnicas (12–42), comprobación (44–47), uso móvil (49–50), conclusiones (52), bibliografía/referencias (54–60) y evaluación (62–63).
- Se conservan los fragmentos de viewport, imágenes, picture, vídeo, audio y media queries. Se identifican comillas normalizadas, imágenes no adjuntas y la precisión sobre ampliación/proporción. No se inventan requisitos del Campus Virtual.
- Bibliografía del PDF: Steve Krug, *No me hagas pensar. Actualización*, tercera edición, Anaya, **2014**; Ben Frain, *Responsive Web Design with HTML5 and CSS*, quinta edición, Packt, **2025**; Christophe Aubry, *HTML5 y CSS3 para sitios con diseño web responsive*, ENI, **2014**.
- Referencias del material: [Mobile Web Best Practices](http://www.w3.org/TR/mobile-bp/), [estado de tecnologías móviles](http://www.w3.org/Mobile/mobile-web-app-state/), [Mobile Web Initiative](http://www.w3.org/Mobile/), [comprobador W3C citado como suspendido](http://validator.w3.org/mobile/), [Screenfly](https://screenfly.org/), [BrowserStack](https://www.browserstack.com/), [Steve Krug](http://www.sensible.com/), [NNGroup](http://www.nngroup.com/), [Ethan Marcotte](https://ethanmarcotte.com/books/responsive-web-design/), [No solo usabilidad](http://www.nosolousabilidad.com/), [Designing for Emotion](http://abookapart.com/products/designing-for-emotion), [tutorial W3Schools](https://www.w3schools.com/css/css_rwd_intro.asp), [tutorial MDN](https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout/Responsive_Design), [diseño y medidas](https://www.jluislopez.es/diseno-web-responsive/), [guía citada de 2023](https://ishadeed.com/article/responsive-design/#introduction), [comprobador Google citado](https://www.google.com/webmasters/tools/mobile-friendly/) y [archivo web](https://web.archive.org/). Son referencias del PDF, no fuentes utilizadas para completar teoría ni garantía de disponibilidad actual.
