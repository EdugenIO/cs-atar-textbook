# Unit 3 Week 1 — diagnostic answers and repair checkpoints

16 marks, two per item; accept equivalent correct reasoning. Do not turn this diagnostic into a mastery grade. Use item-level evidence to choose practice.

D1: integer 5 (1); "5.0" is not a valid integer string for int and raises ValueError (1).
D2: two, 5 and 8 (1); strict > excludes 5 and leaves one (1).
D3: counts 0,1,1,2 after the four iterations (1); final 2 (1).
D4: outputs 11 then 10 (1); local parameter and returned value do not reassign the outside count binding (1).
D5: last generated index is len(values), out of range (1); use range(len(values)), or iterate directly over values (1).
D6: 0 is falsey but valid (1); reject only `value is None` (1).
D7: w creates/truncates; a appends at the end, creating if absent (1); verify path and preserve a suitable backup before overwriting important existing work (1).
D8: [] minimum 5 → 0 (1); [4,5,6] minimum 5 → 2 (1). Accept another precise empty/boundary example.

## Repair/transfer
count_at_least([3,5,0,8],5)→2; []→0; [4,5,6],5→2; [5,5],5→2; [0],0→1. Duplicates represent separate observations. Inputs to this function are assumed non-negative integers; text/range validation happens at the input boundary. Parser: "0" accepted 0; "-1", "five", "5.0", "" rejected as None; surrounding whitespace on " 5 " is accepted by int.

Keep conversion/range checks separate from counting; distinguish ValueError from IndexError and a boundary logic error. Show actual/expected outputs and explain the correction. A return supplies a result; print displays information. Do not change an input list to hide an error.

## Development/maintenance
Linear development progresses through planned stages; it suits stable requirements but late changes can be costly. Iterative development revisits/refines through feedback; it supports uncertain needs but requires priorities/version/evaluation discipline. Neither means skipping requirements or testing. Apply both to the count requirement, then change the threshold rule and document consequences.

Version history records useful states and why they changed. A backup provides a recoverable copy in another suitable location; same-disk snapshots alone do not protect against loss of that disk. Restore into a separate practice folder and rerun known checks rather than overwrite current work. Record known-good version, date, change, tests and restore evidence.

Teacher checkpoint: inspect the student's trace, independent implementation, empty/boundary/invalid-input results, change record and restored-copy result. Require a fresh threshold example and explain one remaining assumption. Week 2 adds richer structures/parameter behaviour; this chapter does not cover all Unit 3 programming.
