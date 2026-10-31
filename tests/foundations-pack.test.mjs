import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const root=new URL('../',import.meta.url),out=new URL('dist/activities/programming-foundations/',root);
const source=fs.readFileSync(new URL('activity-source/programming-foundations.json',root));
const data=JSON.parse(source),student=fs.readFileSync(new URL('index.html',out),'utf8'),teacher=fs.readFileSync(new URL('teacher.html',out),'utf8');
assert.equal(data.lessons.length,8);assert.equal(new Set(data.lessons.map(l=>l.id)).size,8);
assert.equal((student.match(/class="worksheet-sheet"/g)||[]).length,16);
assert.equal((teacher.match(/class="worksheet-sheet"/g)||[]).length,8);
assert.ok(!student.includes('Faulty results:'));
assert.ok(!student.includes('B is 01000010'),'independent character answer is not embedded in student sheets');
assert.ok(teacher.includes('01000010'));
for(const lesson of data.lessons){
 assert.ok(student.includes(`id="lesson-${lesson.id}"`));
 assert.equal(lesson.sheets.length,2);assert.ok(lesson.reading.length>=2);
 assert.ok(lesson.sheets.every(s=>s.blocks.some(b=>b.type==='workspace'||b.type==='table')));
 for(const [,href] of lesson.reading)assert.ok(href.startsWith('#')&&student.includes('../../'+href));
}
for(const [name,count] of [['student.pdf',16],['teacher.pdf',8]]){
 const pdf=fs.readFileSync(new URL(name,out));assert.ok(pdf.subarray(0,5).toString()==='%PDF-');
 assert.equal((pdf.toString('latin1').match(/\/Type\s*\/Page\b/g)||[]).length,count);
}
const stamp=JSON.parse(fs.readFileSync(new URL('pdf-source.json',out),'utf8'));
assert.equal(stamp.sourceSha256,crypto.createHash('sha256').update(source).digest('hex'),'web/PDF source version matches');
for(const path of ['README.md','student-pack.zip','teacher-reference.zip','pack.css','pack.js'])assert.ok(fs.existsSync(new URL(path,out)));
const css=fs.readFileSync(new URL('pack.css',out),'utf8');assert.ok(css.includes('@media print'));assert.ok(css.includes('size:A4'));assert.ok(css.includes('.pack-lesson[hidden]{display:none!important}'));assert.ok(css.includes('.pack-lesson.print-last'));
const app=fs.readFileSync(new URL('dist/app.js',root),'utf8'),prep=fs.readFileSync(new URL('dist/prerequisites.js',root),'utf8');
assert.ok(app.includes('activities/programming-foundations/'));assert.ok(prep.includes('activities/programming-foundations/#lesson-'));

// Exercise print scope, restoration after cancellation/errors and direct-link filtering.
function environment(hash=''){
 const make=()=>({listeners:{},addEventListener(n,fn){this.listeners[n]=fn;},disabled:false,value:'all'});
 const selector=make(),selected=make(),all=make(),listeners={};
 const lessons=data.lessons.map(l=>({dataset:{lesson:l.id},hidden:false,classList:{values:new Set(),add(s){this.values.add(s);},remove(s){this.values.delete(s);}}}));
 const links=data.lessons.map(l=>({...make(),dataset:{lessonLink:l.id}}));
 const nodes={'lesson-select':selector,'print-selected':selected,'print-all':all};
 const window={addEventListener(n,fn){listeners[n]=fn;},print(){listeners.beforeprint();probe();listeners.afterprint();}};
 let probe=()=>{};
 vm.runInNewContext(fs.readFileSync(new URL('pack.js',out),'utf8'),{document:{getElementById:id=>nodes[id],querySelectorAll:s=>s==='[data-lesson]'?lessons:links},window,location:{hash}});
 return {selector,selected,all,lessons,links,listeners,window,setProbe(fn){probe=fn;},visible:()=>lessons.filter(l=>!l.hidden).map(l=>l.dataset.lesson)};
}
const env=environment();assert.equal(env.visible().length,8);assert.equal(env.selected.disabled,true);
env.selector.value='03';env.selector.listeners.change();assert.deepEqual(env.visible(),['03']);
env.setProbe(()=>assert.deepEqual(env.visible(),['03']));env.selected.listeners.click();assert.deepEqual(env.visible(),['03']);
env.setProbe(()=>assert.equal(env.visible().length,8));env.all.listeners.click();assert.deepEqual(env.visible(),['03']);
env.listeners.beforeprint();env.listeners.afterprint();assert.deepEqual(env.visible(),['03']);
env.window.print=()=>{throw new Error('cancelled/unsupported print');};assert.throws(()=>env.all.listeners.click());assert.deepEqual(env.visible(),['03']);
assert.ok(env.lessons.every(l=>!l.classList.values.has('print-last')));
assert.deepEqual(environment('#lesson-07').visible(),['07']);assert.equal(environment('#invalid').visible().length,8);
console.log('Eight activities; student/key separation; 16/8-page current PDFs; selected/all/direct-link print scopes and cancellation/error restoration passed.');
