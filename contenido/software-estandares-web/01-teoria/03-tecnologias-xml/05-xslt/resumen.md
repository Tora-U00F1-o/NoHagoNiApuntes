---
asignatura: Software y Estándares para la Web
titulo: XSLT
resumen: Transformación de XML con hojas XSLT.
fuente: 05-XSLT.pdf
---

# XSLT: resumen

Lectura inicial: **XSLT transforma la estructura de datos XML**. XPath selecciona información, las plantillas construyen salida y CSS puede presentarla después.

## Reparto de responsabilidades

| Tecnología | Función |
|---|---|
| XPath | Seleccionar nodos y valores |
| XSLT | Construir otro XML, HTML o texto |
| XSL-FO | Formateo que puede participar en generar PDF |
| CSS | Estilo; no realiza las transformaciones estructurales estudiadas |

**Flujo:** XML + hoja XSLT → procesador → resultado → serialización/formateo.

## Instrucciones esenciales

| Instrucción | Qué debes entender |
|---|---|
| `template match` | Regla para nodos que coinciden con un patrón |
| `apply-templates select` | Delegar nodos en sus plantillas |
| `value-of select` | Emitir valor textual |
| `for-each select` | Repetir con un nuevo contexto por nodo |
| `sort` | Ordenar por clave, tipo y sentido |
| `if test` | Condición sin else |
| `choose/when/otherwise` | Casos y alternativa |
| `element/attribute` | Construir nodos de salida |
| `variable/param/with-param` | Valores, parámetros y argumentos |

**Ejemplo didáctico basado en el poema:**

```xml
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>
  <xsl:template match="poema">
    <h1><xsl:value-of select="titulo"/></h1>
    <xsl:for-each select="verso">
      <p><xsl:value-of select="."/></p>
    </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>
```

En la plantilla, `titulo` parte de `poema`; en el bucle, `.` es cada verso. Véase la [hoja completa original](05-Ejemplos/poemaCompleto.xsl).

## Variables, AVT y filtros

- `$precio` lee una variable; no se reasigna como en un programa imperativo.
- `select="'artist'"` es literal de texto; `select="artist"` selecciona un nodo.
- **AVT:** `order="{$orden}"` evalúa el parámetro dentro del atributo.
- `not(position()=last())` permite poner comas sin separador final.
- `method="xml|html|text"`, codificación, declaración e indentación controlan la salida.

## Fechas y límites del original

- **08/06/2017:** recomendación XSLT **3.0** citada; la mayoría de hojas adjuntas son **1.0**.
- «Últimos cinco años» usa **2017 fijo**, no el año actual, y su solución no muestra la ordenación pedida.
- Intervalo original: **2010 < año ≤ 2015**. El extremo inicial es exclusivo.
- `contains(authors,$author)` busca subcadena, no igualdad exacta con un autor.
- La hoja elementos2atributos genera hermanos sin raíz común: no garantiza por sí sola un documento XML completo.
- Las capturas antiguas de navegador son demostraciones; el PDF advierte de cambios de soporte.

Casos para estudiar: [música parametrizada](05-Ejemplos/musica-par.xsl), [artículos](05-Ejemplos/articulos-1/articulos.xsl), [recetas](05-Ejemplos/recetas-5/recetas5.xsl). Transformar **no sustituye validar** entrada, HTML/CSS o KML/SVG de salida.

[Plantillas](05-XSLT.pdf#page=37) · [Condiciones](05-XSLT.pdf#page=61) · [Parámetros](05-XSLT.pdf#page=86).

## Fuente y ampliación

Síntesis del [PDF original](05-XSLT.pdf) y de los [apuntes completos](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt). Las fechas se reproducen según el material docente.
