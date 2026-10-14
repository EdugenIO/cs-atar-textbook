# Unit 3 — Equipment-loan software project
Original classroom brief; synthetic data only. 12 supervised lessons: week 7 four, week 8 two, week 9 two, week 10 four. No extra project periods or core homework dependence.

## Problem and scope
A fictional media club needs same-session stock loans through a console interface. Known borrowers and catalogue are supplied. Core: show/search catalogue, issue uniquely identified loans, complete return once, show ordered outstanding records, retain session history and clear feedback. No future reservations, dates, partial return, login, GUI, database, concurrency or persistent storage. Explain that quitting loses changes. Optional extensions require agreed time and core completion first.

## Requirements and acceptance checks
- R1: Show a synthetic catalogue and available units. Check: Initial availability E01=2, E02=1, E03=3.
- R2: Find equipment by ID without rearranging the catalogue. Check: E01 found; E99 missing; catalogue order unchanged.
- R3: Issue a uniquely identified loan to a known borrower. Check: L001/B001/E01/quantity 1 succeeds; availability falls by 1.
- R4: Reject invalid or impossible requests without state change. Check: Unknown IDs, duplicate loan ID, invalid quantity and insufficient stock.
- R5: Return an active loan once and restore its stored quantity. Check: First return succeeds; repeated return fails without increasing stock.
- R6: Report active loans in ascending loan-ID order. Check: New report is ordered; retained history stays in issue order.
- R7: Use a common interface across purposeful equipment subclasses. Check: Mixed preparation report uses overridden methods.
- R8: Provide a repeatable console workflow with clear feedback. Check: Catalogue/search/issue/return/report/quit; bad menu/input recovers.
- R9: Provide evidence of testing, versions and evaluation. Check: Expected/actual logs, repairs, restore check and requirement evaluation.

## Contracts
IDs are non-empty trimmed strings, normalised uppercase for comparison. Catalogue and borrower IDs must be unique; loan IDs remain unique after return. Quantities are positive integers, excluding bool. Invalid input raises ValueError at the model boundary; well-formed but duplicate/unknown/insufficient-stock requests fail without mutation. Complete return uses recorded quantity and works once. Equipment stock satisfies 0<=on_loan<=total. All stock-changing operations go through the coordinator. Reports are snapshots; sorting them must not reorder history.

## Supplied student files
project_support.py supplies validated equipment classes and synthetic preparation messages. project_starter.py supplies interfaces/stubs; project_console_starter.py supplies a menu scaffold. fixture CSV files describe three equipment types and borrowers B001–B003. Keep files in one folder. python project_console_starter.py starts the scaffold, but unimplemented operations report NotImplementedError until completed. No package installs are needed.

## Evidence and milestones
Problem and stakeholder questions; R1–R9 evidence mapping; class/responsibility sketch and structure chart; data contracts; search/sort pseudocode and justification; schedule; code; expected/actual tests; repaired defects; useful versions and a restore check; individual demonstration; requirement evaluation and retrospective.
Milestones: week 7 design checkpoint; week 8 state transitions; week 9 integration/review; week 10 acceptance/refinement/demo/submission. Teacher finalises local conditions, authentication, rubric and contribution through the school's outline. This brief samples programming skills and does not certify full-unit coverage.
