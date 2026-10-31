import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const read=f=>fs.readFileSync(new URL('../dist/revision/'+f+'.js',import.meta.url),'utf8');
function setup(failRead=false,failWrite=false){
 const el=(id='')=>({id,value:'',hidden:false,checked:false,disabled:false,textContent:'',dataset:{},handlers:{},addEventListener(event,fn){this.handlers[event]=fn;},setAttribute(k,v){this[k]=v;},closest(){return null;},scrollIntoView(){}});
 const elements=Object.fromEntries(['save-message','check-count','filter-count','unit','query','quiz-set','start-quiz','quiz-status','print-revision','export-checks'].map(id=>[id,el(id)]));elements.unit.value='all';elements['quiz-set'].value='u1';
 const views=['topics','quizzes','exams','extensions'].map(id=>el(id)),buttons=views.map(v=>Object.assign(el(),{dataset:{view:v.id}}));
 const checks=[Object.assign(el(),{dataset:{check:'requirement-test',kind:'requirement'}})],cards=[Object.assign(el(),{dataset:{unit:'1'},textContent:'Loops'}),Object.assign(el(),{dataset:{unit:'2'},textContent:'SQL'})];
 const filters=el(),form=el('quiz-form'),submit=el();let inputs=[],html='';Object.defineProperty(form,'innerHTML',{get:()=>html,set:value=>{html=value;inputs=[...value.matchAll(/type="radio" name="([^"]+)" value="(\d+)"/g)].map(m=>Object.assign(el(),{name:m[1],value:m[2]}));submit.disabled=false;}});
 form.querySelectorAll=()=>inputs;form.querySelector=()=>submit;elements['quiz-form']=form;
 const events={},storage={getItem(){if(failRead)throw Error('unavailable');return null;},setItem(k,v){if(failWrite)throw Error('full');storage.saved=v;}};
 const doc={getElementById:id=>elements[id]||(elements[id]=el(id)),querySelectorAll:s=>s==='.revision-view'?views:s==='[data-view]'?buttons:s==='[data-check]'?checks:cards,querySelector:s=>s==='.filter-bar'?filters:inputs.find(i=>i.name===s.match(/name="([^"]+)"/)?.[1]&&i.checked)||null,createElement:()=>el()};
 const c=vm.createContext({document:doc,localStorage:storage,location:{hash:''},window:{addEventListener:(n,f)=>events[n]=f,print(){}},setTimeout(){},URL:{},Blob});for(const file of ['revision-data','revision-core','revision'])vm.runInContext(read(file),c);
 return {elements,checks,cards,buttons,inputs:()=>inputs,submit,form,storage,bank:JSON.parse(vm.runInContext('JSON.stringify(revisionData)',c))};
}
const run=setup();run.elements['start-quiz'].handlers.click();assert.equal(run.inputs().length,24);assert.equal(run.elements['quiz-set'].disabled,true);assert.equal(run.elements['start-quiz'].disabled,true);
// A selected wrong answer, a correct answer and unanswered questions must differ.
const q=run.bank.questions;run.inputs().find(i=>i.name===q[0].id&&Number(i.value)!==q[0].correct).checked=true;run.inputs().find(i=>i.name===q[1].id&&Number(i.value)===q[1].correct).checked=true;
run.form.handlers.submit({preventDefault(){}});assert.match(run.elements['quiz-status'].textContent,/1\/8; 6 unanswered/);assert.ok(run.inputs().every(i=>i.disabled));assert.equal(run.submit.disabled,true);assert.equal(run.elements['quiz-set'].disabled,false);assert.match(run.elements['feedback-'+q[0].id].innerHTML,/Your choice/);
const firstScore=run.elements['quiz-status'].textContent;run.form.handlers.submit({preventDefault(){}});assert.equal(run.elements['quiz-status'].textContent,firstScore);
run.elements['start-quiz'].handlers.click();assert.ok(run.inputs().every(i=>!i.checked&&!i.disabled));assert.equal(run.submit.disabled,false);
run.elements.unit.value='2';run.elements.unit.handlers.change();assert.equal(run.cards[0].hidden,true);assert.equal(run.cards[1].hidden,false);
const unavailable=setup(true,true);assert.match(unavailable.elements['save-message'].textContent,/unavailable/);unavailable.checks[0].checked=true;unavailable.checks[0].handlers.change();assert.match(unavailable.elements['save-message'].textContent,/could not be saved/);assert.match(unavailable.elements['check-count'].textContent,/1 syllabus-linked/);
console.log('Revision UI: correct/wrong/unanswered results, locked submission, repeat prevention, clean new attempt, filtering and storage-failure fallback passed.');
