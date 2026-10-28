/**
 * ============================================================================
 * MOTOR DE CUESTIONARIOS INTERACTIVOS Y PARSER CSV DINÁMICO
 * Soporta número variable de opciones por pregunta (2 a N opciones)
 * Soporta referencias opcionales a apuntes con popup de lectura in situ
 * Modos: Estudio (retroalimentación inmediata) y Examen (calificación final)
 * ============================================================================
 */

// Estado global de cuestionarios
const quizState = {
  catalog: [],
  activeQuiz: null,
  activeQuestions: [], // Lista activa (puede ser filtrada para repaso de falladas)
  currentIndex: 0,
  userAnswers: {}, // { [questionId]: [selectedIndex1, ...] }
  checkedQuestions: {}, // { [questionId]: boolean } en modo estudio
  mode: 'study', // 'study' | 'exam'
  timerSeconds: 0,
  timerInterval: null,
  isFinished: false,
  isReviewOnlyFailed: false,
  subjectsCache: {} // Cache de catálogos de asignaturas para resolución rápida de apuntes
};

// Cuestionarios por defecto en caso de fallback si fetch() no estuviera disponible (ej. file://)
const FALLBACK_QUIZ_CATALOG = [
  {
    id: 'sew-tecnologias-xml',
    filename: 'sew-tecnologias-xml.csv',
    path: 'contenido/cuestionarios/sew-tecnologias-xml.csv',
    title: 'Software y Estándares Web - XML y Tecnologías Web',
    subject: 'software-y-estándares-para-la-web',
    subjectTitle: 'Software y Estándares para la Web',
    description: 'Cuestionario de autoevaluación con número dinámico de opciones sobre XML, DTD, XPath y CSS.',
    questionsCount: 8,
    timeMinutes: 15,
    optionsRange: '2-5'
  },
  {
    id: 'ri-jdbc-transacciones',
    filename: 'ri-jdbc-transacciones.csv',
    path: 'contenido/cuestionarios/ri-jdbc-transacciones.csv',
    title: 'Repositorios de Información - JDBC y Transacciones',
    subject: 'repositorios-de-información',
    subjectTitle: 'Repositorios de Información',
    description: 'Cuestionario sobre acceso a datos mediante JDBC, propiedades ACID y control de concurrencia.',
    questionsCount: 7,
    timeMinutes: 20,
    optionsRange: '2-5'
  },
  {
    id: 'ejemplo-variable-respuestas',
    filename: 'ejemplo-variable-respuestas.csv',
    path: 'contenido/cuestionarios/ejemplo-variable-respuestas.csv',
    title: 'Demo - Cuestionario con Opciones Variables (2 a 6 respuestas)',
    subject: 'demostración-del-sistema',
    subjectTitle: 'Demostración del Sistema',
    description: 'Cuestionario de prueba que demuestra preguntas con 2, 3, 4, 5 y 6 respuestas posibles parseadas dinámicamente.',
    questionsCount: 5,
    timeMinutes: 10,
    optionsRange: '2-6'
  }
];

/* ==========================================================================
   PARSER CSV DINÁMICO (RFC 4180 COMPATIBLE)
   ========================================================================== */

/**
 * Parsea un contenido CSV delimitado por coma (,) o punto y coma (;).
 * Extrae metadatos con '#', analiza cabeceras y lee dinámicamente:
 * - Tantas opciones como tenga cada pregunta específica.
 * - Referencia opcional a unidades de los apuntes.
 */
function parseQuizCSV(text, filename = 'cuestionario.csv') {
  if (!text || typeof text !== 'string') {
    throw new Error('El archivo CSV está vacío o no es un texto válido.');
  }

  // Quitar BOM UTF-8 si existe
  if (text.charCodeAt(0) === 0xFEFF) {
    text = text.slice(1);
  }

  // Tokenización completa con soporte de comillas dobles y saltos de línea internos
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;

  // Detección automática del delimitador analizando la primera línea no de comentario
  let delimiter = ',';
  const sampleLine = text.split(/\r?\n/).find(l => l.trim() && !l.trim().startsWith('#')) || '';
  if (sampleLine.includes(';') && (sampleLine.split(';').length > sampleLine.split(',').length)) {
    delimiter = ';';
  }

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        currentField += '"';
        i++; // Saltar comilla escapada
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === delimiter && !inQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && text[i + 1] === '\n') {
        i++; // Manejar CRLF
      }
      currentRow.push(currentField.trim());
      if (currentRow.some(f => f.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += c;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some(f => f.length > 0)) {
      rows.push(currentRow);
    }
  }

  // Extraer metadatos de comentarios (# titulo: ..., # tiempo: ...)
  const metadata = {
    titulo: filename.replace(/\.csv$/i, '').replace(/[-_]/g, ' '),
    asignatura: 'General',
    descripcion: 'Cuestionario de autoevaluación',
    tiempo: 15
  };
  metadata.titulo = metadata.titulo.charAt(0).toUpperCase() + metadata.titulo.slice(1);

  const dataRows = [];
  for (const row of rows) {
    const firstCell = row[0] || '';
    if (firstCell.startsWith('#')) {
      const line = row.join(delimiter);
      const m = /^#\s*([a-zA-Z_]+)\s*:\s*(.+)$/.exec(line);
      if (m) {
        const key = m[1].toLowerCase();
        const val = m[2].trim();
        if (key === 'titulo' || key === 'title') metadata.titulo = val;
        if (key === 'asignatura' || key === 'subject') metadata.asignatura = val;
        if (key === 'descripcion' || key === 'description') metadata.descripcion = val;
        if (key === 'tiempo' || key === 'time') metadata.tiempo = parseInt(val, 10) || 15;
      }
      continue;
    }
    dataRows.push(row);
  }

  if (dataRows.length === 0) {
    throw new Error('El archivo CSV no contiene preguntas evaluables.');
  }

  // Detectar cabecera
  const first = dataRows[0];
  const isHeader = /^(pregunta|question)$/i.test(first[0]) && /^(correcta|correct|respuesta)$/i.test(first[1]);
  const contentRows = isHeader ? dataRows.slice(1) : dataRows;

  // Analizar columnas especiales: explicacion y referencia
  let explIndex = -1;
  let refIndex = -1;

  if (isHeader) {
    first.forEach((col, idx) => {
      const clean = col.toLowerCase().trim();
      if (/^(explicacion|feedback|retroalimentacion|justificacion|ayuda)$/i.test(clean)) {
        explIndex = idx;
      } else if (/^(referencia|apuntes|unidad|ref|referencia_apuntes)$/i.test(clean)) {
        refIndex = idx;
      }
    });
  } else {
    // Sin cabecera: por defecto col 2 es explicacion
    explIndex = 2;
  }

  // Calcular índice donde comienzan las opciones de respuesta
  let optStartIndex = 2;
  if (explIndex !== -1) optStartIndex = Math.max(optStartIndex, explIndex + 1);
  if (refIndex !== -1) optStartIndex = Math.max(optStartIndex, refIndex + 1);

  // Construir las preguntas de forma dinámica
  const questions = [];
  contentRows.forEach((row, idx) => {
    const questionText = row[0] || '';
    if (!questionText.trim()) return;

    const correctRaw = row[1] || '1';
    let explanation = explIndex !== -1 ? (row[explIndex] || '') : '';
    let reference = refIndex !== -1 ? (row[refIndex] || '') : '';

    // Si no hay columna de referencia dedicada, comprobar si viene indicada en la explicación: [ref: ...] o [apuntes: ...]
    if (!reference && explanation) {
      const refMatch = /\[(?:ref|apuntes|referencia):\s*([^\]]+)\]/i.exec(explanation);
      if (refMatch) {
        reference = refMatch[1].trim();
        explanation = explanation.replace(refMatch[0], '').trim();
      }
    }

    // FILTRADO DINÁMICO DE OPCIONES:
    // Toma todas las columnas posteriores y filtra las que estén vacías
    const rawOptions = row.slice(optStartIndex).filter(opt => opt !== '' && opt !== undefined);

    if (rawOptions.length < 2) {
      console.warn(`Pregunta #${idx + 1} tiene menos de 2 opciones disponibles. Se omitirá.`);
      return;
    }

    // Parsea los índices de respuestas correctas
    const correctIndices = [];
    const parts = correctRaw.split(/[,/]/).map(s => s.trim());
    for (const p of parts) {
      if (/^\d+$/.test(p)) {
        correctIndices.push(parseInt(p, 10) - 1);
      } else if (/^[A-Za-z]$/.test(p)) {
        correctIndices.push(p.toUpperCase().charCodeAt(0) - 65);
      } else {
        const found = rawOptions.findIndex(o => o.toLowerCase() === p.toLowerCase());
        if (found !== -1) correctIndices.push(found);
      }
    }

    if (correctIndices.length === 0) {
      correctIndices.push(0);
    }

    questions.push({
      id: idx + 1,
      question: questionText,
      correctIndices,
      explanation,
      reference: reference.trim(),
      options: rawOptions,
      optionsCount: rawOptions.length
    });
  });

  if (questions.length === 0) {
    throw new Error('No se encontraron preguntas válidas con al menos 2 opciones.');
  }

  return {
    metadata,
    delimiter,
    questions
  };
}

/* ==========================================================================
   CARGA DE CATÁLOGO Y COMUNICACIÓN CON EL SERVIDOR
   ========================================================================== */

/**
 * Carga el catálogo de cuestionarios desde contenido/cuestionarios/index.json
 */
async function loadQuestionnairesCatalog() {
  try {
    const res = await fetch('contenido/cuestionarios/index.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    quizState.catalog = Array.isArray(data) && data.length > 0 ? data : FALLBACK_QUIZ_CATALOG;
  } catch (err) {
    console.warn('Usando catálogo local de contingencia para cuestionarios:', err);
    quizState.catalog = FALLBACK_QUIZ_CATALOG;
  }
  return quizState.catalog;
}

/**
 * Abre el Hub / Modal con la lista de cuestionarios CSV disponibles
 */
async function openQuizHub() {
  const modal = $('#quizSelectModal');
  if (!modal) return;

  await loadQuestionnairesCatalog();
  renderQuizModalList();

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  if (window.lucide) lucide.createIcons();
}

/**
 * Cierra el modal de selección de cuestionarios
 */
function closeQuizModal() {
  const modal = $('#quizSelectModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

/**
 * Renderiza la lista de cuestionarios dentro del modal
 */
function renderQuizModalList() {
  const container = $('#quizModalCardsList');
  if (!container) return;

  if (!quizState.catalog || quizState.catalog.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
        <i data-lucide="folder-x" class="w-10 h-10 mx-auto mb-2 text-slate-400"></i>
        No se encontraron archivos .csv en <code>contenido/cuestionarios/</code>.
      </div>
    `;
    return;
  }

  container.innerHTML = quizState.catalog.map(quiz => `
    <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/5 transition-all group flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300">
            ${quiz.subjectTitle || 'Asignatura'}
          </span>
          <span class="text-xs text-slate-400 flex items-center gap-1 font-medium">
            <i data-lucide="clock" class="w-3 h-3"></i> ${quiz.timeMinutes || 15} min
          </span>
        </div>
        <h4 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-1.5 leading-snug">
          ${quiz.title}
        </h4>
        <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
          ${quiz.description || 'Cuestionario de autoevaluación interactivo.'}
        </p>
      </div>

      <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <div class="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <i data-lucide="help-circle" class="w-3.5 h-3.5 text-cyan-500"></i>
          <span><strong>${quiz.questionsCount || '?'}</strong> preguntas</span>
          <span class="text-slate-300 dark:text-slate-700">•</span>
          <span class="font-mono text-[10px] text-slate-400">${quiz.filename}</span>
        </div>
        <button onclick="startQuizFromCatalog('${quiz.id}')" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-600 text-white text-xs font-semibold shadow-md shadow-cyan-600/20 hover:opacity-95 active:scale-95 transition-all flex items-center gap-1">
          <span>Hacer test</span>
          <i data-lucide="arrow-right" class="w-3 h-3"></i>
        </button>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   CARGA Y ARRANQUE DE UN CUESTIONARIO
   ========================================================================== */

/**
 * Carga un cuestionario desde el catálogo por su id
 */
async function startQuizFromCatalog(quizId) {
  const item = quizState.catalog.find(q => q.id === quizId) || FALLBACK_QUIZ_CATALOG.find(q => q.id === quizId);
  if (!item) {
    alert('No se encontró el cuestionario seleccionado.');
    return;
  }

  closeQuizModal();

  try {
    const res = await fetch(item.path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const csvText = await res.text();
    const parsed = parseQuizCSV(csvText, item.filename);
    initQuizSession(parsed, item);
  } catch (err) {
    console.error('Error al cargar archivo CSV:', err);
    alert(`No se pudo cargar el archivo ${item.filename}: ${err.message}`);
  }
}

/**
 * Carga un archivo CSV personalizado desde el selector de archivos local
 */
function handleCustomCsvUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const csvText = e.target.result;
      const parsed = parseQuizCSV(csvText, file.name);
      closeQuizModal();
      initQuizSession(parsed, {
        id: 'custom-' + Date.now(),
        filename: file.name,
        title: parsed.metadata.titulo,
        subjectTitle: parsed.metadata.asignatura,
        description: parsed.metadata.descripcion,
        timeMinutes: parsed.metadata.tiempo
      });
      event.target.value = '';
    } catch (err) {
      alert(`Error al procesar el archivo CSV: ${err.message}`);
    }
  };
  reader.onerror = function() {
    alert('Error al leer el archivo desde el disco.');
  };
  reader.readAsText(file, 'UTF-8');
}

/**
 * Inicializa la sesión del cuestionario en pantalla
 */
function initQuizSession(parsedData, meta) {
  quizState.activeQuiz = {
    metadata: { ...parsedData.metadata, ...meta },
    questions: parsedData.questions
  };
  quizState.activeQuestions = [...parsedData.questions];
  quizState.currentIndex = 0;
  quizState.userAnswers = {};
  quizState.checkedQuestions = {};
  quizState.isFinished = false;
  quizState.isReviewOnlyFailed = false;

  showQuizView();
  startTimer();
  renderCurrentQuestion();

  const newUrl = `?cuestionario=${encodeURIComponent(meta.id || 'test')}`;
  history.replaceState(null, '', newUrl);
}

/**
 * Transición hacia la Vista del Cuestionario
 */
function showQuizView() {
  $('#viewSubjectsDashboard').classList.add('hidden');
  $('#viewStudyViewer').classList.remove('flex');
  $('#viewStudyViewer').classList.add('hidden');

  const quizView = $('#viewQuizPage');
  quizView.classList.remove('hidden');
  quizView.classList.add('flex');

  $('#quizActiveContainer').classList.remove('hidden');
  $('#quizResultsContainer').classList.add('hidden');

  const meta = quizState.activeQuiz.metadata;
  $('#quizHeaderTitle').textContent = meta.titulo || 'Cuestionario';
  $('#quizHeaderSubject').textContent = meta.asignatura || 'Autoevaluación';

  updateQuizModeUI();

  if (window.lucide) lucide.createIcons();
}

/**
 * Salir del cuestionario y volver al Dashboard principal
 */
function exitQuizToDashboard() {
  stopTimer();
  $('#viewQuizPage').classList.remove('flex');
  $('#viewQuizPage').classList.add('hidden');
  $('#viewSubjectsDashboard').classList.remove('hidden');
  history.replaceState(null, '', location.pathname);
  if (typeof renderDashboardSubjects === 'function') renderDashboardSubjects();
  if (typeof renderRecentsSection === 'function') renderRecentsSection();
}

/* ==========================================================================
   TEMPORIZADOR Y CONTROL DE TIEMPO
   ========================================================================== */

function startTimer() {
  stopTimer();
  quizState.timerSeconds = 0;
  updateTimerDisplay();
  quizState.timerInterval = setInterval(() => {
    quizState.timerSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  if (quizState.timerInterval) {
    clearInterval(quizState.timerInterval);
    quizState.timerInterval = null;
  }
}

function updateTimerDisplay() {
  const el = $('#quizTimerDisplay');
  if (!el) return;
  const m = Math.floor(quizState.timerSeconds / 60);
  const s = quizState.timerSeconds % 60;
  el.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

/* ==========================================================================
   SELECTOR DE MODO (ESTUDIO VS EXAMEN)
   ========================================================================== */

function setQuizMode(newMode) {
  if (quizState.mode === newMode) return;
  quizState.mode = newMode;
  updateQuizModeUI();
  renderCurrentQuestion();
}

function updateQuizModeUI() {
  const btnStudy = $('#btnQuizModeStudy');
  const btnExam = $('#btnQuizModeExam');
  if (!btnStudy || !btnExam) return;

  if (quizState.mode === 'study') {
    btnStudy.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-700 text-cyan-700 dark:text-cyan-300 shadow-sm transition-all flex items-center gap-1';
    btnExam.className = 'px-2.5 py-1 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all flex items-center gap-1';
  } else {
    btnExam.className = 'px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-700 text-cyan-700 dark:text-cyan-300 shadow-sm transition-all flex items-center gap-1';
    btnStudy.className = 'px-2.5 py-1 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all flex items-center gap-1';
  }
}

/* ==========================================================================
   RENDERIZADO DE LA PREGUNTA ACTIVA (CON NÚMERO VARIABLE DE OPCIONES)
   ========================================================================== */

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

function renderCurrentQuestion() {
  const questions = quizState.activeQuestions;
  const total = questions.length;
  if (total === 0) return;

  const current = questions[quizState.currentIndex];
  const qId = current.id;
  const selectedOpts = quizState.userAnswers[qId] || [];
  const isChecked = Boolean(quizState.checkedQuestions[qId]);

  // Barra de progreso y badges
  const progressPercent = Math.round(((quizState.currentIndex + 1) / total) * 100);
  $('#quizProgressBar').style.width = `${progressPercent}%`;
  $('#quizQuestionCounter').textContent = `Pregunta ${quizState.currentIndex + 1} de ${total}`;
  $('#quizQuestionPercent').textContent = `${progressPercent}%`;

  // Badge de opciones dinámicas
  const optionsBadge = $('#quizOptionsCountBadge');
  if (optionsBadge) {
    optionsBadge.textContent = `${current.optionsCount} respuestas`;
  }

  // Título / Enunciado de la pregunta
  const titleEl = $('#quizQuestionStatement');
  titleEl.textContent = current.question;

  // Botón de Referencia a los Apuntes en el Enunciado
  const refArea = $('#quizQuestionRefArea');
  if (refArea) {
    if (current.reference) {
      refArea.innerHTML = `
        <button type="button" onclick="openQuickNotes('${escapeHtml(current.reference)}')" title="Consultar apuntes de teoría sin perder tu avance ni respuestas" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-cyan-100/90 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 hover:bg-cyan-200 dark:hover:bg-cyan-900 border border-cyan-300/60 dark:border-cyan-800/60 transition-all shadow-sm active:scale-95">
          <i data-lucide="book-open" class="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400"></i>
          <span>Ver apuntes relacionados</span>
        </button>
      `;
      refArea.classList.remove('hidden');
    } else {
      refArea.innerHTML = '';
      refArea.classList.add('hidden');
    }
  }

  // RENDERIZADO DINÁMICO DE OPCIONES:
  const optionsContainer = $('#quizOptionsContainer');
  optionsContainer.innerHTML = '';

  current.options.forEach((optText, optIdx) => {
    const isSelected = selectedOpts.includes(optIdx);
    const letter = LETTERS[optIdx] || String(optIdx + 1);

    let cardClasses = 'group relative flex items-start gap-3.5 p-4 rounded-2xl border transition-all text-left w-full cursor-pointer select-none ';
    let letterClasses = 'w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ';
    let statusIconHtml = '';

    if (quizState.mode === 'study' && isChecked) {
      const isCorrect = current.correctIndices.includes(optIdx);
      if (isCorrect) {
        cardClasses += 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 ';
        letterClasses += 'bg-emerald-500 text-white ';
        statusIconHtml = '<i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 ml-auto"></i>';
      } else if (isSelected && !isCorrect) {
        cardClasses += 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 ';
        letterClasses += 'bg-rose-500 text-white ';
        statusIconHtml = '<i data-lucide="x-circle" class="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 ml-auto"></i>';
      } else {
        cardClasses += 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-60 ';
        letterClasses += 'bg-slate-100 dark:bg-slate-800 text-slate-500 ';
      }
    } else {
      if (isSelected) {
        cardClasses += 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/10 text-cyan-950 dark:text-cyan-100 font-medium ';
        letterClasses += 'bg-cyan-600 text-white shadow-sm ';
      } else {
        cardClasses += 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-400/60 dark:hover:border-cyan-500/60 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200 ';
        letterClasses += 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-950 group-hover:text-cyan-700 ';
      }
    }

    const card = document.createElement('button');
    card.type = 'button';
    card.className = cardClasses;
    if (quizState.mode === 'study' && isChecked) {
      card.disabled = true;
    } else {
      card.onclick = () => selectOption(optIdx);
    }

    card.innerHTML = `
      <span class="${letterClasses}">
        ${letter}
      </span>
      <span class="text-sm sm:text-base leading-relaxed flex-1 break-words">
        ${escapeHtml(optText)}
      </span>
      ${statusIconHtml}
    `;

    optionsContainer.appendChild(card);
  });

  // Panel de Explicación y Retroalimentación
  const explanationBox = $('#quizExplanationBox');
  const explanationText = $('#quizExplanationText');
  const explanationStatusTitle = $('#quizExplanationStatusTitle');
  const explanationStatusIcon = $('#quizExplanationStatusIcon');

  if (quizState.mode === 'study' && isChecked) {
    const isCorrect = selectedOpts.length > 0 &&
      selectedOpts.length === current.correctIndices.length &&
      selectedOpts.every(idx => current.correctIndices.includes(idx));

    explanationBox.classList.remove('hidden');
    if (isCorrect) {
      explanationBox.className = 'mt-6 p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 transition-all';
      explanationStatusTitle.textContent = '¡Respuesta correcta!';
      explanationStatusIcon.className = 'w-5 h-5 text-emerald-600 dark:text-emerald-400';
      explanationStatusIcon.setAttribute('data-lucide', 'check-circle');
    } else {
      explanationBox.className = 'mt-6 p-4 sm:p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 transition-all';
      explanationStatusTitle.textContent = 'Respuesta incorrecta';
      explanationStatusIcon.className = 'w-5 h-5 text-rose-600 dark:text-rose-400';
      explanationStatusIcon.setAttribute('data-lucide', 'alert-circle');
    }

    let explHtml = current.explanation
      ? `<p class="leading-relaxed">${escapeHtml(current.explanation)}</p>`
      : '<p class="text-slate-400 italic">No se especificó retroalimentación adicional para esta pregunta.</p>';

    if (current.reference) {
      explHtml += `
        <div class="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-2">
          <span class="text-xs text-slate-500 dark:text-slate-400">¿Quieres profundizar en este tema?</span>
          <button type="button" onclick="openQuickNotes('${escapeHtml(current.reference)}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/80 shadow-sm transition-all shrink-0">
            <i data-lucide="book-open" class="w-3.5 h-3.5 text-cyan-500"></i>
            <span>Consultar unidad en apuntes</span>
          </button>
        </div>
      `;
    }

    explanationText.innerHTML = explHtml;
  } else {
    explanationBox.classList.add('hidden');
  }

  // Controles de Navegación Inferiores
  const btnPrev = $('#btnQuizPrev');
  const btnNext = $('#btnQuizNext');
  const btnCheck = $('#btnQuizCheck');
  const btnFinish = $('#btnQuizFinishDirect');

  btnPrev.disabled = quizState.currentIndex === 0;

  if (quizState.mode === 'study') {
    if (!isChecked) {
      btnCheck.classList.remove('hidden');
      btnCheck.disabled = selectedOpts.length === 0;
    } else {
      btnCheck.classList.add('hidden');
    }
  } else {
    btnCheck.classList.add('hidden');
  }

  if (quizState.currentIndex === total - 1) {
    btnNext.classList.add('hidden');
    btnFinish.classList.remove('hidden');
  } else {
    btnNext.classList.remove('hidden');
    btnFinish.classList.add('hidden');
  }

  renderQuestionPalette();

  if (window.lucide) lucide.createIcons();
}

/**
 * Maneja la selección de una opción
 */
function selectOption(optIndex) {
  const current = quizState.activeQuestions[quizState.currentIndex];
  const qId = current.id;

  if (current.correctIndices.length > 1) {
    const cur = quizState.userAnswers[qId] ? [...quizState.userAnswers[qId]] : [];
    const idx = cur.indexOf(optIndex);
    if (idx !== -1) {
      cur.splice(idx, 1);
    } else {
      cur.push(optIndex);
    }
    quizState.userAnswers[qId] = cur;
  } else {
    quizState.userAnswers[qId] = [optIndex];
  }

  renderCurrentQuestion();
}

/**
 * Comprueba la respuesta en modo estudio
 */
function checkCurrentAnswer() {
  const current = quizState.activeQuestions[quizState.currentIndex];
  quizState.checkedQuestions[current.id] = true;
  renderCurrentQuestion();
}

/**
 * Navega a la pregunta anterior (-1) o siguiente (+1)
 */
function navigateQuizQuestion(delta) {
  const target = quizState.currentIndex + delta;
  if (target >= 0 && target < quizState.activeQuestions.length) {
    quizState.currentIndex = target;
    renderCurrentQuestion();
    const container = $('#quizQuestionCardArea');
    if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Salta directamente a una pregunta por su índice
 */
function jumpToQuestion(index) {
  if (index >= 0 && index < quizState.activeQuestions.length) {
    quizState.currentIndex = index;
    renderCurrentQuestion();
  }
}

/**
 * Renderiza los botones de la paleta de preguntas (1, 2, 3...)
 */
function renderQuestionPalette() {
  const container = $('#quizQuestionPalette');
  if (!container) return;

  const questions = quizState.activeQuestions;
  container.innerHTML = questions.map((q, idx) => {
    const isCurrent = idx === quizState.currentIndex;
    const answered = Boolean(quizState.userAnswers[q.id] && quizState.userAnswers[q.id].length > 0);
    const isChecked = Boolean(quizState.checkedQuestions[q.id]);

    let btnClass = 'w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all ';

    if (isCurrent) {
      btnClass += 'ring-2 ring-cyan-500 ring-offset-2 dark:ring-offset-slate-900 bg-cyan-600 text-white ';
    } else if (quizState.mode === 'study' && isChecked) {
      const isCorrect = quizState.userAnswers[q.id] &&
        quizState.userAnswers[q.id].length === q.correctIndices.length &&
        quizState.userAnswers[q.id].every(i => q.correctIndices.includes(i));
      if (isCorrect) {
        btnClass += 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 ';
      } else {
        btnClass += 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/40 ';
      }
    } else if (answered) {
      btnClass += 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold ';
    } else {
      btnClass += 'bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 ';
    }

    return `
      <button onclick="jumpToQuestion(${idx})" class="${btnClass}" title="Ir a la pregunta ${idx + 1}">
        ${idx + 1}
      </button>
    `;
  }).join('');
}

/* ==========================================================================
   FINALIZACIÓN Y EVALUACIÓN DE RESULTADOS
   ========================================================================== */

function finishQuiz() {
  stopTimer();
  quizState.isFinished = true;

  const questions = quizState.activeQuestions;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;
  const failedQuestions = [];

  questions.forEach(q => {
    const user = quizState.userAnswers[q.id] || [];
    if (user.length === 0) {
      unansweredCount++;
      failedQuestions.push(q);
    } else {
      const isCorrect = user.length === q.correctIndices.length &&
        user.every(idx => q.correctIndices.includes(idx));
      if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
        failedQuestions.push(q);
      }
    }
  });

  const total = questions.length;
  const grade10 = Number(((correctCount / total) * 10).toFixed(2));
  const accuracyPercent = Math.round((correctCount / total) * 100);

  $('#quizActiveContainer').classList.add('hidden');
  const resultsContainer = $('#quizResultsContainer');
  resultsContainer.classList.remove('hidden');

  $('#resultGradeNumber').textContent = grade10.toFixed(1);
  const gradeBadge = $('#resultGradeBadge');

  if (grade10 >= 9.0) {
    gradeBadge.textContent = 'Sobresaliente';
    gradeBadge.className = 'px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
  } else if (grade10 >= 7.0) {
    gradeBadge.textContent = 'Notable';
    gradeBadge.className = 'px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300';
  } else if (grade10 >= 5.0) {
    gradeBadge.textContent = 'Aprobado';
    gradeBadge.className = 'px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
  } else {
    gradeBadge.textContent = 'Suspenso';
    gradeBadge.className = 'px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
  }

  $('#resultCorrectCount').textContent = correctCount;
  $('#resultIncorrectCount').textContent = incorrectCount;
  $('#resultUnansweredCount').textContent = unansweredCount;
  $('#resultAccuracyPercent').textContent = `${accuracyPercent}%`;

  const m = Math.floor(quizState.timerSeconds / 60);
  const s = quizState.timerSeconds % 60;
  $('#resultTotalTime').textContent = `${m}m ${s}s`;

  const btnRetryFailed = $('#btnQuizRetryFailed');
  if (btnRetryFailed) {
    if (failedQuestions.length > 0 && failedQuestions.length < total) {
      btnRetryFailed.classList.remove('hidden');
      btnRetryFailed.onclick = () => retryFailedQuestions(failedQuestions);
    } else {
      btnRetryFailed.classList.add('hidden');
    }
  }

  renderResultsBreakdown(questions);

  if (window.lucide) lucide.createIcons();
}

/**
 * Renderiza el desglose pregunta por pregunta en la pantalla de resultados
 */
function renderResultsBreakdown(questions) {
  const container = $('#quizResultsQuestionsBreakdown');
  if (!container) return;

  container.innerHTML = questions.map((q, idx) => {
    const user = quizState.userAnswers[q.id] || [];
    const isUnanswered = user.length === 0;
    const isCorrect = !isUnanswered &&
      user.length === q.correctIndices.length &&
      user.every(i => q.correctIndices.includes(i));

    let statusPill = '';
    let cardBorder = '';

    if (isCorrect) {
      statusPill = '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"><i data-lucide="check" class="w-3.5 h-3.5"></i> Correcta</span>';
      cardBorder = 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20';
    } else if (isUnanswered) {
      statusPill = '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"><i data-lucide="minus" class="w-3.5 h-3.5"></i> Sin responder</span>';
      cardBorder = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';
    } else {
      statusPill = '<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300"><i data-lucide="x" class="w-3.5 h-3.5"></i> Incorrecta</span>';
      cardBorder = 'border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20';
    }

    return `
      <div class="p-5 rounded-2xl border ${cardBorder} space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Pregunta ${idx + 1} (${q.optionsCount} opciones)</span>
          <div class="flex items-center gap-2">
            ${q.reference ? `
              <button onclick="openQuickNotes('${escapeHtml(q.reference)}')" class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 hover:bg-cyan-200 border border-cyan-200 dark:border-cyan-800 transition-colors">
                <i data-lucide="book-open" class="w-3 h-3 text-cyan-600 dark:text-cyan-400"></i>
                <span>Ver apuntes</span>
              </button>
            ` : ''}
            ${statusPill}
          </div>
        </div>
        <h4 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
          ${escapeHtml(q.question)}
        </h4>

        <div class="space-y-1.5 pt-2">
          ${q.options.map((opt, optIdx) => {
            const letter = LETTERS[optIdx] || String(optIdx + 1);
            const isSelected = user.includes(optIdx);
            const isRight = q.correctIndices.includes(optIdx);

            let optStyle = 'p-2.5 rounded-xl text-xs flex items-center justify-between gap-2 border ';
            if (isRight) {
              optStyle += 'bg-emerald-100/70 dark:bg-emerald-950/60 border-emerald-500 font-semibold text-emerald-900 dark:text-emerald-200';
            } else if (isSelected && !isRight) {
              optStyle += 'bg-rose-100/70 dark:bg-rose-950/60 border-rose-500 line-through text-rose-900 dark:text-rose-200';
            } else {
              optStyle += 'bg-white/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400';
            }

            return `
              <div class="${optStyle}">
                <div class="flex items-center gap-2">
                  <span class="w-5 h-5 rounded-lg flex items-center justify-center font-bold text-[10px] ${isRight ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}">
                    ${letter}
                  </span>
                  <span>${escapeHtml(opt)}</span>
                </div>
                ${isRight ? '<span class="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">Correcta</span>' : ''}
                ${isSelected && !isRight ? '<span class="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase">Tu respuesta</span>' : ''}
              </div>
            `;
          }).join('')}
        </div>

        ${q.explanation ? `
          <div class="mt-3 p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 flex items-start gap-2">
            <i data-lucide="info" class="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5"></i>
            <div class="flex-1">
              <strong class="text-slate-900 dark:text-white">Explicación:</strong>
              ${escapeHtml(q.explanation)}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

function restartQuizFull() {
  if (!quizState.activeQuiz) return;
  quizState.activeQuestions = [...quizState.activeQuiz.questions];
  quizState.currentIndex = 0;
  quizState.userAnswers = {};
  quizState.checkedQuestions = {};
  quizState.isFinished = false;
  quizState.isReviewOnlyFailed = false;

  $('#quizResultsContainer').classList.add('hidden');
  $('#quizActiveContainer').classList.remove('hidden');

  startTimer();
  renderCurrentQuestion();
}

function retryFailedQuestions(failedQuestions) {
  quizState.activeQuestions = [...failedQuestions];
  quizState.currentIndex = 0;
  quizState.userAnswers = {};
  quizState.checkedQuestions = {};
  quizState.isFinished = false;
  quizState.isReviewOnlyFailed = true;

  $('#quizResultsContainer').classList.add('hidden');
  $('#quizActiveContainer').classList.remove('hidden');

  startTimer();
  renderCurrentQuestion();
}

/* ==========================================================================
   POPUP DE CONSULTA RÁPIDA DE APUNTES (SIN PERDER EL AVANCE DEL CUESTIONARIO)
   ========================================================================== */

/**
 * Resuelve una referencia ("asignatura/unidad#seccion" o "unidadId") y carga su Markdown
 */
async function resolveUnitReference(refPath) {
  // Caso 1: Ruta directa a markdown
  if (refPath.endsWith('.md') || refPath.startsWith('contenido/')) {
    const text = await fetchText(refPath);
    const cleanMarkdown = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
    const titleMatch = /^titulo:\s*(.+)$/m.exec(text);
    const subjMatch = /^asignatura:\s*(.+)$/m.exec(text);
    const summaryMatch = /^resumen:\s*(.+)$/m.exec(text);
    return {
      title: titleMatch ? titleMatch[1].trim() : 'Unidad de Apuntes',
      subjectTitle: subjMatch ? subjMatch[1].trim() : 'Apuntes',
      summary: summaryMatch ? summaryMatch[1].trim() : '',
      number: null,
      markdown: cleanMarkdown
    };
  }

  // Caso 2: Formato subjectId/unitId
  let subjectId = null;
  let unitId = refPath;
  if (refPath.includes('/')) {
    const parts = refPath.split('/');
    subjectId = parts[0];
    unitId = parts[1];
  }

  if (subjectId) {
    if (!quizState.subjectsCache[subjectId]) {
      try {
        quizState.subjectsCache[subjectId] = await loadSubjectDetails(subjectId);
      } catch (err) {
        console.warn(`Error cargando detalles para ${subjectId}:`, err);
      }
    }
    const sData = quizState.subjectsCache[subjectId];
    if (sData && sData.units) {
      const unit = sData.units.find(u => u.id === unitId || u.id?.endsWith(unitId) || u.id?.includes(unitId) || u.path?.includes(unitId));
      if (unit && unit.path) {
        const text = await fetchText(unit.path);
        const cleanMarkdown = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
        return {
          title: unit.title,
          subjectTitle: sData.title,
          summary: unit.summary || '',
          number: unit.number || null,
          markdown: cleanMarkdown
        };
      }
    }
  }

  // Caso 3: Búsqueda global en catálogo por unitId
  if (!state.catalog) {
    try {
      await loadApplicationCatalog();
    } catch {}
  }
  if (state.catalog && state.catalog.subjects) {
    for (const s of state.catalog.subjects) {
      if (!quizState.subjectsCache[s.id]) {
        try {
          quizState.subjectsCache[s.id] = await loadSubjectDetails(s.id);
        } catch {}
      }
      const sData = quizState.subjectsCache[s.id];
      if (sData && sData.units) {
        const unit = sData.units.find(u => u.id === unitId || u.id?.endsWith(unitId) || u.path?.includes(unitId));
        if (unit && unit.path) {
          const text = await fetchText(unit.path);
          const cleanMarkdown = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
          return {
            title: unit.title,
            subjectTitle: sData.title,
            summary: unit.summary || '',
            number: unit.number || null,
            markdown: cleanMarkdown
          };
        }
      }
    }
  }

  return null;
}

/**
 * Resalta y subraya visualmente la sección referenciada en los apuntes
 */
function applyReferenceHighlight(container, anchor, question) {
  let targetHeading = null;

  if (anchor) {
    const rawAnchor = anchor.replace(/^#+/, '').trim();
    const slug = rawAnchor
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // 1. Coincidencia exacta por ID de elemento
    if (slug) {
      targetHeading = container.querySelector(`[id="${slug}"]`);
    }

    // 2. Si el ancla incluye prefijo numérico de diapositiva o subsección (ej. "40-cuando...", "40", "12")
    if (!targetHeading && slug) {
      const numMatch = slug.match(/^(\d+)(?:-|$)/);
      if (numMatch) {
        const slideNum = numMatch[1];
        // Buscar heading cuyo ID empiece exactamente con ese número seguido de guión (ej: id="40-cuando-usar-article-y-cuando-section")
        targetHeading = container.querySelector(`[id^="${slideNum}-"]`) ||
                        container.querySelector(`[id="${slideNum}"]`);

        // Si aún no se halla, buscar en el texto de los encabezados (ej: "### 40. Cuando usar...")
        if (!targetHeading) {
          targetHeading = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6')).find(h => {
            const hText = h.textContent.trim();
            return new RegExp(`^${slideNum}[.\\s-]`).test(hText);
          });
        }
      }
    }

    // 3. Coincidencia por subcadena de ID si el slug es suficientemente representativo
    if (!targetHeading && slug.length >= 4) {
      targetHeading = container.querySelector(`[id*="${slug}"]`);
    }

    // 4. Búsqueda por texto normalizado en los encabezados (h1..h6)
    if (!targetHeading && rawAnchor) {
      const targetClean = rawAnchor
        .toLowerCase()
        .replace(/[-_]/g, ' ')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();

      targetHeading = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6')).find(h => {
        const text = h.textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return text.includes(targetClean) || (targetClean.length > 6 && text.includes(targetClean.slice(0, 16)));
      });
    }
  }

  // 5. Fallback semántico usando palabras clave de la pregunta si no se especificó ancla o no coincidió
  if (!targetHeading && question && question.question) {
    const cleanQ = question.question
      .replace(/[¿?¡!(),."':;]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 4 && !/^(cu[aá]l|como|donde|cuando|sobre|entre|seg[uú]n|indica|afirmaci[oó]n|siguiente|describe|respecto|primera|segunda)$/i.test(w));

    if (cleanQ.length > 0) {
      targetHeading = Array.from(container.querySelectorAll('h3, h2')).find(h => {
        const hText = h.textContent.toLowerCase();
        return cleanQ.some(w => hText.includes(w.toLowerCase()));
      });
    }
  }

  if (targetHeading) {
    const sectionBox = document.createElement('div');
    sectionBox.className = 'quiz-target-reference';

    const headingLevel = parseInt(targetHeading.tagName.replace(/h/i, ''), 10) || 2;
    const isSlideLevel = headingLevel >= 3;

    const badge = document.createElement('div');
    badge.className = 'quiz-reference-badge';
    badge.innerHTML = `<i data-lucide="target" class="w-3.5 h-3.5"></i> ${isSlideLevel ? 'Diapositiva o subapartado clave para la pregunta' : 'Sección de referencia para la pregunta activa'}`;

    targetHeading.parentNode.insertBefore(sectionBox, targetHeading);
    sectionBox.appendChild(badge);
    sectionBox.appendChild(targetHeading);

    // Para H3 recogemos el contenido de la diapositiva hasta el siguiente H3, H2 o H1 (hasta 15 elementos)
    // Para H2 recogemos hasta el siguiente H2/H1 o un máximo de 8 elementos para no abarcar la unidad completa
    const maxElements = isSlideLevel ? 15 : 8;
    let next = sectionBox.nextElementSibling;
    let count = 0;
    while (next && count < maxElements) {
      const isNextHeading = /^H[1-6]$/i.test(next.tagName);
      if (isNextHeading) {
        const nextLevel = parseInt(next.tagName.replace(/h/i, ''), 10);
        if (nextLevel <= headingLevel) break;
      }
      const toMove = next;
      next = next.nextElementSibling;
      sectionBox.appendChild(toMove);
      count++;
    }

    if (question && question.question) {
      const keywords = question.question
        .replace(/[¿?¡!(),."':;]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 4 && !/^(cu[aá]l|como|donde|cuando|sobre|entre|seg[uú]n|indica|afirmaci[oó]n|siguiente|describe|respecto)$/i.test(w))
        .slice(0, 3);

      if (keywords.length > 0) {
        sectionBox.querySelectorAll('p, li').forEach(el => {
          keywords.forEach(kw => {
            const regex = new RegExp(`(\\b${kw}\\w*)`, 'gi');
            el.innerHTML = el.innerHTML.replace(regex, '<mark class="quiz-target-underline">$1</mark>');
          });
        });
      }
    }

    // Actualizar el breadcrumb de sección con el título exacto del apartado encontrado
    const breadcrumbSection = document.getElementById('quickNotesBreadcrumbSection');
    if (breadcrumbSection && targetHeading.textContent) {
      breadcrumbSection.textContent = targetHeading.textContent.trim();
      breadcrumbSection.classList.remove('hidden');
    }

    setTimeout(() => {
      sectionBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  }
}

/**
 * Abre la unidad de referencia en un popup modal sin perder el avance ni el cuestionario
 */
async function openQuickNotes(reference) {
  if (!reference) return;
  const modal = $('#quickNotesModal');
  if (!modal) return;

  const [refPath, anchor] = reference.split('#');
  const breadcrumbSubj = $('#quickNotesBreadcrumbSubject');
  const breadcrumbUnit = $('#quickNotesBreadcrumbUnit');
  const breadcrumbSection = $('#quickNotesBreadcrumbSection');
  const contentPill = $('#quickNotesContentPill');
  const readingTimeBadge = $('#quickNotesReadingTimeBadge');
  const lessonTitle = $('#quickNotesLessonTitle');
  const summaryBox = $('#quickNotesSummaryBox');
  const summaryContent = $('#quickNotesSummaryContent');
  const contentEl = $('#quickNotesContent');

  modal.classList.remove('hidden');
  modal.classList.add('flex');

  lessonTitle.textContent = 'Cargando lección de teoría...';
  contentEl.innerHTML = `
    <div class="flex items-center justify-center py-20 text-slate-400">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mr-3"></div>
      <span class="text-sm font-medium">Cargando apuntes y localizando referencia...</span>
    </div>
  `;
  if (window.lucide) lucide.createIcons();

  try {
    const resolved = await resolveUnitReference(refPath);
    if (!resolved || !resolved.markdown) {
      throw new Error(`No se pudo localizar la unidad de apuntes: "${refPath}"`);
    }

    breadcrumbSubj.innerHTML = `<span class="w-2 h-2 rounded-full bg-cyan-500 inline-block"></span> ${escapeHtml(resolved.subjectTitle || 'Asignatura')}`;
    breadcrumbUnit.textContent = resolved.title || 'Unidad';
    if (anchor) {
      breadcrumbSection.textContent = anchor.replace(/[-_]/g, ' ');
      breadcrumbSection.classList.remove('hidden');
    } else {
      breadcrumbSection.textContent = 'Teoría';
    }

    const wordCount = resolved.markdown.split(/\s+/).length;
    const readMinutes = Math.max(3, Math.round(wordCount / 180));
    contentPill.innerHTML = `<i data-lucide="book-open" class="w-3.5 h-3.5"></i> Unidad ${resolved.number || ''}`;
    readingTimeBadge.innerHTML = `<i data-lucide="clock" class="w-3.5 h-3.5"></i> ${readMinutes} min de lectura`;

    lessonTitle.textContent = resolved.title || 'Apuntes';

    if (resolved.summary) {
      summaryBox.classList.remove('hidden');
      summaryContent.innerHTML = `<p class="leading-relaxed">${escapeHtml(resolved.summary)}</p>`;
    } else {
      summaryBox.classList.add('hidden');
    }

    const markdown = window.marked.marked || window.marked;
    contentEl.innerHTML = markdown.parse(resolved.markdown);
    if (typeof highlightSyntax === 'function') {
      highlightSyntax(contentEl);
    }

    const currentQ = quizState.activeQuestions[quizState.currentIndex];
    applyReferenceHighlight(contentEl, anchor, currentQ);

    if (window.lucide) lucide.createIcons();
  } catch (err) {
    console.error('Error al abrir apuntes:', err);
    lessonTitle.textContent = 'Error al cargar lección';
    contentEl.innerHTML = `
      <div class="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200">
        <h4 class="font-bold mb-1">No se pudo cargar la unidad referenciada</h4>
        <p class="text-xs">${escapeHtml(err.message)}</p>
        <p class="text-xs text-slate-500 mt-2">Referencia solicitada: <code>${escapeHtml(reference)}</code></p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  }
}

function closeQuickNotes() {
  const modal = $('#quickNotesModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Atajo de teclado Esc para cerrar el popup de apuntes
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const quickModal = typeof $ === 'function' ? $('#quickNotesModal') : null;
      if (quickModal && !quickModal.classList.contains('hidden')) {
        closeQuickNotes();
      }
    }
  });
}

/* ==========================================================================
   UTILIDADES
   ========================================================================== */

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
