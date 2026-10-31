(() => {
 const year=document.getElementById('year'),steps=[...document.querySelectorAll('.sql-step')];
 function filter(){let n=0;for(const step of steps){step.hidden=year.value!=='all'&&!(year.value==='extension'?step.dataset.kind==='extension':step.dataset.year===year.value&&step.dataset.kind==='core');if(!step.hidden)n++;}document.getElementById('step-count').textContent=n+' steps shown';}
 year.addEventListener('change',filter);
 function followHash(){const step=steps.find(s=>'#'+s.id===location.hash);if(step){year.value=step.dataset.kind==='extension'?'extension':step.dataset.year;filter();step.scrollIntoView();}}
 window.addEventListener('hashchange',followHash);
 document.getElementById('print-pathway').addEventListener('click',()=>window.print());
 filter();followHash();
})();
