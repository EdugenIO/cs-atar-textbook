# Unit 3 project — Teacher rubric and reference notes
Original analytic draft, 40 marks. The planning outline proposes 20% annual contribution; confirm through the adopted school assessment outline. No claim of official SCSA endorsement or full-unit coverage. 12 workshops already embedded in weeks 7–10.

## Rubric (40)
- Investigation/requirements 6: problem/stakeholder/scope 2; measurable R1–R9 and acceptance links 4.
- Design 8: responsibilities/classes/composition 3; data/mutation contracts 2; algorithm pseudocode/justification 2; feasible schedule 1.
- Implementation 12: catalogue/search 2; valid/rejected issue consistency 3; complete/repeated return 3; report/history ordering 2; console recovery and meaningful subclass use 2.
- Testing 8: expected/actual evidence and boundary sampling 3; invariants/rejection/duplicate preservation 2; defects and retests 2; user acceptance evidence 1.
- Evaluation/authentication 6: requirement-based judgements 2; limitations/improvements 1; explain/demonstrate own design 2; version/restore/source evidence 1.
Award equivalent sound designs rather than exact spelling of reference methods. Avoid double-penalising one underlying fault; use school marking/authentication policy. Adjust scaffolding to student readiness and declare supplied code so it is not credited as student-authored implementation. Checkpoint feedback is formative within the project.

## Reference files and checks
project_reference.py is a runnable model; project_console.py its interface; project_support.py shared classes. Run python project_console.py in their extracted folder. No dependencies or persistence. project_reference.py can also run deterministic issue/return demonstrations. Keep teacher reference files out of student assessment copies.
Seed: Camera E01 total 2/charge 20; Projector E02 total 1/hours 999; Equipment E03 total 3. Borrowers B001–B003. L002/B001/E01/1 succeeds; L001/B002/E02/1 succeeds; L003/B003/E02/1 fails. Active report L001,L002; history L002,L001. Return L002 succeeds/available E01=2; repeat fails. Closed L002 cannot be reused.
The reference starts with unloaned items, normalises IDs and uses list-based linear searches, internal Loan records, copied reports and insertion sorting. It accesses underscore fields within the coordinated model; these are conventions, not enforced protection. Callers must route all stock mutations through the coordinator. No real borrower/date/authentication system, atomic persistence, concurrency or reload is claimed. The system is unsuitable for real operational loans without further design.
Assess investigation/design/code/tests/evaluation, not interface decoration. Weeks 8/9 keep two explicit reliability/maintenance lessons each alongside workshops. Week 10 has four project lessons. Project deadlines do not spill into the exam block.
