---
asignatura: Software y Estándares para la Web
titulo: DTDs
resumen: Definición de la estructura de un XML con DTD.
fuente: 02-DTDs.pdf
---

# DTDs: resumen

Lectura inicial: **una DTD es la gramática de una familia XML**. Define contenido, relaciones y atributos; validar exige primero buena formación.

## Elementos y cardinalidad

| Escritura | Significado |
|---|---|
| `(a,b)` | Secuencia: a seguido de b |
| `(a|b)` | Alternativa |
| `a?` / `a*` / `a+` | 0–1 / 0 o más / 1 o más |
| `(#PCDATA)` | Texto |
| `EMPTY` | Sin contenido; puede tener atributos |
| `ANY` | Modelo abierto, desaconsejado frente a estructurar |
| `(#PCDATA|enfasis)*` | Texto y elementos mezclados |

**Fragmento del modelo original de libros:**

```dtd
<!ELEMENT libros (libro+)>
<!ELEMENT libro (título, autor+, año?, precio, editorial, clasificación, idioma)>
<!ATTLIST libro isbn ID #REQUIRED>
<!ATTLIST precio moneda CDATA #REQUIRED>
```

Orden fijo, autores repetidos y año opcional. Las declaraciones de los demás elementos están en [libros.dtd](02-Ejemplos/libros.dtd).

## Asociar y declarar atributos

```xml
<!DOCTYPE libros SYSTEM "libros.dtd">
```

La DTD puede ser **interna** en `DOCTYPE [...]`, **externa SYSTEM** o identificada con **PUBLIC**.

| Atributos | Condición |
|---|---|
| `#REQUIRED` | Obligatorio |
| `#IMPLIED` | Opcional sin valor por defecto |
| `"valor"` | Valor por defecto modificable |
| `#FIXED "valor"` | Valor fijo |
| `CDATA` | Texto |
| `ID / IDREF` | Identidad única / referencia |
| `NMTOKEN / NMTOKENS` | Testigo sin espacios / lista de testigos |
| `(euros|dólares)` | Enumeración |

## Entidades, notaciones y namespaces

- **ENTITY:** abreviar texto o referir recursos; internas/externas, analizadas/no analizadas, generales/de parámetro.
- `&nombre;` referencia una entidad general; `%nombre;` reutiliza contenido en la DTD.
- **NOTATION:** identifica formatos de datos externos; `NDATA` asocia la entidad con su notación.
- **Namespaces:** URI + nombre distingue, por ejemplo, capital geográfica de capital monetario. El prefijo abrevia; la URI no tiene que ser una página descargable.
- DTD no trata namespaces de forma directa: hay que declarar los nombres prefijados y atributos `xmlns` usados.

## Cómo comprobar

```bash
xmllint --noout --dtdvalid poema.dtd alba.xml
```

Primero sintaxis; después reglas de la gramática. [pizzas-DTD-error.xml](02-Ejemplos/pizzas-DTD-error.xml) carece de un cierre: falla **antes** de validar contenido. Los ejemplos de [artículos](02-Ejemplos/articulos.dtd) y [recetas](02-Ejemplos/recetas.dtd) muestran gramáticas completas.

**Fecha documental:** el PDF referencia XML 1.1 de **29/09/2006**; no fija aquí una fecha de creación de DTD. CDATA no demuestra que un año o precio sea numéricamente correcto. Las erratas de sintaxis originales se explican en los apuntes.

[Modelos](02-DTDs.pdf#page=16) · [Atributos](02-DTDs.pdf#page=22) · [Namespaces](02-DTDs.pdf#page=38) · [Validación](02-DTDs.pdf#page=47).

## Fuente y ampliación

Síntesis del [PDF original](02-DTDs.pdf) y de los [apuntes completos](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds). Las fechas se reproducen según el material docente.
