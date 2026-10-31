const RevisionCore = (() => {
 function grade(questions,answers){return questions.reduce((r,q)=>{const value=answers[q.id];if(!Number.isInteger(value)||value<0||value>=q.choices.length)r.unanswered++;else if(value===q.correct)r.correct++;return r;},{correct:0,unanswered:0,total:questions.length});}
 function restore(text,allowed){try{const data=JSON.parse(text);return data?.version===1&&Array.isArray(data.checked)?new Set(data.checked.filter(id=>allowed.includes(id))):new Set();}catch{return new Set();}}
 function serialize(checked){return JSON.stringify({version:1,checked:[...checked]});}
 function quiz(data,id){const set=data.quizzes.find(s=>s.id===id);return set?set.ids.map(id=>data.questions.find(q=>q.id===id)):[];}
 return {grade,restore,serialize,quiz};
})();
