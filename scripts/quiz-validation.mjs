import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { readQuizCsv, scanQuestionnaires } from './cuestionarios.mjs';

const slug = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export async function validateUnitQuizzes(root, catalog) {
  const quizzes = await scanQuestionnaires(join(root, 'contenido'), catalog);
  const subject = catalog.subjects.find(s => s.id === 'software-estandares-web');
  const targets = subject.units.filter(u => !u.id.startsWith('practicas-'));
  let total = 0;
  for (const unit of targets) {
    if (!unit.examPath) throw new Error(`${unit.id}: falta examen.md`);
    const own = quizzes.filter(q => q.subject === subject.id && q.unitId === unit.id && !q.isArchive);
    if (own.length !== 3 || new Set(own.map(q => q.difficulty)).size !== 3) throw new Error(`${unit.id}: se necesitan tres niveles diferentes`);
    const markdown = await readFile(join(root, unit.path), 'utf8');
    const anchors = new Set([...markdown.matchAll(/^#{2,3} (.+)$/gm)].map(m => slug(m[1])));
    const checkReference = reference => {
      const [key, anchor] = reference.split('#');
      if (key !== `${subject.id}/${unit.id}` || !anchors.has(anchor)) throw new Error(`${unit.id}: referencia inválida ${reference}`);
    };
    const allQuestions = new Set();
    for (const quiz of own) {
      if (!['facil', 'medio', 'dificil'].includes(quiz.difficulty)) throw new Error(`${quiz.path}: dificultad no reconocida`);
      const { rows } = readQuizCsv(await readFile(join(root, quiz.path), 'utf8'));
      if (rows.shift().join(',') !== 'pregunta,correcta,explicacion,referencia,opcion_1,opcion_2,opcion_3,opcion_4,opcion_5') throw new Error(`${quiz.path}: cabecera incorrecta`);
      if (rows.length !== 50) throw new Error(`${quiz.path}: se esperaban 50 preguntas, hay ${rows.length}`);
      for (const [i, row] of rows.entries()) {
        const [question, correct, explanation, reference, ...fields] = row;
        const options = fields.filter(Boolean);
        if (row.length !== 9 || !question || explanation.length < 20 || options.length < 2 || new Set(options).size !== options.length || !/^[1-5]$/.test(correct) || Number(correct) > options.length) throw new Error(`${quiz.path}:${i + 1}: pregunta u opciones inválidas`);
        if (allQuestions.has(question)) throw new Error(`${quiz.path}:${i + 1}: enunciado duplicado`);
        allQuestions.add(question);
        checkReference(reference);
        for (const match of explanation.matchAll(/Referencia:\s+([a-z0-9/-]+#[a-z0-9-]+)/g)) checkReference(match[1]);
        total++;
      }
    }
  }
  const practices = subject.units.filter(u => u.id.startsWith('practicas-'));
  if (practices.some(u => quizzes.some(q => q.subject === subject.id && q.unitId === u.id))) throw new Error('Se han incluido cuestionarios de prácticas');
  return { units: targets.length, tests: targets.length * 3, questions: total };
}
