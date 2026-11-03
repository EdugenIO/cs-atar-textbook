"""Execute the selection lesson's stated normal, boundary and invalid cases."""
from pathlib import Path
import json,subprocess,sys
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'teaching-source/selection-lesson.json').read_text(encoding='utf8'))
for field,cases,name in [('worked','workedCases','age'),('solution','practiceCases','quantity'),('retry','retryCases','balance')]:
    for value,expected in data[cases]:
        lines=data[field].splitlines();lines[0]=f'{name} = {value}'
        result=subprocess.run([sys.executable,'-B','-c','\n'.join(lines)],capture_output=True,text=True,check=True)
        assert result.stdout.strip()==expected,(field,value,result.stdout)
for filename,key in [('worked.py','worked'),('starter.py','starter')]:
    assert (root/'dist/lessons/selection'/filename).read_text(encoding='utf8')==data[key]
student=(root/'dist/lessons/selection/student-lesson.md').read_text(encoding='utf8')
assert data['solution'].strip() not in student
assert data['retry'].strip() not in student
print('Focused selection lesson: 12 executed decision cases; downloads and student/answer separation passed.')
