# Unit 3 week 4 — Sorting workbook
Four lessons. Synthetic integer lists; predict before executing.

## A — Bubble
Trace [5,2,4,1] using pass/end/index/compared values/swap/list columns. Mark the fixed suffix after each pass. Implement bubble_sort; reset the flag per pass. Explain why an already sorted list stops after one full pass. Count key comparisons only.

## B — Insertion
Trace the same input using index/key/position/compared value/shift/list columns. Mark the sorted prefix after each insertion. Explain the saved key and boundary check. Implement insertion_sort and test sorted versus reverse data. Distinguish a shift from a swap.

## C — Selection and correctness
Trace start/smallest/index/decision/list. Swap after the scan, not at every new minimum. Implement selection_sort. Test [], [7], [1,2,3], [3,2,1], [2,1,2], [4,4,4] and [-1,3,-2]. Check both order and duplicate preservation. State mutation and return-value contracts. Explain why assigning the returned count to the list name is a mistake.

## D — Compare and transfer
For n=8,16,32, create ascending and descending lists of distinct integers. Give each sort a fresh copy. Record expected/actual key comparisons, correctness and explanation. State best/worst time and extra-space bounds, including caller-copy cost separately. Use labelled keys [(2,A),(2,B),(1,C)] to explain stability. Choose for a small nearly sorted list and a scenario where few swaps matter. Sort IDs then apply the previous chapter's binary search; explain index changes and total preparation cost.
Exit ticket: one invariant for each algorithm and one test that detects dropped duplicates.
