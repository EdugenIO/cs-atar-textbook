import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'),data=JSON.parse(read('teaching-source/revision.json'));
const ctx=vm.createContext({});for(const f of ['revision-data','revision-core'])vm.runInContext(read('dist/revision/'+f+'.js'),ctx);
const bank=JSON.parse(vm.runInContext('JSON.stringify(revisionData)',ctx)),core=vm.runInContext('RevisionCore',ctx);
assert.equal(Object.keys(data.retrieval).length,50);assert.equal(bank.questions.length,32);assert.equal(bank.quizzes.length,6);
assert.equal(new Set(bank.questions.map(q=>q.id)).size,32);assert.equal(new Set(bank.checkIds).size,bank.checkIds.length);
for(const q of bank.questions){assert.ok(q.correct>=0&&q.correct<q.choices.length);assert.equal(q.misconceptions[q.correct],'');assert.ok(q.explanation);assert.ok(q.choices.every(Boolean));q.misconceptions.forEach((m,i)=>{if(i!==q.correct)assert.ok(m);});}
for(const set of bank.quizzes){const qs=core.quiz(bank,set.id);assert.equal(qs.length,set.ids.length);assert.ok(qs.every(Boolean));const answers=Object.fromEntries(qs.map(q=>[q.id,q.correct]));const score=core.grade(qs,answers);assert.equal(score.correct,qs.length);assert.equal(score.unanswered,0);assert.equal(core.grade(qs,{}).unanswered,qs.length);}
const cumulative=bank.quizzes.slice(0,4);assert.deepEqual(cumulative.map(s=>s.ids.length),[8,16,24,32]);for(let i=1;i<4;i++)assert.ok(cumulative[i-1].ids.every(id=>cumulative[i].ids.includes(id)));
const first=bank.questions[0];assert.equal(core.grade([first],{[first.id]:99}).unanswered,1);assert.equal(core.grade([first],{[first.id]:-1}).unanswered,1);
const checked=core.restore(JSON.stringify({version:1,checked:[bank.checkIds[0],'unknown']}),bank.checkIds);assert.equal(checked.size,1);assert.equal(core.restore('invalid',bank.checkIds).size,0);assert.equal(core.restore('{"version":2,"checked":[]}',bank.checkIds).size,0);assert.equal(core.restore(core.serialize(checked),bank.checkIds).size,1);
const requirements=JSON.parse(read('dist/revision/syllabus-requirements.json')),matrix=JSON.parse(read('curriculum-source/item-map.json')).items;
assert.equal(requirements.length,111);const ids=new Set(matrix.filter(i=>!i.isParent).map(i=>i.id));const covered=new Set(requirements.flatMap(r=>r.itemIds));assert.equal(covered.size,519);for(const id of covered)assert.ok(ids.has(id),id);
const html=read('dist/revision/index.html');assert.equal((html.match(/class="topic-card filter-card"/g)||[]).length,50);assert.equal((html.match(/class="exam-card filter-card"/g)||[]).length,60);assert.equal((html.match(/class="extension-card"/g)||[]).length,4);
assert.ok(html.includes('not a second list of prescribed syllabus requirements'));assert.ok(html.includes('SUPPORT BOOKLET + ENRICHMENT'));assert.ok(html.includes('SUPPORT / IMPLEMENTATION / ENRICHMENT'));assert.ok(html.includes('HAVING is shown in the official support booklet'));
// Atomic fields in normalisation remain core; they are not transaction extensions.
const normalisationStart=html.indexOf('id="exam-y12-d9"');assert.ok(normalisationStart>0);
const normalisation=html.slice(normalisationStart,html.indexOf('</article>',normalisationStart));assert.ok(normalisation.includes('Syllabus-linked practice: an original question'));
const acidStart=html.indexOf('id="exam-y12-d5"');assert.ok(acidStart>0);assert.ok(html.slice(acidStart,html.indexOf('</article>',acidStart)).includes('Syllabus-linked practice: an original question'));
for(const link of html.matchAll(/href="([^"#]+)(?:#[^"]*)?"/g)){if(link[1].startsWith('http'))continue;assert.ok(fs.existsSync(new URL('../dist/revision/'+link[1],import.meta.url)),link[1]);}
const student=read('dist/revision/student-workbook.md');assert.ok(!student.includes(data.quizQuestions[0].explanation));assert.ok(read('dist/revision/explained-answers.md').includes(data.quizQuestions[0].explanation));
console.log('Revision: 50 retrieval/checklist topics, 111 groups with 519 valid leaf locators, 32 quiz items/six cumulative sets, scoring, restore, 60 explained answers and scope labels passed.');
