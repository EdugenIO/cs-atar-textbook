# Unit 3 week 3 — Explained answers
A: linear 101 => index 0/1 probe; 117 => index 4/5 probes; 999 => None/7 probes. Use result is not None. Linear returns first duplicate occurrence.
B: For target 117, write each row as (low, high, mid, value):
- (0, 6, 3, 112): 117 is larger, so low becomes 4.
- (4, 6, 5, 123): 117 is smaller, so high becomes 4.
- (4, 4, 4, 117): equality succeeds; return index 4.

The middle number is an index, not the target value. Compute it with integer division: (low + high) // 2. For target 119, the third probe still reads 117. Set low to 5; high stays 4. The empty interval means return None.

Include low == high because one candidate remains. Exclude a tested middle index with +1 or −1 so the interval shrinks. The discarded side cannot contain the target only because the values are ordered under the same search comparison. Unsorted [3, 1, 2] with target 3 gives None for this binary search and 0 for linear search: that demonstrates a broken precondition, not a failure on valid input.

C: [] => None; [5]/5=>0, [5]/4=>None. First index must be accepted. For [2,2,2], linear 0 and this binary 1 are both contract-correct. Input remains unchanged. Compare actual results against the stated duplicate policy.
D: absent target n yields linear 8,16,32,1024 probes; binary 4,5,6,11. Worst-case time O(n)/O(log n); iterative extra space O(1)/O(1); best-case O(1) for each. A probe can include two comparisons. Sorting or verifying order has a separate cost; sorted indexes are not original indexes. Short one-off unsorted lookup generally favours linear; repeated sorted-data searches favour binary, subject to requirements. This is optional, ungraded practice.
