import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {addPageControls} from './page-controls.mjs';

// Version runtime assets when packaging Pages, without changing source/test URLs.
const root = path.resolve('dist');
addPageControls(root);
let count = 0;
function htmlFiles(folder) {
  return fs.readdirSync(folder, {withFileTypes:true}).flatMap(entry => entry.isDirectory() ? htmlFiles(path.join(folder,entry.name)) : entry.name.endsWith('.html') ? [path.join(folder,entry.name)] : []);
}
for (const index of htmlFiles(root)) {
const html = fs.readFileSync(index, 'utf8');
const versioned = html.replace(/(src|href)="([^"?#]+\.(?:js|css))(?:\?[^"#]*)?"/g, (match, attribute, file) => {
  if (/^(?:https?:|\/\/)/.test(file)) return match;
  const target = path.resolve(path.dirname(index), file);
  if (!target.startsWith(root + path.sep)) throw new Error('Asset outside dist');
  const hash = crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex').slice(0, 12);
  count++;
  return `${attribute}="${file}?v=${hash}"`;
});
fs.writeFileSync(index, versioned);
}
if (!count) throw new Error('No runtime assets found');
console.log(`Versioned ${count} runtime assets for GitHub Pages.`);
