"""S06: purpose and reveal order preserve the original attempt."""
from pathlib import Path
import json,zipfile,xml.etree.ElementTree as ET
R=Path(__file__).resolve().parents[1]
modes=json.loads((R/'teaching-source/attempt-modes.json').read_text(encoding='utf-8'))
routes=json.loads((R/'dist/lessons/routes.json').read_text(encoding='utf-8'))
for ident,m in modes.items():
 route=next(x for x in routes if x['id']==ident)
 assert route['controlled'] and route['attemptMode']==m['mode']
 assert route['title']==m['plan']['title'] and route['activity']==m['plan']['activity']
first=json.loads((R/'slide-source/unit1-week16.json').read_text(encoding='utf-8'))['lessons'][0]
second=json.loads((R/'slide-source/unit1-week16.json').read_text(encoding='utf-8'))['lessons'][1]
school=json.loads((R/'slide-source/unit1-week14.json').read_text(encoding='utf-8'))['lessons'][2]
for l in [first,second,school]:assert len(l['slides'])==8 and sum(s['minutes'] for s in l['slides'])==55
assert [s['minutes'] for s in first['slides'][3:5]]==[20,20]
assert second['slides'][1]['minutes']==15 and first['slides'][2]['minutes']==5
assert '6, -2, 6' not in json.dumps(first) and 'index 0' not in json.dumps(first)
assert 'closed' in second['slides'][2]['body'][-1]
assert all('Q3' not in s['title'] and 'Q9' not in s['title'] for s in second['slides'][:4])
assert second['slides'][4]['title']=='Post-attempt Q3 trace'
assert second['slides'][5]['title']=='Post-attempt Q9 explanation'
assert [4,9,9,-1].index(max([4,9,9,-1]))==1 and sum([4,9,9,-1])==21
assert 'replaces' not in school['prepare'] and 'school-issued' in school['slides'][3]['body'][0]
assert 'No assessment answer appears' in school['slides'][6]['notes']
# Keep the established Week 7 teacher-task briefing, not a public replacement task.
w7=json.loads((R/'slide-source/unit1-week7.json').read_text(encoding='utf-8'))['lessons'][3]
assert 'teacher' in json.dumps(w7).lower() and 'issued' in json.dumps(w7).lower()
record=(R/'dist/unit1-practice-record.md').read_text(encoding='utf-8')
assert 'Prior exposure' in record and 'Do not overwrite the original' in record
with zipfile.ZipFile(R/'dist/slides/unit1-all-lesson-slides.zip') as z:
 for ident in ['u1-w14-l03','u1-w16-l01','u1-w16-l02']:
  assert z.read(ident+'.pptx')==(R/'dist/slides'/f'{ident}.pptx').read_bytes()
 assert z.read('unit1-practice-record.md').decode('utf-8').replace('\r\n','\n')==record
print('S06: three aligned modes, school-task boundary, 5+40+15 timing, original-before-feedback order, separate changed retry and editable bundle passed.')
