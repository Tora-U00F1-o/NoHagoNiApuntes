---
asignatura: Software y Estándares para la Web
titulo: CSS — claves de examen
resumen: Lista de comprobación para repasar conceptos, detalles y errores de esta unidad.
---

# CSS: claves de examen

Guía de repaso basada en los apuntes, sin garantizar qué preguntará el profesor. Estudia también tablas, código, figuras y advertencias del [desarrollo completo](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css). Las fechas y estados documentales se entienden según el material docente.

## Asociación CSS

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#hojas-de-estilo-externas).

- **Asociación CSS:** Una hoja externa se asocia desde HTML mediante link y puede reutilizarse en varios documentos.

## CSS y XML

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#asociacion-de-una-hoja-css-a-xml).

- **CSS y XML:** La unidad muestra una instrucción de procesamiento para asociar CSS a XML.

## Regla y declaración

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#hoja-regla-selector-y-declaracion).

- **Regla y declaración:** Una regla contiene selector y bloque; una declaración tiene propiedad y valor.

## Abreviaturas

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#regla-del-reloj).

- **Abreviaturas:** Cuatro valores de margen o relleno siguen arriba, derecha, abajo e izquierda.

## Tipo y universal

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#selector-de-tipo-y-selector-universal).

- **Tipo y universal:** p selecciona por tipo y * es universal; no aportan la misma especificidad.

## Clases

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#selector-de-clase).

- **Clases:** .aviso selecciona elementos de esa clase y un elemento puede tener varias clases.

## Identificador

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#selector-de-identificador).

- **Identificador:** #principal es selector de identificador y tiene mayor especificidad que una clase en las mismas condiciones.

## Atributos

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#selectores-de-atributo).

- **Atributos:** [type="text"] selecciona por atributo y valor y contribuye como clase en la especificidad.

## Descendiente e hijo

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#descendiente-e-hijo-directo).

- **Descendiente e hijo:** main p selecciona descendientes y main > p exige hijo directo.

## Hermanos

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#hermano-adyacente-y-hermano-general).

- **Hermanos:** h2 + p exige un hermano inmediatamente posterior y h2 ~ p admite hermanos posteriores no adyacentes.

## Foco y activación

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#interaccion-del-usuario).

- **Foco y activación:** :focus indica foco y :active activación; no son estados equivalentes.

## Estados de formularios

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#formularios).

- **Estados de formularios:** :required expresa obligatoriedad y :valid validez; son condiciones diferentes.

## Posición estructural

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#pseudoclases-estructurales).

- **Posición estructural:** :nth-child(2) se refiere a la posición entre hijos, no a la segunda coincidencia de un tipo aislado.

## Is y where

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#pseudoclases-modernas-de-selectors-level-4).

- **Is y where:** :is toma la mayor especificidad de su lista y :where aporta cero especificidad.

## Especificidad relacional

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#especificidad-de-selectors-level-4).

- **Especificidad relacional:** La especificidad de :is, :not y :has depende de sus argumentos; :where constituye la excepción de cero.

## Componentes

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#calculo-de-especificidad).

- **Componentes:** La especificidad compara ID, clases/atributos/pseudoclases y tipos/pseudoelementos como componentes ordenados.

## Importancia

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#importancia-y-precedencia).

- **Importancia:** !important afecta al orden por importancia y origen; no incrementa la especificidad del selector.

## Origen

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#origen-de-las-declaraciones).

- **Origen:** La cascada distingue origen de navegador, usuario y autor; no se reduce a comparar selectores.

## Empate

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#orden-de-aparicion).

- **Empate:** A igualdad de los criterios previos, la declaración posterior prevalece.

## Palabras clave

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#valores-iniciales-y-palabras-clave).

- **Palabras clave:** inherit toma el valor del padre, initial el inicial y unset depende de si la propiedad se hereda.

## Herencia

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#herencia-en-el-arbol-dom).

- **Herencia:** No todas las propiedades se heredan; herencia y declaración explícita no son equivalentes.

## Caja

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#calculo-de-dimensiones).

- **Caja:** En content-box, la anchura exterior añade padding, bordes y márgenes a la anchura de contenido.

## Em y rem

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#ejemplo-original-diferencia-entre-rem-y-em).

- **Em y rem:** rem toma la fuente raíz; em depende del contexto de la propiedad y puede acumular escalado en anidamiento.

## Calc y unidades

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#notacion-funcional-y-calc).

- **Calc y unidades:** calc permite combinar valores compatibles; porcentaje, em, rem y viewport no tienen la misma referencia.

## Propiedades personalizadas

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#variables-css-o-custom-properties).

- **Propiedades personalizadas:** Las propiedades personalizadas usan nombres --nombre y se consultan mediante var; la compatibilidad requiere comprobación.

## Completar el repaso del temario

- Revisar los operadores de atributos =, ~=, |=, ^=, $= y *=; pseudoclases de enlaces, formularios e interacción frente a pseudoelementos; agrupación con coma frente a combinación sin espacios. Rehacer ejemplos de selectores sobre el DOM, no solo memorizar su nombre.
- Repasar estilos en línea, internos y externos; link frente a @import; comentarios, abreviaturas de uno/dos/tres/cuatro valores; proceso de carga y fases de valores; valor inicial y computado heredado. Consultar las fichas Initial e Inherited de cada propiedad, sin suponer herencia universal.
- Interpretar longitudes absolutas/relativas, porcentajes según propiedad, funciones y propiedades personalizadas. Revisar compatibilidad parcial, características inestables y propietarias. Las fechas documentales de Selectors 3 (REC 06/11/2018), Selectors 4 (WD 22/01/2026) y Values and Units 3 (CR 01/12/2022) son las citadas en el PDF, sin ser un nivel global de CSS.

## Casos y matices que debes justificar

- En abreviatura de tres valores el segundo se aplica a ambos lados horizontales; la lectura sigue la regla de los lados explicada. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#regla-del-reloj).
- La especificidad se compara como componentes, sin acarreos decimales entre clases e identificadores. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#calculo-de-especificidad).
- Is y where pueden agrupar selecciones parecidas, pero su contribución a especificidad es distinta. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#especificidad-de-selectors-level-4).
- Orden de aparición resuelve empates; no debe presentarse como regla que supera cualquier origen, importancia o especificidad. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#orden-de-aparicion).
- Se suma 120 + 20 de padding + 4 de bordes + 10 de márgenes; width no representa por sí solo toda la ocupación exterior. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#calculo-de-dimensiones).
- En font-size, em toma la referencia de fuente del padre; rem toma la raíz. El contexto concreto de la propiedad es decisivo. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#ejemplo-original-diferencia-entre-rem-y-em).
- Adyacencia exige el hermano inmediatamente siguiente; el combinador general permite otros hermanos posteriores aunque se intercale un div. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#hermano-adyacente-y-hermano-general).
- La combinación sin espacio exige ambas condiciones en el mismo elemento; pertenencia a una clase no equivale a estar dentro de quien la tiene. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#varias-clases-y-selectores-mas-precisos).
- Importancia y especificidad son criterios distintos de la cascada; no debe explicarse !important como una suma numérica de especificidad. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#importancia-y-precedencia).
- Las fases distinguen valores candidatos, resolución de conflictos, obtención de valores y realización final; no todo valor escrito coincide directamente con el real. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css#desde-los-valores-declarados-hasta-el-valor-real).

## Cómo afrontar opciones combinadas

- Decide por separado si cada afirmación es verdadera, incluida su condición, cuantificador y contexto. Una fecha histórica no describe necesariamente el estado actual.
- «Todas las anteriores son correctas» exige que no haya ninguna excepción; «todas son falsas» exige que no haya ninguna verdadera.
- «Alguna es incorrecta» significa al menos una; no equivale a «todas son incorrectas» ni a «exactamente una».
- En preguntas de conjunto exacto, marca una sola opción que enumere todas y solo las verdaderas. Justifica también las falsas.
- En código, identifica primero contexto, orden, tipos, cardinalidad, nombres y límites inclusivos/exclusivos; después calcula el resultado.

## Autoevaluación

- [Test fácil: 50 preguntas](?cuestionario=software-estandares-web--teoria-lenguajes-de-presentacion-css--facil)
- [Test medio: 50 preguntas](?cuestionario=software-estandares-web--teoria-lenguajes-de-presentacion-css--medio)
- [Test difícil: 50 preguntas](?cuestionario=software-estandares-web--teoria-lenguajes-de-presentacion-css--dificil)
