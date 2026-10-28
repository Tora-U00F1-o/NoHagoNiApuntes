---
asignatura: Software y Estándares para la Web
titulo: CSS
resumen: Hojas de estilo en cascada.
fuente: 2 CSS.pdf
---

# CSS: resumen

Lectura inicial: **CSS selecciona elementos y les asigna declaraciones**. Si varias reglas compiten, cascada, especificidad, orden y herencia determinan los valores que acaba usando el navegador.

## Reglas y selectores

```css
/* Ejemplo didáctico */
p { color: black; }
.aviso { color: blue; }
main > p.aviso { color: orange; }
```

Para un `p.aviso` hijo directo de `main`, la tercera regla prevalece en estas condiciones de mismo origen/importancia. Una regla es **selector + bloque**; cada declaración es `propiedad: valor`.

| Selector | Qué selecciona |
|---|---|
| `p`, `*`, `.aviso`, `#principal` | Tipo, universal, clase, identificador |
| `[type="text"]` | Atributo/valor |
| `main p` / `main > p` | Descendiente / hijo directo |
| `h2 + p` / `h2 ~ p` | Hermano adyacente / hermanos siguientes |
| `:hover`, `:focus`, `:checked` | Estado o interacción |
| `:nth-child(...)` | Posición estructural |
| `::before`, `::first-line` | Pseudoelementos |
| `:is(...) / :where(...)` | Agrupar; mayor especificidad de la lista / cero |
| `:has(...)` | Relación con elementos que contiene o relaciona la selección |

CSS puede ser **en línea, interno o externo**; una hoja externa permite reutilización. `@import` importa hojas y `link` las asocia desde HTML.

## Resolver conflictos

1. Reunir declaraciones aplicables.
2. Comparar **origen e importancia** (`!important` no es especificidad).
3. Comparar especificidad: **ID, clases/atributos/pseudoclases, tipos/pseudoelementos**; como componentes, sin acarreos decimales.
4. En empate, gana la declaración posterior.
5. Sin valor aplicable, actuar según **herencia o valor inicial**.

Valores declarados → cascada → por defecto → calculado → utilizado → real. `inherit`, `initial` y `unset` intervienen explícitamente en la resolución.

## Cajas, unidades y reutilización

- Caja: **contenido + padding + borde + margen**. No sumar solo `width` al calcular tamaño exterior.
- Abreviaturas de cuatro lados: **arriba, derecha, abajo, izquierda**; con dos valores, vertical/horizontal.
- `px`, `pt`, `cm`…: unidades absolutas; `em`, `rem`, `%`, `vw/vh`…: referencias relativas según el caso.
- `var(--nombre)` usa una propiedad personalizada; ayuda a repetir valores coherentes.
- Tipografía, colores, fondos y bordes expresan presentación sin cambiar HTML.

## Fechas para ubicar los módulos

Según el PDF: **Selectors 3 Recommendation, 06/11/2018**; **Selectors 4 Working Draft, 22/01/2026**; **Values and Units 3 Candidate Recommendation, 01/12/2022**. No son fechas de un CSS global; el material advierte diferencias de compatibilidad.

**Evita:** abusar de `!important`/ID, confundir pseudoestado con pseudoelemento y suponer que todas las propiedades se heredan.

[Selectores](2%20CSS.pdf#page=27) · [Cascada](2%20CSS.pdf#page=63) · [Caja](2%20CSS.pdf#page=79) · [Unidades](2%20CSS.pdf#page=83).

## Fuente y ampliación

Síntesis del [PDF original](2%20CSS.pdf) y de los [apuntes completos](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css). Las fechas se reproducen según el material docente.
