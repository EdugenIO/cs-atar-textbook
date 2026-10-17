import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
const weeks=fs.readdirSync(new URL('slide-source/',root)).filter(name=>/^unit\d+-week\d+\.json$/.test(name)).sort().map(name=>JSON.parse(fs.readFileSync(new URL('slide-source/'+name,root),'utf8')));
const data={lessons:weeks.flatMap(week=>week.lessons)};
assert.equal(data.lessons.length,80);
const expectedIds=Array.from({length:16},(_,w)=>Array.from({length:4},(_,l)=>`u1-w${String(w+1).padStart(2,'0')}-l${String(l+1).padStart(2,'0')}`)).flat();
expectedIds.push(...Array.from({length:4},(_,l)=>`u2-w01-l${String(l+1).padStart(2,'0')}`));
expectedIds.push(...Array.from({length:4},(_,l)=>`u2-w02-l${String(l+1).padStart(2,'0')}`));
expectedIds.push(...Array.from({length:4},(_,l)=>`u2-w03-l${String(l+1).padStart(2,'0')}`));
expectedIds.push(...Array.from({length:4},(_,l)=>`u2-w04-l${String(l+1).padStart(2,'0')}`));
assert.deepEqual(data.lessons.map(l=>l.id).sort(),expectedIds.sort(),'Complete Unit 1 and Unit 2 Weeks 1–4 coverage');
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
assert.equal(Object.keys(registry).length,80);
console.log('Eighty eight-slide lesson decks, notes, timings and planner availability passed.');







const diagram=data.lessons.find(l=>l.id==='u2-w02-l03').slides[3].diagram;
assert.equal(diagram.kind,'equipment-er');
assert.ok(diagram.alt.includes('exactly one'));
assert.ok(fs.existsSync(new URL('dist/equipment-model.svg',root)));
