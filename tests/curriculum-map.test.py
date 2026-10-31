"""Source/item inventory and edition guardrails; never infer coverage approval."""
from pathlib import Path
import collections,csv,io,json,zipfile
ROOT=Path(__file__).resolve().parents[1];DIST=ROOT/'dist';OUT=DIST/'curriculum'
source=json.loads((ROOT/'curriculum-source/item-map.json').read_text(encoding='utf-8'))
registry=json.loads((ROOT/'curriculum-source/source-registry.json').read_text(encoding='utf-8'))
matrix=json.loads((OUT/'matrix.json').read_text(encoding='utf-8'));rows=matrix['rows']
assert len(rows)==648 and len({r['id'] for r in rows})==648
assert collections.Counter(r['unit'] for r in rows)=={1:157,2:124,3:226,4:141}
assert sum(not r['isParent'] for r in rows)==519 and matrix['signedOffItems']==0
assert [r['id'] for r in rows]==[r['id'] for r in source['items']]
assert registry['targetTeachingYear']==2027 and registry['checked']=='30 October 2026'
assert {s['year']:s['teachingFrom'] for s in registry['sources']}=={11:2026,12:2027}
counts=collections.Counter((r['unit'],r['printedPage']) for r in rows)
assert counts=={(r['unit'],r['printedPage']):r['count'] for r in source['sourcePageCounts']}
for row in rows:
 assert row['year']==(11 if row['unit']<3 else 12)
 assert row['printedPage']==row['pdfPage']-4
 assert row['sourceURL'].endswith('#page='+str(row['pdfPage']))
 assert row['kind'] in ['Knowledge','Skills'] and 0<=row['markerLevel']<=3
 assert row['reviewStatus']=='Item review pending' and row['editorialDate']=='30 October 2026'
 assert row['independentReviewer']==row['independentReviewDate']==''
 assert 'school-issued' in row['formalAssessment']
 assert 'formalAssessment' in row['gaps'] and 'independentReview' in row['gaps']
 for role in ['explanation','example','independentTask']:
  if row[role]:assert row[role]['url'].startswith('../#') and 'pending' in row[role]['status']
  else:assert role in row['gaps']
 for p in row['practice']:assert p['url']=='../practice/#'+p['set']
 for l in row['lessons']:assert l['unit']==row['unit'] and 1<=l['week']<=16 and 1<=l['lesson']<=4
for path in OUT.glob('*.csv'):
 table=list(csv.reader(io.StringIO(path.read_text(encoding='utf-8'))));assert all(len(r)==len(table[0]) for r in table),path.name
 assert len(table)-1==(519 if path.name=='provision-review.csv' else 648 if path.name=='matrix.csv' else {1:157,2:124,3:226,4:141}[int(path.name[4])])
checks=json.loads((OUT/'assessment-checks.json').read_text(encoding='utf-8'))
for c in checks:
 assert c['libraryTasks']==8 and c['minimumLibraryTaskWeight']>=5
 assert sum(c['libraryCategoryWeights'].values())==100
 assert c['schoolAdoptedOutline']=='Not supplied; school verification pending'
with zipfile.ZipFile(OUT/'curriculum-review-pack.zip') as z:
 assert z.testzip() is None
 for name in ['matrix.csv','matrix.json','review-guide.md','source-registry.json','assessment-checks.json','school-review.md']:
  assert z.read(name)==(OUT/name).read_bytes()
 assert not any(name.lower().endswith('.pdf') for name in z.namelist())
app=(DIST/'app.js').read_text(encoding='utf-8');index=(DIST/'index.html').read_text(encoding='utf-8')
assert '2027 teaching draft' in app and 'Edition 0.49' in app
assert 'Structure informed by the 2026 Year 11 and Year 12' not in app
assert 'Year 11: syllabus from 2026' in index and 'Year 12: syllabus from 2027' in index
assert '2027 teaching draft' in (DIST/'resource-edition.md').read_text(encoding='utf-8')
assert '0.48' in (DIST/'audits/resource-edition-0.48-2026-10-15.md').read_text(encoding='utf-8')
for file in ['coverage.js','unit2-coverage.js','unit3-coverage.js','unit4-coverage.js']:
 text=(DIST/file).read_text(encoding='utf-8');assert 'Historical' in text
assert 'source-registry.json' in (OUT/'index.html').read_text(encoding='utf-8')
print('648 source locators, page/marker counts, provisional evidence/blank approvals, edition basis, school-adoption gaps, historical records and review ZIP passed.')
