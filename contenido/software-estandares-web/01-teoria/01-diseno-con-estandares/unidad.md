---
asignatura: Software y Estándares para la Web
titulo: Diseño con estándares
resumen: Por qué diseñar la web con estándares abiertos.
fuente: Diseño-estandares.pdf
---

# Diseño con estándares

## Contenido

1. [Introducción](#introduccion)
2. [Origen de la Web](#origen-de-la-web)
3. [Cliente, navegador y servidor](#cliente-navegador-y-servidor)
4. [Desarrollo y diseño web](#desarrollo-y-diseno-web)
5. [El W3C y los organismos de estandarización](#el-w3c-y-los-organismos-de-estandarizacion)
6. [Por qué utilizar estándares](#por-que-utilizar-estandares)
7. [Estructura, presentación y comportamiento](#estructura-presentacion-y-comportamiento)
8. [Usabilidad, adaptabilidad y accesibilidad](#usabilidad-adaptabilidad-y-accesibilidad)
9. [Preguntas de repaso](#preguntas-de-repaso)
10. [Resumen final](#resumen-final)
11. [Referencias y cobertura](#referencias-y-cobertura)

## Introducción

Diseñar con estándares significa construir un sitio a partir de tecnologías descritas por **especificaciones abiertas**, compartidas por los agentes que producen y consumen la Web. El documento relaciona esta decisión con la compatibilidad entre dispositivos y a lo largo del tiempo, la facilidad de uso y la posibilidad de acceder al contenido con capacidades diferentes.

La unidad presenta primero la arquitectura de la Web; después explica quién define sus tecnologías y por qué conviene separar **estructura, presentación y comportamiento**. Al terminar se deben distinguir cliente y servidor, identificar la función de HTML, CSS y ECMAScript y explicar por qué un sitio necesita usabilidad, adaptabilidad y accesibilidad conjuntamente.

## Origen de la Web

Internet y la Web no nacieron a la vez. Según la diapositiva 4, **Internet comenzó a desarrollarse en los años sesenta**, mientras que **Tim Berners-Lee inventó la Web en 1989 en el CERN**, el laboratorio europeo de física de partículas. El documento recuerda también el Premio Príncipe de Asturias de Investigación Científica y Técnica de **2002**.

Berners-Lee creó las versiones iniciales de cuatro componentes esenciales:

| Componente | Función dentro del conjunto |
|---|---|
| HTML | Expresar documentos de hipertexto |
| HTTP | Comunicar las peticiones y respuestas |
| Servidor web | Atender las peticiones |
| Navegador | Actuar como agente de usuario |

La ilustración histórica de la página 5 relaciona la propuesta documental, la interconexión de información y el equipo utilizado por Berners-Lee. Su función es situar el origen de la Web; no describe una arquitectura distinta de la presentada a continuación.

[Ver diapositiva 4](Dise%C3%B1o-estandares.pdf#page=4).

## Cliente, navegador y servidor

### Cliente y agente de usuario

Un **cliente web** es un dispositivo conectado a Internet que dispone de un navegador o **agente de usuario** capaz de efectuar peticiones HTTP/HTTPS y mostrar los documentos HTML recibidos. El concepto no se limita al ordenador: el PDF incluye móviles, televisores, electrodomésticos y automóviles.

Las figuras de las páginas 7 y 10 muestran varios clientes conectados mediante Internet a un servidor. El sentido de las flechas distingue dos operaciones: la **petición** viaja hacia el servidor y la **respuesta** regresa al cliente.

::: proceso
Cliente web → Petición HTTP/HTTPS → Servidor web → Respuesta al cliente
:::

### Componentes del navegador

El esquema de las páginas 9 y 12 identifica la **interfaz de usuario (IU)**, el **analizador**, el **árbol DOM**, el **motor de visualización** y el **intérprete ECMAScript**. El analizador obtiene una representación del documento; el árbol conserva su estructura; el motor de visualización participa en su presentación; el intérprete procesa el comportamiento programado en ECMAScript. La figura 12 inserta este conjunto en el intercambio de peticiones y respuestas con el usuario.

**Explicación didáctica:** recibir el documento y mostrarlo son pasos relacionados, pero distintos: el navegador necesita interpretar su estructura para producir la vista con la que interactúa el usuario.

### Servidor y capas

El **servidor web** procesa la aplicación del lado del servidor y genera la respuesta destinada al cliente. El documento distingue conexiones **unidireccionales o bidireccionales** y comunicaciones **síncronas o asíncronas**, sin desarrollar sus protocolos concretos.

La figura de la página 14 divide el trabajo del servidor en **vista**, **negocio** y **datos**. La vista participa en la comunicación; la capa de negocio procesa las operaciones y se relaciona con la capa de datos. Las flechas de ida y vuelta muestran la colaboración entre capas para producir la respuesta.

[Ver cliente y navegador](Dise%C3%B1o-estandares.pdf#page=11) · [Ver arquitectura del servidor](Dise%C3%B1o-estandares.pdf#page=14).

## Desarrollo y diseño web

El PDF distingue el **desarrollo web**, centrado en implementar funcionalidades y características, del **diseño web**, que determina colores, disposición, tipografía, estética y experiencia de uso. Ambas actividades se necesitan para obtener un sitio funcional y comprensible.

| Ámbito | Ubicación de las tecnologías | Ejemplos del PDF |
|---|---|---|
| Frontend | Cliente | HTML, CSS, XML y JavaScript |
| Backend | Servidor | PHP |
| Full-Stack | Cliente y servidor | Engloba ambos ámbitos |

La página 17 denomina «los ocho estándares de diseño web» a estos criterios de diseño:

1. **Simplicidad:** evitar complejidad innecesaria.
2. **Jerarquía identificable visualmente:** permitir reconocer la importancia relativa del contenido.
3. **Navegabilidad:** facilitar los recorridos por el sitio.
4. **Consistencia:** mantener criterios de diseño coherentes.
5. **Capacidad de respuesta.**
6. **Accesibilidad.**
7. **Convencionalidad:** apoyarse en convenciones reconocibles.
8. **Credibilidad.**

**Explicación didáctica:** esta lista reúne criterios de calidad del diseño; debe distinguirse de las especificaciones técnicas de HTML o CSS que se estudian después. El PDF enumera los ocho criterios, pero no proporciona una norma formal para cada uno.

Las tendencias que cita son el **diseño simple**, el **diseño responsive** —un desarrollo para múltiples dispositivos—, las aplicaciones gráficas y el uso de frameworks. Se recogen como tendencias mencionadas en el material, sin actualizar su vigencia con fuentes externas.

[Ver diapositivas 15–18](Dise%C3%B1o-estandares.pdf#page=15).

## El W3C y los organismos de estandarización

El **World Wide Web Consortium (W3C)** fue fundado por Tim Berners-Lee en **1994**. Su misión, tal como la presenta el documento, es llevar la Web a su máximo potencial mediante estándares y directrices abiertos que permitan su crecimiento.

Las páginas 21–25 desarrollan cinco objetivos:

| Objetivo | Desarrollo |
|---|---|
| Estándares web | Definir y mantener tecnologías abiertas para favorecer interoperabilidad y continuidad |
| Accesibilidad | Proporcionar pautas WCAG para crear contenido accesible a personas con capacidades diferentes |
| Validación | Ofrecer servicios de validación de marcado y de CSS |
| Educación y divulgación | Publicar recursos y promover conferencias, talleres e intercambio de conocimientos |
| Internacionalización | Facilitar traducción y localización para idiomas y culturas diferentes |

El W3C no es el único organismo citado. **WHATWG** se relaciona con HTML5; **ECMA**, con ECMAScript; y **Khronos**, con gráficos 3D y WebGL. Una especificación es el documento técnico que establece cómo utilizar una tecnología: actúa como referencia compartida para sus implementaciones.

[Ver fundación del W3C](Dise%C3%B1o-estandares.pdf#page=20) · [Ver organismos](Dise%C3%B1o-estandares.pdf#page=27).

## Por qué utilizar estándares

### Apertura y compatibilidad

El material parte de una Web abierta tanto al uso como a la contribución. Es posible escribir código para crear un sitio y participar en la elaboración de especificaciones. Esta apertura busca evitar que el acceso a la tecnología dependa de patentes o licencias restrictivas.

La compatibilidad temporal se expresa mediante **«no rompas la Web»**: las tecnologías nuevas deben mantener la compatibilidad con versiones anteriores. Así se relaciona la evolución de las herramientas con la conservación del contenido existente.

### Beneficios que recoge el documento

Las páginas 30–33 relacionan los estándares con una mayor **accesibilidad y usabilidad**, con prácticas de **seguridad** —HTTPS, protección de datos y prevención de secuencias de comandos entre sitios— y con la **optimización para buscadores (SEO)**. El HTML comprensible ayuda a interpretar el contenido del sitio.

::: aviso Alcance de estas ventajas
El PDF presenta estos aspectos como beneficios de aplicar correctamente estándares y pautas. Su enumeración no describe una comprobación automática de que cualquier página válida sea segura, accesible o tenga una posición determinada en un buscador. En esta unidad no se desarrolla un procedimiento de auditoría para esas propiedades.
:::

[Ver apertura y compatibilidad](Dise%C3%B1o-estandares.pdf#page=28) · [Ver beneficios](Dise%C3%B1o-estandares.pdf#page=30).

## Estructura, presentación y comportamiento

Los diagramas de las páginas 35–46 muestran tres componentes que convergen en el sitio web. Cada fase destaca uno para explicar su responsabilidad.

### Estructura: HTML y XML

La estructura especifica **información, datos y organización**: títulos, subtítulos, párrafos, listas, tablas y otras estructuras. Para ello se utilizan lenguajes de marcado, como HTML y XML. El PDF relaciona una estructura correcta con la portabilidad y con la comprensión del contenido por los buscadores.

Las recomendaciones son usar **etiquetas semánticas**, sangría y espacios que hagan legible el código, comentarios explicativos y marcado válido. La estructura debe expresar qué es cada parte del contenido.

### Presentación: CSS

La presentación controla **tipografía, colores y disposición**. CSS permite cambiarla sin alterar la estructura. La figura de la página 42 representa un mismo contenido HTML asociado a distintas presentaciones y dispositivos.

El PDF explica que **CSS Level 3** se construye de forma modular sobre CSS 2.1. Los módulos añaden funcionalidad o refinan definiciones sin contradecir ese núcleo. Los módulos nuevos comienzan en nivel 1; los que actualizan CSS 2.1 parten de nivel 3 y pueden alcanzar nivel 4 o superior. Por eso «CSS3» no debe entenderse aquí como un único documento monolítico.

El W3C proporciona un validador de hojas de estilo. El documento destaca también la aplicación correcta de la **especificidad de los selectores**, cuyo mecanismo se desarrolla en la unidad de CSS.

### Comportamiento

El comportamiento proporciona funcionalidades y efectos que deben funcionar en diferentes navegadores y plataformas. El material distingue la computación en el cliente mediante **ECMAScript** y en el servidor mediante **PHP**.

| Componente | Pregunta que responde | Tecnología citada |
|---|---|---|
| Estructura | ¿Qué información contiene y cómo se organiza? | HTML, XML |
| Presentación | ¿Qué apariencia y disposición tiene? | CSS |
| Comportamiento | ¿Qué operaciones o efectos realiza? | ECMAScript, PHP |

**Ejemplo didáctico:** el fragmento HTML expresa un título y un párrafo; la regla CSS modifica el aspecto de los párrafos sin cambiar su contenido.

```html title="estructura.html" origen="Ejemplo didáctico"
<h1>Diseño con estándares</h1>
<p>La estructura contiene la información.</p>
```

```css title="presentacion.css" origen="Ejemplo didáctico"
p { color: blue; }
```

La separación de los dos fragmentos ilustra las responsabilidades. El ejemplo no incorpora funcionalidad programada ni se presenta como código original del PDF.

[Ver estructura](Dise%C3%B1o-estandares.pdf#page=37) · [Ver presentación](Dise%C3%B1o-estandares.pdf#page=41) · [Ver modularidad](Dise%C3%B1o-estandares.pdf#page=43) · [Ver comportamiento](Dise%C3%B1o-estandares.pdf#page=46).

## Usabilidad, adaptabilidad y accesibilidad

La **usabilidad** se sintetiza en «fácil de aprender + fácil de utilizar». No depende únicamente de colores y tipografías: incluye el diseño de los diálogos, la relación cognitiva entre usuario y sistema, la calidad de la documentación y el uso de metáforas.

La **adaptabilidad** o diseño responsive busca que el sitio se ajuste automáticamente a diferentes resoluciones y pantallas: ordenador, tableta o teléfono. La figura de la página 49 representa una estructura que se redistribuye en varios dispositivos.

La **accesibilidad** responde a las diferencias entre las personas. El objetivo es evitar barreras innecesarias impuestas al diseñar para un grupo demasiado limitado. Un sitio debe poder ser usado por todas las personas, con independencia de sus capacidades.

La **Web Accessibility Initiative (WAI)** es la iniciativa de accesibilidad del W3C. Sus áreas de trabajo citadas son asegurar que las tecnologías permiten accesibilidad, difundir y educar sobre ella y coordinar investigación y desarrollo.

**Explicación didáctica:** las tres nociones contestan preguntas diferentes: aprender y manejar el sistema, adaptar su disposición a la pantalla y permitir el acceso de personas diversas. El documento las presenta como objetivos complementarios.

[Ver diapositivas 48–51](Dise%C3%B1o-estandares.pdf#page=48).

## Preguntas de repaso

::: pregunta ¿Qué diferencia hay entre Internet y la Web en la cronología del PDF?
Internet comienza a desarrollarse en los años sesenta; la Web se sitúa en 1989, con Tim Berners-Lee en el CERN. El documento identifica HTML, HTTP, servidor y navegador como componentes iniciales.
:::

::: pregunta ¿Qué papel cumplen el analizador, el DOM y el motor de visualización?
El esquema del navegador relaciona el análisis del documento, la conservación de su estructura en el árbol DOM y su presentación mediante el motor de visualización. El intérprete ECMAScript participa en el comportamiento del cliente.
:::

::: pregunta ¿Por qué separar estructura y presentación?
Porque el contenido y su organización pueden conservarse mientras cambia la tipografía, el color o la disposición mediante CSS. El PDF relaciona esta separación con portabilidad y adaptación a dispositivos.
:::

1. Explica los cinco objetivos del W3C y relaciona uno con sus validadores.
2. Distingue frontend, backend y Full-Stack con las tecnologías citadas.
3. Explica qué significa «no rompas la Web».
4. Identifica las ocho pautas de diseño de la página 17.
5. Compara usabilidad, adaptabilidad y accesibilidad con una situación de uso.
6. Explica por qué los módulos de CSS pueden tener niveles diferentes.

## Resumen final

La Web se apoya en clientes y servidores que intercambian peticiones y respuestas. Las especificaciones abiertas proporcionan una referencia común para desarrollar tecnologías compatibles. HTML/XML expresan estructura, CSS controla presentación y ECMAScript/PHP aportan comportamiento en sus respectivos ámbitos. La calidad del sitio exige considerar conjuntamente compatibilidad, usabilidad, adaptabilidad, accesibilidad y las restantes ventajas recogidas por el documento.

## Referencias y cobertura

- [Documento original: Diseño-estandares.pdf](Dise%C3%B1o-estandares.pdf). **55 páginas analizadas**, incluidas figuras, arquitectura cliente-servidor, componentes del navegador y diagramas de las tres responsabilidades. Se han agrupado los índices repetidos.
- Apartados cubiertos: historia (4–5), conceptos y arquitectura (7–18), W3C (20–25), estándares (27–33), componentes (35–46), usabilidad/adaptabilidad/accesibilidad (48–51), conclusión (53) y referencias (55).
- No hay bloques de código originales que reproducir; los dos fragmentos anteriores se identifican como didácticos. Las figuras se describen junto a sus conceptos.
- Referencias citadas por el PDF, sin utilizarlas para ampliar la teoría: [W3C](https://www.w3.org/), [HTML](https://html.spec.whatwg.org/multipage/), [CSS](https://www.w3.org/Style/CSS/), [ECMAScript](https://ecma-international.org/publications-and-standards/standards/ecma-262/), [PHP](https://www.php.net/), [WAI](https://www.w3.org/WAI/) e [historia de la Web](https://webfoundation.org/about/vision/history-of-the-web/).
