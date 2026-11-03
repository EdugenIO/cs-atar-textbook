import fs from 'node:fs';
export function activityRecords(chapters){
 const records=[];
 const add=(pack,lesson,chapter,resources,level='Practice',extra='')=>{
  const c=chapters.find(c=>c.id===chapter);if(!c)throw Error('Unknown activity chapter '+chapter);
  records.push({id:'activity-'+pack+'-'+lesson.id,title:lesson.title,pack,chapter,year:c.year,unit:c.unit,topic:c.topic,level,intro:lesson.intention||lesson.goal,search:[lesson.title,lesson.intention||lesson.goal,pack,c.title,level,extra].join(' '),resources});
 };
 const foundations=JSON.parse(fs.readFileSync('activity-source/programming-foundations.json','utf8'));
 for(const lesson of foundations.lessons){
  const chapter=lesson.reading[0][1].slice(1).split('/')[0],base='../activities/programming-foundations/';
  add(foundations.id,lesson,chapter,[{type:'activity',label:'Open this activity',href:base+'#lesson-'+lesson.id},{type:'print',label:'Student PDF · full eight-activity pack',href:base+'student.pdf'},{type:'download',label:'Student pack and files',href:base+'student-pack.zip'},{type:'teacher',label:'Explained answers for this activity',href:base+'teacher.html#lesson-'+lesson.id}]);
 }
 for(const pack of JSON.parse(fs.readFileSync('activity-source/extended-packs.json','utf8')))for(const lesson of pack.lessons){
  const base='../activities/'+pack.id+'/';
  add(pack.id,lesson,lesson.chapter,[{type:'activity',label:'Open this activity',href:base+'#lesson-'+lesson.id},{type:'print',label:'Student PDF · full activity pack',href:base+'student.pdf'},{type:'download',label:'Student pack and files',href:base+'student-pack.zip'},{type:'teacher',label:'Explained answers for this activity',href:base+'teacher.html#lesson-'+lesson.id}]);
 }
 for(const lesson of JSON.parse(fs.readFileSync('teaching-source/loops-activities.json','utf8')).activities){
  const base='../lessons/loops/activities/';
  add('loops-bank',lesson,'loops',[{type:'activity',label:'Open this '+lesson.level.toLowerCase()+' activity',href:base+'#'+lesson.id},{type:'print',label:'Editable student activities · Markdown',href:base+'student-activities.md'},{type:'teacher',label:'Editable teacher guidance and answers · Markdown',href:base+'teacher-activities.md'}],lesson.level,lesson.strategy);
 }
 if(records.length!==34||new Set(records.map(r=>r.id)).size!==34)throw Error('Review activity inventory before publishing');
 return records;
}
export function retireActivityIndex(){
 fs.writeFileSync('dist/activities/index.html',`<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Activities have moved · CS ATAR</title><link rel="stylesheet" href="../style.css"></head><body><main id="main" tabindex="-1"><h1>Activities are in the resource library</h1><p>Find printable packs, reinforcement and extension activities together.</p><p><a href="../resources/index.html?view=activities">Open activities in the resource library</a></p><p>Existing links to individual packs, worksheets and answers still work.</p></main><script>const params=new URLSearchParams(location.search);params.set('view','activities');const destination=location.protocol==='file:'?'../resources/index.html':'../resources/';location.replace(destination+'?'+params+location.hash);</script></body></html>\n`);
}
