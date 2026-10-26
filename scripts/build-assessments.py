"""Build original public assessment planning resources from the editable catalogue."""
from pathlib import Path
import csv, io, json, zipfile
from game_projects import build_game_resources
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'assessment-source/catalogue.json').read_text(encoding='utf-8'))
out=root/'dist/assessments';out.mkdir(exist_ok=True)
def write(name,text):
    p=out/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text.rstrip()+'\n',encoding='utf-8',newline='\n')
def csvtext(rows):
    b=io.StringIO(newline='');csv.writer(b,lineterminator='\n').writerows(rows);return b.getvalue()
rubric=[('Investigation',15,'Measurable client requirements, assumptions, alternatives and feasible schedule.'),('Design',25,'Algorithms, data and interfaces accurately support the requirements. Desk-checks justify decisions.'),('Implementation',35,'Student-authored logic implements required behaviour. Structure, validation and error handling are clear.'),('Testing',15,'Independent expectations, actual results, useful boundary/invalid cases and corrections with retests.'),('Evaluation',10,'Evidence against client requirements, limitations, acceptance observations and a reasoned retrospective.')]
write('project-rubric.md','''# Project marking guide template (100 marks)

Original planning proposal for the 2027 assessment library. Adapt and moderate before issue. This is not an SCSA marking key or a grade conversion.

| Criterion | Marks | Evidence |
|---|---:|---|
'''+ '\n'.join(f'| {c} | {m} | {d} |' for c,m,d in rubric)+'''

For each criterion, split the marks into task-specific observable points before issue. Use these performance anchors to write those points: complete/accurate/justified evidence; substantially correct evidence with limited gaps; partial evidence with errors; minimal relevant evidence; no relevant evidence (zero). Do not award the same evidence twice. Moderate examples at the boundaries with a colleague. Graphics, bought assets, headset access and physical dexterity earn no separate marks.

A project raw mark / 100 contributes raw mark × published task weighting / 100 to the annual school mark. A 70/100 result on a 15% project contributes 10.5 percentage points. Do not confuse raw marks with course weights. Grades require the syllabus grade descriptions and school process, not automatic percentage cut-offs.

Checkpoints and an explanation/change demonstration authenticate this one project. They are not extra separately weighted tasks. Publish permitted support, AI/reference rules, individual evidence, deadlines, access arrangements and the item-level marking guide before issue.
''')
write('student-workbook.md','''# Assessment project evidence workbook

Public editable template. The teacher supplies the final task, conditions and marking guide.

## Investigate
Client/problem; constraints; requirements R1 onwards; acceptance criterion and test ID for each; alternative approaches; assumptions; questions resolved.

## Schedule
Task, dependency, planned lesson, actual completion, reason for change. Use the allocated workshops, including corrections and feedback. Checkpoints belong to the one project.

## Design
Pseudocode and desk-checks; function/class interfaces; data structures; input/output formats; failure behaviour. For a database include ER model, keys, dictionary, normalisation explanation, report specifications and integrity rules. Explain any change to your first design.

## Build and sources
Keep dated versions and a short individual progress log. Identify supplied code and what you wrote. Log author, title, URL, access date, reused section, licence/permission, changes, own contribution and permitted assistance. Follow the issued AI and collaboration rules.

## Tests
Use test-record.csv. Calculate expected results before execution. Add actual results and evidence locations honestly. Include ordinary, boundary, invalid and failure cases, corrections and retests. Label hand traces as desk-checks rather than executed tests.

## Acceptance and evaluation
Use a synthetic-data client trial. Record observations against each requirement, actual limitations and a prioritised improvement. Include a developer retrospective and the final source/assistance declaration.
''')
write('teacher-release-checklist.md','''# Teacher release and moderation record

Target: 2027. Original planning resource. Record teacher, reviewer, class, syllabus version, review date and final task identifier. The public library is not a secure test bank.

- Confirm the current Year 11 syllabus and 2027 Year 12 syllabus, applicable WACE Manual and school assessment policy. The current manual linked at library review was the 2026 edition; check for the 2027 edition before release.
- Use no more than eight summative tasks for the pair of units, each at least 5%, with every assessment type represented and the prescribed category totals. Record content, general task description, approximate timing and weight in the issued outline.
- Map the whole set to a representative sample of both units. Identify a taught prerequisite and assessable evidence for each item. A project context alone does not establish coverage.
- Finalise the local dates within four lessons/week and 16 teaching weeks. Weeks 17–18 are exams in this textbook. Check actual period length and contact-hour losses. Do not add the sample schedule on top of the existing workshops.
- Choose one context per slot or moderate genuine equivalents. Match scope, difficulty, conditions and marks. A change in context must not require untaught specialist knowledge.
- Turn the generic 100-mark project framework or test blueprint into an item-level marking guide. Verify all expected outputs independently and moderate before issue.
- Establish individual authorship: observed milestones, dated work, source/assistance declaration and a short explanation or change demonstration. These validate the existing task, not a ninth assessment. Publish permitted AI/reference use and follow school policy.
- Make alternatives available for headset discomfort, disability, absence or lack of hardware access. Assess computing evidence, not access to equipment or interaction speed.
- Create fresh controlled-test/exam stimuli, faults, values and keys privately. Public drafts and public teacher guidance are practice/planning material. Hiding a link or details panel is not access control.
- Check accessible diagrams/data, clear instructions, realistic timing and school-approved access arrangements. Record the common conditions and any authorised adjustments.
- Retain the issued task, key, marked student evidence, moderation and review records in the school’s approved system. Do not upload student identities, submissions or marks to this public site.
- Before issue, record reviewer findings, corrections, approval under the school’s process, and the final source/version log. Do not label the task SCSA-approved.
''')
write('test-record.csv',csvtext([['Test ID','Requirement / item','Input or setup','Expected result before execution','Actual result','Evidence file / location','Pass / fail','Correction','Retest result'],['T1','','','','','','','','']]))
write('source-log.csv',csvtext([['Author / organisation','Title / section','URL','Access date','Reused material','Licence / permission and conditions','Changes made','Own contribution','Permitted assistance declaration']]))
write('question-blueprint.csv',csvtext([['Item','Content reference','Prerequisite taught','Stimulus','Command / cognitive demand','Expected marking points','Marks','Minutes','Accessibility / alternatives','Reviewer'],['1','','','','','','','','','']]))
write('exam-blueprint.csv',csvtext([['Section','Target percent','Question count for Year 12 external-style paper','Working minutes','Content / demand / marks review'],['Short answer',40,'20–30',70,''],['Extended answer',60,'4–6',110,'']]))
write('coverage-and-release.md','''# Coverage and release notes

Reviewed 15 October 2026 for planning a 2027 program. Year 12: 2027 syllabus downloaded from the official course-page link and read, especially printed pages 8–19, 21–23 and 25. Year 11: the course page currently lists the syllabus effective from 2026; use it while current and recheck for a later version. WACE Manual: 2026 edition currently listed, so 2027 procedural review remains open.

The type weights below are annual school-assessment category totals. The 20/20 or 15/25 project split, eight numbered slots, themes and dates are sample/local planning choices. They are not all mandated by SCSA. The external Year 12 ATAR examination is separate from this school-assessment total.

Year 11: projects 40, theory 20, practical 10, exams 30. Year 12: projects 40, theory 10, practical 10, exams 40. Each proposed outline has eight tasks totalling 100. Alternative ideas replace a context in a slot, not add another weighted task.

## Original mapping proposal for teacher review
| Content family | Main evidence slots | Further sampling |
|---|---|---|
| Unit 1 programming and development | Y11 T1, T2 | T3, T4 |
| Unit 1 networking and development issues | Y11 T3 | T4 |
| Unit 2 data management | Y11 T6, T7 | T8 |
| Unit 2 cybersecurity and responsible data | Y11 T5 | T6 decisions, T8 |
| Unit 3 programming, algorithms and OOP | Y12 T1, T2, T3 | T4, T8 |
| Unit 3 networking | Y12 T4, T5 | T8 |
| Unit 4 databases and development | Y12 T6, T7 | T8 |
| Unit 4 cybersecurity and ethical/legal issues | Y12 T5 | T6 decisions, T8 |

This is a family-level allocation, not a completed bullet-by-bullet compliance audit. Before release, add the exact current syllabus content reference, taught prerequisite, task item, marking point and evidence for each assessed element. Review omissions, excessive repetition and demand across the whole set. Include taught search/sort tracing, appropriate diagram conventions, data-quality reasoning and security analysis where the final matrix requires them. Neither a two-dimensional array nor a five-table database alone proves full syllabus coverage.

Database planning distinguishes modelling from implementation. For Year 11, plan four-entity ER creation while the RDBMS implementation minimum is three tables; the provided equipment example uses four. For Year 12, use at least five implemented tables, and include wider ER interpretation elsewhere in the program. Verify all applicable detailed requirements in the syllabus.

All public briefs are original draft choices. The SCSA documents remain third-party material: link to them rather than redistributing them under this site’s licence. Teacher moderation and school release decisions are outstanding. No student work is included.
'''+ '\n'.join(f'\n- {k}: {v}' for k,v in data['sources'].items()))
write('quest-planning.md','''# Quest 3: assessment uses and pilot plan

Recommendation: start with a small school-approved pilot (for example two shared headsets), test a complete lesson workflow, then decide whether a larger set improves the assessable learning. This is a planning recommendation, not a product-price quote or a verified school deployment.

## Three practical contexts
1. **Task 1 revision, 26 October 2026.** Task 1 now uses the bounded common Pygame game contract. VR replay is retired as an assessment option. Any headset experience is ungraded enrichment and supplies no extra Task 1 marks.
2. **Unit 4 booking and maintenance database, Task 6 (25%).** Manage fictional borrowers, models, devices, bookings and maintenance through Python/SQL. The supplied starter pack uses five entities. Headsets make the client scenario tangible but are not required to build, test or earn marks.
3. **Ungraded network preparation.** Analyse a supplied shared-device lab diagram and synthetic incident logs as a learning activity. The scheduled theory test remains one standard assessment. Use supplied evidence rather than testing the school network.

## Native development is an extension
Meta documents Unity/C#, Unreal/C++ or Blueprints, native/OpenXR and web/JavaScript routes, among others. A normal Pygame desktop program is not a deployable Quest application. Native VR adds environment setup, deployment and interaction design. Keep the current Python assessment core unless the school deliberately plans, teaches and moderates another permitted school-based language. Continue Python preparation for the ATAR examination.

## Resources and operating trial
- Verify the exact available education/device-management offering, managed-account age/eligibility rules, app licences, deployment rights and ongoing costs with the supplier and school IT. Current Meta documentation describes managed organisational app distribution; do not assume a consumer app licence covers shared school use.
- Trial installation/distribution, approved account mode, Wi-Fi, casting, updates, offline fallback, charging, secure storage and cleaning between users. Follow school and manufacturer use/safety guidance.
- Use a rotation: one participant, one observer recording requirements and one developer analysing the same synthetic event file. Rotate access; provide a screen recording, diagram or PC replay alternative of equivalent difficulty.
- Budget staff setup and support time as well as headsets, accessories, app/device-management licences and replacement parts. Seek a written current quote; this library contains no price estimate.
- Keep datasets synthetic. Do not make assessment depend on real gaze, room mapping, voice, biometrics, account identifiers or identifiable movement traces. Any school data collection needs its own approved purpose and handling arrangements.
- Judge the pilot by time spent on computing evidence, equal access, repeatability, support burden and whether it improves the task. Do not grade headset dexterity, immersion or expensive visual polish.

## Shared synthetic event fixture
quest-events.csv is an original mock format, not an export from Quest hardware or a claim of API compatibility. It contains tick, alias, row, column and action. Define movement and checkpoint rules in the issued brief.

References:
'''+f"\n- Meta development platforms: {data['sources']['quest']}\n- Managed app distribution: {data['sources']['management']}\n- SCSA course page and language rules: {data['sources']['course']}\n")
write('quest-events.csv',csvtext([['tick','alias','row','column','action'],[0,'P01',0,0,'start'],[1,'P01',0,1,'move'],[2,'P01',1,1,'checkpoint'],[3,'P01',1,2,'finish']]))
game_packs=build_game_resources(root,write,csvtext)
data['gameContracts']=json.loads((root/'assessment-source/game-projects.json').read_text(encoding='utf-8'))['years']
outline=[['Year','Task','Type','Course weight percent','Title','Proposed local timing','SCSA sample timing (reference only)','Content scope','Allocated project lessons']]
for year in data['years']:
 for task in year['tasks']:
  outline.append([year['year'],task['number'],task['type'],task['weight'],task['title'],task['timing'],task['sampleTiming'],task['scope'],task['budget'] if task['type']=='Project' else ''])
  for op in task['options']:
   key=f"y{year['year']}-t{task['number']}-{op['id']}"
   op['brief']=f'assessments/briefs/{key}.md'
   status='Draft project brief' if task['type']=='Project' else 'Blueprint; full paper/key not yet authored'
   body=f"# Year {year['year']} Task {task['number']}: {op['title']}\n\n2027 planning draft · {status}. Original content CC BY 4.0; example code MIT. Public planning material, not a secure school-issued assessment.\n\n{op['pitch']}\n\n## Placement\n\n- Type: {task['type']}\n- Course weight: {task['weight']}% (one alternative in this slot)\n- Proposed local timing: {task['timing']}\n- Content family: {task['scope']}\n\n## Scope and required evidence\n\n"+'\n'.join('- '+x for x in op['requirements'])
   if op.get('routes'): body+='\n\n## Delivery routes\n\n'+'\n'.join('- '+x for x in op['routes'])
   body+='\n\n## Resources and setup\n\n'+'\n'.join('- '+x for x in op['resources'])
   body+='\n\n## Initial acceptance checks / paper review\n\n'+'\n'.join('- '+x for x in op['tests'])
   if task['type']=='Project':
    body+='\n\n## Submission and criteria\n\nSubmit your requirements/schedule, design, code or database, synthetic data, expected/actual test records, source/assistance log and evaluation. Use student-workbook.md and test-record.csv. Checkpoints belong to this project.\n\nSuggested raw marks: investigation 15, design 25, implementation 35, testing 15, evaluation 10, total 100. The teacher must translate these categories into task-specific observable marking points and publish the final guide. Hardware/visual polish earns no separate marks.\n'
   if task.get('gameContract'):
    body+='\n## Binding common game contract\n\nAll scenario themes in this year have identical functional/non-functional requirements, test fixtures and item-level criteria. Only setting, labels and decorative assets vary.\n\n'+(root/'dist'/task['gameContract']).read_text(encoding='utf-8')+'\n\n'+(root/'dist'/task['gameRubric']).read_text(encoding='utf-8')
   body+='\n## Conditions to finalise before issue\n\nTeacher sets issue/due dates, permitted references/AI/assistance, supervised-work arrangements, individual-authorship evidence, approved adjustments and the item-level key. Record milestones and use an explanation or small change demonstration to authenticate the same task. Fresh controlled tests and exam keys must be developed privately. Public practice answers cannot establish assessment security.\n\nThis option does not add to the eight-task outline. A learner completes the selected alternative or an explicitly moderated equivalent. Refer to teacher-release-checklist.md and coverage-and-release.md before use.\n'
   if task['type']!='Project':
    body=body.replace('(one alternative in this slot)','(standard task for this slot)').replace('This option does not add to the eight-task outline. A learner completes the selected alternative or an explicitly moderated equivalent.','This is the standard task in its existing slot. It does not add another task to the eight-task outline.')
   write(f'briefs/{key}.md',body)
   if op['pack']:
    op['download']=f'assessments/{key}-starter.zip'
write('assessment-outline-2027.csv',csvtext(outline))
expected={f"y{y['year']}-t{t['number']}-{op['id']}.md" for y in data['years'] for t in y['tasks'] for op in t['options']}
for stale in (out/'briefs').glob('*.md'):
 if stale.name not in expected: stale.unlink()
for name in ['LICENSE-CODE.txt','LICENSE-CONTENT.txt']:
 write(name,(root/name).read_text(encoding='utf-8'))

# Deliberately unfinished code contracts. These do not solve the assessed algorithms.
packs={
 'y11-t6-equipment':{
 'flat-loans.csv':csvtext([['LoanID','BorrowerID','BorrowerAlias','EquipmentID','EquipmentLabel','CategoryID','CategoryName','LoanDate','DueDate','ReturnDate'],['L01','B01','Alias01','E01','Tripod','C01','Media','2027-03-01','2027-03-08',''],['L02','B02','Alias02','E02','Microphone','C01','Media','2027-03-01','2027-03-08','2027-03-05'],['L03','B01','Alias01','E01','Tripod','C01','Media','2027-03-10','2027-03-17','']]),
 'schema-todo.sql':'-- Design four entities before implementing your SQL.\n-- TODO: enable foreign keys and define keys, domains and relationships.\n-- TODO: load synthetic fixtures and implement the required reports.\n',
 'relationship-prompt.md':'# Relationships to investigate\nOne borrower can have many loans. One equipment item can have loans at different times. One category can classify many items. Decide minimum participation and how loans with no return date appear in reports. The flat fixture has sequential loans on E01, not simultaneous duplicate checkout. Use the supplied synthetic dates to define an explicit as-of date in tests.'},
 'y12-t6-questdb':{
 'models.csv':csvtext([['model_id','model_name'],['M01','Training headset model A']]),
 'devices.csv':csvtext([['device_id','model_id','asset_alias'],['D01','M01','Lab01'],['D02','M01','Lab02']]),
 'borrowers.csv':csvtext([['borrower_id','alias'],['B01','Alias01'],['B02','Alias02']]),
 'bookings.csv':csvtext([['booking_id','borrower_id','device_id','start_slot','end_slot'],['K01','B01','D01',1,2],['K02','B02','D02',1,2]]),
 'maintenance.csv':csvtext([['maintenance_id','device_id','description','resolved'],['R01','D02','Inspect controller',0]]),
 'schema-todo.sql':'-- Design five related tables: BorrowerAlias, DeviceModel, Device, Booking, Maintenance.\n-- TODO: enable and test foreign keys, keys, domains and relationship constraints.\n-- TODO: specify slot intervals and booking/maintenance conflict policy.\n-- TODO: create and verify fixture import and joined/grouped reports.\n',
 'app-todo.py':'''"""Unfinished interface contracts. No database operations are implemented."""
def create_booking(connection, borrower_id, device_id, start_slot, end_slot):
    raise NotImplementedError("Validate and use parameterised SQL in a transaction")
def utilisation_report(connection):
    raise NotImplementedError("Query and return a documented report")
def restore_backup(backup_path, disposable_target):
    raise NotImplementedError("Design a safe recovery test on disposable data")
''',
 'fixture-decisions.md':'# Decisions the client brief must settle\nSlots use integer labels, not actual dates. Define whether end slots are inclusive or exclusive. K02 is deliberately a booked device with unresolved maintenance: treat it as existing data requiring an explicitly justified response. Do not silently clean it away. Decide if unresolved maintenance blocks new bookings and how existing bookings are handled. Publish those rules before marking conflicts.'}
}
packs.update(game_packs)
# Remove only obsolete generated files within the known assessment output tree.
for old in ['y11-t1-puzzle','y11-t1-queue','y12-t1-warehouse']:
 folder=(out/'starters'/old).resolve()
 assert folder.is_relative_to((out/'starters').resolve())
 if folder.exists():
  for p in folder.iterdir():
   assert p.is_file(),p
   p.unlink()
  folder.rmdir()
 old_zip=out/f'{old}-starter.zip'
 if old_zip.exists():old_zip.unlink()
for key,files in packs.items():
 description='display_shell.py runs a display-only Pygame window; student_game.py deliberately raises NotImplementedError until you implement the game. Read setup.md, common-requirements.md and common-marking-guide.md.' if key in game_packs else 'Python functions deliberately raise NotImplementedError. SQL files contain TODOs, not a working schema.'
 write(f'starters/{key}/README.md',f'# {key}: unfinished starter\n\nRead the task brief in the briefs folder and the common templates in the ZIP. All data is synthetic. {description} Design and implement your own solution.\n\nThe pack supplies initial fixtures. Add normal, boundary, invalid and failure cases from the requirements. Public fixtures are not a secure marking key. Original content CC BY 4.0; code MIT.\n')
 for name,text in files.items():write(f'starters/{key}/{name}',text)
 with zipfile.ZipFile(out/f'{key}-starter.zip','w',zipfile.ZIP_DEFLATED) as z:
  for p in sorted((out/'starters'/key).glob('*')):z.write(p,f'starter/{p.name}')
  z.write(out/'briefs'/f'{key}.md',f'briefs/{key}.md')
  for name in ['student-workbook.md','project-rubric.md','test-record.csv','source-log.csv','teacher-release-checklist.md','coverage-and-release.md','LICENSE-CODE.txt','LICENSE-CONTENT.txt']:z.write(out/name,name)
write('README.md','''# Assessment library for 2027

Thirty planning resources within sixteen slots (eight per year). Eighteen alternative project briefs, eight standard controlled-test blueprints and four standard exam blueprints. Choice applies to projects only. Task 1 offers five equivalent Pygame game themes per year with a shared year-level contract and marking guide. All ten game themes and two database options have starter packs. Full controlled papers, private keys and final school release decisions are not yet complete.

The catalogue is editable in assessment-source/catalogue.json. Regenerate with python scripts/build-assessments.py. Original material uses the site’s content/code licences. Official SCSA documents and third-party software retain their own terms and are linked rather than re-licensed.

Start with assessment-outline-2027.csv, coverage-and-release.md and teacher-release-checklist.md. Choose one option per slot, finalise the conditions and task-specific key, moderate and apply the school’s release process. Public files are visible to students. Keep live secure tests, unreleased variants, keys and student evidence in the school’s approved private system.
''')
(root/'dist/assessment-data.js').write_text('const assessmentCatalogue = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
with zipfile.ZipFile(out/'assessment-planning-2027.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in sorted(out.rglob('*')):
  if p.is_file() and p.suffix!='.zip':z.write(p,str(p.relative_to(out)))
print('Built 30 briefs/blueprints, twelve starter ZIPs, common game contracts and planning collection.')
