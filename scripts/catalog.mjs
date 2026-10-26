import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const UNIT_REQUIRED = ['titulo', 'resumen'];
const IDENTIFIER = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PREFIX = /^(\d+)-(.+)$/;
const collator = new Intl.Collator('es', { numeric: true });

export function parseFrontMatter(text, filename, required = UNIT_REQUIRED) {
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
  for (const key of required) {
    if (!data[key]) throw new Error(`${filename}: falta ${key}`);
  }
  if (data.id && !IDENTIFIER.test(data.id)) throw new Error(`${filename}: id debe usar minúsculas, números y guiones`);
  for (const key of ['unidad', 'orden']) {
    if (data[key] && !/^[1-9]\d*$/.test(data[key])) {
      throw new Error(`${filename}: ${key} debe ser un número entero positivo`);
    }
  }
  if (data.parte != null && data.parte !== '') {
    if (!/^[1-9]\d*$/.test(data.parte)) {
      throw new Error(`${filename}: parte debe ser un número entero positivo (p. ej. 1 para mostrar 2.1)`);
    }
  } else {
    delete data.parte;
  }
  return data;
}

const exists = async path => { try { await stat(path); return true; } catch { return false; } };
const splitName = name => {
  const m = PREFIX.exec(name);
  return m ? { num: Number(m[1]), slug: m[2] } : { num: null, slug: name };
};
const humanize = slug => {
  const text = slug.replace(/-/g, ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
};
const sortNodes = nodes => nodes.sort((a, b) =>
  (a.key ?? 9999) - (b.key ?? 9999) || collator.compare(a.name, b.name));

/**
 * Cada carpeta con `unidad.md` es una unidad; el resto de carpetas son grupos
 * (con `_grupo.md` opcional para título/orden). Se admite cualquier profundidad.
 */
async function walk(root, abs, slugs, ctx) {
  const nodes = [];
  const items = (await readdir(abs, { withFileTypes: true }))
    .filter(x => x.isDirectory() && !x.name.startsWith('.') && !x.name.startsWith('_'));
  for (const item of items) {
    const path = join(abs, item.name);
    const { num, slug } = splitName(item.name);
    const unitFile = join(path, 'unidad.md');
    if (await exists(unitFile)) {
      const meta = parseFrontMatter(await readFile(unitFile, 'utf8'), unitFile);
      const id = meta.id || [...slugs, slug].join('-');
      if (!IDENTIFIER.test(id)) {
        throw new Error(`${unitFile}: no se puede deducir un id válido de la carpeta; añade «id:» a la cabecera`);
      }
      if (ctx.seen.has(id)) throw new Error(`Unidad duplicada: ${ctx.subject}/${id}`);
      ctx.seen.add(id);
      if (meta.asignatura) {
        if (ctx.title && ctx.title !== meta.asignatura) {
          throw new Error(`${unitFile}: asignatura distinta a otras unidades de la carpeta`);
        }
        ctx.title = meta.asignatura;
      }
      if (meta.fuente) {
        if (meta.fuente.startsWith('/') || meta.fuente.includes('..') || meta.fuente.includes('\\')) {
          throw new Error(`${unitFile}: fuente debe ser un archivo relativo de la unidad`);
        }
        if (!(await exists(join(path, meta.fuente)))) {
          throw new Error(`${unitFile}: falta el archivo fuente ${meta.fuente}`);
        }
      }
      const rel = relative(root, unitFile).split(sep).join('/');
      const dirRel = rel.slice(0, -'unidad.md'.length);
      const files = (await readdir(path, { withFileTypes: true }))
        .filter(x => x.isFile() && x.name !== 'unidad.md' && !x.name.startsWith('.'))
        .map(x => x.name)
        .sort(collator.compare)
        .map(name => ({ name, path: `contenido/${dirRel}${name}` }));
      const order = meta.orden ? Number(meta.orden) : null;
      const unit = {
        id,
        title: meta.titulo,
        number: meta.unidad ? Number(meta.unidad) : num,
        parte: meta.parte ? Number(meta.parte) : null,
        order: order ?? num,
        summary: meta.resumen,
        source: meta.fuente || null,
        files,
        path: `contenido/${rel}`,
      };
      ctx.units.set(id, unit);
      nodes.push({ type: 'unit', id, key: unit.order, name: item.name });
    } else {
      const groupFile = join(path, '_grupo.md');
      const hasMeta = await exists(groupFile);
      const meta = hasMeta ? parseFrontMatter(await readFile(groupFile, 'utf8'), groupFile, ['titulo']) : {};
      const children = await walk(root, path, [...slugs, slug], ctx);
      if (!children.length && !hasMeta) continue;
      nodes.push({
        type: 'group',
        id: [...slugs, slug].join('-'),
        title: meta.titulo || humanize(slug),
        summary: meta.resumen || null,
        children,
        key: meta.orden ? Number(meta.orden) : num,
        name: item.name,
      });
    }
  }
  return sortNodes(nodes);
}

const strip = nodes => nodes.map(n => n.type === 'unit'
  ? { type: 'unit', id: n.id }
  : { type: 'group', id: n.id, title: n.title, summary: n.summary, children: strip(n.children) });

function flatten(nodes, units, out = []) {
  for (const n of nodes) {
    if (n.type === 'unit') out.push(units.get(n.id));
    else flatten(n.children, units, out);
  }
  return out;
}

export async function makeCatalog(root) {
  const subjects = [];
  const dirs = (await readdir(root, { withFileTypes: true })).filter(x => x.isDirectory());
  for (const dir of dirs) {
    if (!IDENTIFIER.test(dir.name)) throw new Error(`Nombre de asignatura inválido: ${dir.name}`);
    const ctx = { subject: dir.name, seen: new Set(), units: new Map(), title: null };
    const tree = await walk(root, join(root, dir.name), [], ctx);
    const units = flatten(tree, ctx.units);
    if (units.length) {
      subjects.push({ id: dir.name, title: ctx.title || humanize(dir.name), tree: strip(tree), units });
    }
  }
  subjects.sort((a, b) => a.title.localeCompare(b.title, 'es'));
  if (!subjects.length) throw new Error('No se encontraron unidades.md');
  return { schemaVersion: 2, subjects };
}
