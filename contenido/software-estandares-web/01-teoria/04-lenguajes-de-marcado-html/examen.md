---
asignatura: Software y Estándares para la Web
titulo: Lenguajes de Marcado - HTML — claves de examen
resumen: Lista de comprobación para repasar conceptos, detalles y errores de esta unidad.
---

# Lenguajes de Marcado - HTML: claves de examen

Guía de repaso basada en los apuntes, sin garantizar qué preguntará el profesor. Estudia también tablas, código, figuras y advertencias del [desarrollo completo](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html). Las fechas y estados documentales se entienden según el material docente.

## HTML y DOM

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#4-historicamente-se-popularizo-con-el-nombre-html5-pero).

- **HTML y DOM:** HTML es marcado y WHATWG mantiene el estándar vivo; el navegador construye una representación DOM.

## Elementos vacíos

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#5-tipos-de-elementos).

- **Elementos vacíos:** img no tiene etiqueta de cierre; la barra final de la convención docente no autoriza escribir `</img>`.

## Atributos y booleanos

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#10-el-valor-de-los-atributos-se-especifica).

- **Atributos y booleanos:** La unidad recomienda comillas dobles; disabled es un atributo booleano expresable mediante presencia.

## DOCTYPE

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#12-especificacion-del-tipo-de-documento).

- **DOCTYPE:** `<!DOCTYPE html>` activa modo estándar y no referencia una DTD externa como el ejemplo XHTML.

## Head, title y header

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#29-title-titulo-o-nombre-de-la-pagina-obligatoria).

- **Head, title y header:** title pertenece a los metadatos de head; header es contenido introductorio, no sinónimo de head.

## Article y section

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#40-cuando-usar-article-y-cuando-section).

- **Article y section:** article expresa una unidad autónoma y section agrupa contenido temático.

## Nav

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#43-elemento-nav).

- **Nav:** nav representa regiones de navegación importantes, como menú, índice o migas.

## Aside

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#47-elemento-aside).

- **Aside:** aside significa contenido complementario; su justificación no es estar visualmente a un lado.

## Encabezados

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#48-elemento-h1-h2-h3-h4-h5-y-h6).

- **Encabezados:** h1–h6 expresan jerarquía; el PDF recomienda un h1 sin convertir la recomendación en prohibición universal.

## Main y contenedores

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#57-elemento-main).

- **Main y contenedores:** main identifica contenido principal; div y span son agrupadores genéricos sin semántica específica propia.

## Listas

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#74-html-proporciona-tres-tipos-de-listas).

- **Listas:** ul y ol contienen li; dl asocia dt y dd; la elección depende del significado del orden.

## Párrafos y preformateado

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#68-pre-representa-texto-preformateado).

- **Párrafos y preformateado:** pre conserva espaciado; p expresa párrafos y br no debe sustituir su separación estructural.

## Citas y rupturas

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#70-blockquote-representa-una-cita-extensa-procedente-de-ingenieria).

- **Citas y rupturas:** blockquote expresa cita extensa y hr ruptura temática; sus efectos visuales no definen su semántica.

## Figure

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#80-figure-representa-contenido-autonomo-relacionado).

- **Figure:** figure puede agrupar contenido autónomo no gráfico; figcaption proporciona su descripción o título.

## Semántica textual

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#99-el-elemento-em-representa-un-enfasis-en-el-texto).

- **Semántica textual:** em expresa énfasis y strong importancia; b e i no sustituyen automáticamente esos significados.

## Código, entrada y salida

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#127-resumen-kbd-entrada-del-usuario).

- **Código, entrada y salida:** code representa código, var una variable, samp salida y kbd entrada del usuario.

## Enlaces

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#96-el-atributo-target-y-el-atributo-rel-del-elemento-a).

- **Enlaces:** href indica destino, target contexto y rel relación; son funciones diferentes.

## Imágenes

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#132-el-elemento-picture-permite-proporcionar-varias-ingenieria).

- **Imágenes:** picture combina source e img para versiones alternativas; img aporta el recurso de reserva y su texto alternativo.

## Multimedia

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#139-los-elementos-track-permite-asociar-informacion-ingenieria).

- **Multimedia:** audio y video reproducen medios; track asocia pistas de texto como subtítulos.

## Tablas

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#145-para-que-una-tabla-sea-accesible).

- **Tablas:** caption describe la tabla y th con scope ayuda a relacionar encabezados de fila o columna.

## Formularios

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#151-html-incorpora-mecanismos-basicos-de-validacion-en-el-ingenieria).

- **Formularios:** HTML aporta validación básica del formulario; eso no equivale a toda validación de la aplicación.

## Details y dialog

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#155-elemento-details).

- **Details y dialog:** details ofrece contenido desplegable y summary su rótulo; dialog corresponde a un diálogo.

## ID y clases

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#159-permite-asignar-al-elemento-un-identificador-unico).

- **ID y clases:** id identifica de forma única y class permite clasificar elementos; no son funciones intercambiables.

## Tabulación

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#170-permite-controlar-el-orden-de-navegacion-mediante-teclado).

- **Tabulación:** tabindex controla navegación por teclado; -1 excluye del orden secuencial pero permite foco programático.

## Atributos globales

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#173-permite-almacenar-informacion-personalizada-ingenieria).

- **Atributos globales:** data-* almacena datos personalizados; lang idioma y dir direccionalidad tienen funciones específicas.

## Completar el repaso del temario

- Repasar también las diferencias de head/meta/charset frente a header; footer y address según su ámbito; hgroup con subtítulo; main frente a div/span; listas anidadas, dl/dt/dd, menu y search. La elección es semántica y no depende de su apariencia habitual.
- Distinguir small, s y del; cite frente a q y blockquote; dfn y abbr; ruby/rt/rp; data y time; sub, mark, b, i y u; bdi frente a bdo. No intercambiar importancia, énfasis, relevancia, anotación y presentación visual.
- Revisar alt, mapa de imagen y recursos incrustados iframe/embed/object; caption, thead/tbody/tfoot, th/td, rowspan/colspan y scope; asociación de controles y etiquetas, atributos name/id y validación básica de formulario; details/summary frente a dialog.
- Saber interpretar individualmente accesskey, contenteditable, dir, hidden, lang, spellcheck, style, tabindex, title, translate y data-*. Diferenciar atributos globales de atributos propios del elemento, y recomendaciones del curso de prohibiciones sintácticas.

## Casos y matices que debes justificar

- La recuperación del navegador puede construir un DOM diferente; mostrar contenido no equivale a conformidad del marcado. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#8-anidamiento-de-elementos).
- El caso de Bora Bora demuestra que article depende de independencia semántica; section reúne el tema común y no se elige por geometría. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#40-cuando-usar-article-y-cuando-section).
- Los encabezados requieren asociaciones expresadas en marcado; la apariencia y la fusión de celdas no sustituyen esas relaciones. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#145-para-que-una-tabla-sea-accesible).
- El tabindex negativo retira del orden secuencial normal sin impedir necesariamente el foco programático. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#170-permite-controlar-el-orden-de-navegacion-mediante-teclado).
- La semántica de texto distingue entrada, salida, variable y código; parecido visual no vuelve intercambiables sus elementos. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#127-resumen-kbd-entrada-del-usuario).
- Los atributos globales cubren finalidades diferentes; almacenar datos personalizados no establece automáticamente idioma o direccionalidad. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#173-permite-almacenar-informacion-personalizada-ingenieria).
- Debe distinguirse convención docente, aviso del validador y naturaleza vacía del elemento. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#5-tipos-de-elementos).
- El destino, el contexto y la relación son dimensiones diferentes; no debe tratarse el título informativo como URL ni rel como contexto. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#96-el-atributo-target-y-el-atributo-rel-del-elemento-a).
- Selección de recursos y agrupación semántica son problemas distintos; la leyenda no reemplaza por sí sola todos los mecanismos de imagen. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#132-el-elemento-picture-permite-proporcionar-varias-ingenieria).
- Es esencial separar buenas prácticas docentes, significado de encabezados y restricciones que realmente afirma el lenguaje. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html#48-elemento-h1-h2-h3-h4-h5-y-h6).

## Cómo afrontar opciones combinadas

- Decide por separado si cada afirmación es verdadera, incluida su condición, cuantificador y contexto. Una fecha histórica no describe necesariamente el estado actual.
- «Todas las anteriores son correctas» exige que no haya ninguna excepción; «todas son falsas» exige que no haya ninguna verdadera.
- «Alguna es incorrecta» significa al menos una; no equivale a «todas son incorrectas» ni a «exactamente una».
- En preguntas de conjunto exacto, marca una sola opción que enumere todas y solo las verdaderas. Justifica también las falsas.
- En código, identifica primero contexto, orden, tipos, cardinalidad, nombres y límites inclusivos/exclusivos; después calcula el resultado.

## Autoevaluación

- [Test fácil: 50 preguntas](?cuestionario=software-estandares-web--teoria-lenguajes-de-marcado-html--facil)
- [Test medio: 50 preguntas](?cuestionario=software-estandares-web--teoria-lenguajes-de-marcado-html--medio)
- [Test difícil: 50 preguntas](?cuestionario=software-estandares-web--teoria-lenguajes-de-marcado-html--dificil)
