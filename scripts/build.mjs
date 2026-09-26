import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { makeCatalog } from './catalog.mjs';

const base = resolve(import.meta.dirname, '..');
const content = join(base, 'contenido');
const output = join(base, 'dist');
const catalog = await makeCatalog(content);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(join(base, 'src'), output, { recursive: true });
await cp(content, join(output, 'contenido'), { recursive: true });
await writeFile(join(output, 'catalogo.json'), JSON.stringify(catalog, null, 2) + '\n');
await writeFile(join(output, '.nojekyll'), '');
console.log(`Preparadas ${catalog.subjects.length} asignaturas y ${catalog.subjects.reduce((n, s) => n + s.units.length, 0)} unidades en dist/`);
