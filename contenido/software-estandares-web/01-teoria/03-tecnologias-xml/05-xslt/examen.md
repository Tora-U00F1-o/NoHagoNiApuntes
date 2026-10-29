---
asignatura: Software y Estándares para la Web
titulo: XSLT — claves de examen
resumen: Lista de comprobación para repasar conceptos, detalles y errores de esta unidad.
---

# XSLT: claves de examen

Guía de repaso basada en los apuntes, sin garantizar qué preguntará el profesor. Estudia también tablas, código, figuras y advertencias del [desarrollo completo](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt). Las fechas y estados documentales se entienden según el material docente.

## Familia XSL

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#familia-xsl).

- **Familia XSL:** XPath selecciona información, XSLT transforma estructuras y XSL-FO participa en formateo.

## Proceso

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#entrada-reglas-y-salida).

- **Proceso:** La transformación combina documento de entrada, hoja de reglas y procesador para producir un resultado.

## Namespace XSLT

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#raiz-y-clases-de-elementos).

- **Namespace XSLT:** El vocabulario XSLT se identifica por http://www.w3.org/1999/XSL/Transform.
- **Hoja XML:** Una hoja XSLT es XML y debe respetar sus reglas de buena formación.

## Serialización

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#elementos-de-nivel-superior-y-salida).

- **Serialización:** xsl:output permite configurar método, codificación y opciones de serialización.

## Template

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#plantillas-y-aplicacion).

- **Template:** template con match establece una regla aplicable a nodos que coinciden con el patrón.
- **Apply-templates:** apply-templates delega el procesamiento de los nodos seleccionados en sus plantillas.

## Value-of

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#primeros-ejemplos-el-poema).

- **Value-of:** value-of emite un valor textual seleccionado; no equivale a copiar arbitrariamente una estructura completa.

## For-each

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#catalogo-de-musica).

- **For-each:** for-each cambia el contexto a cada nodo seleccionado durante la iteración.

## Delegación e iteración

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#delegar-con-apply-templates).

- **Delegación e iteración:** for-each explicita un bucle y apply-templates delega en reglas, aunque ambos procesen colecciones.

## Ordenación

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#ordenar-con-sort).

- **Ordenación:** sort define claves, tipo y sentido de ordenación en el procesamiento seleccionado.
- **Texto y números:** Elegir orden numérico o textual puede cambiar el resultado de ordenar valores como 2 y 10.

## If

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#condiciones-if-y-choose).

- **If:** xsl:if ejecuta contenido si test se cumple y no incorpora un else propio.
- **Choose:** choose agrupa when y una alternativa otherwise cuando corresponde.

## Construcción

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#construccion-de-elementos-y-atributos).

- **Construcción:** xsl:element y xsl:attribute permiten construir nodos y atributos del resultado.
- **Raíz de salida:** La transformación elementos2atributos del material no garantiza un documento XML completo si produce hermanos sin raíz común.

## Inmutabilidad

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#variables).

- **Inmutabilidad:** Una variable XSLT no se reasigna como una variable de un programa imperativo.
- **Literal y selección:** select="'artist'" representa una cadena y select="artist" selecciona según el contexto.

## Parámetros

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#parametros).

- **Parámetros:** param declara un parámetro y with-param suministra un argumento en la llamada correspondiente.
- **AVT:** La forma order="{$orden}" evalúa el valor del parámetro en una plantilla de valor de atributo.

## Separadores

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#informe-completo-y-presentacion).

- **Separadores:** not(position()=last()) permite omitir un separador después del último elemento.

## Año fijo

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#ultimos-cinco-anos).

- **Año fijo:** El ejemplo de últimos cinco años utiliza 2017 fijo y no equivale a usar el año actual.

## Extremos

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#intervalo-de-fechas).

- **Extremos:** El intervalo del ejemplo es 2010 < año ≤ 2015, con extremo inicial excluido.

## Subcadena de autor

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#autor-concreto).

- **Subcadena de autor:** contains(authors,$author) busca subcadena y no demuestra igualdad con un autor completo.

## Versiones y validación

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#ejercicios-propuestos-html-kml-y-svg).

- **Versiones y validación:** El PDF cita XSLT 3.0, pero muchas hojas son 1.0; transformar no sustituye validar entrada y salida.

## Casos y matices que debes justificar

- Las comillas internas pertenecen a la expresión XPath: distinguen una cadena literal de un nombre evaluado desde el contexto. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#variables).
- For-each cambia el contexto a cada nodo seleccionado; las rutas relativas deben reinterpretarse al entrar en él. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#catalogo-de-musica).
- Las llaves de una plantilla de valor de atributo expresan evaluación; escribir un nombre de variable como texto no garantiza esa sustitución. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#parametros).
- Xsl:if no contiene un else propio; choose organiza casos when y la alternativa otherwise. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#condiciones-if-y-choose).
- La desigualdad inicial es estricta y la final inclusiva; leer ambos extremos evita aceptar el año 2010 o el 2016. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#intervalo-de-fechas).
- Filtrar, actualizar una referencia temporal y ordenar son operaciones distintas; una constante no se convierte en reloj ni un filtro en ordenación. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#ultimos-cinco-anos).
- La búsqueda por subcadena no delimita automáticamente autores completos; hay que interpretar la condición que realmente implementa la hoja. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#autor-concreto).
- Una transformación puede producir un resultado que no cumpla por sí solo la estructura de un documento XML completo con raíz única. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#construccion-de-elementos-y-atributos).
- La condición compara posición actual con última posición; negar la igualdad restringe el separador a los elementos que tienen otro después. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#informe-completo-y-presentacion).
- Hay que distinguir versión de referencia, versión declarada de los archivos y capacidades del procesador; transformar tampoco sustituye validar la salida. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xslt#ejercicios-propuestos-html-kml-y-svg).

## Cómo afrontar opciones combinadas

- Decide por separado si cada afirmación es verdadera, incluida su condición, cuantificador y contexto. Una fecha histórica no describe necesariamente el estado actual.
- «Todas las anteriores son correctas» exige que no haya ninguna excepción; «todas son falsas» exige que no haya ninguna verdadera.
- «Alguna es incorrecta» significa al menos una; no equivale a «todas son incorrectas» ni a «exactamente una».
- En preguntas de conjunto exacto, marca una sola opción que enumere todas y solo las verdaderas. Justifica también las falsas.
- En código, identifica primero contexto, orden, tipos, cardinalidad, nombres y límites inclusivos/exclusivos; después calcula el resultado.

## Autoevaluación

- [Test fácil: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-xslt--facil)
- [Test medio: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-xslt--medio)
- [Test difícil: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-xslt--dificil)
