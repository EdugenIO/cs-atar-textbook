"""Publish the authored Week 1 companion without generating student evidence."""
from pathlib import Path
import shutil, zipfile
R=Path(__file__).resolve().parents[1]
S=R/'teaching-source/unit3-week1-practice'
D=R/'dist/slides/practice/u3-week1'
D.mkdir(parents=True,exist_ok=True)
for path in S.rglob('*'):
    if not path.is_file() or '__pycache__' in path.parts:continue
    dest=D/path.relative_to(S);dest.parent.mkdir(parents=True,exist_ok=True)
    dest.write_bytes(path.read_text(encoding='utf8').replace('\r\n','\n').encode('utf8'))
with zipfile.ZipFile(D/'unit3-week1-practice.zip','w',zipfile.ZIP_DEFLATED) as z:
    for path in sorted(S.rglob('*')):
        if path.is_file() and '__pycache__' not in path.parts:
            entry=zipfile.ZipInfo(path.relative_to(S).as_posix(),(2026,11,9,0,0,0))
            entry.create_system=3;entry.external_attr=0o100644<<16
            z.writestr(entry,(D/path.relative_to(S)).read_bytes(),compress_type=zipfile.ZIP_DEFLATED)
print('Published Unit 3 Week 1 workbook, separate public key, recovery seed and blank evidence record.')
