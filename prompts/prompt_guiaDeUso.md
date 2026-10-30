# Guía de los prompts de estudio

Los prompts se pueden ejecutar por fases o de una vez. Todos se guardan en esta carpeta con el prefijo `prompt_` y extensión `.md`.

## Qué prompt utilizar

| Necesidad | Prompt | Entrada | Archivos que genera |
|---|---|---|---|
| Preparar los apuntes completos y sus imágenes | [Generar unidad](prompt_generarUnidad.md) | PDF original; destino o cabecera opcionales. | `unidad.md`, copia del PDF, `figuras/` si aporta valor y ZIP de la unidad. |
| Preparar lectura rápida y repaso de examen | [Generar resumen y aspectos clave](prompt_generarResumenYAspectosClave.md) | `unidad.md`; PDF opcional para contraste. | `resumen.md` y `examen.md`. |
| Preparar autoevaluación | [Generar test](prompt_generarTest.md) | `unidad.md` y sus recursos; PDF si está disponible. | `test/facil.csv`, `test/medio.csv`, `test/dificil.csv`: 50 preguntas por nivel. |
| Prepararlo todo desde el original | [Generar todo desde PDF](prompt_generarTodoDesdePdf.md) | Solo PDF original; el destino es opcional. | Los tres Markdown, PDF, figuras útiles, tres CSV y ZIP completo. |

Los **aspectos clave** se guardan en `examen.md` porque ese nombre activa la vista **Claves de examen** de la web. El prompt de test ya no es responsable de crear o reemplazar esa guía.

## Ejemplos de petición

Con el PDF adjunto y contexto suficiente para ubicarlo:

```text
Aplica prompts/prompt_generarTodoDesdePdf.md a este PDF.
```

Con destino explícito:

```text
Aplica prompts/prompt_generarTodoDesdePdf.md al PDF adjunto
y añádelo a los seminarios de Software y Estándares para la Web.
```

Por fases:

```text
Aplica prompts/prompt_generarUnidad.md al PDF adjunto.
```

```text
Aplica prompts/prompt_generarResumenYAspectosClave.md
a la unidad que acabamos de preparar.
```

```text
Aplica prompts/prompt_generarTest.md a esa unidad.
```

No hace falta rellenar el título, asignatura o identificadores si se pueden deducir del documento y del repositorio. Fuera del repositorio se prepara un paquete local; no se inventa una ubicación definitiva de publicación.

## Criterios comunes

- Teoría procedente del PDF y de los apuntes derivados; sin ampliaciones externas encubiertas.
- Revisión completa del texto y de las imágenes, con referencias a páginas reales.
- Extracción de figuras originales útiles, legibles, con descripción y procedencia. No se sustituyen por ilustraciones generadas.
- Distinción entre contenido original, aclaración didáctica, errata e incertidumbre.
- Archivos reales y enlaces comprobados; resumen y claves con funciones diferentes.
- Test con 50 preguntas por nivel, respuesta única, explicaciones y anclas exactas.
- Escrituras limitadas al alcance solicitado, teniendo en cuenta los efectos de los generadores existentes.

## Reorganización de los prompts anteriores

`generarUnidadesMD.md` y `2generarApuntesMd.md` se han consolidado en **Generar unidad**. `generarTest.md` se ha reorganizado en **Generar test**, trasladando la generación de `examen.md` al prompt de **Resumen y aspectos clave**. **Generar todo desde PDF** coordina la entrega completa y también puede usarse de forma independiente.

Las notas breves del antiguo archivo `todo` se conservan aquí como registro histórico; no son instrucciones para ejecutar al leer esta guía ni un estado actualizado de lo pendiente:

```text
chatgpt

Prepara ahora las unidades de 01-teoria  que no esten y si tengan pdf, que serian el 01,02,03


tengo que añadir los de semina
```
