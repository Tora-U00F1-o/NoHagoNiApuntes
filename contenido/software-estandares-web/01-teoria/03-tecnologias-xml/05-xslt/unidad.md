---
asignatura: Software y Estándares para la Web
titulo: XSLT
resumen: Transformación de XML con hojas XSLT.
fuente: 05-XSLT.pdf
---

# XSLT

## Contenido

1. [Introducción y objetivos](#introduccion-y-objetivos)
2. [XSL, CSS y el proceso de transformación](#xsl-css-y-el-proceso-de-transformacion)
3. [Estructura de la hoja y reglas](#estructura-de-la-hoja-y-reglas)
4. [Primeros ejemplos: el poema](#primeros-ejemplos-el-poema)
5. [Iteración, delegación y ordenación](#iteracion-delegacion-y-ordenacion)
6. [Condiciones: if y choose](#condiciones-if-y-choose)
7. [Construcción de elementos y atributos](#construccion-de-elementos-y-atributos)
8. [Variables y parámetros](#variables-y-parametros)
9. [Informes de artículos de revista](#informes-de-articulos-de-revista)
10. [Recetas y menús](#recetas-y-menus)
11. [Ejercicios propuestos: HTML, KML y SVG](#ejercicios-propuestos-html-kml-y-svg)
12. [Preguntas de repaso](#preguntas-de-repaso)
13. [Resumen final](#resumen-final)
14. [Referencias y cobertura](#referencias-y-cobertura)

## Introducción y objetivos

**XSLT**, *Extensible Stylesheet Language Transformations*, transforma documentos XML en otros documentos. XML expresa datos y estructura, pero no impone una presentación visual: XSLT permite construir una estructura de salida adecuada para otra aplicación o para una presentación legible.

El PDF cita **XSLT 3.0, recomendación del W3C de 08/06/2017**. Sin embargo, la mayor parte de sus hojas de ejemplo declaran **`version="1.0"`**. La fecha de la recomendación y la versión del código se conservan diferenciadas: los ejemplos no pretenden recorrer todas las funciones de XSLT 3.0.

Se debe comprender el papel de XPath, plantillas y nodo de contexto; construir salidas con iteraciones y condiciones; y reconocer qué diferencias hay entre transformar, dar estilo y validar.

## XSL, CSS y el proceso de transformación

### Familia XSL

| Tecnología | Responsabilidad |
|---|---|
| XSLT | Convertir la estructura de entrada en otra, por ejemplo XML o HTML |
| XSL-FO | Especificar objetos de formateo, utilizados principalmente para generar PDF |
| XPath | Seleccionar partes del documento con una sintaxis no basada en XML |

El documento compara **XML + CSS**, que aplica presentación, con **XML + XSL**, que puede transformar la estructura además de contribuir al proceso de publicación. CSS no proporciona las capacidades de transformación que se estudian aquí. La tabla de la página 7 presenta CSS para HTML/XML y XSL para XML; esta clasificación describe el uso directo de la tabla, aunque el resultado de una transformación puede ser HTML.

### Entrada, reglas y salida

El procesador recibe un documento XML y una hoja XSLT. Las plantillas seleccionan partes del árbol mediante patrones y utilizan XPath para obtener valores y recorrer nodos. La salida puede ser HTML, XML o texto; para PDF, el diagrama de la página 14 introduce una fase de formateo **XSL-FO**, por lo que no se trata de un simple `method="pdf"`.

::: proceso
XML de datos + hoja XSLT → Procesador XSLT → Árbol resultado → Serialización o formateo de salida
:::

Los diagramas de las páginas 94–95 muestran un mismo XML convertido en tabla, gráfico o presentación, y adaptado a diferentes dispositivos o sistemas. El contenido de origen se conserva como fuente compartida; cambian las reglas de transformación y el formato de consumo.

::: aviso Capturas de navegador y alcance histórico
La página 9 advierte de la retirada de soporte de transformaciones XSL en navegadores y propone herramientas de editores, como plugins de Notepad++. Otras diapositivas describen el comportamiento antiguo del navegador y muestran Internet Explorer. Se estudian como demostraciones del resultado, sin recomendar instalar navegadores antiguos ni afirmar aquí el soporte de cada navegador actual. La teoría se mantiene dentro del PDF, sin actualización externa.
:::

La asociación histórica se escribe `<?xml-stylesheet type="text/xsl" href="poema.xsl"?>`; para CSS se usa `text/css`. Esa instrucción no es la transformación: hace falta un procesador que la aplique.

**Advertencia conceptual:** la página 13 dice que lo no coincidente permanece sin modificación. No debe leerse como garantía de copia literal del XML: el resultado se construye mediante las plantillas que se ejecutan. El ejemplo que solo genera el título «Poema» demuestra que una hoja puede no emitir todos los datos de entrada.

[Ver introducción](05-XSLT.pdf#page=4) · [Ver familia XSL](05-XSLT.pdf#page=8) · [Ver proceso](05-XSLT.pdf#page=14).

## Estructura de la hoja y reglas

### Raíz y clases de elementos

```xml title="Estructura básica del PDF"
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html><body><h1>Poema</h1></body></html>
  </xsl:template>
</xsl:stylesheet>
```

`xsl:stylesheet` es la raíz. El namespace identifica instrucciones XSLT; `version` expresa la versión declarada por la hoja. El PDF distingue tres clases:

- **Elementos XSLT**, como `xsl:template`, interpretados por el procesador.
- **Elementos literales de resultado (LRE)**, como `html`, `p` o `table`, que se construyen en la salida.
- **Elementos de extensión**, específicos de implementaciones y excluidos de los ejercicios del material.

### Elementos de nivel superior y salida

Son hijos directos de la hoja: `output`, `template`, `include`, `import`, `strip-space`, `preserve-space`, `key`, `decimal-format`, `namespace-alias`, `attribute-set`, `variable` y `param`. El documento enumera sus nombres; solo desarrolla algunos. `variable` y `param` pueden ser también locales dentro de plantillas.

| Atributo de `xsl:output` | Función |
|---|---|
| `method` | Método `xml`, `html` o `text` |
| `encoding` | Codificación de caracteres de salida |
| `omit-xml-declaration` | Incluir u omitir la declaración XML |
| `indent` | Solicitar sangrado para salidas XML o HTML |

La página 36 explica `include` para incorporar plantillas externas, `strip-space` para eliminar nodos que solo contienen espacios antes de procesar y `preserve-space` para mantenerlos. Sangrar la salida y decidir qué texto de entrada se conserva son cuestiones diferentes.

### Plantillas y aplicación

Una plantilla reúne un **patrón de coincidencia** y la **acción que construye el resultado**. `match="/"` corresponde a la raíz del documento; `match="poema"`, al elemento poema. Una plantilla con `name` puede invocarse de forma explícita con `call-template`.

**`xsl:apply-templates`** indica al procesador que busque reglas para los nodos seleccionados. Con `select` se limita ese conjunto mediante XPath. Esto permite repartir el tratamiento entre plantillas y recorrer el árbol de forma recursiva.

| Instrucción | Trabajo principal |
|---|---|
| `xsl:template match="..."` | Definir qué hacer al tratar nodos que coinciden |
| `xsl:apply-templates select="..."` | Delegar los nodos seleccionados en las reglas correspondientes |
| `xsl:value-of select="..."` | Emitir el valor seleccionado como texto |

[Ver estructura](05-XSLT.pdf#page=32) · [Ver salida](05-XSLT.pdf#page=35) · [Ver plantillas](05-XSLT.pdf#page=37).

## Primeros ejemplos: el poema

La progresión de las páginas 15–30 usa los mismos datos para introducir operaciones de una en una:

| Hoja local | Qué incorpora |
|---|---|
| [poema.xsl](05-Ejemplos/poema.xsl) | HTML fijo con el encabezado «Poema» |
| [poemaAutorLugarFecha.xsl](05-Ejemplos/poemaAutorLugarFecha.xsl) | Valores de `@autor`, `@fecha`, `@lugar` |
| [poemaTitulo.xsl](05-Ejemplos/poemaTitulo.xsl) | Texto del hijo `titulo` |
| [poemaTituloFechaLugar.xsl](05-Ejemplos/poemaTituloFechaLugar.xsl) | Título y atributos |
| [poemaCompleto.xsl](05-Ejemplos/poemaCompleto.xsl) | Añade todos los versos mediante iteración |

**Origen:** archivo original [poemaCompleto.xsl](05-Ejemplos/poemaCompleto.xsl).

```xml title="poemaCompleto.xsl"
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html"/>

<xsl:template match="poema">
<html>
 <body>
  <p>Autor : <xsl:value-of select="@autor"/></p>
  <p>Fecha : <xsl:value-of select="@fecha"/></p>
  <p>Lugar : <xsl:value-of select="@lugar"/></p>
  <p>Título: <xsl:value-of select="titulo"/></p>
  <p>Versos:</p>
  <xsl:for-each select="verso">
    <p><xsl:value-of select="."/></p>
  </xsl:for-each>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>
```

Cuando se ejecuta la plantilla de `poema`, las expresiones `@autor` y `titulo` parten de ese elemento. Dentro de `for-each select="verso"`, el contexto pasa a ser cada verso y **`.`** expresa el verso actual. Se genera un párrafo por verso.

Los XML correspondientes son [alba.xml](05-Ejemplos/alba.xml), [alba-atributos.xml](05-Ejemplos/alba-atributos.xml), [alba-titulo.xml](05-Ejemplos/alba-titulo.xml), [alba-titulo-fecha-lugar.xml](05-Ejemplos/alba-titulo-fecha-lugar.xml) y [alba-completo.xml](05-Ejemplos/alba-completo.xml). La fecha **abril de 1915** pertenece al poema del ejemplo, no al estándar XSLT.

La página 23 añade `miCurso/curso`: `value-of select="curso"` coloca el nombre del máster dentro de un párrafo HTML. La página 40 transforma etiquetas `bold`, `red` e `italic` en párrafos con formato. Ambos demuestran que las marcas del vocabulario de entrada pueden convertirse en otras distintas.

**Erratas del original:** aparecen comillas tipográficas, un `br` sin cierre XML y el nombre `poemaCompleto.xls` en títulos de diapositiva. Las hojas locales usan `.xsl`; se enlazan con su nombre real y los bloques reproducen sus archivos, sin corregir silenciosamente los documentos proporcionados.

[Ver atributos y texto](05-XSLT.pdf#page=20) · [Ver poema completo](05-XSLT.pdf#page=29).

## Iteración, delegación y ordenación

### Catálogo de música

El [XML musica.xml](05-Ejemplos/musica.xml) agrupa `cd` con título, artista, país, compañía, precio y año. La [hoja musica.xsl](05-Ejemplos/musica.xsl) genera una tabla: una fila de cabecera y una fila por CD con `for-each select="catalogo/cd"`.

```xml title="Núcleo de la tabla del PDF"
<xsl:for-each select="catalogo/cd">
  <tr>
    <td><xsl:value-of select="title"/></td>
    <td><xsl:value-of select="artist"/></td>
    <td><xsl:value-of select="country"/></td>
    <td><xsl:value-of select="company"/></td>
    <td><xsl:value-of select="price"/></td>
    <td><xsl:value-of select="year"/></td>
  </tr>
</xsl:for-each>
```

El contexto cambia a cada CD, por lo que sus campos se seleccionan sin repetir `catalogo/cd`. Este fragmento pertenece al cuerpo de la plantilla raíz, no es una hoja completa aislada.

### Delegar con apply-templates

La [hoja musica-apply.xsl](05-Ejemplos/musica-apply.xsl) y su [XML](05-Ejemplos/musica-apply.xml) generan una lista. La plantilla raíz crea la estructura; la de `cd` crea un `li` y aplica plantillas a `title` y `artist`; cada plantilla de campo emite su etiqueta textual y valor. La captura de la página 45 muestra un elemento de lista por CD con esos dos campos.

Esta solución reparte el tratamiento entre reglas, mientras que `for-each` escribe la salida de cada fila directamente dentro del bucle.

### Ordenar con sort

`xsl:sort` ordena los nodos antes de procesarlos, dentro de `for-each` o `apply-templates`. `select` obtiene la clave; `data-type` distingue texto y número; `order` admite `ascending` y `descending`.

El ejemplo de amigos ordena Alicia, Carlos, Jaime, Juan y Marta. El catálogo [musica-sort.xsl](05-Ejemplos/musica-sort.xsl), aplicado a [musica-sort.xml](05-Ejemplos/musica-sort.xml), ordena por artista:

```xml title="Ordenación del original"
<xsl:for-each select="catalogo/cd">
  <xsl:sort order="ascending" select="artist"/>
  <!-- Aquí se construye la fila del CD -->
</xsl:for-each>
```

**Advertencia:** la página 47 imprime `data-Type`; la grafía usada en las explicaciones de sintaxis es `data-type`. Las hojas que solo indican año sin tipo numérico deben estudiarse según su código, sin asumir un criterio que no han declarado.

[Ver delegación](05-XSLT.pdf#page=41) · [Ver sort](05-XSLT.pdf#page=47) · [Ver iteración](05-XSLT.pdf#page=54).

## Condiciones: if y choose

**`xsl:if test="..."`** genera su contenido solo si la condición se cumple. No tiene rama `else`. El material utiliza comparaciones, `not`, `position` y `last`.

```xml title="Separadores sin coma final" origen="Ejemplo de p. 62"
<xsl:for-each select="entry">
  <xsl:value-of select="@name"/>
  <xsl:if test="not(position()=last())">
    <xsl:text>, </xsl:text>
  </xsl:if>
</xsl:for-each>
```

La condición añade separador salvo en la última entrada: la salida es A, B, C, D. La variante anterior de la página 55 dejaba también una coma tras D. Este contraste explica para qué se introduce el condicional.

La [hoja musica-if.xsl](05-Ejemplos/musica-if.xsl) filtra los CD con `year &gt; 1990` y los ordena por año; se aplica a [musica-if.xml](05-Ejemplos/musica-if.xml). En XML, las comparaciones dentro de atributos deben respetar el escapado de caracteres de marcado.

**`xsl:choose`** selecciona entre casos `when test="..."` y una alternativa `otherwise`. El ejemplo de SECTION utiliza SUMMARY si existe; en caso contrario recorre DATA. El catálogo de las páginas 69–72 destaca con asteriscos los artistas cuyo precio supera 10:

```xml title="Selección del catálogo" origen="Fragmento de musica-choose.xsl"
<xsl:choose>
  <xsl:when test="price &gt; 10">
    <td>*** <xsl:value-of select="artist"/> ***</td>
  </xsl:when>
  <xsl:otherwise>
    <td><xsl:value-of select="artist"/></td>
  </xsl:otherwise>
</xsl:choose>
```

La [hoja completa](05-Ejemplos/musica-choose.xsl) conserva la tabla, ordenación y ambos casos; su [XML](05-Ejemplos/musica-choose.xml) contiene el catálogo. La condición decide la representación de una celda: no elimina todos los discos baratos, a diferencia del filtro con `if` que sí omite filas.

[Ver if](05-XSLT.pdf#page=61) · [Ver choose](05-XSLT.pdf#page=67).

## Construcción de elementos y atributos

Los elementos literales tienen nombre conocido al redactar la hoja. Cuando hay que construir nombres o atributos se usan **`xsl:element`** y **`xsl:attribute`**. Las **AVT, Attribute Value Templates**, evalúan expresiones entre llaves en valores de atributos; para escribir llaves literales el PDF indica duplicarlas.

**Origen:** archivo original [elementos2atributos.xsl](05-Ejemplos/elementos2atributos.xsl).

```xml title="elementos2atributos.xsl"
<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >

<xsl:output method="xml" indent="yes"/>

<xsl:template match="//verso">
   <xsl:element name="elemento">
      <xsl:attribute name="{name()}">
         <xsl:value-of select="."/>
      </xsl:attribute>
   </xsl:element>
</xsl:template>

</xsl:stylesheet>
```

Cada `verso` de [elementos2atributos.xml](05-Ejemplos/elementos2atributos.xml) produce un `elemento` con un atributo. `name()` obtiene el nombre del nodo actual, y `value-of select="."` proporciona su valor. Así el primer resultado es `<elemento verso="verso1"/>`.

**Alcance del resultado:** la página 77 muestra cinco elementos hermanos, sin una raíz común. Ese resultado ilustra la construcción de nodos, pero no es por sí solo un documento XML completo bien formado. La hoja original se conserva y se explica esa limitación, en lugar de presentarla como una conversión que garantiza raíz única.

[Ver construcción](05-XSLT.pdf#page=74).

## Variables y parámetros

### Variables

Una variable se declara con `xsl:variable name="..." select="..."` o mediante contenido. Se consulta con **`$nombre`**. Su valor no se reasigna como una variable imperativa. En nivel superior tiene alcance global; dentro de una plantilla, local. El documento señala que los valores locales no se conservan entre invocaciones de la plantilla.

La [hoja musica-var.xsl](05-Ejemplos/musica-var.xsl), con [musica-var.xml](05-Ejemplos/musica-var.xml), recorre los precios:

```xml title="Variable local del ejemplo"
<xsl:for-each select="catalogo/cd/price">
  <xsl:variable name="precio" select="."/>
  <p><xsl:value-of select="$precio"/></p>
</xsl:for-each>
```

La página 80 dice que el valor «cambia» dentro del bucle. **Explicación didáctica:** cada iteración evalúa su declaración con un nodo de contexto diferente; no se está mostrando una reasignación de una misma variable. La página 82 contiene un cierre prematuro del `for-each`; el archivo completo expresa el anidamiento utilizado aquí.

### Parámetros

`xsl:param` declara un parámetro global o local y su valor predeterminado. Se referencia también con `$`. `xsl:with-param` proporciona argumentos dentro de `apply-templates` o `call-template`, con nombre correspondiente al parámetro de destino.

**Origen:** archivo original [musica-par.xsl](05-Ejemplos/musica-par.xsl).

```xml title="musica-par.xsl"
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

 <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />

 <xsl:param name="ordenadoPor" select="'artist'"/>
 <xsl:param name="orden" select="'ascending'"/>

<xsl:template match="/">
<html>
<body>
<h1>Mi catálogo de CD's</h1>
<h2>Listado de artistas ordenado</h2>

  <xsl:for-each select="catalogo/cd">
    <xsl:sort select = "*[name()=$ordenadoPor]" order="{$orden}"/>
	<p><xsl:value-of select="*[name()=$ordenadoPor]"/></p>
  </xsl:for-each>

  </body>
  </html>
</xsl:template>

</xsl:stylesheet>
```

El ejemplo de [musica-par.xml](05-Ejemplos/musica-par.xml) usa `ordenadoPor='artist'` y `orden='ascending'`. La expresión `*[name()=$ordenadoPor]` obtiene el hijo cuyo nombre coincide con el parámetro. En `order="{$orden}"`, la AVT coloca el valor del parámetro en el atributo de ordenación. Las comillas interiores de `select="'artist'"` expresan un literal textual; no se está seleccionando un elemento llamado artist en ese punto.

[Ver variables](05-XSLT.pdf#page=80) · [Ver parámetros](05-XSLT.pdf#page=86).

## Informes de artículos de revista

Las páginas 104–132 piden transformar XML válido con Schema en **HTML5 y CSS**, comprobar ambos estándares y mostrar toda la información de los artículos seleccionados. Cada artículo conserva título, año, revista, volumen, páginas, autores/correo, palabras clave y resumen.

### Informe completo y presentación

La [hoja articulos.xsl](05-Ejemplos/articulos-1/articulos.xsl), el [XML](05-Ejemplos/articulos-1/articulos.xml), la [CSS](05-Ejemplos/articulos-1/style.css) y el [HTML generado original](05-Ejemplos/articulos-1/generado.html) permiten seguir el proceso completo.

La plantilla de `articles` crea cabecera, `main`, una sección por artículo y pie. `value-of` extrae datos; los bucles de autores y palabras clave conservan multiplicidad; la condición de palabras clave evita un grupo sin contenido; `position/last` controla sus separadores.

La CSS de las páginas 109–112 usa fondo degradado, tarjetas blancas con texto negro y sombra, títulos centrados con borde inferior, rótulos en negrita, correos en cursiva y área de validaciones con `inline-flex`. Son reglas de presentación independientes del XML original. La captura 114 permite comparar esa vista con el código generado de la página 113.

**Advertencias del original:** las hojas incluyen distintivos de validación y accesibilidad en el pie. Incluir esas imágenes no demuestra por sí mismo haber superado las comprobaciones: el propio enunciado exige validar el resultado. También hay archivos XSL con espacio previo a la declaración XML; se conservan como recibidos y se debe revisar su sintaxis si el procesador los rechaza.

### Últimos cinco años

La [hoja articulos2.xsl](05-Ejemplos/articulos-2/articulos2.xsl) define `years=5` y filtra con:

```xml title="Condición original de la página 116"
<xsl:if test="2017-@year &lt; $years">
  <!-- Sección del artículo -->
</xsl:if>
```

**2017 es una constante del ejemplo**. El código no obtiene automáticamente el año actual y no impone por separado que el artículo no sea futuro. Además, el fragmento de solución no incluye `xsl:sort`, aunque el enunciado pide orden por fecha. Se conserva esta diferencia para que se pueda revisar frente a lo solicitado. Véanse también su [XML](05-Ejemplos/articulos-2/articulos2.xml) y [CSS](05-Ejemplos/articulos-2/style.css).

### Intervalo de fechas

La [hoja articulos3.xsl](05-Ejemplos/articulos-3/articulos3.xsl) fija `since-year=2010`, `until-year=2015`, orden descendente y la condición `$since-year &lt; @year and @year &lt;= $until-year`.

El límite inicial es **exclusivo** y el final **inclusivo**: según la condición, se seleccionan años posteriores a 2010 y hasta 2015, no todo lo que intuitivamente pueda entenderse por «entre 2010 y 2015». Su [XML](05-Ejemplos/articulos-3/articulos.xml) y [CSS](05-Ejemplos/articulos-3/style.css) conservan el caso resuelto.

### Autor concreto

La [hoja articulos4.xsl](05-Ejemplos/articulos-4/articulos4.xsl) define el texto del autor, ordena ascendentemente por año y usa `contains(authors,$author)`. El [XML](05-Ejemplos/articulos-4/articulos.xml) y [CSS](05-Ejemplos/articulos-4/style.css) muestran los datos y la vista.

**Explicación didáctica:** `contains` comprueba una subcadena dentro del texto de autores. No equivale a comprobar igualdad exacta con un único elemento `author`; la restricción real es la que expresa la hoja.

[Ver informe completo](05-XSLT.pdf#page=104) · [Ver cinco años](05-XSLT.pdf#page=115) · [Ver intervalo](05-XSLT.pdf#page=121) · [Ver autor](05-XSLT.pdf#page=127).

## Recetas y menús

Los ejercicios V–VIII conservan nombre, tipo, ingredientes/cantidades/calorías opcionales, pasos, dificultad, tiempo, utensilios y origen. Las diapositivas 134, 136, 138 y 140 remiten al paquete adjunto; los archivos ya están extraídos en esta unidad.

| Caso | Archivos originales | Selección |
|---|---|---|
| Todas las recetas | [recetas5.xsl](05-Ejemplos/recetas-5/recetas5.xsl), [XML](05-Ejemplos/recetas-5/recetas.xml), [CSS](05-Ejemplos/recetas-5/style.css) | Mostrar toda la colección |
| Menú con pollo | [recetas6.xsl](05-Ejemplos/recetas-6/recetas6.xsl), [XML](05-Ejemplos/recetas-6/recetas.xml), [CSS](05-Ejemplos/recetas-6/style.css) | Filtrar por presencia textual de pollo |
| Sin leche ni queso | [recetas7.xsl](05-Ejemplos/recetas-7/recetas7.xsl), [XML](05-Ejemplos/recetas-7/recetas.xml), [CSS](05-Ejemplos/recetas-7/style.css) | Excluir recetas según las condiciones de sus ingredientes |
| Vegano | [recetas8.xsl](05-Ejemplos/recetas-8/recetas8.xsl), [XML](05-Ejemplos/recetas-8/recetas.xml), [CSS](05-Ejemplos/recetas-8/style.css) | Seleccionar el atributo de condición vegana |

Las vistas mantienen la estructura de información de la receta y cambian el conjunto de secciones emitidas. Los casos sin leche/queso y vegano piden **al menos dos entrantes, dos primeros platos, dos segundos y un postre**. Filtrar datos no demuestra que la colección contenga por sí sola esa cantidad: es necesario contrastar el resultado con el requisito.

Las comparaciones textuales dependen de las grafías de los datos, incluidas sus mayúsculas. Estos ejercicios son de transformación documental: se deben estudiar sus condiciones de selección sin atribuir a la hoja comprobaciones que no expresa.

[Ver recetas y menú con pollo](05-XSLT.pdf#page=133) · [Ver exclusión y menú vegano](05-XSLT.pdf#page=137).

## Ejercicios propuestos: HTML, KML y SVG

Para **cinco monumentos prerrománicos**, las páginas 142–143 piden XML válido con Schema y transformación a HTML5/CSS que muestre toda la información: identificación, descripción, estado, lugar, coordenadas, galerías, recomendación, visita y referencias. La presentación es libre; la fidelidad de los datos y la validación son requisitos.

Para **al menos cinco rutas**, las páginas 144–145 añaden la misma transformación a HTML5/CSS sobre nombre, tipo, transporte, inicio opcional, duración, agencia, público, lugar inicial, referencias y valoración. Se conservan al menos tres hitos por ruta, cada uno con coordenadas, distancia con unidades, una a cinco fotos y cero a tres vídeos.

La página 146 pide un **KML del plano de las rutas**, probado con herramientas como Google Earth. La 147 pide un **SVG del perfil altimétrico**, comprobado con distintos agentes de usuario. La figura del KML sitúa un recorrido sobre un mapa; la del SVG representa alturas como perfil. Son salidas diferentes a partir de datos relacionados, no dos vistas equivalentes del mismo tipo de coordenadas.

**Procedimiento didáctico:** validar primero la entrada, diseñar la estructura del resultado, decidir qué nodos se recorren y con qué contexto, construir los datos obligatorios, aplicar presentación cuando corresponda y comprobar tanto el formato como que no falta información del enunciado.

## Preguntas de repaso

::: pregunta ¿Qué diferencia hay entre match y select?
match identifica el patrón de nodos para el que una plantilla define una acción. select, en las instrucciones estudiadas, evalúa XPath para obtener valores o el conjunto de nodos que se procesará. Su contexto depende de dónde se ejecuta la instrucción.
:::

::: pregunta ¿Por qué for-each select="verso" puede usar value-of select="."?
Porque en cada iteración el nodo actual es el verso seleccionado. El punto representa ese contexto y su valor se coloca en el párrafo construido por la hoja.
:::

1. Explica XSLT, XSL-FO y XPath con el proceso de publicación del PDF.
2. Compara `apply-templates`, `for-each` y `value-of`.
3. Justifica la condición que evita la coma final.
4. Explica el papel de las llaves en `order="{$orden}"`.
5. Distingue variable global, variable local y parámetro.
6. Señala qué limitaciones tiene el filtro de los últimos cinco años original.
7. Explica los límites del intervalo de años y la selección por autor.
8. Razona por qué el ejemplo elementos2atributos no garantiza un documento XML con raíz única.

## Resumen final

XSLT construye un resultado a partir de datos XML y reglas de plantilla. XPath determina qué se selecciona y el contexto explica cómo se interpretan las rutas. Iteraciones, ordenación, condiciones, construcción de atributos y parámetros permiten generar informes y salidas diferentes. La transformación no sustituye a la validación de entrada o salida, y los ejemplos originales deben interpretarse según sus filtros, fechas y versiones concretas.

## Referencias y cobertura

- [Documento original](05-XSLT.pdf): **148 páginas analizadas**, incluidos procesos XML/XSL-FO, capturas de resultados, informes y propuestas geográficas.
- Cobertura: introducción (4–9), transformaciones/poema (11–30), estructura/plantillas (32–45), valores/ordenación (46–52), iteración (54–59), condiciones (61–72), construcción (74–78), variables/parámetros (80–91), conclusiones/diagramas (93–95), bibliografía/referencias (97–102), ejercicios (104–147).
- Se incorporan hojas del poema, música, elementos a atributos, artículos y recetas mediante código y enlaces a archivos exactos. Se diferencian código original, explicaciones didácticas y limitaciones de fragmentos; las capturas históricas no se utilizan para afirmar soporte actual del navegador.
- Bibliografía: *XML imprescindible*, Harold/Means, 2005; *Beginning XML*, Fawcett/Quin/Ayers, 2012; *XSLT 2.0 and XPath 2.0 Programmer’s Reference*, cuarta edición, Michael Kay, Wrox, 2008.
- Recursos citados: [XSLT 3.0](https://www.w3.org/TR/xslt-30/), [transformaciones W3C](http://www.w3.org/standards/xml/transformation), [introducción XSLT 3](http://www.stylusstudio.com/tutorials/intro-xslt-3.html), [ejemplo Google Earth](http://www.stylusstudio.com/tutorials/mapping-google-earth-in-xslt.html), [preguntas XSLT 3](https://stackoverflow.com/questions/tagged/xslt-3.0), [tutorial XSL](http://www.w3schools.com/xsl/) y [ejemplos del PDF](http://www.aviation-ia.com/aeec/projects/aoc/XSLT_Examples.pdf). No se han consultado para ampliar la teoría.
