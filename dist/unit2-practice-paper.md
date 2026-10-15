# Unit 2 original practice paper

Sixteen original optional practice questions with separate explained answers. This is a classroom learning resource, not an official SCSA paper. Suggested attempt time 80 minutes, or Q1–8 and Q9–16 in separate 40-minute sessions. Adapt the suggested timing to your learning needs. No solutions are embedded here.

Use untouched database-project.sqlite: Borrower(BorrowerID,BorrowerLabel); Category(CategoryID,CategoryName); Equipment(EquipmentID,EquipmentDescription,CategoryID,ReplacementCost); Loan(LoanID,BorrowerID,EquipmentID,DueDate,Returned). Returned is 0/1; dates are supplied valid YYYY-MM-DD text. Reporting date 8 April 2026. Each question starts from the original data, not changes from earlier questions.

Baseline loans:
| LoanID | BorrowerID | EquipmentID | DueDate | Returned |
|---|---|---|---|---|
| L001 | B001 | E01 | 2026-04-06 | 0 |
| L002 | B002 | E02 | 2026-04-08 | 0 |
| L003 | B001 | E03 | 2026-04-07 | 1 |
| L004 | B003 | E04 | 2026-04-10 | 0 |
| L005 | B002 | E02 | 2026-04-04 | 1 |
| L006 | B004 | E05 | 2026-04-07 | 0 |

Equipment estimates: E01=600, E02=80, E03=150, E04=450, E05=120 (fictional whole dollars). Borrowers B001–B004 have labels Learner A–D. Use the six-table conceptual extension SVG for Q4; its Supplier/Inspection tables are not in the SQLite starter.

## Q1 — Data quality

A valid date conflicts with the signed desk record, an unverified email changes a borrower label, an old status is used as current, and an unusually high cost appears. Give a distinct check/action for each.

## Q2 — Managed information

Explain data versus information using the fixed-date overdue report; distinguish database from RDBMS; explain one useful data-independence example; state one limit of that independence.

## Q3 — Keys and event history

Explain why LoanID fits history, why EquipmentDescription does not identify items, why BorrowerID can repeat in Loan and why (BorrowerID, EquipmentID) alone is insufficient for repeated events.

## Q4 — Reading the six-table model

Using unit2-six-table-model.svg: identify Loan’s PK and FKs; state Supplier–Equipment participation in both directions; state Inspection–Equipment participation; trace a loan to its category without joining descriptions.

## Q5 — Normalisation transfer

A club register contains MemberID, MemberLabel, ActivityID, ActivityName, LeaderID, LeaderLabel, Term, AttendanceCount. Rules: MemberID determines label; ActivityID determines name/leader; LeaderID determines label; one member/activity/term participation determines attendance. Write four 3NF relations with keys/references.

## Q6 — Overdue query

Write SQL returning LoanID, BorrowerID, DueDate for unreturned loans due strictly before 8 April 2026, sorted by date then LoanID. Use Returned integer 0/1. State the two matching LoanIDs.

## Q7 — Readable joined report

Write SQL returning LoanID and BorrowerLabel for active loans using an inner join, sorted by LoanID. State the four resulting LoanIDs and explain the join condition.

## Q8 — Inventory summary

Write a query using COUNT, SUM, AVG, MIN and MAX on ReplacementCost in Equipment. State the five expected results. Explain why summing cost across loan history differs.

## Q9 — Controlled changes

Write an INSERT for unused B005/Learner E, an UPDATE marking only L001 returned and a DELETE of unused B005. Explain one before/after target check. Assume valid references and the original starter.

## Q10 — Constraints and recovery

Explain duplicate B001 rejection, a Loan referencing missing B999, Returned=2 and how ROLLBACK affects changes made after BEGIN but before COMMIT. Assume FK enforcement is enabled.

## Q11 — Threat mechanisms

Distinguish SQL injection from XSS (two points) and virus from worm (two points), referring to what interprets/spreads the unwanted code.

## Q12 — Incident and controls

Ransomware makes the desk database unreadable; no evidence of theft is available. Identify a known CIA impact, qualify the confidentiality conclusion, propose a matching recovery measure and state one limit.

## Q13 — AAA analysis

An unapproved change occurs while everyone uses a shared login; there is no protected change log. Explain authentication, authorisation and accounting in this context, and give one justified improvement.

## Q14 — Access and encryption

Explain why password+PIN is not two-factor; give a different-category example; distinguish symmetric encryption keys from the public/private pair; state the recipient-key roles for confidentiality.

## Q15 — Cipher application

Using A=0, uppercase letters only and forward shifts: encrypt LOAN with rotation 3 and decrypt ORDQ; encrypt DATA using Vigenère KEY repeated as KEYK and show the shifts. State one weakness of historical substitution ciphers.

## Q16 — Privacy and testing authority

Explain why removing names from a real export may not de-identify it; identify a less intrusive public demonstration; explain why peer permission does not authorise testing the production portal; state the response to an out-of-scope finding.

