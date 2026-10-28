---
asignatura: Software y Estándares para la Web
titulo: Adaptabilidad Web
resumen: Adaptabilidad de las páginas web.
fuente: 3-Adaptabilidad-Web.pdf
---

# Adaptabilidad Web: resumen

Lectura inicial: **diseño responsive adapta el mismo contenido al espacio disponible**. No basta con reducir una maqueta de escritorio: hay que conservar legibilidad, navegación y tareas en distintas pantallas.

## Recorrido y fechas

- **2005:** captura de la Web diseñada para escritorio.
- **2007:** iPhone; **2008:** Android; **2010:** iPad en la cronología del PDF.
- **29/07/2008:** recomendación W3C *Mobile Web Best Practices* citada.
- **Septiembre de 2020:** referencia W3C de tecnologías para móviles.
- **2025:** libro de Ben Frain citado en la bibliografía.

Son fechas de contexto y referencias docentes; las herramientas antiguas de las capturas no deben darse por disponibles hoy sin comprobarlas.

## Piezas del diseño adaptable

| Pieza | Qué aporta |
|---|---|
| Viewport | Ajusta el área de representación al dispositivo |
| Unidades relativas | Relación con fuente, contenedor o ventana |
| Imágenes fluidas | Evitar que desborden; conservar proporciones |
| `picture` | Seleccionar recursos según condiciones |
| Flexbox | Distribución a lo largo de un eje |
| Grid | Filas y columnas |
| Media queries | Aplicar estilos cuando se cumple una condición |
| Mobile first | Base móvil que se amplía para más espacio |

**Ejemplo didáctico** que reúne las técnicas del PDF:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

```css
img { max-width: 100%; height: auto; }
.contenido { display: grid; grid-template-columns: 1fr; }
@media (min-width: 768px) {
  .contenido { grid-template-columns: 2fr 1fr; }
}
```

En anchos pequeños hay una columna; desde 768 px, dos. Ese punto de ruptura **es una decisión del ejemplo**, no un estándar para todas las páginas. `max-width:100%` limita sin forzar a ampliar una imagen pequeña; `width:100%` sí ocupa todo el ancho.

## Contenido multimedia y navegación

- `picture/source/img`: selección de imágenes; orden y condiciones importan.
- `video/audio`, `source`, formatos y controles: incluir alternativas y comprobar reproducción.
- Evitar anchos rígidos que produzcan desplazamiento horizontal.
- Reorganizar navegación y elementos interactivos para espacio y entrada táctil.
- Revisar texto y tamaño de fuentes, orientación, peso de archivos y rendimiento.

## Cómo probar

**Pruebas del PDF:** usabilidad y adaptabilidad → distintos dispositivos físicos → distintos sistemas operativos → distintos navegadores. Comprobar además la carga de código e imágenes, teniendo en cuenta las limitaciones de ancho de banda. La emulación de tamaños ayuda a revisar; no sustituye toda comprobación con dispositivos.

Pruebas rápidas: ¿se lee sin ampliar?, ¿las imágenes caben?, ¿las acciones son fáciles de pulsar?, ¿el menú conserva las tareas?, ¿qué pasa al girar la pantalla o aumentar el texto? La adaptabilidad es parte de la calidad junto con usabilidad y accesibilidad.

[Contexto](3-Adaptabilidad-Web.pdf#page=7) · [Técnicas](3-Adaptabilidad-Web.pdf#page=15) · [Multimedia](3-Adaptabilidad-Web.pdf#page=24) · [Pruebas](3-Adaptabilidad-Web.pdf#page=50).

## Fuente y ampliación

Síntesis del [PDF original](3-Adaptabilidad-Web.pdf) y de los [apuntes completos](?u=software-estandares-web%2Fseminarios-adaptabilidad-web). Las fechas se reproducen según el material docente.
