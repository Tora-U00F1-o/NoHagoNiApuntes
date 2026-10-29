---
asignatura: Software y Estándares para la Web
titulo: Schemas — claves de examen
resumen: Lista de comprobación para repasar conceptos, detalles y errores de esta unidad.
---

# Schemas: claves de examen

Guía de repaso basada en los apuntes, sin garantizar qué preguntará el profesor. Estudia también tablas, código, figuras y advertencias del [desarrollo completo](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas). Las fechas y estados documentales se entienden según el material docente.

## Esquema e instancia

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#primeros-ejemplos-y-espacios-de-nombres).

- **Esquema e instancia:** Un XSD es XML y define restricciones sobre instancias XML distintas del propio esquema.

## Namespaces de Schema

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#asociar-un-esquema-con-y-sin-namespace).

- **Namespaces de Schema:** xmlns:xs identifica el vocabulario XSD; targetNamespace identifica el vocabulario definido.
- **Asociación:** xsi:schemaLocation contiene pares namespace y ubicación; noNamespaceSchemaLocation se usa sin namespace.

## Cardinalidad

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#de-dtd-a-xml-schema).

- **Cardinalidad:** La conversión de DTD a XSD conserva secuencia, alternativa y límites minOccurs/maxOccurs.

## Tipo simple

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#elementos-simples-y-atributos).

- **Tipo simple:** Un elemento de tipo simple carece de hijos y de atributos.
- **Atributos:** Los atributos se declaran con xs:attribute y su presencia se exige con use="required".

## Fecha y dateTime

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#fechas-y-duraciones).

- **Fecha y dateTime:** 2018-10-20 ilustra date y 2018-10-20T12:30:00 ilustra dateTime.
- **Duraciones:** En una duración M antes de T indica meses y después de T indica minutos.

## Límites

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#facetas).

- **Límites:** minInclusive/maxInclusive incluyen sus extremos; minExclusive/maxExclusive los excluyen.
- **Nombre frente a restricción:** El tipo mes del PDF admite 1–31 según sus facetas; el nombre no corrige esas restricciones.
- **Dígitos y longitud:** La unidad advierte que totalDigits no debe usarse como una longitud textual exacta.

## Forma y significado

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#enumeraciones-patrones-y-espacios).

- **Forma y significado:** Un patrón de NIF controla su forma textual, sin demostrar todas las comprobaciones del identificador.
- **Espacios:** whiteSpace distingue preserve, replace y collapse con tratamientos diferentes.

## RGB e ítems

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#listas-color-rgb).

- **RGB e ítems:** El ejemplo RGB restringe cada componente a 0–255 y la lista a tres ítems.

## Unión

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#uniones-nota-o-estado-textual).

- **Unión:** La unión TipoNota admite un número 0–10 o la cadena No presentado, como alternativas de tipo.

## Sequence, choice y all

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#orden-y-cardinalidad).

- **Sequence, choice y all:** sequence conserva orden; choice elige alternativa; all admite el orden libre del ejemplo.

## Contenido mixto

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#contenido-simple-mixto-y-grupos).

- **Contenido mixto:** mixed="true" permite combinar texto y elementos en el contenido complejo descrito.

## Extensión y abstracción

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#extension-de-tipos).

- **Extensión y abstracción:** extension deriva tipos; abstract impide su uso directo y xsi:type identifica un tipo derivado.

## Composición

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#reutilizar-archivos-xsd).

- **Composición:** include reutiliza esquemas del mismo namespace; import incorpora otro namespace; redefine permite redefinición.

## Identidad

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#claves-unicidad-y-referencias).

- **Identidad:** unique, key y keyref expresan unicidad, clave obligatoria y referencia respectivamente.

## Ausencia

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#ausente-vacio-y-nulo).

- **Ausencia:** minOccurs="0" permite ausencia del elemento; no convierte por sí solo un valor en nulo.
- **Nulidad y vacío:** nillable="true" habilita xsi:nil; un elemento vacío depende del tipo para ser válido.

## Contenido abierto

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#contenido-abierto-y-documentacion).

- **Contenido abierto:** any/anyAttribute permiten apertura y strict/lax/skip controlan la comprobación del contenido.
- **Documentación:** annotation, documentation y appinfo documentan el esquema sin sustituir restricciones estructurales.

## Generación y errores

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#validacion-y-generacion-automatica).

- **Generación y errores:** Un XSD generado automáticamente requiere revisar tipos y opcionalidad; las grafías de atributos importan.

## Completar el repaso del temario

- Reconocer nombres exactos, URI de XSD frente a XSI, declaraciones globales/locales, tipos anónimos/con nombre y type frente a ref. Repasar valores default/fixed, sequence/choice/all, cardinalidad del grupo frente a la de sus miembros y reutilización de grupos de elementos/atributos dentro del alcance del PDF.
- Distinguir tipos primitivos/derivados, tipos de fecha y zonas horarias; enumeration, pattern, length/minLength/maxLength, whiteSpace y restricciones de dígitos; extension/restriction, abstract y xsi:type; any/anyAttribute con strict/lax/skip y documentación annotation/documentation/appinfo. No deducir restricciones no escritas del nombre de un tipo o de una errata de diapositiva.

## Casos y matices que debes justificar

- Hay dos restricciones independientes: rango de cada componente y cantidad de ítems; la longitud no cuenta caracteres del texto. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#listas-color-rgb).
- Una unión admite cualquiera de sus tipos miembros; no toda cadena es válida si su rama textual es una enumeración cerrada. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#uniones-nota-o-estado-textual).
- Los nombres de tipos no sustituyen las restricciones expresadas; un modelo incorrectamente nombrado puede admitir valores no adecuados al dominio. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#facetas).
- La cardinalidad controla presencia, nillable habilita una marca de nulidad y el tipo determina si un contenido vacío ordinario es válido. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#ausente-vacio-y-nulo).
- Un atributo hace complejo el tipo del elemento aunque su contenido sea un valor simple; simpleContent responde a ese caso. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#elementos-simples-y-atributos).
- schemaLocation distingue namespace y ubicación; sus grafías y las de minOccurs/maxOccurs son sensibles a los nombres exactos, frente a erratas del PDF. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#asociar-un-esquema-con-y-sin-namespace).
- La posición respecto de T distingue M de meses y M de minutos; las duraciones de los ejemplos no son hitos de publicación. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#fechas-y-duraciones).
- La composición distingue relación entre vocabularios; incluir o importar no depende simplemente del nombre o tamaño del archivo. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#reutilizar-archivos-xsd).
- La clave exige presencia y unicidad en su ámbito; la referencia comprueba relación con la identidad, sin generar por sí sola valores ausentes. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#claves-unicidad-y-referencias).
- Validar forma textual no demuestra automáticamente relaciones semánticas o aritméticas no codificadas en la restricción estudiada. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-schemas#enumeraciones-patrones-y-espacios).

## Cómo afrontar opciones combinadas

- Decide por separado si cada afirmación es verdadera, incluida su condición, cuantificador y contexto. Una fecha histórica no describe necesariamente el estado actual.
- «Todas las anteriores son correctas» exige que no haya ninguna excepción; «todas son falsas» exige que no haya ninguna verdadera.
- «Alguna es incorrecta» significa al menos una; no equivale a «todas son incorrectas» ni a «exactamente una».
- En preguntas de conjunto exacto, marca una sola opción que enumere todas y solo las verdaderas. Justifica también las falsas.
- En código, identifica primero contexto, orden, tipos, cardinalidad, nombres y límites inclusivos/exclusivos; después calcula el resultado.

## Autoevaluación

- [Test fácil: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-schemas--facil)
- [Test medio: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-schemas--medio)
- [Test difícil: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-schemas--dificil)
