# Unit 3 project — Teacher rubric and reference notes
Original analytic draft, 40 marks. The planning outline proposes 20% annual contribution; confirm through the adopted school assessment outline. No claim of official SCSA endorsement or full-unit coverage. 12 workshops already embedded in weeks 7–10.

## Rubric (40)
- Investigation/requirements6: problem/stakeholder/scope2; measurable R1–R9 and acceptance links4.
- Design8: responsibilities/classes/composition3; data/mutation contracts2; algorithm pseudocode/justification2; feasible schedule1.
- Implementation12: catalogue/search2; valid/rejected issue consistency3; complete/repeated return3; report/history ordering2; console recovery and meaningful subclass use2.
- Testing8: expected/actual evidence and boundary sampling3; invariants/rejection/duplicate preservation2; defects and retests2; user acceptance evidence1.
- Evaluation/authentication6: requirement-based judgements2; limitations/improvements1; explain/demonstrate own design2; version/restore/source evidence1.
Award equivalent sound designs rather than exact spelling of reference methods. Avoid double-penalising one underlying fault; use school marking/authentication policy. Adjust scaffolding to student readiness and declare supplied code so it is not credited as student-authored implementation. Checkpoint feedback is formative within the project.

## Reference files and checks
project_reference.py is a runnable model; project_console.py its interface; project_support.py shared classes. Run python project_console.py in their extracted folder. No dependencies or persistence. project_reference.py can also run deterministic issue/return demonstrations. Keep teacher reference files out of student assessment copies.
Seed: Camera E01 total2/charge20; Projector E02 total1/hours999; Equipment E03 total3. Borrowers B001–B003. L002/B001/E01/1 succeeds; L001/B002/E02/1 succeeds; L003/B003/E02/1 fails. Active report L001,L002; history L002,L001. ReturnL002 succeeds/availableE01=2; repeat fails. Closed L002 cannot be reused.
The reference starts with unloaned items, normalises IDs and uses list-based linear searches, internal Loan records, copied reports and insertion sorting. It accesses underscore fields within the coordinated model; these are conventions, not enforced protection. Callers must route all stock mutations through the coordinator. No real borrower/date/authentication system, atomic persistence, concurrency or reload is claimed. The system is unsuitable for real operational loans without further design.
Assess investigation/design/code/tests/evaluation, not interface decoration. Weeks8/9 keep two explicit reliability/maintenance lessons each alongside workshops. Week10 has four project lessons. Project deadlines do not spill into the exam block.
