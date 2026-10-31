import fs from 'node:fs';
const journeys=JSON.parse(fs.readFileSync('teaching-source/student-journeys.json','utf8'));
const packs=JSON.parse(fs.readFileSync('activity-source/extended-packs.json','utf8'));
const activities={};for(const p of packs)for(const l of p.lessons)(activities[l.chapter]??=[]).push({pack:p.id,id:l.id,title:l.title});
const render=`
function renderStudentJourney(id){
 const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const j=studentJourneys.find(j=>j.id===id),list=chapterActivities[id]||[];
 const heading=s=>'heading-'+s.normalize('NFKC').toLowerCase().replace(/^\\d+\\.\\s*/,'').replace(/[^\\p{L}\\p{N}]+/gu,'-').replace(/^-|-$/g,'');
 if(!j)return '<p><a href="resources/#'+e(id)+'">Find this chapter’s activities and downloads</a>'+ (list.length?' · Practice after reading: '+list.map(l=>'<a href="activities/'+e(l.pack)+'/#lesson-'+e(l.id)+'">'+e(l.title)+'</a>').join(' · '):'')+'.</p>';
 const activity='activities/'+j.pack+'/#lesson-'+j.activity,key='activities/'+j.pack+'/teacher.html#lesson-'+j.activity;
 return '<details class="student-journey"><summary>Follow this lesson: reading → example → activity → feedback → revision</summary><p><strong>'+e(j.scope)+'.</strong> '+e(j.ready)+'</p><ol><li><a href="#'+e(id)+'/'+heading(j.read)+'">Read: '+e(j.read)+'</a>.</li><li><a href="#'+e(id)+'/'+heading(j.worked)+'">Study the worked example: '+e(j.worked)+'</a>. Predict one step before reading its result.</li><li><a href="'+activity+'">Try activity '+j.activity+': '+e(j.title)+'</a>. '+e(j.task)+'</li><li>Keep your first attempt, then <a href="'+key+'">check the matching explained answers</a>. '+e(j.feedback)+'</li><li><a href="revision/#topic-'+e(id)+'">Retrieve this topic without notes</a>. Use the chapter question first; wider syllabus checklists can include later learning. Do not tick a requirement until you can explain it independently.</li></ol><p><strong>After feedback, try a changed case:</strong> '+e(j.retry)+'</p>'+ (list.some(l=>l.pack!==j.pack||l.id!==j.activity)?'<p>More practice when ready: '+list.filter(l=>l.pack!==j.pack||l.id!==j.activity).map(l=>'<a href="activities/'+e(l.pack)+'/#lesson-'+e(l.id)+'">'+e(l.title)+'</a>').join(' · ')+'.</p>':'')+'<p><a href="resources/#'+e(id)+'">All files and print copies for this topic</a> · <a href="offline/">Save resources before going offline</a>.</p></details>';
}
`;
fs.writeFileSync('dist/lesson-journeys.js','// Generated from the student journey review and activity sources.\nconst studentJourneys='+JSON.stringify(journeys)+';\nconst chapterActivities='+JSON.stringify(activities)+';\n'+render);
console.log('Built four guided journeys and chapter links for all 18 extension-pack activities.');
