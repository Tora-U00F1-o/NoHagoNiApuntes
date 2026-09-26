/* El visor lee el catálogo y los .md. Aquí no se enumeran asignaturas. */
const $ = selector => document.querySelector(selector);
const markdown = window.marked.marked || window.marked;
const state = { markdownUrl: null, ids: new Map(), observer: null };
const BLOCKS = new Set(['aviso', 'examen', 'practica', 'proyecto', 'pregunta', 'proceso', 'cifras']);
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
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
function sidebar(catalog, selectedSubject, selectedUnit) {
  const nav = $('#unidades');
  nav.replaceChildren();
  for (const subject of catalog.subjects) {
    const group = document.createElement('div');
    group.className = 'subject-group';
    const label = document.createElement('strong');
    label.textContent = subject.title;
    group.append(label);
    for (const unit of subject.units) {
      const a = document.createElement('a');
      a.href = `?u=${encodeURIComponent(subject.id + '/' + unit.id)}`;
      const number = document.createElement('span');
      number.textContent = String(unit.number).padStart(2, '0');
      a.append(number, document.createTextNode(unit.title));
      if (subject.id === selectedSubject.id && unit.id === selectedUnit.id) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
      group.append(a);
    }
    nav.append(group);
  }
}
function content(markdown, subject, unit) {
  state.ids.clear();
  const text = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
  const buffer = document.createElement('div');
  buffer.innerHTML = markdown.parse(text);
  const output = document.createDocumentFragment();
  let section = document.createElement('section');
  section.className = 'intro';
  section.id = 'inicio';
  const eyebrow = document.createElement('div');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = `${subject.title.toUpperCase()} · UNIDAD ${unit.number}`;
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
async function init() {
  try {
    const response = await fetch(new URL('catalogo.json', document.baseURI));
    if (!response.ok) throw new Error('No se pudo cargar el catálogo');
    const catalog = await response.json();
    const requested = new URLSearchParams(location.search).get('u');
    const [subjectId, unitId] = requested?.split('/') || [];
    const subject = catalog.subjects.find(s => s.id === subjectId) || catalog.subjects[0];
    const unit = subject.units.find(u => u.id === unitId) || subject.units[0];
    const source = await fetch(new URL(unit.path, document.baseURI));
    if (!source.ok) throw new Error(`No se pudo cargar ${unit.path}`);
    state.markdownUrl = source.url;
    sidebar(catalog, subject, unit);
    content(await source.text(), subject, unit);
    document.title = `${unit.title} · ${subject.title}`;
    $('#ruta').textContent = `${subject.title.toUpperCase()} / UNIDAD ${unit.number}`;
    for (const a of [$('#fuente'), $('#pdf-top')]) {
      a.hidden = !unit.source;
      if (unit.source) a.href = new URL(unit.source, state.markdownUrl).href;
    }
  } catch (error) {
    const h = document.createElement('h1'); h.textContent = 'No se pudieron cargar los apuntes';
    const p = document.createElement('p'); p.textContent = error.message;
    $('#contenido').replaceChildren(h, p);
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
