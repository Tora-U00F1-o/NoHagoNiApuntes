import { readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { makeCatalog } from './catalog.mjs';

const base = resolve(import.meta.dirname, '..');
const catalog = await makeCatalog(join(base, 'contenido'));
for (const subject of catalog.subjects) {
  for (const unit of subject.units) {
    const md = await readFile(join(base, unit.path), 'utf8');
    const headings = [...md.matchAll(/^## (.+)$/gm)].map(x => x[1]);
    const opens = [...md.matchAll(/^::: (aviso|examen|practica|proyecto|pregunta|proceso|cifras)(?: .*)?$/gm)].length;
    const closes = [...md.matchAll(/^:::\s*$/gm)].length;
    if (opens !== closes) throw new Error(`${unit.path}: ${opens} bloques abiertos, ${closes} cerrados`);
    if ((md.match(/^```/gm) || []).length % 2) throw new Error(`${unit.path}: bloque de código sin cerrar`);
    if (!headings.length) throw new Error(`${unit.path}: no hay apartados ## para el índice`);
    console.log(`${subject.title} / ${unit.title}: ${headings.length} apartados, ${opens} bloques especiales`);
  }
}
