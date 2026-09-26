Puedes utilizar este prompt cada vez que quieras preparar una unidad nueva:

```text
Quiero que prepares los apuntes completos de una unidad para mi web dinámica de estudio.

Voy a adjuntar el documento teórico original de la unidad. Debes ceñirte estrictamente a ese documento: no inventes contenido, no elimines información relevante y no cambies el sentido de las explicaciones.

OBJETIVO

Transforma el documento original en un archivo Markdown completo, claro y navegable para GitHub Pages. Los apuntes deben servir tanto para estudiar la teoría como para consultar ejemplos prácticos de código.

REGLAS DE CONTENIDO

1. Incluye toda la información importante del documento original.
2. Mantén el orden lógico de la unidad.
3. Divide el contenido en apartados y subapartados con títulos claros.
4. Explica los conceptos con lenguaje natural y preciso.
5. No hagas un resumen excesivamente corto.
6. Conserva:
   - definiciones;
   - clasificaciones;
   - propiedades;
   - tablas;
   - fórmulas;
   - ejemplos;
   - ejercicios;
   - pasos de algoritmos;
   - comparaciones;
   - referencias a figuras o diapositivas.
7. Si el documento contiene ejemplos, explícalos paso a paso.
8. Si añades una explicación para facilitar la comprensión, márcala claramente como explicación didáctica.
9. Si añades código que no aparece literalmente en el documento, indícalo como ejemplo didáctico.
10. No atribuyas al documento afirmaciones que no aparezcan en él.
11. Si algo no se entiende o falta en el documento, indícalo en vez de inventarlo.

EJEMPLOS DE CÓDIGO

Cuando el tema sea de programación:

- Incluye ejemplos completos y ejecutables cuando sea posible.
- Utiliza bloques de código con lenguaje indicado.
- Añade título y origen cuando corresponda.
- Explica qué hace el código y las partes importantes.
- Mantén el código compatible con las tecnologías explicadas en el documento.
- No introduzcas librerías o APIs que no sean necesarias.

Ejemplo de formato:

```java title="Ejemplo.java" origen="ejemplo didáctico"
public class Ejemplo {
    public static void main(String[] args) {
        System.out.println("Hola");
    }
}
```

ESTRUCTURA MARKDOWN OBLIGATORIA

El archivo debe comenzar con este frontmatter:

```yaml
---
id: ID_UNIDAD
asignatura: NOMBRE_ASIGNATURA
unidad: NUMERO_UNIDAD
titulo: TITULO_UNIDAD
orden: NUMERO_UNIDAD
resumen: RESUMEN_BREVE_DE_LA_UNIDAD
fuente: NOMBRE_EXACTO_DEL_PDF
---
```

Después debe contener:

1. Introducción general.
2. Objetivos o ideas principales.
3. Desarrollo completo de la teoría.
4. Tablas comparativas cuando ayuden.
5. Ejemplos explicados.
6. Ejemplos de código, si procede.
7. Ejercicios o preguntas de repaso.
8. Errores frecuentes o advertencias.
9. Resumen final.
10. Referencias al documento original.

BLOQUES ESPECIALES DISPONIBLES

Puedes utilizar estos bloques:

```markdown
::: cifras
4 | propiedades principales
3 | fases del proceso
2 | ejemplos prácticos
:::
```

```markdown
::: aviso Importante
Explicación o advertencia relevante.
:::
```

```markdown
::: pregunta ¿Qué significa este concepto?
Respuesta razonada y completa.
:::
```

```markdown
::: practica Ejercicio práctico
Descripción del ejercicio y resolución.
:::
```

```markdown
::: proceso
Inicio → Análisis → Ejecución → Resultado
:::
```

ENLACES AL PDF

Utiliza siempre el nombre exacto del PDF que te proporcione.

Ejemplos:

```markdown
[Ver diapositiva 12](NOMBRE_EXACTO_DEL_PDF#page=12)
```

```markdown
[Abrir el documento original](NOMBRE_EXACTO_DEL_PDF)
```

No cambies el nombre del PDF ni inventes rutas.

FORMATO DE SALIDA

Devuélveme únicamente:

1. El contenido completo de `unidad.md`.
2. Una breve lista final indicando:
   - qué información se ha extraído;
   - qué ejemplos de código se han añadido;
   - qué partes son explicaciones didácticas;
   - si falta algún dato o archivo original.

Antes de terminar, comprueba que:

- el frontmatter es válido;
- todos los títulos están bien jerarquizados;
- no se ha perdido información del documento;
- los enlaces al PDF utilizan el nombre correcto;
- los bloques especiales están correctamente cerrados;
- los bloques de código tienen su lenguaje indicado;
- el Markdown se puede procesar correctamente por el visor de la web.
```

Solo tendrías que cambiar cada vez:

```text
ID_UNIDAD
NOMBRE_ASIGNATURA
NUMERO_UNIDAD
TITULO_UNIDAD
NOMBRE_EXACTO_DEL_PDF
```

y adjuntar el PDF o documento teórico correspondiente.