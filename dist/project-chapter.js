chapters.push({
  "id": "design",
  "week": "8–10",
  "title": "Designing and testing solutions",
  "intro": "Investigate, design, build and evaluate the shared Year 11 Pygame game using one equivalent theme and 10 existing supervised workshops.",
  "objectives": [
    "Trace the shared functional and non-functional requirements into design and tests.",
    "Develop the fixed-scope game using the required year-level structures and supplied fixtures.",
    "Use actual test/acceptance evidence, versions and a retrospective to evaluate the result."
  ],
  "sections": [
    [
      "Investigate: understand the problem",
      "<p>One fixed arena, five collectibles, three predictable hazards and a results/history screen.</p><p>Choose one theme below. Only setting, labels and decorative assets change; rules, counts, fixtures, tests and marking guide are shared. Primitive shapes/text and permitted AI decorative assets have equal standing. Artwork earns no extra marks. School-issued code-assistance rules remain separate.</p><ul><li><strong>Space salvage</strong>: <a href=\"assessments/briefs/y11-t1-space.md\" download>scenario brief</a> · <a href=\"assessments/y11-t1-space-starter.zip\" download>starter ZIP</a></li><li><strong>Reef rescue</strong>: <a href=\"assessments/briefs/y11-t1-reef.md\" download>scenario brief</a> · <a href=\"assessments/y11-t1-reef-starter.zip\" download>starter ZIP</a></li><li><strong>Castle courier</strong>: <a href=\"assessments/briefs/y11-t1-castle.md\" download>scenario brief</a> · <a href=\"assessments/y11-t1-castle-starter.zip\" download>starter ZIP</a></li><li><strong>Circuit repair</strong>: <a href=\"assessments/briefs/y11-t1-circuit.md\" download>scenario brief</a> · <a href=\"assessments/y11-t1-circuit-starter.zip\" download>starter ZIP</a></li><li><strong>Museum recovery</strong>: <a href=\"assessments/briefs/y11-t1-museum.md\" download>scenario brief</a> · <a href=\"assessments/y11-t1-museum-starter.zip\" download>starter ZIP</a></li></ul><div class=\"notice\"><strong>Before project issue:</strong> Before issue, teach the Pygame event/draw/timing loop, Rect collisions and the provided shell in existing lessons. Core programming prerequisites come from the textbook. If that preparation is missing, re-plan class time before release; do not add mandatory home development. Use the scaffolded Pygame practice linked below and record actual readiness. Classroom workload/moderation remains pending (A03); resource availability does not certify preparation.</div><p>Use the common FR/NFR IDs throughout your workbook, tests and evaluation. Do not reuse the legacy console requirements.</p><details><summary>Read every shared functional/non-functional requirement</summary><div class=\"table-scroll\"><table><thead><tr><th scope=\"col\">ID</th><th scope=\"col\">Common requirement</th><th scope=\"col\">Expected evidence</th></tr></thead><tbody><tr><td>FR1</td><td>Provide title/instructions, playing, paused and result states. Start, resume, restart and quit through documented keyboard controls.</td><td>Pause freezes gameplay time and movement; restarting restores initial score, lives, timer and objects.</td></tr><tr><td>FR2</td><td>Move one player in four directions using documented keys. Keep the player inside the arena or walkable map.</td><td>At each outer boundary, another outward move leaves the player in bounds; diagonal speed tricks are unnecessary.</td></tr><tr><td>FR3</td><td>Use five collectibles worth 10 points each and three predictable patrol hazards. Collect each item at most once.</td><td>Collecting the same item twice changes the score only once; collecting all five yields 50 points.</td></tr><tr><td>FR4</td><td>Begin with three lives and a 90-second active-play timer. A hazard hit removes one life, returns the player to the safe start and gives 1000 ms hit protection.</td><td>A hit at 1000 ms leaves two lives; a second collision at 1500 ms leaves two; at 2000 ms it may remove one more.</td></tr><tr><td>FR5</td><td>Win by collecting all five items and reaching the exit. Lose at zero lives or zero remaining time. Resolve loss before win if both occur in the same update.</td><td>With the final item and exit reached while the timer expires, show loss. No further score changes occur after a result.</td></tr><tr><td>FR6</td><td>Display score, lives, remaining time, controls and win/loss feedback. Mark player, collectibles, hazards and exit with shape or text as well as colour.</td><td>A peer identifies each object and reads the current values without an audio cue or colour-only distinction.</td></tr><tr><td>FR7</td><td>Use student-written functions with parameters/returns for state changes, collision consequences, scoring and results. Process a one-dimensional list of collectibles; own classes, nested grids and advanced libraries are unnecessary.</td><td>Explain one function contract and trace removal/collected status for first, last and only remaining collectible.</td></tr><tr><td>FR8</td><td>Append the final integer score once per completed run to a local text history. Read valid prior scores and show count, total and first maximum position; show an empty-history message.</td><td>For [20,0,50,50], count 4, total 120, first maximum index 2. Missing history starts empty. Skip malformed/out-of-range score lines with a warning; a failed write reports failure and gameplay remains usable.</td></tr><tr><td>FR9</td><td>Offer two pre-defined difficulty choices; normal patrol interval is 1000 ms and challenge is 750 ms. All other rules, counts, scoring and time remain the same.</td><td>Unsupported menu keys do not start a run. The selected difficulty survives pause but restart resets the current run.</td></tr><tr><td>NFR1</td><td>Usability: instructions visible before play, a clear pause indicator, readable HUD at the agreed 800 × 600 test window and consistent restart/quit controls.</td><td>Run a short peer trial; the peer starts, pauses and restarts using only the instructions. Record difficulties and one response.</td></tr><tr><td>NFR2</td><td>Reliability: run a two-minute repeatable trial including pause, restart and result states without an unhandled exception. Use a fixed layout and deterministic patrols for tests.</td><td>Record the actual build, test sequence, result and any correction/retest. A pause long enough to cross 90 wall-clock seconds must not consume active-play time.</td></tr><tr><td>NFR3</td><td>Responsiveness: process close/keyboard events every frame, cap rendering with Clock.tick(60), and avoid blocking sleeps in the game loop.</td><td>On the named school reference PC with the required object counts, a pause input is visible within 250 ms in five observations. Record the method and results; investigate misses rather than infer performance from the FPS cap.</td></tr><tr><td>NFR4</td><td>Maintainability: meaningful names and constants, one clear responsibility per function/method, comments explaining decisions and a concise README.</td><td>A peer finds the score, timer and hazard-interval constants and identifies the scoring function without tracing the whole program.</td></tr><tr><td>NFR5</td><td>Portability and resilience: run offline with Python 3 and school-approved Pygame, relative resource paths and primitive-shape fallbacks.</td><td>Run from a different parent working directory; remove decorative assets and confirm the full game still works using shapes/text.</td></tr><tr><td>NFR6</td><td>Accessibility and assets: sound is optional, colour is never the only signal, and static images/audio/decoration may be made with AI or replaced by Pygame primitives without a marking penalty.</td><td>Mute audio and use the shape/text version. Log each external or AI asset, tool/source, date and relevant permissions. Do not assume generated assets are automatically free of third-party rights.</td></tr><tr><td>NFR7</td><td>Authenticity and privacy: the assessed game logic, data design and explanations must evidence the student’s own learning. Keep dated versions, backup, and a source/assistance log; use synthetic labels only.</td><td>Explain and make a small teacher-selected change to the same project. Asset-generation permission does not decide whether AI code assistance is permitted; the issued school conditions do.</td></tr></tbody></table></div></details><p><a href=\"assessments/games/year11-requirements.md\" download>Full year-level contract</a> · <a href=\"assessments/games/year11-marking-guide.md\" download>Common marking guide</a></p>"
    ],
    [
      "Plan the work and dependencies",
      "<p>Keep exactly ten supervised slots: one investigate, one design, five build, two test/acceptance and one evaluation/handover. Preserve other lessons and the exam block. Do not make core completion depend on extra periods or home coding.</p><div class=\"table-scroll\"><table><thead><tr><th scope=\"col\">Slot</th><th scope=\"col\">Week/lesson</th><th scope=\"col\">Milestone</th><th scope=\"col\">Evidence</th></tr></thead><tbody><tr><td>1</td><td>W8 L1</td><td>Choose a Pygame theme and agree the shared brief</td><td>Explain the scope and exclusions; show the prerequisite preparation record before project issue.</td></tr><tr><td>2</td><td>W8 L2</td><td>Design game states, functions and one-dimensional lists</td><td>Design checkpoint: explain pause/reset, once-only collection, file policy and independent expected results.</td></tr><tr><td>3</td><td>W8 L3</td><td>Build the game state and controls skeleton</td><td>Demonstrate start and restart returning score, lives, time and objects to their required initial values.</td></tr><tr><td>4</td><td>W8 L4</td><td>Build movement and fixed-layout collision rules</td><td>Checkpoint: explain a movement boundary test and show one collectible scores only once.</td></tr><tr><td>5</td><td>W9 L3</td><td>Implement score, lives and active-play timing</td><td>Trace two hits at the protection boundary and verify the zero-time/exit collision outcome.</td></tr><tr><td>6</td><td>W9 L4</td><td>Implement the HUD and score-history functions</td><td>Build checkpoint: test a repeated result update, missing/empty history, malformed lines and a failed write policy.</td></tr><tr><td>7</td><td>W10 L1</td><td>Integrate difficulty choices and the complete game core</td><td>Demonstrate normal 1000 ms and challenge 750 ms patrol intervals without changing scoring, item counts or time.</td></tr><tr><td>8</td><td>W10 L2</td><td>Run the common game tests, repair and retest</td><td>Show pause, restart, collision/timer, history and quality evidence; leave unrun checks pending.</td></tr><tr><td>9</td><td>W10 L3</td><td>Conduct the player acceptance and quality trial</td><td>Match observations to NFR IDs; distinguish measured results from intended behaviour.</td></tr><tr><td>10</td><td>W10 L4</td><td>Demonstrate, evaluate and hand over the game</td><td>Hand over the selected theme, code, fixtures, workbook and test evidence under the school-issued conditions.</td></tr></tbody></table></div>"
    ],
    [
      "Design: divide the solution into modules",
      "<p>Draw the title/instructions, playing, paused and result states first. Show start, pause/resume, restart and quit; specify loss-before-completion precedence. Keep state updates separate from drawing. Design collision, respawn/protection and once-only scoring before connecting the display.</p><p>Use student-written functions with parameters/returns and one-dimensional collectible/history lists. Define file validation and count/total/first-maximum behaviour for empty and tied histories. Student classes and nested maps are not required.</p><p>Write pseudocode and trace a collected item twice, a protected hit, zero-time plus exit completion, pause/resume and full restart. For history [50, 0, 50], predict count 3, total 100 and first maximum index 0. Normal/challenge changes only the fixed patrol interval.</p>"
    ],
    [
      "Develop: build a small working part",
      "<p>Implement a small slice, predict its state/output, run it and record actual evidence before adding another slice. Use supplied deterministic layouts and primitive shapes first. The starter display shell is infrastructure, not a finished game. Keep version checkpoints and isolate game rules from input/drawing and file I/O.</p>"
    ],
    [
      "Test: choose evidence that can expose mistakes",
      "<p>Start with the <a href=\"assessments/games/year11-acceptance.csv\" download>shared expected cases</a> and record your own actual results in the <a href=\"project-test-log.csv\" download>game test log</a>. Cover normal, boundary, invalid, empty, repeated and file-failure cases. A pause crossing 90 wall-clock seconds must not consume active-play time. A rejected operation should preserve the appropriate state.</p><p>Retest the original failure and previously passing cases. Record build, machine and limitations for the common quality trials. Expected outcomes or an unrun test are not completed evidence.</p>"
    ],
    [
      "Debug: isolate the first incorrect state",
      "<p>Classify syntax, runtime and logic faults. Trace the first incorrect state, repair one cause and retain a regression case. Examples include repeated scoring, spending paused time, saving a result twice and changing state after a loss. Do not hide a missing implementation or save failure behind a success message.</p>"
    ],
    [
      "Evaluate: judge the result against the brief",
      "<p>A peer acts as a player and follows the supplied instructions without coaching. Match usability, readability, non-colour cues, pause/reset, relative paths, primitive fallbacks and measured reliability/response observations to the NFR IDs. Evaluate every FR/NFR as met, partly met or not met using evidence. Explain your own algorithms and one fresh change; restore a known version and record its behaviour.</p><p>Complete the source/asset/assistance log and developer retrospective. The checkpoint and acceptance trial belong to this same project, not extra weighted tasks. Classroom trial and school moderation still govern readiness for formal issue.</p>"
    ],
    [
      "Project pack and checkpoints",
      "<p><a class=\"button\" href=\"project-brief.md\" download>Current game brief</a><a class=\"button secondary\" href=\"project-workbook.md\" download>Aligned project workbook</a><a class=\"button secondary\" href=\"project-pack.zip\" download>All five theme starters and teaching pack</a></p><p><a href=\"project-milestones.csv\" download>Workshop milestone CSV</a> · <a href=\"project-teacher-guide.md\" download>Teacher delivery notes</a> · <a href=\"legacy-projects/index.html\">Optional legacy console practice</a></p><p>Current workshop cards use this workbook and game contract. Old console-project slides are labelled legacy and are not linked as the current project presentation; replacement project slides belong to A06.</p>"
    ]
  ],
  "practice": [
    [
      "Scope",
      "Can a theme add flight, physics or a specialist mechanic to earn extra marks?",
      "No. Keep the same shared core; only labels, setting and decorative assets vary. Primitive shapes can meet the media requirements."
    ],
    [
      "Design",
      "Why separate update rules from drawing?",
      "Rules can be tested with controlled state, and redrawing must not move actors or add points."
    ],
    [
      "Test",
      "What happens if time reaches zero in the same update as exit completion?",
      "The common contract resolves loss before completion. Test that exact boundary and preserve the case."
    ],
    [
      "Evaluate",
      "Does a runnable display shell prove the whole project meets its requirements?",
      "No. It demonstrates infrastructure only. The student game logic and actual acceptance/quality evidence remain necessary."
    ]
  ],
  "task": "Use one Year 11 theme starter and the aligned workbook to investigate, design, implement, test and evaluate the shared Pygame core. Keep the 10 supervised workshop budget and all common FR/NFR requirements. Record actual evidence and use the school-issued conditions.",
  "solution": "# Illustrative planning evidence only — not a completed game.\n# Collect an active item once -> +10 and item inactive.\n# Collect it again -> unchanged score.\n# Pause -> active timer and positions unchanged.\n# Zero time plus exit completion -> loss.\n# Evaluate every common FR/NFR with actual observations.\n",
  "recap": "Keep one equivalent theme within the shared year-level game contract. Plan states and data, build in tested slices, preserve expected/actual evidence, and evaluate the same FR/NFR IDs.",
  "lessons": [
    "Agree the shared brief, prerequisites and fixed scope.",
    "Design year-level data, state/algorithm contracts and expected tests.",
    "Build and integrate in the allocated workshops; record versions and corrections.",
    "Run common tests and player acceptance, then evaluate and hand over evidence."
  ],
  "reference": "https://www.pygame.org/docs/",
  "refTitle": "Pygame technical reference; year-level game contract linked above",
  "quiz": {
    "q": "Which change keeps the five project themes equivalent?",
    "options": [
      "Change only the labels and permitted decorative assets",
      "Give one theme a more advanced physics system",
      "Award bonus marks for purchased artwork"
    ],
    "answer": 0,
    "explanation": "The common rules, data, tests and marking guide are shared; theme differences are decorative."
  },
  "badge": "PYGAME / YEAR 11 PROJECT"
});
