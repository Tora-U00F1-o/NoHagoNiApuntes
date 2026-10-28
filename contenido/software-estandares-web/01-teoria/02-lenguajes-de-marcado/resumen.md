---
asignatura: Software y Estándares para la Web
titulo: Lenguajes de marcado
resumen: Introducción a los lenguajes de marcado.
fuente: LenguajesMarcado.pdf
---

# Lenguajes de marcado: resumen

Lectura inicial: **SGML y XML permiten definir vocabularios; HTML describe documentos web y XHTML reformula HTML en XML**. La evolución también es una historia de interoperabilidad y acuerdos entre organismos.

## Qué es cada tecnología

| Tecnología | Idea principal |
|---|---|
| SGML | Marcado estructural general; demasiado complejo para la Web según el PDF |
| HTML | HyperText Markup Language; vocabulario de hipertexto |
| XHTML | Familia de documentos con semántica de HTML 4 reformulada en XML |
| XML | Metalenguaje simplificado respecto a SGML; intercambio y vocabularios propios |
| HTML5 | Evolución impulsada por WHATWG y adoptada por W3C |

**Ejemplo didáctico:** HTML aporta elementos del documento; el XML define nombres apropiados para datos de libros.

```html
<h1>Biblioteca</h1>
<p>Catálogo de libros.</p>
```

```xml
<libros><libro><titulo>Catálogo</titulo></libro></libros>
```

## Cronología para estudiar

| Fecha | Hito recogido por el PDF |
|---|---|
| **1986** | SGML: ISO 8879:1986 |
| **1991** | HTML Tags de Berners-Lee: 22 elementos |
| **1993–1995** | HTML 2.0, RFC 1866 |
| **Marzo de 1995** | Borrador HTML 3.0: tablas, flujo de texto, matemáticas |
| **Enero de 1997** | HTML 3.2 |
| **Diciembre de 1997** | HTML 4.0: estilos, scripting, accesibilidad e internacionalización |
| **Diciembre de 1999** | HTML 4.01: correcciones y compatibilidad anterior |
| **26/01/2000** | XHTML 1.0 |
| **31/05/2001** | XHTML 1.1 modular |
| **04/06/2004** | WHATWG: Apple, Mozilla y Opera |
| **10/04/2007** | WHATWG propone su HTML5 al W3C |
| **09/05/2007** | W3C relanza el grupo HTML y adopta la especificación |
| **28/10/2014** | HTML5 Recommendation |
| **28/05/2019** | Acuerdo W3C–WHATWG: especificaciones únicas de HTML y DOM |

El material sitúa el desarrollo de **XML desde 1995**. En XHTML también recoge segundas ediciones y modularización; la tabla completa está en los apuntes.

## Distinciones que importan

- **Semántica:** significado de los elementos; XHTML conserva la de HTML 4.
- **Metalenguaje:** sirve para definir lenguajes, como XML para vocabularios de aplicación.
- **Interoperabilidad:** motivación de la evolución y de las especificaciones compartidas.
- Un borrador, una recomendación y una segunda edición son **hitos diferentes**. Las fechas anteriores corresponden a la cronología docente.

[Evolución HTML](LenguajesMarcado.pdf#page=4) · [XHTML](LenguajesMarcado.pdf#page=8) · [Acuerdo](LenguajesMarcado.pdf#page=11) · [Línea temporal](LenguajesMarcado.pdf#page=12).

## Fuente y ampliación

Síntesis del [PDF original](LenguajesMarcado.pdf) y de los [apuntes completos](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado). Las fechas se reproducen según el material docente.
