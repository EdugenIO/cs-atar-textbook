"""Execute worked/reference code and check reproducible student/key archives."""
from pathlib import Path
import ast,contextlib,io,json,zipfile
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'dist/activities/programming-foundations'

def execute(path,values=None,inputs=()):
    tree=ast.parse(path.read_text(encoding='utf-8'));values=values or {}
    for node in tree.body:
        if isinstance(node,ast.Assign) and len(node.targets)==1 and isinstance(node.targets[0],ast.Name) and node.targets[0].id in values:
            node.value=ast.Constant(values[node.targets[0].id])
    ast.fix_missing_locations(tree);pending=iter(inputs);capture=io.StringIO()
    namespace={'input':lambda prompt='':next(pending)}
    with contextlib.redirect_stdout(capture):exec(compile(tree,str(path),'exec'),namespace)
    return capture.getvalue().strip()

starters=OUT/'starters';refs=OUT/'teacher-reference'
assert len(list(starters.glob('*.py')))==8 and len(list(refs.glob('*.py')))==5
for path in [*starters.glob('*.py'),*refs.glob('*.py')]:
    tree=ast.parse(path.read_text(encoding='utf-8'))
    assert not any(isinstance(n,(ast.For,ast.While,ast.FunctionDef,ast.ClassDef,ast.Try,ast.Import,ast.ImportFrom)) for n in ast.walk(tree)),path.name+' keeps the taught prerequisite scope'
assert execute(starters/'02_badge_worked.py',inputs=['4'])=='Total: $12'
assert execute(starters/'04_trace_worked.py')=='10'
assert execute(starters/'05_conditions_worked.py')=='False'
assert execute(starters/'06_nested_worked.py')=='not authorised'
for n,expected in [(0,1),(1,5),(3,13)]:assert execute(refs/'02_ticket_solution.py',inputs=[str(n)])==f'Total: ${expected}'
for n,expected in [(49,5),(50,0),(51,0)]:assert execute(refs/'06_selection_solution.py',{'order_total':n})==str(expected)
for command,staff,expected in [('SHOW',False,'summary'),('SHOW',True,'full report'),('HIDE',True,'unknown')]:
    assert execute(refs/'06_nested_transfer.py',{'command':command,'staff':staff})==expected
for raw,expected in [(' start ','Start requested'),('Stop','Stop requested'),('STATUS','Status requested'),('   ','Unknown command'),('ST ART','Unknown command'),('???','Unknown command')]:
    assert execute(refs/'07_menu_solution.py',inputs=[raw])==expected
for n in [0,1,3,5,6]:
    assert execute(refs/'08_boundary_fixed.py',{'rating':n})==str(1<=n<=5)
    assert execute(starters/'08_boundary_fault.py',{'rating':n})==str(1<n<5)
for filename,folder,pdf in [('student-pack.zip',starters,'student.pdf'),('teacher-reference.zip',refs,'teacher.pdf')]:
    with zipfile.ZipFile(OUT/filename) as z:
        assert z.testzip() is None
        assert z.read(pdf)==(OUT/pdf).read_bytes()
        for p in folder.glob('*.py'):assert z.read(folder.name+'/'+p.name)==p.read_bytes()
        if filename.startswith('student'):
            assert not any('teacher' in n for n in z.namelist())
            assert 'syllabus-basis.md' in z.namelist()
print('Worked Python, five teacher references, menu/boundary transfer cases and current student/key ZIP contents passed.')
