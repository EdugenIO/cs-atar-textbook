import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
let onChange;
const calls = [];
const heading = { focus(options) { calls.push(['heading', options]); }, scrollIntoView(options) { calls.push(['scroll', options]); } };
const section = { textContent: 'Binary search: discard half', focus() { calls.push(['section']); }, scrollIntoView() { calls.push(['section-scroll']); } };
const location = { hash: '#unit3-search' };
let hasHeading = true;
const main = {
  querySelectorAll() { return [section]; },
  contains(node) { return node === section; },
  querySelector(selector) { assert.equal(selector, 'h1'); return hasHeading ? heading : null; },
  focus(options) { calls.push(['main', options]); },
  scrollIntoView(options) { calls.push(['scroll', options]); }
};
vm.runInNewContext(fs.readFileSync(new URL('../dist/chapter-navigation.js', import.meta.url), 'utf8'), {
  window: { addEventListener(event, handler) { assert.equal(event, 'hashchange'); onChange = handler; } },
  location,
  textbookHeadingId: () => 'heading-binary-search-discard-half',
  document: { getElementById(id) { return id === 'main' ? main : id === section.id ? section : null; } }
});
assert.equal(calls.length, 0, 'Initial page load must not steal focus');
onChange();
assert.equal(heading.tabIndex, -1);
assert.equal(JSON.stringify(calls), JSON.stringify([['heading', { preventScroll: true }], ['scroll', { block: 'start' }]]));
hasHeading = false;
calls.length = 0;
onChange();
assert.equal(main.tabIndex, -1);
assert.equal(calls[0][0], 'main');
location.hash = '#unit3-search/heading-binary-search-discard-half';
calls.length = 0;
onChange();
assert.deepEqual(calls.map(call => call[0]), ['section', 'section-scroll']);
location.hash = '#unit3-search/unknown';
calls.length = 0;
onChange();
assert.equal(calls[0][0], 'main', 'Missing anchors fall back safely');
const html = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
assert.ok(html.indexOf('src="chapter-navigation.js"') > html.indexOf('src="printing.js"'));
assert.ok(html.indexOf('src="chapter-navigation.js"') > html.indexOf('src="reader.js"'));
console.log('Chapter focus, initial-load behaviour, fallback and script order passed.');
