import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),dist=new URL('dist/',root);
const c=vm.createContext({});vm.runInContext(fs.readFileSync(new URL('teaching-planner-data.js',dist),'utf8'),c);const units=JSON.parse(vm.runInContext('JSON.stringify(teachingSchedule)',c));
const allocations=JSON.parse(fs.readFileSync(new URL('pygame/allocation.json',dist),'utf8'));
assert.equal(allocations.length,8);assert.equal(units.flatMap(u=>u.weeks.flatMap(w=>w.lessons)).filter(l=>l.pygamePractice).length,8);
const html=fs.readFileSync(new URL('pygame/index.html',dist),'utf8');
for(const row of allocations){const u=units[row.unit-1],l=u.weeks[row.week-1].lessons[row.lesson-1];assert.ok(row.week<(row.unit===1?8:7));assert.equal(l.pygameBridge,`pygame/index.html#${row.anchor}`);assert.ok(html.includes(`id="${row.anchor}"`));assert.equal(l.kind==='Project workshop',false);assert.equal(l.pygameTiming.reduce((a,b)=>a+b),55);assert.ok(l.objective);assert.ok(l.activity.includes('Pygame practice'));assert.ok(l.check);}
assert.deepEqual(units.map(u=>u.weeks.flatMap(w=>w.lessons).filter(l=>l.kind==='Project workshop').length),[10,14,12,16]);
assert.equal(units[0].weeks[6].lessons[3].kind,'Practical assessment slot');assert.ok(units[2].weeks[5].lessons[3].title.includes('controlled programming practical'));
assert.equal(units.flatMap(u=>u.weeks.flatMap(w=>w.lessons)).length,256);
for(const file of ['README.md','workbook.md','readiness.csv','practice-tests.csv','stage1_loop.py','lab_rules.py','lab_runner.py','extension12.py','stage5_oop.py','faded_practice.py','requirements.txt','verification.md','pygame-teaching-pack.zip'])assert.ok(fs.existsSync(new URL('pygame/'+file,dist)),file);
const planner=fs.readFileSync(new URL('teaching-planner.js',dist),'utf8');assert.ok(planner.includes('lesson.pygamePractice'));assert.ok(planner.includes('lesson.pygameBridge'));
const reader=fs.readFileSync(new URL('reader.js',dist),'utf8');assert.ok(reader.includes('${renderPygamePreparation(ch.id)}'));const prepare=vm.runInContext(reader.slice(0,reader.indexOf('const textbookSectionLabels'))+';renderPygamePreparation',vm.createContext({}));for(const id of ['loops','functions','arrays','files','unit3-fluency','unit3-structures','unit3-objects','unit3-inheritance','design','unit3-project'])assert.ok(prepare(id).includes('pygame/index.html#'));
assert.equal(prepare('unit4-sql'),'');
console.log('Eight timed pre-project bridge slots, original assessment slots, 256 lessons, chapter links and complete practice resources passed.');
