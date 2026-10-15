import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const root=new URL('../dist/',import.meta.url);
const context=vm.createContext({});
vm.runInContext(fs.readFileSync(new URL('teaching-planner-data.js',root),'utf8'),context);
const units=vm.runInContext('teachingSchedule',context);
assert.equal(units.length,4);
let lessons=0;
for(const unit of units){
  assert.equal(unit.weeks.length,16);
  let project=0;
  unit.weeks.forEach((week,index)=>{
    assert.equal(week.week,index+1);assert.equal(week.lessons.length,4);
    week.lessons.forEach((lesson,i)=>{
      lessons++;assert.equal(lesson.number,index*4+i+1);
      assert.equal(lesson.lesson,i+1);
      assert.ok(lesson.objective&&lesson.activity&&lesson.check&&lesson.chapter);
      if(lesson.workbook)assert.ok(fs.existsSync(new URL(lesson.workbook,root)));
      if(lesson.kind==='Project workshop')project++;
    });
  });
  assert.equal(project,[10,14,12,16][unit.unit-1]);
}
assert.equal(lessons,256);
assert.equal(units[3].weeks[1].lessons[0].chapter,'unit4-sql');
assert.equal(units[3].weeks[2].lessons[0].chapter,'unit4-sql');
assert.equal(fs.readFileSync(new URL('teaching-lessons.csv',root),'utf8').trim().split('\n').length,257);
console.log('256 allocated lessons, four lessons per week, project budgets and workbook links passed.');
