import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../dist/',import.meta.url);
const context=vm.createContext({selection:()=>'<article>Original selection retained</article>'});
const run=file=>vm.runInContext(fs.readFileSync(new URL(file,root),'utf8'),context);
for(const file of ['chapters.js','project-chapter.js','network-chapters.js','audit-chapters.js','unit2-chapters.js','unit2-review-chapters.js','unit3-chapters.js','unit4-chapters.js','unit4-er-interpretation.js','unit4-data-quality.js'])run(file);
for(const unit of [1,2,3,4])run(`learning-guides-unit${unit}.js`);
run('learning-support.js');
const before=JSON.parse(vm.runInContext('JSON.stringify(chapters)',context));
run('depth-data.js');run('depth.js');
const data=JSON.parse(vm.runInContext('JSON.stringify(teachingDepth)',context));
const after=JSON.parse(vm.runInContext('JSON.stringify(chapters)',context));
assert.equal(data.checkRoutes.length,50);
assert.deepEqual([...data.checkRoutes].sort(),[...before.map(c=>c.id),'selection'].sort());
assert.equal(data.modules.length,92);
assert.equal(Object.keys(data.examples).length,30);
for(const chapter of before){
  const updated=after.find(c=>c.id===chapter.id);
  assert.equal(updated.code,chapter.code);
  assert.equal(updated.solution,chapter.solution);
  assert.deepEqual(updated.practice,chapter.practice);
  let previous=-1;
  for(const section of chapter.sections){
    const index=updated.sections.findIndex(s=>s[0]===section[0]);
    assert.ok(index>previous,chapter.id+' retains original section order');
    assert.deepEqual(updated.sections[index],section,chapter.id+' retains original content');
    previous=index;
  }
}
const routeSet=new Set(before.map(c=>c.id));routeSet.add('selection');
for(const m of data.modules){
  assert.ok(routeSet.has(m.route));
  for(const key of ['title','explanation','predict','guided','independent','answer','delayed'])assert.ok(m[key]?.trim());
  for(const file of m.files)assert.ok(fs.existsSync(new URL('depth/'+file,root)));
  context.moduleProbe=m;
  const html=vm.runInContext('renderTeachingDepth(moduleProbe)',context);
  assert.match(html,/Guided completion/);assert.match(html,/Independent transfer/);assert.match(html,/Delayed retrieval/);
  assert.match(html,/<details class="print-answer">/);
  assert.doesNotMatch(html,/<details[^>]*\bopen\b/);
  if(m.checks)assert.equal(m.checks.length,2);
  assert.doesNotMatch(html,/<script|<form|<input/);
}
const selection=vm.runInContext('selection()',context);
assert.match(selection,/Original selection retained/);
assert.match(selection,/Executable checks at the decision boundary/);
assert.match(selection,/data-depth-route="selection"/);
const html=fs.readFileSync(new URL('index.html',root),'utf8');
assert.ok(html.indexOf('src="app.js"')<html.indexOf('src="depth.js"'));
assert.ok(html.indexOf('src="depth.js"')<html.indexOf('src="reader.js"'));
assert.ok(html.indexOf('src="depth.js"')<html.indexOf('src="search.js'));
assert.match(data.modules.find(m=>m.route==='unit3-objects').explanation,/no enforced protected/);
assert.match(data.modules.find(m=>m.route==='unit3-structures').explanation,/not a promise/);
assert.match(data.modules.find(m=>m.route==='unit4-crypto').explanation,/does not use the older RSA/);
console.log('50 chapter clinics, 92 scaffolded modules, 30 downloads, legacy selection, original-content preservation and hidden/print-safe explanations passed.');
