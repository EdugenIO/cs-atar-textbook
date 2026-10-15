from pathlib import Path
import json,zipfile,xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1]
data={'lessons':[lesson for file in sorted((root/'slide-source').glob('unit*-week*.json')) for lesson in json.loads(file.read_text(encoding='utf-8'))['lessons']]}
ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
for lesson in data['lessons']:
    with zipfile.ZipFile(root/'dist/slides'/f'{lesson["id"]}.pptx') as deck:
        assert deck.testzip() is None
        for number,source in enumerate(lesson['slides'],1):
            slide=ET.fromstring(deck.read(f'ppt/slides/slide{number}.xml'))
            title=slide.find('./p:cSld/p:spTree/p:sp',ns)
            assert title.find('p:nvSpPr/p:nvPr/p:ph',ns).get('type')=='title'
            assert ''.join(node.text or '' for node in title.findall('.//a:t',ns))==source['title']
            assert len(slide.findall('.//a:tbl',ns))==(1 if 'table' in source else 0)
            assert not slide.findall('.//p:pic',ns),'Content should remain native/editable'
            text=''.join(node.text or '' for node in slide.findall('.//a:t',ns))
            for line in source.get('body',[]):
                assert line in text,'Student instructions must survive export'
            for row in source.get('table',[]):
                for cell in row:
                    assert cell in text,'Table content must survive export'
            if source.get('diagram'):
                for label in source['diagram']['labels']:
                    assert label in text, 'Diagram labels must remain editable'
                shapes=slide.findall('.//p:sp',ns)
                assert len([s for s in shapes if s.find('p:nvSpPr/p:cNvPr',ns).get('name','') in {'ER entity Category','ER entity Equipment','ER entity Borrower','ER entity Loan'}])==4
                assert len([r for r in slide.findall('.//a:rPr',ns) if r.get('u')=='sng'])>=4
            notes=ET.fromstring(deck.read(f'ppt/notesSlides/notesSlide{number}.xml'))
            assert source['notes'] in ''.join(node.text or '' for node in notes.findall('.//a:t',ns))
            assert source['strategy'] in ''.join(node.text or '' for node in notes.findall('.//a:t',ns))
print('576 native slide titles, editable text/tables and speaker notes verified.')







with zipfile.ZipFile(root / "dist/slides/unit1-all-lesson-slides.zip") as bundle:
    assert bundle.testzip() is None
    names = [n for n in bundle.namelist() if n.endswith(".pptx")]
    assert len(names) == 64
    for name in names:
        assert bundle.read(name) == (root / "dist/slides" / name).read_bytes()
print("Complete Unit 1 download matches all 64 published PowerPoints.")


with zipfile.ZipFile(root / "dist/slides/unit2-week1-lesson-slides.zip") as bundle:
    assert bundle.testzip() is None
    names = [n for n in bundle.namelist() if n.endswith(".pptx")]
    assert sorted(names) == [f"u2-w01-l0{n}.pptx" for n in range(1,5)]
    for name in names:
        assert bundle.read(name) == (root / "dist/slides" / name).read_bytes()
print("Unit 2 Week 1 download matches all four published PowerPoints.")

with zipfile.ZipFile(root / "dist/slides/unit2-week2-lesson-slides.zip") as bundle:
    assert bundle.testzip() is None
    names = [n for n in bundle.namelist() if n.endswith(".pptx")]
    assert sorted(names) == [f"u2-w02-l0{n}.pptx" for n in range(1,5)]
    for name in names:
        assert bundle.read(name) == (root / "dist/slides" / name).read_bytes()
print("Unit 2 Week 2 pack matches four published PowerPoints.")
