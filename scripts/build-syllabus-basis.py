"""Preserve the 2026 foundation and explain the limited 2027 revision.

No bulk replacement of valid historical links. Current downloads carry the same
comparison note as the reader; historical/legacy bundles are left dated.
"""
from pathlib import Path
import json, zipfile

ROOT=Path(__file__).resolve().parents[1]
DIST=ROOT/'dist'
foundation='https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF'
revision='https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0005/1273190/Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-2027.PDF'
note=(ROOT/'curriculum-source/syllabus-basis.md').read_text(encoding='utf-8')
(DIST/'syllabus-basis.md').write_text(note,encoding='utf-8',newline='\n')
data=json.loads((ROOT/'curriculum-source/source-registry.json').read_text(encoding='utf-8'))
data['foundation']={'year':2026,'year12URL':foundation,'revisionYear':2027,'revisionURL':revision,'comparison':'syllabus-basis.md','checked':'31 October 2026','finding':'Manual section comparison found no substantive technical, school-assessment or examination-design change. Rationale, aims, capabilities, terminology and layout revised. Not a character-level diff.'}
(ROOT/'curriculum-source/source-registry.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
# Keep the official title/year intact; explain older references rather than deleting them.
marker='<!-- syllabus-basis-2026-2027 -->'
prefix=marker+'\n> **Syllabus basis:** 2026 foundation with 2027 revisions. Valid 2026 technical references are retained; use the applicable official edition for the teaching year. [Comparison and limits](syllabus-basis.md).\n\n'
for path in DIST.glob('*.md'):
    if path.name=='syllabus-basis.md' or 'coverage' in path.name:continue
    text=path.read_text(encoding='utf-8')
    if foundation in text and marker not in text:
        path.write_text(prefix+text,encoding='utf-8',newline='\n')
# Refresh current root learning packs from their published sibling files. Add the
# note to other current bundles without modifying their historical references.
for path in DIST.glob('*.zip'):
    if any(part in {'legacy-projects','audits'} for part in path.parts) or 'coverage' in path.name:continue
    with zipfile.ZipFile(path) as archive:
        entries=[(info,archive.read(info.filename)) for info in archive.infolist() if info.filename!='syllabus-basis.md']
    with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as archive:
        for info,body in entries:
            sibling=path.parent/info.filename
            if sibling.is_file() and sibling.suffix in {'.md','.csv','.json','.py','.sql','.txt'}:
                body=sibling.read_bytes()
            archive.writestr(info,body)
        info=zipfile.ZipInfo('syllabus-basis.md',(2026,10,31,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED
        archive.writestr(info,note.encode('utf-8'))
print('Preserved 2026 references; added the 2027 revision comparison to current learning downloads.')
