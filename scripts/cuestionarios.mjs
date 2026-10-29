import { readdir, readFile } from 'node:fs/promises';
import { join, basename, relative, sep } from 'node:path';

// Registros completos: las explicaciones pueden contener comas, ; y saltos.
export function readQuizCsv(text) {
  text = text.replace(/^\uFEFF/, '');
  const metadata = {};
  // Solo los comentarios anteriores a la cabecera son metadatos: un # dentro
  // de una celda multilínea pertenece al contenido y debe conservarse.
  while (text) {
    const line = /^([^\r\n]*)(?:\r?\n|$)/.exec(text);
    if (!line || (line[1].trim() && !line[1].trim().startsWith('#'))) break;
    const match = /^#\s*([\w]+)\s*:\s*(.*)$/.exec(line[1].trim());
    if (match) metadata[match[1].toLowerCase()] = match[2].trim();
    text = text.slice(line[0].length);
  }
  const header = text.split(/\r?\n/).find(line => line.trim()) || '';
  const delimiter = header.includes(';') ? ';' : ',';
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i <= text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') { field += '"'; i++; }
      else quoted = !quoted;
    } else if (c === delimiter && !quoted) {
      row.push(field.trim()); field = '';
    } else if ((c === '\n' || c === undefined) && !quoted) {
      row.push(field.trim()); field = '';
      if (row.some(Boolean)) rows.push(row);
      row = [];
    } else if (c !== undefined) field += c;
  }
  if (quoted) throw new Error('CSV con comillas sin cerrar');
  return { metadata, rows };
}

export async function scanQuestionnaires(contentRoot, catalog) {
  const results = [];
  const sources = [{ directory: join(contentRoot, 'cuestionarios') }];
  for (const subject of catalog?.subjects || []) {
    for (const unit of subject.units) {
      sources.push({ directory: join(contentRoot, '..', unit.path, '..', 'test'), subject, unit });
      sources.push({ directory: join(contentRoot, '..', unit.path, '..', 'test', 'anteriores'), subject, unit, isArchive: true });
    }
  }
  for (const { directory, subject, unit, isArchive = false } of sources) {
    let entries;
    try { entries = await readdir(directory, { withFileTypes: true }); }
    catch (error) { if (error.code === 'ENOENT') continue; throw error; }
    for (const entry of entries.filter(e => e.isFile() && /\.csv$/i.test(e.name))) {
      const { metadata: m, rows } = readQuizCsv(await readFile(join(directory, entry.name), 'utf8'));
      const hasHeader = /^(pregunta|question)$/i.test(rows[0]?.[0]);
      const header = hasHeader ? rows.shift().map(s => s.toLowerCase()) : [];
      const optionStart = hasHeader ? Math.max(2, ...header.map((c, i) => /^(explicacion|referencia|feedback|apuntes)$/.test(c) ? i + 1 : 0)) : 3;
      const counts = rows.map(row => row.slice(optionStart).filter(Boolean).length);
      const name = basename(entry.name, '.csv');
      const subjectTitle = subject?.title || m.asignatura || m.subject || 'General';
      const path = 'contenido/' + relative(contentRoot, join(directory, entry.name)).split(sep).join('/');
      results.push({
        id: unit && !isArchive ? `${subject.id}--${unit.id}--${name}` : name,
        filename: entry.name, path,
        title: m.titulo || m.title || name.replace(/[-_]/g, ' '),
        subject: subject?.id || subjectTitle.toLowerCase().replace(/\s+/g, '-'), subjectTitle,
        unitId: unit?.id || m.unidad || null, unitTitle: unit?.title || null,
        group: isArchive ? 'Test anteriores' : unit ? (unit.id.startsWith('seminarios-') ? 'Seminarios' : 'Teoría') : 'Otros cuestionarios',
        isArchive,
        unitOrder: unit ? subject.units.indexOf(unit) : null,
        difficulty: m.dificultad || null,
        examPath: unit?.examPath || null,
        description: m.descripcion || m.description || 'Cuestionario de autoevaluación interactivo',
        questionsCount: rows.length, timeMinutes: Number(m.tiempo || m.time) || 15,
        optionsRange: counts.length ? `${Math.min(...counts)}-${Math.max(...counts)}` : 'variable',
      });
    }
  }
  const identifiers = new Set();
  for (const quiz of results) {
    if (identifiers.has(quiz.id)) throw new Error(`Identificador de cuestionario repetido: ${quiz.id}`);
    identifiers.add(quiz.id);
  }
  return results.sort((a, b) => a.subjectTitle.localeCompare(b.subjectTitle, 'es') ||
    (a.unitOrder ?? 999) - (b.unitOrder ?? 999) ||
    Number(a.isArchive) - Number(b.isArchive) ||
    ['facil', 'medio', 'dificil'].indexOf(a.difficulty) - ['facil', 'medio', 'dificil'].indexOf(b.difficulty) ||
    a.filename.localeCompare(b.filename, 'es', { numeric: true }));
}
