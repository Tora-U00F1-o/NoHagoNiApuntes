---
asignatura: Software y Estándares para la Web
titulo: Lenguajes de marcado
resumen: Introducción a los lenguajes de marcado.
fuente: LenguajesMarcado.pdf
---

# Lenguajes de marcado

## Contenido

1. [Introducción](#introduccion)
2. [SGML](#sgml)
3. [Evolución de HTML](#evolucion-de-html)
4. [La familia XHTML](#la-familia-xhtml)
5. [WHATWG y HTML5](#whatwg-y-html5)
6. [XML como metalenguaje](#xml-como-metalenguaje)
7. [Comparación y ejemplo](#comparacion-y-ejemplo)
8. [Preguntas de repaso](#preguntas-de-repaso)
9. [Resumen final](#resumen-final)
10. [Referencias y cobertura](#referencias-y-cobertura)

## Introducción

Los lenguajes de marcado organizan documentos mediante marcas que expresan su estructura. El PDF presenta la evolución de **SGML, HTML, XHTML, XML y HTML5** para explicar la relación entre estructuras documentales, interoperabilidad y estandarización. No pretende enseñar todavía todo el vocabulario de HTML o la sintaxis completa de XML.

El objetivo es reconocer qué lenguajes definen documentos y cuáles permiten definir vocabularios, entender por qué se buscaron alternativas a SGML y seguir los hitos que desembocan en una especificación compartida de HTML y DOM.

## SGML

**SGML**, *Standard Generalized Markup Language*, es un sistema para crear formatos de documentos mediante su **marcado estructural**. Su atención se centra en la estructura del documento. La ISO lo normalizó mediante **ISO 8879:1986**.

Su principal dificultad para la Web, según la diapositiva 3, es la **complejidad**. Este problema permite entender que las tecnologías posteriores busquen conservar el marcado estructural con soluciones más manejables.

[Ver diapositiva 3](LenguajesMarcado.pdf#page=3).

## Evolución de HTML

**HTML** significa *HyperText Markup Language*. El documento sitúa en **1991** la primera definición de *HTML Tags* publicada por Tim Berners-Lee: un subconjunto de SGML con **22 elementos**. La página 4 menciona también ViolaWWW y el trabajo del grupo HTML del IETF.

### HTML 2.0 y las propuestas de la década de 1990

Entre **1993 y 1995** se establecen las características básicas de **HTML 2.0**, recogidas en la **RFC 1866** y vinculadas a Tim Berners-Lee y Dan Connolly.

En **marzo de 1995**, el W3C publica el borrador de **HTML 3.0**, que propone tablas, flujo de texto alrededor de imágenes y fórmulas matemáticas. La diferencia respecto a HTML 2.0 hacía poco manejable estandarizar y desarrollar toda la propuesta.

**HTML 3.2**, de **enero de 1997**, incorpora tablas, applets, flujo de texto alrededor de imágenes, subíndices y superíndices. El PDF cita la participación de IBM, Microsoft, Netscape, Novell, SoftQuad, Spyglass y Sun Microsystems.

### HTML 4.0 y 4.01

En **diciembre de 1997** aparece **HTML 4.0**. El material relaciona esta versión con multimedia, lenguajes de scripting, hojas de estilo, impresión, accesibilidad e internacionalización. La página 6 añade una mención a XForms 1.0 sin desarrollar su relación o cronología; se conserva como mención del documento, sin deducir de ella una fecha de publicación de XForms.

**HTML 4.01**, de **diciembre de 1999**, corrige errores detectados. El PDF destaca la compatibilidad de los agentes con versiones anteriores y los problemas de interoperabilidad asociados a la creación de nuevos elementos de marcado.

La diapositiva 7 sitúa en **2004** una iniciativa del W3C para HTML5 y explica que se paralizan los trabajos al dar prioridad a XHTML. Esta es la secuencia que emplea el material para introducir WHATWG.

[Ver HTML inicial](LenguajesMarcado.pdf#page=4) · [Ver HTML 3](LenguajesMarcado.pdf#page=5) · [Ver HTML 4](LenguajesMarcado.pdf#page=6).

## La familia XHTML

**XHTML**, *eXtensible HyperText Markup Language*, no designa un único lenguaje: el PDF lo define como una **familia de tipos de documentos**. Sus elementos mantienen la semántica de HTML 4, pero la reformulación en XML busca mejorar la **interoperabilidad**, la transformación de la representación del contenido y el escalado de funcionalidades.

**Explicación didáctica:** conservar la semántica significa mantener el significado de los elementos; reformular el documento en XML afecta a cómo se expresa y procesa su estructura.

| Fecha indicada en el PDF | Hito de XHTML |
|---|---|
| 26 de enero de 2000 | XHTML 1.0: reformulación de HTML 4 en XML 1.0 |
| 31 de mayo de 2001 | XHTML 1.1, basado en módulos |
| 1 de agosto de 2002 | Segunda edición de XHTML 1.0 |
| 18 de febrero de 2004 | Modularization of XHTML 1.0, segunda edición |
| 29 de julio de 2008 | XHTML Basic 1.1 |
| 8 de octubre de 2008 | XHTML Modularization 1.1 |
| 29 de julio de 2010 | Segunda edición de XHTML Modularization 1.1 |
| 23 de noviembre de 2010 | Segunda edición de XHTML 1.1 |
| 17 de diciembre de 2010 | Cierre del grupo de trabajo XHTML2, según la diapositiva 9 |

Estas fechas se reproducen como **cronología del PDF**, sin sustituirlas por información externa. La presentación no desarrolla las diferencias funcionales de todas las variantes.

[Ver concepto](LenguajesMarcado.pdf#page=8) · [Ver fechas](LenguajesMarcado.pdf#page=9).

## WHATWG y HTML5

El **4 de junio de 2004** se crea **WHATWG**, *Web Hypertext Application Technology Working Group*, en respuesta a la paralización de HTML que describe el documento. Lo forman Apple, Mozilla Foundation y Opera Software.

El **10 de abril de 2007**, WHATWG propone al W3C adoptar su especificación de HTML5. El **9 de mayo de 2007**, el W3C relanza el grupo de trabajo de HTML y adopta esa especificación.

La línea temporal de la página 12 incorpora la recomendación de **HTML5 del 28 de octubre de 2014**. La página 11 recoge el **memorando de entendimiento del 28 de mayo de 2019 entre W3C y WHATWG**, asociado a una versión única de HTML y otra de DOM.

| Fecha | Idea que se debe retener |
|---|---|
| 1986 | Normalización de SGML |
| 1991 | HTML Tags |
| 1993–1995 | HTML 2.0 |
| Marzo de 1995 | Borrador HTML 3.0 |
| Enero / diciembre de 1997 | HTML 3.2 / HTML 4.0 |
| Diciembre de 1999 | HTML 4.01 |
| 2000 / 2001 | XHTML 1.0 / XHTML 1.1 |
| 4 de junio de 2004 | WHATWG |
| Abril / mayo de 2007 | Propuesta y adopción de HTML5 |
| 28 de octubre de 2014 | HTML5 Recommendation |
| 28 de mayo de 2019 | Acuerdo W3C–WHATWG sobre HTML y DOM |

La figura original representa estos hitos como flechas sobre una línea temporal. Los hechos de 2014 y 2019 se muestran en recuadros añadidos al extremo de la figura: no deben confundirse con las marcas anteriores de su eje gráfico.

[Ver WHATWG](LenguajesMarcado.pdf#page=10) · [Ver acuerdo](LenguajesMarcado.pdf#page=11) · [Ver línea temporal](LenguajesMarcado.pdf#page=12).

## XML como metalenguaje

El PDF atribuye al consorcio Web el desarrollo de **XML desde 1995**. Lo presenta como una versión simplificada de SGML y como un **metalenguaje**: permite definir vocabularios para aplicaciones concretas.

Sus objetivos son proporcionar un estándar de intercambio de información en la Web, abierto e independiente de plataforma; permitir vocabularios específicos y su **autodescripción**; y facilitar que las aplicaciones descubran el formato de la información para procesarla.

**Explicación didáctica:** un vocabulario fija las marcas apropiadas para un dominio. Por ello XML sirve para expresar datos con nombres significativos para la aplicación, mientras que HTML proporciona elementos destinados a los documentos web.

[Ver diapositiva 13](LenguajesMarcado.pdf#page=13).

## Comparación y ejemplo

| Tecnología | Caracterización del documento | Idea distintiva |
|---|---|---|
| SGML | Sistema general de marcado estructural | Potente, pero demasiado complejo para su adopción en la Web |
| HTML | Lenguaje de hipertexto inicialmente ligado a SGML | Vocabulario para documentos web |
| XHTML | Familia que reformula HTML en XML | Misma semántica de HTML 4 y búsqueda de interoperabilidad |
| XML | Metalenguaje simplificado respecto a SGML | Vocabularios de aplicación e intercambio de datos |
| HTML5 | Evolución de HTML impulsada por WHATWG y adoptada por W3C | Cronología que culmina en el acuerdo sobre especificaciones únicas |

**Ejemplo didáctico:** el primer fragmento utiliza marcas HTML; el segundo ilustra un vocabulario de datos definido para libros. No son ejemplos incluidos en las diapositivas y no sustituyen las reglas de las unidades posteriores.

```html title="documento-web.html" origen="Ejemplo didáctico"
<h1>Lenguajes de marcado</h1>
<p>El documento organiza el contenido con marcas.</p>
```

```xml title="datos.xml" origen="Ejemplo didáctico"
<libros>
  <libro>
    <titulo>Lenguajes de marcado</titulo>
  </libro>
</libros>
```

`h1` y `p` pertenecen al vocabulario HTML. `libros`, `libro` y `titulo` expresan el dominio de la segunda aplicación: la idea ilustrada es la definición de vocabularios que el PDF atribuye a XML.

## Preguntas de repaso

::: pregunta ¿Por qué XML es un metalenguaje?
Porque permite definir lenguajes o vocabularios específicos para una aplicación. El PDF lo vincula al intercambio de información, la independencia de plataforma y la autodescripción de los datos.
:::

::: pregunta ¿Qué conserva XHTML de HTML 4 y qué pretende mejorar?
Conserva la semántica de sus elementos. La familia XHTML busca interoperabilidad y facilita transformar la representación del contenido y escalar funcionalidades mediante su reformulación en XML.
:::

1. Explica qué se normalizó en 1986 y por qué resultaba complejo para la Web.
2. Ordena HTML 2.0, HTML 3.2, HTML 4.0 y HTML 4.01; asocia las fechas principales.
3. Compara las propuestas de HTML 3.0 con el contenido de HTML 3.2.
4. Identifica quiénes forman WHATWG en 2004 y qué sucede en abril y mayo de 2007.
5. Distingue el hito de 2014 del acuerdo de 2019.
6. Explica el propósito de los dos fragmentos de código anteriores.

## Resumen final

La evolución comienza con un sistema general de marcado estructural, SGML, y continúa con lenguajes para la Web y metalenguajes de intercambio. HTML desarrolla su vocabulario; XHTML lo reformula en XML; XML permite vocabularios específicos. WHATWG impulsa HTML5, el W3C adopta su especificación y el acuerdo de 2019 vincula a ambos organismos con versiones únicas de HTML y DOM.

## Referencias y cobertura

- [Documento original: LenguajesMarcado.pdf](LenguajesMarcado.pdf). **14 páginas analizadas**, incluida la línea temporal de la página 12.
- Cobertura: SGML (3), evolución HTML (4–7), familia XHTML (8–9), WHATWG/HTML5 (10–12), XML (13) y referencias (14).
- El PDF no incluye ejemplos de código: se han añadido dos fragmentos expresamente didácticos. Las menciones históricas ambiguas se identifican sin completarlas con teoría externa.
- Referencias del documento: [HTML](https://html.spec.whatwg.org/multipage/) y [XML](https://www.w3.org/XML/). Se recogen como bibliografía, sin consultar su contenido para ampliar estos apuntes.
