import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
const c=vm.createContext({document:{addEventListener(){}}});
for(const name of ['assessment-data.js','assessments.js'])vm.runInContext(fs.readFileSync(new URL('dist/'+name,root),'utf8'),c);
const data=vm.runInContext('assessmentCatalogue',c);
assert.equal(data.targetYear,2027);
const source=JSON.parse(fs.readFileSync(new URL('assessment-source/catalogue.json',root),'utf8'));
let projects=0,standard=0,starters=0;
for(const year of data.years){
 assert.equal(year.tasks.length,8);
 assert.deepEqual(Array.from(year.tasks,t=>t.number),[1,2,3,4,5,6,7,8]);
 assert.equal(year.tasks.reduce((sum,t)=>sum+t.weight,0),100);
 assert.deepEqual(JSON.parse(JSON.stringify(year.weights)),year.year===11?{Project:40,Theory:20,Practical:10,Examination:30}:{Project:40,Theory:10,Practical:10,Examination:40});
 for(const [type,total] of Object.entries(year.weights))assert.equal(year.tasks.filter(t=>t.type===type).reduce((sum,t)=>sum+t.weight,0),total);
 for(const task of year.tasks){
  assert.ok(task.weight>=5);
  assert.ok(task.timing&&task.scope&&task.sampleTiming);
  if(task.type==='Project'){assert.ok(task.options.length>=4);projects+=task.options.length;}
  else {assert.equal(task.options.length,1,'Choice is confined to projects');standard++;}
  assert.deepEqual(Array.from(task.options,o=>o.id),source.years.find(y=>y.year===year.year).tasks.find(t=>t.number===task.number).options.map(o=>o.id));
  for(const option of task.options){
   assert.ok(option.requirements.length>=3&&option.resources.length>=2&&option.tests.length>=2);
   assert.ok(fs.existsSync(new URL('dist/'+option.brief,root)),option.brief);
   if(option.pack){starters++;assert.ok(fs.statSync(new URL('dist/'+option.download,root)).size>1000);}
  }
  vm.runInContext(`assessmentYear=${year.year};assessmentTask='${task.number}'`,c);
  const html=vm.runInContext('assessmentChoices()',c);
  assert.equal((html.match(/class="assessment-option"/g)||[]).length,task.options.length);
  assert.ok(html.includes(task.type==='Project'?'Choose one project context':'One standard assessment'));
 }
}
assert.equal(projects,18);assert.equal(standard,12);assert.equal(starters,12);
assert.equal(vm.runInContext('assessmentEscape("<script>&")',c),'&lt;script&gt;&amp;');
const hub=vm.runInContext('assessmentHubPage()',c);
for(const match of hub.matchAll(/href="(assessments\/[^"#]+)"/g))assert.ok(fs.existsSync(new URL('dist/'+match[1],root)),match[1]);
assert.ok(hub.includes('2027 manual'));
const index=fs.readFileSync(new URL('dist/index.html',root),'utf8');
assert.ok(index.includes('href="#assessments">Assessments</a>'));
assert.ok(index.indexOf('src="assessments.js"')<index.indexOf('src="reader.js"'));
assert.equal(fs.readdirSync(new URL('dist/assessments/briefs/',root)).length,30);
console.log('Two 100% outlines, 18 project choices, 12 standard assessments, twelve packs and all resource links passed.');

for(const year of data.years){
 const task=year.tasks[0], contract=data.gameContracts.find(c=>c.year===year.year);
 assert.ok(task.gameContract&&task.gameRubric);
 assert.equal(task.options.length,5);
 assert.deepEqual(Array.from(task.options,o=>o.id),['space','reef','castle','circuit','museum']);
 assert.ok(contract.functional.length>=9&&contract.nonFunctional.length>=7);
 assert.equal(contract.rubric.reduce((n,c)=>n+c.marks,0),100);
 for(const row of contract.rubric)assert.equal(row.items.reduce((n,c)=>n+c.marks,0),row.marks);
 for(const field of ['functional','nonFunctional'])assert.equal(new Set(contract[field].map(r=>r.id)).size,contract[field].length);
 vm.runInContext(`assessmentYear=${year.year};assessmentTask='1'`,c);
 const html=vm.runInContext('assessmentChoices()',c);
 assert.ok(html.includes('Shared functional requirements')&&html.includes('Shared non-functional requirements'));
 assert.ok(html.includes('Common marking guide')&&html.includes('AI-generated decorative'));
 for(const match of html.matchAll(/href="(assessments\/[^"#]+)"/g))assert.ok(fs.existsSync(new URL('dist/'+match[1],root)),match[1]);
 assert.ok(task.options.every(o=>o.pack&&o.routes.every(r=>!r.includes('Console'))));
}
