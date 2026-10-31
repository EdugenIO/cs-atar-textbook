import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),dist=new URL('dist/',root);
const c=vm.createContext({source:'https://example.com',selection:()=>'<article>Selection</article>',textbookHeadingId:s=>'heading-'+s.toLowerCase().replace(/^\d+\.\s*/,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')});
const run=file=>vm.runInContext(fs.readFileSync(new URL(file,dist),'utf8'),c);
for(const f of ['chapters.js','project-chapter.js','network-chapters.js','audit-chapters.js','unit2-chapters.js','unit2-review-chapters.js','unit3-chapters.js','unit4-chapters.js','unit4-er-interpretation.js','unit4-data-quality.js',...Array.from({length:4},(_,i)=>`learning-guides-unit${i+1}.js`),'learning-support.js','prerequisites.js','depth-data.js','depth.js','curriculum-clinics.js','teaching-planner-data.js'])run(f);
const reader=fs.readFileSync(new URL('reader.js',dist),'utf8');vm.runInContext(reader.split('function downloadText')[0],c);
const start=vm.runInContext('lessonPage(chapters.find(c=>c.id==="start"))',c);
assert.equal((start.match(/<h2>Worked Python example<\/h2>/g)||[]).length,1);
assert.ok(start.indexOf('BADGE_PRICE = 3')<start.indexOf('def cost('),'first program precedes advanced harness');
assert.ok(start.indexOf('class="optional-depth"')<start.indexOf('def cost('),'advanced code inside optional revisit');
assert.ok(start.includes('Optional revisit after selection, loops and functions'));
for(const route of ['values','representation','selection','loops','functions','arrays']){
 const modules=vm.runInContext(`teachingDepth.modules.filter(m=>m.route===${JSON.stringify(route)}&&m.files.length)`,c);
 for(const m of modules){c.probe=m;assert.ok(vm.runInContext('renderTeachingDepth(probe)',c).startsWith('<details class="optional-depth">'));}
}
const sql=vm.runInContext('lessonPage(chapters.find(c=>c.id==="unit4-sql"))',c);
assert.ok(sql.includes('2026 syllabus foundation · 2027 revisions'));
assert.ok(sql.includes('_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF'),'valid baseline source retained');
const groups=JSON.parse(fs.readFileSync(new URL('curriculum/editorial-review.json',dist),'utf8')).groups;
const leaves=JSON.parse(fs.readFileSync(new URL('curriculum-source/item-map.json',root),'utf8')).items.filter(r=>!r.isParent).map(r=>r.id);
assert.deepEqual(groups.flatMap(g=>g.itemIds).sort(),leaves.sort(),'every exact leaf reviewed once');
for(const g of groups){
 assert.ok(g.rationale&&g.evidence&&g.sourceChecked);assert.equal(g.independentReview,'pending');
 for(const addition of g.teachingAdditions){
  const [route,anchor]=addition.url.replace('../#','').split('/');
  const html=vm.runInContext(`lessonPage(chapters.find(c=>c.id===${JSON.stringify(route)}))`,c);
  assert.ok(html.includes(addition.title),'review links to actual follow-up teaching');
  assert.ok(c.textbookHeadingId(addition.title)===anchor);
 }
}
const lessons=vm.runInContext('teachingSchedule.flatMap(u=>u.weeks.flatMap(w=>w.lessons))',c);
assert.equal(lessons.length,256);
assert.equal(new Set(lessons.map(l=>l.check)).size,256,'no recycled generic checks');
for(const l of lessons){assert.ok(l.checkExpected&&l.checkReteach);assert.ok(!l.check.includes('Check a fresh example independently, then explain one decision or correction.'));}
const index=fs.readFileSync(new URL('index.html',dist),'utf8');
assert.ok(index.indexOf('curriculum-clinics.js')<index.indexOf('reader.js'));
assert.ok(index.indexOf('curriculum-clinics.js')<index.indexOf('search.js'));
console.log('2026 references preserved; core program before optional harness; 519 substantive leaf reviews; follow-up routes; 256 distinct exit questions/guides passed.');
