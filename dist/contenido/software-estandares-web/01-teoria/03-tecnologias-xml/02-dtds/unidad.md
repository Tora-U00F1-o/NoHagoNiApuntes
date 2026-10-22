---
asignatura: Software y Estándares para la Web
titulo: DTDs
resumen: Definición de la estructura de un XML con DTD.
---

# DTDs

## Conceptos

Una DTD declara qué elementos y atributos puede tener un documento válido.

## Ejemplos

```dtd title="biblioteca.dtd"
<!ELEMENT biblioteca (libro+)>
<!ELEMENT libro (titulo, autor)>
<!ATTLIST libro isbn CDATA #REQUIRED>
<!ELEMENT titulo (#PCDATA)>
<!ELEMENT autor (#PCDATA)>
```
