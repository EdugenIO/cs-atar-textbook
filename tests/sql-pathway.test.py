"""Execute downloadable SQL afresh and verify externally reasoned result cases."""
from pathlib import Path
import json,sqlite3,zipfile,csv,io,re
ROOT=Path(__file__).resolve().parents[1];out=ROOT/'dist/sql'
data=json.loads((ROOT/'teaching-source/sql-pathway.json').read_text(encoding='utf-8'))
expected=json.loads((out/'expected-results.json').read_text(encoding='utf-8'))
assert len(data['stages'])==18
assert [s['id'] for s in data['stages'] if s['year']==11]==[f'{n:02}' for n in range(1,9)]
assert [s['id'] for s in data['stages'] if not s['core']]==['17','18']
html=(out/'index.html').read_text(encoding='utf-8')
assert html.count('class="sql-step"')==18
assert 'at least three' in html and 'six tables' in html
for s in data['stages']:
 for phase in ['model','guided','independent']:
  variant='changed' if phase=='independent' else 'base'
  path=out/'data'/s['fixture']/(variant+'.sqlite')
  assert path.read_bytes().startswith(b'SQLite format 3\x00')
  db=sqlite3.connect(':memory:',isolation_level=None)
  src=sqlite3.connect('file:'+str(path)+'?mode=ro',uri=True);src.backup(db);src.close()
  db.execute('PRAGMA foreign_keys=ON');buf='';actual=[];error=None
  sql=(out/'queries'/s['id']/(phase+'.sql')).read_text(encoding='utf-8')
  for char in sql:
   buf+=char
   if char==';' and sqlite3.complete_statement(buf):
    try:
     cursor=db.execute(buf)
     if cursor.description:actual.append({'columns':[c[0] for c in cursor.description],'rows':[list(r) for r in cursor]})
    except sqlite3.DatabaseError as ex:
     assert error is None
     error=str(ex)
    buf=''
  # A deliberate failing statement is followed by explicit verification queries.
  ref=expected[s['id']][phase]
  assert error==ref['error'],(s['id'],phase,error)
  assert actual==ref['results'],(s['id'],phase,actual)
  db.close()
def rows(step,phase='independent',n=0):return expected[step][phase]['results'][n]['rows']
assert rows('01')==[['Camera'],['Microphone'],['Recorder'],['Sensor'],['Tripod']]
assert rows('02')==[['L007','B005','2026-04-09'],['L004','B003','2026-04-10'],['L006','B004','2026-04-12']]
assert rows('02',n=1)==[['E06','Sensor']]
assert rows('04')==[[3,12,4.0,7,1]]
assert rows('04',n=1)==[[0,None,None,None,None]]
assert rows('05')==[['Club'],['Membership'],['Student']]
assert rows('06')==[['L021','B011','E06']]
assert expected['06']['guided']['error']=='FOREIGN KEY constraint failed'
assert rows('09')==[['Member C','2026-11-03','Network design']]
assert rows('10')==[['W01',2,5],['W02',2,6]]
assert rows('11')[-1]==['S04',60.0,'S04 @ 2026-11-10']
assert rows('11',n=1)==[['S01',0,100.0,'S01 / Python studio'],['S02',2,33.3,'S02 / Python studio'],['S03',1,50.0,'S03 / Network design']]
assert rows('12')==[[1,'M05','Faye'],[2,'M05','Conflicting person'],[4,'M07','Gia']]
assert rows('12',n=1)==[['M07','Gia']]
assert rows('13')==[]
assert rows('14')==[['M01','S01'],['M02','S01']]
assert rows('15')==[['Attendance'],['Booking'],['Instructor'],['Member'],['Session'],['Workshop']]
assert rows('16',n=3)==[['S04',6]]
assert rows('17')==[['S02',1],['S03',1],['S04',0]]
assert rows('18')==[[0]] and rows('18',n=1)==[[0]]
matrix=list(csv.DictReader((out/'readiness-checklist.csv').open(encoding='utf-8')))
assert len(matrix)==16 and all(r['independent_steps'] for r in matrix)
assert all(not r['include_in_assessment_scope'] for r in matrix)
with zipfile.ZipFile(out/'sql-student-pack.zip') as z:
 assert 'independent-starters.sql' in z.namelist()
 assert not any(n.startswith(('queries/','results/')) or n in ['expected-results.json','teacher-guide.md'] for n in z.namelist())
 assert 'data/y11/changed-tables.md' in z.namelist()
with zipfile.ZipFile(out/'sql-reference-pack.zip') as z:
 assert len([n for n in z.namelist() if n.startswith('queries/')])==54
 assert z.read('expected-results.json')==(out/'expected-results.json').read_bytes()
for href in re.findall(r'href="([^"]+)"',html):
 if href.startswith(('http','#')):continue
 assert (out/href.split('#')[0]).exists(),href
print('SQL pathway: 54 downloaded references replayed; 10 databases; independent result cases; table counts; constraints; cascade/rollback; archives and readiness map passed.')
