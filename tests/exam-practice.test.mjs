import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../dist/',import.meta.url);
const c=vm.createContext({});
for(const file of ['practice/questions.js','practice/practice-core.js'])vm.runInContext(fs.readFileSync(new URL(file,root),'utf8'),c);
const sets=vm.runInContext('practiceSets',c),core=vm.runInContext('PracticeCore',c);
assert.equal(sets.length,2);
const chapterSource=fs.readdirSync(root).filter(f=>f.endsWith('.js')).map(f=>fs.readFileSync(new URL(f,root),'utf8')).join('\n');
const ids=new Set();
for(const set of sets){
  assert.equal(set.questions.length,10);
  assert.equal(set.questions.filter(q=>q.type==='Short answer').length,8);
  assert.equal(set.questions.filter(q=>q.type==='Extended response').length,2);
  assert.equal(set.questions.reduce((s,q)=>s+q.criteria.length,0),30);
  for(const q of set.questions){
    assert.ok(!ids.has(q.id));ids.add(q.id);
    assert.ok(q.prompt&&q.model&&q.mistake&&q.chapter);
    assert.equal(q.criteria.length,q.type==='Short answer'?2:7);
    if(q.chapter==='selection')assert.ok(chapterSource.includes("route==='selection'"));
    else assert.match(chapterSource,new RegExp(`id["']?\\s*:\\s*["']${q.chapter}["']`),`Missing chapter ${q.chapter}`);
  }
  const state=core.create(set,{timed:true,minutes:45},1000);
  assert.equal(core.timing(state,61000).remaining,44*60000);
  assert.equal(core.timing(state,1000+46*60000).overtime,60000);
  assert.equal(core.timing(state,1000+46*60000).remaining,0);
  assert.equal(core.mark(set,state).score,0);
  state.answers[set.questions[0].id]='<script>draft</script>';
  state.readingUntil=301000;
  const restored=core.restore(set,JSON.parse(JSON.stringify(state)));
  assert.equal(restored.answers[set.questions[0].id],'<script>draft</script>');
  assert.equal(restored.readingUntil,301000);
  core.startWriting(restored,361000);
  assert.equal(restored.startedAt,301000);
  assert.equal(restored.deadline,301000+45*60000);
  assert.equal(core.timing(restored,361000).remaining,44*60000);
  const early=core.restore(set,JSON.parse(JSON.stringify(state)));
  core.startWriting(early,61000);assert.equal(early.startedAt,61000);
  assert.equal(core.restore(set,{...state,revision:999}),null);
  assert.equal(core.restore(set,{...state,startedAt:'bad'}),null);
  state.phase='marking';state.submittedAt=61000;
  for(const q of set.questions){state.awarded[q.id]=q.criteria.map(()=>true);state.reviewed[q.id]=true;}
  state.uncertain[set.questions[0].id]=true;
  assert.equal(core.mark(set,state).score,30);
  assert.equal(core.mark(set,state).reviewed,10);
  assert.equal(core.mark(set,state).uncertain,1);
  state.awarded[set.questions[0].id][0]=false;
  assert.equal(core.mark(set,state).score,29);
  assert.equal(core.timing(state,9999999).elapsed,60000,'Submitted clock must be frozen');
  const untimed=core.create(set,{timed:false},1000);
  assert.equal(core.timing(untimed,9999999).remaining,null);
  assert.equal(core.timing(untimed,9999999).overtime,0);
}
assert.match(fs.readFileSync(new URL('index.html',root),'utf8'),/href="practice\/">Exam practice/);
const ui=fs.readFileSync(new URL('practice/practice.js',root),'utf8');
assert.doesNotMatch(ui,/\bfetch\s*\(|XMLHttpRequest|sendBeacon/);
assert.match(ui,/event\.target\.closest\('\.skip'\)/);
console.log('20 original questions, 60 criterion marks, chapter links, restore, timing, reading transitions and self-marking totals passed.');

// Exercise delegated UI events without a backend or browser-only dependencies.
function interfaceHarness({brokenStorage=false,hash='#year11-pilot',saved=new Map()}={}){
  const nodes=new Map(),events={},windowEvents={};
  const node=id=>{
    if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',value:'',checked:false,focus(){},remove(){nodes.delete(id);},setAttribute(){}});
    return nodes.get(id);
  };
  node('timing').value='timed';node('minutes').value='45';
  let exported='';
  const scope=vm.createContext({
    document:{getElementById:node,addEventListener:(n,fn)=>events[n]=fn,createElement:()=>({setAttribute(){},focus(){},click(){}})},
    window:{addEventListener:(n,fn)=>windowEvents[n]=fn,scrollTo(){},print(){}},
    location:{hash},localStorage:{getItem:k=>saved.get(k)??null,setItem:(k,v)=>{if(brokenStorage)throw new Error('Quota');saved.set(k,v);},removeItem:k=>saved.delete(k)},
    setInterval(){},setTimeout:fn=>fn(),Date,
    URL:{createObjectURL:blob=>{exported=blob.text;return 'blob:test';},revokeObjectURL(){}},
    Blob:class{constructor(parts){this.text=parts.join('');}}
  });
  for(const file of ['questions.js','practice-core.js','practice.js'])vm.runInContext(fs.readFileSync(new URL('practice/'+file,root),'utf8'),scope);
  return {node,events,windowEvents,saved,exported:()=>exported,
    start:()=>events.submit({target:{id:'practice-start'},preventDefault(){}}),
    action:name=>events.click({target:{closest:selector=>selector==='.skip'?null:selector==='[data-action]'?{dataset:{action:name}}:{after(){}}}})};
}
const h=interfaceHarness();h.start();
assert.doesNotMatch(h.node('practice-main').innerHTML,/class="mark-guide"/);
h.events.input({target:{dataset:{answer:'y11-1'},value:'9\nFalse <script>alert(1)</script>'}});
assert.ok([...h.saved.values()][0].includes('False'));
h.action('confirm-finish');
assert.match(h.node('practice-main').innerHTML,/class="mark-guide"/);
assert.match(h.node('practice-main').innerHTML,/data-answer="y11-1"[^>]*readonly/);
assert.match(h.node('practice-main').innerHTML,/&lt;script&gt;alert/);
h.events.change({target:{dataset:{criterion:'y11-1',index:'0'},checked:true}});
h.events.change({target:{dataset:{reviewed:'y11-1'},checked:true}});
assert.match(h.node('total-score').textContent,/1\/30.*1\/10 questions reviewed/);
h.events.input({target:{dataset:{correction:'y11-1'},value:'My separate correction'}});
h.events.input({target:{dataset:{answer:'y11-1'},value:'Should not overwrite locked answer'}});
h.action('download');
assert.match(h.exported(),/False <script>/);
assert.match(h.exported(),/My separate correction/);
assert.doesNotMatch(h.exported(),/Should not overwrite/);
const reopened=interfaceHarness({saved:h.saved});
assert.match(reopened.node('practice-main').innerHTML,/class="mark-guide"/);
assert.match(reopened.node('total-score').textContent,/1\/30/);
const failure=interfaceHarness({brokenStorage:true});failure.start();
assert.match(failure.node('save-status').textContent,/saving unavailable/);
console.log('UI submission, locked responses, escaped drafts, self-awarded marks, correction exports and storage failure passed.');

for(const year of [11,12]){
  const setId=`year${year}-pilot`,questionId=`y${year}-1`;
  const ownKey='cs-atar-practice-v1-'+setId;
  const otherKey=`cs-atar-practice-v1-year${year===11?12:11}-pilot`;
  const attempt=interfaceHarness({hash:'#'+setId});attempt.start();
  attempt.saved.set(otherKey,'unrelated saved attempt');
  assert.equal((attempt.node('practice-main').innerHTML.match(/Reset and sit again/g)||[]).length,2);
  for(const completed of [false,true]){
    attempt.events.input({target:{dataset:{answer:questionId},value:'Previous answer'}});
    if(completed){
      attempt.action('confirm-finish');
      attempt.events.change({target:{dataset:{criterion:questionId,index:'0'},checked:true}});
      attempt.events.change({target:{dataset:{reviewed:questionId},checked:true}});
      attempt.events.change({target:{dataset:{uncertain:questionId},checked:true}});
      attempt.events.input({target:{dataset:{correction:questionId},value:'Previous correction'}});
    }
    const beforeReset=attempt.saved.get(ownKey);
    attempt.action('clear');attempt.action('cancel');
    assert.equal(attempt.saved.get(ownKey),beforeReset,'Cancelling reset preserves work');
    attempt.action('clear');attempt.action('confirm-clear');
    assert.equal(attempt.saved.has(ownKey),false,'Reset removes this attempt from storage');
    assert.equal(attempt.saved.get(otherKey),'unrelated saved attempt');
    assert.match(attempt.node('practice-main').innerHTML,/Choose your timing/);
    attempt.start();
    const fresh=JSON.parse(attempt.saved.get(ownKey));
    assert.equal(fresh.phase,'answering');assert.equal(fresh.submittedAt,null);
    for(const field of ['answers','awarded','reviewed','uncertain','corrections'])assert.deepEqual(fresh[field],{});
    assert.equal(fresh.continued,false);
    assert.equal(fresh.deadline-fresh.startedAt,45*60000);
    assert.doesNotMatch(attempt.node('practice-main').innerHTML,/class="mark-guide"|Previous answer|Previous correction|readonly/);
  }
}
console.log('Both years: repeat completed/in-progress attempts, cancel reset, clear all attempt data, preserve other sets and restart full timers passed.');
