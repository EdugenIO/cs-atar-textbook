// Print only the chosen scope; browser Print defaults to the current filter.
(() => {
  const selector=document.getElementById('lesson-select');
  const lessons=[...document.querySelectorAll('[data-lesson]')];
  const selectedButton=document.getElementById('print-selected');
  let snapshot=null;
  function choose(value) {
    const valid=value==='all'||lessons.some(l=>l.dataset.lesson===value);
    selector.value=valid?value:'all';
    lessons.forEach(l=>{l.hidden=selector.value!=='all'&&l.dataset.lesson!==selector.value;});
    selectedButton.disabled=selector.value==='all';
  }
  function prepare(scope=selector.value) {
    if(snapshot)return;
    snapshot=lessons.map(l=>[l,l.hidden]);
    lessons.forEach(l=>{l.hidden=scope!=='all'&&l.dataset.lesson!==scope;});
    lessons.filter(l=>!l.hidden).at(-1)?.classList.add('print-last');
  }
  function restore() {
    if(!snapshot)return;
    snapshot.forEach(([lesson,hidden])=>{lesson.hidden=hidden;lesson.classList.remove('print-last');});snapshot=null;
  }
  function print(scope) {
    prepare(scope);
    try{window.print();}catch(error){restore();throw error;}
  }
  selector.addEventListener('change',()=>choose(selector.value));
  document.querySelectorAll('[data-lesson-link]').forEach(a=>a.addEventListener('click',()=>choose(a.dataset.lessonLink)));
  selectedButton.addEventListener('click',()=>print(selector.value));
  document.getElementById('print-all').addEventListener('click',()=>print('all'));
  window.addEventListener('beforeprint',()=>prepare());
  window.addEventListener('afterprint',restore);
  window.addEventListener('hashchange',()=>choose(location.hash.match(/^#lesson-(\d{2})$/)?.[1]||'all'));
  choose(location.hash.match(/^#lesson-(\d{2})$/)?.[1]||'all');
})();
