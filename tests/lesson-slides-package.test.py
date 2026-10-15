from pathlib import Path
import json,zipfile,xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'slide-source/unit1-week1.json').read_text(encoding='utf-8'))
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
            notes=ET.fromstring(deck.read(f'ppt/notesSlides/notesSlide{number}.xml'))
            assert source['notes'] in ''.join(node.text or '' for node in notes.findall('.//a:t',ns))
            assert source['strategy'] in ''.join(node.text or '' for node in notes.findall('.//a:t',ns))
print('32 native slide titles, editable text/tables and speaker notes verified.')
