/* Used by the unpacked library: file browsers need explicit index filenames. */
(function(){
 function resolveLocal(href,base){const url=new URL(href,base);if(url.protocol==='file:'&&url.pathname.endsWith('/'))url.pathname+='index.html';return url.href;}
 if(typeof module!=='undefined')module.exports={resolveLocal};
 if(typeof location==='undefined'||location.protocol!=='file:')return;
 function fix(){document.querySelectorAll('a[href]').forEach(a=>{a.href=resolveLocal(a.getAttribute('href'),location.href);});}
 document.addEventListener('click',event=>{const a=event.target.closest('a[href]');if(a)a.href=resolveLocal(a.getAttribute('href'),location.href);},true);
 window.addEventListener('hashchange',fix);fix();
})();
