---
asignatura: Software y Estándares para la Web
titulo: Lenguajes de Marcado - HTML
resumen: Lenguaje de marcado HTML5.
fuente: HTML5.pdf
---

# Lenguajes de Marcado - HTML

## Contenido

1. [Introducción y objetivos](#introduccion-y-objetivos)
2. [Características y estructura básica](#caracteristicas-y-estructura-basica)
3. [DOM: Document Object Model](#dom-document-object-model)
4. [Metadatos del documento: head](#metadatos-del-documento-head)
5. [Clasificación y elementos de HTML](#clasificacion-de-elementos-html)
6. [Elementos semánticos de estructura](#elementos-semanticos-de-estructura-y-elementos-genericos)
7. [Elementos de agrupación](#elementos-de-agrupacion-de-contenido)
8. [Elementos semánticos de texto](#elementos-semanticos-de-texto-y-enlaces)
9. [Contenido incrustado](#contenido-incrustado)
10. [Tablas](#tablas-y-datos-tabulares)
11. [Formularios](#formularios)
12. [Elementos interactivos](#elementos-interactivos)
13. [Atributos globales](#atributos-globales)
14. [Referencias y errores comunes](#referencias)
15. [Repaso y resumen final](#preguntas-de-repaso)

## Introducción y objetivos

HTML es un **lenguaje de marcado** que representa documentos mediante un árbol de elementos y texto. Aunque se popularizó la denominación «HTML5», el documento presenta HTML como un **estándar vivo (Living Standard)** mantenido por WHATWG. Su especificación determina los elementos disponibles y las reglas de anidamiento. El navegador analiza el documento y construye su representación en memoria, denominada **DOM**.

A lo largo de esta unidad se estudia la sintaxis, la estructura de un documento, los metadatos, el modelo DOM, la elección semántica de elementos, los recursos incrustados, las tablas, los formularios, los atributos globales y la validación. Las explicaciones siguientes se han organizado por bloques temáticos, conservando el orden y la información de las diapositivas originales.

::: cifras
180 | páginas del PDF original
14 | bloques temáticos organizados para su consulta
1 | lenguaje de marcado estudiado
:::

[Consultar el PDF original](HTML5.pdf)

## Guía de interpretación

- **Material original:** las explicaciones, advertencias y fragmentos de código recogidos en las fichas de cada diapositiva proceden del documento de clase.
- **Explicación didáctica:** los párrafos identificados expresamente así aclaran o conectan puntos del PDF; no se presentan como citas de las diapositivas.
- **Ejemplo didáctico:** cuando se añade un ejemplo nuevo, se indica explícitamente.
- Los diagramas y las capturas de pantalla se consultan mediante los enlaces a la diapositiva, puesto que un volcado de texto no reproduce sus detalles gráficos.


## Características y estructura básica

El material presenta convenciones para escribir HTML y la estructura mínima del documento.

### 4. Históricamente se popularizó con el nombre HTML5, pero

[Ver diapositiva 4](HTML5.pdf#page=4)

- Históricamente se popularizó con el nombre HTML5, pero

actualmente HTML es un estándar vivo (Living Standard) mantenido por WHATWG

- Un documento HTML consiste en un árbol de elementos y texto

- Lenguaje de marcas

```html
<etiqueta de inicio> … </etiquetaCierre>
<etiqueta de inicio … />
```

- Cada elemento se representa por la etiqueta de inicio (<body>) y

la etiqueta de cierre (</body>)

- La especificación HTML define un conjunto de elementos junto

con las reglas que rigen su anidamiento


### 5. Tipos de elementos

[Ver diapositiva 5](HTML5.pdf#page=5)

- Tipos de elementos

- Elementos completos con etiqueta de cierre

```html
<p>… </p>
– Elementos simples sin etiqueta de cierre
<img …>
```

No existe </img> El cierre se indica añadiendo / antes de >

```html
<img … />
– Las etiquetas de cierre pueden ser omitidas en determinadas
```

circunstancias Recomendación cerrar siempre todos los elementos (por coherencia con XML)

```html
<p>…</p>
<img … /> con un espacio en blanco antes />
```

Aparece un aviso INFO en el validador INFO en el validador


### 6. Comentarios

[Ver diapositiva 6](HTML5.pdf#page=6)

- Comentarios

```html
<!–- esto es un comentario -->
```

- Se deben utilizar para facilitar la comprensión del código

```html
<!–- Formulario de contacto -->
<!–- Tabla que contiene los datos estadísticos -->
```


### 7. Utilización de Mayúsculas/minúsculas.

[Ver diapositiva 7](HTML5.pdf#page=7)

- Utilización de Mayúsculas/minúsculas.

- Los elementos se pueden escribir en mayúsculas y Informática

minúsculas.

```html
<P>he aquí un <STRONG>párrafo</STRONG> enfatizado</P>
<p>he aquí un <strong>párrafo</strong> enfatizado</p>
```

Importante: utilizar minúsculas SIEMPRE en HTML

Las mayúsculas se utilizaban en el nombre de los elementos en versiones anteriores de la especificación por ejemplo HTML4


### 8. Anidamiento de elementos

[Ver diapositiva 8](HTML5.pdf#page=8)

- Anidamiento de elementos

- Los elementos se pueden anidar dentro de otros pero sin del Software

solapamientos

```html
<p>Esto es un <a       href="#">   ejemplo   </a><em>simple    con   anidamiento
```

correcto</em> </p>

INCORRECTO: elementos solapados

```html
<p>Esto es      un <a href="#"> ejemplo </a><em>simple con
```

anidamiento incorrecto, que provoca 2 errores HTML:</p> </em>

El anidamiento incorrecto puede alterar el DOM generado por el navegador y puede provocar efectos inesperados en CSS, en JavaScript y accesibilidad


### 9. Los elementos pueden tener atributos que indican como debe Ingeniería

[Ver diapositiva 9](HTML5.pdf#page=9)

- Los elementos pueden tener atributos que indican como debe Ingeniería

comportarse el elemento

```html
<html lang = “es”>
```

Nombre Atributo Elemento

```html
</html>
```

- Los atributos se especifican en la etiqueta de inicio del elemento


### 10. El valor de los atributos se especifica:

[Ver diapositiva 10](HTML5.pdf#page=10)

- El valor de los atributos se especifica:

NombreAtributo = "valorAtributo" NombreAtributo (para los atributos booleanos)

- El valor de los atributos se puede especificar entre comillas

dobles("), simples (') o sin ellas.

```html
<a href="demo.html">demo</a>
<a href='demo.html'>demo</a>
<a href=demo.html>demo</a>
```

Importante: utilizar siempre comillas dobles, obligatorio cuando hay espacios en blanco en el valor del atributo

- Los atributos booleanos indican su aplicación con el propio

nombre del atributo. Ejemplo:

```html
<input name="address" disabled>
```

en lugar de <input name= "address" disabled = "" >


### 11. Elemento <! Doctype html>

[Ver diapositiva 11](HTML5.pdf#page=11)

```html
<! Doctype html>
```

```html
<html>
```

```html
<head>
```

…colección de metadatos

```html
</head>
<body>
```

… contenido del documento

```html
</body>
</html>
```


### 12. Especificación del tipo de documento

[Ver diapositiva 12](HTML5.pdf#page=12)

- Especificación del tipo de documento

```html
<!DOCTYPE html>
– Imprescindible para ser procesado por los agentes de usuario
```

(navegadores) porque activa el modo estándar del navegador

- Permite interpretar el documento como HTML moderno.

- A diferencia de otros lenguajes de marcas como XHTML 1.1

no utiliza un DTD (Document Type Definition) externo

```html
<!DOCTYPE    html     PUBLIC    "-//W3C//DTD               XHTML   1.1//EN"
```

"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

- Lista de DTDs del W3C: https://www.w3.org/QA/2002/04/valid-

dtd-list.html


### 13. Elemento <html>

[Ver diapositiva 13](HTML5.pdf#page=13)

- <html> Elemento raíz del documento

```html
<html lang="es">
```

- Se debe indicar el idioma en el que esta escrito el

documento

- Dando valor al atributo lang

- Valor del atributo son 2 letras que identifican el idioma (pj.

"es" indica español)

- https://www.iso.org/standard/4766.html Definición de    la

nomenclatura estandarizada para identificar idiomas

- https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

Listado de los idiomas


### 14. Dentro del elemento HTML hay dos

[Ver diapositiva 14](HTML5.pdf#page=14)

- Dentro del                 elemento            HTML          hay   dos

elementos:

- Head: contiene la colección de los metadatos del

documento

- No se visualizan (en general)

- Body: representa el contenido del documento

- Contenido que se muestra en el agente de usuario


### 15. En <head> siempre debemos indicar

[Ver diapositiva 15](HTML5.pdf#page=15)

- En <head> siempre debemos indicar

- Codificación de caracteres mediante el metadato charset

```html
<meta charset="utf-8" />
– El elemento <title> con el nombre del documento
• Debe identificar al documento incluso fuera de contexto
• Se muestra en la pestaña de los navegadores y se utiliza en el
```

historial de navegación

- Ejemplos:

```html
<title>Estudiantes-Universidad de Oviedo-uniovi.es</title>
https://www.uniovi.es/conocenos/tramites/estudiantes
```

```html
<title>PDI-Universidad de Oviedo-uniovi.es</title>
https://www.uniovi.es/conocenos/tramites/pdi
```


### 16. Documento básico HTML5

[Ver diapositiva 16](HTML5.pdf#page=16)

- Documento básico HTML5



## DOM: Document Object Model

El DOM es la representación en memoria del documento HTML construida por el navegador mediante el analizador sintáctico.

### 18. Los documentos HTML consisten en un árbol de Ingeniería

[Ver diapositiva 18](HTML5.pdf#page=18)

- Los documentos HTML consisten en un árbol de Ingeniería

elementos y texto

- Los agentes de usuario (navegadores) analizan

sintácticamente (parser) el documento HTML y construyen un árbol DOM (Document Object Model)

- Un árbol DOM es una representación en memoria del

documento HTML


### 19. Los árboles DOM contienen varios tipos de nodos:

[Ver diapositiva 19](HTML5.pdf#page=19)

- Los árboles DOM contienen varios tipos de nodos:

- Nodo de tipo de documento

- Nodo de elementos

- Nodo de texto

- Nodo de comentarios

- Nodos de instrucciones de procesamiento


### 20. Ejemplo de documento HTML5 (basicoDOM.html)

[Ver diapositiva 20](HTML5.pdf#page=20)

- Ejemplo de documento HTML5 (basicoDOM.html)


### 21. Árbol DOM del documento HTML5:

[Ver diapositiva 21](HTML5.pdf#page=21)

- Árbol DOM del documento HTML5:


### 22. DOCTYPE: html Nodo de tipo

[Ver diapositiva 22](HTML5.pdf#page=22)

- DOCTYPE: html Nodo de tipo

de documento

- html El nodo principal que

contiene los dos elementos head y body, con un nodo #text entre ellos generado por el analizador sintáctico (parser)

- Existen muchos elementos text

en un árbol DOM debido a los espacios en blanco y retornos de carro que haya en el documento


### 23. El elemento head contiene

[Ver diapositiva 23](HTML5.pdf#page=23)

- El elemento head contiene

elemento title que a su vez contiene un elemento text “Ejemplo”

- El elemento body contiene:

- Elemento h1

- Elemento de comentario

- Elemento p que contiene un

elemento a


### 24. Utilizando xml2svg

[Ver diapositiva 24](HTML5.pdf#page=24)

Utilizando xml2svg


### 25. El árbol DOM puede ser manipulado desde Scripts o por medio Ingeniería

[Ver diapositiva 25](HTML5.pdf#page=25)

- El árbol DOM puede ser manipulado desde Scripts o por medio Ingeniería

de manejo de eventos

- Cada elemento del árbol DOM se representa como un objeto y

estos objetos tienen una API para ser manipulados.


### 26. Ejemplo el enlace <a>

[Ver diapositiva 26](HTML5.pdf#page=26)

Ejemplo el enlace <a>

```html
<a href="demo.html">ejemplo</a>
```

Se representa en el árbol ┗ a href="demo.html" ┗ #text: ejemplo

se le puede cambiar el valor del atributo href de diversas formas:

```html
var a = document.links[0]; // obtener el primer link del doc
a.href = 'sample.html'; // cambiar destino con URL
a.protocol = 'https'; // cambiar el protocolo de la URL
a.setAttribute('href', 'http://example.com/');
// cambiar el valor del atributo directamente
```



## Metadatos del documento: head

### 28. Colección de metadatos para el documento

[Ver diapositiva 28](HTML5.pdf#page=28)

- Colección de metadatos para el documento

https://html.spec.whatwg.org/multipage/semantics.html#d Informática

ocument-metadata

```html
<head>
```

Metadatos del documento

```html
<title>, <base>, <link>, <meta>, <style>
```

```html
</head>
```


### 29. <title> Titulo o nombre de la página OBLIGATORIA

[Ver diapositiva 29](HTML5.pdf#page=29)

```html
<title> Titulo o nombre de la página OBLIGATORIA
```

Ejemplo: <title>Universidad de Oviedo - Inicio</title>

```html
<base> permite establecer la URL base del sitio web para analizar
```

las URL y el contexto de la navegación. PRECAUCIÓN: se utiliza para todas las direcciones internas del sitio Ejemplo: <base href="http://www.uniovi.es" /> el enlace <a href="demo.html">simple</a> lo buscará en la dirección http://www.uniovi.es/demo.html

```html
<link> permite enlazar documentos a otros recursos, generalmente
```

hojas de estilo y scripts. El destino se define con el atributo “href”

- OBLIGATORIAMENTE debe tener el atributo “rel”

```html
<link rel="stylesheet" href="default.css" />
```


### 30. <meta> Los elementos META se utilizan para Ingeniería

[Ver diapositiva 30](HTML5.pdf#page=30)

```html
<meta> Los elementos META se utilizan                           para Ingeniería
```

especificar información sobre el propio documento

- Atributo name: nombre del metadato

- Atributo http-equiv: directivas pragma

- Atributo content: valor de un elemento

- Atributo charset: declaración de la codificación de caracteres

- Atributo media

```html
<meta name="keywords" content="HTML, CSS, JavaScript" />
<meta name= " author" content= "Cris Pelayo" />
<meta charset ="utf-8" />
```


### 31. <style> permite definir características de estilo dentro Ingeniería

[Ver diapositiva 31](HTML5.pdf#page=31)

```html
<style> permite definir características de estilo dentro Ingeniería
```

del propio documento.

- Atributo media (por defecto asume “all”)

- Atributo type (por defecto asume “text/css”)

- Atributo title

- Impide la separación de la estructura/contenido de la

presentación lo que dificulta el mantenimiento

```html
<style>
```

id o

```html
body { color: black;
background: white; }
```

h i b

```html
em {color: red; }
</style>
```

P r o



## Clasificación de elementos HTML

La especificación clasifica los elementos atendiendo a su finalidad semántica.

### 33. Apartado 4 “The elements of HTML” de la especificación

[Ver diapositiva 33](HTML5.pdf#page=33)

Apartado 4 “The elements of HTML” de la especificación

https://html.spec.whatwg.org/multipage/#toc-semantics

- Se organizan en varios grandes grupos:

- Secciones

- Agrupamiento de contenido

- Semántica a nivel de texto

- Enlaces

- Elementos de edición

- Elementos para contenido incrustado

- Elementos de datos tabulares (tablas)

- Formularios

- Elementos interactivos

- Elementos de scripting

- Elementos personalizados


### 34. Se verán a continuación:

[Ver diapositiva 34](HTML5.pdf#page=34)

- Se verán a continuación:

- Elementos semánticos de estructura

- Elementos de agrupación de contenidos

- Elementos semánticos de texto

- Elementos de contenido incrustado

- Elementos de tabla – datos tabulares

- Elementos de formularios

- Elementos interactivos



## Elementos semánticos de estructura y elementos genéricos

::: aviso Criterio central
La elección de una etiqueta debe responder al significado del contenido, no solamente a su aspecto visual.
:::

### 36. Elemento <body>

[Ver diapositiva 36](HTML5.pdf#page=36)

```html
<body>
```

article section nav aside h1, h2, h3, h4, h5, and h6 elements hgroup header footer address

```html
</body>
```


### 37. Elemento body

[Ver diapositiva 37](HTML5.pdf#page=37)

body

- El elemento body representa el contenido

documento y debe ser único en el documento.

```html
<body>
<h1>Universidad de Oviedo</h1>
<p>Pública y de calidad, UniOvi te ofrece más de 120 títulos
```

en una completa oferta académica.</p>

```html
</body>
```


### 38. Elemento article

[Ver diapositiva 38](HTML5.pdf#page=38)

article

- El elemento <article> representa una                         composición del Software

autocontenida dentro de un documento que puede ser distribuida independientemente o reutilizada.

```html
<article>
<h2>Bora bora</h2>
<p>Isla principal caracterizada por su mar turquesa y sus
```

hoteles sobre el mar.</p>

```html
<img src = “bora.jpg” alt=“imagen de bora bora” />
</article>
```

- Se recomienda que <article> tenga un encabezado (h1-h6)

que identifique su contenido y facilite la navegación, la accesibilidad y la comprensión de la estructura del documento. El validador genera un warning si no se indica h1-h6


### 39. Elemento section

[Ver diapositiva 39](HTML5.pdf#page=39)

section

- El elemento section representa una sección temática de

un documento. Es una agrupación temática de contenido.

```html
<section>
<h2>Islas del Pacifico</h2>
<p>El océano Pacífico alberga numerosas islas
```

tropicales conocidas por sus paisajes, biodiversidad y atractivo turístico. </p>

```html
</section>
```

- Se recomienda que <section> tenga un encabezado (h1-

h6) que identifique su contenido, facilitando la navegación, la accesibilidad y la comprensión de la estructura del documento. El validador genera un warning si no se indica h1-h6


### 40. Cuando usar article y cuando section

[Ver diapositiva 40](HTML5.pdf#page=40)

Cuando usar article  y cuando section

- Ambos organizan el contenido

- section organiza (agrupa) el contenido relacionado del

documento

- article organiza (agrupa) contenido que podría vivir fuera del

documento manteniendo el sentido


### 41. Cuando usar

[Ver diapositiva 41](HTML5.pdf#page=41)

Cuando usar article y cuando section Ejemplo: web de información turística

```html
<section>
<h2>Islas del Pacífico</h2>
<p>El océano Pacífico alberga numerosas islas tropicales conocidas por sus
```

paisajes,biodiversidad y atractivo turístico.</p>

```html
<article>
<h3>Bora Bora</h3>
<p>Isla de la Polinesia Francesa caracterizada por sus aguas turquesas
```

y sus hoteles sobre el mar.</p>

```html
<img src="bora.jpg" alt="Vista de Bora Bora" />
</article>
```

```html
<article>
<h3>Fiyi</h3>
<p>Archipiélago del Pacífico Sur conocido por sus arrecifes de coral, selvas
```

tropicales y playas de arena blanca.</p>

```html
<img src= "fiyi.jpg" alt="Vista de Fiyi" />
</article>
```

```html
<article>
<h3>Samoa</h3>
<p>Conjunto de islas volcánicas destacado por sus paisajes naturales, su cultura
```

polinesia y sus costas tropicales.</p>

```html
<img src= "samoa.jpg" alt="Vista de Samoa" />
</article>
</section>
```


### 42. Cuando usar article y cuando section

[Ver diapositiva 42](HTML5.pdf#page=42)

Cuando usar article   y cuando section

Ejemplo: La información sobre Bora-Bora puedo reutilizarlo y extraer el <article> para

publicarlo tal cual, en otra página, por ejemplo “Ofertas de destinos para otoño”

```html
<h2>Ofertas de destinos para otoño</h2>
<p>Nuestros destino en oferta:</p>
```

```html
<article>
<h3>Bora Bora</h3>
<p>Isla de la Polinesia Francesa caracterizada              por   sus   aguas
```

turquesas y sus hoteles sobre el mar.</p>

```html
<img src="bora.jpg" alt="Vista de Bora Bora" />
</article>
```


### 43. Elemento nav

[Ver diapositiva 43](HTML5.pdf#page=43)

nav

- El elemento nav representa una sección del documento del Software

que contiene enlaces a otras páginas o hacia partes importantes de la misma página.

```html
<nav>
<a href=“articulos.html">Articulos</a>
<a href=“actualidad.html">Actualidad</a>
<a href=“sucesos.html">Sucesos</a>
</nav>
```

- Nav se usa para:

- Menu principal del sitio

- Indices de contenidos

- Menú lateral de navegación

- Paginación de los resultados

- Migas de pan


### 44. Elemento nav

[Ver diapositiva 44](HTML5.pdf#page=44)

nav

- Frecuentemente se muestra una lista dentro del elemento del Software

nav

- Solo cuando las opciones de navegación son equivalentes

```html
<nav> <!—-Los lectores           de   pantalla    dicen    “lista   con   3
```

elementos” -- >

```html
<ul>
<li> <a href=“articulos.html">Articulos</a> </li>
<li> <a href=“actualidad.html">Actualidad</a> </li>
<li> <a href=“sucesos.html">Sucesos</a> </li>
</ul>
</nav>
```

- Con CSS se puede modificar las características para tener

un menu horizontal


### 45. Elemento aside

[Ver diapositiva 45](HTML5.pdf#page=45)

aside

- El elemento aside representa contenido relacionado del Software

de forma tangencial o complementaria con el contenido principal

- Debe ser considerado separado del contenido

principal y suele mostrar información complementaria

```html
<aside>
<h2>Destinos relacionados</h2>
<ul>
<li>Tahití</li>
<li>Samoa</li>
</ul>
</aside>
```


### 46. Elemento aside

[Ver diapositiva 46](HTML5.pdf#page=46)

aside

- También puede estar dentro de section o article

- Representar información complementaria al articulo o la sección,

pero no forma parte de su contenido principal

```html
<article>
<h1>Bora Bora</h1>
<p>Isla de la Polinesia Francesa caracterizada por susaguas
```

turquesas y sus hoteles sobre el mar.</p>

```html
<aside>
<h2>Datos rápidos</h2>
<ul>
<li>Ubicación: Polinesia Francesa</li>
<li>Población: 10 000 habitantes aprox.</li>
<li>Moneda: Franco CFP</li>
</ul>
</aside>
</article>
```


### 47. Elemento aside

[Ver diapositiva 47](HTML5.pdf#page=47)

aside

- Un aside no significa “barra lateral”

- Es información complementaria pero no principal

- Puede o no aparecer como una barra lateral, pero

también dentro de una section, article o integrado en el flujo general de la página


### 48. Elemento h1, h2, h3, h4, h5 y h6

[Ver diapositiva 48](HTML5.pdf#page=48)

Elemento h1, h2, h3, h4, h5 y h6

- Representan «encabezados» de una sección

- h1 representa el de más rango y el h6 el de menos.

- Deben seguir la secuencia lógica, jerarquía coherente de

encabezados

```html
<h1> Viajes exóticos </h1>
<h2> Islas del pacífico </h2>
```

- Se recomienda utilizar un único <h1> por documento para

identificar el tema principal y facilitar la comprensión de la estructura del contenido

- Aunque HTML permite múltiples <h1>

- En un sitio web con varios documentos suele identificar al propio

sitio web en todos los documentos


### 49. Elemento hgroup

[Ver diapositiva 49](HTML5.pdf#page=49)

Elemento hgroup

- Representa un encabezado h1-h6 con contenido relacionado que del Software

actúa como subtitulo, titulo alternativo o eslogan

- El elemento se puede utilizar para agrupar un elemento con uno o

más elementos p que contengan contenido que represente un subtítulo, un título alternativo o un eslogan.

```html
<hgroup>
<h1>Viajes exóticos</h1>
<p>Guía de destino del Pacífico Sur</p>
</hgroup>
```

- Su uso es muy poco frecuente


### 50. Elemento header

[Ver diapositiva 50](HTML5.pdf#page=50)

header

- Representa el contenido introductorio de una página o Informática

sección

- Generalmente contiene encabezados (h1 - h6 o

hgroup), logotipos, elementos de navegación o formularios de búsqueda

- Una página puede contener varios <header>

- Es muy habitual que el header principal contenga el

elemento <h1> y el elemento <nav> que representa la navegación principal


### 51. Elemento header

[Ver diapositiva 51](HTML5.pdf#page=51)

header

```html
<header> <!–- Header principal de la página -->
<h1>Viajes exóticos</h1>
<nav>
<a href="pacifico.html">Pacifico</a>
<a href="caribe.html">Caribe</a>
<a href="africa.html">Africa</a>
</nav>
</header>
```

```html
<section>
<header> <!–- Header de la sección Islas del Pacífico-->
<h2>Islas del Pacífico</h2>
<p> Destinos conocidos por sus playas, arrecifes de coral y paisajes
```

tropicales.</p>

```html
</header>
```

(…)

```html
</section>
```


### 52. Elemento footer

[Ver diapositiva 52](HTML5.pdf#page=52)

footer

- Representa el contenido de cierre de una página o Informática

sección

- Suele contener información sobre el autor, derechos

de autor, enlaces relacionados, información legal o datos de contacto

- Una página puede contener varios elementos <footer>

- Un <footer> puede pertenecer a una página completa, a una

sección o a un artículo

- Es habitual que el <footer> principal contenga enlaces

legales, información de contacto o enlaces de navegación secundaria


### 53. Elemento footer

[Ver diapositiva 53](HTML5.pdf#page=53)

footer

```html
<footer> <!-- Footer principal de la página -->
<p>© Viajes exóticos</p>
<nav>
<a href="contacto.html">Contacto</a>
<a href="privacidad.html">Política de privacidad</a>
<a href="creditos.html">Créditos</a>
</nav>
</footer>
```


### 54. Elemento footer

[Ver diapositiva 54](HTML5.pdf#page=54)

footer

```html
<article>
<h2>Bora Bora</h2>
<p> Isla de la Polinesia Francesa caracterizada
```

por sus aguas turquesas y sus hoteles sobre el mar. </p>

```html
<footer> <!-- Footer del artículo -->
<p>Autor: Cris Pelayo</p>
<p>Última actualización: septiembre de 2026</p>
</footer>
```

```html
</article>
```


### 55. Elemento address

[Ver diapositiva 55](HTML5.pdf#page=55)

address

- Contiene la información de contacto relacionada con el

autor o responsable del contenido más próximo (artículo, sección o documento)

```html
<footer> <!-- Footer principal de la página -->
<p>© Viajes exóticos</p>
<nav>
<a href="contacto.html">Contacto</a>
<a href="privacidad.html">Política de privacidad</a>
<a href="creditos.html">Créditos</a>
</nav>
<address>
<p>Más información:
<a href="mailto:viajes@ejemplo.es">Equipo de Viajes
```

exóticos</a></p>

```html
</address>
</footer>
```


### 56. Los elementos de sección deben utilizarse para

[Ver diapositiva 56](HTML5.pdf#page=56)

- Los elementos de sección deben utilizarse para

dotar al documento de estructura semántica

- El contenido debe organizarse para que refleje la

estructura lógica del documento

- Existe un elemento adicional <main> que permiten

organizar el contenido semánticamente

- En la especificación no está en secciones (elementos

semánticos de estructura) sino en Agrupamiento de contenidos main


### 57. Elemento main

[Ver diapositiva 57](HTML5.pdf#page=57)

main

- Identifica semánticamente el contenido principal del del Software

documento

- Contiene la información especifica de ese documento

- No debe incluir elementos que se repiten en múltiples

páginas del sitio como navegación principal, logotipos, información de copyright o formularios de búsqueda

- Debe existir como máximo un elemento <main> visible

en el documento


### 58. Elemento main

[Ver diapositiva 58](HTML5.pdf#page=58)

main

```html
<header> <!-- Header principal de la página -->
<h1>Viajes exóticos</h1>
<nav>
<a href="pacifico.html">Pacífico</a>
<a href="caribe.html">Caribe</a>
<a href="africa.html">África</a>
</nav>
</header>
```

```html
<main> <!-- Contenido principal de la página -->
<section>
<h2>Islas del Pacífico</h2>
```

(….)

```html
</section>
</main>
```

```html
<footer> <!-- Footer principal de la página -->
<p>© Viajes exóticos</p>
</footer>
```


### 59. Antes de HTML5 no existían los elementos

[Ver diapositiva 59](HTML5.pdf#page=59)

- Antes de HTML5 no existían los elementos

semánticos estructurales (header, nav, article, section, aside, footer o main)

- Para agrupar contenidos se utilizaban principalmente

dos elementos genéricos div span


### 60. Elemento div

[Ver diapositiva 60](HTML5.pdf#page=60)

div

- Elemento genérico de bloque, sin significado semántico especial

- En HTML 4.01 era el principal elemento de bloque para agrupar

contenido

- La especificación HTML recomienda utilizar <div> únicamente

cuando ningún otro elemento semántico sea adecuado.

“Se recomienda encarecidamente a los autores que consideren el elemento div como un elemento de último recurso, para cuando ningún otro elemento sea adecuado. El uso de elementos más apropiados en lugar del elemento div permite una mejor accesibilidad para los lectores y un mantenimiento más sencillo para los autores.”

- <div> es el “cajón de sastre” de HTML para el contenido en

bloque, debe considerarse el último recurso


### 61. Elemento div

[Ver diapositiva 61](HTML5.pdf#page=61)

div

```html
<!–- Agrupa contenido pero                 <!-- Este bloque
```

no informa que representa representa una sección ese contenido --> temática del documento -->

```html
<div id=“seccion”>           <section>
<h2>Islas del Pacífico</h2> <h2>Islas del Pacífico</h2>
( … ) ( … )
</div>                       </section>
```


### 62. Elemento span

[Ver diapositiva 62](HTML5.pdf#page=62)

span

- Elemento genérico en línea para agrupar fragmentos

de texto sin aportar significado semántico

- En HTML 4.01 era el principal elemento de línea para

agrupar contenido

- La especificación HTML recomienda utilizar <span>

únicamente cuando ningún otro elemento semántico sea adecuado (<strong>, <em>, <code>, <mark>,etc)

- <span> es el “cajón de sastre” de HTML para

contenido en línea, debe considerarse el último recurso


### 63. Elemento span

[Ver diapositiva 63](HTML5.pdf#page=63)

span

```html
<!–-Agrupa una parte del     <!--Este fragmento
```

texto pero no informa qué representa información representa ese contenido-->  especialmente importante-->

```html
<p>
<p>                          Bora Bora destaca por sus
```

Bora Bora destaca por sus <strong>aguas

```html
<span>aguas turquesas</span> turquesas</strong>
</p>                         </p>
```



## Elementos de agrupación de contenido

### 65. Los elementos estructurales (<section>, <article>, Ingeniería

[Ver diapositiva 65](HTML5.pdf#page=65)

- Los elementos estructurales (<section>, <article>, Ingeniería

```html
<nav>...) organizan las distintas partes del documento Informática
```

- Los elementos de agrupación de contenido organizan

el contenido dentro de esas partes

- La elección del elemento depende de la naturaleza del

contenido que se desea representar: párrafos (<p>), citas (<blockquote>), listas(<ul>, <ol>, <li>, <dl>, <dt>,

```html
<dd>), texto preformateado (<pre>), etc.
```

- La elección del elemento depende de la semántica del

contenido y no de su presentación visual.


### 66. Elemento <p>

[Ver diapositiva 66](HTML5.pdf#page=66)

```html
<p> representa un párrafo de texto
```

- Un párrafo representa una unidad temática                    de Informática

contenido

- Los párrafos se delimitan mediante una etiqueta de

apertura <p> y una etiqueta de cierre </p>

- Dos elementos <p> producen dos párrafos distintos

- No debe utilizarse <br> para separar párrafos

- El navegador ignora los saltos de línea y espacios en

blanco adicionales en el código fuente


### 67. Elemento <p>

[Ver diapositiva 67](HTML5.pdf#page=67)

```html
<p> representa un párrafo de texto
```

- El navegador ignora los saltos de línea y los espacios Informática

adicionales que aparecen en el código

```html
<p> Bora Bora es uno de los
destinos más visitados de la
Polinesia Francesa por sus
paisajes tropicales y sus
aguas cristalinas.</p>
```

```html
<p> La mejor época para
visitarla suele
```

El navegador ignora los saltos de situarse entre mayo y línea y los espacios adicionales octubre, cuando las lluvias son que aparecen en el código fuente menos frecuentes.

```html
</p>
```


### 68. pre: representa texto preformateado

[Ver diapositiva 68](HTML5.pdf#page=68)

pre: representa texto preformateado

- Mantiene los saltos de línea, los espacios en blanco y Informática

los tabuladores exactamente como aparece en el código fuente

- A diferencia de <p>, conserva el formato existente en el

código fuente

- Se utiliza habitualmente para:

- Código fuente

- Salidas de consola

- Tablas ASCII

- Poemas

- Otros textos donde el espaciado es importante


### 69. pre: representa texto preformateado

[Ver diapositiva 69](HTML5.pdf#page=69)

pre: representa texto preformateado

```html
<pre> <!-- ejemplo de poema -->
```

Bora Bora

Entre lagunas de cristal, descansa la isla tropical.

El mar refleja el cielo azul, mientras la brisa cruza el atolón.

```html
</pre>
```

El navegador mantiene los saltos de línea y las tabulaciones que aparecen en el código fuente


### 70. blockquote: representa una cita extensa procedente de Ingeniería

[Ver diapositiva 70](HTML5.pdf#page=70)

blockquote: representa una cita extensa procedente de Ingeniería otra fuente de información

- Se utiliza para citar contenido externo

- El navegador suele mostrarla con sangrado

- Puede contener varios párrafos u otros elementos

HTML

- No debe utilizarse para aplicar efectos visuales


### 71. blockquote: representa una cita extensa procedente de Ingeniería

[Ver diapositiva 71](HTML5.pdf#page=71)

blockquote: representa una cita extensa procedente de Ingeniería otra fuente de información

```html
<blockquote> <!-- ejemplo de cita -->
```

Bora Bora es conocida internacionalmente por sus lagunas cristalinas y sus complejos turísticos construidos sobre el agua.

```html
</blockquote>
```

```html
<p>Fuente: Guía oficial de turismo de la Polinesia Francesa</p>
```

El navegador suele mostrar las citas con sangrado


### 72. <hr> representa una ruptura temática entre bloques de Ingeniería

[Ver diapositiva 72](HTML5.pdf#page=72)

```html
<hr> representa una ruptura temática entre bloques de Ingeniería
```

contenido relacionados

- Puede indicar un cambio de tema, escena o sección

conceptual dentro de un documento

- Su representación habitual es una línea horizontal

- No debe utilizarse únicamente para dibujar líneas

decorativas

- La ruptura temática tiene significado semántico no

únicamente visual


### 73. <hr> representa una ruptura temática entre bloques de Ingeniería

[Ver diapositiva 73](HTML5.pdf#page=73)

```html
<hr> representa una ruptura temática entre bloques de Ingeniería
```

contenido relacionados

```html
<section>
<h2>Islas del Pacífico</h2>
```

```html
<p> Bora Bora destaca por
sus lagunas cristalinas y sus
hoteles construidos sobre el
agua. </p>
```

```html
<hr>
```

```html
<p> Mejor época para viajar:                 1er bloque descripción del destino
de mayo a octubre.</p>
<hr> marca una ruptura temática
</section>                                     dentro del contenido
```

2º bloque información práctica para el viaje


### 74. HTML proporciona tres tipos de listas:

[Ver diapositiva 74](HTML5.pdf#page=74)

HTML proporciona tres tipos de listas:

- Listas no ordenadas <ul>

- El orden de los elementos no es significativo

- Los elementos de la lista se representan con <li>

- Listas ordenadas <ol>

- El orden de los elementos es significativo

- Los elementos de la lista se representan con <li>

- Listas de definición/descripción <dl>

- Permite asociar términos y descripciones de esos términos

- El termino se representa con <dt>

- La descripción se representa con <dd>

- La elección del tipo de lista depende de la semántica

del contenido


### 75. Listas no ordenadas <ul>

[Ver diapositiva 75](HTML5.pdf#page=75)

Listas no ordenadas <ul>

- Se utilizan cuando el orden de los elementos no es Informática

significativo

- Suelen representarse con “viñetas”

```html
<h2>Islas del Pacífico</h2>
<ul>
<li>Bora Bora</li>
<li>Fiyi</li>
<li>Samoa</li>
</ul>
```


### 76. Listas ordenadas <ol>

[Ver diapositiva 76](HTML5.pdf#page=76)

Listas ordenadas <ol>

- El orden de los elementos es importante

- Cambiar el orden altera el significado

- Suelen representarse con números que representan el

orden

```html
<h2>Preparación del viaje</h2>
<ol>
<li>Reservar el vuelo</li>
<li>Reservar el alojamiento</li>
<li>Contratar el seguro</li>
</ol>
```


### 77. Listas de descripción/definición <dl>

[Ver diapositiva 77](HTML5.pdf#page=77)

Listas de descripción/definición <dl>

- Se utilizan para asociar términos y descripciones

- Son habituales en glosarios, diccionarios y FAQs

```html
<h2>Islas del Pacífico</h2>
```

```html
<dl>
<dt>Bora Bora</dt>
<dd>Isla de la Polinesia Francesa.</dd>
```

```html
<dt>Fiyi</dt>
<dd>Archipiélago del Pacífico Sur.</dd>
```

```html
<dt>Samoa</dt>
<dd>Conjunto de islas volcánicas de cultura polinesia.</dd>
</dl>
```


### 78. Anidamiento de listas

[Ver diapositiva 78](HTML5.pdf#page=78)

Anidamiento de listas

- Las listas pueden anidarse para representar

relaciones jerárquicas entre sus elementos

- La lista anidada debe aparecer dentro de un

elemento <li>

- Los elementos HTML deben anidarse correctamente

y formar una estructura jerárquica

```html
<ul>
<li>Elemento 1</li>
<li>Elemento 2
<!–- lista anidada -->
<ol>
<li>Elemento 2.1</li>
<li>Elemento 2.2 </li>
<li>Elemento 2.3 </li>
</ol>
</li>
<li>Elemento 3 </li>
</ul>
```


### 79. Anidamiento de listas

[Ver diapositiva 79](HTML5.pdf#page=79)

Anidamiento de listas

```html
<h2>Islas del Pacífico</h2>
<ul>
<li>Bora Bora</li>
```

```html
<li>
```

Fiyi

```html
<!-- Lista anidada -->
<ol>
<li>Buceo en arrecifes</li>
<li>Excursión en barco</li>
<li>Senderismo</li>
</ol>
```

```html
</li>
```

```html
<li>Samoa</li>
```

```html
</ul>
```


### 80. <figure> representa contenido autónomo relacionado

[Ver diapositiva 80](HTML5.pdf#page=80)

```html
<figure> representa contenido autónomo relacionado
```

con el contenido principal del documento

- Puede contener imágenes, diagramas, tablas, listados de

código, ilustraciones o ejemplos

- El contenido puede desplazarse o reutilizarse sin afectar al

resto del documento

- Al igual que <article> representa una unidad

autónoma de contenido textual, <figure> representa una unidad autónoma de contenido ilustrativo o complementario

- Habitualmente <figure> contiene una imagen,

aunque puede contener otros tipos de contenido


### 81. <figcaption> representa el título o descripción de un Ingeniería

[Ver diapositiva 81](HTML5.pdf#page=81)

```html
<figcaption> representa el título o descripción de un Ingeniería
```

elemento <figure>

- Proporciona contexto al elemento <figure>

- Puede situarse al principio o al final de la figura

- Una <figure> puede contener como máximo un <figcaption>


### 82. <figure> y <figcaption> con imágenes (lo más habitual)

[Ver diapositiva 82](HTML5.pdf#page=82)

```html
<figure> y <figcaption> con imágenes (lo más habitual)
<h2>Viajes exóticos</h2>
```

```html
<figure>
<img src="lagunaBoraBora.jpg"
```

alt="Vista de Bora Bora" />

```html
<figcaption>
```

Vista aérea de Bora Bora, en la Polinesia Francesa.

```html
</figcaption>
```

```html
</figure>
```


### 83. <figure> y <figcaption> con contenido no gráfico

[Ver diapositiva 83](HTML5.pdf#page=83)

```html
<figure> y <figcaption> con contenido no gráfico
<h2>Viajes</h2>
<figure>
<figcaption>
```

Descripción de Bora Bora tomada de una guía turística.

```html
</figcaption>
```

```html
<blockquote>
```

Bora Bora es conocida internacionalmente por sus lagunas cristalinas y sus complejos turísticos construidos sobre el agua.

```html
</blockquote>
```

```html
</figure>
```


### 84. <menu> representa una lista de comandos u opciones

[Ver diapositiva 84](HTML5.pdf#page=84)

```html
<menu> representa una lista de comandos u opciones
```

disponibles para el usuario

- Está relacionado con <ul> y utiliza elementos <li>

- Históricamente se diseñó para representar menús de

comando u opciones

- Actualmente su uso es poco frecuente, y se sustituye

soluciones basadas en elementos <ul> junto con CSS y JavaScript

- Es importante distinguir el uso de los elementos:

- <nav> para navegación

- <menú> para acciones u opciones

- <ul> lista genérica


### 85. <menu> representa una lista de comandos u opciones

[Ver diapositiva 85](HTML5.pdf#page=85)

```html
<menu> representa una lista de comandos u opciones
```

disponibles para el usuario

```html
<h2>Acciones disponibles</h2>
```

```html
<menu>
<li>Reservar viaje</li>
<li>Consultar disponibilidad</li>
<li>Solicitar información</li>
</menu>
```


### 86. <search> representa una región del documento

[Ver diapositiva 86](HTML5.pdf#page=86)

```html
<search> representa una región del documento
```

destinada a realizar búsquedas

- Suele contener un formulario de búsqueda

- Aporta semántica específica para esta funcionalidad

- Su uso es poco frecuente en comparación con otros

elementos HTML

- El elemento <search> es relativamente reciente y algunas

herramientas de validación HTML no lo reconocen correctamente

- Como alternativa compatible con los validadores actuales puede

utilizarse <form role="search"> en lugar de <search>


### 87. <search> representa una región del documento

[Ver diapositiva 87](HTML5.pdf#page=87)

```html
<search> representa una región del documento
```

destinada a realizar búsquedas

- El elemento <search> es relativamente reciente y algunos

validadores HTML todavía no lo reconocen correctamente.

```html
<h2>Buscar destinos</h2>
<search>
<form>
<label for="destino"> Destino: </label>
<input id="destino" name="destino" type="search">
<button> Buscar </button>
</form>
</search>
```


### 88. Resumen: la elección del elemento depende de la

[Ver diapositiva 88](HTML5.pdf#page=88)

Resumen: la elección del elemento depende de la semántica del contenido y no de su presentación visual. <p> → párrafos

```html
<pre> → texto preformateado
<blockquote> → citas extensas
<hr> → ruptura temática
<ul> → lista no ordenada
<ol> → lista ordenada
<dl> → lista de descripción
<figure> → contenido autónomo ilustrativo o complementario
<figcaption> → titulo o descripción de una figura
<menu> → conjunto de comandos, acciones u opciones
<search> → región destinada a realizar búsquedas
```

Nota: Aunque la especificación HTML clasifica también <main> y <div> dentro de los elementos de agrupación de contenido, en estos apuntes se estudiaron previamente junto con los elementos estructurales por razones didácticas.



## Elementos semánticos de texto y enlaces

### 90. Elemento <a> representa un hiperenlace

[Ver diapositiva 90](HTML5.pdf#page=90)

Elemento <a> representa un hiperenlace

- Permite enlazar recursos, documentos, ubicaciones Informática

dentro de una página o servicios externos

- El contenido del elemento constituye el texto visible

del enlace

- El destino y el comportamiento del enlace se

especifican mediante atributos

```html
<p>
Descubre más información sobre <a href="borabora.html"> Bora Bora</a>.
</p>
```


### 91. Atributo href del elemento <a> indica el destino del Ingeniería

[Ver diapositiva 91](HTML5.pdf#page=91)

Atributo href del elemento <a> indica el destino del Ingeniería hiperenlace

- El atributo href admite distintos tipos de destinos:

- Enlaces absolutos mediante URL completas

```html
<a href="https://www.uniovi.es">
– Enlaces relativos a recursos del mismo sitio
<a href=“borabora.html">
– Enlaces internos a fragmentos del documento
<a href="#pacifico">
– Enlaces a direcciones de correo electrónico
<a href=“mailto:info@viajesexoticos.es">
– Enlaces a número de teléfonos
<a href=“tel:+34985000000">
```


### 92. Atributo href del elemento <a> indica el destino del Ingeniería

[Ver diapositiva 92](HTML5.pdf#page=92)

Atributo href del elemento <a> indica el destino del Ingeniería hiperenlace

```html
<h2>Viajes exóticos</h2>
```

```html
<ul>
<li> <a href="https://www.uniovi.es">Universidad de Oviedo </a> </li>
<li> <a href="borabora.htlm">Bora Bora</a> </li>
<li> <a href="#pacifico">Islas del Pacífico</a> </li>
<li> <a href="mailto:info@viajesexoticos.es">Enviar mail a Viajes
```

Exóticos </a> </li>

```html
<li> <a href="tel:+34985000000">+34 985 000 000</a> </li>
</ul>
```

```html
<h2 id="pacifico">Islas del Pacífico</h2>
```

(...)


### 93. El atributo target del elemento <a> indica el contexto donde

[Ver diapositiva 93](HTML5.pdf#page=93)

El atributo target del elemento <a> indica el contexto donde debe abrirse el recurso del hiperenlace

- Valores habituales:

- target="_self“, mismo contexto de navegación (pestaña) (por

defecto)

- target="_blank“, nueva pestaña o ventana

- target="_parent“, contexto padre (uso con iframes)

- target="_top“, contexto superior (uso con iframes)

- target=“nombre”, contexto de navegación identificado por

“nombre”

- Debe utilizarse con precaución cuando provoque cambios

de contexto para el usuario

- Si se utiliza target="_blank“ debe advertirse al Usuario que el

enlace se abrirá en una pestaña o ventana nueva

- Los cambios de contexto inesperados pueden generar

problemas de accesibilidad por ser confusos para algunos usuarios


### 94. El atributo target del elemento <a> indica el contexto Ingeniería

[Ver diapositiva 94](HTML5.pdf#page=94)

El atributo target del elemento <a> indica el contexto Ingeniería donde debe abrirse el recurso del hiperenlace

```html
<a href="https://www.uniovi.es"
```

target="_blank"> Universidad de Oviedo (se abre en una nueva ventana) </a>


### 95. El atributo rel del elemento <a> indica la relación entre

[Ver diapositiva 95](HTML5.pdf#page=95)

El atributo rel del elemento <a> indica la relación entre el documento actual y el recurso enlazado

- Valores habituales:

- noopener: el documento enlazado no puede acceder a la

ventana que abrió el enlace. Mejora la seguridad

- noreferrer: no se envía información de referencia al recurso

enlazado

- external: indica que el recurso enlazado pertenece a un sitio

externo o recurso externo

- nofollow: indica a los motores de búsqueda que no sigan el

enlace ni transfieran reputación al recurso enlazado

- Los valores noopener y noreferrer son habituales

cuando se utiliza target="_blank"


### 96. El atributo target y el atributo rel del elemento <a>

[Ver diapositiva 96](HTML5.pdf#page=96)

El atributo target y el atributo rel del elemento <a>

```html
<a href="https://www.uniovi.es"
```

target="_blank" rel="noopener noreferrer"> Universidad de Oviedo (se abre en una ventana nueva)

```html
</a>
```


### 97. El atributo download del elemento <a> indica que el

[Ver diapositiva 97](HTML5.pdf#page=97)

El atributo download del elemento <a> indica que el recurso debe descargarse en lugar navegar hacía él (mostrarse o abrirse)

- Suele utilizarse para documentos, imágenes o

archivos

- El navegador intenta descargar el recurso

```html
<a href="guía-pacifico.pdf“ download>
```

Descargar la guía de las Islas del pacífico</a>

- Puede utilizarse sin valor download o indicando el

nombre sugerido para el archivo download ="guía- pacifico.pdf"


### 98. El atributo title del elemento <a> permite proporcionar

[Ver diapositiva 98](HTML5.pdf#page=98)

El atributo title del elemento <a> permite proporcionar información complementaria sobre el recurso enlazado

- Algunos navegadores muestran la información como

texto emergente al situar el punturo sobre el enlace

- No debe utilizarse como único mecanismo para

transmitir información importante.

- Muchos usuarios de dispositivos táctiles pueden no

acceder fácilmente a esta información.

```html
<p> Descubre más información sobre <a href="bora-bora.html"
```

title="Guía turística de Bora Bora">Bora Bora</a></p>


### 99. El elemento <em> representa un énfasis en el texto

[Ver diapositiva 99](HTML5.pdf#page=99)

El elemento <em> representa un énfasis en el texto

- Indica que una palabra o fragmento debe enfatizarse

- Puede modificar el significado de una frase

- Los navegadores suelen representarlo en cursiva


### 100. El elemento <strong> representa un texto

[Ver diapositiva 100](HTML5.pdf#page=100)

El   elemento <strong> representa   un   texto especialmente importante.

- Indica importancia, urgencia o relevancia

- Aporta significado semántico

- Los navegadores suelen representarlo en negrita


### 101. El elemento <small> representa comentarios,

[Ver diapositiva 101](HTML5.pdf#page=101)

El elemento <small> representa comentarios, aclaraciones o información auxiliar.

- Suele utilizarse para notas legales o aclaraciones.

- Representa información secundaria.

- No debe utilizarse únicamente para reducir el tamaño

del texto.


### 102. El elemento <s> representa contenido que ya no es

[Ver diapositiva 102](HTML5.pdf#page=102)

El elemento <s> representa contenido que ya no es correcto o relevante.

- Suele utilizarse para indicar información obsoleta.

- No implica eliminación del contenido.

- Los navegadores suelen representarlo tachado.


### 103. El elemento <del> representa contenido eliminado del

[Ver diapositiva 103](HTML5.pdf#page=103)

El elemento <del> representa contenido eliminado del documento. (4.7 “Edits” en la especificación)

- Indica que el contenido ha sido retirado.

- Puede utilizarse junto con fecha y autor del cambio.

- Los navegadores suelen representarlo tachado.

El elemento <ins> contenido añadido al documento. (4.7 “Edits” en la especificación)

- Indica una inserción o modificación.

- Puede utilizarse junto con fecha y autor del cambio.

- Los navegadores suelen representarlo subrayado.


### 104. El elemento <cite> representa el título de una obra.

[Ver diapositiva 104](HTML5.pdf#page=104)

El elemento <cite> representa el título de una obra.

- Puede utilizarse para libros, artículos, películas,

canciones o publicaciones.

- Identifica la obra citada.

- No representa el autor de la obra.


### 105. El elemento <q> representa una cita breve en línea.

[Ver diapositiva 105](HTML5.pdf#page=105)

El elemento <q> representa una cita breve en línea.

- Se utiliza para citas cortas integradas en un párrafo.

- A diferencia de <blockquote>, no genera un bloque

independiente.

- Los      navegadores       suelen    añadir    comillas

automáticamente.


### 106. El elemento <dfn> representa el término que está

[Ver diapositiva 106](HTML5.pdf#page=106)

El elemento <dfn> representa el término que está siendo definido.

- Se utiliza junto con una definición.

- Identifica el concepto definido por primera vez.

- Es habitual en glosarios y documentación técnica.


### 107. El elemento <abbr> representa una abreviatura o

[Ver diapositiva 107](HTML5.pdf#page=107)

El elemento <abbr> representa una abreviatura o acrónimo.

- Permite indicar la forma completa mediante title.

- Facilita la comprensión del contenido.

- Mejora la accesibilidad de abreviaturas poco

conocidas.


### 108. El elemento <ruby> representa anotaciones de

[Ver diapositiva 108](HTML5.pdf#page=108)

El elemento <ruby> representa anotaciones de pronunciación o explicación

- Se utiliza principalmente en lenguas asiáticas

- Permite asociar anotaciones a caracteres concretos

- Suele combinarse con <rt>


### 109. El elemento <rt> el texto de la anotación de un

[Ver diapositiva 109](HTML5.pdf#page=109)

El elemento <rt> el texto de la anotación de un elemento <ruby>

- Contiene la pronunciación o explicación asociada.

- Debe utilizarse dentro de <ruby>.

- Suele aparecer sobre o junto al texto principal.


### 110. El elemento <rp> proporciona texto alternativo para

[Ver diapositiva 110](HTML5.pdf#page=110)

El elemento <rp> proporciona texto alternativo para navegadores que no soportan ruby

- Se utiliza junto con <ruby> y <rt>

- Normalmente contiene paréntesis

- Su uso es poco frecuente en la práctica


### 111. El elemento <data> asocia contenido visible con un

[Ver diapositiva 111](HTML5.pdf#page=111)

El elemento <data> asocia contenido visible con un valor legible por máquinas.

- Combina información para personas y aplicaciones

- Utiliza el atributo value

- Facilita el procesamiento automático de datos


### 112. El elemento <time> representa una fecha, una hora o

[Ver diapositiva 112](HTML5.pdf#page=112)

El elemento <time> representa una fecha, una hora o una duración.

- Puede utilizarse con el atributo datetime.

- Facilita la interpretación automática de fechas.

- Mejora la semántica del documento.


### 113. El elemento <code> representa un fragmento de código.

[Ver diapositiva 113](HTML5.pdf#page=113)

El elemento <code> representa un fragmento de código.

- Se utiliza para código fuente, etiquetas o comandos.

- Aporta significado semántico.

- Suele representarse con una fuente monoespaciada.


### 114. El elemento <var> representa una variable.

[Ver diapositiva 114](HTML5.pdf#page=114)

El elemento <var> representa una variable.

- Suele utilizarse en expresiones matemáticas o

código.

- Identifica valores que pueden variar.

- Tiene significado semántico específico.


### 115. El elemento <samp> representa la salida de un

[Ver diapositiva 115](HTML5.pdf#page=115)

El elemento <samp> representa la salida de un programa o sistema.

- Se utiliza para mostrar resultados producidos por

software.

- Es habitual en documentación técnica.

- Suele representarse con una fuente monoespaciada.


### 116. El elemento <kbd> representa una entrada realizada

[Ver diapositiva 116](HTML5.pdf#page=116)

El elemento <kbd> representa una entrada realizada por el usuario.

- Suele utilizarse para teclas o combinaciones de

teclado.

- También puede representar comandos introducidos

por el usuario.

- Tiene significado semántico específico.


### 117. El elemento <sub> representa texto en subíndice.

[Ver diapositiva 117](HTML5.pdf#page=117)

El elemento <sub> representa texto en subíndice.

- Se utiliza en fórmulas químicas o matemáticas.

- El contenido aparece por debajo de la línea base.

- Aporta significado semántico.

El elemento <sup> representa texto en superíndice.

- Se utiliza en exponentes o referencias.

- El contenido aparece por encima de la línea base.

- Aporta significado semántico.


### 118. El elemento <mark> representa texto destacado por su

[Ver diapositiva 118](HTML5.pdf#page=118)

El elemento <mark> representa texto destacado por su relevancia en un contexto determinado.

- Indica contenido relevante o resaltado.

- No implica importancia semántica como <strong>.

- Los navegadores suelen representarlo con fondo

resaltado.


### 119. El elemento <b> representa texto al que se desea dirigir

[Ver diapositiva 119](HTML5.pdf#page=119)

El elemento <b> representa texto al que se desea dirigir visualmente la atención.

- No implica importancia semántica.

- Se diferencia de <strong>.

- Los navegadores suelen representarlo en negrita.


### 120. El elemento <i> representa texto con una voz o

[Ver diapositiva 120](HTML5.pdf#page=120)

El elemento <i> representa texto con una voz o significado diferente al del texto circundante.

- Puede       utilizarse    para      términos  técnicos,

expresiones extranjeras o taxonomías.

- No implica énfasis.

- Los navegadores suelen representarlo en cursiva.


### 121. El elemento <u> representa texto anotado de forma no

[Ver diapositiva 121](HTML5.pdf#page=121)

El elemento <u> representa texto anotado de forma no textual.

- Puede utilizarse para nombres propios en algunas

lenguas o para indicar errores ortográficos.

- No debe utilizarse únicamente para subrayar texto.

- Los navegadores suelen representarlo subrayado.


### 122. El elemento <u> representa texto anotado de forma no

[Ver diapositiva 122](HTML5.pdf#page=122)

El elemento <u> representa texto anotado de forma no textual.

- Puede utilizarse para nombres propios en algunas

lenguas o para indicar errores ortográficos.

- No debe utilizarse únicamente para subrayar texto.

- Los navegadores suelen representarlo subrayado.


### 123. El elemento <bdi> (Bidirectional Isolation) aísla un

[Ver diapositiva 123](HTML5.pdf#page=123)

El elemento <bdi> (Bidirectional Isolation) aísla un fragmento de texto cuyo sentido de escritura puede ser diferente al del texto circundante.

- Se utiliza en contenido multilingüe.

- Evita que la dirección del texto afecte al contenido

vecino.

- Resulta útil para nombres o textos generados por

usuarios.


### 124. El elemento <bdo> (Bidirectional Override) permite

[Ver diapositiva 124](HTML5.pdf#page=124)

El elemento <bdo> (Bidirectional Override) permite forzar la dirección de escritura del texto.

- Utiliza el atributo dir.

- Puede forzar escritura de izquierda a derecha (ltr).

- Puede forzar escritura de derecha a izquierda (rtl).


### 125. El elemento <br> representa un salto de línea

[Ver diapositiva 125](HTML5.pdf#page=125)

El elemento <br> representa un salto de línea

- Inserta una nueva línea dentro del contenido.

- No crea un nuevo párrafo.

- Debe utilizarse cuando el salto de línea tenga significado

semántico (direcciones, poemas, etc.).

- Aunque es más recomendable utilizar elementos semánticos

El elemento <wbr> representa una posible oportunidad de salto de línea.

- Permite al navegador dividir una palabra o cadena larga.

- Solo se utiliza si resulta necesario.

- No genera un salto de línea visible por sí mismo.


### 126. El elemento <span> representa un contenedor genérico

[Ver diapositiva 126](HTML5.pdf#page=126)

El elemento <span> representa un contenedor genérico en línea sin significado semántico propio.

- Permite agrupar fragmentos de texto.

- Suele utilizarse junto con CSS o JavaScript.

- Debe considerarse el último recurso para contenido

en línea, de forma similar a <div> para el contenido en bloque.


### 127. Resumen <kbd> Entrada del usuario

[Ver diapositiva 127](HTML5.pdf#page=127)

Resumen <kbd> Entrada del usuario La elección del elemento debe depender de la   <sub> Subíndice semántica del contenido y no de su presentación visual. <sup> Superíndice

```html
<a>     Hiperenlace                            <b> Atención visual
<em>     Énfasis                               <i> Voz o significado diferente
<strong> Importancia especial                  <u> Anotación no textual
<small> Información secundaria                 <mark> Texto resaltado
<s>    Contenido obsoleto
<bdi> Aislamiento bidireccional
<cite> Título de una obra
<bdo> Fuerza la dirección
<q>     Cita breve en línea
<ruby> Anotaciones de pronunciación
<dfn> Término definido
<abbr> Abreviatura o acrónimo                  <rt> Texto de anotación ruby
<data> Valor legible por máquinas              <rp> Texto alternativo para ruby
<time> Fecha, hora o duración                  <br> Salto de línea
<code> Fragmento de código                     <wbr> Oportunidad de salto de línea
<var> Variable                                 <span> Contenedor genérico en línea
<samp> Salida de un programa
```



## Contenido incrustado

### 129. El contenido incrustado tiene los siguientes elementos:

[Ver diapositiva 129](HTML5.pdf#page=129)

El contenido incrustado tiene los siguientes elementos:

- <img>

- <picture>

- <source>

- <audio>

- <video>

- <track>

- <iframe>

- <embed>

- <object>


### 130. El elemento <img> representa una imagen

[Ver diapositiva 130](HTML5.pdf#page=130)

El elemento <img> representa una imagen

- El atributo src (obligatorio): identifica la imagen que se desea Informática

mostrar.

- El atributo alt (obligatorio): proporciona un texto alternativo para la

imagen.

- El texto se utiliza cuando la imagen no puede mostrarse y por tecnologías de

apoyo como lectores de pantalla.

- Los atributos width y height permiten indicar las dimensiones de

la imagen.

- No deben utilizarse para redimensionar la imagen, sino para informar al

navegador de su tamaño y mejorar la carga y la estabilidad visual de la página.


### 131. El elemento <img> representa una imagen

[Ver diapositiva 131](HTML5.pdf#page=131)

El elemento <img> representa una imagen <img

src="BoraBora.jpg" alt="Vista aérea de la laguna de Bora Bora, en la Polinesia Francesa" width="800" height="534">

```html
<!–- el archivo BoraBora.jpg tiene ancho 800
pixeles y de alto 534 pixeles -->
```


### 132. El elemento <picture> permite proporcionar varias Ingeniería

[Ver diapositiva 132](HTML5.pdf#page=132)

El elemento <picture> permite proporcionar varias Ingeniería versiones alternativas de una imagen

- Contiene uno o varios elementos <source> y un del Software

elemento <img>.

- El navegador selecciona automáticamente la imagen

más adecuada según las características del dispositivo.

- Puede utilizarse para:

- Adaptar imágenes a distintos tamaños de pantalla.

- Proporcionar distintos formatos de imagen (AVIF, WebP,

JPEG, etc.).

- Mostrar versiones diferentes según el dispositivo.

- Facilita el diseño adaptable (responsive design).


### 133. El elemento <picture> permite proporcionar varias versiones

[Ver diapositiva 133](HTML5.pdf#page=133)

El elemento <picture> permite proporcionar varias versiones alternativas de una imagen

```html
<picture>
<!-- para pantallas pequeñas menores de 600px -->
<source media="(max-width: 600px)"
```

srcset="bora-mobile.jpg">

```html
<!-- para pantallas medianas menores de 1024px -->
<source media="(max-width: 1024px)"
```

srcset="bora-tablet.jpg">

```html
<!-- para el resto de dispositivos -->
<img src="BoraBora.jpg"
```

alt="Vista aérea de la laguna de Bora Bora Polinesia Francesa" width="800" height="533"/>

```html
</picture>
```


### 134. Versiones de la imagen del <picture>

[Ver diapositiva 134](HTML5.pdf#page=134)

Versiones de la imagen del <picture>

La imagen original tiene unas dimensiones de 800x533 pixeles

- Relación de aspecto 800/533 = 1,501 = 1.5:1

- La relación de aspecto se mantiene para evitar deformaciones de la

imagen:

- Ancho nuevo = Ancho original × factor de escala

- Alto nuevo = Alto original × factor de escala

- Imagen original BoraBora.jpg 800 × 533 píxeles (imagen original)

- Pantallas pequeñas (≤ 600 px) bora-mobile.jpg 400 × 267 píxeles

- Movil 400 pixeles de ancho

- Escala para el móvil: 400/800 = 0,50 factor de escala

- Alto nuevo 533*0,50 = 267 pixeles

- Pantallas medianas (≤ 1024 px) bora-tablet.jpg 600 × 400 píxeles

- Tablet 600 pixeles de ancho

- Escala para Tablet 600/800=0,75 factor de escala

- Alto nuevo 533*0,75= 400


### 135. El elemento <audio> permite reproducir contenido Ingeniería

[Ver diapositiva 135](HTML5.pdf#page=135)

El elemento <audio> permite reproducir contenido Ingeniería sonoro en el sitio web

- Atributo src: identifica el archivo de audio que se del Software

desea reproducir.

- Atributo controls: muestra los controles de

reproducción Elemento <source>: permite proporcionar varias fuentes de audio para mejorar la compatibilidad entre navegadores

- Con el atributo type se establece el tipo MIME del

archivo multimedia:

- MP3 audio/mpeg

- OGG audio/ogg

- WAV audio/wav


### 136. El elemento <audio> permite reproducir contenido Ingeniería

[Ver diapositiva 136](HTML5.pdf#page=136)

El elemento <audio> permite reproducir contenido Ingeniería sonoro en el sitio web

- MP3 formato ampliamente soportado

- OGG formato alternativo

- El navegador intenta reproducir la primera fuente

compatible

```html
<!-– una única fuente -->
<audio src= "olas-borabora.mp3" controls> </audio>
```

```html
<!–- Varias fuentes para un mismo contenido sonoro -->
<audio controls>
<source src= "olas-borabora.mp3" type="audio/mpeg" />
<source src= "olas-borabora.ogg" type="audio/ogg" />
```

Su navegador no soporta el elemento audio

```html
</audio>
```


### 137. El elemento <video> permite reproducir contenido audiovisual Ingeniería

[Ver diapositiva 137](HTML5.pdf#page=137)

El elemento <video> permite reproducir contenido audiovisual Ingeniería en el sitio web

- Atributo src: identifica el archivo de video que se desea del Software

reproducir.

- Atributo controls: muestra los controles de reproducción

Elemento <source>: permite proporcionar varias fuentes de video para mejorar la compatibilidad entre navegadores

- Con el atributo type se establece el tipo MIME del archivo

multimedia:

- MP4 video/mp4

- WEBM video/webm

- OGG video/ogg

- Con el atributo poster se indica la imagen que se muestra

antes de iniciar la reproducción


### 138. El elemento <video> permite reproducir contenido Ingeniería

[Ver diapositiva 138](HTML5.pdf#page=138)

El elemento <video> permite reproducir contenido Ingeniería audiovisual en el sitio web

- MP4 formato ampliamente soportado

- WEBM formato alternativo

- El navegador intenta reproducir la primera fuente

compatible

```html
<!-– una única fuente -->
<video src= "borabora.mp4" controls> </video>
```

```html
<!– Varias fuentes para un mismo contenido audiovisual -->
<video controls poster="BoraBora.jpg">
<source src= "borabora.mp4" type= "video/mp4" />
<source src= "borabora.webm" type="video/webm" />
```

Su navegador no soporta el elemento video

```html
</video>
```


### 139. Los elementos <track> permite asociar información Ingeniería

[Ver diapositiva 139](HTML5.pdf#page=139)

Los elementos <track> permite asociar información Ingeniería temporal a un elemento <video> o <audio>.

- Se utiliza principalmente para subtítulos, leyendas y

descripciones.

- Mejora     la    accesibilidad de    los    contenidos

audiovisuales.

- Utiliza archivos en formato WebVTT (.vtt).

- Debe utilizarse dentro de un elemento <video> o

```html
<audio>      <video controls>
<source src="borabora.mp4"
```

type="video/mp4" />

```html
<track src="borabora-es.vtt" kind= "subtitles"
```

srclang="es" label="Español" />

```html
</video>
```


### 140. Los elementos <iframe>, <embed> y <object> permiten

[Ver diapositiva 140](HTML5.pdf#page=140)

Los elementos <iframe>, <embed> y <object> permiten

incrustar contenido externo en un documento HTML.

- El elemento <iframe>: incrusta otro documento HTML del Software

dentro de la página.

- El elemento <embed>: incrusta recursos externos (PDF,

multimedia, complementos o contenido externo).

- El elemento <object>: incorpora recursos externos y

permite proporcionar contenido alternativo.

Consideraciones de accesibilidad

- Su uso debe realizarse con precaución, pueden generar

problemas de navegación, comprensión e interacción para algunos usuarios.

- Se recomienda utilizar elementos HTML nativos (<img>,

```html
<audio>, <video>, etc.)
```


### 141. Elemento <img>

[Ver diapositiva 141](HTML5.pdf#page=141)

Resumen

```html
<img> → imágenes
```

```html
<picture> → imágenes adaptativas
<audio> → sonido
<video> → contenido audiovisual
<track> → subtítulos y accesibilidad
<iframe> → documento incrustado
<embed> → recurso externo incrustado
<object> → objeto externo incrustado
```



## Tablas y datos tabulares

### 143. Las tablas deben utilizarse para representar

[Ver diapositiva 143](HTML5.pdf#page=143)

Las tablas deben utilizarse para representar datos tabulares y no para maquetar páginas web

- <table> define la tabla.

- <tr> define una fila.

- <td> define una celda de datos.

- <th> define una celda de encabezado.

- <caption> define el título o descripción de la

tabla.


### 144. Elemento <table>

[Ver diapositiva 144](HTML5.pdf#page=144)

```html
<table>
<caption>Destinos del Pacífico</caption>
<tr>
<th></th>
<th>Duración</th>
```

```html
<th>Precio</th>
<th>Popularidad</th>
</tr>
<tr>
<th>Bora Bora</th>
<td>7 días</td>
<td>2500 €</td>
<td>Alta</td>
</tr>
<tr>
<th>Fiyi</th>
<td>10 días</td>
<td>2800 €</td>
<td>Alta</td>
</tr>
</table>
```


### 145. Para que una tabla sea accesible:

[Ver diapositiva 145](HTML5.pdf#page=145)

Para que una tabla sea accesible:

- Utilizar <th> para los encabezados.

- Añadir scope en tablas sencillas para asociar

encabezados de fila y columna.

- Utilizar id y headers en tablas complejas con

múltiples niveles de encabezado.

- Identificar la celda de encabezado <th> con “id”

- Relacionar cada celda de dato <td> con el

encabezado correspondiente a través de “headers”


### 146. Elemento <!– ejemplo table sencilla -->

[Ver diapositiva 146](HTML5.pdf#page=146)

```html
<!– ejemplo table sencilla -->
<th scope="col">Duración</th>
<th scope="row">Bora Bora</th>
```

```html
<!– ejemplo table compleja -->
<th id="duracion">Duración</th>
<td headers="duracion">7 días</td>
```

Ejemplo de tabla accesible


### 147. El elemento <thead> agrupa los encabezados de la Ingeniería

[Ver diapositiva 147](HTML5.pdf#page=147)

El elemento <thead> agrupa los encabezados de la Ingeniería tabla.

El elemento <tbody> agrupa los datos principales de la tabla. El elemento <tfoot> agrupa la información de resumen o pie de la tabla.

- Estos elementos mejoran la organización, la estructura

semántica y la accesibilidad de la tabla.


### 148. Elemento <table>

[Ver diapositiva 148](HTML5.pdf#page=148)

```html
<table>
```

```html
<caption>Viajes exóticos al Pacífico</caption>
<thead>
```

```html
<tr>
<th>Destino</th>
```

```html
<th>Duración</th>
<th>Precio</th>
```

```html
</tr>
</thead>
```

```html
<tbody>
<tr>
<th>Bora Bora</th>
<td>7 días</td>
<td>2500 €</td>
</tr>
```

```html
<tr>
<th>Fiyi</th>
<td>10 días</td>
<td>2800 €</td>
</tr>
</tbody>
```

```html
<tfoot>
<tr>
<th>Total destinos</th>
<td colspan="2">2</td>
</tr>
</tfoot>
```

```html
</table>
```



## Formularios

### 150. Los formularios permiten recopilar información introducida por los

[Ver diapositiva 150](HTML5.pdf#page=150)

Los formularios permiten recopilar información introducida por los usuarios y enviarla para su procesamiento.

- El elemento <form> define un formulario

- El elemento <input> define distintos tipos de controles de entrada de del Software

datos.

- El atributo type permite especificar distintos tipos de entrada: text,

email, password, date, number, tel, url, checkbox, radio, range, submit...

- Otros elementos habituales son:

- <label> asocia una descripción a un control.

- <textarea> permite introducir texto de varias líneas.

- <fieldset> agrupa controles relacionados.

- <legend> proporciona un título al grupo.

- <button> representa un botón

- La asociación correcta entre <label> y los controles mejora la

accesibilidad de los formularios.


### 151. HTML incorpora mecanismos básicos de validación en el Ingeniería

[Ver diapositiva 151](HTML5.pdf#page=151)

HTML incorpora mecanismos básicos de validación en el Ingeniería lado cliente sin necesidad de JavaScript en los Informática formularios:

- required: dato obligatorio

- maxlength: longitud máxima permitida

- min / max: límites permitidos para valores numéricos o

fechas

- pattern: expresión regular para validar el contenido

- type="email“: validación básica de direcciones de

correo


### 152. Elemento <form name="datos“ method="post" >

[Ver diapositiva 152](HTML5.pdf#page=152)

```html
<form name="datos“ method="post" >
```

```html
<label for="nombre"> Nombre:</label>
<input id="nombre" type="text" placeholder="Escriba nombre" required />
<label for="apellido"> Apellido: </label>
<input id="apellido" type="text" placeholder="Escriba su apellido" required />
<label for="email"> E-mail: </label>
```

```html
<input id="email" type="email" placeholder="Escriba su email" required />
<label for="fecha">Fecha de nacimiento: </label>
<input id="fecha" type="date" />
<label for="rango">Grado de satisfacción</label>
<input id="rango" type="range"/>
<fieldset>
<legend> ¿Estas interesado en tener más información?</legend>
<input id="masinfo" type="radio" />
<label for="masinfo"> Si, quiero más información </label>
<input id="nomasinfo" type="radio" />
<label for="nomasinfo">De momento no quiero más información </label>
</fieldset>
<label for="texto"> Comentarios (opcionales): </label>
<textarea id="texto" name="comments" maxlength=1000 ></textarea>
<input type="submit" value="Enviar">
</form>
```



## Elementos interactivos

### 154. Los elementos interactivos permiten mostrar u ocultar Ingeniería

[Ver diapositiva 154](HTML5.pdf#page=154)

Los elementos interactivos permiten mostrar u ocultar Ingeniería contenido y crear componentes de interacción sin Informática necesidad de JavaScript. Estos elementos permiten incorporar funcionalidad interactiva utilizando únicamente HTML.

- El elemento <details> representa un widget

desplegable.

- El elemento <summary> define el encabezado visible

del elemento <details>

- El elemento <dialog> representa una ventana de

diálogo o cuadro modal.


### 155. Elemento <details>

[Ver diapositiva 155](HTML5.pdf#page=155)

```html
<details>
<summary>
```

Información sobre Bora Bora

```html
</summary>
<p>
```

Bora Bora es una isla de la Polinesia Francesa conocida por sus lagunas cristalinas y sus hoteles sobre el mar.

```html
</p>
</details>
```


### 156. Elemento <dialog open>

[Ver diapositiva 156](HTML5.pdf#page=156)

```html
<dialog open>
```

```html
<p>
```

Reserva realizada correctamente.

```html
</p>
```

```html
<button>
```

Cerrar

```html
</button>
</dialog>
```



## Atributos globales

### 158. Atributos que tienen todos los elementos HTML

[Ver diapositiva 158](HTML5.pdf#page=158)

- Atributos que tienen todos los elementos HTML

- id

- class


### 159. Permite asignar al elemento un identificador único

[Ver diapositiva 159](HTML5.pdf#page=159)

- Permite asignar al elemento un identificador único

- El valor que se le asigne debe ser único en el ámbito Informática

del documento

- El valor puede ser un conjunto de letras y números sin

ninguna restricción.

- Puede utilizarse para diversos propósitos

```html
<th id= "mes">
```

……

```html
</th>
```

- NOTA: el uso de id como selector en CSS altera la cascada


### 160. Permite clasificar a los elementos de HTML

[Ver diapositiva 160](HTML5.pdf#page=160)

- Permite clasificar a los elementos de HTML

- Varios elementos en un mismo documento pueden Informática

pertenecer a una misma clase

- El valor del atributo puede ser un conjunto de letras y

números sin ninguna restricción, o incluso tokens separados por espacios en blanco.

- Puede utilizarse para diversos propósitos

- para los selectores de CSS pero altera la cascada

- Es conveniente utilizar los valores que describan el

tipo de contenido en lugar de valores de la presentación deseada


### 161. Existen una serie de atributos que son globales a los elemento en HTML

[Ver diapositiva 161](HTML5.pdf#page=161)

- Existen una serie de atributos que son globales a los elemento en HTML

- accesskey

- autocapitalize

- autocorrect

- autofocus

- contenteditable

- dir

- draggable

- enterkeyhint

- hidden

- inert

- inputmode

- is

- itemid

- itemprop

- itemref

- itemscope

- itemtype

- lang

- nonce

- popover

- spellcheck

- style

- tabindex

- title

- translate

- writingsuggestions


### 162. Permite a los agentes de usuario crear atajos de Ingeniería

[Ver diapositiva 162](HTML5.pdf#page=162)

- Permite a los agentes de usuario crear atajos de Ingeniería

teclado para activar el foco del elemento

- Se distingue mayúsculas y minúsculas

- Cada atributo accesskey debe ser exactamente de un

carácter de longitud 1

```html
<nav>
<a title="Actividades"
```

accesskey="A" href= "actividades.html"> Actividades</a>

```html
</nav>
```


### 163. Activar los atajos del teclado depende del agente de Ingeniería

[Ver diapositiva 163](HTML5.pdf#page=163)

- Activar los atajos del teclado depende del agente de Ingeniería

usuario:

- Safari: ALT+atajo

- Microsoft Edge: ALT+atajo+ENTER

- Firefox: MAY+ALT+atajo

- Opera: MAY+ESC+atajo

- Chrome: ALT+atajo


### 164. Permite indicar si el contenido del elemento es o no Ingeniería

[Ver diapositiva 164](HTML5.pdf#page=164)

- Permite indicar si el contenido del elemento es o no Ingeniería

editable

- Es un atributo enumerado que puede contener la del Software

cadena vacía, true o false.

- También puede tener el valor inherit para heredar la

característica del elemento contenedor.

- True indica que el elemento es editable

- False indica que el elementos NO es editable

```html
<p contenteditable="true">Texto editable</p>
<p contenteditable>Texto editable</p>
<p>no editable </p>
<p contenteditable=“false">no editable</p>
```


### 165. Es un atributo que indica la direccionalidad del texto.

[Ver diapositiva 165](HTML5.pdf#page=165)

- Es un atributo que indica la direccionalidad del texto.

- Es un atributo enumerado con los siguientes valores:

- “ltr” izquierda a derecha (left-to-right)

- “rtl” derecha a izquierda (right-to-left)

- “auto” la dirección se determina en función del contenido del

elemento

```html
<p dir=“rtl">‫< حوال‬/p>
<p dir=“ltr”>hola </p>
```


### 166. Es un atributo que oculta elemento y evita que se Ingeniería

[Ver diapositiva 166](HTML5.pdf#page=166)

- Es un atributo que oculta elemento y evita que se Ingeniería

represente visualmente

- Es un atributo booleano

- Si aparece, el contenido no se muestra directamente pero

puede ser utilizado en otras partes del documento

```html
<p hidden>Este párrafo no se muestra</p>
```


### 167. Permite definir el idioma del elemento

[Ver diapositiva 167](HTML5.pdf#page=167)

- Permite definir el idioma del elemento

```html
<p lang="en">This is a paragraph</p>
<p lang="es">Esto es un párrafo</p>
```

- Tags for identifying Languages, ISO 639 y code list


### 168. Especifica si se debe comprobar la gramática y la Ingeniería

[Ver diapositiva 168](HTML5.pdf#page=168)

- Especifica si se debe comprobar la gramática y la Ingeniería

ortografía del elemento

- El agente de usuario puede ofrecer una verificación

bajo demanda

- Es un atributo booleano

```html
<p spellcheck>Este párrafe se debe comprobar</p>
```


### 169. Permite especificar un estilo para el elemento en Ingeniería

[Ver diapositiva 169](HTML5.pdf#page=169)

- Permite especificar un estilo para el elemento en Ingeniería

formato CSS

```html
<p>Mi chaqueta es
<span style= "color: green"> verde</span> y mis ojos
```

son <span style="color:blue">azules</span>.</p>

id o h i b P r o


### 170. Permite controlar el orden de navegación mediante teclado

[Ver diapositiva 170](HTML5.pdf#page=170)

- Permite controlar el orden de navegación mediante teclado

- Debe usarse con prudencia

```html
<nav>
<a title="Actividades"
```

tabindex= "1" href= "actividades.html"> Actividades</a>

```html
<a title= "Enlaces"
```

tabindex= "2" href= " enlaces.html"> Enlaces</a>

```html
</nav>
```


### 171. El elemento title proporciona información

[Ver diapositiva 171](HTML5.pdf#page=171)

- El    elemento      title  proporciona    información

complementaria asociada a un elemento.

- Los agentes de usuario lo muestran como un “tooltip”

cuando el foco

- No debe utilizarse como único mecanismo para

transmitir información importante, muchos agentes de usuario no exponen el atributo de una manera accesible

```html
<nav>
<a title=“Enlace a Actividades"
```

href= "actividades.html"> Actividades</a>

```html
</nav>
```


### 172. Es un atributo enumerado que permite indicar si el Ingeniería

[Ver diapositiva 172](HTML5.pdf#page=172)

- Es un atributo enumerado que permite indicar si el Ingeniería

elemento será traducido cuando el documento sea Informática internacionalizado o no.

```html
<p translate="no">
```

Esto no será traducido</p>


### 173. Permite almacenar información personalizada Ingeniería

[Ver diapositiva 173](HTML5.pdf#page=173)

- Permite    almacenar    información                          personalizada Ingeniería

asociada a un elemento HTML.

```html
<p data-destino="bora-bora">……</p>
```



## Referencias

### 175. Lenguajes de marcas en el W3C

[Ver diapositiva 175](HTML5.pdf#page=175)

- Lenguajes    de    marcas     en   el                        W3C

http://www.w3.org/standards/techs/html

- WHATWG: http://www.whatwg.org/

- HTML 5

- https://html.spec.whatwg.org/multipage/

- Validador de lenguaje de marcas

http://validator.w3.org/

- Validador de HTML5

https://validator.w3.org/nu


### 176. Diapositiva 176

[Ver diapositiva 176](HTML5.pdf#page=176)

Errores comunes



## Errores frecuentes

### 177. Utilizar los elementos HTML pensando en diseño, no Ingeniería

[Ver diapositiva 177](HTML5.pdf#page=177)

- Utilizar los elementos HTML pensando en diseño, no Ingeniería

en el contenido y la estructura

```html
<ul>
<li><strong>Nombre:</strong> Cris </li>
<li><strong>Apellido:</strong> Pelayo </li>
```

r o r

```html
</ul>
```

Elemento strong E r


### 178. No cerrar los elementos de forma adecuada para Ingeniería

[Ver diapositiva 178](HTML5.pdf#page=178)

- No cerrar los elementos de forma adecuada para Ingeniería

evitar el solapamiento que afecta a la construcción del Informática DOM

- Los navegadores intentan corregirlo


### 179. Utilizar atributos

[Ver diapositiva 179](HTML5.pdf#page=179)

Utilizar atributos

- width — Horizontal dimension

- height — Vertical dimension

en elementos multimedia para establecer las dimensiones del recurso. Se deben utilizar para que los agentes de usuario sepan que espacio deben reservar.

Se recomienda a los desarrolladores que especifiquen una relación de aspecto preferida a través de los atributos de ancho y alto en las imágenes cargadas de forma diferida, incluso si CSS establece las propiedades de ancho y alto de la imagen, para evitar que el diseño de la página se mueva después de que se cargue la imagen. Los navegadores intentan corregirlo.


### 180. No validar el documento

[Ver diapositiva 180](HTML5.pdf#page=180)

No validar el documento



## Comparaciones y criterios de elección

| Elementos | Criterio presentado en las diapositivas | Referencias |
|---|---|---|
| `<article>` / `<section>` | `article` agrupa contenido autónomo que mantiene su significado por separado; `section` agrupa contenido temáticamente relacionado dentro del documento. | [Diapositiva 40](HTML5.pdf#page=40) |
| `<div>` / elementos semánticos | `div` no añade significado semántico específico y se reserva para cuando no hay un elemento más apropiado. | [Diapositiva 60](HTML5.pdf#page=60) |
| `<ul>` / `<ol>` / `<dl>` | Lista no ordenada / lista ordenada / lista de términos con descripciones. | [Diapositiva 74](HTML5.pdf#page=74) |
| Estructura / presentación | Los elementos HTML se eligen por significado y estructura, no por su apariencia visual. | [Diapositivas 65 y 88](HTML5.pdf#page=65) |
| `<head>` / `<body>` | Metadatos del documento / contenido presentado al usuario. | [Diapositiva 14](HTML5.pdf#page=14) |

## Ejemplo de documento HTML básico

**Origen: adaptación tipográfica del documento básico mostrado en la diapositiva 16.** El ejemplo usa la estructura y los elementos que se explican en esa diapositiva.

```html title="basico.html" origen="documento original, diapositiva 16"
<!DOCTYPE html>
<html lang="es">
<head>
  <!-- Datos que describen el documento -->
  <meta charset="UTF-8" />
  <title>HTML5 Básico</title>
</head>
<body>
  <!-- Contenido que aparece en el navegador -->
  <h1>Encabezado principal del documento</h1>
</body>
</html>
```

El `DOCTYPE` activa el modo estándar; `html` es la raíz y declara el idioma; `head` contiene el juego de caracteres y el título; `body` incluye el encabezado visible. [Ver diapositivas 11–16](HTML5.pdf#page=11).

::: practica Repaso de estructura HTML
**Pregunta:** identifica en el ejemplo anterior la declaración de tipo de documento, el elemento raíz, los metadatos y el contenido visible.

**Resolución:** son, respectivamente, `<!DOCTYPE html>`, `<html lang="es">`, `<head>` y `<body>`.
:::

## Preguntas de repaso

1. ¿Por qué se denomina a HTML un estándar vivo y qué organismo lo mantiene?
2. ¿En qué se diferencian los elementos con etiqueta de cierre y los elementos sin ella?
3. ¿Qué consecuencias puede tener el solapamiento incorrecto de elementos?
4. ¿Qué función tienen `<!DOCTYPE html>`, `lang`, `charset` y `title`?
5. ¿Qué es el árbol DOM y qué clases de nodos aparecen en él?
6. ¿Qué representan `title`, `base`, `link`, `meta` y `style` dentro de `head`?
7. ¿Cuándo se utiliza `article` y cuándo `section`?
8. ¿Por qué no debe utilizarse `div` como sustituto indiscriminado de elementos semánticos?
9. ¿Qué diferencias existen entre listas ordenadas, no ordenadas y listas de descripción?
10. ¿Qué significan los atributos `src` y `alt` en una imagen?
11. ¿Qué funciones desempeñan `table`, `caption`, `tr`, `th` y `td`?
12. ¿Qué elementos permiten crear formularios y asociar etiquetas a controles?
13. ¿Qué permiten representar `details`, `summary` y `dialog`?
14. ¿En qué se diferencian los atributos globales `id` y `class`?
15. ¿Por qué debe validarse un documento HTML?

Las preguntas de repaso son **elaboración didáctica** a partir de los contenidos del PDF, no ejercicios atribuidos a las diapositivas.

## Errores frecuentes y advertencias

::: aviso Recomendaciones insistentes del documento
- Escribir las etiquetas en minúsculas.
- Usar comillas dobles en los valores de atributos.
- No solapar elementos y respetar su anidamiento.
- Preferir elementos que representen correctamente el significado del contenido.
- Validar el documento HTML.
:::

Consultar las diapositivas [5–10](HTML5.pdf#page=5), [60](HTML5.pdf#page=60) y [177–180](HTML5.pdf#page=177) para los ejemplos y advertencias concretos.

## Resumen final

HTML define un documento como un árbol de elementos y texto y utiliza etiquetas y atributos para darle estructura y significado. El navegador lo interpreta y forma el **DOM**, que puede manipularse mediante scripts. El bloque de metadatos describe el documento, mientras que el cuerpo reúne los elementos semánticos, textuales e interactivos. Elegir correctamente los elementos, proporcionar alternativas accesibles y validar el código son criterios fundamentales que se repiten a lo largo de la unidad.

## Referencia al documento original

- **Fuente:** *Lenguajes de Marcado — HTML*, Universidad de Oviedo, 180 diapositivas, Oscar Sanjuán Martínez y Dra. B. Cristina Pelayo García-Bustelo.
- **Archivo aportado:** [HTML5.pdf](HTML5.pdf).
- **Localización:** cada ficha incluye el enlace a su diapositiva, para consultar figuras, capturas, esquemas y código tal como aparece en la presentación.
