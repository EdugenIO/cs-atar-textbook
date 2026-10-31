"""Current provision is complete only as written evidence; teacher sign-off stays separate."""
from pathlib import Path
from html import escape,unescape
import collections,csv,hashlib,io,json,subprocess,unicodedata,re
ROOT=Path(__file__).resolve().parents[1];D=ROOT/'dist';C=ROOT/'curriculum-source';O=D/'curriculum'
read=lambda p:json.loads(p.read_text(encoding='utf8'))
source=read(C/'item-map.json')['items'];current=read(O/'provision-review.json');groups=current['groups'];matrix=read(O/'matrix.json')['rows'];snapshot=read(C/'provision-snapshot.json')
leaves={r['id']:r for r in source if not r['isParent']};assigned=[i for g in groups for i in g['itemIds']]
assert len(groups)==111 and len(assigned)==len(set(assigned))==519 and set(assigned)==set(leaves)
assert current['independentTeacherSignOffs']==0
book=json.loads(subprocess.check_output(['node',str(ROOT/'tests/helpers/curriculum-content.mjs')],cwd=ROOT));chapters={c['id']:c for c in book['chapters']}
def heading(s):return 'heading-'+re.sub(r'[^\w]+','-',re.sub(r'^\d+\.\s*','',unicodedata.normalize('NFKC',s).lower())).strip('-').replace('_','-')
for g in groups:
 assert all(leaves[i]['unit']==g['unit'] for i in g['itemIds'])
 assert g['decision'] and g['independentTeacherReview']=='pending'
 for role in ['explanation','example','independentTask','feedback']:
  ref=g[role];assert ref['label'] and len(ref['excerpt'])>18 and ref['sha256']==snapshot[g['id']][role]
  url=ref['url'];assert url.startswith('../')
  if url.startswith('../#'):
   route,anchor=url[4:].split('/',1);c=chapters[route]
   assert anchor in {heading(s[0]) for s in c['sections']}|{'heading-your-practical-task'},url
  else:
   path=D/url[3:];assert path.is_file();assert hashlib.sha256(path.read_text(encoding='utf8').replace('\r\n','\n').encode()).hexdigest()==ref['sha256']
for r in matrix:
 if r['isParent']:assert r['provisionReview'] is None
 else:
  assert r['provisionReview']['status']=='Written teaching and practice confirmed'
  for role in ['explanation','example','independentTask','feedback']:assert r['provisionReview'][role]['current'] is True
 assert r['independentReviewer']==r['independentReviewDate']==''
rows=list(csv.DictReader(io.StringIO((O/'provision-review.csv').read_text(encoding='utf8'))));assert len(rows)==519
for role in ['teaching','worked_example','independent_practice','feedback']:assert all(r[role] for r in rows)
repairs=read(C/'teaching-repairs.json');assert len(repairs)==17
for repair in repairs:
 reader=(D/'offline'/f"unit-{chapters[repair['route']].get('unit',1)}-reader.html").read_text(encoding='utf8')
 assert escape(repair['title'],quote=True) in reader,repair['id']+' must be available offline'
 assert repair['prompt'] in unescape(reader),repair['id']+' independent task must be available offline'
 assert repair['answer'] in unescape(reader),repair['id']+' feedback must be available offline'
scope=read(C/'scope-register.json');having=next(r for r in scope['entries'] if r['id']=='having');assert having['category']=='support-booklet' and '#page=26' in having['source']
assert next(r for r in scope['entries'] if r['id']=='left-join')['category']=='enrichment'
assert next(r for r in scope['entries'] if r['id']=='transaction-commands')['category']=='implementation'
assert next(r for r in scope['entries'] if r['id']=='subnet-level')['category']=='required'
sql=read(ROOT/'teaching-source/sql-pathway.json')['stages'][16];assert sql['scopeLabel']=='SUPPORT BOOKLET + ENRICHMENT';assert 'optional-only' not in sql['explanation']
page=(O/'scope.html').read_text(encoding='utf8');assert 'underlying syllabus skill is optional' in page
assert all(heading(r['title']) in {heading(s[0]) for s in chapters[r['route']]['sections']} for r in repairs)
print('519 detailed items, 111 reviewed groups/four roles, 17 available offline clinics, protected source fingerprints, scope classification and zero inferred teacher approvals passed.')

byid={g['id']:g for g in groups}
assert byid['Y11-R006']['independentTask']['label'].startswith('Independent transfer')
assert 'both representations' in byid['Y11-R015']['independentTask']['label'] and 'both representations' in byid['Y11-R028']['independentTask']['label']
for ident in ['Y11-R021','Y11-R038','Y11-R039','Y11-R040','Y11-R041']:assert byid[ident]['independentTask']['kind']=='clinic-task'
# Re-run the newly supplied worked programs against independently calculated outputs.
import contextlib,io,sqlite3
byrepair={r['id']:r for r in repairs}
for ident,code,want in [
 ('maintainability-check',byrepair['maintainability-check']['worked'],'12\n'),
 ('fresh-type-choices',byrepair['fresh-type-choices']['worked'].split('\n\nPseudocode')[0],'7.5\n0042\nTrue\n'),
 ('array-representation-transfer',byrepair['array-representation-transfer']['worked'].split('Python 3\n')[1],'0 3\n1 7\n2 7\n17 1\n')]:
 stream=io.StringIO();ns={}
 with contextlib.redirect_stdout(stream):exec(compile(code,ident,'exec'),ns)
 assert stream.getvalue()==want,ident
con=sqlite3.connect(':memory:');con.executescript(byrepair['fresh-schema']['worked']);assert con.execute('SELECT t.TitleID,a.Name FROM Title t JOIN Author a ON a.AuthorID=t.AuthorID').fetchall()==[('T1','Mia')]
