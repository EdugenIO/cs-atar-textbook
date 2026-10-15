# Year 11 Task 1: Python experiments: queue simulator

2027 planning draft · Draft project brief. Original content CC BY 4.0; example code MIT. Public planning material, not a secure school-issued assessment.

Model a fictional service desk and compare two staffing configurations. Assess software quality rather than scientific sophistication.

## Placement

- Type: Project
- Course weight: 20% (one alternative in this slot)
- Proposed local timing: S1 W8–10: 10 existing project lessons; design W8, build W9, final W10.
- Content family: Unit 1: modular software development, data/control structures, testing and evaluation

## Scope and required evidence

- Represent queue lengths over discrete ticks in a one-dimensional list. Supply arrivals and service capacity as validated inputs.
- Write functions for one simulation step, a complete run and a summary. Queue length cannot fall below zero.
- Use deterministic input sequences for tests, then compare configurations and state the model’s assumptions. Save results as text.

## Delivery routes

- Console or text interface: assess the same logic and evidence.
- Desktop interface: optional Pygame for games/simulations, or a school-approved GUI for tools.
- Local browser interface: optional only if already taught; keep the Python/SQL core assessable.

## Resources and setup

- Python 3 with standard library only; no headset or internet required.
- Included arrivals.csv, queue-logic.py stubs and manual expected cases.
- Optional Pygame graph comes after the tested console model.

## Initial acceptance checks / paper review

- Step rule: next queue = max(0, queue + arrivals - capacity).
- Start 0, arrivals [2,0,3], capacity 1: queue trace [1,0,2].
- No arrivals yields zero queue; negative arrivals/capacity must be rejected.

## Submission and criteria

Submit your requirements/schedule, design, code or database, synthetic data, expected/actual test records, source/assistance log and evaluation. Use student-workbook.md and test-record.csv. Checkpoints belong to this project.

Suggested raw marks: investigation 15, design 25, implementation 35, testing 15, evaluation 10, total 100. The teacher must translate these categories into task-specific observable marking points and publish the final guide. Hardware/visual polish earns no separate marks.

## Conditions to finalise before issue

Teacher sets issue/due dates, permitted references/AI/assistance, supervised-work arrangements, individual-authorship evidence, approved adjustments and the item-level key. Record milestones and use an explanation or small change demonstration to authenticate the same task. Fresh controlled tests and exam keys must be developed privately. Public practice answers cannot establish assessment security.

This option does not add to the eight-task outline. A learner completes the selected alternative or an explicitly moderated equivalent. Refer to teacher-release-checklist.md and coverage-and-release.md before use.
