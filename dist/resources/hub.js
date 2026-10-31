const fields=['query','year','unit','topic','type'].map(id=>document.getElementById(id));
const cards=[...document.querySelectorAll('.resource-card')];
function filterResources(){
 const [q,year,unit,topic,type]=fields.map(f=>f.value.trim());let count=0;
 for(const card of cards){
  const matches=(!q||card.textContent.toLowerCase().includes(q.toLowerCase()))&&(!year||card.dataset.year===year)&&(!unit||card.dataset.unit===unit)&&(!topic||card.dataset.topic===topic);
  const links=[...card.querySelectorAll('[data-type]')];
  for(const link of links)link.hidden=!!type&&link.dataset.type!==type;
  card.hidden=!matches||!links.some(l=>!l.hidden);
  const teacher=card.querySelector('.teacher-resources');if(teacher){teacher.hidden=!links.some(l=>l.dataset.type==='teacher'&&!l.hidden);if(type==='teacher')teacher.open=true;}
  if(!card.hidden)count++;
 }
 document.getElementById('count').textContent=`${count} of ${cards.length} chapters`;
 document.getElementById('empty').hidden=count!==0;
 const params=new URLSearchParams();fields.forEach(f=>{if(f.value)params.set(f.id,f.value);});history.replaceState(null,'',location.pathname+(params.size?'?'+params:'')+location.hash);
}
const initial=new URLSearchParams(location.search);fields.forEach(f=>{const v=initial.get(f.id);if(v!==null&&(f.tagName==='INPUT'||[...f.options].some(o=>o.value===v)))f.value=v;f.addEventListener('input',filterResources);});
document.getElementById('reset').addEventListener('click',()=>{fields.forEach(f=>f.value='');filterResources();});
document.getElementById('print').addEventListener('click',()=>window.print());
filterResources();
