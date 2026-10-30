"""A03: reproducible desk review, blank trial records and candidate mark anchors.

Never creates classroom observations, moderator scores or approval signatures.
"""
from pathlib import Path
from html import escape
import csv, io, json, hashlib, zipfile

ROOT=Path(__file__).resolve().parents[1]
DIST=ROOT/'dist'
OUT=DIST/'project-trial'
OUT.mkdir(exist_ok=True)
contracts=json.loads((ROOT/'assessment-source/game-projects.json').read_text(encoding='utf-8'))
candidate=json.loads((ROOT/'assessment-source/project-moderation.json').read_text(encoding='utf-8'))
alignment=json.loads((DIST/'project-alignment.json').read_text(encoding='utf-8'))
catalogue=json.loads((ROOT/'assessment-source/catalogue.json').read_text(encoding='utf-8'))

def write(name,text):
    (OUT/name).write_text(text.rstrip()+'\n',encoding='utf-8',newline='\n')

def csvtext(rows):
    result=io.StringIO(newline='');csv.writer(result,lineterminator='\n').writerows(rows);return result.getvalue()

protocol='''# Project workload trial and marking moderation · A03

Prepared 30 October 2026. **Pack ready; classroom trial and independent moderation not performed.** No actual times, student scores or reviewer approvals have been supplied. Blank records are deliberate. This pack supports Year 11 Unit 1 Task 1 and Year 12 Unit 3 Task 1 only; database projects/tests/exams are unchanged.

## What this pack does

It preserves the fixed game contracts, five equivalent themes per year, existing workshop slots, raw 100-mark totals and annual task weights. The point-by-point interpretation is a CANDIDATE for two-teacher review. It does not silently replace the published common guide or constitute an SCSA key. If adopted, publish one agreed interpretation with the task for ALL themes before issue. Keep the original version and record all changes; never decide new criteria after seeing assessed work.

The desk review checks documents and arithmetic. It does not estimate novice coding speed, complete either full assessment game, establish pupil readiness or certify syllabus coverage. A02 worked-lab/SDL tests are prerequisite infrastructure checks, not a full-core workload trial. A04 remains the item-level 2027 syllabus review.

## 1. Freeze the trial conditions

Use source-fingerprints.csv to identify the pack-build contract/guide/starter files; verify the actual copies used and record the frozen version. Complete trial-setup.csv before starting: year, task/contract/guide versions, theme, dates, actual period length, nominated PC/OS/Python/Pygame, school conditions, allowed assistance, access arrangements, baseline readiness, and release criteria. Copy the relevant blank logs per participant using a local anonymous ID. Keep identifiable samples and actual records in the school’s approved private location; this public static site does not collect uploads.

Use the A02 readiness check first. Record missing preparation explicitly. Select participants with different demonstrated prerequisite readiness where feasible; record selection and limitations rather than treating one experienced teacher as representative of every learner. Use school-approved arrangements for any student pilot; do not turn an ungraded pilot into an unannounced weighted assessment.

## 2. Run a complete core per year

First, an experienced teacher attempts the full fixed core from the same unfinished starter and records actual development, testing and documentation time. This exposes ambiguous rules and missing resources; it supplies no novice completion estimate. Then observe prepared learners under the agreed support conditions. No complete reference game is included in this pack.

Use the exact 10 Year 11 / 12 Year 12 workshops listed in the logs. Include investigation, design, implementation, testing/acceptance, evaluation and handover; do not time only a playable prototype. Start with primitives and supplied fixtures. Record setup losses, actual available minutes, independent work, teacher-guided work, individual support episodes, incomplete requirements and any off-timetable work separately. Do not add overlapping time categories. In workload-log.csv, Actual available minutes means attended session time BEFORE setup/admin loss. Check that setup/admin + independent + guided + other/unused equals that session total. Usable learning time is session total minus setup/admin; support-log minutes are a subset of guided time, not an extra addition. Do not silently add homework or consume A02 preparation inside the project budget.

The logs propose 55-minute periods for planning, not measured durations. Replace this with the actual timetable before trial. A 50-minute scenario is included in the budget table. Slot capacity is a ceiling for all activity, not a promised amount of coding time. Record absence/technical disruption; distinguish them from conceptual difficulty.

## 3. Record outcomes, including failures

Run the common acceptance cases plus the supplemental cases. requirement-outcomes.csv has one row for EVERY FR/NFR, with the exact contract text/expected evidence, a related marking item and blank observed result. Use met/partly met/not met/not tested and cite an actual build/test/observation. A failed test is a useful trial result; an unrun test is not a pass. Observe five individual pause-response times on the named PC, the two-minute reliability trial, the 95-second pause and all reset/terminal boundaries.

The 1000 ms hit-protection and other fixture timings need controlled state setup/test instrumentation. Record how it was produced and keep test-only shortcuts separate from the assessed release. Instrumentation must not replace learner-authored logic or supply unapproved support. Include first/last/remaining items, empty/duplicate history, failed writes and Year 12 map validation/progression, independent objects and student search/sort.

## 4. Moderate independently

Give two teachers the SAME frozen evidence sample, common contract/guide and candidate point sheet. Include a complete example, an incomplete example, a boundary case and a testing-strong/product-weak example when actual samples exist. Record the evidence selection and missing profiles. Do not invent student samples: the synthetic calibration cases are reasoning exercises only.

Each teacher marks independently before seeing the other’s scores. Record each point 0/1 with an evidence location and reason; sum to the unchanged parent item/category totals. Under this candidate scheme, partial item credit is the number of one-mark points demonstrated: no unexplained holistic fraction or half-mark. Leave unmarked entries blank. Award zero where a point is not demonstrated after review; record missing evidence rather than guessing. Evidence genuinely unavailable to the reviewer must be obtained before resolving that point.

Compare every item/point discrepancy, not merely whether the totals happen to match. Do not average away disagreement. Check descriptor ambiguity, duplicate penalties, attribution of supplied work and whether the same evidence is being assessed for genuinely different reasons. Record the agreed decision, rationale, changed wording and version; re-mark affected samples using the agreed interpretation. A teacher may reject or revise candidate points if the common scope is better represented another way; preserve all item/category totals unless the task is formally revised before issue.

Credit implemented behaviour under C items, designed reasoning under D, test evidence under T and evaluation under E. A working screenshot is not proof of student search/OOP authorship; broken software can still earn valid testing/evaluation marks. A missed performance target does not erase accurately measured testing evidence. If no fault was found, retain the actual trace and submission-build reruns described in T2; do not invent a defect merely to earn testing marks. A single sort-library substitution loses the student-sort point, not automatically every report/design/testing point. Primitive shapes, original artwork and permitted AI decoration have identical maxima.

## 5. Check theme equivalence and workload

Record all five themes using the same fixtures/core tests/point sheet. Package-byte equality establishes shared source/fixtures, not equal usability or completion times. A theme rename must not imply flight, stealth, buoyancy, specialist simulation or other extra mechanics. Inspect label clarity and primitive fallback on each theme. Do not require five full learner builds: trial one full core per year, then compare all skins with the common fixtures and at least a changed-theme boundary check; record what was and was not actually run. Broaden the trial if theme-specific differences emerge.

Summarise each participant’s available and observed time, completed phases, all FR/NFR outcomes, support and extra-work minutes. Report unfinished attempts and the participant denominator; do not present completers alone as a success rate. Report individual spread and readiness limitations rather than treating an experienced-teacher time or a median as proof for everyone. Set local success/support criteria BEFORE the trial; this pack supplies no invented completion-rate threshold.

## 6. Decide and record release

Use release-decision.md: ready / revise and re-trial / hold. Resolve missing school-machine checks, material workload overload, ambiguous marking and theme differences before formal issue. If core work does not fit, revise support/preparation or the common scope through the school process, apply changes equally to every theme and dependent contract/guide/workbook/starter, then re-trial. Keep weights and total course allocations under school review; never hide changes in one theme or award extra polish marks. Confirm the adopted school outline, current 2027 syllabus and conditions separately (A04).

Publish the frozen task, common interpretation, permitted assistance and access arrangements before assessment. Keep completed moderation evidence privately. Leave A03 open until a dated full-core trial per year and a second teacher’s actual review/sign-off are recorded. This pack being downloadable is not that evidence.

## Official reference and local choices

SCSA states that teachers develop school-based tasks to meet the course syllabus and conduct them under the school’s senior secondary assessment policy. Use its school-based assessment page and current course documents. The two-teacher workflow, local logs, point anchors and timing scenarios here are original proposed procedures, not claimed SCSA numerical rules.

- https://senior-secondary.scsa.wa.edu.au/assessment/school-based-assessment
- https://senior-secondary.scsa.wa.edu.au/syllabus-and-support-materials/technologies/computer-science

Original text CC BY 4.0; code MIT. This public pack contains no completed student records.
'''
write('README.md',protocol)

budget_rows=[['Year','Phase','Slots','50-minute capacity','55-minute capacity','Evidence status']]
slot_rows=[['Year','Participant local ID','Trial date','Theme','Slot','Week','Lesson','Phase','Milestone','Planned period minutes','Actual available minutes','Setup/admin lost minutes','Independent work minutes','Guided work minutes','Other/unused minutes','Off-timetable extra minutes','Requirement/build evidence','Incomplete / blocker','Next action']]
point_rows=[]
coverage_rows=[['Year','Requirement','Contract text','Expected evidence','Related parent items (not a syllabus audit)','Trial/build/date','Observed evidence','Outcome: met/partly/not met/not tested','Support / blocker','Reviewer']]
score_header=['Year','Sample local ID','Contract / guide version','Point','Parent item','Category','Max','Candidate evidence','Marker A score (0/1)','A evidence/reason','Marker B score (0/1)','B evidence/reason','Agreed score (0/1)','Resolution / rationale','Reviewer / date']
score_rows=[score_header]
adoption=[['Year','Candidate version','Common guide version','Independent reviewer','Date','Adopt / revise / reject','Changed point IDs','Reason / evidence','Agreed issued version','School authorisation / date']]
for contract in contracts['years']:
    year=contract['year'];meta=alignment['years'][str(year)];rubric=next(y for y in candidate['years'] if y['year']==year)
    assert sum(c['marks'] for c in contract['rubric'])==100
    assert sum(len(item['points']) for item in rubric['items'])==100
    for group in contract['rubric']:
        members=[i for i in rubric['items'] if i['category']==group['name']]
        assert sum(i['marks'] for i in members)==group['marks']
        for original in group['items']:
            revised=next(i for i in members if i['id']==original['id'])
            assert len(revised['points'])==original['marks']==revised['marks']
    phase_counts={}
    for slot in meta['slots']:
        phase_counts[slot['phase']]=phase_counts.get(slot['phase'],0)+1
    for phase,count in phase_counts.items():budget_rows.append([year,phase,count,count*50,count*55,'Capacity arithmetic only; no observed workload'])
    budget_rows.append([year,'TOTAL',contract['budget'],contract['budget']*50,contract['budget']*55,'No classroom timing supplied'])
    for index,slot in enumerate(meta['slots'],1):
        slot_rows.append([year,'','','',index,slot['week'],slot['lesson'],slot['phase'],slot['title'],55]+['']*9)
    adoption.append([year,candidate['version']]+['']*8)
    weight=next(y for y in catalogue['years'] if y['year']==year)['tasks'][0]['weight']
    text=f'# Year {year} candidate marking interpretation\n\n**NOT independently moderated or adopted.** Version {candidate["version"]}, {candidate["date"]}. Raw 100; annual Task 1 weight remains {weight}%. Apply one agreed version to all five themes. Existing common guide remains authoritative until the school adopts an interpretation before issue. This candidate makes partial item credit explicit without changing category/item totals. No automatic grade boundaries.\n\nEach point is worth one mark: 1 for the stated accurate/relevant demonstrated evidence, 0 if not demonstrated after review. Do not infer unrelated points from a case. The same artifact may support design, implementation and testing only when it provides each distinct kind of evidence; do not award it three times merely for existing. No extra marks for art, assets, mechanics or feature count. The teacher records point evidence and resolves discrepancies with the second marker.\n\n'
    for item in rubric['items']:
        text+=f'## {item["id"]} · {item["category"]} · {item["marks"]} marks\n\n| Point | Marks | Candidate observable evidence |\n|---|---:|---|\n'
        for point in item['points']:
            text+=f'| {point["id"]} | 1 | {point["evidence"]} |\n'
            score_rows.append([year,'',candidate['version'],point['id'],item['id'],item['category'],1,point['evidence']]+['']*7)
        text+='\n'
    text+='## Adoption and limits\n\nResolve the synthetic calibration cases first, then independently mark actual frozen samples. Use candidate-adoption.csv and the release record; do not describe an AI/editor desk review as a second teacher’s sign-off. Testing marks reward the quality of actual evidence and reasoning, not an automatic all-or-nothing deduction when the product has a defect. Use the original contract/acceptance cases and note all untested FR/NFR. A04 exact syllabus mapping and A03 classroom timing remain pending.\n'
    write(f'year{year}-candidate-marking.md',text)
    for r in contract['functional']+contract['nonFunctional']:
        parents=[item['id'] for item in rubric['items'] if r['id'] in item['requirements']]
        # ALL-tagged I/T/E items are cross-cutting; keep substantive links explicit too.
        parents += [i['id']+' (cross-cutting)' for i in rubric['items'] if 'ALL' in i['requirements']]
        coverage_rows.append([year,r['id'],r['text'],r['acceptance'],'; '.join(parents)]+['']*5)
    cases=list(csv.reader(io.StringIO((DIST/f'assessments/games/year{year}-acceptance.csv').read_text(encoding='utf-8'))))
    extra=[
      ['S01','FR1','Close window and use quit key in supported states; unsupported start input','Documented quit works cleanly and unsupported start input does not start play'],
      ['S02','FR4/FR5','Reach zero lives; retry a result-frame update','Loss; further score/lives do not change'],
      ['S03','FR6/NFR1/NFR6','Peer reads HUD/instructions and identifies every object without audio/colour-only signals','Values and controls legible at 800 × 600; shape/text identifies roles'],
      ['S04','NFR2','Fixed-fixture two-minute run including pause, restart and result','No unhandled exception; record actual duration/build and observed outcome'],
      ['S05','NFR3','Inspect event/render loop while recording five pause responses','Per-frame event handling; Clock.tick(60); no blocking sleeps; record all five individual times'],
      ['S06','NFR4','Inspect named constants, interfaces, comments and launch README','Meaningful names/responsibilities and explanations; record actual evidence locations'],
      ['S07','NFR7','Explain a student-authored change; restore dated backup; inspect source/assistance/asset log','Student explanation and restored version evidenced; supplied work acknowledged; synthetic labels'],
      ['S08','FR8' if year==11 else 'FR10','Result state updated repeatedly, then restart and finish a new run','Exactly one appended final result for each completed run; none at Year 12 map 1 transition'],
      ['S09','FR8' if year==11 else 'FR10','Use unwritable output target; then fix it under documented retry policy','Truthful save failure; usable game; no false saved flag or duplicate record'],
      ['S10','FR8' if year==11 else 'FR10','Empty/missing, malformed and out-of-range history; duplicate scores','Usable missing/empty policy, warning and valid-score preservation; apply year-specific range/report'],
    ]
    extra+=([['S11','FR7','Trace first/last/only collectible through student functions and one-dimensional list','Required functions/parameters/returns explained and once-only list processing observed']] if year==11 else [
      ['S11','FR8','Update mixed Player/Hazard objects; change one instance and reset','Relevant overridden update called; independent objects and rule/draw separation evidenced'],
      ['S12','FR5/FR7','Complete final map; repeat after reset; tie completion with zero lives/time','Map 2 completion wins unless loss is present; restart restores both maps/run state'],
      ['S13','FR9/FR10','History has >10 valid scores with malformed lines between; include duplicates','Select latest ten valid records, order using taught student sort, preserve duplicates; malformed lines do not consume valid-record limit'],
    ])
    write(f'year{year}-trial-tests.csv',csvtext([cases[0]+['Build / setup','Actual outcome','Pass / fail / not run','Observer / date','Support / retest']]+[row+['']*5 for row in cases[1:]+extra]))

fingerprints=[['Year','Resource','Public path','SHA256','Interpretation']]
for year in [11,12]:
    paths=[f'assessments/games/year{year}-{suffix}' for suffix in ['requirements.md','marking-guide.md','acceptance.csv']]
    paths += [f'assessments/y{year}-t1-{theme}-starter.zip' for theme in alignment['years'][str(year)]['themes']]
    paths += [f'project-trial/year{year}-candidate-marking.md']
    for name in paths:
        fingerprints.append([year,Path(name).name,name,hashlib.sha256((DIST/name).read_bytes()).hexdigest(),'Pack-build fingerprint; verify the actual downloaded copy before trial'])
write('source-fingerprints.csv',csvtext(fingerprints))
write('budget-capacity.csv',csvtext(budget_rows))
write('workload-log.csv',csvtext(slot_rows))
write('requirement-outcomes.csv',csvtext(coverage_rows))
write('double-mark-record.csv',csvtext(score_rows))
write('candidate-adoption.csv',csvtext(adoption))
write('trial-setup.csv',csvtext([['Year','Trial local ID','Participant local ID','Role: teacher/learner','Baseline readiness evidence','Theme','Contract version / hash','Guide version','Starter version / hash','Period minutes','PC/OS/Python/Pygame','Dates','Permitted references/assistance','Access arrangements','Local completion/support criteria set before trial','Reviewer','Outcome / scope limits'],[11]+['']*16,[12]+['']*16]))
write('support-log.csv',csvtext([['Year','Participant local ID','Date/slot','Requirement / point','Problem observed','Independent attempt evidence','Support type: prompt/explanation/code/technical','Support minutes (already within session time)','Was support permitted?','Result / new independent check','Observer']]))
write('response-measurements.csv',csvtext([['Year','Participant local ID','Build / PC / OS / versions','Method / timing resolution','Observation','Pause response ms','Within 250 ms?','Actual notes','Observer / date']]+[[year,'','','',i,'','','',''] for year in [11,12] for i in range(1,6)]))
write('theme-equivalence.csv',csvtext([['Year','Theme','Same contract/guide/fixtures version','Primitive route usable','Labels do not add specialist mechanics','Boundary check actually run / build','Observed difference','Decision / equal revision','Reviewer / date']]+[[year,theme]+['']*7 for year in [11,12] for theme in alignment['years'][str(year)]['themes']]))
write('trial-summary.csv',csvtext([['Year','Participant local ID','Role/readiness','Planned / attended slots','Observed available minutes','Independent work minutes','Guided work minutes','Off-timetable minutes','Completed phases','Met / partly / not met / not tested FR-NFR counts','Blockers / support','Representative limits','Ready / revise / hold','Observer / date'],[11]+['']*13,[12]+['']*13]))

calibration=[
 ('K01',11,'C4.8','History [20,0,50,50] returns first maximum position 3. Other C4 evidence is not supplied.','0 for C4.8: expected first maximum index 2. Do not infer scores for the other nine C4 points.'),
 ('K02',12,'C4.9; C4.10','Uses built-in sorted() instead of a student-written taught sort, but correctly selects/displays the latest ten valid history scores.','C4.9=0; C4.10=1 for the independently evidenced report. Do not apply the same authorship defect again to the report point.'),
 ('K03','both','C3.5','At zero time plus exit completion, the game shows win. Other result cases are not supplied.','C3.5=0. Judge other implementation/design/testing points from their own evidence; no blanket category zero.'),
 ('K04','both','T1.2; T2.3; T2.4','An ordinary function test predicts 10, observes 20 and records it with a build. The student explains the repeated-collection cause but has not repaired/retested.','T1.2=1 for actual normal-case test evidence; T2.3=1 for the evidenced cause; T2.4=0. Working-product marks are assessed separately.'),
 ('K05','both','T3.3','Five recorded pause responses are 180, 210, 270, 190, 200 ms; method/setup are identified and the 270 ms failure is explicitly recognised.','T3.3=1 for complete honest measurement/comparison. The response target is not met on this evidence. Do not describe the average as a pass or erase the valid testing mark.'),
 ('K06','both','C1.4','Restart resets score and screen but leaves collected flags/time from the old attempt.','C1.4=0. A clean-looking title screen is insufficient for complete reset.'),
 ('K07','both','ALL','Two otherwise identical, complete evidence samples differ only in primitive shapes versus permitted AI decorative art.','Identical marks for every point. No bonus, penalty or reduced maximum for either asset route.'),
 ('K08','both','C1.3','Paused timer freezes, but the resume frame charges the entire paused wall-clock duration to active play.','C1.3=0. Assess the visibly frozen paused state separately at C1.2 if evidenced.'),
 ('K09',12,'C4.4','The screenshot shows two hazards but a supplied class is used unchanged; no student-authored subclass/independence evidence is supplied.','C4.4=0 on this record. A screenshot or object count alone does not establish student-authored subclass behaviour.'),
 ('K10','both','I3.1; I3.5','The schedule has the correct workshop count, but assumes compulsory weekend coding to finish the core.','I3.1=1 if the actual milestones/slots are evidenced; I3.5=0 if no feasible within-budget risk response is supplied. Flag workload overload independently.'),
]
case_md='# Synthetic calibration exercises\n\nThese are invented boundary cases for discussing the candidate anchors. They are NOT real student work, trial results, whole-project exemplars or evidence of independent moderation. Mark independently before reading the proposed rationale in calibration-rationales.md. Only the listed points can be judged; all other marks remain unknown.\n\n'
key_md='# Proposed calibration rationales\n\nDraft editorial interpretations, not an independent moderator’s decisions. Record disagreement and resolve wording before adoption. No total project mark can be inferred from these snippets.\n\n'
for id,year,points,case,key in calibration:
    case_md+=f'## {id} · Year {year} · {points}\n\n{case}\n\nMarker A: ___ · Marker B: ___ · evidence/reason: ___\n\n'
    key_md+=f'## {id}\n\n{key}\n\n'
write('calibration-cases.md',case_md);write('calibration-rationales.md',key_md)
write('moderation-decisions.csv',csvtext([['Year','Sample / calibration ID','Point/item','Marker A decision','Marker B decision','Evidence location','Disagreement cause','Agreed decision','Rationale / exact wording change','Affected samples to re-mark','Reviewer A/date','Reviewer B/date','Resolved / pending']]))

review='''# A03 desk review · 30 October 2026

**Completed: editorial/document review and capacity arithmetic. Not completed: full-core timed trial, observed learner completion or independent teacher moderation.**

| Finding | Evidence | Proposed response / status |
|---|---|---|
| Partial credit is not reproducible enough. | Both common guides say “in proportion” without item-level anchors. | Candidate provides 100 one-mark evidence points per year; parent item and 15/25/35/15/10 totals unchanged. Requires independent review and adoption. |
| Year 11 wording risks importing Year 12 demand. | D1 says function/class interfaces; C4 describes both years in one sentence. | Separate candidate year-level points: Year 11 functions/1D processing; Year 12 maps/OOP/dictionary/search/sort. Do not penalise Year 11 for no authored classes or nested maps. Current guide not silently replaced. |
| Distinct marks need distinct evidence. | State/collision/timer/data behaviours appear across D/C/T/E. | Explicit ownership and calibration cases distinguish design, implementation, test evidence and evaluation; avoid cascading deductions. Review remaining ambiguities with the second teacher. |
| Common acceptance CSVs are samples, not complete release checks. | Existing files omit explicit append-once/write-failure, full authorship/restore and some Year 12 report checks. | Supplemental trial CSVs retain original cases verbatim and add gap checks. Exact per-requirement outcome rows retain all FR/NFR. |
| Workload arithmetic is constrained. | Year 11: 10 slots, only 5 build slots; Year 12: 12 slots, only 6 build slots. | At 55 min: 550/660 total, 275/330 build capacity. At 50 min: 500/600 total, 250/300 build. Setup/support/documentation also consume available time. No actual completion estimate is asserted. |
| Year 12 contains several interacting dependencies. | Maps/objects/linear search/taught sort/persistence must work together with pause/reset/progression. | Log integration blockers and unfinished requirements; trial the complete core, not isolated snippets. Capacity/feasibility remain unverified. |
| Theme equivalence has two kinds of evidence. | Existing package tests verify shared core files/fixtures; labels/skins may affect clarity. | Keep byte equality checks and add observed all-five-theme label/fallback/boundary review; do not claim five full learner trials. |
| Marks cannot establish readiness by themselves. | Timing trial and independent reviewer results have not been supplied. | All real observation/score/sign-off fields remain blank. A03 stays open until dated evidence is available. |

No requirements, fixtures, task/category weights, workshop counts or controlled tests are changed by this pack. Candidate points are not a complete syllabus mapping; A04 remains separate. Package/regression checks establish document consistency, not novice development time, student outcomes or teacher approval.
'''
write('desk-review.md',review)
write('release-decision.md','''# A03 trial and moderation decision

Status: **PENDING — no trial/moderator evidence recorded.**

- Year / task / theme / frozen contract and guide versions:
- Trial dates, participant count and readiness range:
- Actual full-core time per participant, all completed/unfinished phases and any extra-work minutes:
- Machine/build and requirement/test evidence locations:
- Support permitted/received and observed independent transfer:
- Outcome of all five theme checks (and checks not run):
- Actual double-marked sample IDs and selection rationale:
- Each unresolved item/point discrepancy and its impact:
- Agreed candidate interpretation / changed points / issued version:
- Scope or scaffold changes applied identically to all themes and dependent files:
- Re-trial / re-mark evidence following changes:
- School outline/conditions and current syllabus review reference (A04):
- Decision: READY / REVISE AND RE-TRIAL / HOLD (select only after review):
- Rationale, limitations and next action:
- Teacher A, role, date and recorded approval:
- Independent teacher B, role, date and recorded approval:
- School release authority/reference/date:

Do not pre-fill signatures or infer readiness from this template. A03 closes only after actual dated full-core trial per year and independent review of scope, marking and equivalence. Keep identifiable evidence in the school’s approved private location.
''')

tables=''.join(f'<tr><td>{r[0]}</td><td>{escape(str(r[1]))}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td></tr>' for r in budget_rows[1:])
downloads=[('README.md','Trial and moderation protocol'),('desk-review.md','Completed desk review and unresolved findings'),('trial-setup.csv','Freeze conditions and readiness'),('source-fingerprints.csv','Contract/guide/starter SHA256 fingerprints'),('workload-log.csv','22 scheduled workshop records'),('budget-capacity.csv','50/55-minute capacity arithmetic'),('support-log.csv','Support and blockers'),('requirement-outcomes.csv','Every FR/NFR: actual outcome record'),('response-measurements.csv','Five individual response observations'),('theme-equivalence.csv','All five themes per year'),('double-mark-record.csv','200 blank point-level double-mark records'),('moderation-decisions.csv','Disagreements and resolutions'),('candidate-adoption.csv','Candidate interpretation adoption'),('trial-summary.csv','Participant workload summary'),('release-decision.md','Dated release/re-trial decision'),('calibration-cases.md','Synthetic calibration exercises'),('calibration-rationales.md','Proposed rationales (read after independent marking)'),('year11-candidate-marking.md','Year 11 candidate 100-point interpretation'),('year12-candidate-marking.md','Year 12 candidate 100-point interpretation'),('year11-trial-tests.csv','Year 11 original + supplemental cases'),('year12-trial-tests.csv','Year 12 original + supplemental cases')]
links=''.join(f'<li><a href="{name}" download>{escape(label)}</a></li>' for name,label in downloads)
html=f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Project workload trial and moderation · CS ATAR</title><link rel="stylesheet" href="../style.css"><style>main{{max-width:1040px;margin:auto;padding:32px}}section{{border-top:1px solid var(--line);padding-top:24px;margin-top:32px}}li{{margin-bottom:.6rem}}.trial-actions{{display:flex;gap:12px;flex-wrap:wrap}}.table-scroll{{overflow:auto}}th,td{{text-align:left}}@media print{{.trial-actions{{display:none}}}}</style></head><body><a class="skip" href="#main">Skip to content</a><main id="main" tabindex="-1"><p><a href="../#assessments">← Assessments</a> · <a href="../#teaching">Teaching sequence</a> · <a href="../#audits">Coverage &amp; audits</a></p><p class="eyebrow">A03 · TEACHER TRIAL AND MODERATION</p><h1>Test the workload.<br>Agree the evidence.</h1><p class="lede">A practical pack for trialling the complete Year 11 and Year 12 Pygame projects and independently moderating their marking.</p><div class="trial-actions"><a class="button" href="project-trial-moderation-pack.zip" download>Download the trial pack</a><a class="button secondary" href="README.md">Read the protocol</a><a class="button secondary" href="desk-review.md">Read the desk review</a></div><div class="notice"><strong>Pack ready; real trial and independent moderation pending.</strong> No actual timing, student scores or reviewer approvals have been supplied. Candidate anchors are proposed interpretations of the existing 100 marks; the current common guide remains authoritative until the school adopts an agreed version before issue.</div><section><h2>What is ready</h2><p>The desk review identifies ambiguous partial credit, mixed year-level wording, acceptance-test gaps and constrained build time. Each year has a proposed 100-point interpretation preserving every parent item/category total and the existing task weight. Primitive shapes and all five themes retain the same maximum.</p><p>The synthetic calibration cases help teachers discuss difficult boundaries. They are invented snippets, not student work, actual trial results or a second teacher’s moderation.</p></section><section><h2>Run the trial in six steps</h2><ol><li><strong>Freeze conditions:</strong> record the contract/guide/build, actual period length, nominated PC, allowed help and baseline readiness.</li><li><strong>Attempt a complete core per year:</strong> record a teacher dry run separately from prepared learner attempts. Include documentation, testing and evaluation.</li><li><strong>Observe each scheduled workshop:</strong> use the exact 10/12 slots; record support, losses, unfinished requirements and extra work explicitly.</li><li><strong>Double-mark frozen evidence independently:</strong> compare each discrepancy and agree a rationale; do not average conflicting marks.</li><li><strong>Compare all five themes:</strong> inspect labels and primitive fallbacks against the same rules; record what actually ran.</li><li><strong>Decide ready / revise and re-trial / hold:</strong> record actual teacher decisions and apply any revision equally before issue.</li></ol></section><section><h2>Available time is a ceiling</h2><p>These figures are timetable arithmetic, not measured learner completion times. Setup, support and documentation use this same time. Preparation remains outside the fixed assessed workshops.</p><div class="table-scroll"><table><thead><tr><th scope="col">Year</th><th scope="col">Phase</th><th scope="col">Slots</th><th scope="col">At 50 min</th><th scope="col">At 55 min</th></tr></thead><tbody>{tables}</tbody></table></div></section><section><h2>Editable records and candidate guides</h2><p>Download blank local copies. This static page collects no student submissions; retain identifiable work and completed records in the school’s approved private location.</p><ul>{links}</ul></section><section><h2>Before closing A03</h2><p>Record a dated full-core trial per year, actual FR/NFR outcomes, observed time/support, all-theme checks and a second teacher’s review of the scope and marking. Resolve changes and re-trial before formal issue. A downloadable pack or passing package tests does not establish those outcomes.</p><p><a href="../pygame/">A02 Pygame preparation and readiness</a> · <a href="../assessments/games/year11-marking-guide.md">Current Year 11 guide</a> · <a href="../assessments/games/year12-marking-guide.md">Current Year 12 guide</a></p><p>School-based tasks remain subject to the course syllabus and school assessment policy: <a href="https://senior-secondary.scsa.wa.edu.au/assessment/school-based-assessment">SCSA school-based assessment</a>. The pack’s workflow and candidate points are original proposals, not official SCSA marking rules.</p><p>Original text CC BY 4.0 · Code MIT · Prepared 30 October 2026.</p></section></main></body></html>'''
write('index.html',html)
manifest={'date':'30 October 2026','status':'Pack ready; live trial and independent moderation pending','observationsSupplied':False,'candidateVersion':candidate['version'],'years':[]}
for y in contracts['years']:
    manifest['years'].append({'year':y['year'],'workshops':y['budget'],'candidateMarks':100,'themes':alignment['years'][str(y['year'])]['themes'],'requirements':[r['id'] for r in y['functional']+y['nonFunctional']],'actualTrialCompleted':False,'independentModeratorSigned':False})
write('manifest.json',json.dumps(manifest,ensure_ascii=False,indent=2))
with zipfile.ZipFile(OUT/'project-trial-moderation-pack.zip','w',zipfile.ZIP_DEFLATED) as z:
    for path in sorted(OUT.iterdir()):
        if path.is_file() and path.suffix!='.zip' and path.name!='index.html':z.write(path,path.name)
    for year in [11,12]:
        for suffix in ['requirements.md','marking-guide.md','acceptance.csv']:
            path=DIST/f'assessments/games/year{year}-{suffix}';z.write(path,'current-contracts/'+path.name)
    for name in ['LICENSE-CODE.txt','LICENSE-CONTENT.txt']:z.write(ROOT/name,name)
print('A03 pack built: 22 blank workshop records, 33 FR/NFR outcomes, 200 candidate marking points; no actual trial results or sign-off.')
