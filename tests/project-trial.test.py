"""A03 consistency: never turn blank templates into purported trial evidence."""
from pathlib import Path
import csv, io, json, zipfile, hashlib
ROOT=Path(__file__).resolve().parents[1];DIST=ROOT/'dist';OUT=DIST/'project-trial'
contracts=json.loads((ROOT/'assessment-source/game-projects.json').read_text(encoding='utf-8'))
candidate=json.loads((ROOT/'assessment-source/project-moderation.json').read_text(encoding='utf-8'))
manifest=json.loads((OUT/'manifest.json').read_text(encoding='utf-8'))
alignment=json.loads((DIST/'project-alignment.json').read_text(encoding='utf-8'))
def rows(path):return list(csv.DictReader(path.read_text(encoding='utf-8-sig').splitlines()))
for path in OUT.glob('*.csv'):
 raw=list(csv.reader(io.StringIO(path.read_text(encoding='utf-8-sig'))));assert raw and all(len(row)==len(raw[0]) for row in raw),path.name
assert manifest['observationsSupplied'] is False
for entry in rows(OUT/'source-fingerprints.csv'):
 assert entry['SHA256']==hashlib.sha256((DIST/entry['Public path']).read_bytes()).hexdigest()
all_points=[]
for contract in contracts['years']:
 year=contract['year'];yr=next(y for y in candidate['years'] if y['year']==year)
 original={i['id']:i for c in contract['rubric'] for i in c['items']}
 assert {i['id'] for i in yr['items']}==set(original)
 assert sum(i['marks'] for i in yr['items'])==100
 for group in contract['rubric']:
  assert sum(i['marks'] for i in yr['items'] if i['category']==group['name'])==group['marks']
 for item in yr['items']:
  assert item['marks']==original[item['id']]['marks']==len(item['points'])
  assert all(p['marks']==1 and p['evidence'] for p in item['points'])
  assert len({p['id'] for p in item['points']})==len(item['points'])
  all_points += [(str(year),p['id']) for p in item['points']]
 slots=[r for r in rows(OUT/'workload-log.csv') if r['Year']==str(year)]
 assert len(slots)==contract['budget']
 assert [(int(r['Week']),int(r['Lesson'])) for r in slots]==[(s['week'],s['lesson']) for s in alignment['years'][str(year)]['slots']]
 for r in slots:
  for field in ['Actual available minutes','Setup/admin lost minutes','Independent work minutes','Guided work minutes','Other/unused minutes','Off-timetable extra minutes','Requirement/build evidence']:assert r[field]=='',field
 capacity=next(r for r in rows(OUT/'budget-capacity.csv') if r['Year']==str(year) and r['Phase']=='TOTAL')
 assert int(capacity['50-minute capacity'])==contract['budget']*50
 assert int(capacity['55-minute capacity'])==contract['budget']*55
 outcomes=[r for r in rows(OUT/'requirement-outcomes.csv') if r['Year']==str(year)]
 assert len(outcomes)==len(contract['functional'])+len(contract['nonFunctional'])
 for requirement in contract['functional']+contract['nonFunctional']:
  outcome=next(r for r in outcomes if r['Requirement']==requirement['id'])
  assert outcome['Contract text']==requirement['text'];assert outcome['Expected evidence']==requirement['acceptance']
  assert outcome['Related parent items (not a syllabus audit)']
  assert outcome['Observed evidence']==outcome['Outcome: met/partly/not met/not tested']==''
 current=rows(DIST/f'assessments/games/year{year}-acceptance.csv');supplement=rows(OUT/f'year{year}-trial-tests.csv')
 assert len(supplement)>len(current)
 assert len({r['Test ID'] for r in supplement})==len(supplement)
 for a,b in zip(current,supplement):
  for key,value in a.items():assert b[key]==value
 assert all(r['Actual outcome']==r['Pass / fail / not run']=='' for r in supplement)
 themes=[r for r in rows(OUT/'theme-equivalence.csv') if r['Year']==str(year)]
 assert {r['Theme'] for r in themes}==set(alignment['years'][str(year)]['themes'])
 assert all(r['Reviewer / date']==r['Observed difference']=='' for r in themes)
 yr_manifest=next(y for y in manifest['years'] if y['year']==year)
 assert yr_manifest['actualTrialCompleted'] is False and yr_manifest['independentModeratorSigned'] is False
points=rows(OUT/'double-mark-record.csv')
assert len(points)==200 and {(r['Year'],r['Point']) for r in points}==set(all_points)
for r in points:
 for field in ['Marker A score (0/1)','Marker B score (0/1)','Agreed score (0/1)','Reviewer / date']:assert r[field]==''
assert 'invented' in (OUT/'calibration-cases.md').read_text(encoding='utf-8')
assert 'PENDING' in (OUT/'release-decision.md').read_text(encoding='utf-8')
assert all(r['Independent reviewer']==r['Adopt / revise / reject']=='' for r in rows(OUT/'candidate-adoption.csv'))
with zipfile.ZipFile(OUT/'project-trial-moderation-pack.zip') as z:
 assert z.testzip() is None
 for name in ['README.md','workload-log.csv','requirement-outcomes.csv','double-mark-record.csv','candidate-adoption.csv','calibration-cases.md','calibration-rationales.md','release-decision.md','year11-candidate-marking.md','year12-candidate-marking.md','manifest.json']:
  assert z.read(name)==(OUT/name).read_bytes(),name
 for year in [11,12]:
  for suffix in ['requirements.md','marking-guide.md','acceptance.csv']:
   name=f'year{year}-{suffix}';assert z.read('current-contracts/'+name)==(DIST/'assessments/games'/name).read_bytes()
assert 'project-trial/' in (DIST/'assessments.js').read_text(encoding='utf-8')
assert 'project-trial/' in (DIST/'teaching-planner.js').read_text(encoding='utf-8')
audit=json.loads((ROOT/'audit-source/site-audit-2026-10-30.json').read_text(encoding='utf-8'))
assert next(t for t in audit['tasks'] if t['id']=='A03')['status']!='Complete'
print('A03: unchanged totals/slots/contracts, 200 candidate points, 33 full requirement records, blank actual evidence/sign-offs, calibration labels and complete ZIP verified.')
