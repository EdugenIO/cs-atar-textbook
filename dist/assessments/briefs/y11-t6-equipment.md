# Year 11 Task 6: Equipment loans database

2027 planning draft · Draft project brief. Original content CC BY 4.0; example code MIT. Public planning material, not a secure school-issued assessment.

Design a community equipment desk using invented borrowers and equipment.

## Placement

- Type: Project
- Course weight: 20% (one alternative in this slot)
- Proposed local timing: S2 W7–12: 14 existing workshops, including design, build, testing and demonstration.
- Content family: Unit 2: relational design, normalisation, SQL, integrity, evaluation and responsible data

## Scope and required evidence

- Design Borrower, Category, Equipment and Loan entities, including repeat loans and optional return dates.
- Explain the normalisation decisions, document keys/domains and create the relational database.
- Implement joined loan reports, aggregate inventory reports and safe insert/update/delete operations. Test constraints and recovery.

## Delivery routes

- SQL workspace and documented workflows: a complete RDBMS solution is the baseline.
- Optional Python console interface using SQL, if already taught.
- Optional approved desktop or local browser interface with the same database evidence.

## Resources and setup

- SQLite or school-approved RDBMS; DB Browser for SQLite is optional.
- Included flat source CSV, relationship prompt and SQL TODO file.
- Existing unit 2 workbook provides practice, not a private marking key.

## Initial acceptance checks / paper review

- Borrower B01 and equipment E01 can have repeated loans with different loan IDs.
- A loan referring to missing equipment is rejected when foreign keys are enabled.
- Returned loans disappear from the active-loans report, while history remains.

## Submission and criteria

Submit your requirements/schedule, design, code or database, synthetic data, expected/actual test records, source/assistance log and evaluation. Use student-workbook.md and test-record.csv. Checkpoints belong to this project.

Suggested raw marks: investigation 15, design 25, implementation 35, testing 15, evaluation 10, total 100. The teacher must translate these categories into task-specific observable marking points and publish the final guide. Hardware/visual polish earns no separate marks.

## Conditions to finalise before issue

Teacher sets issue/due dates, permitted references/AI/assistance, supervised-work arrangements, individual-authorship evidence, approved adjustments and the item-level key. Record milestones and use an explanation or small change demonstration to authenticate the same task. Fresh controlled tests and exam keys must be developed privately. Public practice answers cannot establish assessment security.

This option does not add to the eight-task outline. A learner completes the selected alternative or an explicitly moderated equivalent. Refer to teacher-release-checklist.md and coverage-and-release.md before use.
