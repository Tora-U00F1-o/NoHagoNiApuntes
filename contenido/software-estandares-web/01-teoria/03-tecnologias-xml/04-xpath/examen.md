---
asignatura: Software y Estándares para la Web
titulo: XPath — claves de examen
resumen: Lista de comprobación para repasar conceptos, detalles y errores de esta unidad.
---

# XPath: claves de examen

Guía de repaso basada en los apuntes, sin garantizar qué preguntará el profesor. Estudia también tablas, código, figuras y advertencias del [desarrollo completo](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath). Las fechas y estados documentales se entienden según el material docente.

## Contexto

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#rutas-y-nodo-de-contexto).

- **Contexto:** Una ruta relativa se interpreta desde el nodo de contexto.
- **Ruta absoluta:** /biblioteca/libro parte del documento y recorre biblioteca antes de libro.
- **Descendientes:** X//Y busca descendientes Y de X; X/Y busca hijos Y directos.
- **Nodo y padre:** El punto representa el contexto y dos puntos representan su padre.
- **Atributos:** @id selecciona un atributo y no un elemento hijo id.
- **Comodín:** En el paso de hijos mostrado, * selecciona elementos hijos, no atributos ni todo tipo de nodo.
- **Texto:** text() selecciona nodos de texto; no es el mismo test que *.

## Posiciones

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#predicados-y-orden-de-los-filtros).

- **Posiciones:** Las posiciones de los ejemplos XPath empiezan en 1.
- **Filtro y paso:** Un predicado filtra nodos del paso y no añade un nivel de hijo.
- **Orden de filtros:** X[1][@Y='Z'] filtra primero por posición y después por atributo.

## Datos de biblioteca

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#documento-de-trabajo-biblioteca).

- **Datos de biblioteca:** La biblioteca original ordena Cien años de soledad, 1984 y El gran Gatsby.
- **Identidad y dato:** El atributo id y el elemento isbn son datos distintos del mismo libro.

## Count

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#funciones-y-consultas-explicadas).

- **Count:** count(/biblioteca/libro) produce un número; en el archivo original vale tres.
- **Contains:** contains comprueba presencia de subcadena, no igualdad textual completa.
- **Starts-with:** starts-with comprueba el prefijo de una cadena.
- **Substring:** substring(titulo,1,4) usa el título del contexto y comienza en la posición uno.
- **Normalización:** normalize-space normaliza espacios sobrantes del texto.

## Conjunción

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#filtrar-por-autor-o-atributos).

- **Conjunción:** La consulta con año menor que 1958 y editorial que contiene Planeta exige ambas condiciones.

## Last y fecha

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#mas-reciente-frente-a-ultimo-del-archivo).

- **Last y fecha:** last() expresa posición; el último libro del archivo no es necesariamente el de mayor año.
- **Máximo con comparación:** La consulta not(anio < //libro/anio) descarta años menores que algún otro y el last final resuelve empates.

## Comparación numérica

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#consultas-del-bloque-lxml).

- **Comparación numérica:** number(anio) explicita el uso numérico del año en el filtro del ejemplo.

## Motores

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#xpath-con-elementtree).

- **Motores:** ElementTree pertenece a la biblioteca estándar e implementa el subconjunto de XPath usado en el material.

## Namespace

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#contexto-y-espacios-de-nombres).

- **Namespace:** El ejemplo ElementTree representa nombres cualificados como {http://www.uniovi.es}pizza.

## Tipos de resultado

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#xpath-con-lxml).

- **Tipos de resultado:** Las expresiones del bloque lxml pueden devolver nodos, cadenas, números o booleanos.

## Errores de lectura

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#errores-frecuentes-y-repaso).

- **Errores de lectura:** Archivo ausente y XML mal formado son errores distintos del programa lector.

## Casos y matices que debes justificar

- El primer predicado reduce el contexto del siguiente: posición antes de filtro no equivale necesariamente a filtro antes de posición. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#predicados-y-orden-de-los-filtros).
- last() expresa posición; el máximo del campo anio requiere una comparación distinta y no se deduce del orden del documento. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#mas-reciente-frente-a-ultimo-del-archivo).
- Los predicados XPath del ejemplo comienzan en uno; después de filtrar el segundo libro se recorre a su hijo autor. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#documento-de-trabajo-biblioteca).
- La conversión numérica permite comparar 1949 y 1925 con 1950; 1967 no cumple el filtro. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#consultas-del-bloque-lxml).
- count devuelve un número escalar en el ejemplo; una rutina diseñada solo para listas de elementos necesita distinguir ese tipo de resultado. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#funciones-y-consultas-explicadas).
- And exige ambas condiciones en cada libro; no permite repartir una condición entre un libro y la otra entre otro. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#filtrar-por-autor-o-atributos).
- Una consulta sin cualificación adecuada puede no coincidir con {URI}pizza; selección vacía no equivale a error sintáctico del documento. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#contexto-y-espacios-de-nombres).
- El comodín del paso de hijos selecciona elementos; atributos y texto requieren tests o ejes pertinentes distintos. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#rutas-y-nodo-de-contexto).
- La unidad limita el soporte de ElementTree en sus ejemplos y diferencia las consultas más amplias de lxml; no deben extrapolarse capacidades sin verificar el motor. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#xpath-con-elementtree).
- Primero se filtra por no tener año menor que otro; el último se toma sobre los candidatos restantes, no sobre todos los libros sin filtrar. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-xpath#mas-reciente-frente-a-ultimo-del-archivo).

## Cómo afrontar opciones combinadas

- Decide por separado si cada afirmación es verdadera, incluida su condición, cuantificador y contexto. Una fecha histórica no describe necesariamente el estado actual.
- «Todas las anteriores son correctas» exige que no haya ninguna excepción; «todas son falsas» exige que no haya ninguna verdadera.
- «Alguna es incorrecta» significa al menos una; no equivale a «todas son incorrectas» ni a «exactamente una».
- En preguntas de conjunto exacto, marca una sola opción que enumere todas y solo las verdaderas. Justifica también las falsas.
- En código, identifica primero contexto, orden, tipos, cardinalidad, nombres y límites inclusivos/exclusivos; después calcula el resultado.

## Autoevaluación

- [Test fácil: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-xpath--facil)
- [Test medio: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-xpath--medio)
- [Test difícil: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-xpath--dificil)
