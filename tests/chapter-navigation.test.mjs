import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
let onChange;
const calls = [];
const heading = { focus(options) { calls.push(['heading', options]); } };
let hasHeading = true;
const main = {
  querySelector(selector) { assert.equal(selector, 'h1'); return hasHeading ? heading : null; },
  focus(options) { calls.push(['main', options]); },
  scrollIntoView(options) { calls.push(['scroll', options]); }
};
vm.runInNewContext(fs.readFileSync(new URL('../dist/chapter-navigation.js', import.meta.url), 'utf8'), {
  window: { addEventListener(event, handler) { assert.equal(event, 'hashchange'); onChange = handler; } },
  document: { getElementById(id) { assert.equal(id, 'main'); return main; } }
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
const html = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
assert.ok(html.indexOf('src="chapter-navigation.js"') > html.indexOf('src="printing.js"'));
assert.ok(html.indexOf('src="chapter-navigation.js"') > html.indexOf('src="reader.js"'));
console.log('Chapter focus, initial-load behaviour, fallback and script order passed.');
