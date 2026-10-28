---
asignatura: Software y Estándares para la Web
titulo: Introducción a XML
resumen: Estructura de un documento XML bien formado.
fuente: 01-Introducción-XML.pdf
---

# Introducción a XML: resumen

Lectura inicial: **XML = datos + marcado jerárquico**. El vocabulario expresa el dominio; la estructura puede representarse como árbol DOM y la presentación se decide por separado.

## Reglas mínimas

- **Una raíz**, etiquetas cerradas y correctamente anidadas.
- Nombres sensibles a mayúsculas/minúsculas y sin espacios.
- Atributos entre comillas, sin repetir nombre en el mismo elemento; su orden no es significativo.
- `version`, `encoding`, `standalone`: versión, codificación y dependencia de declaraciones externas.
- `xml:lang`, `xml:space`, `xml:base`: idioma, tratamiento de espacios y base de rutas.

**Ejemplo didáctico**, basado en las pizzas del PDF:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<pizzas>
  <pizza nombre="Barbacoa" precio="8,0€">
    <ingrediente nombre="Mozzarella"/>
  </pizza>
</pizzas>
```

Raíz `pizzas` → hijo `pizza` → hijo vacío `ingrediente`. Los atributos guardan nombres y precio; un poema, en cambio, guarda versos como texto de elementos.

## Sintaxis frente a gramática

| Estado | Qué comprueba |
|---|---|
| **Bien formado** | Sintaxis de XML |
| **Válido** | Buena formación y conformidad con DTD/Schema |

**Entidades:** `&amp;`, `&lt;`, `&gt;`, `&apos;`, `&quot;`. **CDATA** conserva texto con caracteres de marcado sin escaparlos:

```xml
<codigo><![CDATA[x < 3 && y > 4]]></codigo>
```

El segundo bloque es didáctico. Los comentarios no se anidan ni contienen `--`.

## Vocabularios y ejemplos

| Vocabulario | Aplicación |
|---|---|
| **KML / KMZ** | Datos geográficos / KML empaquetado en ZIP |
| **SVG** | Gráficos vectoriales 2D; formas, imágenes y texto |
| **WaterML** | Series hidrológicas de tiempo y valor |

[Pizzas y árbol](01-Ejemplos/pizzas.svg), [libros](01-Ejemplos/libros.xml), [Oviedo KML](01-Ejemplos/Oviedo.kml), [figuras SVG](01-Ejemplos/Rectangulo-circulo.svg) y [WaterML](01-Ejemplos/Precipitacion_Anual_Clasificada_WaterML.xml) muestran distintos modelos con la misma base XML.

## Fechas y límites

- **1986:** SGML; **1995:** desarrollo de XML según la fuente.
- **26/01/2000 / 31/05/2001:** XHTML 1.0 / 1.1.
- **29/09/2006:** referencia de XML 1.1 del PDF.
- **04/09/2001:** SVG 1.0; **14/01/2003:** SVG 1.1; **16/08/2011:** segunda edición; **04/10/2018:** SVG 2 Candidate Recommendation.

**Ventaja:** intercambio, legibilidad y vocabularios estructurados. **Coste:** verbosidad, tamaño y procesamiento. Describir un programa en XML **no lo ejecuta**. Las erratas y generalizaciones de las diapositivas se señalan en los apuntes completos.

[Sintaxis](01-Introducci%C3%B3n-XML.pdf#page=60) · [Buena formación](01-Introducci%C3%B3n-XML.pdf#page=76) · [Validez](01-Introducci%C3%B3n-XML.pdf#page=82).

## Fuente y ampliación

Síntesis del [PDF original](01-Introducci%C3%B3n-XML.pdf) y de los [apuntes completos](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml). Las fechas se reproducen según el material docente.
