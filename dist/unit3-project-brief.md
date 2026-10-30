# Year 12 Pygame interactive game · shared project brief

Teaching alignment updated 30 October 2026. Units 3 / proposed Task 1. This brief follows the existing assessment-library contract; it does not add another weighted task. School-issued conditions and independent moderation remain necessary.

## Shared scope

Two small tile maps, five collectibles and three hazards per map, with a small actor hierarchy and a results report.

Use the required small actor hierarchy, two independent tile maps, an item dictionary, student linear search and a taught history-score sort.

## Choose one theme, keep the same challenge

- Space salvage: [brief](https://edugenio.github.io/cs-atar-textbook/assessments/briefs/y12-t1-space.md) · [starter ZIP](https://edugenio.github.io/cs-atar-textbook/assessments/y12-t1-space-starter.zip)
- Reef rescue: [brief](https://edugenio.github.io/cs-atar-textbook/assessments/briefs/y12-t1-reef.md) · [starter ZIP](https://edugenio.github.io/cs-atar-textbook/assessments/y12-t1-reef-starter.zip)
- Castle courier: [brief](https://edugenio.github.io/cs-atar-textbook/assessments/briefs/y12-t1-castle.md) · [starter ZIP](https://edugenio.github.io/cs-atar-textbook/assessments/y12-t1-castle-starter.zip)
- Circuit repair: [brief](https://edugenio.github.io/cs-atar-textbook/assessments/briefs/y12-t1-circuit.md) · [starter ZIP](https://edugenio.github.io/cs-atar-textbook/assessments/y12-t1-circuit-starter.zip)
- Museum recovery: [brief](https://edugenio.github.io/cs-atar-textbook/assessments/briefs/y12-t1-museum.md) · [starter ZIP](https://edugenio.github.io/cs-atar-textbook/assessments/y12-t1-museum-starter.zip)

Only labels, setting and decorative assets vary. Use the common fixture counts, rules, tests and marking guide. Primitive Pygame shapes/text are a complete route. AI-generated decorative assets are permitted under the shared asset policy and source log; no marks are awarded for artistic sophistication. This does not determine the school’s separate rules for AI-generated code.

## Required preparation before issue

Before issue, teach the Pygame event/draw/timing loop, Rect collisions and the provided shell in existing lessons. Core programming prerequisites come from the textbook. If that preparation is missing, re-plan class time before release; do not add mandatory home development.

The [Pygame teaching bridge](https://edugenio.github.io/cs-atar-textbook/pygame/) supplies staged practice before project issue. Record the actual school-machine and independent-learner checks; A03 classroom workload/moderation remains pending. Resource availability does not mean preparation has occurred.

## Requirements

| ID | Common requirement | Expected acceptance evidence |
|---|---|---|
| FR1 | Provide title/instructions, playing, paused and result states. Start, resume, restart and quit through documented keyboard controls. | Pause freezes gameplay time and movement; restarting restores initial score, lives, timer and objects. |
| FR2 | Move one player in four directions using documented keys. Keep the player inside the arena or walkable map. | At each outer boundary, another outward move leaves the player in bounds; diagonal speed tricks are unnecessary. |
| FR3 | Use five collectibles worth 10 points each and three predictable patrol hazards. Collect each item at most once. | Collecting the same item twice changes the score only once; collecting all five yields 50 points. |
| FR4 | Begin with three lives and a 90-second active-play timer. A hazard hit removes one life, returns the player to the safe start and gives 1000 ms hit protection. | A hit at 1000 ms leaves two lives; a second collision at 1500 ms leaves two; at 2000 ms it may remove one more. |
| FR5 | Complete a map by collecting its five items and reaching the exit. Map 1 completion advances to map 2; map 2 completion wins the game. Lose at zero lives or zero remaining time. Resolve loss before completion if both occur in the same update. | With the final item and exit reached while the timer expires, show loss. No further score changes occur after a result. |
| FR6 | Display score, lives, remaining time, controls and win/loss feedback. Mark player, collectibles, hazards and exit with shape or text as well as colour. | A peer identifies each object and reads the current values without an audio cue or colour-only distinction. |
| FR7 | Implement two supplied 8-row × 10-column tile maps as independent two-dimensional lists. Use tile codes 0 floor, 1 wall, 2 start, 3 exit, with exactly one start and exit per map. Clear map 1 to enter map 2; five collectibles per map, three hazards, a fresh 90 seconds per map and carried score/lives. | A wall move does not change position; changing map 1 does not mutate map 2. Maximum game score is 100. A failed map check shows a useful error instead of starting an invalid game. |
| FR8 | Create a small student-authored actor base class and Player/Hazard subclasses with attributes, methods and shared movement/bounds behaviour. Instantiate objects and override a relevant update method. Separate game rules from drawing. | Explain inheritance and abstraction using actual calls; each subclass uses shared base behaviour and its own update. Merely importing a ready-made Sprite class does not supply this evidence. |
| FR9 | Use a dictionary keyed by item ID for item metadata. Write a linear search to locate an item ID in the active item list and a taught bubble, insertion or selection sort to order up to ten valid history scores for the results report. | Search [A,B,C] for B gives index 1, for Z gives a documented not-found result. Sorting [30,10,20,10] ascending yields [10,10,20,30]; empty and single inputs work. Dictionary lookup alone is not the search evidence; sorted()/sort() alone is not the algorithm evidence. |
| FR10 | Load and validate the map data; append one final game score to text history and show the ordered history-score report. Handle missing/malformed files and failed writes under a documented policy. History accepts integer scores 0–100: skip malformed/out-of-range lines with a warning, treat a missing file as empty and show a useful save-failure message. Report at most the latest ten valid scores. | Wrong dimensions, an unknown tile or duplicate start prevent play with a useful message. A completed game is saved once; restarting does not duplicate the previous result. |
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

## Exactly 12 supervised workshops

| Slot | Week/lesson | Phase | Milestone | Evidence check |
|---|---|---|---|---|
| 1 | W7 L1 | Investigate | Investigate the shared two-map Pygame brief | Explain the two-map requirement and why no specialist theme mechanics or extra project periods are added. |
| 2 | W7 L2 | Design | Design actors, maps, dictionaries and game states | Show state/class/data sketches with the same requirements IDs as the common game contract. |
| 3 | W7 L3 | Design | Desk-check search, sort and map-transition algorithms | Design checkpoint: justify algorithms and trace a duplicate score, missing item, final-map result and zero-time completion. |
| 4 | W7 L4 | Build | Build actor interfaces and load the supplied maps | Show independent map/object state and a concrete malformed-map rejection without silently inventing a map. |
| 5 | W8 L3 | Build | Implement movement, walls and overridden actor updates | Test a wall/boundary move and demonstrate that updating one actor does not mutate another actor accidentally. |
| 6 | W8 L4 | Build | Implement collection, hazards and active timers | Checkpoint: test repeated collection, protected/unprotected hits and loss-before-completion precedence. |
| 7 | W9 L3 | Build | Integrate dictionary lookup and history-score ordering | Test missing IDs, duplicate scores, empty history and sorted output; retain the intended original state where required. |
| 8 | W9 L4 | Build | Integrate map progression and persistent results | Build checkpoint: demonstrate transition state and once-only final save under documented file policies. |
| 9 | W10 L1 | Build | Integrate instructions, HUD, pause and restart | Demonstrate pause across a long wall-clock interval and restart restoring initial map, score, lives, time and objects. |
| 10 | W10 L2 | Test | Run common acceptance cases and regression checks | Show map validation, OOP/search/sort, transition, timer and file evidence; mark unrun quality checks pending. |
| 11 | W10 L3 | Acceptance | Run the player and named-machine quality trial | Justify the outcome with observed evidence rather than claiming universal performance or complete approval. |
| 12 | W10 L4 | Evaluate | Demonstrate, restore and evaluate the two-map game | Evaluate every common FR/NFR ID under the school-issued conditions; explain one limitation and a feasible improvement. |

Keep the existing teaching weeks and workshop slots. No mandatory home development or extra project periods are assumed. Other lessons in mixed weeks remain in their original strands.

## Authoritative common resources

- [Full common requirements](https://edugenio.github.io/cs-atar-textbook/assessments/games/year12-requirements.md)
- [Common marking guide](https://edugenio.github.io/cs-atar-textbook/assessments/games/year12-marking-guide.md)
- [Shared expected cases](https://edugenio.github.io/cs-atar-textbook/assessments/games/year12-acceptance.csv)
- [Asset policy](https://edugenio.github.io/cs-atar-textbook/assessments/games/asset-policy.md)

Do not combine the archived console-project requirements with this game. The supplied shell only draws a static display; assessed game logic remains student-authored and unfinished.
