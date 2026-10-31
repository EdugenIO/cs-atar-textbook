/* Native menu and text alternatives also work with keyboard navigation. */
(function(){
  const menu=document.querySelector('.shelf-menu');
  if(menu&&window.matchMedia){
    const wide=window.matchMedia('(min-width:851px)');
    const update=()=>{menu.open=wide.matches;};update();
    wide.addEventListener('change',update);
  }
  function diagrams(){
    document.querySelectorAll('main figure img[src$=".svg"]').forEach(img=>{
      const figure=img.closest('figure');if(figure.querySelector('.diagram-tools'))return;
      const name=img.getAttribute('src').split('/').pop(),record=typeof textbookDiagrams==='undefined'?null:textbookDiagrams[name];
      if(!record)return;
      const tools=document.createElement('div');tools.className='diagram-tools';
      const link=document.createElement('a');link.href=img.getAttribute('src');link.target='_blank';link.rel='noopener';link.textContent='Open full-size diagram (new tab)';
      const details=document.createElement('details'),summary=document.createElement('summary'),text=document.createElement('p');
      summary.textContent='Read the diagram as text: '+record.title;text.textContent=record.description;
      details.append(summary,text);tools.append(link,details);figure.append(tools);
    });
  }
  window.addEventListener('hashchange',diagrams);diagrams();
})();
