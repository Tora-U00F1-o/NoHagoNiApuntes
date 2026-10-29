/* Historial compartido por el lector, los cuestionarios y sus ventanas. */
const navigation = {
  version: 0,
  entry: null,
  url: '',
  document: '',
  sessions: new Map(),
  entries: new Map()
};

const QUIZ_HISTORY_FIELDS = ['activeQuiz', 'activeQuestions', 'currentIndex', 'userAnswers',
  'checkedQuestions', 'mode', 'timerSeconds', 'isFinished', 'isReviewOnlyFailed', 'sessionId'];
const SCROLL_AREAS = ['viewSubjectsDashboard', 'mainScrollArea', 'quizScrollArea',
  'quickNotesScrollArea', 'quizModalCardsList'];

function snapshotQuiz() {
  if (!quizState.activeQuiz) return null;
  return structuredClone(Object.fromEntries(QUIZ_HISTORY_FIELDS.map(key => [key, quizState[key]])));
}

function captureNavigationEntry() {
  if (!navigation.entry) return;
  navigation.entry.scroll = Object.fromEntries(SCROLL_AREAS.map(id => [id, document.getElementById(id)?.scrollTop || 0]));
  const params = new URL(navigation.url).searchParams;
  if (params.has('cuestionario') || params.has('quiz')) {
    navigation.entry.quiz = snapshotQuiz();
    if (navigation.entry.quiz) navigation.sessions.set(quizState.sessionId, navigation.entry.quiz);
  }
  if (params.has('tests')) {
    navigation.entry.hub = Object.fromEntries(['quizSearch', 'quizSubjectFilter', 'quizUnitFilter',
      'quizDifficultyFilter'].map(id => [id, document.getElementById(id)?.value || '']));
  }
  navigation.entries.set(navigation.entry.id, navigation.entry);
  // En popstate, la URL ya pertenece al destino: solo guardamos la entrada saliente en memoria.
  if (location.href === navigation.url) history.replaceState(navigation.entry, '', navigation.url);
}

async function navigateApp(target, { replace = false, quiz = null, force = false } = {}) {
  const url = new URL(target, location.href);
  if (!force && url.href === navigation.url) return;
  captureNavigationEntry();
  const entry = { appNavigation: true, id: crypto.randomUUID(), quiz, scroll: {} };
  // Las ventanas conservan la posición y sesión de la pantalla sobre la que se abren.
  const previous = new URL(navigation.url || location.href);
  if (baseNavigationKey(previous) === baseNavigationKey(url)) {
    entry.scroll = { ...navigation.entry?.scroll };
    entry.quiz ||= navigation.entry?.quiz;
  }
  if (previous.searchParams.get('referencia') !== url.searchParams.get('referencia')) delete entry.scroll.quickNotesScrollArea;
  if (!previous.searchParams.has('tests')) delete entry.scroll.quizModalCardsList;
  entry.parent = !replace ? navigation.entry?.id : null;
  history[replace ? 'replaceState' : 'pushState'](entry, '', url);
  return restoreNavigation(entry);
}

function baseNavigationKey(url) {
  const copy = new URL(url);
  for (const key of ['tests', 'materia', 'unidad', 'referencia']) copy.searchParams.delete(key);
  return copy.pathname + copy.search + copy.hash;
}

function closeNavigationOverlay(keys) {
  const url = new URL(location.href);
  if (!keys.some(key => url.searchParams.has(key))) return;
  if (navigation.entry?.parent) {
    history.back();
  } else {
    keys.forEach(key => url.searchParams.delete(key));
    return navigateApp(url, { replace: true });
  }
}

async function restoreNavigation(entry) {
  const version = ++navigation.version;
  ++state.unitLoadVersion;
  navigation.entry = entry?.appNavigation ? entry : { appNavigation: true, id: crypto.randomUUID(), scroll: {} };
  navigation.url = location.href;
  const url = new URL(navigation.url);
  const params = url.searchParams;
  stopTimer();
  closeQuizModal({ renderOnly: true });
  closeQuickNotes({ renderOnly: true });
  $('#mobileTocModal')?.classList.add('hidden');
  $('#mobileTocModal')?.classList.remove('flex');
  toggleSidebar(false);

  try {
    const quizId = params.get('cuestionario') || params.get('quiz');
    if (quizId) {
      navigation.document = '';
      let saved = navigation.entry.quiz;
      if (!saved || saved.activeQuiz.metadata.id !== quizId) {
        await loadQuestionnairesCatalog();
        if (version !== navigation.version) return;
        const loaded = await startQuizFromCatalog(quizId, { renderOnly: true, version });
        if (version !== navigation.version) return;
        if (!loaded) throw new Error('No se pudo abrir el cuestionario.');
      } else {
        const latest = navigation.sessions.get(saved.sessionId);
        Object.assign(quizState, structuredClone(latest || saved), {
          currentIndex: saved.currentIndex, isFinished: saved.isFinished
        });
      }
      const question = Number(params.get('pregunta'));
      if (Number.isInteger(question) && question >= 1 && question <= quizState.activeQuestions.length) {
        quizState.currentIndex = question - 1;
      }
      quizState.isFinished = params.get('resultado') === '1';
      showQuizView();
      if (quizState.isFinished) finishQuiz({ renderOnly: true });
      else {
        renderCurrentQuestion();
        startTimer({ reset: false });
      }
      navigation.document = '';
    } else if (params.get('u')) {
      const [subjectId, unitId] = params.get('u').split('/');
      let documentKey = `${subjectId}/${unitId || ''}:${params.get('vista') || ''}`;
      if (navigation.document !== documentKey) {
        navigation.document = '';
        await selectSubject(subjectId, unitId, params.get('vista') === 'resumen',
          params.get('vista') === 'examen', '', { renderOnly: true, version });
        if (version !== navigation.version) return;
        // Canonizar también los accesos a una asignatura sin unidad o a una vista opcional inexistente.
        params.set('u', `${state.currentSubject.id}/${state.currentUnit.id}`);
        if (state.showingExam) params.set('vista', 'examen');
        else if (state.showingSummary) params.set('vista', 'resumen');
        else params.delete('vista');
        documentKey = `${params.get('u')}:${params.get('vista') || ''}`;
        navigation.url = url.href;
        history.replaceState(navigation.entry, '', url);
        navigation.document = documentKey;
      }
      $('#viewSubjectsDashboard').classList.add('hidden');
      $('#viewQuizPage').classList.add('hidden');
      $('#viewQuizPage').classList.remove('flex');
      $('#viewStudyViewer').classList.remove('hidden');
      $('#viewStudyViewer').classList.add('flex');
    } else {
      goToSubjectsDashboard({ renderOnly: true });
      navigation.document = '';
    }

    if (version !== navigation.version) return;
    if (params.has('tests')) {
      await openQuizHub(params.get('materia') || '', params.get('unidad') || '', {
        renderOnly: true, version, filters: navigation.entry.hub
      });
    }
    if (version !== navigation.version) return;
    if (params.get('referencia')) await openQuickNotes(params.get('referencia'), { renderOnly: true, version });
    if (version !== navigation.version) return;

    const positions = navigation.entry.scroll || {};
    for (const id of SCROLL_AREAS) {
      const el = document.getElementById(id);
      if (el && (id !== 'quickNotesScrollArea' || positions[id] !== undefined)) {
        el.scrollTo({ top: positions[id] || 0, behavior: 'instant' });
      }
    }
    if (url.hash && positions.mainScrollArea === undefined) {
      let anchor = url.hash.slice(1);
      try { anchor = decodeURIComponent(anchor); } catch {}
      document.getElementById(anchor)?.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    if (quizId) navigation.entry.quiz = snapshotQuiz();
    history.replaceState(navigation.entry, '', location.href);
  } catch (error) {
    if (version !== navigation.version) return;
    console.error('Error de navegación:', error);
    showToast('No se pudo abrir este destino. Puedes volver atrás o elegir otro contenido.');
  }
}

function navigateQuizState(changes = {}, { newSession = false } = {}) {
  const quiz = snapshotQuiz();
  if (!quiz) return;
  Object.assign(quiz, changes);
  if (newSession) quiz.sessionId = crypto.randomUUID();
  const url = new URL(location.pathname, location.href);
  url.searchParams.set('cuestionario', quiz.activeQuiz.metadata.id);
  if (quiz.currentIndex) url.searchParams.set('pregunta', quiz.currentIndex + 1);
  if (quiz.isFinished) url.searchParams.set('resultado', '1');
  return navigateApp(url, { quiz, force: newSession });
}

function initializeNavigation() {
  history.scrollRestoration = 'manual';
  window.addEventListener('popstate', event => {
    captureNavigationEntry();
    // El último estado de scroll se conserva incluso si el navegador ya cambió de entrada.
    return restoreNavigation(navigation.entries.get(event.state?.id) || event.state);
  });
  window.addEventListener('pagehide', captureNavigationEntry);
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname) return;
    if (!href.startsWith('#') && !['u', 'cuestionario', 'quiz'].some(key => url.searchParams.has(key))) return;
    event.preventDefault();
    navigateApp(url);
  });
  return restoreNavigation(history.state);
}
