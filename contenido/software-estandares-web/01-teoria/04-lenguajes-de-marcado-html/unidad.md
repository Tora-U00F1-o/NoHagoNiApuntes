---
asignatura: Software y Estándares para la Web
titulo: Lenguajes de Marcado - HTML
resumen: Lenguaje de marcado HTML5.
fuente: HTML5.pdf
---

# Lenguajes de Marcado - HTML

## Contenido

1. [Introducción y objetivos](#introduccion-y-objetivos)
2. [Guía de interpretación](#guia-de-interpretacion)
3. [Características y estructura básica](#caracteristicas-y-estructura-basica)
4. [DOM: Document Object Model](#dom-document-object-model)
5. [Metadatos del documento: head](#metadatos-del-documento-head)
6. [Clasificación de elementos HTML](#clasificacion-de-elementos-html)
7. [Elementos semánticos de estructura y elementos genéricos](#elementos-semanticos-de-estructura-y-elementos-genericos)
8. [Elementos de agrupación de contenido](#elementos-de-agrupacion-de-contenido)
9. [Elementos semánticos de texto y enlaces](#elementos-semanticos-de-texto-y-enlaces)
10. [Contenido incrustado](#contenido-incrustado)
11. [Tablas y datos tabulares](#tablas-y-datos-tabulares)
12. [Formularios](#formularios)
13. [Elementos interactivos](#elementos-interactivos)
14. [Atributos globales](#atributos-globales)
15. [Referencias](#referencias)
16. [Errores frecuentes](#errores-frecuentes)
17. [Comparaciones y criterios de elección](#comparaciones-y-criterios-de-eleccion)
18. [Ejemplo de documento HTML básico](#ejemplo-de-documento-html-basico)
19. [Preguntas de repaso](#preguntas-de-repaso)
20. [Errores frecuentes y advertencias](#errores-frecuentes-y-advertencias)
21. [Resumen final](#resumen-final)
22. [Referencia al documento original](#referencia-al-documento-original)

## Introducción y objetivos

HTML es un **lenguaje de marcado** que describe la estructura y el significado de un documento mediante elementos y texto. El navegador interpreta esa escritura y construye el **DOM**, su representación en memoria. El PDF presenta HTML como un **estándar vivo mantenido por WHATWG**, aunque se haya popularizado el nombre HTML5.

Esta unidad desarrolla la sintaxis, la estructura básica, los metadatos, el árbol DOM, las familias de elementos, los atributos globales y los errores frecuentes. La pregunta que articula el contenido es **qué representa cada parte del documento**: una sección temática, un artículo autónomo, una cita, una lista, un recurso multimedia o un control de formulario. El aspecto visual habitual no sustituye esa decisión semántica.

Al estudiar la unidad se debe poder interpretar y escribir la estructura básica; explicar las relaciones de un árbol DOM; elegir entre elementos con apariencias similares y significados distintos; interpretar atributos y fragmentos originales; reconocer las asociaciones de accesibilidad; y detectar anidamientos, cierres o usos de elementos que el material considera incorrectos.

**Alcance de esta revisión:** se han leído y revisado visualmente las **180 páginas** del PDF de la carpeta. Se conserva **la cabecera y cada uno de los 189 títulos que ya tenía el Markdown, en su orden original**. El contenido de los apartados se ha rehecho, recuperando código y diagramas que estaban únicamente en imágenes. Las páginas de índice o transición se contabilizan en la cobertura final, aunque no todas tengan un subapartado numerado propio.

[Consultar el PDF original](HTML5.pdf).

## Guía de interpretación

Las explicaciones y los ejemplos se basan **exclusivamente en el PDF aportado**. Los enlaces externos se conservan cuando el propio material los cita, sin utilizarlos para completar la teoría ni actualizar observaciones sobre navegadores o validadores.

- **Ejemplo original:** el código de los apartados numerados procede de la diapositiva indicada, incluidas las capturas. Los fragmentos incompletos se identifican como tales.
- **Explicación didáctica:** aclara o conecta información que ya está en el documento; no se presenta como una cita literal del profesor.
- **Ejercicio o ejemplo didáctico:** identifica material de repaso elaborado a partir de los conceptos estudiados.
- **Errata o límite del original:** señala diferencias entre código y capturas, valores discordantes o funcionalidades que el ejemplo no implementa.

Para reutilizar los ejemplos se han **normalizado explícitamente las comillas tipográficas de atributos y los delimitadores de comentarios**. Se ajusta también la indentación para hacer legible la contención. No se corrigen silenciosamente nombres de archivo, valores o ejemplos intencionadamente incorrectos: se conserva el dato y se explica el problema cuando afecta al significado o al funcionamiento.

Los **títulos se mantienen literalmente**, incluso cuando contienen frases truncadas, etiquetas sin formato de código o la palabra «Ingeniería» procedente de la extracción anterior. Esas particularidades no se repiten como teoría en el cuerpo. Los números de sus subapartados corresponden a **páginas reales del PDF**, y cada uno conserva un enlace directo a su fuente.

## Características y estructura básica

El primer bloque establece cómo se escribe un documento: **etiquetas, atributos, comentarios, anidamiento, declaración de tipo y separación entre `head` y `body`**. Las recomendaciones de minúsculas, comillas dobles y cierres coherentes buscan una escritura uniforme. Los ejemplos correctos e incorrectos se distinguen para que no se copie como plantilla un fragmento que el profesor utiliza para mostrar un error.

### 4. Históricamente se popularizó con el nombre HTML5, pero

[Ver diapositiva 4](HTML5.pdf#page=4)

**HTML es un lenguaje de marcado**: describe un documento mediante un árbol de elementos y texto. Aunque se popularizó el nombre «HTML5», el PDF presenta HTML como un **Living Standard o estándar vivo**, mantenido por **WHATWG**. La especificación define tanto los elementos disponibles como las reglas que rigen su anidamiento.

Un elemento con contenido se representa mediante una etiqueta de inicio y otra de cierre, como `<body>` y `</body>`. La diapositiva utiliza este esquema abstracto:

```text
<etiqueta de inicio> … </etiquetaCierre>
<etiqueta de inicio … />
```

Son formas esquemáticas, no nombres de elementos que se puedan copiar a un documento real. La segunda anticipa los elementos sin etiqueta de cierre del apartado siguiente. Conviene distinguir el **elemento** de las **etiquetas** que permiten escribirlo.

### 5. Tipos de elementos

[Ver diapositiva 5](HTML5.pdf#page=5)

El documento distingue **elementos completos**, con apertura, contenido y cierre, y **elementos simples**, sin etiqueta de cierre. Los ejemplos son:

```html
<p>…</p>
<img …>
<img … />
```

Los puntos suspensivos son marcadores del original. **No existe una etiqueta `</img>`**. La diapositiva propone escribir los elementos simples con una barra antes de `>` y un espacio antes de `/>`, por coherencia con XML, y cerrar explícitamente los elementos que sí tienen cierre, aunque este pueda omitirse en determinadas circunstancias.

**Matiz del propio material:** esa convención con barra puede producir un mensaje **INFO** en el validador. Debe distinguirse la recomendación de escritura del curso de la necesidad de una etiqueta final: escribir `<img … />` no autoriza a añadir `</img>`. El PDF enlaza una [explicación del validador sobre barras finales](https://github.com/validator/validator/wiki/Markup-%C2%BB-Void-elements#trailing-slashes-directly-preceded-by-unquoted-attribute-values).

### 6. Comentarios

[Ver diapositiva 6](HTML5.pdf#page=6)

Los **comentarios** facilitan la comprensión del código e identifican la finalidad de sus partes. No son el contenido visible que se pretende presentar al usuario. Los ejemplos del PDF son:

```html
<!-- esto es un comentario -->
<!-- Formulario de contacto -->
<!-- Tabla que contiene los datos estadísticos -->
```

**Adaptación tipográfica explícita:** la presentación mezcla guiones tipográficos y guiones normales en algunas aperturas. Se transcriben aquí con los delimitadores de comentario `<!--` y `-->`, para que puedan reutilizarse como código. La misma normalización se aplica a los comentarios de los ejemplos posteriores.

### 7. Utilización de Mayúsculas/minúsculas.

[Ver diapositiva 7](HTML5.pdf#page=7)

El PDF indica que los nombres de elementos HTML pueden escribirse en mayúsculas o minúsculas y compara estas dos escrituras:

```html
<P>he aquí un <STRONG>párrafo</STRONG> enfatizado</P>
<p>he aquí un <strong>párrafo</strong> enfatizado</p>
```

Ambas expresan el mismo contenido y anidamiento. La recomendación docente es **utilizar siempre minúsculas** para mantener una escritura coherente. La diapositiva recuerda que las mayúsculas eran habituales en versiones anteriores, por ejemplo HTML4; no propone emplearlas en los documentos del curso.

### 8. Anidamiento de elementos

[Ver diapositiva 8](HTML5.pdf#page=8)

Los elementos pueden contener otros elementos, pero deben cerrarse **sin solapamientos**. El primer fragmento del PDF es correcto:

```html
<p>Esto es un <a href="#"> ejemplo </a><em>simple con anidamiento correcto</em> </p>
```

El enlace y el énfasis se abren y se cierran dentro del párrafo. El segundo es un **ejemplo intencionadamente incorrecto**, que la diapositiva asocia con dos errores HTML:

```html
<p>Esto es un <a href="#"> ejemplo </a><em>simple con anidamiento incorrecto, que provoca 2 errores HTML:</p> </em>
```

Se intenta cerrar `p` antes de cerrar el `em` que contiene. El navegador puede intentar reparar el documento y construir un DOM diferente del esperado. El PDF advierte de consecuencias en **CSS, JavaScript y accesibilidad**. Que el navegador muestre algo en pantalla no demuestra que el anidamiento sea correcto.

### 9. Los elementos pueden tener atributos que indican como debe Ingeniería

[Ver diapositiva 9](HTML5.pdf#page=9)

Los **atributos** aportan información que determina características o comportamiento de un elemento. Se escriben en su **etiqueta de inicio**. En el ejemplo, `html` es el nombre del elemento y `lang="es"` es el atributo que declara el idioma:

```html
<html lang="es">
</html>
```

El diagrama de la diapositiva separa visualmente el nombre de la etiqueta y la pareja atributo-valor. **Normalización tipográfica:** las comillas curvas del original se sustituyen por comillas rectas; se hará lo mismo en los demás atributos transcritos. No se modifican con ello los valores que pretende mostrar el ejemplo.

### 10. El valor de los atributos se especifica:

[Ver diapositiva 10](HTML5.pdf#page=10)

Un atributo con valor se escribe como **`nombre="valor"`**. Los **booleanos** pueden expresarse mediante su nombre. El PDF compara tres formas de escribir un enlace:

```html
<a href="demo.html">demo</a>
<a href='demo.html'>demo</a>
<a href=demo.html>demo</a>
```

La recomendación del curso es **usar siempre comillas dobles**, especialmente importante cuando el valor contiene espacios. Aunque se muestran otras posibilidades, la convención elegida elimina variaciones innecesarias.

Para un atributo booleano, la diapositiva propone:

```html
<input name="address" disabled>
```

En lugar de la forma más extensa, también mostrada:

```html
<input name="address" disabled="">
```

En ambos ejemplos aparece `disabled`. Lo que se ilustra es que no hace falta asignarle una cadena para expresar su presencia.

### 11. Elemento <! Doctype html>

[Ver diapositiva 11](HTML5.pdf#page=11)

La figura representa la **estructura general del documento** mediante cajas anidadas. Fuera del elemento raíz aparece la declaración de tipo; dentro de `html` aparecen dos bloques hermanos: **`head`**, con metadatos, y **`body`**, con el contenido del documento.

```html
<!DOCTYPE html>
<html>
    <head>
        <!-- colección de metadatos -->
    </head>
    <body>
        <!-- contenido del documento -->
    </body>
</html>
```

**Reconstrucción del esquema original:** se han convertido los rótulos descriptivos de las cajas en comentarios. El dibujo escribe `<! Doctype html>` con un espacio; se utiliza explícitamente la forma `<!DOCTYPE html>` que la diapositiva 12 proporciona como declaración. El título de este apartado se conserva tal como estaba en el Markdown.

### 12. Especificación del tipo de documento

[Ver diapositiva 12](HTML5.pdf#page=12)

La declaración **`<!DOCTYPE html>`** identifica el documento como HTML moderno y **activa el modo estándar del navegador**. El PDF insiste en incluirla al comienzo del documento:

```html
<!DOCTYPE html>
```

A diferencia de XHTML 1.1, esta declaración no referencia un **DTD externo**. El ejemplo comparativo de XHTML del original es:

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
```

**Explicación didáctica:** se compara la forma de declarar el tipo de documento, no se propone incorporar el DTD de XHTML al documento HTML moderno. La presentación remite a la [lista de DTD del W3C](https://www.w3.org/QA/2002/04/valid-dtd-list.html).

### 13. Elemento <html>

[Ver diapositiva 13](HTML5.pdf#page=13)

**`html` es el elemento raíz**. El idioma del documento se declara mediante **`lang`**, como en el ejemplo:

```html
<html lang="es">
```

El PDF utiliza códigos de dos letras y explica que **`es` indica español**. Remite a la [referencia ISO de identificación de idiomas](https://www.iso.org/standard/4766.html) y a una [lista de códigos ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes). Se conservan esos recursos como referencias del material; no se añaden reglas sobre variantes lingüísticas que la diapositiva no desarrolla.

### 14. Dentro del elemento HTML hay dos

[Ver diapositiva 14](HTML5.pdf#page=14)

Dentro de `html`, el documento separa **metadatos** y **contenido**:

| Elemento | Qué contiene | Relación con la presentación |
|---|---|---|
| `head` | La colección de metadatos del documento | En general no constituye el contenido visible de la página |
| `body` | El contenido del documento | Es lo que se presenta en el agente de usuario |

Esta separación permite distinguir, por ejemplo, el título que identifica el documento en una pestaña del encabezado que aparece dentro de su contenido. No se deben intercambiar las funciones de `head` y `body`.

### 15. En <head> siempre debemos indicar

[Ver diapositiva 15](HTML5.pdf#page=15)

El PDF exige indicar en `head` la **codificación de caracteres** y el **título del documento**:

```html
<meta charset="utf-8" />
```

`title` debe identificar la página **incluso fuera de contexto**. El navegador lo muestra en su pestaña y lo utiliza en el historial. Los ejemplos originales distinguen dos páginas de un mismo sitio:

```html
<title>Estudiantes-Universidad de Oviedo-uniovi.es</title>
<title>PDI-Universidad de Oviedo-uniovi.es</title>
```

Corresponden, respectivamente, a las páginas de [estudiantes](https://www.uniovi.es/conocenos/tramites/estudiantes) y de [PDI](https://www.uniovi.es/conocenos/tramites/pdi) citadas en la diapositiva. La finalidad es que el nombre distinga el documento sin depender de ver su contenido.

### 16. Documento básico HTML5

[Ver diapositiva 16](HTML5.pdf#page=16)

El ejemplo de esta diapositiva está **dentro de una captura**. Este es su código, recuperado íntegramente:

```html title="basico.html" origen="original, diapositiva 16"
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

El documento reúne las decisiones anteriores: modo estándar, raíz con idioma, metadatos y cuerpo. **`HTML5 Básico` es el título del documento**; **`Encabezado principal del documento` es el encabezado visible**. Los comentarios identifican la finalidad de cada parte, pero no son el texto que se desea mostrar en la página.

## DOM: Document Object Model

El **DOM** organiza el documento en memoria mediante nodos y relaciones de contención. Las páginas siguientes parten de un archivo HTML concreto, explican su árbol y muestran que también hay nodos de texto asociados al espaciado. El bloque termina con la modificación de un enlace mediante JavaScript. Así se conecta el marcado escrito con la estructura que después utilizan estilos y scripts.

### 18. Los documentos HTML consisten en un árbol de Ingeniería

[Ver diapositiva 18](HTML5.pdf#page=18)

El navegador realiza el **análisis sintáctico o parsing** del documento HTML y construye un árbol **DOM, Document Object Model**. El DOM es la **representación en memoria** del documento: organiza sus elementos y textos de acuerdo con las relaciones de contención.

**Explicación didáctica:** el archivo es la escritura del marcado; el árbol es la estructura que obtiene el navegador al interpretarlo. Esta diferencia explica por qué un anidamiento incorrecto puede producir una representación distinta de la que el autor imaginaba.

### 19. Los árboles DOM contienen varios tipos de nodos:

[Ver diapositiva 19](HTML5.pdf#page=19)

El PDF enumera cinco clases de nodos del árbol DOM:

| Tipo de nodo | Información que identifica |
|---|---|
| Tipo de documento | La declaración de tipo |
| Elemento | Un elemento HTML |
| Texto | Contenido textual, incluidos espacios que el analizador represente |
| Comentario | Un comentario del código |
| Instrucción de procesamiento | Una instrucción de procesamiento |

La enumeración es general. No obliga a que todos los ejemplos contengan los cinco tipos: el documento básico siguiente muestra tipo de documento, elementos, texto y comentarios, sin introducir una instrucción de procesamiento.

### 20. Ejemplo de documento HTML5 (basicoDOM.html)

[Ver diapositiva 20](HTML5.pdf#page=20)

La captura original contiene el archivo **`basicoDOM.html`**:

```html title="basicoDOM.html" origen="original, diapositiva 20"
<!DOCTYPE HTML>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Ejemplo</title>
</head>
<body>
    <h1> Página simple </h1>
    <!-- añado un comentario -->
    <p>Un <a href="demo.html">ejemplo</a> simple </p>
</body>
</html>
```

El ejemplo reúne los nodos que se estudiarán en las figuras siguientes. `title` contiene «Ejemplo»; `h1`, «Página simple»; el párrafo contiene texto antes y después de un enlace. **`href` es un atributo del enlace**, mientras que «ejemplo» es su texto. El comentario del cuerpo aparece en el DOM aunque no sea contenido visible.

### 21. Árbol DOM del documento HTML5:

[Ver diapositiva 21](HTML5.pdf#page=21)

La figura sitúa lado a lado el código y su árbol. Su contenido significativo puede reconstruirse así; se agrupan los nodos de espacios para facilitar la lectura:

```text
DOCTYPE: html
html [lang="es"]
├── head
│   ├── #comment: Datos que describen el documento
│   ├── meta [charset="UTF-8"]
│   └── title
│       └── #text: Ejemplo
├── #text: espacios y saltos entre head y body
└── body
    ├── h1
    │   └── #text: Página simple
    ├── #comment: añado un comentario
    └── p
        ├── #text: Un
        ├── a [href="demo.html"]
        │   └── #text: ejemplo
        └── #text: simple
```

**Reconstrucción didáctica del diagrama original:** el árbol de la diapositiva incluye además numerosos `#text` de espacios y retornos entre elementos. No se han eliminado del concepto: se explican en la página 22; solo se agrupan en esta representación para que la jerarquía sea legible. El enlace es hijo del párrafo, no su hermano.

### 22. DOCTYPE: html Nodo de tipo

[Ver diapositiva 22](HTML5.pdf#page=22)

La figura identifica **`DOCTYPE: html` como nodo de tipo de documento** y **`html` como nodo principal de elementos**. Dentro de `html` se encuentran `head` y `body`, con un nodo **`#text` entre ellos** generado por el analizador.

Los espacios, las líneas en blanco y los retornos del código explican que el árbol tenga muchos nodos de texto adicionales. **Explicación didáctica:** «texto» en el DOM no significa únicamente las palabras que se leen como contenido; también puede representar separación escrita en el archivo. Por eso el árbol de la página 21 es más detallado que un esquema que enumere solo etiquetas.

### 23. El elemento head contiene

[Ver diapositiva 23](HTML5.pdf#page=23)

El árbol permite localizar el contenido de los dos bloques principales. En **`head`**, `title` contiene un nodo de texto con **«Ejemplo»**; también se observan el comentario de metadatos y `meta charset="UTF-8"`.

En **`body`** se encuentran el encabezado `h1`, el comentario «añado un comentario» y el párrafo `p`. Dentro de `p` hay un nodo de texto «Un», el elemento `a` con su atributo `href="demo.html"` y el texto posterior «simple». A su vez, `a` contiene el texto «ejemplo». Esta contención es lo que refleja la figura, además de los nodos de espacios.

**Precisión de terminología:** el PDF llama en ocasiones «elemento text» al texto o «elemento de comentario» al comentario; en la clasificación anterior son **nodos de texto y de comentario**, respectivamente.

### 24. Utilizando xml2svg

[Ver diapositiva 24](HTML5.pdf#page=24)

La diapositiva representa el árbol mediante **xml2svg**. Los rectángulos blancos identifican elementos y atributos, y los verdes el texto. Desde `html lang="es"` salen las ramas `head` y `body`; `head` agrupa `meta` y `title`; `body`, `h1` y `p`; y el enlace `a` aparece dentro de `p`.

En el párrafo se separan «Un», el enlace con «ejemplo» y «simple», lo que permite ver la mezcla de texto y elementos hijos. **Diferencia entre figuras:** esta representación muestra **«HTML básico»** como contenido de `title`, mientras que el archivo y el árbol de las páginas 20 y 21 muestran **«Ejemplo»**. Se conserva la diferencia del original; el diagrama ilustra la misma estructura de contención, pero no es una reproducción idéntica de todos los textos. Tampoco expone todos los nodos de comentarios y espacios del árbol detallado.

### 25. El árbol DOM puede ser manipulado desde Scripts o por medio Ingeniería

[Ver diapositiva 25](HTML5.pdf#page=25)

El DOM puede manipularse desde **scripts** o mediante **manejo de eventos**. Cada elemento del árbol se representa como un **objeto** y esos objetos ofrecen una **API** para modificarlos.

La idea enlaza la descripción del documento con su comportamiento: un enlace escrito en HTML puede localizarse como objeto y cambiar después su destino. La diapositiva siguiente muestra operaciones concretas; aquí no se añade una API distinta de las que aporta el material.

### 26. Ejemplo el enlace <a>

[Ver diapositiva 26](HTML5.pdf#page=26)

El enlace del ejemplo es:

```html
<a href="demo.html">ejemplo</a>
```

Su rama del árbol contiene un elemento `a` con atributo `href="demo.html"` y un hijo de texto «ejemplo». El PDF muestra estas operaciones:

```javascript
var a = document.links[0]; // obtener el primer link del doc
a.href = 'sample.html'; // cambiar destino con URL
a.protocol = 'https'; // cambiar el protocolo de la URL
a.setAttribute('href', 'http://example.com/');
// cambiar el valor del atributo directamente
```

`document.links[0]` obtiene el primer enlace. La propiedad `href` cambia el destino, `protocol` cambia el protocolo y `setAttribute()` modifica directamente el atributo. Son las formas ilustradas por la diapositiva. Si se ejecutan consecutivamente, la última asignación fija el atributo en `http://example.com/`; no son cambios de distintos enlaces, porque la variable sigue representando el mismo objeto.

## Metadatos del documento: head

Los metadatos **describen y configuran el documento**, frente al contenido que se presenta dentro de `body`. El PDF desarrolla título, base de URL, enlaces a recursos, información `meta` y estilos internos, con advertencias sobre la separación entre presentación y estructura.

### 28. Colección de metadatos para el documento

[Ver diapositiva 28](HTML5.pdf#page=28)

**`head` reúne los metadatos del documento**. El esquema del PDF enumera **`title`**, **`base`**, **`link`**, **`meta`** y **`style`** dentro de esa colección. Estos elementos describen o configuran el documento y sus relaciones con recursos; no deben confundirse con el contenido principal de `body`.

El material remite al apartado [Document metadata de la especificación](https://html.spec.whatwg.org/multipage/semantics.html#document-metadata). Los cinco elementos se desarrollan en las diapositivas 29 a 31.

### 29. <title> Titulo o nombre de la página OBLIGATORIA

[Ver diapositiva 29](HTML5.pdf#page=29)

La página desarrolla tres elementos diferentes:

| Elemento | Finalidad | Advertencia del PDF |
|---|---|---|
| `title` | Título o nombre de la página | Obligatorio |
| `base` | URL base para analizar las URL y el contexto de navegación | Afecta a las direcciones internas del sitio |
| `link` | Relaciona el documento con otros recursos, por ejemplo una hoja de estilo | Debe indicar `rel`; el destino se expresa con `href` |

Los ejemplos originales son:

```html
<title>Universidad de Oviedo - Inicio</title>
<base href="http://www.uniovi.es" />
<a href="demo.html">simple</a>
<link rel="stylesheet" href="default.css" />
```

Con la base indicada, el PDF resuelve `demo.html` como **`http://www.uniovi.es/demo.html`**. `rel="stylesheet"` expresa la relación con la hoja y `href="default.css"` identifica su destino.

**Límite de la redacción original:** la diapositiva menciona hojas de estilo y scripts al describir recursos enlazados, pero su único ejemplo de `link` es una hoja de estilo. No proporciona aquí un ejemplo de carga o ejecución de scripts mediante `link`.

### 30. <meta> Los elementos META se utilizan para Ingeniería

[Ver diapositiva 30](HTML5.pdf#page=30)

**`meta` especifica información sobre el propio documento**. El PDF relaciona estos atributos:

| Atributo | Información presentada |
|---|---|
| `name` | Nombre del metadato |
| `http-equiv` | Directivas pragma |
| `content` | Valor del metadato |
| `charset` | Codificación de caracteres |
| `media` | Atributo enumerado por la diapositiva, sin desarrollo adicional |

```html
<meta name="keywords" content="HTML, CSS, JavaScript" />
<meta name=" author" content="Cris Pelayo" />
<meta charset="utf-8" />
```

Los tres ejemplos muestran palabras clave, autor y codificación. **Errata conservada:** el original escribe un espacio inicial en `name=" author"`; si se pretende el nombre `author`, debe retirarse expresamente ese espacio. No se modifica silenciosamente el valor en la transcripción.

### 31. <style> permite definir características de estilo dentro Ingeniería

[Ver diapositiva 31](HTML5.pdf#page=31)

**`style` define estilos dentro del documento**. La diapositiva enumera `media` con valor por defecto **`all`**, `type` con valor por defecto **`text/css`** y `title`.

```html
<style>
    body { color: black;
           background: white; }
    em { color: red; }
</style>
```

El código aplica texto negro y fondo blanco al cuerpo y texto rojo a `em`. La diapositiva lo acompaña con un rótulo **«Prohibido»**: advierte de que mezclar los estilos con el documento impide separar estructura/contenido y presentación y dificulta el mantenimiento. Se conserva esa indicación docente y se relaciona con el ejemplo de hoja externa `link` de la página 29.

## Clasificación de elementos HTML

La especificación organiza los elementos por funciones. La presentación utiliza esa clasificación como orientación y selecciona siete familias para su desarrollo didáctico. Conviene distinguir **la clasificación formal del elemento** del lugar en que se explica: por ejemplo, `main` y `div` se estudian junto a la estructura aunque se clasifiquen en agrupación de contenido.

### 33. Apartado 4 “The elements of HTML” de la especificación

[Ver diapositiva 33](HTML5.pdf#page=33)

El PDF remite al apartado 4, **The elements of HTML**, de la [especificación](https://html.spec.whatwg.org/multipage/#toc-semantics). Enumera estos grupos: **secciones**, **agrupamiento de contenido**, **semántica a nivel de texto**, **enlaces**, **elementos de edición**, **contenido incrustado**, **datos tabulares**, **formularios**, **elementos interactivos**, **scripting** y **elementos personalizados**.

La clasificación permite localizar cada elemento por su función. No todos los grupos reciben el mismo desarrollo en la presentación: las categorías que se estudiarán se concretan en la diapositiva siguiente.

### 34. Se verán a continuación:

[Ver diapositiva 34](HTML5.pdf#page=34)

El recorrido del PDF se organiza en siete bloques: **elementos semánticos de estructura**, **agrupación de contenidos**, **semánticos de texto**, **contenido incrustado**, **tablas o datos tabulares**, **formularios** e **interactivos**. Cada bloque combina definición, criterios de uso y ejemplos.

Las páginas de transición 35, 64, 89, 128, 142, 149 y 153 vuelven a mostrar esa relación y resaltan el bloque que comienza; no añaden familias nuevas. Esta organización se conserva bajo los títulos ya existentes del Markdown.

## Elementos semánticos de estructura y elementos genéricos

Este bloque organiza el contenido en **unidades autónomas, secciones temáticas, navegación, complementos, encabezados, introducciones, cierres y contenido principal**. Los ejemplos de viajes muestran cómo esas funciones se combinan. Al final se comparan los elementos semánticos con **`div` y `span`**, que agrupan sin aportar un significado específico y se reservan como último recurso.

### 36. Elemento <body>

[Ver diapositiva 36](HTML5.pdf#page=36)

El esquema sitúa dentro de **`body`** los elementos estructurales que se estudiarán: **`article`**, **`section`**, **`nav`**, **`aside`**, **`h1` a `h6`**, **`hgroup`**, **`header`**, **`footer`** y **`address`**. No es una plantilla que obligue a utilizarlos todos en cada página: es una relación de elementos que permiten expresar la organización del contenido.

El criterio común es aportar **significado semántico**. Las páginas posteriores diferencian contenido autónomo, agrupación temática, navegación, información complementaria y zonas de introducción o cierre.

### 37. Elemento body

[Ver diapositiva 37](HTML5.pdf#page=37)

**`body` representa el contenido del documento y debe ser único**. El ejemplo original reúne un encabezado y un párrafo:

```html
<body>
    <h1>Universidad de Oviedo</h1>
    <p>Pública y de calidad, UniOvi te ofrece más de 120 títulos
    en una completa oferta académica.</p>
</body>
```

El cuerpo contiene la información presentada al usuario. La codificación y el título de la pestaña pertenecen a `head`, como se ha explicado antes; no sustituyen al encabezado ni al texto del cuerpo.

### 38. Elemento article

[Ver diapositiva 38](HTML5.pdf#page=38)

**`article` representa una composición autocontenida** que se puede distribuir independientemente o reutilizar. Su contenido mantiene sentido al extraerlo del documento que lo contiene.

```html
<article>
    <h2>Bora bora</h2>
    <p>Isla principal caracterizada por su mar turquesa y sus
    hoteles sobre el mar.</p>
    <img src="bora.jpg" alt="imagen de bora bora" />
</article>
```

El ejemplo presenta un destino con nombre, descripción e imagen. El PDF recomienda que cada artículo tenga un **encabezado `h1` a `h6`** que identifique su contenido, para facilitar la navegación, la accesibilidad y la comprensión de la estructura. Advierte de que el validador genera un **warning** cuando no se incluye ese encabezado.

### 39. Elemento section

[Ver diapositiva 39](HTML5.pdf#page=39)

**`section` es una agrupación temática de contenido** dentro de un documento. Su elección se basa en que los contenidos comparten un tema, no en necesitar una caja visual.

```html
<section>
    <h2>Islas del Pacifico</h2>
    <p>El océano Pacífico alberga numerosas islas
    tropicales conocidas por sus paisajes,
    biodiversidad y atractivo turístico.</p>
</section>
```

Como para `article`, se recomienda incluir un **encabezado `h1` a `h6`** que identifique la sección, facilite la navegación y haga comprensible la estructura. El PDF indica un **warning del validador** cuando falta.

### 40. Cuando usar article y cuando section

[Ver diapositiva 40](HTML5.pdf#page=40)

**`article` y `section` organizan contenido, pero expresan relaciones distintas.** Una sección agrupa contenido relacionado con un tema del documento. Un artículo reúne una unidad que podría publicarse fuera de él manteniendo su sentido.

| Pregunta de elección | Elemento indicado |
|---|---|
| ¿Agrupo contenido relacionado por su tema dentro de esta página? | `section` |
| ¿La unidad podría extraerse y reutilizarse de forma independiente? | `article` |

El ejemplo turístico siguiente permite ver ambas funciones a la vez: una sección temática contiene varios artículos autónomos.

### 41. Cuando usar

[Ver diapositiva 41](HTML5.pdf#page=41)

El ejemplo original de una web de información turística agrupa tres destinos en una sección:

```html
<section>
    <h2>Islas del Pacífico</h2>
    <p>El océano Pacífico alberga numerosas islas tropicales conocidas por sus
    paisajes, biodiversidad y atractivo turístico.</p>
    <article>
        <h3>Bora Bora</h3>
        <p>Isla de la Polinesia Francesa caracterizada por sus aguas turquesas
        y sus hoteles sobre el mar.</p>
        <img src="bora.jpg" alt="Vista de Bora Bora" />
    </article>
    <article>
        <h3>Fiyi</h3>
        <p>Archipiélago del Pacífico Sur conocido por sus arrecifes de coral, selvas
        tropicales y playas de arena blanca.</p>
        <img src="fiyi.jpg" alt="Vista de Fiyi" />
    </article>
    <article>
        <h3>Samoa</h3>
        <p>Conjunto de islas volcánicas destacado por sus paisajes naturales, su cultura
        polinesia y sus costas tropicales.</p>
        <img src="samoa.jpg" alt="Vista de Samoa" />
    </article>
</section>
```

**La sección expresa el tema común «Islas del Pacífico»**; cada artículo expresa un destino que tiene nombre, explicación e imagen propios. La jerarquía `h2`/`h3` distingue el tema de la sección y sus unidades. Las imágenes son recursos referenciados por el ejemplo; su existencia no es necesaria para comprender la estructura del código.

### 42. Cuando usar article y cuando section

[Ver diapositiva 42](HTML5.pdf#page=42)

La independencia del artículo se demuestra reutilizando la información de Bora Bora en otra página:

```html
<h2>Ofertas de destinos para otoño</h2>
<p>Nuestros destino en oferta:</p>
<article>
    <h3>Bora Bora</h3>
    <p>Isla de la Polinesia Francesa caracterizada por sus aguas
    turquesas y sus hoteles sobre el mar.</p>
    <img src="bora.jpg" alt="Vista de Bora Bora" />
</article>
```

El contexto pasa de «Islas del Pacífico» a «Ofertas de destinos para otoño», pero el bloque de Bora Bora sigue siendo comprensible. Ese es el criterio de autonomía que justifica **`article`** en el ejemplo. La agrupación temática anterior, en cambio, correspondía a la sección que reunía los destinos.

### 43. Elemento nav

[Ver diapositiva 43](HTML5.pdf#page=43)

**`nav` representa una sección de navegación** con enlaces a otras páginas o a partes importantes de la misma. El PDF cita como usos el **menú principal**, los **índices**, un **menú lateral**, la **paginación de resultados** y las **migas de pan**.

```html
<nav>
    <a href="articulos.html">Articulos</a>
    <a href="actualidad.html">Actualidad</a>
    <a href="sucesos.html">Sucesos</a>
</nav>
```

**Diferencia de la captura:** la previsualización de la diapositiva muestra «Pacífico», «Caribe» y «África», mientras que el código contiene «Articulos», «Actualidad» y «Sucesos». En ambos casos ilustra enlaces de navegación; no se atribuye a este fragmento un texto que no contiene.

### 44. Elemento nav

[Ver diapositiva 44](HTML5.pdf#page=44)

Es frecuente organizar opciones de navegación equivalentes mediante una **lista dentro de `nav`**:

```html
<nav>
    <!-- Los lectores de pantalla dicen "lista con 3 elementos" -->
    <ul>
        <li><a href="articulos.html">Articulos</a></li>
        <li><a href="actualidad.html">Actualidad</a></li>
        <li><a href="sucesos.html">Sucesos</a></li>
    </ul>
</nav>
```

La lista hace explícita la relación entre las opciones y permite que el lector de pantalla comunique su cantidad, como señala el comentario. El PDF indica que **CSS puede cambiar la presentación para formar un menú horizontal**: la estructura de lista no obliga a una presentación concreta. La captura vuelve a usar nombres de destinos distintos de los del código; su función es mostrar las viñetas y la agrupación.

### 45. Elemento aside

[Ver diapositiva 45](HTML5.pdf#page=45)

**`aside` contiene información tangencial o complementaria** respecto al contenido principal. Debe poder considerarse separada de este, aunque guarde relación con él.

```html
<aside>
    <h2>Destinos relacionados</h2>
    <ul>
        <li>Tahití</li>
        <li>Samoa</li>
    </ul>
</aside>
```

Los destinos relacionados complementan la explicación principal. El significado de `aside` depende de esa relación con el contenido, no de una posición visual lateral.

### 46. Elemento aside

[Ver diapositiva 46](HTML5.pdf#page=46)

Un `aside` puede estar **dentro de `section` o de `article`** si aporta información complementaria de esa unidad sin convertirse en su contenido principal. El ejemplo original es:

```html
<article>
    <h1>Bora Bora</h1>
    <p>Isla de la Polinesia Francesa caracterizada por sus aguas
    turquesas y sus hoteles sobre el mar.</p>
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

El párrafo describe el destino y el bloque de datos rápidos lo complementa. La población y la moneda se conservan como contenido del ejemplo del PDF, sin verificarlas o actualizarlas mediante fuentes externas.

### 47. Elemento aside

[Ver diapositiva 47](HTML5.pdf#page=47)

**`aside` no significa «barra lateral»**. Puede mostrarse a un lado, integrarse en el flujo general o aparecer dentro de una sección o artículo. En todos los casos debe representar **información complementaria, no principal**.

**Explicación didáctica:** situar visualmente un bloque a la derecha no basta para justificar `aside`; del mismo modo, que un complemento aparezca entre otros párrafos no le hace perder ese significado. La elección se basa en la función del contenido.

### 48. Elemento h1, h2, h3, h4, h5 y h6

[Ver diapositiva 48](HTML5.pdf#page=48)

Los elementos **`h1` a `h6` representan encabezados**, desde el rango más alto hasta el más bajo. Deben seguir una **secuencia lógica y una jerarquía coherente**.

```html
<h1>Viajes exóticos</h1>
<h2>Islas del pacífico</h2>
```

El PDF recomienda **un único `h1` por documento** para identificar su tema principal, aunque indica que HTML admite varios. Añade que, en un sitio con varios documentos, ese encabezado suele identificar al propio sitio en todas las páginas. Se conservan ambas observaciones como recomendaciones del material, sin convertir «se recomienda uno» en «se prohíbe más de uno».

### 49. Elemento hgroup

[Ver diapositiva 49](HTML5.pdf#page=49)

**`hgroup` reúne un encabezado `h1` a `h6` con contenido relacionado** que actúa como subtítulo, título alternativo o eslogan. Puede agrupar un encabezado con uno o más párrafos para esa finalidad.

```html
<hgroup>
    <h1>Viajes exóticos</h1>
    <p>Guía de destino del Pacífico Sur</p>
</hgroup>
```

El párrafo no introduce una sección independiente: acompaña al título. El documento señala que **su uso es poco frecuente**.

### 50. Elemento header

[Ver diapositiva 50](HTML5.pdf#page=50)

**`header` representa el contenido introductorio** de una página o de una sección. Generalmente contiene encabezados `h1` a `h6` o `hgroup`, logotipos, navegación o formularios de búsqueda.

Una página puede tener **varios `header`**, porque distintas partes pueden disponer de su propia introducción. Es habitual que el principal reúna el **`h1`** y el **`nav` de navegación principal**. No debe confundirse `header`, que pertenece a la organización del contenido, con `head`, que reúne metadatos.

### 51. Elemento header

[Ver diapositiva 51](HTML5.pdf#page=51)

El ejemplo distingue una cabecera de página y una de sección:

```html
<header> <!-- Header principal de la página -->
    <h1>Viajes exóticos</h1>
    <nav>
        <a href="pacifico.html">Pacifico</a>
        <a href="caribe.html">Caribe</a>
        <a href="africa.html">Africa</a>
    </nav>
</header>
<section>
    <header> <!-- Header de la sección Islas del Pacífico -->
        <h2>Islas del Pacífico</h2>
        <p>Destinos conocidos por sus playas, arrecifes de coral y paisajes
        tropicales.</p>
    </header>
    (…)
</section>
```

El primer `header` introduce el sitio y su navegación. El segundo introduce solo la sección, con su título y una descripción. **`(…)` es un marcador de contenido omitido en el original**, no una etiqueta HTML ni un comentario.

### 52. Elemento footer

[Ver diapositiva 52](HTML5.pdf#page=52)

**`footer` representa el contenido de cierre** de una página, sección o artículo. Suele reunir autoría, derechos de autor, enlaces relacionados, información legal o datos de contacto.

Puede haber **varios pies en una página**, porque cada unidad puede tener el suyo. El principal suele incluir enlaces legales, contacto y navegación secundaria. La relación con la unidad a la que pertenece es más importante que interpretar `footer` como una posición decorativa en pantalla.

### 53. Elemento footer

[Ver diapositiva 53](HTML5.pdf#page=53)

El ejemplo de pie principal reúne copyright y navegación secundaria:

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

El `nav` del pie permite agrupar enlaces aunque la navegación principal esté en otra parte. El ejemplo ilustra por qué una página puede disponer de más de una región de navegación con finalidades distintas.

### 54. Elemento footer

[Ver diapositiva 54](HTML5.pdf#page=54)

El pie también puede pertenecer a un artículo concreto:

```html
<article>
    <h2>Bora Bora</h2>
    <p>Isla de la Polinesia Francesa caracterizada
    por sus aguas turquesas y sus hoteles sobre el mar.</p>
    <footer> <!-- Footer del artículo -->
        <p>Autor: Cris Pelayo</p>
        <p>Última actualización: septiembre de 2026</p>
    </footer>
</article>
```

La autoría y la fecha cierran **este artículo**, no necesariamente el conjunto del sitio. La fecha es la que aparece en el ejemplo original y no una afirmación sobre cuándo se han revisado estos apuntes.

### 55. Elemento address

[Ver diapositiva 55](HTML5.pdf#page=55)

**`address` reúne información de contacto relacionada con el autor o responsable del contenido próximo**. El PDF lo relaciona con artículo, sección o documento y lo ilustra dentro del pie principal:

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
        <a href="mailto:viajes@ejemplo.es">Equipo de Viajes exóticos</a></p>
    </address>
</footer>
```

El ejemplo identifica un equipo de contacto y permite abrir el servicio de correo mediante `mailto:`. Su función es **contacto**, no aplicar un estilo a cualquier dirección o bloque de texto.

### 56. Los elementos de sección deben utilizarse para

[Ver diapositiva 56](HTML5.pdf#page=56)

Los elementos estudiados deben dotar al documento de una **estructura semántica que refleje su organización lógica**. No se eligen únicamente para formar cajas de diseño.

El PDF introduce además **`main`**, que identifica el contenido principal. Aclara una diferencia entre su orden didáctico y la clasificación de la especificación: **`main` está clasificado en agrupamiento de contenido**, aunque aquí se estudie junto a la estructura. Esa clasificación se vuelve a recordar en la página 88.

### 57. Elemento main

[Ver diapositiva 57](HTML5.pdf#page=57)

**`main` identifica el contenido principal específico del documento**. No debe incluir elementos que se repiten en muchas páginas del sitio, como navegación principal, logotipos, copyright o formularios de búsqueda.

El documento establece **como máximo un `main` visible**. El matiz «visible» forma parte de la restricción expuesta: no se sustituye por una regla distinta. La página siguiente diferencia el contenido particular de los bloques comunes de cabecera y pie.

### 58. Elemento main

[Ver diapositiva 58](HTML5.pdf#page=58)

El ejemplo sitúa el contenido principal entre cabecera y pie:

```html
<header> <!-- Header principal de la página -->
    <h1>Viajes exóticos</h1>
    <nav>
        <a href="pacifico.html">Pacífico</a>
        <a href="caribe.html">Caribe</a>
        <a href="africa.html">África</a>
    </nav>
</header>
<main> <!-- Contenido principal de la página -->
    <section>
        <h2>Islas del Pacífico</h2>
        (….)
    </section>
</main>
<footer> <!-- Footer principal de la página -->
    <p>© Viajes exóticos</p>
</footer>
```

La navegación y el copyright quedan fuera de `main`. Dentro se sitúa la información de la página concreta. El marcador `(….)` representa la parte de la sección que el PDF no desarrolla en este fragmento.

### 59. Antes de HTML5 no existían los elementos

[Ver diapositiva 59](HTML5.pdf#page=59)

El PDF sitúa el uso de los contenedores genéricos en su contexto histórico: antes de los elementos estructurales introducidos con HTML5, se agrupaba contenido principalmente mediante **`div`** y **`span`**. Los contrapone a `header`, `nav`, `article`, `section`, `aside`, `footer` y `main`.

Que los genéricos permitan agrupar no significa que expresen la misma semántica. Los apartados siguientes explican por qué se consideran **último recurso cuando existe un elemento más adecuado**.

### 60. Elemento div

[Ver diapositiva 60](HTML5.pdf#page=60)

**`div` es un contenedor genérico de bloque sin significado semántico especial**. El PDF recuerda su papel en HTML 4.01 y recoge la recomendación de utilizarlo solo cuando no haya otro elemento semántico apropiado.

La justificación es doble: los elementos más adecuados facilitan la **accesibilidad para los lectores** y el **mantenimiento para los autores**. Llamarlo «sección» mediante un identificador no le añade por sí mismo el significado de `section`. El documento lo describe como el **«cajón de sastre» para contenido de bloque** y un último recurso, no como el sustituto normal de todos los elementos estructurales.

### 61. Elemento div

[Ver diapositiva 61](HTML5.pdf#page=61)

La comparación original mantiene un contenido parecido y cambia la semántica del contenedor:

```html
<!-- Agrupa contenido pero no informa qué representa ese contenido -->
<div id="seccion">
    <h2>Islas del Pacífico</h2>
    (…)
</div>
```

```html
<!-- Este bloque representa una sección temática del documento -->
<section>
    <h2>Islas del Pacífico</h2>
    (…)
</section>
```

Ambos agrupan el encabezado y el contenido omitido. **Solo el segundo declara que se trata de una sección temática**. `id="seccion"` identifica el `div`, pero no transforma el tipo de elemento ni sustituye su significado.

### 62. Elemento span

[Ver diapositiva 62](HTML5.pdf#page=62)

**`span` es un contenedor genérico en línea**, utilizado para agrupar fragmentos de texto sin añadir una semántica propia. El PDF recuerda que era el principal agrupador de línea en HTML 4.01.

Debe reservarse para cuando ningún elemento específico resulte adecuado, entre ellos **`strong`**, **`em`**, **`code`** o **`mark`**. Se considera el **último recurso para contenido en línea**, del mismo modo que `div` para contenido de bloque.

### 63. Elemento span

[Ver diapositiva 63](HTML5.pdf#page=63)

La página compara agrupación genérica e importancia:

```html
<!-- Agrupa una parte del texto pero no informa qué representa -->
<p>Bora Bora destaca por sus <span>aguas turquesas</span></p>
```

```html
<!-- Este fragmento representa información especialmente importante -->
<p>Bora Bora destaca por sus <strong>aguas turquesas</strong></p>
```

`span` permite delimitar las palabras sin atribuirles importancia. `strong` añade ese significado. **Explicación didáctica:** si lo que se pretende comunicar es importancia, la segunda elección expresa la intención; la elección no depende de preferir una negrita u otro efecto de presentación.

## Elementos de agrupación de contenido

Una vez definidas las partes del documento, hay que organizar lo que contienen: párrafos, texto preformateado, citas, rupturas temáticas, listas y figuras. El PDF añade comandos y regiones de búsqueda. En todos los casos se explica **qué relación representa el elemento** y después cómo aparece en las capturas.

### 65. Los elementos estructurales (<section>, <article>, Ingeniería

[Ver diapositiva 65](HTML5.pdf#page=65)

Los elementos estructurales organizan las partes del documento; los **elementos de agrupación** organizan el contenido dentro de esas partes. La selección depende de la **naturaleza y semántica** del contenido: párrafos con `p`, citas con `blockquote`, listas con sus elementos específicos y texto preformateado con `pre`.

La regla del PDF es constante: **elegir por significado y no por presentación visual**. Una sangría, una línea o una viñeta pueden ser efectos de representación; lo que justifica el elemento es el tipo de información que organiza.

### 66. Elemento <p>

[Ver diapositiva 66](HTML5.pdf#page=66)

**`p` representa un párrafo, una unidad temática de texto**. Se delimita con apertura y cierre; dos elementos `p` representan dos párrafos distintos. El documento advierte de que **no se debe utilizar `br` para separar párrafos**.

En la representación ordinaria de un párrafo, el navegador no conserva los saltos y espacios adicionales tal como se escriben en el archivo. Por eso la distribución del código en líneas no sustituye la estructura de párrafos. El caso de texto que necesita conservar el espaciado se resuelve con `pre`, estudiado después.

### 67. Elemento <p>

[Ver diapositiva 67](HTML5.pdf#page=67)

El ejemplo original contiene dos párrafos con saltos y espacios adicionales en el código:

```html
<p>Bora Bora es uno de los
destinos más visitados de la
Polinesia Francesa por sus
paisajes tropicales y sus
aguas cristalinas.</p>

<p>La mejor época para
visitarla suele

        situarse entre mayo y
octubre, cuando las lluvias
son
    menos frecuentes.
</p>
```

La captura muestra **dos párrafos de texto continuo**, sin reproducir los huecos ni cada cambio de línea del archivo. Las flechas de la diapositiva señalan precisamente los saltos y espacios ignorados como formato adicional. Se conserva el contenido de ambos párrafos y se representa el espaciado irregular del ejemplo para mostrar su finalidad.

### 68. pre: representa texto preformateado

[Ver diapositiva 68](HTML5.pdf#page=68)

**`pre` representa texto preformateado**. A diferencia del párrafo, mantiene saltos de línea, espacios y tabulaciones del código fuente. Resulta apropiado cuando el espaciado es parte de la información.

El PDF cita **código fuente**, **salidas de consola**, **tablas ASCII**, **poemas** y otros textos donde importa la disposición. No significa que todo texto deba escribirse en `pre`: la distinción con `p` depende de si se necesita conservar ese formato.

### 69. pre: representa texto preformateado

[Ver diapositiva 69](HTML5.pdf#page=69)

El poema de la diapositiva permite observar la conservación del formato:

```html
<pre> <!-- ejemplo de poema -->
Bora Bora

    Entre lagunas de cristal,
    descansa la isla tropical.

    El mar refleja el cielo azul,
    mientras la brisa cruza el atolón.
</pre>
```

La captura conserva las líneas, los huecos y la sangría de los versos. **Adaptación de transcripción:** se utilizan espacios para representar la sangría visible de la figura; el PDF no permite recuperar con seguridad si cada separación original era un tabulador o varios espacios. Lo que se conserva es la finalidad del ejemplo: el espaciado de `pre` sí tiene reflejo en la salida.

### 70. blockquote: representa una cita extensa procedente de Ingeniería

[Ver diapositiva 70](HTML5.pdf#page=70)

**`blockquote` representa una cita extensa procedente de otra fuente**. Puede contener varios párrafos u otros elementos HTML. Los navegadores suelen mostrarla con sangrado.

El sangrado es una presentación habitual, no su finalidad semántica: **no debe utilizarse para aplicar un efecto visual** a un texto que no sea una cita. La elección se basa en que el contenido procede de una fuente externa.

### 71. blockquote: representa una cita extensa procedente de Ingeniería

[Ver diapositiva 71](HTML5.pdf#page=71)

El ejemplo conserva una cita y, fuera de ella, la identificación de su fuente:

```html
<blockquote> <!-- ejemplo de cita -->
    Bora Bora es conocida internacionalmente por sus lagunas
    cristalinas y sus complejos turísticos construidos sobre el agua.
</blockquote>
<p>Fuente: Guía oficial de turismo de la Polinesia Francesa</p>
```

La captura muestra la cita desplazada respecto al párrafo de fuente, mediante el sangrado habitual. La atribución se reproduce como contenido del ejemplo del PDF; no se ha consultado ni verificado esa guía externa.

### 72. <hr> representa una ruptura temática entre bloques de Ingeniería

[Ver diapositiva 72](HTML5.pdf#page=72)

**`hr` expresa una ruptura temática** entre bloques relacionados. Puede marcar un cambio de tema, de escena o de sección conceptual dentro de un documento.

Su representación habitual es una línea horizontal, pero el PDF advierte que **no debe usarse solo para dibujar una línea decorativa**. La separación tiene un significado de contenido, no únicamente un efecto gráfico.

### 73. <hr> representa una ruptura temática entre bloques de Ingeniería

[Ver diapositiva 73](HTML5.pdf#page=73)

El ejemplo separa la descripción del destino de la información práctica:

```html
<section>
    <h2>Islas del Pacífico</h2>
    <p>Bora Bora destaca por sus lagunas cristalinas y sus
    hoteles construidos sobre el agua.</p>
    <hr>
    <p>Mejor época para viajar: de mayo a octubre.</p>
</section>
```

Las flechas del PDF identifican el primer bloque como **descripción del destino** y el segundo como **información práctica para el viaje**. La línea visible de la captura es la representación de ese cambio temático. El código mantiene ambos párrafos dentro de la misma sección general.

### 74. HTML proporciona tres tipos de listas:

[Ver diapositiva 74](HTML5.pdf#page=74)

HTML ofrece tres tipos de listas. La elección depende del significado de sus elementos:

| Lista | Contenedor | Componentes | Criterio |
|---|---|---|---|
| No ordenada | `ul` | `li` | El orden no es significativo |
| Ordenada | `ol` | `li` | El orden sí es significativo |
| De descripción o definición | `dl` | `dt` y `dd` | Asocia términos con sus descripciones |

No se elige `ol` solo por querer números ni `ul` solo por querer viñetas; el PDF vincula esa diferencia a si cambiar el orden cambia el significado.

### 75. Listas no ordenadas <ul>

[Ver diapositiva 75](HTML5.pdf#page=75)

**`ul` se utiliza cuando el orden no es significativo**. Su presentación habitual emplea viñetas. El ejemplo original enumera destinos:

```html
<h2>Islas del Pacífico</h2>
<ul>
    <li>Bora Bora</li>
    <li>Fiyi</li>
    <li>Samoa</li>
</ul>
```

La captura muestra los tres nombres con viñetas. Cada elemento `li` pertenece a la lista; aquí su posición no expresa una secuencia de pasos ni un orden necesario.

### 76. Listas ordenadas <ol>

[Ver diapositiva 76](HTML5.pdf#page=76)

**`ol` representa una lista cuyo orden importa**: alterarlo cambia el significado de la secuencia. Suelen mostrarse números que expresan ese orden.

```html
<h2>Preparación del viaje</h2>
<ol>
    <li>Reservar el vuelo</li>
    <li>Reservar el alojamiento</li>
    <li>Contratar el seguro</li>
</ol>
```

El ejemplo muestra una preparación del viaje en tres pasos. La captura numera los elementos del 1 al 3, frente a las viñetas de la lista no ordenada.

### 77. Listas de descripción/definición <dl>

[Ver diapositiva 77](HTML5.pdf#page=77)

**`dl` asocia términos y descripciones** y es habitual en glosarios, diccionarios o preguntas frecuentes. El término se escribe con **`dt`** y la descripción con **`dd`**.

```html
<h2>Islas del Pacífico</h2>
<dl>
    <dt>Bora Bora</dt>
    <dd>Isla de la Polinesia Francesa.</dd>
    <dt>Fiyi</dt>
    <dd>Archipiélago del Pacífico Sur.</dd>
    <dt>Samoa</dt>
    <dd>Conjunto de islas volcánicas de cultura polinesia.</dd>
</dl>
```

La captura sitúa cada descripción debajo de su término, con sangría. La relación semántica importante es **nombre y descripción**, no una secuencia de opciones ni una lista de pasos.

### 78. Anidamiento de listas

[Ver diapositiva 78](HTML5.pdf#page=78)

Las listas pueden anidarse para representar jerarquías. La **lista interior debe estar dentro de un `li`** de la exterior. El ejemplo del PDF lo hace dentro de «Elemento 2»:

```html
<ul>
    <li>Elemento 1</li>
    <li>Elemento 2
        <!-- lista anidada -->
        <ol>
            <li>Elemento 2.1</li>
            <li>Elemento 2.2</li>
            <li>Elemento 2.3</li>
        </ol>
    </li>
    <li>Elemento 3</li>
</ul>
```

El cierre del segundo `li` aparece **después** de `</ol>`. La captura combina viñetas exteriores con numeración interior. La clave no es esa apariencia, sino que los tres elementos numerados dependen del segundo elemento de la lista exterior.

### 79. Anidamiento de listas

[Ver diapositiva 79](HTML5.pdf#page=79)

La misma relación se aplica al ejemplo turístico:

```html
<h2>Islas del Pacífico</h2>
<ul>
    <li>Bora Bora</li>
    <li>Fiyi
        <!-- Lista anidada -->
        <ol>
            <li>Buceo en arrecifes</li>
            <li>Excursión en barco</li>
            <li>Senderismo</li>
        </ol>
    </li>
    <li>Samoa</li>
</ul>
```

Las actividades quedan asociadas a **Fiyi**, porque `ol` está dentro de su `li`. La figura muestra ese segundo nivel con sangría y números. Colocar la lista después de cerrar el elemento de Fiyi perdería la relación de contención que se quiere expresar.

### 80. <figure> representa contenido autónomo relacionado

[Ver diapositiva 80](HTML5.pdf#page=80)

**`figure` representa contenido autónomo, ilustrativo o complementario**, relacionado con el contenido principal. Puede incluir imágenes, diagramas, tablas, código, ilustraciones o ejemplos. Habitualmente contiene una imagen, pero no está restringido a ellas.

El bloque puede desplazarse o reutilizarse sin afectar al resto del documento. El PDF compara su autonomía con la de `article`: este reúne una unidad textual autónoma; `figure`, una unidad ilustrativa o complementaria. La diferencia no consiste simplemente en que el navegador dibuje una imagen.

### 81. <figcaption> representa el título o descripción de un Ingeniería

[Ver diapositiva 81](HTML5.pdf#page=81)

**`figcaption` aporta el título o descripción de una `figure`** y proporciona contexto a su contenido. Puede aparecer **al principio o al final**, pero cada figura puede contener **como máximo un `figcaption`**.

Esta leyenda pertenece a la figura completa. En el ejemplo con imagen no sustituye al atributo `alt`: el PDF muestra ambos con funciones diferenciadas, una descripción de la imagen y una leyenda contextual de la figura.

### 82. <figure> y <figcaption> con imágenes (lo más habitual)

[Ver diapositiva 82](HTML5.pdf#page=82)

El ejemplo habitual contiene una imagen y una leyenda final:

```html
<h2>Viajes exóticos</h2>
<figure>
    <img src="lagunaBoraBora.jpg" alt="Vista de Bora Bora" />
    <figcaption>
        Vista aérea de Bora Bora, en la Polinesia Francesa.
    </figcaption>
</figure>
```

La captura muestra la fotografía de la isla y, debajo, su descripción. `src` identifica el recurso; `alt` aporta el texto alternativo; `figcaption` contextualiza la figura. El conjunto es la unidad autónoma.

### 83. <figure> y <figcaption> con contenido no gráfico

[Ver diapositiva 83](HTML5.pdf#page=83)

Una figura también puede contener una cita, sin una imagen:

```html
<h2>Viajes</h2>
<figure>
    <figcaption>
        Descripción de Bora Bora tomada de una guía turística.
    </figcaption>
    <blockquote>
        Bora Bora es conocida internacionalmente por sus
        lagunas cristalinas y sus complejos turísticos
        construidos sobre el agua.
    </blockquote>
</figure>
```

La captura presenta primero la leyenda y después la cita con sangrado. Esto demuestra dos puntos: **`figure` no exige contenido gráfico** y **`figcaption` puede situarse al principio**. No hay una segunda leyenda ni una imagen implícita.

### 84. <menu> representa una lista de comandos u opciones

[Ver diapositiva 84](HTML5.pdf#page=84)

**`menu` representa una lista de comandos, acciones u opciones disponibles para el usuario**. Está relacionado con `ul` y utiliza elementos `li`. El PDF describe su origen en menús de comandos y señala que su uso es poco frecuente, sustituyéndose habitualmente por soluciones basadas en `ul`, CSS y JavaScript.

| Elemento | Finalidad que distingue el documento |
|---|---|
| `nav` | Navegación |
| `menu` | Acciones u opciones |
| `ul` | Lista genérica no ordenada |

**Errata de la diapositiva:** en una viñeta aparece `<menú>` con tilde; el elemento que se explica y utiliza en el código es **`menu`**.

### 85. <menu> representa una lista de comandos u opciones

[Ver diapositiva 85](HTML5.pdf#page=85)

El ejemplo enumera acciones disponibles:

```html
<h2>Acciones disponibles</h2>
<menu>
    <li>Reservar viaje</li>
    <li>Consultar disponibilidad</li>
    <li>Solicitar información</li>
</menu>
```

La captura presenta las opciones como una lista con viñetas. **Límite del ejemplo:** sus elementos contienen texto; el código no implementa una reserva ni una consulta. Se muestra el agrupamiento semántico de opciones, no la lógica de sus acciones.

### 86. <search> representa una región del documento

[Ver diapositiva 86](HTML5.pdf#page=86)

**`search` representa una región destinada a búsquedas**, habitualmente con un formulario. Aporta significado específico para esa función. El PDF lo describe como relativamente reciente y de uso menos frecuente que otros elementos.

Advierte de que algunas herramientas de validación no lo reconocen correctamente y propone **`<form role="search">`** como alternativa de compatibilidad. Esa observación se recoge **como información del material**, sin actualizar el estado de los validadores mediante fuentes externas. La alternativa no es una explicación general de todos los valores de `role`.

### 87. <search> representa una región del documento

[Ver diapositiva 87](HTML5.pdf#page=87)

El ejemplo relaciona la región de búsqueda con un formulario y su control:

```html
<h2>Buscar destinos</h2>
<search>
    <form>
        <label for="destino">Destino:</label>
        <input id="destino" name="destino" type="search">
        <button>Buscar</button>
    </form>
</search>
```

La captura muestra el rótulo «Destino», una caja de entrada y un botón «Buscar». **`for="destino"` relaciona la etiqueta con `id="destino"`**, mientras que `type="search"` identifica el tipo de entrada. El PDF no incluye un destino de procesamiento ni resultados de búsqueda, por lo que no se presenta este fragmento como un buscador completo.

### 88. Resumen: la elección del elemento depende de la

[Ver diapositiva 88](HTML5.pdf#page=88)

El resumen original insiste en **elegir por semántica, no por apariencia**:

| Elemento | Contenido que representa |
|---|---|
| `p` | Párrafo |
| `pre` | Texto preformateado |
| `blockquote` | Cita extensa |
| `hr` | Ruptura temática |
| `ul` | Lista no ordenada |
| `ol` | Lista ordenada |
| `dl` | Lista de descripción |
| `figure` | Contenido autónomo ilustrativo o complementario |
| `figcaption` | Título o descripción de una figura |
| `menu` | Comandos, acciones u opciones |
| `search` | Región destinada a búsquedas |

El PDF aclara que **`main` y `div` también pertenecen a agrupación de contenido en la especificación**, aunque se hayan explicado antes junto a los elementos estructurales por motivos didácticos.

## Elementos semánticos de texto y enlaces

Los elementos de texto identifican funciones dentro de una frase o fragmento: **énfasis, importancia, cita, término, abreviatura, valor para máquinas, código, entrada, salida o dirección de escritura**. Los enlaces se desarrollan mediante sus atributos de destino y comportamiento. Las comparaciones entre elementos que pueden verse de forma parecida son importantes para evitar elegir solo por negrita, cursiva, subrayado o tachado.

### 90. Elemento <a> representa un hiperenlace

[Ver diapositiva 90](HTML5.pdf#page=90)

**`a` representa un hiperenlace** hacia recursos, documentos, ubicaciones de una página o servicios externos. Su contenido es el texto visible; los atributos definen el destino y el comportamiento.

```html
<p>
    Descubre más información sobre <a href="borabora.html">Bora Bora</a>.
</p>
```

En la captura, «Bora Bora» aparece como texto enlazado dentro del párrafo. El destino es `borabora.html`, no el texto visible: cambiar una parte no equivale a cambiar la otra.

### 91. Atributo href del elemento <a> indica el destino del Ingeniería

[Ver diapositiva 91](HTML5.pdf#page=91)

**`href` indica el destino del enlace**. La diapositiva distingue cinco posibilidades:

| Tipo de destino | Ejemplo original de href |
|---|---|
| URL absoluta | `https://www.uniovi.es` |
| Recurso relativo del sitio | `borabora.html` |
| Fragmento del documento | `#pacifico` |
| Correo electrónico | `mailto:info@viajesexoticos.es` |
| Teléfono | `tel:+34985000000` |

Los fragmentos de apertura que muestra el original son:

```html
<a href="https://www.uniovi.es">
<a href="borabora.html">
<a href="#pacifico">
<a href="mailto:info@viajesexoticos.es">
<a href="tel:+34985000000">
```

Son ejemplos de **etiqueta de inicio**, no cinco elementos completos listos para concatenarse sin cierres. La siguiente diapositiva los integra en una lista y muestra el identificador de destino del enlace interno.

### 92. Atributo href del elemento <a> indica el destino del Ingeniería

[Ver diapositiva 92](HTML5.pdf#page=92)

El ejemplo completo reúne los tipos de destino en una lista:

```html
<h2>Viajes exóticos</h2>
<ul>
    <li><a href="https://www.uniovi.es">Universidad de Oviedo</a></li>
    <li><a href="borabora.htlm">Bora Bora</a></li>
    <li><a href="#pacifico">Islas del Pacífico</a></li>
    <li><a href="mailto:info@viajesexoticos.es">Enviar mail a Viajes Exóticos</a></li>
    <li><a href="tel:+34985000000">+34 985 000 000</a></li>
</ul>
<h2 id="pacifico">Islas del Pacífico</h2>
(...)
```

El enlace `#pacifico` apunta al encabezado con ese **`id`**. Los enlaces `mailto:` y `tel:` representan servicios de correo y teléfono. La captura muestra los cinco enlaces y el encabezado de destino.

**Errata conservada:** el PDF escribe **`borabora.htlm`**, mientras que en otros ejemplos utiliza `.html`. Para enlazar el archivo HTML previsto habría que corregir expresamente la extensión. `(...)` marca contenido omitido en el ejemplo.

### 93. El atributo target del elemento <a> indica el contexto donde

[Ver diapositiva 93](HTML5.pdf#page=93)

**`target` establece el contexto en el que se abre el recurso**. El PDF enumera:

| Valor | Contexto |
|---|---|
| `_self` | El mismo contexto o pestaña; es el valor por defecto |
| `_blank` | Una pestaña o ventana nueva |
| `_parent` | El contexto padre, en situaciones con iframes |
| `_top` | El contexto superior, en situaciones con iframes |
| Un nombre | El contexto de navegación identificado por ese nombre |

El cambio de contexto debe utilizarse con **precaución**. Si se usa `_blank`, el PDF pide advertir al usuario de la apertura en otra pestaña o ventana, porque un cambio inesperado puede resultar confuso y afectar a la accesibilidad.

### 94. El atributo target del elemento <a> indica el contexto Ingeniería

[Ver diapositiva 94](HTML5.pdf#page=94)

El ejemplo avisa de la apertura en un contexto nuevo dentro del propio texto:

```html
<a href="https://www.uniovi.es" target="_blank">
    Universidad de Oviedo (se abre en una nueva ventana)
</a>
```

La captura muestra el enlace con la advertencia y la página de destino en una ventana distinta. El aviso visible es parte importante del ejemplo: no se deja toda la información sobre el cambio de contexto en un atributo que el usuario pueda no percibir.

### 95. El atributo rel del elemento <a> indica la relación entre

[Ver diapositiva 95](HTML5.pdf#page=95)

**`rel` expresa la relación entre el documento actual y el recurso enlazado**. El PDF distingue estos valores:

| Valor | Significado que expone el material |
|---|---|
| `noopener` | Impide al documento enlazado acceder a la ventana que abrió el enlace y mejora la seguridad |
| `noreferrer` | No envía información de referencia al recurso enlazado |
| `external` | Identifica un sitio o recurso externo |
| `nofollow` | Indica a los motores de búsqueda que no sigan el enlace ni transfieran reputación al recurso |

La presentación señala que **`noopener` y `noreferrer` son habituales con `target="_blank"`**. Las descripciones se conservan con el alcance del PDF; no se añade una revisión externa de políticas de navegadores o buscadores.

### 96. El atributo target y el atributo rel del elemento <a>

[Ver diapositiva 96](HTML5.pdf#page=96)

El ejemplo combina la apertura en una ventana nueva con dos relaciones:

```html
<a href="https://www.uniovi.es"
   target="_blank"
   rel="noopener noreferrer">
    Universidad de Oviedo
    (se abre en una ventana nueva)
</a>
```

`target` determina el contexto; `rel` reúne los valores que el documento relaciona con acceso a la ventana e información de referencia. El contenido visible mantiene el aviso de apertura. La captura vuelve a mostrar el enlace y la página de destino separada.

### 97. El atributo download del elemento <a> indica que el

[Ver diapositiva 97](HTML5.pdf#page=97)

**`download` indica que se intente descargar el recurso en lugar de navegar hacia él**, mostrándolo o abriéndolo como destino. Se utiliza para documentos, imágenes o archivos.

```html
<a href="guía-pacifico.pdf" download>
    Descargar la guía de las Islas del pacífico
</a>
```

El atributo puede aparecer sin valor, como en el ejemplo, o con un **nombre de archivo sugerido**, por ejemplo `download="guía-pacifico.pdf"`. El PDF habla de que el navegador **intenta descargar**; no desarrolla restricciones o casos particulares de descarga. Se ha normalizado explícitamente la comilla curva de cierre que aparece en el original.

### 98. El atributo title del elemento <a> permite proporcionar

[Ver diapositiva 98](HTML5.pdf#page=98)

El atributo **`title` de un enlace aporta información complementaria** sobre su recurso. Algunos navegadores la muestran en un texto emergente al situar el puntero sobre el enlace.

```html
<p>Descubre más información sobre
<a href="bora-bora.html" title="Guía turística de Bora Bora">Bora Bora</a></p>
```

La captura muestra el texto emergente «Guía turística de Bora Bora». El PDF advierte de que **no debe ser el único mecanismo para transmitir información importante**, porque muchos usuarios de dispositivos táctiles no pueden acceder a ella fácilmente. La información fundamental debe poder comprenderse sin depender de ese efecto.

### 99. El elemento <em> representa un énfasis en el texto

[Ver diapositiva 99](HTML5.pdf#page=99)

**`em` representa énfasis** sobre una palabra o fragmento. Ese énfasis puede modificar el significado de una frase: no es una elección puramente decorativa.

Los navegadores suelen mostrarlo en **cursiva**, pero su función es indicar qué parte se enfatiza. La distinción resulta importante al compararlo con `i`, que el PDF reserva para una voz o significado diferente y que no implica énfasis.

### 100. El elemento <strong> representa un texto

[Ver diapositiva 100](HTML5.pdf#page=100)

**`strong` representa importancia especial, urgencia o relevancia**. Aporta significado semántico al fragmento que contiene.

Aunque los navegadores suelen representarlo en **negrita**, no debe elegirse únicamente para obtener ese aspecto. El PDF lo diferencia de `b`, que dirige visualmente la atención sin implicar esa importancia, y al final de la unidad ofrece un ejemplo de uso incorrecto por razones de diseño.

### 101. El elemento <small> representa comentarios,

[Ver diapositiva 101](HTML5.pdf#page=101)

**`small` representa comentarios, aclaraciones o información auxiliar**. Es habitual en notas legales y otras aclaraciones de carácter secundario.

La advertencia es **no utilizarlo solo para reducir el tamaño de la letra**. Lo que justifica el elemento es la función secundaria de la información; el tamaño visual no debe sustituir ese criterio.

### 102. El elemento <s> representa contenido que ya no es

[Ver diapositiva 102](HTML5.pdf#page=102)

**`s` identifica contenido que ya no es correcto o relevante**, por ejemplo información obsoleta. Su representación habitual es el tachado.

El PDF aclara que **no implica eliminación del contenido**. Esa diferencia lo separa de `del`, que registra contenido eliminado del documento. Que los dos puedan verse tachados no hace equivalentes sus significados.

### 103. El elemento <del> representa contenido eliminado del

[Ver diapositiva 103](HTML5.pdf#page=103)

Esta diapositiva desarrolla **dos elementos de edición**, aunque el título existente mencione solo el primero. Ambos se sitúan en el apartado **4.7, Edits**, de la especificación:

| Elemento | Significado | Presentación habitual indicada |
|---|---|---|
| `del` | Contenido eliminado o retirado del documento | Tachado |
| `ins` | Contenido añadido; inserción o modificación | Subrayado |

El PDF indica que pueden acompañarse de **fecha y autor del cambio**, pero no desarrolla aquí la sintaxis para esa información. Se conserva esa posibilidad sin inventar atributos. La edición es distinta de presentar información obsoleta con `s`.

### 104. El elemento <cite> representa el título de una obra.

[Ver diapositiva 104](HTML5.pdf#page=104)

**`cite` representa el título de una obra**: puede tratarse de un libro, artículo, película, canción o publicación. Identifica la obra a la que se hace referencia.

La restricción destacada es que **no representa el nombre del autor**. Esta distinción permite separar la identificación de la obra de la atribución de su autoría, aunque ambas aparezcan cerca en el texto.

### 105. El elemento <q> representa una cita breve en línea.

[Ver diapositiva 105](HTML5.pdf#page=105)

**`q` representa una cita breve en línea**, integrada, por ejemplo, dentro de un párrafo. A diferencia de `blockquote`, no constituye un bloque independiente.

Los navegadores suelen añadir **comillas automáticamente**. La elección entre ambos elementos se basa en el tipo de cita y su integración en el contenido: breve en línea frente a extensa en bloque.

### 106. El elemento <dfn> representa el término que está

[Ver diapositiva 106](HTML5.pdf#page=106)

**`dfn` marca el término que se está definiendo**. Se utiliza junto con la definición e identifica el concepto introducido por primera vez.

El PDF lo relaciona con **glosarios y documentación técnica**. El elemento señala el término; no debe confundirse con la lista de descripción `dl`, que organiza asociaciones de términos y descripciones completas.

### 107. El elemento <abbr> representa una abreviatura o

[Ver diapositiva 107](HTML5.pdf#page=107)

**`abbr` representa una abreviatura o acrónimo**. Puede utilizar el atributo **`title` para expresar su forma completa**.

Según el PDF, facilita la comprensión y mejora la accesibilidad de abreviaturas poco conocidas. Debe recordarse también la advertencia general sobre `title`: que aporte información complementaria no significa que toda información esencial deba depender de un texto emergente.

### 108. El elemento <ruby> representa anotaciones de

[Ver diapositiva 108](HTML5.pdf#page=108)

**`ruby` representa anotaciones de pronunciación o explicación**, principalmente utilizadas en lenguas asiáticas. Asocia anotaciones con caracteres concretos y suele combinarse con `rt`.

El elemento organiza la relación entre el texto principal y su anotación. Las páginas siguientes diferencian el texto de la anotación y el contenido alternativo para navegadores que no la soportan; no hay un ejemplo de código de esa combinación en el PDF.

### 109. El elemento <rt> el texto de la anotación de un

[Ver diapositiva 109](HTML5.pdf#page=109)

**`rt` contiene el texto de la anotación de un `ruby`**, es decir, la pronunciación o explicación asociada. **Debe utilizarse dentro de `ruby`**.

La anotación suele mostrarse encima o junto al texto principal. Su función no es añadir un párrafo corriente al lado, sino identificar el contenido explicativo de la anotación.

### 110. El elemento <rp> proporciona texto alternativo para

[Ver diapositiva 110](HTML5.pdf#page=110)

**`rp` proporciona texto alternativo para navegadores sin soporte de ruby**. Se utiliza con `ruby` y `rt`, y normalmente contiene **paréntesis**.

La presentación señala que su uso es poco frecuente. La distinción que hay que retener es: `ruby` organiza la anotación, `rt` expresa su texto y `rp` aporta la alternativa que describe el documento.

### 111. El elemento <data> asocia contenido visible con un

[Ver diapositiva 111](HTML5.pdf#page=111)

**`data` asocia un contenido visible con un valor legible por máquinas** mediante el atributo **`value`**. Así combina información dirigida a personas con otra que una aplicación puede procesar.

El PDF destaca que facilita el **procesamiento automático de datos**. No ofrece un ejemplo concreto de valor ni desarrolla una API, por lo que no se atribuyen a esta diapositiva operaciones que no contiene.

### 112. El elemento <time> representa una fecha, una hora o

[Ver diapositiva 112](HTML5.pdf#page=112)

**`time` representa una fecha, una hora o una duración**. Puede acompañarse del atributo **`datetime`** para facilitar la interpretación automática.

El documento lo presenta como una mejora de la semántica: el contenido deja de ser únicamente una cadena textual y se identifica como información temporal. La diapositiva no desarrolla formatos concretos de `datetime`, de modo que no se añaden reglas de sintaxis externas.

### 113. El elemento <code> representa un fragmento de código.

[Ver diapositiva 113](HTML5.pdf#page=113)

**`code` identifica un fragmento de código**, como código fuente, etiquetas o comandos. Tiene significado semántico y suele representarse con una fuente **monoespaciada**.

**Explicación didáctica:** su función se distingue de `pre`, explicado antes. `code` identifica la naturaleza del fragmento; `pre` conserva el espaciado del texto. Que el navegador pueda mostrar ambos con aspecto técnico no hace que expresen exactamente lo mismo.

### 114. El elemento <var> representa una variable.

[Ver diapositiva 114](HTML5.pdf#page=114)

**`var` representa una variable**, habitualmente en expresiones matemáticas o fragmentos de código. Identifica un valor que puede variar y aporta ese significado específico.

La decisión de usarlo se basa en que el fragmento es una variable, no simplemente en querer diferenciar visualmente una palabra de su contexto.

### 115. El elemento <samp> representa la salida de un

[Ver diapositiva 115](HTML5.pdf#page=115)

**`samp` representa la salida de un programa o sistema**. Se utiliza para resultados producidos por software y es habitual en documentación técnica.

Su presentación usual es monoespaciada. El criterio que lo distingue de `code` y `kbd` es el papel del texto: **resultado del sistema**, frente a código o entrada del usuario.

### 116. El elemento <kbd> representa una entrada realizada

[Ver diapositiva 116](HTML5.pdf#page=116)

**`kbd` identifica una entrada realizada por el usuario**. El documento cita teclas, combinaciones de teclado y comandos introducidos por una persona.

Tiene un significado específico de **entrada**, no de salida de programa. Esta diferencia con `samp` permite interpretar correctamente instrucciones y respuestas de una aplicación, aunque el aspecto de los fragmentos pueda ser parecido.

### 117. El elemento <sub> representa texto en subíndice.

[Ver diapositiva 117](HTML5.pdf#page=117)

La página estudia conjuntamente **subíndices y superíndices**:

| Elemento | Posición del contenido | Usos citados |
|---|---|---|
| `sub` | Por debajo de la línea base | Fórmulas químicas o matemáticas |
| `sup` | Por encima de la línea base | Exponentes o referencias |

El documento atribuye significado semántico a ambos. Se conserva también `sup`, que no figuraba en el título de este apartado, porque forma parte de la misma diapositiva.

### 118. El elemento <mark> representa texto destacado por su

[Ver diapositiva 118](HTML5.pdf#page=118)

**`mark` señala texto relevante en un contexto concreto**. Los navegadores suelen representarlo con un fondo resaltado.

La relevancia contextual **no equivale a la importancia especial de `strong`**. Esa comparación es explícita en el PDF: destacar un fragmento en una situación determinada no supone atribuirle urgencia o importancia general.

### 119. El elemento <b> representa texto al que se desea dirigir

[Ver diapositiva 119](HTML5.pdf#page=119)

**`b` dirige visualmente la atención a un texto sin implicar importancia especial**. Su presentación habitual es la negrita.

El documento lo diferencia de `strong`: comparten un aspecto frecuente, pero no el significado. La elección de `strong` debe responder a importancia, mientras que el caso de `b` es la atención visual descrita por la diapositiva.

### 120. El elemento <i> representa texto con una voz o

[Ver diapositiva 120](HTML5.pdf#page=120)

**`i` representa una voz o significado diferente del texto circundante**. El PDF cita términos técnicos, expresiones extranjeras y taxonomías.

Su representación habitual es la cursiva, pero **no implica énfasis**. Se diferencia por ello de `em`, aunque ambos puedan presentar un aspecto parecido. Debe elegirse por la función del fragmento dentro del texto.

### 121. El elemento <u> representa texto anotado de forma no

[Ver diapositiva 121](HTML5.pdf#page=121)

**`u` representa texto anotado de manera no textual**. El PDF cita nombres propios en algunas lenguas y la indicación de errores ortográficos.

Los navegadores suelen mostrarlo subrayado, pero **no debe utilizarse únicamente para subrayar**. La anotación es el criterio semántico de elección; el efecto de presentación por sí solo no justifica el elemento.

### 122. El elemento <u> representa texto anotado de forma no

[Ver diapositiva 122](HTML5.pdf#page=122)

La diapositiva 122 **repite el contenido de la 121**: `u` puede representar una anotación no textual, como un nombre propio en determinados contextos o un error ortográfico; suele mostrarse subrayado y no debe elegirse solo para lograr ese efecto.

Se conserva este apartado y su título porque ya existían en el Markdown. **No hay una segunda definición o ejemplo oculto que recuperar en esta página**: es una repetición del propio PDF, no un hueco de los apuntes.

### 123. El elemento <bdi> (Bidirectional Isolation) aísla un

[Ver diapositiva 123](HTML5.pdf#page=123)

**`bdi`, Bidirectional Isolation, aísla un fragmento cuya dirección de escritura puede diferir de la del texto que lo rodea**. Evita que esa dirección afecte al contenido vecino.

El PDF lo relaciona con contenido multilingüe y, en particular, con nombres o textos generados por usuarios. Aislar una dirección no es lo mismo que forzarla, función que se atribuye a `bdo` en la página siguiente.

### 124. El elemento <bdo> (Bidirectional Override) permite

[Ver diapositiva 124](HTML5.pdf#page=124)

**`bdo`, Bidirectional Override, fuerza la dirección de escritura** mediante el atributo **`dir`**. Los valores que describe la diapositiva son **`ltr`**, de izquierda a derecha, y **`rtl`**, de derecha a izquierda.

La comparación con `bdi` es relevante: **`bdi` aísla** el efecto de un fragmento respecto a su entorno; **`bdo` fuerza** su dirección. El PDF no incluye un ejemplo de marcado en esta página.

### 125. El elemento <br> representa un salto de línea

[Ver diapositiva 125](HTML5.pdf#page=125)

La diapositiva diferencia un salto efectivo de una oportunidad de salto:

| Elemento | Comportamiento y criterio de uso |
|---|---|
| `br` | Inserta una nueva línea; no crea otro párrafo. Debe usarse cuando el salto tenga significado, por ejemplo en direcciones o poemas |
| `wbr` | Marca una posible división de una palabra o cadena larga. Solo se aprovecha cuando es necesario y no produce por sí mismo un salto visible |

El PDF recuerda que es preferible utilizar elementos semánticos apropiados y que `br` **no sustituye la separación entre párrafos mediante `p`**. Se incluye `wbr` aunque no figure en el título, porque es parte de la misma página.

### 126. El elemento <span> representa un contenedor genérico

[Ver diapositiva 126](HTML5.pdf#page=126)

**`span` es un contenedor genérico en línea sin significado propio**. Agrupa fragmentos de texto y suele utilizarse con CSS o JavaScript.

El PDF vuelve a insistir en considerarlo un **último recurso**, equivalente en esa función genérica a `div` para contenido en bloque. Las comparaciones de las páginas 62 y 63 muestran que, cuando se necesita expresar importancia u otro significado concreto, debe considerarse el elemento específico adecuado.

### 127. Resumen <kbd> Entrada del usuario

[Ver diapositiva 127](HTML5.pdf#page=127)

La tabla de resumen reúne todos estos significados. El criterio común sigue siendo **semántica frente a presentación visual**:

| Elemento | Significado |
|---|---|
| `a` | Hiperenlace |
| `em` | Énfasis |
| `strong` | Importancia especial |
| `small` | Información secundaria |
| `s` | Contenido obsoleto |
| `cite` | Título de una obra |
| `q` | Cita breve en línea |
| `dfn` | Término definido |
| `abbr` | Abreviatura o acrónimo |
| `data` | Valor legible por máquinas |
| `time` | Fecha, hora o duración |
| `code` | Fragmento de código |
| `var` | Variable |
| `samp` | Salida de un programa |
| `kbd` | Entrada del usuario |
| `sub` y `sup` | Subíndice y superíndice |
| `b` | Atención visual |
| `i` | Voz o significado diferente |
| `u` | Anotación no textual |
| `mark` | Texto resaltado por relevancia contextual |
| `bdi` | Aislamiento bidireccional |
| `bdo` | Dirección forzada |
| `ruby` | Anotaciones de pronunciación |
| `rt` | Texto de anotación ruby |
| `rp` | Alternativa para ruby |
| `br` | Salto de línea |
| `wbr` | Oportunidad de salto de línea |
| `span` | Contenedor genérico en línea |

La tabla original no vuelve a enumerar `del` e `ins`; su explicación se conserva en el apartado de la diapositiva 103.

## Contenido incrustado

Las imágenes, el sonido y el vídeo requieren identificar recursos y, cuando corresponde, aportar alternativas, dimensiones o pistas asociadas. El bloque distingue las alternativas de `source`, los subtítulos de `track` y los recursos externos. Las descripciones de las figuras conservan sus tamaños, condiciones y relaciones sin dar por disponibles archivos que el PDF solo referencia.

### 129. El contenido incrustado tiene los siguientes elementos:

[Ver diapositiva 129](HTML5.pdf#page=129)

El PDF enumera como elementos de contenido incrustado **`img`**, **`picture`**, **`source`**, **`audio`**, **`video`**, **`track`**, **`iframe`**, **`embed`** y **`object`**. Permiten incorporar imágenes, sonido, vídeo, pistas asociadas y recursos externos.

La elección depende del recurso. `source` aparece como alternativa de imagen o de medio dentro de otros elementos; `track` añade información temporal al audio o vídeo. Las páginas siguientes concretan su sintaxis y sus consideraciones de accesibilidad.

### 130. El elemento <img> representa una imagen

[Ver diapositiva 130](HTML5.pdf#page=130)

**`img` representa una imagen**. La diapositiva destaca cuatro atributos:

| Atributo | Función que establece el PDF |
|---|---|
| `src` | Obligatorio; identifica la imagen que se quiere mostrar |
| `alt` | Obligatorio; proporciona el texto alternativo |
| `width` | Informa del ancho de la imagen |
| `height` | Informa del alto de la imagen |

`alt` se utiliza cuando la imagen no puede mostrarse y por tecnologías de apoyo, como lectores de pantalla. El documento pide que ancho y alto **informen al navegador del tamaño para mejorar la carga y la estabilidad**, en vez de utilizarlos para redimensionar arbitrariamente el recurso. La recomendación reaparece al final, al explicar la reserva de espacio antes de la descarga.

### 131. El elemento <img> representa una imagen

[Ver diapositiva 131](HTML5.pdf#page=131)

El ejemplo original declara una imagen de **800 × 534 píxeles**:

```html
<img
    src="BoraBora.jpg"
    alt="Vista aérea de la laguna de Bora Bora, en la Polinesia Francesa"
    width="800"
    height="534">
<!-- el archivo BoraBora.jpg tiene ancho 800 píxeles y alto 534 píxeles -->
```

La captura de propiedades del recurso confirma el tamaño **800 × 534**, y la fotografía muestra la laguna y la isla. El texto alternativo describe esa vista. **Diferencia del original:** las páginas 133 y 134 utilizan una altura de **533**, no 534; se conserva el dato de cada ejemplo y se advierte de la discrepancia, sin unificarlos silenciosamente.

### 132. El elemento <picture> permite proporcionar varias Ingeniería

[Ver diapositiva 132](HTML5.pdf#page=132)

**`picture` proporciona versiones alternativas de una imagen**. Contiene uno o varios **`source`** y un **`img`**. El navegador selecciona una alternativa según las características del dispositivo.

El PDF cita tres finalidades: adaptar la imagen al tamaño de pantalla, ofrecer formatos distintos como **AVIF, WebP o JPEG** y mostrar versiones diferentes según el dispositivo. Esta estructura favorece el **diseño adaptable**; el ejemplo siguiente concreta condiciones de anchura, no un procedimiento de generación automática de los archivos.

### 133. El elemento <picture> permite proporcionar varias versiones

[Ver diapositiva 133](HTML5.pdf#page=133)

El ejemplo original define alternativas para dos condiciones de pantalla:

```html
<picture>
    <!-- para pantallas pequeñas menores de 600px -->
    <source media="(max-width: 600px)" srcset="bora-mobile.jpg">
    <!-- para pantallas medianas menores de 1024px -->
    <source media="(max-width: 1024px)" srcset="bora-tablet.jpg">
    <!-- para el resto de dispositivos -->
    <img src="BoraBora.jpg"
         alt="Vista aérea de la laguna de Bora Bora Polinesia Francesa"
         width="800" height="533" />
</picture>
```

`media` expresa la condición y `srcset` identifica la alternativa. El PDF relaciona las pantallas pequeñas con `bora-mobile.jpg`, las medianas con `bora-tablet.jpg` y el resto con la imagen de `img`.

**Precisión interna:** los comentarios dicen «menores de», pero la página 134 expresa los límites como **≤ 600 px** y **≤ 1024 px**, coherentes con las condiciones de máximo. La altura 533 es la de este ejemplo, distinta de la de la página 131.

### 134. Versiones de la imagen del <picture>

[Ver diapositiva 134](HTML5.pdf#page=134)

Para evitar deformaciones, el PDF mantiene la **relación de aspecto** aplicando el mismo factor al ancho y al alto. Parte de una imagen de **800 × 533**:

```text
Relación de aspecto = 800 / 533 ≈ 1,501 ≈ 1,5:1
Ancho nuevo = ancho original × factor de escala
Alto nuevo = alto original × factor de escala
```

| Uso del ejemplo | Archivo | Factor de escala | Dimensiones indicadas |
|---|---|---|---|
| Imagen original | `BoraBora.jpg` | 1 | 800 × 533 px |
| Pantallas pequeñas, ≤ 600 px | `bora-mobile.jpg` | `400/800 = 0,50` | 400 × 267 px |
| Pantallas medianas, ≤ 1024 px | `bora-tablet.jpg` | `600/800 = 0,75` | 600 × 400 px |

Las alturas exactas de los productos son **266,5** y **399,75**, que el PDF presenta redondeadas como **267** y **400**. **Explicación didáctica:** el tamaño del archivo alternativo y el ancho de pantalla usado como condición son magnitudes distintas; que el límite sea 600 px no significa que la imagen móvil mida 600 px de ancho.

### 135. El elemento <audio> permite reproducir contenido Ingeniería

[Ver diapositiva 135](HTML5.pdf#page=135)

**`audio` reproduce contenido sonoro**. Su atributo **`src`** identifica el archivo y **`controls`** muestra los controles de reproducción. Si se ofrecen varias fuentes, se utilizan elementos **`source`** con su **`type` MIME**, para mejorar la compatibilidad.

| Formato enumerado | Tipo MIME |
|---|---|
| MP3 | `audio/mpeg` |
| OGG | `audio/ogg` |
| WAV | `audio/wav` |

Estos son los formatos de la diapositiva; el ejemplo siguiente proporciona MP3 y OGG para el mismo contenido.

### 136. El elemento <audio> permite reproducir contenido Ingeniería

[Ver diapositiva 136](HTML5.pdf#page=136)

El material presenta MP3 como formato ampliamente soportado y OGG como alternativa. El navegador intenta reproducir **la primera fuente compatible**. Los dos ejemplos originales son:

```html
<!-- una única fuente -->
<audio src="olas-borabora.mp3" controls></audio>
```

```html
<!-- Varias fuentes para un mismo contenido sonoro -->
<audio controls>
    <source src="olas-borabora.mp3" type="audio/mpeg" />
    <source src="olas-borabora.ogg" type="audio/ogg" />
    Su navegador no soporta el elemento audio
</audio>
```

En el primer caso el archivo se declara en `audio`; en el segundo se listan alternativas dentro. El texto interior informa de la falta de soporte del elemento. Las fuentes no son pistas que se deban reproducir a la vez, sino versiones alternativas del mismo contenido.

### 137. El elemento <video> permite reproducir contenido audiovisual Ingeniería

[Ver diapositiva 137](HTML5.pdf#page=137)

**`video` reproduce contenido audiovisual**. El PDF explica **`src`** para el archivo, **`controls`** para los controles y **`poster`** para la imagen que aparece antes de iniciar la reproducción.

Como en audio, varios **`source`** permiten ofrecer alternativas con el tipo MIME correspondiente:

| Formato enumerado | Tipo MIME |
|---|---|
| MP4 | `video/mp4` |
| WEBM | `video/webm` |
| OGG | `video/ogg` |

La imagen de `poster` no sustituye el vídeo: cumple la función previa a la reproducción descrita en la diapositiva.

### 138. El elemento <video> permite reproducir contenido Ingeniería

[Ver diapositiva 138](HTML5.pdf#page=138)

El PDF presenta MP4 como formato ampliamente soportado y WEBM como alternativo. Se intenta reproducir **la primera fuente compatible**. Los ejemplos son:

```html
<!-- una única fuente -->
<video src="borabora.mp4" controls></video>
```

```html
<!-- Varias fuentes para un mismo contenido audiovisual -->
<video controls poster="BoraBora.jpg">
    <source src="borabora.mp4" type="video/mp4" />
    <source src="borabora.webm" type="video/webm" />
    Su navegador no soporta el elemento video
</video>
```

La segunda versión añade una imagen previa y dos alternativas de formato. El texto interior es la alternativa textual mostrada por el ejemplo para navegadores sin soporte del elemento; el documento no proporciona aquí el archivo multimedia ni su implementación de reproducción.

### 139. Los elementos <track> permite asociar información Ingeniería

[Ver diapositiva 139](HTML5.pdf#page=139)

**`track` asocia información temporal a un `video` o `audio`**. El documento cita subtítulos, leyendas y descripciones, relacionados con la **accesibilidad**. Utiliza archivos **WebVTT, `.vtt`**, y debe estar dentro del elemento multimedia.

```html
<video controls>
    <source src="borabora.mp4" type="video/mp4" />
    <track src="borabora-es.vtt" kind="subtitles"
           srclang="es" label="Español" />
</video>
```

La pista del ejemplo corresponde a subtítulos (`kind="subtitles"`) en español (`srclang="es"`), identificados por la etiqueta «Español». `source` aporta el vídeo y `track` la información asociada: no son elementos con la misma función.

### 140. Los elementos <iframe>, <embed> y <object> permiten

[Ver diapositiva 140](HTML5.pdf#page=140)

La diapositiva compara tres formas de incorporar contenido externo:

| Elemento | Finalidad descrita |
|---|---|
| `iframe` | Incrusta otro documento HTML dentro de la página |
| `embed` | Incrusta recursos externos, como PDF, multimedia o complementos |
| `object` | Incorpora un recurso externo y permite contenido alternativo |

El PDF pide **precaución**, porque pueden producir dificultades de navegación, comprensión o interacción para algunos usuarios. Recomienda considerar **elementos HTML nativos** como `img`, `audio` o `video`. No incluye ejemplos de código de estos tres elementos en esta página; no se inventan restricciones ni atributos adicionales.

### 141. Elemento <img>

[Ver diapositiva 141](HTML5.pdf#page=141)

Aunque el título existente mencione `img`, esta diapositiva es el **resumen de todo el contenido incrustado**:

| Elemento | Función |
|---|---|
| `img` | Imagen |
| `picture` | Imágenes adaptativas |
| `audio` | Sonido |
| `video` | Contenido audiovisual |
| `track` | Subtítulos y accesibilidad |
| `iframe` | Documento incrustado |
| `embed` | Recurso externo incrustado |
| `object` | Objeto externo incrustado |

`source`, enumerado al principio del bloque, se ha explicado dentro de imágenes y medios aunque no aparezca en la tabla de resumen original. Se mantiene el título pedido y se completa su contenido real.

## Tablas y datos tabulares

Las tablas expresan **relaciones entre filas, columnas y encabezados**. El PDF rechaza utilizarlas para maquetar. Además de la sintaxis básica, explica asociaciones de accesibilidad con `scope`, `id` y `headers`, y la agrupación de filas mediante `thead`, `tbody` y `tfoot`.

### 143. Las tablas deben utilizarse para representar

[Ver diapositiva 143](HTML5.pdf#page=143)

Las **tablas representan datos tabulares y no deben utilizarse para maquetar páginas web**. Los elementos básicos que define el PDF son:

| Elemento | Función |
|---|---|
| `table` | Define la tabla |
| `tr` | Define una fila |
| `td` | Define una celda de datos |
| `th` | Define una celda de encabezado |
| `caption` | Título o descripción de la tabla |

La distinción entre dato y encabezado es parte de la semántica y sirve de base para las asociaciones de accesibilidad de las páginas siguientes.

### 144. Elemento <table>

[Ver diapositiva 144](HTML5.pdf#page=144)

El primer ejemplo compara destinos por duración, precio y popularidad:

```html
<table>
    <caption>Destinos del Pacífico</caption>
    <tr>
        <th></th>
        <th>Duración</th>
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

La primera fila proporciona los encabezados de columna y la primera celda de cada fila de destino utiliza `th`. La captura muestra el título y la matriz de datos, sin necesitar bordes decorativos para que la información sea una tabla. Los precios y duraciones son valores del ejemplo original, no información de viajes actualizada.

### 145. Para que una tabla sea accesible:

[Ver diapositiva 145](HTML5.pdf#page=145)

Para que una tabla sea accesible, el PDF recomienda **`th` para sus encabezados** y una asociación explícita con los datos:

- En tablas sencillas, **`scope`** distingue encabezados de **fila** y de **columna**.
- En tablas complejas con varios niveles, se identifica cada `th` mediante **`id`** y se relaciona cada `td` con los encabezados correspondientes mediante **`headers`**.

El objetivo es que la relación entre una cifra y su significado no dependa solo de su posición visual. La página siguiente muestra la sintaxis de ambas asociaciones.

### 146. Elemento <!– ejemplo table sencilla -->

[Ver diapositiva 146](HTML5.pdf#page=146)

Los fragmentos originales de tabla sencilla son:

```html
<!-- ejemplo table sencilla -->
<th scope="col">Duración</th>
<th scope="row">Bora Bora</th>
```

`col` identifica el encabezado de una columna y `row`, el de una fila. El ejemplo de asociación explícita es:

```html
<!-- ejemplo table compleja -->
<th id="duracion">Duración</th>
<td headers="duracion">7 días</td>
```

El valor de `headers` remite al `id` del encabezado. **Son fragmentos de celdas, no una tabla completa**. La diapositiva incluye además un [ejemplo de tabla accesible](https://crispelayo.github.io/SEW-HTML/tabla/tabla-accesible.html); se conserva el enlace citado, sin incorporar contenido externo a estos apuntes.

### 147. El elemento <thead> agrupa los encabezados de la Ingeniería

[Ver diapositiva 147](HTML5.pdf#page=147)

La tabla puede organizarse mediante tres agrupadores:

| Elemento | Parte de la tabla |
|---|---|
| `thead` | Encabezados |
| `tbody` | Datos principales |
| `tfoot` | Resumen o pie |

El PDF los relaciona con una mejor **organización, estructura semántica y accesibilidad**. No sustituyen a `tr`, `th` y `td`: agrupan las filas que contienen esas celdas.

### 148. Elemento <table>

[Ver diapositiva 148](HTML5.pdf#page=148)

El ejemplo completo organiza cabecera, cuerpo y resumen:

```html
<table>
    <caption>Viajes exóticos al Pacífico</caption>
    <thead>
        <tr>
            <th>Destino</th>
            <th>Duración</th>
            <th>Precio</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Bora Bora</th>
            <td>7 días</td>
            <td>2500 €</td>
        </tr>
        <tr>
            <th>Fiyi</th>
            <td>10 días</td>
            <td>2800 €</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th>Total destinos</th>
            <td colspan="2">2</td>
        </tr>
    </tfoot>
</table>
```

La captura presenta dos destinos y una última fila con el total. En esa fila, **`colspan="2"` reúne en una celda los dos espacios de columna restantes**. El agrupamiento estructural se ve en el código aunque no sea necesario dibujar un recuadro diferente alrededor de cada parte.

## Formularios

El formulario reúne controles, etiquetas y grupos para recopilar información. El material presenta tipos de entrada y restricciones de validación del lado cliente. El ejemplo ilustra el aspecto y las asociaciones de sus controles, pero no constituye una aplicación completa de envío y procesamiento; sus límites se explican sin inventar la parte que no está en el PDF.

### 150. Los formularios permiten recopilar información introducida por los

[Ver diapositiva 150](HTML5.pdf#page=150)

Los **formularios recopilan información del usuario y la envían para su procesamiento**. El PDF enumera estos componentes:

| Componente | Finalidad |
|---|---|
| `form` | Define el formulario |
| `input` | Control de entrada cuyo tipo se especifica mediante `type` |
| `label` | Asocia una descripción a un control |
| `textarea` | Entrada de texto de varias líneas |
| `fieldset` | Agrupa controles relacionados |
| `legend` | Título del grupo |
| `button` | Botón |

Entre los tipos de `input` se citan **`text`**, **`email`**, **`password`**, **`date`**, **`number`**, **`tel`**, **`url`**, **`checkbox`**, **`radio`**, **`range`** y **`submit`**. La asociación correcta entre `label` y el control mejora la **accesibilidad**, como se observa con `for` e `id` en los ejemplos.

### 151. HTML incorpora mecanismos básicos de validación en el Ingeniería

[Ver diapositiva 151](HTML5.pdf#page=151)

HTML ofrece **validación básica del lado cliente sin necesidad de JavaScript**. La diapositiva cita:

| Mecanismo | Restricción |
|---|---|
| `required` | Dato obligatorio |
| `maxlength` | Longitud máxima permitida |
| `min` / `max` | Límites de números o fechas |
| `pattern` | Expresión regular para validar el contenido |
| `type="email"` | Validación básica de una dirección de correo |

El ejemplo siguiente aplica obligatoriedad, tipo de correo y longitud máxima. El documento no desarrolla expresiones regulares concretas ni un procedimiento completo de procesamiento de los datos; no se añade esa teoría externa.

### 152. Elemento <form name="datos“ method="post" >

[Ver diapositiva 152](HTML5.pdf#page=152)

El formulario original reúne varios tipos de control:

```html
<form name="datos" method="post">
    <label for="nombre">Nombre:</label>
    <input id="nombre" type="text" placeholder="Escriba nombre" required />
    <label for="apellido">Apellido:</label>
    <input id="apellido" type="text" placeholder="Escriba su apellido" required />
    <label for="email">E-mail:</label>
    <input id="email" type="email" placeholder="Escriba su email" required />
    <label for="fecha">Fecha de nacimiento:</label>
    <input id="fecha" type="date" />
    <label for="rango">Grado de satisfacción</label>
    <input id="rango" type="range" />
    <fieldset>
        <legend>¿Estas interesado en tener más información?</legend>
        <input id="masinfo" type="radio" />
        <label for="masinfo">Si, quiero más información</label>
        <input id="nomasinfo" type="radio" />
        <label for="nomasinfo">De momento no quiero más información</label>
    </fieldset>
    <label for="texto">Comentarios (opcionales):</label>
    <textarea id="texto" name="comments" maxlength=1000></textarea>
    <input type="submit" value="Enviar">
</form>
```

La captura muestra cajas para nombre, apellido y correo, un control de fecha, un deslizador, un grupo visual con dos opciones, un área de comentarios y el botón de envío. `required` aparece en los tres primeros controles; `maxlength` limita los comentarios a **1000** caracteres; cada `label` remite al `id` de su control. `fieldset` y `legend` relacionan las opciones de solicitud de información.

**Transcripción y límites:** se normaliza la comilla curva en `name="datos"`. Se conserva `maxlength=1000` sin comillas, aunque la recomendación general del curso sea entrecomillar. El fragmento no especifica `action`, casi todos los controles carecen de `name` y los radios no comparten un `name` de grupo. Por tanto, el PDF **ilustra tipos de control y agrupación visual, pero no demuestra un envío completo ni una selección mutuamente excluyente entre los radios**. No se completa silenciosamente esa funcionalidad ni se inventa un servidor de destino.

## Elementos interactivos

El PDF distingue el **desplegable `details` con su `summary`** y el **diálogo `dialog`**. Se explica lo que muestran realmente los ejemplos: apertura y cierre del desplegable mediante su interacción nativa, y un diálogo mostrado con `open` cuyo botón no incorpora una acción de cierre en el fragmento aportado.

### 154. Los elementos interactivos permiten mostrar u ocultar Ingeniería

[Ver diapositiva 154](HTML5.pdf#page=154)

Los elementos interactivos incorporan componentes de interacción utilizando HTML. El PDF distingue:

| Elemento | Función |
|---|---|
| `details` | Un widget desplegable |
| `summary` | El encabezado visible del desplegable |
| `dialog` | Una ventana de diálogo o cuadro modal |

El desplegable permite mostrar u ocultar contenido sin escribir JavaScript. La afirmación general de la diapositiva debe leerse junto con los ejemplos concretos: el diálogo siguiente se muestra con `open`, pero su botón no incluye una acción de cierre.

### 155. Elemento <details>

[Ver diapositiva 155](HTML5.pdf#page=155)

El ejemplo original es:

```html
<details>
    <summary>Información sobre Bora Bora</summary>
    <p>Bora Bora es una isla de la Polinesia Francesa
    conocida por sus lagunas cristalinas y sus
    hoteles sobre el mar.</p>
</details>
```

Las dos capturas muestran los estados **cerrado** y **abierto**. En el cerrado solo se ve el encabezado de `summary` y el indicador del desplegable; al abrirlo aparece el párrafo. El ejemplo muestra una interacción proporcionada por la estructura HTML, sin un script adicional en el código.

### 156. Elemento <dialog open>

[Ver diapositiva 156](HTML5.pdf#page=156)

El fragmento del PDF presenta un diálogo inicialmente abierto:

```html
<dialog open>
    <p>Reserva realizada correctamente.</p>
    <button>Cerrar</button>
</dialog>
```

La captura muestra un recuadro con el mensaje y el botón. **`open` es lo que indica la apertura en este ejemplo.** El texto «Cerrar» del botón no implementa por sí mismo una acción: el fragmento no contiene código ni un mecanismo de envío que cierre el diálogo. Se conserva el original como ejemplo visual y se señala la limitación, sin presentarlo como un componente completo de apertura y cierre ni como demostración de comportamiento modal.

## Atributos globales

Los atributos globales permiten añadir información o comportamiento a elementos diferentes. `id` y `class` se comparan por identificación y clasificación; después se conserva toda la lista del PDF y se desarrollan los atributos a los que dedica diapositivas: atajos, edición, dirección, visibilidad, idioma, revisión del texto, estilo, navegación por teclado, información complementaria, traducción y datos personalizados.

### 158. Atributos que tienen todos los elementos HTML

[Ver diapositiva 158](HTML5.pdf#page=158)

Los **atributos globales** pueden aplicarse a los elementos HTML. La página introduce **`id`** y **`class`**, que permiten identificar un elemento y clasificar varios, respectivamente.

**Explicación didáctica:** que un atributo sea global no significa que deba escribirse en todos los elementos. La presentación destaca su disponibilidad y después explica su finalidad y sus recomendaciones de uso.

### 159. Permite asignar al elemento un identificador único

[Ver diapositiva 159](HTML5.pdf#page=159)

**`id` asigna un identificador que debe ser único dentro del documento**. Puede utilizarse para diversos propósitos; antes se ha mostrado su uso como destino de fragmentos y como identificación de cabeceras de tabla.

```html
<th id="mes">
    ……
</th>
```

La diapositiva describe sus valores como letras y números «sin ninguna restricción». Se conserva esa formulación como descripción del material, sin extrapolar una gramática completa de valores. La restricción inequívoca que debe retenerse es la **unicidad en el documento**. Además, el PDF advierte de que **usar `id` como selector CSS altera la cascada**.

### 160. Permite clasificar a los elementos de HTML

[Ver diapositiva 160](HTML5.pdf#page=160)

**`class` clasifica elementos**. Varios elementos pueden pertenecer a la misma clase y un valor puede incluir **tokens separados por espacios**, por lo que no funciona como un identificador único.

El PDF indica que puede tener distintos propósitos, entre ellos servir a selectores CSS, y advierte de su influencia sobre la cascada. Recomienda elegir nombres que describan **el tipo de contenido**, en lugar de la **presentación deseada**. La clasificación sigue siendo comprensible aunque después cambie el aspecto visual.

### 161. Existen una serie de atributos que son globales a los elemento en HTML

[Ver diapositiva 161](HTML5.pdf#page=161)

La lista completa de esta diapositiva es:

```text
accesskey, autocapitalize, autocorrect, autofocus,
contenteditable, dir, draggable, enterkeyhint, hidden,
inert, inputmode, is, itemid, itemprop, itemref,
itemscope, itemtype, lang, nonce, popover,
spellcheck, style, tabindex, title, translate,
writingsuggestions
```

Se conserva **cada atributo enumerado**, aunque la presentación solo desarrolla algunos en las páginas siguientes. `id` y `class` se han explicado antes; la familia `data-*` aparece después. No se inventan definiciones para los atributos que aquí solo se nombran.

### 162. Permite a los agentes de usuario crear atajos de Ingeniería

[Ver diapositiva 162](HTML5.pdf#page=162)

**`accesskey` permite al agente de usuario crear un atajo de teclado para activar o enfocar un elemento**. La diapositiva distingue mayúsculas y minúsculas y describe un valor de **un carácter**. El ejemplo usa `A`:

```html
<nav>
    <a title="Actividades" accesskey="A" href="actividades.html">
        Actividades
    </a>
</nav>
```

El atributo no define por sí solo la combinación completa de teclas: esta depende del agente de usuario. La lista de la página siguiente forma parte de la explicación del material y no se sustituye por una tabla externa actualizada.

### 163. Activar los atajos del teclado depende del agente de Ingeniería

[Ver diapositiva 163](HTML5.pdf#page=163)

El PDF compara las combinaciones para activar el atajo:

| Agente citado | Combinación indicada |
|---|---|
| Safari | `ALT + atajo` |
| Microsoft Edge | `ALT + atajo + ENTER` |
| Firefox | `MAY + ALT + atajo` |
| Opera | `MAY + ESC + atajo` |
| Chrome | `ALT + atajo` |

**MAY** identifica la tecla de mayúsculas. La conclusión de estudio es la **dependencia del navegador**. Las combinaciones se transcriben como información de la presentación; esta no concreta versiones o sistemas operativos, por lo que no se prometen como universales en cualquier entorno.

### 164. Permite indicar si el contenido del elemento es o no Ingeniería

[Ver diapositiva 164](HTML5.pdf#page=164)

**`contenteditable` indica si el contenido puede editarse**. El PDF lo presenta como atributo enumerado que admite cadena vacía, `true` o `false`, y menciona la herencia del comportamiento del contenedor mediante la palabra `inherit`.

```html
<p contenteditable="true">Texto editable</p>
<p contenteditable>Texto editable</p>
<p>no editable</p>
<p contenteditable="false">no editable</p>
```

Los dos primeros ejemplos ilustran contenido editable; el último, la desactivación expresa. El párrafo sin atributo se muestra como no editable en el contexto simple de la diapositiva.

**Límite de la fuente:** la mención a `inherit` no va acompañada de código y el documento no explica con precisión la diferencia entre un estado heredado y un valor literal. No se inventa un ejemplo `contenteditable="inherit"` ni se generaliza que un párrafo sin atributo sea siempre no editable, con independencia de su contenedor. Se normalizan las comillas curvas del ejemplo final.

### 165. Es un atributo que indica la direccionalidad del texto.

[Ver diapositiva 165](HTML5.pdf#page=165)

**`dir` indica la direccionalidad del texto**. La diapositiva enumera:

| Valor | Dirección |
|---|---|
| `ltr` | Izquierda a derecha, left-to-right |
| `rtl` | Derecha a izquierda, right-to-left |
| `auto` | Determinada en función del contenido |

Los ejemplos contrastan un texto en escritura árabe con «hola»:

```html
<p dir="rtl">حولا</p>
<p dir="ltr">hola</p>
```

**Nota de transcripción:** se conservan los caracteres que se distinguen en la figura, sin atribuirles una traducción; su propósito es mostrar la dirección. La comparación se relaciona con `bdi` y `bdo`, aunque aquí se está explicando un atributo global, no un elemento nuevo.

### 166. Es un atributo que oculta elemento y evita que se Ingeniería

[Ver diapositiva 166](HTML5.pdf#page=166)

**`hidden` oculta un elemento e impide que se represente visualmente** en el ejemplo. El PDF lo describe como booleano y explica que el contenido no se muestra directamente, aunque puede utilizarse en otras partes del documento.

```html
<p hidden>Este párrafo no se muestra</p>
```

El párrafo sigue escrito en el documento; lo que indica el ejemplo es que no se presenta directamente. La diapositiva no desarrolla otros estados o variantes del atributo, por lo que estos apuntes se limitan a la forma mostrada.

### 167. Permite definir el idioma del elemento

[Ver diapositiva 167](HTML5.pdf#page=167)

**`lang` define el idioma de un elemento**. Además de la declaración general en `html`, el PDF muestra idiomas distintos en dos párrafos:

```html
<p lang="en">This is a paragraph</p>
<p lang="es">Esto es un párrafo</p>
```

El primero se identifica como inglés y el segundo como español. La diapositiva cita [Tags for identifying Languages](http://www.ietf.org/rfc/bcp/bcp47.txt), [ISO 639](https://www.iso.org/iso-639-language-codes.html) y una [lista de códigos](http://www.loc.gov/standards/iso639-2/php/code_list.php). Se recogen como recursos del PDF, sin ampliar aquí sus reglas.

### 168. Especifica si se debe comprobar la gramática y la Ingeniería

[Ver diapositiva 168](HTML5.pdf#page=168)

**`spellcheck` indica la comprobación de gramática y ortografía del elemento**. El agente de usuario puede ofrecerla bajo demanda. El ejemplo del PDF incluye una palabra escrita de forma incorrecta:

```html
<p spellcheck>Este párrafe se debe comprobar</p>
```

**«párrafe» pertenece al ejemplo original** y se mantiene para mostrar el contenido que podría comprobarse. La diapositiva denomina booleano al atributo y lo escribe sin valor; estos apuntes conservan esa formulación como propia del PDF, sin convertirla en una explicación completa de su sintaxis o de los valores aceptados. Tampoco se garantiza que todo navegador muestre automáticamente una corrección en ese párrafo.

### 169. Permite especificar un estilo para el elemento en Ingeniería

[Ver diapositiva 169](HTML5.pdf#page=169)

El atributo **`style` contiene CSS aplicado a un elemento**. El ejemplo cambia el color de dos fragmentos:

```html
<p>Mi chaqueta es
<span style="color: green">verde</span> y mis ojos
son <span style="color:blue">azules</span>.</p>
```

El primer `span` recibe verde y el segundo azul. La diapositiva añade un rótulo **«Prohibido»**, coherente con la advertencia anterior sobre mezclar presentación y contenido. Se conserva como indicación docente: el ejemplo enseña qué hace el atributo, no constituye una recomendación de usar estilos en línea para el sitio.

### 170. Permite controlar el orden de navegación mediante teclado

[Ver diapositiva 170](HTML5.pdf#page=170)

**`tabindex` permite controlar el orden de navegación mediante teclado** y debe emplearse **con prudencia**. El ejemplo original asigna dos posiciones:

```html
<nav>
    <a title="Actividades" tabindex="1" href="actividades.html">
        Actividades
    </a>
    <a title="Enlaces" tabindex="2" href=" enlaces.html">
        Enlaces
    </a>
</nav>
```

El primer enlace tiene el valor 1 y el segundo 2. **Detalle conservado:** el original contiene un espacio inicial en `href=" enlaces.html"`; si el recurso pretendido es `enlaces.html`, debe revisarse ese valor. El PDF no desarrolla aquí otros valores de `tabindex` ni todas sus interacciones con el orden natural, por lo que no se amplía esa teoría.

### 171. El elemento title proporciona información

[Ver diapositiva 171](HTML5.pdf#page=171)

En esta diapositiva se explica el **atributo global `title`**, no el elemento `title` de `head`, aunque el texto del título existente diga «elemento». Aporta información complementaria asociada a un elemento; el agente puede presentarla como **tooltip**.

```html
<nav>
    <a title="Enlace a Actividades" href="actividades.html">
        Actividades
    </a>
</nav>
```

El PDF advierte de que muchos agentes no exponen esta información de forma accesible. Por ello **no debe ser el único mecanismo para comunicar información importante**. La frase de la diapositiva sobre cuándo se muestra el tooltip está incompleta («cuando el foco»); no se deduce de ella un comportamiento universal para todos los dispositivos.

### 172. Es un atributo enumerado que permite indicar si el Ingeniería

[Ver diapositiva 172](HTML5.pdf#page=172)

**`translate` es un atributo enumerado que indica si el contenido debe traducirse cuando se internacionaliza el documento**. El ejemplo utiliza `no`:

```html
<p translate="no">Esto no será traducido</p>
```

La finalidad es marcar el tratamiento lingüístico del contenido. El PDF no presenta una traducción automática ni desarrolla otros valores, de modo que el ejemplo se estudia como una indicación semántica y no como un traductor implementado.

### 173. Permite almacenar información personalizada Ingeniería

[Ver diapositiva 173](HTML5.pdf#page=173)

Los atributos de la familia **`data-*` almacenan información personalizada asociada a un elemento**. El ejemplo del PDF es:

```html
<p data-destino="bora-bora">……</p>
```

`data-destino` es el nombre elegido y `bora-bora` su valor. Los puntos representan contenido omitido. No se añade un script que lea o modifique ese dato, porque esta diapositiva solo explica cómo asociarlo al elemento.

## Referencias

Se recogen las referencias de la presentación y los recursos citados en los apartados correspondientes. El propósito es conservar la procedencia y permitir la consulta del original, **sin sustituir la teoría de clase por una ampliación externa**.

### 175. Lenguajes de marcas en el W3C

[Ver diapositiva 175](HTML5.pdf#page=175)

Las referencias originales son:

- [Lenguajes de marcas en el W3C](http://www.w3.org/standards/techs/html).
- [WHATWG](http://www.whatwg.org/).
- [Especificación HTML](https://html.spec.whatwg.org/multipage/).
- [Validador de lenguaje de marcas](http://validator.w3.org/).
- [Validador de HTML5](https://validator.w3.org/nu).

Se mantienen los destinos que cita el PDF. Los apuntes se han desarrollado a partir del documento aportado, **sin utilizar esas páginas para añadir teoría externa**.

### 176. Diapositiva 176

[Ver diapositiva 176](HTML5.pdf#page=176)

Esta página es la **portadilla «Errores comunes»**. Introduce las cuatro advertencias finales: elegir etiquetas por diseño en lugar de contenido, cerrar mal los elementos, no reservar correctamente las dimensiones de los recursos y no validar.

No contiene un ejemplo técnico adicional. Se conserva el título «Diapositiva 176» del Markdown y se explicita la función real de la página, en lugar de dejar un apartado vacío.

## Errores frecuentes

Las últimas páginas reúnen advertencias transversales: **no elegir etiquetas por diseño**, **evitar cierres solapados**, **declarar dimensiones de los recursos para reservar espacio** y **validar**. Se distingue el ejemplo intencionadamente incorrecto de los fragmentos que contienen una errata tipográfica o son simplemente parciales.

### 177. Utilizar los elementos HTML pensando en diseño, no Ingeniería

[Ver diapositiva 177](HTML5.pdf#page=177)

El error principal es **elegir elementos por su diseño y no por contenido y estructura**. El ejemplo original utiliza `strong` para poner en negrita los rótulos de una lista de datos personales:

```html
<ul>
    <li><strong>Nombre:</strong> Cris</li>
    <li><strong>Apellido:</strong> Pelayo</li>
</ul>
```

Las capturas comparan los datos con y sin las etiquetas en negrita; el código está rotulado **«Error»**. Lo que se critica es atribuir importancia mediante `strong` para obtener un efecto visual, sin justificar esa importancia por el significado de «Nombre» y «Apellido».

**Detalle recuperado de la imagen:** el apellido es **«Pelayo»**; la extracción textual lo había convertido en «Pelayro». El PDF enlaza la [definición de strong](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-strong-element). No proporciona una solución de marcado alternativa completa en esta diapositiva.

### 178. No cerrar los elementos de forma adecuada para Ingeniería

[Ver diapositiva 178](HTML5.pdf#page=178)

El cierre incorrecto y el solapamiento afectan a la **construcción del DOM**. Los navegadores intentan corregir el marcado, pero esa reparación no garantiza que el árbol sea el que pretendía el autor.

El ejemplo intencionadamente incorrecto de la página 8 muestra el problema al cerrar un párrafo antes del `em` que contiene. La advertencia se conecta con las consecuencias allí citadas en CSS, JavaScript y accesibilidad: **la apariencia aparentemente aceptable no sustituye la corrección estructural**.

### 179. Utilizar atributos

[Ver diapositiva 179](HTML5.pdf#page=179)

El documento pide utilizar **`width` para la dimensión horizontal** y **`height` para la vertical** con el fin de que el navegador conozca **el espacio que debe reservar** para el recurso multimedia.

Destaca las imágenes de carga diferida: conviene expresar una **relación de aspecto preferida mediante ancho y alto**, incluso si CSS establece las dimensiones, para evitar movimientos del diseño después de cargar la imagen. Se relaciona con el ejemplo de la página 131 y con el cálculo proporcional de la 134.

**Aclaración del título original:** la página aparece entre errores comunes, pero su redacción «Utilizar atributos» es una **recomendación positiva**, no una prohibición de `width` y `height`. Lo que debe evitarse es perder esa información de tamaño y la reserva de espacio, no declarar los atributos que el propio PDF recomienda.

### 180. No validar el documento

[Ver diapositiva 180](HTML5.pdf#page=180)

La última diapositiva destaca **«No validar el documento»** como error. Se relaciona con los validadores que el propio PDF acaba de citar: el [validador de marcado](http://validator.w3.org/) y el [validador HTML5](https://validator.w3.org/nu).

**Explicación didáctica:** al revisar un documento deben atenderse los mensajes sobre cierres, anidamientos, estructura o atributos, junto con los avisos concretos que se han explicado en la unidad. La diapositiva no contiene una captura de resultados ni un procedimiento de validación adicional; se desarrolla su recomendación sin inventar un informe del validador.

## Comparaciones y criterios de elección

Estas comparaciones reúnen distinciones desarrolladas en el PDF:

| Elementos o conceptos | Criterio de elección | Fuente |
|---|---|---|
| `head` / `body` | Metadatos frente a contenido del documento | [Página 14](HTML5.pdf#page=14) |
| `head` / `header` | Metadatos frente a introducción de página o sección | [Página 28](HTML5.pdf#page=28), [página 50](HTML5.pdf#page=50) |
| `article` / `section` | Unidad autónoma reutilizable frente a agrupación temática | [Página 40](HTML5.pdf#page=40) |
| `aside` / barra lateral | Información complementaria frente a una posición visual | [Página 47](HTML5.pdf#page=47) |
| `main` / bloques comunes | Información específica frente a navegación y otros componentes repetidos | [Página 57](HTML5.pdf#page=57) |
| `div` / elemento semántico | Agrupación genérica frente a función específica | [Página 61](HTML5.pdf#page=61) |
| `span` / `strong` | Delimitar texto frente a atribuir importancia | [Página 63](HTML5.pdf#page=63) |
| `p` / `pre` | Párrafo corriente frente a conservación del espaciado | [Página 68](HTML5.pdf#page=68) |
| `blockquote` / `q` | Cita extensa en bloque frente a cita breve en línea | [Página 70](HTML5.pdf#page=70), [página 105](HTML5.pdf#page=105) |
| `ul` / `ol` / `dl` | Orden irrelevante, orden significativo o asociación término-descripción | [Página 74](HTML5.pdf#page=74) |
| `nav` / `menu` | Navegación frente a comandos u opciones | [Página 84](HTML5.pdf#page=84) |
| `em` / `i` | Énfasis frente a voz o significado diferente | [Página 99](HTML5.pdf#page=99), [página 120](HTML5.pdf#page=120) |
| `strong` / `b` / `mark` | Importancia, atención visual o relevancia contextual | [Página 100](HTML5.pdf#page=100), [página 118](HTML5.pdf#page=118), [página 119](HTML5.pdf#page=119) |
| `s` / `del` / `ins` | Obsolescencia, eliminación o inserción | [Página 102](HTML5.pdf#page=102), [página 103](HTML5.pdf#page=103) |
| `code` / `var` / `samp` / `kbd` | Código, variable, salida del sistema o entrada del usuario | [Páginas 113-116](HTML5.pdf#page=113) |
| `bdi` / `bdo` | Aislar una dirección frente a forzarla | [Página 123](HTML5.pdf#page=123), [página 124](HTML5.pdf#page=124) |
| `br` / `wbr` | Salto efectivo frente a oportunidad de salto | [Página 125](HTML5.pdf#page=125) |
| `source` / `track` | Fuente alternativa del medio frente a pista temporal asociada | [Página 138](HTML5.pdf#page=138), [página 139](HTML5.pdf#page=139) |
| `id` / `class` | Identificación única frente a clasificación compartida | [Página 159](HTML5.pdf#page=159), [página 160](HTML5.pdf#page=160) |
| Elemento `title` / atributo `title` | Nombre del documento frente a información complementaria de un elemento | [Página 29](HTML5.pdf#page=29), [página 171](HTML5.pdf#page=171) |

## Ejemplo de documento HTML básico

**Origen:** ejemplo original recuperado de la captura de la diapositiva 16. Se vuelve a reunir aquí, bajo el apartado que ya existía, como plantilla de repaso.

```html title="basico.html" origen="original, diapositiva 16"
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

La lectura sigue la contención: la declaración de tipo precede a `html`; dentro de la raíz se separan los metadatos de `head` y el contenido de `body`. `lang` identifica el idioma, `charset` la codificación, `title` el nombre que identifica el documento y `h1` el encabezado visible.

::: practica Identificar estructura y contenido
**Origen: ejercicio didáctico.** Localiza el modo estándar, el idioma, la codificación, el título de pestaña, el encabezado visible y los comentarios del ejemplo.

**Resolución:** corresponden a `<!DOCTYPE html>`, `lang="es"`, `meta charset="UTF-8"`, `title`, `h1` y los dos fragmentos delimitados por `<!--` y `-->`. El texto del título del documento y el del encabezado no coinciden porque cumplen funciones diferentes.
:::

[Ver diapositiva 16](HTML5.pdf#page=16).

## Preguntas de repaso

Las preguntas y ejercicios siguientes son **elaboración didáctica**. Todas sus respuestas se obtienen de los conceptos y ejemplos del PDF.

::: pregunta ¿Qué relación hay entre el archivo HTML y el DOM?
El archivo contiene el marcado. El navegador lo analiza sintácticamente y construye el DOM, una representación en memoria mediante nodos. Los cierres incorrectos pueden hacer que el árbol construido difiera del que se pretendía escribir.
:::

::: pregunta ¿Hay que escribir una etiqueta de cierre img?
No existe `</img>` en el ejemplo del PDF. El documento propone escribir los elementos simples con barra final y cerrar los elementos que sí tienen etiqueta final por coherencia de estilo; no debe confundirse esa convención con añadir una etiqueta inexistente.
:::

::: pregunta ¿Para qué sirven doctype, lang, charset y title?
La declaración de tipo activa el modo estándar; `lang` identifica el idioma; `charset`, la codificación; y el elemento `title`, el nombre del documento en contextos como la pestaña y el historial.
:::

::: pregunta ¿Por qué aparecen nodos de texto que solo contienen espacios?
El analizador puede representar espacios y retornos del código mediante nodos `#text`. El árbol de las páginas 21 y 22 muestra que no todos los nodos de texto son palabras visibles de un párrafo.
:::

::: pregunta ¿Cuándo se elige article y cuándo section?
`article` corresponde a una unidad autónoma reutilizable fuera del contexto original. `section` agrupa contenido temáticamente relacionado. El artículo de Bora Bora puede trasladarse de la sección de islas a una página de ofertas conservando su sentido.
:::

::: pregunta ¿Aside significa que el contenido tiene que estar en un lateral?
No. Define información complementaria, no una posición visual. Puede estar dentro de un artículo o sección o integrado en el flujo general.
:::

::: pregunta ¿Qué diferencia hay entre body, main, header y head?
`body` contiene el contenido del documento. `main` identifica la información principal específica, excluyendo los bloques comunes que enumera el PDF. `header` introduce una página o una sección. `head` contiene metadatos.
:::

::: pregunta ¿Por qué div y span se consideran último recurso?
Agrupan sin expresar un significado específico. Cuando existe un elemento adecuado, como `section` o `strong`, este comunica mejor la función del contenido y facilita accesibilidad y mantenimiento.
:::

::: pregunta ¿Cómo se elige entre p, pre y br?
`p` organiza párrafos; `pre` conserva el espaciado cuando forma parte de la información; `br` introduce un salto con significado dentro del contenido y no sustituye la separación de párrafos.
:::

::: pregunta ¿Dónde se coloca una lista anidada?
Dentro de un `li` de la lista exterior. El ejemplo de Fiyi mantiene su lista de actividades antes de cerrar el elemento que contiene el nombre del destino.
:::

::: pregunta ¿Puede figure contener algo distinto de una imagen?
Sí. El PDF muestra una cita con `blockquote` y `figcaption`. La leyenda puede ir al principio o al final y hay como máximo una por figura.
:::

::: pregunta ¿Qué diferencia hay entre href, target, rel y download?
`href` establece el destino; `target`, el contexto de apertura; `rel`, la relación con el recurso; y `download` indica que se intente descargarlo. El PDF recomienda advertir visiblemente de las aperturas de contexto nuevo.
:::

::: pregunta ¿Por qué em, i, strong y b no son intercambiables por su apariencia?
`em` indica énfasis; `i`, una voz o significado diferente; `strong`, importancia especial; y `b`, atención visual sin esa importancia. La cursiva o la negrita habitual no sustituyen esos significados.
:::

::: pregunta ¿Qué información aportan alt, width y height?
`alt` describe la imagen para los casos que expone el PDF, incluidas tecnologías de apoyo. Ancho y alto informan de dimensiones y permiten reservar espacio, reduciendo movimientos del diseño al cargar recursos.
:::

::: pregunta ¿Cómo se asocian datos y encabezados de tabla?
Se utilizan `th` y, en tablas sencillas, `scope` con fila o columna. En tablas complejas se identifican encabezados con `id` y se relacionan datos mediante `headers`.
:::

::: pregunta ¿Qué mecanismos de validación de formularios presenta el PDF?
`required`, `maxlength`, `min`, `max`, `pattern` y la comprobación básica de correo de `type="email"`. Se presentan como mecanismos del lado cliente sin necesidad de JavaScript.
:::

::: pregunta ¿El botón Cerrar del ejemplo dialog ya implementa el cierre?
No. El código del PDF muestra `dialog open`, un párrafo y un botón sin una acción asociada. El texto del botón no basta para demostrar la funcionalidad de cierre.
:::

::: pregunta ¿Qué diferencias hay entre id y class y qué recomienda el PDF?
`id` debe ser único en el documento. `class` puede compartirse entre elementos y contener varios tokens. El PDF advierte de su uso como selectores en la cascada y recomienda nombres de clase que describan contenido, no apariencia.
:::

::: pregunta ¿Por qué title no debe contener la única información importante?
Su exposición como texto emergente no está garantizada de forma accesible en todos los agentes y resulta difícil de consultar para muchos usuarios táctiles. La advertencia se repite para enlaces y para el atributo global.
:::

::: practica Revisar un solapamiento
**Origen: ejercicio didáctico.** Explica el problema del fragmento incorrecto de la página 8 y cómo sería el orden de cierre correcto.

**Resolución:** `em` se abre dentro de `p`, pero se intenta cerrar primero `p`. Hay que cerrar el contenido interior antes que el contenedor: `</em>` antes de `</p>`. El ejemplo correcto de esa misma diapositiva muestra ese orden.
:::

::: practica Interpretar el tamaño de las imágenes alternativas
**Origen: ejercicio didáctico.** Partiendo de 800 × 533 px, calcula los factores para anchos de 400 y 600 px y relaciona el resultado con las condiciones de `picture`.

**Resolución:** los factores son 0,50 y 0,75. Las alturas calculadas son 266,5 y 399,75 px, presentadas por el PDF como 267 y 400. Esos tamaños de archivo no son los límites de pantalla: las condiciones del ejemplo son máximos de 600 y 1024 px.
:::

::: practica Revisar el alcance de un ejemplo de formulario
**Origen: ejercicio didáctico.** Identifica qué puede estudiarse con el formulario de la página 152 y qué parte no está completada en ese fragmento.

**Resolución:** muestra tipos de entrada, relación `label`/`id`, obligatoriedad, correo, longitud máxima y agrupación mediante `fieldset`/`legend`. No proporciona un destino `action`, nombres para casi todos los controles ni un nombre compartido por los radios, por lo que no debe tomarse como una aplicación completa de envío ni de selección exclusiva.
:::

## Errores frecuentes y advertencias

Las recomendaciones del PDF se reúnen aquí para revisar un documento:

::: aviso Comprobaciones de escritura y semántica
Escribir etiquetas en minúsculas y atributos con comillas dobles según las convenciones del curso; cerrar sin solapamientos; separar metadatos y cuerpo; usar encabezados coherentes; escoger elementos por su significado; reservar los contenedores genéricos para cuando no haya otro elemento adecuado; y validar el documento.
:::

| Aspecto | Advertencia y referencia |
|---|---|
| Encabezados de artículos y secciones | Se recomiendan `h1` a `h6`; el PDF indica warning si faltan. [Páginas 38-39](HTML5.pdf#page=38) |
| Contenido principal | Como máximo un `main` visible. [Página 57](HTML5.pdf#page=57) |
| Listas anidadas | Deben situarse dentro del `li` al que pertenecen. [Página 78](HTML5.pdf#page=78) |
| Figuras | Como máximo un `figcaption`. [Página 81](HTML5.pdf#page=81) |
| Apertura de enlaces | Advertir de nuevas pestañas o ventanas. [Página 93](HTML5.pdf#page=93) |
| Información complementaria | No depender únicamente de `title`. [Página 98](HTML5.pdf#page=98), [página 171](HTML5.pdf#page=171) |
| Multimedia | Texto alternativo, dimensiones y pistas asociadas según corresponda. [Páginas 130-139](HTML5.pdf#page=130) |
| Tablas | Datos tabulares, no maquetación; asociar encabezados. [Páginas 143-146](HTML5.pdf#page=143) |
| Presentación y contenido | Los ejemplos de `style` llevan el rótulo docente «Prohibido». [Página 31](HTML5.pdf#page=31), [página 169](HTML5.pdf#page=169) |

Se han identificado también **limitaciones y discrepancias del original**, que no deben confundirse con contenido pendiente de los apuntes:

- El dibujo de la página 11 escribe `<! Doctype html>`; el código de la 12 proporciona la declaración sin ese espacio.
- El árbol xml2svg de la 24 muestra «HTML básico» en `title`, frente a «Ejemplo» en el archivo de la 20.
- Las capturas de navegación de las páginas 43 y 44 muestran textos distintos de los de su código.
- Las páginas 121 y 122 repiten la explicación de `u`.
- El enlace de la página 92 contiene la extensión `htlm`; algunos atributos de las páginas 30 y 170 contienen espacios iniciales.
- La imagen se declara con 534 px de alto en la 131 y con 533 en las páginas 133 y 134.
- El formulario de la 152 y el diálogo de la 156 son parciales en su funcionalidad; sus límites se explican expresamente.
- La mención de `inherit` para `contenteditable`, la caracterización de `spellcheck` y la frase truncada del tooltip de la 171 se conservan como formulaciones limitadas del PDF, sin ampliarlas a reglas generales no desarrolladas.
- La lista de atajos no especifica versiones o sistemas; las observaciones sobre reconocimiento de `search` por validadores se presentan con el alcance del material de clase.

## Resumen final

HTML describe **estructura y significado** mediante elementos, texto y atributos. El navegador lo analiza y construye el **DOM**, cuyos nodos incluyen elementos, texto, comentarios y tipo de documento. La estructura básica separa `head`, con metadatos, de `body`, con el contenido presentado al usuario.

Los elementos semánticos permiten diferenciar artículos autónomos, secciones temáticas, navegación, información complementaria y contenido principal. Los agrupadores organizan párrafos, citas, listas y figuras; los elementos de texto distinguen funciones que no deben reducirse a su aspecto. Las imágenes y los medios requieren recursos y alternativas, las tablas relaciones entre datos y encabezados y los formularios controles correctamente etiquetados.

Los atributos globales aportan identificación, clasificación e información de interacción, idioma o comportamiento. La unidad insiste en **elegir por semántica, mantener un anidamiento correcto, cuidar las asociaciones de accesibilidad, separar contenido y presentación y validar**. Los ejemplos parciales siguen siendo útiles para estudiar una función concreta, siempre que no se les atribuya código que el original no contiene.

## Referencia al documento original

- **Fuente:** *Lenguajes de Marcado - HTML*, material de la Universidad de Oviedo. La portada identifica a la Dra. B. Cristina Pelayo García-Bustelo; el texto interno del PDF también incluye a Oscar Sanjuán Martínez.
- **Archivo original de la carpeta:** [HTML5.pdf](HTML5.pdf), **180 páginas**.
- **Trazabilidad:** cada uno de los **165 apartados numerados** incluye su enlace al PDF. Se han conservado **los 189 títulos previos**, sin añadir, quitar, reordenar o renombrar encabezados.
- **Recuperación visual:** se han transcrito los documentos básicos de las páginas 16 y 20, explicado los árboles de las páginas 21 a 24 y descrito las capturas de resultados junto a sus códigos.

| Páginas revisadas | Contenido cubierto |
|---|---|
| 1-3 | Portada e índices iniciales |
| 4-16 | Sintaxis, atributos, comentarios, anidamiento y documento básico |
| 17-26 | Transición, DOM, tipos de nodos, documentos, árboles y manipulación |
| 27-31 | Transición y metadatos |
| 32-35 | Transiciones y clasificación de los elementos |
| 36-63 | Estructura, artículos, secciones, navegación, complementos, encabezados y genéricos |
| 64-88 | Transición y agrupación: párrafos, preformateado, citas, listas, figuras, menú y búsqueda |
| 89-127 | Transición, enlaces y semántica de texto, incluida la página repetida de u |
| 128-141 | Transición y contenido incrustado, formatos, imágenes, medios y alternativas |
| 142-148 | Transición, tablas, accesibilidad y agrupación de filas |
| 149-152 | Transición, formularios, controles, validación y ejemplo |
| 153-156 | Transición e interacción con details, summary y dialog |
| 157-173 | Transición, id, class, lista de atributos globales y ejemplos |
| 174-175 | Transición y referencias |
| 176-180 | Portadilla de errores y cuatro advertencias finales |

**Comprobación final de cobertura:** 180 de 180 páginas analizadas, incluidas las de transición; todos los apartados numerados desarrollados; ejemplos originales significativos y resultados incorporados; cuatro actividades didácticas con resolución; tablas comparativas y erratas identificadas. La única limitación visual de transcripción relevante es que en el poema preformateado no se distingue con seguridad la composición exacta de tabuladores y espacios; se explica y se conserva su disposición visible. Las funcionalidades no implementadas y las formulaciones imprecisas del PDF se señalan, en lugar de rellenarlas con teoría externa.
