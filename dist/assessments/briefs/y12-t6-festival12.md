# Year 12 Task 6: Festival operations platform

2027 planning draft · Draft project brief. Original content CC BY 4.0; example code MIT. Public planning material, not a secure school-issued assessment.

Build integrated booking and reporting software for a fictional festival.

## Placement

- Type: Project
- Course weight: 25% (one alternative in this slot)
- Proposed local timing: S2 W5–10: 16 existing workshops after four foundation lessons in W4.
- Content family: Unit 4: relational design, Python/SQL integration, integrity, transactions and evaluation

## Scope and required evidence

- Design ParticipantAlias, Venue, Session, Booking and TicketType entities, with justified integrity constraints.
- Implement a Python interface, parameterised SQL and joined/grouped operational reports.
- Provide evidence for transaction failure, imported-data checks, recovery and access decisions.

## Delivery routes

- Python console interface using SQL: the baseline integrated solution.
- Optional Python desktop GUI using the same database core.
- Optional Python-backed local browser interface if already taught; retain the same SQL evidence.

## Resources and setup

- Python sqlite3, SQLite and synthetic data files.
- No real payment or attendee data, and no live payment service.
- Common normalisation, report-specification and recovery templates.

## Initial acceptance checks / paper review

- Unknown foreign keys fail.
- Booking totals and calculated revenue match a hand-computed fixture.
- Simulated transaction failure restores the previous consistent state.

## Submission and criteria

Submit your requirements/schedule, design, code or database, synthetic data, expected/actual test records, source/assistance log and evaluation. Use student-workbook.md and test-record.csv. Checkpoints belong to this project.

Suggested raw marks: investigation 15, design 25, implementation 35, testing 15, evaluation 10, total 100. The teacher must translate these categories into task-specific observable marking points and publish the final guide. Hardware/visual polish earns no separate marks.

## Conditions to finalise before issue

Teacher sets issue/due dates, permitted references/AI/assistance, supervised-work arrangements, individual-authorship evidence, approved adjustments and the item-level key. Record milestones and use an explanation or small change demonstration to authenticate the same task. Fresh controlled tests and exam keys must be developed privately. Public practice answers cannot establish assessment security.

This option does not add to the eight-task outline. A learner completes the selected alternative or an explicitly moderated equivalent. Refer to teacher-release-checklist.md and coverage-and-release.md before use.
