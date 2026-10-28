---
asignatura: Software y Estándares para la Web
titulo: DTDs
resumen: Definición de la estructura de un XML con DTD.
fuente: 02-DTDs.pdf
---

# DTDs

## Contenido

1. [Introducción y objetivos](#introduccion-y-objetivos)
2. [Asociar la DTD al documento](#asociar-la-dtd-al-documento)
3. [Declaración de elementos y modelos de contenido](#declaracion-de-elementos-y-modelos-de-contenido)
4. [Listas de atributos: ATTLIST](#listas-de-atributos-attlist)
5. [Entidades: ENTITY](#entidades-entity)
6. [Notaciones y datos externos](#notaciones-y-datos-externos)
7. [Espacios de nombres](#espacios-de-nombres)
8. [Proceso y herramientas de validación](#proceso-y-herramientas-de-validacion)
9. [Ejercicios originales](#ejercicios-originales)
10. [Preguntas de repaso](#preguntas-de-repaso)
11. [Resumen final](#resumen-final)
12. [Referencias y cobertura](#referencias-y-cobertura)

## Introducción y objetivos

Una **DTD, Document Type Definition**, es una gramática que establece qué elementos y atributos están permitidos en una familia de documentos XML y qué relaciones deben mantener. Históricamente es la primera forma de validación que presenta el PDF: sencilla, breve y menos potente que XML Schema.

El objetivo de la unidad es construir e interpretar declaraciones `ELEMENT`, `ATTLIST`, `ENTITY` y `NOTATION`, asociar una DTD al XML, comprender los espacios de nombres y diferenciar los errores de sintaxis de los de validez. Un documento válido debe estar **bien formado y cumplir su DTD**.

[Ver definición](02-DTDs.pdf#page=4).

## Asociar la DTD al documento

### Subconjunto interno

Las reglas pueden escribirse dentro de `DOCTYPE`, entre corchetes. El nombre de la declaración corresponde al elemento raíz. El ejemplo de la página 6 se conserva en [pizzas-DTD.xml](02-Ejemplos/pizzas-DTD.xml).

```xml title="DTD interna" origen="Ejemplo didáctico basado en p. 6"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE pizzas [
  <!ELEMENT pizzas (pizza+)>
  <!ELEMENT pizza (ingrediente*)>
  <!ELEMENT ingrediente (#PCDATA)>
  <!ATTLIST pizza nombre CDATA #REQUIRED precio CDATA #REQUIRED>
  <!ATTLIST ingrediente nombre CDATA #REQUIRED>
]>
<pizzas>
  <pizza nombre="Barbacoa" precio="8,0€">
    <ingrediente nombre="Mozzarella"/>
  </pizza>
</pizzas>
```

Esta versión didáctica completa contiene una pizza y un ingrediente, por lo que satisface las repeticiones indicadas. El archivo original utiliza `pizza*` en la colección; la diapositiva 6 usa `pizza+`: la diferencia cambia si se permite una colección vacía y no debe ocultarse.

### Archivo externo con SYSTEM

Separar las reglas en un `.dtd` permite compartirlas entre varios documentos:

```xml title="Asociación externa del PDF"
<!DOCTYPE pizzas SYSTEM "pizzas.dtd">
```

El documento [pizzas.xml](02-Ejemplos/pizzas.xml) enlaza la [DTD externa](02-Ejemplos/pizzas.dtd). La ruta se interpreta respecto a la localización del XML. Las páginas 7–11 muestran las mismas opciones con libros, cuyo modelo admite autores repetidos y año opcional.

### Identificador público

La tercera variante incorpora un identificador público y una localización del recurso. La página 12 y [xhtml-1-1.xml](02-Ejemplos/xhtml-1-1.xml) utilizan XHTML 1.1:

```xml title="DOCTYPE público del PDF"
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
  "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
```

El ejemplo ilustra la asociación con una DTD pública. Su consulta depende de un recurso externo; aquí se conserva la referencia, sin reemplazarla por una DTD inventada.

[Ver formas de asociación](02-DTDs.pdf#page=5) · [Ver ejemplo público](02-DTDs.pdf#page=12).

## Declaración de elementos y modelos de contenido

La forma general es `<!ELEMENT NombreElemento Regla>`. La regla describe el contenido del elemento, no sus atributos.

| Modelo | Significado y ejemplo del PDF |
|---|---|
| `(#PCDATA)` | Texto analizado, sin elementos hijos: `<!ELEMENT enfasis (#PCDATA)>` |
| `EMPTY` | Sin contenido: `<!ELEMENT linea-horizontal EMPTY>` |
| `ANY` | Modelo muy abierto; el PDF recomienda estructurar el documento en lugar de recurrir a él |
| Elementos | Hijos especificados por el modelo: `<!ELEMENT html (head, body)>` |
| Mixto | Texto y elementos: `<!ELEMENT parrafo (#PCDATA|enfasis)*>` |

**Explicación didáctica:** `EMPTY` no prohíbe atributos. DTD describe contenido y atributos mediante declaraciones distintas; por eso un ingrediente vacío puede guardar su nombre como atributo.

### Secuencia, alternativas y frecuencia

| Operador | Interpretación |
|---|---|
| `,` | Secuencia: respeta el orden |
| `|` | Alternativa entre componentes |
| `?` | Cero o una aparición |
| `*` | Cero o más apariciones |
| `+` | Una o más apariciones |
| `( ... )` | Agrupa componentes sobre los que se aplican operadores |

El indicador de frecuencia sigue directamente al nombre o al grupo; el PDF advierte de que no se separa mediante espacios. El modelo `<!ELEMENT pizza (ingrediente*, inventor?)>` permite ingredientes repetidos y, después, un inventor opcional. `<!ELEMENT servicio (domicilio|restaurante)>` elige una de dos alternativas.

El modelo de receta de la página 17 exige `titulo`, `ingredientes` y `procedimiento` en ese orden. Insertar un elemento `párrafo` adicional produce un documento **bien formado pero no válido para esa regla**, aunque todas las etiquetas estén cerradas.

### Leer agrupaciones

```dtd title="Agrupaciones de la diapositiva 20"
<!ELEMENT aviso (título?, (párrafo+, gráfico)*)>
<!ELEMENT p (font+, (img, br?)*, a*, ul*, ol*)>
```

En `aviso`, el título es opcional. Después puede repetirse cero o más veces el grupo formado por uno o más párrafos y un gráfico. En `p`, primero hay uno o más `font`; después grupos `img` con un `br` opcional; finalmente enlaces y listas en sus posiciones respectivas.

La alternativa `(font|(img,br?)|a|ul|ol)+` de la misma página permite repetir opciones en distinto orden. No equivale al modelo anterior: al sustituir una secuencia por alternativas cambia qué documentos son válidos.

### Ejemplo completo de libros

**Origen:** archivo original [libros.dtd](02-Ejemplos/libros.dtd).

```dtd title="libros.dtd"
<!ELEMENT libros (libro+)>
<!ELEMENT libro  (título, autor+, año?, precio, editorial, clasificación, idioma)>
<!ELEMENT título (#PCDATA)>
<!ELEMENT autor (#PCDATA)>
<!ELEMENT año (#PCDATA)>
<!ELEMENT precio (#PCDATA)>
<!ELEMENT editorial (#PCDATA)>
<!ELEMENT clasificación (#PCDATA)>
<!ELEMENT idioma (#PCDATA)>
<!ATTLIST libro isbn ID #REQUIRED>
<!ATTLIST precio moneda CDATA #REQUIRED>
```

`libros` exige al menos un `libro`; cada libro requiere sus campos en orden, admite varios autores y permite omitir el año. `isbn` identifica cada libro y `moneda` acompaña al precio. Véanse el [XML externo](02-Ejemplos/libros.xml) y la [variante con DTD interna](02-Ejemplos/libros-DTD.xml).

[Ver modelos](02-DTDs.pdf#page=16) · [Ver operadores](02-DTDs.pdf#page=18) · [Ver agrupaciones](02-DTDs.pdf#page=20).

## Listas de atributos: ATTLIST

La forma general asocia un elemento, un nombre de atributo, su tipo y una declaración de presencia o de valor. Una misma lista puede declarar varios atributos.

```dtd title="Sintaxis ilustrada en el PDF"
<!ATTLIST pizza nombre CDATA #REQUIRED>
<!ATTLIST ingrediente nombre CDATA #REQUIRED calorías CDATA #IMPLIED>
<!ATTLIST impuesto tipo CDATA #FIXED "IVA">
```

| Declaración | Efecto |
|---|---|
| `#REQUIRED` | El atributo debe escribirse; no hay valor por defecto |
| `#IMPLIED` | Puede omitirse sin obtener un valor por defecto |
| Un literal por defecto | Se utiliza si se omite el atributo |
| `#FIXED "valor"` | Establece un valor fijo: si se escribe, debe coincidir |

La diapositiva 22 describe `#FIXED` como valor por defecto; la tabla de la página 23 añade que es **constante**. Ambas ideas deben leerse juntas para no confundirlo con un valor por defecto modificable.

### Tipos

| Tipo | Restricción explicada en el PDF |
|---|---|
| `CDATA` | Cadena de caracteres |
| Enumeración `(euros|dólares)` | Una de las opciones declaradas |
| `ID` | Identificador único en el documento |
| `IDREF` | Referencia a un identificador existente |
| `NMTOKEN` | Testigo de nombre, sin espacios internos |
| `NMTOKENS` | Uno o más testigos separados por espacios |

El PDF relaciona ID/IDREF con enlaces dentro del documento: `capitulo` dispone de una referencia única y `enlace` apunta a ella. Los ejemplos de personas con códigos numéricos de la página 23 ilustran la relación de unicidad, pero no desarrollan las reglas léxicas de ID; no deben tomarse como una explicación completa de ese tipo. Los NMTOKEN, en cambio, admiten explícitamente comenzar por número en la página 26.

```dtd title="Fecha: CDATA frente a NMTOKEN" origen="Diapositiva 26"
<!ATTLIST mensaje fecha CDATA #REQUIRED>
```

Con CDATA se representa `15 de Diciembre de 1999`. Al cambiar el tipo a NMTOKEN, la forma `15-12-1999` evita espacios. NMTOKENS permite listas como `14-12-1996 01-03-2008 25-09-2012`.

**Advertencia sobre el código impreso:** las páginas 24–25 omiten las comillas del valor por defecto `normal` y emplean comillas tipográficas en algunos XML. Una formulación didáctica de esa declaración es:

```dtd title="Prioridad" origen="Ejemplo didáctico con sintaxis explícita"
<!ATTLIST mensaje prioridad (normal|urgente) "normal">
```

La regla selecciona `normal` si no hay atributo y acepta `urgente` si se escribe. Las páginas citadas no constituyen por sí solas una DTD completa, porque algunos elementos del mensaje no se declaran en el fragmento.

[Ver ATTLIST](02-DTDs.pdf#page=22) · [Ver tipos](02-DTDs.pdf#page=25).

## Entidades: ENTITY

Las entidades permiten abreviar textos o referirse a recursos. El PDF las organiza con tres clasificaciones que se combinan:

- **Internas o externas**, según dónde está su definición o contenido.
- **Analizadas o no analizadas**, según se procesen como contenido XML o se traten como otros datos.
- **Generales o de parámetro**, según su ámbito de uso.

### Generales internas y externas

La página 30 muestra una abreviatura textual:

```xml title="Entidad interna" origen="Ejemplo didáctico basado en p. 30"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE texto [
  <!ELEMENT texto (#PCDATA)>
  <!ENTITY ovni "Objeto Volador No Identificado">
]>
<texto>Juan Manuel vio un &ovni;</texto>
```

La referencia `&ovni;` permite utilizar el texto declarado. Este ejemplo didáctico se ha completado con una declaración de elemento y comillas rectas; el PDF representa el texto dentro de un título en un fragmento parcial.

Las entidades generales externas analizadas permiten incorporar contenido XML externo mediante `SYSTEM`. Los datos no analizados, como una imagen, se relacionan con una **notación** en el apartado siguiente. La frase inicial de la página 29 sobre recursos no analizados no describe todas las entidades: la página 30 declara expresamente analizadas las generales internas.

### Entidades de parámetro

Se declaran con `%` y se usan dentro de la DTD para reutilizar declaraciones. El PDF incluye una variante interna y una externa en `alf.ent`.

```dtd title="Entidad parámetro" origen="Ejemplo didáctico basado en p. 31"
<!ENTITY % elemento-alf "<!ELEMENT ALF (#PCDATA)>">
%elemento-alf;
```

La diferencia visible respecto a una entidad general es `%nombre;` en lugar de `&nombre;`. La página 31 contiene delimitadores incompletos en varias declaraciones; este fragmento didáctico muestra de forma explícita la apertura y cierre de la declaración reutilizada.

[Ver clasificación](02-DTDs.pdf#page=30).

## Notaciones y datos externos

**NOTATION** especifica el formato de entidades externas no XML, por ejemplo imágenes, música o vídeo. El procesador no analiza esos recursos mediante la gramática XML del documento. La declaración puede utilizar `SYSTEM`, `PUBLIC` o una identificación pública acompañada de identificador de sistema.

```xml title="Ejemplo de la página 34"
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE frutas [
  <!ELEMENT frutas (fruta)*>
  <!ELEMENT fruta EMPTY>
  <!ATTLIST fruta foto ENTITY #REQUIRED>
  <!ENTITY manzana SYSTEM "manzana.gif" NDATA gif>
  <!ENTITY naranja SYSTEM "naranja.gif" NDATA gif>
  <!NOTATION gif SYSTEM "image/gif">
]>
<frutas>
  <fruta foto="manzana"/>
  <fruta foto="naranja"/>
</frutas>
```

`foto` es un atributo de tipo ENTITY. Sus valores son los nombres `manzana` y `naranja`; las entidades señalan archivos externos y `NDATA gif` las asocia a la notación `gif`. La notación identifica el formato `image/gif`. Las imágenes no se incluyen entre los archivos locales de esta unidad: el código conserva el ejemplo del PDF, pero no se presenta como un paquete autónomo con esas imágenes.

La variante de la página 36 usa `<!NOTATION gif PUBLIC "GIF 1.0" "image/gif">`. Cambia la identificación de la notación, manteniendo el papel de los atributos y entidades.

[Ver notaciones](02-DTDs.pdf#page=33).

## Espacios de nombres

### Problema de homonimia

Una etiqueta `capital` puede significar la capital de un país o una cantidad de dinero. Al combinar vocabularios, el nombre local por sí solo deja de ser inequívoco. Los **espacios de nombres** asocian los nombres a una **URI** que identifica su vocabulario.

Las páginas 38–41 representan primero el conflicto y después una notación conceptual con URI completas. Esa escritura conceptual entre corchetes no se propone como sintaxis XML válida: la solución práctica consiste en declarar **prefijos** con `xmlns:alias`.

```xml title="Prefijos para dos vocabularios" origen="Ejemplo didáctico basado en pp. 41–43"
<b:inversiones xmlns:b="http://www.bolsa.com"
               xmlns:geo="http://www.geog.es">
  <geo:país geo:nombre="Francia">
    <geo:capital>París</geo:capital>
    <b:capital>1200€</b:capital>
  </geo:país>
</b:inversiones>
```

Las URI distinguen los nombres; **no tienen que ser enlaces con información descargable**. El prefijo es una abreviatura dentro del ámbito de la declaración. Se pueden introducir declaraciones en elementos internos y establecer un espacio por defecto con `xmlns="..."` para evitar prefijo en los elementos de ese vocabulario.

El ejemplo didáctico conserva la distinción geografía/bolsa y explicita cierres coherentes. La diapositiva 41 mezcla `país/pais` y contiene un cierre incompleto de `geo:capital`; esas erratas no se han trasladado como código correcto.

### Relación con las DTD

El PDF advierte de que las DTD no contemplan directamente espacios de nombres. Hay que declarar los nombres con sus prefijos y los atributos `xmlns` utilizados. La página 44 lo hace mediante atributos CDATA fijos y elementos como `geog:país` y `geog:capital`.

La valoración final es doble: los espacios de nombres facilitan combinar vocabularios e incorporar elementos, pero añaden prefijos y URI que complican las DTD. XML Schema será el mecanismo posterior para tratar estos vocabularios con mayor expresividad.

[Ver conflicto](02-DTDs.pdf#page=38) · [Ver prefijos](02-DTDs.pdf#page=41) · [Ver DTD y namespaces](02-DTDs.pdf#page=44).

## Proceso y herramientas de validación

El diagrama de la página 47 separa las decisiones:

1. Comprobar la buena formación. Si falla, se informa de **XML mal formado**.
2. Si hay DTD, comprobar su cumplimiento. Si falla, se informa de **XML no válido**.
3. Procesar la información cuando se supera el control correspondiente. El camino sin DTD del diagrama permite procesar XML bien formado sin afirmar por ello que se ha validado contra una gramática.

Se citan Notepad++ con XML Tools, validación en línea, Eclipse con plugin XML, Visual Studio 2019 o posteriores y `xmllint`. Para Visual Studio Code, el PDF recomienda **XML Language Support by Red Hat**.

```bash title="Comando de la página 50"
xmllint --noout --dtdvalid poema.dtd alba.xml
```

Primero se identifica la DTD y después el XML que debe cumplirla; `--noout` evita imprimir el documento procesado. Estos son los comandos y herramientas del material, no una comprobación de su disponibilidad en el equipo del lector.

El [archivo pizzas-DTD-error.xml](02-Ejemplos/pizzas-DTD-error.xml) omite `</pizza>`. Es un error de **buena formación**, anterior a la pregunta de si el modelo permite ese contenido. Es útil compararlo con [pizzas-DTD.xml](02-Ejemplos/pizzas-DTD.xml).

[Ver proceso](02-DTDs.pdf#page=47) · [Ver herramientas](02-DTDs.pdf#page=48).

## Ejercicios originales

### Artículos

Las páginas 58–60 piden título, autores y correo, resumen, palabras clave, revista, volumen, páginas inicial/final y año. La DTD resuelta conserva su estructura completa:

**Origen:** archivo original [articulos.dtd](02-Ejemplos/articulos.dtd).

```dtd title="articulos.dtd"
<!ELEMENT articles (article+)>
<!ELEMENT article (title, authors, summary, keywords, journal, volume)>
<!ELEMENT title (#PCDATA)>
<!ELEMENT authors (author+)>
<!ELEMENT author (#PCDATA)>
<!ELEMENT summary (#PCDATA)>
<!ELEMENT keywords (keyword+)>
<!ELEMENT keyword (#PCDATA)>
<!ELEMENT journal (#PCDATA)>
<!ELEMENT volume (#PCDATA)>
<!ATTLIST article
	year CDATA #REQUIRED
	start-page CDATA #REQUIRED
	end-page CDATA #REQUIRED>
<!ATTLIST author
	email CDATA #REQUIRED>
```

`article+`, `author+` y `keyword+` imponen colecciones no vacías. Los atributos del artículo y el correo son obligatorios. Al ser CDATA, año y páginas se modelan como cadenas: esta DTD no comprueba restricciones numéricas como que la página final sea mayor que la inicial. El [XML original](02-Ejemplos/articulos.xml) permite contrastar reglas e instancias.

### Recetas

**Origen:** archivo original [recetas.dtd](02-Ejemplos/recetas.dtd).

```dtd title="recetas.dtd"
<!ELEMENT cooking-recipes (cooking-recipe+)>
<!ELEMENT cooking-recipe (name, ingredients, elaboration-process, origin)>
<!ELEMENT name (#PCDATA)>
<!ELEMENT ingredients (ingredient+)>
<!ELEMENT ingredient (#PCDATA)>
<!ELEMENT elaboration-process (steps, elements)>
<!ELEMENT steps (step+)>
<!ELEMENT step (#PCDATA)>
<!ELEMENT elements (element*)>
<!ELEMENT element (#PCDATA)>
<!ELEMENT origin (#PCDATA)>
<!ATTLIST cooking-recipe
	type CDATA #REQUIRED
	vegan CDATA #REQUIRED>
<!ATTLIST ingredient
	quantity CDATA #REQUIRED
	measure CDATA #REQUIRED
	calories CDATA #IMPLIED>
<!ATTLIST elaboration-process
	difficulty CDATA #REQUIRED
	time-minutes CDATA #REQUIRED>
<!ATTLIST step
	number CDATA #REQUIRED>
```

La receta agrupa nombre, ingredientes, elaboración y origen. Hay al menos una receta, ingrediente y paso; los utensilios usan `element*`, de modo que pueden faltar dentro del grupo. `calories` es opcional; cantidad, medida, dificultad, tiempo y número de paso son obligatorios. El [XML resuelto](02-Ejemplos/recetas.xml) muestra esas decisiones.

**Explicación didáctica:** indicar `number CDATA` exige el atributo, pero no demuestra que los números de paso sean enteros consecutivos. La DTD expresa las restricciones que efectivamente se han escrito.

### Monumentos y rutas

Las páginas 65–68 repiten los modelos de la introducción y añaden que el XML esté **bien formado y validado con una DTD**. Para cinco monumentos se conservan nombre, tipo, año, constructor, descripción, estado, municipio, dirección opcional, coordenadas, galerías, valoración 0–10, información de visita y referencias.

Para al menos cinco rutas se conservan nombre/tipo/transporte, inicio opcional, duración, agencia, descripción, público, localización inicial, tres referencias como mínimo y recomendación. Cada ruta requiere al menos tres hitos; cada hito incluye localización, distancia con unidades, de una a cinco fotografías y de cero a tres vídeos. El ejercicio obliga a decidir cómo traducir las cardinalidades a la gramática; no aporta una solución única.

**Procedimiento didáctico:** partir de los XML, declarar todos los elementos y atributos usados, traducir el orden y las repeticiones, asociar la DTD, probar un documento correcto e introducir un error controlado de estructura. Así se distingue que el validador ha leído el XML de que realmente está comprobando las reglas deseadas.

## Preguntas de repaso

::: pregunta ¿Qué diferencia hay entre #IMPLIED, un literal por defecto y #FIXED?
#IMPLIED permite omitir el atributo sin asignarle valor por defecto. Un literal por defecto proporciona un valor si no se escribe. #FIXED establece además que un valor escrito debe coincidir con el declarado.
:::

::: pregunta ¿Por qué un XML con etiquetas cerradas puede fallar al validar?
Porque la buena formación solo asegura sintaxis correcta. Puede haber un elemento no declarado, un hijo fuera de orden, una repetición no permitida o un atributo obligatorio ausente.
:::

1. Interpreta `(titulo, autor+, año?, precio)` y escribe dos secuencias permitidas.
2. Compara `(a,b)*` con `(a|b)*`.
3. Explica ID, IDREF, NMTOKEN y NMTOKENS.
4. Distingue una entidad general de una entidad parámetro y una notación.
5. Explica por qué `geo:capital` y `b:capital` no se confunden en el ejemplo.
6. Identifica el primer error que debe detectar el procesador en `pizzas-DTD-error.xml`.
7. Localiza una restricción de las recetas que se pueda expresar con DTD y otra que la solución no compruebe.

## Resumen final

Las DTD describen familias de documentos mediante reglas de contenido y atributos. Sus operadores controlan orden, alternativas y cardinalidad; las declaraciones de atributos añaden presencia, valores y referencias. Entidades y notaciones permiten reutilización y recursos externos. Los espacios de nombres diferencian vocabularios, aunque complican su tratamiento en DTD. La validación siempre presupone buena formación y debe distinguirse de la simple visualización del archivo.

## Referencias y cobertura

- [Documento original](02-DTDs.pdf): **69 páginas analizadas**, incluido el diagrama de validación y las capturas de herramientas. Se agrupan índices y portadas repetidas.
- Cobertura: DTD y asociaciones (4–14), elementos (16–20), atributos (22–27), entidades (29–31), notaciones (33–36), espacios de nombres (38–45), validación (47–51), bibliografía/referencias (53–56), ejercicios (58–68).
- Ejemplos originales: variantes internas/externas de pizzas y libros, XHTML público, artículos, recetas y ejemplo con error. Se identifican las erratas de las diapositivas y cada adaptación didáctica.
- Bibliografía: *XML imprescindible*, Harold/Means, ANAYA/O’Reilly, 2005; *Beginning XML*, Fawcett/Quin/Ayers, Wiley, 2012.
- Recursos citados: [XML 1.1](http://www.w3.org/TR/xml11/), [tutorial XML](http://www.w3schools.com/xml), [libros XML](http://www.onlineprogrammingbooks.com/xml/), [tutorial DTD](https://www.abrirllave.com/dtd/guion-del-tutorial.php), [CodeBeautify](https://codebeautify.org/xmlvalidator) y [XMLValidation](http://www.xmlvalidation.com/documentation.html). Se recogen como referencias del PDF sin ampliar teoría externa.
