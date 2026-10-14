# Unit 3 week 5 — Objects and classes workbook
Four lessons; synthetic stock only, no real borrower records.

## A — Design and instantiate
Identify class/instance/attribute/method in Equipment. Draw a state-and-responsibility table. State 0<=on_loan<=total. Create a two-unit camera and a one-unit tripod. Explain __init__, self and the distinction between local total and self._total. Predict the worked example before running it.

## B — Methods and contract tests
Implement starter stubs. Validate non-empty ID/name and non-negative integer total. Reject booleans/non-integers. Queries do not mutate; quantities are positive integers. Invalid input raises ValueError; valid excessive requests return False without mutation. Test zero stock, exactly all stock, excessive lend, valid return, over-return, repeated return, zero/negative/text/bool quantity. Record before/result/after and expected/actual.

## C — Encapsulation and refactoring
Explain why _on_loan is a convention, not access control. Test separate instances and alias=first. Reproduce shared events with BadLog, then repair using GoodLog. Refactor the procedural stock example, retaining its behaviour and test cases. Explain which responsibility moved into the class and what remains in the interface/catalogue.

## D — Search and reporting
Store two Equipment objects in a list with unique IDs. Implement find_equipment returning the matching object or None. Implement availability_report returning a list of dictionaries. Test missing ID and empty catalogue. Lend through a found object; explain the catalogue change. Compare an earlier report with a newly generated report to explain a value snapshot. The class does not enforce catalogue-wide uniqueness: state where that rule belongs.
Exit ticket: explain one query, one command and one instance-state test. Save code, test evidence and a short design evaluation.
