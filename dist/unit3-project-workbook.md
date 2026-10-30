# Year 12 Pygame project workbook

For the shared game brief and your selected scenario, within 12 existing supervised workshops. This supports the adopted Task 1; it is not an additional assessment. Use fictional game data. The school’s issued conditions govern permitted support, evidence and deadlines.

## 1. Investigate and prepare

- Selected theme and two alternatives compared:
- Intended player/audience and problem:
- Fixed scope and exclusions accepted:
- Prior Pygame preparation completed (teacher, lesson/date, event/draw/timing loop, Rect collisions, shell):
- If preparation is missing, stop issue and re-plan the agreed sequence; do not assume extra homework:
- School-issued conditions, permitted code/AI support and individual evidence:

## 2. Trace every shared requirement

Copy the IDs exactly. Write your design decision and test ID against every functional and non-functional requirement. The common expected evidence is supplied below; record your own actual observations separately.

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

| Requirement ID | Design decision | Test IDs | Actual evidence location | Met/partly/not met | Limitation |
|---|---|---|---|---|---|
| FR1 | | | | | |
| FR2 | | | | | |
| FR3 | | | | | |
| FR4 | | | | | |
| FR5 | | | | | |
| FR6 | | | | | |
| FR7 | | | | | |
| FR8 | | | | | |
| FR9 | | | | | |
| FR10 | | | | | |
| NFR1 | | | | | |
| NFR2 | | | | | |
| NFR3 | | | | | |
| NFR4 | | | | | |
| NFR5 | | | | | |
| NFR6 | | | | | |
| NFR7 | | | | | |

## 3. Design before changing state

- State diagram: title/instructions, playing, paused, result; start/resume/restart/quit controls:
- Update versus draw responsibilities:
- Collision, once-only scoring, safe respawn/protection and loss precedence pseudocode:
- File record format, validation/missing/malformed/save-failure policies:
- Actor base class and Player/Hazard responsibilities, attributes, methods and update override:
- Independent 8 × 10 map lists, tile values and validation; map transition/reset invariants:
- Dictionary metadata keys, missing/duplicate policy and active-list linear search:
- Taught sort choice for up to ten valid history scores; order/multiplicity tests:

## 4. Schedule and checkpoints

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

Add dependencies and planned/actual dates to the milestone CSV. Keep a version log: slot, build ID, change, tests run, next action. The design and build checkpoints are part of this project, not additional separately weighted tasks.

## 5. Test, repair and retest

Use the supplied common expected cases and this blank actual-evidence log. Predict before running. Include normal, boundary, invalid, empty, repeated, missing-file and failed-write cases. Check pause/reset, once-only collection, hit-protection timing and loss-before-completion. Keep previously passing cases after a repair.

| Test ID | FR/NFR IDs | Setup/action | Expected output/state | Actual output/state | Result/pending | Fix and retest | Build/machine/date |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

Do not record expected outcomes as completed tests. Use a named school setup for response/reliability evidence and retain unresolved limitations.

## 6. Player acceptance and asset checks

- Peer role label and instruction-only action script:
- Observations for each common NFR; readable HUD, shapes/text, pause/restart, offline paths and primitive fallback:
- Actual reliability/response observations and setup (not invented timing):
- Feedback, change and retest:
- Asset/source/licence/AI assistance log; no artwork bonus:

## 7. Evaluate and hand over

Evaluate every FR/NFR ID using actual evidence and state limits. Explain your own code/data/algorithm decisions with a fresh input. Restore a saved version and record the checked result. Hand over code, selected fixtures/theme, completed workbook and logs. Record what helped, delays, one justified improvement and the next schedule change.

The old console examples are optional legacy practice only. They do not replace this brief.
