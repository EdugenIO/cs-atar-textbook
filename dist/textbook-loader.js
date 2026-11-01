/* The reading home is static; the full book loads only for reading or search. */
(() => {
 const input=document.getElementById('search'),main=document.getElementById('main');let pending=null,ready=false,navigated=false;
 function loadBook(){
  if(pending)return pending;
  main.setAttribute('aria-busy','true');
  const status=document.createElement('p');status.id='book-loading';status.setAttribute('role','status');status.textContent='Opening the textbook…';main.prepend(status);
  const template=document.getElementById('textbook-runtime');
  for(const link of template.content.querySelectorAll('link[href]'))document.head.append(link.cloneNode());
  pending=Promise.allSettled([...template.content.querySelectorAll('script[src]')].map(source=>new Promise((resolve,reject)=>{
   const script=document.createElement('script');script.async=false;script.src=source.getAttribute('src');script.onload=resolve;script.onerror=()=>reject(Error('A textbook file could not be loaded.'));document.body.append(script);
  }))).then(results=>{if(results.some(result=>result.status==='rejected'))throw Error('Incomplete textbook download');ready=true;main.removeAttribute('aria-busy');document.getElementById('book-loading')?.remove();if(navigated&&document.activeElement!==input)prepareChapterDestination();if(input.value)input.dispatchEvent(new Event('input',{bubbles:true}));}).catch(()=>{
   main.removeAttribute('aria-busy');const warning=document.createElement('p');warning.setAttribute('role','alert');warning.textContent='The textbook could not finish loading. ';const offline=document.createElement('a');offline.href='offline/';offline.textContent='Use offline downloads';const reload=document.createElement('button');reload.textContent='Reload textbook';reload.onclick=()=>location.reload();warning.append(offline,' or ',reload);main.prepend(warning);document.getElementById('book-loading')?.remove();
  });return pending;
 }
 window.addEventListener('hashchange',()=>{if(!ready){navigated=true;loadBook();}});
 input.addEventListener('focus',loadBook,{once:true});input.addEventListener('input',()=>{if(!ready)loadBook();});
 if(!['','home'].includes(location.hash.slice(1)))loadBook();
})();
