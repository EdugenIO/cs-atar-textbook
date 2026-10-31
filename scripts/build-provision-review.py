"""Current written-provision review, kept separate from historical retrieval and approvals."""
from pathlib import Path
from html import escape,unescape
from collections import Counter
import argparse,csv,hashlib,io,json,re,subprocess,unicodedata
ROOT=Path(__file__).resolve().parents[1];D=ROOT/'dist';O=D/'curriculum';C=ROOT/'curriculum-source';O.mkdir(exist_ok=True)
def read(p):return json.loads(p.read_text(encoding='utf8'))
def write(p,s):p.write_text(s,encoding='utf8',newline='\n')
scope=read(C/'scope-register.json')
js='''// Generated from curriculum-source/scope-register.json.
const textbookScope = DATA;
for(const item of textbookScope.entries){
 if(!item.section)continue;
 const chapter=chapters.find(c=>c.id===item.route),section=chapter?.sections.find(s=>s[0]===item.section);
 if(!section)throw Error('Missing scope location: '+item.id);
 const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 section[1]='<p class="notice scope-note"><strong>Scope: '+e(item.category.replaceAll('-',' '))+'.</strong> '+e(item.note)+' <a href="curriculum/scope.html#'+e(item.id)+'">Scope and source</a>.</p>'+section[1];
}
'''.replace('DATA',json.dumps(scope,ensure_ascii=False,separators=(',',':')))
write(D/'curriculum-scope.js',js)
write(O/'scope-register.json',json.dumps(scope,ensure_ascii=False,indent=2)+'\n')
book=json.loads(subprocess.check_output(['node',str(ROOT/'tests/helpers/curriculum-content.mjs')],cwd=ROOT));chapters={c['id']:c for c in book['chapters']}
index=read(C/'item-map.json');items={r['id']:r for r in index['items']};decisions=read(C/'provision-decisions.json');repairs=read(C/'teaching-repairs.json')
groups=[r for year in [11,12] for r in read(C/f'editorial-review-year{year}.json')['reviews']]
def plain(s):return re.sub(r'\s+',' ',unescape(re.sub('<[^>]*>',' ',s))).strip()
def heading(s):return 'heading-'+re.sub(r'[^\w]+','-',re.sub(r'^\d+\.\s*','',unicodedata.normalize('NFKC',s).lower())).strip('-').replace('_','-')
def ref(kind,url,label,body):
 assert len(plain(body))>18,(url,label)
 return dict(kind=kind,url=url,label=label,sha256=hashlib.sha256(body.replace('\r\n','\n').encode()).hexdigest(),excerpt=plain(body)[:180])
def section(route,title):
 body=next(html for h,html in chapters[route]['sections'] if h==title)
 return ref('section','../#'+route+'/'+heading(title),title,body)
def file(name,label=None):
 p=D/name;assert p.is_file(),name
 return ref('file','../'+name,label or name,p.read_text(encoding='utf8'))
def task(route,answer=False):
 if route=='selection':return section('selection','6. Practice')
 c=chapters[route];return ref('answer' if answer else 'task','../#'+route+'/'+('heading-your-practical-task'),('Explained practical answer' if answer else 'Independent practical task')+' · '+c['title'],c['solution' if answer else 'task'])
def refs(value):
 if isinstance(value,list):return [r for v in value for r in refs(v)]
 if not isinstance(value,dict):return []
 result=[]
 if value.get('route'):
  for title in value.get('sections',[value['section']] if value.get('section') else []):result.append(section(value['route'],title))
 for key,v in value.items():
  if isinstance(v,(dict,list)):result+=refs(v)
 return result

def feedback(name):
 base=name.removesuffix('.md').removesuffix('-workbook')
 for suffix in ['-answers.md','-teacher.md','-teacher-guide.md','-marking-guide.md']:
  if (D/(base+suffix)).is_file():return base+suffix
 raise ValueError('Select an explicit feedback source for '+name)
rows=[]
for g in groups:
 ident=g.get('reviewId',g.get('id'));ids=g['itemIds'];unit=items[ids[0]]['unit'];original=g['evidence'];repair=next((r for r in repairs if ident in r['reviews']),None)
 teaching=refs(original);assert teaching,ident
 worked=refs(original.get('workedExample',original)) if isinstance(original,dict) else teaching
 route=next((r['url'].split('#')[1].split('/')[0] for r in teaching if r['url'].startswith('../#')),None)
 practice=decisions['practiceSelections'].get(ident)
 description=original.get('independentTask','') if isinstance(original,dict) else next((r.get('section','') for r in original if 'independent practice' in r.get('kind','')),'')
 if repair:
  teaching=[section(repair['route'],repair['title'])];worked=teaching[:]
  independent=ref('clinic-task',teaching[0]['url'],'Independent transfer · '+repair['title'],repair['prompt']);answer=ref('clinic-answer',teaching[0]['url'],'Explained answer · '+repair['title'],repair['answer'])
 elif practice and practice.get('section'):
  independent=section(practice['route'],practice['section']);answer=independent.copy();answer['label']='Explained feedback in '+practice['section']
  module=next((m for m in book['depth']['modules'] if m['route']==practice['route'] and m['title']==practice['section']),None)
  if module:
   independent=ref('module-task',independent['url'],module['title']+' · independent task',module['independent']);answer=ref('module-answer',independent['url'],module['title']+' · answer',module['answer'])
 elif practice and practice.get('file'):
  independent=file(practice['file'],description or practice['file']);answer=file(practice.get('answerFile') or feedback(practice['file']))
 else:
  if isinstance(original,dict):names=re.findall(r'dist/([\w/-]+\.md)',description)
  else:names=[r['path'][5:] for r in original if 'independent practice' in r.get('kind','') and r.get('path','').endswith('.md')]
  if names:
   independent=file(names[0],description or names[0]);answer=file(feedback(names[0]))
  else:independent=task(route);answer=task(route,True)
 note=decisions['closureNotes'].get(ident,g['rationale'])
 rows.append(dict(id=ident,unit=unit,year=11 if unit<3 else 12,itemIds=ids,demand=decisions.get('demandLabels',{}).get(ident,g.get('demand',g.get('sourceDemand'))),status='Written teaching and practice confirmed',initialJudgement=g['judgement'],decision=note,explanation=teaching[0],example=worked[0],independentTask=independent,feedback=answer,otherTeaching=teaching[1:],practiceLocator=description,sourcePages=sorted({items[i]['pdfPage'] for i in ids}),externalReference='Official support booklet printed p12 (PDF p16)' if ident in ['Y11-R042','Y12-27'] else None,independentTeacherReview='pending'))
leaves={i for i,r in items.items() if not r['isParent']};assigned=[i for g in rows for i in g['itemIds']];assert set(assigned)==leaves and len(assigned)==len(leaves)==519
snapshot={g['id']:{k:g[k]['sha256'] for k in ['explanation','example','independentTask','feedback']} for g in rows}
parser=argparse.ArgumentParser();parser.add_argument('--record',action='store_true');args=parser.parse_args()
if args.record:write(C/'provision-snapshot.json',json.dumps(snapshot,indent=2)+'\n')
else:assert snapshot==read(C/'provision-snapshot.json'),'Teaching/practice changed: re-review affected evidence before recording a new snapshot.'
data=dict(date=decisions['reviewed'],reviewer=decisions['reviewer'],basis=scope['basis'],leafItems=519,groups=rows,countsByUnit=dict(Counter(items[i]['unit'] for i in assigned)),independentTeacherSignOffs=0,remainingHumanChecks=decisions['remainingHumanChecks'])
write(O/'provision-review.json',json.dumps(data,ensure_ascii=False,indent=2)+'\n')
# A separate current-evidence CSV avoids overwriting historical candidate retrieval.
stream=io.StringIO();writer=csv.writer(stream,lineterminator='\n');writer.writerow(['item_id','unit','review_group','source_pdf_page','teaching','worked_example','independent_practice','feedback','editorial_status','independent_teacher_review'])
for g in rows:
 for item in g['itemIds']:writer.writerow([item,g['unit'],g['id'],items[item]['pdfPage'],*[g[k]['url'] for k in ['explanation','example','independentTask','feedback']],g['status'],'pending'])
write(O/'provision-review.csv',stream.getvalue())
e=escape
intro='<p class="eyebrow">CURRENT WRITTEN-PROVISION REVIEW · 31 OCTOBER 2026</p><h1>Teach it. Practice it. Check it.</h1><p class="lede">All 519 detailed unit-content items have teaching, a worked example, independent formative practice and feedback nominated in 111 reviewed demand groups.</p><p>2026 foundation retained; Year 11 uses the teaching-from-2026 syllabus and Year 12 the teaching-from-2027 syllabus. This confirms written provision in the linked resources. It does not claim that every student has executed a practical, that a school has adopted an assessment outline, or that an independent teacher has signed off.</p><p><a class="button" href="provision-review.csv" download>Download all 519 evidence rows · CSV</a> <a class="button secondary" href="scope.html">Required, support and enrichment</a></p><p>The 13 initially partial groups have been rechecked against their follow-up lessons. Earlier judgements remain visible as historical records. Parent bullets supply context to their detailed children and are not counted twice. Editorial IDs are local locators; read the linked official source for exact scope.</p>'
parts=[]
source=read(C/'source-registry.json')
for unit in range(1,5):
 cards=[]
 for g in [g for g in rows if g['unit']==unit]:
  official=next(s['url'] for s in source['sources'] if s['year']==g['year'])
  links=' · '.join(f'<a href="{official}#page={p}">Official PDF p{p}</a>' for p in g['sourcePages'])
  rolelinks=''.join('<li><strong>'+label+':</strong> <a href="'+e(g[k]['url'])+'">'+e(g[k]['label'])+'</a></li>' for k,label in [('explanation','Learn'),('example','Worked example'),('independentTask','Try independently'),('feedback','Check explained feedback')])
  cards.append('<details class="provision-card" id="'+g['id']+'"><summary>'+g['id']+' · '+e(g['demand'])+' · '+str(len(g['itemIds']))+' source items</summary><p><strong>'+e(g['status'])+'</strong> · AI-assisted editorial review; independent teacher review pending.</p><p>'+e(g['decision'])+'</p><ol>'+rolelinks+'</ol><p>Practice locator: '+e(g['practiceLocator'] or g['independentTask']['label'])+'</p>'+('<p><strong>Convention reference:</strong> '+e(g['externalReference'])+'. Use the <a href="'+scope['supportBooklet']+'#page=16">official symbol table</a>; supplied role boxes are not claimed to be an independent symbol-fidelity sign-off.</p>' if g['externalReference'] else '')+'<p>'+links+' · <a href="editorial-review.html#'+g['id']+'">Earlier editorial record</a></p><p class="small">Exact detailed locators: '+e(', '.join(g['itemIds']))+'</p></details>')
 parts.append('<section id="unit-'+str(unit)+'"><h2>Unit '+str(unit)+' · '+str(data['countsByUnit'][unit])+' detailed items</h2>'+''.join(cards)+'</section>')
def page(title,body):return '<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title+' · CS ATAR</title><link rel="stylesheet" href="../style.css"><style>main{max-width:1050px;margin:auto}nav.review-nav{display:block}details.provision-card{margin-block:16px}a,p,li{overflow-wrap:anywhere}summary{font-weight:700}@media print{header,.no-print{display:none}details>*{display:block!important}}</style></head><body><a class="skip" href="#main">Skip to review</a><header><a href="../#contents">← Textbook</a><nav aria-label="Curriculum"><a href="index.html">Item matrix</a><a href="provision-review.html">Current review</a><a href="scope.html">Scope labels</a></nav></header><main id="main" tabindex="-1">'+body+'<footer><p>Original review CC BY 4.0. Official sources retain their terms. <a href="../licence.html">Reuse</a>.</p></footer></main><script>function revealReview(){const t=document.getElementById(location.hash.slice(1));if(t?.tagName==="DETAILS"){t.open=true;t.scrollIntoView();}}window.addEventListener("hashchange",revealReview);revealReview();</script></body></html>\n'
write(O/'provision-review.html',page('Current curriculum provision',intro+'<nav class="review-nav" aria-label="Units">'+' · '.join(f'<a href="#unit-{u}">Unit {u}</a>' for u in range(1,5))+'</nav>'+''.join(parts)+'<h2>Separate human and school checks</h2><ul>'+''.join('<li>'+e(s)+'</li>' for s in decisions['remainingHumanChecks'])+'</ul>'))
body='<p class="eyebrow">HOW TO READ THE TEXTBOOK SCOPE</p><h1>Required skills.<br>Clear boundaries.</h1><p>2026 foundation · 2027 revisions. <a href="provision-review.html">Find teaching and practice for every detailed syllabus item</a>.</p><dl>'+''.join('<dt><strong>'+e(k.replace('-',' ').title())+'</strong></dt><dd>'+e(v)+'</dd>' for k,v in scope['categories'].items())+'</dl><ul>'+''.join('<li>'+e(n)+'</li>' for n in scope['notes'])+'</ul>'
for item in scope['entries']:body+='<section id="'+item['id']+'"><h2>'+e(item['title'])+'</h2><p><strong>'+e(item['category'])+'</strong> · '+e(item['note'])+'</p><p><a href="'+item['url']+'">Teaching and practice</a>'+(' · <a href="'+item['source']+'">Official support reference (online PDF)</a>' if item.get('source') else '')+'</p></section>'
write(O/'scope.html',page('Scope labels',body))
print('Current provision: 519 detailed items / 111 groups; four evidence roles; 13 gap closures; teacher sign-offs remain zero.')
