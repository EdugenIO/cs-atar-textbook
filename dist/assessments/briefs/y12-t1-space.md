# Year 12 Task 1: Space salvage

2027 planning draft · Draft project brief. Original content CC BY 4.0; example code MIT. Public planning material, not a secure school-issued assessment.

Recover five cargo pods in a damaged space station. Apply the shared year-level rules; only the setting, labels and decorative assets change.

## Placement

- Type: Project
- Course weight: 15% (one alternative in this slot)
- Proposed local timing: S1 W7–10: 12 existing workshops, after classes and inheritance.
- Content family: Unit 3: classes/inheritance, two-dimensional arrays, dictionaries, common algorithms and tested development

## Scope and required evidence

- Use every functional and non-functional requirement in the shared year-level game contract.
- Use the same item/hazard counts, timing, scoring and supplied fixtures as every other scenario in your year.
- Theme labels: collectibles are cargo pods; hazards are security drones. Add no specialist mechanics such as flight, buoyancy or stealth.

## Delivery routes

- Python 3 + Pygame interactive 2D game with keyboard controls. Primitive shapes/text are a complete submission route.
- Optional AI-generated or original decorative artwork/audio; implement the same rules and preserve primitive fallbacks.

## Resources and setup

- Scenario starter ZIP includes a runnable display-only shell, unfinished student interfaces, common fixture data and the full Year 12 contract/marking guide.
- School-approved Python/Pygame installation and a named reference PC; no special hardware or paid assets.
- Shared expected-case CSV, test log, source/AI-asset log and asset policy included.

## Initial acceptance checks / paper review

- Run the shared test IDs for state reset, collisions, scoring, timer boundaries and pause.
- Demonstrate the year-level data/algorithm cases and all measurable quality checks.
- Use the same marking guide and core test data for every theme.

## Submission and criteria

Submit your requirements/schedule, design, code or database, synthetic data, expected/actual test records, source/assistance log and evaluation. Use student-workbook.md and test-record.csv. Checkpoints belong to this project.

Suggested raw marks: investigation 15, design 25, implementation 35, testing 15, evaluation 10, total 100. The teacher must translate these categories into task-specific observable marking points and publish the final guide. Hardware/visual polish earns no separate marks.

## Binding common game contract

All scenario themes in this year have identical functional/non-functional requirements, test fixtures and item-level criteria. Only setting, labels and decorative assets vary.

# Year 12 Pygame game contract

Programming project Task 1 · 15% of annual school mark · 2027 draft · reviewed 26 October 2026.

All five themes use this contract and the same marking guide. Choose the setting and design a usable presentation; retain the shared rules, fixtures and assessed behaviour. This is original assessment planning for teacher moderation, not an official SCSA task.

## Scope and preparation

Two small tile maps, five collectibles and three hazards per map, with a small actor hierarchy and a results report.

Before issue, teach the Pygame event/draw/timing loop, Rect collisions and the provided shell in existing lessons. Core programming prerequisites come from the textbook. If that preparation is missing, re-plan class time before release; do not add mandatory home development.

Workshop allocation (12 lessons): 1 investigate, 2 design, 6 build/integrate, 2 test/acceptance, 1 evaluate/handover. Checkpoints belong to this one project, not extra weighted tasks. A complete shapes/text version is sufficient.

## Functional requirements

### FR1
Provide title/instructions, playing, paused and result states. Start, resume, restart and quit through documented keyboard controls.

Acceptance evidence: Pause freezes gameplay time and movement; restarting restores initial score, lives, timer and objects.

Curriculum connection: Control structures; modular design.

### FR2
Move one player in four directions using documented keys. Keep the player inside the arena or walkable map.

Acceptance evidence: At each outer boundary, another outward move leaves the player in bounds; diagonal speed tricks are unnecessary.

Curriculum connection: Selection; comparisons; validation.

### FR3
Use five collectibles worth 10 points each and three predictable patrol hazards. Collect each item at most once.

Acceptance evidence: Collecting the same item twice changes the score only once; collecting all five yields 50 points.

Curriculum connection: Lists; iteration; arithmetic.

### FR4
Begin with three lives and a 90-second active-play timer. A hazard hit removes one life, returns the player to the safe start and gives 1000 ms hit protection.

Acceptance evidence: A hit at 1000 ms leaves two lives; a second collision at 1500 ms leaves two; at 2000 ms it may remove one more.

Curriculum connection: Boolean conditions; state; boundary tests.

### FR5
Complete a map by collecting its five items and reaching the exit. Map 1 completion advances to map 2; map 2 completion wins the game. Lose at zero lives or zero remaining time. Resolve loss before completion if both occur in the same update.

Acceptance evidence: With the final item and exit reached while the timer expires, show loss. No further score changes occur after a result.

Curriculum connection: Complex conditions; precedence; testing.

### FR6
Display score, lives, remaining time, controls and win/loss feedback. Mark player, collectibles, hazards and exit with shape or text as well as colour.

Acceptance evidence: A peer identifies each object and reads the current values without an audio cue or colour-only distinction.

Curriculum connection: User requirements; acceptance testing.

### FR7
Implement two supplied 8-row × 10-column tile maps as independent two-dimensional lists. Use tile codes 0 floor, 1 wall, 2 start, 3 exit, with exactly one start and exit per map. Clear map 1 to enter map 2; five collectibles per map, three hazards, a fresh 90 seconds per map and carried score/lives.

Acceptance evidence: A wall move does not change position; changing map 1 does not mutate map 2. Maximum game score is 100. A failed map check shows a useful error instead of starting an invalid game.

Curriculum connection: Unit 3 two-dimensional arrays; validation.

### FR8
Create a small student-authored actor base class and Player/Hazard subclasses with attributes, methods and shared movement/bounds behaviour. Instantiate objects and override a relevant update method. Separate game rules from drawing.

Acceptance evidence: Explain inheritance and abstraction using actual calls; each subclass uses shared base behaviour and its own update. Merely importing a ready-made Sprite class does not supply this evidence.

Curriculum connection: Unit 3 classes; objects; methods; inheritance; abstraction.

### FR9
Use a dictionary keyed by item ID for item metadata. Write a linear search to locate an item ID in the active item list and a taught bubble, insertion or selection sort to order up to ten valid history scores for the results report.

Acceptance evidence: Search [A,B,C] for B gives index 1, for Z gives a documented not-found result. Sorting [30,10,20,10] ascending yields [10,10,20,30]; empty and single inputs work. Dictionary lookup alone is not the search evidence; sorted()/sort() alone is not the algorithm evidence.

Curriculum connection: Unit 3 dictionaries; common search/sort algorithms.

### FR10
Load and validate the map data; append one final game score to text history and show the ordered history-score report. Handle missing/malformed files and failed writes under a documented policy. History accepts integer scores 0–100: skip malformed/out-of-range lines with a warning, treat a missing file as empty and show a useful save-failure message. Report at most the latest ten valid scores.

Acceptance evidence: Wrong dimensions, an unknown tile or duplicate start prevent play with a useful message. A completed game is saved once; restarting does not duplicate the previous result.

Curriculum connection: Unit 3 modular structure; exception handling; test evidence.


## Non-functional requirements

### NFR1
Usability: instructions visible before play, a clear pause indicator, readable HUD at the agreed 800 × 600 test window and consistent restart/quit controls.

Acceptance evidence: Run a short peer trial; the peer starts, pauses and restarts using only the instructions. Record difficulties and one response.

Curriculum connection: User acceptance; evaluation.

### NFR2
Reliability: run a two-minute repeatable trial including pause, restart and result states without an unhandled exception. Use a fixed layout and deterministic patrols for tests.

Acceptance evidence: Record the actual build, test sequence, result and any correction/retest. A pause long enough to cross 90 wall-clock seconds must not consume active-play time.

Curriculum connection: Testing; debugging.

### NFR3
Responsiveness: process close/keyboard events every frame, cap rendering with Clock.tick(60), and avoid blocking sleeps in the game loop.

Acceptance evidence: On the named school reference PC with the required object counts, a pause input is visible within 250 ms in five observations. Record the method and results; investigate misses rather than infer performance from the FPS cap.

Curriculum connection: Quality requirements; testing.

### NFR4
Maintainability: meaningful names and constants, one clear responsibility per function/method, comments explaining decisions and a concise README.

Acceptance evidence: A peer finds the score, timer and hazard-interval constants and identifies the scoring function without tracing the whole program.

Curriculum connection: Good programming practice.

### NFR5
Portability and resilience: run offline with Python 3 and school-approved Pygame, relative resource paths and primitive-shape fallbacks.

Acceptance evidence: Run from a different parent working directory; remove decorative assets and confirm the full game still works using shapes/text.

Curriculum connection: Quality requirements; exception handling.

### NFR6
Accessibility and assets: sound is optional, colour is never the only signal, and static images/audio/decoration may be made with AI or replaced by Pygame primitives without a marking penalty.

Acceptance evidence: Mute audio and use the shape/text version. Log each external or AI asset, tool/source, date and relevant permissions. Do not assume generated assets are automatically free of third-party rights.

Curriculum connection: Client needs; acknowledgement; ethical development.

### NFR7
Authenticity and privacy: the assessed game logic, data design and explanations must evidence the student’s own learning. Keep dated versions, backup, and a source/assistance log; use synthetic labels only.

Acceptance evidence: Explain and make a small teacher-selected change to the same project. Asset-generation permission does not decide whether AI code assistance is permitted; the issued school conditions do.

Curriculum connection: Development process; sources; individual evidence.

## Scope ceiling

- 3D, VR/headset integration, multiplayer, online services or accounts
- Procedural worlds, A* pathfinding, physics engines, complex platform jumping or advanced enemy AI
- Database integration, crafting/inventory systems, shops, dialogue trees or extra level editors
- Marks for animation, original artwork, audio production, asset quantity or paid software

## Design decisions left to the student

Choose the layout of menus/HUD, names and interfaces of functions/classes, collision implementation, representation of collected state, feedback wording and theme assets. Justify these decisions. Do not replace the core rules with a larger game or add mechanics to gain marks. Use the deterministic fixture mode for comparison even if you also design a small alternative layout.

## Submission

Submit code, resource files, launch README, requirement-linked design/pseudocode, schedule, test log, peer trial, evaluation/retrospective and source/AI-asset log. Declare supplied code and all permitted assistance. The supplied display shell is infrastructure; it does not evidence student movement, collisions, scoring, timers, data algorithms or game-state logic.

The teacher issues the final dates, permitted code assistance and access arrangements, then moderates the common guide. School release review and workload trial remain outstanding. Read asset-policy.md and the year-level marking guide.


# Year 12 common game marking guide

Task 1 · raw total 100 · contributes 15% to the annual school mark. Apply identically to all five themes. Original draft for moderation.

## Investigation (15)

| Item | Marks | Observable evidence |
|---|---:|---|
| I1 | 5 | Identify the audience/problem and compare two design ideas. |
| I2 | 5 | Link common FR/NFR IDs to measurable success criteria. |
| I3 | 5 | Plan dependencies, checkpoints and the workshop budget. |
## Design (25)

| Item | Marks | Observable evidence |
|---|---:|---|
| D1 | 8 | Design states and function/class interfaces for the common game. |
| D2 | 8 | Design the required year-level data structures and file formats. |
| D3 | 9 | Provide pseudocode and correct desk-checks for scoring, terminal precedence and the required data algorithms. |
## Implementation (35)

| Item | Marks | Observable evidence |
|---|---:|---|
| C1 | 6 | Implement state transitions, pause and clean restart/quit. |
| C2 | 8 | Implement boundary/collision behaviour, life loss and cooldown. |
| C3 | 6 | Implement collection, scoring, timer and result precedence. |
| C4 | 10 | Implement the year-level data/architecture requirements: Year 11 list/history processing, or Year 12 maps/OOP/dictionary/search/sort. |
| C5 | 5 | Implement validation, file operations and documented failure responses. |
## Testing (15)

| Item | Marks | Observable evidence |
|---|---:|---|
| T1 | 5 | Unit tests and traces have independent expectations and actual evidence. |
| T2 | 5 | Scenario-independent acceptance cases cover normal, invalid and boundary behaviour; repairs are retested. |
| T3 | 5 | Measure quality requirements, including pause, response and asset fallback, on the declared environment. |
## Evaluation (10)

| Item | Marks | Observable evidence |
|---|---:|---|
| E1 | 4 | Judge FR/NFR achievement using actual evidence and acknowledge gaps. |
| E2 | 3 | Record a peer acceptance trial and a justified response. |
| E3 | 3 | Reflect on process, sources/assistance and one prioritised improvement. |

## Applying the guide

For each item allocate marks in proportion to demonstrated accurate/relevant evidence, from zero for no relevant evidence to the full item mark for complete, correct evidence; record the reason for partial credit. Moderate example evidence and item boundaries before issue. Avoid double-counting a single feature across implementation items. Testing/evaluation marks assess evidence and reasoning, not simply whether the product works.

No bonus marks for extra levels, mechanics, AI artwork, animation, paid assets or audio production. A primitive-shape submission has the same maximum. A function/class count alone earns no marks; judge responsibilities and behaviour. Assess Year 11 data evidence under FR7–FR8 and Year 12 data/OOP evidence under FR7–FR10. Use NFR checks for quality rather than aesthetic taste.

Attach the final teacher-approved interpretation to the issued task; raw percentage thresholds are not automatic syllabus grades.

## Conditions to finalise before issue

Teacher sets issue/due dates, permitted references/AI/assistance, supervised-work arrangements, individual-authorship evidence, approved adjustments and the item-level key. Record milestones and use an explanation or small change demonstration to authenticate the same task. Fresh controlled tests and exam keys must be developed privately. Public practice answers cannot establish assessment security.

This option does not add to the eight-task outline. A learner completes the selected alternative or an explicitly moderated equivalent. Refer to teacher-release-checklist.md and coverage-and-release.md before use.
