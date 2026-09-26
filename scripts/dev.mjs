import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const dir = resolve(import.meta.dirname, '..', 'dist');
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
