---
asignatura: Software y Estándares para la Web
titulo: Usabilidad Web - Parte 2
resumen: Usabilidad web (segunda parte).
fuente: 2-Usabilidad-Web-parte2.pdf
---

# Usabilidad Web - Parte 2

## Contenido

1. [Introducción y objetivos](#introduccion-y-objetivos)
2. [Navegar, buscar y orientarse](#navegar-buscar-y-orientarse)
3. [Navegación constante o global](#navegacion-constante-o-global)
4. [Profundidad, títulos y posición actual](#profundidad-titulos-y-posicion-actual)
5. [Comprobar una página cualquiera](#comprobar-una-pagina-cualquiera)
6. [Responsabilidades de la página principal](#responsabilidades-de-la-pagina-principal)
7. [Controles y decisiones que pueden dificultar el uso](#controles-y-decisiones-que-pueden-dificultar-el-uso)
8. [Evaluación y repaso](#evaluacion-y-repaso)
9. [Resumen final](#resumen-final)
10. [Referencias y cobertura](#referencias-y-cobertura)

## Introducción y objetivos

El segundo seminario aplica las reglas de usabilidad al **diseño de navegación** y la **página principal**. Recupera la idea de sistema fácil de aprender y utilizar y las tres reglas de Krug: evitar dudas innecesarias, favorecer decisiones claras y eliminar palabras superfluas.

La navegación debe permitir encontrar contenido, entender la jerarquía, reconocer la posición actual y confiar en el sitio. La página principal debe explicar de un vistazo qué ofrece y por dónde empezar. La unidad estudia cómo se complementan ambas funciones.

## Navegar, buscar y orientarse

### Analogía del centro comercial

Las páginas 7–9 comparan encontrar sal en una tienda con localizar información. Se puede explorar por categorías o **preguntar**, que en la Web corresponde al buscador. La elección depende de prisa, familiaridad, frustración y preferencias de la persona.

La Web carece de algunas pistas del mundo físico: no se percibe fácilmente su **escala**, no hay una dirección física estable y cuesta recordar la posición de cada cosa. Por eso el documento destaca favoritos, botón Atrás y enlace a la página principal. El porcentaje **30–40 % de clics en Atrás** de la página 10 se recoge como cifra del material, no como una medición actual.

### Propósitos de la navegación

| Propósito | Resultado para el usuario |
|---|---|
| Encontrar | Llegar a lo que busca mediante vínculos |
| Orientar | Reconocer dónde está y qué hay en cada lugar |
| Enseñar | Descubrir por dónde empezar y qué opciones tiene |
| Generar confianza | Percibir una organización comprensible y querer volver |

Las convenciones de apariencia y posición hacen reconocibles los elementos, de forma parecida a índices de revistas o nombres de calles. Su consistencia evita reaprender la interfaz en cada página.

[Ver analogía](2-Usabilidad-Web-parte2.pdf#page=7) · [Ver propósitos](2-Usabilidad-Web-parte2.pdf#page=11).

## Navegación constante o global

Es el conjunto de elementos que se repiten con la misma apariencia y posición. El PDF admite dos excepciones: la página principal puede tener otra distribución y los formularios pueden simplificar la navegación a identificación, inicio y ayuda.

### Identificación, secciones y utilidades

La **identificación del sitio** debe permanecer visible y parecer un identificador: logotipo o caracteres distintivos. El documento la sitúa habitualmente arriba a la izquierda para lectura occidental; menciona la derecha para lenguas de derecha a izquierda y soluciones centradas como opción multicultural.

Las **secciones** representan el nivel superior de la jerarquía del contenido. La navegación secundaria puede mostrar subsecciones del apartado actual. Las **utilidades** son acciones o información que no forman parte de esa jerarquía: ayuda, mapa, carrito, contacto o servicio al cliente. Deben resultar algo menos prominentes que las secciones; el PDF recomienda cuatro o cinco en la navegación global y agrupar las restantes.

Las capturas 13–18 señalan estas áreas en sitios de ejemplo. Su propósito es distinguir organización del contenido y herramientas de uso, no establecer que un menú concreto deba copiarse literalmente.

### Inicio y búsqueda

La identificación enlazada a la página principal proporciona un punto de referencia. El material recomienda un enlace a **Home/Página principal** desde secciones y utilidades y hacer reconocible su función.

La búsqueda debe tener cuadro o enlace visible y utilizar la palabra convencional **Buscar**. El PDF desaconseja nombres ingeniosos, instrucciones innecesarias y opciones de búsqueda que no funcionen. Las restricciones avanzadas resultan más útiles al revisar resultados que antes de la primera consulta. Enviar al usuario a un buscador que mezcla resultados externos puede impedirle encontrar el contenido del propio sitio.

**Ejemplo didáctico:** el código siguiente muestra nombres de navegación claros y separación de una utilidad. Es un fragmento de contenido; las páginas enlazadas se consideran parte del sitio de ejemplo, no archivos adjuntos de esta unidad.

```html title="Navegación de ejemplo" origen="Ejemplo didáctico"
<nav>
  <a href="index.html">Inicio</a>
  <a href="asignaturas.html">Asignaturas</a>
  <a href="ejemplos.html">Ejemplos</a>
</nav>
<a href="ayuda.html">Ayuda</a>
```

Los nombres y el lugar de la ayuda aplican la distinción conceptual del PDF.

[Ver navegación global](2-Usabilidad-Web-parte2.pdf#page=13) · [Ver utilidades](2-Usabilidad-Web-parte2.pdf#page=17) · [Ver inicio y buscar](2-Usabilidad-Web-parte2.pdf#page=19).

## Profundidad, títulos y posición actual

### Diseñar todos los niveles

La figura 21 muestra niveles desde página principal hasta contenidos más profundos. La página 22 advierte de que es frecuente cuidar el primer nivel y resolver los siguientes de forma improvisada. Recomienda diseñar páginas de ejemplo de **todos los niveles potenciales antes de decidir los colores de la portada**. La falta de espacio complica mostrar más de dos niveles, pero no elimina la necesidad de planificarlos.

Cada página necesita un **nombre propio visible**, situado junto al contenido específico y destacado mediante posición, tamaño o color. Seleccionar una opción del menú no sustituye al título del contenido. El nombre debe corresponder al vínculo que se ha pulsado; si se abrevia, la relación debe seguir siendo evidente.

### Usted está aquí

El documento propone punteros, color, negrita, inversión de color o cambio del botón para destacar el elemento activo. Conviene combinar señales, como color y negrita, para que la ubicación sobresalga. La ilustración de un cartel «usted está aquí» explica el papel de la orientación, aunque en una web no exista posición física.

### Migas de navegación

Las **breadcrumbs** muestran el camino desde inicio hasta la página actual y permiten volver a niveles superiores. Son especialmente útiles en jerarquías profundas. El PDF propone situarlas arriba, usar separadores como `>` o `>>`, tipografía discreta y último término en negrita. Pueden empezar por «Usted está aquí» y **no sustituyen el nombre de la página**.

**Ejemplo didáctico:** `Inicio > Teoría > XML > XPath` expresa la jerarquía de contenido. No debe interpretarse automáticamente como el historial de cada clic que ha hecho el usuario.

### Solapas

Las solapas separan secciones y evocan una organización física. La activa debe estar por delante, diferenciarse, conectar con el área de contenido y existir desde la entrada en el sitio. El PDF recomienda dibujo claro, carga rápida y coherencia entre color de sección y navegación. Su limitación es que **no escalan bien** cuando hay demasiadas.

[Ver profundidad y títulos](2-Usabilidad-Web-parte2.pdf#page=21) · [Ver posición](2-Usabilidad-Web-parte2.pdf#page=25) · [Ver migas](2-Usabilidad-Web-parte2.pdf#page=26) · [Ver solapas](2-Usabilidad-Web-parte2.pdf#page=28).

## Comprobar una página cualquiera

La diapositiva 30 plantea una prueba de reconocimiento con seis preguntas, legibles en su esquema visual:

1. ¿Qué sitio es este? —Identificación.
2. ¿En qué página estoy? —Nombre de página.
3. ¿Cuáles son las principales secciones? —Navegación global.
4. ¿Qué opciones hay en este nivel? —Navegación local.
5. ¿Dónde estoy en la organización? —Indicador de ubicación.
6. ¿Cómo busco algo? —Búsqueda.

La página 31 aplica la prueba a un sitio informativo y señala cada región. El objetivo es poder responder **en cualquier página**, sin depender de haber entrado por la portada.

**Procedimiento didáctico:** abrir una página interior, ocultar el recorrido previo y localizar los seis elementos. Cuando una respuesta dependa de recordar dónde se hizo clic, la interfaz no está proporcionando toda la orientación que esta prueba busca.

[Ver prueba y ejemplo](2-Usabilidad-Web-parte2.pdf#page=30).

## Responsabilidades de la página principal

### Qué contiene y qué debe explicar

Las capturas de las páginas 33–36 muestran páginas de Universidad de Oviedo, una versión antigua, IBM y EII Oviedo. Son ejemplos de distintas organizaciones visuales del contenido, no evaluaciones de sus versiones actuales.

El esquema 37–38 reparte la portada entre identidad y misión, jerarquía, búsqueda, promociones, contenido reciente, material frecuente, contenidos temporales, accesos de usuarios y anuncios. Esa presión crea la tentación de colocarlo todo **por encima del pliegue**, la parte visible sin desplazarse. La ilustración de la página 39 muestra el conflicto de espacio.

El PDF prioriza cuatro respuestas inequívocas de un vistazo:

- **Qué es este sitio.**
- **Qué puedo hacer aquí.**
- **Qué contenido hay.**
- **Por qué utilizarlo frente a otro.**

Al renunciar a contenido por falta de espacio no debería desaparecer precisamente la explicación de qué es el sitio. La lámina de excusas de la página 41 critica delegar esa explicación en la supuesta familiaridad del público o en otros elementos.

### Tagline y bienvenida

La **tagline** es una frase que caracteriza al conjunto de la organización o sitio y resume qué es y qué lo distingue. Debe ser clara, informativa y de longitud ajustada; el PDF orienta hacia **seis a ocho palabras**. No es un lema genérico como «está en buenas manos».

Puede aparecer debajo, encima o al lado del identificador. El documento admite que marcas muy cotidianas podrían prescindir de ella, aunque puede seguir siendo beneficiosa. Una **bienvenida** puede explicar el sitio en un bloque breve visible sin desplazarse; si ocupa un área que parece publicitaria, se debe dejar claro que no es un anuncio.

### Puntos de entrada

Tras un vistazo, la persona debe reconocer dónde empezar a **buscar**, **navegar** o **probar lo más relevante**. Un cuadro de búsqueda tiene que parecerlo; rótulos como búsqueda o navegar por categoría deben hacer evidente el acceso.

La portada puede emplear más espacio para identidad, descripciones de sección o subsecciones y una orientación del menú distinta de la de páginas interiores. Debe conservar **los mismos nombres, orden, agrupaciones y señales visuales** para que siga reconociéndose como el mismo sistema de navegación.

[Ver portada](2-Usabilidad-Web-parte2.pdf#page=37) · [Ver mensaje](2-Usabilidad-Web-parte2.pdf#page=40) · [Ver tagline](2-Usabilidad-Web-parte2.pdf#page=44) · [Ver puntos de entrada](2-Usabilidad-Web-parte2.pdf#page=46).

## Controles y decisiones que pueden dificultar el uso

### Rollovers y menús desplegables

Las páginas 49–50 estudian rollovers/carruseles y los marcan como **obsoletos en el material**. Se introdujeron para ahorrar espacio mostrando una descripción al apuntar a una sección. Sus problemas son baja visibilidad, imposibilidad de comparar varios a la vez, movimiento que dificulta leer y distancia respecto al cursor. Reservar un hueco de despliegue reduce el supuesto ahorro. No se presenta su implementación con jQuery como una recomendación para el diseño final.

Los **menús desplegables** también esconden opciones, son difíciles de revisar y pueden exigir recorridos delicados por submenús. El PDF los considera eficaces para listas alfabéticas de nombres conocidos —países, ciudades o productos— y poco eficaces si el usuario desconoce el nombre o debe desplazarse por listas largas y no ordenadas.

### Promociones y saturación

La página 52 contrapone pequeñas promociones siempre visibles con una promoción mayor que cambia al cargar y ofrece enlaces a las demás. Se estudia como alternativa del documento para contenidos del propio sitio, con la limitación de los intereses de quienes pagan los anuncios. No establece que todo cambio automático de contenido sea mejor en cualquier situación.

La página 53 advierte de cuatro errores: añadir un banner que desplaza contenido y tarda en cargar; intentar promocionarlo todo; dejar que intereses comerciales desplacen el objetivo de la portada; y pedir demasiados datos antes de demostrar valor. Exigir registro antes de explorar ejemplifica esta última barrera. Explicar para qué se solicita un dato cuando ya resulta pertinente puede mejorar la disposición del usuario.

[Ver rollovers](2-Usabilidad-Web-parte2.pdf#page=49) · [Ver desplegables](2-Usabilidad-Web-parte2.pdf#page=51) · [Ver riesgos de portada](2-Usabilidad-Web-parte2.pdf#page=53).

## Evaluación y repaso

Las páginas 64–66 indican un test de Campus Virtual tras los dos seminarios de usabilidad, **una semana de respuesta** y preguntas en parciales/finales sobre seminarios y el libro de Krug. El PDF no contiene fechas concretas de examen o apertura; no se inventan a partir del calendario.

::: pregunta ¿Qué diferencia una sección de una utilidad?
La sección pertenece a la jerarquía del contenido. La utilidad ayuda a usar el sitio o informa sobre él, como ayuda, carrito o contacto, y se presenta con menor prominencia que la navegación principal.
:::

::: pregunta ¿Las migas sustituyen al nombre de la página?
No. Las migas sitúan el contenido en su jerarquía y permiten volver a niveles superiores. La página sigue necesitando un título propio visible y relacionado con el vínculo de entrada.
:::

1. Explica las tres carencias de orientación de la Web frente al espacio físico.
2. Enumera los elementos de navegación constante y sus excepciones.
3. Aplica las seis preguntas de reconocimiento a una página interior.
4. Compara tagline, bienvenida y lema.
5. Explica por qué portada e interiores pueden cambiar de distribución conservando su navegación.
6. Compara una lista desplegable de países con una lista de categorías desconocidas.
7. Justifica por qué pedir registro antes de navegar puede arruinar un diseño.

## Resumen final

Una navegación clara muestra contenido, opciones y ubicación con convenciones reconocibles. Identificación, inicio, secciones, búsqueda y utilidades deben trabajar junto al nombre de página y a los indicadores de posición. La portada añade misión y puntos de entrada, pero comparte vocabulario y señales con el resto del sitio. Ahorrar espacio ocultando opciones o saturar de promociones puede reducir la capacidad de orientarse y actuar.

## Referencias y cobertura

- [Documento original](2-Usabilidad-Web-parte2.pdf): **67 páginas analizadas**, incluidos esquemas de jerarquía, prueba de seis preguntas, diagramas de portada y comparaciones de controles.
- Cobertura: recordatorio (2–3), navegación (6–29), prueba (30–31), portada (33–48), controles/riesgos (49–53), resumen (55), bibliografía/referencias (57–62) y evaluación (64–66).
- Las imágenes se interpretan junto a sus conceptos; el fragmento HTML y el ejemplo de migas son didácticos. La cifra de Atrás y las capturas se atribuyen al material, sin afirmarlas como estadísticas o sitios actuales.
- Referencia adicional de este seminario: [ejemplos de páginas principales citados por el PDF](https://blog.hubspot.com/blog/tabid/6307/bid/34006/15-Examples-of-Brilliant-Homepage-Design.aspx).

### Bibliografía y recursos citados

La lectura principal del PDF es **Steve Krug, *Don’t Make Me Think / No me hagas pensar. Actualización*, tercera edición, 2014**, Pearson-Prentice Hall / Anaya. La presentación indica que ediciones posteriores corrigen erratas; se recoge como indicación docente del material, sin comparar ediciones externas.

Como consulta se incluye Jakob Nielsen, *Designing Web Usability: The Practice of Simplicity / Usabilidad: diseño de sitios Web*, 2000. También aparecen Nielsen y Tahir, *Usabilidad de páginas de inicio. Análisis de 50 sitios web* (2002); Krug, *Haz fácil lo imposible* (2010); Johnson y Nielsen, *GUI Bloopers* (2000); Brink, Gergle y Wood, *Usability for the Web* (2001); Braun y otros, *Usability: The Site Speaks for Itself* (2003); Lauesen, *User Interface Design. A Software Engineering Perspective* (2005); y Graham, *Patterns for Web Usability* (2003).

Recursos del PDF: [Steve Krug](http://www.sensible.com/), [Nielsen Norman Group](http://www.nngroup.com/), [No solo usabilidad](http://www.nosolousabilidad.com/) y [Designing for Emotion](http://abookapart.com/products/designing-for-emotion). Se recogen como bibliografía; no se han consultado para ampliar la teoría.
