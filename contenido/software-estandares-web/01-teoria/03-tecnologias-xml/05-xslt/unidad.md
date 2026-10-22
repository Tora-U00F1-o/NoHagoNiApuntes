---
asignatura: Software y Estándares para la Web
titulo: XSLT
resumen: Transformación de XML con hojas XSLT.
---

# XSLT

## Conceptos

XSLT transforma un XML en otro formato (por ejemplo HTML) mediante plantillas.

## Ejemplos

```xml title="libros.xsl"
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <ul>
      <xsl:for-each select="biblioteca/libro">
        <li><xsl:value-of select="titulo"/></li>
      </xsl:for-each>
    </ul>
  </xsl:template>
</xsl:stylesheet>
```
