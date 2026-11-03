// BEGIN GENERATED LESSON DESTINATIONS
const focusedLessonDestinations = {"u1-l11":"lessons/selection/","u1-l15":"lessons/loops/"};
// END GENERATED LESSON DESTINATIONS
(() => {
 const unit=document.getElementById('unit'),chapter=document.getElementById('chapter'),cards=[...document.querySelectorAll('.lesson-route')];
 function filter(){let count=0;for(const card of cards){card.hidden=!!((unit.value&&card.dataset.unit!==unit.value)||(chapter.value&&card.dataset.chapter!==chapter.value&&card.dataset.readChapter!==chapter.value));if(!card.hidden)count++;}document.getElementById('count').textContent=count+' of 256 lessons';const params=new URLSearchParams();if(unit.value)params.set('unit',unit.value);if(chapter.value)params.set('chapter',chapter.value);history.replaceState(null,'',location.pathname+(params.size?'?'+params:'')+location.hash);}
 function reveal(){const id=location.hash.slice(1),destination=Object.hasOwn(focusedLessonDestinations,id)?focusedLessonDestinations[id]:null;if(destination){location.replace(destination.replace(/^lessons\//,'')+(location.protocol==='file:'?'index.html':''));return;}const target=document.getElementById(location.hash.slice(1));if(!target?.classList.contains('lesson-route'))return;unit.value=target.dataset.unit;chapter.value=target.dataset.chapter;filter();target.tabIndex=-1;target.focus({preventScroll:true});target.scrollIntoView({block:'start'});}
 const params=new URLSearchParams(location.search);for(const field of [unit,chapter])if([...field.options].some(o=>o.value===params.get(field.id)))field.value=params.get(field.id);
 let snapshot=null;
 function preparePrint(answers=false){if(snapshot)return;snapshot=[...document.querySelectorAll('.lesson-route details')].map(d=>[d,d.open]);if(answers){document.body.dataset.lessonAnswers='true';snapshot.forEach(([d])=>{if(!d.closest('.lesson-route').hidden)d.open=true;});}else delete document.body.dataset.lessonAnswers;}
 function restorePrint(){if(!snapshot)return;snapshot.forEach(([d,open])=>d.open=open);snapshot=null;delete document.body.dataset.lessonAnswers;}
 function printLessons(answers){preparePrint(answers);try{window.print();}catch(error){restorePrint();throw error;}}
 window.addEventListener('beforeprint',()=>preparePrint(false));window.addEventListener('afterprint',restorePrint);
 function clearTarget(){history.replaceState(null,'',location.pathname+location.search);}
 unit.addEventListener('change',()=>{chapter.value='';clearTarget();filter();});chapter.addEventListener('change',()=>{unit.value='';clearTarget();filter();});document.getElementById('reset').addEventListener('click',()=>{unit.value='';chapter.value='';history.replaceState(null,'',location.pathname);filter();});document.getElementById('print').addEventListener('click',()=>printLessons(false));document.getElementById('print-answers').addEventListener('click',()=>printLessons(true));window.addEventListener('hashchange',reveal);filter();reveal();
})();
