# Guía y Formato de Cuestionarios en CSV

Este documento detalla la estructura de los cuestionarios `.csv`. Guárdalos en `contenido/<asignatura>/<ruta-unidad>/test/`; `contenido/cuestionarios/` queda para ejemplos o cuestionarios generales. El catálogo descubre ambas ubicaciones al compilar.

## Organización por unidad

Utiliza `test/facil.csv`, `test/medio.csv` y `test/dificil.csv`. Incluye `# dificultad: facil`, `medio` o `dificil` para ordenar y filtrar niveles. `# unidad: <id-unidad>` documenta su procedencia; la asociación del catálogo se deduce de la carpeta, sin depender de títulos o tildes.

El identificador de un test de unidad es `<asignatura>--<id-unidad>--<archivo-sin-extension>`. Se abre mediante `?cuestionario=<identificador>`. Los archivos opcionales de `test/anteriores/` conservan como identificador su nombre sin extensión. No repitas esos nombres históricos entre unidades.

El documento `examen.md`, junto a `unidad.md`, añade el botón **Claves de examen**. Puede enlazar test mediante su identificador y apuntes mediante `?u=asignatura%2Funidad#apartado`.

El sistema parsea dinámicamente cada archivo, permitiendo que:
1. **Cada pregunta tenga un número variable de respuestas posibles** (por ejemplo, 5 respuestas en la pregunta 1, 3 en la pregunta 2, 2 en preguntas tipo Verdadero/Falso, etc.).
2. **Cada pregunta pueda tener opcionalmente una referencia a los apuntes de la asignatura**, permitiendo al usuario abrir un popup de consulta rápida **sin perder el progreso, las respuestas marcadas ni el temporizador**.
3. **Soporte de alta precisión para referencias**: se puede enlazar tanto al bloque general (`##`) como a la **diapositiva o subapartado concreto (`###`)**, desplazando automáticamente la vista y destacando la ficha de estudio correspondiente.

---

## 1. Delimitadores y Codificación

- **Codificación:** UTF-8 (con o sin BOM).
- **Delimitadores admitidos:** Coma (`,`) o Punto y coma (`;`) — el sistema detecta el delimitador automáticamente analizando el archivo.
- **Campos con comas o saltos de línea:** Entrecomillados entre comillas dobles (`"..."`) según el estándar RFC 4180. Si dentro de un texto necesitas incluir comillas dobles, duplícalas (`""`).

---

## 2. Metadatos Opcionales (Comentarios `#`)

Al inicio del archivo puedes incluir metadatos opcionales antecedidos por `#`:

```csv
# titulo: Software y Estándares Web - HTML5 y Semántica Web
# asignatura: Software y Estándares para la Web
# descripcion: Cuestionario de autoevaluación con número dinámico de opciones y referencias precisas
# tiempo: 20
```

- `# titulo`: Título legible del cuestionario.
- `# asignatura`: Nombre de la asignatura asociada.
- `# descripcion`: Breve resumen explicativo del objetivo del test.
- `# tiempo`: Minutos estimados recomendados (para el temporizador en modo examen).

---

## 3. Cabecera y Columnas

La fila de cabecera estándar define las columnas:

```csv
pregunta,correcta,explicacion,referencia,opcion_1,opcion_2,opcion_3,opcion_4,opcion_5
```

### Significado de cada campo:

| Columna | Obligatorio | Descripción |
|---|:---:|---|
| **`pregunta`** | Sí | El enunciado de la pregunta. Admite texto plano o fragmentos de código. |
| **`correcta`** | Sí | Indicador de la respuesta válida: <br>• Número de índice: `1`, `2`, `3`... <br>• Letra: `A`, `B`, `C`, `D`... <br>• Respuestas múltiples: `1,3` o `A,C` <br>• Texto exacto de la opción correcta. |
| **`explicacion`** | Opcional | Retroalimentación didáctica mostrada tras responder (en modo estudio) o al finalizar el examen. Si no se desea, se deja vacía `""`. |
| **`referencia`** | **Opcional** | Enlace a una unidad de los apuntes para más información. Abre un popup de consulta rápida **sin perder el avance ni las respuestas del cuestionario**. Admite dos niveles de precisión (ver Sección 4). Si no tiene referencia, se deja vacía `""`. |
| **`opcion_1`, `opcion_2`, ..., `opcion_N`** | Sí (min. 2) | Columnas con las opciones de respuesta (número dinámico por fila). |

---

## 4. Niveles de Precisión en las Referencias (`referencia`)

El campo `referencia` conecta la pregunta con la documentación de clase. Soporta dos niveles de precisión:

### Nivel 1: Sección Principal (`##`)
Enlaza al bloque temático general:
- `software-estandares-web/teoria-lenguajes-de-marcado-html#caracteristicas-y-estructura-basica`
- `software-estandares-web/teoria-lenguajes-de-marcado-html#dom-document-object-model`
- `software-estandares-web/teoria-lenguajes-de-marcado-html#elementos-semanticos-de-estructura-y-elementos-genericos`

### Nivel 2: Diapositiva o Subapartado Concreto (`###`) — *Máxima Precisión*
Enlaza exactamente a la diapositiva o subtema evaluado. El visor hace scroll suave directamente hasta esa diapositiva, la enmarca en una caja destacada (*badge* `"Diapositiva o subapartado clave"`) y subraya los conceptos relevantes de la pregunta.

#### Reglas de transformación de títulos Markdown a slugs:
1. Se pasa el texto a minúsculas.
2. Se eliminan tildes y diacríticos (á $\to$ a, é $\to$ e, etc.).
3. Se reemplazan caracteres no alfanuméricos por un guión (`-`).
4. Se eliminan guiones al inicio o al final.

#### Tabla de correspondencias de ejemplo en `Lenguajes de Marcado - HTML`:

| Concepto evaluado | Encabezado en `unidad.md` | Ancla (`#seccion`) |
|---|---|---|
| **DOCTYPE y estándares** | `### 12. Especificación del tipo de documento` | `#12-especificacion-del-tipo-de-documento` |
| **Elemento `<title>`** | `### 29. <title> Titulo o nombre de la página OBLIGATORIA` | `#29-title-titulo-o-nombre-de-la-pagina-obligatoria` |
| **Elemento `<article>`** | `### 38. Elemento article` | `#38-elemento-article` |
| **Elemento `<section>`** | `### 39. Elemento section` | `#39-elemento-section` |
| **`article` vs `section`** | `### 40. Cuando usar article y cuando section` | `#40-cuando-usar-article-y-cuando-section` |
| **Elemento `<aside>`** | `### 45. Elemento aside` | `#45-elemento-aside` |
| **Elemento `<main>`** | `### 57. Elemento main` | `#57-elemento-main` |
| **Elemento `<div>`** | `### 60. Elemento div` | `#60-elemento-div` |
| **Elemento `<picture>`** | `### 132. El elemento <picture> permite proporcionar varias Ingeniería` | `#132-el-elemento-picture-permite-proporcionar-varias-ingenieria` |
| **Subtítulos con `<track>`** | `### 139. Los elementos <track> permite asociar información Ingeniería` | `#139-los-elementos-track-permite-asociar-informacion-ingenieria` |
| **Tablas accesibles con `scope`** | `### 145. Para que una tabla sea accesible:` | `#145-para-que-una-tabla-sea-accesible` |
| **Atributo `accesskey`** | `### 162. Permite a los agentes de usuario crear atajos de Ingeniería` | `#162-permite-a-los-agentes-de-usuario-crear-atajos-de-ingenieria` |
| **Atributo `tabindex`** | `### 170. Permite controlar el orden de navegación mediante teclado` | `#170-permite-controlar-el-orden-de-navegacion-mediante-teclado` |

> [!TIP]
> **Compatibilidad flexible**: También puedes usar simplemente el número de diapositiva o un prefijo (por ejemplo `#40` o `#40-cuando-usar-article`), ya que el motor de búsqueda interno busca coincidencias por ID exacto, prefijo numérico y texto del encabezado.

---

## 5. Opciones Variables por Pregunta (Lectura Dinámica)

No es necesario que todas las preguntas tengan la misma cantidad de respuestas. El parser analiza cada fila de forma individual:
- Si una pregunta tiene **5 opciones**, se completan hasta `opcion_5`.
- Si la siguiente tiene **4 opciones**, se completan hasta `opcion_4`.
- Si tiene **3 opciones**, se completan solo `opcion_1`, `opcion_2` y `opcion_3`.
- Si es una pregunta de **Verdadero / Falso**, solo se incluyen 2 opciones.

---

## 6. Ejemplo Completo en CSV

```csv
# titulo: Software y Estándares Web - HTML5 y Semántica
# asignatura: Software y Estándares para la Web
# descripcion: Test con opciones dinámicas y referencias a diapositivas concretas
# tiempo: 15
pregunta,correcta,explicacion,referencia,opcion_1,opcion_2,opcion_3,opcion_4,opcion_5
"¿Cuándo se recomienda utilizar el elemento <article> frente a <section>?",1,"<article> se utiliza para contenido independiente y distribuible por sí mismo, mientras que <section> agrupa contenido temático dentro del flujo.","software-estandares-web/teoria-lenguajes-de-marcado-html#40-cuando-usar-article-y-cuando-section","Cuando el contenido es autónomo y separable","Cuando se requiere dividir párrafos con líneas","Solo en la barra lateral","Únicamente en el encabezado","Cuando no tiene texto visible"
"¿El elemento <title> es obligatorio en el encabezado del documento HTML?",1,"El estándar HTML requiere obligatoriamente el elemento <title> dentro de <head>.","software-estandares-web/teoria-lenguajes-de-marcado-html#29-title-titulo-o-nombre-de-la-pagina-obligatoria","Verdadero","Falso"
"¿Qué elemento permite proporcionar diferentes fuentes de imagen para diseño adaptativo?",2,"El elemento <picture> contiene elementos <source> y un <img> de reserva.","software-estandares-web/teoria-lenguajes-de-marcado-html#132-el-elemento-picture-permite-proporcionar-varias-ingenieria","<canvas>","<picture>","<svg>","<figure>"
"¿Para qué se utiliza el atributo 'scope' en tablas HTML?",3,"El atributo 'scope' especifica si una celda th es encabezado de fila o columna para lectores de pantalla.","software-estandares-web/teoria-lenguajes-de-marcado-html#145-para-que-una-tabla-sea-accesible","Para definir el ancho de la tabla","Para dar bordes redondeados","Para indicar si una celda es encabezado de fila o columna mejorando la accesibilidad","Para unir varias filas verticalmente","Para aplicar estilos CSS condicionales"
```

---

## 7. Funcionamiento del Popup de Consulta Rápida

- Al pulsar **`📖 Ver apuntes relacionados`** (en la pregunta) o **`📖 Consultar unidad en apuntes`** (en el feedback de revisión):
  1. Se abre un overlay modal flotante con los mismos estilos que el visor de estudio (tipografía Inter, resumen, migas de pan y controles de tamaño de letra).
  2. Localiza automáticamente la sección o diapositiva indicada en el ancla.
  3. Enmarca la sección con un borde azul cian (`.quiz-target-reference`) y subraya términos clave.
  4. Realiza un scroll suave automático al punto exacto.
  5. Al cerrar el popup (`Esc` o botón cerrar), el cuestionario continúa en el mismo punto con las respuestas del estudiante intactas.
