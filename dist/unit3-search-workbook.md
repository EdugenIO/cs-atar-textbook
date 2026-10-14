# Unit 3 week 3 — Searching workbook
Four lessons; use synthetic integer IDs. Predict before executing.

## A — Linear search and contracts
For [101,104,108,112,117,123,130], trace searches for 101, 117 and 999. Record index/value/match/result. Define not-found and duplicate behaviour. Explain why if result fails at index 0. Write pseudocode with explicit loop endpoints.

## B — Binary search
Trace 117 and 119 using low/high/mid/value/action columns. Explain the sorted-order precondition and remaining-interval invariant. Repair low < high and low = mid faults. Use [3,1,2] and target 3 to demonstrate invalid input; explain why a violated precondition differs from a failed valid-input test.

## C — Implementation and test evidence
Implement starter stubs. Test empty, singleton hit/miss, first/last, absent below/between/above and duplicate cases. Require first occurrence for linear and any matching occurrence for binary. Confirm no input mutation. Record expected and actual results and repair evidence.

## D — Growth investigation and transfer
Add item-probe counters. Search lists range(n) for absent target n at n=8,16,32,1024. Predict counts and graph or tabulate results. Distinguish probes from individual comparisons and seconds. Give worst-case time/extra-space bounds and a best-case example for each algorithm. Choose for one lookup in unsorted data and repeated lookups in sorted data, including preparation and original-index costs.
Exit ticket: explain why high = mid - 1 and low = mid + 1 ensure progress.
