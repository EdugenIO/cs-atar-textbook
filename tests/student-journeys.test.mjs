import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import path from 'node:path';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'),ctx=vm.createContext({});
vm.runInContext(read('dist/navigation.js').split('// Keep the skip link')[0],ctx);
for(const f of ['app','chapters','project-chapter','network-chapters','audit-chapters','unit2-chapters','unit2-review-chapters','unit3-chapters','unit4-chapters','unit4-er-interpretation','unit4-data-quality','lesson-journeys','prerequisites'])vm.runInContext(read('dist/'+f+'.js'),ctx);
const data=JSON.parse(read('teaching-source/student-journeys.json')),packs=JSON.parse(read('activity-source/extended-packs.json')),catalogue=JSON.parse(read('dist/resources/catalogue.json'));
assert.deepEqual(data.map(j=>j.id),['loops','sql-basics','networks','representation']);
for(const j of data){
 const chapter=JSON.parse(vm.runInContext('JSON.stringify(chapters.find(c=>c.id==='+JSON.stringify(j.id)+'))',ctx));
 for(const heading of [j.read,j.worked])assert.ok(chapter.sections.some(s=>s[0]===heading),'Actual chapter section '+heading);
 const links=vm.runInContext('renderStudentJourney('+JSON.stringify(j.id)+')',ctx);assert.ok(links.includes('teacher.html#lesson-'+j.activity));assert.ok(links.includes('revision/#topic-'+j.id));assert.ok(vm.runInContext('renderLessonPreparation('+JSON.stringify(j.id)+')',ctx).includes('student-journey'));
 for(const file of ['index.html','teacher.html'])assert.ok(read('dist/activities/'+j.pack+'/'+file).includes('id="lesson-'+j.activity+'"'));
 assert.ok(read('dist/resources/index.html').includes('href="../#'+j.id+'/heading-'));
 assert.ok(read('dist/revision/index.html').includes('id="topic-'+j.id+'"'));
}
let count=0;for(const p of packs)for(const l of p.lessons){count++;const student=read('dist/activities/'+p.id+'/index.html'),key=read('dist/activities/'+p.id+'/teacher.html');assert.ok(student.includes('teacher.html#lesson-'+l.id));assert.ok(key.includes('index.html#lesson-'+l.id));assert.ok(key.includes('../../revision/#topic-'+l.chapter));assert.ok(vm.runInContext('renderStudentJourney('+JSON.stringify(l.chapter)+')',ctx).includes('activities/'+p.id+'/#lesson-'+l.id),'Chapter has a direct or focused route');}
assert.equal(count,18);
const advanced=packs.find(p=>p.id==='databases-sql').lessons.find(l=>l.id==='05');assert.equal(advanced.chapter,'unit4-sql');assert.ok(!advanced.practice.some(b=>b.text?.startsWith('For a LEFT JOIN')));assert.ok(!catalogue.find(c=>c.id==='sql-basics').resources.some(r=>r.href.endsWith('databases-sql/#lesson-05')));assert.ok(catalogue.find(c=>c.id==='unit4-sql').resources.some(r=>r.href.endsWith('databases-sql/#lesson-05')));
const sql=read('dist/activities/databases-sql/index.html'),stages=JSON.parse(read('teaching-source/sql-pathway.json')).stages;for(const [step,title] of [['04','Use all five aggregate'],['10','GROUP BY'],['17','Supporting extension']]){assert.ok(sql.includes('../../sql/#step-'+step));assert.ok(stages.find(s=>s.id===step).title.startsWith(title));}assert.ok(sql.includes('These names differ from the chapter'));
assert.ok(!read('scripts/build-teaching-depth.py').includes('"sum_to(0)"'));assert.ok(!read('dist/depth-data.js').includes('"sum_to(0)"'));
const index=read('dist/index.html');assert.ok(index.indexOf('src="lesson-journeys.js"')<index.indexOf('src="prerequisites.js"'));
console.log('Four complete student journeys: real worked sections, exact activity/key/revision destinations, 18 feedback loops, correct SQL staging and beginner loop language passed.');
