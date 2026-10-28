---
asignatura: Software y Estándares para la Web
titulo: Diseño con estándares
resumen: Por qué diseñar la web con estándares abiertos.
fuente: Diseño-estandares.pdf
---

# Diseño con estándares: resumen

Lectura inicial: **la Web funciona con tecnologías compartidas que separan estructura, presentación y comportamiento**. Diseñar con estándares facilita compatibilidad, mantenimiento y acceso desde personas y dispositivos diferentes.

## Mapa esencial

| Concepto | Qué debes recordar |
|---|---|
| Cliente web | Dispositivo con agente de usuario que pide recursos HTTP/HTTPS |
| Navegador | Interfaz, analizador, DOM, motor de visualización e intérprete ECMAScript |
| Servidor | Procesa la petición y produce una respuesta; esquema vista/negocio/datos |
| Frontend / backend | Tecnologías de cliente / servidor; Full-Stack engloba ambos |
| Especificación | Documento técnico compartido para utilizar una tecnología |

**Recorrido:** cliente → petición → servidor → respuesta → interpretación en el navegador.

## Tres responsabilidades

- **HTML/XML:** contenido y estructura: títulos, párrafos, listas, tablas y datos.
- **CSS:** presentación: colores, tipografía y distribución.
- **ECMAScript/PHP:** comportamiento en cliente/servidor en los ejemplos del PDF.

**Ejemplo didáctico:** la regla cambia el aspecto sin modificar el texto.

```html
<h1>Estándares web</h1>
<p>Contenido de la página.</p>
```

```css
p { color: blue; }
```

## Fechas y organismos

- **Años 60:** inicio del desarrollo de Internet.
- **1989:** Tim Berners-Lee crea la Web en el CERN; HTML, HTTP, navegador y servidor son sus componentes iniciales.
- **1994:** Berners-Lee funda el **W3C**.
- **2002:** Premio Príncipe de Asturias mencionado en el PDF.
- **W3C:** estándares, accesibilidad/WCAG, validadores, educación e internacionalización.
- **WHATWG:** HTML; **ECMA:** ECMAScript; **Khronos:** gráficos 3D/WebGL.

## Calidad del sitio

| Criterio | Pregunta rápida |
|---|---|
| Usabilidad | ¿Es fácil de aprender y utilizar? |
| Adaptabilidad | ¿Ajusta su distribución a varias pantallas? |
| Accesibilidad | ¿Evita barreras para personas con capacidades diversas? |

La **WAI** es la iniciativa de accesibilidad del W3C. Los ocho criterios de diseño citados son simplicidad, jerarquía visual, navegabilidad, consistencia, respuesta, accesibilidad, convencionalidad y credibilidad.

**Para recordar:** apertura y compatibilidad temporal («no rompas la Web»). CSS evoluciona por módulos con niveles propios. El PDF vincula estándares a seguridad y SEO, pero no aporta una auditoría automática de esas propiedades.

[Arquitectura](Dise%C3%B1o-estandares.pdf#page=9) · [W3C](Dise%C3%B1o-estandares.pdf#page=20) · [Separación](Dise%C3%B1o-estandares.pdf#page=35) · [Calidad](Dise%C3%B1o-estandares.pdf#page=48).

## Fuente y ampliación

Síntesis del [PDF original](Dise%C3%B1o-estandares.pdf) y de los [apuntes completos](?u=software-estandares-web%2Fteoria-diseno-con-estandares). Las fechas se reproducen según el material docente.
