# Unit 3 Week 1 — independent diagnostic

16 marks, eight questions × two marks. Suggested 20 minutes before running code or viewing answers. Formative diagnosis, not a weighted assessment or grade threshold. Record confidence separately from correctness.

## D1 (2 marks): conversion and validity
What value/type does int("5") produce? Why does int("5.0") not produce the same result?

## D2 (2 marks): boundary
For values [3, 5, 0, 8], predict how many satisfy value >= 5. Explain why value > 5 changes the result.

## D3 (2 marks): loop trace
Trace count=0; for value in [3,5,0,8]: if value>=5: count+=1. Record count after each iteration and the final value.

## D4 (2 marks): function return/scope
Predict output and explain:
```python
count = 10
def add_one(count):
    return count + 1
print(add_one(count))
print(count)
```

## D5 (2 marks): errors
Why does indexing values[i] inside range(len(values)+1) fail for a non-empty list? What change visits each valid index once?

## D6 (2 marks): input decision
A parser returns either a non-negative integer or None. Why is `if not value:` inappropriate for rejecting input? Give the intended condition.

## D7 (2 marks): file modes
Distinguish opening a text file with "w" and "a". State one safe check before using "w" on an existing work file.

## D8 (2 marks): test selection
Give an empty-list test and a threshold-boundary test for counting values at least a minimum. State expected counts.
