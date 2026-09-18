import { mkdir, readFile, writeFile } from 'node:fs/promises';

// GitHub Pages only uses the root 404.html. Physical entry points also work
// when dist is copied into a directory of another Pages repository.
const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
for (const route of ['admin', 'admin/content', 'admin/appearance', 'admin/leads', 'admin/database']) {
  const directory = new URL(`../dist/${route}/`, import.meta.url);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL('index.html', directory), html);
}
