import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import vm from 'node:vm';
import { makeCatalog } from './catalog.mjs';

test('el catálogo detecta resúmenes opcionales en grupos anidados', async () => {
  const temp = await mkdtemp(join(tmpdir(), 'apuntes-resumen-'));
  try {
    const directory = join(temp, 'asignatura', '01-grupo', '02-unidad');
    await mkdir(directory, { recursive: true });
    const front = '---\ntitulo: Unidad\nresumen: Introducción\n---\n\n## Tema\n';
    await writeFile(join(directory, 'unidad.md'), front);
    let unit = (await makeCatalog(temp)).subjects[0].units[0];
    assert.equal(unit.id, 'grupo-unidad');
    assert.equal(unit.summaryPath, null);
    await writeFile(join(directory, 'resumen.md'), front);
    unit = (await makeCatalog(temp)).subjects[0].units[0];
    assert.equal(unit.summaryPath, 'contenido/asignatura/01-grupo/02-unidad/resumen.md');
  } finally {
    assert.ok(resolve(temp).startsWith(resolve(tmpdir()) + sep));
    await rm(temp, { recursive: true, force: true });
  }
});

test('el visor resuelve adjuntos desde la unidad y respeta enlaces de navegación', async () => {
  const context = vm.createContext({
    URL, URLSearchParams,
    localStorage: { getItem: () => null },
    document: {
      baseURI: 'https://ejemplo.test/apuntes/', readyState: 'loading',
      addEventListener() {}, querySelector: () => ({ addEventListener() {} }),
    },
    window: { addEventListener() {} },
  });
  const app = await readFile(new URL('../src/app.js', import.meta.url), 'utf8');
  vm.runInContext(app + '\nglobalThis.api = {state, resolveStudyResource};', context);
  const { state, resolveStudyResource } = context.api;
  state.currentDocumentPath = 'contenido/asignatura/01-tema/resumen.md';
  assert.equal(resolveStudyResource('Diseño web.pdf#page=5'), 'https://ejemplo.test/apuntes/contenido/asignatura/01-tema/Dise%C3%B1o%20web.pdf#page=5');
  assert.equal(resolveStudyResource('ejemplos/codigo.xml'), 'https://ejemplo.test/apuntes/contenido/asignatura/01-tema/ejemplos/codigo.xml');
  assert.equal(resolveStudyResource('#tema'), '#tema');
  assert.equal(resolveStudyResource('?u=asignatura%2Funidad'), '?u=asignatura%2Funidad');
  assert.equal(resolveStudyResource('https://www.w3.org/'), 'https://www.w3.org/');
  assert.equal(resolveStudyResource('javascript:alert(1)'), '#');
});
