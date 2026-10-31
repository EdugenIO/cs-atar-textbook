import fs from 'node:fs';
import vm from 'node:vm';
export function loadTextbook(){
 const c=vm.createContext({});
 const read=f=>fs.readFileSync('dist/'+f+'.js','utf8');
 vm.runInContext(read('navigation').split('// Keep the skip link')[0],c);
 for(const f of ['app','chapters','project-chapter','network-chapters','audit-chapters','unit2-chapters','unit2-review-chapters','unit3-chapters','unit4-chapters','unit4-er-interpretation','unit4-data-quality','lesson-journeys','prerequisites','learning-guides-unit1','learning-guides-unit2','learning-guides-unit3','learning-guides-unit4','learning-support','teaching-planner-data'])vm.runInContext(read(f),c);
 const get=expression=>JSON.parse(vm.runInContext('JSON.stringify('+expression+')',c));
 const chapters=get('chapters');
 chapters.splice(3,0,{id:'selection',unit:1,title:'Making decisions with selection',sections:[...vm.runInContext('selection()',c).matchAll(/<h2[^>]*>(.*?)<\/h2>/g)].map(m=>[m[1].replace(/<[^>]+>/g,'').replace(/^\d+\.\s*/,''),''])});
 return {chapters,guides:get('textbookLearningGuides'),schedule:get('teachingSchedule'),preparation:get('lessonPreparation')};
}
