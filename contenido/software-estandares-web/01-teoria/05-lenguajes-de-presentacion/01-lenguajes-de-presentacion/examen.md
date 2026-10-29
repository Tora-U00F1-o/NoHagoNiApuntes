---
asignatura: Software y Estándares para la Web
titulo: Lenguajes de presentación — claves de examen
resumen: Lista de comprobación para repasar conceptos, detalles y errores de esta unidad.
---

# Lenguajes de presentación: claves de examen

Guía de repaso basada en los apuntes, sin garantizar qué preguntará el profesor. Estudia también tablas, código, figuras y advertencias del [desarrollo completo](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion). Las fechas y estados documentales se entienden según el material docente.

## Contenido

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#que-es-el-contenido).

- **Contenido:** HTML describe información y organización mediante títulos, párrafos, listas e imágenes.

## Presentación

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#que-es-la-presentacion).

- **Presentación:** CSS define presentación, incluidos colores, fuentes y disposición.

## Mantenimiento

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#ventajas-de-separar-ambas-responsabilidades).

- **Mantenimiento:** Separar contenido y presentación facilita modificar estilos sin alterar información.
- **Reutilización:** La misma hoja CSS puede aplicarse a múltiples documentos.
- **Duplicación:** Separar estilos e información puede reducir duplicación de código.
- **Dispositivos:** La separación facilita adaptar la presentación a ordenador, tableta y móvil.

## Descripción documental

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#ejemplos-originales-de-descripcion-de-documentos).

- **Descripción documental:** El ejemplo HTML con h1, p, ul y a describe estructura aunque carezca de diseño elaborado.
- **Enlaces originales:** Las comillas tipográficas del atributo title original se advierten como errata al reutilizar código.

## Necesidad de CSS

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#por-que-aparecio-la-necesidad-de-un-lenguaje-de-presentacion).

- **Necesidad de CSS:** Controlar colores, tipografías, márgenes y organización visual motivó un lenguaje de presentación.
- **Capturas históricas:** Las capturas permiten observar cambios visuales, pero no prueban qué reglas CSS exactas se usaron.

## Niveles

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#niveles-en-lugar-de-versiones).

- **Niveles:** El material habla de niveles CSS que refinan definiciones y añaden características.

## CSS1

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#css-level-1).

- **CSS1:** CSS Level 1 se fecha como Recomendación de 17 de diciembre de 1996.
- **Ámbitos de CSS1:** El PDF destaca colores, tipografía y márgenes para CSS1.

## CSS2

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#css-level-2-y-sus-revisiones).

- **CSS2:** CSS2 se recoge como Recomendación de 12 de mayo de 1998.
- **Ampliaciones de CSS2:** CSS2 amplía posicionamiento y tipos de medios en el recorrido docente.
- **CSS 2.1:** CSS 2.1 es revisión 1 de CSS Level 2, con REC de 7 de junio de 2011 en el PDF.
- **CSS 2.2:** La tabla docente identifica CSS 2.2 como revisión 2 y WD de 12 de abril de 2016.
- **Estados documentales:** REC y WD representan estados distintos en las tablas históricas del material.

## Núcleo

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#css-level-3-y-la-arquitectura-modular).

- **Núcleo:** CSS Level 3 se construye módulo a módulo sobre el núcleo de CSS 2.1.
- **Módulo nuevo:** Los módulos que no existían en CSS 2.1 comienzan en nivel 1 según la unidad.
- **Módulo que actualiza:** Los módulos que actualizan contenido de CSS 2.1 empiezan en nivel 3 y pueden avanzar.

## CSS4 global

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#por-que-no-existe-un-css-level-4-global).

- **CSS4 global:** Un módulo como Selectors Level 4 no implica una especificación global CSS4.

## Compatibilidad

[Apartado de los apuntes](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#principios-de-diseno-de-css).

- **Compatibilidad:** Compatibilidad e independencia de dispositivo buscan funcionamiento en navegadores y plataformas diversas.
- **Accesibilidad:** La accesibilidad considera usuarios, dispositivos y tecnologías de apoyo; no equivale solo a mantenimiento.
- **Ocho principios:** El material diferencia separación, compatibilidad, independencia, mantenibilidad, reutilización, accesibilidad, simplicidad y evolución modular.

## Casos y matices que debes justificar

- La arquitectura modular admite numeraciones iniciales diferentes según exista o no antecedente en CSS 2.1. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#css-level-3-y-la-arquitectura-modular).
- Los niveles de módulos no forman necesariamente un número de versión global de toda la tecnología. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#por-que-no-existe-un-css-level-4-global).
- Las fechas distinguen CSS1, CSS2 y revisiones 2.1 y 2.2; estado documental y nivel no son intercambiables. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#css-level-2-y-sus-revisiones).
- Una pregunta sobre una tabla histórica debe responderse con el estado y fecha que la tabla atribuye, sin afirmar por ello el estado actual. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#css-level-2-y-sus-revisiones).
- Aplicar estilos comunes es reutilización; cambiar presentación sin alterar contenido facilita mantenimiento. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#ventajas-de-separar-ambas-responsabilidades).
- El material distingue transcripción original y código reutilizable; una errata tipográfica de la fuente debe señalarse y corregirse de forma explícita. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#ejemplos-originales-de-descripcion-de-documentos).
- Las capturas ilustran evolución visual, no una auditoría de implementación, compatibilidad o accesibilidad. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#por-que-aparecio-la-necesidad-de-un-lenguaje-de-presentacion).
- La unidad distingue evolución por niveles, revisiones para problemas del nivel 2 y posterior modularización. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#niveles-en-lugar-de-versiones).
- Los principios están relacionados pero son evaluables por separado; compartir reglas no elimina automáticamente barreras para usuarios. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#principios-de-diseno-de-css).
- La independencia permite atender a dispositivos y agentes diferentes sin confundir el contenido con una única disposición visual. [Revisar](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion#principios-de-diseno-de-css).

## Cómo afrontar opciones combinadas

- Decide por separado si cada afirmación es verdadera, incluida su condición, cuantificador y contexto. Una fecha histórica no describe necesariamente el estado actual.
- «Todas las anteriores son correctas» exige que no haya ninguna excepción; «todas son falsas» exige que no haya ninguna verdadera.
- «Alguna es incorrecta» significa al menos una; no equivale a «todas son incorrectas» ni a «exactamente una».
- En preguntas de conjunto exacto, marca una sola opción que enumere todas y solo las verdaderas. Justifica también las falsas.
- En código, identifica primero contexto, orden, tipos, cardinalidad, nombres y límites inclusivos/exclusivos; después calcula el resultado.

## Autoevaluación

- [Test fácil: 50 preguntas](?cuestionario=software-estandares-web--teoria-lenguajes-de-presentacion-lenguajes-de-presentacion--facil)
- [Test medio: 50 preguntas](?cuestionario=software-estandares-web--teoria-lenguajes-de-presentacion-lenguajes-de-presentacion--medio)
- [Test difícil: 50 preguntas](?cuestionario=software-estandares-web--teoria-lenguajes-de-presentacion-lenguajes-de-presentacion--dificil)
