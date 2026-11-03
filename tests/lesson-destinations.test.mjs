import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
import {focusedLessons,lessonDestination} from '../scripts/lesson-destinations.mjs';
const read=p=>fs.readFileSync(p,'utf8'),routes=JSON.parse(read('dist/lessons/routes.json'));
assert.equal(routes.length,256);
for(const lesson of routes)assert.equal(lesson.canonicalHref,lessonDestination(lesson.id));
const ctx=vm.createContext({document:{addEventListener(){}},escapeHtml:s=>String(s),plannerSlideLinks:()=>''});
for(const name of ['teaching-planner-data','lesson-slide-resources','teaching-planner'])vm.runInContext(read('dist/'+name+'.js'),ctx);
for(const item of focusedLessons){
 const lesson=routes.find(l=>l.id===item.id);assert.ok(lesson&&!lesson.controlled);assert.equal(lesson.chapter,item.chapter);
 assert.ok(fs.existsSync('dist/'+item.path+'index.html'));
 const html=read('dist/'+item.path+'index.html');assert.ok(html.includes(lesson.objective));assert.ok(html.includes(lesson.check));
 assert.ok(html.includes('../focused-lesson.css'));assert.ok(html.includes('../focused-lesson.js'));
 ctx.unit=lesson.unit;ctx.week=lesson.week;
 const plan=vm.runInContext('plannerLessons(teachingSchedule.find(u=>u.unit===unit),teachingSchedule.find(u=>u.unit===unit).weeks.find(w=>w.week===week))',ctx);
 assert.ok(plan.includes('href="'+item.path+'"'));assert.ok(!plan.includes('href="lessons/#'+item.id+'"'));
 const catalogue=JSON.parse(read('dist/resources/catalogue.json'));assert.ok(catalogue.find(c=>c.id===item.chapter).resources.some(r=>r.href==='../'+item.path));
}
assert.equal(lessonDestination('u1-l12'),'lessons/#u1-l12');
const script=read('dist/lessons/routes.js');assert.ok(script.includes('location.replace('));assert.ok(script.includes("location.protocol==='file:'"));
for(const [hash,protocol,expected]of [['#u1-l15','https:','loops/'],['#u1-l11','file:','selection/index.html'],['#u1-l12','https:',null],['#toString','https:',null]]){
 let redirected=null;const fields=Object.create(null);
 const element=id=>fields[id]??={id,value:'',options:[],classList:{contains:()=>false},addEventListener(){},textContent:''};
 const mock=vm.createContext({URLSearchParams,document:{getElementById:element,querySelectorAll:()=>[],body:{dataset:{}}},location:{hash,protocol,search:'',pathname:'/lessons/',replace:url=>redirected=url},history:{replaceState(){}},window:{addEventListener(){}}});
 vm.runInContext(script,mock);assert.equal(redirected,expected);
}
console.log('Canonical lesson register: 256 destinations, focused/fallback planner links, resource entries and common page shell passed.');
