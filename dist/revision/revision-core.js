const RevisionCore = (() => {
 function grade(questions,answers){return questions.reduce((r,q)=>{const value=answers[q.id];if(!Number.isInteger(value)||value<0||value>=q.choices.length)r.unanswered++;else if(value===q.correct)r.correct++;return r;},{correct:0,unanswered:0,total:questions.length});}
 function restore(text,allowed){try{const data=JSON.parse(text);return data?.version===1&&Array.isArray(data.checked)?new Set(data.checked.filter(id=>allowed.includes(id))):new Set();}catch{return new Set();}}
 function serialize(checked){return JSON.stringify({version:1,checked:[...checked]});}
 function quiz(data,id){const set=data.quizzes.find(s=>s.id===id);return set?set.ids.map(id=>data.questions.find(q=>q.id===id)):[];}
 function backup(checked){return JSON.stringify({book:'cs-atar-textbook',kind:'revision-self-checks',version:1,checked:[...checked]},null,2);}
 function parseBackup(text,allowed){if(text.length>256000)throw Error('Choose a checklist JSON backup smaller than 256 KB.');let data;try{data=JSON.parse(text);}catch{throw Error('This is not a valid JSON backup.');}if(data?.book!=='cs-atar-textbook'||data.kind!=='revision-self-checks'||data.version!==1||!Array.isArray(data.checked)||data.checked.length>allowed.length||data.checked.some(id=>typeof id!=='string'||!allowed.includes(id)))throw Error('This backup does not match the current textbook checklist. Your progress has not changed.');return new Set(data.checked);}
 return {grade,restore,serialize,quiz,backup,parseBackup};
})();
