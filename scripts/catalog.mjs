import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const REQUIRED = ['id', 'asignatura', 'unidad', 'titulo', 'orden', 'resumen'];
const IDENTIFIER = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function parseFrontMatter(text, filename) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  if (!match) throw new Error(`${filename}: falta la cabecera entre líneas ---`);
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const field = /^([a-z]+):\s*(.*)$/.exec(line);
    if (!field) throw new Error(`${filename}: cabecera inválida: ${line}`);
    const [, key, value] = field;
    if (key in data) throw new Error(`${filename}: campo repetido: ${key}`);
    data[key] = value.trim();
  }
  for (const key of REQUIRED) {
    if (!data[key]) throw new Error(`${filename}: falta ${key}`);
  }
  if (!IDENTIFIER.test(data.id)) throw new Error(`${filename}: id debe usar minúsculas, números y guiones`);
  if (!/^[1-9]\d*$/.test(data.unidad) || !/^[1-9]\d*$/.test(data.orden)) {
    throw new Error(`${filename}: unidad y orden deben ser números enteros positivos`);
  }
  return data;
}

export async function makeCatalog(root) {
  const subjects = [];
  const seen = new Set();
  const dirs = (await readdir(root, { withFileTypes: true })).filter(x => x.isDirectory());
  for (const dir of dirs) {
    if (!IDENTIFIER.test(dir.name)) throw new Error(`Nombre de asignatura inválido: ${dir.name}`);
    const subjectPath = join(root, dir.name);
    const units = [];
    let subjectTitle;
    for (const item of (await readdir(subjectPath, { withFileTypes: true })).filter(x => x.isDirectory())) {
      const path = join(subjectPath, item.name, 'unidad.md');
      try { await stat(path); } catch { throw new Error(`Falta ${path}`); }
      const meta = parseFrontMatter(await readFile(path, 'utf8'), path);
      if (seen.has(`${dir.name}/${meta.id}`)) throw new Error(`Unidad duplicada: ${dir.name}/${meta.id}`);
      seen.add(`${dir.name}/${meta.id}`);
      if (subjectTitle && subjectTitle !== meta.asignatura) {
        throw new Error(`${path}: asignatura distinta a otras unidades de la carpeta`);
      }
      subjectTitle = meta.asignatura;
      if (meta.fuente) {
        if (meta.fuente.startsWith('/') || meta.fuente.includes('..') || meta.fuente.includes('\\')) {
          throw new Error(`${path}: fuente debe ser un archivo relativo de la unidad`);
        }
        try { await stat(join(subjectPath, item.name, meta.fuente)); }
        catch { throw new Error(`${path}: falta el archivo fuente ${meta.fuente}`); }
      }
      const rel = relative(root, path).split(sep).join('/');
      units.push({ id: meta.id, title: meta.titulo, number: Number(meta.unidad), order: Number(meta.orden), summary: meta.resumen, source: meta.fuente || null, path: `contenido/${rel}` });
    }
    if (units.length) {
      units.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'es'));
      subjects.push({ id: dir.name, title: subjectTitle, units });
    }
  }
  subjects.sort((a, b) => a.title.localeCompare(b.title, 'es'));
  if (!subjects.length) throw new Error('No se encontraron unidades.md');
  return { schemaVersion: 1, subjects };
}
