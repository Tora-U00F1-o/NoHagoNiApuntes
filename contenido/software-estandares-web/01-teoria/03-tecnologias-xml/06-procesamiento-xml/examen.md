---
asignatura: Software y Estándares para la Web
titulo: Procesamiento de XML — claves de examen
resumen: Lista de comprobación para repasar conceptos, detalles y errores de esta unidad.
---

# Procesamiento de XML: claves de examen

Guía de repaso basada en los apuntes, sin garantizar qué preguntará el profesor. Estudia también tablas, código, figuras y advertencias del [desarrollo completo](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml). Las fechas y estados documentales se entienden según el material docente.

## Parser y validación

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#parsers-validacion-dom-y-sax).

- **Parser y validación:** Leer XML y recorrer nodos no demuestra que se haya validado contra DTD o XSD.
- **DOM:** DOM ofrece un árbol en memoria que permite acceder a nodos y relaciones.
- **APIs:** DOM y SAX se distinguen como APIs con implementaciones; no son garantías automáticas de validez.
- **JAXP:** La unidad sitúa JAXP desde J2SE 1.4 con factorías de parsers y transformadores.

## XmlReader

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#c-lectura-secuencial-con-xmlreader).

- **XmlReader:** XmlReader avanza por nodos sin mantener una caché del árbol completo.
- **Read:** Read avanza el lector y NodeType permite decidir qué clase de nodo está activa.
- **Nombre y texto:** El nombre de un elemento y el valor de su nodo textual son informaciones distintas.
- **Atributos del lector:** HasAttributes y MoveToNextAttribute permiten recorrer atributos en el lector del ejemplo.

## Tipos de nodo

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#traductorxml).

- **Tipos de nodo:** TraductorXML distingue Element, EndElement, Text, declaración, instrucción y comentario.
- **Argumentos y errores:** TraductorXML recibe el archivo como argumento y distingue ausencia de archivo y falta de argumento.
- **Alcance de Traductor:** El nombre TraductorXML describe la representación textual de la lectura, no traducción de idiomas.

## XmlDocument

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#c-arbol-en-memoria-con-xmldocument).

- **XmlDocument:** XmlDocument carga un árbol en memoria para consulta y modificación.
- **Índices:** Los dos elementos tres del ejemplo GetElementsByTagName ocupan posiciones 0 y 1.
- **FirstChild:** FirstChild.Value obtiene el texto en el caso concreto ilustrado, según el tipo del hijo.

## LINQ to XML

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#c-linq-to-xml).

- **LINQ to XML:** LINQ to XML usa XElement/XDocument para consultas y construcción en memoria.

## ElementTree

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#python-lectura-generica-con-elementtree).

- **ElementTree:** parse lee el árbol, getroot obtiene la raíz y tag, text, attrib exponen datos distintos.

## AJAX

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#secuencia-de-operaciones).

- **AJAX:** El patrón del ejemplo es botón, GET XML, éxito o error, extracción y actualización de página.

## Muestra local

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#archivos-del-ejemplo-de-oviedo).

- **Muestra local:** El XML local de Oviedo es una muestra del material, no información meteorológica actual garantizada.

## Extracción

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#consumo-de-servicios-web).

- **Extracción:** En el ejemplo jQuery attr obtiene atributos y text extrae texto; no son accesos equivalentes.

## NMEA

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#registros-y-decodificacion).

- **NMEA:** La conversión mostrada usa grados más minutos divididos por sesenta.

## Hemisferio

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#coordenadas-y-salida).

- **Hemisferio:** La conversión aplica signo negativo para hemisferios sur y oeste.
- **Orden KML:** KML serializa las coordenadas como longitud, latitud y altitud.

## Construcción XML

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#generacion-de-kml-con-elementtree).

- **Construcción XML:** Element y SubElement construyen nodos; ElementTree.write serializa con la codificación indicada.

## Grafías SVG

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#generacion-de-svg-con-elementtree).

- **Grafías SVG:** Los apuntes advierten grafías originales como strokeWith y fontSize; dibujar no demuestra validez.

## Pila de padres

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#ejercicio-resuelto-arbol-xml-en-svg).

- **Pila de padres:** xml2svg utiliza lector, escritor y pila de posiciones de padres para representar la jerarquía.

## Casos y matices que debes justificar

- Se divide minutos entre sesenta, se aplica signo negativo al oeste y se serializa longitud antes de latitud y altitud. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#coordenadas-y-salida).
- No debe trasladarse sin más la base de índices de una API a un lenguaje de consulta; los ejemplos muestran convenciones diferentes. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#c-arbol-en-memoria-con-xmldocument).
- NodeType orienta qué información consultar; nombre de elemento, contenido textual y cierre son categorías distintas en el recorrido. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#c-lectura-secuencial-con-xmlreader).
- El recorrido de nodos demuestra lectura, pero activar y superar la validación gramatical es una comprobación adicional. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#traductorxml).
- Modo de acceso, representación en memoria y validación son decisiones distintas; un lector secuencial no conserva por ello todo el árbol. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#parsers-validacion-dom-y-sax).
- Seleccionar nodos, leer valores y consultar atributos son operaciones diferentes; XML distingue nombres exactos y namespaces. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#c-linq-to-xml).
- El patrón AJAX separa carga, éxito/error, extracción y presentación; la configuración del formato no garantiza disponibilidad del recurso. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#secuencia-de-operaciones).
- Cargar hoy un archivo de muestra no actualiza sus medidas; deben distinguirse muestra local, fecha de datos y consulta efectiva de un servicio. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#archivos-del-ejemplo-de-oviedo).
- Los apuntes conservan y señalan grafías originales; buena formación, apariencia y validez del vocabulario son comprobaciones diferentes. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#generacion-de-svg-con-elementtree).
- El generador necesita preservar contexto jerárquico durante el recorrido; una pila de posiciones ayuda a enlazar cada nivel con su padre. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-procesamiento-xml#ejercicio-resuelto-arbol-xml-en-svg).

## Cómo afrontar opciones combinadas

- Decide por separado si cada afirmación es verdadera, incluida su condición, cuantificador y contexto. Una fecha histórica no describe necesariamente el estado actual.
- «Todas las anteriores son correctas» exige que no haya ninguna excepción; «todas son falsas» exige que no haya ninguna verdadera.
- «Alguna es incorrecta» significa al menos una; no equivale a «todas son incorrectas» ni a «exactamente una».
- En preguntas de conjunto exacto, marca una sola opción que enumere todas y solo las verdaderas. Justifica también las falsas.
- En código, identifica primero contexto, orden, tipos, cardinalidad, nombres y límites inclusivos/exclusivos; después calcula el resultado.

## Autoevaluación

- [Test fácil: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-procesamiento-xml--facil)
- [Test medio: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-procesamiento-xml--medio)
- [Test difícil: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-procesamiento-xml--dificil)
