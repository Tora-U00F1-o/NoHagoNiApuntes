---
asignatura: Software y Estándares para la Web
titulo: XPath
resumen: Selección de nodos en un documento XML con XPath.
fuente: 04-XPath.pdf
---

# XPath

## Contenido

1. [Introducción y objetivos](#introduccion-y-objetivos)
2. [Rutas y nodo de contexto](#rutas-y-nodo-de-contexto)
3. [Documento de trabajo: biblioteca](#documento-de-trabajo-biblioteca)
4. [Funciones y consultas explicadas](#funciones-y-consultas-explicadas)
5. [XPath con ElementTree](#xpath-con-elementtree)
6. [XPath con lxml](#xpath-con-lxml)
7. [Errores frecuentes y repaso](#errores-frecuentes-y-repaso)
8. [Resumen final](#resumen-final)
9. [Referencias y cobertura](#referencias-y-cobertura)

## Introducción y objetivos

**XPath, XML Path Language**, es una sintaxis para identificar porciones de un documento XML mediante caminos por su árbol. **No está basada en XML**: una expresión como `persona/apellido/materno` describe una navegación, no un documento de marcas.

El PDF cita XPath 2.0 como recomendación de **14/12/2010**, con correcciones de enlaces de **03/01/2011** y actualización de estado en **octubre de 2016**. Los ejercicios prácticos usan operaciones concretas de ElementTree y lxml; no debe deducirse que ambos motores implementan íntegramente la versión de la recomendación citada.

El resultado puede ser un **conjunto de nodos**, una **cadena**, un **número** o un **booleano**. Es esencial distinguir seleccionar un elemento, obtener su texto y calcular una función sobre un conjunto.

[Ver definición](04-XPath.pdf#page=4).

## Rutas y nodo de contexto

La analogía con un sistema de archivos ayuda a leer una ruta: los nombres se separan con `/`, y cada paso parte de un nodo actual o **nodo de contexto**. Una diferencia importante es que una ruta XPath puede seleccionar **varios nodos**, no un único archivo.

| Expresión de la página 8 | Selección |
|---|---|
| `X` | Elementos X hijos del nodo actual |
| `*` | Todos los elementos hijos |
| `text()` | Nodos de texto hijos |
| `@Y` | Atributo Y |
| `.` | Nodo actual |
| `..` | Padre |
| `*/X` | X hijos de cualquier hijo del contexto |
| `X//Y` | Y descendientes de X |
| `//Y` | Y en cualquier nivel del documento cuando se evalúa desde él |
| `//Y/X` | X hijos directos de los Y encontrados |
| `X[1]` | Primer X entre hermanos del mismo nombre |
| `X[last()]` | Último X entre hermanos del mismo nombre |

La explicación de `*` en la tabla comparativa de la página 7 habla de «cualquier nodo» de forma general; el resumen sintáctico de la página 8 concreta que este comodín selecciona **elementos** en los ejemplos mostrados.

### Predicados y orden de los filtros

Los corchetes filtran el conjunto seleccionado. `//X[1][@Y='Z']` toma los X que son el primer X entre sus hermanos y que tienen el atributo Y con valor Z. Los predicados no añaden un nivel de hijo: restringen los nodos del paso al que se aplican.

**Explicación didáctica:** `/biblioteca/libro[2]` y `/biblioteca/libro/autor` hacen trabajos diferentes. La primera elige un libro según posición; la segunda recorre de cada libro a sus autores. Las posiciones de los ejemplos comienzan en **1**.

[Ver contexto y rutas](04-XPath.pdf#page=6) · [Ver sintaxis abreviada](04-XPath.pdf#page=8).

## Documento de trabajo: biblioteca

**Origen:** archivo original [biblioteca.xml](04-Ejemplos/biblioteca.xml).

```xml title="biblioteca.xml"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE biblioteca SYSTEM "biblioteca.dtd">
<biblioteca>
  <libro id="ISBN-978-84-376-0494-7">
    <titulo>Cien años de soledad</titulo>
    <autor>Gabriel García Márquez</autor>
    <editorial>Editorial Sudamericana</editorial>
    <anio>1967</anio>
    <isbn>978-84-376-0494-7</isbn>
  </libro>
  <libro id="ISBN-978-84-339-7882-0">
    <titulo>1984</titulo>
    <autor>George Orwell</autor>
    <editorial>Editorial Debolsillo</editorial>
    <anio>1949</anio>
    <isbn>978-84-339-7882-0</isbn>
  </libro>
  <libro id="ISBN-978-84-670-5191-1">
    <titulo>El gran Gatsby</titulo>
    <autor>F. Scott Fitzgerald</autor>
    <editorial>Editorial Planeta</editorial>
    <anio>1925</anio>
    <isbn>978-84-670-5191-1</isbn>
  </libro>
</biblioteca>
```

La [DTD original](04-Ejemplos/biblioteca.dtd) declara la raíz `biblioteca`, uno o más `libro` y, en cada libro, título, autor, editorial, año e ISBN. El atributo `id` es un identificador; el elemento `isbn` es otro dato del libro. Las fechas **1967, 1949 y 1925** son los años de los datos de esta biblioteca, no hitos de XPath.

```xpath title="Rutas básicas" origen="Ejemplos didácticos sobre el archivo original"
/biblioteca/libro
/biblioteca/libro/titulo
/biblioteca/libro/@id
/biblioteca/libro[1]/autor
```

La primera devuelve los tres libros; la segunda, sus títulos; la tercera, atributos; la cuarta, el autor del primer libro. El tipo de resultado de la API debe interpretarse según qué se seleccione.

[Ver documento del PDF](04-XPath.pdf#page=9).

## Funciones y consultas explicadas

| Función | Finalidad | Ejemplo del material o aplicado al mismo árbol |
|---|---|---|
| `last()` | Última posición del conjunto de contexto | `/biblioteca/libro[last()]` |
| `position()` | Posición actual | `/biblioteca/libro[position()=2]` |
| `count()` | Número de nodos | `count(/biblioteca/libro)` |
| `contains()` | Comprobar subcadena | `/biblioteca/libro[contains(editorial,'Planeta')]` |
| `starts-with()` | Comprobar prefijo | `/biblioteca/libro[starts-with(@id,'ISBN-978')]` |
| `substring()` | Extraer parte de una cadena | `substring(titulo,1,4)` en el contexto de un libro |
| `string-length()` | Longitud textual | `string-length(autor)` en el contexto de un libro |
| `normalize-space()` | Normalizar espacios sobrantes | `normalize-space(titulo)` |
| `not()` | Negar una condición | `/biblioteca/libro[not(anio > 2000)]` |
| `name()` | Nombre del nodo | `name(/biblioteca/libro[1])` |

La tabla original de la página 10 emplea también rutas `/libro[...]`, que no alcanzan los libros si se evalúan desde el documento `biblioteca`. En esta tabla se indica el contexto o se explicita la raíz; la modificación queda identificada como aplicación al mismo árbol.

### Filtrar por autor o atributos

```xpath title="Expresiones de la página 11"
/biblioteca/libro[autor='George Orwell']
/biblioteca/libro[starts-with(@id, 'ISBN-978-84-339')]
/biblioteca/libro[anio < 1958 and contains(editorial, 'Planeta')]
/biblioteca/libro[position() = 2]
/biblioteca/libro[substring(isbn, string-length(isbn) - 5) = '5191-1']
```

Las dos primeras seleccionan el libro de Orwell. La tercera exige ambas condiciones y selecciona *El gran Gatsby*: su año es 1925 y su editorial contiene Planeta. La cuarta selecciona *1984*, segundo libro del archivo. La quinta compara los seis caracteres finales del ISBN y selecciona el Gatsby.

### Más reciente frente a último del archivo

```xpath title="Consulta del PDF"
/biblioteca/libro[not(anio < //libro/anio)][last()]
```

La consulta busca libros cuyo año no es menor que el de otro libro; finalmente toma el último si hay empate. En los datos originales selecciona el libro de **1967**. No equivale a `/biblioteca/libro[last()]`, que selecciona *El gran Gatsby*, de 1925, por su **posición** en el archivo.

**Explicación didáctica:** el predicado expresa «no existe una comparación que sitúe su año por debajo de otro» en el motor utilizado por los ejemplos. Por eso no se debe interpretar como una simple negación textual de la fecha de un solo libro.

### Consultas del bloque lxml

```xpath title="Ejemplos de la página 31"
//libro[contains(titulo, 'Gatsby')]/editorial
//libro[contains(autor, 'Gabriel')]
//libro/*
//libro[isbn='978-84-339-7882-0']/titulo
//libro[autor='George Orwell']
//libro[number(anio) < 1950]
//isbn
//autor
//titulo
```

Los ejemplos combinan búsqueda por contenido, hijos de cualquier nombre, comparación de un dato y selección directa de todos los ISBN/autores/títulos. `number(anio)` explicita el uso numérico del año; `//libro/*` selecciona elementos hijos y no el atributo `id`.

[Ver funciones](04-XPath.pdf#page=10) · [Ver consultas](04-XPath.pdf#page=11) · [Ver ejemplos lxml](04-XPath.pdf#page=31).

## XPath con ElementTree

**`xml.etree.ElementTree`** pertenece a la biblioteca estándar de Python. El PDF muestra cómo leer el XML, obtener su raíz y aplicar `findall`. Advierte de que implementa **un subconjunto** de XPath, por lo que una expresión válida en otro motor puede no admitirse aquí.

Según el material, admite búsquedas por nombre, rutas relativas, hijos, filtros de atributo y posición. El bloque compara este soporte con funciones, operadores lógicos, `text()` y ejes avanzados que no se utilizan en sus ejercicios con ElementTree. El alcance se refiere al código y entorno del material; no se amplía a otras versiones de la biblioteca.

**Origen:** archivo original [02010-XPath.py](04-Ejemplos/02010-XPath.py).

```python title="02010-XPath.py"
# 02010-XPath.py
# # -*- coding: utf-8 -*-
""""
Ejemplos de uso de XPath

@version 1.2 21/Octubre/2020
@author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
"""

import xml.etree.ElementTree as ET

def verXPath(archivoXML, expresionXPath):
    """Función verXPath(archivoXML, expresionXPath)
Visualiza por pantalla el nodo correspondiente de una expresión XPath de un archivo XML

Version: 1.2 21/Octubre/2020
Author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
    """
    try:

        arbol = ET.parse(archivoXML)

    except IOError:
        print ('No se encuentra el archivo ', archivoXML)
        exit()

    except ET.ParseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        exit()

    raiz = arbol.getroot()

    # Recorrido de los elementos del árbol
    for hijo in raiz.findall(expresionXPath): # Expresión XPath
        print("\nElemento = " , hijo.tag)
        if hijo.text != None:
            print("Contenido = ", hijo.text.strip('\n')) #strip() elimina los '\n' del string
        else:
            print("Contenido = ", hijo.text)
        print("Atributos = ", hijo.attrib)

def main():
    """Prueba de la función verXPath()"""

    print(verXPath.__doc__)

    miArchivoXML = input('Introduzca un archivo XML = ')

    miExpresionXPath = input('Introduzca la expresión XPath = ')

    verXPath(miArchivoXML, miExpresionXPath)

if __name__ == "__main__":
    main()
```

El programa original, versión **1.2 de 21/10/2020**, pregunta por archivo y expresión. `ET.parse` lee el documento; `getroot()` obtiene el contexto inicial; `findall()` recorre los resultados. `tag` contiene el nombre, `text` el texto directo y `attrib` los atributos. La comprobación de `None` evita tratar como texto un valor ausente. Los manejadores distinguen archivo inaccesible y XML mal formado.

La cabecera del archivo empieza con cuatro comillas dobles; se conserva literalmente como material original. El código funciona como ejemplo de consulta, no como validación contra DTD o XSD.

### Contexto y espacios de nombres

Las capturas 23–27 contrastan [pizzas.xml](04-Ejemplos/pizzas.xml) y [pizzas-xsd.xml](04-Ejemplos/pizzas-xsd.xml). Al partir de la raíz `pizzas`, `pizza` busca sus hijos. Para el documento con namespace, el nombre que muestra ElementTree es:

```text title="Nombre expandido del ejemplo"
{http://www.uniovi.es}pizza
```

Ese nombre permite localizar elementos del vocabulario correspondiente. Los archivos asociados [pizzas.xsd](04-Ejemplos/pizzas.xsd), [poema.dtd](04-Ejemplos/poema.dtd), [poema.xsd](04-Ejemplos/poema.xsd), [alba.xml](04-Ejemplos/alba.xml) y [alba-xsd.xml](04-Ejemplos/alba-xsd.xml) permiten comparar las variantes.

**Advertencia sobre las capturas:** aparecen expresiones `.//` sin un nombre final claramente legible en varios títulos. Para practicar una búsqueda de todos los elementos descendientes en el mismo contexto, el ejemplo didáctico explícito es `.//*`; no se presupone que la ruta incompleta sea portable entre motores.

[Ver soporte y código](04-XPath.pdf#page=20) · [Ver namespace](04-XPath.pdf#page=25).

## XPath con lxml

**lxml** requiere instalación separada de la biblioteca estándar. El PDF lo utiliza para expresiones con `contains`, `starts-with`, operadores lógicos, texto y ejes. La ventaja se demuestra con el mismo documento de biblioteca para que el cambio de motor no se confunda con un cambio de datos.

**Origen:** archivo original [02015-XPath-lxml.py](04-Ejemplos/02015-XPath-lxml.py).

```python title="02015-XPath-lxml.py"
# 02015-XPath-lxml.py
# -*- coding: utf-8 -*-
"""
Ejemplos de uso de XPath con lxml
Sin utilizar espacios de nombres

Posiblemente tenga que instalar lxml

Ventajas de lxml: maneja expresiones XPath complejas

@version 1.3 19/Octubre/2025
@author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
"""

from lxml import etree

def verXPath(archivoXML, expresionXPath):
    """
    Función verXPath(archivoXML, expresionXPath)
    Visualiza por pantalla el nodo correspondiente de una expresión XPath de un archivo XML usando lxml

    Version: 1.3 19/Octubre/2025
    Author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
    """
    print("\nArchivo XML     = " + archivoXML)
    print("Expresion XPath = " + expresionXPath)
    try:
        with open(archivoXML, 'rb') as f:
            arbol = etree.parse(f)
    except IOError:
        print('No se encuentra el archivo', archivoXML)
        exit()
    except etree.XMLSyntaxError:
        print("Error procesando el archivo XML =", archivoXML)
        exit()

    # Evaluación de la expresión XPath
    elementos = arbol.xpath(expresionXPath)

    for hijo in elementos:
        if isinstance(hijo, etree._Element):
            print("\nElemento =", hijo.tag)
            texto = hijo.text.strip() if hijo.text else None
            print("Contenido =", texto)
            print("Atributos =", hijo.attrib)
        else:
            print("\nResultado XPath =", hijo)

def main():
    """Prueba de la función verXPath()"""

    print(verXPath.__doc__)

    """ miArchivoXML = input('Introduzca un archivo XML = ')"""

    miArchivoXML = "biblioteca.xml"

    """miExpresionXPath = input('Introduzca la expresión XPath = ')"""

    miExpresionXPath = "//libro[contains(titulo, 'Gatsby')]/autor"

    verXPath(miArchivoXML, miExpresionXPath)

    """Otros ejemplos"""

    verXPath("biblioteca.xml", "//libro[number(anio) < 1958]/titulo")

    verXPath("biblioteca.xml", "//libro[isbn='978-84-339-7882-0']/titulo")

    """
    /biblioteca/libro[contains(@id, 'ISBN')][last()]

    /biblioteca/libro: selecciona todos los elementos <libro> que están directamente dentro de <biblioteca>.
    [contains(@id, 'ISBN')]: filtra esos libros para que solo se incluyan aquellos cuyo atributo id contiene la cadena "ISBN".
    [last()]: selecciona el último de esos elementos filtrados.
    /titulo: muestra el elemento titulo
    """
    verXPath("biblioteca.xml", "/biblioteca/libro[contains(@id, 'ISBN')][last()]/titulo")

    """
    Encuentra el título del libro más reciente (último año) y luego selecciona el último si hay varios con ese año.
    /biblioteca/libro[not(anio < //libro/anio)][last()]/titulo
    """
    verXPath("biblioteca.xml", "/biblioteca/libro[not(anio < //libro/anio)][last()]/titulo")


if __name__ == "__main__":
    main()
```

La versión original es **1.3 de 19/10/2025**. Lee el XML en binario, lo analiza con `etree.parse`, evalúa `arbol.xpath` e inspecciona cada resultado. Si es un elemento, imprime etiqueta, texto y atributos; si es otro tipo de ítem dentro de una lista, imprime su representación.

La función principal demuestra:

1. Autor de un título que contiene Gatsby: **F. Scott Fitzgerald**.
2. Títulos con año menor que 1958: *1984* y *El gran Gatsby*.
3. Título con ISBN concreto: *1984*.
4. Último libro cuyo `id` contiene ISBN: *El gran Gatsby*.
5. Título más reciente por año: *Cien años de soledad*.

::: aviso Resultado escalar y bucle del ejemplo original
La teoría admite números y booleanos, pero el programa original itera directamente sobre `elementos`. Esto funciona con las consultas de nodos de su `main`; una llamada como `count(/biblioteca/libro)` produce un resultado escalar que no se puede recorrer del mismo modo. Se conserva el original y se explicita esta limitación para no atribuirle soporte que su bucle no ofrece.
:::

**Ejemplo didáctico:** para comprobar el recuento de los mismos datos sin pasar por ese bucle:

```python title="contar.py" origen="Ejemplo didáctico"
from lxml import etree

arbol = etree.parse("biblioteca.xml")
print(arbol.xpath("count(/biblioteca/libro)"))
```

El resultado es **3** en sentido numérico; la representación impresa depende del tipo devuelto por el motor. Este fragmento requiere lxml y el archivo original en su carpeta de trabajo.

[Ver lxml](04-XPath.pdf#page=29) · [Ver programa y ejecución](04-XPath.pdf#page=32).

## Errores frecuentes y repaso

Los ejemplos permiten identificar cinco confusiones: omitir el nodo raíz en rutas absolutas, usar una ruta de documento donde el contexto ya es su elemento raíz, olvidar namespaces, esperar funciones no admitidas por el motor y confundir posición con año más reciente.

::: pregunta ¿Por qué pizza puede no seleccionar nada en pizzas-xsd.xml?
Porque los elementos de ese documento pertenecen al espacio http://www.uniovi.es. En ElementTree se muestran con el nombre expandido {http://www.uniovi.es}pizza, que distingue ese vocabulario de un elemento sin namespace.
:::

::: pregunta ¿Qué devuelve el último libro y qué devuelve el más reciente?
El último del archivo es El gran Gatsby; el más reciente por el campo anio es Cien años de soledad. last() expresa posición y necesita combinarse con el filtro por año si se pretende resolver la segunda pregunta.
:::

1. Distingue `/`, `//`, `.`, `..`, `@id`, `*` y `text()`.
2. Explica el contexto necesario para `substring(titulo,1,4)`.
3. Predice las consultas de las páginas 11 y 31 sobre los tres libros.
4. Explica la diferencia entre `findall` y `xpath` en estos programas.
5. Identifica qué error corresponde a un archivo ausente y cuál a un XML mal formado.
6. Usa el ejemplo didáctico para contar los libros y explica por qué no se utiliza sin cambios el bucle del original.

## Resumen final

XPath selecciona información dentro de árboles XML usando rutas, contexto, predicados y funciones. Una ruta puede devolver varios nodos y una expresión puede devolver un escalar. Los programas deben distinguir ambos resultados. ElementTree sirve para las búsquedas del subconjunto mostrado; lxml permite las consultas más amplias de los ejercicios. Los nombres exactos, el contexto y los namespaces son tan importantes como la expresión escrita.

## Referencias y cobertura

- [Documento original](04-XPath.pdf): **35 páginas analizadas**, incluidas capturas de consultas y ejecución de ambos programas.
- Cobertura: definición (4), contexto/sintaxis (6–8), biblioteca y funciones (9–11), conclusiones (13), bibliografía/referencias (15–18), ElementTree (20–27), lxml (29–34).
- Incorporados los dos programas originales y el XML de biblioteca; enlazadas las variantes con DTD/XSD. Se identifican rutas abreviadas, capturas ambiguas y limitación con escalares del bucle original.
- Bibliografía: *XML imprescindible*, Harold/Means, 2005; *Beginning XML*, Fawcett/Quin/Ayers, 2012.
- Referencias citadas: [XPath 2.0](https://www.w3.org/TR/xpath20/) y [tutorial XPath](https://www.w3schools.com/xml/xpath_intro.asp). No se han usado fuentes externas para actualizar versiones o completar teoría.
