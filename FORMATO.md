# Formato de `unidad.md`

Cada unidad empieza con una cabecera de pares simples `campo: valor` delimitada por `---`. Es un subconjunto deliberadamente pequeño de YAML. El script comprueba los campos obligatorios y genera `catalogo.json`.

```md
---
id: introduccion
asignatura: Otra asignatura
unidad: 1
titulo: Introducción
orden: 1
resumen: Conceptos y ejercicios de la primera unidad.
fuente: apuntes-originales.pdf
---

# Introducción

Texto inicial de la unidad.

## Primer apartado {#primer-apartado}

Explicación con **negrita**, `código en línea` y [enlaces](https://example.org).
```

`fuente` es opcional; si aparece debe nombrar un archivo en la carpeta de la unidad. `orden` controla la posición en el menú; `unidad` es el número que se muestra. Los títulos `##` forman el índice principal; los `###` forman subapartados. El identificador `{#...}` es opcional y fija la dirección del apartado aunque cambie su título.

## Elementos Markdown normales

Párrafos, listas, enlaces, imágenes relativas, tablas y citas funcionan como Markdown. Las rutas relativas, por ejemplo `![Esquema](esquema.png)` o `[Diapositivas](apuntes-originales.pdf)`, se resuelven respecto a `unidad.md`. El HTML escrito directamente en el Markdown se muestra como texto, no se ejecuta.

Los bloques de código usan un lenguaje y, opcionalmente, título y procedencia:

````md
```java title="Problem2.java" origen="ejemplo didáctico"
int valor = rs.getInt("invoice_id");
if (rs.wasNull()) System.out.println("Sin factura");
```
````

El botón «Copiar» copia el código del bloque. El lenguaje se muestra como etiqueta; la web no necesita cargar un resaltador externo para presentar el código.

## Bloques especiales

El bloque empieza con `::: tipo Título` y termina con una línea `:::`. Puede contener Markdown, incluidos bloques de código. Los bloques especiales no se anidan entre sí.

````md
::: aviso Ojo
La primera columna del `ResultSet` tiene índice **1**.
:::

::: examen De examen
`wasNull()` comprueba la última columna leída.
:::

::: practica unit1-manage-nulls
`Problem2.java` comprueba el resultado de `getInt()`.
:::

::: proyecto HSQLdb-ConnectionPool
**Objetivo:** comparar el pool con `DriverManager`.
:::

::: pregunta ¿Qué hace `commit()`?
Confirma los cambios de la transacción actual.
:::

::: proceso
Aplicación → API JDBC → Driver → SGBD
:::

::: cifras
8 | bloques de teoría
6 | proyectos de prácticas
:::
````

`aviso`, `examen`, `practica` y `proyecto` aceptan Markdown en su cuerpo. `pregunta` muestra el título como pregunta desplegable y el cuerpo como respuesta. `proceso` separa pasos por `→` o `->`. `cifras` tiene una línea `número | descripción` por elemento. Estos dos últimos tipos son para flujos y cifras sencillos; para diagramas más complejos se puede incluir una imagen como archivo de la unidad.

## Enlaces entre unidades

Usa la dirección `?u=<asignatura>/<id-unidad>#apartado`; en Markdown, codifica la barra en la URL:

```md
[Ir a JDBC](?u=repositorios-informacion%2Fjdbc#resultset)
```

La URL de una unidad inexistente muestra la primera unidad disponible. Los identificadores de apartado explícitos evitan que los enlaces de estudio cambien si reescribes los títulos.
