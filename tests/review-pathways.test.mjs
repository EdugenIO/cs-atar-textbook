import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
import {loadTextbook} from '../scripts/load-textbook.mjs';import {courseNavigation} from '../scripts/course-navigation.mjs';
const paths=JSON.parse(fs.readFileSync('teaching-source/review-pathways.json','utf8')),chapters=loadTextbook().chapters;
assert.deepEqual(paths.map(p=>p.unit),[1,2,3,4]);const ids=paths.flatMap(p=>p.stages.map(s=>s.id));assert.equal(ids.length,11);assert.equal(new Set(ids).size,11);
for(const id of ids)assert.ok(chapters.some(c=>c.id===id));assert.ok(!ids.includes('network-review'));
const c=vm.createContext({});vm.runInContext(fs.readFileSync('dist/lesson-journeys.js','utf8'),c);vm.runInContext(fs.readFileSync('dist/reader.js','utf8').split('function renderPygamePreparation')[0],c);
for(const id of [...ids,'network-review']){const html=vm.runInContext(`renderReviewPathway('${id}')`,c);assert.match(html,/Choose the right revision stage/);assert.match(html,/practice\/\?mode=study/);for(const href of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(href[1]));assert.equal((html.match(/aria-current="step"/g)||[]).length,id==='network-review'?0:1);}
assert.match(vm.runInContext("renderReviewPathway('network-review')",c),/not a whole-unit diagnostic/);assert.match(vm.runInContext("renderReviewPathway('consolidation')",c),/no separate whole-unit review/);assert.match(vm.runInContext("renderReviewPathway('unit4-exam')",c),/Units 1–4/);assert.equal(vm.runInContext("renderReviewPathway('loops')",c),'');
const nav=courseNavigation();assert.equal((nav.match(/class="course-review-label"/g)||[]).length,4);assert.equal((nav.match(/data-chapter=/g)||[]).length,50);
for(const u of [1,2,3,4])assert.ok(fs.readFileSync(`dist/offline/unit-${u}-reader.html`,'utf8').includes('Choose the right revision stage'));
console.log('C07: 11 retained end-of-unit chapters, separate network review, four navigation groups and offline pathways passed.');
