# Loops: reinforcement and extension bank

Year 11 · Unit 1 · Optional formative practice · 2027 teaching draft

Choose an activity to match taught prerequisites. Suggested times are untrialled planning estimates, not additions to the scheduled lesson. Record answers in your exercise book or local code file. Paper traces support reasoning; computer execution needs a later check.

## Be the computer

Reinforcement · 5–8 minutes · Paired tracing and explanation

Prerequisites: Assignment, indentation and range with an excluded stop.

Goal: Explain how each iteration changes an accumulator.

Predict the output without running the program. In pairs, one student reads an instruction while the other updates a paper trace. Swap roles and trace again with a stop value of 5.

```python
total = 0
for value in range(1, 4):
    total = total + value * 3
print(total)
```

1. Use columns: value, total before, amount added, total after.
2. Explain which instructions run once and which repeat.
3. Work alone: change the multiplier to 2 and predict the original three-round output before checking.


---

## Put the program in order

Reinforcement · 5–10 minutes · Code ordering with individual justification

Prerequisites: A counted loop and a running total; no lists required.

Goal: Place initialisation, repeated updates and output correctly.

These four lines are scrambled. Reorder them and add indentation to calculate the sum of 1 through 4. You may move lines and change indentation, but do not change expressions.

```python
print(total)
total = total + value
for value in range(1, 5):
total = 0
```

1. Write a complete ordered program on paper or in a local file.
2. Annotate why each line belongs before, inside or after the loop.
3. A partner moves initialisation inside the loop. Predict the resulting output before running both versions.


---

## Which explanation is correct?

Reinforcement · 3–5 minutes · Hinge question, individual vote, peer explanation, revote

Prerequisites: Trace range and distinguish count from total.

Goal: Distinguish the number of updates from the sum of the values.

Predict the two printed numbers. Choose A: 3 and 9; B: 4 and 14; C: 3 and 4; or D: 9 and 3. Commit individually, then explain your choice to a partner and vote again.

```python
count = 0
total = 0
for value in range(2, 5):
    count = count + 1
    total = total + value
print(count, total)
```

1. List the loop values before choosing.
2. Explain why count and total do different jobs.
3. Transfer: change the range to range(4, 4). Predict both values and explain what executes.


---

## Repair the missing point

Reinforcement · 8–12 minutes · Predict, run, investigate, modify and explain

Prerequisites: Inclusive task wording versus Python's excluded range stop.

Goal: Use a small boundary test to diagnose an off-by-one error.

The requirement is to sum integers from 1 through n inclusive, assuming n is a non-negative integer. The program runs but gives the wrong result. Predict its output for n = 4, then identify the smallest permitted n that exposes the fault.

```python
n = 4
total = 0
for value in range(1, n):
    total = total + value
print(total)
```

1. Record input, expected result, faulty result and why they differ for n = 0, 1 and 4.
2. Change one expression to repair the loop; keep the faulty version for comparison.
3. Rerun or hand-trace every test, then explain why merely getting n = 0 correct was insufficient.


---

## Complete, explain, then rebuild

Reinforcement · 10–15 minutes · Faded example followed by independent retrieval

Prerequisites: Assignment, multiplication, accumulator and range.

Goal: Transfer the accumulator pattern to a changed scoring rule.

Round r awards 2 × r + 1 points. Complete the placeholders to total four rounds, then predict every row before running. Use only a loop, arithmetic and variables.

```python
total = ___
for round_number in range(1, ___):
    points = 2 * round_number + 1
    total = ___
print(total)
```

1. Record round number, points and running total for rounds 1–4.
2. Explain each filled placeholder; a final output alone is insufficient.
3. Cover the example. Rebuild for three rounds awarding 3 × r points. Predict and test before checking the key.


---

## Count and total qualifying scores

Extension · 12–18 minutes · Changed-case design and boundary testing

Prerequisites: Complete the core accumulator task; selection, comparisons and integer input must already be taught.

Goal: Combine selection with a counter and accumulator without confusing their roles.

Read exactly four non-negative integer scores. Count and total only scores at least 10. Assume each input is already a valid non-negative integer. Use a counted loop and selection, with no list required.

```python
# First test inputs, entered one per prompt: 9, 10, 11, 0
# Record expected qualifying count and qualifying total before coding.
```

1. Explain whether a score exactly equal to 10 qualifies.
2. Test the mixed case above, no qualifying scores (0,1,8,9), and all qualifying (10,10,10,10).
3. Explain where count and total are initialised and why both update only in the qualifying branch.


---

## Same result, different loop

Extension · 10–15 minutes · Compare representations and explain termination

Prerequisites: Complete the core task; while conditions and updates must already be taught.

Goal: Show that two loop forms visit the same values and terminate.

Sum 1 through n inclusive using a while loop instead of for. Assume n is a non-negative integer. Use value and total variables; do not use sum(), a list or a formula.

```python
n = 4
# Initialise value and total.
# Repeat while value is within the required range.
# Update both total and value.
# Print the final total.
```

1. State initial values, the condition and the update that guarantees termination.
2. Compare outputs and visited values with the for version for n = 0,1,4.
3. Explain what happens if you forget the value update. Use a paper trace to diagnose it; do not deliberately leave a non-terminating program running.


---

## Stop at the first unaffordable round

Extension · 15–20 minutes · Constraint reasoning, prediction and test design

Prerequisites: Complete the core task; while, comparisons and selection must be secure. This is a later revisit if those ideas are not yet taught.

Goal: Reason about a stopping condition before changing the running total.

Round 1 costs 1 credit, round 2 costs 2 credits, and so on. Buy consecutive rounds in order and stop before the first round you cannot afford. Assume a non-negative integer budget. Output the number bought, spent credits and remaining credits. An exact spend is allowed; use a loop, not a formula.

```python
budget = 7
spent = 0
round_number = 1
# Check whether the next round is affordable before buying it.
```

1. Predict results for budgets 0,1,6,7. Include an exact-fit case and a case leaving change.
2. Keep a trace of next round cost, spent before, affordable?, and spent after.
3. Explain why checking only spent < budget can overspend, and how your condition prevents that.


Original content CC BY 4.0; code MIT. Public formative resources, not secure assessment tasks.
