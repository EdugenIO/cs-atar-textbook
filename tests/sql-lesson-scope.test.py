"""S04: the independent Year 11 checkpoint must not require an optional report."""
from pathlib import Path
import json,re,sqlite3,zipfile
R=Path(__file__).resolve().parents[1]
lesson=json.loads((R/'slide-source/unit2-week5.json').read_text(encoding='utf-8'))['lessons'][3]
assert sum(s['minutes'] for s in lesson['slides'])==55
assert len(lesson['slides'])==8
assert all(s['title'].startswith('Optional extension:') for s in lesson['slides'][5:7])
assert 'Complete Q2a and Q3' in ' '.join(lesson['slides'][4]['body'])
assert 'Optional extension success is not needed' in ' '.join(lesson['slides'][-1]['body'])
db=sqlite3.connect((R/'dist/database-project.sqlite').as_uri()+'?mode=ro',uri=True)
answers=(R/'dist/database-project-answers.md').read_text(encoding='utf-8')
core=re.search(r'## 2a\..*?```sql\n(.*?)```',answers,re.S).group(1)
assert core.upper().count('INNER JOIN')==1 and 'GROUP BY' not in core.upper()
assert db.execute(core).fetchall()==[('L001','E01','Camera'),('L006','E05','Microphone'),('L002','E02','Tripod'),('L004','E04','Camera')]
assert db.execute(lesson['slides'][2]['code']).fetchall()==[(5,1400,280.0,80,600)]
assert db.execute(lesson['slides'][5]['code']).fetchall()==[('C01','Imaging',2,1050),('C02','Support',1,80),('C03','Audio',2,270)]
db.close()
workbook=(R/'dist/database-project-workbook.md').read_text(encoding='utf-8')
assert '2a. **Core:**' in workbook and '2b. **Optional extension:**' in workbook
assert '4. **Optional extension' in workbook and 'not core completion gates' in workbook
brief=(R/'dist/database-project-brief.md').read_text(encoding='utf-8')
assert 'not a core completion requirement' in brief and 'four-table' in brief
with zipfile.ZipFile(R/'dist/database-project-pack.zip') as z:
 for name in ['database-project-workbook.md','database-project-answers.md','database-project-brief.md','database-project-reports.sql']:
  assert z.read(name)==(R/'dist'/name).read_bytes()
with zipfile.ZipFile(R/'dist/slides/unit2-week5-lesson-slides.zip') as z:
 assert z.read('u2-w05-l04.pptx')==(R/'dist/slides/u2-w05-l04.pptx').read_bytes()
 for name in ['database-project-workbook.md','database-project-answers.md','database-project-reports.sql']:
  assert z.read('classroom-resources/'+name)==(R/'dist'/name).read_bytes()
assert 'Core: attempt, compare and retry' in (R/'dist/slides/notes/u2-w05-l04.html').read_text(encoding='utf-8')
print('S04: eight-slide/55-minute scope, independent core join and all five aggregates, retained optional results and synchronised downloads passed.')
