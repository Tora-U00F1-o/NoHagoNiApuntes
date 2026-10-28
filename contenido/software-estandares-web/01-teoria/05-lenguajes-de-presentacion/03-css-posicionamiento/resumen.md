---
asignatura: Software y Estándares para la Web
titulo: CSS - Posicionamiento
resumen: Posicionamiento de elementos con CSS.
fuente: 3 CSS-Posicionamiento.pdf
---

# CSS - Posicionamiento: resumen

Lectura inicial: **el layout distribuye cajas**. Empieza entendiendo el flujo normal y usa Flexbox o Grid para organizar grupos sin colocar cada elemento manualmente.

## Flujo y posiciones

| Mecanismo | Efecto que debes recordar |
|---|---|
| `display` | Tipo de caja y modelo de distribución |
| `static` | Flujo normal; desplazamientos no aplicables como a posicionados |
| `relative` | Se desplaza conservando su hueco original |
| `absolute` | Sale del flujo; depende del bloque de contención |
| `fixed` | Posición fija respecto a la referencia explicada en el PDF |
| `sticky` | Sigue flujo y se adhiere al alcanzar un umbral |
| `float / clear` | Flotar y controlar relación con flotantes |

Para `absolute`, identificar primero el **bloque de contención**. `top/right/bottom/left` no significan lo mismo en todos los esquemas. Usar posiciones manuales para toda la página complica cambios y adaptación.

## Flexbox: un eje principal

```css
/* Ejemplo didáctico */
nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
```

- `flex-direction`: define eje principal; el transversal depende de él.
- `justify-content`: distribuye en el principal.
- `align-items`: alinea en el transversal.
- `flex-wrap`: permite saltos de línea.
- `gap`: separación desde el contenedor; no añade por sí solo un margen exterior.

**No memorices «horizontal/vertical»** como equivalentes fijos de esos dos ejes.

## Grid: filas y columnas

```css
/* Patrón del PDF */
.tarjetas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}
```

| Herramienta | Utilidad |
|---|---|
| `fr` | Fracción del espacio disponible |
| `repeat` | Repetir pistas |
| `grid-column/grid-row` | Colocar entre líneas numeradas |
| Áreas con nombre | Describir zonas y asignar elementos |
| `minmax` | Límites mínimo/máximo |
| `auto-fill` | Conserva pistas vacías |
| `auto-fit` | Colapsa pistas vacías y redistribuye espacio |

**Combinación:** Grid para estructura de página, Flexbox dentro de menús o tarjetas.

## Adaptar y comprobar

**Mobile first:** estilos iniciales para móvil y ampliaciones con `@media (min-width:...)`. Los ejemplos de 600/768/1024 px ilustran decisiones; no son límites universales.

Prueba poco y mucho contenido, anchos pequeños y grandes y casos con columnas sobrantes. Comprueba diferencias entre `gap` y `margin` y entre pistas y elementos.

El PDF no desarrolla una cronología de Flexbox/Grid; lo evaluable aquí son sus modelos y propiedades, no años de publicación añadidos de otra fuente.

[Posiciones](3%20CSS-Posicionamiento.pdf#page=10) · [Flexbox](3%20CSS-Posicionamiento.pdf#page=27) · [Grid](3%20CSS-Posicionamiento.pdf#page=41) · [Minmax](3%20CSS-Posicionamiento.pdf#page=51) · [Media queries](3%20CSS-Posicionamiento.pdf#page=61).

## Fuente y ampliación

Síntesis del [PDF original](3%20CSS-Posicionamiento.pdf) y de los [apuntes completos](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-css-posicionamiento). Las fechas se reproducen según el material docente.
