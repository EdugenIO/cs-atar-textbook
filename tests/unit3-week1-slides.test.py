"""Check actual Week 1 code, separate recovery and published resources."""
from pathlib import Path
import contextlib,hashlib,importlib.util,io,json,re,shutil,subprocess,sys,tempfile,zipfile
R=Path(__file__).resolve().parents[1]
d=json.loads((R/'slide-source/unit3-week1.json').read_text(encoding='utf8'))
assert d['unit']==3 and d['week']==1 and d['teachingEdition']=='2027'
for number,l in enumerate(d['lessons'],1):
 assert l['id']==f'u3-w01-l0{number}' and len(l['slides'])==8
 assert sum(s['minutes'] for s in l['slides'])==55
 assert 'unaided' in json.dumps(l).lower() or 'independent' in json.dumps(l).lower()
 assert (R/'dist/slides'/f'{l["id"]}.pptx').is_file()
 assert 'Week 1 practical resources' in (R/'dist/slides/notes'/f'{l["id"]}.html').read_text(encoding='utf8')
# Execute the authored diagnostic and changed cases, not only copied expected text.
env={};exec(d['lessons'][0]['slides'][1]['code'],env)
count=env['count_ready']
for values,expected in [([3,5,8],2),([],0),([5],1),([5,5],2),([4,5,7],2)]:assert count(values)==expected
workbook=(R/'dist/slides/practice/u3-week1/student-workbook.md').read_text(encoding='utf8')
code=next(c for c in re.findall(r'```python\n(.*?)```',workbook,re.S) if 'def count_at_least' in c)
env={};exec(code,env);count=env['count_at_least']
for values,minimum,expected in [([6,2,9,6],6,3),([],6,0),([5,6,7],6,2),([5],6,0),([6],6,1),([7],6,1),([6,6],6,2),([4,5,7],5,2),([7,8,9,8],8,3),([],8,0),([8,8],8,2)]:assert count(values,minimum)==expected
try:compile('if value >= 5\n    pass','<fault>','exec')
except SyntaxError:pass
else:raise AssertionError('Missing colon should fail parsing')
try:int('two')
except ValueError:pass
else:raise AssertionError('Malformed integer should fail conversion')
spec=importlib.util.spec_from_file_location('week1_rules',R/'dist/pygame/lab_rules.py');rules=importlib.util.module_from_spec(spec);spec.loader.exec_module(rules)
state=rules.new_state();rules.command(state,'space');rules.update(state,1,250,collect=False)
assert state['x']==358 and state['remaining']==19750 and state['score']==0
rules.command(state,'space');before=state.copy();rules.update(state,1,90000,collect=False);assert state==before
rules.command(state,'reset');assert state==rules.new_state()
with tempfile.TemporaryDirectory() as tmp:
 tmp=Path(tmp)
 with zipfile.ZipFile(R/'dist/slides/practice/u3-week1/unit3-week1-practice.zip') as z:z.extractall(tmp/'pack')
 assert 'teacher-key.md' in z.namelist() # Explicitly public and separate, not a secure student pack.
 for folder in ['snapshot-v1','working-v2']:shutil.copytree(tmp/'pack/seed-v1',tmp/folder)
 def run(folder):return subprocess.check_output([sys.executable,'-B','check.py'],cwd=folder,text=True)
 original=run(tmp/'snapshot-v1');assert 'Version: 1 Minimum: 5' in original and 'Actual: 2' in original
 p=tmp/'working-v2/rules.py';p.write_text(p.read_text().replace('VERSION = 1','VERSION = 2').replace('MINIMUM = 5','MINIMUM = 6'))
 p=tmp/'working-v2/check.py';p.write_text(p.read_text().replace('expected = 2','expected = 1'))
 assert 'Version: 2 Minimum: 6' in run(tmp/'working-v2')
 saved={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in (tmp/'working-v2').glob('*') if p.is_file()}
 shutil.copytree(tmp/'snapshot-v1',tmp/'restored-v1')
 restored=run(tmp/'restored-v1');assert str(tmp/'restored-v1/rules.py') in restored and 'Actual: 2' in restored
 assert 'Actual: 1' in run(tmp/'working-v2')
 assert saved=={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in (tmp/'working-v2').glob('*') if p.is_file()}
 history=tmp/'history.txt';history.write_text('0\n2\nbad\n3\n');values,warnings=rules.load_history(history);assert values==[0,2] and len(warnings)==2
with zipfile.ZipFile(R/'dist/slides/unit3-week1-lesson-slides.zip') as z:
 for l in d['lessons']:assert z.read(l['id']+'.pptx')==(R/'dist/slides'/f'{l["id"]}.pptx').read_bytes()
 assert z.read('unit3-week1-practice.zip')==(R/'dist/slides/practice/u3-week1/unit3-week1-practice.zip').read_bytes()
 assert z.read('pygame-teaching-pack.zip')==(R/'dist/pygame/pygame-teaching-pack.zip').read_bytes()
status=json.loads((R/'dist/resource-status.json').read_text(encoding='utf8'))
for n in range(1,5):assert next(l for l in status['lessons'] if l['id']==f'u3-w01-l0{n}')['status']=='Available'
assert next(l for l in status['lessons'] if l['id']=='u3-w02-l01')['status']=='Not yet supplied'
print('S07 batch 1: four allocated decks, diagnostic/transfer outputs, Pygame timing/history, actual separate restore and current-version retest, resource and bundle identity passed.')
