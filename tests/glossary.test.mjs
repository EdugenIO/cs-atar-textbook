import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read = name => fs.readFileSync(new URL(`../dist/${name}`, import.meta.url), 'utf8');
const context = vm.createContext({ encodeURIComponent });
vm.runInContext(read('navigation.js').split('// Keep the skip link')[0], context);
for (const file of ['chapters.js', 'project-chapter.js', 'network-chapters.js', 'audit-chapters.js', 'unit2-chapters.js', 'unit2-review-chapters.js', 'unit3-chapters.js', 'unit4-chapters.js', 'app.js']) {
  vm.runInContext(read(file), context);
}
const previousTerms = vm.runInContext('Object.keys(terms)', context);
vm.runInContext(read('glossary.js'), context);
const entries = vm.runInContext('glossaryEntries', context);
const names = entries.map(([term]) => term);
assert.ok(entries.length > previousTerms.length);
for (const term of previousTerms) assert.ok(names.includes(term), `Retain original term ${term}`);
assert.equal(new Set(names).size, entries.length, 'No duplicate terms');
assert.deepEqual([...names], [...names].sort((a, b) => a.localeCompare(b, 'en-AU', { sensitivity: 'base', numeric: true })));
const ids = vm.runInContext('glossaryEntries.map(([term]) => textbookHeadingId(term))', context);
assert.equal(new Set(ids).size, ids.length, 'Term links must be unique');
const chapters = vm.runInContext('chapters', context);
const chapterIds = new Set(chapters.map(chapter => chapter.id));
const units = new Set();
for (const [term, definition, chapterId] of entries) {
  assert.ok(definition.length > 10, `${term} has a meaningful definition`);
  assert.ok(chapterId === 'selection' || chapterIds.has(chapterId), `${term} links to an existing chapter`);
  units.add(chapters.find(chapter => chapter.id === chapterId)?.unit || 1);
}
assert.deepEqual([...units].sort(), [1, 2, 3, 4]);
const html = vm.runInContext('glossaryPage()', context);
for (const id of ids) {
  assert.ok(html.includes(`id="${id}"`));
  assert.ok(html.includes(`href="#glossary/${encodeURIComponent(id)}"`));
}
console.log(`${entries.length} glossary terms: alphabetical order, retained terms, unique links and all four unit chapter references passed.`);
