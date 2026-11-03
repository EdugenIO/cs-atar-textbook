# Choose one branch with if, elif and else

Unit 1 · Week 3 · Lesson 3

Objective: Use Boolean conditions and test selection at its boundaries.

Retrieve: For score 7, evaluate score >= 5 and score == 5. Explain = versus ==.

## Worked example — predict first

```python
age = 12
if age < 0:
    ticket = "Invalid age"
elif age < 12:
    ticket = "Junior"
else:
    ticket = "Standard"
print(ticket)

```

Predict age 12; trace -1, 11, 12 and 13.

## Independent practice
Integer quantity: negative = Invalid quantity; zero = Empty basket; positive = Process order. Write one if/elif/else chain, displaying one message. Test -1, 0, 1 and 2. Record expected and actual messages separately.

Equipment-free: write and trace on paper, label evidence hand trace; execute later.

## Changed retry
Balance: negative = Overdrawn; zero = Zero balance; positive = In credit. Predict and test -2, 0 and 3 without copying the example.

## Exit
Write a decision: negative quantity is invalid, zero is empty, otherwise process the order.

Keep your first attempt and explain any correction. Answers are in the web lesson and teacher notes.
Original text CC BY 4.0; code MIT.
