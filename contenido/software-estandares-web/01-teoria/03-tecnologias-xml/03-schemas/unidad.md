---
asignatura: Software y Estándares para la Web
titulo: Schemas
resumen: Validación de XML con XML Schema (XSD).
fuente: 03-Schemas.pdf
---

# Schemas

## Contenido

1. [Introducción y objetivos](#introduccion-y-objetivos)
2. [Primeros ejemplos y espacios de nombres](#primeros-ejemplos-y-espacios-de-nombres)
3. [De DTD a XML Schema](#de-dtd-a-xml-schema)
4. [Elementos simples y atributos](#elementos-simples-y-atributos)
5. [Tipos predefinidos, fechas y facetas](#tipos-predefinidos-fechas-y-facetas)
6. [Listas y uniones](#listas-y-uniones)
7. [Tipos complejos y modelos de contenido](#tipos-complejos-y-modelos-de-contenido)
8. [Derivación, abstracción y composición](#derivacion-abstraccion-y-composicion)
9. [Identidad, ausencia de valor y extensibilidad](#identidad-ausencia-de-valor-y-extensibilidad)
10. [Validación y generación automática](#validacion-y-generacion-automatica)
11. [Limitaciones del mecanismo estudiado](#limitaciones-del-mecanismo-estudiado)
12. [Ejercicios resueltos y propuestos](#ejercicios-resueltos-y-propuestos)
13. [Preguntas de repaso](#preguntas-de-repaso)
14. [Resumen final](#resumen-final)
15. [Referencias y cobertura](#referencias-y-cobertura)

## Introducción y objetivos

**XML Schema** describe la estructura de una familia de documentos XML y los tipos de sus datos. Sus archivos usan extensión **`.xsd`** y sintaxis XML. Validar significa comprobar que una instancia sigue el esquema, con el objetivo principal de detectar errores.

El PDF lo introduce a partir de las limitaciones de DTD: una sintaxis diferente de XML, dificultades para ampliar vocabularios y falta de tipos numéricos y restricciones detalladas. Schema añade soporte de espacios de nombres, tipos predefinidos y definidos por el usuario, restricciones, mecanismos de reutilización y documentación. Además de validar, puede ayudar en edición, comprensión y enlaces con programas.

La unidad exige distinguir **declarar un elemento**, **definir su tipo** y **comprobar una instancia**. Se estudia orden, anidamiento, multiplicidad, tipos simples y complejos, claves, composición de esquemas y validación.

[Ver introducción y características](03-Schemas.pdf#page=4).

## Primeros ejemplos y espacios de nombres

### Pizzas

**Origen:** archivo original [pizzas.xsd](03-Ejemplos/pizzas.xsd).

```xml title="pizzas.xsd"
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
targetNamespace="http://www.uniovi.es"
xmlns="http://www.uniovi.es"
elementFormDefault="qualified">

<xs:element name="pizzas">
<xs:complexType>
<xs:sequence>
<xs:element maxOccurs="unbounded" minOccurs="0" ref="pizza"/>
</xs:sequence>
</xs:complexType>
</xs:element>
<xs:element name="pizza">
<xs:complexType>
<xs:sequence>
<xs:element maxOccurs="5" minOccurs="0" ref="ingrediente"/>
</xs:sequence>
<xs:attribute name="nombre" use="required" type="xs:ID"/>
<xs:attribute name="precio" use="required" type="xs:integer"/>
</xs:complexType>
</xs:element>
<xs:element name="ingrediente">
<xs:complexType>
<xs:simpleContent>
<xs:extension base="xs:string">
<xs:attribute name="nombre" use="required" type="xs:string"/>
</xs:extension>
</xs:simpleContent>
</xs:complexType>
</xs:element>
</xs:schema>
```

`xs:schema` es la raíz del esquema. `xmlns:xs` identifica el vocabulario de XML Schema; `targetNamespace` identifica el vocabulario que se está definiendo. El espacio por defecto facilita referirse a esos nombres y `elementFormDefault="qualified"` establece la cualificación de los elementos locales del ejemplo.

La colección admite **cero o más pizzas**. Cada pizza contiene entre **cero y cinco ingredientes**, un nombre de tipo `xs:ID` y un precio de tipo `xs:integer`, ambos obligatorios. El ingrediente tiene texto de tipo string más un atributo obligatorio: por eso usa `complexType` con `simpleContent`, no un tipo simple sin atributos.

El [XML asociado](03-Ejemplos/pizzas-xsd.xml) declara `xmlns="http://www.uniovi.es"`, el espacio `xsi` y `xsi:schemaLocation="http://www.uniovi.es pizzas.xsd"`. Este último contiene un par **espacio de nombres + localización del esquema**.

**Diferencia entre ejemplos del PDF:** la página 9 propone al menos una pizza y de uno a cuatro ingredientes; las páginas 10–14 y el archivo adjunto usan cero o más pizzas y hasta cinco ingredientes. Son restricciones diferentes. Los apuntes conservan la variante del archivo, en lugar de combinar los límites como si fueran equivalentes.

Las figuras de las páginas 15–16 muestran el árbol de la instancia y el del propio esquema. Ambos son XML, pero el primero contiene datos y el segundo contiene declaraciones que restringen esos datos. Se conservan [árbol de la instancia](03-Ejemplos/pizzas-xsd.svg) y [árbol del esquema](03-Ejemplos/pizzas.svg).

### Poema y libros

El [poema.xsd](03-Ejemplos/poema.xsd) introduce una raíz `poesía`, dentro de la cual `poema` contiene `titulo` y uno o más `verso`. Autor y fecha son obligatorios y lugar opcional. La [instancia alba.xml](03-Ejemplos/alba.xml) y los árboles [alba.svg](03-Ejemplos/alba.svg) y [poema.svg](03-Ejemplos/poema.svg) ilustran la diferencia entre árbol de datos y gramática.

En [libros.xsd](03-Ejemplos/libros.xsd), `libro` admite varios autores, un año de tipo `xs:gYear`, un precio decimal y moneda obligatoria. El [XML original](03-Ejemplos/libros.xml) utiliza `any` como nombre del campo de año: es un **nombre de elemento del ejemplo**, no la instrucción comodín `xs:any`. Los árboles [libros.svg](03-Ejemplos/libros.svg) y [libros-xsd.svg](03-Ejemplos/libros-xsd.svg) permiten ver las mismas relaciones.

### Asociar un esquema con y sin namespace

```xml title="Con espacio de nombres" origen="Ejemplo didáctico basado en pp. 30–31"
<alumnos xmlns="http://www.uniovi.es/alumnos"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.uniovi.es/alumnos alumnos.xsd">
</alumnos>
```

```xml title="Sin espacio de nombres" origen="Ejemplo de p. 31, raíz vacía ilustrativa"
<pizzas xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="pizzas.xsd">
</pizzas>
```

Estos fragmentos ilustran la asociación; su validez depende del contenido exigido por cada esquema. No debe quitarse el namespace de una instancia y conservar sin cambios un XSD que define ese namespace.

**Erratas del PDF:** aparecen formas como `xsi:SchemaLocation`, `xsi:noNameSpaceLocation`, `minOccur` o `maxOccurrs`. En los archivos y fragmentos didácticos se utiliza la grafía sensible a mayúsculas de los ejemplos completos: `schemaLocation`, `noNamespaceSchemaLocation`, `minOccurs`, `maxOccurs`.

[Ver ejemplos](03-Schemas.pdf#page=9) · [Ver asociación](03-Schemas.pdf#page=30).

## De DTD a XML Schema

La conversión consiste en mantener las relaciones y expresar sus restricciones con construcciones XML.

| DTD | XML Schema |
|---|---|
| Elemento | `xs:element` |
| `*` | `minOccurs="0" maxOccurs="unbounded"` |
| `+` | `minOccurs="1" maxOccurs="unbounded"` |
| `?` | `minOccurs="0" maxOccurs="1"` |
| `,` | `xs:sequence` |
| `|` | `xs:choice` |

La dirección de la página 26 tiene empresa opcional, nombre, calle, ciudad, provincia y código postal, y uno o más teléfonos. La conversión debe conservar tanto el orden como la repetición final. El fragmento impreso emplea `elementType` y delimitadores incompletos: se estudia como esquema conceptual de traducción, sin presentarlo como un XSD ejecutable.

La página 29 añade un ejemplo de `alumnos` con entre **uno y doscientos alumnos**, cuyos datos son nombre, apellidos y año de nacimiento. La cardinalidad restringe la colección; el tipo restringe cada dato.

[Ver conversión](03-Schemas.pdf#page=26).

## Elementos simples y atributos

Un elemento de **tipo simple** contiene un valor textual que puede pertenecer a un tipo como boolean, integer, date, decimal, string o time. No contiene elementos hijos ni atributos.

```xml title="Declaraciones simples del PDF"
<xs:element name="apellido" type="xs:string"/>
<xs:attribute name="idioma" type="xs:string"/>
```

Los atributos se declaran con `xs:attribute`. Por defecto son opcionales; `use="required"` exige su presencia y `use="optional"` la deja opcional. `default` proporciona un valor por defecto y `fixed` restringe el valor al indicado.

El círculo de la página 36 ilustra radio float obligatorio, color por defecto y tipo fijo `jpeg`. El tipo `Color` aparece como referencia a una definición que no está desarrollada en ese fragmento; por ello no debe copiarse como esquema completo autónomo.

**Explicación didáctica:** un precio con moneda tiene un valor simple, pero el **elemento** necesita un tipo complejo por su atributo. El carácter «simple» o «complejo» no mide el tamaño del texto.

[Ver elementos simples](03-Schemas.pdf#page=33) · [Ver atributos](03-Schemas.pdf#page=35).

## Tipos predefinidos, fechas y facetas

### Familias de tipos

El PDF distingue tipos simples **predefinidos**, primitivos o derivados, y **definidos por el usuario**. Los complejos permiten combinaciones de hijos, texto y atributos.

| Familia | Tipos citados |
|---|---|
| Texto y lógica | `string`, `boolean`, `normalizedString`, `token`, `language` |
| Numéricos | `decimal`, `float`, `double`, `integer`, `long`, `int`, `short`, `byte` y sus variantes de signo y sin signo |
| Tiempo | `duration`, `dateTime`, `time`, `date`, `gYearMonth`, `gYear`, `gMonthDay`, `gDay`, `gMonth` |
| Binarios | `hexBinary`, `base64Binary` |
| Nombres y referencias | `anyURI`, `QName`, `NOTATION`, `Name`, `NCName`, `ID`, `IDREF`, `IDREFS`, `ENTITY`, `ENTITIES`, `NMTOKEN`, `NMTOKENS` |

El diagrama de la página 42 organiza las derivaciones: las ramas de cadenas y números llevan a tipos más restringidos. La página 40 imprime `number` en su lista; no se utiliza aquí como un nombre `xs:number`, ya que los ejemplos concretos del documento emplean tipos como `xs:decimal`, `xs:float` y `xs:integer`.

### Fechas y duraciones

```xml title="Valores de la página 43"
<inicio>2018-10-20</inicio>
<inicio>2018-10-20-05:00</inicio>
<inicioRuta>2018-10-20T12:30:00</inicioRuta>
<duracionRuta>PT7H</duracionRuta>
<duracionRuta>P1Y7M29DT12H</duracionRuta>
```

Los primeros valores ilustran `xs:date`, incluida zona horaria; el tercero, `xs:dateTime`. La duración usa `P` para el período, `Y/M/D` para años/meses/días y, tras `T`, `H/M/S` para horas/minutos/segundos. `PT7H` son siete horas; `P1Y7M29DT12H`, un año, siete meses, veintinueve días y doce horas. La posición de `M` distingue meses de minutos.

### Facetas

Las **facetas fundamentales** caracterizan igualdad, orden, límites, cardinalidad y carácter numérico. Las **facetas de restricción** delimitan los valores de un tipo derivado.

| Faceta | Restricción |
|---|---|
| `length`, `minLength`, `maxLength` | Longitud exacta, mínima o máxima |
| `pattern` | Patrón de caracteres |
| `enumeration` | Conjunto cerrado de valores |
| `whiteSpace` | Tratamiento de espacios |
| `minInclusive`, `maxInclusive` | Límites incluidos |
| `minExclusive`, `maxExclusive` | Límites excluidos |
| `totalDigits`, `fractionDigits` | Dígitos del valor y de su parte fraccionaria |

Una restricción se define dentro de `xs:simpleType` con `xs:restriction base="..."`. La página 46 limita una edad entre 0 y 140:

```xml title="Edad" origen="Ejemplo del PDF con cierres explícitos"
<xs:element name="edad">
  <xs:simpleType>
    <xs:restriction base="xs:integer">
      <xs:minInclusive value="0"/>
      <xs:maxInclusive value="140"/>
    </xs:restriction>
  </xs:simpleType>
</xs:element>
```

**Advertencias del documento:** el tipo llamado `mes` de la página 47 acepta 1–31; ese nombre no cambia los límites escritos ni demuestra que represente correctamente meses. La página 55 describe `totalDigits` como «exactamente» un número de dígitos: se señala esa formulación, y los ejemplos didácticos no la utilizan para imponer una longitud exacta. La longitud de cadenas se expresa con `length`.

### Enumeraciones, patrones y espacios

Las enumeraciones del PDF recogen las cuatro estaciones y dos nombres de máster. Los patrones modelan series como una letra `[a-z]` o un NIF `\d{7,8}[A-Z]`. Ese patrón controla la forma del dato; el ejemplo no desarrolla comprobaciones adicionales del identificador.

| Patrón del PDF | Lectura |
|---|---|
| `a*b` | Cero o más `a`, seguidas de `b` |
| `a?b` | `b` o `ab` |
| `a+b` | Una o más `a`, seguidas de `b` |
| `[xyz]b` | `xb`, `yb` o `zb` |
| `[a-c]x` | `ax`, `bx` o `cx` |
| `[^0-9]x`, `\Dx` | Un carácter no numérico seguido de `x` |
| `(pa){2}rucha` | `paparucha` |
| `(a|b)+x` | Una o más opciones `a/b`, seguidas de `x` |
| `a{1,3}x` | De una a tres `a`, seguidas de `x` |
| `\n`, `\p{Lu}`, `\p{Sc}` | Salto de línea, mayúscula Unicode, símbolo monetario |

La política de espacios tiene tres valores: `preserve` conserva; `replace` transforma tabuladores/saltos en espacios; `collapse` reduce las secuencias de espacios. En cadenas, `length` cuenta caracteres; en listas cuenta **ítems**, una distinción que destaca la página 59.

[Ver tipos y jerarquía](03-Schemas.pdf#page=38) · [Ver fechas](03-Schemas.pdf#page=43) · [Ver restricciones](03-Schemas.pdf#page=44).

## Listas y uniones

### Listas: color RGB

**Origen:** archivo original [ComponentesRGB.xsd](03-Ejemplos/ComponentesRGB.xsd).

```xml title="ComponentesRGB.xsd"
<?xml version="1.0" encoding="UTF-8"?>
<!-- ComponentesRGB.xsd Para validar componentes RGB  -->
<!-- Versión 1.1 18-Octubre-2025 Juan Manuel Cueva Lovelle. Universidad de Oviedo -->
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           targetNamespace="http://www.uniovi.es"
           xmlns="http://www.uniovi.es"
           elementFormDefault="qualified">

  <!-- Tipo base: un componente RGB entre 0 y 255 -->
  <xs:simpleType name="ComponenteRGB">
    <xs:restriction base="xs:nonNegativeInteger">
      <xs:maxInclusive value="255"/>
    </xs:restriction>
  </xs:simpleType>

  <!-- Lista de componentes RGB -->
  <xs:simpleType name="ComponentesRGB">
    <xs:list itemType="ComponenteRGB"/>
  </xs:simpleType>

  <!-- Lista de exactamente 3 componentes RGB -->
  <xs:simpleType name="ColorRGB">
    <xs:restriction base="ComponentesRGB">
      <xs:length value="3"/>
    </xs:restriction>
  </xs:simpleType>

  <!-- Elemento raíz que contiene un color RGB -->
  <xs:element name="prueba">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="color" type="ColorRGB"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

</xs:schema>
```

El ejemplo construye tres niveles: `ComponenteRGB` restringe enteros no negativos a un máximo de 255; `ComponentesRGB` crea una lista; `ColorRGB` restringe esa lista a **tres ítems**. El [archivo rgb.xml](03-Ejemplos/rgb.xml) contiene `255 255 0`.

La página 59 coloca `xs:length` directamente dentro de `xs:list`. El ejemplo completo de la página 58 y el archivo local muestran la estructura correcta empleada aquí: **lista primero y restricción de su longitud después**. No se ha modificado silenciosamente el original impreso.

### Uniones: nota o estado textual

La página 60 permite una nota numérica entre 0 y 10 o la cadena `No presentado`:

```xml title="TipoNota del PDF"
<xs:simpleType name="TipoNota">
  <xs:union>
    <xs:simpleType>
      <xs:restriction base="xs:float">
        <xs:minInclusive value="0"/>
        <xs:maxInclusive value="10"/>
      </xs:restriction>
    </xs:simpleType>
    <xs:simpleType>
      <xs:restriction base="xs:string">
        <xs:enumeration value="No presentado"/>
      </xs:restriction>
    </xs:simpleType>
  </xs:union>
</xs:simpleType>
```

La unión admite un valor de cualquiera de los tipos incluidos; no es una lista de varios valores simultáneos. La aplicación a `nota` se hace mediante `type="TipoNota"`.

[Ver listas](03-Schemas.pdf#page=57) · [Ver unión](03-Schemas.pdf#page=60).

## Tipos complejos y modelos de contenido

Un tipo complejo puede describir un elemento vacío con atributos, texto con atributos, hijos o contenido mixto. Puede definirse de manera **anónima**, dentro de la declaración del elemento, o **con nombre**, para reutilizarlo mediante `type`. `ref` permite referirse a una declaración de elemento ya existente.

### Orden y cardinalidad

| Constructor | Interpretación del PDF |
|---|---|
| `xs:sequence` | Hijos en el orden declarado |
| `xs:choice` | Selección de una alternativa por ocurrencia del grupo |
| `xs:all` | Elementos del grupo en cualquier orden, como en autor/título |
| `minOccurs`, `maxOccurs` | Número mínimo y máximo de ocurrencias |

Los ejemplos de secuencia incluyen nombre, apellidos y nacimiento opcional; el de alternativa permite coche, tren o avión. La página 67 contrapone `all` a enumerar todas las permutaciones en DTD. El documento no desarrolla todas las restricciones normativas de `all`, por lo que esta explicación se mantiene en el alcance de su ejemplo.

La solución de las páginas 69–70 traduce `(a|(b,c?))*`:

```xml title="Solución del ejercicio de conversión"
<xs:complexType>
  <xs:choice minOccurs="0" maxOccurs="unbounded">
    <xs:element ref="a"/>
    <xs:sequence>
      <xs:element ref="b"/>
      <xs:element ref="c" minOccurs="0" maxOccurs="1"/>
    </xs:sequence>
  </xs:choice>
</xs:complexType>
```

Se pueden repetir cero o más grupos. En cada grupo aparece `a` o una secuencia que empieza por `b` y admite `c`. Las declaraciones globales de esos tres elementos se presuponen; el fragmento resuelve el modelo, sin constituir por sí solo un esquema completo.

### Contenido simple, mixto y grupos

`xs:simpleContent` permite extender un valor simple con atributos, como el precio decimal con moneda de libros. **`mixed="true"`** permite mezclar texto con hijos, como `comentarios` que contiene una palabra dentro de `emph`. El texto no se enumera como un hijo del modelo.

`xs:group` y las agrupaciones de atributos permiten reutilizar grupos con nombre. El ejemplo reúne nombre/apellidos para varios tipos. Las páginas 72–74 contienen fragmentos abreviados que omiten envolturas `complexType` o `sequence` y escriben `ComplexType` con mayúscula. No deben copiarse como documentos completos: la idea que ilustran es **reutilizar un tipo, un grupo o una declaración**, que son operaciones distintas.

[Ver complejos](03-Schemas.pdf#page=62) · [Ver conversión](03-Schemas.pdf#page=69) · [Ver reutilización](03-Schemas.pdf#page=72).

## Derivación, abstracción y composición

### Extensión de tipos

La derivación por extensión se compara con subclases de programación orientada a objetos. El tipo `Figura` aporta color; `Rectángulo` añade base y altura; `Círculo`, radio. Se expresan mediante `complexContent` y `extension base="Figura"`.

```xml title="Instancias de las figuras de p. 76" origen="Fragmento del PDF"
<figuras>
  <figura base="23" altura="3" xsi:type="Rectángulo"/>
  <figura radio="3" xsi:type="Círculo"/>
</figuras>
```

El fragmento presupone el espacio `xsi` y las definiciones de los tipos. **`xsi:type`** señala el tipo derivado utilizado donde se declara el tipo base. Con **`abstract="true"`**, un tipo no puede utilizarse directamente. El atributo `final` permite limitar formas de derivación; la página 77 muestra `final="restriction"`.

### Reutilizar archivos XSD

| Mecanismo | Función en el PDF |
|---|---|
| `xs:include` | Reunir definiciones del mismo espacio de nombres |
| `xs:import` | Incorporar vocabularios de espacios diferentes |
| `xs:redefine` | Incluir y redefinir determinados componentes |

Los diagramas de las páginas 78–80 unen alumnos y profesores en un esquema de universidad. En `include`, las definiciones comparten namespace; en `import`, los namespaces A y P se mantienen diferenciados; en `redefine`, un nuevo archivo amplía `TipoAlumno` añadiendo una nota. El código que usa `xsd:` y el que usa `xs:` representan el mismo vocabulario si ambos prefijos están asociados a su URI correspondiente.

[Ver extensión](03-Schemas.pdf#page=75) · [Ver composición](03-Schemas.pdf#page=78).

## Identidad, ausencia de valor y extensibilidad

### Claves, unicidad y referencias

DTD utiliza ID para unicidad global. XML Schema permite restringir elementos, atributos o combinaciones en una región concreta del documento.

| Restricción | Condición |
|---|---|
| `xs:unique` | Los valores presentes seleccionados deben ser únicos |
| `xs:key` | Además de unicidad, exige la existencia del valor de la clave |
| `xs:keyref` | El valor debe referirse a una clave correspondiente |

`selector` localiza los nodos afectados y `field` identifica el dato o los datos que forman la clave. La combinación nombre/apellidos de la página 82 ilustra una clave compuesta; el delegado de una clase de la página 84 debe referirse a un alumno. Cuando los nombres pertenecen a un namespace, se debe considerar en los XPath del selector y los campos.

**Advertencia:** las páginas 82–83 dibujan `key` y `unique` dentro de un `complexType` en fragmentos abreviados. Se estudia el significado de las restricciones y no se ofrecen esos fragmentos como XSD autónomo listo para validar.

### Ausente, vacío y nulo

La página 85 diferencia **vacío**, sin contenido, y **nulo**, que indica ausencia de valor. `nillable="true"` permite indicar el segundo caso mediante `xsi:nil="true"`.

```xml title="Segundo apellido nulo" origen="Ejemplo didáctico basado en p. 85"
<persona xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <nombre>John</nombre>
  <primerApellido>Smith</primerApellido>
  <segundoApellido xsi:nil="true"/>
</persona>
```

El esquema correspondiente debe declarar `segundoApellido` como nillable. Permitir que no aparezca exige además expresar la opcionalidad mediante su cardinalidad. La diapositiva alterna `Persona/persona` y `segundoApellido/segundoApell`: el fragmento didáctico utiliza nombres coherentes y señala la diferencia.

### Contenido abierto y documentación

`xs:any` permite contenido de un espacio de nombres y `xs:anyAttribute`, atributos. El ejemplo usa XHTML; se mencionan `##any`, `##local` y `##other`. **`processContents`** controla el tratamiento: `strict` exige validar; `lax` valida cuando es posible; `skip` no realiza esa validación del contenido admitido por el comodín.

La documentación del esquema se incorpora mediante **`annotation`**, con **`documentation`** para texto o referencias y **`appinfo`** para información dirigida a otras aplicaciones. El código de la página 88 tiene comillas sueltas y `nombre` en lugar de `name`; la intención documental se conserva sin trasladar esas erratas como sintaxis correcta.

[Ver claves](03-Schemas.pdf#page=81) · [Ver nulos](03-Schemas.pdf#page=85) · [Ver comodines y documentación](03-Schemas.pdf#page=86).

## Validación y generación automática

El PDF ofrece validadores en línea y editores: Notepad++ con XML Tools, Visual Studio Code con XML Language Support by Red Hat, OxygenXML y XMLSpy. También muestra:

```bash title="Comando original de la página 93"
xmllint --schema pizzas.xsd pizzas-xsd.xml --noout
```

El proceso práctico es identificar la instancia y el XSD, comprobar su asociación y namespace, ejecutar el validador y revisar el diagnóstico. La página 96 recomienda **probar varios validadores**, porque las implementaciones y sus mensajes pueden ser diferentes.

Visual Studio Community puede generar esquemas desde XML o DTD, como muestran las capturas 101–104 y el menú XML. La generación ahorra escritura, pero requiere revisión: pueden sobrar tipos `xs:string`, faltar elementos opcionales no presentes en la muestra o aparecer una codificación distinta de la deseada.

**Explicación didáctica:** inferir una regla desde una sola instancia no demuestra que se hayan capturado todas las variantes permitidas. Por ello se deben revisar tipos, opcionalidad y repeticiones frente a los requisitos, no solo comprobar que la muestra original vuelve a validar.

[Ver validación](03-Schemas.pdf#page=90) · [Ver generación](03-Schemas.pdf#page=100).

## Limitaciones del mecanismo estudiado

La página 98 señala ausencia de un mecanismo de macros de entidades como el de DTD, restricciones limitadas para relaciones como **total = suma de parciales**, y dependencia del contexto insuficiente para variar contenido según un atributo `tipo`. Añade tamaño de los XSD, legibilidad y complejidad de combinaciones excepcionales. Menciona **Relax NG** y **Schematron** como alternativas.

Estas limitaciones se presentan con el alcance y la versión de Schema tratados por las diapositivas. Los apuntes no extrapolan a otras versiones ni incorporan soluciones externas que el documento no desarrolla.

## Ejercicios resueltos y propuestos

### Artículos de revista

El [esquema articulos.xsd](03-Ejemplos/articulos.xsd) y la [instancia articulos.xml](03-Ejemplos/articulos.xml) conservan las soluciones de las páginas 113–117. Sus campos son título, autores/correo, resumen, palabras clave, revista, volumen, año y páginas inicial/final.

Las decisiones importantes son `xs:gYear` para el año, `xs:integer` para volumen y páginas, grupos de autores y palabras clave y texto con atributo en `author`. El PDF permite cero o más artículos y, dentro de `keywords`, cero o más palabras; no se debe sustituir automáticamente por los `+` de la DTD anterior porque serían reglas distintas.

### Recetas

El [esquema recetas.xsd](03-Ejemplos/recetas.xsd) y el [XML recetas.xml](03-Ejemplos/recetas.xml) desarrollan las páginas 118–124. Tipo de plato y condición vegana son enumeraciones. La dificultad se restringe a Fácil, Medio o Difícil. El tiempo y número de paso son enteros; calorías es opcional.

La cantidad se define mediante una unión:

```xml title="Cantidad y fracción de la solución"
<xs:simpleType name="quantity-type">
  <xs:union memberTypes="xs:integer fraction-type"/>
</xs:simpleType>
<xs:simpleType name="fraction-type">
  <xs:restriction base="xs:string">
    <xs:pattern value="-?\d+/-?\d+"/>
  </xs:restriction>
</xs:simpleType>
```

Esto acepta la forma de fracciones como `1/2` y enteros; el patrón no establece por sí solo una comprobación aritmética del denominador. El proceso admite grupos `steps` y `elements` según sus cardinalidades; se debe leer el XSD escrito sin suponer restricciones no declaradas por el enunciado.

### Monumentos y rutas

Las páginas 126–129 piden los modelos de cinco monumentos y al menos cinco rutas de las unidades anteriores, ahora **validados con XML Schema**. Para monumentos se conservan identificación, tipo, año/constructor, descripción/estado, municipio/dirección opcional, coordenadas, galerías, valoración, visita y referencias.

Las rutas incluyen nombre/tipo/transporte, fecha y hora opcionales, duración, agencia, descripción/público, punto inicial con coordenadas, al menos tres referencias, valoración y al menos tres hitos. Cada hito conserva descripción, coordenadas, distancia con unidades, entre una y cinco fotos y entre cero y tres vídeos.

**Procedimiento didáctico:** recuperar el modelo XML, identificar datos que conviene tipar, definir estructura y cardinalidades, añadir enumeraciones/rangos previstos por los requisitos y validar instancias que prueben opcionalidad y límites. Una conversión mecánica de la DTD no aprovecharía por sí sola los tipos y restricciones de esta unidad.

## Preguntas de repaso

::: pregunta ¿Por qué un elemento con texto y un atributo necesita un tipo complejo?
Porque un tipo simple no admite atributos. El ejemplo del precio utiliza complexType con simpleContent para conservar el valor decimal y añadir moneda.
:::

::: pregunta ¿Qué cuenta length en un color definido como lista?
Cuenta los ítems de la lista. En ColorRGB se exigen tres componentes, y cada componente está restringido por separado al intervalo 0–255.
:::

1. Compara `sequence`, `choice` y `all` sin cambiar las cardinalidades.
2. Explica las diferencias entre `xmlns:xs`, `targetNamespace` y `xsi:schemaLocation`.
3. Distingue elemento opcional, vacío y nulo.
4. Interpreta `P1Y7M29DT12H` y compara `date` con `dateTime`.
5. Compara listas y uniones con RGB y TipoNota.
6. Explica `key`, `unique`, `keyref`, `include`, `import` y `redefine`.
7. Indica por qué es necesario revisar un XSD inferido automáticamente.
8. Explica qué acepta el patrón de cantidad fraccionaria y qué no demuestra.

## Resumen final

XML Schema convierte la descripción de documentos en otro documento XML con tipos, restricciones y namespaces. Los tipos simples modelan valores; los complejos combinan hijos, atributos y texto. Orden, multiplicidad, listas, uniones y facetas expresan restricciones distintas. La reutilización y las claves amplían las posibilidades frente a DTD, pero validar exige comprobar la instancia, el esquema y sus espacios de nombres, conservando las limitaciones del mecanismo estudiado.

## Referencias y cobertura

- [Documento original](03-Schemas.pdf): **130 páginas analizadas**, incluidos árboles de datos y esquemas, jerarquía de tipos, diagramas de composición y capturas de generación/validación.
- Cobertura: introducción (4–7), ejemplos (9–24), conversión y namespaces (26–31), elementos/atributos (33–36), tipos/facetas/listas/uniones (38–60), complejos y mecanismos avanzados (62–88), validación (90–96), limitaciones (98), generación (100–104), bibliografía (106–111), ejercicios (113–129).
- Se incorporan ejemplos originales de pizzas, poema, libros, RGB, artículos y recetas. Los fragmentos parciales, las erratas y las adaptaciones didácticas se identifican; no se completan los ejemplos conceptuales mediante teoría externa.
- Bibliografía: *XML imprescindible*, Harold/Means, 2005; *Beginning XML*, Fawcett/Quin/Ayers, 2012; *Definitive XML Schema*, segunda edición, Priscilla Walmsley, Prentice Hall, 2012.
- Referencias del PDF: [introducción W3C](http://www.w3.org/TR/xmlschema-0/), [estructuras](http://www.w3.org/TR/xmlschema-1/), [tipos](http://www.w3.org/TR/xmlschema-2/), [recursos](http://www.w3.org/XML/Schema), [validación](http://www.adrianmouat.com/bit-bucket/2013/11/xml-schema-validation/), [tutorial W3Schools](https://www.w3schools.com/xml/schema_intro.asp), [tutorial XSD](https://www.abrirllave.com/xsd/guion-del-tutorial.php), [Utilities Online](http://www.utilities-online.info/xsdvalidation/), [CoreFiling](http://www.corefiling.com/opensource/schemaValidate.html), [FreeFormatter](http://www.freeformatter.com/xml-validator-xsd.html) y [Visual Studio Community](https://visualstudio.microsoft.com/es/vs/community/). Se recogen sin utilizarlas para añadir teoría.
