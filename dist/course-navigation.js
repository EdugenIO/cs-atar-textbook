/* Course position is navigation context, never a completion or mastery claim. */
(() => {
 const sidebar=document.querySelector('.course-sidebar');if(!sidebar)return;
 const menu=sidebar.querySelector('.shelf-menu'),links=[...sidebar.querySelectorAll('.course-chapter')],panel=sidebar.querySelector('.course-sidebar-scroll'),position=document.getElementById('course-position'),mobile=document.getElementById('course-mobile-location'),context=document.getElementById('this-chapter'),shortcuts=document.getElementById('chapter-shortcuts'),wide=window.matchMedia('(min-width:851px)');
 let previousRoute=null;
 const route=()=>location.hash.slice(1).split('/')[0]||'home';
 const current=()=>links.find(a=>a.dataset.chapter===route());
 function closeMobile(){if(!wide.matches)menu.open=false;}
 function resize(){menu.open=wide.matches;}
 function sync(){
  const active=current(),hash=location.hash||'#home',changed=previousRoute!==route();
  for(const a of sidebar.querySelectorAll('a[aria-current]'))a.removeAttribute('aria-current');
  for(const a of sidebar.querySelectorAll('a[href]'))if(a.getAttribute('href')===hash)a.setAttribute('aria-current','page');
  if(active)active.setAttribute('aria-current','page');
  for(const a of document.querySelectorAll('header nav a')){if(a.getAttribute('href')==='#'+route())a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');}
  if(['teaching','assessments','audits','coverage','unit2-coverage','unit3-coverage','unit4-coverage','unit3-evidence'].includes(route()))sidebar.querySelector('.teacher-tools').open=true;
  const overview=route()==='contents'&&/^unit[1-4]$/.test(hash.split('/')[1]||'')?hash.split('/')[1].slice(4):null,unit=active?.dataset.unit||overview;
  if(unit&&(changed||overview)){
   const year=Number(unit)<3?'11':'12';
   sidebar.querySelectorAll('.course-year').forEach(d=>d.open=d.dataset.year===year);
   sidebar.querySelectorAll('.course-unit').forEach(d=>d.open=d.dataset.unit===unit);
  }
  const text=active?`Year ${active.dataset.year} · Unit ${active.dataset.unit} · Chapter ${active.dataset.position} of ${active.dataset.total}`:overview?`Unit ${overview} overview`:route()==='home'?'Choose a year and unit':route()==='glossary'?'Glossary':route()==='contents'?'Course contents':route()==='sources'?'About and sources':'Teacher resources';
  position.textContent=text;mobile.textContent=active?`Unit ${active.dataset.unit} · ${active.dataset.title}`:text;
  context.hidden=!active;
  if(changed&&active&&wide.matches){const top=active.offsetTop,bottom=top+active.offsetHeight;if(top<panel.scrollTop)panel.scrollTop=Math.max(0,top-12);else if(bottom>panel.scrollTop+panel.clientHeight)panel.scrollTop=bottom-panel.clientHeight+12;}
  if(changed&&route()==='home')panel.scrollTop=0;
  if(previousRoute!==null&&changed)closeMobile();previousRoute=route();
 }
 function anchor(text,href){const a=document.createElement('a');a.textContent=text;a.href=href;return a;}
 function adjacent(active){const index=links.indexOf(active);return {before:links[index-1],after:links[index+1]};}
 function chapterLinks(active){
  const {before,after}=adjacent(active),fragment=document.createDocumentFragment();
  function neighbour(label,target){const a=anchor(label,target.getAttribute('href')),title=document.createElement('span');title.className='adjacent-title';title.textContent=target.dataset.title;a.append(' ',title);return a;}
  fragment.append(before?neighbour('← Previous chapter',before):anchor('← Unit 1 overview','#contents/unit1'));
  fragment.append(after?neighbour('Next chapter →',after):anchor('Revision practice →','revision/'));
  return fragment;
 }
 function refresh(){
  sync();const active=current(),main=document.getElementById('main');main.querySelector('.chapter-route-controls')?.remove();shortcuts.replaceChildren();if(!active)return;
  const data=active.dataset,id=data.chapter,prefix='#'+id+'/',feedback=main.querySelector('#heading-your-practical-task')?.nextElementSibling?.querySelector(':scope > details')||[...main.querySelectorAll('details')].find(d=>d.querySelector('summary')?.textContent.startsWith('Apply:'));
  if(feedback){feedback.id='chapter-feedback-guide';if(location.hash.endsWith('/chapter-feedback-guide'))feedback.open=true;}
  const targets=[['Choose an allocated lesson','lessons/?chapter='+id],['Reading',prefix+data.read],['Worked example',prefix+data.worked],['Practice',data.pack?'activities/'+data.pack+'/#lesson-'+data.activity:prefix+data.practice],['Feedback',data.pack?'activities/'+data.pack+'/teacher.html#lesson-'+data.activity:prefix+'chapter-feedback-guide'],['Revision','revision/#topic-'+id]];
  for(const [label,href]of targets){const a=anchor(label,href);if(href===location.hash)a.setAttribute('aria-current','location');shortcuts.append(a);}
  const title=main.querySelector('h1');if(!title)return;
  const bar=document.createElement('div');bar.className='chapter-route-controls no-print';
  const label=document.createElement('p');label.className='chapter-position';label.textContent=position.textContent;
  const meta=document.createElement('div');meta.className='chapter-route-meta';meta.append(label);
  const nav=document.createElement('nav');nav.className='chapter-navigation-top';nav.setAttribute('aria-label','Chapter navigation at top');nav.append(chapterLinks(active));bar.append(meta,nav);
  const intro=title.nextElementSibling;(main.querySelector('.lesson-preparation')||((intro?.classList.contains('lede'))?intro:title)).after(bar);
  const bottom=main.querySelector('.chapter-nav');if(bottom){bottom.setAttribute('aria-label','Chapter navigation at bottom');bottom.replaceChildren(chapterLinks(active));}
 }
 sidebar.addEventListener('click',event=>{const a=event.target.closest('a[href]');if(!a)return;closeMobile();const href=a.getAttribute('href');if(href.startsWith('#')){closeMobile();if(href===location.hash){event.preventDefault();if(typeof prepareChapterDestination==='function')prepareChapterDestination();else{const target=document.querySelector('main h1');if(target){target.tabIndex=-1;target.focus();target.scrollIntoView();}}}}});
 menu.addEventListener('keydown',event=>{if(event.key==='Escape'&&!wide.matches&&menu.open){menu.open=false;menu.querySelector('summary').focus();event.stopPropagation();}});
 window.addEventListener('hashchange',sync);window.addEventListener('textbook:chapter-ready',refresh);wide.addEventListener('change',resize);resize();sync();
})();
