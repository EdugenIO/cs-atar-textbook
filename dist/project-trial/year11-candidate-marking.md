# Year 11 candidate marking interpretation

**NOT independently moderated or adopted.** Version A03-candidate-1, 30 October 2026. Raw 100; annual Task 1 weight remains 20%. Apply one agreed version to all five themes. Existing common guide remains authoritative until the school adopts an interpretation before issue. This candidate makes partial item credit explicit without changing category/item totals. No automatic grade boundaries.

Each point is worth one mark: 1 for the stated accurate/relevant demonstrated evidence, 0 if not demonstrated after review. Do not infer unrelated points from a case. The same artifact may support design, implementation and testing only when it provides each distinct kind of evidence; do not award it three times merely for existing. No extra marks for art, assets, mechanics or feature count. The teacher records point evidence and resolves discrepancies with the second marker.

## I1 · Investigation · 5 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| I1.1 | 1 | Identify the intended player/audience. |
| I1.2 | 1 | Describe the player need/problem. |
| I1.3 | 1 | Describe one feasible design idea within the common scope. |
| I1.4 | 1 | Describe a distinct second design idea within the same scope. |
| I1.5 | 1 | Justify the selected idea against player need and the common constraints. |

## I2 · Investigation · 5 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| I2.1 | 1 | Identify every applicable functional requirement using the common IDs. |
| I2.2 | 1 | Identify every applicable non-functional requirement using the common IDs. |
| I2.3 | 1 | State observable success evidence for the functional requirements. |
| I2.4 | 1 | State measurable quality checks on a declared setup rather than aesthetic claims. |
| I2.5 | 1 | Trace the success criteria to planned design and test evidence. |

## I3 · Investigation · 5 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| I3.1 | 1 | Allocate the exact 10/12 existing workshop slots to dated or numbered milestones. |
| I3.2 | 1 | Show a meaningful dependency between planned activities. |
| I3.3 | 1 | Include the planned investigation/design/build/test/evaluation checkpoints. |
| I3.4 | 1 | Plan a version/backup and restore checkpoint. |
| I3.5 | 1 | Identify a specific risk and a feasible response within the budget, without mandatory home coding. |

## D1 · Design · 8 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| D1.1 | 1 | Design the title/instructions and start transition. |
| D1.2 | 1 | Design playing-to-paused and resume transitions. |
| D1.3 | 1 | Design result and full restart/quit transitions. |
| D1.4 | 1 | Define the movement/state function responsibilities. |
| D1.5 | 1 | Define collision/respawn/protection function responsibilities. |
| D1.6 | 1 | Define scoring/result function responsibilities. |
| D1.7 | 1 | Specify meaningful parameters and returned results for the proposed functions. |
| D1.8 | 1 | Separate game-rule updates from drawing and file access in the design. |

## D2 · Design · 8 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| D2.1 | 1 | Represent the collectible data in a one-dimensional list. |
| D2.2 | 1 | Specify collected/active status so a collectible can score only once. |
| D2.3 | 1 | Specify the run state and its initial/reset values. |
| D2.4 | 1 | Represent score history as a one-dimensional integer list. |
| D2.5 | 1 | Define the sequential text record format. |
| D2.6 | 1 | Specify the missing/empty-history policy. |
| D2.7 | 1 | Specify malformed/out-of-range records and visible warning policy. |
| D2.8 | 1 | Use meaningful constants/names and document why the chosen representations suit the required scope. |

## D3 · Design · 9 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| D3.1 | 1 | Give coherent pseudocode for once-only collection and scoring. |
| D3.2 | 1 | Desk-check first/last or only remaining collectible. |
| D3.3 | 1 | Desk-check repeated contact without a second score. |
| D3.4 | 1 | Give coherent terminal-state pseudocode with loss before win. |
| D3.5 | 1 | Desk-check simultaneous timeout and exit completion. |
| D3.6 | 1 | Desk-check pause/resume or full restart state. |
| D3.7 | 1 | Specify and trace history count. |
| D3.8 | 1 | Specify and trace history total. |
| D3.9 | 1 | Specify and trace first-maximum position including a tie and empty-history outcome. |

## C1 · Implementation · 6 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| C1.1 | 1 | Start a run from usable title/instructions through documented valid input; invalid start input does not start play. |
| C1.2 | 1 | Pause enters a visibly distinct state without gameplay advancing. |
| C1.3 | 1 | Resume preserves the run and excludes paused wall-clock time. |
| C1.4 | 1 | Restart restores the complete initial run, not just score or screen text. |
| C1.5 | 1 | Quit works through the documented key. |
| C1.6 | 1 | The window-close event is handled cleanly during the game loop. |

## C2 · Implementation · 8 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| C2.1 | 1 | Move left/right using the documented controls. |
| C2.2 | 1 | Move up/down using the documented controls. |
| C2.3 | 1 | Keep the player in bounds at all four arena edges. |
| C2.4 | 1 | Run three predictable patrol hazards using the supplied fixtures. |
| C2.5 | 1 | A valid hazard hit removes one life. |
| C2.6 | 1 | A valid hazard hit returns the player to the safe start. |
| C2.7 | 1 | A collision during the 1000 ms protection period does not remove another life. |
| C2.8 | 1 | The protection boundary permits a new hit at expiry under the shared collision fixture. |

## C3 · Implementation · 6 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| C3.1 | 1 | Each of the five fixed collectibles awards 10 points once only. |
| C3.2 | 1 | The active-play timer begins at 90 seconds and decreases during playing only. |
| C3.3 | 1 | Zero time or zero lives produces a loss and freezes further scoring. |
| C3.4 | 1 | Exit completion requires all five collectibles; Year 12 uses the current map condition. |
| C3.5 | 1 | Loss takes precedence over completion in the same update. |
| C3.6 | 1 | The HUD/instructions/result feedback reports current score, lives, time and outcome legibly using shape/text as well as colour. |

## C4 · Implementation · 10 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| C4.1 | 1 | Student-authored functions implement the state changes with clear responsibilities. |
| C4.2 | 1 | Student-authored functions implement collision consequences with clear responsibilities. |
| C4.3 | 1 | Student-authored functions implement scoring/results with clear responsibilities. |
| C4.4 | 1 | The student explains and uses meaningful parameters/returns without relying on a function count. |
| C4.5 | 1 | A one-dimensional list is processed to track first/last/remaining collectibles correctly. |
| C4.6 | 1 | History processing reports the count of valid scores. |
| C4.7 | 1 | History processing reports the total of valid scores. |
| C4.8 | 1 | History processing reports the first maximum index correctly when scores tie. |
| C4.9 | 1 | Normal difficulty uses the fixed 1000 ms patrol interval. |
| C4.10 | 1 | Challenge difficulty uses the fixed 750 ms interval; all other common rules remain the same. |

## C5 · Implementation · 5 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| C5.1 | 1 | Read integer history scores 0–50 and skip malformed/out-of-range lines with a warning. |
| C5.2 | 1 | Missing/empty history gives the clear empty-history outcome while gameplay remains usable. |
| C5.3 | 1 | Append one final score per completed run, including repeated result-frame updates. |
| C5.4 | 1 | A failed write is reported truthfully without terminating usable gameplay. |
| C5.5 | 1 | Resolve local resources relative to the project and provide the required primitive fallback. |

## T1 · Testing · 5 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| T1.1 | 1 | A unit/function test states an independently derived expected result. |
| T1.2 | 1 | A normal unit/function case includes observed actual output or state. |
| T1.3 | 1 | A boundary unit/function case includes observed actual output or state. |
| T1.4 | 1 | An invalid/empty unit/function case includes observed actual output or state. |
| T1.5 | 1 | Evidence identifies the function contract and exact tested build/input so it can be reproduced. |

## T2 · Testing · 5 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| T2.1 | 1 | Record actual outcomes for the shared scenario-independent acceptance cases, identifying unrun checks. |
| T2.2 | 1 | Include a relevant integration/state-transition boundary beyond an ordinary successful playthrough. |
| T2.3 | 1 | Explain the first incorrect state/cause of an observed fault; if none was found, explain an actual state trace that rules out a specific plausible fault. |
| T2.4 | 1 | Retest the original failing case after repair; if no repair was needed, repeat the stated boundary case on the submission build and record the actual outcome. |
| T2.5 | 1 | Rerun a previously passing regression case after the change, or on the submission build if no change was needed, and record its actual outcome/version. |

## T3 · Testing · 5 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| T3.1 | 1 | Record the declared machine/build and actual two-minute reliability trial covering pause, restart and result. |
| T3.2 | 1 | Record the actual 95-wall-clock-second pause trial against unchanged active time and positions. |
| T3.3 | 1 | Record all five observed pause-response times and compare each with the 250 ms target; do not substitute an average. |
| T3.4 | 1 | Record offline/different-working-directory and missing-decoration fallback checks with actual results. |
| T3.5 | 1 | Record an instruction-only readability/non-colour/no-audio check and code inspection for per-frame events, Clock.tick(60) and no blocking sleep. |

## E1 · Evaluation · 4 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| E1.1 | 1 | Judge every functional requirement as met/partly met/not met using actual evidence. |
| E1.2 | 1 | Judge every non-functional requirement using actual evidence or explicitly state it was untested. |
| E1.3 | 1 | Explain at least one discrepancy or limitation using a concrete observation. |
| E1.4 | 1 | Justify the overall evaluation against the common brief rather than extra features or artwork. |

## E2 · Evaluation · 3 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| E2.1 | 1 | Record a peer using the instructions without coaching. |
| E2.2 | 1 | Record a specific observed difficulty or successful acceptance observation. |
| E2.3 | 1 | Justify an implemented response or a reasoned decision not to change, with retest if changed. |

## E3 · Evaluation · 3 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| E3.1 | 1 | Reflect on a specific process/version/restore decision and its consequence. |
| E3.2 | 1 | Declare sources, assistance and assets with sufficient attribution to distinguish supplied and student work. |
| E3.3 | 1 | Prioritise one feasible improvement and explain why it comes first. |

## Adoption and limits

Resolve the synthetic calibration cases first, then independently mark actual frozen samples. Use candidate-adoption.csv and the release record; do not describe an AI/editor desk review as a second teacher’s sign-off. Testing marks reward the quality of actual evidence and reasoning, not an automatic all-or-nothing deduction when the product has a defect. Use the original contract/acceptance cases and note all untested FR/NFR. A04 exact syllabus mapping and A03 classroom timing remain pending.
