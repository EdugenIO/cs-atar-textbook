/* Opens an editable issue draft. Does not submit a report or include learner work. */
(() => {
 const base='https://edugenio.github.io/cs-atar-textbook/';
 function issueURL(page,title){const url=new URL(page);url.search='';return 'https://github.com/EdugenIO/cs-atar-textbook/issues/new?'+new URLSearchParams({title:'Textbook issue: '+title,body:'Page: '+url.href+'\nEdition: 0.49 · 2026 foundation / 2027 revisions\n\nWhat I tried:\n\nWhat I expected:\n\nWhat happened:\n\nBrowser/device (optional):\n\nPlease omit student names, personal information and student work.'});}
 if(typeof module!=='undefined'&&module.exports){module.exports={issueURL};return;}
 if(document.querySelector('.site-problem-report'))return;
 const script=document.currentScript?.src,root=script?new URL('.',script):null;
 const line=document.createElement('p');line.className='site-problem-report no-print';line.style.cssText='max-width:1000px;margin:24px auto;padding:16px 20px;font:14px/1.6 system-ui,sans-serif;color:#285747';
 const link=document.createElement('a');link.textContent='Report a problem with this page';link.target='_blank';link.rel='noopener';link.style.color='#285747';
 function update(){let page;if(location.protocol==='file:'){const relative=document.body.dataset.publicPage||(root&&location.pathname.startsWith(root.pathname)?location.pathname.slice(root.pathname.length):'offline/');page=new URL(relative+location.hash,base).href;}else page=location.href;link.href=issueURL(page,document.title);}
 link.addEventListener('focus',update);link.addEventListener('click',update);window.addEventListener('hashchange',update);update();line.append(link,' · Opens a GitHub draft for you to review.');document.body.append(line);
 const style=document.createElement('style');style.textContent='@media print{.site-problem-report{display:none!important}}';document.head.append(style);
})();
