"""Rebuild the first-four-priorities additions after other content generators."""
from pathlib import Path
import subprocess,sys
ROOT=Path(__file__).resolve().parents[1]
for script in ['build-lesson-checks.py','build-editorial-review.py','build-syllabus-basis.py','build-curriculum-map.py']:
    subprocess.run([sys.executable,str(ROOT/'scripts'/script)],cwd=ROOT,check=True)
