from pathlib import Path
from html.parser import HTMLParser
import zipfile,json,hashlib,re
D=Path('dist');O=D/'offline'
class Links(HTMLParser):
 def __init__(self):super().__init__();self.links=[]
 def handle_starttag(self,tag,attrs):
  for name,value in attrs:
   if name in ('src','href') and value:self.links.append(value)
p=Links();p.feed((O/'index.html').read_text(encoding='utf8'))
for link in p.links:
 if link.startswith(('#','https:','http:','data:')):continue
 assert (O/link.split('#')[0].split('?')[0]).exists(),link
manifest=json.loads((O/'manifest.json').read_text())
for item in manifest['files']:
 data=(O/item['name']).read_bytes();assert len(data)==item['bytes'];assert hashlib.sha256(data).hexdigest()==item['sha256']
with zipfile.ZipFile(O/'cs-atar-complete.zip') as z:
 assert len(z.namelist())==len(set(z.namelist()))
 assert z.testzip() is None
 assert 'offline/cs-atar-complete.zip' not in z.namelist()
 for name in ['index.html','sql/index.html','revision/index.html','teachers/index.html','offline/unit-1-reader.html','LICENSE-CONTENT.txt','offline/file-links.js']:assert name in z.namelist()
 for name in z.namelist():
  if name.endswith('.html'):
   assert 'file-links.js' in z.read(name).decode('utf8'),name
print('Offline ZIP integrity, licences, local navigation adapter, downloads and SHA-256 manifest passed.')
