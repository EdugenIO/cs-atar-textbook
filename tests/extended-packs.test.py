"""Check the actual downloadable code, datasets, results and student/key separation."""
from pathlib import Path
import ast,csv,hashlib,io,ipaddress,json,sqlite3,zipfile
ROOT=Path(__file__).resolve().parents[1]
source=ROOT/'activity-source/extended-packs.json'
packs=json.loads(source.read_text(encoding='utf-8'))
assert [len(p['lessons']) for p in packs]==[4,6,4,4]
chapters={c['id'] for c in json.loads((ROOT/'dist/resources/catalogue.json').read_text(encoding='utf-8'))}
for p in packs:
 out=ROOT/'dist/activities'/p['id']
 stamp=json.loads((out/'pdf-source.json').read_text())
 assert stamp['sourceSha256']==hashlib.sha256(source.read_bytes()).hexdigest()
 student=(out/'index.html').read_text(encoding='utf-8');teacher=(out/'teacher.html').read_text(encoding='utf-8')
 assert student.count('class="worksheet-sheet"')==len(p['lessons'])*2
 assert teacher.count('class="worksheet-sheet"')==len(p['lessons'])
 for l in p['lessons']:
  assert l['chapter'] in chapters
  assert l['offline'] and len(l['offline'])>50
  assert l['worked'] and l['practice'] and len(l['key'])>=3
  # Distinctive full explanations belong only in the teacher page.
  from html import escape
  for _,answer in l['key']:
   assert escape(answer) not in student
   assert escape(answer) in teacher
 for name,total in [('student',len(p['lessons'])*2),('teacher',len(p['lessons']))]:
  content=(out/(name+'.pdf')).read_bytes()
  assert content.startswith(b'%PDF')
  import re
  assert len(re.findall(rb'/Type\s*/Page\b',content))==total
 with zipfile.ZipFile(out/'student-pack.zip') as z:
  assert 'student.pdf' in z.namelist()
  assert not any(n.startswith('answers/') or 'teacher' in n for n in z.namelist())
  assert z.read('student.pdf')==(out/'student.pdf').read_bytes()
 for f in (out/'files').glob('*.py'):ast.parse(f.read_text())

prog=ROOT/'dist/activities/programming-next/answers/reference.py'
ns={};exec(compile(prog.read_text(),str(prog),'exec'),ns)
assert [ns['sum_to'](n) for n in [4,0,1]]==[10,0,1]
assert [ns['cover_cost'](*a) for a in [(0,2),(3,2),(2,5)]]==[4,10,14]
assert [ns['first_minimum'](a) for a in [[],[9],[4,1,1],[5,7,2,2]]]==[None,0,1,2]
assert ns['reading_total'](['0','10','11','-1','oops',''])==(10,['Out of range: 11','Out of range: -1','Invalid: oops'])
sql=ROOT/'dist/activities/databases-sql'
db=sqlite3.connect(':memory:');db.executescript((sql/'files/setup.sql').read_text())
expected=[ [('Cleo',3),('Bo',2),('Ari',1)],[(102,5),(104,5),(101,3),(103,2)],[(2,),(3,),(5,)],[(101,'Camera'),(102,'Headset'),(103,'Camera'),(104,'Tripod')],[],[('Ari',102,'Headset'),('Bo',104,'Tripod')],[('Camera',2,3),('Headset',1,5),('Tripod',1,5)],[('Headset',1,5),('Tripod',1,5)],[(1,8)] ]
queries=[q.strip() for q in (sql/'answers/queries.sql').read_text().split(';') if q.strip()]
assert len(queries)==len(expected)
for q,rows in zip(queries,expected):assert db.execute(q).fetchall()==rows,q
db.executescript((sql/'answers/changes.sql').read_text())
assert db.execute('SELECT COUNT(*) FROM Member').fetchone()==(3,)
assert db.execute('SELECT COUNT(*) FROM Loan').fetchone()==(4,)
try:db.execute("INSERT INTO Loan VALUES(105,9,'Light',1,0)")
except sqlite3.IntegrityError:pass
else:raise AssertionError('Foreign key was not enforced')
db.rollback()
db.execute('CREATE TABLE Tag(tag_id INTEGER PRIMARY KEY,label TEXT NOT NULL)')
try:db.execute('INSERT INTO Tag VALUES(1,NULL)')
except sqlite3.IntegrityError:pass
else:raise AssertionError('NULL label accepted')
db.execute("INSERT INTO Tag VALUES(1,'Light')")
download=sqlite3.connect('file:'+str(sql/'files/practice.sqlite')+'?mode=ro',uri=True)
assert download.execute('SELECT * FROM Loan ORDER BY loan_id').fetchall()==db.execute('SELECT * FROM Loan ORDER BY loan_id').fetchall()
assert int('00111010',2)==58 and hex(166)=='0xa6'
assert 'ABé'.encode('utf-8')==bytes.fromhex('41 42 C3 A9')
assert [staff and (card or override) for staff in [False,True] for card in [False,True] for override in [False,True]]==[False,False,False,False,False,True,True,True]
net=ipaddress.ip_network('192.0.2.96/27');hosts=list(net.hosts())
assert str(net.broadcast_address)=='192.0.2.127' and len(hosts)==30 and str(hosts[0])=='192.0.2.97' and str(hosts[-1])=='192.0.2.126'
assert 75*8/20==30 and 24/(9-6)==8
print('18 activities: 36 student/18 teacher pages, archives, Python results, SQL reports/constraints/rollback, Unicode, logic and subnet calculations passed.')
