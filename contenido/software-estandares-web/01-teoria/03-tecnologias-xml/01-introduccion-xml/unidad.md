---
asignatura: Software y Estándares para la Web
titulo: Introducción a XML
resumen: Estructura de un documento XML bien formado.
fuente: 01-Introducción-XML.pdf
---

# Introducción a XML

## Contenido

1. [Introducción y objetivos](#introduccion-y-objetivos)
2. [Del marcado de presentación a los datos](#del-marcado-de-presentacion-a-los-datos)
3. [Documento, estructura y árbol DOM](#documento-estructura-y-arbol-dom)
4. [Vocabularios derivados de XML](#vocabularios-derivados-de-xml)
5. [Partes y sintaxis de un documento XML](#partes-y-sintaxis-de-un-documento-xml)
6. [Buena formación y validez](#buena-formacion-y-validez)
7. [Ventajas y limitaciones](#ventajas-y-limitaciones)
8. [Ejercicios resueltos y propuestos](#ejercicios-resueltos-y-propuestos)
9. [Preguntas de repaso](#preguntas-de-repaso)
10. [Resumen final](#resumen-final)
11. [Referencias y cobertura](#referencias-y-cobertura)

## Introducción y objetivos

**XML, eXtensible Markup Language**, permite describir datos con una estructura jerárquica y un vocabulario propio de la aplicación. La idea central del PDF es separar **contenido y estructura** de la **presentación**. A partir de esta separación se estudian documentos, árboles DOM, vocabularios derivados y las condiciones de buena formación y validez.

Se debe aprender a leer y escribir documentos, identificar qué información está en elementos o atributos, interpretar un árbol y reconocer cuándo hace falta comprobar una gramática. Los ejemplos originales están en `01-Ejemplos`; se enlazan junto a sus explicaciones.

## Del marcado de presentación a los datos

Las páginas 4–11 recorren HTML, XHTML, CSS, SGML y XML. Las figuras de la pizzería Al Capone muestran primero información mezclada con colores y tipografías en HTML; después, la separación de CSS en una hoja reutilizable. Compartir una hoja conserva la apariencia entre páginas, pero **la apariencia no explica por sí sola el significado de los datos**: de ahí la necesidad de marcas de aplicación.

SGML procede de IBM GML de la década de 1960, se normaliza mediante **ISO 8879:1986** y permite definir vocabularios y gramáticas mediante DTD. El PDF destaca su generalidad y su dificultad para adoptarlo en la Web. XML se presenta como su simplificación, desarrollada por el consorcio Web desde **1995**, abierta e independiente de plataforma.

XHTML se define como HTML expresado como XML válido. El documento cita **XHTML 1.0, 26/01/2000**, y **XHTML 1.1, 31/05/2001**; menciona HTML5 (2008), HTML 5.1 (2016), HTML 5.2 (2017) y una referencia al Living Standard de **15/09/2026**. Son las fechas del material, con funciones distintas: no todas representan recomendaciones equivalentes. Para XML 1.1, el PDF recoge **29/09/2006**.

::: aviso Formulaciones del material que requieren cautela
La página 8 generaliza la relación HTML/XML mientras está explicando XHTML. La página 10 clasifica XML como lenguaje regular de tipo 3. Se conservan aquí como formulaciones de las diapositivas, sin utilizarlas para concluir que cualquier HTML pueda procesarse directamente como XML ni para sustituir las reglas de anidamiento que el propio PDF exige. El propósito de estos apuntes es estudiar el contenido de la fuente, no resolver esas generalizaciones mediante teoría externa.
:::

**Metalenguaje** significa lenguaje para definir lenguajes: XML no fija de antemano etiquetas para pizzas, poemas o libros. Las aplicaciones acuerdan un vocabulario y pueden describirlo mediante **DTD**, breve pero limitada para tipos y rangos, o mediante **XML Schema**, escrito en XML y más expresivo, aunque más extenso.

[Ver evolución y comparación](01-Introducci%C3%B3n-XML.pdf#page=8) · [Ver XML y validación](01-Introducci%C3%B3n-XML.pdf#page=11).

## Documento, estructura y árbol DOM

Un documento XML es información jerarquizada en texto, representable mediante un **árbol n-ario** y almacenada en uno o varios archivos. Puede entenderse como **datos + marcado**. El esquema de la página 13 separa contenido, árbol DOM y presentación: cambiar cómo se dibuja la información no equivale a cambiar su organización.

XML permite manipular datos e intercambiarlos entre sistemas. El PDF cita servicios web y APIs para JavaScript, Python, Java, C#, C, C++ y PHP. Su analogía es que XML aporta **datos portables**, de modo parecido a la portabilidad de código que atribuye a Java.

El mapa conceptual de la página 15 conecta XML con vocabularios, validación, consultas, transformaciones, documentos y APIs de procesamiento. DTD/Schema describen documentos; XPath identifica partes; XSLT transforma; DOM y SAX son formas de procesarlos. El mapa presenta estas relaciones, no un único proceso obligatorio.

### Pizzas: modelar con atributos

Las páginas 16–23 representan `pizzas` como raíz, con hijos `pizza` y nietos `ingrediente`. Los nombres y precios se guardan en atributos; los ingredientes son elementos vacíos con un atributo `nombre`.

```xml title="Fragmento de pizzas.xml" origen="Archivo original, fragmento"
<pizza nombre="Barbacoa" precio="8,0€">
  <ingrediente nombre="Salsa Barbacoa"/>
  <ingrediente nombre="Mozzarella"/>
  <ingrediente nombre="Tocineta"/>
  <ingrediente nombre="Ternera"/>
</pizza>
```

El árbol distingue una pizza de sus ingredientes; los atributos aportan datos asociados a cada elemento. El fragmento pertenece al [archivo original completo](01-Ejemplos/pizzas.xml), que contiene tres pizzas, y se acompaña de [pizzas.dtd](01-Ejemplos/pizzas.dtd) y de su [árbol SVG](01-Ejemplos/pizzas.svg).

**Advertencia del original:** el archivo declara `standalone="yes"` y enlaza una DTD externa. Conviene distinguir esta combinación de la explicación de independencia de fuentes externas de la página 62; no se ha modificado el archivo proporcionado.

### Poema: texto en elementos y metadatos en atributos

En `alba.xml`, los atributos de `poema` expresan autor, fecha y lugar; `titulo` y los elementos repetidos `verso` contienen texto. Modelar un dato como atributo o elemento produce **árboles diferentes**, que es la comparación de la página 24.

**Origen:** archivo original [poema.dtd](01-Ejemplos/poema.dtd).

```dtd title="poema.dtd"
<!ELEMENT poema (titulo,verso+)>
<!ELEMENT titulo (#PCDATA)>
<!ELEMENT verso (#PCDATA)>
<!ATTLIST poema
    autor CDATA #REQUIRED
	fecha CDATA #REQUIRED
	lugar CDATA #IMPLIED>
```

La DTD exige un título seguido de uno o más versos. `autor` y `fecha` son obligatorios; `lugar` es opcional. El [XML del poema](01-Ejemplos/alba.xml) y el [árbol original](01-Ejemplos/alba.svg) permiten observar cómo los versos aparecen como hermanos bajo `poema`.

**Errata de la diapositiva 26:** allí aparece `título`, mientras que el XML de la página 25 y el archivo DTD adjunto usan `titulo`. En XML los nombres deben coincidir exactamente; esta diferencia importa al validar.

### Libros: repetición y opcionalidad

El [ejemplo libros.xml](01-Ejemplos/libros.xml) introduce uno o más libros, títulos, uno o varios autores, año opcional, precio con moneda, editorial, clasificación e idioma. La [DTD](01-Ejemplos/libros.dtd) contiene el modelo:

```dtd title="Modelo de libro" origen="Archivo original, fragmento"
<!ELEMENT libro (título, autor+, año?, precio, editorial, clasificación, idioma)>
```

`autor+` permite varios autores; `año?` permite omitir el año; las comas establecen el orden. El [árbol de libros](01-Ejemplos/libros.svg) muestra estas repeticiones. El documento contrapone los atributos de pizzas al texto y las estructuras de poemas y libros.

### Visualizar árboles con xml2svg

Las páginas 18–22 muestran una herramienta de línea de comandos que toma un XML y genera un SVG de su estructura:

```text title="Comando mostrado en las capturas"
xml2svg.exe pizzas.xml pizzas.svg
```

En Linux y macOS se ilustra su uso mediante `mono`. Si el XML enlaza DTD o Schema, la presentación indica conservar esos archivos en la misma carpeta. La figura SVG permite seguir padre, hijos y atributos; no es el aspecto final de los datos en una aplicación. El ejecutable original está en [xml2svg.exe](01-Ejemplos/xml2svg.exe); estos apuntes no requieren ejecutarlo para consultar los SVG existentes.

[Ver pizzas y DTD](01-Introducci%C3%B3n-XML.pdf#page=16) · [Ver poema](01-Introducci%C3%B3n-XML.pdf#page=25) · [Ver libros](01-Introducci%C3%B3n-XML.pdf#page=28).

## Vocabularios derivados de XML

La página 33 enumera vocabularios de dominios distintos:

| Aplicación | Vocabularios citados |
|---|---|
| Matemáticas | MathML, OpenMath |
| Gráficos y representación espacial | SVG, X3D, VRML, 3DXML |
| Multimedia, voz y subtítulos | SMIL, VoiceXML, TTML |
| Privacidad y seguridad | P3P, XML Signature, XKMS |
| Documentos y publicación | ePub, Office Open XML |
| Interfaces y modelos | XAML, XMI para metadatos UML |
| Consultas, negocios y contabilidad | XML Query, ebXML, XBRL |
| Dispositivos | SyncXML, UPnP; WML se marca como obsoleto |
| Información geográfica | KML, KMZ, GPX |

La lista se reproduce con el alcance de la diapositiva, que no desarrolla la sintaxis de cada tecnología. El PDF sí dedica ejemplos a **KML, SVG y WaterML**.

### KML y KMZ

**KML** sirve para mostrar datos geográficos en aplicaciones como Google Earth o Google Maps. Utiliza elementos anidados y atributos sobre sintaxis XML y se presenta como estándar del **Open Geospatial Consortium (OGC)**. **KMZ** es KML empaquetado mediante ZIP, por lo que el resultado es binario.

**Origen:** archivo original [Oviedo.kml](01-Ejemplos/Oviedo.kml).

```xml title="Oviedo.kml"
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document id='Universidad de Oviedo'>
<Placemark>
<name>Oviedo</name>
<description>Escuela de Ingeniería Informática</description>
<Point>
<coordinates>
-5.851256792487727,43.355098167157855
</coordinates>
<altitudeMode>relativeToGround</altitudeMode>
</Point>
</Placemark>
</Document>
</kml>
```

`Document` agrupa el contenido; `Placemark` describe la ubicación; `name` y `description` aportan información legible; `Point` contiene coordenadas. La captura de la página 37 localiza la Escuela de Ingeniería Informática de Oviedo; el árbol de la página 38 muestra la estructura del mismo documento. Se incluyen el [KMZ](01-Ejemplos/Oviedo.kmz) y el [árbol SVG](01-Ejemplos/Oviedo.svg).

**Explicación didáctica:** la declaración `xmlns` identifica un espacio de nombres. La anotación «Schema = Validación con una URI» de la página 36 no equivale por sí sola a una comprobación de validez: el documento desarrolla los mecanismos de validación por separado.

### SVG y gráficos vectoriales

**SVG** describe gráficos vectoriales bidimensionales con sintaxis XML. Las figuras de las páginas 41–42 contrastan curvas vectoriales con una retícula raster: la ampliación de un raster evidencia sus píxeles, mientras que el vector conserva la definición de la forma.

Fechas del PDF: SVG 1.0, **04/09/2001**; SVG 1.1, **14/01/2003**; SVG 1.1 segunda edición, **16/08/2011**; SVG 2.0 Candidate Recommendation, **04/10/2018**.

SVG admite **formas**, **imágenes** y **texto**. Los objetos se agrupan, reciben estilo, se transforman y se componen. El documento menciona transformaciones anidadas, trazados, máscaras, filtros, recortes, interacción y animación. La figura del sistema de coordenadas sitúa el origen arriba a la izquierda y muestra el avance horizontal y vertical de las posiciones.

Sus ventajas son edición como texto, búsqueda e indexación, ampliación y escalado sin pérdida de la definición vectorial, impresión a alta resolución y condición de estándar abierto. Se citan Inkscape, LibreOffice Draw, Adobe Illustrator, CorelDRAW, Gnuplot y Scribus como herramientas capaces de producir SVG.

**Origen:** archivo original [Rectangulo-circulo.svg](01-Ejemplos/Rectangulo-circulo.svg).

```xml title="Rectangulo-circulo.svg"
<?xml version="1.0" encoding="UTF-8" ?>
<svg xmlns="http://www.w3.org/2000/svg" version="2.0">
  <rect x="25" y="25" width="200" height="200" fill="lime" stroke-width="4" stroke="pink" />
  <circle cx="125" cy="125" r="75" fill="orange" />
  <polyline points="50,150 50,200 200,200 200,100" stroke="red" stroke-width="4" fill="none" />
  <line x1="50" y1="50" x2="200" y2="200" stroke="blue" stroke-width="4" />
</svg>
```

`rect` define un rectángulo por posición y tamaño; `circle`, un círculo por centro y radio; `polyline`, una sucesión de puntos; `line`, un segmento. `fill` determina el relleno y `stroke`/`stroke-width` el trazo. La superposición reproduce el dibujo de la diapositiva 52.

El ejemplo [circulo.html](01-Ejemplos/circulo.html) incrusta un SVG de 100 × 100 con un círculo amarillo y contorno azul. [polilinea.html](01-Ejemplos/polilinea.html) dibuja un perfil con puntos y trazo rojo. [polilinea-texto.svg](01-Ejemplos/polilinea-texto.svg) añade etiquetas verticales a ese perfil: Inicio, Monte Naranco, Lagos de Covadonga, Angliru, Les Praeres, Valgrande Pajares, mirador del Fitu y Final. No es un mapa geográfico; relaciona posiciones del perfil con texto.

La página 44 menciona una extensión comprimida escrita `.sgvz` y la asocia a ZIP. Se registra como formulación de la fuente; no se incluye un archivo con ese nombre entre los materiales locales ni se deducen instrucciones de compresión.

[Ver KML](01-Introducci%C3%B3n-XML.pdf#page=35) · [Ver SVG](01-Introducci%C3%B3n-XML.pdf#page=40) · [Ver ejemplos SVG](01-Introducci%C3%B3n-XML.pdf#page=48).

### WaterML

**WaterML**, del OGC, representa datos hidrológicos, especialmente **series temporales de fecha y valor**: precipitación, caudal, nivel piezométrico o temperatura del agua. Busca intercambiar información conservando su estructura y significado.

**Origen:** archivo original [Precipitacion_Anual_Clasificada_WaterML.xml](01-Ejemplos/Precipitacion_Anual_Clasificada_WaterML.xml).

```xml title="Precipitacion_Anual_Clasificada_WaterML.xml"
<?xml version="1.0" encoding="UTF-8"?>
<wml2:Collection xmlns:wml2="http://www.opengis.net/waterml/2.0" xmlns:gml="http://www.opengis.net/gml/3.2">
  <gml:description>Serie anual de precipitación clasificada para Pozo Barredo</gml:description>
  <wml2:observationMember>
    <wml2:MeasurementTimeseries>
      <wml2:point>
        <wml2:MeasurementTVP>
          <wml2:time>2024-09-30</wml2:time>
          <wml2:value>1464.3</wml2:value>
          <wml2:metadata>Inicio=2023-10-01; Fin=2024-09-30; Percentiles=Muy húmedo; Normalizado=Húmedo</wml2:metadata>
        </wml2:MeasurementTVP>
      </wml2:point>
      <wml2:point>
        <wml2:MeasurementTVP>
          <wml2:time>2025-09-30</wml2:time>
          <wml2:value>1279.3</wml2:value>
          <wml2:metadata>Inicio=2024-10-01; Fin=2025-09-30; Percentiles=Muy seco; Normalizado=Seco</wml2:metadata>
        </wml2:MeasurementTVP>
      </wml2:point>
    </wml2:MeasurementTimeseries>
  </wml2:observationMember>
</wml2:Collection>
```

En este ejemplo, `Collection` agrupa la serie; cada `point` contiene un `MeasurementTVP` con tiempo, valor y metadatos. Los registros de **30/09/2024** y **30/09/2025** son fechas de los datos del ejemplo, no fechas de publicación del estándar. La captura de la página 58 muestra precisamente este archivo.

[Ver WaterML](01-Introducci%C3%B3n-XML.pdf#page=57).

## Partes y sintaxis de un documento XML

### Prólogo, cuerpo y comentarios

El prólogo contiene la declaración XML y, cuando procede, la declaración de tipo de documento. El cuerpo contiene elementos, atributos, entidades predefinidas, instrucciones de procesamiento y secciones CDATA. Los comentarios pueden aparecer en el prólogo o en el cuerpo, pero no dentro de etiquetas, declaraciones u otros comentarios, y no deben contener `--`.

```xml title="Declaración y comentario" origen="Ejemplo didáctico"
<?xml version="1.0" encoding="UTF-8"?>
<!-- Un documento con una raíz -->
<documento>Contenido</documento>
```

En la declaración, **version** identifica la versión; **encoding** indica la codificación; **standalone** declara la independencia o dependencia de declaraciones externas. El PDF presenta XML 1.0 como la versión habitual, XML 1.1 como una ampliación del soporte Unicode y UTF-8 como codificación habitual, junto a UTF-16, US-ASCII e ISO-8859-1.

La DTD externa se enlaza, por ejemplo, con `<!DOCTYPE pizzas SYSTEM "pizzas.dtd">`. El nombre debe corresponder al elemento raíz. El PDF distingue identificadores de recursos URI, localizadores URL y nombres URN; proporciona `http://www.uniovi.es` y `urn:isbn:0-395-36341-1` como ejemplos. `SYSTEM` identifica un recurso del sistema y `PUBLIC` añade identificación pública; el formato concreto se desarrolla en DTDs.

### Elementos y atributos

Un elemento tiene etiqueta inicial, contenido y etiqueta final con el mismo nombre. Puede contener otros elementos. Un elemento vacío admite `<ingrediente/>` o una apertura y cierre sin contenido. XML **distingue mayúsculas y minúsculas** y exige cerrar las etiquetas.

Las convenciones de nombres que expone el PDF son comenzar por letra o `_`, no introducir espacios y distinguir nombres por sus caracteres exactos. Se dan como válidos `Estudiante`, `_Estudiante`, `Estudiante1234` y `Estudianteβ`; se rechazan el comienzo por dígito, el guion inicial y los espacios.

Los atributos se escriben en la etiqueta inicial. Sus valores van entre comillas simples o dobles; su orden no es significativo y no se repite el mismo nombre de atributo en un elemento. Se pueden emplear comillas de un tipo dentro de valores delimitados por el otro.

```xml title="Atributos" origen="Ejemplo didáctico"
<frase autor="Diego" texto="Diego dijo 'digo'"/>
```

Los atributos predefinidos citados son **xml:lang** para idioma, **xml:space** para tratar espacios (`preserve` o `default`) y **xml:base** para la base de las direcciones relativas. La página 70 ofrece variantes `en`, `en-GB`, `en-US` y `de`; para español escribe `sp`, que se conserva como literal del original y no se usa aquí como recomendación adicional.

### Entidades, procesamiento y CDATA

| Escritura XML | Carácter representado |
|---|---|
| `&amp;` | `&` |
| `&lt;` | `<` |
| `&gt;` | `>` |
| `&apos;` | Comilla simple |
| `&quot;` | Comilla doble |

Las referencias permiten escribir caracteres que de otro modo se interpretarían como delimitadores. La diapositiva 71 alude también a referencias numéricas Unicode, pero omite parte de su notación en el texto explicativo; no debe confundirse con los cinco nombres de la tabla.

Las **instrucciones de procesamiento** contienen indicaciones para aplicaciones, diferenciadas de los datos. La página 72 muestra la asociación con una hoja de estilo y advierte sobre su uso en el contexto del material:

```xml title="Instrucción del PDF"
<?xml-stylesheet type="text/xsl" href="MiHojaDeEstilo.xsl"?>
```

Las secciones **CDATA** facilitan incluir texto con caracteres especiales sin escaparlos como entidades. El PDF compara un fragmento de código escapado con su representación en CDATA.

```xml title="CDATA" origen="Ejemplo didáctico basado en p. 74"
<codigo><![CDATA[
if (x < 3 && x > 4) printf("Hola");
]]></codigo>
```

La condición conserva la del PDF: el ejemplo ilustra representación del código, no la utilidad de esa condición. La diapositiva separa visualmente algunos delimitadores; el fragmento didáctico utiliza los delimitadores contiguos `<![CDATA[` y `]]>` y lo identifica expresamente.

[Ver partes](01-Introducci%C3%B3n-XML.pdf#page=61) · [Ver elementos y atributos](01-Introducci%C3%B3n-XML.pdf#page=64) · [Ver entidades y CDATA](01-Introducci%C3%B3n-XML.pdf#page=71).

## Buena formación y validez

Un documento **bien formado** respeta la sintaxis de XML. Debe tener **un único elemento raíz**, cerrar todas las etiquetas y anidarlas correctamente. No se valida todavía contra una gramática.

```xml title="Anidamiento correcto e incorrecto" origen="Ejemplos de p. 67"
<!-- Correcto -->
<externo><interno>texto</interno></externo>

<!-- Incorrecto: los cierres se cruzan -->
<externo><interno>texto</externo></interno>
```

Las páginas 78–80 muestran una pizza sin cierre y varias pizzas sin una raíz común. [pizzas-mal-formado.xml](01-Ejemplos/pizzas-mal-formado.xml) permite inspeccionar el error original. Las capturas del navegador muestran que detectar un error de sintaxis impide interpretar normalmente el documento completo.

Un documento **válido** está bien formado y, además, su estructura cumple la DTD o el Schema asociado. El PDF enumera como alternativas DTD, XML Schema, Relax NG y Schematron.

| Comprobación | Pregunta |
|---|---|
| Buena formación | ¿Es correcto como documento XML? |
| Validez | ¿Satisface además la gramática declarada para este tipo de documentos? |

**Explicación didáctica:** cerrar una etiqueta soluciona un error sintáctico, pero no demuestra que el elemento esté permitido en esa posición por la gramática. Ver XML en el navegador tampoco sustituye esa comprobación adicional.

[Ver buena formación](01-Introducci%C3%B3n-XML.pdf#page=76) · [Ver validez](01-Introducci%C3%B3n-XML.pdf#page=82).

## Ventajas y limitaciones

XML aporta estructura definida por una gramática, información y metainformación, legibilidad humana como texto y vocabularios propios. Dispone de herramientas y APIs; separa contenido de procesamiento y visualización y facilita el intercambio cuando los participantes comparten DTD o Schema. La validación contribuye a detectar documentos que no cumplen el formato.

El coste es la **verbosidad**: archivos extensos, redundancia y consumo de espacio, ancho de banda y procesamiento. El PDF recuerda que XML es una sintaxis documental, **no un lenguaje de programación**: escribir una función con marcas describe su estructura, no la ejecuta. También advierte de la proliferación de vocabularios propietarios, la mala adecuación al contenido binario y su menor eficiencia como almacenamiento de bases de datos. La página 88 menciona que JSON lo está sustituyendo en diversas aplicaciones, sin desarrollar una comparación técnica completa.

[Ver ventajas](01-Introducci%C3%B3n-XML.pdf#page=85) · [Ver inconvenientes](01-Introducci%C3%B3n-XML.pdf#page=87).

## Ejercicios resueltos y propuestos

### Artículos de revista

Las páginas 96–99 modelan **título, autores y correo, resumen, palabras clave, revista, volumen, páginas inicial/final y año**. El [archivo articulos.xml](01-Ejemplos/articulos.xml) conserva la solución completa.

Los datos de año y paginación se sitúan en atributos de `article`; `authors` agrupa uno o más `author`, con `email`; `keywords` contiene las palabras clave. Esta elección permite representar varios autores y varias palabras sin crear atributos repetidos. La captura final comprueba la buena formación, no una validación contra DTD.

### Recetas

Las páginas 100–103 piden nombre, tipo de plato, ingredientes con cantidades, calorías opcionales, elaboración por pasos, dificultad, tiempo, utensilios y origen. La [solución recetas.xml](01-Ejemplos/recetas.xml) agrupa ingredientes, pasos y utensilios. Los atributos `quantity` y `measure` acompañan al ingrediente; `difficulty` y `time-minutes`, al proceso; `number`, a cada paso. Las calorías pueden faltar, como se observa en parte de los ingredientes.

### Monumentos prerrománicos

Las páginas 105–106 piden **cinco monumentos**: nombre, tipo, año aproximado, constructor, descripción, estado, municipio, dirección opcional, longitud/latitud/altitud, fotografías, vídeos, recomendación de 0 a 10, horario y días de visita, responsable de mostrarlo y referencias bibliográficas. Los nombres y fechas dados son ejemplos de datos del enunciado; no constituyen una cronología histórica verificada de los monumentos.

### Rutas turísticas

Las páginas 107–108 piden **al menos cinco rutas**, con nombre, tipo, transporte, fecha y hora inicial opcionales, duración, agencia, descripción, público adecuado, lugar/dirección y coordenadas de inicio. Cada ruta incluye **al menos tres referencias**, recomendación de 0 a 10 y **al menos tres hitos**. Cada hito lleva nombre, descripción, coordenadas y distancia desde el anterior con unidades en atributos, **entre una y cinco fotografías** y **entre cero y tres vídeos**.

**Procedimiento didáctico para resolverlos:** identificar la colección raíz; separar datos simples y grupos repetidos; marcar opcionalidad; elegir elementos o atributos sin duplicar nombres; construir un documento completo y comprobar primero la buena formación. En esta unidad no se exige inventar una DTD para estos dos ejercicios.

## Preguntas de repaso

::: pregunta ¿Un documento bien formado siempre es válido?
No. La buena formación comprueba sintaxis y estructura básica de XML. La validez añade la conformidad con la gramática declarada, como una DTD o un XML Schema.
:::

::: pregunta ¿Qué diferencia hay entre el árbol de pizzas y el del poema?
Las pizzas guardan los nombres de ingredientes en atributos de elementos vacíos. El poema incluye texto en elementos titulo y verso. Ambos son árboles, pero representar la información mediante elementos o atributos cambia su estructura.
:::

1. Explica la relación entre contenido, DOM y presentación de la página 13.
2. Localiza raíz, hijos, atributos y texto en `libros.xml`.
3. Compara KML/KMZ y SVG/raster con los ejemplos del PDF.
4. Interpreta las dos observaciones de WaterML sin confundir sus fechas con las del estándar.
5. Explica `standalone`, `encoding`, `xml:space` y `xml:base`.
6. Corrige el anidamiento incorrecto del ejemplo y justifica el cambio.
7. Diseña una ruta respetando las cardinalidades de fotografías y vídeos del enunciado.

## Resumen final

XML combina datos y marcado para obtener documentos jerárquicos y portables. Los vocabularios especializan sus marcas para dominios como geografía, gráficos o hidrología. Elementos, atributos, entidades y CDATA tienen funciones diferentes. La comprobación comienza por la sintaxis y la raíz única, y continúa, cuando se dispone de una gramática, con la validación. Esa estructura facilita intercambio y procesamiento a cambio de mayor volumen y complejidad documental.

## Referencias y cobertura

- [PDF original](01-Introducci%C3%B3n-XML.pdf): **109 páginas analizadas**, incluidos árboles, capturas de herramientas, comparación vector/raster y soluciones. Se agrupan los índices repetidos y la portada final.
- Cobertura: marcado (4–11), concepto y ejemplos (13–31), vocabularios (33–58), documentos y sintaxis (60–74), buena formación (76–80), validez (82–83), ventajas/inconvenientes (85–88), bibliografía (90–94), ejercicios (96–108).
- Ejemplos originales incorporados o enlazados: pizzas, poema, libros, KML/KMZ, SVG, WaterML, artículos y recetas. Los fragmentos didácticos y las diferencias de sintaxis se identifican en el texto. Las afirmaciones generales señaladas en avisos no se amplían con fuentes externas.
- Bibliografía del PDF: *XML imprescindible*, E. Rusty Harold y W. Scott Means, ANAYA/O’Reilly, 2005; *Beginning XML*, Joe Fawcett, Liam R. E. Quin y Danny Ayers, Wiley, 2012.
- Referencias que cita: [XML 1.1](http://www.w3.org/TR/xml11/), [SVG 2](https://www.w3.org/TR/SVG2/), [KML OGC](http://www.opengeospatial.org/standards/kml), [documentación KML](https://developers.google.com/kml/documentation/), [WaterML](https://www.ogc.org/standards/waterml/), [tutorial XML](http://www.w3schools.com/xml), [tutorial SVG](https://www.w3schools.com/graphics/svg_intro.asp), [JSON](http://json.org/) y [SVG en Wikipedia](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics). Se recogen sin consultar teoría externa.
