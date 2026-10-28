---
asignatura: Software y Estándares para la Web
titulo: Usabilidad Web - Parte 2
resumen: Usabilidad web (segunda parte).
fuente: 2-Usabilidad-Web-parte2.pdf
---

# Usabilidad Web - Parte 2: resumen

Lectura inicial: **la navegación permite encontrar cosas y saber dónde estamos**. En la Web faltan muchas referencias físicas: una persona puede entrar directamente en una página interior.

## Señales de orientación

| Elemento | Función |
|---|---|
| Identidad/logo | Identificar el sitio y ofrecer un camino al inicio |
| Navegación principal | Mostrar las grandes secciones |
| Navegación local | Exponer lo que depende de una sección |
| Título de página | Confirmar el destino y su contenido |
| Indicador de posición | Distinguir la sección actual |
| Migas de pan | Mostrar la jerarquía y permitir subir |
| Búsqueda | Alternativa a recorrer categorías |
| Utilidades | Acciones secundarias, generalmente 4–5 destacadas |

La navegación persistente mantiene referencias entre páginas. El PDF trata las pestañas como una metáfora visual: separación, aspecto de pestaña y selección clara ayudan a reconocerlas.

## Seis preguntas al llegar

1. ¿Qué sitio es?
2. ¿En qué página estoy?
3. ¿Cuáles son las secciones principales?
4. ¿Qué opciones hay en este nivel?
5. ¿Dónde estoy dentro del sitio?
6. ¿Cómo busco?

Si la respuesta depende de haber entrado por la portada, falta orientación local. La prueba propuesta consiste en examinar una página y localizar estas señales sin reconstruir todo el recorrido.

## Inicio: explicar y orientar

La portada debe responder **qué es, qué puedo hacer, qué contiene y por qué elegirlo**. También sitúa información, presenta novedades o contenido destacado y muestra caminos para empezar.

- **Tagline:** frase breve que explica el sitio, aproximadamente **6–8 palabras** en la recomendación recogida.
- **Eslogan:** puede sugerir un valor sin explicar qué ofrece; no sustituye necesariamente al tagline.
- Bienvenida o explicación: suficiente para entender el propósito, sin llenar la pantalla de texto.
- Promociones internas, registro y novedades compiten por espacio; no deben ocultar la tarea principal.
- Un desplegable ahorra espacio, pero oculta opciones: valorar reconocimiento y exploración.

## Microejemplo y comprobación

**Ejemplo didáctico de migas:**

```html
<nav>
  <a href="index.html">Inicio</a> &gt;
  <a href="estudios.html">Estudios</a> &gt;
  <span>Grado en Informática</span>
</nav>
<h1>Grado en Informática</h1>
```

Ilustra ruta y título coherentes. No reemplaza el resto de señales ni una prueba con usuarios.

**Referencia temporal:** Krug, **2014**. El PDF menciona **30–40 %** de clics en «Atrás» como dato de su exposición, sin una fecha/metodología que permita tratarlo como estadística actual.

**Para repasar:** diferencia jerarquía e historial; encuentra la página actual sin usar la portada; distingue título, identidad y tagline; revisa si las promociones desplazan las acciones principales.

[Navegación](2-Usabilidad-Web-parte2.pdf#page=11) · [Migas](2-Usabilidad-Web-parte2.pdf#page=26) · [Seis preguntas](2-Usabilidad-Web-parte2.pdf#page=30) · [Portada](2-Usabilidad-Web-parte2.pdf#page=34).

## Fuente y ampliación

Síntesis del [PDF original](2-Usabilidad-Web-parte2.pdf) y de los [apuntes completos](?u=software-estandares-web%2Fseminarios-usabilidad-web-parte2). Las fechas se reproducen según el material docente.
