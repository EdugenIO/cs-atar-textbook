/* Shared long-page control. Does not change the textbook's chapter hash. */
(() => {
 if(document.getElementById('back-to-top'))return;
 const style=document.createElement('style');
 style.textContent='.back-to-top{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:max(16px,env(safe-area-inset-bottom,0px));z-index:1000;min-height:44px;padding:10px 16px;border:1px solid #18322d;border-radius:6px;background:#285747;color:#fff;font:600 15px/1.4 system-ui,sans-serif;cursor:pointer;box-shadow:0 2px 10px #18322d33}.back-to-top[hidden]{display:none!important}.back-to-top:focus-visible{outline:3px solid #875f16;outline-offset:4px}body.has-back-to-top{padding-bottom:80px}@media print{.back-to-top{display:none!important}body.has-back-to-top{padding-bottom:0!important}}@media(forced-colors:active){.back-to-top{border:2px solid ButtonText}}';
 document.head.append(style);
 const button=document.createElement('button');button.id='back-to-top';button.className='back-to-top';button.type='button';button.textContent='↑ Back to top';button.hidden=true;
 document.body.append(button);document.body.classList.add('has-back-to-top');
 function update(){button.hidden=window.scrollY<Math.max(400,window.innerHeight*.75);}
 button.addEventListener('click',()=>{
  const target=document.querySelector('main h1')||document.querySelector('h1')||document.querySelector('main');
  if(target){if(!target.hasAttribute('tabindex')){target.setAttribute('tabindex','-1');target.addEventListener('blur',()=>target.removeAttribute('tabindex'),{once:true});}target.focus({preventScroll:true});}
  window.scrollTo({top:0,left:0,behavior:'instant'});update();
 });
 window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);window.addEventListener('hashchange',update);update();
})();
