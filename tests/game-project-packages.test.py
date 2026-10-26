"""Check equivalent challenge and usable assessment fixtures, without solving games."""
from pathlib import Path
import ast,csv,io,json,zipfile
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'assessment-source/catalogue.json').read_text(encoding='utf-8'))
def rows(blob):return list(csv.reader(io.StringIO(blob.decode('utf-8'))))
for year in data['years']:
    shared=None
    for op in year['tasks'][0]['options']:
        key=f"y{year['year']}-t1-{op['id']}"
        with zipfile.ZipFile(root/'dist/assessments'/f'{key}-starter.zip') as z:
            assert z.testzip() is None
            assert 'LICENSE-CODE.txt' in z.namelist()
            # Theme/README/brief are the only permitted scenario differences.
            core={n:z.read(n) for n in z.namelist() if n.startswith('starter/') and n not in ['starter/theme.json','starter/README.md']}
            if shared is None:shared=core
            else:assert core==shared,'Themes must share code, rules, rubric and fixture data'
            for n in z.namelist():
                if n.endswith('.py'):ast.parse(z.read(n).decode('utf-8'))
                if n.endswith('.csv'):
                    parsed=rows(z.read(n));assert parsed and all(len(r)==len(parsed[0]) for r in parsed),n
            config=json.loads(z.read('starter/runtime-config.json'))
            assert (config['lives'],config['seconds_per_map'],config['collectibles_per_map'],config['hazards_per_map'])==(3,90,5,3)
            if year['year']==11:
                entities=list(csv.DictReader(io.StringIO(z.read('starter/arena.csv').decode('utf-8'))))
                assert sum(r['kind']=='item' for r in entities)==5
                assert sum(r['kind']=='hazard' for r in entities)==3
                for r in entities:
                    x,y,w,h=[int(r[k]) for k in ['x','y','width','height']]
                    assert 0<=x<x+w<=800 and 0<=y<y+h<=600
            else:
                entities=list(csv.DictReader(io.StringIO(z.read('starter/entities.csv').decode('utf-8'))))
                for m in [1,2]:
                    grid=[[int(c) for c in r] for r in rows(z.read(f'starter/map{m}.csv'))]
                    assert len(grid)==8 and all(len(r)==10 for r in grid)
                    assert all(c in [0,1,2,3] for r in grid for c in r)
                    starts=[(r,c) for r in range(8) for c in range(10) if grid[r][c]==2]
                    exits=[(r,c) for r in range(8) for c in range(10) if grid[r][c]==3]
                    assert len(starts)==len(exits)==1
                    reachable=set(starts);todo=list(starts)
                    while todo:
                        r,c=todo.pop()
                        for dr,dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                            p=(r+dr,c+dc)
                            if 0<=p[0]<8 and 0<=p[1]<10 and grid[p[0]][p[1]]!=1 and p not in reachable:
                                reachable.add(p);todo.append(p)
                    assert exits[0] in reachable,'Map exit must be reachable'
                    relevant=[r for r in entities if int(r['map'])==m]
                    assert sum(r['kind']=='item' for r in relevant)==5
                    assert sum(r['kind']=='hazard' for r in relevant)==3
                    assert len({(r['row'],r['column']) for r in relevant})==8
                    assert all((int(r['row']),int(r['column'])) in reachable for r in relevant)
for old in ['y11-t1-puzzle','y11-t1-queue','y12-t1-warehouse']:
    assert not (root/'dist/assessments'/f'{old}-starter.zip').exists()
with zipfile.ZipFile(root/'dist/assessments/assessment-planning-2027.zip') as z:
    assert not any('y11-t1-queue' in n or 'y12-t1-warehouse' in n for n in z.namelist())
print('Ten equivalent game packs: code/data/rubric equality, syntax, bounded fixtures and reachable maps passed.')
