# Pseudocode programming reference

2026 foundation · 2027 revisions. Original examples.

Conventions used throughout

Zero-based indexing; inclusive FOR … TO endpoints; a loop with a positive step and start greater than end executes zero times. AND and OR short-circuit from left to right. DIV floors; MOD is the corresponding remainder. Assignment is = and equality is ==. NULL means no value. ^ means exponentiation in pseudocode, while Python uses **.

.length, .append, .keys, INTEGER, TRIM, SUBSTRING, SPLIT, JOIN, READ_CSV and UNIQUE_VALUES are declared abstract operations, not a universal language library. SUBSTRING takes a start index and a length. FOR value IN collection visits each item. RETURN ends a function. ASSERT checks a test expectation; TRY/CATCH handles a signalled error. Procedures perform actions. Text literals may use single or double quotes; "\n" represents a newline in CSV text. Class notation uses self for the current object. INPUT obtains a value; OUTPUT displays values separated for readability.

SCSA does not mandate one pseudocode grammar. Follow any conventions supplied in a question and keep your own notation consistent. Python output shown below is a deterministic check for the paired algorithm; pseudocode Boolean/list display formatting can differ without changing the values.



## Program structure, comments and identifiers

Course support

Run statements in order. Python is case-sensitive; use meaningful snake_case names, # comments and four spaces per indentation level. Pseudocode uses capitalised keywords and explicit block endings.

```text
// Report a lesson result
lessonTitle = "Programming"
OUTPUT lessonTitle
```

Expected values (Python formatting):
```text
Programming
```

Watch for: A comment explains intent; it does not execute. Do not put spaces or hyphens inside identifiers. Avoid names such as list and input that hide Python built-ins.

Practice: Rename lesson_title to topic_name consistently. Does the output change?

Explained answer: No. Consistent renaming changes the identifier, not the stored text.

## Variables, constants and data types

Course support

Assignment binds a name to a value. Common Python types are int, float, str and bool. Uppercase names signal constants by convention; Python does not prevent reassignment.

```text
CONSTANT MAX_ATTEMPTS = 3
score = 7
temperature = 21.5
name = "Ari"
ready = TRUE
score = score + 2
OUTPUT score, ready
```

Expected values (Python formatting):
```text
9 True
```

Watch for: "7" is text; 7 is an integer. An assignment replaces the old binding. Python Boolean literals are True and False, not TRUE and FALSE.

Practice: What is score after score = 4 followed by score = score * 3?

Explained answer: 12; the right-hand side uses the previous value.

## Input, output and type conversion

Course support

input(prompt) always returns text. Convert with int(text) or float(text) before arithmetic. This deterministic example uses supplied text instead of waiting for keyboard input; replace the first assignment with age_text = input("Age: ") in an interactive program.

```text
ageText = "16"
age = INTEGER(ageText)
OUTPUT "Next year: ", age + 1
```

Expected values (Python formatting):
```text
Next year: 17
```

Watch for: int("16.5") raises ValueError; int(16.5) truncates towards zero. Validate the intended input format rather than converting through float to hide invalid integer input.

Practice: Why does input("Number: ") + "1" concatenate?

Explained answer: Both operands are strings. Convert the input to int for integer addition.

## Arithmetic and precedence

Course support

Python uses +, -, *, /, //, %, **. / returns a float; // floors the quotient. Pseudocode uses DIV, MOD and ^ here. Parentheses make evaluation order explicit.

```text
OUTPUT 17 DIV 5, 17 MOD 5
OUTPUT 2 + 3 * 4, (2 + 3) * 4
OUTPUT 2 ^ 3
// This guide defines DIV as floor division, also for negatives.
OUTPUT -7 DIV 3, -7 MOD 3
```

Expected values (Python formatting):
```text
3 2
14 20
8
-3 2
```

Watch for: Do not use ^ for Python powers: it is bitwise XOR. With negatives, floor division differs from truncation. Some pseudocode tasks define DIV differently; follow the stated contract.

Practice: Find the quotient and remainder for 23 divided by 4.

Explained answer: 23 // 4 is 5 and 23 % 4 is 3; 4 * 5 + 3 = 23.

## Comparisons and Boolean logic

Course support

Use ==, !=, <, <=, >, >= for comparisons and and, or, not for Boolean logic. Comparisons produce a Boolean. Evaluate comparisons before combining conditions.

```text
age = 16
hasPermission = TRUE
eligible = age >= 16 AND hasPermission
OUTPUT eligible
OUTPUT NOT (age < 16 OR NOT hasPermission)
```

Expected values (Python formatting):
```text
True
True
```

Watch for: = assigns; == compares. Write choice == "A" or choice == "B", not choice == "A" or "B". and/or short-circuit in Python.

Practice: Test age 15 with permission, and age 16 without permission.

Explained answer: Both are ineligible because both conditions must hold.

## IF, ELSE IF and ELSE

Course support

Select the first true branch. Python uses if/elif/else, colons and indentation; pseudocode uses IF/ELSE IF/ELSE/END IF. Check highest threshold first in this example.

```text
mark = 72
IF mark >= 80 THEN
    grade = "A"
ELSE IF mark >= 60 THEN
    grade = "B"
ELSE
    grade = "C"
END IF
OUTPUT grade
```

Expected values (Python formatting):
```text
B
```

Watch for: Independent if statements can all execute. An if/elif chain chooses one branch. Test boundary values 59, 60, 79 and 80.

Practice: What grades result for 60 and 80?

Explained answer: B and A respectively; >= includes the threshold.

## Counted loops and range

Course support

range(start, stop, step) excludes stop. Defaults are start 0 and step 1. This guide defines pseudocode FOR i = a TO b as inclusive at both ends; STEP changes the increment.

```text
FOR number = 1 TO 3
    OUTPUT number
END FOR
FOR number = 6 TO 2 STEP -2
    OUTPUT number
END FOR
```

Expected values (Python formatting):
```text
1
2
3
6
4
2
```

Watch for: range(1, 3) produces 1 and 2. A zero step is invalid. Make sure the step moves towards the stop value.

Practice: Write a loop producing 0, 2, 4.

Explained answer: Python: for n in range(0, 6, 2): print(n). Pseudocode: FOR n = 0 TO 4 STEP 2, OUTPUT n, END FOR.

## Pre-test loops and sentinel values

Course support

WHILE tests before the body and may execute zero times. Update the condition variable inside the loop. A sentinel ends input and must not be included in the calculation.

```text
readings = [4, 6, -1, 99]
index = 0
total = 0
WHILE index < readings.length AND readings[index] != -1
    total = total + readings[index]
    index = index + 1
END WHILE
OUTPUT total
```

Expected values (Python formatting):
```text
10
```

Watch for: This example relies on left-to-right short-circuit AND: the bounds test occurs before indexing. State this assumption in pseudocode. A missing update may cause an infinite loop.

Practice: What happens with readings = [-1]?

Explained answer: The body executes zero times and total stays 0.

## Post-test loops and validation

Course support

REPEAT…UNTIL runs at least once and stops when its condition becomes true. Python has no built-in repeat-until; use while True and break after the test.

```text
// INPUT supplies 0, then 12, then 7
REPEAT
    INPUT value
UNTIL value >= 1 AND value <= 10
OUTPUT value
```

Expected values (Python formatting):
```text
7
```

Watch for: UNTIL valid and WHILE valid have opposite continuation meanings. The finite Python fixture supplies a valid value; real input also needs type validation.

Practice: How many attempts are processed for 0, 12, 7?

Explained answer: Three; the first two fail the inclusive 1–10 range check.

## Totals, counts, averages and extrema

Course support

Initialise totals and counters before the loop. Initialise a maximum from real data rather than zero when negative values are possible. Handle empty input before division or indexing.

```text
values = [-4, -2, -9]
total = 0
count = 0
largest = NULL
FOR value IN values
    total = total + value
    count = count + 1
    IF largest == NULL OR value > largest THEN
        largest = value
    END IF
END FOR
IF count > 0 THEN
    OUTPUT total, count, total / count, largest
ELSE
    OUTPUT "No data"
END IF
```

Expected values (Python formatting):
```text
-15 3 -5.0 -2
```

Watch for: Resetting total inside the loop loses earlier values. largest = 0 would be wrong for this all-negative dataset. NULL/None is a missing-value marker here.

Practice: What should an empty list produce?

Explained answer: No data; do not divide by zero or invent a maximum.

## Strings, indexing, slicing and methods

Course support

Strings are immutable sequences indexed from zero. [start:stop] excludes stop. Common methods include strip(), lower(), upper(), split() and separator.join(parts). Pseudocode SUBSTRING(text,start,length) uses a length here, not a stop index.

```text
text = "  Ada Lovelace  "
clean = TRIM(text)
OUTPUT clean[0], SUBSTRING(clean, 0, 3)
OUTPUT LOWERCASE(clean)
words = SPLIT(clean, " ")
OUTPUT JOIN(words, "-")
OUTPUT clean.length
```

Expected values (Python formatting):
```text
A Ada
ada lovelace
Ada-Lovelace
12
```

Watch for: Methods return new strings; clean.lower() does not change clean. Indexing beyond the end raises IndexError, while a slice can safely end beyond the string.

Practice: What does "Python"[1:4] produce?

Explained answer: yth: indices 1, 2 and 3.

## One-dimensional lists and traversal

Course support

A Python list is a mutable sequence. This guide implements course arrays with lists. Use append(), insert(), pop(), len(), membership with in, and indexing. Here pseudocode .append and .length are explicitly defined operations.

```text
scores = [5, 7]
scores.append(9)
scores[0] = 6
FOR index = 0 TO scores.length - 1
    OUTPUT index, scores[index]
END FOR
OUTPUT 7 IN scores
```

Expected values (Python formatting):
```text
0 6
1 7
2 9
True
```

Watch for: Valid indices are 0 through len(scores)-1. append returns None. remove(value) removes by value; pop(index) removes and returns by position. Avoid changing list length while traversing it.

Practice: How would you append 11 and obtain the final item?

Explained answer: scores.append(11), then scores[-1] in Python; scores[scores.length - 1] in this pseudocode.

## Two-dimensional lists and nested loops

Course support

Use grid[row][column]. Construct independent rows. Nested loops can process each row and calculate row totals; an empty row has total zero.

```text
grid = [[2, 3], [4, 1], []]
totals = []
FOR row IN grid
    total = 0
    FOR value IN row
        total = total + value
    END FOR
    totals.append(total)
END FOR
OUTPUT totals
```

Expected values (Python formatting):
```text
[5, 5, 0]
```

Watch for: [[0] * 3] * 2 shares the same row twice. Use [[0] * 3 for _ in range(2)] for independent rows. Reset each row total inside the outer loop.

Practice: What is grid[1][0]?

Explained answer: 4: the first item in the second row.

## Dictionaries and keyed records

Course support

A dictionary maps unique keys to values. Use key membership before lookup when a key may be missing. Assigning an existing key updates its value.

```text
stock = {"A01": 2, "B02": 0}
stock["A01"] = stock["A01"] + 1
IF "C03" NOT IN stock THEN
    stock["C03"] = 4
END IF
total = 0
FOR key IN stock.keys
    total = total + stock[key]
END FOR
OUTPUT total, stock["A01"]
```

Expected values (Python formatting):
```text
7 3
```

Watch for: A missing key raises KeyError in Python. Iterating a dictionary produces keys, not values. Decide whether duplicate IDs should be rejected or updated.

Practice: What changes if A01 is assigned 10?

Explained answer: Its existing quantity is replaced; a second A01 key is not created.

## Functions, procedures and return values

Course support

Define with def name(parameters): and call with arguments. return sends a result to the caller; print displays output. A procedure performs an action; Python still defines it with def and returns None when no result is returned.

```text
FUNCTION Area(width, height)
    RETURN width * height
END Area

PROCEDURE ShowArea(value)
    OUTPUT "Area: ", value
END ShowArea

result = Area(3, 4)
ShowArea(result)
```

Expected values (Python formatting):
```text
Area: 12
```

Watch for: A function definition does not run the body. Do not substitute print for return when another calculation needs the result. State input assumptions, output and side effects.

Practice: What is area(2, 5) + 1?

Explained answer: 11, because area returns the numeric value 10.

## Scope, parameters and mutable arguments

Course support

Parameters are local names. Rebinding a numeric parameter does not rebind the caller’s variable. Mutating a shared list changes that list. Python passes object references by assignment; calling it simply pass-by-reference is misleading.

```text
// Parameters are local bindings to supplied values/objects.
FUNCTION Update(number, values)
    number = number + 1
    values.append(number)
    RETURN number
END Update
score = 4
history = []
newScore = Update(score, history)
OUTPUT score, newScore, history
```

Expected values (Python formatting):
```text
4 5 [5]
```

Watch for: Specify parameter semantics in pseudocode. Avoid mutable default parameters such as values=[] in Python because calls share that default object.

Practice: How could the caller explicitly update score?

Explained answer: Assign the returned value: score = update(score, history).

## Type checks, range checks and exceptions

Course support

Validation checks whether data satisfies rules; verification checks faithful entry or transfer. Catch the expected exception, then test the permitted range. A validated value is not proof that a real-world claim is true.

```text
FUNCTION ValidAge(text)
    IF NOT CAN_CONVERT_TO_INTEGER(text) THEN
        RETURN FALSE
    END IF
    age = INTEGER(text)
    RETURN age >= 0 AND age <= 120
END ValidAge
OUTPUT ValidAge("16"), ValidAge("abc"), ValidAge("121")
```

Expected values (Python formatting):
```text
True False False
```

Watch for: CAN_CONVERT_TO_INTEGER is a declared helper matching Python int(text), not a universal pseudocode built-in. Catch ValueError rather than hiding every error with a bare except.

Practice: Test -1, 0, 120, 121 and an empty string.

Explained answer: False, True, True, False, False. These include both boundaries and invalid-format cases.

## Text files: write, read and close

Course support

Use with open(path, mode, encoding="utf-8") so the file closes even after an error. Modes r, w and a mean read, overwrite and append. This example creates scores.txt in the working folder; use a fresh folder when running it.

```text
OPEN "scores.txt" FOR WRITE AS file
WRITE LINE "5" TO file
WRITE LINE "7" TO file
CLOSE file
total = 0
OPEN "scores.txt" FOR READ AS file
WHILE NOT EOF(file)
    line = READ LINE FROM file
    total = total + INTEGER(TRIM(line))
END WHILE
CLOSE file
OUTPUT total
```

Expected values (Python formatting):
```text
12
```

Watch for: w replaces existing content. Relative paths use the working directory, which may differ from the script folder. Blank or malformed lines need a stated reject/skip policy; missing files raise FileNotFoundError.

Practice: Which mode preserves earlier content while adding new lines?

Explained answer: a (append). Add newline characters explicitly when using write().

## CSV records and structured file data

Course support

Use Python’s csv module for comma-separated data; splitting on commas fails for quoted fields containing commas. DictReader uses the first row as field names. Convert numeric fields before arithmetic.

```text
// READ_CSV parses quotes and returns records using header names.
records = READ_CSV('name,score\n"Lee, Sam",8\nAri,6\n')
total = 0
FOR record IN records
    total = total + INTEGER(record["score"])
END FOR
OUTPUT total
```

Expected values (Python formatting):
```text
14
```

Watch for: READ_CSV is a declared parsing helper. For a real file, use open("results.csv", newline="", encoding="utf-8"). Handle missing headers, invalid numbers and missing files deliberately.

Practice: Why is the comma in Lee, Sam not a field separator?

Explained answer: The field is enclosed in CSV double quotes, so a CSV parser treats it as one name.

## Linear search

Course support

Check items in sequence. This function returns the first matching zero-based index, or -1 if absent. It works on unsorted data and returns -1 for an empty list.

```text
FUNCTION LinearSearch(values, target)
    FOR index = 0 TO values.length - 1
        IF values[index] == target THEN
            RETURN index
        END IF
    END FOR
    RETURN -1
END LinearSearch
OUTPUT LinearSearch([8, 3, 8], 8)
OUTPUT LinearSearch([], 8)
```

Expected values (Python formatting):
```text
0
-1
```

Watch for: Do not return -1 inside the loop after the first mismatch. -1 is a failure marker here; never use it as an index without checking, because Python values[-1] is valid.

Practice: What is returned when searching [4, 2, 9] for 9?

Explained answer: 2; up to three comparisons are required. Worst-case time is O(n).

## Binary search

Course support

Requires ascending sorted data. Maintain an inclusive low/high interval and discard half after each comparison. Returns a matching index or -1. With duplicates it does not promise the first match.

```text
FUNCTION BinarySearch(values, target)
    low = 0
    high = values.length - 1
    WHILE low <= high
        middle = (low + high) DIV 2
        IF values[middle] == target THEN
            RETURN middle
        END IF
        IF values[middle] < target THEN
            low = middle + 1
        ELSE
            high = middle - 1
        END IF
    END WHILE
    RETURN -1
END BinarySearch
OUTPUT BinarySearch([2, 4, 6, 8, 10], 8)
OUTPUT BinarySearch([], 8)
```

Expected values (Python formatting):
```text
3
-1
```

Watch for: Using / makes a float index in Python. Updating low = middle can stall. Sorting first has its own cost and can change original positions.

Practice: Trace the example search for 8.

Explained answer: middle 2 gives 6; low becomes 3. middle 3 gives 8; return 3. Worst-case search time O(log n).

## Bubble sort

Course support

Compare adjacent items and swap out-of-order pairs. This implementation sorts the supplied list in place, ascending, and returns it. Each pass fixes the largest remaining item at the right.

```text
FUNCTION BubbleSort(values)
    FOR end = values.length - 1 TO 1 STEP -1
        swapped = FALSE
        FOR index = 0 TO end - 1
            IF values[index] > values[index + 1] THEN
                temp = values[index]
                values[index] = values[index + 1]
                values[index + 1] = temp
                swapped = TRUE
            END IF
        END FOR
        IF NOT swapped THEN
            RETURN values
        END IF
    END FOR
    RETURN values
END BubbleSort
OUTPUT BubbleSort([3, 1, 2, 1])
```

Expected values (Python formatting):
```text
[1, 1, 2, 3]
```

Watch for: Without a temporary value or simultaneous Python assignment, a swap can lose an item. This early-exit version has best-case O(n), worst-case O(n²).

Practice: What does the first pass do to [3, 1, 2]?

Explained answer: [1, 2, 3]; 3 reaches its final position.

## Insertion sort

Course support

Grow a sorted prefix. Save the current item, shift larger prefix items right, then insert it. Sorts and returns the supplied list in place; handles duplicates and empty input.

```text
FUNCTION InsertionSort(values)
    FOR index = 1 TO values.length - 1
        current = values[index]
        position = index - 1
        WHILE position >= 0 AND values[position] > current
            values[position + 1] = values[position]
            position = position - 1
        END WHILE
        values[position + 1] = current
    END FOR
    RETURN values
END InsertionSort
OUTPUT InsertionSort([4, 2, 3, 2])
```

Expected values (Python formatting):
```text
[2, 2, 3, 4]
```

Watch for: Test position >= 0 before indexing. Save current before shifting overwrites its original slot. Best-case O(n), worst-case O(n²).

Practice: After inserting the second item of [4, 2, 3], what is the list?

Explained answer: [2, 4, 3]; only the prefix is guaranteed sorted at that stage.

## Selection sort

Course support

Find the smallest item in the unsorted suffix and swap it into the next prefix position. This implementation sorts the supplied list in place and returns it. It makes n(n−1)/2 key comparisons, even for already sorted input.

```text
FUNCTION SelectionSort(values)
    FOR start = 0 TO values.length - 2
        smallest = start
        FOR index = start + 1 TO values.length - 1
            IF values[index] < values[smallest] THEN
                smallest = index
            END IF
        END FOR
        temp = values[start]
        values[start] = values[smallest]
        values[smallest] = temp
    END FOR
    RETURN values
END SelectionSort
OUTPUT SelectionSort([3, 1, 2, 1])
```

Expected values (Python formatting):
```text
[1, 1, 2, 3]
```

Watch for: Save an index for smallest, not just its value. This swapping implementation is not stable: equal-key records may change relative order. Best and worst time are O(n²).

Practice: How many key comparisons does four-item selection sort make?

Explained answer: 3 + 2 + 1 = 6, irrespective of the initial order.

## Classes, constructors, attributes and methods

Course support

A class defines attributes and behaviour; an instance is an object created from it. __init__ initialises instance state. self refers to the receiving instance. Pseudocode class notation is defined here for clarity.

```text
CLASS Item
    CONSTRUCTOR(name)
        self.name = name
        self.available = TRUE
    END CONSTRUCTOR
    METHOD Lend()
        IF NOT self.available THEN
            RETURN FALSE
        END IF
        self.available = FALSE
        RETURN TRUE
    END Lend
END CLASS
item = NEW Item("Camera")
OUTPUT item.name, item.Lend(), item.Lend()
```

Expected values (Python formatting):
```text
Camera True False
```

Watch for: Use instance attributes for individual state; a mutable class attribute is shared. Python convention _name signals non-public use but does not enforce access control.

Practice: Why does the second lend call return False?

Explained answer: The first call changed the same object’s available attribute to False.

## Inheritance and method overriding

Course support

A subclass can reuse and specialise a base class. Overriding provides different behaviour behind the same method interface. Use inheritance for an is-a relationship rather than merely to share unrelated code.

```text
CLASS Resource
    METHOD Label()
        RETURN "Resource"
    END Label
END CLASS
CLASS Book INHERITS Resource
    METHOD Label()
        RETURN "Book"
    END Label
END CLASS
resources = [NEW Resource(), NEW Book()]
FOR resource IN resources
    OUTPUT resource.Label()
END FOR
```

Expected values (Python formatting):
```text
Resource
Book
```

Watch for: The method is selected from the actual object. super().__init__(...) calls base initialisation when a subclass defines its own constructor. Composition expresses has-a relationships.

Practice: What demonstrates polymorphism here?

Explained answer: The same resource.label() call produces behaviour appropriate to each object type.

## Trace tables, assertions and test cases

Course support

Trace variable changes by statement or iteration. Use normal, boundary and invalid cases with expected results. assert is useful for developer checks, not input validation: assertions can be disabled.

```text
FUNCTION Delivery(total)
    IF total < 0 THEN
        RAISE "Negative total"
    END IF
    IF total >= 50 THEN
        RETURN 0
    END IF
    RETURN 5
END Delivery
ASSERT Delivery(49) == 5
ASSERT Delivery(50) == 0
TRY
    Delivery(-1)
CATCH "Negative total"
    OUTPUT "Invalid rejected"
END TRY
OUTPUT "Checks passed"
```

Expected values (Python formatting):
```text
Invalid rejected
Checks passed
```

Watch for: A syntax error stops parsing; a runtime exception occurs during execution; a logic error can give a plausible but incorrect result. Passing a few examples is not proof of correctness.

Practice: Which extra boundary case would you add?

Explained answer: 51 verifies behaviour just above 50; also test 0 as the minimum permitted total. Record expected outputs before running.

## Imports, standard-library helpers and main guards

Course support

import module binds a module name; module.function(...) calls its function. Keep reusable definitions separate from the program entry point. The main guard runs only when a file is executed directly.

```text
FUNCTION Distance(x, y)
    RETURN SQRT(x * x + y * y)
END Distance
// Main program
OUTPUT Distance(3, 4)
```

Expected values (Python formatting):
```text
5.0
```

Watch for: Do not name your own file math.py or csv.py; it can shadow a standard-library module. Python implementation details such as the main guard need not be copied into a language-independent algorithm.

Practice: What happens to the guarded print when this file is imported?

Explained answer: It does not execute; distance is available to the importing module.

## Concise Python: comprehensions, tuples and sets

Extension · optional idioms

These optional Python idioms can shorten implementations after explicit loops are understood. A tuple is an immutable sequence; a set stores unique hashable values. A comprehension constructs a new collection.

```text
// Explicit equivalent: no comprehension syntax is assumed.
squares = []
FOR number = 0 TO 3
    squares.append(number * number)
END FOR
point = [2, 3]
unique = UNIQUE_VALUES([3, 1, 3])
OUTPUT squares
OUTPUT point[0], unique.length
```

Expected values (Python formatting):
```text
[0, 1, 4, 9]
2 2
```

Watch for: Sets have no positional index and no promised display order. A tuple can contain mutable objects even though its own element bindings cannot be reassigned. This is optional idiom support, not an extra syllabus requirement.

Practice: Rewrite the squares comprehension using an ordinary loop.

Explained answer: Initialise squares = []; loop over range(4); append number * number.

Sources: https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0003/1090875/Year-11_12_Computer-Science_ATAR_Additional-syllabus-support-booklet-.PDF
https://docs.python.org/3/tutorial/
Original text CC BY 4.0; original code MIT.
