import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
const weeks=fs.readdirSync(new URL('slide-source/',root)).filter(name=>/^unit\d+-week\d+\.json$/.test(name)).sort().map(name=>JSON.parse(fs.readFileSync(new URL('slide-source/'+name,root),'utf8')));
const data={lessons:weeks.flatMap(week=>week.lessons)};
assert.equal(data.lessons.length,8);
const context=vm.createContext({});
vm.runInContext(fs.readFileSync(new URL('dist/lesson-slide-resources.js',root),'utf8'),context);
const registry=vm.runInContext('lessonSlideResources',context);
vm.runInContext(fs.readFileSync(new URL('dist/slides/slide-data.js',root),'utf8'),context);
assert.equal(JSON.stringify(vm.runInContext('lessonSlides',context)),JSON.stringify(data),'Browser lessons must match the authored source');
for(const lesson of data.lessons){
  assert.equal(lesson.slides.length,8);
  assert.equal(lesson.slides.reduce((sum,slide)=>sum+slide.minutes,0),55);
  assert.equal(registry[lesson.id].slides,8);
  for(const slide of lesson.slides){assert.ok(slide.title&&slide.notes);assert.ok(slide.body||slide.code||slide.table);}
  for(const file of [`dist/slides/${lesson.id}.pptx`,`dist/slides/notes/${lesson.id}.html`])assert.ok(fs.existsSync(new URL(file,root)));
  assert.ok(fs.statSync(new URL(`dist/slides/${lesson.id}.pptx`,root)).size>10000);
}
assert.equal(Object.keys(registry).length,8);
console.log('Eight eight-slide lesson decks, notes, timings and planner availability passed.');

