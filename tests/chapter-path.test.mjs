import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const read=f=>fs.readFileSync('dist/'+f+'.js','utf8');
const ctx=vm.createContext({source:'https://example.com',textbookHeadingId:s=>'heading-'+s.toLowerCase().replace(/[^a-z0-9]+/g,'-')});
for(const f of ['app','chapters','project-chapter','network-chapters','audit-chapters','unit2-chapters','unit2-review-chapters','unit3-chapters','unit4-chapters','unit4-er-interpretation','unit4-data-quality','lesson-journeys','prerequisites','learning-guides-unit1','learning-guides-unit2','learning-guides-unit3','learning-guides-unit4','learning-support'])vm.runInContext(read(f),ctx);
vm.runInContext(read('reader').split('function downloadText')[0],ctx);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const chapters=JSON.parse(vm.runInContext('JSON.stringify(chapters)',ctx));
assert.equal(chapters.length,49);
for(const c of chapters){
 const html=vm.runInContext(`lessonPage(chapters.find(c=>c.id===${JSON.stringify(c.id)}))`,ctx);
 assert.equal((html.match(/class="notice lesson-preparation"/g)||[]).length,1,c.id+' one starting block');
 assert.equal((html.match(/class="student-journey"/g)||[]).length,1,c.id+' one independent pathway');
 assert.ok(html.indexOf('notice lesson-preparation')<html.indexOf('chapter-print'),c.id+' starting point precedes print tools');
 assert.ok(html.includes('Choose today’s lesson')&&html.includes('Study this chapter independently'),c.id);
 assert.ok(html.indexOf('chapter-application')<html.indexOf('chapter-reinforcement'),c.id+' main application first');
 assert.ok(html.includes(c.task),c.id+' original task retained');
 assert.ok(html.includes(escape(c.solution)),c.id+' original illustrative answer retained');
 for(const [,q,a]of c.practice){assert.ok(html.includes(q),c.id+' practice question retained');assert.ok(html.includes(escape(a)),c.id+' answer retained');}
 assert.ok(html.includes(c.quiz.q),c.id+' quick check retained');
 assert.ok(html.includes('id="heading-check-your-understanding"'),c.id+' stable check destination');
 const teacher=html.indexOf('class="chapter-teacher-guidance"');
 if(html.includes('Pygame preparation before the project.'))assert.ok(html.indexOf('Pygame preparation before the project.')>teacher,c.id+' preparation belongs to teacher notes');
}
const selection=vm.runInContext('selection()',ctx);
assert.equal((selection.match(/class="student-journey"/g)||[]).length,1);
assert.ok(selection.indexOf('Apply: a museum')<selection.indexOf('Predict: what happens'), 'selection application precedes additional checks');
assert.ok(selection.includes('<h2>6. Practice</h2>'),'selection section title retained');
assert.ok(selection.includes('class="chapter-application"')&&selection.includes('class="chapter-reinforcement"'));
console.log('All 50 chapter paths: one starting block, primary application, retained questions/answers, stable checks and teacher guidance.');
