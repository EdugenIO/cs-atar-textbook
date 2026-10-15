import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const root=new URL('../dist/',import.meta.url),ctx=vm.createContext({});
const chapterFiles=['chapters.js','project-chapter.js','network-chapters.js','audit-chapters.js','unit2-chapters.js','unit2-review-chapters.js','unit3-chapters.js','unit4-chapters.js','unit4-er-interpretation.js','unit4-data-quality.js'];
const run=f=>vm.runInContext(fs.readFileSync(new URL(f,root),'utf8'),ctx);
chapterFiles.forEach(run);
const before=JSON.parse(vm.runInContext('JSON.stringify(chapters)',ctx));
[1,2,3,4].forEach(u=>run(`learning-guides-unit${u}.js`));
run('learning-support.js');
const guides=JSON.parse(vm.runInContext('JSON.stringify(textbookLearningGuides)',ctx));
const after=JSON.parse(vm.runInContext('JSON.stringify(chapters)',ctx));
assert.deepEqual(Object.keys(guides).sort(),[...before.map(c=>c.id),'selection'].sort());
for(const[id,g]of Object.entries(guides)){
 for(const field of ['anchor','title','lead','caption','predict','answer','retry'])assert.ok(typeof g[field]==='string'&&g[field].trim(),id+':'+field);
 assert.ok(['flow','cards','trace','array'].includes(g.kind));
 if(g.kind==='trace'){
  assert.ok(g.columns.length>=2&&g.rows.length>=2);
  g.rows.forEach(row=>assert.equal(row.length,g.columns.length,id+' table width'));
 }else{
  assert.ok(g.nodes.length>=2&&g.nodes.length<=6,id+' diagram size');
  g.nodes.forEach(n=>assert.ok(n.label&&n.detail));
 }
 const html=vm.runInContext(`renderLearningGuide(${JSON.stringify(id)})`,ctx);
 assert.ok(html.includes('<figure')&&html.includes('<figcaption>'),id+' visual text alternative');
 assert.ok(html.includes('<details')&&!/<details[^>]*\bopen\b/.test(html),id+' explanation starts closed');
 assert.ok(html.includes('print-answer-only'),id+' student print hides revealed answer');
 assert.ok(!/<form|<input|<button|<img/.test(html),id+' native ungraded text interaction');
 if(g.kind==='trace')assert.ok(html.includes('scope="col"'));
 if(g.kind==='flow')assert.ok(html.includes('aria-hidden="true"'));
 if(id==='selection')continue;
 const original=before.find(c=>c.id===id),updated=after.find(c=>c.id===id);
 const position=original.sections.findIndex(s=>s[0]===g.anchor);
 assert.ok(position>=0,id+' existing insertion anchor');
 assert.equal(updated.sections.length,original.sections.length);
 original.sections.forEach((s,i)=>{
  assert.equal(updated.sections[i][0],s[0],id+' heading');
  assert.equal(updated.sections[i][1],s[1]+(i===position?html:''),id+' retain original explanation');
 });
 assert.equal(updated.code,original.code);assert.equal(updated.solution,original.solution);
}

// Independently trace the examples most likely to confuse a reader.
const data=[4,9,9];
let first=0,last=0;
for(let i=1;i<data.length;i++){if(data[i]>data[first])first=i;if(data[i]>=data[last])last=i;}
assert.equal(first,1);assert.equal(last,2);
assert.deepEqual(guides.arrays.rows.map(r=>Number(r[2])),[0,1,first]);
const ids=[101,104,108,112,117,123,130],probes=[];let low=0,high=ids.length-1;
while(low<=high){const mid=Math.floor((low+high)/2);probes.push(mid);if(ids[mid]===117)break;if(ids[mid]<117)low=mid+1;else high=mid-1;}
assert.deepEqual(guides['unit3-search'].rows.map(r=>Number(r[2].split(' / ')[0])),probes);
assert.deepEqual(guides['unit4-sql'].rows.map(r=>r[4]),[100*2/2,100*1/3,0].map(n=>n.toFixed(1)));

// The generic renderer escapes diagram text and does not turn it into markup.
vm.runInContext(`textbookLearningGuides.escapeProbe={...textbookLearningGuides.values,title:'<img src=x>',kind:'cards',nodes:[{label:'<script>',detail:'A & B'}]}`,ctx);
const escaped=vm.runInContext('renderLearningGuide("escapeProbe")',ctx);
assert.ok(escaped.includes('&lt;img src=x&gt;')&&escaped.includes('&lt;script&gt;')&&escaped.includes('A &amp; B'));
const index=fs.readFileSync(new URL('index.html',root),'utf8');
assert.ok(index.indexOf('learning-support.js')<index.indexOf('src="app.js"'));
assert.ok(index.includes('learning.css'));
assert.ok(fs.readFileSync(new URL('app.js',root),'utf8').includes("${renderLearningGuide('selection')}"));
console.log('50 anchored, ungraded visual guides; accessible markup, example traces and source preservation passed.');
