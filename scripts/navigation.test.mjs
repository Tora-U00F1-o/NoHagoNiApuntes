import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import vm from 'node:vm';

const sources = await Promise.all(['quiz.js', 'navigation.js', 'app.js'].map(name =>
  readFile(new URL(`../src/${name}`, import.meta.url), 'utf8')));

async function createApp(initial = 'https://example.test/apuntes/') {
  let currentURL = new URL(initial);
  const listeners = new Map(), elements = new Map(), timers = new Set(), blocked = new Map();
  const on = (type, listener) => listeners.set(type, [...(listeners.get(type) || []), listener]);
  function element(id) {
    if (elements.has(id)) return elements.get(id);
    const classes = new Set();
    const el = {
      id, value: '', textContent: '', innerHTML: '', style: {}, scrollTop: 0, isConnected: true,
      classList: { add: (...names) => names.forEach(name => classes.add(name)),
        remove: (...names) => names.forEach(name => classes.delete(name)),
        contains: name => classes.has(name), toggle(name, force = !classes.has(name)) {
          if (force) classes.add(name); else classes.delete(name);
        } },
      querySelectorAll: () => [], appendChild() {}, setAttribute() {}, addEventListener() {},
      closest: () => null, focus() {}, scrollTo({ top }) { this.scrollTop = top; },
      scrollIntoView() { element('mainScrollArea').scrollTop = 800; }
    };
    elements.set(id, el);
    return el;
  }
  const location = {
    get href() { return currentURL.href; }, get pathname() { return currentURL.pathname; },
    get search() { return currentURL.search; }, get hash() { return currentURL.hash; },
    get origin() { return currentURL.origin; }
  };
  const entries = [{ url: initial, state: null }];
  let index = 0;
  const history = {
    get state() { return structuredClone(entries[index].state); },
    get length() { return entries.length; },
    pushState(state, _, url) {
      currentURL = new URL(url, currentURL);
      entries.splice(++index, entries.length, { url: currentURL.href, state: structuredClone(state) });
    },
    replaceState(state, _, url) {
      currentURL = new URL(url, currentURL);
      entries[index] = { url: currentURL.href, state: structuredClone(state) };
    },
    async go(delta) {
      const target = index + delta;
      if (target < 0 || target >= entries.length) return;
      index = target;
      currentURL = new URL(entries[index].url);
      await Promise.all((listeners.get('popstate') || []).map(fn => fn({ state: this.state })));
    },
    back() { return this.go(-1); }, forward() { return this.go(1); }
  };
  const units = ['one', 'two'].map((id, i) => ({ id, title: `Unidad ${id}`, number: i + 1,
    path: `contenido/subject/${id}.md`, summaryPath: `contenido/subject/${id}-summary.md`,
    examPath: `contenido/subject/${id}-exam.md`, hasTests: true }));
  const catalog = [{ id: 'quiz-one', filename: 'test.csv', path: 'contenido/test.csv',
    subject: 'subject', subjectTitle: 'Asignatura', unitId: 'one', title: 'Test' }];
  const csv = 'pregunta,correcta,opcion_1,opcion_2\nUno,1,Sí,No\nDos,2,Sí,No\nTres,1,Sí,No\n';
  const notices = [];
  const context = vm.createContext({
    URL, URLSearchParams, structuredClone, crypto: { randomUUID }, location, history,
    console: { ...console, error: (...args) => notices.push(args) },
    alert: message => notices.push(message),
    localStorage: { getItem: () => null, setItem() {} },
    setInterval: () => { const id = randomUUID(); timers.add(id); return id; },
    clearInterval: id => timers.delete(id), setTimeout: () => 1,
    window: { addEventListener: on, innerWidth: 1200, marked: { parse: text => text } },
    lucide: { createIcons() {} },
    document: { readyState: 'loading', baseURI: 'https://example.test/apuntes/',
      activeElement: element('opener'), addEventListener: on, getElementById: element,
      querySelector: selector => element(selector.replace(/^#/, '')),
      querySelectorAll: () => [], createElement: () => element(randomUUID()) },
    async fetch(input) {
      const path = new URL(input, currentURL).pathname;
      if (blocked.has(path)) await blocked.get(path).promise;
      const json = path.endsWith('catalogo.json') ? { subjects: [{ id: 'subject', title: 'Asignatura', count: 2 }] }
        : path.endsWith('subject.json') ? { id: 'subject', title: 'Asignatura', units,
          tree: units.map(unit => ({ type: 'unit', id: unit.id })) } : catalog;
      return { ok: true, json: async () => json, text: async () => path.endsWith('.csv') ? csv : `## ${path}` };
    }
  });
  sources.forEach(source => vm.runInContext(source, context));
  const run = code => vm.runInContext(code, context);
  await run('loadApplicationCatalog()');
  await run('initializeNavigation()');
  return { run, element, history, location, timers, notices,
    block(path) {
      let release;
      const promise = new Promise(resolve => { release = resolve; });
      blocked.set('/apuntes/' + path, { promise });
      return release;
    } };
}

test('atrás y adelante recorren materias, unidades, resumen y examen sin añadir entradas al restaurar', async () => {
  const app = await createApp();
  await app.run("selectSubject('subject')");
  assert.equal(new URL(app.location.href).searchParams.get('u'), 'subject/one');
  await app.run('toggleUnitSummary()');
  await app.run('toggleUnitExam()');
  await app.run("handleUnitClick('two')");
  const length = app.history.length;
  await app.history.back();
  assert.equal(app.run('state.showingExam'), true);
  await app.history.back();
  assert.equal(app.run('state.showingSummary'), true);
  await app.history.forward();
  assert.equal(app.run('state.showingExam'), true);
  assert.equal(app.history.length, length);
  assert.deepEqual(app.notices, []);
});

test('los apartados tienen historial, restauran el scroll y no duplican el mismo destino', async () => {
  const app = await createApp();
  await app.run("selectSubject('subject', 'one')");
  app.element('mainScrollArea').scrollTop = 315;
  await app.run("smoothScrollTo('seccion')");
  assert.equal(app.element('mainScrollArea').scrollTop, 800);
  const length = app.history.length;
  await app.run("smoothScrollTo('seccion')");
  assert.equal(app.history.length, length);
  await app.history.back();
  assert.equal(app.element('mainScrollArea').scrollTop, 315);
  await app.history.forward();
  assert.equal(app.element('mainScrollArea').scrollTop, 800);
});

test('volver al selector conserva sus filtros y cerrar permite reabrir con adelante', async () => {
  const app = await createApp();
  await app.run("openQuizHub('subject', 'one')");
  app.element('quizSearch').value = 'búsqueda';
  app.element('quizDifficultyFilter').value = 'facil';
  await app.run("startQuizFromCatalog('quiz-one')");
  await app.history.back();
  assert.equal(app.element('quizSearch').value, 'búsqueda');
  assert.equal(app.element('quizDifficultyFilter').value, 'facil');
  assert.equal(app.element('quizSelectModal').classList.contains('hidden'), false);
  await app.run('closeQuizModal()');
  assert.equal(app.element('quizSelectModal').classList.contains('hidden'), true);
  await app.history.forward();
  assert.equal(app.element('quizSelectModal').classList.contains('hidden'), false);
});

test('elegir un apartado cierra el índice móvil incluso si ya es la URL actual', async () => {
  const app = await createApp();
  await app.run("selectSubject('subject', 'one')");
  await app.run("smoothScrollTo('seccion')");
  app.run('toggleMobileToc()');
  assert.equal(app.element('mobileTocModal').classList.contains('hidden'), false);
  await app.run("smoothScrollTo('seccion')");
  assert.equal(app.element('mobileTocModal').classList.contains('hidden'), true);
});

test('atrás cierra los apuntes relacionados y adelante recupera su scroll y las respuestas', async () => {
  const app = await createApp();
  await app.run("startQuizFromCatalog('quiz-one')");
  app.run('selectOption(0)');
  await app.run("openQuickNotes('subject/one')");
  app.element('quickNotesScrollArea').scrollTop = 425;
  await app.history.back();
  assert.equal(app.element('quickNotesModal').classList.contains('hidden'), true);
  await app.history.forward();
  assert.equal(app.element('quickNotesModal').classList.contains('hidden'), false);
  assert.equal(app.element('quickNotesScrollArea').scrollTop, 425);
  assert.equal(app.run('quizState.userAnswers[1][0]'), 0);
  assert.deepEqual(app.notices, []);
});

test('las preguntas y resultados conservan respuestas, correcciones, modo y tiempo al recorrer el historial', async () => {
  const app = await createApp();
  await app.run("startQuizFromCatalog('quiz-one')");
  app.run("selectOption(0); checkCurrentAnswer(); setQuizMode('exam'); quizState.timerSeconds = 42");
  await app.run('navigateQuizQuestion(1)');
  app.run('selectOption(1)');
  await app.history.back();
  assert.equal(app.run('quizState.currentIndex'), 0);
  assert.equal(app.run('quizState.userAnswers[2][0]'), 1);
  assert.equal(app.run('quizState.checkedQuestions[1]'), true);
  assert.equal(app.run('quizState.timerSeconds'), 42);
  assert.equal(app.run('quizState.mode'), 'exam');
  await app.history.forward();
  assert.equal(app.run('quizState.currentIndex'), 1);
  await app.run('finishQuiz()');
  assert.equal(app.run('quizState.isFinished'), true);
  assert.equal(app.timers.size, 0);
  await app.history.back();
  assert.equal(app.run('quizState.isFinished'), false);
  assert.equal(app.timers.size, 1);
  await app.history.forward();
  assert.equal(app.element('quizResultsContainer').classList.contains('hidden'), false);
  assert.equal(app.timers.size, 0);
  assert.deepEqual(app.notices, []);
});

test('reiniciar y repasar falladas crean sesiones que permiten regresar al resultado anterior', async () => {
  const app = await createApp();
  await app.run("startQuizFromCatalog('quiz-one')");
  app.run('selectOption(0)');
  await app.run('finishQuiz()');
  await app.run('restartQuizFull()');
  assert.equal(app.run('Object.keys(quizState.userAnswers).length'), 0);
  await app.history.back();
  assert.equal(app.run('quizState.isFinished'), true);
  assert.equal(app.run('quizState.userAnswers[1][0]'), 0);
  await app.run('retryFailedQuestions(quizState.activeQuestions.slice(1))');
  assert.equal(app.run('quizState.activeQuestions.length'), 2);
  await app.history.back();
  assert.equal(app.run('quizState.activeQuestions.length'), 3);
  assert.equal(app.run('quizState.isFinished'), true);
});

test('se recuperan cuestionarios CSV locales al salir y volver, sin recargar el archivo', async () => {
  const app = await createApp();
  await app.run("initQuizSession(parseQuizCSV('pregunta,correcta,opcion_1,opcion_2\\nLocal,1,Sí,No'), { id: 'custom-local' })");
  app.run('selectOption(0)');
  await app.run('exitQuizToDashboard()');
  assert.equal(app.timers.size, 0);
  await app.history.back();
  assert.equal(app.run('quizState.activeQuiz.metadata.id'), 'custom-local');
  assert.equal(app.run('quizState.userAnswers[1][0]'), 0);
  assert.deepEqual(app.notices, []);
});

test('una carga lenta no sobrescribe la unidad a la que se vuelve atrás', async () => {
  const app = await createApp();
  await app.run("selectSubject('subject', 'one')");
  const release = app.block('contenido/subject/two.md');
  const pending = app.run("handleUnitClick('two')");
  await new Promise(resolve => setImmediate(resolve));
  await app.history.back();
  release();
  await pending;
  assert.equal(app.run('state.currentUnit.id'), 'one');
  assert.match(app.element('articleContent').innerHTML, /one\.md/);
  assert.equal(app.element('lessonTitle').textContent, 'Unidad one');
  assert.deepEqual(app.notices, []);
});

test('los enlaces directos antiguos a cuestionarios admiten atrás y adelante', async () => {
  const app = await createApp('https://example.test/apuntes/?quiz=quiz-one&pregunta=2');
  assert.equal(app.run('quizState.currentIndex'), 1);
  app.run('selectOption(1)');
  await app.run('goToSubjectsDashboard()');
  await app.history.back();
  assert.equal(app.run('quizState.currentIndex'), 1);
  assert.equal(app.run('quizState.userAnswers[2][0]'), 1);
  assert.deepEqual(app.notices, []);
});
