# Prompt para Generación de Cuestionarios Técnicos en CSV

Utiliza las siguientes instrucciones para solicitar a un modelo de IA o generar conjuntos de preguntas de autoevaluación basados en los apuntes de la asignatura:

---

```markdown
Actúa como un profesor universitario experto en la materia. A partir del temario y las diapositivas proporcionadas en la unidad (archivo `unidad.md`), genera sets de preguntas de test en formato CSV para autoevaluación de los estudiantes.

### Requisitos de los sets de preguntas:
1. Genera los siguientes bloques de preguntas bien diferenciados por dificultad:
   - **Set 1: 50 preguntas generales / fundamentales** (conceptos base, definiciones clave, sintaxis fundamental).
   - **Set 2: 50 preguntas intermedias** (aplicación de reglas, casos de uso prácticos, diferencias entre elementos y buenas prácticas).
   - **Set 3: 50 preguntas complejas / avanzadas** (detalles específicos de la especificación, accesibilidad, casos límite, validación y compatibilidad).

2. **Opciones de respuesta**:
   - Cada pregunta debe ofrecer generalmente 5 opciones de respuesta (`opcion_1` a `opcion_5`), salvo preguntas de tipo Verdadero/Falso (2 opciones) o preguntas con opciones naturalmente restringidas (3 o 4 opciones).
   - Solo una respuesta debe ser la correcta.
   - Las opciones incorrectas (distractores) deben ser plausibles, verosímiles y basadas en confusiones o errores comunes de la materia.

3. **Referencias de Alta Precisión (`referencia`)**:
   - **OBLIGATORIO**: Cada pregunta debe incluir la referencia exacta a la lección y a la diapositiva o subapartado donde se explica dicho concepto.
   - Formato general: `<asignatura>/<id-unidad>#<slug-diapositiva>`
   - Para apuntes organizados por diapositivas con encabezados `### <numero>. <titulo>`, el ancla debe ser el slug exacto del encabezado.
   
   **Ejemplos de anclas a diapositivas (`###`)**:
   - `### 12. Especificación del tipo de documento` -> `#12-especificacion-del-tipo-de-documento`
   - `### 29. <title> Titulo o nombre de la página OBLIGATORIA` -> `#29-title-titulo-o-nombre-de-la-pagina-obligatoria`
   - `### 38. Elemento article` -> `#38-elemento-article`
   - `### 39. Elemento section` -> `#39-elemento-section`
   - `### 40. Cuando usar article y cuando section` -> `#40-cuando-usar-article-y-cuando-section`
   - `### 60. Elemento div` -> `#60-elemento-div`
   - `### 132. El elemento <picture> permite proporcionar varias Ingeniería` -> `#132-el-elemento-picture-permite-proporcionar-varias-ingenieria`
   - `### 145. Para que una tabla sea accesible:` -> `#145-para-que-una-tabla-sea-accesible`
   - `### 170. Permite controlar el orden de navegación mediante teclado` -> `#170-permite-controlar-el-orden-de-navegacion-mediante-teclado`

---

### Especificación del Formato CSV:

1. **Delimitador**: Coma (`,`) o punto y coma (`;`).
2. **Codificación**: UTF-8.
3. **Escapado de cadenas**: Todos los campos con texto deben ir envueltos entre comillas dobles (`"..."`). Si dentro del texto hay comillas, se duplican (`""`).
4. **Metadatos iniciales**:
   ```csv
   # titulo: Software y Estándares Web - HTML5 (Nivel General)
   # asignatura: Software y Estándares para la Web
   # descripcion: Cuestionario de 50 preguntas fundamentales con referencias a diapositivas
   # tiempo: 30
   ```
5. **Cabecera**:
   ```csv
   pregunta,correcta,explicacion,referencia,opcion_1,opcion_2,opcion_3,opcion_4,opcion_5
   ```

### Significado de Columnas:
- **`pregunta`**: Enunciado claro, sin ambigüedades.
- **`correcta`**: Índice de la opción correcta (`1`, `2`, `3`, `4` o `5`).
- **`explicacion`**: Justificación didáctica clara de por qué la opción es correcta y por qué las demás fallan.
- **`referencia`**: Enlace con ruta de unidad y ancla a la diapositiva o subapartado (`asignatura/unidad#ancla`).
- **`opcion_1` ... `opcion_N`**: Texto de las alternativas de respuesta.

---

### Ejemplo de Salida Esperada:

```csv
# titulo: Lenguajes de Marcado - HTML5 Intermedio
# asignatura: Software y Estándares para la Web
# descripcion: Evaluación de semántica, estructura y accesibilidad HTML5
# tiempo: 25
pregunta,correcta,explicacion,referencia,opcion_1,opcion_2,opcion_3,opcion_4,opcion_5
"¿Cuándo se recomienda utilizar el elemento <article> frente a <section>?",1,"<article> se utiliza para contenido independiente y distribuible por sí mismo, mientras que <section> agrupa contenido temático dentro del flujo.","software-estandares-web/teoria-lenguajes-de-marcado-html#40-cuando-usar-article-y-cuando-section","Cuando el contenido es autónomo y separable","Cuando se requiere dividir párrafos con líneas","Solo en la barra lateral","Únicamente en el encabezado","Cuando no tiene texto visible"
"¿Qué elemento permite proporcionar diferentes fuentes de imagen para diseño adaptativo?",2,"El elemento <picture> contiene elementos <source> y un <img> de reserva.","software-estandares-web/teoria-lenguajes-de-marcado-html#132-el-elemento-picture-permite-proporcionar-varias-ingenieria","<canvas>","<picture>","<svg>","<figure>","<map>"
"¿Para qué se utiliza el atributo 'scope' en tablas HTML?",3,"El atributo 'scope' especifica si una celda th es encabezado de fila (row) o columna (col), lo cual es crítico para lectores de pantalla.","software-estandares-web/teoria-lenguajes-de-marcado-html#145-para-que-una-tabla-sea-accesible","Para definir el ancho de la tabla","Para dar estilos visuales de celda","Para indicar si una celda es encabezado de fila o columna mejorando la accesibilidad","Para unir varias filas verticalmente","Para aplicar filtros en JavaScript"
"¿Qué valor del atributo tabindex retira un elemento del orden secuencial de foco pero permite enfocarlo por script?",4,"tabindex='-1' elimina el elemento del orden secuencial de tabulación normal pero permite enfocarlo mediante el método focus() de JavaScript.","software-estandares-web/teoria-lenguajes-de-marcado-html#170-permite-controlar-el-orden-de-navegacion-mediante-teclado","tabindex='0'","tabindex='1'","tabindex='none'","tabindex='-1'","tabindex='false'"
```
```
