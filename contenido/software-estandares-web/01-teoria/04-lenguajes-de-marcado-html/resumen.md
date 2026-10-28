---
asignatura: Software y Estándares para la Web
titulo: Lenguajes de Marcado - HTML
resumen: Lenguaje de marcado HTML5.
fuente: HTML5.pdf
---

# Lenguajes de Marcado - HTML: resumen

Lectura inicial: **HTML describe significado y estructura, no apariencia**. El navegador analiza las etiquetas y construye un DOM, un árbol en memoria con elementos, texto y otros nodos.

## Documento mínimo

**Ejemplo didáctico** con las piezas del PDF:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Biblioteca — Catálogo</title>
</head>
<body>
  <main>
    <h1>Biblioteca</h1>
    <p>Consulta el <a href="catalogo.html">catálogo</a>.</p>
  </main>
</body>
</html>
```

- `DOCTYPE`: activa modo estándar; HTML moderno no asocia una DTD externa.
- `head`: metadatos; `title`: identificación incluso fuera de contexto.
- `body`: contenido. `lang`: idioma. `charset`: codificación.
- El DOM incluye nodos de texto producidos por espacios y saltos de línea.

## Elegir por significado

| Grupo | Elementos y criterio |
|---|---|
| Regiones | `header`, `footer`, `main`, `nav`, `aside` |
| Organización | `article`: composición independiente; `section`: agrupación temática |
| Encabezados | `h1`…`h6`: jerarquía, no tamaño de letra |
| Agrupación | `p`, `ul/ol/li`, `dl/dt/dd`, `figure/figcaption` |
| Texto | `em`: énfasis; `strong`: importancia; `code/pre`: código/formato preservado |
| Enlaces | `a[href]`; `target`: contexto; `rel`: relación; `download`: descarga |
| Controles/regiones | `details/summary`, `dialog`, `search`, `menu` según su propósito |

`div` y `span` sirven cuando no hay un elemento más adecuado; no aportan por sí mismos el significado de los elementos anteriores. `header/footer` pueden pertenecer a una sección o artículo.

## Atributos y errores frecuentes

- **`id` único**; `class` admite varios tokens reutilizables. Nombres de clase que describan contenido.
- `data-*`: datos personalizados; `hidden`: oculta; `contenteditable`, `spellcheck`, `translate`: capacidades y tratamiento del contenido.
- `tabindex`: navegación por teclado; `accesskey`: atajo dependiente del agente de usuario.
- Atributos booleanos: la presencia los activa; escribir `disabled="false"` no es la forma de desactivarlos.
- Minúsculas y comillas dobles son las convenciones recomendadas por el profesor. Anidar sin solapamientos.
- `img` es vacío, sin `</img>`; el `/` final no crea un cierre de contenido en HTML.
- Validar: que el navegador muestre algo no asegura corrección.

## Contexto temporal

Aunque el archivo se llama **HTML5.pdf**, la fuente explica HTML como **Living Standard de WHATWG**, mantenido de forma continua. No aporta aquí una cronología de recomendaciones; «septiembre de 2026» es una fecha del ejemplo de artículo, no una versión de HTML.

[Características](HTML5.pdf#page=4) · [DOM](HTML5.pdf#page=18) · [Atributos globales](HTML5.pdf#page=161) · [Errores](HTML5.pdf#page=177).

## Fuente y ampliación

Síntesis del [PDF original](HTML5.pdf) y de los [apuntes completos](?u=software-estandares-web%2Fteoria-lenguajes-de-marcado-html). Las fechas se reproducen según el material docente.
