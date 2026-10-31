"""Build the eight-lesson programming pack from one original-content source.

Default: web pages, starter files and ZIP (retaining existing PDFs).
--pdf: also author the two print masters; needs reportlab in the authoring runtime.
"""
from pathlib import Path
from html import escape
import argparse,hashlib,json,re,zipfile

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'dist/activities/programming-foundations'
OUT.mkdir(parents=True,exist_ok=True)
DATA=json.loads((ROOT/'activity-source/programming-foundations.json').read_text(encoding='utf-8'))
LESSONS=DATA['lessons']
assert len(LESSONS)==8 and [x['id'] for x in LESSONS]==[f'{n:02}' for n in range(1,9)]
e=lambda s:escape(str(s))
def write(p,text):p.write_text(text.rstrip()+'\n',encoding='utf-8',newline='\n')
def booklink(ref):return '../../'+ref

STARTERS={
'02_badge_worked.py':'''# Worked sequence: assume valid non-negative whole-number input.
BADGE_PRICE = 3
quantity = int(input("Number of badges: "))
total = quantity * BADGE_PRICE
print(f"Total: ${total}")
''',
'02_ticket_starter.py':'''# Starter, not a completed solution. Tickets $4 plus $1 per order.
# Assume valid non-negative whole-number input. No loop/selection needed.
quantity = int(input("Tickets: "))
# TODO: calculate total from the stated rule, then print it.
''',
'04_trace_worked.py':'''# Predict each assigned value before running.
quantity = 3
price = 2
handling = 4
subtotal = quantity * price
total = subtotal + handling
print(total)
''',
'05_conditions_worked.py':'''# Invented desktop rule, not a real equipment operating specification.
battery = 29
authorised = True
ready = battery >= 30 and authorised
print(ready)
''',
'06_selection_starter.py':'''# Starter: supplied numeric total; no interactive conversion needed.
order_total = 49
# TODO: at least 50 gives delivery charge 0; otherwise 5.
# Write if/else and print the charge. Test 49, 50 and 51.
''',
'06_nested_worked.py':'''# This only prints messages. It controls no device or service.
command = "START"
authorised = False
if command == "START":
    if authorised:
        print("ready")
    else:
        print("not authorised")
else:
    print("not a start request")
''',
'07_menu_starter.py':'''# Starter: only a text response, with no device/network actions.
# START -> Start requested; STOP -> Stop requested;
# STATUS -> Status requested; anything else -> Unknown command.
raw = input("Command: ")
command = raw.strip().upper()
# TODO: write if/elif/else and print the contracted response.
''',
'08_boundary_fault.py':'''# Deliberate logic fault. Requirement: integer ratings 1-5 inclusive.
# Predict, run, preserve the failure, repair and retest.
rating = 3
accepted = rating > 1 and rating < 5
print(accepted)
'''
}
starter_dir=OUT/'starters';starter_dir.mkdir(exist_ok=True)
for name,code in STARTERS.items():write(starter_dir/name,code)

REFERENCES={
 '02_ticket_solution.py':'''# Teacher reference: assume valid non-negative whole-number input.
quantity = int(input("Tickets: "))
total = quantity * 4 + 1
print(f"Total: ${total}")
''',
 '06_selection_solution.py':'''# Teacher reference: supplied numeric value, changed for each test.
order_total = 49
if order_total >= 50:
    charge = 0
else:
    charge = 5
print(charge)
''',
 '06_nested_transfer.py':'''# Teacher reference: message-only nested selection.
command = "SHOW"
staff = False
if command == "SHOW":
    if staff:
        print("full report")
    else:
        print("summary")
else:
    print("unknown")
''',
 '07_menu_solution.py':'''# Teacher reference: prints only, no device/service action.
raw = input("Command: ")
command = raw.strip().upper()
if command == "START":
    message = "Start requested"
elif command == "STOP":
    message = "Stop requested"
elif command == "STATUS":
    message = "Status requested"
else:
    message = "Unknown command"
print(message)
''',
 '08_boundary_fixed.py':'''# Teacher reference: supplied integer rating; change for each test.
rating = 3
accepted = rating >= 1 and rating <= 5
print(accepted)
'''
}
reference_dir=OUT/'teacher-reference';reference_dir.mkdir(exist_ok=True)
for name,code in REFERENCES.items():write(reference_dir/name,code)

def block_html(block):
    kind=block['type']
    if kind=='p':return '<p>'+e(block['text'])+'</p>'
    if kind=='heading':return '<h4>'+e(block['text'])+'</h4>'
    if kind=='code':return '<pre><code>'+e(block['text'])+'</code></pre>'
    if kind=='workspace':return '<div class="workspace" aria-label="Space for your written response">'+''.join('<div class="writing-line"></div>' for _ in range(block['lines']))+'</div>'
    if kind=='table':
        return '<div class="table-wrap"><table><thead><tr>'+''.join('<th scope="col">'+e(h)+'</th>' for h in block['headers'])+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+e(v)+'</td>' for v in r)+'</tr>' for r in block['rows'])+'</tbody></table></div>'
    raise ValueError(kind)

def page(teacher=False):
    title='Teacher answers' if teacher else DATA['title']
    options='<option value="all">All eight lessons</option>'+''.join('<option value="'+x['id']+'">'+x['id']+' · '+e(x['title'])+'</option>' for x in LESSONS)
    navigation=''.join('<a data-lesson-link="'+x['id']+'" href="#lesson-'+x['id']+'"><span>'+x['id']+'</span>'+e(x['title'])+'</a>' for x in LESSONS)
    articles=[]
    count=0;total=8 if teacher else 16
    for x in LESSONS:
        links='<ul class="reading-links">'+''.join('<li><a href="'+e(booklink(url))+'">'+e(label)+'</a></li>' for label,url in x['reading'])+'</ul>'
        sheets=[]
        source_sheets=[{'title':'Teacher reasoning and follow-up','blocks':[]}] if teacher else x['sheets']
        for i,sheet in enumerate(source_sheets):
            count+=1
            content=''.join('<h4>'+e(label)+'</h4><p>'+e(text)+'</p>' for label,text in x['key']) if teacher else ''.join(block_html(b) for b in sheet['blocks'])
            teacher_note='<p class="teacher-note"><strong>Teaching allocation:</strong> '+e(x['timing'])+'</p>' if teacher else ''
            reading=('<div class="reading"><strong>Textbook visit</strong>'+links+'</div>') if i==0 and not teacher else ''
            sheets.append('<section class="worksheet-sheet"><div class="sheet-banner"><p class="eyebrow">CS ATAR · ACTIVITY PACK 1 · '+('TEACHER ANSWERS' if teacher else 'STUDENT COPY')+'</p><h2>'+x['id']+' · '+e(x['title'])+'</h2><p>'+e(sheet['title'])+'</p></div>'+('' if teacher else '<p class="identity">Name _______________________ Class __________ Date __________</p>')+'<h3>'+e(sheet['title'])+'</h3>'+reading+teacher_note+content+'<footer class="sheet-footer">Activity '+x['id']+' · '+('Teacher' if teacher else 'Student')+' · Page '+str(count)+' of '+str(total)+' · CS ATAR · CC BY 4.0</footer></section>')
        articles.append('<article class="pack-lesson" id="lesson-'+x['id']+'" data-lesson="'+x['id']+'"><div class="lesson-heading"><p class="eyebrow">'+('TEACHER GUIDE' if teacher else 'ACTIVITY')+' '+x['id']+' · LOCAL W'+str(x['week'])+' L'+str(x['lesson'])+'</p><h2>'+e(x['title'])+'</h2><p>'+e(x['intention'])+'</p>'+('<p class="lesson-timing">'+e(x['timing'])+'</p>' if not teacher else '')+'</div>'+''.join(sheets)+'</article>')
    intro=('Public teacher answers for formative practice. Accept equivalent valid reasoning; leave actual-result fields blank until learners observe their own runs. Proposed lesson timings require a classroom trial.' if teacher else 'Eight printable activities linking the textbook to prediction, programming and explanation. No specialist equipment is needed. Use the page for instructions and write on a printed copy or in your exercise book.')
    actions=('<a class="button" href="teacher.pdf" download="programming-foundations-teacher.pdf">Download teacher PDF</a><a class="button secondary" href="teacher-reference.zip" download>Reference Python &amp; answers</a><a class="quiet-link" href="index.html">Student activities</a>' if teacher else '<a class="button" href="student.pdf" download="programming-foundations-student.pdf">Download student PDF</a><a class="button secondary" href="student-pack.zip" download="programming-foundations-student-pack.zip">Python files &amp; student pack</a><a class="quiet-link" href="teacher.html">Teacher answers</a>')
    notes=('<p>Use the linked general textbook sections in each lesson. The chapter week labels belong to the generic planner; these local Weeks 1–2 labels are a companion sequence. Predict first, run in your approved local Python 3 editor, then compare actual results. No code executes on this page.</p>' if not teacher else '<p>The student pack has two A4 pages per lesson; this guide has one answer page per lesson. A five-minute exit response informs reteaching; these activities are ungraded and are not secure assessment items. Student answers are not submitted or collected by this page.</p>')
    html='''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'''+e(title)+''' · CS ATAR activity pack</title><meta name="description" content="Eight general programming activities with textbook links, printable student worksheets and separate teacher answers."><link rel="stylesheet" href="../../style.css"><link rel="stylesheet" href="pack.css"></head><body class="'''+('teacher-page' if teacher else 'student-page')+'''"><a class="skip" href="#main">Skip to activities</a><header class="pack-header"><a href="../../#contents">← Textbook contents</a><a href="../../#teaching">Teaching planner</a></header><main id="main" tabindex="-1"><section class="pack-intro"><p class="eyebrow">UNIT 1 · GENERAL PROGRAMMING PRACTICE</p><h1>'''+e(title)+'''</h1><p class="lede">'''+e(intro)+'''</p><div class="pack-downloads">'''+actions+'''</div>'''+notes+'''<div class="print-toolbar"><label for="lesson-select">Choose activities<select id="lesson-select">'''+options+'''</select></label><button id="print-selected" type="button" disabled>Print selected lesson</button><button id="print-all" type="button" class="secondary">Print all '''+('teacher' if teacher else 'student')+''' pages</button></div><p class="print-help">A4 portrait · use 100% scale and turn off browser headers/footers. The PDF download has a checked fixed layout. Browser Print uses the selected lesson; Print all includes the complete pack.</p><noscript><p>All activities and the PDFs remain available without JavaScript. Use your browser's Print command for all pages.</p></noscript><nav class="activity-nav" aria-label="Activities">'''+navigation+'''</nav></section>'''+''.join(articles)+'''<footer class="pack-footer"><p>Original formative activities · '''+DATA['date']+''' · Content CC BY 4.0 · Python code MIT. <a href="../../licence.html">Reuse details</a> · <a href="../../syllabus-basis.md">2026 foundation / 2027 revisions</a>.</p><p>Technical references: <a href="https://docs.python.org/3/library/stdtypes.html">Python built-in types and string methods</a> · <a href="https://docs.python.org/3/tutorial/controlflow.html#if-statements">Python if statements</a>. Independent teaching resource; teacher review and classroom trial remain ongoing.</p></footer></main><script src="pack.js"></script></body></html>'''
    write(OUT/('teacher.html' if teacher else 'index.html'),html)

page();page(True)

README='''# Programming foundations - activity pack 1

Eight general Unit 1 practice lessons, corresponding to the local Weeks 1-2 crosswalk. No specialist equipment or paid assets are required. These are original formative activities, not an issued assessment.

Read student.pdf or the published activity page, then predict before running code. Use a school-approved Python 3 editor and save each change. Files labelled worked are examples. Files labelled starter are unfinished by design; their comments identify what to write. 08_boundary_fault.py contains a deliberate boundary logic error. The code only calculates/prints and accepts ordinary input; it controls no device or network service.

The early quantity programs assume valid non-negative whole-number text. Functions, loops and exception handlers are not required in this pack. Later input-failure questions ask for an explanation, not an untaught recovery implementation. Keep actual-result fields blank until you run your own version. Teacher answers are on a separate public page/PDF.

Open the activity page for exact textbook reading links and printing options. Student PDF has 16 A4 pages (two per lesson); teacher PDF has eight pages. Teacher answers are not included in this student ZIP. No accounts, grading service or student submissions are used.

Content CC BY 4.0; original Python code MIT. See licence files and syllabus-basis.md. The textbook retains the 2026 foundation with applicable 2027 revisions.
'''
write(OUT/'README.md',README)

def ascii_text(s):
    return s.replace('→','->').replace('–','-').replace('—','-').replace('·',' | ').replace('‘',"'").replace('’',"'").replace('“','"').replace('”','"')

def pdfs():
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.lib import colors
    from reportlab.platypus import Paragraph,Preformatted,Table,TableStyle,Spacer,Flowable
    W,H=A4;M=40;FW=W-2*M
    green=colors.HexColor('#285747'); ink=colors.HexColor('#18322d');muted=colors.HexColor('#51645d')
    styles={
      'body':ParagraphStyle('body',fontName='Helvetica',fontSize=10.2,leading=14,textColor=ink,spaceAfter=6),
      'small':ParagraphStyle('small',fontName='Helvetica',fontSize=8.2,leading=11,textColor=muted,spaceAfter=5),
      'h':ParagraphStyle('h',fontName='Helvetica-Bold',fontSize=11.2,leading=14,textColor=green,spaceBefore=9,spaceAfter=5),
      'title':ParagraphStyle('title',fontName='Helvetica-Bold',fontSize=18,leading=21,textColor=ink,spaceAfter=7),
      'cell':ParagraphStyle('cell',fontName='Helvetica',fontSize=8.7,leading=11,textColor=ink),
      'cellhead':ParagraphStyle('cellhead',fontName='Helvetica-Bold',fontSize=8.5,leading=10.5,textColor=ink)
    }
    def para(text,style='body'):return Paragraph(e(ascii_text(text)),styles[style])
    class Lines(Flowable):
      def __init__(self,n):Flowable.__init__(self);self.n=n;self.width=FW;self.height=n*18+4
      def draw(self):
        self.canv.setStrokeColor(colors.HexColor('#c8d1cb'));self.canv.setLineWidth(.4)
        for n in range(self.n):self.canv.line(0,self.height-18*(n+1),FW,self.height-18*(n+1))
    def flows(block):
      k=block['type']
      if k=='p':return [para(block['text'])]
      if k=='heading':return [para(block['text'],'h')]
      if k=='workspace':return [Lines(block['lines'])]
      if k=='code':
        style=ParagraphStyle('code',fontName='Courier',fontSize=8.8,leading=11.4,textColor=ink,backColor=colors.HexColor('#eff3ee'),borderPadding=8,spaceBefore=4,spaceAfter=10)
        return [Preformatted(ascii_text(block['text']),style)]
      if k=='table':
        n=len(block['headers'])
        if n>7:widths=[FW*.23]+[FW*.77/(n-1)]*(n-1)
        elif n==2:widths=[FW*.33,FW*.67]
        else:widths=[FW/n]*n
        data=[[para(h,'cellhead') for h in block['headers']]]+[[para(v,'cell') for v in row] for row in block['rows']]
        tab=Table(data,colWidths=widths,hAlign='LEFT')
        tab.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#edf3ed')),('VALIGN',(0,0),(-1,-1),'TOP'),('GRID',(0,0),(-1,-1),.4,colors.HexColor('#cbd4cd')),('LEFTPADDING',(0,0),(-1,-1),5),('RIGHTPADDING',(0,0),(-1,-1),5),('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5)]))
        return [tab,Spacer(1,6)]
      raise ValueError(k)
    for teacher in [False,True]:
      path=OUT/('teacher.pdf' if teacher else 'student.pdf')
      cv=canvas.Canvas(str(path),pagesize=A4,pageCompression=1,invariant=1)
      cv.setTitle('Programming foundations - '+('teacher answers' if teacher else 'student activity pack'))
      cv.setAuthor('CS ATAR Classroom Textbook')
      total=8 if teacher else 16;number=0
      for lesson in LESSONS:
        sheets=[{'title':'Teacher reasoning and follow-up','blocks':[]}] if teacher else lesson['sheets']
        for index,sheet in enumerate(sheets):
          number+=1;y=H-M
          items=[para('CS ATAR | ACTIVITY PACK 1 | '+('TEACHER ANSWERS' if teacher else 'STUDENT COPY'),'small'),para(lesson['id']+' - '+lesson['title'],'title'),para(sheet['title'],'h')]
          if not teacher:items += [para('Name __________________________  Class __________  Date __________','small')]
          if index==0:
            items.append(para(lesson['intention']))
            if not teacher:
              for label,url in lesson['reading'][:2]:
                items.append(Paragraph('<b>Textbook:</b> <link color="#285747" href="https://edugenio.github.io/cs-atar-textbook/'+url+'">'+e(ascii_text(label))+'</link>',styles['small']))
              if len(lesson['reading'])>2:items.append(para('All section links and timing guidance are on the activity page.','small'))
          if teacher:
            items.append(para(lesson['timing'],'small'))
            for title,text in lesson['key']:items += [para(title,'h'),para(text)]
          else:
            for b in sheet['blocks']:items.extend(flows(b))
          for item in items:
            aw,ah=item.wrap(FW,y-M-22)
            before=getattr(item,'spaceBefore',0);after=getattr(item,'spaceAfter',0)
            y-=before
            if y-ah<M+25:raise ValueError(f'PDF overflow: {path.name} lesson {lesson["id"]} sheet {index+1}: y={y}, height={ah}')
            item.drawOn(cv,M,y-ah);y-=ah+after
          cv.setStrokeColor(colors.HexColor('#cbd4cd'));cv.line(M,M+12,W-M,M+12)
          cv.setFont('Helvetica',8);cv.setFillColor(muted)
          cv.drawString(M,M,'Activity '+lesson['id']+' | '+('Teacher' if teacher else 'Student')+' | CS ATAR | CC BY 4.0')
          cv.drawRightString(W-M,M,f'{number} / {total}')
          cv.showPage()
      cv.save()
      assert number==total
      print('Authored',path.name,total,'A4 pages')

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--pdf',action='store_true',help='regenerate both PDF print masters (reportlab required)')
args=parser.parse_args()
source_digest=hashlib.sha256((ROOT/'activity-source/programming-foundations.json').read_bytes()).hexdigest()
if args.pdf:
    pdfs()
    write(OUT/'pdf-source.json',json.dumps({'sourceSha256':source_digest,'studentPages':16,'teacherPages':8},indent=2))
if (OUT/'student.pdf').exists() or (OUT/'teacher.pdf').exists():
    stamp=json.loads((OUT/'pdf-source.json').read_text(encoding='utf-8'))
    assert stamp['sourceSha256']==source_digest,'Content changed: regenerate and visually check both PDFs using --pdf before packaging.'

# Student archive deliberately excludes the separate key and secure assessment material.
with zipfile.ZipFile(OUT/'student-pack.zip','w',zipfile.ZIP_DEFLATED) as z:
    contents={'README.md':(OUT/'README.md').read_bytes(),'LICENSE-CODE.txt':(ROOT/'LICENSE-CODE.txt').read_bytes(),'LICENSE-CONTENT.txt':(ROOT/'LICENSE-CONTENT.txt').read_bytes(),'syllabus-basis.md':(ROOT/'curriculum-source/syllabus-basis.md').read_bytes()}
    if (OUT/'student.pdf').exists():contents['student.pdf']=(OUT/'student.pdf').read_bytes()
    for p in sorted(starter_dir.glob('*.py')):contents['starters/'+p.name]=p.read_bytes()
    for name,body in sorted(contents.items()):
        info=zipfile.ZipInfo(name,(2026,10,31,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,body)
with zipfile.ZipFile(OUT/'teacher-reference.zip','w',zipfile.ZIP_DEFLATED) as z:
    contents={'README.md':b'Teacher reference solutions for original formative activities. Answers are public; these are not secure assessment items. Accept equivalent valid solutions and collect actual learner evidence separately. Code MIT; content CC BY 4.0.\n','LICENSE-CODE.txt':(ROOT/'LICENSE-CODE.txt').read_bytes(),'LICENSE-CONTENT.txt':(ROOT/'LICENSE-CONTENT.txt').read_bytes()}
    if (OUT/'teacher.pdf').exists():contents['teacher.pdf']=(OUT/'teacher.pdf').read_bytes()
    for p in sorted(reference_dir.glob('*.py')):contents['teacher-reference/'+p.name]=p.read_bytes()
    for name,body in sorted(contents.items()):
        info=zipfile.ZipInfo(name,(2026,10,31,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,body)
print('Built eight student activities, separate teacher page and eight Python files.')
