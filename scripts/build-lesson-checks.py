"""Apply authored exit questions to the planner and export the same teacher guidance.

Run after the project and Pygame builders. They also invoke this step so rebuilds
cannot silently restore the old generic checks. No assessment conditions change.
"""
from pathlib import Path
import csv, io, json, subprocess

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
code = "const fs=require('fs'),vm=require('vm'),c=vm.createContext({});vm.runInContext(fs.readFileSync('dist/teaching-planner-data.js','utf8'),c);process.stdout.write(JSON.stringify(vm.runInContext('teachingSchedule',c)));"
schedule = json.loads(subprocess.check_output(['node','-e',code],cwd=ROOT,encoding='utf-8'))
with (ROOT/'teaching-source/exit-checks.tsv').open(encoding='utf-8',newline='') as stream:
    records = list(csv.DictReader(stream,delimiter='\t'))
checks = {(int(r['Unit']),int(r['Week']),int(r['Lesson'])):r for r in records}
assert len(checks) == len(records) == 256
rows = [['Unit','Year','Week','Lesson','Semester lesson','Type','Objective','Class activity','Check','Chapter','Project requirements','Project workbook','Project pack','Pygame practice','Pygame teaching pack','Expected reasoning','Follow-up if not yet secure']]
notes = ['# Lesson exit checks — teacher guide','',
         'Original formative questions · 31 October 2026 · 2026 syllabus foundation with 2027 revisions.',
         'Allow about five minutes; use an oral explanation, paper trace, diagram or small demonstration as appropriate. These checks do not add weighted assessment tasks or alter controlled-task conditions. For controlled lessons, discuss the submitted version only after collection. Expected reasoning is guidance, not exact-text marking. Accept equivalent valid reasoning and record actual learner evidence separately.','']
for unit in schedule:
    notes += [f"## Unit {unit['unit']} — Year {unit['year']}",'']
    for week in unit['weeks']:
        for lesson in week['lessons']:
            r = checks[(unit['unit'],week['week'],lesson['lesson'])]
            lesson.update(check=r['Prompt'],checkExpected=r['Expected reasoning'],checkReteach=r['Common misconception / response'])
            rows.append([unit['unit'],unit['year'],week['week'],lesson['lesson'],lesson['number'],lesson['kind'],lesson['objective'],lesson['activity'],lesson['check'],'https://edugenio.github.io/cs-atar-textbook/#'+lesson['chapter'],lesson.get('gameContract',''),lesson.get('workbook') or '',lesson.get('gamePack',''),lesson.get('pygameBridge',''),'pygame/pygame-teaching-pack.zip' if lesson.get('pygamePractice') else '',lesson['checkExpected'],lesson['checkReteach']])
            notes += [f"### Week {week['week']} · Lesson {lesson['lesson']} — {lesson['title']}",'',lesson['check'],'',
                      '**Expected reasoning:** '+lesson['checkExpected'],'','**If not yet secure:** '+lesson['checkReteach'],'']
(DIST/'teaching-planner-data.js').write_text('const teachingSchedule = '+json.dumps(schedule,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8',newline='\n')
out=io.StringIO(newline=''); csv.writer(out,lineterminator='\n').writerows(rows)
(DIST/'teaching-lessons.csv').write_text(out.getvalue(),encoding='utf-8',newline='\n')
(DIST/'lesson-exit-checks.md').write_text('\n'.join(notes).rstrip()+'\n',encoding='utf-8',newline='\n')
print('Applied 256 authored lesson checks with expected reasoning and specific follow-up.')
