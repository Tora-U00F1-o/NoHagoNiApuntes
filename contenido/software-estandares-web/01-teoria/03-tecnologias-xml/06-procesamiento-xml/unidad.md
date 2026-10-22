---
asignatura: Software y Estándares para la Web
titulo: Procesamiento de XML
resumen: Lectura de XML desde programas (DOM y SAX).
---

# Procesamiento de XML

## Conceptos

DOM carga todo el árbol en memoria; SAX procesa el documento por eventos.

## Ejemplos

```java title="LeerLibros.java"
var doc = DocumentBuilderFactory.newInstance()
    .newDocumentBuilder().parse(new File("libros.xml"));
NodeList titulos = doc.getElementsByTagName("titulo");
for (int i = 0; i < titulos.getLength(); i++) {
    System.out.println(titulos.item(i).getTextContent());
}
```
