---
asignatura: Software y Estándares para la Web
titulo: Procesamiento de XML
resumen: Lectura de XML desde programas (DOM y SAX).
fuente: 06-Procesamiento-XML.pdf
---

# Procesamiento de XML: resumen

Lectura inicial: **un parser convierte XML en información accesible para un programa**. Buena formación, validación, consulta, transformación y presentación son comprobaciones distintas.

## Elegir el modelo

| Alternativa | Acceso y uso del material |
|---|---|
| Parser sin/con validación | Sintaxis / sintaxis más DTD o Schema |
| C# `XmlReader` | Avanza hacia delante, sin caché del árbol |
| C# `XmlDocument` | Árbol en memoria, consulta y modificación |
| LINQ to XML | Consultas sobre `XElement/XDocument` y construcción en memoria |
| Python ElementTree | `parse`, `getroot`, `findall`, `tag/text/attrib` |
| JavaScript + jQuery | GET de XML, extracción y representación en la página |

**DOM** representa árbol; **SAX** se cita como API estandarizada. El modo de acceso no implica automáticamente que se valide la gramática.

## Leer nodos sin confundirlos

- `XmlReader.Read()` avanza; `NodeType` distingue elemento, cierre, texto, declaración, instrucción y comentario.
- Nombre de un elemento ≠ valor de su hijo textual.
- `GetElementsByTagName("tres")` obtiene los dos elementos del ejemplo; sus posiciones son **0 y 1**.
- `FirstChild.Value` obtiene el texto en el caso ilustrado.

**Fragmento didáctico de LINQ:**

```csharp
XElement documento = XElement.Load("libros.xml");
var titulos = from nodo in documento.Descendants("titulo")
              select nodo.Value;
```

Presupone importaciones y los nombres de la muestra. Consultar valores, atributos o proyectar varios campos son operaciones diferentes.

## Obtener y generar XML

**AJAX del PDF:** botón → GET con `dataType:"xml"` → éxito/error → extraer `.attr(...)` o `.text()` → actualizar la página. Una muestra local de Oviedo y una API externa comparten ese patrón; la muestra no es tiempo meteorológico actual.

**Generación con ElementTree**, fragmento didáctico:

```python
import xml.etree.ElementTree as ET
raiz = ET.Element("pizzas")
ET.SubElement(raiz, "pizza", nombre="Barbacoa")
ET.ElementTree(raiz).write("salida.xml", encoding="utf-8",
                           xml_declaration=True)
```

El ejemplo aplica los constructores usados en las clases Kml/Svg del PDF, con datos del mismo bloque XML.

## Coordenadas y casos

- NMEA → grados decimales: **grados + minutos/60**, signo negativo para sur/oeste.
- KML escribe **longitud, latitud, altitud**; el generador fija altura 0,0 sobre el terreno.
- [Kml](06-Ejemplos/Python/02020-KML.py): puntos y líneas; [Svg](06-Ejemplos/Python/02030-SVG.py): formas y texto.
- [xml2svg.cs](06-Ejemplos/xml2svg/xml2svg.cs): lector/escritor y pila de posiciones de padres para dibujar el árbol.
- Revisar grafías originales `tessellation`, `strokeWith`, `fontSize`, etc.; que algo se dibuje no demuestra validez del vocabulario.

## Fechas del material

**2008:** LINQ/Visual Studio; **29/11/2011:** TraductorXML; **10/11/2014 y 02/10/2015:** xml2svg; **20/11/2016:** programas Nikon; **2017:** muestra y AJAX meteorológico; **16/05/2020:** lector Python; **18–19/10/2024:** Svg/Kml. Son hitos/versiones de los ejemplos; JAXP se sitúa desde **J2SE 1.4**.

[Parsers](06-Procesamiento-XML.pdf#page=4) · [C#](06-Procesamiento-XML.pdf#page=15) · [Python](06-Procesamiento-XML.pdf#page=52) · [Generación](06-Procesamiento-XML.pdf#page=80).

## Fuente y ampliación

Síntesis del [PDF original](06-Procesamiento-XML.pdf) y de los [apuntes completos](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml). Las fechas se reproducen según el material docente.
