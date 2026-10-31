(() => {
 const get=id=>document.getElementById(id),cards=[...document.querySelectorAll('.plan-card')],local=[...document.querySelectorAll('.local-lesson')];
 function filter(){if(!get('unit'))return;const unit=get('unit').value,q=get('query').value.trim().toLowerCase();let n=0;for(const c of cards){c.hidden=(unit!=='all'&&c.dataset.unit!==unit)||(q.length>0&&!c.textContent.toLowerCase().includes(q));if(!c.hidden)n++;}get('plan-count').textContent=n?n+' topic plans shown':'No matching plans. Clear the search or choose all units.';}
 function budget(){if(!get('minutes'))return;const minutes=Number(get('minutes').value),lost=Number(get('lost').value);if(get('lost').value===''||![50,55].includes(minutes)||!Number.isInteger(lost)||lost<0||lost>64){get('budget-result').textContent='Enter a whole number of lost slots from 0 to 64.';return;}const remaining=64-lost,total=remaining*minutes;get('budget-result').textContent=`${remaining} ordinary teaching slots remain: ${Math.floor(total/60)} h ${total%60} min. The 64-slot plan needs ${lost} slot(s) reallocated or replanned; project/practice work is already included.`;}
 function week(){if(!get('week'))return;let n=0;for(const c of local){c.hidden=get('week').value!=='all'&&c.dataset.week!==get('week').value;if(!c.hidden)n++;}get('local-count').textContent=n+' local entries shown; event checkpoints and controlled periods retain their separate purposes.';}
 if(get('unit')){get('unit').addEventListener('change',filter);get('query').addEventListener('input',filter);get('minutes').addEventListener('change',budget);get('lost').addEventListener('input',budget);filter();budget();}
 if(get('week')){get('week').addEventListener('change',week);week();}
 function followHash(){const target=document.getElementById(location.hash.slice(1));if(target?.classList.contains('plan-card')){get('unit').value=target.dataset.unit;get('query').value='';filter();const detail=target.querySelector('details');if(detail)detail.open=true;target.scrollIntoView();}}
 window.addEventListener('hashchange',followHash);followHash();
 let snapshot=null;
 function prepare(){if(snapshot)return;snapshot=[...document.querySelectorAll('details')].map(d=>[d,d.open]);for(const [d] of snapshot){if(d.closest('.plan-card, .local-lesson')&&!d.closest('[hidden]'))d.open=true;}}
 function restore(){if(!snapshot)return;for(const [d,open] of snapshot)d.open=open;snapshot=null;}
 get('print-planning').addEventListener('click',()=>{prepare();try{window.print();}catch{restore();}});
 window.addEventListener('beforeprint',prepare);window.addEventListener('afterprint',restore);
})();
