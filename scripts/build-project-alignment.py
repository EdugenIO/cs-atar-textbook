"""Align programming delivery with the canonical Pygame contracts (A01).

Does not change assessment requirements, weights or workshop allocations.
Legacy console examples are retained as labelled optional practice.
"""
from pathlib import Path
import csv, io, json, re, subprocess, zipfile
from html import escape

ROOT=Path(__file__).resolve().parents[1]
DIST=ROOT/'dist'
SITE='https://edugenio.github.io/cs-atar-textbook/'
contracts=json.loads((ROOT/'assessment-source/game-projects.json').read_text(encoding='utf-8'))
catalogue=json.loads((ROOT/'assessment-source/catalogue.json').read_text(encoding='utf-8'))
years={item['year']:item for item in contracts['years']}
options={item['year']:item['tasks'][0]['options'] for item in catalogue['years']}
for year, choices in options.items():
    for option in choices:
        option['brief']=f"assessments/briefs/y{year}-t1-{option['id']}.md"
        option['download']=f"assessments/y{year}-t1-{option['id']}-starter.zip"

def load_js(files,expression):
    code="const fs=require('fs'),vm=require('vm'),c=vm.createContext({});"
    for file in files:code+=f"vm.runInContext(fs.readFileSync({json.dumps(str(DIST/file))},'utf8'),c);"
    code+=f"process.stdout.write(JSON.stringify(vm.runInContext({json.dumps(expression)},c)));"
    return json.loads(subprocess.check_output(['node','-e',code],cwd=ROOT,text=True,encoding="utf-8"))

def write(path,text):
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(text.rstrip()+'\n',encoding='utf-8',newline='\n')

def csvtext(rows):
    output=io.StringIO(newline='');csv.writer(output,lineterminator='\n').writerows(rows);return output.getvalue()

def archive(year,names):
    folder=DIST/'legacy-projects'/f'year{year}'
    folder.mkdir(parents=True,exist_ok=True)
    for name in names:
        target=folder/name
        if target.exists() or not (DIST/name).exists():continue
        body=(DIST/name).read_bytes()
        if name.endswith('.md'):
            body=(f'> Archived console practice. This is not the current Pygame Task 1. See {SITE}#'+('design' if year==11 else 'unit3-project')+'\n\n').encode()+body
        target.write_bytes(body)
    write(folder/'README.md',f'# Legacy Year {year} console practice\n\nThese files preserve the earlier learning example. They are optional practice, not the current Pygame Task 1 brief or deadline. Use the current chapter: {SITE}#'+('design' if year==11 else 'unit3-project')+'\n\nDo not combine legacy requirements with the game contract. Original content CC BY 4.0; original code MIT.')

archive(11,['project-starter.py','project-workbook.md'])
archive(12,['unit3-project-brief.md','unit3-project-workbook.md','unit3-project-requirements.csv','unit3-project-test-log.csv','unit3-project-teacher-guide.md','unit3-project-gantt.csv','unit3-project-gantt.svg','unit3-project-equipment.csv','unit3-project-borrowers.csv','project_support.py','project_starter.py','project_console_starter.py','project_reference.py','project_console.py'])
for name in ['project-starter.py','project_support.py','project_starter.py','project_console_starter.py','project_reference.py','project_console.py']:
    path=DIST/name
    if path.exists() and 'LEGACY CONSOLE PRACTICE' not in path.read_text(encoding='utf-8'):
        text=path.read_text(encoding='utf-8')
        write(path,'"""LEGACY CONSOLE PRACTICE: not the current Pygame Task 1.\nUse '+SITE+'#'+('design' if name=='project-starter.py' else 'unit3-project')+'\nRetained for optional practice and compatibility.\n"""\n'+text)

# Week, lesson, phase, title, activity, check, requirement focus.
SLOTS={11:[
(8,1,'Investigate','Choose a Pygame theme and agree the shared brief','Compare two themes, select one and map all common functional/non-functional requirements to a player need. Keep the same game core for every theme.','Explain the scope and exclusions; show the prerequisite preparation record before project issue.','FR1–FR9; NFR1–NFR7'),
(8,2,'Design','Design game states, functions and one-dimensional lists','Design title/play/pause/result states, function interfaces, collectible-list records, patrols, score history and normal/challenge settings. Desk-check win/loss precedence and predicted tests.','Design checkpoint: explain pause/reset, once-only collection, file policy and independent expected results.','FR1–FR9; NFR1; NFR4'),
(8,3,'Build','Build the game state and controls skeleton','Use the selected scenario shell and supplied fixtures. Implement initial state, documented controls, pause/resume/restart/quit and separate update/draw responsibilities.','Demonstrate start and restart returning score, lives, time and objects to their required initial values.','FR1; FR4; FR6; NFR4'),
(8,4,'Build','Build movement and fixed-layout collision rules','Implement four-direction movement and bounds, then collection and hazard consequences in small testable functions. Use primitive shapes before decorative assets.','Checkpoint: explain a movement boundary test and show one collectible scores only once.','FR2–FR5; FR7'),
(9,3,'Build','Implement score, lives and active-play timing','Integrate five collectibles, three deterministic hazards, safe respawn and 1000 ms protection. Resolve loss before win and keep paused time out of the active timer.','Trace two hits at the protection boundary and verify the zero-time/exit collision outcome.','FR3–FR5; FR7'),
(9,4,'Build','Implement the HUD and score-history functions','Show controls/score/lives/time and shape/text distinctions. Append the final score once, load valid history and compute count, total and first maximum position.','Build checkpoint: test a repeated result update, missing/empty history, malformed lines and a failed write policy.','FR6–FR8; NFR1; NFR5'),
(10,1,'Build','Integrate difficulty choices and the complete game core','Integrate the two fixed patrol intervals, all states and history report. Preserve all other rules and primitive fallbacks. Prepare a known-good version for testing.','Demonstrate normal 1000 ms and challenge 750 ms patrol intervals without changing scoring, item counts or time.','FR1–FR9; NFR4–NFR7'),
(10,2,'Test','Run the common game tests, repair and retest','Use the shared acceptance cases plus function tests. Record expected and actual results, isolate faults and rerun failed and previously passing cases.','Show pause, restart, collision/timer, history and quality evidence; leave unrun checks pending.','All FR/NFR IDs'),
(10,3,'Acceptance','Conduct the player acceptance and quality trial','Ask a peer to use only the instructions. Check usability, non-colour cues, offline paths, reliability and the named-machine response target. Record feedback and retests.','Match observations to NFR IDs; distinguish measured results from intended behaviour.','NFR1–NFR7; affected FR IDs'),
(10,4,'Evaluate','Demonstrate, evaluate and hand over the game','Explain student-authored functions/list/file processing, restore a saved version, evaluate every common requirement and complete the retrospective/source/asset log.','Hand over the selected theme, code, fixtures, workbook and test evidence under the school-issued conditions.','All FR/NFR IDs'),
],12:[
(7,1,'Investigate','Investigate the shared two-map Pygame brief','Compare two themes, select one and identify player needs, fixed scope, exclusions and prerequisite preparation. All themes retain the same Year 12 game core.','Explain the two-map requirement and why no specialist theme mechanics or extra project periods are added.','FR1–FR10; NFR1–NFR7'),
(7,2,'Design','Design actors, maps, dictionaries and game states','Design Actor/Player/Hazard responsibilities, independent tile-map lists, item metadata dictionary, state transitions, file contracts and measurable acceptance criteria.','Show state/class/data sketches with the same requirements IDs as the common game contract.','FR1–FR10; NFR1; NFR4'),
(7,3,'Design','Desk-check search, sort and map-transition algorithms','Write pseudocode for active-item linear search, a taught history-score sort, collision consequences and map completion/loss precedence. Predict boundary, invalid and empty-history outcomes.','Design checkpoint: justify algorithms and trace a duplicate score, missing item, final-map result and zero-time completion.','FR4; FR5; FR7–FR10'),
(7,4,'Build','Build actor interfaces and load the supplied maps','Implement the small actor hierarchy and validate two independent 8 × 10 maps using the supplied tile codes/start/exit rules. Separate game state from drawing.','Show independent map/object state and a concrete malformed-map rejection without silently inventing a map.','FR7; FR8; FR10'),
(8,3,'Build','Implement movement, walls and overridden actor updates','Implement shared movement/bounds and appropriate Player/Hazard update overrides. Use supplied deterministic patrols and primitive geometry.','Test a wall/boundary move and demonstrate that updating one actor does not mutate another actor accidentally.','FR2; FR7; FR8'),
(8,4,'Build','Implement collection, hazards and active timers','Build once-only collection, lives, respawn/protection, score and active-play timer rules with the common fixed counts.','Checkpoint: test repeated collection, protected/unprotected hits and loss-before-completion precedence.','FR3–FR5; FR8'),
(9,3,'Build','Integrate dictionary lookup and history-score ordering','Use the item-ID metadata dictionary and student-written linear search. Implement a taught sort for up to ten valid history scores without confusing record identity with position.','Test missing IDs, duplicate scores, empty history and sorted output; retain the intended original state where required.','FR9; FR10; NFR4'),
(9,4,'Build','Integrate map progression and persistent results','Connect map 1 completion to map 2, carry score/lives, refresh the 90-second map timer, and append one final score. Handle missing/malformed history and failed writes.','Build checkpoint: demonstrate transition state and once-only final save under documented file policies.','FR5; FR7; FR10'),
(10,1,'Build','Integrate instructions, HUD, pause and restart','Finish title/play/pause/result controls, readable feedback and full restart across both maps. Check relative paths and primitive asset fallbacks before freezing a test version.','Demonstrate pause across a long wall-clock interval and restart restoring initial map, score, lives, time and objects.','FR1–FR10; NFR1; NFR5; NFR6'),
(10,2,'Test','Run common acceptance cases and regression checks','Run unit/integration and shared acceptance tests, record actual state/output, repair one cause at a time and repeat earlier passing cases.','Show map validation, OOP/search/sort, transition, timer and file evidence; mark unrun quality checks pending.','All FR/NFR IDs'),
(10,3,'Acceptance','Run the player and named-machine quality trial','Use a peer instruction-only trial and the common reliability/usability/response checks on the nominated school setup. Record limitations, source/asset checks and retests.','Justify the outcome with observed evidence rather than claiming universal performance or complete approval.','NFR1–NFR7; affected FR IDs'),
(10,4,'Evaluate','Demonstrate, restore and evaluate the two-map game','Explain the actor hierarchy, independent maps, dictionary, student search/sort and file policy. Restore a saved version and hand over evidence, evaluation and retrospective.','Evaluate every common FR/NFR ID under the school-issued conditions; explain one limitation and a feasible improvement.','All FR/NFR IDs'),
]}

FILES={11:dict(brief='project-brief.md',workbook='project-workbook.md',teacher='project-teacher-guide.md',requirements='project-requirements.csv',tests='project-test-log.csv',milestones='project-milestones.csv',pack='project-pack.zip'),
       12:dict(brief='unit3-project-brief.md',workbook='unit3-project-workbook.md',teacher='unit3-project-teacher-guide.md',requirements='unit3-project-requirements.csv',tests='unit3-project-test-log.csv',milestones='unit3-project-gantt.csv',pack='unit3-project-pack.zip')}

def requirement_rows(year):
    return [(r['id'],r['text'],r['acceptance']) for kind in ['functional','nonFunctional'] for r in years[year][kind]]

def requirements_md(year):
    return '| ID | Common requirement | Expected acceptance evidence |\n|---|---|---|\n'+'\n'.join('| '+' | '.join(v.replace('|','/') for v in row)+' |' for row in requirement_rows(year))

def milestones_md(year):
    return '| Slot | Week/lesson | Phase | Milestone | Evidence check |\n|---|---|---|---|---|\n'+'\n'.join(f'| {i} | W{w} L{l} | {phase} | {title} | {check} |' for i,(w,l,phase,title,activity,check,focus) in enumerate(SLOTS[year],1))

def theme_links(year,html=False):
    if html:return '<ul>'+''.join(f'<li><strong>{escape(o["title"])}</strong>: <a href="{escape(o["brief"])}" download>scenario brief</a> · <a href="{escape(o["download"])}" download>starter ZIP</a></li>' for o in options[year])+'</ul>'
    return '\n'.join(f'- {o["title"]}: [brief]({SITE+o["brief"]}) · [starter ZIP]({SITE+o["download"]})' for o in options[year])

for year in [11,12]:
    data=years[year];files=FILES[year];n=data['budget'];unit=1 if year==11 else 3
    intro=f'# Year {year} Pygame interactive game · shared project brief\n\nTeaching alignment updated 30 October 2026. Units {unit} / proposed Task 1. This brief follows the existing assessment-library contract; it does not add another weighted task. School-issued conditions and independent moderation remain necessary.\n\n'
    brief=intro+f'## Shared scope\n\n{data["scope"]}\n\n'+('Use functions, parameters/returns and one-dimensional lists. Student-authored classes and nested tile maps are not required for Year 11.\n\n' if year==11 else 'Use the required small actor hierarchy, two independent tile maps, an item dictionary, student linear search and a taught history-score sort.\n\n')
    brief+=f'## Choose one theme, keep the same challenge\n\n{theme_links(year)}\n\nOnly labels, setting and decorative assets vary. Use the common fixture counts, rules, tests and marking guide. Primitive Pygame shapes/text are a complete route. AI-generated decorative assets are permitted under the shared asset policy and source log; no marks are awarded for artistic sophistication. This does not determine the school’s separate rules for AI-generated code.\n\n'
    brief+=f'## Required preparation before issue\n\n{data["prerequisites"]}\n\nThe [Pygame teaching bridge](https://edugenio.github.io/cs-atar-textbook/pygame/) supplies staged practice before project issue. Record the actual school-machine and independent-learner checks; A03 classroom workload/moderation remains pending. Resource availability does not mean preparation has occurred.\n\n## Requirements\n\n'+requirements_md(year)
    brief+='\n\n## Exclusions\n\n'+'\n'.join('- '+s for s in data['excluded'])
    brief+=f'\n\n## Exactly {n} supervised workshops\n\n'+milestones_md(year)+'\n\nKeep the existing teaching weeks and workshop slots. No mandatory home development or extra project periods are assumed. Other lessons in mixed weeks remain in their original strands.\n'
    brief+=f'\n## Authoritative common resources\n\n- [Full common requirements]({SITE}assessments/games/year{year}-requirements.md)\n- [Common marking guide]({SITE}assessments/games/year{year}-marking-guide.md)\n- [Shared expected cases]({SITE}assessments/games/year{year}-acceptance.csv)\n- [Asset policy]({SITE}assessments/games/asset-policy.md)\n\nDo not combine the archived console-project requirements with this game. The supplied shell only draws a static display; assessed game logic remains student-authored and unfinished.\n'
    write(DIST/files['brief'],brief)
    workbook=f'# Year {year} Pygame project workbook\n\nFor the shared game brief and your selected scenario, within {n} existing supervised workshops. This supports the adopted Task 1; it is not an additional assessment. Use fictional game data. The school’s issued conditions govern permitted support, evidence and deadlines.\n\n'
    workbook+='## 1. Investigate and prepare\n\n- Selected theme and two alternatives compared:\n- Intended player/audience and problem:\n- Fixed scope and exclusions accepted:\n- Prior Pygame preparation completed (teacher, lesson/date, event/draw/timing loop, Rect collisions, shell):\n- If preparation is missing, stop issue and re-plan the agreed sequence; do not assume extra homework:\n- School-issued conditions, permitted code/AI support and individual evidence:\n\n'
    workbook+='## 2. Trace every shared requirement\n\nCopy the IDs exactly. Write your design decision and test ID against every functional and non-functional requirement. The common expected evidence is supplied below; record your own actual observations separately.\n\n'+requirements_md(year)
    workbook+='\n\n| Requirement ID | Design decision | Test IDs | Actual evidence location | Met/partly/not met | Limitation |\n|---|---|---|---|---|---|\n'+'\n'.join(f'| {r[0]} | | | | | |' for r in requirement_rows(year))
    workbook+='\n\n## 3. Design before changing state\n\n- State diagram: title/instructions, playing, paused, result; start/resume/restart/quit controls:\n- Update versus draw responsibilities:\n- Collision, once-only scoring, safe respawn/protection and loss precedence pseudocode:\n- File record format, validation/missing/malformed/save-failure policies:\n'
    workbook+=('- Function interfaces with parameters, returns, side effects and one-dimensional collectible/history lists:\n- Normal/challenge interval selection; all other rules unchanged:\n- History count, total and first-maximum algorithm; empty and tied cases:\n' if year==11 else '- Actor base class and Player/Hazard responsibilities, attributes, methods and update override:\n- Independent 8 × 10 map lists, tile values and validation; map transition/reset invariants:\n- Dictionary metadata keys, missing/duplicate policy and active-list linear search:\n- Taught sort choice for up to ten valid history scores; order/multiplicity tests:\n')
    workbook+='\n## 4. Schedule and checkpoints\n\n'+milestones_md(year)+'\n\nAdd dependencies and planned/actual dates to the milestone CSV. Keep a version log: slot, build ID, change, tests run, next action. The design and build checkpoints are part of this project, not additional separately weighted tasks.\n\n'
    workbook+='## 5. Test, repair and retest\n\nUse the supplied common expected cases and this blank actual-evidence log. Predict before running. Include normal, boundary, invalid, empty, repeated, missing-file and failed-write cases. Check pause/reset, once-only collection, hit-protection timing and loss-before-completion. Keep previously passing cases after a repair.\n\n| Test ID | FR/NFR IDs | Setup/action | Expected output/state | Actual output/state | Result/pending | Fix and retest | Build/machine/date |\n|---|---|---|---|---|---|---|---|\n| | | | | | | | |\n\nDo not record expected outcomes as completed tests. Use a named school setup for response/reliability evidence and retain unresolved limitations.\n\n'
    workbook+='## 6. Player acceptance and asset checks\n\n- Peer role label and instruction-only action script:\n- Observations for each common NFR; readable HUD, shapes/text, pause/restart, offline paths and primitive fallback:\n- Actual reliability/response observations and setup (not invented timing):\n- Feedback, change and retest:\n- Asset/source/licence/AI assistance log; no artwork bonus:\n\n## 7. Evaluate and hand over\n\nEvaluate every FR/NFR ID using actual evidence and state limits. Explain your own code/data/algorithm decisions with a fresh input. Restore a saved version and record the checked result. Hand over code, selected fixtures/theme, completed workbook and logs. Record what helped, delays, one justified improvement and the next schedule change.\n\nThe old console examples are optional legacy practice only. They do not replace this brief.\n'
    write(DIST/files['workbook'],workbook)
    write(DIST/files['requirements'],csvtext([['ID','Requirement','Expected acceptance evidence']]+[list(row) for row in requirement_rows(year)]))
    cases=list(csv.reader((DIST/f'assessments/games/year{year}-acceptance.csv').read_text(encoding='utf-8').splitlines()))
    write(DIST/files['tests'],csvtext([cases[0]+['Actual','Result / pending','Correction / retest','Build / machine / date']]+[row+['','','',''] for row in cases[1:]]))
    write(DIST/files['milestones'],csvtext([['Slot','Week','Lesson','Phase','Milestone','Activity','Evidence check','Requirements','Planned date','Actual date','Next action']]+[[i,*slot,'','',''] for i,slot in enumerate(SLOTS[year],1)]))
    teacher=f'# Year {year} Pygame project · teacher delivery notes\n\nA01 alignment, 30 October 2026. Use {n} workshops with phase allocation: '+', '.join(data['schedule'])+'.\n\n'+data['prerequisites']+'\n\nA02 preparation resources are available at https://edugenio.github.io/cs-atar-textbook/pygame/. Actual learner readiness, A03 classroom trial/moderation and A06 replacement project slides remain pending. Do not infer those are complete from this document alignment.\n\n'
    teacher+='## Run a coherent delivery path\n\n1. Adopt the school conditions and common year-level contract/marking guide before issue. Do not change challenge by theme.\n2. Select one of the five supplied starter ZIPs; inspect the README, configuration, fixtures, unfinished student interfaces and display shell. Keep the relative folder structure.\n3. Use the aligned workbook and milestone/test CSVs. Model how to obtain evidence on an unrelated tiny example; do not complete assessed interfaces for students.\n4. Follow the existing project slots; use the first investigation/design checkpoints to check scope and expected tests, then build in slices.\n5. Authenticate individual decisions with explanations, version evidence and fresh changes according to school conditions. Peer acceptance is evidence for the same project, not another weighted task.\n6. Use the full shared marking guide. Primitive shapes and permitted AI decorative assets have equal standing; media sophistication earns no marks.\n7. Record real failures/limits and evaluate every FR/NFR. A static shell launch does not prove an implemented game or a feasible classroom workload.\n\n'
    teacher+='## Expected state examples, not a completed reference game\n\n- A collected item does not score again; restarting restores the original objects.\n- Paused wall-clock time does not consume active-play time.\n- A hit during the 1000 ms protection window does not remove another life.\n- At zero time plus exit completion, loss takes precedence.\n'
    teacher+=('- History [50, 0, 50] gives count 3, total 100, first maximum index 0. Normal and challenge change only the fixed patrol interval.\n' if year==11 else '- Map 1 completion carries score/lives into map 2 with a fresh 90 seconds; final completion wins unless a loss condition is present. Sort retains duplicate scores and reports at most ten valid history entries.\n')
    teacher+='\nUse the canonical acceptance CSV for all remaining checks. Source/asset policies and marking criteria are bundled unchanged. The legacy console packs and slides are explicitly separate optional practice.\n'
    write(DIST/files['teacher'],teacher)

    # ZIP contains all five untouched starter choices and the exact common resources.
    content={name:(DIST/name).read_bytes() for name in files.values() if not name.endswith('.zip')}
    common={'common-requirements.md':f'year{year}-requirements.md','common-marking-guide.md':f'year{year}-marking-guide.md','acceptance-cases.csv':f'year{year}-acceptance.csv','syllabus-map.md':f'year{year}-syllabus-map.md','asset-policy.md':'asset-policy.md','asset-log.csv':'asset-log.csv'}
    for dest,src in common.items():content[dest]=(DIST/'assessments/games'/src).read_bytes()
    for option in options[year]:content['theme-starters/'+Path(option['download']).name]=(DIST/option['download']).read_bytes()
    for name in ['LICENSE-CODE.txt','LICENSE-CONTENT.txt']:content[name]=(ROOT/name).read_bytes()
    content['README.md']=(f'# Year {year} current Pygame project pack\n\nRead {files["brief"]} and {files["workbook"]}. Choose ONE ZIP in theme-starters, extract it to a learning folder, then follow that starter’s setup instructions. The five themes use identical year-level requirements and challenge. Common criteria/fixtures/asset policies are unchanged. The shell is runnable infrastructure; student game logic is unfinished.\n\nWorkshop budget: {n}. Prerequisite Pygame preparation must occur before issue in the agreed sequence. Classroom trial/moderation is still required. The old console project is not this task. Content CC BY 4.0; code MIT.\n').encode()
    with zipfile.ZipFile(DIST/files['pack'],'w',compression=zipfile.ZIP_DEFLATED) as z:
        for name,body in sorted(content.items()):z.writestr(name,body)

# Authoritative lesson data: only the original project slots change.
schedule=load_js(['teaching-planner-data.js'],'teachingSchedule')
for year,unit_number in [(11,1),(12,3)]:
    unit=next(u for u in schedule if u['unit']==unit_number)
    for week,number,phase,title,activity,check,focus in SLOTS[year]:
        lesson=unit['weeks'][week-1]['lessons'][number-1]
        assert lesson['kind']=='Project workshop',(year,week,number)
        lesson.update(title=title,objective=f'{phase}: connect the shared game requirements to an observable outcome.',activity=activity,check=check,
                      chapter='design' if year==11 else 'unit3-project',chapterTitle='Designing and testing solutions' if year==11 else 'Developing a software solution',workbook=FILES[year]['workbook'],gameProjectYear=year,gameRequirements=focus,
                      gameContract=f'assessments/games/year{year}-requirements.md',gamePack=FILES[year]['pack'])
write(DIST/'teaching-planner-data.js','const teachingSchedule = '+json.dumps(schedule,ensure_ascii=False,separators=(',',':'))+';')
rows=[['Unit','Year','Week','Lesson','Semester lesson','Type','Objective','Class activity','Check','Chapter','Project requirements','Project workbook','Project pack']]
for unit in schedule:
    for week in unit['weeks']:
        for lesson in week['lessons']:
            rows.append([unit['unit'],unit['year'],week['week'],lesson['lesson'],lesson['number'],lesson['kind'],lesson['objective'],lesson['activity'],lesson['check'],SITE+'#'+lesson['chapter'],lesson.get('gameContract',''),lesson['workbook'] if lesson.get('gameProjectYear') else '',lesson.get('gamePack','')])
write(DIST/'teaching-lessons.csv',csvtext(rows))
text=(DIST/'teaching-sequence.md').read_text(encoding='utf-8');lines=text.splitlines();unit_number=None
for index,line in enumerate(lines):
    found=re.match(r'## Unit (\d+)',line)
    if found:unit_number=int(found[1])
    found=re.match(r'\| (\d+) \|',line)
    if found and unit_number in [1,3]:
        week=int(found[1]);unit=next(u for u in schedule if u['unit']==unit_number)
        if any(slot[0]==week for slot in SLOTS[unit['year']]):
            data=unit['weeks'][week-1]
            lines[index]=f'| {week} | '+data['title']+' | '+'<br>'.join(str(lesson['lesson'])+'. '+lesson['activity'] for lesson in data['lessons'])+' |'
    if line.startswith('Project:') and unit_number in [1,3]:
        year=11 if unit_number==1 else 12
        lines[index]=f'Project: the shared Year {year} Pygame interactive game, with five equivalent theme choices and {years[year]["budget"]} existing project workshops. Use {FILES[year]["brief"]}, {FILES[year]["workbook"]} and the canonical year-level FR/NFR contract. '+years[year]['scope']+' Required Pygame preparation must be taught before issue in the agreed sequence; missing preparation requires re-planning, not mandatory home development. Archived console examples are separate optional practice.'
write(DIST/'teaching-sequence.md','\n'.join(lines).replace('from the Unit 3 equipment-loan application','from the Unit 3 Pygame game'))

# Replace only the two current project chapter objects; keep routes/headings stable.
originals=load_js(['chapters.js','project-chapter.js','unit3-chapters.js'],'chapters.filter(c=>["design","unit3-project"].includes(c.id))')
for ch in originals:
    year=11 if ch['id']=='design' else 12;data=years[year];files=FILES[year]
    ch['intro']=f'Investigate, design, build and evaluate the shared Year {year} Pygame game using one equivalent theme and {data["budget"]} existing supervised workshops.'
    ch['badge']=f'PYGAME / YEAR {year} PROJECT'
    ch['objectives']=['Trace the shared functional and non-functional requirements into design and tests.', 'Develop the fixed-scope game using the required year-level structures and supplied fixtures.', 'Use actual test/acceptance evidence, versions and a retrospective to evaluate the result.']
    ch.pop('code',None)
    table='<div class="table-scroll"><table><thead><tr><th scope="col">ID</th><th scope="col">Common requirement</th><th scope="col">Expected evidence</th></tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+escape(v)+'</td>' for v in row)+'</tr>' for row in requirement_rows(year))+'</tbody></table></div>'
    links=f'<p><a class="button" href="{files["brief"]}" download>Current game brief</a><a class="button secondary" href="{files["workbook"]}" download>Aligned project workbook</a><a class="button secondary" href="{files["pack"]}" download>All five theme starters and teaching pack</a></p>'
    scope='<p>'+escape(data['scope'])+'</p><p>Choose one theme below. Only setting, labels and decorative assets change; rules, counts, fixtures, tests and marking guide are shared. Primitive shapes/text and permitted AI decorative assets have equal standing. Artwork earns no extra marks. School-issued code-assistance rules remain separate.</p>'+theme_links(year,True)
    gate='<div class="notice"><strong>Before project issue:</strong> '+escape(data['prerequisites'])+' Use the scaffolded Pygame practice linked below and record actual readiness. Classroom workload/moderation remains pending (A03); resource availability does not certify preparation.</div>'
    requirement='<p>Use the common FR/NFR IDs throughout your workbook, tests and evaluation. Do not reuse the legacy console requirements.</p><details><summary>Read every shared functional/non-functional requirement</summary>'+table+'</details><p><a href="'+f'assessments/games/year{year}-requirements.md'+'" download>Full year-level contract</a> · <a href="'+f'assessments/games/year{year}-marking-guide.md'+'" download>Common marking guide</a></p>'
    design='<p>Draw the title/instructions, playing, paused and result states first. Show start, pause/resume, restart and quit; specify loss-before-completion precedence. Keep state updates separate from drawing. Design collision, respawn/protection and once-only scoring before connecting the display.</p>'
    design+=('<p>Use student-written functions with parameters/returns and one-dimensional collectible/history lists. Define file validation and count/total/first-maximum behaviour for empty and tied histories. Student classes and nested maps are not required.</p>' if year==11 else '<p>Design Actor with Player/Hazard subclasses and a relevant update override; preserve independent objects and two independent 8 × 10 map lists. Define the item-ID metadata dictionary, active-list linear search and a taught sort for at most ten valid history scores.</p>')
    algorithms='<p>Write pseudocode and trace a collected item twice, a protected hit, zero-time plus exit completion, pause/resume and full restart. '+('For history [50, 0, 50], predict count 3, total 100 and first maximum index 0. Normal/challenge changes only the fixed patrol interval.' if year==11 else 'Trace map 1 completion into map 2 with carried score/lives and fresh time, a missing item ID, duplicate history scores and malformed map/history input.')+'</p>'
    build='<p>Implement a small slice, predict its state/output, run it and record actual evidence before adding another slice. Use supplied deterministic layouts and primitive shapes first. The starter display shell is infrastructure, not a finished game. Keep version checkpoints and isolate game rules from input/drawing and file I/O.</p>'
    test=f'<p>Start with the <a href="assessments/games/year{year}-acceptance.csv" download>shared expected cases</a> and record your own actual results in the <a href="{files["tests"]}" download>game test log</a>. Cover normal, boundary, invalid, empty, repeated and file-failure cases. A pause crossing 90 wall-clock seconds must not consume active-play time. A rejected operation should preserve the appropriate state.</p><p>Retest the original failure and previously passing cases. Record build, machine and limitations for the common quality trials. Expected outcomes or an unrun test are not completed evidence.</p>'
    evaluate='<p>A peer acts as a player and follows the supplied instructions without coaching. Match usability, readability, non-colour cues, pause/reset, relative paths, primitive fallbacks and measured reliability/response observations to the NFR IDs. Evaluate every FR/NFR as met, partly met or not met using evidence. Explain your own algorithms and one fresh change; restore a known version and record its behaviour.</p><p>Complete the source/asset/assistance log and developer retrospective. The checkpoint and acceptance trial belong to this same project, not extra weighted tasks. Classroom trial and school moderation still govern readiness for formal issue.</p>'
    schedule_html='<div class="table-scroll"><table><thead><tr><th scope="col">Slot</th><th scope="col">Week/lesson</th><th scope="col">Milestone</th><th scope="col">Evidence</th></tr></thead><tbody>'+''.join(f'<tr><td>{i}</td><td>W{w} L{l}</td><td>{escape(title)}</td><td>{escape(check)}</td></tr>' for i,(w,l,phase,title,activity,check,focus) in enumerate(SLOTS[year],1))+'</tbody></table></div>'
    resources=links+f'<p><a href="{files["milestones"]}" download>Workshop milestone CSV</a> · <a href="{files["teacher"]}" download>Teacher delivery notes</a> · <a href="legacy-projects/index.html">Optional legacy console practice</a></p><p>Current workshop cards use this workbook and game contract. Old console-project slides are labelled legacy and are not linked as the current project presentation; replacement project slides belong to A06.</p>'
    content11=[scope+gate+requirement,'<p>Keep exactly ten supervised slots: one investigate, one design, five build, two test/acceptance and one evaluation/handover. Preserve other lessons and the exam block. Do not make core completion depend on extra periods or home coding.</p>'+schedule_html,design+algorithms,build,test,'<p>Classify syntax, runtime and logic faults. Trace the first incorrect state, repair one cause and retain a regression case. Examples include repeated scoring, spending paused time, saving a result twice and changing state after a loss. Do not hide a missing implementation or save failure behind a success message.</p>',evaluate,resources]
    content12=[scope+gate,requirement,design,algorithms,build,'<p>Keep exactly twelve supervised slots: one investigate, two design, six build/integrate, two test/acceptance and one evaluation/handover. No extra project periods or mandatory home-development dependency.</p>'+schedule_html,test,evaluate,resources+f'<p><a href="unit3-project-gantt.svg">View the aligned phase Gantt</a>. The milestone CSV gives each exact week/lesson slot.</p>']
    ch['sections']=[[heading,body] for (heading,_),body in zip(ch['sections'],content11 if year==11 else content12)]
    ch['practice']=[['Scope','Can a theme add flight, physics or a specialist mechanic to earn extra marks?','No. Keep the same shared core; only labels, setting and decorative assets vary. Primitive shapes can meet the media requirements.'],['Design','Why separate update rules from drawing?','Rules can be tested with controlled state, and redrawing must not move actors or add points.'],['Test','What happens if time reaches zero in the same update as exit completion?','The common contract resolves loss before completion. Test that exact boundary and preserve the case.'],['Evaluate','Does a runnable display shell prove the whole project meets its requirements?','No. It demonstrates infrastructure only. The student game logic and actual acceptance/quality evidence remain necessary.']]
    ch['task']=f'Use one Year {year} theme starter and the aligned workbook to investigate, design, implement, test and evaluate the shared Pygame core. Keep the {data["budget"]} supervised workshop budget and all common FR/NFR requirements. Record actual evidence and use the school-issued conditions.'
    ch['solution']='# Illustrative planning evidence only — not a completed game.\n# Collect an active item once -> +10 and item inactive.\n# Collect it again -> unchanged score.\n# Pause -> active timer and positions unchanged.\n# Zero time plus exit completion -> loss.\n# Evaluate every common FR/NFR with actual observations.\n'
    ch['recap']='Keep one equivalent theme within the shared year-level game contract. Plan states and data, build in tested slices, preserve expected/actual evidence, and evaluate the same FR/NFR IDs.'
    ch['lessons']=['Agree the shared brief, prerequisites and fixed scope.','Design year-level data, state/algorithm contracts and expected tests.','Build and integrate in the allocated workshops; record versions and corrections.','Run common tests and player acceptance, then evaluate and hand over evidence.']
    ch['reference']='https://www.pygame.org/docs/';ch['refTitle']='Pygame technical reference; year-level game contract linked above'
    ch['quiz']={'q':'Which change keeps the five project themes equivalent?','options':['Change only the labels and permitted decorative assets','Give one theme a more advanced physics system','Award bonus marks for purchased artwork'],'answer':0,'explanation':'The common rules, data, tests and marking guide are shared; theme differences are decorative.'}
    if year==11:write(DIST/'project-chapter.js','chapters.push('+json.dumps(ch,ensure_ascii=False,indent=2)+');')
    else:
        text=(DIST/'unit3-chapters.js').read_text(encoding='utf-8');replaced=[0]
        def replace(match):
            item=json.loads(match.group(1))
            if item['id']!='unit3-project':return match.group(0)
            replaced[0]+=1;return 'chapters.push('+json.dumps(ch,ensure_ascii=False,indent=2)+');'
        text=re.sub(r'chapters\.push\((\{.*?\n\})\);',replace,text,flags=re.S)
        assert replaced[0]==1
        write(DIST/'unit3-chapters.js',text)

# The related visual guides must use the new game context too.
for file,var,id in [('learning-guides-unit1.js','unit1LearningGuides','design'),('learning-guides-unit3.js','unit3LearningGuides','unit3-project')]:
    guides=load_js([file],var);old=guides[id]
    guides[id]={'anchor':old['anchor'],'title':'Trace the required game state','lead':'Predict the outcome before running a controlled test.','kind':'trace','columns':['Initial state / action','Expected state','Evidence'],
      'rows':[['Active item; collect','Score +10; item inactive','Collection function result'],['Same inactive item; collect again','Score unchanged','Repeat-call regression'],['Restart after a result','Initial score, lives, time and objects','Full-state acceptance check']],
      'caption':'The shared game contract defines observable state; a screenshot alone cannot establish all transitions.',
      'predict':'What should happen on the second collection, and which state must restart restore?',
      'answer':'The second collection adds no points. Restart restores the common initial game state, including objects and active-play time, not only the displayed score.',
      'retry':'Pause long enough to cross 90 wall-clock seconds. Explain which values must remain unchanged and how you would record evidence.'}
    write(DIST/file,'const '+var+' = '+json.dumps(guides,ensure_ascii=False,indent=2)+';')

# Mark the ten existing Unit 1 project decks as legacy without changing their slides.
legacy_slide_ids=[]
for path in sorted((ROOT/'slide-source').glob('unit1-week*.json')):
    data=json.loads(path.read_text(encoding='utf-8'));changed=False
    for lesson in data['lessons']:
        if any(lesson['id']==f'u1-w{week:02d}-l{number:02d}' for week,number,*_ in SLOTS[11]):
            lesson['legacyProject']=True;lesson['currentProject']='design';legacy_slide_ids.append(lesson['id']);changed=True
    if changed:write(path,json.dumps(data,ensure_ascii=False,indent=2))
assert len(legacy_slide_ids)==10

# Existing full-slide bundle retains its decks, with an explicit current-project note.
slide_bundle=DIST/'slides/unit1-all-lesson-slides.zip'
with zipfile.ZipFile(slide_bundle) as z:contents={info.filename:(info,z.read(info.filename)) for info in z.infolist()}
note='LEGACY-PROJECT-NOTE.md'
message='# Project-slide status\n\nThe ten Unit 1 project-workshop decks ('+', '.join(sorted(legacy_slide_ids))+') retain the older console learning example. They are optional legacy practice, not the current Pygame Task 1. Use '+SITE+'#design and its aligned workbook/contract for the current project. Replacement project decks remain A06 work. Other Unit 1 lessons retain their existing purpose.\n'
with zipfile.ZipFile(slide_bundle,'w',compression=zipfile.ZIP_DEFLATED) as z:
    for name,(info,body) in contents.items():
        if name!=note:z.writestr(info,body)
    z.writestr(note,message)

# Simple phase Gantt, backed by the exact twelve-row milestone CSV.
phases=[('Investigate',0,1),('Design',1,2),('Build / integrate',3,6),('Test / acceptance',9,2),('Evaluate / handover',11,1)]
svg='<svg xmlns="http://www.w3.org/2000/svg" width="960" height="350" viewBox="0 0 960 350" role="img" aria-labelledby="title desc"><title id="title">Year 12 Pygame project: twelve workshop slots</title><desc id="desc">One investigate, two design, six build/integrate, two test/acceptance and one evaluation/handover slot. Exact weeks and lessons are in the milestone CSV.</desc><rect width="960" height="350" fill="#fcfbf7"/><g font-family="sans-serif" fill="#18322d"><text x="20" y="25" font-size="18">Year 12 Pygame project · twelve existing workshops</text>'
for slot in range(12):svg+=f'<text x="{210+slot*56}" y="55" font-size="13">{slot+1}</text>'
for i,(name,start,length) in enumerate(phases):svg+=f'<text x="20" y="{95+i*43}" font-size="14">{escape(name)}</text><rect x="{200+start*56}" y="{75+i*43}" width="{length*56-4}" height="27" rx="4" fill="#285747"/>'
svg+='<text x="20" y="325" font-size="11">Slots: '+escape(' · '.join(f'W{w}L{l}' for w,l,*_ in SLOTS[12]))+'</text></g></svg>'
write(DIST/'unit3-project-gantt.svg',svg)
with zipfile.ZipFile(DIST/FILES[12]['pack'],'a') as z:z.writestr('unit3-project-gantt.svg',svg+'\n')

legacy_html='<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Legacy console practice · CS ATAR</title><link rel="stylesheet" href="../style.css"></head><body><main><h1>Legacy console practice</h1><div class="notice">Optional earlier learning examples. These are not the current Pygame Task 1 briefs, requirements or deadlines.</div>'
for year in [11,12]:
    legacy_html+=f'<h2>Year {year}</h2><p><a class="button" href="../#'+('design' if year==11 else 'unit3-project')+'">Open the current Pygame project</a></p><ul>'
    legacy_html+=''.join(f'<li><a href="year{year}/{escape(p.name)}" download>{escape(p.name)}</a></li>' for p in sorted((DIST/'legacy-projects'/f'year{year}').iterdir()) if p.is_file())+'</ul>'
legacy_html+='<h2>Legacy Unit 1 project slides</h2><p>These decks use the older console project. Use the aligned workbook for current Pygame workshops; new project presentations remain A06 work.</p><ul>'+''.join(f'<li><a href="../slides/?lesson={id}">{id}: legacy practice slides</a></li>' for id in sorted(legacy_slide_ids))+'</ul><p><a href="../#teaching">Teaching sequence</a></p></main></body></html>'
write(DIST/'legacy-projects/index.html',legacy_html)

manifest={'updated':'30 October 2026','task':'A01','years':{str(y):{'budget':years[y]['budget'],'files':FILES[y],'slots':[{'week':s[0],'lesson':s[1],'phase':s[2],'title':s[3]} for s in SLOTS[y]],'themes':[o['id'] for o in options[y]]} for y in [11,12]},'legacySlideIds':sorted(legacy_slide_ids),'pending':['A02 school-machine and independent-learner verification','A03 classroom trial and moderation','A06 replacement project slides']}
write(DIST/'project-alignment.json',json.dumps(manifest,ensure_ascii=False,indent=2))
print('Aligned 22 project slots, two chapters/workbooks and two five-theme teaching packs; ten console decks explicitly retained as legacy.')
