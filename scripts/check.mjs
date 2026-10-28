import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { makeCatalog, parseFrontMatter } from './catalog.mjs';

const base = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const catalog = await makeCatalog(join(base, 'contenido'));
for (const subject of catalog.subjects) {
  for (const unit of subject.units) {
    for (const path of [unit.path, unit.summaryPath].filter(Boolean)) {
      const md = await readFile(join(base, path), 'utf8');
      parseFrontMatter(md, path);
      const headings = [...md.matchAll(/^## (.+)$/gm)].map(x => x[1]);
      const opens = [...md.matchAll(/^::: (aviso|examen|practica|proyecto|pregunta|proceso|cifras)(?: .*)?$/gm)].length;
      const closes = [...md.matchAll(/^:::\s*$/gm)].length;
      if (opens !== closes) throw new Error(`${path}: ${opens} bloques abiertos, ${closes} cerrados`);
      if ((md.match(/^```/gm) || []).length % 2) throw new Error(`${path}: bloque de código sin cerrar`);
      if (!headings.length) throw new Error(`${path}: no hay apartados ## para el índice`);
      console.log(`${subject.title} / ${unit.title}${path === unit.summaryPath ? ' (resumen)' : ''}: ${headings.length} apartados, ${opens} bloques especiales`);
    }
  }
}
