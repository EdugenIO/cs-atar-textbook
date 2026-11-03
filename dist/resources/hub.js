const fields=['query','year','unit','topic','type','view'].map(id=>document.getElementById(id));
const cards=[...document.querySelectorAll('.resource-card, .activity-card')];
function normalise(value){return String(value).normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();}
function relevance(card,q){const query=normalise(q);if(!query)return 1;const terms=query.split(' '),title=normalise(card.dataset.title||''),fileQuery=/\.(?:py|sql|csv|sqlite|md|pdf|zip)\b/i.test(q),text=fileQuery?normalise([...card.querySelectorAll('a[href]')].map(a=>a.getAttribute('href').split('/').at(-1).split(/[?#]/)[0]).join(' ')):normalise(card.dataset.search||card.textContent);if(!terms.every(t=>(' '+text+' ').includes(' '+t+' ')))return 0;return title===query?100:title.includes(query)?80:terms.every(t=>(' '+title+' ').includes(' '+t+' '))?60:20;}
function filterResources(){
 const [q,year,unit,topic,type,view]=fields.map(f=>f.value.trim());let count=0;const ranked=[];
 for(const card of cards){
  const score=relevance(card,q);ranked.push({card,score});const matches=(card.dataset.view||'chapters')===(view||'chapters')&&!!score&&(!year||card.dataset.year===year)&&(!unit||card.dataset.unit===unit)&&(!topic||card.dataset.topic===topic);
  const links=[...card.querySelectorAll('[data-type]')];
  for(const link of links)link.hidden=!!type&&link.dataset.type!==type;
  card.hidden=!matches||!links.some(l=>!l.hidden);
  const teacher=card.querySelector('.teacher-resources');if(teacher){teacher.hidden=!links.some(l=>l.dataset.type==='teacher'&&!l.hidden);if(type==='teacher')teacher.open=true;}
  if(!card.hidden)count++;
 }
 const grid=cards[0]?.parentElement;if(grid)for(const {card}of ranked.sort((a,b)=>b.score-a.score))grid.append(card);
 document.getElementById('count').textContent=`${count} of ${cards.filter(c=>(c.dataset.view||'chapters')===(view||'chapters')).length} ${view==='activities'?'activities':'chapters'}`;
 document.getElementById('empty').hidden=count!==0;
 const params=new URLSearchParams();fields.forEach(f=>{if(f.value&&(f.id!=='view'||f.value!=='chapters'))params.set(f.id,f.value);});history.replaceState(null,'',location.pathname+(params.size?'?'+params:'')+location.hash);
}
const initial=new URLSearchParams(location.search);if(location.hash.startsWith('#activity-')&&!initial.has('view'))initial.set('view','activities');fields.forEach(f=>{const v=initial.get(f.id);if(v!==null&&(f.tagName==='INPUT'||[...f.options].some(o=>o.value===v)))f.value=v;f.addEventListener('input',filterResources);});
document.getElementById('reset').addEventListener('click',()=>{fields.forEach(f=>{if(f.id!=='view')f.value='';});filterResources();});
document.getElementById('print').addEventListener('click',()=>window.print());
filterResources();
