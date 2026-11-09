"""S05: one primary schema/task/key must travel with every SQL deck."""
from pathlib import Path
import json,sqlite3,zipfile,xml.etree.ElementTree as ET,re
R=Path(__file__).resolve().parents[1];NS={'a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
handoffs=json.loads((R/'teaching-source/sql-handoffs.json').read_text(encoding='utf-8'))['deckLessons']
assert len(handoffs)==8
routes=json.loads((R/'dist/lessons/routes.json').read_text(encoding='utf-8'))
for ident,h in handoffs.items():
 route=next(r for r in routes if r['id']==h['route']);assert route['sqlDeck']==h
 assert route['sqlPractice']['id']==h['alternativeStep']
 week=int(ident[4:6]);lesson=next(l for l in json.loads((R/f'slide-source/unit2-week{week}.json').read_text(encoding='utf-8'))['lessons'] if l['id']==ident)
 assert lesson['sqlHandoff']==h
 db=sqlite3.connect((R/'dist'/h['database']).as_uri()+'?mode=ro',uri=True)
 setup=sqlite3.connect(':memory:');setup.executescript((R/'dist'/h['setup']).read_text(encoding='utf-8'))
 for table,fields in h['schema'].items():
  assert [r[1] for r in db.execute(f'PRAGMA table_info({table})')]==fields
  assert setup.execute(f'SELECT * FROM {table}').fetchall()==db.execute(f'SELECT * FROM {table}').fetchall()
 assert ('ReplacementCost' in h['schema']['Equipment'])==(week==5)
 for slide in lesson['slides']:
  if 'expectedRows' in slide:assert [list(r) for r in db.execute(slide['code'])]==slide['expectedRows']
 db.close();setup.close()
 for f in ['database','setup','workbook','answers','queries','results']:assert (R/'dist'/h[f]).is_file()
 notes=(R/f'dist/slides/notes/{ident}.html').read_text(encoding='utf-8')
 for f in ['database','setup','workbook','answers']:assert 'href="../../'+h[f]+'"' in notes
 assert 'Teacher choice: alternative dataset' in notes and 'do not substitute pathway changed data' in notes
 with zipfile.ZipFile(R/f'dist/slides/{ident}.pptx') as z:
  cover=''.join(ET.fromstring(z.read('ppt/slides/slide1.xml')).itertext());assert 'Primary: '+h['database'] in cover and 'Task: '+h['task'] in cover
  rels=ET.fromstring(z.read('ppt/slides/_rels/slide1.xml.rels'));targets={r.get('Target') for r in rels if r.get('Type','').endswith('/hyperlink')}
  for f in ['setup','workbook','answers']:assert 'https://edugenio.github.io/cs-atar-textbook/'+h[f] in targets
  for n in range(1,9):
   note=''.join(ET.fromstring(z.read(f'ppt/notesSlides/notesSlide{n}.xml')).itertext())
   assert h['database'] in note and h['task'] in note and h['answers'] in note and h['alternativeNote'] in note
for week in [4,5]:
 with zipfile.ZipFile(R/f'dist/slides/unit2-week{week}-lesson-slides.zip') as z:
  for n in range(1,5):
   f=f'u2-w0{week}-l0{n}.pptx';assert z.read(f)==(R/'dist/slides'/f).read_bytes()
print('S05: eight primary schemas/tasks/keys; setup replay; worked SQL; native hyperlink targets; 64 persistent notes and both deck bundles passed.')
