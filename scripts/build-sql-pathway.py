"""Build a static SQL pathway and execute every reference against fresh fixtures."""
from pathlib import Path
from html import escape
import csv,io,json,sqlite3,zipfile
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'dist/sql';OUT.mkdir(exist_ok=True)
DATA=json.loads((ROOT/'teaching-source/sql-pathway.json').read_text(encoding='utf-8'))
e=lambda s:escape(str(s))
def write(p,s):p.write_text(s.rstrip()+'\n',encoding='utf-8',newline='\n')
fixtures={
 'y11':(ROOT/'dist/sql-setup.sql').read_text(encoding='utf-8'),
 'y12':(ROOT/'dist/unit4-design-schema.sql').read_text(encoding='utf-8'),
 'scratch':'PRAGMA foreign_keys = ON;\nPRAGMA user_version = 1;\n',
 'durations':'CREATE TABLE Duration (RecordID INTEGER PRIMARY KEY, Days INTEGER NOT NULL, Completed INTEGER NOT NULL);\nINSERT INTO Duration VALUES (1,2,1),(2,3,1),(3,5,0),(4,5,1),(5,0,0);\n',
 'staging':"CREATE TABLE Staging (RowNo INTEGER PRIMARY KEY, MemberID TEXT NOT NULL, DisplayName TEXT NOT NULL);\nINSERT INTO Staging VALUES (1,' m04 ',' Dana '),(2,'M04','Different name'),(3,'M08',' '),(4,'M09',' Eli ');\n"
}
fixtures['staging']+="CREATE TABLE Member (MemberID TEXT PRIMARY KEY NOT NULL, DisplayName TEXT NOT NULL CHECK(length(trim(DisplayName)) > 0));\n"
variants={
 'y11':"INSERT INTO Borrower VALUES ('B005','Learner E');\nINSERT INTO Equipment VALUES ('E06','Sensor','C02');\nINSERT INTO Loan VALUES ('L007','B005','E06','2026-04-09',0);\nUPDATE Loan SET Returned = 1 WHERE LoanID = 'L002';\nUPDATE Loan SET DueDate = '2026-04-12' WHERE LoanID = 'L006';\n",
 'y12':"INSERT INTO Member VALUES ('M04','Member D');\nINSERT INTO Booking VALUES ('M03','S03','2026-10-15');\nINSERT INTO Attendance VALUES ('M01','S02',0);\nINSERT INTO Session VALUES ('S04','W02','I02','2026-11-10',4);\n",
 'scratch':'',
 'durations':'DELETE FROM Duration;\nINSERT INTO Duration VALUES (1,1,1),(2,4,1),(3,4,0),(4,7,1),(5,0,0);\n',
 'staging':"DELETE FROM Staging;\nINSERT INTO Staging VALUES (1,' m05 ',' Faye '),(2,'M05','Conflicting person'),(3,'M06',' '),(4,'m07',' Gia ');\n"
}
def connect(key,changed=False):
 db=sqlite3.connect(':memory:',isolation_level=None);db.executescript(fixtures[key]+(variants[key] if changed else ''));db.execute('PRAGMA foreign_keys=ON');assert db.execute('PRAGMA foreign_keys').fetchone()==(1,);return db
def statements(sql):
 buf=''
 for line in sql.splitlines(True):
  for char in line:
   buf+=char
   if char==';' and sqlite3.complete_statement(buf):yield buf.strip();buf=''
 if buf.strip() and not all(not l.strip() or l.lstrip().startswith('--') for l in buf.splitlines()):yield buf.strip()
def execute(db,sql):
 results=[]
 for stmt in statements(sql):
  cursor=db.execute(stmt)
  if cursor.description:results.append({'columns':[d[0] for d in cursor.description],'rows':[list(row) for row in cursor.fetchall()]})
 return results
def run(key,changed,x):
 db=connect(key,changed);error=None;results=[]
 try:results=execute(db,x['sql'])
 except sqlite3.DatabaseError as err:error=str(err)
 if x.get('error'):assert error and x['error'] in error,(x,error)
 else:assert error is None,(x,error)
 if x.get('check'):results+=execute(db,x['check'])
 db.close();return {'error':error,'results':results}
def table_html(result):
 return '<div class="table-wrap"><table><thead><tr>'+''.join('<th scope="col">'+e(h)+'</th>' for h in result['columns'])+'</tr></thead><tbody>'+(''.join('<tr>'+''.join('<td>'+('NULL' if v is None else e(v))+'</td>' for v in r)+'</tr>' for r in result['rows']) or '<tr><td colspan="'+str(len(result['columns']))+'">No rows</td></tr>')+'</tbody></table></div><p class="result-count">'+str(len(result['rows']))+' result row(s). NULL is displayed as a marker, not stored text.</p>'
def dictionary(key,changed=False):
 db=connect(key,changed);names=[r[0] for r in db.execute("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")];lines=['# '+key.upper()+(' changed' if changed else ' base')+' data dictionary, records and relationships','All records are fictional. ISO dates are text; 0/1 is the declared Boolean convention. SQLite affinity is not full domain enforcement.\n'];html=[]
 if key=='y12':
  contracts='Domain rules: Instructor.DisplayName and Member.DisplayName have trimmed lengths 1..60; Workshop.Title has trimmed length 1..80. Session.Capacity must be stored as an integer greater than zero. Attendance.Present must be an integer 0 or 1. All displayed required fields must be NOT NULL. Booking uses the whole (MemberID, SessionID) primary key; Attendance uses the same composite key and references Booking with ON DELETE CASCADE. Other displayed foreign keys use the default restrictive delete action.'
  lines.append(contracts+'\n');html.append('<p>'+e(contracts)+'</p>')
 for name in names:
  columns=db.execute('PRAGMA table_info('+name+')').fetchall();rows=[[c[1],c[2],str(c[3]),str(c[5])] for c in columns]
  lines+=['## '+name,'Field | Declared type | NOT NULL flag | Primary-key position','--- | --- | --- | ---']+[' | '.join(r) for r in rows]
  records=[list(r) for r in db.execute('SELECT * FROM '+name)];headers=[c[1] for c in columns]
  if key=='staging':
   records=[[repr(v) if isinstance(v,str) else v for v in row] for row in records]
   lines.append('Text values below are shown in quotes so surrounding/blank spaces remain visible; the quote marks are display notation, not stored characters.')
  html.append('<details><summary>'+e(name)+' · fields and supplied records</summary>'+table_html({'columns':['Field','Type','NOT NULL','PK position'],'rows':rows})+table_html({'columns':headers,'rows':records})+'</details>')
  for fk in db.execute('PRAGMA foreign_key_list('+name+')'):
   lines.append('Foreign key component: '+name+'.'+fk[3]+' -> '+fk[2]+'.'+fk[4]+'; delete action '+fk[6]+'. Components with the same FK ID '+str(fk[0])+' form one foreign key.')
  lines+=['\nSupplied records:',' | '.join(headers),' | '.join(['---']*len(headers))]+[' | '.join('NULL' if v is None else str(v) for v in row) for row in records]+['']
 db.close();return '\n'.join(lines),''.join(html)

for key in fixtures:
 directory=OUT/'data'/key;directory.mkdir(parents=True,exist_ok=True)
 for changed in [False,True]:
  name='changed' if changed else 'base';sql=fixtures[key]+(variants[key] if changed else '')
  write(directory/(name+'-setup.sql'),sql)
  target=directory/(name+'.sqlite')
  if target.exists():target.unlink()
  with sqlite3.connect(target) as disk:disk.executescript(sql)
  write(directory/(name+'-tables.md'),dictionary(key,changed)[0])
 write(directory/'dictionary.md',dictionary(key)[0])
 if key in ['y11','y12']:write(directory/'seed.sql','\n'.join(stmt for stmt in statements(fixtures[key]) if stmt.startswith('INSERT')))

# Preserve the independent construction prompt while providing a runnable reference.
stages=DATA['stages']
for s in stages:
 if s['id']=='15':
  s['independent']['sql']=fixtures['y12'];s['independent']['check']="SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;\nSELECT COUNT(*) AS Bookings FROM Booking;"

expected={};cards=[];student_md=['# SQL pathway - student practice','Read the online setup and numbered explanations. Predict before running. Model/guided work uses base; independent work uses changed. Start each exercise from a fresh copy. No specialist equipment is required.\n'];teacher_md=['# SQL pathway - expected results and feedback','Public formative references, not secure assessment materials. Results are executed against fresh fixtures. Missing/unknown is represented by JSON null and the display marker NULL.\n']
for s in stages:
 code_dir=OUT/'queries'/s['id'];code_dir.mkdir(parents=True,exist_ok=True)
 student_md+=['## Step '+s['id']+' - '+s['title'],s['explanation'],'Textbook: https://edugenio.github.io/cs-atar-textbook/#'+s['chapter'],'### Worked example',s['model']['prompt'],'```sql',s['model']['sql'],'```']
 lesson_results={};parts=[]
 for phase in ['model','guided','independent']:
  x=s[phase];result=run(s['fixture'],phase=='independent',x);lesson_results[phase]=result
  write(code_dir/(phase+'.sql'),'-- '+x['prompt']+'\n-- Fresh '+('changed' if phase=='independent' else 'base')+' '+s['fixture']+' database. Enable PRAGMA foreign_keys=ON before any BEGIN.\n'+x['sql']+('\n-- Verify:\n'+x['check'] if x.get('check') else ''))
  expectations=('<p class="error">Expected error: '+e(result['error'])+'</p>' if result['error'] else '')+''.join(table_html(r) for r in result['results'])
  if not expectations:expectations='<p>The statements complete without error; use the inspection checks in the prompt to verify the schema.</p>'
  for n,r in enumerate(result['results']):
   folder=OUT/'results'/s['id'];folder.mkdir(parents=True,exist_ok=True);buf=io.StringIO(newline='');w=csv.writer(buf,lineterminator='\n');w.writerow(r['columns']);w.writerows([['NULL' if v is None else v for v in row] for row in r['rows']]);write(folder/(phase+'-'+str(n+1)+'.csv'),buf.getvalue())
  reference='<pre><code>'+e(x['sql'])+'</code></pre>'+('<h4>Verification queries</h4><pre><code>'+e(x['check'])+'</code></pre>' if x.get('check') else '')
  if phase=='model':body=reference+'<details><summary>Worked result and explanation</summary>'+expectations+'</details>'
  else:body='<p class="write-space">Record prediction → run / hand trace → actual result → first mismatch → correction → fresh retry.</p><details><summary>Reveal reference SQL and expected result after your attempt</summary>'+reference+expectations+'</details>'
  parts.append('<section class="exercise"><h3>'+{'model':'1. Worked example','guided':'2. Guided practice','independent':'3. Changed independent task'}[phase]+'</h3><p>'+e(x['prompt'])+'</p><p><strong>Database:</strong> '+s['fixture']+' / '+('changed' if phase=='independent' else 'base')+' · fresh copy per exercise.</p>'+body+'<a href="queries/'+s['id']+'/'+phase+'.sql" download>Download '+phase+' SQL reference</a></section>')
  if phase!='model':student_md+=['### '+phase.title(),x['prompt'],'Prediction:\n\nObserved / traced:\n\nFeedback and fresh retry:\n']
  teacher_md+=['### Step '+s['id']+' '+phase,x['prompt'],'```sql',x['sql'],'```',json.dumps(result,ensure_ascii=False,indent=2)]
 expected[s['id']]=lesson_results
 teacher_md+=['Feedback: '+s['feedback']]
 previous='<a href="#step-'+f'{int(s["id"])-1:02}'+'">← Previous step</a>' if s['id']!='01' else '<a href="#start">Setup first</a>'
 following='<a href="#step-'+f'{int(s["id"])+1:02}'+'">Next step →</a>' if s['id']!='18' else '<a href="#checkpoint">Readiness checklist</a>'
 cards.append('<article class="sql-step" id="step-'+s['id']+'" data-year="'+str(s['year'])+'" data-kind="'+('core' if s['core'] else 'extension')+'"><p class="eyebrow">STEP '+s['id']+' · YEAR '+str(s['year'])+' · '+('CORE PATHWAY' if s['core'] else s.get('scopeLabel','SUPPORTING IMPLEMENTATION'))+'</p><h2>'+e(s['title'])+'</h2><p><a href="../#'+e(s['chapter'])+'">Textbook reading</a> · <a href="data/'+s['fixture']+'/dictionary.md">Dictionary</a> · <a href="data/'+s['fixture']+'/base.sqlite" download>Base database</a> · <a href="data/'+s['fixture']+'/changed.sqlite" download>Changed database</a></p><p>'+e(s['explanation'])+'</p>'+''.join(parts)+'<aside class="feedback"><strong>Feedback and troubleshooting:</strong> '+e(s['feedback'])+'</aside><p class="offline"><strong>Equipment-free route:</strong> use the supplied table previews/dictionary to hand-construct result rows or annotate schema and change effects on paper. Label these as traces; software execution and actual constraint enforcement still need an RDBMS check before a practical assessment.</p><nav aria-label="Step '+s['id']+' navigation">'+previous+' · '+following+'</nav></article>')
write(OUT/'expected-results.json',json.dumps(expected,ensure_ascii=False,indent=2))
write(OUT/'student-workbook.md','\n\n'.join(student_md));write(OUT/'teacher-guide.md','\n\n'.join(teacher_md))
write(OUT/'independent-starters.sql','\n\n'.join('-- Step '+s['id']+' '+s['title']+'\n-- '+s['independent']['prompt']+'\n-- Database: '+s['fixture']+' changed, fresh copy.\n-- Write your independent attempt below:\n' for s in stages))

requirements=[
 (11,'SELECT / ORDER BY / distinct results','01','01'),(11,'Conditions, comparisons and text/date filters','02','02'),(11,'INNER JOIN on known keys','03','03'),(11,'COUNT SUM AVG MAX MIN','04','04'),(11,'Construct at least three related tables after design/normalisation','05','05'),(11,'INSERT and integrity checks','06','06'),(11,'UPDATE and DELETE with verification','07','07'),(11,'Mixed fresh rehearsal and feedback','08','08'),
 (12,'Construct at least five related tables (six supplied)','09,15','15'),(12,'INNER JOIN up to four tables','09','09,16'),(12,'GROUP BY with aggregate functions','10','10,16'),(12,'Calculated and concatenated fields with aliases','11','11'),(12,'Clean/manipulate source data before import','12','12'),(12,'CREATE / modify structure / DROP','13,15','13,15'),(12,'INSERT UPDATE DELETE transferred to Year 12 data','06,07,14,15','15,16'),(12,'Constraints, referential integrity and cascading deletes','14,15','14,15')]
buf=io.StringIO();writer=csv.writer(buf,lineterminator='\n');writer.writerow(['year','operation','teach_steps','independent_steps','taught_date','practice_evidence','feedback_date','fresh_retry_evidence','include_in_assessment_scope'])
for row in requirements:writer.writerow([*row,'','','','',''])
write(OUT/'readiness-checklist.csv',buf.getvalue())
matrix=''.join('<tr><td>'+str(y)+'</td><td>'+e(op)+'</td><td>'+e(t)+'</td><td>'+e(i)+'</td><td>□ taught<br>□ independent evidence<br>□ feedback<br>□ fresh retry</td></tr>' for y,op,t,i in requirements)
provenance='<p>2026 foundation · 2027 revisions. Requirements checked '+DATA['checked']+' against <a href="'+e(DATA['sources']['year11'])+'">Year 11 syllabus (printed p.18)</a> and <a href="'+e(DATA['sources']['year12'])+'">Year 12 syllabus (printed p.19)</a>. This pathway addresses SQL creation/manipulation; complete the linked modelling, normalisation, security, privacy and project-development work separately. Support-booklet examples and optional enrichment are distinguished in the <a href="../curriculum/scope.html">scope guide</a>; neither is a substitute for the required unit skills.</p>'
previews=''.join('<details><summary>'+key+' · '+('changed independent' if changed else 'base worked/guided')+' table previews</summary><p><a href="data/'+key+'/'+('changed' if changed else 'base')+'-tables.md" download>Download printable table records</a></p>'+dictionary(key,changed)[1]+'</details>' for key in ['y11','y12','durations','staging'] for changed in [False,True])
setup='''<section id="start"><h2>Start here: one database, one fresh attempt</h2><ol><li>Use a school-approved SQLite tool. Download base for modelling/guided practice and changed for the independent task. An empty scratch database is used for construction exercises.</li><li>Open the .sqlite file directly, or run the matching setup.sql once in a new empty database. Do not run setup over an existing file. Keep an untouched download and work on a named copy.</li><li>For each new connection run <code>PRAGMA foreign_keys = ON;</code> outside any transaction, then <code>PRAGMA foreign_keys;</code> and confirm 1. This setting is not saved in the database file.</li><li>Read the dictionary and preview the rows. Predict first. Run one exercise at a time, compare column names/order, row values/count and sort order, then record the first mismatch. Some tools show only the last SELECT result; run each SELECT separately when comparing multiple result tables.</li><li>Changes use fresh disposable copies. After feedback, retry with fresh data; preserve the original attempt. No code runs in this web page and no student work is uploaded.</li></ol><p>SQLite conventions: text/date literals use single quotes; dates are fixed-width ISO text; Booleans are constrained 0/1; <code>||</code> concatenates; <code>ALTER TABLE</code> modifies supported schema features. These are explicit teaching choices, not universal DBMS syntax.</p><p>At Step 15, use <a href="data/y12/dictionary.md">the six-table dictionary</a> and <a href="data/y12/seed.sql" download>separate seed rows</a> after writing your own schema. The completed setup file is a public reference; inspect it after your independent attempt.</p></section>'''
troubleshooting='''<section id="help"><h2>Troubleshooting: isolate the first mismatch</h2><dl><dt>No such table / column</dt><dd>Check the open filename, database variant and dictionary spelling. A new empty scratch file has no teaching tables until you create them.</dd><dt>Table already exists / duplicate key during setup</dt><dd>Setup is a once-only load, not a reset script. Open a new empty file or restore the untouched download.</dd><dt>Foreign key insert unexpectedly succeeds</dt><dd>Query PRAGMA foreign_keys on that connection. Enable it before BEGIN, then retry on a fresh copy.</dd><dt>FOREIGN KEY / NOT NULL / UNIQUE / CHECK error</dt><dd>Identify the exact parent, missing value, duplicate key or domain rule. Expected invalid-test errors are learning evidence. Compare stored rows after the error; do not remove the constraint to make the test pass.</dd><dt>Too many rows or inflated totals</dt><dd>Inspect the join key and row grain. Add one table at a time. DISTINCT is not a general repair for a wrong join.</dd><dt>Empty result</dt><dd>Check the supplied rows and each WHERE condition separately. No rows can be the correct answer.</dd><dt>Rows in a different order</dt><dd>Add the required ORDER BY and tie-breaker. Storage/display order is not an ordering contract.</dd><dt>Unexpected NULL / count of one for no bookings</dt><dd>Use IS NULL. COUNT(column) ignores NULL while COUNT(*) counts preserved outer-join rows. Do not silently treat unknown attendance as absence.</dd><dt>Fraction is zero / concatenation fails</dt><dd>Check real versus integer division, the SQLite || operator, quoting and NULL operands.</dd><dt>Cannot start a transaction within a transaction / database locked</dt><dd>Check your tool's transaction state and other open editing connections. Commit only intended work or roll back the practice transaction; close the extra writer. Reopen a fresh copy if the state is uncertain.</dd><dt>Missing or changed rows on a later task</dt><dd>Do not reuse a mutated file. Restore base/changed as specified. Reference expectations always start fresh.</dd></dl><p>Primary technical references: <a href="https://www.sqlite.org/lang_select.html">SQLite SELECT</a>, <a href="https://www.sqlite.org/foreignkeys.html">foreign keys</a>, <a href="https://www.sqlite.org/lang_altertable.html">ALTER TABLE</a>, <a href="https://www.sqlite.org/lang_transaction.html">transactions</a>.</p></section>'''
checkpoints='<section id="checkpoint"><h2>Teacher checkpoint: practice before assessment</h2><p>These are formative readiness checks, not a replacement assessment outline or automatic proof of readiness. Before assessing an operation, record its teaching, a changed independent attempt, feedback and a fresh retry. If that evidence is absent, teach/practice it first or remove it from the issued task scope. The public references are not secure assessment questions.</p><p>Year 11: complete Steps 01–08, including independent three-table creation and every aggregate. Year 12: retrieve Year 11 skills, then complete Steps 09–16, including independent six-table construction, change/constraint tests and import decisions. Step 17 combines support-booklet HAVING with optional LEFT JOIN. Step 18 illustrates explicit SQLite transaction commands; ACID remains required knowledge. Teach relevant support/implementation material before local assessment. If your local practical is in Week 10, schedule its required preparation before that date; later project teaching does not count retrospectively. Keep the general textbook calendar adaptable.</p><p><a href="readiness-checklist.csv" download>Download operation-by-operation evidence checklist</a></p><div class="table-wrap"><table><thead><tr><th>Year</th><th>Operation / evidence</th><th>Teach steps</th><th>Independent steps</th><th>Teacher record</th></tr></thead><tbody>'+matrix+'</tbody></table></div></section>'
write(OUT/'index.html','<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SQL learning pathway · CS ATAR</title><meta name="description" content="Sequenced Year 11 and Year 12 SQL practice with downloadable SQLite databases, changed independent tasks, executed expected results and troubleshooting."><link rel="stylesheet" href="../style.css"><link rel="stylesheet" href="pathway.css"></head><body><a class="skip" href="#main">Skip to SQL pathway</a><header><a href="../resources/">← Lesson resource hub</a><nav aria-label="SQL resources"><a href="../activities/databases-sql/">Condensed activity pack</a><a href="#help">Troubleshooting</a></nav></header><main id="main" tabindex="-1"><p class="eyebrow">READ · PREDICT · QUERY · CHECK · RETRY</p><h1>SQL learning pathway</h1><p class="lede">Learn each operation before it appears in assessment. Follow the Year 11 foundations, then extend them in Year 12.</p>'+provenance+'<div class="downloads"><a class="button" href="sql-student-pack.zip" download>Databases &amp; student workbook</a><a class="button secondary" href="sql-reference-pack.zip" download>Expected results &amp; references</a><button id="print-pathway">Print visible pathway</button></div><p>Choose a year to print its visible steps. Expand any table previews or answer sections you want included before printing.</p><p><a href="#start">Setup</a> · <a href="#tables">Table previews</a> · <a href="#checkpoint">Assessment readiness</a> · <a href="#help">Troubleshooting</a></p>'+setup+'<section id="tables"><h2>Inspect the supplied tables</h2><p>The changed dataset adds and changes records; open that database to inspect its full contents before the independent attempt. Download dictionaries and setup files are included in the student ZIP. Duration is a small supplementary numeric fixture for aggregate fluency.</p>'+previews+'</section><section class="pathway-controls" aria-label="Choose pathway"><label for="year">Show steps<select id="year"><option value="all">All years, support and enrichment</option><option value="11">Year 11 · Steps 01–08</option><option value="12">Year 12 core · Steps 09–16</option><option value="extension">Support / enrichment · Steps 17–18</option></select></label><p id="step-count" role="status"></p><nav class="step-links" aria-label="SQL steps">'+''.join('<a href="#step-'+s['id']+'">'+s['id']+' '+e(s['title'])+'</a>' for s in stages)+'</nav></section>'+''.join(cards)+checkpoints+troubleshooting+'<footer><p>Original formative resources · Content CC BY 4.0 · Code MIT · <a href="../licence.html">Reuse details</a>. Teacher review and classroom trials remain ongoing.</p></footer></main><script src="pathway.js"></script></body></html>')
write(OUT/'README.md','SQL pathway: '+DATA['basis']+'\n\nUse the live pathway for sequenced explanations, textbook links and expected result tables: https://edugenio.github.io/cs-atar-textbook/sql/\n\nThe student workbook and dictionaries work offline. Each exercise starts from a FRESH database: base for worked/guided, changed for independent. Open .sqlite directly OR run matching setup.sql once in an empty database. Enable foreign keys separately in every connection before a transaction. Scratch files are empty for CREATE practice. Model errors and constraint-failure tasks are deliberate; retain before/after evidence. The six-table seed.sql contains data only; author the schema from dictionary.md before loading it. Public SQL references/expected results are a separate download. SQLite is the chosen dialect; no code executes in this website. Teacher checkpoint: taught, changed independent attempt, feedback, fresh retry before assessment. Paper routes build reasoning but do not prove actual software enforcement.\n\nContent CC BY 4.0, original code MIT. See included licences.\n')
for teacher in [False,True]:
 with zipfile.ZipFile(OUT/('sql-reference-pack.zip' if teacher else 'sql-student-pack.zip'),'w',zipfile.ZIP_DEFLATED) as z:
  paths=[OUT/'README.md',OUT/'readiness-checklist.csv',OUT/('teacher-guide.md' if teacher else 'student-workbook.md')]
  if not teacher:paths+=[OUT/'independent-starters.sql']
  paths+=list((OUT/('queries' if teacher else 'data')).rglob('*'))
  if teacher:paths+=[OUT/'expected-results.json']+list((OUT/'results').rglob('*.csv'))
  contents={str(p.relative_to(OUT)).replace('\\','/'):p.read_bytes() for p in paths if p.is_file()}
  for name in ['LICENSE-CODE.txt','LICENSE-CONTENT.txt']:contents[name]=(ROOT/name).read_bytes()
  for name,body in sorted(contents.items()):
   info=zipfile.ZipInfo(name,(2026,10,31,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,body)
print('Built 18-step SQL pathway, 10 database fixtures and 54 executed reference exercises.')
