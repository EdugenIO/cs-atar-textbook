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
