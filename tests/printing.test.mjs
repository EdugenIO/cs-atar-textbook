import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const details = [{ open: true }, { open: false }, { open: false }];
const body = { dataset: {} };
const events = {};
let atDialog;
const context = vm.createContext({
  document: { body, querySelectorAll(selector) { assert.equal(selector, 'main details'); return details; } },
  window: {
    addEventListener(name, handler) { events[name] = handler; },
    print() { atDialog(); }
  }
});
const source = fs.readFileSync(new URL('../dist/printing.js', import.meta.url), 'utf8');
vm.runInContext(source.replace(/setupChapterPrinting\(\);\s*$/, ''), context);

for (const mode of ['student', 'answers']) {
  atDialog = () => {
    assert.equal(body.dataset.printMode, mode);
    assert.ok(details.every(d => d.open));
    events.beforeprint(); // Repeated preparation must retain the original snapshot.
    events.afterprint(); // Applies to print and cancel.
  };
  vm.runInContext(`printChapter('${mode}')`, context);
  assert.deepEqual(details.map(d => d.open), [true, false, false]);
  assert.equal(body.dataset.printMode, undefined);
}

// Browser-menu / Ctrl+P defaults to student, regardless of the last chosen mode.
events.beforeprint();
assert.equal(body.dataset.printMode, 'student');
events.afterprint();
assert.deepEqual(details.map(d => d.open), [true, false, false]);

// A failed print call must restore the page as well.
atDialog = () => { throw new Error('Print unavailable'); };
assert.throws(() => vm.runInContext("printChapter('answers')", context), /Print unavailable/);
assert.deepEqual(details.map(d => d.open), [true, false, false]);
assert.equal(body.dataset.printMode, undefined);
console.log('Print modes, default student printing, cancellation and error restoration passed.');
