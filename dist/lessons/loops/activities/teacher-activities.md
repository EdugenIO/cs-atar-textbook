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

### Teacher guidance

Do not reveal the trace first. Ask: Where is the previous total kept? Why does print execute once? Listen to both partners before checking the independent case.

Support: Model only the first row: value 1, old total 0, added 3, new total 3. Leave later rows for the student.

### Explained answer

Original rows: (1,0,3,3), (2,3,6,9), (3,9,9,18); output 18. Stop 5 adds a fourth row (4,18,12,30), output 30. Multiplier 2 with the original stop 4 gives totals 2,6,12 and output 12. Initialisation and final print run once; the indented update repeats.


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

### Teacher guidance

Cut the four lines into cards or project them. Require an individual annotation after the paired ordering; correct order alone can hide guessing.

Support: Ask which line creates total before its first use. Then identify the instruction that must repeat.

### Explained answer

Correct order: total = 0; for value in range(1, 5):; indented total = total + value; print(total) outside the loop. Totals are 1,3,6,10, so the output is 10. Resetting total inside each iteration leaves only the current value and prints 4. Leaving the update unindented causes an IndentationError because the for statement needs an indented body.


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

### Teacher guidance

A is correct. B suggests an inclusive stop; C confuses the last loop value with the accumulated total; D swaps counter and accumulator. Use explanations, not vote totals alone, to decide what to reteach.

Support: Separate the two updates into columns. count increases by one, whereas total increases by the current value.

### Explained answer

A: range(2,5) gives 2,3,4. count becomes 1,2,3 and total becomes 2,5,9; print displays 3 9. range(4,4) is empty, so both remain zero and the output is 0 0. Initialisation and print still execute.


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

### Teacher guidance

Ask for evidence before accepting a repair. Distinguish a logic error from syntax/runtime errors: this program executes successfully. Do not ask students to add validation outside the stated non-negative-integer assumption.

Support: For n = 1, write down the values supplied by range(1,1). Compare the empty list of iterations with the requirement to include 1.

### Explained answer

Faulty output for n = 4 is 6, rather than 10. n = 0 gives 0 in both versions; n = 1 is the smallest permitted value exposing the error: faulty 0, expected 1. Use range(1, n + 1). Repaired results for n = 0,1,4 are 0,1,10. Passing the empty-range case does not show the upper bound is included.


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

### Teacher guidance

Give the skeleton only when needed. The covered reconstruction is the independent transfer. If the student copies the original four-round stop, ask them to connect round count with the excluded stop.

Support: Begin with zero points accumulated. For four rounds starting at 1, which excluded stop includes round 4?

### Explained answer

Fill with 0, 5, and total + points. Points are 3,5,7,9 and totals 3,8,15,24. The rebuilt three-round task uses range(1,4), points = 3 * round_number and total += points; totals 3,9,18, final 18.


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

### Teacher guidance

Use only after selection is secure. Ask a partner to challenge a > 10 implementation with a boundary input. Do not introduce input validation, lists or averages as extra requirements.

Support: Write the condition in words first: score is greater than or equal to 10. Trace a single score of 10 before completing the loop.

### Explained answer

Initialise count = 0 and total = 0 before for round_number in range(4). Read score = int(input()); inside if score >= 10, increment count by 1 and add score to total. Print both after the loop. Mixed case gives count 2, total 21; none gives 0,0; all gives 4,40. Using > 10 incorrectly excludes scores of 10.


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

### Teacher guidance

Look for value = 1, total = 0, condition value <= n, and value += 1 inside the loop. Ask the learner to show the condition becoming false rather than just claiming the loop stops.

Support: For n = 1, the body should execute once. What value must value have immediately afterwards to make the condition false?

### Explained answer

Start value = 1 and total = 0. While value <= n: add value to total, then increase value by 1. After the loop print total. n = 0 visits no values and yields 0; n = 1 visits 1 and yields 1; n = 4 visits 1,2,3,4 and yields 10. After the last iteration value is n + 1. Omitting the update prevents termination whenever n >= 1, because value stays 1; n = 0 still skips the body.


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

### Teacher guidance

Treat this as optional challenge, not a new assessment expectation. Ask students to justify the invariant spent <= budget after every purchase. No closed-form algebra, nested loops or classes are required.

Support: For budget 7, costs 1+2+3 use 6 credits. Ask whether the next cost of 4 can be added without exceeding 7.

### Explained answer

While spent + round_number <= budget, add round_number to spent and increment round_number. After the loop, bought = round_number - 1 and remaining = budget - spent. For budgets 0,1,6,7, outputs (bought,spent,remaining) are (0,0,0), (1,1,0), (3,6,0), (3,6,1). The condition checks the proposed new total before accepting a purchase. Checking only spent < budget can buy round 4 after spending 6 from a budget of 7, overspending to 10.


Original content CC BY 4.0; code MIT. Public formative resources, not secure assessment tasks.
