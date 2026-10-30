# Year 12 candidate marking interpretation

**NOT independently moderated or adopted.** Version A03-candidate-1, 30 October 2026. Raw 100; annual Task 1 weight remains 15%. Apply one agreed version to all five themes. Existing common guide remains authoritative until the school adopts an interpretation before issue. This candidate makes partial item credit explicit without changing category/item totals. No automatic grade boundaries.

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
| D1.1 | 1 | Design the four states and valid control transitions. |
| D1.2 | 1 | Design pause/resume time handling and complete restart/quit. |
| D1.3 | 1 | Identify the actor base-class responsibility and shared interface. |
| D1.4 | 1 | Identify Player and Hazard subclass responsibilities. |
| D1.5 | 1 | Specify actor attributes and independent instance state. |
| D1.6 | 1 | Specify the relevant overridden update method and shared contract. |
| D1.7 | 1 | Specify meaningful method parameters/results and object interactions. |
| D1.8 | 1 | Separate rule updates from drawing and file access in the design. |

## D2 · Design · 8 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| D2.1 | 1 | Represent two 8 × 10 maps as independent two-dimensional lists. |
| D2.2 | 1 | Specify tile codes 0–3 and exactly one start/exit per map. |
| D2.3 | 1 | Specify the dictionary keyed by item ID and its metadata. |
| D2.4 | 1 | Specify active-item records and IDs for the student search. |
| D2.5 | 1 | Specify the latest-ten-valid-score history list and duplicate preservation. |
| D2.6 | 1 | Define map and history text formats. |
| D2.7 | 1 | Specify invalid-map and malformed-history policies. |
| D2.8 | 1 | Document initial/reset values, meaningful constants and why the data design suits the common scope. |

## D3 · Design · 9 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| D3.1 | 1 | Give coherent pseudocode for once-only collection/scoring. |
| D3.2 | 1 | Desk-check repeated contact without a second score. |
| D3.3 | 1 | Desk-check first/last or only remaining item. |
| D3.4 | 1 | Give coherent completion/terminal-state pseudocode with loss first. |
| D3.5 | 1 | Desk-check zero time plus map completion. |
| D3.6 | 1 | Desk-check map transition carrying score/lives and refreshing the timer. |
| D3.7 | 1 | Specify and trace student linear search for a match and no match. |
| D3.8 | 1 | Specify and trace one taught sort including duplicate and empty/single-score cases. |
| D3.9 | 1 | Trace map validation or independent-map/reset behaviour. |

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
| C2.3 | 1 | Reject outer-boundary and wall moves on the supplied maps. |
| C2.4 | 1 | Run three predictable patrol hazards per map using the supplied fixtures. |
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
| C4.1 | 1 | Store the two supplied 8 × 10 maps as independent two-dimensional lists with the required tile representation. |
| C4.2 | 1 | Advance map 1 to map 2 with score/lives carried and a fresh 90-second timer, then finish after map 2. |
| C4.3 | 1 | Implement the actor base class with attributes/methods and shared movement/bounds responsibility. |
| C4.4 | 1 | Instantiate Player and Hazard subclasses with independent object state. |
| C4.5 | 1 | Override a relevant update method and call the shared interface with rules separated from drawing. |
| C4.6 | 1 | Use the item-ID dictionary to retrieve the corresponding metadata. |
| C4.7 | 1 | Student-written linear search locates a matching item ID in the active list. |
| C4.8 | 1 | The search returns the documented no-match outcome without accidental mutation. |
| C4.9 | 1 | A student-written taught bubble/insertion/selection sort orders the score list correctly and preserves duplicates. |
| C4.10 | 1 | The results report selects at most the latest ten valid history scores and displays them in the required order; assess student authorship of the sort separately at C4.9. |

## C5 · Implementation · 5 marks

| Point | Marks | Candidate observable evidence |
|---|---:|---|
| C5.1 | 1 | Validate map dimensions, tile codes and exactly one start/exit; reject invalid map data with a useful error. |
| C5.2 | 1 | Read integer history scores 0–100 and skip malformed/out-of-range lines with a warning. |
| C5.3 | 1 | Missing/empty history is handled under the documented usable policy. |
| C5.4 | 1 | Append one final game score, not a separate score at map 1 transition or on every result frame. |
| C5.5 | 1 | A failed write reports failure truthfully without terminating usable gameplay. |

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
