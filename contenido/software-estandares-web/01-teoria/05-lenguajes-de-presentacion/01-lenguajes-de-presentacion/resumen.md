---
asignatura: Software y Estándares para la Web
titulo: Lenguajes de presentación
resumen: Introducción a los lenguajes de presentación.
fuente: 1 Lenguajes de presentación.pdf
---

# Lenguajes de presentación: resumen

Lectura inicial: **HTML expresa el contenido; CSS decide cómo se presenta**. Mantener ambas responsabilidades separadas permite cambiar la apariencia sin reescribir la información.

## Contenido y presentación

| HTML: qué se comunica | CSS: cómo se muestra |
|---|---|
| Títulos, párrafos, listas, tablas, imágenes | Color, tipografía, márgenes y distribución |
| Estructura y significado | Apariencia y adaptación visual |

**Ejemplo didáctico:**

```html
<h1>Universidad de Oviedo</h1>
<p>Oferta académica</p>
```

```css
h1 { color: blue; }
p { margin: 1em; }
```

Las reglas se muestran aparte para subrayar la separación; los mecanismos de asociación se estudian en la unidad CSS.

## Por qué separar

- **Mantenimiento:** modificar estilo sin cambiar contenido.
- **Reutilización:** una hoja para varias páginas; menos duplicación.
- **Accesibilidad:** adaptación a usuarios y tecnologías de apoyo.
- **Dispositivos:** una información puede presentarse en pantallas diferentes.
- **Compatibilidad e independencia:** navegador, plataforma y agente no deberían determinar el contenido.

Las capturas históricas de UniOvi y de la escuela muestran cambios visuales y organizativos: no son ejemplos que deban copiarse como diseño actual.

## Cronología CSS

| Fecha del PDF | Hito |
|---|---|
| **17/12/1996** | CSS Level 1 Recommendation: color, tipografía, márgenes |
| **12/05/1998** | CSS Level 2 Recommendation: posicionamiento y medios |
| **07/06/2011** | CSS 2.1 Recommendation |
| **12/04/2016** | CSS 2.2 Working Draft citado |

**CSS3 cambia la organización:** utiliza CSS 2.1 como núcleo y evoluciona mediante módulos. Los nuevos empiezan en nivel 1; las actualizaciones de funciones anteriores, en nivel 3. Cada módulo puede llegar a 4 o más.

**No hay un CSS4 global** equivalente a CSS1/CSS2: `CSS-COLOR-4` y `SELECTORS-4` son niveles de módulos. El estado de las especificaciones anterior es el recogido por las diapositivas.

## Ocho principios de diseño

Separación de contenido/presentación · compatibilidad entre navegadores · independencia de dispositivo/plataforma/agente · mantenimiento · flexibilidad y reutilización · accesibilidad · simplicidad · evolución modular continua.

**Comprueba que puedes explicar:** qué se conserva al rediseñar un sitio, por qué una hoja compartida reduce trabajo y por qué «nivel 4» de un módulo no equivale a una nueva versión global de CSS.

[Separación](1%20Lenguajes%20de%20presentaci%C3%B3n.pdf#page=3) · [Evolución](1%20Lenguajes%20de%20presentaci%C3%B3n.pdf#page=10) · [Principios](1%20Lenguajes%20de%20presentaci%C3%B3n.pdf#page=16).

## Fuente y ampliación

Síntesis del [PDF original](1%20Lenguajes%20de%20presentaci%C3%B3n.pdf) y de los [apuntes completos](?u=software-estandares-web%2Fteoria-lenguajes-de-presentacion-lenguajes-de-presentacion). Las fechas se reproducen según el material docente.
