import { fileURLToPath } from 'node:url';
import { cp, mkdir, rm, writeFile, readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { makeCatalog } from './catalog.mjs';
import { scanQuestionnaires } from './cuestionarios.mjs';

const base = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const content = join(base, 'contenido');
const questionnairesDir = join(content, 'cuestionarios');
const output = join(base, 'dist');

const catalog = await makeCatalog(content);

// Escaneo de cuestionarios
const questionnaires = await scanQuestionnaires(content, catalog);
const newQuizJson = JSON.stringify(questionnaires, null, 2) + '\n';
let existingQuizJson = '';
try { existingQuizJson = await readFile(join(questionnairesDir, 'index.json'), 'utf8'); } catch {}
if (existingQuizJson !== newQuizJson) {
  await writeFile(join(questionnairesDir, 'index.json'), newQuizJson);
}

await rm(output, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
await mkdir(output, { recursive: true });
await cp(join(base, 'src'), output, { recursive: true });
await cp(content, join(output, 'contenido'), { recursive: true });
// Mantener también las descargas CSV antiguas al reorganizar sus fuentes.
for (const quiz of questionnaires.filter(q => q.isArchive)) {
  await cp(join(base, quiz.path), join(output, 'contenido', 'cuestionarios', quiz.filename));
}

// Índice ligero de asignaturas + un catálogo por asignatura (se descarga solo al elegirla).
await mkdir(join(output, 'catalogo'), { recursive: true });
const index = { schemaVersion: 2, subjects: catalog.subjects.map(s => ({ id: s.id, title: s.title, count: s.units.length })) };
await writeFile(join(output, 'catalogo.json'), JSON.stringify(index, null, 2) + '\n');
for (const s of catalog.subjects) await writeFile(join(output, 'catalogo', s.id + '.json'), JSON.stringify(s, null, 2) + '\n');
await writeFile(join(output, 'catalogo', 'cuestionarios.json'), newQuizJson);
await writeFile(join(output, '.nojekyll'), '');

console.log(`Preparadas ${catalog.subjects.length} asignaturas, ${catalog.subjects.reduce((n, s) => n + s.units.length, 0)} unidades y ${questionnaires.length} cuestionarios en dist/`);
