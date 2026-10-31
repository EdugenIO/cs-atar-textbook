"""Build four original activity packs; --pdf regenerates the checked print masters."""
from pathlib import Path
from html import escape
import argparse,hashlib,json,zipfile

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'activity-source/extended-packs.json'
PACKS=json.loads(SOURCE.read_text(encoding='utf-8'))
DIGEST=hashlib.sha256(SOURCE.read_bytes()).hexdigest()
e=lambda s:escape(str(s))
def write(path,text):path.write_text(text.rstrip()+'\n',encoding='utf-8',newline='\n')
def block(b):
 k=b['type']
 if k=='p':return '<p>'+e(b['text'])+'</p>'
 if k=='heading':return '<h4>'+e(b['text'])+'</h4>'
 if k=='code':return '<pre><code>'+e(b['text'])+'</code></pre>'
 if k=='workspace':return '<div class="workspace" aria-label="Writing space">'+('<div class="writing-line"></div>'*b['lines'])+'</div>'
 if k=='table':return '<div class="table-wrap"><table><thead><tr>'+''.join('<th scope="col">'+e(h)+'</th>' for h in b['headers'])+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+e(v)+'</td>' for v in row)+'</tr>' for row in b['rows'])+'</tbody></table></div>'
 raise ValueError(k)

def sheets(l):
 practice=[dict(b,lines=b['lines']+2) if b['type']=='workspace' else b for b in l['practice']]
 return [dict(title='Read, predict and model',blocks=l['worked']+[dict(type='heading',text='Equipment-free route'),dict(type='p',text=l['offline']),dict(type='heading',text='Explain and transfer'),dict(type='p',text='Annotate one step of the worked example in your own words. Change one supplied input, record a new prediction and show how the rule produces it. Label a hand trace separately from a software observation.'),dict(type='workspace',lines=6)]),dict(title='Independent practice and evidence',blocks=practice)]

def webpage(p,out,teacher=False):
 title=p['title']+(' · teacher answers' if teacher else '')
 articles=[];page=0;total=len(p['lessons'])*(1 if teacher else 2)
 for l in p['lessons']:
  pages=[]
  source=[{'title':'Explained answers and feedback','blocks':sum(([{'type':'heading','text':h},{'type':'p','text':t}] for h,t in l['key']),[])}] if teacher else sheets(l)
  for i,s in enumerate(source):
   page+=1
   reading='<div class="reading"><strong>Textbook visit:</strong> <a href="../../#'+e(l['chapter'])+'">Read the linked chapter</a>. Return to its worked examples before trying the independent task.</div>' if not teacher and i==0 else ''
   pages.append('<section class="worksheet-sheet"><div class="sheet-banner"><p class="eyebrow">CS ATAR · '+e(p['title'])+' · '+('TEACHER' if teacher else 'STUDENT')+'</p><h2>'+l['id']+' · '+e(l['title'])+'</h2></div><h3>'+e(s['title'])+'</h3>'+('' if teacher else '<p class="identity">Name __________________ Class ______ Date __________</p>')+reading+''.join(block(b) for b in s['blocks'])+'<footer class="sheet-footer">Activity '+l['id']+' · Page '+str(page)+' / '+str(total)+' · CC BY 4.0</footer></section>')
  articles.append('<article class="pack-lesson" data-lesson="'+l['id']+'" id="lesson-'+l['id']+'"><div class="lesson-heading"><p class="eyebrow">ACTIVITY '+l['id']+'</p><h2>'+e(l['title'])+'</h2><p>'+e(l['intention'])+'</p></div>'+''.join(pages)+'</article>')
 options='<option value="all">All activities</option>'+''.join('<option value="'+l['id']+'">'+l['id']+' · '+e(l['title'])+'</option>' for l in p['lessons'])
 actions=('<a class="button" href="teacher.pdf" download>Teacher PDF</a><a class="button secondary" href="teacher-pack.zip" download>Teacher download pack</a><a href="index.html">Student activities</a>' if teacher else '<a class="button" href="student.pdf" download>Student PDF</a><a class="button secondary" href="student-pack.zip" download>Offline student pack &amp; files</a><a href="teacher.html">Teacher answers</a>')
 html='<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+e(title)+' · CS ATAR</title><link rel="stylesheet" href="../../style.css"><link rel="stylesheet" href="../programming-foundations/pack.css"></head><body><a class="skip" href="#main">Skip to activities</a><header class="pack-header"><a href="../../resources/">← Lesson resource hub</a><a href="../">All activity packs</a></header><main id="main"><section class="pack-intro"><p class="eyebrow">GENERAL CLASSROOM PRACTICE · UNIT '+str(p['unit'])+' ENTRY POINT</p><h1>'+e(title)+'</h1><p class="lede">'+str(len(p['lessons']))+' sequenced activities with worked examples, independent practice and an equipment-free route.</p><div class="pack-downloads">'+actions+'</div><p><strong>Before starting:</strong> '+e(p['prerequisites'])+'</p><p>Suggested 55-minute lesson: 8 minutes textbook reading, 12 modelling, 20 independent practice, 10 feedback and 5 exit reflection. Adapt after classroom trial. Keep predictions separate from observed results. Paper traces are valid practice but do not prove that software or equipment ran.</p><p>2026 foundation · 2027 revisions. Public, ungraded formative practice; answers are on a separate page. No student responses are collected. Optional specialist equipment can supply a context after the general task; it is not required.</p><div class="print-toolbar"><label for="lesson-select">Choose activity<select id="lesson-select">'+options+'</select></label><button id="print-selected" type="button" disabled>Print selected activity</button><button id="print-all" type="button">Print all pages</button></div><p class="print-help">A4 portrait · 100% scale · turn off browser headers/footers. The PDF has a checked fixed layout. Without JavaScript, use the PDF or browser Print for all activities.</p></section>'+''.join(articles)+'<footer class="pack-footer"><p>Original activities · 31 October 2026 · Content CC BY 4.0; original code MIT. <a href="../../licence.html">Reuse details</a>. Teacher review and classroom trials remain ongoing.</p><p>Technical references: '+ ' · '.join('<a href="'+e(url)+'">'+e(url.split('/')[2])+': documentation</a>' for url in p['references'])+'</p></footer></main><script src="../programming-foundations/pack.js"></script></body></html>'
 if p['id']=='databases-sql':
  html=html.replace('<div class="print-toolbar">','<p class="notice"><a href="../../sql/">Follow the full SQL learning pathway</a> for the Year 11 / Year 12 sequence, changed databases, expected results and assessment readiness. This condensed pack mixes foundations with later material: Activity 05 grouped reports belong after the Year 11 whole-result aggregate work; its HAVING task is a supporting extension.</p><div class="print-toolbar">')
 write(out/('teacher.html' if teacher else 'index.html'),html)

def pdfs(p,out):
 from reportlab.pdfgen import canvas
 from reportlab.lib.pagesizes import A4
 from reportlab.lib.styles import ParagraphStyle
 from reportlab.lib import colors
 from reportlab.platypus import Paragraph,Preformatted,Table,TableStyle,Spacer
 W,H=A4;M=40;FW=W-M*2
 clean=lambda s:s.replace('→','->').replace('–','-').replace('—','-').replace('·',' | ').replace('é','é')
 styles={k:ParagraphStyle(k,fontName=font,fontSize=size,leading=leading,textColor=colors.HexColor('#183c30'),spaceAfter=space) for k,font,size,leading,space in [('body','Helvetica',10,13.5,6),('small','Helvetica',8,10,4),('h','Helvetica-Bold',11,14,7),('title','Helvetica-Bold',18,21,8),('cell','Helvetica',8.2,10,0)]}
 def para(t,k='body'):return Paragraph(e(clean(str(t))),styles[k])
 for teacher in [False,True]:
  cv=canvas.Canvas(str(out/('teacher.pdf' if teacher else 'student.pdf')),pagesize=A4,invariant=1)
  cv.setTitle(p['title']+(' - teacher answers' if teacher else ' - student workbook'));cv.setAuthor('CS ATAR Classroom Textbook')
  number=0;total=len(p['lessons'])*(1 if teacher else 2)
  for l in p['lessons']:
   source=[{'title':'Explained answers and feedback','blocks':sum(([{'type':'heading','text':h},{'type':'p','text':t}] for h,t in l['key']),[])}] if teacher else sheets(l)
   for i,s in enumerate(source):
    number+=1;y=H-M
    items=[para('CS ATAR | '+p['title']+' | '+('TEACHER ANSWERS' if teacher else 'STUDENT COPY'),'small'),para(l['id']+' - '+l['title'],'title'),para(s['title'],'h')]
    if not teacher:items.append(para('Name _____________________ Class ______ Date __________','small'))
    if i==0:
     items.append(para(l['intention']))
     items.append(Paragraph('<link color="#285747" href="https://edugenio.github.io/cs-atar-textbook/#'+l['chapter']+'">Textbook: '+e(l['chapter'])+'</link>',styles['small']))
     if l['id']=='01' and not teacher:items.append(para('Before starting: '+p['prerequisites'],'small'))
    for b in s['blocks']:
     k=b['type']
     if k in ['p','heading']:items.append(para(b['text'],'h' if k=='heading' else 'body'))
     elif k=='workspace':
      for _ in range(b['lines']):items.append(Table([['']],colWidths=[FW],rowHeights=[18],style=TableStyle([('LINEBELOW',(0,0),(-1,-1),.35,colors.HexColor('#becdc3'))])))
      items.append(Spacer(1,6))
     elif k=='code':items.append(Preformatted(clean(b['text']),ParagraphStyle('code',fontName='Courier',fontSize=8.1,leading=10.5,spaceAfter=9)))
     elif k=='table':
      rows=[[para(v,'cell') for v in b['headers']]]+[[para(v,'cell') for v in r] for r in b['rows']]
      items.append(Table(rows,colWidths=[FW/len(b['headers'])]*len(b['headers']),style=TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#edf3ed')),('GRID',(0,0),(-1,-1),.4,colors.HexColor('#becdc3')),('VALIGN',(0,0),(-1,-1),'TOP'),('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5)])));items.append(Spacer(1,8))
    for item in items:
     _,height=item.wrap(FW,H);after=getattr(item,'spaceAfter',0)
     if y-height<M+30:raise ValueError(f'Overflow: {p["id"]} {l["id"]} {s["title"]}')
     item.drawOn(cv,M,y-height);y-=height+after
    cv.setFont('Helvetica',8);cv.drawString(M,M,'CS ATAR | CC BY 4.0 | '+('Teacher' if teacher else 'Student'));cv.drawRightString(W-M,M,f'{number} / {total}');cv.showPage()
  cv.save()
 print(p['id'],total,'teacher pages; student pages',len(p['lessons'])*2)

parser=argparse.ArgumentParser();parser.add_argument('--pdf',action='store_true');args=parser.parse_args()
for p in PACKS:
 out=ROOT/'dist/activities'/p['id'];out.mkdir(parents=True,exist_ok=True)
 webpage(p,out);webpage(p,out,True)
 for folder,key in [('files','files'),('answers','answers')]:
  (out/folder).mkdir(exist_ok=True)
  for name,text in p[key].items():write(out/folder/name,text)
 if p['id'] in ['programming-next','databases-sql']:
  for l in p['lessons']:
   code='\n\n'.join(b['text'] for b in l['worked'] if b['type']=='code')
   if code:write(out/'files'/('worked-'+l['id']+('.py' if p['id']=='programming-next' else '.sql')),code)
 if p['id']=='databases-sql':
  import sqlite3
  db=out/'files/practice.sqlite'
  if db.exists():db.unlink()
  with sqlite3.connect(db) as con:con.executescript(p['files']['setup.sql'])
 if args.pdf:
  pdfs(p,out);write(out/'pdf-source.json',json.dumps({'sourceSha256':DIGEST,'studentPages':len(p['lessons'])*2,'teacherPages':len(p['lessons'])},indent=2))
 assert (out/'student.pdf').exists() and (out/'teacher.pdf').exists(),'Generate PDFs with --pdf first'
 assert json.loads((out/'pdf-source.json').read_text())['sourceSha256']==DIGEST,'Regenerate PDFs after source changes'
 write(out/'README.md',p['title']+'\n\n'+p['prerequisites']+'\n\nOpen student.pdf offline, or use the published page for textbook links and selected-activity printing. No specialist equipment is required; each activity explains a paper route. Files are synthetic classroom data. SQLite: open practice.sqlite directly OR run setup.sql once in a fresh database; do not run setup over an existing copy. Back up a disposable copy before Activity 06. Python: use a school-approved Python 3 editor. No software or hardware is controlled by these pages.\n\nStudent ZIP excludes teacher answers. Public teacher materials are separately downloadable. Content CC BY 4.0; original code MIT. Textbook: https://edugenio.github.io/cs-atar-textbook/\n')
 for teacher in [False,True]:
  with zipfile.ZipFile(out/('teacher-pack.zip' if teacher else 'student-pack.zip'),'w',zipfile.ZIP_DEFLATED) as z:
   files={'README.md':(out/'README.md').read_bytes(),('teacher.pdf' if teacher else 'student.pdf'):(out/('teacher.pdf' if teacher else 'student.pdf')).read_bytes(),'LICENSE-CODE.txt':(ROOT/'LICENSE-CODE.txt').read_bytes(),'LICENSE-CONTENT.txt':(ROOT/'LICENSE-CONTENT.txt').read_bytes()}
   folder='answers' if teacher else 'files'
   for f in sorted((out/folder).iterdir()):files[folder+'/'+f.name]=f.read_bytes()
   for name,data in sorted(files.items()):
    info=zipfile.ZipInfo(name,(2026,10,31,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,data)
index=ROOT/'dist/activities/index.html'
write(index,'<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Activity packs · CS ATAR</title><link rel="stylesheet" href="../style.css"><style>main{max-width:950px;margin:auto;padding:40px 24px}main>ul{list-style:none;padding:0}main>ul>li{margin:18px 0;padding:24px;background:white;border:1px solid #d3ddd5;border-radius:8px;line-height:1.8}main>ul>li>a:first-child{font-weight:bold}@media(max-width:600px){main{padding:24px 16px}h1{font-size:2.4rem}}</style></head><body><a class="skip" href="#main">Skip to packs</a><header><a href="../resources/">← Lesson resource hub</a></header><main id="main"><h1>Printable activity packs</h1><p>Worked examples, independent practice and separate explained answers. Every pack has an equipment-free route. Use textbook links before the task, predict first, and retain your own evidence after feedback.</p><ul><li><a href="programming-foundations/">Programming foundations</a> · 8 activities · local Weeks 1–2</li>'+''.join('<li><a href="'+p['id']+'/">'+e(p['title'])+'</a> · '+str(len(p['lessons']))+' activities · <a href="'+p['id']+'/student.pdf">Student PDF</a> · <a href="'+p['id']+'/teacher.html">Teacher answers</a></li>' for p in PACKS)+'</ul><p>Continue with programming after the foundations pack. Follow the SQL pack in order. Network subnetting and SQL HAVING are labelled later extensions. Computer systems activities provide supporting context; these packs do not establish full syllabus coverage.</p></main></body></html>')
print('Built four packs and activity index.')
