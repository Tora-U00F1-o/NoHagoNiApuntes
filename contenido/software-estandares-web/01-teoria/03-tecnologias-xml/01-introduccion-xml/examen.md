---
asignatura: Software y Estándares para la Web
titulo: Introducción a XML — claves de examen
resumen: Lista de comprobación para repasar conceptos, detalles y errores de esta unidad.
---

# Introducción a XML: claves de examen

Guía de repaso basada en los apuntes, sin garantizar qué preguntará el profesor. Estudia también tablas, código, figuras y advertencias del [desarrollo completo](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml). Las fechas y estados documentales se entienden según el material docente.

## Finalidad de XML

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#del-marcado-de-presentacion-a-los-datos).

- **Finalidad de XML:** XML combina datos y marcado jerárquico con vocabularios del dominio.

## Árbol

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#documento-estructura-y-arbol-dom).

- **Árbol:** Un documento XML puede representarse mediante un árbol con relaciones padre e hijo.

## Elementos y atributos

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#pizzas-modelar-con-atributos).

- **Elementos y atributos:** En el ejemplo de pizzas, nombre y precio se almacenan como atributos.

## Texto del poema

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#poema-texto-en-elementos-y-metadatos-en-atributos).

- **Texto del poema:** El ejemplo del poema usa texto en elementos y metadatos en atributos.

## Modelado de libros

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#libros-repeticion-y-opcionalidad).

- **Modelado de libros:** La colección de libros ilustra elementos repetidos y datos opcionales.

## Visualización

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#visualizar-arboles-con-xml2svg).

- **Visualización:** xml2svg genera una representación gráfica del árbol; verla no sustituye validar una gramática.

## KML

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#kml-y-kmz).

- **KML:** KML es un vocabulario XML de información geográfica.
- **KMZ:** KMZ empaqueta contenido KML mediante ZIP.

## SVG

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#svg-y-graficos-vectoriales).

- **SVG:** SVG describe gráficos vectoriales bidimensionales, incluidos formas y texto.

## WaterML

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#waterml).

- **WaterML:** WaterML representa series hidrológicas con tiempos y valores.

## Declaración XML

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#prologo-cuerpo-y-comentarios).

- **Declaración XML:** version, encoding y standalone describen versión, codificación y dependencia de declaraciones externas.
- **Comentarios:** Los comentarios XML no se anidan y no pueden contener la secuencia --.

## Raíz única

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#elementos-y-atributos).

- **Raíz única:** Un documento XML bien formado tiene un único elemento documento.
- **Anidamiento:** Las etiquetas XML deben cerrarse y anidarse correctamente.
- **Mayúsculas:** Los nombres XML distinguen mayúsculas y minúsculas.
- **Nombres:** Los nombres de elementos XML no pueden contener espacios.
- **Comillas de atributos:** Los valores de atributos XML se delimitan con comillas.
- **Unicidad de atributos:** Un elemento no puede repetir el mismo nombre de atributo.
- **Orden de atributos:** Cambiar el orden de atributos no cambia su significado como atributos XML.
- **Atributos xml:** xml:lang indica idioma, xml:space tratamiento de espacios y xml:base base de rutas.

## Entidades predefinidas

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#entidades-procesamiento-y-cdata).

- **Entidades predefinidas:** XML incluye amp, lt, gt, apos y quot como entidades predefinidas.
- **CDATA:** Una sección CDATA permite escribir texto con caracteres de marcado sin interpretarlos como etiquetas.

## Buena formación

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#buena-formacion-y-validez).

- **Buena formación:** La buena formación comprueba sintaxis XML; la validez añade conformidad con una gramática.
- **Validez:** Ser válido exige primero buena formación y después las restricciones de DTD o Schema.

## Costes y ejecución

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#ventajas-y-limitaciones).

- **Costes y ejecución:** XML favorece intercambio y legibilidad, pero puede ser verboso; describir un programa no lo ejecuta.

## Casos y matices que debes justificar

- Una raíz, nombres coincidentes y atributos entre comillas sin duplicar satisfacen las reglas mostradas; no demuestran conformidad con una DTD. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#elementos-y-atributos).
- El orden de atributos no modifica la jerarquía padre-hijo ni el nombre del elemento. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#elementos-y-atributos).
- CDATA permite texto con caracteres de marcado sin interpretarlos como etiquetas; no arregla atributos sin comillas ni comentarios que contengan --. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#entidades-procesamiento-y-cdata).
- Cerrar un comentario no autoriza la secuencia -- dentro de él; tampoco se admiten comentarios anidados. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#prologo-cuerpo-y-comentarios).
- Buena formación y cumplimiento de gramática son comprobaciones distintas; los elementos requeridos por una DTD pertenecen a la segunda. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#buena-formacion-y-validez).
- La validez presupone buena formación del documento completo; dos fragmentos individualmente aceptables no forman por ello un documento de raíz única. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#buena-formacion-y-validez).
- La declaración XML describe propiedades del documento; no sustituye restricciones de contenido, estilos ni vocabularios. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#prologo-cuerpo-y-comentarios).
- xml:base, xml:lang y xml:space tienen funciones separadas y no deben intercambiarse por compartir el prefijo xml. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#elementos-y-atributos).
- Los vocabularios comparten base XML, pero representan dominios distintos; KMZ añade empaquetado ZIP al contenido KML. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#vocabularios-derivados-de-xml).
- Describir una estructura o programa mediante XML exige un procesamiento que dé significado operativo a esos datos; el marcado solo no lo ejecuta. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-introduccion-xml#ventajas-y-limitaciones).

## Cómo afrontar opciones combinadas

- Decide por separado si cada afirmación es verdadera, incluida su condición, cuantificador y contexto. Una fecha histórica no describe necesariamente el estado actual.
- «Todas las anteriores son correctas» exige que no haya ninguna excepción; «todas son falsas» exige que no haya ninguna verdadera.
- «Alguna es incorrecta» significa al menos una; no equivale a «todas son incorrectas» ni a «exactamente una».
- En preguntas de conjunto exacto, marca una sola opción que enumere todas y solo las verdaderas. Justifica también las falsas.
- En código, identifica primero contexto, orden, tipos, cardinalidad, nombres y límites inclusivos/exclusivos; después calcula el resultado.

## Autoevaluación

- [Test fácil: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-introduccion-xml--facil)
- [Test medio: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-introduccion-xml--medio)
- [Test difícil: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-introduccion-xml--dificil)
