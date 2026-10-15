# Rebuilding Python fluency — Week 1 workbook

Requirements: count observations at least a supplied minimum, including equality and duplicates; empty list returns 0. Counting inputs are non-negative integers. Parse input text as an integer; reject invalid integer text and negatives by returning None. Zero is valid. No extra packages.

1. Attempt unit3-diagnostic.md independently, then identify two gaps using its separate answer file.
2. Trace the count for [3,5,0,8] and minimum 5. Write pseudocode with explicit initialisation and loop end; desk-check before implementing.
3. Implement unit3-fluency-starter.py. Use separate parsing/counting functions and a clear mainline. Record tests: ordinary values, [], [4,5,6]/5, [5,5]/5, [0]/0; invalid/negative/zero input text. Record expected before actual.
4. Diagnose these two separate faults: value > minimum misses equality; range(len(values)+1) indices outside the list. Correct one at a time and retest.
5. Explain why `value is None` distinguishes invalid input from accepted zero. Test text "5.0", "five", "-1", "0" and " 5 ".
6. Transfer: change requirement to strictly greater than minimum. State changed condition/expected boundary output; preserve the previous version and retest. Do not replace the original at-least solution without recording the requirement change.
7. Compare linear versus iterative development for stable requirements versus an organiser still deciding what the report should show. Give one benefit/limit of each. Apply investigate/design/develop/evaluate to this small task.
8. Save two named known-good versions, a change record and a separate suitable backup. Restore a selected version into a separate practice folder and rerun its known tests. State which version and requirement were restored.
9. Complete unit3-repair-log.csv; name evidence, correction, test and next action. Avoid unsupported 'I know it now' claims.

Four lessons: independent diagnostic/trace; targeted repair; development comparison and transfer; version/restore evidence and exit check. This is a warm-up, not another major project. Use synthetic observations; revisit input/files/functions chapters if necessary.
