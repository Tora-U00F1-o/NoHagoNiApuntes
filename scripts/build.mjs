import { fileURLToPath } from 'node:url';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { makeCatalog } from './catalog.mjs';

const base = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const content = join(base, 'contenido');
const output = join(base, 'dist');
const catalog = await makeCatalog(content);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(join(base, 'src'), output, { recursive: true });
await cp(content, join(output, 'contenido'), { recursive: true });
// Índice ligero de asignaturas + un catálogo por asignatura (se descarga solo al elegirla).
await mkdir(join(output, 'catalogo'), { recursive: true });
const index = { schemaVersion: 2, subjects: catalog.subjects.map(s => ({ id: s.id, title: s.title, count: s.units.length })) };
await writeFile(join(output, 'catalogo.json'), JSON.stringify(index, null, 2) + '\n');
for (const s of catalog.subjects) await writeFile(join(output, 'catalogo', s.id + '.json'), JSON.stringify(s, null, 2) + '\n');
await writeFile(join(output, '.nojekyll'), '');
console.log(`Preparadas ${catalog.subjects.length} asignaturas y ${catalog.subjects.reduce((n, s) => n + s.units.length, 0)} unidades en dist/`);
