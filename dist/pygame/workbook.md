# Pygame practice workbook

# Pygame teaching bridge · ungraded practice

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


## Lesson records
### Year 11 · W4 L2: Use a while loop to run an interactive window

Retained objective family: condition-controlled loops, counters and accumulators.
Predict input → update → draw. Run stage1_loop.py; trace running and a frame counter. Explain events versus held keys, milliseconds versus seconds, screen coordinates and bounds. Model quit handling and Clock.tick(60), without blocking sleeps.

Independent change: Hide the movement line. Complete it for 160 pixels/second; predict 40 pixels in 250 ms. Add and explain a frame counter; exit using Escape and the window X.
Exit: Close both ways; trace a stopping condition; predict movement at 250/500 ms and explain why a frame count is not elapsed seconds.
Prediction: ___
Actual/build: ___
First incorrect state/correction/retest: ___
Support used: ___
Teacher feedback and next action: ___

### Year 11 · W5 L2: Use parameters and returns to separate game rules

Retained objective family: parameters, arguments, return values and local scope.
Run lab_runner.py 2. Trace new_state(), command() and update(). Identify parameters versus arguments, return a fresh state, and explain deliberate state mutation. Read state["mode"] as a named slot in the supplied state store; this dictionary is provided infrastructure, not a new Year 11 assessment requirement. Model start/pause/resume/reset; inspect remaining active milliseconds before/after a transition.

Independent change: Complete command() in faded_practice.py, then a movement-only update. Use a separate state for each test. Explain which function returns a value and which changes its argument.
Exit: Independently restore every initial value on reset; show a paused 95000 ms update leaves position and active time unchanged. Explain local names and caller-visible mutation.
Prediction: ___
Actual/build: ___
First incorrect state/correction/retest: ___
Support used: ___
Teacher feedback and next action: ___

### Year 11 · W6 L2: Traverse a list to collect stations once

Retained objective family: one-dimensional traversal and accumulation.
Run lab_runner.py 3. Predict the two active flags and score for repeated contact. Model Rect.colliderect alongside the pure overlap predicate; edge-touching does not collide. Trace loop indices, once-only flags and the score accumulator.

Independent change: Complete strict overlap and three-station collection in faded_practice.py. Each changed station scores two. Trace inactive entries, repeated contact and the final total; do not remove elements while traversing.
Exit: Show edge-touch, one-pixel overlap, repeated contact and two independent state lists. Trace the accumulator to a maximum of six in the changed lab.
Prediction: ___
Actual/build: ___
First incorrect state/correction/retest: ___
Support used: ___
Teacher feedback and next action: ___

### Year 11 · W7 L3: Combine game tests with reading and appending results

Retained objective family: file processing, validation and expected/actual test tables.
Run lab_runner.py 4. Model append-once after finished, missing/empty history, range validation and visible write failure. Contrast append with overwrite using a disposable file. Trace timeout before collection and events before update.

Independent change: Complete the changed 0/2/4/6 history policy and once-only save. Finish the changed lab using the scaffold and test table, then explain one fresh teacher-selected change without opening the worked solution.
Exit: Submit observed pause/reset/timeout/file evidence and the independent readiness record. Retain the Week 7 Lesson 4 controlled practical unchanged.
Prediction: ___
Actual/build: ___
First incorrect state/correction/retest: ___
Support used: ___
Teacher feedback and next action: ___

### Year 12 · W1 L2: Repair Python skills through a Pygame loop

Retained objective family: targeted Python repairs and independent boundary/input checks.
Use the Year 11 stage 1–4 files as a rapid re-entry: trace a function call, list mutation, event loop, active timer and file validation. Diagnose one syntax, runtime and logic error on copies. This is a diagnostic, not an assumption that every student has used Pygame.

Independent change: Complete a teacher-selected missing rule from faded_practice.py; predict/run/explain a changed movement or timeout case and record a targeted repair.
Exit: Independently explain input/update/draw and show quit, movement, collision and pause/reset. If unfamiliarity persists, record reteaching required before issuing the project.
Prediction: ___
Actual/build: ___
First incorrect state/correction/retest: ___
Support used: ___
Teacher feedback and next action: ___

### Year 12 · W2 L3: Keep game data independent when functions mutate it

Retained objective family: mutation versus rebinding, two-dimensional lists and dictionaries.
Run extension12.py. Predict independent 2 × 3 board rows and dictionary lookup; contrast with [[0]*3]*2. Relate local parameter rebinding to changes through a shared reference. Use the lab active list to demonstrate accidental state sharing.

Independent change: Build a fresh 3 × 2 practice board, pass it to a function that changes one cell, then rebind a local name. Add dictionary metadata for C and test a missing key. Keep this separate from assessed tile maps.
Exit: Predict exactly which caller values change and why. Demonstrate independent boards/rows and normal/missing dictionary lookups.
Prediction: ___
Actual/build: ___
First incorrect state/correction/retest: ___
Support used: ___
Teacher feedback and next action: ___

### Year 12 · W5 L3: Encapsulate independent practice indicators

Retained objective family: encapsulation, abstraction and defined interfaces.
Model Indicator in extension12.py as a public interface. Create two instances, call update and explain independent state. Contrast plain data with a method that validates its argument. Connect to the existing chapter’s Python attribute conventions.

Independent change: Implement an unrelated CounterIndicator with an add(amount) method that rejects negative increments. Use two objects; explain which details callers need and which are hidden behind the interface.
Exit: Show object independence, a rejected update without unintended mutation, and an explanation of encapsulation without claiming Python prevents all direct access.
Prediction: ___
Actual/build: ___
First incorrect state/correction/retest: ___
Support used: ___
Teacher feedback and next action: ___

### Year 12 · W6 L3: Override timed behaviour and test the shared contract

Retained objective family: polymorphism, inherited behaviour and boundary testing.
Trace Indicator/Pulse update(499), update(1), update(1000). Use the same call on mixed instances; draw a labelled outline when visible changes. Update only during playing so pause freezes the pulse. Model inherited validation and leftover-time preservation.

Independent change: Implement a new Pulse interval of 300 ms; integrate it into a COPY of the practice runner and show shape/text cues. Retrieve the already-taught student linear search and insertion sort on practice labels/history; no new algorithm lesson replaces search/sort teaching.
Exit: Independently pass the changed mini-game and OOP checks, including pause/reset of subclass state, 299/300/900 ms and duplicate/empty/missing search/sort cases. Retain the Week 6 Lesson 4 controlled practical unchanged.
Prediction: ___
Actual/build: ___
First incorrect state/correction/retest: ___
Support used: ___
Teacher feedback and next action: ___
