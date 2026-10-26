/* Static practice interface: all answers and marks stay in this browser. */
(() => {
  const main=document.getElementById('practice-main');
  const message=document.getElementById('practice-message');
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let set=null,state=null,saveFailed=false;
  const key=id=>'cs-atar-practice-v1-'+id;
  function announce(text){message.textContent=text;}
  function read(id){
    try{return PracticeCore.restore(practiceSets.find(s=>s.id===id),JSON.parse(localStorage.getItem(key(id))));}
    catch{return null;}
  }
  function save(){
    if(!state)return;
    try{localStorage.setItem(key(set.id),JSON.stringify(state));saveFailed=false;}
    catch{saveFailed=true;}
    const el=document.getElementById('save-status');
    if(el)el.textContent=saveFailed?'Browser saving unavailable. Keep this tab open and download your work.':'Saved in this browser only. Shared device? Download your work, then clear this attempt.';
  }
  function duration(ms){const seconds=Math.floor(Math.max(0,ms)/1000);return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;}
  function pageFocus(){main.focus();window.scrollTo(0,0);}
  function home(){
    set=null;state=null;
    main.innerHTML=`<section class="practice-intro"><p class="eyebrow">EXAM PRACTICE · SELF-MARKING PILOT</p><h1>Practise. Check.<br>Understand your marks.</h1><p class="lede">Choose a set, answer at your own pace or against a timer, then use the marking guide to assess your work.</p><p>These original topic samples are formative practice, not full SCSA papers, an official exam format or grade predictions. Each set has 30 marks: eight short answers (16 marks) and two extended responses (14 marks). The suggested 45 minutes is a local practice allowance.</p></section><div class="practice-grid">${practiceSets.map(s=>`<section class="practice-card"><p class="eyebrow">YEAR ${s.year} · 10 QUESTIONS</p><h2>${esc(s.title)}</h2><p>${esc(s.description)}</p><a class="button" href="#${s.id}">${read(s.id)?'Open saved attempt':'Choose this set'}</a></section>`).join('')}</div><div class="notice"><strong>No account or AI marking.</strong> Responses, corrections and self-assessed marks stay in this browser. Nothing is submitted to a teacher. Clearing browser data removes saved work; saving may be unavailable in private browsing. Download a copy before leaving a shared device.</div><h2>How to mark fairly</h2><ol><li>Finish your response before revealing the guide.</li><li>Award a mark only when your original response demonstrates the criterion. Equivalent correct wording is acceptable.</li><li>Record improvements separately, keeping the original response intact.</li><li>Flag uncertain criteria and discuss them with your teacher.</li></ol><p>The answer keys are public learning resources. Hiding them during an attempt supports honest practice; it does not secure a formal assessment.</p><p class="footer">Original questions and guides: CC BY 4.0. Code: MIT. <a href="README.md">Teacher and reuse notes</a> · <a href="../#contents">Back to the textbook</a></p>`;
  }
  function setup(){
    main.innerHTML=`<a href="#">← All practice sets</a><p class="eyebrow">YEAR ${set.year} · ORIGINAL PRACTICE</p><h1>${esc(set.title)}</h1><p>${esc(set.description)}</p><form id="practice-start" class="practice-setup"><h2>Choose your timing</h2><label for="timing">Practice mode <select id="timing"><option value="timed">Timed</option><option value="untimed">Untimed</option></select></label><label for="minutes">Writing time <input id="minutes" type="number" min="1" max="240" value="${set.minutes}" required> minutes</label><label><input type="checkbox" id="reading-time"> Add 5 minutes of reading time before writing</label><p>Typing is optional: use paper if you prefer, then tick the marking criteria here. Reading mode locks answer boxes until reading time ends or you choose to begin writing early. The timer continues while the tab is closed or in the background. You can choose extra time or untimed practice.</p><button type="submit">Start practice</button></form><p>No answer guide appears until you finish. Your draft saves in this browser where storage is available. This is a practice timer, not a supervised exam control.</p>`;
  }
  function guide(q){
    return `<section class="mark-guide" aria-label="Marking guide for ${esc(q.title)}"><h3>Marking guide · ${q.criteria.length} marks</h3><p>Each criterion is worth one mark. Tick only points demonstrated in your original response; accept equivalent correct wording.</p><fieldset><legend>Award your marks</legend>${q.criteria.map((c,i)=>`<label class="criterion"><input type="checkbox" data-criterion="${q.id}" data-index="${i}" ${state.awarded[q.id]?.[i]?'checked':''}><span>${esc(c)} <strong>(1 mark)</strong></span></label>`).join('')}</fieldset><p class="question-score" id="score-${q.id}"></p><label class="uncertain"><input type="checkbox" data-reviewed="${q.id}" ${state.reviewed[q.id]?'checked':''}><span>I have checked every criterion, including any marks I did not award.</span></label><label class="uncertain"><input type="checkbox" data-uncertain="${q.id}" ${state.uncertain[q.id]?'checked':''}><span>Not sure — discuss this question with my teacher.</span></label><h3>Example answer</h3><div class="model">${esc(q.model)}</div><p><strong>Marking reminder:</strong> ${esc(q.mistake)}</p><label for="correction-${q.id}">My correction or next step (not part of the original mark)</label><textarea id="correction-${q.id}" data-correction="${q.id}" maxlength="4000">${esc(state.corrections[q.id])}</textarea><div class="print-answer">${esc(state.corrections[q.id])}</div><p><a href="../#${esc(q.chapter)}" target="_blank" rel="noopener">Revisit this topic in the textbook ↗</a></p></section>`;
  }
  function render(){
    const marking=state.phase==='marking';
    main.innerHTML=`<a href="#">← All practice sets</a><p class="eyebrow">YEAR ${set.year} · ${marking?'SELF-MARKING':'PRACTICE IN PROGRESS'}</p><h1>${esc(set.title)}</h1><p>${marking?'Your original responses are now locked. Award marks below, then record improvements separately.':'Answer in the boxes or on paper. Finish before revealing the marking guides.'}</p><div class="practice-toolbar"><div><span id="clock-label"></span> <span class="clock" id="clock" role="timer" aria-live="off"></span></div><div class="practice-actions">${marking?'<button type="button" data-action="download">Download work &amp; marks</button><button class="button secondary" type="button" data-action="print">Print / save PDF</button>':'<button type="button" data-action="finish">Finish and self-mark</button><button class="button secondary" type="button" data-action="download">Download draft</button>'}</div></div><p id="save-status" class="save-status"></p><div id="timer-expiry" class="timer-expiry" role="status"></div><section class="result-summary" ${marking?'':'hidden'}><h2>Your self-assessment</h2><p id="total-score" aria-live="polite"></p><p>These are marks you awarded yourself, not automatic or teacher-verified marks. Unchecked criteria earn zero. A complete review means checking every criterion, including points not earned.</p><p id="review-topics"></p></section><nav class="practice-nav" aria-label="Questions">${set.questions.map((q,i)=>`<a href="#question-${q.id}">Q${i+1}</a>`).join('')}</nav>${set.questions.map((q,i)=>`<article class="question-card" id="question-${q.id}"><p class="eyebrow">${esc(q.type)} · ${esc(q.topic)} · ${q.criteria.length} MARKS</p><h2>${i+1}. ${esc(q.title)}</h2><p>${esc(q.prompt)}</p>${q.code?`<pre><code>${esc(q.code)}</code></pre>`:''}<label for="answer-${q.id}">Your original response${marking?' (locked)':' — or leave blank if working on paper'}</label><textarea id="answer-${q.id}" class="${q.type==='Extended response'?'extended':''}" data-answer="${q.id}" maxlength="12000" ${marking||state.readingUntil?'readonly':''}>${esc(state.answers[q.id])}</textarea><div class="print-answer">${esc(state.answers[q.id])||'[Response on paper or blank]'}</div>${marking?guide(q):''}</article>`).join('')}<div class="practice-actions">${marking?'<button type="button" data-action="download">Download work &amp; marks</button>':'<button type="button" data-action="finish">Finish and self-mark</button>'}</div><details class="practice-danger no-print"><summary>Clear this attempt or try again</summary><p>Download a copy first. Clearing removes this set’s saved answers, marks and corrections from this browser. Other sets are unaffected.</p><button type="button" data-action="clear">Clear this attempt</button></details><p class="footer">Original formative practice · CC BY 4.0 · No responses are sent to a server. <a href="README.md">Teacher notes</a></p>`;
    save();updateScores();tick();
  }
  function updateScores(){
    if(!state||state.phase!=='marking')return;
    const total=PracticeCore.mark(set,state);
    document.getElementById('total-score').textContent=`Self-assessed: ${total.score}/${total.maximum} · ${total.reviewed}/${set.questions.length} questions reviewed · ${total.uncertain} flagged for discussion`;
    const topics=[];
    for(const q of set.questions){
      const score=q.criteria.filter((_,i)=>state.awarded[q.id]?.[i]).length;
      document.getElementById('score-'+q.id).textContent=`Self-assessed: ${score}/${q.criteria.length}`;
      if(state.reviewed[q.id]&&(score<q.criteria.length||state.uncertain[q.id]))topics.push(q);
    }
    document.getElementById('review-topics').innerHTML=topics.length?'Revisit: '+topics.map(q=>`<a href="../#${esc(q.chapter)}" target="_blank" rel="noopener">${esc(q.title)}</a>`).join(' · '):'Your revision list will include reviewed questions with missed marks or a teacher-discussion flag.';
  }
  let lastTimerMode='';
  function tick(){
    if(!state)return;
    const clock=document.getElementById('clock');if(!clock)return;
    const now=Date.now(),time=PracticeCore.timing(state,now);
    const reading=state.phase==='answering'&&Number.isFinite(state.readingUntil);
    if(reading&&now>=state.readingUntil){beginWriting();return;}
    let label,text;
    if(reading){label='Reading time remaining';text=duration(state.readingUntil-now);}
    else if(state.phase==='marking'){label=time.overtime>0?'Submitted · overtime':'Submitted · elapsed';text=duration(time.overtime||time.elapsed);}
    else if(state.deadline===null){label='Untimed · elapsed';text=duration(time.elapsed);}
    else if(time.overtime>0||time.remaining===0){label='Overtime';text='+'+duration(time.overtime);}
    else {label='Writing time remaining';text=duration(time.remaining);}
    document.getElementById('clock-label').textContent=label;
    clock.textContent=text;
    const mode=reading?'reading':state.phase==='answering'&&state.deadline!==null&&time.remaining===0&&!state.continued?'expired':'normal';
    if(mode!==lastTimerMode){
      lastTimerMode=mode;
      document.getElementById('timer-expiry').innerHTML=mode==='reading'?'<p>Read the questions first. Your writing time begins automatically when reading time ends, or you can start early.</p><button type="button" data-action="write">Begin writing now</button>':mode==='expired'?'<p><strong>Writing time has ended.</strong> Your answers are preserved. Finish to reveal the marking guide, or continue practising with overtime recorded.</p><div class="practice-actions"><button type="button" data-action="finish">Finish and self-mark</button><button class="button secondary" type="button" data-action="continue">Continue with overtime</button></div>':'';
      if(mode==='expired')announce('Writing time has ended. Finish and self-mark, or continue with overtime.');
    }
  }
  function beginWriting(){
    // Background tabs use the scheduled transition, so refreshing cannot grant extra time.
    PracticeCore.startWriting(state);save();lastTimerMode='';render();announce('Writing time has started.');
  }
  function finish(){
    if(state.phase!=='answering')return;
    if(state.readingUntil){state.startedAt=Date.now();state.deadline=state.durationMinutes===null?null:state.startedAt+state.durationMinutes*60000;delete state.readingUntil;}
    state.phase='marking';state.submittedAt=Date.now();lastTimerMode='';save();render();pageFocus();announce('Marking guides revealed. Your original responses are locked.');
  }
  function download(){
    const time=PracticeCore.timing(state),total=PracticeCore.mark(set,state);
    const lines=[set.title,'Original formative practice — self-assessed, not teacher verified.',`Stage: ${state.phase}`,`Elapsed: ${duration(time.elapsed)}; overtime: ${duration(time.overtime)}`,state.phase==='marking'?`Self-assessed: ${total.score}/${total.maximum}; reviewed: ${total.reviewed}/${set.questions.length}`:'Draft — marking guides not yet revealed.',''];
    for(const [i,q] of set.questions.entries()){
      lines.push(`Q${i+1}. ${q.title} [${q.criteria.length} marks]`,q.prompt,q.code||'','ORIGINAL RESPONSE:',state.answers[q.id]||'[On paper or blank]');
      if(state.phase==='marking'){
        lines.push('SELF-MARKING:',...q.criteria.map((c,j)=>`${state.awarded[q.id]?.[j]?'[1]':'[0]'} ${c}`),`Reviewed: ${state.reviewed[q.id]?'yes':'no'}; teacher discussion: ${state.uncertain[q.id]?'yes':'no'}`,'EXAMPLE ANSWER:',q.model,'MY CORRECTION:',state.corrections[q.id]||'');
      }
      lines.push('');
    }
    const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/plain;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download=set.id+'-'+state.phase+'.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function route(){
    lastTimerMode='';
    const id=location.hash.slice(1);
    // Question anchors belong to the current attempt; they do not navigate to a different page.
    if(id.startsWith('question-')&&set&&state)return;
    const selected=practiceSets.find(s=>s.id===id || (id.startsWith('question-')&&s.questions.some(q=>'question-'+q.id===id)));
    if(!selected){home();return;}
    set=selected;state=read(set.id);
    if(state)render();else setup();
    pageFocus();
  }
  document.addEventListener('submit',event=>{
    if(event.target.id!=='practice-start')return;event.preventDefault();
    const timed=document.getElementById('timing').value==='timed';
    const minutes=Number(document.getElementById('minutes').value);
    if(timed&&(!Number.isInteger(minutes)||minutes<1||minutes>240))return;
    state=PracticeCore.create(set,{timed,minutes});
    if(document.getElementById('reading-time').checked)state.readingUntil=Date.now()+5*60000;
    lastTimerMode='';save();render();pageFocus();
  });
  document.addEventListener('input',event=>{
    if(!state)return;
    const el=event.target;
    if(el.dataset.answer&&state.phase==='answering'&&!state.readingUntil)state.answers[el.dataset.answer]=el.value;
    else if(el.dataset.correction&&state.phase==='marking')state.corrections[el.dataset.correction]=el.value;
    else return;
    // Save immediately so following a chapter link or refreshing cannot lose the last keystroke.
    save();
    if(el.nextElementSibling?.classList.contains('print-answer'))el.nextElementSibling.textContent=el.value;
  });
  document.addEventListener('change',event=>{
    const el=event.target;
    if(el.id==='timing'){document.getElementById('minutes').disabled=el.value==='untimed';return;}
    if(!state||state.phase!=='marking')return;
    if(el.dataset.criterion){const id=el.dataset.criterion;state.awarded[id]??=[];state.awarded[id][Number(el.dataset.index)]=el.checked;}
    else if(el.dataset.reviewed)state.reviewed[el.dataset.reviewed]=el.checked;
    else if(el.dataset.uncertain)state.uncertain[el.dataset.uncertain]=el.checked;
    else return;
    save();updateScores();
  });
  document.addEventListener('click',event=>{
    if(event.target.closest('.skip')){event.preventDefault();pageFocus();return;}
    const action=event.target.closest('[data-action]')?.dataset.action;
    if(!action||!state)return;
    if(action==='finish'||action==='clear'){
      const panel=document.createElement('section');
      document.getElementById('practice-confirm')?.remove();
      panel.id='practice-confirm';panel.className='notice';panel.tabIndex=-1;
      panel.setAttribute('role','region');panel.setAttribute('aria-label','Confirm practice action');
      panel.innerHTML=`<p>${action==='finish'?'Finish and reveal the marking guides? Your original responses will be locked.':'Clear this set’s saved answers, marks and corrections? Download a copy first.'}</p><div class="practice-actions"><button type="button" data-action="${action==='finish'?'confirm-finish':'confirm-clear'}">${action==='finish'?'Yes, reveal marking guides':'Yes, clear this attempt'}</button><button class="button secondary" type="button" data-action="cancel">Cancel</button></div>`;
      event.target.closest('button').after(panel);panel.focus();
    }
    else if(action==='cancel'){document.getElementById('practice-confirm')?.remove();announce('Action cancelled. Your work is unchanged.');}
    else if(action==='confirm-finish')finish();
    else if(action==='write'&&state.readingUntil)beginWriting();
    else if(action==='continue'){state.continued=true;save();lastTimerMode='';tick();announce('Continue practising. Overtime will be recorded.');}
    else if(action==='download')download();
    else if(action==='print')window.print();
    else if(action==='confirm-clear'){
      try{localStorage.removeItem(key(set.id));}catch{announce('Could not clear saved browser storage.');return;}
      state=null;setup();pageFocus();announce('Attempt cleared. Choose your settings for a new attempt.');
    }
  });
  window.addEventListener('hashchange',route);
  window.addEventListener('pagehide',save);
  setInterval(tick,1000);
  route();
})();
