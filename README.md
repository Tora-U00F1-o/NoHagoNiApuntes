# Apuntes universitarios

Web estática para estudiar varias asignaturas y unidades a partir de **un archivo Markdown por unidad**. Incluye como unidad de ejemplo los apuntes completos de JDBC y el PDF original. Conserva teoría, tablas, bloques de código, avisos, prácticas, diagramas de flujo sencillos y preguntas desplegables.

## Probar en local

Necesitas Node.js 20 o superior. No hay que instalar paquetes: el renderizador Markdown está incluido en `src/vendor/`.

```bash
npm run check
npm run build
npm run dev
```

Abre `http://127.0.0.1:8000/`. El servidor sirve `dist/`; después de editar un `.md`, vuelve a ejecutar `npm run build` y recarga la página. Abrir `index.html` con `file://` no funciona porque la web carga archivos mediante `fetch`.

## Añadir una unidad

1. Crea `contenido/<slug-asignatura>/<numero>-<slug-unidad>/unidad.md`.
2. Copia la cabecera del ejemplo de JDBC y cambia `id`, `asignatura`, `unidad`, `titulo`, `orden` y `resumen`. `id` y el nombre de la carpeta de asignatura usan minúsculas, números y guiones. `unidad` y `orden` son enteros positivos.
3. Pon en la misma carpeta imágenes, PDF u otros adjuntos y enlázalos por su nombre relativo. Si hay PDF de origen, escribe `fuente: nombre.pdf` en la cabecera.
4. Escribe los apartados con `##` y ejecuta `npm run check && npm run build`.

El catálogo y el menú se generan automáticamente. No se toca `app.js` para añadir asignaturas o unidades. Si se cambia el título de un apartado enlazado, añade un identificador estable: `## Transacciones {#transacciones}`.

La cabecera admite pares `campo: valor` en una línea, sin listas ni objetos YAML. Los campos de texto se toman literalmente, sin comillas. El formato de todos los bloques especiales está en [FORMATO.md](FORMATO.md).

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube **el contenido de esta carpeta** a la rama `main` (incluida `.github/workflows/pages.yml`). No subas solo el `.zip`.
2. En el repositorio, abre **Settings → Pages → Build and deployment → Source** y elige **GitHub Actions**.
3. Haz `push` a `main`. El flujo comprueba los `.md`, genera `dist/` y publica la web. Puedes lanzarlo también con **Actions → Publicar apuntes → Run workflow**.

El visor usa rutas relativas, por lo que sirve tanto en `usuario.github.io` como en `usuario.github.io/nombre-repositorio/`. Un enlace directo a una unidad tiene la forma `?u=repositorios-informacion%2Fjdbc#transacciones`.

GitHub Pages publica los archivos estáticos. El script de publicación genera `catalogo.json` para descubrir las unidades; el navegador descarga el `.md` elegido y lo renderiza. El PDF y los demás adjuntos quedan accesibles con la web. Para sitios con contenido privado, revisa la visibilidad del repositorio y del sitio antes de publicar.

## Estructura

```text
contenido/                 Una carpeta por asignatura y unidad
  repositorios-informacion/01-jdbc/unidad.md
  repositorios-informacion/01-jdbc/JDBC_original.pdf
src/                       Plantilla, diseño, visor y renderizador incluido
scripts/                   Comprobación, catálogo, copia a dist/ y servidor local
.github/workflows/pages.yml Publicación automática
FORMATO.md                 Referencia del formato de unidades
```

La unidad JDBC adapta la web anterior y se basa en el PDF facilitado. Los fragmentos didácticos no son transcripciones de los seis proyectos Java, cuyos archivos fuente no se facilitaron. La copia de `marked` incluida en `src/vendor/` es la versión 17.0.5 bajo licencia MIT; su licencia acompaña al archivo.
