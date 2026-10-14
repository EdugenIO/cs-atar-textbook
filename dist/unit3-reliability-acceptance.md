# Original user acceptance scenarios — Unit 3
Use the supplied fictional fixture, a fresh session for each independent scenario. Operator and observer record actual feedback/state, requirement IDs, outcome and improvement. Model tests alone are not an interface acceptance trial.

A1 (R1/R2/R8): Show catalogue, find E01 and try E99. Expect Camera available 2, a clear missing result and recoverable menu. No catalogue reorder or new records.
A2 (R3/R4/R8): Issue L001/B001/E01/quantity 2; availability 0 and one active record. Try L002/B002/E01/quantity 1: rejected, stock/history unchanged. Try zero or non-numeric quantity: clear feedback and recovery, no mutation.
A3 (R5): Issue L001/B001/E01/quantity 2 in a fresh session, return L001, then return L001 again. First succeeds/availability 2; second is rejected and remains 2. User does not re-enter a return quantity.
A4 (R6): Issue L002/B001/E01/1 then L001/B002/E02/1. Outstanding report L001,L002; retained model history L002,L001. Return L002; only L001 remains active.
A5 (R7/R8): Catalogue preparation messages differ for Camera/Projector/generic Equipment through a shared method interface. Invalid menu choice recovers; quitting visibly explains session data loss. Restart is a fresh fixture, not reload.
A6 (R9): Demonstrate a new teacher-specified operation, explain an override/shared reference/algorithm choice, locate expected/actual repair evidence and run known behaviour from a restored source version.

Agree acceptance criteria in advance. Record partly met/unmet needs honestly. These are original formative scenarios, not a completed school sign-off or full syllabus audit.
