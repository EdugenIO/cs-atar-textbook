"""Publish the source-demand review separately from unverified candidate retrieval.

All leaf IDs must have exactly one substantive review. Never infer teacher sign-off
from editorial support or from a newly supplied activity.
"""
from pathlib import Path
from html import escape
import collections,json,re,unicodedata

ROOT=Path(__file__).resolve().parents[1]; DIST=ROOT/'dist'; OUT=DIST/'curriculum'
index=json.loads((ROOT/'curriculum-source/item-map.json').read_text(encoding='utf-8'))
groups=[]
for year in [11,12]:
    doc=json.loads((ROOT/f'curriculum-source/editorial-review-year{year}.json').read_text(encoding='utf-8'))
    for r in doc['reviews']:
        groups.append({'id':r.get('reviewId',r.get('id')),'year':year,'itemIds':r['itemIds'],
                       'demand':r.get('demand',r.get('sourceDemand')),'judgement':r['judgement'],
                       'rationale':r['rationale'],'evidence':r['evidence'],
                       'sourceChecked':r['sourceChecked'],'actions':r.get('remainingGaps',r.get('actions',[])),
                       'originalTask':r.get('suggestedOriginalTask',r.get('proposedOriginalTask')),
                       'independentReview':'pending'})
leaves={r['id'] for r in index['items'] if not r['isParent']}
assigned=[item for g in groups for item in g['itemIds']]
assert set(assigned)==leaves and len(assigned)==len(leaves)==519
assert all(g['rationale'] and g['evidence'] and g['sourceChecked'] for g in groups)
repairs=json.loads((ROOT/'curriculum-source/teaching-repairs.json').read_text(encoding='utf-8'))
for g in groups:
    g['teachingAdditions']=[{'id':r['id'],'title':r['title'],'url':'../#'+r['route']+'/heading-'+re.sub(r'[^\w]+','-',r['title'].lower()).strip('-')} for r in repairs if g['id'] in r['reviews']]
    g['followUpStatus']='Original teaching addition supplied; independent re-review and actual learner evidence pending' if g['teachingAdditions'] else 'Existing provision nominated; independent teacher review pending'
data={'date':'31 October 2026','reviewer':'AI-assisted editorial review','foundation':2026,'revisionYear':2027,
      'leafItemsReviewed':519,'groups':groups,'counts':dict(collections.Counter(g['judgement'] for g in groups)),
      'independentSignedOffItems':0,'limits':'Grouped editorial judgements of teaching resources, not a coverage percentage, teacher approval, classroom execution or school-issued assessment mapping.'}
(OUT/'editorial-review.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
e=lambda x:escape(str(x))
def evidence_html(value):
    if isinstance(value,list):return '<ul>'+''.join('<li>'+evidence_html(v)+'</li>' for v in value)+'</ul>'
    if isinstance(value,dict):
        route=value.get('route'); path=value.get('path',''); target='../#'+route if route else '../'+path.removeprefix('dist/') if path.startswith('dist/') else None
        label=' · '.join(str(value[k]) for k in ['kind','path','section'] if value.get(k))
        if value.get('sections'):label+=' · '+'; '.join(value['sections'])
        if target:return '<a href="'+e(target)+'">'+e(label or route)+'</a>'
        return ''.join('<p><strong>'+e(k)+':</strong> '+evidence_html(v)+'</p>' for k,v in value.items())
    return e(value)
intro='''<p><a href="./">← Item matrix</a> · <a href="../syllabus-basis.md">2026 foundation / 2027 revisions</a> · <a href="editorial-review.json" download>Download review evidence</a></p><p class="eyebrow">31 OCTOBER 2026 · AI-ASSISTED EDITORIAL REVIEW</p><h1>Review the demand.<br>Inspect the teaching.</h1><p>All 519 leaf source items have been inspected in 111 related-demand groups. The earlier candidate retrieval is retained as a separate historical method; these substantive judgements nominate stronger existing evidence and identify specific weaknesses.</p><div class="notice"><strong>98 groups supported; 13 partial at initial inspection.</strong> Original teaching additions now address the identified instructional gaps and are linked below. They await independent re-review. Network-symbol fidelity and actual debugger, classroom and practical observations remain checks to perform, not results claimed. Group counts are not a coverage percentage. There are zero independent teacher sign-offs.</div><p>“Supported” means substantive explanation/example and relevant practice were located. “Partial” identifies a specified depth/alignment weakness. Parent bullets provide context to their reviewed leaves. Exact official wording remains in the source PDF; item IDs and grouping are editorial. School-issued assessment mapping and school adoption remain separate.</p>'''
sections=[]
for g in groups:
    source='https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/'+('0020/1232507/Computer-Science-ATAR-Year-11-Syllabus-for-teaching-from-2026.PDF' if g['year']==11 else '0005/1273190/Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-2027.PDF')
    pages=sorted({next(r['pdfPage'] for r in index['items'] if r['id']==item) for item in g['itemIds']})
    links=' · '.join('<a href="'+source+'#page='+str(p)+'">PDF p'+str(p)+'</a>' for p in pages)
    additions=''.join('<li><a href="'+e(r['url'])+'">'+e(r['title'])+'</a></li>' for r in g['teachingAdditions'])
    sections.append(f'<section id="{e(g["id"])}"><h2>{e(g["id"])} · {e(g["demand"])}</h2><p><strong>Initial judgement: {e(g["judgement"])}</strong> · Independent review pending</p><p>{e(g["rationale"])}</p><p>Official source: {links}</p><details><summary>Exact leaf locators ({len(g["itemIds"])})</summary><p>{e(", ".join(g["itemIds"]))}</p></details><h3>Teaching evidence</h3>{evidence_html(g["evidence"])}'+ ('<h3>Identified follow-up</h3><ul>'+''.join('<li>'+e(a)+'</li>' for a in g['actions'])+'</ul>' if g['actions'] else '')+ ('<h3>New explanation, worked example and independent task</h3><ul>'+additions+'</ul><p>'+e(g['followUpStatus'])+'</p>' if additions else '')+'</section>')
html='<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Editorial curriculum review · CS ATAR</title><link rel="stylesheet" href="../style.css"><style>main{max-width:1050px;margin:auto;padding:32px}section{border-top:1px solid var(--line);padding-top:24px;margin-top:32px;scroll-margin-top:24px}a,p,li{overflow-wrap:anywhere}</style></head><body><a class="skip" href="#main">Skip to content</a><main id="main">'+intro+'<details><summary>Choose a demand review group (111)</summary><nav aria-label="Review groups">'+ ' · '.join('<a href="#'+e(g['id'])+'">'+e(g['id'])+'</a>' for g in groups)+'</nav></details>'+''.join(sections)+'<p>Original editorial commentary CC BY 4.0. Official sources retain their terms.</p></main></body></html>'
(OUT/'editorial-review.html').write_text(html,encoding='utf-8',newline='\n')
# Embed original teaching repairs into the normal reader/search/print pathways.
js='''// Original curriculum follow-up clinics; source: curriculum-source/teaching-repairs.json.
const curriculumClinics = DATA;
for (const clinic of curriculumClinics) {
  const chapter = chapters.find(c => c.id === clinic.route);
  if (!chapter) throw new Error('Unknown clinic route: '+clinic.route);
  const e = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const links = clinic.reviews.map(id=>`<a href="curriculum/editorial-review.html#${id}">${id}</a>`).join(' · ');
  chapter.sections.push([clinic.title, `<div class="curriculum-clinic"><p>${e(clinic.explanation)}</p><h3>Worked example</h3><pre><code>${e(clinic.worked)}</code></pre><h3>Try it independently</h3><p>${e(clinic.prompt)}</p><details class="print-answer"><summary>Show explained answer</summary><p>${e(clinic.answer)}</p></details><p class="reference">Original formative teaching addition · 31 October 2026 · Source-demand review: ${links}. <a href="curriculum/teaching-follow-up.md" download>Download the complete follow-up workbook</a>.</p></div>`]);
  if (clinic.id === 'game-testing-transfer') chapter.intro = 'Use the separate console-loan worked case to learn reliability methods, then transfer them to the current Pygame game. Loan timings and R5/R9 labels are not game acceptance evidence.';
}
'''.replace('DATA',json.dumps(repairs,ensure_ascii=False,separators=(',',':')))
(DIST/'curriculum-clinics.js').write_text(js,encoding='utf-8',newline='\n')
workbook=['# Curriculum follow-up workbook','', '2026 foundation · 2027 revisions · Original formative additions, 31 October 2026. Expected outcomes are not observed learner results. Independent review remains pending.','']
for r in repairs:
    workbook += ['## '+r['title'],'',r['explanation'],'','### Worked example','','```text',r['worked'],'```','','### Independent task','',r['prompt'],'','### Explained answer (review after attempting)','',r['answer'],'']
(OUT/'teaching-follow-up.md').write_text('\n'.join(workbook),encoding='utf-8',newline='\n')
print('Published substantive editorial review of 519 leaves in 111 groups, plus teaching follow-up; independent sign-offs remain zero.')
