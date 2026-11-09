import fs from 'node:fs';import assert from 'node:assert/strict';import vm from 'node:vm';
import {loadTextbook} from '../scripts/load-textbook.mjs';
const {chapters,schedule,guides}=loadTextbook(),routes=JSON.parse(fs.readFileSync('dist/lessons/routes.json','utf8'));
assert.equal(routes.length,256);assert.equal(new Set(routes.map(r=>r.id)).size,256);
const byId=new Map(chapters.map(c=>[c.id,c]));const html=fs.readFileSync('dist/lessons/index.html','utf8');
for(const u of schedule)for(const w of u.weeks)for(const l of w.lessons){
 const r=routes.find(r=>r.id==='u'+u.unit+'-l'+l.number);assert.ok(r);
 for(const key of ['objective','activity','check','checkExpected','checkReteach'])assert.equal(r[key],l[key]);
 const c=byId.get(r.readChapter),readIndex=c.sections.findIndex(s=>s[0]===r.read),workedIndex=c.sections.findIndex(s=>s[0]===r.worked);
 assert.ok(readIndex>=0&&workedIndex>=0&&workedIndex<=readIndex,'No forward jump: '+r.id);
 assert.ok(html.includes('id="'+r.id+'"'));
 const card=html.split('id="'+r.id+'"')[1].split('</article>')[0];
 if(r.attemptMode){assert.ok(r.controlled);assert.ok(card.includes('class="notice attempt-mode"'));assert.ok(!card.includes('Study the worked walkthrough'));}
 else {assert.ok(html.includes(r.readHref));assert.ok(html.includes(r.workedHref));}
 assert.ok(fs.readFileSync('dist/revision/index.html','utf8').includes('id="topic-'+r.chapter+'"'));
 if(r.workbook)assert.ok(fs.existsSync('dist/'+r.workbook));
 if(/assessment slot|controlled/.test(r.kind+' '+r.title))assert.ok(r.controlled);
}
for(const c of chapters){assert.ok(routes.some(r=>r.chapter===c.id||r.readChapter===c.id),'Allocated or companion reading for '+c.id);assert.ok(c.sections.some(s=>s[0]===guides[c.id].anchor));}
const context=vm.createContext({});vm.runInContext(fs.readFileSync('dist/lesson-journeys.js','utf8'),context);
for(const c of chapters){const journey=vm.runInContext('renderStudentJourney('+JSON.stringify(c.id)+')',context);assert.ok(journey.includes('student-journey'));assert.ok(journey.includes('revision/#topic-'+c.id));}
assert.ok(routes.find(r=>r.id==='u1-l33').readChapter==='software-responsibility');
assert.equal(routes.find(r=>r.id==='u2-l13').worked,'Choose result columns with SELECT');
assert.equal(routes.find(r=>r.id==='u4-l8').read,'Preserve zero-booking sessions');
console.log('50 chapter journeys and 256 focused routes: exact sections, all exit feedback, no forward section jumps, assessment conditions, SQL progression and companion licensing lesson passed.');
