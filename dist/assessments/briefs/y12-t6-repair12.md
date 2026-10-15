# Year 12 Task 6: Repair and parts service

2027 planning draft · Draft project brief. Original content CC BY 4.0; example code MIT. Public planning material, not a secure school-issued assessment.

Integrate a repair queue, technician assignments and parts inventory.

## Placement

- Type: Project
- Course weight: 25% (one alternative in this slot)
- Proposed local timing: S2 W5–10: 16 existing workshops after four foundation lessons in W4.
- Content family: Unit 4: relational design, Python/SQL integration, integrity, transactions and evaluation

## Scope and required evidence

- Model CustomerAlias, Device, RepairJob, Part and JobPart as at least five related entities.
- Implement Python workflows and SQL reports for open jobs, part usage and grouped totals.
- Demonstrate referential/domain constraints, a stock/job transaction and a tested backup/restore procedure.

## Delivery routes

- Python console interface using SQL: the baseline integrated solution.
- Optional Python desktop GUI using the same database core.
- Optional Python-backed local browser interface if already taught; retain the same SQL evidence.

## Resources and setup

- Python and SQLite with synthetic job/stock data.
- Teacher supplies stock rules and report requirements.
- No actual customer devices, passwords or private customer data.

## Initial acceptance checks / paper review

- A job with no parts stays visible in the defined operational report.
- Insufficient stock rejects the transaction consistently.
- A failed stock update does not leave an incorrect job total.

## Submission and criteria

Submit your requirements/schedule, design, code or database, synthetic data, expected/actual test records, source/assistance log and evaluation. Use student-workbook.md and test-record.csv. Checkpoints belong to this project.

Suggested raw marks: investigation 15, design 25, implementation 35, testing 15, evaluation 10, total 100. The teacher must translate these categories into task-specific observable marking points and publish the final guide. Hardware/visual polish earns no separate marks.

## Conditions to finalise before issue

Teacher sets issue/due dates, permitted references/AI/assistance, supervised-work arrangements, individual-authorship evidence, approved adjustments and the item-level key. Record milestones and use an explanation or small change demonstration to authenticate the same task. Fresh controlled tests and exam keys must be developed privately. Public practice answers cannot establish assessment security.

This option does not add to the eight-task outline. A learner completes the selected alternative or an explicitly moderated equivalent. Refer to teacher-release-checklist.md and coverage-and-release.md before use.
