---
asignatura: Software y Estándares para la Web
titulo: XPath
resumen: Selección de nodos en un documento XML con XPath.
fuente: 04-XPath.pdf
---

# XPath: resumen

Lectura inicial: **XPath selecciona datos dentro del árbol XML**. Una misma expresión cambia de significado si cambia el nodo de contexto o el namespace.

## Sintaxis que hay que reconocer

| Expresión | Selección |
|---|---|
| `/biblioteca/libro` | Libros desde la raíz del documento |
| `libro` | Hijos libro del contexto actual |
| `//titulo` | Títulos en cualquier nivel desde el documento |
| `.` / `..` | Nodo actual / padre |
| `*` / `text()` | Elementos hijos / nodos de texto |
| `@id` | Atributo |
| `[1]`, `[last()]` | Predicados de posición, desde 1 |
| `[@id='...']` | Filtro por atributo |

## Consultas sobre la biblioteca original

```xpath
/biblioteca/libro[autor='George Orwell']/titulo
/biblioteca/libro[position()=2]
//libro[contains(titulo,'Gatsby')]/editorial
//libro[number(anio) < 1950]/titulo
count(/biblioteca/libro)
```

Sobre [biblioteca.xml](04-Ejemplos/biblioteca.xml), las respuestas son: *1984*; el segundo libro (*1984*); Editorial Planeta; *1984* y *El gran Gatsby*; tres libros.

Funciones para retener: `last`, `position`, `count`, `contains`, `starts-with`, `substring`, `string-length`, `normalize-space`, `not` y `name`. La consulta puede devolver **nodos, cadena, número o booleano**.

**Último no significa más reciente:** el último del archivo es Gatsby (1925); el de mayor año es *Cien años de soledad* (1967). El PDF lo selecciona con:

```xpath
/biblioteca/libro[not(anio < //libro/anio)][last()]
```

## Motores y código

| Herramienta | Alcance del ejemplo |
|---|---|
| `xml.etree.ElementTree` | Biblioteca estándar, subconjunto de XPath; `getroot().findall(...)` |
| `lxml` | Instalación separada; consultas del material con funciones y filtros más amplios mediante `xpath(...)` |

**Ejemplo didáctico:**

```python
from lxml import etree
arbol = etree.parse("biblioteca.xml")
print(arbol.xpath("count(/biblioteca/libro)"))
```

El bucle de [02015-XPath-lxml.py](04-Ejemplos/02015-XPath-lxml.py) original recorre listas; un número escalar de `count` requiere tratarse aparte. [02010-XPath.py](04-Ejemplos/02010-XPath.py) permite comparar ElementTree.

## Fechas y errores típicos

- Recomendación XPath 2.0 citada: **14/12/2010**; corrección de enlaces **03/01/2011**; estado actualizado en **octubre de 2016**.
- Programa ElementTree: **21/10/2020**. Programa lxml: **19/10/2025**.
- Omitir `biblioteca` en una ruta absoluta, usar funciones que el motor no admite o ignorar el namespace produce consultas incorrectas o vacías.
- En ElementTree, un nombre del ejemplo con namespace aparece como **`{http://www.uniovi.es}pizza`**.

[Sintaxis](04-XPath.pdf#page=8) · [Funciones](04-XPath.pdf#page=10) · [Motores](04-XPath.pdf#page=20).

## Fuente y ampliación

Síntesis del [PDF original](04-XPath.pdf) y de los [apuntes completos](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath). Las fechas se reproducen según el material docente.
