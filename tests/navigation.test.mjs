import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

let activate;
const calls = [];
const main = {
  focus(options) { calls.push(['focus', options]); },
  scrollIntoView(options) { calls.push(['scroll', options]); }
};
vm.runInNewContext(fs.readFileSync(new URL('../dist/navigation.js', import.meta.url), 'utf8'), {
  document: {
    querySelector(selector) {
      assert.equal(selector, '.skip');
      return { addEventListener(type, handler) { assert.equal(type, 'click'); activate = handler; } };
    },
    getElementById(id) { assert.equal(id, 'main'); return main; }
  },
  location: new Proxy({}, { get() { throw new Error('Skip must not read or change the route'); }, set() { throw new Error('Skip must not change the route'); } })
});
activate({ preventDefault() { calls.push(['preventDefault']); } });
assert.equal(JSON.stringify(calls), JSON.stringify([
  ['preventDefault'], ['focus', { preventScroll: true }], ['scroll', { block: 'start' }]
]));
const html = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
assert.match(html, /<main id="main" tabindex="-1" aria-label="Textbook content">/);
assert.ok(html.indexOf('<main ') < html.indexOf('src="navigation.js"'));
console.log('Skip-link regression checks passed.');
