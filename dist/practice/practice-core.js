/* Pure state helpers. No student data leaves the browser. */
const PracticeCore = (() => {
  const version = 1;
  function create(set, options, now = Date.now()) {
    return {version, setId:set.id, revision:set.revision, phase:'answering',
      startedAt:now, deadline:options.timed ? now + options.minutes * 60000 : null,
      durationMinutes:options.timed ? options.minutes : null, submittedAt:null,
      continued:false, answers:{}, awarded:{}, reviewed:{}, uncertain:{}, corrections:{}};
  }
  function timing(state, now = Date.now()) {
    const end = state.submittedAt ?? now;
    return {elapsed:Math.max(0, end - state.startedAt),
      remaining:state.deadline === null ? null : Math.max(0,state.deadline-end),
      overtime:state.deadline === null ? 0 : Math.max(0,end-state.deadline)};
  }
  function startWriting(state, now = Date.now()) {
    if(!Number.isFinite(state.readingUntil))return state;
    const start=Math.min(now,state.readingUntil);
    state.startedAt=start;
    state.deadline=state.durationMinutes===null?null:start+state.durationMinutes*60000;
    delete state.readingUntil;
    return state;
  }
  function mark(set, state) {
    let score=0, maximum=0, reviewed=0, uncertain=0;
    for(const q of set.questions) {
      maximum+=q.criteria.length;
      score+=q.criteria.filter((_,i)=>state.awarded[q.id]?.[i] === true).length;
      if(state.reviewed[q.id]) reviewed++;
      if(state.uncertain[q.id]) uncertain++;
    }
    return {score, maximum, reviewed, uncertain};
  }
  function restore(set, value) {
    if(!value || value.version!==version || value.setId!==set.id || value.revision!==set.revision ||
      !['answering','marking'].includes(value.phase) || !Number.isFinite(value.startedAt) ||
      !(value.deadline===null || Number.isFinite(value.deadline)) ||
      !(value.submittedAt===null || Number.isFinite(value.submittedAt)) ||
      !(value.durationMinutes===null || (Number.isInteger(value.durationMinutes)&&value.durationMinutes>=1&&value.durationMinutes<=240)) ||
      (value.phase==='marking' && value.submittedAt===null)) return null;
    // Whitelist stored fields and lengths rather than trusting local storage contents.
    const state=create(set,{timed:false},value.startedAt);
    for(const name of ['phase','deadline','submittedAt','durationMinutes']) state[name]=value[name];
    state.continued=value.continued===true;
    if(state.phase==='answering'&&Number.isFinite(value.readingUntil))state.readingUntil=value.readingUntil;
    for(const q of set.questions){
      state.answers[q.id]=typeof value.answers?.[q.id]==='string' ? value.answers[q.id].slice(0,12000) : '';
      state.corrections[q.id]=typeof value.corrections?.[q.id]==='string' ? value.corrections[q.id].slice(0,4000) : '';
      if(state.phase==='marking'){
        state.awarded[q.id]=q.criteria.map((_,i)=>value.awarded?.[q.id]?.[i]===true);
        state.reviewed[q.id]=value.reviewed?.[q.id]===true;
        state.uncertain[q.id]=value.uncertain?.[q.id]===true;
      }
    }
    return state;
  }
  return {create,timing,startWriting,mark,restore};
})();
