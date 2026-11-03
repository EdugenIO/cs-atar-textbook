(() => {
 const choice=document.getElementById('activity-choice'),cards=[...document.querySelectorAll('.activity')];
 function select(){let shown=0;for(const card of cards){card.hidden=!!choice.value&&card.id!==choice.value;if(!card.hidden)shown++;}document.getElementById('activity-count').textContent=shown+' of 8 activities shown';}
 choice.addEventListener('change',select);
 let snapshot=null;
 function prepare(teacher=false){if(snapshot)return;snapshot=[...document.querySelectorAll('details')].map(d=>[d,d.open]);if(teacher){document.body.dataset.teacherPrint='true';for(const [d]of snapshot)if(!d.closest('.activity').hidden)d.open=true;}else delete document.body.dataset.teacherPrint;}
 function restore(){if(!snapshot)return;for(const [d,open]of snapshot)d.open=open;snapshot=null;delete document.body.dataset.teacherPrint;}
 function print(teacher){prepare(teacher);try{window.print();}catch(error){restore();throw error;}}
 document.getElementById('print-student').addEventListener('click',()=>print(false));
 document.getElementById('print-teacher').addEventListener('click',()=>print(true));
 window.addEventListener('beforeprint',()=>prepare(false));window.addEventListener('afterprint',restore);
 const hash=location.hash.slice(1);if(cards.some(c=>c.id===hash)){choice.value=hash;select();}
})();
