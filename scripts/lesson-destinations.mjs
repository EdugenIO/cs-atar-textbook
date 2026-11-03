import fs from 'node:fs';
export const focusedLessons=JSON.parse(fs.readFileSync('teaching-source/focused-lessons.json','utf8'));
if(new Set(focusedLessons.map(l=>l.id)).size!==focusedLessons.length||new Set(focusedLessons.map(l=>l.path)).size!==focusedLessons.length)throw Error('Duplicate focused lesson destination');
for(const l of focusedLessons)if(!/^u[1-4]-l(?:[1-9]|[1-5]\d|6[0-4])$/.test(l.id)||!/^lessons\/[a-z0-9-]+\/$/.test(l.path))throw Error('Invalid focused lesson route');
export const lessonDestination=id=>focusedLessons.find(l=>l.id===id)?.path||'lessons/#'+id;
export function writeDestinationRuntime(){
 const block='// BEGIN GENERATED LESSON DESTINATIONS\nconst focusedLessonDestinations = '+JSON.stringify(Object.fromEntries(focusedLessons.map(l=>[l.id,l.path])))+';\n// END GENERATED LESSON DESTINATIONS\n';
 for(const file of ['dist/teaching-planner.js','dist/lessons/routes.js']){
  let text=fs.readFileSync(file,'utf8');
  text=text.replace(/\/\/ BEGIN GENERATED LESSON DESTINATIONS[\s\S]*?\/\/ END GENERATED LESSON DESTINATIONS\r?\n/,'');
  fs.writeFileSync(file,block+text);
 }
}
