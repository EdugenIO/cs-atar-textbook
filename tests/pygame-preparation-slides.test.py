"""S01: execute slide excerpts and independently check their stated lab outcomes."""
from pathlib import Path
import json,sys,io,tempfile,copy
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'dist/pygame'))
import lab_rules as rules
ids=['u1-w04-l02','u1-w05-l02','u1-w06-l02','u1-w07-l03']
lessons={l['id']:l for f in (ROOT/'slide-source').glob('unit*-week*.json') for l in json.loads(f.read_text(encoding='utf-8'))['lessons']}
allocation=json.loads((ROOT/'dist/pygame/allocation.json').read_text(encoding='utf-8'))[:4]
for id,a in zip(ids,allocation):
 l=lessons[id];assert l['title']==a['title'];assert l['pygameBridge']=='pygame/index.html#'+a['anchor'];assert len(l['slides'])==8;assert sum(s['minutes'] for s in l['slides'])==55
 assert 'faded_practice.py' in l['prepare'] and 'readiness.csv' in l['prepare']
 assert all(s.get('notes') and s.get('strategy') for s in l['slides'])
 assert any('independent' in s['strategy'].lower() for s in l['slides'])
# Window-loop excerpt consumes X and executes exactly one frame, then fails its condition.
class Stub:
 QUIT=99
 def __init__(self):self.event=self;self.display=self;self.flips=0
 def get(self):return [type('Event',(),{'type':99})()]
 def flip(self):self.flips+=1
p=Stub();scope={'running':True,'pygame':p,'clock':type('Clock',(),{'tick':lambda self,fps:250})()}
exec(lessons[ids[0]]['slides'][2]['code'],scope);assert scope['running'] is False and p.flips==1
assert 160*250/1000==40 and 160*500/1000==80
# Exported fresh-state excerpt returns independent lists and its documented values.
scope={};exec(lessons[ids[1]]['slides'][2]['code'],scope);one,two=scope['new_state'](),scope['new_state']();one['active'][0]=False;assert two['active']==[True,True]
s=rules.new_state();rules.command(s,'space');rules.update(s,1,250,collect=False);assert (s['x'],s['remaining'])==(358,19750)
rules.command(s,'space');before=copy.deepcopy(s);rules.update(s,1,95000,collect=False);assert s==before
rules.command(s,'reset');assert s==rules.new_state()
# Once-only excerpt: edge touch, one-pixel overlap and repeated contact.
code=lessons[ids[2]]['slides'][2]['code'];s=rules.new_state();scope={'rules':rules,'state':s,'player':(56,180,24,24)};exec(code,scope);assert s['score']==0
scope['player']=(57,180,24,24);exec(code,scope);exec(code,scope);assert s['score']==1 and s['active']==[False,True]
scope['player']=(520,180,24,24);exec(code,scope);assert s['score']==2
# Loader excerpt keeps valid lines and reports two malformed/out-of-range records.
scope={'source':io.StringIO('2\nthree\n1\n9\n'),'values':[],'warnings':[]};exec(lessons[ids[3]]['slides'][2]['code'],scope);assert scope['values']==[2,1] and len(scope['warnings'])==2
with tempfile.TemporaryDirectory(dir=ROOT/'tests') as folder:
 path=Path(folder)/'scores.txt';assert rules.load_history(path)==([],[]);path.write_text('',encoding='utf-8');assert rules.load_history(path)==([],[])
 state=rules.new_state();state.update(mode='finished',score=2);rules.save_result(state,path);rules.save_result(state,path);assert path.read_text()=='2\n'
 state=rules.new_state();state.update(mode='finished',score=1);message=rules.save_result(state,Path(folder));assert 'Not saved' in message and not state['saved'];rules.save_result(state,path);assert state['saved'] and path.read_text()=='2\n1\n'
# Timeout precedes collecting, even while overlapping.
s=rules.new_state();s.update(mode='playing',x=80.0,remaining=50);rules.update(s,0,50);assert s['mode']=='finished' and s['score']==0
print('S01: four lab mappings, quit event, time units, independent state, pause/reset, edge/once scoring, history validation, append-once, failed retry and timeout ordering passed.')
