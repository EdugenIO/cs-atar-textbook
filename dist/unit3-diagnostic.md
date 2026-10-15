# Unit 3 Week 1 — independent diagnostic

Eight optional questions. Allow around 20 minutes if useful before running code or viewing answers. Record confidence separately from correctness; use difficulties to choose practice.

## D1: conversion and validity
What value/type does int("5") produce? Why does int("5.0") not produce the same result?

## D2: boundary
For values [3, 5, 0, 8], predict how many satisfy value >= 5. Explain why value > 5 changes the result.

## D3: loop trace
Trace count=0; for value in [3,5,0,8]: if value>=5: count+=1. Record count after each iteration and the final value.

## D4: function return/scope
Predict output and explain:
```python
count = 10
def add_one(count):
    return count + 1
print(add_one(count))
print(count)
```

## D5: errors
Why does indexing values[i] inside range(len(values)+1) fail for a non-empty list? What change visits each valid index once?

## D6: input decision
A parser returns either a non-negative integer or None. Why is `if not value:` inappropriate for rejecting input? Give the intended condition.

## D7: file modes
Distinguish opening a text file with "w" and "a". State one safe check before using "w" on an existing work file.

## D8: test selection
Give an empty-list test and a threshold-boundary test for counting values at least a minimum. State expected counts.
