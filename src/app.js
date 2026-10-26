/* El visor lee el catálogo y los .md. Aquí no se enumeran asignaturas. */
const $ = selector => document.querySelector(selector);
const markdown = window.marked.marked || window.marked;
const state = { markdownUrl: null, ids: new Map(), observer: null };
const BLOCKS = new Set(['aviso', 'examen', 'practica', 'proyecto', 'pregunta', 'proceso', 'cifras']);
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function formatUnitLabel(unit) {
  if (unit.parte != null) return `${unit.number}.${unit.parte}`;
  if (unit.number == null) return '';
  return String(unit.number).padStart(2, '0');
}
function safeUrl(href) {
  if (!href) return null;
  if (href.startsWith('#')) return href;
  try {
    const base = href.startsWith('?u=') ? new URL('./', location.href) : state.markdownUrl;
    const url = new URL(href, base);
    return ['http:', 'https:', 'mailto:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}
function slug(value) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'apartado';
}
function uniqueId(id) {
  const n = state.ids.get(id) || 0;
  state.ids.set(id, n + 1);
  return n ? `${id}-${n + 1}` : id;
}
function renderHeading(token) {
  const match = /\s+\{#([a-z0-9-]+)\}$/.exec(token.text);
  const title = match ? token.text.slice(0, -match[0].length) : token.text;
  const id = uniqueId(match ? match[1] : slug(title.replace(/[`*_]/g, '')));
  return `<h${token.depth} id="${id}">${markdown.parseInline(title)}</h${token.depth}>\n`;
}
const HLJS_LANG = { texto: 'plaintext', text: 'plaintext' };
function highlightCodeBlocks(root) {
  const hljs = window.hljs;
  if (!hljs) return;
  for (const code of root.querySelectorAll('.code-block code[class*="language-"]')) {
    const raw = /language-([a-z0-9+#-]+)/i.exec(code.className)?.[1]?.toLowerCase() || '';
    const lang = HLJS_LANG[raw] || raw;
    if (lang && hljs.getLanguage(lang)) hljs.highlightElement(code);
    else code.classList.add('hljs');
  }
}
function renderCode(token) {
  const info = token.lang || '';
  const lang = /^([a-z0-9+#-]+)/i.exec(info)?.[1] || 'texto';
  const title = /\btitle="([^"]+)"/.exec(info)?.[1] || '';
  const origin = /\borigen="([^"]+)"/.exec(info)?.[1] || '';
  const label = [title, origin].filter(Boolean).join(' · ') || lang;
  return `<figure class="code-block"><figcaption><span>${escape(label)}</span><button type="button" class="copy-code" aria-label="Copiar código">Copiar</button></figcaption><pre><code class="language-${escape(lang)}">${escape(token.text)}</code></pre></figure>\n`;
}
function renderBlock(token) {
  const { kind, title, body } = token;
  if (kind === 'cifras') {
    return `<div class="overview">${body.trim().split(/\r?\n/).map(line => {
      const [number, label] = line.split('|');
      return `<div><b>${escape((number || '').trim())}</b><span>${escape((label || '').trim())}</span></div>`;
    }).join('')}</div>`;
  }
  if (kind === 'proceso') {
    return `<div class="flow">${body.trim().split(/\s*(?:→|->)\s*/).map((part, i) =>
      (i ? '<i aria-hidden="true">→</i>' : '') + `<span>${escape(part)}</span>`).join('')}</div>`;
  }
  const content = this.parser.parse(token.tokens);
  const label = markdown.parseInline(title);
  if (kind === 'pregunta') return `<details class="question"><summary>${label}</summary><div>${content}</div></details>\n`;
  const css = { aviso: 'note', examen: 'note exam', practica: 'lab', proyecto: 'lab project-card' }[kind];
  const heading = kind === 'practica' || kind === 'proyecto';
  return `<aside class="${css}"><strong class="block-label">${heading ? 'EN EL PROYECTO' : kind === 'examen' ? 'DE EXAMEN' : label || 'OJO'}</strong>${heading ? `<h3>${label}</h3>` : ''}<div>${content}</div></aside>\n`;
}
markdown.use({
  gfm: true,
  renderer: {
    heading: renderHeading,
    code: renderCode,
    html(token) { return escape(token.text); },
    link(token) {
      const href = safeUrl(token.href);
      const label = this.parser.parseInline(token.tokens);
      if (!href) return label;
      const external = /^https?:\/\//.test(href) && new URL(href).origin !== location.origin;
      return `<a href="${escape(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
    },
    image(token) {
      const url = safeUrl(token.href);
      return url ? `<img src="${escape(url)}" alt="${escape(token.text || '')}" loading="lazy">` : '';
    }
  },
  extensions: [{
    name: 'study-block', level: 'block',
    tokenizer(source) {
      const m = /^:::[ \t]+([a-z]+)(?:[ \t]+([^\n]*))?\n([\s\S]*?)\n:::(?:\n|$)/.exec(source);
      if (!m || !BLOCKS.has(m[1])) return;
      return { type: 'study-block', raw: m[0], kind: m[1], title: m[2] || '', body: m[3], tokens: this.lexer.blockTokens(m[3]) };
    },
    renderer: renderBlock
  }]
});
function unitMap(subject) { return new Map(subject.units.map(u => [u.id, u])); }
function findTrail(nodes, id, trail = []) {
  for (const n of nodes) {
    if (n.type === 'unit' && n.id === id) return trail;
    if (n.type === 'group') {
      const found = findTrail(n.children, id, [...trail, n]);
      if (found) return found;
    }
  }
  return null;
}
function unitLink(subject, unit, selected) {
  const a = document.createElement('a');
  a.href = `?u=${encodeURIComponent(subject.id + '/' + unit.id)}`;
  const label = formatUnitLabel(unit);
  if (label) {
    const number = document.createElement('span');
    number.textContent = label;
    a.append(number);
  }
  a.append(document.createTextNode(unit.title));
  if (selected && unit.id === selected.id) {
    a.classList.add('active');
    a.setAttribute('aria-current', 'page');
  }
  return a;
}
function containsUnit(node, id) {
  return node.children.some(c => c.type === 'unit' ? c.id === id : containsUnit(c, id));
}
function treeNav(nodes, subject, units, selected) {
  const box = document.createElement('div');
  box.className = 'tree';
  for (const node of nodes) {
    if (node.type === 'unit') { box.append(unitLink(subject, units.get(node.id), selected)); continue; }
    const details = document.createElement('details');
    details.className = 'tree-group';
    details.open = containsUnit(node, selected.id);
    const summary = document.createElement('summary');
    summary.textContent = node.title;
    details.append(summary, treeNav(node.children, subject, units, selected));
    box.append(details);
  }
  return box;
}
function sidebar(subject, selectedUnit) {
  const nav = $('#unidades');
  nav.replaceChildren();
  const group = document.createElement('div');
  group.className = 'subject-group';
  const label = document.createElement('strong');
  label.textContent = subject.title;
  group.append(label, treeNav(subject.tree, subject, unitMap(subject), selectedUnit));
  nav.append(group);
}
function fileList(unit) {
  const nav = $('#archivos');
  nav.replaceChildren();
  const none = !unit.files?.length;
  $('#archivos-label').hidden = none;
  nav.hidden = none;
  for (const file of unit.files || []) {
    const a = document.createElement('a');
    a.href = new URL(file.path, document.baseURI).href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = 'file-link';
    a.textContent = file.name;
    nav.append(a);
  }
}
function overview(subject) {
  document.body.classList.add('home');
  document.title = subject.title;
  $('#ruta').textContent = subject.title.toUpperCase();
  const units = unitMap(subject);
  const wrap = document.createElement('section');
  wrap.className = 'home-intro subject-overview';
  const back = document.createElement('a');
  back.href = './';
  back.textContent = '← Todas las asignaturas';
  back.className = 'overview-back';
  const h1 = document.createElement('h1');
  h1.textContent = subject.title;
  wrap.append(back, h1);
  const loose = subject.tree.filter(n => n.type === 'unit');
  const cards = subject.tree.filter(n => n.type === 'group');
  if (loose.length) cards.unshift({ type: 'group', id: '_sueltas', title: 'Unidades', children: loose });
  const list = (nodes, depth) => {
    const ul = document.createElement('ul');
    ul.className = 'overview-list';
    for (const node of nodes) {
      const li = document.createElement('li');
      if (node.type === 'unit') {
        const a = unitLink(subject, units.get(node.id));
        a.className = 'overview-unit';
        li.append(a);
      } else {
        const name = document.createElement('span');
        name.className = 'overview-folder';
        name.textContent = node.title;
        li.append(name);
        if (node.children.length) li.append(list(node.children, depth + 1));
        else {
          const empty = document.createElement('small');
          empty.textContent = 'Sin contenido todavía';
          li.append(empty);
        }
      }
      ul.append(li);
    }
    return ul;
  };
  for (const card of cards) {
    const section = document.createElement('section');
    section.className = 'overview-card';
    const h2 = document.createElement('h2');
    h2.textContent = card.title;
    section.append(h2, list(card.children, 0));
    wrap.append(section);
  }
  $('#contenido').replaceChildren(wrap);
}
function home(catalog) {
  document.body.classList.add('home');
  document.title = 'Apuntes universitarios';
  $('#ruta').textContent = 'APUNTES';
  const wrap = document.createElement('section');
  wrap.className = 'home-intro';
  const h1 = document.createElement('h1'); h1.textContent = 'Elige una asignatura';
  const p = document.createElement('p'); p.textContent = 'Los apuntes se cargan solo al entrar en la asignatura.';
  const grid = document.createElement('div');
  grid.className = 'subject-grid';
  for (const subject of catalog.subjects) {
    const a = document.createElement('a');
    a.className = 'subject-card';
    a.href = `?u=${encodeURIComponent(subject.id)}`;
    const initial = document.createElement('span'); initial.className = 'subject-initial'; initial.textContent = subject.title.trim().charAt(0).toUpperCase();
    const name = document.createElement('strong'); name.textContent = subject.title;
    const count = document.createElement('small'); count.textContent = subject.count === 1 ? '1 unidad' : `${subject.count} unidades`;
    a.append(initial, name, count);
    grid.append(a);
  }
  wrap.append(h1, p, grid);
  $('#contenido').replaceChildren(wrap);
}
function content(markdownText, subject, unit) {
  state.ids.clear();
  const text = markdownText.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const buffer = document.createElement('div');
  buffer.innerHTML = markdown.parse(text);
  const output = document.createDocumentFragment();
  let section = document.createElement('section');
  section.className = 'intro';
  section.id = 'inicio';
  const eyebrow = document.createElement('div');
  eyebrow.className = 'eyebrow';
  const trail = (findTrail(subject.tree, unit.id) || []).map(g => g.title);
  eyebrow.textContent = [subject.title, ...trail].join(' · ').toUpperCase();
  section.append(eyebrow);
  for (const element of [...buffer.children]) {
    if (element.tagName === 'H2') {
      output.append(section);
      section = document.createElement('section');
      section.className = 'chapter';
      section.setAttribute('aria-labelledby', element.id);
    }
    section.append(element);
  }
  output.append(section);
  $('#contenido').replaceChildren(output);
  highlightCodeBlocks($('#contenido'));
  const nav = $('#apartados');
  nav.replaceChildren();
  for (const h of $('#contenido').querySelectorAll('h2, h3[id]')) {
    const a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    if (h.tagName === 'H3') a.className = 'subheading';
    nav.append(a);
  }
  state.observer?.disconnect();
  state.observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) nav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.hash === '#' + entry.target.id));
    }
  }, { rootMargin: '-10% 0px -82% 0px' });
  $('#contenido').querySelectorAll('h2,h3[id]').forEach(h => state.observer.observe(h));
  if (location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView());
}
async function loadJson(path) {
  const response = await fetch(new URL(path, document.baseURI));
  if (!response.ok) throw new Error(`No se pudo cargar ${path}`);
  return response.json();
}
async function init() {
  try {
    const catalog = await loadJson('catalogo.json');
    const requested = new URLSearchParams(location.search).get('u');
    const [subjectId, unitId] = requested?.split('/') || [];
    const entry = catalog.subjects.find(s => s.id === subjectId);
    if (!entry) return home(catalog);
    // Solo se descarga el catálogo y el .md de la asignatura/unidad elegidas.
    const subject = await loadJson(`catalogo/${encodeURIComponent(entry.id)}.json`);
    const chosen = subject.units.find(u => u.id === unitId);
    // Sin unidad indicada: si la asignatura tiene grupos se muestra su estructura; si no, la primera unidad.
    if (!chosen && !unitId && subject.tree.some(n => n.type === 'group')) return overview(subject);
    const unit = chosen || subject.units[0];
    const source = await fetch(new URL(unit.path, document.baseURI));
    if (!source.ok) throw new Error(`No se pudo cargar ${unit.path}`);
    state.markdownUrl = source.url;
    sidebar(subject, unit);
    content(await source.text(), subject, unit);
    document.title = `${unit.title} · ${subject.title}`;
    const trail = (findTrail(subject.tree, unit.id) || []).map(g => g.title);
    $('#ruta').textContent = [subject.title, ...trail, formatUnitLabel(unit) ? `Unidad ${formatUnitLabel(unit)}` : unit.title].join(' / ').toUpperCase();
    fileList(unit);
    for (const a of [$('#fuente'), $('#pdf-top')]) {
      a.hidden = !unit.source;
      if (unit.source) a.href = new URL(unit.source, state.markdownUrl).href;
    }
  } catch (error) {
    document.body.classList.add('home');
    const h = document.createElement('h1'); h.textContent = 'No se pudieron cargar los apuntes';
    const p = document.createElement('p'); p.textContent = error.message;
    const back = document.createElement('a'); back.href = './'; back.textContent = '← Volver a asignaturas';
    $('#contenido').replaceChildren(h, p, back);
  }
}
$('#menu').addEventListener('click', () => {
  const open = $('#indice').classList.toggle('open');
  $('#menu').setAttribute('aria-expanded', String(open));
});
$('#indice').addEventListener('click', event => {
  if (event.target.closest('a')) {
    $('#indice').classList.remove('open');
    $('#menu').setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    $('#indice').classList.remove('open');
    $('#menu').setAttribute('aria-expanded', 'false');
  }
});
$('#contenido').addEventListener('click', async event => {
  const button = event.target.closest('.copy-code');
  if (!button) return;
  try {
    await navigator.clipboard.writeText(button.closest('figure').querySelector('code').textContent);
    button.textContent = 'Copiado';
    setTimeout(() => { button.textContent = 'Copiar'; }, 1600);
  } catch { button.textContent = 'No disponible'; }
});
init();
