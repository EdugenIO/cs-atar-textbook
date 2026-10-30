"""A01: keep delivery, contracts and downloaded teaching packs in agreement."""
from pathlib import Path
import csv, io, json, subprocess, zipfile
root=Path(__file__).resolve().parents[1];dist=root/'dist'
code="const fs=require('fs'),vm=require('vm'),c=vm.createContext({});vm.runInContext(fs.readFileSync('dist/teaching-planner-data.js','utf8'),c);process.stdout.write(JSON.stringify(vm.runInContext('teachingSchedule',c)));"
schedule=json.loads(subprocess.check_output(['node','-e',code],cwd=root,encoding='utf-8'))
manifest=json.loads((dist/'project-alignment.json').read_text(encoding='utf-8'))
contracts=json.loads((root/'assessment-source/game-projects.json').read_text(encoding='utf-8'))
for contract in contracts['years']:
    year=contract['year'];meta=manifest['years'][str(year)];unit=next(u for u in schedule if u['year']==year and u['unit'] in [1,3]);files=meta['files']
    lessons=[(w['week'],l) for w in unit['weeks'] for l in w['lessons'] if l['kind']=='Project workshop']
    assert len(lessons)==contract['budget']==meta['budget']
    assert [(w,l['lesson']) for w,l in lessons]==[(s['week'],s['lesson']) for s in meta['slots']]
    for week,lesson in lessons:
        assert lesson['gameProjectYear']==year
        assert lesson['workbook']==files['workbook'] and lesson['gamePack']==files['pack']
        assert lesson['gameContract']==f'assessments/games/year{year}-requirements.md'
        assert lesson['gameRequirements']
    for name in ['brief','workbook']:
        text=(dist/files[name]).read_text(encoding='utf-8')
        for requirement in contract['functional']+contract['nonFunctional']:
            assert requirement['text'].replace('|','/') in text
            assert requirement['acceptance'].replace('|','/') in text
    with zipfile.ZipFile(dist/files['pack']) as pack:
        for key,name in files.items():
            if key!='pack':assert pack.read(name)==(dist/name).read_bytes()
        assert pack.read('common-requirements.md')==(dist/f'assessments/games/year{year}-requirements.md').read_bytes()
        assert pack.read('common-marking-guide.md')==(dist/f'assessments/games/year{year}-marking-guide.md').read_bytes()
        for theme in meta['themes']:
            name=f'y{year}-t1-{theme}-starter.zip'
            assert pack.read('theme-starters/'+name)==(dist/'assessments'/name).read_bytes()
    tests=list(csv.DictReader((dist/files['tests']).read_text(encoding='utf-8').splitlines()))
    common=list(csv.DictReader((dist/f'assessments/games/year{year}-acceptance.csv').read_text(encoding='utf-8').splitlines()))
    assert len(tests)==len(common)
    for actual,expected in zip(tests,common):
        for key,value in expected.items():assert actual[key]==value
assert sum(bool(l.get('gameProjectYear')) for u in schedule for w in u['weeks'] for l in w['lessons'])==22
assert len(list(csv.DictReader((dist/'teaching-lessons.csv').read_text(encoding='utf-8').splitlines())))==256
planner=(dist/'teaching-planner.js').read_text(encoding='utf-8')
assert planner.index('if (lesson.gameProjectYear)')<planner.index('if (!lessonSlideResources[key])')
for id in manifest['legacySlideIds']:
    assert 'Legacy console practice' in (dist/f'slides/notes/{id}.html').read_text(encoding='utf-8')
assert len(manifest['legacySlideIds'])==10
assert 'legacy-project-notice' in (dist/'slides/viewer.js').read_text(encoding='utf-8')
for year in [11,12]:assert (dist/f'legacy-projects/year{year}/README.md').exists()
print('A01: 22 unchanged workshop slots, both full contracts/workbooks, test cases, five equivalent starter choices per pack and legacy slide notices passed.')
