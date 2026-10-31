"""Build A02 ungraded Pygame practice and allocate existing pre-project lessons."""
from pathlib import Path
from html import escape
import csv, io, json, re, shutil, subprocess, zipfile

ROOT=Path(__file__).resolve().parents[1]
DIST=ROOT/'dist'
OUT=DIST/'pygame'
OUT.mkdir(exist_ok=True)
SITE='https://edugenio.github.io/cs-atar-textbook/'

# Unit, week, lesson, anchor, title, retained strand, worked focus, faded change, exit check.
LESSONS=[
 (1,4,2,'y11-1','Use a while loop to run an interactive window','condition-controlled loops, counters and accumulators',
  'Predict input → update → draw. Run stage1_loop.py; trace running and a frame counter. Explain events versus held keys, milliseconds versus seconds, screen coordinates and bounds. Model quit handling and Clock.tick(60), without blocking sleeps.',
  'Hide the movement line. Complete it for 160 pixels/second; predict 40 pixels in 250 ms. Add and explain a frame counter; exit using Escape and the window X.',
  'Close both ways; trace a stopping condition; predict movement at 250/500 ms and explain why a frame count is not elapsed seconds.'),
 (1,5,2,'y11-2','Use parameters and returns to separate game rules','parameters, arguments, return values and local scope',
  'Run lab_runner.py 2. Trace new_state(), command() and update(). Identify parameters versus arguments, return a fresh state, and explain deliberate state mutation. Read state["mode"] as a named slot in the supplied state store; this dictionary is provided infrastructure, not a new Year 11 assessment requirement. Model start/pause/resume/reset; inspect remaining active milliseconds before/after a transition.',
  'Complete command() in faded_practice.py, then a movement-only update. Use a separate state for each test. Explain which function returns a value and which changes its argument.',
  'Independently restore every initial value on reset; show a paused 95000 ms update leaves position and active time unchanged. Explain local names and caller-visible mutation.'),
 (1,6,2,'y11-3','Traverse a list to collect stations once','one-dimensional traversal and accumulation',
  'Run lab_runner.py 3. Predict the two active flags and score for repeated contact. Model Rect.colliderect alongside the pure overlap predicate; edge-touching does not collide. Trace loop indices, once-only flags and the score accumulator.',
  'Complete strict overlap and three-station collection in faded_practice.py. Each changed station scores two. Trace inactive entries, repeated contact and the final total; do not remove elements while traversing.',
  'Show edge-touch, one-pixel overlap, repeated contact and two independent state lists. Trace the accumulator to a maximum of six in the changed lab.'),
 (1,7,3,'y11-4','Combine game tests with reading and appending results','file processing, validation and expected/actual test tables',
  'Run lab_runner.py 4. Model append-once after finished, missing/empty history, range validation and visible write failure. Contrast append with overwrite using a disposable file. Trace timeout before collection and events before update.',
  'Complete the changed 0/2/4/6 history policy and once-only save. Finish the changed lab using the scaffold and test table, then explain one fresh teacher-selected change without opening the worked solution.',
  'Submit observed pause/reset/timeout/file evidence and the independent readiness record. Retain the Week 7 Lesson 4 controlled practical unchanged.'),
 (3,1,2,'y12-1','Repair Python skills through a Pygame loop','targeted Python repairs and independent boundary/input checks',
  'Use the Year 11 stage 1–4 files as a rapid re-entry: trace a function call, list mutation, event loop, active timer and file validation. Diagnose one syntax, runtime and logic error on copies. This is a diagnostic, not an assumption that every student has used Pygame.',
  'Complete a teacher-selected missing rule from faded_practice.py; predict/run/explain a changed movement or timeout case and record a targeted repair.',
  'Independently explain input/update/draw and show quit, movement, collision and pause/reset. If unfamiliarity persists, record reteaching required before issuing the project.'),
 (3,2,3,'y12-2','Keep game data independent when functions mutate it','mutation versus rebinding, two-dimensional lists and dictionaries',
  'Run extension12.py. Predict independent 2 × 3 board rows and dictionary lookup; contrast with [[0]*3]*2. Relate local parameter rebinding to changes through a shared reference. Use the lab active list to demonstrate accidental state sharing.',
  'Build a fresh 3 × 2 practice board, pass it to a function that changes one cell, then rebind a local name. Add dictionary metadata for C and test a missing key. Keep this separate from assessed tile maps.',
  'Predict exactly which caller values change and why. Demonstrate independent boards/rows and normal/missing dictionary lookups.'),
 (3,5,3,'y12-3','Encapsulate independent practice indicators','encapsulation, abstraction and defined interfaces',
  'Model Indicator in extension12.py as a public interface. Create two instances, call update and explain independent state. Contrast plain data with a method that validates its argument. Connect to the existing chapter’s Python attribute conventions.',
  'Implement an unrelated CounterIndicator with an add(amount) method that rejects negative increments. Use two objects; explain which details callers need and which are hidden behind the interface.',
  'Show object independence, a rejected update without unintended mutation, and an explanation of encapsulation without claiming Python prevents all direct access.'),
 (3,6,3,'y12-4','Override timed behaviour and test the shared contract','polymorphism, inherited behaviour and boundary testing',
  'Trace Indicator/Pulse update(499), update(1), update(1000). Use the same call on mixed instances; draw a labelled outline when visible changes. Update only during playing so pause freezes the pulse. Model inherited validation and leftover-time preservation.',
  'Implement a new Pulse interval of 300 ms; integrate it into a COPY of the practice runner and show shape/text cues. Retrieve the already-taught student linear search and insertion sort on practice labels/history; no new algorithm lesson replaces search/sort teaching.',
  'Independently pass the changed mini-game and OOP checks, including pause/reset of subclass state, 299/300/900 ms and duplicate/empty/missing search/sort cases. Retain the Week 6 Lesson 4 controlled practical unchanged.'),
]

def write(path,text):
    path.write_text(text.rstrip()+'\n',encoding='utf-8',newline='\n')

def csv_text(rows):
    stream=io.StringIO(newline='');csv.writer(stream,lineterminator='\n').writerows(rows);return stream.getvalue()

for path in (ROOT/'pygame-source').glob('*.py'):
    shutil.copyfile(path,OUT/path.name)
write(OUT/'requirements.txt','pygame==2.6.1')
portable=(ROOT/'tests/pygame-bridge.test.py').read_text(encoding='utf-8-sig').replace('Path(__file__).resolve().parents[1]','Path(__file__).resolve().parent').replace("ROOT/'dist/pygame'",'ROOT')
write(OUT/'check_worked_lab.py',portable)

setup='''# Pygame teaching bridge · ungraded practice

Use this BEFORE assessed implementation. This lab has horizontal movement, two stationary stations and a 20-second timer; it is not an assessment theme or finished Task 1. No lives, patrol hazards, exits or two-map progression are implemented. Code MIT; teaching text CC BY 4.0.

## Setup on the nominated classroom computer

Use a school-approved Python 3 and Pygame installation. In a terminal for the SAME interpreter used by the editor: `python -m pip install -r requirements.txt`. If the school blocks installs, ask IT to prepare the image before class. Do not use lesson time to bypass installation controls. Run `python -c "import sys, pygame; print(sys.version); print(pygame.version.ver)"` and record interpreter, OS, Pygame version and machine label in readiness.csv. The verified local environment is documented in verification.md; it does not establish readiness of every school image.

Extract the whole ZIP into a writable practice folder. Do not run inside the ZIP. No paid assets, external media or network connection is needed after installation. Display a 640 × 360 window. If import fails, check the interpreter; if a window will not open, check the desktop/video driver with IT. The test suite can use SDL's dummy driver for automated checks; pupils need a visible window for keyboard practice.

## Run in stages

1. `python stage1_loop.py`: moving square, held arrows, Escape and window X.
2. `python lab_runner.py 2`: functions and ready/playing/paused/finished states; movement/timer only, no station scoring.
3. `python lab_runner.py 3`: list traversal and two numbered stations; one point each once.
4. `python lab_runner.py 4`: validated history and append-once result. S explicitly retries a failed write.
5. Year 12: `python stage5_oop.py` runs a labelled steady/pulse display; `python extension12.py` prints an independent board, mixed-instance update trace, dictionary fallback, search position and ordered copy. Compare the worked pulse, then add a changed labelled pulse to a copy of the practice display.

Space starts/pauses/resumes, R returns to ready with fresh state, arrows move, Escape/X quit. Start/resume/reset frames discard their elapsed delta; paused wall-clock time is never charged to play. Timeout is checked before collection. Rectangles must overlap; touching edges is not collision. A live debugger breakpoint can cause a large elapsed delta; explain rather than hiding it with a time clamp. This simple teaching loop uses end-of-frame overlap and can skip a station during a very large step; high-speed continuous collision is outside this lab. Do not claim production-quality physics.

## Faded support and independent transfer

Work through predict → run → investigate → modify → make. First model a worked file, then hide a rule, then use faded_practice.py without importing the solution. Its changed challenge has three stations (x 120/300/500), 15 seconds, start x=40, speed 160, two points per station and valid history {0,2,4,6}. After rule tests, copy the runner and adapt its rules import, station drawing/list length, score denominator and labels to those changed values. Keep input/drawing separate. A teacher observes one fresh change after the planned independent attempt; public answers alone do not establish independent readiness.

For Year 12, change the pulse interval to 300 ms, initialise two independent objects, update only during playing and rebuild objects on reset. Use a 3 × 2 board and a different metadata dictionary; trace a missing search result and a taught sort of [2,0,2,1], preserving duplicates and the original list.

Run `python check_worked_lab.py` to check the worked lab (real Pygame with dummy display/input); it does not mark student work or prove physical keyboard readiness. Use the supplied test table; add actual result/build evidence, not a tick copied from expected results. Record support received and what to reteach. This practice is ungraded, is not an extra weighted task and uses no assessed starter interfaces.

## Timing and release gate

Each allocated period is 55 minutes: 5 retrieval/prediction, 10 teacher model, 15 guided practice, 15 faded/changed independent practice, 5 test/explain, 5 exit and version record. This is a proposed pace, not a measured classroom completion claim. With 50-minute periods use 5/10/10/15/5/5; reduce repeated demonstration, not the exit evidence. If students cannot meet the exit check, use recorded targeted reteaching and explicitly re-plan BEFORE project issue. Do not quietly add project workshops, require home coding or displace controlled tests.

The original chapter remains linked for the retained Python objective. The supplied named state store uses dictionary syntax (state["mode"] reads a named slot); explain this infrastructure explicitly instead of assuming prior dictionary knowledge. Year 11 students are not required to author classes or tile maps. A library Rect is a supplied value, not a student-written class. Existing slides cover that original chapter and do not teach this new lab; use the linked worked code and teaching page for the Pygame portion. Replacement/expanded presentations remain A06. No first-use Pygame learning is assumed within the fixed 10/12 assessed workshop budgets.
'''
write(OUT/'README.md',setup)

checks=[
 ('T01','Loop and input','Start stage 1; hold arrows; use Escape then relaunch and window X','Moves at 200 px/s within 0..616; both quit methods close normally'),
 ('T02','Time units','Playing, x=308, no collision; right for 250 ms','x=358; remaining=19750; compare 500 ms and explain rate'),
 ('T03','Pause boundary','Set playing; Space to pause; update 95000 ms; Space to resume with 95000 ms frame delta','Paused state freezes x/time/score/flags; resume transition discards delta; next 16 ms consumes only 16'),
 ('T04','Reset boundary','Move/collect; pause or finish; R with a large frame delta','Ready, x=308, time=20000, score=0, fresh [True,True], saved=False'),
 ('T05','Collision boundary','Player right edge equals station left, then overlaps by one pixel','Touching false; overlap true (compare Rect.colliderect)'),
 ('T06','Once-only scoring','Overlap first station twice','One point only, first flag false; second station unchanged'),
 ('T07','Timeout precedence','1 ms left; overlap active station; update 1 ms','Finished at zero; no last-frame collection point'),
 ('T08','List independence','Create A and B; change A active[0]','B unchanged; explain new_state fresh-list creation'),
 ('T09','History validation','Missing/empty file, then lines 2, bad, 0, 5, 2','Missing/empty => []; valid [2,0,2], warnings for lines 2 and 4'),
 ('T10','Append once and reset','Finish, call save twice, then reset and finish again','One line per finished attempt; reset permits one new line; prior history retained'),
 ('T11','Write failure','Use a directory path as output file','Visible Not saved message; saved=False; explicit retry after fixing path succeeds'),
 ('T12','Independent changed rules','Complete faded_practice without importing lab_rules','3 stations, score 2 once each, max6, 15sec,160px/s,x40; verify pause/reset/timeout and 0/2/4/6 file policy'),
 ('T13','Year12 data','Change board[0][1]; rebind local parameter; missing dictionary key','Other row/board independent; local rebinding does not replace caller object; explicit fallback'),
 ('T14','Year12 objects and overrides','Two Pulse objects; update one with 499,1,1000 ms; reject negative','Other object unchanged; first visible True,False,False; leftover0; negative rejected without mutation'),
 ('T15','Year12 independent pulse','Changed interval300; steps299,1,900; pause then reset','True,False,True; pause freezes elapsed; reset recreates initial subclass state'),
 ('T16','Year12 algorithms','Find missing label; sort [], [2,0,2,1]','-1; []; [0,1,2,2]; original list unchanged and duplicates preserved'),
]
write(OUT/'practice-tests.csv',csv_text([['Test ID','Focus','Setup / action','Expected','Actual','Build','Result / support','Retest']]+[[*r,'','','',''] for r in checks]))
write(OUT/'readiness.csv',csv_text([['Year','Student / local ID','Machine / OS','Python interpreter / version','Pygame version','Visible window and input','Loop / timing explanation','Pause / reset / timeout evidence','Changed game independent evidence','Data / OOP evidence (Year12)','File evidence','Support received','Teacher / date','Ready / reteach','Next action'],[11]+['']*14,[12]+['']*14]))

sections=[]
workbook=['# Pygame practice workbook','',setup,'','## Lesson records']
for unit,week,number,anchor,title,strand,model,change,check in LESSONS:
    year=11 if unit==1 else 12
    body=f'<p><strong>Existing allocation:</strong> Unit {unit}, Week {week}, Lesson {number}. Retains {escape(strand)}. Ungraded practice before the project.</p><ol><li><strong>Retrieve / predict (5 min):</strong> Sketch one expected state and explain yesterday’s Python idea.</li><li><strong>Model (10 min):</strong> {escape(model)}</li><li><strong>Guided practice (15 min):</strong> Pairs alternate driver and predictor; trace a normal and a boundary case, then switch roles. Ask the predictor to explain rather than dictate code.</li><li><strong>Fade / transfer (15 min):</strong> {escape(change)}</li><li><strong>Check / explain (5 min):</strong> {escape(check)}</li><li><strong>Exit / record (5 min):</strong> Save a version, actual test evidence, help received and one next step.</li></ol><details><summary>Scaffolding, feedback and stretch</summary><p>Use a state table, highlighted input/update/draw blocks and a pre-prepared interpreter for learners needing support. Restore one hint at a time after recording the initial attempt. Ask “which state first differs from your prediction?” before offering a fix. Use an error hunt and a second, fresh case to check the correction. Stretch: justify a contract or improve test coverage; do not add assessed-project features.</p></details><p><strong>Exit evidence:</strong> {escape(check)}</p>'
    sections.append(f'<section id="{anchor}"><p class="eyebrow">YEAR {year} · PRACTICE {anchor[-1]}</p><h2>{escape(title)}</h2>{body}</section>')
    workbook += [f'### Year {year} · W{week} L{number}: {title}','',f'Retained objective family: {strand}.',model,'',f'Independent change: {change}',f'Exit: {check}','Prediction: ___\nActual/build: ___\nFirst incorrect state/correction/retest: ___\nSupport used: ___\nTeacher feedback and next action: ___','']
write(OUT/'workbook.md','\n'.join(workbook))

references=[('Events every frame','https://www.pygame.org/docs/ref/event.html'),('Held keys','https://www.pygame.org/docs/ref/key.html'),('Clock and milliseconds','https://www.pygame.org/docs/ref/time.html'),('Rect overlap','https://www.pygame.org/docs/ref/rect.html')]
codeblocks=''.join('<details><summary>'+escape(name)+'</summary><p><a href="'+name+'" download>Download editable Python</a></p><pre><code>'+escape((OUT/name).read_text(encoding='utf-8'))+'</code></pre></details>' for name in ['stage1_loop.py','lab_rules.py','lab_runner.py','extension12.py','stage5_oop.py','faded_practice.py'])
links=''.join(f'<li><a href="#{row[3]}">Year {11 if row[0]==1 else 12} · W{row[1]} L{row[2]}: {escape(row[4])}</a></li>' for row in LESSONS)
html=f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Pygame teaching bridge · CS ATAR</title><link rel="stylesheet" href="../style.css"><style>main{{max-width:1040px;margin:auto;padding:32px}}section{{border-top:1px solid var(--line);margin-top:36px;padding-top:24px;scroll-margin-top:20px}}pre{{white-space:pre;overflow:auto;max-height:32rem}}li{{margin-bottom:.6rem}}.bridge-actions{{display:flex;gap:12px;flex-wrap:wrap}}@media print{{details{{display:block}}pre{{max-height:none;white-space:pre-wrap}}.bridge-actions{{display:none}}}}</style></head><body><a class="skip" href="#main">Skip to content</a><main id="main" tabindex="-1"><p><a href="../#teaching">← Teaching sequence</a></p><p class="eyebrow">BEFORE THE PROJECT · UNGRADED PRACTICE</p><h1>Build the skills.<br>Then build the game.</h1><p class="lede">A small unrelated Pygame lab, taught in stages with progressively less support. Four existing lessons in each year; the 10/12 project workshops stay intact.</p><div class="bridge-actions"><a class="button" href="pygame-teaching-pack.zip" download>Download teaching pack</a><a class="button secondary" href="workbook.md" download>Editable practice workbook</a><a class="button secondary" href="practice-tests.csv" download>Expected / actual tests</a><a class="button secondary" href="readiness.csv" download>Readiness record</a></div><div class="notice"><strong>Before assessment:</strong> Teachers must verify the classroom installation and observe independent transfer. Downloading worked code or running automated tests does not establish pupil readiness. If checks fail, record reteaching and re-plan before issue; do not silently consume project workshops.</div><h2>Setup and progression</h2><p>Install the pinned Pygame dependency using the school-approved Python interpreter, extract the whole pack into a writable folder and follow the <a href="README.md">setup/run guide</a>. Run stage1_loop.py, then lab_runner.py with stage 2, 3 and 4. Space starts/pauses/resumes, arrows move, R resets and Escape/window X quit. Stages 3–4 have two numbered stations, one point each and 20 active seconds; there are no assessed hazards, lives, exits or map progression.</p><p><strong>Predict → run → investigate → modify → make.</strong> Compare the worked example, complete a missing rule, then solve the changed three-station challenge without importing the solution. Teacher-selected fresh changes and recorded explanations establish independent transfer.</p><p>Each 55-minute period allocates 5 retrieval, 10 modelling, 15 guided practice, 15 faded transfer, 5 checking and 5 recording. For 50-minute periods reduce guided practice to 10 minutes and retain the exit check. These are proposed timings requiring classroom validation. The <a href="verification.md">verification record</a> distinguishes automated/local checks from school and student evidence.</p><nav aria-label="Pygame practice lessons"><ul>{links}</ul></nav>{''.join(sections)}<section><h2>Worked code and faded starter</h2><p>Download the complete pack first so imports resolve. The worked files are public practice solutions. The faded task changes counts, timing, starting state, score and validation; it deliberately raises NotImplementedError until students implement the missing rules.</p>{codeblocks}</section><section><h2>Readiness before project issue</h2><p>Use T01–T12 for Year 11 and T01–T16 for Year 12. Observe a visible-window run, an independent changed rule, normal/boundary/invalid tests, pause and full reset, file failure handling and a student explanation. Record interpreter/machine, version, observed results, support and reteaching. For Year 12 include independent rows/objects, polymorphic update and search/sort traces. The school retains responsibility for assessment conditions and classroom moderation.</p><p>Current project chapters: <a href="../#design">Year 11</a> · <a href="../#unit3-project">Year 12</a>. Existing slides cover the original Python strands; use this page and code for the new bridge. Additional presentations remain A06.</p><h3>Technical references</h3><ul>{''.join('<li><a href="'+url+'">'+label+'</a></li>' for label,url in references)}</ul><p>Original teaching content CC BY 4.0 · Python code MIT · Independent classroom resource.</p></section></main></body></html>'''
write(OUT/'index.html',html)

code="const fs=require('fs'),vm=require('vm'),c=vm.createContext({});vm.runInContext(fs.readFileSync('dist/teaching-planner-data.js','utf8'),c);process.stdout.write(JSON.stringify(vm.runInContext('teachingSchedule',c)));"
schedule=json.loads(subprocess.check_output(['node','-e',code],cwd=ROOT,encoding='utf-8'))
for unit,week,number,anchor,title,strand,model,change,check in LESSONS:
    lesson=schedule[unit-1]['weeks'][week-1]['lessons'][number-1]
    assert lesson['kind']!='Project workshop' and 'assessment' not in lesson['kind'].lower()
    lesson.update(title=title,activity=f'Pygame practice: {model} Guided pairs then independent transfer: {change}',check=check,
                  pygameBridge=f'pygame/index.html#{anchor}',pygamePractice=True,pygameTiming=[5,10,15,15,5,5])
write(DIST/'teaching-planner-data.js','const teachingSchedule = '+json.dumps(schedule,ensure_ascii=False,separators=(',',':'))+';')
rows=[['Unit','Year','Week','Lesson','Semester lesson','Type','Objective','Class activity','Check','Chapter','Project requirements','Project workbook','Project pack','Pygame practice','Pygame teaching pack']]
for unit in schedule:
    for week in unit['weeks']:
        for lesson in week['lessons']:
            rows.append([unit['unit'],unit['year'],week['week'],lesson['lesson'],lesson['number'],lesson['kind'],lesson['objective'],lesson['activity'],lesson['check'],SITE+'#'+lesson['chapter'],lesson.get('gameContract',''),lesson['workbook'] if lesson.get('gameProjectYear') else '',lesson.get('gamePack',''),lesson.get('pygameBridge',''),'pygame/pygame-teaching-pack.zip' if lesson.get('pygamePractice') else ''])
write(DIST/'teaching-lessons.csv',csv_text(rows))
text=(DIST/'teaching-sequence.md').read_text(encoding='utf-8');lines=text.splitlines();unit_number=None
for i,line in enumerate(lines):
    found=re.match(r'## Unit (\d+)',line)
    if found:unit_number=int(found[1])
    found=re.match(r'\| (\d+) \|',line)
    if found and any(u==unit_number and w==int(found[1]) for u,w,*_ in LESSONS):
        week=schedule[unit_number-1]['weeks'][int(found[1])-1]
        lines[i]=f'| {week["week"]} | {week["title"]} | '+'<br>'.join(str(l['lesson'])+'. '+l['activity'] for l in week['lessons'])+' |'
write(DIST/'teaching-sequence.md','\n'.join(lines))
write(OUT/'allocation.json',json.dumps([{'unit':u,'week':w,'lesson':l,'anchor':a,'title':t,'retainedStrand':s} for u,w,l,a,t,s,*_ in LESSONS],ensure_ascii=False,indent=2))

def build_pack():
    with zipfile.ZipFile(OUT/'pygame-teaching-pack.zip','w',zipfile.ZIP_DEFLATED) as z:
        for path in sorted(OUT.iterdir()):
            if path.is_file() and path.suffix!='.zip' and path.name!='index.html':z.write(path,path.name)
        for name in ['LICENSE-CODE.txt','LICENSE-CONTENT.txt']:z.write(ROOT/name,name)

# Verification is written by the actual checks/reviewer, never invented by this builder.
if not (OUT/'verification.md').exists():
    write(OUT/'verification.md','# Verification\n\nAutomated/local checks pending. School-machine and independent-student readiness must be recorded by the teacher in readiness.csv. Timings require a classroom trial (A03).')
build_pack()
print('Built eight pre-project practice lessons, staged code, faded starter, workbook, checks, readiness record and teaching pack.')

# Preserve authored checks when regenerating workshop/preparation allocations.
subprocess.run([__import__("sys").executable, str(ROOT/"scripts/build-lesson-checks.py")], cwd=ROOT, check=True)
