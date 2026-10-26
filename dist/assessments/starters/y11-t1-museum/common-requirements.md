# Year 11 Pygame game contract

Programming project Task 1 · 20% of annual school mark · 2027 draft · reviewed 26 October 2026.

All five themes use this contract and the same marking guide. Choose the setting and design a usable presentation; retain the shared rules, fixtures and assessed behaviour. This is original assessment planning for teacher moderation, not an official SCSA task.

## Scope and preparation

One fixed arena, five collectibles, three predictable hazards and a results/history screen.

Before issue, teach the Pygame event/draw/timing loop, Rect collisions and the provided shell in existing lessons. Core programming prerequisites come from the textbook. If that preparation is missing, re-plan class time before release; do not add mandatory home development.

Workshop allocation (10 lessons): 1 investigate, 1 design, 5 build, 2 test/acceptance, 1 evaluate/handover. Checkpoints belong to this one project, not extra weighted tasks. A complete shapes/text version is sufficient.

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
Win by collecting all five items and reaching the exit. Lose at zero lives or zero remaining time. Resolve loss before win if both occur in the same update.

Acceptance evidence: With the final item and exit reached while the timer expires, show loss. No further score changes occur after a result.

Curriculum connection: Complex conditions; precedence; testing.

### FR6
Display score, lives, remaining time, controls and win/loss feedback. Mark player, collectibles, hazards and exit with shape or text as well as colour.

Acceptance evidence: A peer identifies each object and reads the current values without an audio cue or colour-only distinction.

Curriculum connection: User requirements; acceptance testing.

### FR7
Use student-written functions with parameters/returns for state changes, collision consequences, scoring and results. Process a one-dimensional list of collectibles; own classes, nested grids and advanced libraries are unnecessary.

Acceptance evidence: Explain one function contract and trace removal/collected status for first, last and only remaining collectible.

Curriculum connection: Unit 1 functions; one-dimensional arrays.

### FR8
Append the final integer score once per completed run to a local text history. Read valid prior scores and show count, total and first maximum position; show an empty-history message.

Acceptance evidence: For [20,0,50,50], count 4, total 120, first maximum index 2. Missing history starts empty. Skip malformed/out-of-range score lines with a warning; a failed write reports failure and gameplay remains usable.

Curriculum connection: Unit 1 array processing; sequential files; exception handling.

### FR9
Offer two pre-defined difficulty choices; normal patrol interval is 1000 ms and challenge is 750 ms. All other rules, counts, scoring and time remain the same.

Acceptance evidence: Unsupported menu keys do not start a run. The selected difficulty survives pause but restart resets the current run.

Curriculum connection: Type/range checking; selection.


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
