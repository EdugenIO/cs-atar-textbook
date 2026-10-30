> Archived console practice. This is not the current Pygame Task 1. See https://edugenio.github.io/cs-atar-textbook/#unit3-project

# Unit 3 project — Project self-review and reference notes
Optional project self-review. The 12 suggested workshops fit weeks 7–10, but you can adapt the practice plan. No grade, annual weighting or submission is attached; the project does not certify full-unit coverage.

## Self-review questions
- Investigation: have you explained the problem, stakeholders and scope, with measurable requirements R1–R9?
- Design: can you explain responsibilities, classes, composition, data contracts, algorithms and a feasible schedule?
- Implementation: do lookup, valid and rejected issues, complete and repeated returns, reports and console recovery behave as required?
- Testing: do your expected/actual examples cover boundaries, rejected requests, duplicates, state invariants and the user workflow?
- Evaluation: which requirements work, what remains limited, and what would you improve? Explain your own design, versions, recovery check and sources.

Compare equivalent sound designs rather than matching method names to the reference. If one fault affects several results, fix that cause and retry. Note supplied code and any help you used so you can explain your own contribution.

## Reference files and checks
project_reference.py is a runnable model; project_console.py its interface; project_support.py shared classes. Run python project_console.py in their extracted folder. No dependencies or persistence. project_reference.py can also run deterministic issue/return demonstrations. Try the scaffold first, then consult the reference to explain differences.
Seed: Camera E01 total 2/charge 20; Projector E02 total 1/hours 999; Equipment E03 total 3. Borrowers B001–B003. L002/B001/E01/1 succeeds; L001/B002/E02/1 succeeds; L003/B003/E02/1 fails. Active report L001,L002; history L002,L001. Return L002 succeeds/available E01=2; repeat fails. Closed L002 cannot be reused.
The reference starts with unloaned items, normalises IDs and uses list-based linear searches, internal Loan records, copied reports and insertion sorting. It accesses underscore fields within the coordinated model; these are conventions, not enforced protection. Callers must route all stock mutations through the coordinator. No real borrower/date/authentication system, atomic persistence, concurrency or reload is claimed. The system is unsuitable for real operational loans without further design.
Review the problem, design, code, tests and evaluation, rather than judging interface decoration. Weeks 8/9 keep two explicit reliability/maintenance lessons each alongside workshops. Week 10 has four project lessons. Adapt this optional schedule to the time available.
