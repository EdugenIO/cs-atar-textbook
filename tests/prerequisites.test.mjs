import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const root=new URL('../dist/',import.meta.url),read=f=>fs.readFileSync(new URL(f+'.js',root),'utf8');
const c=vm.createContext({renderLearningGuide:()=>'',textbookHeadingId:s=>'heading-'+s.toLowerCase().replace(/[^a-z0-9]+/g,'-')});
for(const f of ['app','chapters','project-chapter','network-chapters','audit-chapters','unit2-chapters','unit2-review-chapters','unit3-chapters','unit4-chapters','unit4-er-interpretation','unit4-data-quality','prerequisites'])vm.runInContext(read(f),c);
vm.runInContext(read('reader').split('function downloadText')[0],c);
const map=JSON.parse(vm.runInContext('JSON.stringify(lessonPreparation)',c)),ids=JSON.parse(vm.runInContext('JSON.stringify(chapters.map(c=>c.id))',c));ids.push('selection');
assert.deepEqual(Object.keys(map).sort(),ids.sort());
const visit=(id,trail=[])=>{assert.ok(!trail.includes(id),'No circular prerequisite chain: '+[...trail,id].join(' → '));for(const target of map[id][1]){assert.ok(ids.includes(target),target+' exists');assert.notEqual(target,id);visit(target,[...trail,id]);}};
for(const id of ids){visit(id);const html=vm.runInContext(id==='selection'?'selection()':`lessonPage(chapters.find(c=>c.id===${JSON.stringify(id)}))`,c);assert.equal((html.match(/class="notice lesson-preparation"/g)||[]).length,1,id+' has one guidance block');for(const target of map[id][1])assert.ok(html.includes(`href="#${target}"`));}
const index=fs.readFileSync(new URL('index.html',root),'utf8');assert.ok(index.indexOf('src="prerequisites.js"')<index.indexOf('src="app.js"'));
console.log('50 lesson prerequisite blocks: complete coverage, valid links, no cycles and correct script order.');
