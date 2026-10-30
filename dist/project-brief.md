# Year 11 Pygame interactive game · shared project brief

Teaching alignment updated 30 October 2026. Units 1 / proposed Task 1. This brief follows the existing assessment-library contract; it does not add another weighted task. School-issued conditions and independent moderation remain necessary.

## Shared scope

One fixed arena, five collectibles, three predictable hazards and a results/history screen.

Use functions, parameters/returns and one-dimensional lists. Student-authored classes and nested tile maps are not required for Year 11.

## Choose one theme, keep the same challenge

- Space salvage: [brief](https://edugenio.github.io/cs-atar-textbook/assessments/briefs/y11-t1-space.md) · [starter ZIP](https://edugenio.github.io/cs-atar-textbook/assessments/y11-t1-space-starter.zip)
- Reef rescue: [brief](https://edugenio.github.io/cs-atar-textbook/assessments/briefs/y11-t1-reef.md) · [starter ZIP](https://edugenio.github.io/cs-atar-textbook/assessments/y11-t1-reef-starter.zip)
- Castle courier: [brief](https://edugenio.github.io/cs-atar-textbook/assessments/briefs/y11-t1-castle.md) · [starter ZIP](https://edugenio.github.io/cs-atar-textbook/assessments/y11-t1-castle-starter.zip)
- Circuit repair: [brief](https://edugenio.github.io/cs-atar-textbook/assessments/briefs/y11-t1-circuit.md) · [starter ZIP](https://edugenio.github.io/cs-atar-textbook/assessments/y11-t1-circuit-starter.zip)
- Museum recovery: [brief](https://edugenio.github.io/cs-atar-textbook/assessments/briefs/y11-t1-museum.md) · [starter ZIP](https://edugenio.github.io/cs-atar-textbook/assessments/y11-t1-museum-starter.zip)

Only labels, setting and decorative assets vary. Use the common fixture counts, rules, tests and marking guide. Primitive Pygame shapes/text are a complete route. AI-generated decorative assets are permitted under the shared asset policy and source log; no marks are awarded for artistic sophistication. This does not determine the school’s separate rules for AI-generated code.

## Required preparation before issue

Before issue, teach the Pygame event/draw/timing loop, Rect collisions and the provided shell in existing lessons. Core programming prerequisites come from the textbook. If that preparation is missing, re-plan class time before release; do not add mandatory home development.

A02’s Pygame teaching bridge and A03’s classroom workload/moderation remain separate pending work. A01 aligns delivery documents; it does not claim the preparation or full game trial has already occurred.

## Requirements

| ID | Common requirement | Expected acceptance evidence |
|---|---|---|
| FR1 | Provide title/instructions, playing, paused and result states. Start, resume, restart and quit through documented keyboard controls. | Pause freezes gameplay time and movement; restarting restores initial score, lives, timer and objects. |
| FR2 | Move one player in four directions using documented keys. Keep the player inside the arena or walkable map. | At each outer boundary, another outward move leaves the player in bounds; diagonal speed tricks are unnecessary. |
| FR3 | Use five collectibles worth 10 points each and three predictable patrol hazards. Collect each item at most once. | Collecting the same item twice changes the score only once; collecting all five yields 50 points. |
| FR4 | Begin with three lives and a 90-second active-play timer. A hazard hit removes one life, returns the player to the safe start and gives 1000 ms hit protection. | A hit at 1000 ms leaves two lives; a second collision at 1500 ms leaves two; at 2000 ms it may remove one more. |
| FR5 | Win by collecting all five items and reaching the exit. Lose at zero lives or zero remaining time. Resolve loss before win if both occur in the same update. | With the final item and exit reached while the timer expires, show loss. No further score changes occur after a result. |
| FR6 | Display score, lives, remaining time, controls and win/loss feedback. Mark player, collectibles, hazards and exit with shape or text as well as colour. | A peer identifies each object and reads the current values without an audio cue or colour-only distinction. |
| FR7 | Use student-written functions with parameters/returns for state changes, collision consequences, scoring and results. Process a one-dimensional list of collectibles; own classes, nested grids and advanced libraries are unnecessary. | Explain one function contract and trace removal/collected status for first, last and only remaining collectible. |
| FR8 | Append the final integer score once per completed run to a local text history. Read valid prior scores and show count, total and first maximum position; show an empty-history message. | For [20,0,50,50], count 4, total 120, first maximum index 2. Missing history starts empty. Skip malformed/out-of-range score lines with a warning; a failed write reports failure and gameplay remains usable. |
| FR9 | Offer two pre-defined difficulty choices; normal patrol interval is 1000 ms and challenge is 750 ms. All other rules, counts, scoring and time remain the same. | Unsupported menu keys do not start a run. The selected difficulty survives pause but restart resets the current run. |
| NFR1 | Usability: instructions visible before play, a clear pause indicator, readable HUD at the agreed 800 × 600 test window and consistent restart/quit controls. | Run a short peer trial; the peer starts, pauses and restarts using only the instructions. Record difficulties and one response. |
| NFR2 | Reliability: run a two-minute repeatable trial including pause, restart and result states without an unhandled exception. Use a fixed layout and deterministic patrols for tests. | Record the actual build, test sequence, result and any correction/retest. A pause long enough to cross 90 wall-clock seconds must not consume active-play time. |
| NFR3 | Responsiveness: process close/keyboard events every frame, cap rendering with Clock.tick(60), and avoid blocking sleeps in the game loop. | On the named school reference PC with the required object counts, a pause input is visible within 250 ms in five observations. Record the method and results; investigate misses rather than infer performance from the FPS cap. |
| NFR4 | Maintainability: meaningful names and constants, one clear responsibility per function/method, comments explaining decisions and a concise README. | A peer finds the score, timer and hazard-interval constants and identifies the scoring function without tracing the whole program. |
| NFR5 | Portability and resilience: run offline with Python 3 and school-approved Pygame, relative resource paths and primitive-shape fallbacks. | Run from a different parent working directory; remove decorative assets and confirm the full game still works using shapes/text. |
| NFR6 | Accessibility and assets: sound is optional, colour is never the only signal, and static images/audio/decoration may be made with AI or replaced by Pygame primitives without a marking penalty. | Mute audio and use the shape/text version. Log each external or AI asset, tool/source, date and relevant permissions. Do not assume generated assets are automatically free of third-party rights. |
| NFR7 | Authenticity and privacy: the assessed game logic, data design and explanations must evidence the student’s own learning. Keep dated versions, backup, and a source/assistance log; use synthetic labels only. | Explain and make a small teacher-selected change to the same project. Asset-generation permission does not decide whether AI code assistance is permitted; the issued school conditions do. |

## Exclusions

- 3D, VR/headset integration, multiplayer, online services or accounts
- Procedural worlds, A* pathfinding, physics engines, complex platform jumping or advanced enemy AI
- Database integration, crafting/inventory systems, shops, dialogue trees or extra level editors
- Marks for animation, original artwork, audio production, asset quantity or paid software

## Exactly 10 supervised workshops

| Slot | Week/lesson | Phase | Milestone | Evidence check |
|---|---|---|---|---|
| 1 | W8 L1 | Investigate | Choose a Pygame theme and agree the shared brief | Explain the scope and exclusions; show the prerequisite preparation record before project issue. |
| 2 | W8 L2 | Design | Design game states, functions and one-dimensional lists | Design checkpoint: explain pause/reset, once-only collection, file policy and independent expected results. |
| 3 | W8 L3 | Build | Build the game state and controls skeleton | Demonstrate start and restart returning score, lives, time and objects to their required initial values. |
| 4 | W8 L4 | Build | Build movement and fixed-layout collision rules | Checkpoint: explain a movement boundary test and show one collectible scores only once. |
| 5 | W9 L3 | Build | Implement score, lives and active-play timing | Trace two hits at the protection boundary and verify the zero-time/exit collision outcome. |
| 6 | W9 L4 | Build | Implement the HUD and score-history functions | Build checkpoint: test a repeated result update, missing/empty history, malformed lines and a failed write policy. |
| 7 | W10 L1 | Build | Integrate difficulty choices and the complete game core | Demonstrate normal 1000 ms and challenge 750 ms patrol intervals without changing scoring, item counts or time. |
| 8 | W10 L2 | Test | Run the common game tests, repair and retest | Show pause, restart, collision/timer, history and quality evidence; leave unrun checks pending. |
| 9 | W10 L3 | Acceptance | Conduct the player acceptance and quality trial | Match observations to NFR IDs; distinguish measured results from intended behaviour. |
| 10 | W10 L4 | Evaluate | Demonstrate, evaluate and hand over the game | Hand over the selected theme, code, fixtures, workbook and test evidence under the school-issued conditions. |

Keep the existing teaching weeks and workshop slots. No mandatory home development or extra project periods are assumed. Other lessons in mixed weeks remain in their original strands.

## Authoritative common resources

- [Full common requirements](https://edugenio.github.io/cs-atar-textbook/assessments/games/year11-requirements.md)
- [Common marking guide](https://edugenio.github.io/cs-atar-textbook/assessments/games/year11-marking-guide.md)
- [Shared expected cases](https://edugenio.github.io/cs-atar-textbook/assessments/games/year11-acceptance.csv)
- [Asset policy](https://edugenio.github.io/cs-atar-textbook/assessments/games/asset-policy.md)

Do not combine the archived console-project requirements with this game. The supplied shell only draws a static display; assessed game logic remains student-authored and unfinished.
