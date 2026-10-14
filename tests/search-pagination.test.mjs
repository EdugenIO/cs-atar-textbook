import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

let focused;
class Element {
  constructor(tag) { this.tag = tag; this.children = []; this.listeners = {}; this.value = ''; }
  append(child) { this.children.push(child); }
  replaceChildren() { this.children = []; }
  addEventListener(type, callback) { this.listeners[type] = callback; }
  focus() { focused = this; }
}
const input = new Element('input');
const results = new Element('div');
const entries = Array.from({ length: 25 }, (_, i) => ({
  title: `Topic ${String(i).padStart(2, '0')}`, label: `Topic ${String(i).padStart(2, '0')}`,
  href: `#topic-${i}`, headings: ['Boundary tests'], aliases: [], body: 'Shared vocabulary'
}));
const context = vm.createContext({
  encodeURIComponent,
  textbookHeadingId: text => 'heading-' + text.toLowerCase().replaceAll(' ', '-'),
  units: [], terms: {},
  document: {
    getElementById: id => id === 'search' ? input : results,
    createElement: tag => new Element(tag)
  }
});
vm.runInContext(fs.readFileSync(new URL('../dist/search.js', import.meta.url), 'utf8'), context);
context.entries = entries;
vm.runInContext('textbookSearchIndex.push(...entries)', context);
const search = value => { input.value = value; input.listeners.input({ target: input }); };
const links = () => results.children.filter(element => element.tag === 'a');
const more = () => results.children.find(element => element.tag === 'button');

search('Shared');
assert.equal(links().length, 12);
more().listeners.click();
assert.equal(links().length, 24);
assert.equal(focused, links()[12], 'Keyboard focus moves to the first newly exposed result');
more().listeners.click();
assert.equal(links().length, 25);
assert.equal(more(), undefined);
assert.equal(new Set(links().map(link => link.href)).size, 25, 'Every match becomes reachable once');
search('Boundary');
assert.equal(links().length, 12, 'A new query resets the expanded list');
assert.equal(links()[0].href, '#topic-0/heading-boundary-tests');
search('Topic 00');
assert.equal(links().length, 1);
assert.equal(more(), undefined);
search('missing');
assert.equal(links().length, 0);
assert.match(results.children[0].textContent, /No matching topic/);
search('');
assert.equal(results.children.length, 0);

for (const count of [12, 13]) {
  vm.runInContext(`textbookSearchIndex.splice(${count})`, context);
  if (count === 13) vm.runInContext('textbookSearchIndex.push(entries[12])', context);
  search('Shared');
  assert.equal(links().length, 12);
  assert.equal(!!more(), count === 13);
  if (more()) { more().listeners.click(); assert.equal(links().length, 13); }
}
console.log('Search pagination, reachability, query reset, empty states and section destinations passed.');
