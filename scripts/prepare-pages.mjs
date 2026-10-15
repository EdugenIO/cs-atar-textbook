import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Version runtime assets when packaging Pages, without changing source/test URLs.
const root = path.resolve('dist');
const index = path.join(root, 'index.html');
const html = fs.readFileSync(index, 'utf8');
let count = 0;
const versioned = html.replace(/(src|href)="([^"?#]+\.(?:js|css))(?:\?[^"#]*)?"/g, (match, attribute, file) => {
  if (/^(?:https?:|\/\/)/.test(file)) return match;
  const target = path.resolve(root, file);
  if (!target.startsWith(root + path.sep)) throw new Error('Asset outside dist');
  const hash = crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex').slice(0, 12);
  count++;
  return `${attribute}="${file}?v=${hash}"`;
});
if (!count) throw new Error('No runtime assets found');
fs.writeFileSync(index, versioned);
console.log(`Versioned ${count} runtime assets for GitHub Pages.`);
