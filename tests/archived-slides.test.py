"""Archived standalone decks keep their warning when copied away from the site."""
from pathlib import Path
import json, re, zipfile, xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
NS = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
archive = json.loads((ROOT/'slide-source/legacy-console-projects.json').read_text(encoding='utf-8'))
ids = json.loads((ROOT/'dist/project-alignment.json').read_text(encoding='utf-8'))['legacySlideIds']
assert len(ids) == 10

def text(xml):
    return '\n'.join(ET.fromstring(xml).itertext())

def normal(value):
    return re.sub(r'\s+', ' ', value).strip()

for ident in ids:
    lesson = next(l for l in archive['lessons'] if l['id'] == ident)
    replacement = 'https://edugenio.github.io/cs-atar-textbook/slides/?lesson='+ident
    with zipfile.ZipFile(ROOT/f'dist/legacy-projects/slides/{ident}.pptx') as deck:
        slides = sorted(n for n in deck.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml', n))
        notes = sorted(n for n in deck.namelist() if re.fullmatch(r'ppt/notesSlides/notesSlide\d+\.xml', n))
        assert len(slides) == len(notes) == len(lesson['slides']) == 8
        cover = text(deck.read(slides[0]))
        assert 'ARCHIVED CONSOLE PRACTICE' in cover and replacement in cover
        assert 'current project uses Pygame' in cover
        for number, original in enumerate(lesson['slides'], 1):
            xml = deck.read(f'ppt/slides/slide{number}.xml')
            content = normal(text(xml))
            assert 'ARCHIVED' in content
            required = [original['title'], *original.get('body', [])]
            if original.get('code'): required.append(original['code'])
            for row in original.get('table', []): required.extend(row)
            for value in required:
                assert normal(value) in content, (ident, number, value)
            note = text(deck.read(f'ppt/notesSlides/notesSlide{number}.xml'))
            assert 'ARCHIVED CONSOLE PRACTICE' in note and replacement in note
            assert 'Do not combine these requirements or deadlines' in note
            assert normal(original['notes']) in normal(note)
    with zipfile.ZipFile(ROOT/f'dist/slides/{ident}.pptx') as current:
        assert 'ARCHIVED CONSOLE PRACTICE' not in text(current.read('ppt/slides/slide1.xml'))

print('S03: ten standalone archive covers, 80 persistent footers/notes, exact replacement routes, original teaching content and current-deck separation verified.')
