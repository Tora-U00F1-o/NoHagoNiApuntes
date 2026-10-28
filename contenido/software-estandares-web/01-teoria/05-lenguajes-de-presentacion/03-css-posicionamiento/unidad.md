---
asignatura: Software y Estándares para la Web
titulo: CSS - Posicionamiento
resumen: Posicionamiento de elementos con CSS.
fuente: 3 CSS-Posicionamiento.pdf
---

# CSS - Posicionamiento

## Contenido

1. [Introducción y objetivos](#introduccion-y-objetivos)
2. [Modelo de formato visual](#modelo-de-formato-visual)
3. [Flujo normal y propiedad display](#flujo-normal-y-propiedad-display)
4. [Posicionamiento tradicional](#posicionamiento-tradicional)
5. [Flotantes y límites de las técnicas tradicionales](#flotantes-y-limites-de-las-tecnicas-tradicionales)
6. [Flexible Box Layout](#flexible-box-layout)
7. [Separación con gap y comparación con margin](#separacion-con-gap-y-comparacion-con-margin)
8. [CSS Grid Layout](#css-grid-layout)
9. [Áreas y propiedades abreviadas de Grid](#areas-y-propiedades-abreviadas-de-grid)
10. [Grid adaptable con minmax y repetición automática](#grid-adaptable-con-minmax-y-repeticion-automatica)
11. [Flexbox frente a Grid y uso combinado](#flexbox-frente-a-grid-y-uso-combinado)
12. [Media Queries y mobile first](#media-queries-y-mobile-first)
13. [Advertencias y límites del documento](#advertencias-y-limites-del-documento)
14. [Preguntas y ejercicios de repaso](#preguntas-y-ejercicios-de-repaso)
15. [Resumen final](#resumen-final)
16. [Referencias y cobertura del documento](#referencias-y-cobertura-del-documento)

## Introducción y objetivos

La unidad estudia cómo CSS organiza visualmente los elementos HTML. Parte del **modelo de formato visual** y del **flujo normal**, presenta el posicionamiento tradicional y sus limitaciones y desarrolla **Flexbox**, **Grid** y **Media Queries** como herramientas de organización y adaptación de interfaces.

El objetivo es distinguir las cajas de bloque y de línea, comprender qué ocurre con el espacio de un elemento cuando cambia su posicionamiento, elegir entre organización en una dimensión o en dos y adaptar una composición a diferentes anchos de pantalla. La conclusión del PDF relaciona estas decisiones con un **HTML semántico**, que estructura el contenido.

**Fuente y alcance:** se han leído y revisado visualmente las **69 páginas** de `3 CSS-Posicionamiento.pdf`. Se incluyen los ejemplos de código y las explicaciones de los diagramas, también cuando aparecen únicamente como imagen. Las aclaraciones añadidas se marcan como **Explicación didáctica**; las actividades nuevas, como didácticas. Las erratas y simplificaciones del original se señalan sin corregirlas silenciosamente.

[Ver portada y alcance](<3 CSS-Posicionamiento.pdf#page=1>).

## Modelo de formato visual

Los elementos HTML generan visualmente **una o varias cajas** que CSS puede posicionar y modificar. Mediante CSS se controla su **tamaño**, **posición**, **separación** y **apariencia**. El tamaño y la posición del elemento se interpretan en relación con la caja que forma.

### Elementos de bloque y de línea

| Tipo presentado en el PDF | Comportamiento | Ejemplos citados |
|---|---|---|
| **De bloque** | Ocupa el ancho disponible y comienza en una nueva línea | `p`, `section` |
| **De línea** | Ocupa el espacio necesario y continúa en la misma línea | `a`, `img` |

La figura de la página 4 muestra dos párrafos, uno con un enlace dentro. Las cajas de los párrafos ocupan el ancho disponible y se apilan, mientras que el enlace aparece dentro de la línea de texto. La misma estructura se representa en una anchura estrecha y en otra más amplia: el contenido del párrafo cambia de línea según el espacio disponible, pero el enlace sigue formando parte de su texto.

[Ver generación de cajas](<3 CSS-Posicionamiento.pdf#page=3>) y [bloques y líneas](<3 CSS-Posicionamiento.pdf#page=4>).

### Repaso del modelo de caja

Los diagramas de las páginas 5 y 6 representan **contenido**, **padding**, **border** y **margin** como áreas anidadas. El contenido queda en el centro, el relleno lo rodea, el borde delimita ambas áreas y el margen queda por fuera. Las propiedades relacionadas que enumera el PDF son **`margin`**, **`border`**, **`padding`**, **`width`** y **`height`**.

El segundo diagrama distingue los cuatro lados, superior, derecho, inferior e izquierdo, y los límites de las áreas: borde del margen, del borde, del relleno y del contenido. Su función es mostrar que la geometría visual no se reduce al texto o a la imagen central: incluye también los espacios y límites que lo rodean.

[Ver caja y dimensiones](<3 CSS-Posicionamiento.pdf#page=5>) y [propiedades y límites](<3 CSS-Posicionamiento.pdf#page=6>).

## Flujo normal y propiedad display

### Flujo normal

El **flujo normal** organiza las cajas según su tipo y el orden en que aparecen en HTML. Incluye el formato de bloque de cajas de bloque, el formato en línea de cajas de línea y el posicionamiento relativo de cajas de ambos tipos.

El esquema de la página 7 presenta un `body` con `header`, un `main` que agrupa `section 1`, `section 2` y `section 3`, y un `footer`. Las flechas y el apilamiento siguen el orden del documento. El PDF destaca que **estructurar el contenido siguiendo el flujo normal ayuda a la accesibilidad**.

[Ver flujo y diagrama](<3 CSS-Posicionamiento.pdf#page=7>).

### Propiedad `display`

**`display`** especifica cómo se representa un elemento y el tipo de caja que genera. El PDF enumera, entre otros, `inline`, `block`, `inline-block`, `flex`, `grid` y `none`.

| Valor | Descripción del documento |
|---|---|
| `inline` | Genera una o más cajas de línea |
| `block` | Genera una caja de bloque principal |
| `inline-block` | Genera una caja de bloque que fluye como una caja en línea |
| `flex` | Activa el sistema Flexbox desarrollado después |
| `grid` | Activa el sistema Grid desarrollado después |
| `none` | No genera ninguna caja en la estructura de formato |

**Explicación didáctica:** `display` trata la generación y organización de cajas; `position`, que se estudia a continuación, determina cómo se ubica una caja concreta. El documento los presenta como propiedades diferentes.

[Ver display](<3 CSS-Posicionamiento.pdf#page=8>).

## Posicionamiento tradicional

### Esquemas de posicionamiento

La página 10 distingue tres esquemas:

- **Flujo normal:** los elementos aparecen siguiendo el orden del HTML.
- **Flotantes:** la caja se presenta inicialmente según el flujo normal, después se saca de él y se desplaza a izquierda o derecha tanto como sea posible; el contenido puede fluir alrededor.
- **Posicionamiento absoluto:** la caja se saca completamente del flujo normal y se ubica respecto a un contenedor.

La propiedad **`position`** permite ajustar la ubicación de elementos concretos. Sus valores en el documento son **`static`**, **`relative`**, **`absolute`**, **`fixed`** y **`sticky`**. Se propone para menús fijos, cabeceras adhesivas, etiquetas sobre imágenes y botones flotantes.

::: aviso Alcance de position en el diseño
El PDF no recomienda utilizar `position` para estructurar una página completa, crear columnas o construir diseños responsive complejos. Para esos casos recomienda Flexbox y Grid.
:::

[Ver esquemas](<3 CSS-Posicionamiento.pdf#page=10>) y [usos recomendados](<3 CSS-Posicionamiento.pdf#page=11>).

### `position: static`

Es el **valor por defecto**. La caja se presenta siguiendo el flujo normal y no cambia su posición mediante `top`, `right`, `bottom` o `left`: esas propiedades se ignoran en este caso.

**Origen:** ejemplo de la página 13.

```css
section {
    position: static;
}
```

La figura muestra tres secciones apiladas, «section 1», «section 2» y «section 3», con una flecha que sigue el flujo descendente. No hay desplazamiento de ninguna sección.

[Ver static](<3 CSS-Posicionamiento.pdf#page=13>).

### `position: relative`

La caja se sitúa primero de acuerdo con el flujo normal y después puede moverse respecto a **su posición original**. Conserva el espacio reservado para ella, incluidos el tamaño y los saltos de línea que le correspondían en el flujo.

**Origen:** ejemplo de la página 15.

```css
section {
    position: relative;
    top: 20px;
    left: 30px;
}
```

El diagrama ilustra el movimiento de una sección hacia abajo y a la derecha. Un contorno discontinuo marca el espacio original que permanece reservado; las otras cajas no ocupan automáticamente ese hueco. La figura aplica el desplazamiento a la sección destacada, aunque la regla del fragmento utiliza el selector genérico `section`.

Un elemento también puede marcarse como **relativo sin desplazarlo**, para que sirva de referencia a otros elementos con posicionamiento absoluto. Por eso el PDF destaca tres características: mantiene su espacio, se desplaza visualmente y puede actuar como referencia para elementos absolutos.

[Ver definición](<3 CSS-Posicionamiento.pdf#page=14>) y [ejemplo y espacio reservado](<3 CSS-Posicionamiento.pdf#page=15>).

### Bloque de contención o contenedor

La posición y el tamaño de las cajas se calculan en relación con un rectángulo denominado **bloque de contención**. La página 16 explica estas referencias en los casos estudiados:

| Posicionamiento | Referencia que presenta el PDF |
|---|---|
| `fixed` | La pantalla |
| `relative` | El desplazamiento se realiza respecto a la posición normal del propio elemento; este puede ser contenedor de otros |
| `absolute` | Habitualmente el elemento raíz o un ancestro posicionado; la figura posterior precisa el primer ancestro con `position` distinto de `static` |

**Nota sobre la formulación original:** al explicar `relative`, la diapositiva dice «no existe bloque contenedor». En su contexto se refiere a que los desplazamientos se miden desde la posición normal, en vez de colocarlo como un absoluto respecto a los bordes de otro elemento. Se conserva esa distinción sin extrapolarla como una teoría completa de los bloques de contención.

La página 17 muestra la relación entre una sección relativa y un artículo absoluto:

```css
section { position: relative; }
article { position: absolute; top: 0; right: 0; }
```

El artículo aparece en la esquina superior derecha del rectángulo de la sección, con flechas `top: 0` y `right: 0`. El contenido normal de la sección queda representado dentro, separado de esa etiqueta superpuesta.

[Ver bloque de contención](<3 CSS-Posicionamiento.pdf#page=16>) y [diagrama del contenedor relativo](<3 CSS-Posicionamiento.pdf#page=17>).

### `position: absolute`

La caja absoluta **sale del flujo normal**, puede superponerse a otras y se sitúa respecto al contenedor de referencia. El documento la asocia con iconos, etiquetas y elementos independientes del flujo.

**Origen:** ejemplo de la página 19, desarrollo del de la página 17.

```css
section {
    position: relative;
}
article {
    position: absolute;
    top: 0;
    right: 0;
}
```

La figura muestra dos bloques de contenido que siguen su organización normal y un artículo rojo colocado arriba a la derecha. El artículo no conserva un hueco como el del elemento relativo: su ubicación es independiente de ese flujo.

La página 18 añade que suele indicarse el **ancho `width`** y una combinación de posición horizontal, mediante **`left` o `right`**, y vertical, mediante **`top` o `bottom`**. También puede especificarse **`left` y `right` a la vez** sin indicar el ancho. Cuando el elemento está dentro de otro posicionado, el PDF enumera como posibles referencias un elemento **relativo, absoluto o fijo**. Habla de dividir el documento en partes y de utilizar elementos superpuestos o independientes del flujo, pero esa posibilidad debe leerse junto con la advertencia de la página 11 sobre no estructurar una página completa mediante este mecanismo.

[Ver consideraciones sobre tamaño y posición](<3 CSS-Posicionamiento.pdf#page=18>) y [absolute](<3 CSS-Posicionamiento.pdf#page=19>).

### `position: fixed`

El PDF presenta `fixed` como un posicionamiento calculado de acuerdo con el modelo absoluto, pero **fijado respecto a una referencia**, que en los ejemplos es la ventana o pantalla. Permite mantener un elemento visible durante el desplazamiento.

**Origen:** ejemplo de la página 20.

```css
nav {
    position: fixed;
    top: 0;
    width: 100%;
}
```

El menú se coloca en la parte superior y ocupa todo el ancho indicado. Los dibujos «Antes del scroll» y «Después del scroll» mantienen el bloque de navegación arriba mientras el contenido se desplaza. Los usos citados son **menús superiores**, **botones de ayuda** y **accesos rápidos**. La página 18 también utiliza un logotipo como ejemplo de elemento que puede mantenerse en la misma posición de la pantalla.

[Ver fixed y comparación durante el scroll](<3 CSS-Posicionamiento.pdf#page=20>).

### `position: sticky`

El elemento **permanece en el flujo normal** y, cuando alcanza una posición durante el desplazamiento, continúa visible dentro de su contenedor. El PDF resume el comportamiento como semejante a `relative` al principio y a `fixed` al hacer scroll; es habitual en barras de navegación.

**Origen:** ejemplo de la página 21.

```css
nav {
    position: sticky;
    top: 0;
}
```

La figura inicial coloca la navegación después de una cabecera. En la figura posterior al desplazamiento, la navegación queda adherida a la parte superior. **Explicación didáctica:** la semejanza visual con `fixed` no elimina la condición que explicita el PDF: `sticky` comienza dentro del flujo y su permanencia se describe dentro de su contenedor.

[Ver sticky](<3 CSS-Posicionamiento.pdf#page=21>).

### Desplazamientos: `top`, `right`, `bottom` y `left`

Los elementos posicionados, entendidos en este apartado como los que tienen un `position` distinto de `static`, generan cajas cuya ubicación puede ajustarse con **`top`**, **`right`**, **`bottom`** y **`left`**. El PDF enumera como valores una **medida**, un **porcentaje** o **`auto`**.

El diagrama de la página 22 identifica los cuatro lados del bloque contenedor y muestra un ejemplo `top: 20px; left: 30px;`. Para interpretarlo debe tenerse en cuenta el modo de posicionamiento: las páginas anteriores especifican que los desplazamientos relativos se miden desde la posición normal y los absolutos desde su referencia de contención.

| Valor de position | Relación con el flujo y con los desplazamientos |
|---|---|
| `static` | Sigue el flujo; ignora las cuatro propiedades |
| `relative` | Conserva el espacio y desplaza la caja respecto a su posición normal |
| `absolute` | Sale del flujo y se posiciona respecto al contenedor de referencia |
| `fixed` | Se presenta fijado a la pantalla en los ejemplos |
| `sticky` | Sigue en el flujo y queda adherido al alcanzar el umbral indicado |

[Ver definiciones conjuntas](<3 CSS-Posicionamiento.pdf#page=12>) y [desplazamientos](<3 CSS-Posicionamiento.pdf#page=22>).

## Flotantes y límites de las técnicas tradicionales

### `float` y `clear`

El **posicionamiento flotante** se presenta como una técnica histórica. `float` desplaza una caja a izquierda o derecha y permite que el contenido fluya a su alrededor. Los valores enumerados son **`left`**, **`right`** y **`none`**. Durante años se utilizó para construir layouts.

**`clear`** evita elementos flotantes en un determinado lado. Sus valores en el PDF son **`none`**, **`left`**, **`right`** y **`both`**.

**Origen:** código de la figura de la página 24.

```css
img { float: left; }
```

La figura sitúa una imagen a la izquierda. Las primeras líneas de texto quedan a su derecha y las posteriores se extienden bajo ella, mostrando el flujo alrededor de la imagen.

::: aviso Recomendación del material sobre los flotantes
Las páginas 23 y 24 indican «No debe utilizarse» y recomiendan Flexbox y Grid como solución de maquetación. Se conserva esta advertencia del PDF al estudiar el uso histórico de flotantes para construir layouts.
:::

[Ver float y clear](<3 CSS-Posicionamiento.pdf#page=23>) y [ejemplo visual](<3 CSS-Posicionamiento.pdf#page=24>).

### Problemas del posicionamiento tradicional

El documento enumera dificultades para **adaptar el diseño**, **centrar verticalmente elementos**, **crear columnas equilibradas** y **mantener layouts complejos**. Presenta como soluciones **Flexible Box Layout**, **CSS Grid Layout** y **Media Queries**. Estos mecanismos son el hilo conductor de la segunda parte de la unidad.

[Ver limitaciones](<3 CSS-Posicionamiento.pdf#page=25>).

## Flexible Box Layout

**Flexbox** es un sistema de diseño que organiza elementos en **una dimensión**: horizontalmente o verticalmente. La activación se hace con **`display: flex`** en el contenedor.

### Activación y ejemplo básico

**Origen:** ejemplo de la imagen de la página 28.

```html
<nav>
    <a>Inicio</a>
    <a>Productos</a>
    <a>Contacto</a>
</nav>
```

```css
nav {
    display: flex;
}
```

La figura muestra los tres elementos alineados en una fila dentro de `nav`, rotulado como contenedor flex. Los elementos `a` de este primer ejemplo no tienen `href`; los ejemplos posteriores sí lo incluyen, aunque con un valor vacío.

[Ver definición](<3 CSS-Posicionamiento.pdf#page=27>) y [activación](<3 CSS-Posicionamiento.pdf#page=28>).

### Eje principal y eje transversal

Las propiedades de Flexbox trabajan sobre dos ejes: **main axis**, eje principal, y **cross axis**, eje transversal. El diagrama de la página 29 muestra tres elementos en fila, una flecha horizontal para el principal y otra vertical para el transversal.

**Explicación didáctica:** la referencia para interpretar las propiedades es el eje, no una orientación fija de la pantalla. El PDF también permite cambiar la dirección a columna, de modo que hay que relacionar la alineación con la dirección elegida.

[Ver ejes](<3 CSS-Posicionamiento.pdf#page=29>).

### `justify-content`: alineación en el eje principal

La propiedad **`justify-content`** alinea o distribuye sobre el eje principal. La página 30 utiliza:

```css
nav {
    display: flex;
    justify-content: space-between;
}
```

El diagrama sitúa «Inicio», «Productos» y «Contacto» dejando el mismo espacio entre ellos. La página 31 compara seis opciones mediante dibujos:

| Valor | Distribución que muestra la figura |
|---|---|
| `flex-start` | Elementos agrupados al inicio del contenedor |
| `center` | Elementos agrupados en el centro |
| `flex-end` | Elementos agrupados al final |
| `space-between` | Primero y último en los extremos; espacio distribuido entre los elementos |
| `space-around` | Espacio a ambos lados de cada elemento; el espacio de los extremos es menor |
| `space-evenly` | Misma separación entre elementos y en los extremos |

Estas diferencias proceden de los rótulos de la figura, no solo de la lista textual de valores.

[Ver regla y eje](<3 CSS-Posicionamiento.pdf#page=30>) y [comparación gráfica de opciones](<3 CSS-Posicionamiento.pdf#page=31>).

### `align-items`: alineación en el eje transversal

**`align-items`** actúa sobre el eje transversal. La página 32 muestra:

```css
nav {
    display: flex;
    align-items: center;
}
```

| Valor | Efecto representado |
|---|---|
| `flex-start` | Alineación al inicio del eje transversal |
| `center` | Centrado sobre ese eje |
| `flex-end` | Alineación al final del eje transversal |
| `stretch` | Estiramiento para ocupar el espacio disponible en ese eje |

La figura utiliza filas de cajas dentro de un contenedor más alto: las tres primeras opciones cambian su ubicación vertical y la última las representa estiradas. La comparación con `justify-content` debe hacerse por **eje principal frente a transversal**.

[Ver align-items](<3 CSS-Posicionamiento.pdf#page=32>).

### `flex-direction`: fila y columna

El documento muestra **`row` como valor por defecto** y **`column`** como alternativa para apilar. Son ejemplos independientes de la página 33:

```css
nav {
    display: flex;
    flex-direction: row;
}
```

```css
nav {
    display: flex;
    flex-direction: column;
}
```

La figura conserva los tres textos y compara su distribución en fila con su apilamiento en columna. Cambia la organización de los mismos elementos.

[Ver dirección](<3 CSS-Posicionamiento.pdf#page=33>).

### `flex-wrap`: saltos de línea

**`flex-wrap`** permite que los elementos pasen a nuevas líneas cuando no cabe la disposición en una sola. La página 34 proporciona:

```html
<nav>
    <a href="">Inicio</a>
    <a href="">Productos</a>
    <a href="">Contacto</a>
</nav>
```

```css
nav {
    display: flex;
    flex-wrap: wrap;
}
```

La ilustración amplía el menú con «Equipo» y «Servicios» y compara **`nowrap`**, sin saltos, con **`wrap`**, donde esos elementos pasan a una segunda fila. El gráfico señala el límite del contenedor y explica que `wrap` crea líneas nuevas cuando el espacio es insuficiente. El HTML de la diapositiva solo contiene los tres primeros enlaces; se distingue esa diferencia respecto al diagrama.

[Ver saltos de línea](<3 CSS-Posicionamiento.pdf#page=34>).

### Cuándo utilizar Flexbox y ejemplo de navegación

El PDF propone Flexbox para **menús, botones, formularios, tarjetas y barras de herramientas**. Su regla rápida es: **una dimensión → Flexbox**.

La página 39 reúne un ejemplo de barra de navegación:

```html
<nav>
    <a href="">Inicio</a>
    <a href="">Productos</a>
    <a href="">Contacto</a>
</nav>
```

```css
nav {
    display: flex;
    justify-content: space-between;
}
```

La figura sitúa «Inicio» a la izquierda, «Productos» en el centro de la distribución y «Contacto» a la derecha, como una barra de navegación. El PDF utiliza enlaces con destinos vacíos para centrarse en la disposición, sin desarrollar navegación entre páginas.

[Ver casos de uso](<3 CSS-Posicionamiento.pdf#page=38>) y [ejemplo de barra](<3 CSS-Posicionamiento.pdf#page=39>).

## Separación con gap y comparación con margin

### `gap`, `row-gap` y `column-gap`

**`gap`** define la separación entre elementos y pertenece al **contenedor Flex o Grid**, no a cada elemento. El ejemplo original de la página 35 es:

```css
main {
    display: flex;
    gap: 2rem;
}
```

La figura compara tres cajas rotuladas «HTML», «CSS» y «JS» sin hueco con las mismas cajas separadas por espacios señalados como `gap`. La separación forma parte de la organización que establece el contenedor.

`gap` es una **propiedad abreviada** de **`row-gap`** y **`column-gap`**. La página 36 muestra una cuadrícula de dos filas y tres columnas:

- `row-gap: 2rem` deja espacio entre las filas.
- `column-gap: 2rem` deja espacio entre las columnas.
- `gap: 2rem` aplica ambas separaciones.

**Errata identificada:** el texto de la diapositiva escribe «columna-gap»; los rótulos de su figura muestran `column-gap`. Se utiliza este último nombre, señalando la corrección.

[Ver gap](<3 CSS-Posicionamiento.pdf#page=35>) y [separaciones por fila y columna](<3 CSS-Posicionamiento.pdf#page=36>).

### Diferencia entre `gap` y `margin`

La página 37 compara dos formas de establecer espacio:

```css
article {
    margin: 1em;
}
```

```css
main {
    display: flex;
    gap: 1em;
}
```

El primer dibujo rodea cada elemento A y B con su propio margen. El segundo coloca una zona de separación entre A y B, definida por el contenedor. La distinción que hay que estudiar es **`margin` pertenece al elemento; `gap` pertenece al layout o contenedor**.

**Explicación didáctica:** las dos reglas son una comparación conceptual del PDF. No se presentan como sustituciones con un resultado geométrico idéntico en todos los casos, ni se añaden reglas de márgenes que el documento no desarrolla.

[Ver comparación](<3 CSS-Posicionamiento.pdf#page=37>).

## CSS Grid Layout

**Grid** organiza **filas y columnas al mismo tiempo**. Es, por tanto, un sistema **bidimensional**. Se activa con **`display: grid`** y después se define la estructura de la cuadrícula.

**Origen:** ejemplo de la página 41.

```css
main {
    display: grid;
}
```

### Estructura general de una página

La página 42 utiliza los elementos principales de una página para presentar Grid:

```html
<header></header>
<aside></aside>
<main></main>
<footer></footer>
```

```css
body {
    display: grid;
    grid-template-columns: 250px 1fr;
}
```

El dibujo sitúa una cabecera que ocupa todo el ancho, un lateral de **250 px**, un contenido principal que utiliza **`1fr`** y un pie de ancho completo.

::: aviso La figura de la página 42 muestra una composición más completa que su código
El fragmento define únicamente dos columnas. No incluye todavía la colocación necesaria para que la cabecera y el pie ocupen ambas, como muestra el dibujo. Las páginas posteriores introducen `grid-column` y las áreas. No debe atribuirse todo el resultado dibujado únicamente a esas dos declaraciones.
:::

[Ver Grid bidimensional](<3 CSS-Posicionamiento.pdf#page=41>) y [ejemplo estructural](<3 CSS-Posicionamiento.pdf#page=42>).

### Columnas, filas y numeración de líneas

La página 43 define tres columnas iguales:

```css
main {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* 3 columnas iguales */
}
```

La página 44 define tres filas iguales:

```css
main {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr; /* 3 filas iguales */
}
```

Los diagramas muestran que **tres columnas o tres filas quedan delimitadas por cuatro líneas**. Las líneas se numeran desde el inicio como **1, 2, 3, 4** y desde el final como **-4, -3, -2, -1**. La numeración se refiere a los límites entre espacios, no al número de un elemento HTML.

[Ver columnas y líneas](<3 CSS-Posicionamiento.pdf#page=43>) y [filas y líneas](<3 CSS-Posicionamiento.pdf#page=44>).

### La unidad `fr`

**`fr`** representa una **fracción del espacio disponible**. La página 45 utiliza esta declaración:

```css
grid-template-columns: 1fr 2fr 1fr;
```

La figura divide el espacio en proporción **1:2:1**: la columna central tiene el doble de la fracción de cada lateral. El PDF lo expresa como **25 %, 50 % y 25 % aproximadamente**. Esta equivalencia porcentual ilustra el reparto de ese ejemplo; la definición central es fracción del espacio disponible.

[Ver fr y reparto](<3 CSS-Posicionamiento.pdf#page=45>).

### La notación `repeat()`

**`repeat()`** evita escribir varias veces el mismo patrón. La figura de la página 46 muestra esta equivalencia:

```css
grid-template-columns: repeat(3, 1fr);
```

```css
grid-template-columns: 1fr 1fr 1fr;
```

Ambas expresiones representan las tres columnas iguales del ejemplo. Los casos de repetición automática se desarrollan más adelante.

[Ver repeat](<3 CSS-Posicionamiento.pdf#page=46>).

### `grid-column` y `grid-row`

**`grid-column`** es la propiedad abreviada de **`grid-column-start`** y **`grid-column-end`**. El ejemplo de la página 47 hace que la cabecera se extienda desde la primera línea hasta la última:

```css
header {
    grid-column: 1 / -1;
    /* grid-column-start: 1 y grid-column-end: -1 */
}
```

La figura muestra una cabecera sobre tres columnas, entre las líneas 1 y 4; esta última también se identifica como -1. Así, el recorrido entre la primera y la última línea cubre todas las columnas representadas.

**`grid-row`** abrevia **`grid-row-start`** y **`grid-row-end`**. La página 48 utiliza:

```css
aside {
    grid-row: 1 / 3;
    /* grid-row-start: 1 y grid-row-end: 3 */
}
```

El lateral coloreado va de la línea 1 a la 3 y ocupa los dos espacios de fila entre ellas. **Explicación didáctica:** finalizar en la línea 3 no significa ocupar tres filas; hay que contar los intervalos entre las líneas que muestra el diagrama.

[Ver extensión por columnas](<3 CSS-Posicionamiento.pdf#page=47>) y [extensión por filas](<3 CSS-Posicionamiento.pdf#page=48>).

## Áreas y propiedades abreviadas de Grid

### Áreas con nombre

**Grid Areas** permite asignar nombres a regiones de la cuadrícula y describir visualmente la estructura de la página. Cada cadena representa una fila y cada palabra una zona. La repetición de un nombre indica que el área ocupa varias celdas.

**Origen:** ejemplo original de la página 49.

```css
body {
    display: grid;
    grid-template-areas:
        "cabecera cabecera"
        "adicional principal"
        "pie pie";
}

header { grid-area: cabecera; }
main { grid-area: principal; }
aside { grid-area: adicional; }
footer { grid-area: pie; }
```

La página 50 representa el resultado: **cabecera** arriba, extendida a ambas columnas; **adicional** y **principal** en la fila central; y **pie** abajo, también a lo ancho. Para interpretar el código hay dos operaciones: definir la distribución de nombres en el contenedor y asignar a cada elemento su nombre mediante `grid-area`.

[Ver definición y asignación](<3 CSS-Posicionamiento.pdf#page=49>) y [figura de áreas](<3 CSS-Posicionamiento.pdf#page=50>).

### Abreviatura `grid-template`

**`grid-template`** permite definir **filas, columnas y áreas** en una sola instrucción. Agrupa **`grid-template-rows`**, **`grid-template-columns`** y **`grid-template-areas`**.

**Origen:** declaraciones originales de la página 56. Son fragmentos de declaraciones, no reglas completas.

```css
grid-template:
    "header header" 100px
    "aside main" 1fr
    "footer footer" 80px
    / 250px 1fr;
```

La diapositiva lo presenta como equivalente a:

```css
grid-template-areas:
    "header header"
    "aside main"
    "footer footer";
grid-template-rows: 100px 1fr 80px;
grid-template-columns: 250px 1fr;
```

Las cadenas fijan tres filas de áreas; los tamaños que las acompañan establecen sus alturas; tras `/` aparecen los tamaños de las dos columnas. **Corrección tipográfica explícita:** la lista del PDF escribe `grid-template-áreas`; el propio código de la misma página muestra `grid-template-areas`, grafía utilizada aquí.

[Ver grid-template](<3 CSS-Posicionamiento.pdf#page=56>).

### Abreviatura `grid`

La página 57 presenta **`grid`** y vuelve a mostrar esta configuración:

```css
grid:
    "header header" 100px
    "aside main" 1fr
    "footer footer" 80px
    / 250px 1fr;
```

La compara con las mismas declaraciones de áreas, filas y columnas del apartado anterior. El texto enumera `grid-template`, `grid-template-rows`, `grid-template-columns` y `grid-template-areas`.

**Límite del documento:** aquí se desarrolla solo esa forma concreta de la abreviatura. La comparación no se amplía a otros efectos o variantes de `grid` que el PDF no explica; tampoco se afirma que `grid` y `grid-template` sean intercambiables en todos los casos.

[Ver grid](<3 CSS-Posicionamiento.pdf#page=57>).

## Grid adaptable con minmax y repetición automática

### `minmax()`: mínimo y máximo de una fila o columna

La función define un **tamaño mínimo y un tamaño máximo** y, por tanto, un rango de tamaños para una fila o columna. El ejemplo del PDF es:

```css
minmax(200px, 1fr)
```

Es una expresión de valor, no una declaración completa. El dibujo muestra una tarjeta con un tamaño mínimo, otra con más espacio y otra expandida hasta la fracción disponible. El objetivo es permitir un diseño adaptable.

::: aviso Errata minimax en el PDF
La página 51 titula la función «minimax()», aunque el valor escrito debajo es `minmax(200px, 1fr)`. La figura de la página 55 vuelve a escribir `minimax`. En estos apuntes se utiliza `minmax`, presente en el código de las páginas 51 a 53, y se hace explícita la discrepancia.
:::

[Ver función y tamaños](<3 CSS-Posicionamiento.pdf#page=51>).

### `auto-fill`: conservar columnas vacías

**`auto-fill`** crea tantas columnas como sea posible y **mantiene las columnas aunque estén vacías**. Reserva espacio para futuras columnas. El ejemplo original de la página 52 es:

```css
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
```

El diagrama muestra tres artículos y una cuarta columna vacía delimitada con un contorno discontinuo. El espacio reservado sigue formando parte de la estructura. El PDF propone esta opción cuando interesa reservar espacio para futuras columnas, mantener una estructura fija o conservar el número de columnas.

[Ver auto-fill](<3 CSS-Posicionamiento.pdf#page=52>).

### `auto-fit`: redistribuir el espacio libre

**`auto-fit`** también crea tantas columnas como sea posible, pero las **columnas vacías desaparecen** y el espacio libre se redistribuye. El ejemplo original de la página 53 es:

```css
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
```

La figura muestra los tres artículos ocupando el espacio del contenedor sin la columna vacía del ejemplo anterior. El PDF lo propone para aprovechar el espacio disponible, construir interfaces responsive y organizar tarjetas.

[Ver auto-fit](<3 CSS-Posicionamiento.pdf#page=53>).

### Comparación y diseño adaptable

| Aspecto | `auto-fill` | `auto-fit` |
|---|---|---|
| Creación inicial | Tantas columnas como caben | Tantas columnas como caben |
| Columnas vacías | Se mantienen | Desaparecen |
| Espacio sin contenido | Se reserva para esas columnas | Se redistribuye entre las ocupadas |
| Uso destacado por el PDF | Estructura fija o reserva de futuras columnas | Aprovechamiento del ancho e interfaces de tarjetas |

La página 54 compara **la misma cuadrícula con los mismos elementos**: con `auto-fill`, tres elementos y una columna reservada; con `auto-fit`, tres elementos más anchos y sin esa reserva.

La figura de la página 55 muestra el patrón adaptable con un mínimo de **250 px**:

```css
repeat(auto-fit, minmax(250px, 1fr))
```

**Corrección explícita:** esta expresión reproduce el patrón de la figura sustituyendo su errata `minimax` por `minmax`, como se ha indicado. En escritorio aparecen **cuatro columnas**, en tableta **dos** y en móvil **una**. Su propósito es mostrar que la cantidad de columnas se ajusta automáticamente al ancho disponible, manteniendo el mínimo del ejemplo; no establece tamaños universales de dispositivos.

[Ver comparación directa](<3 CSS-Posicionamiento.pdf#page=54>) y [adaptación a tres anchos](<3 CSS-Posicionamiento.pdf#page=55>).

## Flexbox frente a Grid y uso combinado

El documento distingue las técnicas por el número de dimensiones y el alcance de la composición:

| Criterio | Flexbox | Grid |
|---|---|---|
| Dimensiones | Una | Dos |
| Organización | Fila o columna | Filas y columnas |
| Uso destacado | Componentes | Estructura general |

No se presentan como opciones excluyentes. El ejemplo típico utiliza **Grid para las grandes regiones del documento** y **Flexbox para organizar los elementos dentro de cada región**.

La figura de la página 60 desarrolla esta combinación:

1. `body` utiliza **`display: grid`** para la estructura principal.
2. Dentro de `header`, un `h1` representa el título y un `nav` utiliza **`display: flex`** para los enlaces «Inicio», «Equipo» y «Contacto».
3. `main` agrupa secciones con artículos y se rotula como **Grid o Flex**, según la necesidad del contenido.
4. `footer` contiene el pie de página.

El árbol y los colores separan estructura general y distribución interna. La conclusión visual es que se pueden **combinar según las necesidades**, conservando la organización semántica del HTML.

[Ver comparación](<3 CSS-Posicionamiento.pdf#page=59>) y [diagrama de combinación](<3 CSS-Posicionamiento.pdf#page=60>).

## Media Queries y mobile first

### Condiciones y breakpoints

Las **Media Queries** aplican estilos según determinadas condiciones. La página 62 introduce esta sintaxis:

```css
@media (max-width: 768px) {
}
```

El bloque original está vacío porque ilustra la condición. Un **breakpoint** es el ancho de pantalla a partir del cual se aplican nuevos estilos. El PDF cita **768 px para móviles** y **1024 px para tabletas** como referencias de sus ejemplos. **Explicación didáctica:** se estudian como valores del material, sin convertirlos en límites universales para todos los dispositivos.

[Ver condición y breakpoints](<3 CSS-Posicionamiento.pdf#page=62>).

### Flex responsive: de fila a columna

**Origen:** las dos partes del ejemplo de la página 63 se reúnen a continuación en el mismo bloque, manteniendo sus declaraciones.

```css
nav {
    display: flex;
    flex-direction: row;
}

@media (max-width: 768px) {
    nav {
        flex-direction: column;
    }
}
```

La disposición inicial es una fila. Cuando se cumple la condición de ancho máximo de 768 px, la dirección pasa a columna. El diagrama compara los mismos enlaces alineados horizontalmente en escritorio y apilados verticalmente en móvil; no cambia el contenido.

[Ver Flex responsive](<3 CSS-Posicionamiento.pdf#page=63>).

### Grid responsive: de tres columnas a una

**Origen:** ejemplo de la página 64, con sus dos fragmentos reunidos.

```css
main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 768px) {
    main {
        grid-template-columns: 1fr;
    }
}
```

La cuadrícula inicial tiene tres columnas iguales. Al cumplirse la consulta, pasa a **una columna**. La figura presenta seis cajas en dos filas de tres en escritorio y una sucesión vertical de cajas en móvil.

[Ver Grid responsive](<3 CSS-Posicionamiento.pdf#page=64>).

### Mobile first: empezar por móvil

El enfoque **mobile first** define primero la presentación para móvil y después la adapta a pantallas mayores. La página 65 invierte el planteamiento de la cuadrícula anterior:

```css
main {
    display: grid;
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    main {
        grid-template-columns: repeat(3, 1fr);
    }
}
```

La regla base tiene una sola columna **sin necesitar una consulta para móvil**. A partir de la condición de **ancho mínimo de 768 px**, se definen tres columnas. El diagrama representa primero una columna de tarjetas y después su distribución en una pantalla mayor.

| Planteamiento del PDF | Regla inicial | Consulta | Adaptación |
|---|---|---|---|
| Grid responsive de la página 64 | Tres columnas | `max-width: 768px` | Una columna cuando se cumple el máximo |
| Mobile first de la página 65 | Una columna | `min-width: 768px` | Tres columnas cuando se cumple el mínimo |

[Ver mobile first](<3 CSS-Posicionamiento.pdf#page=65>).

## Advertencias y límites del documento

| Punto de atención | Cómo interpretar el material |
|---|---|
| `position` y estructura global | El PDF lo reserva para elementos concretos y recomienda Flexbox y Grid para la maquetación general |
| `relative` frente a `absolute` | El primero conserva espacio en el flujo; el segundo sale de él |
| «No existe bloque contenedor» para `relative`, página 16 | Se recoge en el contexto de que el desplazamiento se refiere a su posición normal; no se generaliza a todos los aspectos del modelo |
| Título conjunto «Absoluto y fixed», página 18 | Se distingue `absolute` respecto a su contenedor y `fixed` respecto a la pantalla, como hacen las páginas 16, 19 y 20 |
| `sticky` se describe como `fixed` al hacer scroll | Es una comparación del comportamiento visible; también se conserva que sigue en el flujo y actúa dentro de su contenedor |
| Prohibición docente de flotantes, páginas 23-24 | Se recoge con su contexto de uso histórico para layouts y la recomendación de Flexbox y Grid |
| Figura Grid de la página 42 | La cabecera y el pie dibujados requieren colocación adicional al fragmento inicial |
| `columna-gap`, página 36 | La figura muestra `column-gap`; se explicita la corrección |
| `grid-template-áreas`, página 56 | El código de la misma diapositiva muestra `grid-template-areas` |
| `minimax`, páginas 51 y 55 | Se conserva la observación y se utiliza `minmax`, presente en los ejemplos de código |
| Abreviaturas `grid` y `grid-template` | Se conserva la equivalencia del ejemplo concreto, sin afirmar equivalencia general de todos sus efectos |
| Valores 768 px y 1024 px | Referencias del PDF para los ejemplos, no clasificación universal de dispositivos |

Los gráficos han podido interpretarse para explicar sus componentes y relaciones. Las figuras de diseño son esquemas: cuando el código mostrado es parcial o la figura contiene más elementos, se indica. El PDF no desarrolla todas las propiedades de Flexbox o Grid; estos apuntes cubren las que efectivamente presenta.

## Preguntas y ejercicios de repaso

Las siguientes preguntas y actividades son de **elaboración didáctica**, basadas únicamente en conceptos y ejemplos del PDF.

::: pregunta ¿Qué diferencia hay entre una caja de bloque y una de línea?
La de bloque ocupa el ancho disponible y comienza en una nueva línea. La de línea ocupa el espacio necesario y continúa en la línea. El ejemplo del PDF contrasta un párrafo con el enlace contenido en él.
:::

::: pregunta ¿Qué hace display: none según el documento?
El elemento no genera ninguna caja en la estructura de formato. Es una opción de `display`, propiedad que determina cómo se representa el elemento y qué tipo de caja genera.
:::

::: pregunta ¿Por qué relative y absolute no dejan el mismo resultado en el flujo?
`relative` desplaza visualmente la caja, pero mantiene el espacio original reservado. `absolute` saca la caja del flujo y la posiciona respecto a su contenedor, pudiendo superponerse a otros elementos.
:::

::: pregunta ¿Para qué se utiliza position: relative sin desplazamientos?
Para que un elemento sirva como referencia a otros elementos absolutos. El ejemplo coloca un artículo en la esquina superior derecha de una sección relativa.
:::

::: pregunta ¿Qué diferencia muestra el PDF entre fixed y sticky?
El elemento fijo permanece en la referencia de pantalla durante el scroll. El adhesivo comienza en el flujo normal y queda visible al alcanzar la posición indicada, dentro de su contenedor.
:::

::: pregunta ¿Qué ejes controlan justify-content y align-items?
`justify-content` actúa sobre el eje principal y `align-items` sobre el transversal. La interpretación de horizontal o vertical depende de la dirección de la composición.
:::

::: pregunta ¿Cómo se diferencian space-between, space-around y space-evenly?
Con `space-between`, primero y último se sitúan en los extremos y se distribuye el espacio entre elementos. Con `space-around`, cada elemento tiene espacio a ambos lados y los extremos son menores. Con `space-evenly`, todos los espacios, incluidos los extremos, son iguales.
:::

::: pregunta ¿Qué cambia flex-wrap: wrap?
Permite crear nuevas líneas cuando no cabe la disposición en una sola. La figura muestra elementos de navegación pasando a una segunda línea, en contraste con `nowrap`.
:::

::: pregunta ¿Por qué gap no se explica como un margen de cada tarjeta?
Porque `gap` pertenece al contenedor y define la separación del layout; el margen pertenece al elemento. La figura compara cada caja rodeada de margen con una zona de separación definida entre cajas por el contenedor.
:::

::: pregunta ¿Qué diferencia hay entre fr y repetir valores con repeat()?
`fr` expresa una fracción del espacio disponible. `repeat()` evita escribir varias veces el mismo patrón. `repeat(3, 1fr)` representa tres columnas de una fracción cada una.
:::

::: pregunta ¿Qué representan las cadenas de grid-template-areas?
Cada cadena representa una fila y cada palabra un área. Repetir un nombre en varias celdas indica la extensión del área. Después se asigna cada elemento a un nombre mediante `grid-area`.
:::

::: pregunta ¿Cómo se diferencian auto-fill y auto-fit cuando hay columnas vacías?
`auto-fill` las conserva y reserva su espacio. `auto-fit` las elimina y redistribuye el espacio entre las ocupadas. Los diagramas comparan los mismos tres elementos con y sin una cuarta columna vacía.
:::

::: pregunta ¿Por qué pueden utilizarse Flexbox y Grid en una misma página?
Porque resuelven escalas y organizaciones diferentes: Grid estructura las grandes regiones y Flexbox organiza componentes en una dimensión dentro de ellas. La figura de la página 60 combina un body Grid con una navegación Flex.
:::

::: pregunta ¿Qué significa mobile first en el ejemplo de la unidad?
Se define una sola columna como presentación base y se añaden tres columnas mediante `@media (min-width: 768px)`. El diseño inicial ya sirve para móvil y la consulta amplía la presentación.
:::

::: practica Interpretar un desplazamiento relativo
En el ejemplo `position: relative; top: 20px; left: 30px;`, explica qué ocurre con la caja y con su espacio anterior.

**Resolución:** la caja se desplaza visualmente 20 px hacia abajo y 30 px hacia la derecha respecto a su posición normal. Su espacio original sigue reservado, tal como muestra el contorno discontinuo de la página 15.
:::

::: practica Contar líneas e intervalos de Grid
Una cuadrícula tiene tres filas. ¿Cuántas líneas muestra el esquema del PDF y cuántas filas ocupa `grid-row: 1 / 3`? ¿Qué expresa `grid-column: 1 / -1`?

**Resolución:** hay cuatro líneas de fila. De la línea 1 a la 3 se ocupan dos intervalos, por tanto dos filas. `grid-column: 1 / -1` recorre desde la primera hasta la última línea de columna y ocupa todo el ancho de columnas representado.
:::

::: practica Interpretar un reparto con fr
Explica el reparto de `grid-template-columns: 1fr 2fr 1fr` y reescribe tres columnas iguales mediante `repeat()`.

**Resolución:** la columna central recibe dos partes y cada lateral una; el PDF lo representa aproximadamente como 25 %, 50 % y 25 %. Tres columnas iguales se expresan como `grid-template-columns: repeat(3, 1fr);`.
:::

::: practica Interpretar los cambios de anchura
Para el ejemplo mobile first de la página 65, indica la disposición a 600 px y a 900 px. Explica qué diferencia hay con el ejemplo de la página 64.

**Resolución:** a 600 px se mantiene una columna; a 900 px se cumple el mínimo de 768 px y se usan tres. En la página 64 se parte de tres columnas y la consulta de ancho máximo reduce a una; en la 65 se parte de una y la consulta de mínimo amplía a tres.
:::

::: practica Componer una estructura de áreas
**Ejemplo didáctico:** reúne los elementos de la página 42 con las áreas de la página 49, añadiendo la columna lateral de 250 px que muestra el esquema. Utiliza únicamente los conceptos presentados en el PDF.

**Resolución:** el HTML mantiene cabecera, lateral, contenido y pie; el contenedor define dos columnas y tres filas de áreas. La repetición del nombre de cabecera y pie hace que ocupen ambas columnas.

```html title="Fragmento HTML" origen="ejemplo didáctico"
<body>
    <header>Cabecera</header>
    <aside>Contenido adicional</aside>
    <main>Contenido principal</main>
    <footer>Pie</footer>
</body>
```

```css title="Estructura de áreas" origen="ejemplo didáctico"
body {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-areas:
        "cabecera cabecera"
        "adicional principal"
        "pie pie";
}
header { grid-area: cabecera; }
aside { grid-area: adicional; }
main { grid-area: principal; }
footer { grid-area: pie; }
```

Es una composición didáctica de fragmentos del PDF, no un ejemplo adicional atribuido a una diapositiva. Para probarlo se coloca el CSS en una hoja externa enlazada desde un documento HTML que contenga el fragmento de `body`.
:::

## Resumen final

La representación visual parte de **cajas**, de su tipo y del **flujo normal**. `display` establece el tipo de caja u organización; `position` ajusta la ubicación de elementos concretos. `relative` conserva espacio en el flujo; `absolute` sale de él; `fixed` se mantiene en pantalla y `sticky` queda adherido al alcanzar una posición durante el desplazamiento.

La **regla de oro** de la página 67 es utilizar **HTML semántico para estructurar el contenido**, **Flexbox para componentes en una dimensión**, **Grid para la estructura general**, combinar ambos cuando sea útil y emplear **Media Queries para adaptar la interfaz** a diferentes tamaños de pantalla.

Flexbox se interpreta mediante sus dos ejes; Grid mediante filas, columnas, líneas y áreas. `gap` establece separación desde el contenedor. `repeat()`, `minmax()`, `auto-fill` y `auto-fit` permiten definir patrones y adaptar columnas. Las consultas de medios cambian estilos según condiciones y **mobile first** empieza con el diseño móvil antes de ampliarlo.

[Ver conclusiones originales](<3 CSS-Posicionamiento.pdf#page=67>).

## Referencias y cobertura del documento

- [Documento teórico original](<3 CSS-Posicionamiento.pdf>), material de la Universidad de Oviedo, Dra. B. Cristina Pelayo García-Bustelo.
- [Página de referencia del W3C para CSS](https://www.w3.org/Style/CSS/), citada en la página 69.
- [Lista de módulos y estado de los trabajos CSS](https://www.w3.org/Style/CSS/current-work), citada en la página 69.
- Módulos enumerados expresamente en esas referencias: **CSS Positioned Layout**, **CSS Flexible Box Layout**, **CSS Grid Layout Module** y **Media Queries**.

Las referencias externas se conservan por estar citadas en el PDF; no se han utilizado para completar o actualizar la teoría.

| Páginas revisadas | Contenido incorporado |
|---|---|
| 1-8 | Portada, formato visual, bloque y línea, modelo de caja, flujo y display |
| 9-12 | Inicio de posicionamiento tradicional, esquemas, usos y clasificación de position |
| 13-15 | Static y relative, incluidos espacio original y desplazamiento |
| 16-19 | Bloque de contención, figura de referencia y absoluto |
| 20-22 | Fixed, sticky y propiedades de desplazamiento |
| 23-25 | Float, clear, figura del texto alrededor y problemas tradicionales |
| 26-29 | Inicio de Flexbox, definición, activación y ejes |
| 30-34 | Justify-content, comparación de seis valores, align-items, dirección y wrap |
| 35-37 | Gap, row-gap, column-gap y comparación con margin |
| 38-39 | Usos de Flexbox y ejemplo de navegación |
| 40-48 | Inicio de Grid, estructura, columnas, filas, fr, repeat y extensión entre líneas |
| 49-50 | Áreas con nombre y representación visual |
| 51-55 | Minmax, auto-fill, auto-fit, comparación y adaptación de columnas |
| 56-57 | Abreviaturas grid-template y grid |
| 58-60 | Inicio de comparación, Flexbox frente a Grid y árbol de uso combinado |
| 61-65 | Inicio de Media Queries, breakpoints, Flex y Grid responsive, mobile first |
| 66-67 | Inicio de conclusiones y regla de oro |
| 68-69 | Inicio de referencias y recursos citados |

**Comprobación final:** 69 de 69 páginas analizadas. Se han incorporado los ejemplos originales y las diferencias de sus diagramas; se añade una composición de código didáctica, identificada, y cinco ejercicios de repaso. Se conservan las advertencias y comparaciones. No quedan figuras sin interpretar en sus relaciones principales; las erratas, los fragmentos parciales y las simplificaciones se han identificado en cada tema y en la tabla de advertencias.
