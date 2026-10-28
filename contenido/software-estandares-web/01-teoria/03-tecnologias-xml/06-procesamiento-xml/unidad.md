---
asignatura: Software y Estándares para la Web
titulo: Procesamiento de XML
resumen: Lectura de XML desde programas (DOM y SAX).
fuente: 06-Procesamiento-XML.pdf
---

# Procesamiento de XML

## Contenido

1. [Introducción y objetivos](#introduccion-y-objetivos)
2. [Parsers, validación, DOM y SAX](#parsers-validacion-dom-y-sax)
3. [C#: lectura secuencial con XmlReader](#c-lectura-secuencial-con-xmlreader)
4. [C#: árbol en memoria con XmlDocument](#c-arbol-en-memoria-con-xmldocument)
5. [C#: LINQ to XML](#c-linq-to-xml)
6. [Python: lectura genérica con ElementTree](#python-lectura-generica-con-elementtree)
7. [JavaScript: cargar XML desde el servidor](#javascript-cargar-xml-desde-el-servidor)
8. [Consumo de servicios web](#consumo-de-servicios-web)
9. [Generación: de registros GPS a KML](#generacion-de-registros-gps-a-kml)
10. [Generación de KML con ElementTree](#generacion-de-kml-con-elementtree)
11. [Generación de SVG con ElementTree](#generacion-de-svg-con-elementtree)
12. [Ejercicio resuelto: árbol XML en SVG](#ejercicio-resuelto-arbol-xml-en-svg)
13. [Ejercicios propuestos](#ejercicios-propuestos)
14. [Preguntas de repaso](#preguntas-de-repaso)
15. [Resumen final](#resumen-final)
16. [Referencias y cobertura](#referencias-y-cobertura)

## Introducción y objetivos

Un **parser**, procesador o analizador sintáctico XML lee un documento y comprueba su buena formación; si está configurado para validar, comprueba además una DTD o XML Schema. Es el intermediario que permite a la aplicación trabajar con elementos, atributos y texto en lugar de interpretar manualmente el marcado.

El PDF desarrolla C# —`XmlReader`, `XmlDocument`, LINQ to XML—, Python, JavaScript, servicios web y generación de vocabularios XML. El objetivo es escoger el modelo de acceso adecuado, interpretar el tipo de cada nodo y generar documentos que otras aplicaciones puedan consumir.

## Parsers, validación, DOM y SAX

Los diagramas 5–6 sitúan documento y gramática como entradas del analizador, y la aplicación como consumidora de su resultado. Una API permite incorporar ese procesamiento al programa.

| Tipo | Comprobación |
|---|---|
| Sin validación | Reglas de buena formación de XML |
| Con validación | Buena formación y cumplimiento de DTD o XSD |

El PDF recomienda utilizar validación cuando se emplea DTD. Leer un archivo y recorrer sus nodos no demuestra que se haya activado la validación de su gramática.

**DOM** ofrece una representación de árbol en memoria; el acceso a nodos y sus relaciones permite consultas y cambios. **SAX** se presenta como una API estandarizada para procesamiento; el material lo contrasta con DOM dentro de las alternativas de parsers. La lectura secuencial de `XmlReader` permite estudiar en detalle un acceso que avanza por nodos, aunque no se debe equiparar una clase concreta con todas las APIs citadas.

La página 8 llama parsers a DOM y SAX, y la 9 los describe como APIs con implementaciones. Se mantiene esta segunda distinción para no deducir que usar cualquiera de ellas garantiza validar: esa propiedad depende del procesador y su configuración.

Se mencionan MSXML de Internet Explorer, Expat en Mozilla, Crimson, Xerces y Xalan. Son referencias del material, sin afirmar aquí su vigencia actual. En Java se citan `org.xml.sax` y `org.w3c.dom`; **JAXP**, incorporada a J2SE desde **1.4**, proporciona factorías para parsers y transformadores con `javax.xml.parsers` y `javax.xml.transform`.

[Ver parser y tipos](06-Procesamiento-XML.pdf#page=4) · [Ver APIs y JAXP](06-Procesamiento-XML.pdf#page=9).

## C#: lectura secuencial con XmlReader

`XmlReader` ofrece acceso rápido, **sin caché del árbol**, y solo permite avanzar. Las figuras 16–18 siguen el cursor por `<uno>`, sus dos hijos `<dos>` y los elementos `<tres>` con valores. En cada posición importan tipo de nodo, nombre, valor y atributos.

El procedimiento de las páginas 19–23 es:

1. Crear el lector del archivo.
2. Avanzar mediante `Read()`.
3. Consultar atributos, si los hay, con `MoveToNextAttribute()`.
4. Elegir la operación según `NodeType`.

| Tipo de nodo | Información mostrada por el ejemplo |
|---|---|
| `Element` | Nombre y posibles atributos |
| `EndElement` | Nombre del cierre |
| `Text` | Valor textual |
| `XmlDeclaration` | Nombre y contenido de la declaración |
| `ProcessingInstruction` | Destino y contenido de la instrucción |
| `Comment` | Texto del comentario |

### TraductorXML

**Origen:** archivo original [TraductorXML.cs](06-Ejemplos/TraductorXML/TraductorXML.cs).

```csharp title="TraductorXML.cs"
// Traductor XML
// Juan Manuel Cueva Lovelle
// Universidad de Oviedo
// Versión 1.0 29/Noviembre/2011

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO; // Para manejo de archivos
using System.Xml; //Para procesar XML

namespace TraductorXML
{
    class Program
    {
        static void Main(string[] args)
        {
         try
            {
              if (args.Length < 1)
                    throw (new ArgumentNullException());

              String nombreArchivoXML = args[0];

              XmlReader xml = XmlReader.Create(nombreArchivoXML);
              while (xml.Read())
              {
                  switch (xml.NodeType)
                  {
                      case XmlNodeType.Element:
                          Console.WriteLine("Element.Name: {0}",xml.Name);
                          //Obtener los atributos si los tiene
                          if (xml.HasAttributes)
                          {
                              Console.WriteLine("Atributos de <" + xml.Name + ">");
                              while (xml.MoveToNextAttribute())
                              {
                                  Console.WriteLine(" {0}={1}", xml.Name, xml.Value);
                              }
                          }
                          break;
                      case XmlNodeType.EndElement:
                          Console.WriteLine("EndElement.Name: {0}", xml.Name);
                          break;
                      case XmlNodeType.Text:
                          Console.WriteLine("Text.Value: {0}", xml.Value);
                          break;
                      case XmlNodeType.XmlDeclaration:
                          Console.WriteLine("XmlDeclaration.Name: {0}", xml.Name);
                          Console.WriteLine("XmlDeclaration.Value: {0}", xml.Value);
                          break;
                      case XmlNodeType.ProcessingInstruction:
                          Console.WriteLine("ProcessingInstruction.Name: {0}", xml.Name);
                          Console.WriteLine("ProcessingInstruction.Value: {0}", xml.Value);
                          break;
                      case XmlNodeType.Comment:
                          Console.WriteLine("Comment.Value: {0}", xml.Value);
                          break;
                  }//fin del switch

              }//fin del while
                 Console.ReadKey();

            }//fin del try
            catch (FileNotFoundException)
            {
                Console.WriteLine("Error: Archivo {0} no encontrado", args[0]);
            }
            catch (ArgumentNullException)
            {
                Console.WriteLine("Formato correcto de uso:");
                Console.WriteLine("\n\t TraductorXML <archivo>");
            }
            catch(Exception e)
            {
                Console.WriteLine("Error no documentado: "+e);
            }
            finally
            {
                Console.WriteLine("\nGracias por usar TraductorXML");
                Console.WriteLine("Versión 1.0, 29-Noviembre-2011");
                Console.WriteLine("Autor: Juan Manuel Cueva Lovelle");
                Console.WriteLine("http://www.di.uniovi.es/~cueva");
                Console.ReadLine();
            }

        }//fin del Main
    } //fin de Program
} // fin namespace
```

El programa original, **versión 1.0 de 29/11/2011**, recibe el nombre de archivo por argumento. Crea el lector y usa un `switch` para mostrar cada categoría; por tanto, «Traductor» aquí significa representar la lectura como texto, no traducir idiomas ni transformar el documento mediante XSLT.

Las excepciones separan archivo ausente, falta de argumento y otros errores. El bloque `finally` informa de versión y autor y espera entrada de consola. El programa no muestra configuración de validación de DTD/XSD: no se debe inferir que el XML está validado solo porque se imprime correctamente.

Las páginas 25–27 contrastan [libros.xml](06-Ejemplos/TraductorXML/libros.xml) con la secuencia de nombres, atributos y textos. Se conservan también [pizzas.xml](06-Ejemplos/TraductorXML/pizzas.xml) y [alba.xml](06-Ejemplos/TraductorXML/alba.xml). Algunos caracteres de la salida impresa aparecen deformados por codificación; la distinción importante del ejemplo es entre nombre del elemento y nodo de texto.

[Ver XmlReader](06-Procesamiento-XML.pdf#page=15) · [Ver programa](06-Procesamiento-XML.pdf#page=28).

## C#: árbol en memoria con XmlDocument

`XmlDocument` representa un documento completo y puede cargar archivos o secuencias procedentes de un lector. El PDF enumera `Load`, `GetElementsByTagName`, `AppendChild`, `CreateNode`, `RemoveChild` y `Save`: permiten consultar, construir, modificar y guardar el árbol.

La figura 33 convierte el XML de `uno/dos/tres` en un árbol. La consulta `GetElementsByTagName("tres")` devuelve una **XmlNodeList** con dos nodos, accesibles en posiciones **0 y 1**. El nombre de ambos es `tres`; el contenido de texto se encuentra en sus hijos.

```csharp title="Lectura del ejemplo de tres" origen="Ejemplo didáctico basado en pp. 32–40"
using System;
using System.Xml;

class Consulta
{
    static void Main(string[] args)
    {
        XmlDocument documento = new XmlDocument();
        documento.Load(args[0]);
        XmlNodeList nodos = documento.GetElementsByTagName("tres");
        foreach (XmlNode nodo in nodos)
        {
            Console.WriteLine(nodo.Name);
            Console.WriteLine(nodo.FirstChild.Value);
        }
    }
}
```

El fragmento didáctico presupone el archivo del ejemplo, con texto dentro de cada `tres`, y un argumento de ruta. No es una aplicación genérica de tratamiento de todos los tipos de nodo.

::: aviso Nombre del elemento y valor textual
La página 35 atribuye «Valor 1» a `XmlNodeList[0].Value`, mientras que la 36 concreta `FirstChild.Value`. El esquema de la página 39 diferencia el elemento de su hijo de texto. Para el ejemplo se utiliza esta distinción explícita: nombre del elemento `tres`, valor del hijo textual `Valor 1` o `Valor 2`.
:::

Las capturas 37–40 cargan libros, seleccionan nodos por etiqueta, recorren sus hijos y consultan atributos con `GetAttribute`, como `isbn` y `moneda`. El ejercicio 41 pide generalizarlo a **todos los nodos y atributos de cualquier XML**; copiar el código que presupone texto en `FirstChild` no basta por sí solo para resolver todos los casos.

[Ver XmlDocument](06-Procesamiento-XML.pdf#page=32) · [Ver texto](06-Procesamiento-XML.pdf#page=36) · [Ver ejercicio](06-Procesamiento-XML.pdf#page=41).

## C#: LINQ to XML

**LINQ, Language-Integrated Query**, se sitúa en **Visual Studio 2008**. Añade consultas a C# y Visual Basic, y puede trabajar sobre XML mediante un modelo de objetos en memoria distinto de DOM. **LINQ to XML** permite consultar colecciones, modificarlas y crear documentos que después se guardan; el material cita `XDocument` y `XElement`.

```csharp title="Carga y consulta" origen="Fragmento didáctico basado en pp. 45–49"
XElement documento = XElement.Load(nombreArchivoXML);
var titulos = from nodo in documento.Descendants("titulo")
              select nodo;
foreach (var titulo in titulos)
    Console.WriteLine(titulo.Value);
```

El fragmento presupone las importaciones y el nombre de archivo de la aplicación. `Descendants` obtiene descendientes; la consulta filtra o proyecta; `Value` obtiene el contenido. Las diapositivas muestran progresivamente todos los elementos, elementos de un nombre, valores de atributos, filtros por ISBN y filtros por valor de un hijo.

```csharp title="Filtros del ejemplo" origen="Fragmentos didácticos de las consultas del PDF"
var porIsbn = from libro in documento.Descendants("libro")
              where libro.Attribute("isbn").Value == "9788420633114"
              select libro.Element("editorial");

var porTitulo = from libro in documento.Descendants("libro")
                where libro.Element("titulo").Value == "El Aleph"
                select new {
                    Titulo = libro.Element("titulo").Value,
                    Editorial = libro.Element("editorial").Value,
                    ISBN = libro.Attribute("isbn").Value
                };
```

Estas consultas presuponen los nombres y campos del XML de ejemplo. Seleccionar un elemento y proyectar un objeto con varios valores son resultados distintos. Cuando el documento usa namespaces, deben considerarse sus nombres cualificados; los fragmentos simples no sustituyen ese trabajo.

La página 50 propone obtener todos los autores, libros de literatura, libros de literatura en español, títulos de libros en inglés y título/clasificación de todos. Se resuelven distinguiendo **conjunto de partida**, **condición** y **datos seleccionados**, en ese orden.

[Ver LINQ](06-Procesamiento-XML.pdf#page=43).

## Python: lectura genérica con ElementTree

**Origen:** archivo original [02000-XML.py](06-Ejemplos/Python/02000-XML.py).

```python title="02000-XML.py"
# 02000-XML.py
# # -*- coding: utf-8 -*-
""""
Procesamiento genérico de archivos XML

@version 1.1 16/Mayo/2020
@author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
"""

import xml.etree.ElementTree as ET

def verXML(archivoXML):
    """Función verXML(archivoXML)
Visualiza por pantalla un archivo XML mostrando:
    - El elemento raiz con su contenido y sus atributos
    - Todos los elementos con su contenido y los valores de sus atributos

Version: 1.1 16/Mayo/2020
Author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
    """
    try:

        arbol = ET.parse(archivoXML)

    except IOError:
        print ('No se encuentra el archivo ', archivoXML)
        exit()

    except ET.ParseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        exit()

    raiz = arbol.getroot()

    print("\nElemento raiz = ", raiz.tag)

    if raiz.text != None:
        print("Contenido = "    , raiz.text.strip('\n')) #strip() elimina los '\n' del string
    else:
        print("Contenido = "    , raiz.text)

    print("Atributos = "    , raiz.attrib)

    # Recorrido de los elementos del árbol
    for hijo in raiz.findall('.//'): # Expresión Path
        print("\nElemento = " , hijo.tag)
        if hijo.text != None:
            print("Contenido = ", hijo.text.strip('\n')) #strip() elimina los '\n' del string
        else:
            print("Contenido = ", hijo.text)
        print("Atributos = ", hijo.attrib)

def main():
    """Prueba de la función verXML()"""

    print(verXML.__doc__)

    miArchivoXML = input('Introduzca un archivo XML = ')

    verXML(miArchivoXML)

if __name__ == "__main__":
    main()
```

El programa original es **versión 1.1 de 16/05/2020**. Tras `parse`, obtiene la raíz y muestra `tag`, `text` y `attrib`. Repite la lectura en los descendientes; comprueba `None` antes de aplicar `strip` al texto. Distingue archivo inaccesible y error de análisis XML.

Las capturas 54–59 aplican el mismo recorrido a pizzas, libros con namespace y SVG. Los nombres con namespace se muestran como `{URI}nombre`. Que un SVG sea XML permite recorrerlo como datos aunque un navegador lo dibuje como una imagen.

**Advertencia:** el código original usa `findall('.//')`. Se conserva tal como se proporciona; para un recorrido didáctico con el destino de selección escrito explícitamente puede utilizarse `.//*`, como se estudia en XPath. La cabecera también conserva sus cuatro comillas iniciales; los archivos originales no se editan aquí.

Archivos de apoyo: [pizzas.xml](06-Ejemplos/Python/pizzas.xml), [pizzas-xsd.xml](06-Ejemplos/Python/pizzas-xsd.xml), [libros.xml](06-Ejemplos/Python/libros.xml), [alba.xml](06-Ejemplos/Python/alba.xml) y [pizzas.svg](06-Ejemplos/Python/pizzas.svg), con las DTD/XSD de la misma carpeta.

[Ver Python](06-Procesamiento-XML.pdf#page=52).

## JavaScript: cargar XML desde el servidor

JavaScript se ejecuta en el cliente web mediante el intérprete del navegador; el código puede enlazarse o incrustarse en HTML. El PDF utiliza **jQuery** para obtener XML del servidor y mostrar sus datos en la página.

### Archivos del ejemplo de Oviedo

| Archivo | Papel |
|---|---|
| [Oviedo.xml](06-Ejemplos/JavaScript/Oviedo.xml) | Datos meteorológicos de la muestra |
| [HTML](06-Ejemplos/JavaScript/90-jQuery-AJAX-XML-Oviedo.html) | Página, botón, referencias a jQuery, CSS y JS |
| [CSS](06-Ejemplos/JavaScript/90-jQuery-AJAX-XML-Oviedo.css) | Presentación de encabezados, texto y pie |
| [JavaScript](06-Ejemplos/JavaScript/90-jQuery-AJAX-XML-Oviedo.js) | Petición AJAX, extracción y construcción de salida |

La muestra corresponde al **19/11/2017** y el programa/CSS a **24/11/2017**. Son datos y versiones del ejemplo, no información meteorológica actual.

### Secuencia de operaciones

1. `verXML()` crea los elementos de presentación con `document.createElement` y los coloca antes del pie.
2. Deshabilita el botón y llama a `cargarDatos()`.
3. `$.ajax` realiza un GET con `dataType: "xml"` y la ruta `Oviedo.xml`.
4. En `success`, `XMLSerializer` obtiene una representación textual del XML.
5. Los selectores de jQuery obtienen atributos con `attr` y contenido con `text`.
6. Se construye la lista de datos y se coloca en la página.
7. En `error`, se informa del fallo y se retiran los elementos que ya no aportan contenido.

```javascript title="Extracción de la muestra" origen="Fragmento del programa original"
var ciudad = $('city', datos).attr('name');
var longitud = $('coord', datos).attr('lon');
var latitud = $('coord', datos).attr('lat');
var pais = $('country', datos).text();
var temperatura = $('temperature', datos).attr('value');
```

El XML guarda ciudad, coordenadas, salida/puesta del sol, temperatura mínima/máxima y unidad, humedad, presión, viento, nubosidad, visibilidad, precipitación, descripción y actualización. `attr` y `text` no son intercambiables: el país es texto, mientras que el nombre de ciudad está en un atributo.

El programa convierte horas mediante `Date.parse`, ajuste con `getTimezoneOffset` y presentación local `es-ES`. Se conserva como lógica del ejemplo; las diapositivas no desarrollan todos los casos de zona horaria y no se amplían aquí.

**Limitaciones visibles:** el HTML referencia recursos externos y un distintivo local que puede no acompañarlo. La construcción original termina su cadena de lista con `<ul>` y la inserta en un párrafo: conviene revisar el HTML generado, sin confundir la descarga correcta del XML con una validación del resultado. Un comentario llama JSON al archivo aunque la petición y su análisis son XML.

[Ver archivos y código](06-Procesamiento-XML.pdf#page=61) · [Ver resultado](06-Procesamiento-XML.pdf#page=69).

## Consumo de servicios web

La figura 72 muestra un cliente que envía una petición a un servicio y recibe una respuesta a través de Internet. Las páginas 73–76 presentan XML y JSON como formatos de intercambio y muestran la API meteorológica de OpenWeatherMap.

El ejemplo [HTML del servicio](06-Ejemplos/ServicioWebMeteo/87-jQuery-AJAX-XML-meteo.html), con su [JavaScript](06-Ejemplos/ServicioWebMeteo/87-jQuery-AJAX-XML-meteo.js) y [CSS](06-Ejemplos/ServicioWebMeteo/87-jQuery-AJAX-XML-meteo.css), utiliza el mismo patrón AJAX del archivo local, cambiando la URL a una API con ciudad, formato XML, unidades, idioma y parámetro de acceso.

La diferencia esencial es la **fuente de datos**: una muestra local fija frente a una respuesta del servicio. Las capturas 77–78 muestran el resultado del ejemplo, pero no acreditan que esa petición o sus credenciales históricas sigan funcionando. Para estudiar el procesamiento basta la muestra local de Oviedo; no es necesario efectuar una petición real ni reutilizar los valores de acceso del archivo recibido.

## Generación: de registros GPS a KML

Un programa puede producir XML para otra aplicación. El caso de las páginas 81–92 parte de registros **NMEA** de una cámara Nikon y genera KML sobre **WGS84**, denominado en el PDF Sistema Geodésico Mundial 1984.

### Registros y decodificación

El archivo [N1612080.LOG](06-Ejemplos/Nikon/N1612080.LOG) contiene una cabecera y líneas separadas en campos por comas. El programa [Nikon-NMEA.py](06-Ejemplos/Nikon/Nikon-NMEA.py), versión **1.0 de 20/11/2016**, distingue:

- **`$GPGGA`**: hora, latitud/hemisferio, longitud/este-oeste, fix, satélites, HDOP, altitud, geoide y datos DGPS/checksum.
- **`$GPRMC`**: hora, validez, posición, velocidad, rumbo, fecha, declinación y checksum.

La salida [N1612080.txt](06-Ejemplos/Nikon/N1612080.txt) muestra cada campo. El ejemplo convierte velocidad de nudos a km/h multiplicando por **1,852** y compone hora y fecha mediante fragmentos de las cadenas.

### Coordenadas y salida

[Nikon-NMEA-KML.py](06-Ejemplos/Nikon/Nikon-NMEA-KML.py) selecciona coordenadas, transforma grados y minutos a grados decimales y construye KML. La parte esencial del original es:

```python title="Conversión NMEA del PDF"
latitudGrados = float(latitud[0:2]) + float(latitud[2:]) / 60
if hemisferio == 'S':
    latitudGrados = -latitudGrados
longitudGrados = float(longitud[0:3]) + float(longitud[3:]) / 60
if esteOeste == 'W':
    longitudGrados = -longitudGrados
resultado = str(longitudGrados) + ',' + str(latitudGrados) + ',' + str(altura) + '\n'
```

La latitud toma dos dígitos de grados; la longitud, tres. Sur y oeste se representan con signo negativo. KML recibe **longitud, latitud, altitud**, en ese orden. El generador fija altura **0,0 sobre el terreno** en lugar de utilizar directamente la medida de altitud del registro.

El prólogo abre `kml`, `Document`, `Placemark`, `LineString` y `coordinates`; el bucle añade posiciones y el epílogo cierra la estructura e incluye estilo. `extrude`, `tessellate`, modo de altitud, color y ancho participan en la representación. La captura 84 muestra el recorrido sobre Google Earth; se conservan [KML](06-Ejemplos/Nikon/N1612080.kml) y [KMZ](06-Ejemplos/Nikon/N1612080.kmz).

**Advertencias del original:** hay un fragmento `<Style> id='lineaRoja'>` mal situado en el texto generado. El programa devuelve un mensaje textual para prefijos no procesados y lo escribe en la salida. Son limitaciones que deben revisarse antes de atribuir conformidad KML a cualquier archivo producido: XML bien formado y KML válido son comprobaciones diferentes.

[Ver NMEA](06-Procesamiento-XML.pdf#page=81) · [Ver conversión](06-Procesamiento-XML.pdf#page=90).

## Generación de KML con ElementTree

El [programa 02020-KML.py](06-Ejemplos/Python/02020-KML.py), **versión 1.1 de 19/10/2024**, encapsula la construcción en una clase `Kml`:

| Método | Responsabilidad |
|---|---|
| Constructor | Crear raíz `kml`, namespace y `Document` |
| `addPlacemark` | Añadir nombre, descripción, punto, coordenadas y modo de altitud |
| `addLineString` | Crear línea con coordenadas y estilo |
| `escribir` | Construir `ElementTree`, sangrar y guardar con declaración UTF-8 |
| `ver` | Recorrer el resultado para depuración |

```python title="Núcleo de addPlacemark" origen="Fragmento del original"
pm = ET.SubElement(self.doc, 'Placemark')
ET.SubElement(pm, 'name').text = nombre
ET.SubElement(pm, 'description').text = descripcion
punto = ET.SubElement(pm, 'Point')
ET.SubElement(punto, 'coordinates').text = '{},{},{}'.format(long, lat, alt)
ET.SubElement(punto, 'altitudeMode').text = modoAltitud
```

El `main` añade Escuela de Ingeniería Informática, Estadio Universitario y Polideportivo Universitario y una línea que los conecta y vuelve al inicio. El [resultado rutaOviedo.kml](06-Ejemplos/Python/rutaOviedo.kml) corresponde a la captura 103.

**Diferencias del original:** `addLineString` escribe `tessellation`, mientras que el generador anterior utiliza `tessellate`; además sitúa el nombre de la ruta bajo `Document` antes de crear el Placemark. Se conservan los nombres reales del código y no se afirma que el generador sea un validador del vocabulario.

[Ver clase Kml y uso](06-Procesamiento-XML.pdf#page=94).

## Generación de SVG con ElementTree

El [programa 02030-SVG.py](06-Ejemplos/Python/02030-SVG.py), **versión 1.0 de 18/10/2024**, utiliza el mismo patrón con una clase `Svg`. La raíz declara namespace SVG y versión 2.0; sus métodos crean rectángulos, círculos, líneas, polilíneas y texto. `escribir` serializa en UTF-8 y `ver` muestra el árbol.

```python title="Método del ejemplo" origen="Fragmento de 02030-SVG.py"
def addCircle(self, cx, cy, r, fill):
    ET.SubElement(self.raiz, 'circle', cx=cx, cy=cy, r=r, fill=fill)
```

Los valores se proporcionan como cadenas al construir los atributos. `addText` asigna el texto mediante `.text`; la polilínea recibe sus pares de coordenadas en un atributo. La prueba combina rectángulo verde, círculo naranja, línea azul, polilínea roja y dos textos. El [archivo demo.svg](06-Ejemplos/Python/demo.svg) y la captura 112 permiten comparar estructura y dibujo.

::: aviso Grafías de los atributos SVG del original
El programa genera `strokeWidth`, `strokeWith`, `fontFamily` y `fontSize`. La unidad de introducción muestra grafías SVG como `stroke-width`. Se señalan las diferencias para no atribuir al generador una conformidad que no ha comprobado. Los archivos originales permanecen disponibles sin cambios y su visualización no demuestra por sí sola que cada atributo haya sido aplicado.
:::

[Ver clase Svg](06-Procesamiento-XML.pdf#page=105).

## Ejercicio resuelto: árbol XML en SVG

La página 121 pide leer XML y generar un SVG con todos sus elementos y atributos. La solución está en [xml2svg.cs](06-Ejemplos/xml2svg/xml2svg.cs), con proyecto y muestras adjuntos. El archivo indica versiones **1.00 de 10/11/2014** de Pablo Soto Medina y **1.01 de 02/10/2015** de Juan Manuel Cueva Lovelle.

El código usa un lector XML y un escritor XML para SVG. Mantiene coordenadas de dibujo y una **pila de padres** para conectar cada elemento a su antecesor. Al abrir un elemento escribe su rectángulo, almacena posición, avanza la profundidad y anota atributos; al encontrar texto escribe su valor; al cerrar un elemento vuelve de nivel y avanza verticalmente. Los elementos vacíos reciben tratamiento específico. Una pasada de estimación calcula la altura de la imagen.

**Explicación didáctica:** la pila representa qué elementos siguen abiertos y sus posiciones; su función en el dibujo corresponde al anidamiento que el parser reconoce en la entrada. No se presenta este procedimiento como una regla de presentación automática de cualquier XML, sino como la estrategia de la solución adjunta.

Muestras: [pizzas.xml](06-Ejemplos/xml2svg/pizzas.xml) y [pizzas.svg](06-Ejemplos/xml2svg/pizzas.svg), [libros.xml](06-Ejemplos/xml2svg/libros.xml) y [libros.svg](06-Ejemplos/xml2svg/libros.svg), [prueba-1.xml](06-Ejemplos/xml2svg/prueba-1.xml) y [prueba-1.svg](06-Ejemplos/xml2svg/prueba-1.svg), [prueba-2.xml](06-Ejemplos/xml2svg/prueba-2.xml) y [prueba-2.svg](06-Ejemplos/xml2svg/prueba-2.svg). Los SVG permiten estudiar la salida sin ejecutar el binario.

## Ejercicios propuestos

Las páginas 123–125 establecen tres trabajos:

1. Procesar el XML de monumentos prerrománicos y generar un KML que muestre su situación sobre un mapa. Se entregan fuente, ejecutable si lo hay, `leeme.txt` con versión/lenguaje/descripción y salida generada.
2. Crear una aplicación cuya entrada sea un XML. El diseño es libre y se valora originalidad y utilidad. Se entregan fuente, ejecutable si lo hay, documentación y entradas de prueba.
3. Crear una aplicación que genere XML. Se añaden los archivos de salida. Se permite fusionar los dos últimos si el programa lee XML y produce otro XML.

**Procedimiento didáctico:** elegir el modelo de acceso, identificar la gramática y los namespaces de entrada, recorrer los datos requeridos, construir la salida con nombres coherentes y comprobarla con la herramienta de destino. No se deben confundir ausencia de errores de lectura y validez del vocabulario generado.

## Preguntas de repaso

::: pregunta ¿Qué diferencia XmlReader de XmlDocument en el PDF?
XmlReader avanza hacia delante sin mantener el árbol en caché. XmlDocument representa el documento y permite consultar y modificar sus nodos en memoria. La elección condiciona cómo se organiza el recorrido.
:::

::: pregunta ¿Por qué un elemento tres y su texto se leen como nodos distintos?
Porque el árbol representa un elemento con nombre tres y un hijo de texto con su contenido. El ejemplo usa FirstChild.Value para obtener Valor 1 o Valor 2, diferenciándolo del nombre del elemento.
:::

1. Distingue parseo sin validación y con validación.
2. Explica las consultas LINQ y qué selecciona cada una.
3. Compara `tag/text/attrib` de ElementTree con los datos que muestra el lector C#.
4. Explica `attr` frente a `text` en el XML meteorológico.
5. Diferencia cargar una muestra local de consultar un servicio web.
6. Convierte una coordenada NMEA a grados decimales y justifica el signo y orden en KML.
7. Relaciona Element/SubElement/text/ElementTree.write con la generación de KML y SVG.
8. Explica la pila de padres del generador xml2svg y qué comprueba su resultado visual.

## Resumen final

Procesar XML requiere un analizador y una API de acceso apropiada. La lectura secuencial y los árboles en memoria permiten estrategias diferentes; las consultas simplifican la extracción y los namespaces conservan la identidad de los vocabularios. JavaScript puede obtener XML del servidor o de un servicio, mientras otros programas generan XML como salida. Construir un documento, visualizarlo y validarlo son operaciones relacionadas que deben comprobarse por separado.

## Referencias y cobertura

- [Documento original](06-Procesamiento-XML.pdf): **126 páginas analizadas**, incluidos recorridos de cursor, árboles DOM, código en capturas, datos meteorológicos, programas GPS y mapas/SVG.
- Cobertura: parser/APIs (4–11), C# XmlReader (13–30), XmlDocument (32–41), LINQ (43–50), Python (52–59), JavaScript (61–70), servicios (72–78), generación/NMEA (80–92), KML directo (94–103), SVG directo (105–112), bibliografía/referencias (114–119), ejercicios (121–125).
- Ejemplos incorporados o enlazados: TraductorXML, lectores Python, AJAX local/servicio, NMEA, Kml, Svg y xml2svg. Los fragmentos didácticos se identifican y se explican las grafías/limitaciones del original sin ejecutar sus binarios ni realizar llamadas a APIs.
- Bibliografía: *XML imprescindible*, Harold/Means, 2005; *Beginning XML*, Fawcett/Quin/Ayers, 2012; *Beginning XML with C# 2008*, Bipin Joshi, Apress, 2008.
- Referencias del PDF: [XmlReader](http://msdn.microsoft.com/en-us/library/cc189056%28VS.95%29.aspx), [ejemplo C#](http://www.doublecloud.org/2013/08/parsing-xml-in-c-a-quick-working-sample/), [categoría de parsers](http://en.wikipedia.org/wiki/Category:XML_parsers), [Oracle XML para Java](http://docs.oracle.com/cd/B28359_01/appdev.111/b28394/adx_j_parser.htm#ADXDK3000), [consulta C++](http://stackoverflow.com/questions/9387610/what-xml-parser-should-i-use-in-c), [consulta Python](http://stackoverflow.com/questions/1912434/how-do-i-parse-xml-in-python), [XML 1.1](http://www.w3.org/TR/xml11/), [tutorial XML](http://www.w3schools.com/xml), [SVG](http://www.w3.org/Graphics/SVG/), [JSON](http://json.org/json-es.html) y [OpenWeatherMap](https://www.openweathermap.org/). Se recogen como bibliografía sin ampliar teoría externa.
