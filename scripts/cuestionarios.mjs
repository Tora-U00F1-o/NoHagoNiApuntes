import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, basename, extname } from 'node:path';

/**
 * Tokenizador CSV simple y compatible con RFC 4180
 */
function parseCsvRow(line, delimiter) {
  const fields = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === delimiter && !inQuotes) {
      fields.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  fields.push(cur.trim());
  return fields;
}

/**
 * Analiza un archivo CSV para extraer metadatos y número de preguntas.
 */
export async function scanQuestionnaires(dirPath) {
  let entries = [];
  try {
    entries = await readdir(dirPath, { withFileTypes: true });
  } catch {
    return [];
  }

  const csvFiles = entries.filter(e => e.isFile() && extname(e.name).toLowerCase() === '.csv');
  const results = [];

  for (const file of csvFiles) {
    const fullPath = join(dirPath, file.name);
    let content = await readFile(fullPath, 'utf8');
    if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);

    const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

    let title = basename(file.name, '.csv').replace(/-/g, ' ');
    title = title.charAt(0).toUpperCase() + title.slice(1);
    let subject = 'general';
    let subjectTitle = 'General';
    let description = 'Cuestionario de autoevaluación interactivo';
    let timeMinutes = 15;
    let questionsCount = 0;
    let minOptions = Infinity;
    let maxOptions = 0;

    let delimiter = ',';
    for (const line of lines) {
      if (line.includes(';') && (line.split(';').length > line.split(',').length)) {
        delimiter = ';';
        break;
      }
    }

    for (const line of lines) {
      if (line.startsWith('#')) {
        const match = /^#\s*([a-zA-Z_]+)\s*:\s*(.+)$/.exec(line);
        if (match) {
          const [, key, val] = match;
          const k = key.toLowerCase();
          if (k === 'titulo' || k === 'title') title = val.trim();
          if (k === 'asignatura' || k === 'subject') {
            subjectTitle = val.trim();
            subject = val.trim().toLowerCase().replace(/\s+/g, '-');
          }
          if (k === 'descripcion' || k === 'description') description = val.trim();
          if (k === 'tiempo' || k === 'time') timeMinutes = parseInt(val.trim(), 10) || 15;
        }
        continue;
      }

      // Descartar solo si es exactamente la fila de cabecera (pregunta,correcta...)
      const isHeader = /^(["']?)(pregunta|question)\1\s*[,;]\s*(["']?)(correcta|correct|respuesta)\3/i.test(line);
      if (isHeader) continue;

      const cols = parseCsvRow(line, delimiter);
      if (cols.length >= 3) {
        questionsCount++;
        // Las opciones empiezan tras la columna 2 o 3 (según si hay explicación o no)
        // Detectar cuántas opciones con contenido hay
        const options = cols.slice(2).filter(c => c !== '');
        // Si la primera opción parece texto largo explicativo o hay más de 2 opciones restantes
        const optCount = Math.max(2, cols.length - 3);
        if (optCount < minOptions) minOptions = optCount;
        if (optCount > maxOptions) maxOptions = optCount;
      }
    }

    const id = basename(file.name, '.csv');
    results.push({
      id,
      filename: file.name,
      path: `contenido/cuestionarios/${file.name}`,
      title,
      subject,
      subjectTitle,
      description,
      questionsCount,
      timeMinutes,
      optionsRange: minOptions <= maxOptions && minOptions !== Infinity ? `${minOptions}-${maxOptions}` : 'variable'
    });
  }

  // Ordenar por título
  results.sort((a, b) => a.title.localeCompare(b.title, 'es'));
  return results;
}
