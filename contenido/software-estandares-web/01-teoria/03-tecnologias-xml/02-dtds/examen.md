---
asignatura: Software y Estándares para la Web
titulo: DTDs — claves de examen
resumen: Lista de comprobación para repasar conceptos, detalles y errores de esta unidad.
---

# DTDs: claves de examen

Guía de repaso basada en los apuntes, sin garantizar qué preguntará el profesor. Estudia también tablas, código, figuras y advertencias del [desarrollo completo](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds). Las fechas y estados documentales se entienden según el material docente.

## Gramática

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#asociar-la-dtd-al-documento).

- **Gramática:** La DTD define estructura y atributos de una familia de documentos XML.

## DTD interna

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#subconjunto-interno).

- **DTD interna:** El subconjunto interno se escribe dentro de los corchetes de DOCTYPE.

## SYSTEM

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#archivo-externo-con-system).

- **SYSTEM:** DOCTYPE libros SYSTEM "libros.dtd" asocia una DTD externa.

## PUBLIC

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#identificador-publico).

- **PUBLIC:** PUBLIC incorpora un identificador público en la asociación de la DTD.

## Secuencia

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#secuencia-alternativas-y-frecuencia).

- **Secuencia:** El modelo (a,b) exige a seguido de b.
- **Alternativa:** El separador vertical en (a o b) representa alternativas, no una secuencia obligatoria de ambos.
- **Opcionalidad:** a? admite cero o una aparición.
- **Cero o más:** a* permite cero o más apariciones.
- **Uno o más:** a+ exige al menos una aparición y permite repetición.

## Agrupación

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#leer-agrupaciones).

- **Agrupación:** Un modificador aplicado a un grupo afecta al grupo completo.

## EMPTY

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#declaracion-de-elementos-y-modelos-de-contenido).

- **EMPTY:** EMPTY prohíbe contenido, pero no impide declarar atributos.
- **PCDATA y mezcla:** PCDATA expresa texto y el contenido mixto combina texto con los elementos declarados.
- **ANY:** ANY abre el modelo de contenido y es menos restrictivo que una estructura específica.

## Modelo de libro

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#ejemplo-completo-de-libros).

- **Modelo de libro:** El modelo original exige título y autor+, admite año? y mantiene el orden de los campos.

## ATTLIST

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#listas-de-atributos-attlist).

- **ATTLIST:** ATTLIST declara atributos, sus tipos y sus condiciones de presencia o valor.
- **REQUIRED e IMPLIED:** #REQUIRED exige presencia; #IMPLIED permite omitir sin fijar un valor por defecto.
- **Valor por defecto y FIXED:** Un valor por defecto puede sustituirse; #FIXED restringe el valor al declarado.

## ID e IDREF

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#tipos).

- **ID e IDREF:** ID identifica de forma única e IDREF referencia una identidad del documento.
- **CDATA de atributos:** CDATA no impone por sí solo que el texto de un atributo sea un número válido.
- **NMTOKEN y enumeración:** NMTOKENS es una lista de testigos y una enumeración restringe a valores declarados.

## Entidades generales

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#generales-internas-y-externas).

- **Entidades generales:** Una entidad general se referencia con &nombre; y puede ser interna o externa.

## Entidades de parámetro

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#entidades-de-parametro).

- **Entidades de parámetro:** Las entidades de parámetro reutilizan contenido en la DTD mediante %nombre;.

## NOTATION y NDATA

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#notaciones-y-datos-externos).

- **NOTATION y NDATA:** NOTATION identifica formatos externos y NDATA vincula una entidad no analizada con su notación.

## Namespaces

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#relacion-con-las-dtd).

- **Namespaces:** La DTD no trata namespaces directamente: deben declararse los nombres prefijados y los atributos xmlns usados.

## Orden de comprobación

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#proceso-y-herramientas-de-validacion).

- **Orden de comprobación:** Una falta de cierre impide buena formación antes de evaluar las restricciones de la DTD.

## Casos y matices que debes justificar

- El signo + repite una o más veces el grupo entero (a,b); no distribuye independientemente todos los a y después todos los b. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#leer-agrupaciones).
- La frecuencia debe comprobarse en sus dos extremos: mínimo cero en ambos, máximo uno en ? y repetición sin ese límite en *. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#secuencia-alternativas-y-frecuencia).
- El modificador ? solo afecta a año y + solo a autor; no vuelve opcionales ni reordenables los campos restantes. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#ejemplo-completo-de-libros).
- Deben separarse presencia y valor: #FIXED restringe el valor declarado, mientras que un valor por defecto normal puede ser reemplazado. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#listas-de-atributos-attlist).
- EMPTY no prohíbe declarar atributos, pero sí contenido del elemento; no debe confundirse vacío con ausencia de atributos. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#declaracion-de-elementos-y-modelos-de-contenido).
- CDATA de atributo no equivale a una restricción numérica de XML Schema; reconocer texto no demuestra su significado monetario. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#tipos).
- ID identifica de forma única dentro del documento; referenciar una identidad no hace válida una duplicación previa. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#tipos).
- La sintaxis de referencia y el lugar de uso distinguen entidades de parámetro y generales. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#entidades-de-parametro).
- El material distingue resolución de nombres por URI de las declaraciones literales que necesita una DTD para prefijos y xmlns. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#relacion-con-las-dtd).
- La comprobación gramatical presupone XML sintácticamente procesable; los errores de cierre son previos a las restricciones de contenido. [Revisar](?u=software-estandares-web%2Fteoria-tecnologias-xml-dtds#proceso-y-herramientas-de-validacion).

## Cómo afrontar opciones combinadas

- Decide por separado si cada afirmación es verdadera, incluida su condición, cuantificador y contexto. Una fecha histórica no describe necesariamente el estado actual.
- «Todas las anteriores son correctas» exige que no haya ninguna excepción; «todas son falsas» exige que no haya ninguna verdadera.
- «Alguna es incorrecta» significa al menos una; no equivale a «todas son incorrectas» ni a «exactamente una».
- En preguntas de conjunto exacto, marca una sola opción que enumere todas y solo las verdaderas. Justifica también las falsas.
- En código, identifica primero contexto, orden, tipos, cardinalidad, nombres y límites inclusivos/exclusivos; después calcula el resultado.

## Autoevaluación

- [Test fácil: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-dtds--facil)
- [Test medio: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-dtds--medio)
- [Test difícil: 50 preguntas](?cuestionario=software-estandares-web--teoria-tecnologias-xml-dtds--dificil)
