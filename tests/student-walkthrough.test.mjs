import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../dist/',import.meta.url);
const ctx=vm.createContext({source:'https://example.com',textbookHeadingId:s=>'heading-'+s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')});
for(const file of ['chapters','audit-chapters','unit2-chapters','unit2-review-chapters','unit3-chapters','unit4-chapters'])vm.runInContext(fs.readFileSync(new URL(file+'.js',root),'utf8'),ctx);
vm.runInContext(fs.readFileSync(new URL('prerequisites.js',root),'utf8'),ctx);
vm.runInContext(fs.readFileSync(new URL('reader.js',root),'utf8').split('function downloadText')[0],ctx);
const labels=vm.runInContext('textbookSectionLabels',ctx);
for(const [old,label]of Object.entries(labels)){
 const chapter=vm.runInContext(`chapters.find(c=>c.sections.some(s=>s[0]===${JSON.stringify(old)}))`,ctx);
 assert.ok(chapter,old+' exists');
 const html=vm.runInContext(`lessonPage(chapters.find(c=>c.id===${JSON.stringify(chapter.id)}))`,ctx);
 assert.ok(html.includes(`id="${ctx.textbookHeadingId(old)}"`),old+' stable URL');
 assert.ok(html.includes(label+'</h2>'),label+' visible');
 assert.ok(!html.includes(old+'</h2>'),old+' hidden');
}
const html=vm.runInContext('lessonPage(chapters.find(c=>c.id==="exam-preparation"))',ctx);
assert.ok(!/\d+ marks|48-mark|1 mark:|useful submission|marking guidance/.test(html));
assert.ok(html.includes('Show explained answer'));
console.log('Legacy section URLs retained; visible textbook headings and Unit 1 practice are ungraded.');
