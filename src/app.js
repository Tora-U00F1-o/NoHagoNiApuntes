/**
 * ============================================================================
 * APLICACIÓN DE APUNTES Y ENTORNO DE ESTUDIO UNIVERSITARIO
 * Arquitectura SPA Modular, Responsive-First y Multidispositivo
 * ============================================================================
 */

// Utilidades DOM rápidas
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// Estado global reactivo de la aplicación
const state = {
  catalog: null,
  currentSubject: null,
  currentUnit: null,
  showingSummary: false,
  showingExam: false,
  currentDocumentPath: null,
  unitLoadVersion: 0,
  allUnitsInSubject: [],
  sidebarOpen: false,
  isFullWidth: false,
  fontSizeLevel: 0, // -1: sm, 0: base, 1: lg, 2: xl
  theme: localStorage.getItem('study_theme') || 'light',
  tocObserver: null,
  recents: JSON.parse(localStorage.getItem('study_recents') || '[]')
};

// Paletas visuales e iconos por defecto para asignaturas
const SUBJECT_PRESETS = {
  'software-estandares-web': {
    code: 'SEW-2026',
    color: 'cyan',
    gradient: 'from-cyan-500 to-sky-600',
    icon: 'globe',
    badge: 'Cuatrimestre 1'
  },
  'repositorios-informacion': {
    code: 'RI-2026',
    color: 'indigo',
    gradient: 'from-indigo-500 to-violet-600',
    icon: 'database',
    badge: 'Cuatrimestre 1'
  },
  'redes': {
    code: 'RED-2026',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    icon: 'network',
    badge: 'Cuatrimestre 1'
  },
  'algoritmos': {
    code: 'DAA-2026',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600',
    icon: 'cpu',
    badge: 'Cuatrimestre 1'
  }
};

// Datos demo de contingencia si no se puede acceder a fetch (por ejemplo vía file://)
const FALLBACK_CATALOG = {
  schemaVersion: 2,
  subjects: [
    {
      id: 'software-estandares-web',
      title: 'Software y Estándares para la Web',
      count: 12
    },
    {
      id: 'repositorios-informacion',
      title: 'Repositorios de Información',
      count: 8
    }
  ]
};

const FALLBACK_SUBJECTS_DATA = {
  'software-estandares-web': {
    id: 'software-estandares-web',
    title: 'Software y Estándares para la Web',
    tree: [
      {
        type: 'group',
        id: 'teoria',
        title: 'Teoría',
        children: [
          { type: 'unit', id: 'teoria-diseno-con-estandares' },
          { type: 'unit', id: 'teoria-lenguajes-de-marcado' },
          { type: 'unit', id: 'teoria-lenguajes-de-marcado-html' }
        ]
      },
      {
        type: 'group',
        id: 'practicas',
        title: 'Prácticas de Laboratorio',
        children: [
          { type: 'unit', id: 'practicas-01-estandares-web' }
        ]
      }
    ],
    units: [
      {
        id: 'teoria-lenguajes-de-marcado-html',
        title: 'Lenguajes de Marcado — HTML5',
        number: 4,
        summary: 'Estructuración semántica moderna, DOM y accesibilidad web universal.',
        path: 'demo'
      },
      {
        id: 'teoria-diseno-con-estandares',
        title: 'Diseño con Estándares Web',
        number: 1,
        summary: 'Principios de diseño, compatibilidad y evolución del consorcio W3C.',
        path: 'demo'
      },
      {
        id: 'teoria-lenguajes-de-marcado',
        title: 'Lenguajes de Marcado y Sintaxis XML',
        number: 2,
        summary: 'Gramáticas formales, documentos bien formados y validación mediante DTD/Schema.',
        path: 'demo'
      },
      {
        id: 'practicas-01-estandares-web',
        title: 'Práctica 1 — Validación y Buenas Prácticas',
        number: 1,
        summary: 'Configuración del entorno de validación HTML/CSS y auditorías de accesibilidad.',
        path: 'demo'
      }
    ]
  },
  'repositorios-informacion': {
    id: 'repositorios-informacion',
    title: 'Repositorios de Información',
    tree: [
      {
        type: 'group',
        id: 'teoria',
        title: 'Teoría',
        children: [
          { type: 'unit', id: '01-jdbc' },
          { type: 'unit', id: '02-transactions' }
        ]
      }
    ],
    units: [
      {
        id: '01-jdbc',
        title: 'Conectividad de Bases de Datos con JDBC',
        number: 1,
        summary: 'Controladores, conexiones resilientes, PreparedStatement y mapeo relacional.',
        path: 'demo'
      },
      {
        id: '02-transactions',
        title: 'Gestión de Transacciones ACID y Concurrencia',
        number: 2,
        summary: 'Niveles de aislamiento, bloqueos optimistas/pesimistas y serializabilidad.',
        path: 'demo'
      }
    ]
  }
};

/* ==========================================================================
   CONFIGURACIÓN DEL PARSER MARKDOWN (MARKED + HLJS + STUDY BLOCKS)
   ========================================================================== */
function configureMarkdownParser() {
  if (!window.marked) return;

  const markdown = window.marked.marked || window.marked;
  const BLOCKS = new Set(['aviso', 'examen', 'practica', 'proyecto', 'pregunta', 'proceso', 'cifras']);
  const escapeHtml = value => String(value || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  markdown.use({
    gfm: true,
    breaks: false,
    renderer: {
      link(token) {
        const href = resolveStudyResource(token.href);
        const title = token.title ? ` title="${escapeHtml(token.title)}"` : '';
        return `<a href="${escapeHtml(href)}"${title}>${this.parser.parseInline(token.tokens)}</a>`;
      },
      image(token) {
        return `<img src="${escapeHtml(resolveStudyResource(token.href))}" alt="${escapeHtml(token.text)}"${token.title ? ` title="${escapeHtml(token.title)}"` : ''}>`;
      },
      heading(token) {
        const text = token.text || '';
        const match = /\s+\{#([a-z0-9-]+)\}$/.exec(text);
        const title = match ? text.slice(0, -match[0].length) : text;
        const slug = match ? match[1] : title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'seccion';
        return `<h${token.depth} id="${slug}">${this.parser.parseInline(token.tokens)}</h${token.depth}>\n`;
      },
      code(token) {
        const info = token.lang || '';
        const lang = /^([a-z0-9+#-]+)/i.exec(info)?.[1] || 'plaintext';
        const titleMatch = /\btitle="([^"]+)"/.exec(info);
        const title = titleMatch ? titleMatch[1] : lang;
        return `
          <figure class="code-block">
            <figcaption class="code-header">
              <span class="flex items-center gap-1.5">
                <i data-lucide="file-code" class="w-3.5 h-3.5 text-cyan-400"></i>
                ${escapeHtml(title)}
              </span>
              <button type="button" class="copy-code" onclick="copySnippetCode(this)">
                <i data-lucide="copy" class="w-3 h-3"></i> Copiar
              </button>
            </figcaption>
            <pre><code class="language-${escapeHtml(lang)}">${escapeHtml(token.text)}</code></pre>
          </figure>\n`;
      }
    },
    extensions: [{
      name: 'study-block',
      level: 'block',
      tokenizer(source) {
        const m = /^:::[ \t]+([a-z]+)(?:[ \t]+([^\n]*))?\n([\s\S]*?)\n:::(?:\n|$)/.exec(source);
        if (!m || !BLOCKS.has(m[1])) return;
        return {
          type: 'study-block',
          raw: m[0],
          kind: m[1],
          title: m[2] || '',
          body: m[3],
          tokens: this.lexer.blockTokens(m[3])
        };
      },
      renderer(token) {
        const { kind, title, body } = token;
        
        // Bloque de métricas o cifras
        if (kind === 'cifras') {
          const items = body.trim().split(/\r?\n/).map(line => {
            const [num, label] = line.split('|');
            return `<div><b>${escapeHtml((num || '').trim())}</b><span>${escapeHtml((label || '').trim())}</span></div>`;
          }).join('');
          return `<div class="study-stats">${items}</div>\n`;
        }

        // Bloque de flujo de proceso con flechas
        if (kind === 'proceso') {
          const steps = body.trim().split(/\s*(?:→|->)\s*/).map((step, i) => 
            (i ? '<i aria-hidden="true">→</i>' : '') + `<span>${escapeHtml(step)}</span>`
          ).join('');
          return `<div class="study-flow">${steps}</div>\n`;
        }

        // Bloque de pregunta interactiva
        if (kind === 'pregunta') {
          const content = this.parser.parse(token.tokens);
          return `
            <details class="study-question">
              <summary>${escapeHtml(title || 'Pregunta de repaso')}</summary>
              <div>${content}</div>
            </details>\n`;
        }

        // Bloques didácticos (aviso, examen, practica, proyecto)
        const cssClass = {
          aviso: 'study-note',
          examen: 'study-exam',
          practica: 'study-lab',
          proyecto: 'study-project'
        }[kind] || 'study-note';

        const labels = {
          aviso: 'OJO / NOTA IMPORTANTE',
          examen: 'IMPORTANTE PARA EL EXAMEN',
          practica: 'EN LA PRÁCTICA DE LABORATORIO',
          proyecto: 'APLICACIÓN EN EL PROYECTO'
        };

        const icons = {
          aviso: 'info',
          examen: 'alert-triangle',
          practica: 'terminal',
          proyecto: 'box'
        };

        const content = this.parser.parse(token.tokens);
        return `
          <aside class="${cssClass}">
            <strong class="block-label">
              <i data-lucide="${icons[kind] || 'info'}" class="w-3.5 h-3.5"></i>
              ${escapeHtml(title || labels[kind])}
            </strong>
            <div>${content}</div>
          </aside>\n`;
      }
    }]
  });
}

function resolveStudyResource(href) {
  if (!href || href.startsWith('#') || href.startsWith('?')) return href;
  if (/^(?:https?:|mailto:|tel:)/i.test(href)) return href;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return '#';
  return new URL(href, new URL(state.currentDocumentPath || '.', document.baseURI)).href;
}

function highlightSyntax(container) {
  if (!window.hljs) return;
  container.querySelectorAll('pre code').forEach(block => {
    window.hljs.highlightElement(block);
  });
}

/* ==========================================================================
   CARGA DE DATOS (CATALOGO JSON & UNIDADES MD)
   ========================================================================== */
async function fetchJson(path) {
  const res = await fetch(new URL(path, document.baseURI));
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${path}`);
  return res.json();
}

async function fetchText(path) {
  const res = await fetch(new URL(path, document.baseURI));
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${path}`);
  return res.text();
}

async function loadApplicationCatalog() {
  try {
    state.catalog = await fetchJson('catalogo.json');
  } catch (err) {
    console.warn('Usando catálogo fallback de contingencia:', err.message);
    state.catalog = FALLBACK_CATALOG;
  }
}

async function loadSubjectDetails(subjectId) {
  try {
    return await fetchJson(`catalogo/${encodeURIComponent(subjectId)}.json`);
  } catch (err) {
    console.warn(`Usando datos fallback para la materia ${subjectId}:`, err.message);
    return FALLBACK_SUBJECTS_DATA[subjectId] || FALLBACK_SUBJECTS_DATA['software-estandares-web'];
  }
}

/* ==========================================================================
   VISTA 1: DASHBOARD DE ASIGNATURAS
   ========================================================================== */
function renderDashboardSubjects(filterText = '') {
  const grid = $('#subjectsGrid');
  if (!grid || !state.catalog) return;

  const term = filterText.toLowerCase().trim();
  const subjects = state.catalog.subjects.filter(s => {
    const preset = SUBJECT_PRESETS[s.id] || {};
    return s.title.toLowerCase().includes(term) ||
           (preset.code && preset.code.toLowerCase().includes(term)) ||
           s.id.toLowerCase().includes(term);
  });

  const countBadge = $('#subjectCountBadge');
  if (countBadge) {
    countBadge.textContent = `${subjects.length} ${subjects.length === 1 ? 'materia disponible' : 'materias disponibles'}`;
  }

  if (subjects.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400">
        <i data-lucide="search-x" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
        <p class="font-medium text-sm">No se encontraron materias que coincidan con "${filterText}".</p>
      </div>`;
    lucide.createIcons();
    return;
  }

  grid.innerHTML = subjects.map((sub, index) => {
    const preset = SUBJECT_PRESETS[sub.id] || {
      code: `ASIG-0${index + 1}`,
      color: 'cyan',
      gradient: 'from-cyan-500 to-sky-600',
      icon: 'book',
      badge: 'Semestre 1'
    };

    // Progreso simulado para estética visual o guardado
    const progress = (sub.id === 'software-estandares-web') ? 35 : 60;

    return `
      <div onclick="selectSubject('${sub.id}')" 
           class="group cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-500 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr ${preset.gradient} text-white flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-transform">
              <i data-lucide="${preset.icon}" class="w-6 h-6"></i>
            </div>
            <span class="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              ${preset.badge}
            </span>
          </div>

          <div>
            <p class="text-xs font-mono text-slate-400 font-semibold tracking-wide">${preset.code}</p>
            <h4 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 mt-0.5 leading-snug">
              ${sub.title}
            </h4>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
          <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span class="font-medium">${sub.count} Unidades</span>
            <span class="font-semibold text-slate-700 dark:text-slate-200">${progress}% completado</span>
          </div>
          <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div class="bg-gradient-to-r ${preset.gradient} h-full rounded-full transition-all duration-500" style="width: ${progress}%"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function filterSubjects(query) {
  renderDashboardSubjects(query);
}

function renderRecentsSection() {
  const grid = $('#recentTopicsGrid');
  if (!grid) return;

  const recents = state.recents.length ? state.recents : [
    {
      subjectId: 'software-estandares-web',
      subjectName: 'Software y Estándares Web',
      unitId: 'teoria-lenguajes-de-marcado-html',
      unitTitle: 'Lenguajes de Marcado — HTML5',
      color: 'cyan'
    },
    {
      subjectId: 'repositorios-informacion',
      subjectName: 'Repositorios de Información',
      unitId: '02-transactions',
      unitTitle: 'Transacciones ACID y Concurrencia',
      color: 'indigo'
    }
  ];

  grid.innerHTML = recents.map(r => `
    <div onclick="selectSubject('${r.subjectId}', '${r.unitId}')" class="cursor-pointer p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-${r.color || 'cyan'}-500 dark:hover:border-${r.color || 'cyan'}-500 shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
      <div class="flex items-center gap-3.5 overflow-hidden">
        <span class="w-3 h-3 rounded-full bg-${r.color || 'cyan'}-500 shrink-0"></span>
        <div class="truncate">
          <p class="text-xs text-slate-500 dark:text-slate-400 truncate">${r.subjectName}</p>
          <p class="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
            ${r.unitTitle}
          </p>
        </div>
      </div>
      <i data-lucide="arrow-right" class="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-cyan-500 transition-all shrink-0 ml-2"></i>
    </div>
  `).join('');

  lucide.createIcons();
}

function saveRecent(subject, unit) {
  const preset = SUBJECT_PRESETS[subject.id] || {};
  const item = {
    subjectId: subject.id,
    subjectName: subject.title,
    unitId: unit.id,
    unitTitle: unit.title,
    color: preset.color || 'cyan'
  };

  state.recents = [item, ...state.recents.filter(r => !(r.subjectId === item.subjectId && r.unitId === item.unitId))].slice(0, 4);
  try {
    localStorage.setItem('study_recents', JSON.stringify(state.recents));
  } catch (e) {}
}

/* ==========================================================================
   VISTA 2: VISOR DE APUNTES (READER)
   ========================================================================== */
async function selectSubject(subjectId, requestedUnitId = null, showSummary = false, showExam = false, anchor = '', { renderOnly = false, version } = {}) {
  if (!renderOnly) {
    const params = new URLSearchParams({ u: subjectId + (requestedUnitId ? '/' + requestedUnitId : '') });
    if (showExam) params.set('vista', 'examen');
    else if (showSummary) params.set('vista', 'resumen');
    return navigateApp(`?${params}${anchor ? '#' + encodeURIComponent(anchor) : ''}`);
  }
  const dashboard = $('#viewSubjectsDashboard');
  const viewer = $('#viewStudyViewer');
  const quizView = $('#viewQuizPage');
  if (quizView) {
    quizView.classList.remove('flex');
    quizView.classList.add('hidden');
    if (typeof stopTimer === 'function') stopTimer();
  }
  
  dashboard.classList.add('hidden');
  viewer.classList.remove('hidden');
  viewer.classList.add('flex');

  // Cargar detalles de la asignatura
  const subject = await loadSubjectDetails(subjectId);
  if (version !== navigation.version) return;
  state.currentSubject = subject;

  // Lista plana ordenada de unidades para navegación continua
  state.allUnitsInSubject = subject.units || [];

  // Elegir unidad activa
  let unit = null;
  if (requestedUnitId) {
    unit = state.allUnitsInSubject.find(u => u.id === requestedUnitId);
  }
  if (!unit) {
    unit = state.allUnitsInSubject[0];
  }
  if (!unit) throw new Error('Esta asignatura no tiene unidades.');

  // Actualizar UI Header y Breadcrumbs
  const preset = SUBJECT_PRESETS[subject.id] || { color: 'cyan' };
  $('#breadcrumbSubject').innerHTML = `
    <span class="w-2 h-2 rounded-full bg-${preset.color}-500 inline-block"></span>
    ${subject.title}
  `;
  $('#sidebarMateriaName').textContent = subject.title;
  $('#sidebarMateriaBadge').className = `w-2.5 h-2.5 rounded-full bg-${preset.color}-500 shrink-0`;

  renderSidebarTree(subject, unit);
  await loadUnit(unit, { summary: showSummary, exam: showExam, anchor });

  toggleSidebar(false);
}

function goToSubjectsDashboard({ renderOnly = false } = {}) {
  if (!renderOnly) return navigateApp(location.pathname);
  const quizView = $('#viewQuizPage');
  if (quizView) {
    quizView.classList.remove('flex');
    quizView.classList.add('hidden');
    if (typeof stopTimer === 'function') stopTimer();
  }
  $('#viewStudyViewer').classList.remove('flex');
  $('#viewStudyViewer').classList.add('hidden');
  $('#viewSubjectsDashboard').classList.remove('hidden');
  toggleSidebar(false);
  renderDashboardSubjects();
  renderRecentsSection();
}

function containsUnit(node, unitId) {
  if (!node || !unitId) return false;
  if (node.type === 'unit') return node.id === unitId;
  if (node.children) {
    return node.children.some(c => containsUnit(c, unitId));
  }
  return false;
}

function countTotalUnits(node) {
  if (!node) return 0;
  if (node.type === 'unit') return 1;
  if (node.children) {
    return node.children.reduce((acc, c) => acc + countTotalUnits(c), 0);
  }
  return 0;
}

function renderSidebarTree(subject, selectedUnit) {
  const container = $('#tabNavContent');
  if (!container) return;

  const unitMap = new Map(subject.units.map(u => [u.id, u]));

  function renderNodes(nodes, depth = 0) {
    return nodes.map(node => {
      if (node.type === 'unit') {
        const u = unitMap.get(node.id);
        if (!u) return '';
        const isActive = u.id === selectedUnit?.id;
        const numberLabel = u.number ? String(u.number).padStart(2, '0') : '';
        
        // Estilo adaptado según nivel de anidación
        if (depth >= 2) {
          // Unidad dentro de una subcarpeta
          return `
            <button onclick="handleUnitClick('${u.id}')" 
                    title="${u.title}"
                    class="sidebar-unit-btn w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                      isActive 
                        ? 'sidebar-item-active bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-semibold border-l-2 border-cyan-500 shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                    }">
              ${numberLabel ? `<span class="font-mono text-[10px] shrink-0 ${isActive ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-400 dark:text-slate-500'}">${numberLabel}</span>` : '<span class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0"></span>'}
              <span class="truncate">${u.title}</span>
            </button>
          `;
        } else {
          // Unidad al nivel raíz de la categoría
          return `
            <button onclick="handleUnitClick('${u.id}')" 
                    title="${u.title}"
                    class="sidebar-unit-btn w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all ${
                      isActive 
                        ? 'sidebar-item-active bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-semibold border-l-2 border-cyan-500 shadow-sm' 
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                    }">
              ${numberLabel ? `<span class="font-mono text-[10px] shrink-0 ${isActive ? 'text-cyan-600 dark:text-cyan-400 font-bold' : 'text-slate-400'}">${numberLabel}</span>` : ''}
              <span class="truncate">${u.title}</span>
            </button>
          `;
        }
      } else if (node.type === 'group') {
        if (depth === 0) {
          // NIVEL 0: CATEGORÍA PRINCIPAL (TEORÍA, SEMINARIOS, PRÁCTICAS)
          const totalUnits = countTotalUnits(node);
          return `
            <div class="sidebar-category mb-4 first:mt-1 mt-5">
              <div class="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 py-1.5 mb-1.5 border-b border-slate-200/60 dark:border-slate-800/80">
                <span class="flex items-center gap-1.5">
                  <i data-lucide="layers" class="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400"></i>
                  ${node.title}
                </span>
                <span class="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono font-bold">${totalUnits}</span>
              </div>
              <div class="space-y-0.5">
                ${renderNodes(node.children, depth + 1)}
              </div>
            </div>
          `;
        } else {
          // NIVEL 1+: SUBCARPETAS (TECNOLOGÍAS XML, LENGUAJES DE PRESENTACIÓN, ETC.)
          const folderUnits = countTotalUnits(node);
          const hasActive = containsUnit(node, selectedUnit?.id);
          return `
            <details class="sidebar-subfolder group/folder my-2 rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50/60 dark:bg-slate-900/40 overflow-hidden" open>
              <summary class="list-none flex items-center justify-between px-2.5 py-2 cursor-pointer select-none bg-slate-100/70 dark:bg-slate-800/50 hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors">
                <div class="flex items-center gap-2 overflow-hidden">
                  <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-400 group-open/folder:rotate-90 transition-transform shrink-0"></i>
                  <i data-lucide="folder" class="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 group-open/folder:hidden shrink-0"></i>
                  <i data-lucide="folder-open" class="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 hidden group-open/folder:inline shrink-0"></i>
                  <span class="text-xs font-bold truncate">${node.title}</span>
                </div>
                <span class="text-[10px] bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60 px-1.5 py-0.2 rounded font-mono font-medium shrink-0">${folderUnits}</span>
              </summary>
              <div class="folder-children ml-3.5 pl-2.5 py-1.5 my-1 border-l-2 border-slate-200 dark:border-slate-700/80 space-y-0.5">
                ${renderNodes(node.children, depth + 1)}
              </div>
            </details>
          `;
        }
      }
      return '';
    }).join('');
  }

  container.innerHTML = renderNodes(subject.tree || [], 0);
  lucide.createIcons();
}

async function handleUnitClick(unitId) {
  const unit = state.allUnitsInSubject.find(u => u.id === unitId);
  if (unit) {
    await selectSubject(state.currentSubject.id, unit.id);
    if (window.innerWidth < 1024) toggleSidebar(false);
  }
}

async function toggleUnitSummary() {
  if (state.currentUnit?.summaryPath) {
    await selectSubject(state.currentSubject.id, state.currentUnit.id, !state.showingSummary);
  }
}

async function toggleUnitExam() {
  if (state.currentUnit?.examPath) await selectSubject(state.currentSubject.id, state.currentUnit.id, false, !state.showingExam);
}

function openUnitTests() {
  return openQuizHub(state.currentSubject.id, state.currentUnit.id);
}

async function loadUnit(unit, { summary = false, exam = false, anchor = '' } = {}) {
  const loadVersion = ++state.unitLoadVersion;
  state.currentUnit = unit;
  state.showingExam = Boolean(exam && unit.examPath);
  state.showingSummary = Boolean(!state.showingExam && summary && unit.summaryPath);
  const documentPath = state.showingExam ? unit.examPath : state.showingSummary ? unit.summaryPath : unit.path;
  state.currentDocumentPath = documentPath;
  saveRecent(state.currentSubject, unit);

  const summaryBtn = $('#btnUnitSummary');
  summaryBtn.classList.toggle('hidden', !unit.summaryPath);
  summaryBtn.classList.toggle('inline-flex', Boolean(unit.summaryPath));
  summaryBtn.setAttribute('aria-pressed', String(state.showingSummary));
  $('#unitSummaryLabel').textContent = state.showingSummary ? 'Apuntes completos' : 'Resumen';
  summaryBtn.title = state.showingSummary ? 'Volver a los apuntes completos' : 'Leer el resumen de esta unidad';
  const examBtn = $('#btnUnitExam');
  examBtn.classList.toggle('hidden', !unit.examPath);
  examBtn.setAttribute('aria-pressed', String(state.showingExam));
  examBtn.textContent = state.showingExam ? 'Apuntes completos' : 'Claves de examen';
  $('#btnUnitTests').classList.toggle('hidden', !unit.hasTests);

  // Actualizar Breadcrumbs
  $('#breadcrumbUnit').textContent = unit.title;
  $('#lessonTitle').textContent = state.showingExam ? `${unit.title} · Claves de examen` : state.showingSummary ? `${unit.title} · Resumen` : unit.title;
  $('#contentPill').innerHTML = `<i data-lucide="book-open" class="w-3.5 h-3.5"></i> ${state.showingExam ? 'Examen' : state.showingSummary ? 'Resumen' : 'Unidad ' + (unit.number || '')}`;

  // Botón PDF si tiene archivo fuente
  const pdfBtn = $('#btnPdfResource');
  if (unit.source) {
    pdfBtn.href = new URL(unit.source, new URL(unit.path || '', document.baseURI)).href;
    pdfBtn.classList.remove('hidden');
    pdfBtn.classList.add('inline-flex');
  } else {
    pdfBtn.classList.add('hidden');
    pdfBtn.classList.remove('inline-flex');
  }

  // Resumen ejecutivo
  const summaryBox = $('#summaryBox');
  const summaryContent = $('#summaryContent');
  if (unit.summary) {
    summaryBox.classList.remove('hidden');
    summaryContent.innerHTML = `<p class="leading-relaxed">${unit.summary}</p>`;
  } else {
    summaryBox.classList.add('hidden');
  }

  // Cargar contenido Markdown
  let markdownText = '';
  if (documentPath && documentPath !== 'demo') {
    try {
      markdownText = await fetchText(documentPath);
    } catch (err) {
      markdownText = `## Contenido no disponible\n\nNo se pudo descargar este documento. Vuelve a intentarlo o cambia de vista con el botón junto al título.`;
    }
  } else {
    markdownText = getSampleMarkdown(unit);
  }

  if (loadVersion !== state.unitLoadVersion) return;

  // Eliminar cabecera frontmatter
  const cleanMarkdown = markdownText.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');

  // Tiempo estimado de lectura (~200 palabras por minuto)
  const wordCount = cleanMarkdown.split(/\s+/).length;
  const readTimeMin = Math.max(3, Math.round(wordCount / 180));
  $('#readingTimeBadge').innerHTML = `<i data-lucide="clock" class="w-3.5 h-3.5"></i> ${readTimeMin} min de lectura`;

  // Parsear con Marked
  const article = $('#articleContent');
  const markdown = window.marked.marked || window.marked;
  article.innerHTML = markdown.parse(cleanMarkdown);

  // Resaltado de código sintáctico
  highlightSyntax(article);

  // Generar Tabla de Contenidos (ToC)
  buildTableOfContents(article);

  // Actualizar botones pie de página (Anterior / Siguiente)
  updateAdjacentNavigation(unit);

  // Reset scroll
  $('#mainScrollArea').scrollTop = 0;
  if (anchor) document.getElementById(anchor)?.scrollIntoView({ block: 'start' });
  lucide.createIcons();
}

function buildTableOfContents(articleContainer) {
  const headings = articleContainer.querySelectorAll('h2, h3');
  const tocList = $('#tocList');
  const mobileTocLinks = $('#mobileTocLinks');

  if (headings.length === 0) {
    tocList.innerHTML = `<li class="text-slate-400 py-1">Sin apartados destacados</li>`;
    mobileTocLinks.innerHTML = `<p class="text-slate-400 p-2">Sin apartados destacados</p>`;
    return;
  }

  const items = Array.from(headings).map(h => ({
    id: h.id,
    title: h.textContent.trim(),
    depth: h.tagName.toLowerCase()
  }));

  tocList.innerHTML = items.map(item => `
    <li class="${item.depth === 'h3' ? 'pl-3' : ''}">
      <a href="#${item.id}" onclick="smoothScrollTo('${item.id}', event)" class="toc-link block py-1.5 px-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors truncate">
        ${item.title}
      </a>
    </li>
  `).join('');

  mobileTocLinks.innerHTML = items.map(item => `
    <a href="#${item.id}" onclick="smoothScrollTo('${item.id}', event)" class="block p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium ${item.depth === 'h3' ? 'pl-6 text-xs text-slate-500' : ''}">
      ${item.title}
    </a>
  `).join('');

  // IntersectionObserver para resaltar el apartado activo en el ToC
  if (state.tocObserver) state.tocObserver.disconnect();
  state.tocObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        $$('#tocList a').forEach(a => {
          const match = a.getAttribute('href') === `#${id}`;
          a.classList.toggle('text-cyan-600', match);
          a.classList.toggle('dark:text-cyan-400', match);
          a.classList.toggle('font-bold', match);
          a.classList.toggle('bg-slate-100', match);
          a.classList.toggle('dark:bg-slate-800', match);
        });
      }
    }
  }, { rootMargin: '-10% 0px -75% 0px' });

  headings.forEach(h => state.tocObserver.observe(h));
}

function smoothScrollTo(elementId, event) {
  if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0)) return;
  if (event) event.preventDefault();
  const el = document.getElementById(elementId);
  if (el) {
    $('#mobileTocModal').classList.add('hidden');
    $('#mobileTocModal').classList.remove('flex');
    const url = new URL(location.href);
    url.hash = elementId;
    return navigateApp(url);
  }
}

function updateAdjacentNavigation(currentUnit) {
  const all = state.allUnitsInSubject;
  const index = all.findIndex(u => u.id === currentUnit.id);

  const prevBtn = $('#btnPrevTopic');
  const nextBtn = $('#btnNextTopic');
  const prevTitle = $('#prevTopicTitle');
  const nextTitle = $('#nextTopicTitle');

  if (index > 0) {
    prevBtn.classList.remove('invisible');
    prevTitle.textContent = all[index - 1].title;
  } else {
    prevBtn.classList.add('invisible');
  }

  if (index < all.length - 1 && index !== -1) {
    nextBtn.classList.remove('invisible');
    nextTitle.textContent = all[index + 1].title;
  } else {
    nextBtn.classList.add('invisible');
  }

  // Actualizar porcentaje en sidebar
  const percent = Math.round(((index + 1) / all.length) * 100);
  $('#sidebarProgressText').textContent = `Unidad ${index + 1} de ${all.length}`;
  $('#sidebarProgressPercent').textContent = `${percent}%`;
}

function navigateAdjacentTopic(step) {
  const all = state.allUnitsInSubject;
  const index = all.findIndex(u => u.id === state.currentUnit?.id);
  const target = index + step;
  if (target >= 0 && target < all.length) {
    handleUnitClick(all[target].id);
  }
}

/* ==========================================================================
   CONTROLES DE LECTURA (TEMA, FUENTE, ANCHO, SIDEBAR TABS)
   ========================================================================== */
function applyTheme(theme) {
  state.theme = theme;
  localStorage.setItem('study_theme', theme);
  const html = document.documentElement;
  const body = document.body;

  const themeIconDash = $('#themeIconDash');
  const themeLabelDash = $('#themeLabelDash');
  const themeIconViewer = $('#themeIconViewer');
  const themeLabelViewer = $('#themeLabelViewer');

  if (theme === 'dark') {
    html.classList.add('dark');
    body.classList.remove('theme-sepia');
    if (themeIconDash) { themeIconDash.setAttribute('data-lucide', 'moon'); themeIconDash.className = "w-4 h-4 text-[#9cdcfe]"; }
    if (themeLabelDash) themeLabelDash.textContent = "Noche";
    if (themeIconViewer) { themeIconViewer.setAttribute('data-lucide', 'moon'); themeIconViewer.className = "w-4 h-4 text-[#9cdcfe]"; }
    if (themeIconQuiz) { themeIconQuiz.setAttribute('data-lucide', 'moon'); themeIconQuiz.className = "w-4 h-4 text-[#9cdcfe]"; }
    if (themeIconQuickModal) { themeIconQuickModal.setAttribute('data-lucide', 'moon'); themeIconQuickModal.className = "w-4 h-4 text-[#9cdcfe]"; }
    if (themeLabelViewer) themeLabelViewer.textContent = "Noche";
  } else if (theme === 'sepia') {
    html.classList.remove('dark');
    body.classList.add('theme-sepia');
    if (themeIconDash) { themeIconDash.setAttribute('data-lucide', 'coffee'); themeIconDash.className = "w-4 h-4 text-amber-700"; }
    if (themeLabelDash) themeLabelDash.textContent = "Sepia";
    if (themeIconViewer) { themeIconViewer.setAttribute('data-lucide', 'coffee'); themeIconViewer.className = "w-4 h-4 text-amber-700"; }
    if (themeIconQuiz) { themeIconQuiz.setAttribute('data-lucide', 'coffee'); themeIconQuiz.className = "w-4 h-4 text-amber-700"; }
    if (themeIconQuickModal) { themeIconQuickModal.setAttribute('data-lucide', 'coffee'); themeIconQuickModal.className = "w-4 h-4 text-amber-700"; }
    if (themeLabelViewer) themeLabelViewer.textContent = "Sepia";
  } else {
    html.classList.remove('dark');
    body.classList.remove('theme-sepia');
    if (themeIconDash) { themeIconDash.setAttribute('data-lucide', 'sun'); themeIconDash.className = "w-4 h-4 text-amber-500"; }
    if (themeLabelDash) themeLabelDash.textContent = "Claro";
    if (themeIconViewer) { themeIconViewer.setAttribute('data-lucide', 'sun'); themeIconViewer.className = "w-4 h-4 text-amber-500"; }
    if (themeIconQuiz) { themeIconQuiz.setAttribute('data-lucide', 'sun'); themeIconQuiz.className = "w-4 h-4 text-amber-500"; }
    if (themeIconQuickModal) { themeIconQuickModal.setAttribute('data-lucide', 'sun'); themeIconQuickModal.className = "w-4 h-4 text-amber-500"; }
    if (themeLabelViewer) themeLabelViewer.textContent = "Claro";
  }

  lucide.createIcons();
}

function cycleTheme() {
  if (state.theme === 'light') applyTheme('dark');
  else if (state.theme === 'dark') applyTheme('sepia');
  else applyTheme('light');
}

function changeFontSize(delta) {
  state.fontSizeLevel = Math.max(-1, Math.min(2, state.fontSizeLevel + delta));
  const article = $('#articleContent');
  article.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xl');
  if (state.fontSizeLevel === -1) article.classList.add('text-sm');
  else if (state.fontSizeLevel === 0) article.classList.add('text-base');
  else if (state.fontSizeLevel === 1) article.classList.add('text-lg');
  else if (state.fontSizeLevel === 2) article.classList.add('text-xl');
}

function toggleReadingWidth() {
  state.isFullWidth = !state.isFullWidth;
  const container = $('#readingContainer');
  const icon = $('#widthIcon');
  if (state.isFullWidth) {
    container.classList.remove('max-w-3xl');
    container.classList.add('max-w-5xl');
    icon.setAttribute('data-lucide', 'minimize-2');
  } else {
    container.classList.remove('max-w-5xl');
    container.classList.add('max-w-3xl');
    icon.setAttribute('data-lucide', 'maximize-2');
  }
  lucide.createIcons();
}

function toggleSidebar(forceState) {
  const sidebar = $('#sidebar');
  const backdrop = $('#sidebarBackdrop');
  state.sidebarOpen = typeof forceState === 'boolean' ? forceState : !state.sidebarOpen;

  if (state.sidebarOpen) {
    sidebar.classList.remove('-translate-x-full');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
  } else {
    sidebar.classList.add('-translate-x-full');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
  }
}

function handleSidebarToggle() {
  const sidebar = $('#sidebar');
  if (window.innerWidth >= 1024) {
    sidebar.classList.toggle('lg:hidden');
  } else {
    toggleSidebar();
  }
}

function switchSidebarTab(tab) {
  const tabNavBtn = $('#tabNavBtn');
  const tabTocBtn = $('#tabTocBtn');
  const tabNavContent = $('#tabNavContent');
  const tabTocContent = $('#tabTocContent');

  if (tab === 'nav') {
    tabNavBtn.className = "flex-1 py-1.5 rounded-lg text-center bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm transition-all flex items-center justify-center gap-1.5 font-semibold";
    tabTocBtn.className = "flex-1 py-1.5 rounded-lg text-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all flex items-center justify-center gap-1.5";
    tabNavContent.classList.remove('hidden');
    tabTocContent.classList.add('hidden');
  } else {
    tabTocBtn.className = "flex-1 py-1.5 rounded-lg text-center bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm transition-all flex items-center justify-center gap-1.5 font-semibold";
    tabNavBtn.className = "flex-1 py-1.5 rounded-lg text-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all flex items-center justify-center gap-1.5";
    tabTocContent.classList.remove('hidden');
    tabNavContent.classList.add('hidden');
  }
  lucide.createIcons();
}

function filterSidebarItems(query) {
  const q = query.toLowerCase().trim();
  const unitButtons = $$('#tabNavContent .sidebar-unit-btn');
  unitButtons.forEach(btn => {
    const text = btn.textContent.toLowerCase();
    btn.style.display = text.includes(q) ? 'flex' : 'none';
  });

  // Mostrar u ocultar subcarpetas según si tienen elementos coincidentes
  $$('#tabNavContent details.sidebar-subfolder').forEach(folder => {
    if (!q) {
      folder.style.display = 'block';
      return;
    }
    const hasVisibleChild = Array.from(folder.querySelectorAll('.sidebar-unit-btn')).some(b => b.style.display !== 'none');
    folder.style.display = hasVisibleChild ? 'block' : 'none';
    if (hasVisibleChild) folder.open = true;
  });

  // Filtrar enlaces de apartados en el tab ToC
  $$('#tabTocContent a').forEach(el => {
    const text = el.textContent.toLowerCase();
    el.style.display = text.includes(q) ? 'flex' : 'none';
  });
}

function toggleMobileToc() {
  const modal = $('#mobileTocModal');
  modal.classList.toggle('hidden');
  modal.classList.toggle('flex');
}

function copySnippetCode(button) {
  const figure = button.closest('.code-block');
  const code = figure.querySelector('pre code').textContent;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(() => {
      showToast('Código copiado al portapapeles');
    }).catch(() => fallbackCopy(code));
  } else {
    fallbackCopy(code);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast('Código copiado al portapapeles');
  } catch (e) {
    showToast('Error al copiar');
  }
  document.body.removeChild(textarea);
}

function showToast(message) {
  const toast = $('#toast');
  $('#toastText').textContent = message;
  toast.classList.remove('opacity-0', 'pointer-events-none');
  setTimeout(() => {
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 2200);
}

// Escuchador de scroll para barra de progreso
$('#mainScrollArea').addEventListener('scroll', () => {
  const main = $('#mainScrollArea');
  const progress = (main.scrollTop / (main.scrollHeight - main.clientHeight)) * 100;
  $('#readProgressBar').style.width = `${Math.min(100, Math.max(0, progress))}%`;
});

// Atajos de teclado
window.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + B: Toggle sidebar
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
    e.preventDefault();
    handleSidebarToggle();
  }
  // Escape: Cerrar modales o sidebar móvil
  if (e.key === 'Escape') {
    const modal = $('#mobileTocModal');
    if (!modal.classList.contains('hidden')) {
      toggleMobileToc();
    } else if (state.sidebarOpen) {
      toggleSidebar(false);
    }
  }
});

/* ==========================================================================
   CONTENIDO MARKDOWN DE MUESTRA PARA FALLBACK
   ========================================================================== */
function getSampleMarkdown(unit) {
  return `
## Introducción a ${unit.title}

El estudio sistemático de esta materia establece los principios de arquitectura, rendimiento y cumplimiento de normativas internacionales.

::: cifras
4 Capas|Modelo TCP/IP
100%|Conformidad W3C
< 50ms|Latencia Objetivo
:::

## Conceptos Fundamentales y Estructura

En esta sección se detallan las interfaces y contratos fundamentales entre componentes:

\`\`\`javascript title="app-server.js"
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', timestamp: Date.now() }));
});

server.listen(3000, () => console.log('Servidor en ejecución en puerto 3000'));
\`\`\`

::: examen Cuestión típica de examen
Recuerda que la semántica estricta y el cierre correcto de etiquetas influyen directamente en la construcción del árbol DOM y la accesibilidad.
:::

## Flujo de Trabajo Recomendado

::: proceso
Análisis de Requisitos -> Diseño de Arquitectura -> Implementación Semántica -> Validación W3C
:::

::: practica En el laboratorio
Utiliza el inspector de red y el validador oficial para certificar que no existen advertencias en tiempo de ejecución.
:::
`;
}

/* ==========================================================================
   INICIALIZACIÓN DE LA APLICACIÓN
   ========================================================================== */
async function initApp() {
  configureMarkdownParser();
  applyTheme(state.theme);

  await loadApplicationCatalog();

  await initializeNavigation();
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
