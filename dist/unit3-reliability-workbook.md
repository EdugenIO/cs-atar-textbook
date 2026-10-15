# Unit 3 weeks 8–9 — Reliability workbook
Draft dated 14 October 2026. Four explicit lessons: two per week, plus existing project workshops separately.

## A — Test design and fault isolation (week 8 lesson 1)
Map a normal, boundary and rejected case to R3–R5. Write expected result/state before execution. Distinguish Equipment unit checks from real-object coordinator integration checks. Read the worked unittest example; adapt fixtures/imports to your own design. Reproduce the isolated return fault with python fault_probe.py -v; its two tests intentionally fail before repair. Trace active/available/quantity, state a hypothesis, repair the guard and retest without weakening expectations. Demonstrate a trace table or breakpoint/temporary-print investigation. Explain syntax/runtime/logic differences.

## B — Acceptance and workload (week 8 lesson 2)
Use acceptance scenarios through the console, noting user task and expected feedback separately from component assertions. Run reliability_load.py at 100 and 1000 records with three report repeats. Record machine/Python/source version, counts, mix, repeats, correctness and timing. Optional --csv creates a new synthetic file and checks read/write row count/bytes/times; it is not persistence in the project. Agree any performance limit before claiming acceptance. Discuss large files, record volumes and representative transaction types. Explain sequential versus concurrent scope and observed time versus Big O.

## C — Review and maintenance (week 9 lesson 1)
Review a repeat-return or report-order change. Name trigger, requirement, incorrect behaviour, proposed fix and tests. Retest the correction and run relevant regression cases. Record changes/version/evidence. Restore a saved version and check known behaviour; explain version history versus separate backup. Update R9 evidence and unresolved limits.

## D — Responsibilities (week 9 lesson 2)
Choose two chapter scenarios, including one effect on users and one source/authorship or quality-feedback issue. Identify stakeholders, risk/benefit, evidence and developer response. Explain why attribution alone is not permission and why a private prototype is not a real operational loan record. Give a maintenance decision with scope/testing consequences.
Keep a local practice record and use feedback to choose your next attempt. Week 8/9 lessons 3–4 remain project workshops.
