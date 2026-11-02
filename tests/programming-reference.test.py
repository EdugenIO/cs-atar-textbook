"""Execute every downloadable reference example; test algorithm edge cases."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import contextlib, io, json, runpy, subprocess, sys, tempfile
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'dist/reference/topics.json').read_text(encoding='utf-8'))
chapters={c['id'] for c in json.loads((root/'dist/resources/catalogue.json').read_text(encoding='utf-8'))}
assert len(data)>=28
assert len({t['id'] for t in data})==len(data)
for t in data:
    assert t['chapter'] in chapters, t['chapter']
    file=root/'dist/reference/examples'/ ('reference-'+t['id']+'.py')
    with tempfile.TemporaryDirectory(dir=root) as directory:
        result=subprocess.run([sys.executable,'-B',str(file)],cwd=directory,capture_output=True,text=True,check=True)
        assert result.stdout.strip()==t['expected'], (t['id'],result.stdout,t['expected'])
    for page in ['python','pseudocode']:
        text=(root/f'dist/reference/{page}.html').read_text(encoding='utf-8')
        assert 'id="'+t['id']+'"' in text
with contextlib.redirect_stdout(io.StringIO()):
    linear=runpy.run_path(str(root/'dist/reference/examples/reference-linear-search.py'))['linear_search']
    binary=runpy.run_path(str(root/'dist/reference/examples/reference-binary-search.py'))['binary_search']
    bubble=runpy.run_path(str(root/'dist/reference/examples/reference-bubble-sort.py'))['bubble_sort']
    selection=runpy.run_path(str(root/'dist/reference/examples/reference-selection-sort.py'))['selection_sort']
    insertion=runpy.run_path(str(root/'dist/reference/examples/reference-insertion-sort.py'))['insertion_sort']
for values in [[],[1],[1,1],[-3,0,2,9]]:
    for target in [-5,1,2,9,20]:
        for search in [linear,binary]:
            index=search(values,target)
            assert (index==-1 and target not in values) or (index>=0 and values[index]==target)
for values in [[],[1],[3,3],[-1,-9,0],[4,3,2,1],[1,2,3]]:
    for sort in [bubble,insertion,selection]:
        copy=values.copy()
        result=sort(copy)
        assert result is copy and result==sorted(values)
class Links(HTMLParser):
    def __init__(self):
        super().__init__(); self.links=[]; self.ids=[]
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if 'id' in attrs:self.ids.append(attrs['id'])
        if tag=='a' and 'href' in attrs:self.links.append(attrs['href'])
for page in (root/'dist/reference').glob('*.html'):
    parsed=Links();parsed.feed(page.read_text(encoding='utf-8'))
    assert len(parsed.ids)==len(set(parsed.ids))
    for href in parsed.links:
        url=urlsplit(href)
        if url.scheme or url.netloc:continue
        target=(page.parent/unquote(url.path)).resolve() if url.path else page
        assert target.exists(),href
        if url.fragment and target==page:assert unquote(url.fragment) in parsed.ids,href
print(f'Programming references: {len(data)} outputs verified; search/sort edge cases and local links passed.')
