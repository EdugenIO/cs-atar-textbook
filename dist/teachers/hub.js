(() => {
 const get=id=>document.getElementById(id),params=new URLSearchParams(location.search);
 const validUnit=v=>/^[1-4]$/.test(v),validWeek=v=>v==='all'||/^(?:[1-9]|1[0-6])$/.test(v);
 let view=params.get('view')==='topics'?'topics':'week';
 if(validUnit(params.get('unit')))plannerUnit=Number(params.get('unit'));
 if(validWeek(params.get('week')))plannerWeek=params.get('week');
 function save(){const p=new URLSearchParams({view,unit:String(plannerUnit),week:plannerWeek});if(view==='topics'&&get('unit').value==='all')p.set('topicUnit','all');history.replaceState(null,'',location.pathname+'?'+p+location.hash);}
 function context(){get('hub-context').textContent=(view==='topics'&&get('unit').value==='all'?'All topic units · Return plan: ':'')+`Year ${plannerUnit<3?11:12} · Unit ${plannerUnit} · ${plannerWeek==='all'?'Whole semester':'Week '+plannerWeek}`;}
 function show(next){view=next;get('week-view').hidden=view!=='week';get('topic-view').hidden=view!=='topics';document.querySelectorAll('[data-teacher-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.teacherView===view)));context();save();}
 function syncUnit(){get('unit').value=String(plannerUnit);get('unit').dispatchEvent(new Event('change'));}
 function follow(){const target=get(location.hash.slice(1));if(target?.classList.contains('plan-card')){plannerUnit=Number(target.dataset.unit);updateTeacherPlanner();syncUnit();show('topics');target.querySelector('details').open=true;target.tabIndex=-1;target.focus({preventScroll:true});target.scrollIntoView();}}
 updateTeacherPlanner();syncUnit();if(view==='topics'&&params.get('topicUnit')==='all'){get('unit').value='all';get('unit').dispatchEvent(new Event('change'));}show(view);follow();
 document.addEventListener('click',event=>{
  const tab=event.target.closest('[data-teacher-view]');
  if(tab){if(tab.dataset.teacherView==='week'){history.replaceState(null,'',location.pathname+location.search);updateTeacherPlanner();}else syncUnit();show(tab.dataset.teacherView);document.querySelector('.teacher-views [data-teacher-view="'+view+'"]').focus();}
  if(event.target.closest('[data-planner-unit], [data-planner-week]')){syncUnit();context();save();}
 });
 document.addEventListener('change',event=>{if(event.target.id==='planner-week-select'){context();save();}if(event.target.id==='unit'){if(validUnit(event.target.value)){plannerUnit=Number(event.target.value);updateTeacherPlanner();}context();save();}});
 window.addEventListener('hashchange',follow);
 get('print-week').addEventListener('click',()=>get('print-planning').click());
})();
