---
asignatura: Software y Estándares para la Web
titulo: CSS
resumen: Hojas de estilo en cascada.
fuente: 2 CSS.pdf
---

# CSS

## Contenido

1. [Introducción y objetivos](#introduccion-y-objetivos)
2. [Aplicación de estilos](#aplicacion-de-estilos)
3. [Anatomía de las reglas CSS](#anatomia-de-las-reglas-css)
4. [Selectores y árbol DOM](#selectores-y-arbol-dom)
5. [Selectores básicos y de atributo](#selectores-basicos-y-de-atributo)
6. [Combinadores](#combinadores)
7. [Pseudoclases y combinación de selectores](#pseudoclases-y-combinacion-de-selectores)
8. [Modelo de procesamiento](#modelo-de-procesamiento)
9. [Cascada y resolución de valores](#cascada-y-resolucion-de-valores)
10. [Origen, importancia, especificidad y orden](#origen-importancia-especificidad-y-orden)
11. [Valores iniciales y herencia](#valores-iniciales-y-herencia)
12. [Modelo de caja](#modelo-de-caja)
13. [Unidades, funciones y variables](#unidades-funciones-y-variables)
14. [Módulos CSS](#modulos-css)
15. [Buenas prácticas de implementación](#buenas-practicas-de-implementacion)
16. [Advertencias y límites del material](#advertencias-y-limites-del-material)
17. [Preguntas y ejercicios de repaso](#preguntas-y-ejercicios-de-repaso)
18. [Resumen final](#resumen-final)
19. [Referencias y cobertura del documento](#referencias-y-cobertura-del-documento)

## Introducción y objetivos

**CSS (Cascading Style Sheets)** es el lenguaje de presentación que describe la apariencia de los documentos HTML. El esquema inicial del PDF relaciona tres responsabilidades de un sitio web: **HTML para la estructura**, **CSS para la presentación** y **JavaScript para el comportamiento**. La unidad desarrolla CSS desde la escritura de reglas hasta el cálculo de los valores que el navegador utiliza para representar cada elemento.

Sus funciones principales son definir colores, fuentes y estilos tipográficos; controlar el tamaño y la apariencia de los elementos; establecer la distribución y maquetación de la página; crear transiciones y animaciones visuales; y adaptar la presentación a dispositivos y tamaños de pantalla diferentes. El PDF enumera estas funciones, pero no desarrolla en esta unidad la programación de animaciones o transiciones.

La separación de estructura y presentación permite **reutilizar estilos**, mantener una **consistencia visual** entre páginas, simplificar el mantenimiento mediante hojas externas y adaptar el sitio a distintas resoluciones. La figura de la página 5 conecta un documento y varias hojas CSS con dispositivos diferentes. La página 6 contrasta una página sencilla de la Universidad de Oviedo, con título, párrafo, lista y enlace, con una portada de gran imagen y navegación: ilustra el papel de la presentación sin aportar nuevas reglas de código.

**Objetivos de estudio:** elegir cómo asociar CSS a un documento, interpretar reglas y selectores, resolver conflictos mediante la cascada, comprender la herencia, calcular dimensiones del modelo de caja y distinguir unidades y valores reutilizables.

**Fuente y alcance:** lectura completa y revisión visual de las **98 páginas** de `2 CSS.pdf`. Los ejemplos marcados como originales proceden del texto o de las imágenes del PDF. Las aclaraciones añadidas llevan la etiqueta **Explicación didáctica**; las erratas y contenidos incompletos se señalan expresamente. Los estados y fechas de las especificaciones son los recogidos por el documento, sin actualización externa.

[Ver definición y esquema](<2 CSS.pdf#page=3>), [funciones](<2 CSS.pdf#page=4>) y [comparación visual](<2 CSS.pdf#page=6>).

## Aplicación de estilos

Las reglas CSS pueden formar parte del propio HTML o almacenarse en un archivo independiente. El documento distingue **estilos en línea**, **hojas internas** y **hojas externas**.

### Estilos en línea

Se aplican a un elemento individual mediante el atributo global **`style`**. Su ventaja es la rapidez de aplicación; sus inconvenientes son la escasa reutilización y la dificultad de mantenimiento.

**Origen:** ejemplo original de la página 9, recuperado de su imagen.

```html
<h2 style="color: green;">Titulo</h2>
```

La declaración establece el color verde para ese encabezado concreto. La diapositiva presenta este mecanismo con un rótulo **«Prohibido»**. Se conserva como una indicación docente del material sobre su uso, junto con los motivos de mantenimiento y reutilización que expone.

[Ver diapositiva 9](<2 CSS.pdf#page=9>).

### Hojas de estilo internas

Una hoja interna se incrusta en el documento mediante el elemento **`style`**. Centraliza los estilos de una página, pero solo afecta a ese documento y no permite reutilizar la hoja entre documentos. El PDF indica su uso en entornos docentes o didácticos y también la rotula **«Prohibido»** en la figura.

**Origen:** fragmento original de la página 10; los puntos suspensivos indican contenido omitido en la propia diapositiva.

```html
<html>
    <head>
        <title>...</title>
        <style type="text/css">
            h2 { color: green; }
        </style>
    </head>
    <body>
        ...
```

El ejemplo es un **fragmento incompleto**, no un documento íntegro: muestra dónde se incrusta la regla. La advertencia docente debe leerse junto con la observación del propio PDF sobre su utilidad didáctica.

[Ver diapositiva 10](<2 CSS.pdf#page=10>).

### Hojas de estilo externas

La opción **recomendada** en el documento consiste en almacenar CSS en un archivo independiente y enlazarlo mediante **`link`**. Sus ventajas son la reutilización, el mantenimiento y la separación entre contenido y presentación.

**Origen:** ejemplos originales de la página 11.

```html
<link rel="stylesheet" href="estilo.css" />
```

La misma diapositiva muestra un ejemplo de dos archivos:

```css title="estilo.css"
/* estilo.css*/
h2 {
    color: green;
}
```

```html title="Documento HTML del ejemplo"
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Ejemplo CSS</title>
    <link rel="stylesheet" href="estilo.css" />
</head>
<body>
    <!-- resto del contenidos -->
    <h2>Titulo</h2>
</body>
</html>
```

**Advertencia sobre la fuente:** en la captura del documento completo, el enlace aparece como `href="estilos.css"`, mientras que el archivo y el enlace aislado se llaman `estilo.css`. El bloque anterior unifica explícitamente el enlace a `estilo.css` para que el ejemplo pueda probarse; el PDF original conserva esa diferencia de nombres. La regla colorea los encabezados `h2` de los documentos que enlacen el archivo correcto.

| Mecanismo | Lugar de definición | Alcance indicado | Ventaja | Inconveniente o recomendación |
|---|---|---|---|---|
| En línea | Atributo `style` | Un elemento | Aplicación rápida | Poco reutilizable, mantenimiento difícil; rótulo «Prohibido» |
| Interno | Elemento `style` | Un documento | Centraliza los estilos de esa página | No reutilizable entre documentos; uso didáctico y rótulo «Prohibido» |
| Externo | Archivo enlazado con `link` | Documentos que lo referencien | Reutilización, mantenimiento y separación | Rótulo «Recomendado» |

[Ver hoja externa y archivos](<2 CSS.pdf#page=11>).

### Flujo de trabajo y ventajas de las hojas externas

El proceso habitual del PDF consta de cinco pasos:

1. Crear el documento HTML.
2. Crear el archivo CSS.
3. Enlazar ambos archivos mediante `link`.
4. Definir los estilos en el archivo CSS.
5. Visualizar el resultado.

Centralizar el estilo permite referenciarlo desde muchos documentos y mantener de forma consistente un sitio grande. También aporta una ventaja de **rendimiento**: después de la primera descarga, el navegador guarda la hoja en la **caché**. El PDF añade la **selección por parte del usuario**: un documento puede enlazar varias hojas e, idealmente, el usuario podría escoger una de ellas; no describe cómo implementar esa selección.

[Ver flujo de trabajo](<2 CSS.pdf#page=12>) y [ventajas adicionales](<2 CSS.pdf#page=13>).

### Asociación de una hoja CSS a XML

CSS también puede asociarse a XML. El ejemplo utiliza una instrucción de procesamiento **`xml-stylesheet`**, con el tipo de contenido y el archivo de estilos.

**Origen:** ejemplo original de la página 14, incluido el XML de su captura.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/css" href="estiloXML.css"?>
<poema>
    <titulo>Alba</titulo>
    <autor>Federico García Lorca</autor>
    <lugar>Granada</lugar>
    <fecha>Abril de 1915</fecha>
    <verso>Mi corazón oprimido</verso>
    <verso>siente junto a la alborada</verso>
    <verso>el dolor de sus amores</verso>
</poema>
```

La instrucción aparece después de la declaración XML y antes del elemento raíz `poema`. Su función en el ejemplo es asociar `estiloXML.css`; el PDF no proporciona el contenido de esa hoja ni un resultado renderizado del poema.

[Ver asociación a XML](<2 CSS.pdf#page=14>).

## Anatomía de las reglas CSS

### Hoja, regla, selector y declaración

Una **hoja de estilo** está formada por reglas CSS. La página 16 muestra una hoja con reglas para un encabezado en negrita, otro en verde y los párrafos en azul marino:

```css
h1 {
    font-weight: bold;
}
h2 {
    color: green;
}
p {
    color: navy;
}
```

El ejemplo central de las páginas 17 a 19 permite identificar cada componente:

```css
h2 { color: green; }
```

| Componente | Fragmento | Función |
|---|---|---|
| **Selector** | `h2` | Indica los elementos HTML a los que se aplica la regla |
| **Declaración** | `color: green;` | Define el estilo que reciben los elementos seleccionados |
| **Propiedad** | `color` | Característica visual que se desea cambiar; va antes de los dos puntos |
| **Valor** | `green` | Valor asignado a la propiedad; va después de los dos puntos |
| **Regla** | `h2 { color: green; }` | Conjunto formado por selector y declaración entre llaves |

Los diagramas delimitan el selector antes de la llave izquierda, la declaración entre llaves y la propiedad y el valor a ambos lados de `:`. El resultado es que todos los elementos `h2` seleccionados se muestran en verde. Las declaraciones se separan mediante **punto y coma**.

[Ver hoja de estilo](<2 CSS.pdf#page=16>) y [anatomía de la regla](<2 CSS.pdf#page=17>).

### Varias declaraciones y comentarios

Una regla puede reunir varias declaraciones independientes. El ejemplo original de la página 20 combina negrita y verde:

```css
h1 {
    font-weight: bold;
    color: green;
}
```

La diapositiva muestra su equivalencia con:

```css
h1 { font-weight: bold; }
h1 { color: green; }
```

Los **comentarios** documentan el código, son ignorados por el navegador y facilitan el mantenimiento. Su delimitación aparece en la imagen de la página 21:

```css
/* esto es un comentario */
```

[Ver varias declaraciones](<2 CSS.pdf#page=20>) y [comentarios](<2 CSS.pdf#page=21>).

### Agrupación de selectores

Si varios selectores comparten declaraciones, se pueden agrupar en una lista separada por comas. La página 22 parte de:

```css
h1 { color: green; }
h2 { color: green; }
h3 { color: green; }
```

Y lo expresa como:

```css
h1, h2, h3 {
    color: green;
}
```

**Restricción del ejemplo:** el documento advierte que todos los selectores de esta lista deben ser válidos para que se aplique la regla. No debe confundirse la coma que agrupa selectores con los combinadores que relacionan elementos del DOM.

[Ver agrupación](<2 CSS.pdf#page=22>).

### Propiedades abreviadas

Una **propiedad abreviada** expresa conjuntamente valores que también pueden escribirse mediante propiedades individuales. Los ejemplos originales de las páginas 23 y 24 son:

```css
h1 { font: bold italic 5em serif; }
```

La diapositiva la desarrolla como:

```css
h1 {
    font-weight: bold;
    font-style: italic;
    font-size: 5em;
    font-family: serif;
}
```

Y para el relleno:

```css
h1 { padding: 2em; }
```

```css
h1 {
    padding-top: 2em;
    padding-left: 2em;
    padding-bottom: 2em;
    padding-right: 2em;
}
```

La equivalencia anterior reproduce las propiedades que el PDF desarrolla; no pretende describir exhaustivamente todos los efectos de `font`. El documento advierte que las abreviaturas pueden provocar **redefiniciones de propiedades**, que generan advertencias del validador y deben analizarse y resolverse.

### Regla del reloj

Los diagramas de la página 25 recorren los lados en sentido horario: **superior, derecho, inferior e izquierdo**. Según el número de valores de `padding`, se distribuyen así:

| Número de valores | Ejemplo original | Superior | Derecho | Inferior | Izquierdo |
|---|---|---|---|---|---|
| Cuatro | `padding: 2em 3em 1em 4em;` | `2em` | `3em` | `1em` | `4em` |
| Tres | `padding: 2em 3em 1em;` | `2em` | `3em` | `1em` | `3em` |
| Dos | `padding: 2em 3em;` | `2em` | `3em` | `2em` | `3em` |
| Uno | `padding: 2em;` | `2em` | `2em` | `2em` | `2em` |

**Explicación didáctica:** con dos valores se distinguen los lados verticales y horizontales; con tres, los dos lados horizontales comparten el segundo valor; con cuatro, cada lado tiene su valor independiente.

[Ver abreviaturas de fuente](<2 CSS.pdf#page=23>), [relleno](<2 CSS.pdf#page=24>) y [regla del reloj](<2 CSS.pdf#page=25>).

## Selectores y árbol DOM

Los **selectores** indican los elementos de un documento HTML sobre los que se aplica una regla. El módulo **Selectors** define mecanismos para identificar tanto elementos individuales como conjuntos de elementos. Sus capacidades evolucionan con los niveles de la especificación.

El PDF cita **Selectors Level 3**, Recomendación del W3C del **06/11/2018**, y **Selectors Level 4**, Working Draft del **22/01/2026**, advirtiendo que algunas características no están completamente implementadas y presentan limitaciones de compatibilidad entre navegadores.

La clasificación completa incluye selectores de tipo, universal, de clase, de identificador, de atributo, combinadores, pseudoclases y pseudoelementos. Los combinadores expresan relaciones del DOM; las pseudoclases, estados o condiciones; los pseudoelementos se identifican como partes de un documento. **El PDF no desarrolla sintaxis ni ejemplos de pseudoelementos**, por lo que no se añade teoría externa sobre ellos.

### Selección en el DOM

El **Document Object Model (DOM)** representa la estructura del documento. Los selectores localizan nodos en ella. La página 29 muestra:

```html
<section>
    <h2>Título sección</h2>
    <p>Párrafo 1</p>
    <p>Párrafo 2</p>
</section>
```

```css
p {
    color: red;
}
```

Ambos párrafos quedan seleccionados y se muestran en rojo; el encabezado no. El esquema DOM representa una sección con un encabezado y dos párrafos, señalando estos últimos. **Errata de la figura:** el árbol rotula el encabezado como `h1`, aunque el código muestra `h2`; la selección de `p` es la misma en ambos casos.

### Uso de la misma sintaxis desde JavaScript

Los selectores no solo se emplean para aplicar estilos. La página 30 muestra que **`querySelector()`** y **`querySelectorAll()`** usan la sintaxis CSS para localizar elementos del DOM desde JavaScript:

```javascript
// Selecciona el primer elemento <p>
document.querySelector("p");

// Selecciona todos los elementos <p>
document.querySelectorAll("p");
```

La diferencia que destaca el ejemplo es **primer elemento frente a todos los elementos**. Este conocimiento permite después acceder a los elementos y manipularlos desde aplicaciones JavaScript; la unidad no desarrolla esas manipulaciones.

[Ver especificaciones](<2 CSS.pdf#page=27>), [clasificación](<2 CSS.pdf#page=31>), [DOM](<2 CSS.pdf#page=29>) y [JavaScript](<2 CSS.pdf#page=30>).

## Selectores básicos y de atributo

### Selector de tipo y selector universal

El **selector de tipo** coincide con el nombre del elemento HTML. El **universal `*`** selecciona todos los elementos del documento.

**Origen:** ejemplos de las páginas 32 y 33. Ambas utilizan la sección con un `h2` y dos párrafos del apartado anterior.

```css
/* Página 32: todos los párrafos se muestran en azul. */
p {
    color: blue;
}
```

```css
/* Página 33: todos los elementos se muestran en azul. */
* {
    color: blue;
}
```

La primera captura deja el encabezado sin seleccionar y colorea los dos párrafos. La segunda muestra también el encabezado en azul. Los ejemplos se estudian por separado.

[Ver selector de tipo](<2 CSS.pdf#page=32>) y [selector universal](<2 CSS.pdf#page=33>).

### Selector de clase

Selecciona elementos cuyo atributo **`class`** contiene la clase indicada. Empieza por un **punto**. Una misma clase puede repetirse en el documento.

**Origen:** ejemplo de la página 34. Se sustituyen explícitamente las comillas tipográficas `“ ”` del original por comillas rectas para poder reutilizar el código.

```html
<section>
    <h2>Título sección</h2>
    <p class="destacado">Párrafo 1</p>
    <p>Párrafo 2</p>
    <p class="destacado">Párrafo 3</p>
</section>
```

```css
.destacado {
    color: red;
}
```

La figura muestra en rojo el primer y el tercer párrafo. El segundo y el encabezado no coinciden con `.destacado`.

### Selector de identificador

Selecciona el elemento cuyo atributo **`id`** coincide con el valor indicado. Empieza por una **almohadilla `#`** y el identificador debe ser **único** en el documento.

**Origen:** ejemplo de la página 35.

```html
<h1 id="principal">
    Universidad de Oviedo
</h1
```

```css
#principal {
    color: red;
}
```

La captura muestra el encabezado en rojo. **Errata del código original:** falta `>` en `</h1`; se conserva el fragmento tal como aparece para advertir del problema. Para probarlo hay que completar el cierre como `</h1>`.

| Comparación | Clase | Identificador |
|---|---|---|
| Atributo HTML | `class` | `id` |
| Símbolo del selector | `.` | `#` |
| Ejemplo | `.destacado` | `#principal` |
| Repetición | Puede repetirse | Debe ser único |

[Ver clase](<2 CSS.pdf#page=34>), [identificador](<2 CSS.pdf#page=35>) y [comparación](<2 CSS.pdf#page=36>).

### Selectores de atributo

Permiten seleccionar por los atributos que posee un elemento o por los valores asociados a esos atributos. El formato de presencia es **`selector[atributo]`**.

**Origen:** ejemplo de la página 37.

```html
<a href="https://www.uniovi.es">UniOvi</a>
<a>Enlace incompleto</a>
```

```css
a[href] {
    color: red;
}
```

Solo el primer elemento tiene `href`; la captura lo muestra en rojo y deja sin ese estilo al segundo. No se comprueba un valor concreto, sino la **existencia** del atributo.

La selección por **valor exacto** se ilustra en la página 38:

```html
<input type="text">
<input type="password">
<input type="text">
```

```css
input[type="text"] {
    background-color: red;
}
```

Los controles primero y tercero tienen fondo rojo; el de contraseña no coincide con el selector. La página 39 amplía las formas habituales:

| Selector | Condición |
|---|---|
| `[atributo]` | Tiene el atributo indicado |
| `[attr="valor"]` | El valor coincide exactamente |
| `[attr^="x"]` | El valor empieza por `x` |
| `[attr$="x"]` | El valor termina por `x` |
| `[attr*="x"]` | El valor contiene `x` |

El documento señala usos en **formularios**, **enlaces**, **componentes web**, **frameworks JavaScript** y **pruebas automatizadas**, y muestra estos selectores aislados:

```css
input[required]
input[type="mail"]
Button[disabled]
```

Son selectores, no reglas completas, porque no incluyen declaraciones. **Advertencia de lectura:** se conserva `type="mail"` tal como aparece en el PDF; el ejemplo ilustra una comparación literal de atributo y no desarrolla ni justifica ese valor como tipo de control.

[Ver presencia de atributo](<2 CSS.pdf#page=37>), [valor exacto](<2 CSS.pdf#page=38>), [operadores](<2 CSS.pdf#page=39>) y [usos](<2 CSS.pdf#page=40>).

## Combinadores

Los **combinadores** seleccionan elementos según sus relaciones dentro del árbol DOM. El PDF desarrolla cuatro: descendiente, hijo directo, hermano adyacente y hermano general.

| Combinador | Ejemplo original | Relación que exige |
|---|---|---|
| Espacio | `section p` | Párrafos dentro de la sección, a cualquier profundidad |
| `>` | `section > p` | Párrafos hijos directos de la sección |
| `+` | `h2 + p` | Párrafo hermano que aparece inmediatamente después del `h2` |
| `~` | `h2 ~ p` | Párrafos hermanos posteriores al `h2` |

### Descendiente e hijo directo

**Origen:** HTML compartido por las páginas 42 y 43.

```html
<section>
    <h2>Título</h2>
    <p>Párrafo 1</p>
    <article>
        <p>Párrafo 2</p>
    </article>
</section>
```

```css
/* Selecciona todos los párrafos dentro de la sección. */
section p {
}
```

```css
/* Selecciona únicamente los párrafos hijos directos. */
section > p {
}
```

Las reglas originales no contienen declaraciones: se usan para mostrar **qué elementos se seleccionan**. El árbol de la página 42 marca los dos párrafos porque ambos descienden de `section`. El de la página 43 marca únicamente «Párrafo 1», porque el segundo es hijo de `article`.

**Advertencia del original:** el comentario de la página 43 dice «el p que está justo después, su hijo directo». La relación determinante de `>` es ser **hijo directo**, como muestra el árbol; no es una relación de hermano adyacente.

[Ver descendiente](<2 CSS.pdf#page=42>) y [hijo directo](<2 CSS.pdf#page=43>).

### Hermano adyacente y hermano general

**Origen:** ejemplo de la página 44.

```html
<section>
    <h2>Título</h2>
    <p>Párrafo 1</p>
    <p>Párrafo 2</p>
</section>
```

```css
h2 + p {
}
```

Se selecciona únicamente «Párrafo 1», el hermano inmediatamente posterior al encabezado.

**Origen:** ejemplo de la página 45.

```html
<section>
    <h2>Título</h2>
    <p>Párrafo 1</p>
    <p>Párrafo 2</p>
    <p>Párrafo 3</p>
</section>
```

```css
h2 ~ p {
}
```

Se seleccionan los tres párrafos, porque todos son hermanos posteriores al `h2`. **Limitación de la figura:** su árbol coloca visualmente el `h2` sobre los párrafos como si fuera su padre; el HTML y la definición textual establecen que son hermanos. El comentario del código también es impreciso al hablar de «todos los elementos p dentro de la sección»: la condición que explica `~` es la de hermanos posteriores.

[Ver hermano adyacente](<2 CSS.pdf#page=44>) y [hermano general](<2 CSS.pdf#page=45>).

## Pseudoclases y combinación de selectores

Una **pseudoclase** selecciona elementos que se encuentran en un estado o cumplen una condición. Se añade mediante dos puntos: **`selector:pseudoclase`**. La clasificación del PDF comprende interacción del usuario, enlaces, formularios y estructura, y añade pseudoclases modernas de Selectors Level 4.

### Interacción del usuario

| Pseudoclase | Estado |
|---|---|
| `:hover` | El puntero se sitúa sobre el elemento |
| `:focus` | El elemento tiene el foco de entrada |
| `:active` | El usuario está activando el elemento |

**Origen:** ejemplos de la página 47. En los comentarios de `input:focus` y `button:active` faltan cierres `*/` en la diapositiva; aquí se han añadido expresamente para mantener visibles y utilizables las reglas.

```css
/* Cursor sobre el enlace: cambia el estilo. */
a:hover {
    color: red;
}

/* Al hacer clic sobre el campo cambia su apariencia. */
input:focus {
    color: red;
}

/* Al hacer clic sobre el botón cambia su apariencia. */
button:active {
    background-color: red;
}
```

**Explicación didáctica:** el comentario del ejemplo describe el clic como forma de interactuar con el control; la definición de `:focus` que hay que estudiar es que **tiene el foco**, mientras que `:active` se refiere a la activación.

[Ver interacción](<2 CSS.pdf#page=47>).

### Enlaces

**`:link`** selecciona enlaces no visitados y **`:visited`** enlaces visitados. Los ejemplos de la página 48 asignan azul a los primeros y púrpura a los segundos.

```css
a:link {
    color: blue;
}
a:visited {
    color: purple;
}
```

[Ver estados de enlace](<2 CSS.pdf#page=48>).

### Formularios

| Pseudoclase | Condición del control |
|---|---|
| `:required` | Tiene el atributo `required` |
| `:optional` | No es obligatorio |
| `:valid` | Sus datos son válidos |
| `:invalid` | Sus datos son inválidos |
| `:checked` | Checkbox marcado o botón de opción seleccionado |

**Origen:** reglas originales de las páginas 49 y 50.

```css
input:required {
    border: 2px solid red;
}
input:optional {
    border: 2px solid green;
}
input:valid {
    border-color: green;
}
input:invalid {
    border-color: red;
}
```

La primera pareja distingue obligatoriedad mediante bordes de dos píxeles. La segunda cambia el color del borde según la validez. **Errata textual:** la definición de `:optional` en la página 49 dice «enlaces», aunque el apartado, el ejemplo `input:optional` y su comentario se refieren a controles no obligatorios.

La página 51 muestra:

```html
<input type="checkbox" checked>
```

```css
input:checked {
    outline: 2px solid green;
}
```

El control marcado recibe un contorno verde. La definición también incluye los botones de opción seleccionados, aunque el código solo muestra un checkbox.

[Ver obligatoriedad](<2 CSS.pdf#page=49>), [validez](<2 CSS.pdf#page=50>) y [selección](<2 CSS.pdf#page=51>).

### Pseudoclases estructurales

La selección estructural depende del lugar o del contenido del elemento: **`:first-child`**, primer hijo; **`:last-child`**, último hijo; **`:nth-child()`**, hijo de la posición indicada; **`:empty`**, elemento vacío.

**Origen:** ejemplo completo de la página 52.

```html
<ul>
    <li>Uno</li>
    <li>Dos</li>
    <li>Tres</li>
</ul>
<p></p>
<p>Texto</p>
```

```css
li:first-child {
    color: green;
}
li:last-child {
    color: red;
}
li:nth-child(2) {
    color: blue;
}
p:empty {
    border: 1px solid red;
}
```

La captura muestra «Uno» en verde, «Dos» en azul y «Tres» en rojo. El párrafo vacío recibe el borde rojo; el párrafo con «Texto» no coincide con `:empty`.

[Ver estructura y resultado](<2 CSS.pdf#page=52>).

### Pseudoclases modernas de Selectors Level 4

**`:is()`** agrupa selectores y toma la especificidad del selector más específico de su lista. **`:where()`** también agrupa, pero no aporta especificidad. **`:has()`** se presenta como una selección de elementos que contienen otros elementos. El documento advierte de posibles diferencias de compatibilidad entre navegadores.

**Origen:** ejemplos de la página 53.

```css
:is(h1, h2, h3) {
    color: blue;
}
:where(h1, h2, h3) {
    color: red;
}
article:has(img) {
    border: 1px solid black;
}
```

Las dos primeras reglas seleccionan los tipos de encabezado indicados con distinta contribución a la especificidad. La tercera pone un borde al artículo que contiene una imagen. El cálculo de especificidad se desarrolla más adelante.

[Ver pseudoclases modernas](<2 CSS.pdf#page=53>).

### Varias clases y selectores más precisos

Un elemento puede tener varias clases. En la página 54 se combinan dos estilos compatibles:

```html
<p class="destacado importante">
    Texto
</p>
```

```css
.destacado {
    color: red;
}
.importante {
    font-weight: bold;
}
```

El párrafo queda rojo y en negrita: cada regla aporta una propiedad diferente. La página 55 combina tipo y clase para precisar la selección:

```html
<p class="destacado">
    Texto
</p>
<article class="destacado">
    <p>Párrafo del article</p>
</article>
```

```css
/* Selecciona solo los párrafos con clase destacado. */
p.destacado {
    color: red;
}
```

**Corrección explícita:** se cierra el comentario `*/`, que falta en el PDF. La captura muestra en rojo solo el primer párrafo. El artículo tiene la clase, pero no es un `p`; el párrafo de su interior no tiene esa clase. No se debe confundir `p.destacado` con seleccionar cualquier párrafo que esté dentro de un elemento con esa clase.

[Ver varias clases](<2 CSS.pdf#page=54>) y [tipo combinado con clase](<2 CSS.pdf#page=55>).

### Varias reglas coincidentes: el problema que resuelve la cascada

La página 56 plantea qué ocurre si un mismo elemento coincide con varios selectores que definen colores distintos:

```html
<p id="principal" class="destacado" data-tipo="aviso">
    Universidad de Oviedo
</p>
```

```css
p { color: blue; }
.destacado { color: red; }
#principal { color: green; }
[data-tipo="aviso"] { color: orange; }
```

El elemento coincide con los cuatro selectores. Para determinar el resultado, el navegador utiliza la **cascada**, la **especificidad** y la **herencia**. Con las reglas normales del ejemplo, del mismo origen, prevalece `#principal` y el color es verde; el procedimiento se desarrolla en los apartados siguientes.

[Ver conflicto entre reglas](<2 CSS.pdf#page=56>).

## Modelo de procesamiento

Cuando el navegador carga una página, debe analizar HTML, localizar las hojas de estilo y determinar qué reglas se aplican a cada elemento. La página 58 presenta seis fases:

1. Partir del **documento HTML**.
2. Construir el **árbol DOM**.
3. Cargar y analizar **CSS**.
4. Evaluar los **selectores** y resolver los conflictos entre reglas.
5. Aplicar los estilos.
6. Representar el documento.

::: proceso
Documento HTML → Construcción del DOM → Carga y análisis de CSS → Evaluación de selectores y resolución de conflictos → Aplicación de estilos → Representación
:::

La evaluación de selectores permite localizar las reglas candidatas; la resolución de conflictos determina qué declaración prevalece cuando hay varias para la misma propiedad. Después se puede construir la representación visual del documento.

[Ver proceso original](<2 CSS.pdf#page=58>).

## Cascada y resolución de valores

La **cascada** es un principio fundamental de CSS. Cuando varias reglas establecen valores distintos para una misma propiedad de un elemento, el navegador necesita decidir cuál aplicar. El PDF también contempla el caso en que **no existe ninguna declaración aplicable**: el valor se obtiene mediante los mecanismos de valor inicial y herencia.

La página 61 ilustra el razonamiento con un párrafo `id="principal" class="destacado"` y las reglas `p`, `.destacado` y `#principal`, ya presentadas. El esquema avanza desde el elemento HTML a los selectores coincidentes, la cascada, la especificidad, la herencia y el valor final. **Explicación didáctica:** son mecanismos relacionados; la especificidad forma parte de la ordenación de declaraciones, mientras que la herencia permite obtener valores cuando corresponde.

[Ver planteamiento](<2 CSS.pdf#page=60>) y [esquema de resolución](<2 CSS.pdf#page=61>).

### Desde los valores declarados hasta el valor real

El documento distingue seis etapas para el valor de una propiedad:

| Etapa | Qué representa |
|---|---|
| **Valores declarados** | Todos los valores de las reglas aplicables a esa propiedad del elemento; puede haber cero o muchos |
| **Valor de la cascada** | Resultado de aplicar cascada y especificidad; cuando hay una declaración ganadora, queda un valor por propiedad y elemento |
| **Valor por defecto** | Si no hay un valor establecido, se utiliza el valor inicial o el heredado |
| **Valor calculado** | Resolución de unidades y dependencias para obtener el valor de la propiedad |
| **Valor utilizado** | Valor que se aplica a la propiedad del elemento |
| **Valor real** | Valor utilizado después de aplicar las restricciones del entorno de visualización o dispositivo |

**Explicación didáctica:** la mención a «un valor» de la cascada debe leerse junto con el caso de cero declaraciones del primer paso y con el paso de valor por defecto. No todos los valores nacen de una declaración escrita para el elemento.

[Ver etapas](<2 CSS.pdf#page=62>).

### Ejemplo original con `font-size`

La página 63 utiliza esta declaración, suponiendo que el padre de `h1` tiene un tamaño de fuente de **16 px**:

```css
h1 { font-size: 3em; }
```

| Tipo de valor | Resultado del ejemplo |
|---|---|
| Declarado | `3em` |
| De la cascada | `3em` |
| Calculado | `48px`, porque `3 × 16px = 48px` |
| Utilizado | `48px` |
| Real | `48px` |

El ejemplo muestra que la expresión declarada puede ser relativa, mientras que el valor calculado ya resuelve la dependencia con el tamaño del padre. El PDF añade que, si el cálculo produjera `48,2`, el valor real sería `48px`. **Limitación:** se conserva como ilustración del ajuste al dispositivo del ejemplo, sin convertirlo en una regla universal de redondeo que el documento no desarrolla.

[Ver ejemplo numérico](<2 CSS.pdf#page=63>).

## Origen, importancia, especificidad y orden

La cascada recopila las declaraciones para una misma propiedad de un elemento, las ordena y selecciona un valor. El PDF establece **tres criterios en este orden**: **origen e importancia**, **especificidad** y **orden de aparición**. No se puede aplicar el último criterio ignorando los anteriores.

[Ver criterios](<2 CSS.pdf#page=64>).

### Origen de las declaraciones

| Origen | Procedencia y finalidad |
|---|---|
| **Navegador o agente de usuario** | Estilos predeterminados que aplica automáticamente el navegador |
| **Autor** | Hojas de estilo que define el desarrollador de la página |
| **Usuario** | Personalización por preferencias o necesidades específicas de accesibilidad |

El usuario puede proporcionar un archivo de estilos o utilizar una interfaz del agente que genere su hoja. El PDF llama al navegador también «aplicación del usuario»; debe distinguirse ese agente de las **declaraciones del usuario** como origen de personalización.

[Ver orígenes](<2 CSS.pdf#page=65>).

### Importancia y precedencia

La anotación **`!important`** cambia la importancia de una declaración y altera el orden de precedencia. El ejemplo original es:

```css
p { font-style: italic !important; }
```

::: aviso Evitar el uso de !important
El PDF recomienda evitar esta anotación y priorizar la aplicación correcta de la cascada. Su existencia no sustituye la necesidad de comprender el origen y la especificidad.
:::

La página 67 presenta esta **precedencia de mayor a menor prioridad**:

1. Declaraciones de **transiciones** `[CSS3-TRANSITIONS]`.
2. Declaraciones **importantes del agente de usuario**.
3. Declaraciones **importantes del usuario**.
4. Declaraciones **importantes del autor**.
5. Declaraciones de **animación** `[CSS3-ANIMATIONS]`.
6. Declaraciones **normales del autor**.
7. Declaraciones **normales del usuario**.
8. Declaraciones **normales del agente de usuario**.

La tabla original permite ver la inversión: entre declaraciones normales, el autor prevalece sobre usuario y agente; entre importantes, el agente prevalece sobre usuario y autor. Las transiciones y las animaciones aparecen en la clasificación, pero sus mecanismos no se desarrollan aquí.

[Ver anotación y recomendación](<2 CSS.pdf#page=66>) y [precedencia completa](<2 CSS.pdf#page=67>).

### Cálculo de especificidad

Una vez considerado el origen y la importancia, la declaración con el selector de mayor **especificidad** prevalece sobre otra más general. La especificidad se representa en el PDF como **`abc`**, con tres componentes:

- **`a`**: número de identificadores ID del selector.
- **`b`**: número de clases, selectores de atributo y pseudoclases.
- **`c`**: número de selectores de tipo y pseudoelementos.

El selector universal **`*` se ignora** en el cómputo. La página 69 recalca que no se suman los dígitos. **Explicación didáctica:** conviene leer `abc` como componentes ordenados: primero se compara `a`, después `b` si hay empate y finalmente `c`. Así se conserva el sentido de la representación del documento sin confundirla con sumar cifras.

| Selector original | a | b | c | Notación del PDF |
|---|---|---|---|---|
| `li` | 0 | 0 | 1 | `001` |
| `p` | 0 | 0 | 1 | `001` |
| `.destacado` | 0 | 1 | 0 | `010` |
| `#principal` | 1 | 0 | 0 | `100` |
| `*` | 0 | 0 | 0 | `000` |
| `ul li` | 0 | 0 | 2 | `002` |
| `h1 + *[rel=up]` | 0 | 1 | 1 | `011` |
| `ul ol li.aviso` | 0 | 1 | 3 | `013` |
| `li.aviso.nivel` | 0 | 2 | 1 | `021` |
| `#contenedor` | 1 | 0 | 0 | `100` |

En `h1 + *[rel=up]`, el atributo aporta una unidad a `b`, `h1` aporta una a `c` y el universal no aporta nada. En `li.aviso.nivel`, las dos clases aportan dos unidades a `b` y `li` una a `c`. Son los ejemplos originales de las páginas 68 y 70.

El documento recomienda no aumentar artificialmente la especificidad con ID y clases y priorizar selectores precisos de **tipo, atributo y pseudoclase**. La recomendación se refiere a la elección de selectores; no elimina la contribución a la especificidad que el propio PDF atribuye a atributos y pseudoclases.

[Ver definición](<2 CSS.pdf#page=68>), [cálculo y recomendación](<2 CSS.pdf#page=69>) y [ejemplos](<2 CSS.pdf#page=70>).

### Especificidad de Selectors Level 4

La página 71 desarrolla tres casos:

| Selector original | Especificidad del ejemplo | Explicación |
|---|---|---|
| `:is(li,.aviso,#contenedor)` | `100` | Se toma la mayor entre `li` (`001`), `.aviso` (`010`) y `#contenedor` (`100`) |
| `:where(li,.aviso,#contenedor)` | `000` | No aporta especificidad, con independencia de su lista |
| `li:has(a)` | `002` | El ejemplo cuenta `li` (`001`) y `a` (`001`) |

**Limitación de la explicación original:** el PDF dice que `:has` construye la especificidad según los selectores que contiene y añade «como una pseudoclase», pero su ejemplo `li:has(a)` da `002`. Se conserva el cálculo explícito del ejemplo; no se añade un punto de pseudoclase que contradiga ese resultado ni se extrapolan casos no desarrollados por el material.

[Ver los tres cálculos](<2 CSS.pdf#page=71>).

### Orden de aparición

Si dos declaraciones tienen el **mismo origen e importancia** y la **misma especificidad**, se aplica la que aparece en **último lugar**. La página 72 muestra:

```css
p {
    color: blue;
}
p {
    color: red;
}
```

La captura presenta el párrafo en rojo. El documento recomienda crear las reglas teniendo en cuenta la herencia para evitar problemas con su orden de aparición. El hecho de ser la última regla solo decide cuando los criterios anteriores empatan.

[Ver empate y resultado](<2 CSS.pdf#page=72>).

## Valores iniciales y herencia

### Valores iniciales y palabras clave

Cuando una propiedad carece de declaración aplicable, el PDF menciona tres vías: **valor inicial**, **herencia** y palabras clave de valores predeterminados explícitos: **`inherit`**, **`initial`**, **`unset`** y **`revert`**. Estas palabras se enumeran, pero no se desarrollan sus diferencias ni ejemplos; no se añaden definiciones externas.

Todas las propiedades tienen un **valor inicial** definido en la especificación. La página 74 muestra la ficha de **`font-size`** y destaca el campo **`Initial: medium`**. La ficha también muestra que se aplica a todos los elementos y texto, que es heredable, que sus porcentajes se refieren al tamaño de fuente del padre y que el valor calculado es una longitud absoluta. El propósito de la captura es enseñar dónde encontrar la información de una propiedad.

La página 75 destaca el campo **`Inherited: yes`** en la ficha de **`font-family`**. La tabla indica además un valor inicial dependiente del agente de usuario, aplicación a todos los elementos y texto y ausencia de porcentajes aplicables. El punto principal es que la especificación de cada propiedad indica **si es heredable**.

Las dos capturas contienen estos campos de consulta, que se conservan para poder interpretar sus fichas completas:

| Campo de la ficha | `font-size`, página 74 | `font-family`, página 75 |
|---|---|---|
| `Name` | `font-size` | `font-family` |
| `Value` | Alternativas `<absolute-size>`, `<relative-size>`, `<length-percentage>` o `math` | Alternativas `<family-name>` o `<generic-family>`, agrupadas en la notación de lista `[...]#` de la captura |
| `Initial` | `medium` | Depende del agente de usuario |
| `Applies to` | Todos los elementos y texto | Todos los elementos y texto |
| `Inherited` | Sí | Sí |
| `Percentages` | Se refieren al tamaño de fuente del padre | No aplicable |
| `Computed value` | Una longitud absoluta | Lista cuyos elementos son cadenas y/o palabras clave de familia genérica |
| `Canonical order` | Según la gramática | Según la gramática |
| `Animation type` | Según el tipo de valor computado | Discreto |

El PDF utiliza las fichas para destacar `Initial` e `Inherited`; no desarrolla la gramática de valores, la notación de lista ni los tipos de animación que aparecen en las filas restantes. Se recogen como información visible de las capturas, sin añadir explicaciones externas sobre esos campos.

[Ver ausencia de declaración](<2 CSS.pdf#page=73>), [ficha de font-size](<2 CSS.pdf#page=74>) y [ficha de font-family](<2 CSS.pdf#page=75>).

### Herencia en el árbol DOM

Los descendientes pueden heredar propiedades y valores de sus padres. La herencia automática se aplica a las propiedades **definidas como heredables**. El valor heredado es el **valor computado de la propiedad en el padre**.

**Origen:** código de la imagen de la página 77.

```css
body {
    color: #818181; /* valor computado rgb(129, 129, 129) */
    background-color: #fff;
}
p {
    text-align: justify;
}
```

El párrafo no tiene una declaración propia de `color` en el ejemplo. Por herencia recibe de `body` **`rgb(129, 129, 129)`**. La regla del párrafo establece su alineación, una propiedad distinta. El PDF no utiliza la declaración de fondo para afirmar que todas las propiedades se hereden.

**Explicación didáctica:** la cascada compara declaraciones que se aplican a un elemento; la herencia obtiene, cuando corresponde, el valor computado del padre. No son dos nombres para la misma operación.

[Ver explicación y ejemplo](<2 CSS.pdf#page=77>).

## Modelo de caja

Después de determinar los valores de las propiedades, el navegador utiliza el **modelo de caja** para calcular la representación visual. CSS representa los elementos mediante **cajas rectangulares**. El PDF explica que un elemento de bloque se dibuja dentro de una caja imaginaria que lo circunda.

### Componentes

| Área | Significado | Relación con las demás |
|---|---|---|
| **Contenido, content** | Área en que se muestra el contenido | Su tamaño puede definirse con `width` y `height` |
| **Relleno, padding** | Espacio entre contenido y borde | Rodea al contenido por dentro del borde |
| **Borde, border** | Línea que rodea contenido y relleno | Delimita ambas áreas |
| **Margen, margin** | Espacio exterior que separa la caja de otros elementos | Queda fuera del borde |

Los diagramas de las páginas 79 y 81 muestran rectángulos anidados: contenido en el centro, relleno alrededor, borde a continuación y margen exterior, rotulado como invisible. Las flechas de ancho y alto permiten relacionar las áreas con las dimensiones de la caja.

[Ver modelo y figura](<2 CSS.pdf#page=79>) y [componentes](<2 CSS.pdf#page=80>).

### Cálculo de dimensiones

La página 81 suma todas las áreas en cada dirección:

```text
Ancho total = margen izquierdo + borde izquierdo + relleno izquierdo
            + ancho del contenido
            + relleno derecho + borde derecho + margen derecho

Altura total = margen superior + borde superior + relleno superior
             + altura del contenido
             + relleno inferior + borde inferior + margen inferior
```

**Explicación didáctica:** en estas fórmulas, «contenido» significa su dimensión horizontal o vertical, según se calcule el ancho o la altura. Conocer solo el tamaño del contenido no basta para obtener el espacio total que representa el esquema.

**Alcance:** estas son las fórmulas expuestas por el PDF. La unidad no desarrolla modalidades de `box-sizing` ni otras excepciones del cálculo; no se añaden aquí.

[Ver dimensiones](<2 CSS.pdf#page=81>).

## Unidades, funciones y variables

El PDF remite a **CSS Values and Units Level 3**, identificado como `[CSS-VALUES-3]`, **W3C CR del 01/12/2022**, y señala que sustituye los apartados **1.4.2.1, 4.3 y A.2 de CSS 2.1**. Los valores y unidades permiten expresar tamaños, distancias, márgenes, rellenos y dimensiones tanto de texto como de caja.

[Ver introducción a unidades](<2 CSS.pdf#page=83>).

### Longitudes absolutas

Las unidades absolutas identifican longitudes en función de una medida física. La página 84 recoge estas equivalencias:

| Unidad | Nombre | Equivalencia del documento |
|---|---|---|
| `cm` | Centímetro | `1cm = 96px / 2.54` |
| `mm` | Milímetro | `1mm = 1cm / 10` |
| `Q` | Cuarto de milímetro | `1Q = 1cm / 40` |
| `in` | Pulgada | `1in = 2.54cm = 96px` |
| `pc` | Pica | `1pc = 1in / 6` |
| `pt` | Punto | `1pt = 1in / 72` |
| `px` | Píxel | `1px = 1in / 96` |

La diapositiva escribe `Q` en la lista y `q` en su equivalencia; aquí se mantiene `Q` como denominación de la unidad enumerada y se explicita esa variación tipográfica.

[Ver longitudes absolutas](<2 CSS.pdf#page=84>).

### Longitudes relativas

Las unidades relativas expresan una longitud **en función de otra**, lo que facilita escalar de un entorno de salida a otro. El documento recomienda utilizarlas para favorecer la adaptabilidad.

| Unidad | Referencia indicada en el PDF |
|---|---|
| `em` | Tamaño de la fuente del elemento; en el ejemplo de `font-size`, tamaño del padre |
| `ex` | Tamaño de la letra `x` de la fuente del elemento |
| `ch` | Tamaño del glifo `0` de la fuente del elemento |
| `rem` | Tamaño de fuente del elemento raíz |
| `vw` | 1 % del ancho de la vista o viewport |
| `vh` | 1 % del alto de la vista |
| `vmin` | 1 % de la dimensión más pequeña de la vista |
| `vmax` | 1 % de la dimensión más grande de la vista |

[Ver unidades relativas](<2 CSS.pdf#page=85>).

### Ejemplo original: diferencia entre `rem` y `em`

La página 86 combina este HTML y CSS:

```html
<body>
    <h1>Universidad de Oviedo</h1>
    <p>Primer párrafo</p>
    <section>
        <p>Segundo párrafo</p>
    </section>
</body>
```

```css
html {
    font-size: 16px;
}
body {
    font-size: 20px;
}
/* 2 * elemento raíz (html): 2 * 16 = 32px */
h1 {
    font-size: 2rem;
}
/* 1.5 * elemento padre (body): 1.5 * 20 = 30px */
p {
    font-size: 1.5em;
}
```

El encabezado utiliza la raíz `html`, por lo que resulta **32 px**. Para el primer párrafo, el padre es `body`, con 20 px, y el resultado es **30 px**. **Explicación didáctica:** el padre directo del segundo párrafo es `section`, no `body`; como el ejemplo no asigna otro tamaño a la sección, esta hereda 20 px y su párrafo también resulta de 30 px. Así se conecta el ejemplo con la herencia explicada en el PDF y se precisa el comentario simplificado del código original.

[Ver ejemplo de tamaños](<2 CSS.pdf#page=86>).

### Otras cantidades

La página 87 enumera unidades para ángulos, duración, frecuencia y resolución:

| Cantidad | Unidades y significado recogido |
|---|---|
| **Ángulo** | `Deg`: grados, 360 por círculo; `Grad`: gradientes, 400 por círculo; `Rad`: radianes, `2 × PI` por círculo; `Turn`: una vuelta por círculo |
| **Duración** | `S`: segundos; `Ms`: milisegundos |
| **Frecuencia** | `Hz`: hercios; `kHz`: kilohercios |
| **Resolución** | `Dpi`: puntos por pulgada; `Dpcm`: puntos por centímetro; `Dppx`: puntos por píxel |

**Nota de fidelidad:** se conserva la grafía de las etiquetas de la diapositiva. El texto llama «radio» a `Rad`; la equivalencia que ofrece es de radianes. No se desarrollan en el PDF ejemplos de código con estas unidades.

[Ver otras cantidades](<2 CSS.pdf#page=87>).

### Notación funcional y `calc()`

Una **notación funcional** es un valor que puede representar tipos más complejos o invocar un procesamiento especial. La página 88 muestra el color mediante `rgb()`:

```css
color: rgb(100, 200, 50);
```

Es una declaración aislada del original. La función **`calc()`** permite expresar un valor numérico como una operación matemática con **suma `+`, resta `-`, multiplicación `*` y división `/`**. El resultado se evalúa siguiendo la precedencia estándar de operadores.

El documento indica que puede utilizarse donde se permitan valores de **longitud, frecuencia, ángulo, tiempo, porcentaje, número o entero**. Sus componentes pueden ser valores literales o expresiones `calc()`.

**Origen:** ejemplos originales de la página 88.

```css
P {
    font-size: calc(100vw / 40);
}
section {
    margin: calc(1rem - 2px);
}
```

El primer ejemplo relaciona el tamaño de fuente con el ancho del viewport, dividido entre 40. El segundo obtiene el margen restando dos píxeles a una longitud relativa a la fuente de la raíz. El PDF no detalla todas las restricciones de compatibilidad de tipos dentro de las operaciones; no se extrapolan combinaciones arbitrarias.

[Ver funciones y expresiones](<2 CSS.pdf#page=88>).

### Variables CSS o Custom Properties

Las **variables CSS**, denominadas **Custom Properties**, almacenan valores reutilizables. El ejemplo declara un color principal y lo utiliza en los encabezados:

```css
/* Declaración de la variable. */
:root {
    --color-principal: navy;
}

/* Uso de la variable. */
h1 {
    color: var(--color-principal);
}
```

**Explicación didáctica:** `--color-principal` es el nombre del valor que se reutiliza y `var(--color-principal)` permite referenciarlo en la declaración de `color`. El ejemplo sitúa la declaración en `:root`. Sus ventajas, según el PDF, son la **reutilización de valores**, el **mantenimiento**, la **consistencia visual** y la posibilidad de crear **temas visuales**.

[Ver variables](<2 CSS.pdf#page=89>).

## Módulos CSS

Las nuevas funcionalidades evolucionan mediante **módulos especializados**, que pueden desarrollarse e implementarse de manera independiente. La página 91 enumera estos módulos fundamentales:

| Módulos citados | Relación con esta unidad |
|---|---|
| **Selectors** | Mecanismos de selección |
| **Cascade** | Resolución de declaraciones |
| **Box Model** | Cajas de los elementos |
| **Values & Units** | Valores y unidades |
| **Color** | Color |
| **Fonts** | Fuentes |
| **Backgrounds & Borders** | Fondos y bordes |
| **Flexible Box Layout (Flexbox)** | Módulo de maquetación citado |
| **Grid Layout** | Módulo de cuadrículas citado |
| **Media Queries** | Módulo de condiciones de presentación citado |
| **Animations & Transforms** | Animaciones y transformaciones citadas |

Los cuatro primeros tienen un desarrollo central en estas diapositivas. Los demás forman parte de la relación de módulos; su enumeración no implica que se explique aquí toda su sintaxis. El material remite a la página de CSS del W3C.

[Ver lista original](<2 CSS.pdf#page=91>).

## Buenas prácticas de implementación

El último bloque trata la **implementación responsable de CSS por los agentes de usuario y sus motores de renderizado**. Estas indicaciones se refieren principalmente a implementaciones parciales, características inestables y extensiones propietarias; no son únicamente consejos de organización de una hoja escrita por un autor.

### Implementaciones parciales

El agente debe considerar inválidas las reglas, propiedades, valores, palabras clave y demás construcciones que no pueda soportar. El PDF insiste en que no debe interpretar selectivamente solo una parte de un valor inválido: **si un valor se considera no válido, se ignora toda la declaración**.

**Explicación didáctica:** «toda la declaración» identifica la unidad que se descarta en esta advertencia; no debe confundirse con descartar automáticamente toda una hoja de estilo.

[Ver alcance de las prácticas](<2 CSS.pdf#page=93>) e [implementaciones parciales](<2 CSS.pdf#page=94>).

### Características inestables

El documento considera inestables las características que **no han alcanzado CR, Candidate Recommendation**. Indica que no deben publicarse para uso general y que su uso debe ser limitado y experimental, en entornos controlados. Atribuye al CSSWG la indicación de que los agentes de usuario deben ignorarlas.

Se recoge esta formulación como contenido del PDF, sin convertirla en una evaluación externa de qué características concretas son estables en la actualidad.

[Ver características inestables](<2 CSS.pdf#page=95>).

### Características propietarias y no estandarizadas

Las extensiones de proveedor se presentan como características destinadas a **entornos cerrados**, accesibles solo para el agente de usuario de un único proveedor y no para entornos abiertos. Se reserva para ellas una sintaxis específica, denominada **Vendor-specific extensions**. El PDF da estos nombres:

```css
-moz-box-sizing
-moz-border-radius
-wap-accesskey
```

Son ejemplos de nombres de extensiones, no declaraciones completas. La unidad no desarrolla sus valores ni propone utilizarlas en el diseño de la web.

[Ver extensiones de proveedor](<2 CSS.pdf#page=96>).

## Advertencias y límites del material

| Punto que requiere atención | Tratamiento en estos apuntes |
|---|---|
| Rótulos «Prohibido» en estilos en línea e internos, páginas 9-10 | Se conservan como indicación docente y se recoge también el uso didáctico de hojas internas |
| `estilo.css` frente a `estilos.css`, página 11 | Se señala la discrepancia y se proporciona el enlace coherente de forma explícita |
| Comillas tipográficas, página 34 | Se indica su sustitución por comillas rectas en el código reutilizable |
| Cierre `</h1` incompleto, página 35 | Se conserva y se explica cómo completarlo |
| Comentarios CSS sin cierre, páginas 47 y 55 | Se indica expresamente la adición de `*/` |
| Árbol con `h1` en lugar de `h2`, página 29 | Se conserva la observación y se explica que no altera la selección de párrafos |
| Comentarios y árbol de combinadores, páginas 43 y 45 | Se contrasta su redacción con las relaciones que muestran el HTML y las definiciones |
| `input[type="mail"]`, página 40 | Se conserva como selector literal, sin deducir la validez de ese tipo de control |
| «Enlaces» en la definición de `:optional`, página 49 | Se identifica la discrepancia con los controles del ejemplo |
| `:has()` y especificidad, página 71 | Se conserva el cálculo explícito `li:has(a) = 002` y se señala la redacción ambigua |
| Ajuste de `48,2` a `48px`, página 63 | Se conserva como ejemplo de valor real, sin generalizarlo |
| Pseudoelementos y palabras clave de valores predeterminados | Se recoge su mención y se indica la falta de desarrollo |
| Estados de estándares y reglas sobre implementaciones | Se presentan como información del PDF, sin ampliación o actualización externa |

Los fragmentos originales sin declaraciones, como los combinadores, ilustran selección; no se presentan como ejemplos que por sí solos cambien el aspecto. Los códigos incompletos del original se identifican en sus apartados.

## Preguntas y ejercicios de repaso

Todas las preguntas y ejercicios de este apartado son de **elaboración didáctica** y se resuelven con la teoría y los ejemplos del PDF.

::: pregunta ¿Qué diferencia hay entre una regla, un selector y una declaración?
La regla reúne un selector y un bloque de declaraciones. El selector identifica los elementos; cada declaración asigna un valor a una propiedad. En `h2 { color: green; }`, `h2` es el selector y `color: green;` la declaración.
:::

::: pregunta ¿Por qué recomienda el documento hojas externas?
Permiten reutilizar estilos en múltiples documentos, mantener el sitio de forma consistente y separar contenido y presentación. Además, el navegador puede guardar la hoja descargada en la caché.
:::

::: pregunta ¿Qué lados reciben los valores de padding con cuatro, tres, dos y un parámetro?
Con cuatro: superior, derecho, inferior e izquierdo. Con tres: superior, ambos horizontales e inferior. Con dos: ambos verticales y ambos horizontales. Con uno: los cuatro lados.
:::

::: pregunta ¿Qué diferencia hay entre section p y section > p?
El primero selecciona cualquier párrafo descendiente de la sección. El segundo exige que el párrafo sea hijo directo. En el ejemplo con un artículo anidado, el párrafo del artículo solo coincide con el primero.
:::

::: pregunta ¿Qué diferencia hay entre h2 + p y h2 ~ p?
El primero exige un párrafo hermano inmediatamente posterior al encabezado. El segundo selecciona todos los párrafos hermanos posteriores, como los tres del ejemplo de la página 45.
:::

::: pregunta ¿Qué seleccionan :hover, :focus y :active?
Un elemento sobre el que está el puntero, un elemento con foco de entrada y un elemento mientras el usuario lo está activando, respectivamente.
:::

::: pregunta ¿En qué difieren :is() y :where() respecto a la especificidad?
`:is()` toma la especificidad del selector más específico de su lista. `:where()` no aporta especificidad. En el ejemplo con `li`, `.aviso` y `#contenedor`, sus resultados son `100` y `000`.
:::

::: pregunta ¿Qué orden siguen los criterios de resolución de la cascada?
Primero origen e importancia; después especificidad; por último orden de aparición. La última declaración solo gana por orden cuando los criterios anteriores empatan.
:::

::: pregunta ¿Qué es lo que se hereda de un padre?
El valor computado de la propiedad en ese padre, para propiedades definidas como heredables. En el ejemplo, el párrafo hereda el color `rgb(129, 129, 129)` de `body`.
:::

::: pregunta ¿Cuáles son las cuatro áreas del modelo de caja?
Contenido, relleno, borde y margen. El relleno está entre contenido y borde; el margen es exterior. Las fórmulas del PDF suman sus dimensiones para obtener el ancho y la altura totales.
:::

::: pregunta ¿Qué debe hacer una implementación parcial con una declaración cuyo valor no soporta?
Debe considerarla inválida e ignorar toda esa declaración, sin utilizar selectivamente solo una parte del valor.
:::

::: practica Resolver el conflicto de cuatro selectores
Para el párrafo con `id="principal"`, `class="destacado"` y `data-tipo="aviso"` de la página 56, calcula la especificidad de los cuatro selectores y determina el color, suponiendo igual origen y declaraciones normales.

**Resolución:** `p` tiene `001`; `.destacado`, `010`; `#principal`, `100`; `[data-tipo="aviso"]`, `010`. Gana el identificador y el color es verde, aunque la regla del atributo aparezca después.
:::

::: practica Diferenciar fases del valor de una propiedad
En el ejemplo `h1 { font-size: 3em; }`, el padre tiene `font-size: 16px`. Indica el valor declarado, el de la cascada, el calculado y el utilizado.

**Resolución:** el declarado y el de la cascada son `3em`. El calculado es `48px`, al multiplicar 3 por 16. El utilizado y el real del ejemplo son `48px`.
:::

::: practica Calcular una dimensión de caja
**Ejemplo didáctico:** un contenido tiene 200 px de ancho, rellenos izquierdo y derecho de 10 px, bordes de 2 px y márgenes de 5 px en ambos lados. Aplica la fórmula del PDF.

**Resolución:** `5 + 2 + 10 + 200 + 10 + 2 + 5 = 234px`. Se distinguen los 200 px de contenido de los 234 px de la suma total representada por el esquema.
:::

::: practica Interpretar unidades relativas
Explica por qué, en la página 86, el encabezado mide 32 px y los párrafos 30 px.

**Resolución:** el encabezado tiene `2rem` y usa los 16 px de la raíz: `2 × 16 = 32`. Los párrafos tienen `1.5em`; el primero usa los 20 px de `body` y el segundo los 20 px heredados por `section`: `1.5 × 20 = 30`.
:::

## Resumen final

CSS permite describir la presentación con **reglas formadas por selectores y declaraciones**. El documento recomienda hojas externas por su reutilización, mantenimiento y separación de responsabilidades. Los selectores localizan elementos por tipo, clase, identificador, atributos, relaciones del DOM o estados y condiciones.

El navegador construye el DOM, analiza CSS, evalúa selectores y resuelve conflictos. La **cascada** considera origen e importancia, especificidad y orden; los **valores iniciales** y la **herencia** completan la obtención de valores cuando corresponde. El valor de una propiedad pasa de declarado a calculado, utilizado y real.

El **modelo de caja** distingue contenido, relleno, borde y margen. Las **unidades** expresan dimensiones absolutas o relativas; las funciones como `calc()` permiten operaciones y las **Custom Properties** reutilizan valores. CSS evoluciona en módulos independientes. Las buenas prácticas finales se dirigen a que los agentes de usuario traten correctamente las construcciones no soportadas, inestables o propietarias.

## Referencias y cobertura del documento

- [Documento teórico original](<2 CSS.pdf>), material de la Universidad de Oviedo, Dra. B. Cristina Pelayo García-Bustelo.
- [Página del W3C para CSS](https://www.w3.org/Style/CSS/), citada en las páginas 91 y 98.
- [Selectors Level 3](https://www.w3.org/TR/css3-selectors/) y [Selectors Level 4](https://www.w3.org/TR/selectors-4/), enlazados en la página 27.
- [Módulos y estado de los trabajos CSS](https://www.w3.org/Style/CSS/current-work), destino del enlace `[SELECTORS]` de la página 31.
- [Ficha de font-size en CSS Fonts Level 4](https://www.w3.org/TR/css-fonts-4/#font-size-prop), citada en la página 74.
- [CSS Values and Units Level 3](https://www.w3.org/TR/css-values-3/), enlazado en la página 83.
- [Vendor-specific extensions en CSS 2.1](https://www.w3.org/TR/CSS21/syndata.html#vendor-keywords), enlazado en la página 96.
- Referencias identificadas por nombre en la página 67: `[CSS3-TRANSITIONS]` y `[CSS3-ANIMATIONS]`.

Estos recursos se recogen como referencias del PDF; no se han consultado para ampliar su teoría.

| Páginas revisadas | Contenido incorporado |
|---|---|
| 1-6 | Portada, introducción, definición, funciones, ventajas y comparación visual |
| 7-14 | Aplicación de estilos, tres mecanismos, flujo de trabajo, ventajas y XML |
| 15-25 | Anatomía, declaraciones, comentarios, agrupación, abreviaturas y regla del reloj |
| 26-31 | Introducción a selectores, especificaciones, clasificación, DOM y JavaScript |
| 32-40 | Tipo, universal, clase, identificador y atributos |
| 41-45 | Clasificación y ejemplos de combinadores, incluidos los árboles |
| 46-56 | Pseudoclases, formularios, estructura, Level 4, varias clases y conflicto de reglas |
| 57-58 | Modelo de procesamiento y sus seis fases |
| 59-64 | Cascada, fases de resolución, etapas del valor y ejemplo de 3em |
| 65-72 | Origen, importancia, precedencia, especificidad y orden |
| 73-77 | Ausencia de declaración, valores iniciales, fichas de propiedades y herencia |
| 78-81 | Modelo de caja, componentes y dimensiones |
| 82-89 | Unidades absolutas y relativas, ejemplo em/rem, otras cantidades, funciones y variables |
| 90-91 | Módulos especializados |
| 92-96 | Buenas prácticas, soporte parcial, inestabilidad y extensiones propietarias |
| 97-98 | Inicio de referencias y referencia del W3C |

**Comprobación final:** 98 de 98 páginas analizadas, incluidos diagramas, capturas y código incrustado como imagen. Se han conservado los ejemplos originales y sus resultados relevantes; se han añadido preguntas y cuatro ejercicios didácticos, sin nuevos bloques de código ajenos al PDF. Las advertencias y comparaciones están integradas en cada tema. No queda un bloque temático sin interpretar; las erratas, las simplificaciones y los temas solo enumerados están identificados expresamente.
