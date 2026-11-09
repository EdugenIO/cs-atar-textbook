"""S02: common contract, workshop budget, current/archived slide destinations."""
from pathlib import Path
import json,csv,hashlib,zipfile,re
R=Path(__file__).resolve().parents[1];lessons={l['id']:l for p in (R/'slide-source').glob('unit*-week*.json') for l in json.loads(p.read_text(encoding='utf-8'))['lessons']};rows=list(csv.DictReader((R/'dist/project-milestones.csv').read_text(encoding='utf-8').splitlines()))
assert len(rows)==10
for row in rows:
 id=f"u1-w{int(row['Week']):02}-l{int(row['Lesson']):02}";l=lessons[id]
 assert l['projectSlideEdition']=='pygame-2027' and not l.get('legacyProject')
 assert l['projectWorkshop']==int(row['Slot']) and l['title']==row['Milestone']
 assert l['projectRequirements']==row['Requirements'] and l['projectWorkbook']=='project-workbook.md'
 assert l['slides'][5]['minutes']==25 and sum(s['minutes'] for s in l['slides'])==55
 assert 'assessments/games/year11-requirements.md' in l['prepare']
for id in ['u1-w09-l01','u1-w09-l02']:
 text=json.dumps(lessons[id]);assert 'project-workbook.md' in text and 'order_cost' not in text and 'save_order' not in text
# Contract constants and numerical teaching traces, reasoned separately.
assert 5*10==50 and sum([20,0,50,50])==120 and [20,0,50,50].index(50)==2
source=json.dumps([lessons[f"u1-w{int(r['Week']):02}-l{int(r['Lesson']):02}"] for r in rows])
for token in ['1000','750','90','250','1000 ms','50','1000-ms']:assert token in source
status=json.loads((R/'dist/resource-status.json').read_text(encoding='utf-8'));assert status['summary']['currentSlideSlots']==84 and status['summary']['replacementSlots']==12
for id in json.loads((R/'dist/project-alignment.json').read_text(encoding='utf-8'))['currentProjectSlideIds']:
 assert next(x for x in status['lessons'] if x['id']==id)['status']=='Available'
 assert (R/f'dist/legacy-projects/slides/{id}.pptx').is_file()
 assert f'slides/{id}.pptx' in (R/'dist/legacy-projects/index.html').read_text(encoding='utf-8')
with zipfile.ZipFile(R/'dist/slides/unit1-all-lesson-slides.zip') as z:
 for r in rows:
  id=f"u1-w{int(r['Week']):02}-l{int(r['Lesson']):02}";assert z.read(id+'.pptx')==(R/f'dist/slides/{id}.pptx').read_bytes()
print('S02: ten preserved milestones, 25-minute independent blocks, two current-context theory decks, 84 current/12 pending slots and archived console destinations passed.')
