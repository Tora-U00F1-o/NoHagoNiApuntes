import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { watch } from 'node:fs';
import { spawn } from 'node:child_process';

const dir = resolve(fileURLToPath(new URL('.', import.meta.url)), '..', 'dist');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const path = resolve(dir, '.' + pathname, pathname.endsWith('/') ? 'index.html' : '');
    if (path !== dir && !path.startsWith(dir + sep)) throw new Error('Ruta no permitida');
    if (!(await stat(path)).isFile()) throw new Error('No es un archivo');
    res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream' });
    res.end(await readFile(path));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('No encontrado');
  }
});
const port = Number(process.env.PORT || 8000);
server.listen(port, '127.0.0.1', () => console.log(`http://127.0.0.1:${port}/`));

// Recompila dist/ al cambiar src/ o contenido/ (recarga el navegador con F5).
const root = resolve(dir, '..');
const script = resolve(root, 'scripts', 'build.mjs');
let timer, building = false, pending = false;
function rebuild() {
  if (building) { pending = true; return; }
  building = true;
  spawn(process.execPath, [script], { stdio: 'inherit' }).on('exit', () => {
    building = false;
    if (pending) { pending = false; rebuild(); }
  });
}
for (const folder of ['src', 'contenido']) {
  watch(resolve(root, folder), { recursive: true }, () => { clearTimeout(timer); timer = setTimeout(rebuild, 300); });
}