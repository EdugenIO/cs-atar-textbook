from pathlib import Path
from html import escape
ROOT=Path(__file__).resolve().parents[1]
p=ROOT/'teaching-source/technical-accuracy-review.md';text=p.read_text(encoding='utf8');(ROOT/'dist/technical-accuracy-review.md').write_text(text,encoding='utf8',newline='\n');blocks=[]
for part in text.split('\n\n'):
 if part.startswith('# '):blocks.append('<h1>'+escape(part[2:])+'</h1>')
 elif part.startswith('## '):blocks.append('<h2>'+escape(part[3:])+'</h2>')
 elif part.startswith('- '):
  rows=[]
  for line in part.splitlines():
   value=escape(line[2:]);marker=value.find('https://')
   if marker>=0:
    url=value[marker:];value=value[:marker]+'<a href="'+url+'">'+url+'</a>'
   rows.append('<li>'+value+'</li>')
  blocks.append('<ul>'+''.join(rows)+'</ul>')
 else:blocks.append('<p>'+escape(part)+'</p>')
(ROOT/'dist/technical-accuracy.html').write_text('<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Technical accuracy review · CS ATAR</title><link rel="stylesheet" href="style.css"><style>main{max-width:950px;margin:auto}li{margin-block:12px}a{overflow-wrap:anywhere}@media print{header,.no-print{display:none}}</style></head><body><a class="skip" href="#main">Skip to review</a><header><a href="index.html#audits">← Coverage and audits</a><nav aria-label="Textbook"><a href="index.html#contents">Contents</a><a href="revision/">Revision</a></nav></header><main id="main" tabindex="-1"><p class="eyebrow">TECHNICAL REVIEW · 2026 FOUNDATION · 2027 REVISIONS</p>'+''.join(blocks)+'<p><a href="technical-accuracy-review.md" download>Download the review (Markdown text)</a> · <a href="https://github.com/EdugenIO/cs-atar-textbook/blob/main/tests/technical-accuracy.test.py">View independent checks on GitHub</a></p><footer><p>Original textbook review CC BY 4.0; code MIT. <a href="licence.html">Reuse details</a>.</p></footer></main></body></html>\n',encoding='utf8',newline='\n')
