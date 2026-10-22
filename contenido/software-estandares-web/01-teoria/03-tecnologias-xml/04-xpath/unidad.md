---
asignatura: Software y Estándares para la Web
titulo: XPath
resumen: Selección de nodos en un documento XML con XPath.
---

# XPath

## Conceptos

XPath navega el árbol del documento mediante rutas y predicados.

## Ejemplos

```text title="Expresiones" origen="sobre libros.xml"
/biblioteca/libro/titulo
//libro[@isbn='978-0-13-468599-1']/autor
count(//libro)
```
