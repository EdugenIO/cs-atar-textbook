import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),read=p=>fs.readFileSync(new URL(p,root),'utf8');
const source=JSON.parse(read('teaching-source/teacher-planning.json')),data=JSON.parse(read('dist/teachers/planning-data.json'));
assert.equal(data.plans.length,50);assert.equal(new Set(data.plans.map(p=>p.id)).size,50);assert.equal(data.plans.reduce((n,p)=>n+p.slots.length,0),256);
assert.equal(Object.keys(source.misconceptions).length,50);assert.equal(Object.keys(source.profiles).length,6);assert.equal(source.bridges.length,4);
for(const u of [1,2,3,4]){assert.equal(data.plans.filter(p=>p.unit===u).reduce((n,p)=>n+p.slots.length,0),64);assert.ok(read('dist/teachers/unit'+u+'-lesson-plan.csv').split('\n').length>=65);}
const byId=Object.fromEntries(data.plans.map(p=>[p.id,p]));const visit=(id,trail=[])=>{assert.ok(!trail.includes(id));for(const p of byId[id].prerequisites){assert.ok(byId[p]);visit(p,[...trail,id]);}};
for(const p of data.plans){visit(p.id);assert.ok(p.misconception.risk&&p.misconception.response);assert.ok(source.profiles[p.profile]);assert.ok(p.checks.every(c=>c.prompt&&c.expected&&c.response));}
const mapped=new Set(data.plans.flatMap(p=>p.items.map(i=>i.id)));assert.equal(mapped.size,519);
const local=source.localUnit1;assert.equal(local.length,64);assert.equal(new Set(local.map(l=>l.week+'-'+l.lesson)).size,64);assert.equal(local.filter(l=>l.kind==='event checkpoint').length,4);assert.equal(local.filter(l=>l.kind==='exam block').length,3);assert.equal(local.filter(l=>!['event checkpoint','exam block'].includes(l.kind)).length,57);
for(const key of ['unit2','unit4'])assert.equal(source.localSQL[key].length,16);
for(const file of ['index.html','companion.html']){const html=read('dist/teachers/'+file);for(const m of html.matchAll(/href="([^"]+)"/g)){const href=m[1];if(href.startsWith('http')||href.startsWith('#'))continue;assert.ok(fs.existsSync(new URL('dist/teachers/'+href.split('#')[0],root)),href);}}
assert.ok(read('dist/teachers/companion.html').includes('not a completed 64-entry local lesson map'));assert.ok(read('dist/teachers/companion.html').includes('not four additional 55-minute periods'));
// Budget, filters, deep links and temporary print expansion use the actual UI script.
const handlers={},elements=Object.fromEntries(['unit','query','minutes','lost','plan-count','budget-result','print-planning'].map(id=>[id,{value:'',textContent:'',addEventListener:(event,fn)=>handlers[id+'-'+event]=fn}]));elements.unit.value='all';elements.minutes.value='55';elements.lost.value='0';
const inCard=selector=>selector==='.plan-card, .local-lesson'?{}:null;
const details=[{open:false,closest:inCard},{open:true,closest:inCard},{open:false,closest:()=>null}];
const cards=[1,2].map((unit,i)=>({id:'topic-'+i,dataset:{unit:String(unit)},hidden:false,textContent:unit===1?'functions return':'SQL joins',classList:{contains:()=>true},querySelector:()=>details[i],scrollIntoView(){this.scrolled=true;}}));
const ctx={document:{getElementById:id=>elements[id]||cards.find(c=>c.id===id)||null,querySelectorAll:selector=>selector==='.plan-card'?cards:selector==='details'?details:[]},location:{hash:''},window:{addEventListener:(event,fn)=>handlers[event]=fn,print(){handlers.beforeprint();}}};vm.runInNewContext(read('dist/teachers/planning.js'),ctx);
assert.match(elements['budget-result'].textContent,/58 h 40 min/);elements.minutes.value='50';handlers['minutes-change']();assert.match(elements['budget-result'].textContent,/53 h 20 min/);
elements.lost.value='4';handlers['lost-input']();assert.match(elements['budget-result'].textContent,/60 ordinary teaching slots/);assert.match(elements['budget-result'].textContent,/50 h 0 min/);
for(const bad of ['','-1','65','1.5']){elements.lost.value=bad;handlers['lost-input']();assert.match(elements['budget-result'].textContent,/whole number/);}
elements.unit.value='2';handlers['unit-change']();assert.equal(cards[0].hidden,true);assert.equal(cards[1].hidden,false);
ctx.location.hash='#topic-0';handlers.hashchange();assert.equal(elements.unit.value,'1');assert.equal(details[0].open,true);assert.equal(cards[0].scrolled,true);details[0].open=false;
handlers['print-planning-click']();assert.equal(details[0].open,true);assert.equal(details[1].open,true);assert.equal(details[2].open,false);handlers.afterprint();assert.equal(details[0].open,false);assert.equal(details[1].open,true);
ctx.window.print=()=>{throw Error('print unavailable');};handlers['print-planning-click']();assert.equal(details[0].open,false);assert.equal(details[1].open,true);
console.log('Teacher planning: 50 topics/519 locators/256 slots, acyclic prerequisites, 64 local entries, calendar boundaries, budgets, filtering and print restoration passed.');
