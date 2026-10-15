# Unit 3 week 3 — Searching workbook
Four lessons; use synthetic integer IDs. Predict before executing.

## A — Linear search and contracts
For [101,104,108,112,117,123,130], trace searches for 101, 117 and 999. Record index/value/match/result. Define not-found and duplicate behaviour. Explain why if result fails at index 0. Write pseudocode with explicit loop endpoints.

## B — Binary search
Use the ascending list [101, 104, 108, 112, 117, 123, 130]. First write its indexes 0–6 separately from its stored values.

1. Start with low = 0 and high = 6. Both endpoint indexes are candidates.
2. Calculate mid = (low + high) // 2. Integer division floors the result: bounds 0 and 5 give index 2. Read the value at that index before comparing it with the target.
3. Trace target 117, then target 119, using low/high/mid/value/action columns. Record bounds before each probe.
4. Explain why low == high still leaves one candidate. End only when low > high.
5. Explain why an unsuccessful probe excludes mid using +1 or −1. Repair the low < high and low = mid faults.

The precondition is ascending order under the searched key. The invariant is that a target still present must be inside the remaining interval. Use [3, 1, 2] with target 3 to show what can happen when the ordering precondition is broken; this is not a valid-input correctness test.

Check empty input (high starts at −1), a one-item match and miss, and [2, 2, 2]. The binary routine may return any matching duplicate index, whereas linear search returns the first. None means absent; index 0 is a successful match, so test result is not None rather than if result.

## C — Implementation and test evidence
Implement starter stubs. Test empty, singleton hit/miss, first/last, absent below/between/above and duplicate cases. Require first occurrence for linear and any matching occurrence for binary. Confirm no input mutation. Record expected and actual results and repair evidence.

## D — Growth investigation and transfer
Add item-probe counters. Search lists range(n) for absent target n at n=8,16,32,1024. Predict counts and graph or tabulate results. Distinguish probes from individual comparisons and seconds. Give worst-case time/extra-space bounds and a best-case example for each algorithm. Choose for one lookup in unsorted data and repeated lookups in sorted data, including preparation and original-index costs.
Exit ticket: explain why high = mid - 1 and low = mid + 1 ensure progress.
