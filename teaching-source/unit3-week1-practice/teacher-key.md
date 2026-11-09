# Unit 3 Week 1 — public teacher guidance

Content CC BY 4.0; code MIT. 2027 teaching edition. Formative, not a secure assessment or independently moderated marking scheme. Suggested timings are untrialled. Do not display relevant feedback before the unaided response is preserved; record prior exposure/help. Choose one repair based on evidence, not every optional activity. No extra assessment, project hours or homework.

## Lesson 1

D1: counts2 and0; running counts0,1,2 for3,5,8. Initialise before iteration; exact5 included. D2: result2, caller count10; the function's local name is distinct. D3: missing colon is SyntaxError during parsing; int("two") raises ValueError when executed; >5 is a logic fault for inclusive minimum, exposed by value5. D4:[]=0,[5]=1,[5,5]=2.

R1: use >=, result2 for[4,5,7]/5. R2: implicit result None without return; return count gives the count and0 for empty. R3: malformed text is conversion failure; a valid5 with exclusive > is a different logic defect. Do not catch every exception or change random lines. Optional foundations D explains one Python object-binding mechanism; do not teach scalars “by value” and lists “by reference” as separate mechanisms.

Independent minimum6/[6,2,9,6]=>3,empty=>0. Allocated exit [4,5,7]/5=>2,empty=>0. Preserve original, correction and changed retry separately; use later changed retrieval for retention.

## Lesson 2

Use the existing y12-1 bridge and extracted Pygame pack. The supplied dictionary/state machinery is support infrastructure; classes/2D arrays/algorithms follow in later allocated lessons. A learner new to Pygame needs the stage1 model; rapid re-entry is not proof they completed Year11 Pygame.

Worked direct rule test: new_state(), command(space), update(direction1,250ms,collect=False) gives x358,remaining19750,score0,playing. The runner processes events first and skips update when a start/pause/resume/reset event changes the frame; its long transition delta is discarded. Paused update returns unchanged. R sets ready,workedx308,remaining20000,score0,fresh flags. Held keys sample continuous state; KEYDOWN/QUIT are discrete events. Do not count frames as seconds.

Faded movement core: freshx40,remaining15000,playing,160px/s => x80,14750 after250ms; fresh500ms=>x120,14500. Keep validation of direction(-1,0,1),nonnegative dt; early return unless playing; decrement remaining with floor0; finished/return at timeout before movement/collection; movement clamp0..616. Run with collect=False while collection TODOs remain. Do not point the unchanged two-station renderer at this and claim the three-station game is complete. Secure learners may explain what else the renderer/runner would need; do not add this to the common task.

Syntax missing colon prevents parsing; int("two") ValueError during execution; missing /1000 is a logic/unit fault, sometimes hidden by clamping. Change one cause and retest. Stage3 inactive flag prevents repeat scoring; strict edge-touching is not overlap. Stage4 file0/2/bad/3 accepts[0,2],two warnings; missing/empty valid. Append once after finish; set saved only after successful write; failed write visibly permits explicit retry. Use disposable files. Partial paper traces leave required execution pending.

## Lesson 3

C01 [5,6,7]:oldminimum5=>3,newminimum6=>2. Testsminimum6:[5]0,[6]1,[7]1,[]0,[6,6]2. Parameterised originalminimum5/[4,5,7] still2. Distinguish intentionally revised expected results from defects in unchanged behaviour.

Linear: document/approve change and controlled return to affected requirements/design/implementation/testing. Iterative: revisit those activities in a new version with updated acceptance criteria. Both plan/test/document; neither universally best. Independentminimum8:[7,8,9,8]3,[]0,[8,8]2. Accept correct independently authored loop/function and justified regression case; copied keys are supported evidence. Input validation extension requires a stated policy and remains optional.

## Lesson 4

Seedv1 VERSION1,MINIMUM5,[4,5,7]=>2. Currentv2 VERSION2,MINIMUM6,[4,5,7]=>1 after edited check expectation. Restoredv1 must run from separate folder and print its own rules.py path,version1,minimum5,actual2. Both empty=>0; v1[5]=>1,v2[6]=>1. Rerun currentv2=>1 after restoringv1; verify its files still exist separately.

Collect actual location/version/run/output/log evidence. Filename alone, a written plan or teacher-provided expected value is not actual restoration. Investigate wrong import path, incomplete copy or altered snapshot. Record failed checks honestly and repair/retest. No automated student result or independent approval is supplied. Optional separate storage or version control supplements the restore/run check.

## Sources and teaching scope

The textbook's current unit3-fluency routes allocate these four lessons. Existing foundations workbook A–D supports targeted loop/type/scope repairs; E belongs to the later project schedule. Python control flow/errors and Pygame event/time references support the worked code. Pygame is a teaching context, not an additional syllabus requirement.

https://docs.python.org/3/tutorial/controlflow.html
https://docs.python.org/3/tutorial/errors.html
https://www.pygame.org/docs/ref/event.html
https://www.pygame.org/docs/ref/time.html
