"""Build the 2027 edition's source-locator and provisional evidence matrix.

Official syllabus wording is linked, not republished. No teacher approval is inferred.
"""
from pathlib import Path
from html import escape, unescape
import collections, csv, hashlib, io, json, re, subprocess, unicodedata, zipfile

ROOT=Path(__file__).resolve().parents[1]
DIST=ROOT/'dist'
OUT=DIST/'curriculum'
OUT.mkdir(exist_ok=True)
registry=json.loads((ROOT/'curriculum-source/source-registry.json').read_text(encoding='utf-8'))
index=json.loads((ROOT/'curriculum-source/item-map.json').read_text(encoding='utf-8'))

def write(path,text):
    path.write_text(text.rstrip()+'\n',encoding='utf-8',newline='\n')

def csvtext(rows):
    output=io.StringIO(newline='');csv.writer(output,lineterminator='\n').writerows(rows);return output.getvalue()

code=r"""const fs=require('fs'),vm=require('vm'),c=vm.createContext({selection:()=>'<article>Selection</article>'});
for(const f of ['chapters.js','project-chapter.js','network-chapters.js','audit-chapters.js','unit2-chapters.js','unit2-review-chapters.js','unit3-chapters.js','unit4-chapters.js','unit4-er-interpretation.js','unit4-data-quality.js',...Array.from({length:4},(_,i)=>`learning-guides-unit${i+1}.js`),'learning-support.js','depth-data.js','depth.js','curriculum-clinics.js','teaching-planner-data.js','practice/questions.js'])vm.runInContext(fs.readFileSync('dist/'+f,'utf8'),c);
const reader=fs.readFileSync('dist/reader.js','utf8');vm.runInContext(reader.slice(reader.indexOf('const textbookSectionLabels'),reader.indexOf('const escapeHtml')),c);
const app=fs.readFileSync('dist/app.js','utf8'),legacy=vm.createContext({terms:{},source:'',renderLessonPreparation:()=>'',renderLearningGuide:()=>''});
vm.runInContext(app.slice(app.indexOf('function selection()'),app.indexOf('function renderLegacy',app.indexOf('function selection()'))),legacy);
const html=vm.runInContext('selection()',legacy);
const legacySelection={id:'selection',title:'Making decisions with selection',sections:[...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>([\s\S]*?)(?=<h2|$)/g)].map(m=>[m[1].replace(/<[^>]*>/g,''),m[2]])};
process.stdout.write(JSON.stringify({...vm.runInContext('({chapters,depth:teachingDepth,schedule:teachingSchedule,practice:practiceSets,labels:textbookSectionLabels})',c),legacySelection}));"""
book=json.loads(subprocess.check_output(['node','-e',code],cwd=ROOT,encoding='utf-8'))
chapters={c['id']:c for c in book['chapters']}
chapters['selection']=book['legacySelection']
source_by_year={s['year']:s for s in registry['sources']}

def heading_id(title):
    title=unicodedata.normalize('NFKC',title).lower()
    title=re.sub(r'^\d+\.\s*','',title)
    return 'heading-'+re.sub(r'[\W_]+','-',title).strip('-')

def evidence(ref):
    if not ref:return None
    route=ref['route'];assert route in chapters,route
    label=book['labels'].get(ref['label'],ref['label'])
    if ref['kind']=='section':assert any(h==ref['label'] for h,_ in chapters[route]['sections'])
    elif ref['kind']=='module':assert any(m['route']==route and m['title']==ref['label'] for m in book['depth']['modules'])
    elif ref['kind']=='worked':assert chapters[route].get('code')
    elif ref['kind']=='task':assert chapters[route].get('task')
    else:raise ValueError(ref['kind'])
    return {**ref,'url':'../#'+route+'/'+heading_id(label),'label':label}

review_data=json.loads((OUT/'editorial-review.json').read_text(encoding='utf-8'))
review_by_item={item:g for g in review_data['groups'] for item in g['itemIds']}
rows=[]
for original in index['items']:
    row=dict(original)
    group=review_by_item.get(row['id'])
    row['editorialReview']=({'id':group['id'],'demand':group['demand'],'judgement':group['judgement'],'rationale':group['rationale'],'followUpStatus':group['followUpStatus'],'url':'editorial-review.html#'+group['id']} if group else {'id':None,'judgement':'parent context','url':'editorial-review.html','rationale':'Parent bullet: inspect the associated leaf reviews; not a separately signed-off outcome.'})
    row['sourceURL']=source_by_year[row['year']]['url']+'#page='+str(row['pdfPage'])
    for role in ['explanation','example','independentTask']:row[role]=evidence(row[role])
    for p in row['practice']:
        exam=next(s for s in book['practice'] if s['id']==p['set'])
        assert any(q['id']==p['id'] and q['title']==p['title'] for q in exam['questions'])
        p['url']='../practice/#'+p['set']
        p['status']='Formative candidate only; exact item demand needs review'
    row['lessons']=[{'unit':u['unit'],'week':w['week'],'lesson':l['lesson'],'title':l['title']} for u in book['schedule'] if u['unit']==row['unit'] for w in u['weeks'] for l in w['lessons'] if l['chapter'] in row['relatedChapters']]
    row['lessonStatus']='Chapter-level allocations only; exact source bullet-to-lesson teaching not verified'
    row['gaps']=[role for role in ['explanation','example','independentTask','practice'] if not row[role]]+['formalAssessment','independentReview']
    rows.append(row)
assert len({r['id'] for r in rows})==len(rows)
assert dict(collections.Counter(str(r['unit']) for r in rows))==index['sourceCountsByUnit']
assert all(r['printedPage']==r['pdfPage']-4 for r in rows)
assert all(r['independentReviewer']==r['independentReviewDate']=='' for r in rows)

data={'edition':registry['edition'],'teachingYear':2027,'checked':registry['checked'],'scope':index['scope'],'locatorConvention':index['locatorConvention'],'sources':registry['sources'],'countsByUnit':index['sourceCountsByUnit'],'rows':rows,'signedOffItems':0,'editorialLeafItemsReviewed':519,'editorialReviewURL':'editorial-review.html'}
write(OUT/'matrix.json',json.dumps(data,ensure_ascii=False,indent=2))
write(OUT/'matrix-data.js','const curriculumMap = '+json.dumps(data,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')+';')
write(OUT/'source-registry.json',json.dumps(registry,ensure_ascii=False,indent=2))

headers=['Editorial item ID','Year','Unit','Knowledge / Skills','Printed syllabus page','PDF page (1-based)','Content-list bullet ordinal on page','Marker nesting level','Parent item?','Local textbook focus (not official wording)','Official source','Suggested explanation','Suggested example','Suggested independent task','Suggested formative question(s)','Chapter-level lesson candidates','Formal assessment gap','Retrieval gaps (not confirmed omissions)','Review status','Editorial reviewer','Editorial date','Independent reviewer','Independent review date','Limits','Editorial demand review','Editorial judgement','Editorial rationale','Editorial follow-up']
csvrows=[headers]
for r in rows:
    link=lambda role:(r[role]['url'].replace('../','https://edugenio.github.io/cs-atar-textbook/')+' — '+r[role]['label']) if r[role] else 'Not located by candidate retrieval; item-specific review required'
    csvrows.append([r['id'],r['year'],r['unit'],r['kind'],r['printedPage'],r['pdfPage'],r['bulletOnPage'],r['markerLevel'],'Yes' if r['isParent'] else 'No',r['focus'],r['sourceURL'],link('explanation'),link('example'),link('independentTask'),'; '.join(p['set']+'/'+p['id']+' '+p['title'] for p in r['practice']) or 'No current question matched; review required','; '.join(f'U{l["unit"]} W{l["week"]} L{l["lesson"]}: {l["title"]}' for l in r['lessons']),r['formalAssessment'],', '.join(r['gaps']),r['reviewStatus'],r['editorialReviewer'],r['editorialDate'],'','',r['limits'],r['editorialReview'].get('id') or 'Parent context',r['editorialReview']['judgement'],r['editorialReview']['rationale'],r['editorialReview'].get('followUpStatus','See leaf reviews')])
write(OUT/'matrix.csv',csvtext(csvrows))
for unit in [1,2,3,4]:write(OUT/f'unit{unit}-matrix.csv',csvtext([headers]+[r for r in csvrows[1:] if r[2]==unit]))

cat=json.loads((ROOT/'assessment-source/catalogue.json').read_text(encoding='utf-8'))
checks=[]
expected={11:{'Project':40,'Theory':20,'Practical':10,'Examination':30},12:{'Project':40,'Theory':10,'Practical':10,'Examination':40}}
for year in cat['years']:
    actual=collections.Counter()
    for task in year['tasks']:actual[task['type']]+=task['weight']
    assert dict(actual)==expected[year['year']]
    assert len(year['tasks'])<=8 and all(t['weight']>=5 for t in year['tasks'])
    checks.append({'year':year['year'],'libraryCategoryWeights':dict(actual),'libraryTasks':len(year['tasks']),'minimumLibraryTaskWeight':min(t['weight'] for t in year['tasks']),'libraryArithmetic':'Matches the current syllabus category percentages and numerical task limits','schoolAdoptedOutline':'Not supplied; school verification pending'})
write(OUT/'assessment-checks.json',json.dumps(checks,ensure_ascii=False,indent=2))
write(OUT/'school-review.md','''# 2027 school adoption and curriculum review record

Status: **NOT SIGNED OFF.** The school-adopted assessment outline, issued tasks and marking keys have not been supplied. Library arithmetic checks do not establish school adoption, representative content sampling or classroom achievement.

- School / course / teaching year / reviewer and role:
- Year 11 syllabus: for teaching from 2026; exact current version/link/date checked:
- Year 12 syllabus: for teaching from 2027; exact current version/link/date checked:
- Current support booklet / conventions reviewed and dated:
- Applicable WACE Manual edition, link and review date:
- School-adopted outline version and approval date:
- Compare category weights, task numbers/weights, conditions and authentication with the current sources:
- For every matrix row, check the source locator and exact demand; confirm or replace each suggested explanation/example/independent task:
- Record exact issued task/item/marking criterion and the representative sampling rationale (not every bullet needs its own summative question):
- Resolve retrieval gaps and record any genuine omission, review outcome, reviewer and date:
- Check contact hours and school calendar; complete A02 readiness and A03 workload/moderation evidence:
- Note the limits of public practice questions, incomplete slide coverage and proposed assessment blueprints:
- Confirm general capabilities, technology process, course requirements and grade descriptions against the full syllabus; the bullet matrix is restricted to unit-content Knowledge/Skills lists:
- Independent curriculum reviewer/date, unresolved issues and re-review date:
- Release decision and school authorisation/date:

The SCSA publications page listed the 2026 WACE Manual when checked on 30 October 2026. Recheck for the applicable 2027 edition before issue. The 2022-labelled sample outlines are examples, not the school’s adopted 2027 documents. Do not backdate or infer approval.
''')
gaps={role:sum(not r[role] for r in rows) for role in ['explanation','example','independentTask','practice']}
write(OUT/'review-guide.md',f'''# Current 2027 teaching map · review method and limits

Edition {registry['edition']}; source listing checked {registry['checked']}. Year 11 uses the official syllabus for teaching from 2026; Year 12 uses the official syllabus for teaching from 2027. Those document titles must not be renamed to suggest a separate Year 11 2027 syllabus.

## Source inventory

{index['scope']}

{index['locatorConvention']}

There are {len(rows)} editorial source locators: Unit 1 {index['sourceCountsByUnit']['1']}, Unit 2 {index['sourceCountsByUnit']['2']}, Unit 3 {index['sourceCountsByUnit']['3']}, Unit 4 {index['sourceCountsByUnit']['4']}. Of these, {sum(not r['isParent'] for r in rows)} are leaf rows. Parent and child counts must not be converted into a percentage of coverage or learner achievement. The local focus labels are navigation groups, not substitutes for official wording. Open the linked official page to read the exact item.

The official PDFs were inspected through the web-rendered source. Direct binary download returned HTTP 403; registry digests identify the privately read normalised web-text unit-content snapshots, NOT PDF binary files. Official PDFs are linked, not redistributed or relicensed. Source-list dates and content effective dates are distinct from the textbook edition.

## Substantive editorial review completed 31 October 2026

All 519 leaf demands were inspected against the actual official source and teaching evidence in 111 meaningful groups. See [the readable editorial review](editorial-review.html), [review JSON](editorial-review.json) and [original follow-up workbook](teaching-follow-up.md). The initial pass found 98 supported and 13 partial groups. New explanations/examples/tasks address identified instructional weaknesses, with independent re-review still pending. Group counts are not a coverage percentage. Network-symbol visual checks and actual debugger/classroom observations remain required where stated. The candidate fields below are retained as the earlier retrieval record, while the added editorial columns report the substantive judgement.

## Suggested evidence, not a coverage declaration

An initial retrieval pass searched nominated chapters, their rendered sections and scaffolded depth modules. It retained existing headings/code/examples/tasks and real formative question IDs as suggestions. A link confirms the resource exists, not that it satisfies the exact item, depth or independent demand. Every candidate row remains **Item review pending** for independent teacher approval, identifies the automated editorial method/date, and leaves independent reviewer/date blank. No source item is marked teacher-verified or signed off.

Retrieval did not nominate an explanation for {gaps['explanation']} rows, a worked example for {gaps['example']}, an independent task for {gaps['independentTask']} or a current formative question for {gaps['practice']}. These are retrieval gaps, NOT confirmed omissions from the entire book. Non-code worked examples or equivalent activities may need manual nomination. Every row also records the unverified school-issued assessment mapping and independent review gap. Do not interpret the existence of a related chapter or project as item-level summative coverage.

Lesson candidates are current allocations for the related chapter, not verified bullet-to-lesson pacing. Public practice sets contain original formative questions, not complete secure papers or proof of representative annual assessment. Project contracts and A03 candidate marking points remain local proposals subject to moderation and adoption.

## Review one row at a time

1. Open the official PDF at the stated 1-based page and check the printed page/content-list bullet locator, including its parent context. These IDs are editorial, not official syllabus identifiers.
2. Read the exact knowledge/skill demand. Check that the suggested explanation directly addresses it; confirm a worked example and a genuinely independent task at the required level. Replace weak candidates or record an explicit gap.
3. Check the actual lesson allocation and prerequisite. A chapter assignment alone does not establish sufficient teaching time or learner readiness.
4. Nominate the precise formative question or issued assessment task/item/marking point; record gaps and the school’s representative sampling rationale. Do not assign an entire project to every programming bullet automatically.
5. Record review outcome, named reviewer/date, versions and evidence limits in a PRIVATE working copy of the CSV. Leave the generated public template unchanged until an authorised update is made. Keep student work and identifiable review evidence under school arrangements.
6. Have an independent curriculum reviewer check the matrix and school-adopted documents before claiming alignment. Use school-review.md; retain unresolved gaps and separate A02/A03 classroom validation.

## Assessment document check

The proposed library retains eight tasks per year and the currently specified category weights: Year 11 Project 40, Theory 20, Practical 10, Examination 30; Year 12 Project 40, Theory 10, Practical 10, Examination 40. Each library task is at least 5% and totals remain 100%. These numerical checks do not approve a school outline, full papers, conditions, item sampling or marking guides. The applicable 2027 WACE Manual and school-issued documents still need school review.

## Historical records

The four older grouped coverage audits and their own dates/edition labels are historical snapshots. They are not silently upgraded to this item inventory or a 2027 sign-off. The previous resource-edition record is archived separately. Current edition metadata does not mean every chapter, slide or downloaded pack was authored/reviewed on the same date.

Original map/review text CC BY 4.0; code MIT. Official SCSA material retains its terms. Independent resource; no SCSA/Department endorsement or certified alignment is claimed.
''')

source_links=''.join(f'<li>Year {s["year"]}: <a href="{s["url"]}">{escape(s["title"])}</a>. Course-page listing updated {escape(s["listedUpdated"])}.</li>' for s in registry['sources'])
html=f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>2027 teaching edition and syllabus map · CS ATAR</title><link rel="stylesheet" href="../style.css"><link rel="stylesheet" href="map.css"></head><body><a class="skip" href="#main">Skip to content</a><main id="main" tabindex="-1"><p><a href="../#audits">← Coverage &amp; audits</a> · <a href="../#sources">About this edition</a> · <a href="../#teaching">Teaching sequence</a></p><p class="eyebrow">2027 TEACHING DRAFT · EDITION 0.49 · CHECKED 30 OCTOBER 2026</p><h1>See the source.<br>Check the evidence.</h1><p class="lede">A current item-level source inventory with suggested teaching links and explicit gaps. Independent item review and school adoption remain pending.</p><ul>{source_links}</ul><div class="notice"><strong>{len(rows)} source locators; 0 signed-off items.</strong> Parent and nested bullets have separate rows. Suggested links are unverified candidates; retrieval gaps are not confirmed content omissions. Official wording stays in the linked syllabus. The local focus label groups textbook material and does not replace that wording.</div><p><a class="button" href="editorial-review.html">Read the completed editorial demand review</a> <a href="teaching-follow-up.md" download>Follow-up explanations and independent tasks</a> · 2026 foundation with <a href="../syllabus-basis.md">2027 revisions</a>.</p><p class="map-actions"><a class="button" href="matrix.csv" download>Editable complete matrix</a><a class="button secondary" href="curriculum-review-pack.zip" download>Download review pack</a><a class="button secondary" href="review-guide.md">Method and limits</a><a class="button secondary" href="school-review.md" download>School review record</a></p><details><summary>What is included, and how are source items numbered?</summary><p>{escape(index['scope'])}</p><p>{escape(index['locatorConvention'])}</p><p>Chapter-level lesson candidates do not prove item-specific pacing. Formal assessment mapping and independent reviewer/date are explicitly unresolved in every row. The 2026 WACE Manual is the edition currently listed; check the applicable 2027 manual and adopted school outline before issue. Historical audit dates remain unchanged.</p></details><section aria-labelledby="matrix-heading"><h2 id="matrix-heading">Inspect the matrix</h2><div class="map-filters"><label>Unit<select id="map-unit"><option value="all">All four units</option>{''.join(f'<option value="{u}">Unit {u} · Year {11 if u<3 else 12}</option>' for u in [1,2,3,4])}</select></label><label>Knowledge / skills<select id="map-kind"><option value="all">Both</option><option>Knowledge</option><option>Skills</option></select></label><label>Evidence view<select id="map-gap"><option value="all">All source items</option><option value="retrieval">With a retrieval gap</option><option value="links">With three teaching-role candidates</option></select></label><label>Search local focus / IDs / resources<input id="map-search" type="search" placeholder="e.g. U3-P12, file, network"></label><label class="map-parent"><input id="map-leaves" type="checkbox"> Leaf items only</label></div><p id="map-status" role="status" aria-live="polite"></p><div class="map-pager"><button id="map-previous-top" type="button">Previous 20</button><span id="map-page-top"></span><button id="map-next-top" type="button">Next 20</button></div><div class="table-scroll"><table><thead><tr><th scope="col">Source item</th><th scope="col">Suggested explanation / example</th><th scope="col">Independent task / formative practice</th><th scope="col">Gaps and review</th></tr></thead><tbody id="map-rows"></tbody></table></div><div class="map-pager"><button id="map-previous" type="button">Previous 20</button><span id="map-page"></span><button id="map-next" type="button">Next 20</button></div><noscript><p>Download the complete CSV above to inspect all source references, suggested evidence and gaps without JavaScript.</p></noscript></section><p>Per-unit editable files: {''.join(f'<a href="unit{u}-matrix.csv" download>Unit {u}</a> ' for u in [1,2,3,4])} · <a href="source-registry.json">Source registry</a> · <a href="assessment-checks.json">Library arithmetic checks</a>.</p><p>Independent resource · Original map CC BY 4.0 · Code MIT · Official sources retain their terms.</p></main><script src="matrix-data.js?v=0.49"></script><script src="map.js?v=0.49"></script></body></html>'''
write(OUT/'index.html',html)
with zipfile.ZipFile(OUT/'curriculum-review-pack.zip','w',zipfile.ZIP_DEFLATED) as z:
    for path in sorted(OUT.iterdir()):
        if path.is_file() and path.suffix in ['.md','.csv','.json']:z.write(path,path.name)
    for name in ['LICENSE-CODE.txt','LICENSE-CONTENT.txt']:z.write(ROOT/name,name)
print('Built 2027 source matrix:',len(rows),'rows;',index['sourceCountsByUnit'],'; no independent approvals inferred.')
