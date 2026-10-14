import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read = file => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const model = JSON.parse(read('er-model.json'));
assert.equal(model.tables.length, 10);
assert.equal(new Set(model.tables.map(t => t.name)).size, 10);
assert.equal(model.relationships.length, 9);
assert.equal(model.questions.length, 14);
const svg = read('dist/unit4-er-ten-table.svg');
assert.equal((svg.match(/data-entity=/g) || []).length, 10);
assert.equal((svg.match(/<circle /g) || []).length, 9, 'Every child endpoint is optional, including Attendance');
assert.match(svg, /translate\(1120 1165\) rotate\(180\)"><circle[^>]+\/><path d="M-11 -12V12"/,
  'Attendance endpoint must be zero-or-one, not exactly one');
const chapter = { id: 'unit4-design', sections: [] };
vm.runInNewContext(read('dist/unit4-er-interpretation.js'), { chapters: [chapter] });
assert.equal(chapter.sections.length, 1);
assert.equal((chapter.sections[0][1].match(/<summary>Show explained answer/g) || []).length, 14);
assert.ok(chapter.sections[0][1].includes('unit4-er-ten-table.svg'));
const shell = read('dist/index.html');
assert.match(read('dist/unit4-er-interpretation.html'), /<main id="main">/,
  'Standalone worksheet must provide the shared scroll helper’s container');
assert.ok(shell.indexOf('src="unit4-er-interpretation.js"') > shell.indexOf('src="unit4-chapters.js"'));
assert.ok(shell.indexOf('src="unit4-er-interpretation.js"') < shell.indexOf('src="reader.js"'));

const details = [{ open: false, classList: { add() {} } }, { open: true, classList: { add() {} } }];
let answers = false;
const events = {};
const controls = {};
let atPrint;
const context = vm.createContext({
  document: {
    querySelectorAll: () => details,
    getElementById: id => controls[id] ||= {},
    body: { classList: { toggle(_, value) { answers = value; }, remove() { answers = false; } } }
  },
  window: { addEventListener(name, fn) { events[name] = fn; }, print() { atPrint(); } }
});
vm.runInContext(read('dist/unit4-er-print.js'), context);
for (const mode of [false, true]) {
  atPrint = () => {
    assert.equal(answers, mode);
    assert.ok(details.every(d => d.open));
    events.beforeprint();
    events.afterprint();
  };
  controls[mode ? 'answers-print' : 'questions-print'].onclick();
  assert.deepEqual(details.map(d => d.open), [false, true], 'Print/cancel preserves answer disclosures');
  assert.equal(answers, false);
}
events.beforeprint();
assert.equal(answers, false, 'Browser-menu printing defaults to questions');
events.afterprint();
console.log('Ten-table model, optional Attendance symbols, question integration and worksheet print modes passed.');
