"""Build paired, printable references and executable, verified Python examples."""
from pathlib import Path
import html, json, textwrap

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'dist' / 'reference'
OUT.mkdir(exist_ok=True)
topics = []
def topic(id, title, chapter, explanation, python, pseudo, expected, pitfall, practice, answer, level='Course support'):
    topics.append(dict(id=id,title=title,chapter=chapter,explanation=explanation,python=textwrap.dedent(python).strip(),pseudo=textwrap.dedent(pseudo).strip(),expected=expected,pitfall=pitfall,practice=practice,answer=answer,level=level))

topic('structure','Program structure, comments and identifiers','start',
'Run statements in order. Python is case-sensitive; use meaningful snake_case names, # comments and four spaces per indentation level. Pseudocode uses capitalised keywords and explicit block endings.',
'''# Report a lesson result
lesson_title = "Programming"
print(lesson_title)''',
'''// Report a lesson result
lessonTitle = "Programming"
OUTPUT lessonTitle''','Programming',
'A comment explains intent; it does not execute. Do not put spaces or hyphens inside identifiers. Avoid names such as list and input that hide Python built-ins.',
'Rename lesson_title to topic_name consistently. Does the output change?','No. Consistent renaming changes the identifier, not the stored text.')
topic('values','Variables, constants and data types','values',
'Assignment binds a name to a value. Common Python types are int, float, str and bool. Uppercase names signal constants by convention; Python does not prevent reassignment.',
'''MAX_ATTEMPTS = 3
score = 7
temperature = 21.5
name = "Ari"
ready = True
score = score + 2
print(score, ready)''',
'''CONSTANT MAX_ATTEMPTS = 3
score = 7
temperature = 21.5
name = "Ari"
ready = TRUE
score = score + 2
OUTPUT score, ready''','9 True',
'"7" is text; 7 is an integer. An assignment replaces the old binding. Python Boolean literals are True and False, not TRUE and FALSE.',
'What is score after score = 4 followed by score = score * 3?','12; the right-hand side uses the previous value.')
topic('input','Input, output and type conversion','values',
'input(prompt) always returns text. Convert with int(text) or float(text) before arithmetic. This deterministic example uses supplied text instead of waiting for keyboard input; replace the first assignment with age_text = input("Age: ") in an interactive program.',
'''age_text = "16"
age = int(age_text)
print(f"Next year: {age + 1}")''',
'''ageText = "16"
age = INTEGER(ageText)
OUTPUT "Next year: ", age + 1''','Next year: 17',
'int("16.5") raises ValueError; int(16.5) truncates towards zero. Validate the intended input format rather than converting through float to hide invalid integer input.',
'Why does input("Number: ") + "1" concatenate?','Both operands are strings. Convert the input to int for integer addition.')
topic('operators','Arithmetic and precedence','values',
'Python uses +, -, *, /, //, %, **. / returns a float; // floors the quotient. Pseudocode uses DIV, MOD and ^ here. Parentheses make evaluation order explicit.',
'''print(17 // 5, 17 % 5)
print(2 + 3 * 4, (2 + 3) * 4)
print(2 ** 3)
print(-7 // 3, -7 % 3)''',
'''OUTPUT 17 DIV 5, 17 MOD 5
OUTPUT 2 + 3 * 4, (2 + 3) * 4
OUTPUT 2 ^ 3
// This guide defines DIV as floor division, also for negatives.
OUTPUT -7 DIV 3, -7 MOD 3''','3 2\n14 20\n8\n-3 2',
'Do not use ^ for Python powers: it is bitwise XOR. With negatives, floor division differs from truncation. Some pseudocode tasks define DIV differently; follow the stated contract.',
'Find the quotient and remainder for 23 divided by 4.','23 // 4 is 5 and 23 % 4 is 3; 4 * 5 + 3 = 23.')
topic('conditions','Comparisons and Boolean logic','selection',
'Use ==, !=, <, <=, >, >= for comparisons and and, or, not for Boolean logic. Comparisons produce a Boolean. Evaluate comparisons before combining conditions.',
'''age = 16
has_permission = True
eligible = age >= 16 and has_permission
print(eligible)
print(not (age < 16 or not has_permission))''',
'''age = 16
hasPermission = TRUE
eligible = age >= 16 AND hasPermission
OUTPUT eligible
OUTPUT NOT (age < 16 OR NOT hasPermission)''','True\nTrue',
'= assigns; == compares. Write choice == "A" or choice == "B", not choice == "A" or "B". and/or short-circuit in Python.',
'Test age 15 with permission, and age 16 without permission.','Both are ineligible because both conditions must hold.')
topic('selection','IF, ELSE IF and ELSE','selection',
'Select the first true branch. Python uses if/elif/else, colons and indentation; pseudocode uses IF/ELSE IF/ELSE/END IF. Check highest threshold first in this example.',
'''mark = 72
if mark >= 80:
    grade = "A"
elif mark >= 60:
    grade = "B"
else:
    grade = "C"
print(grade)''',
'''mark = 72
IF mark >= 80 THEN
    grade = "A"
ELSE IF mark >= 60 THEN
    grade = "B"
ELSE
    grade = "C"
END IF
OUTPUT grade''','B',
'Independent if statements can all execute. An if/elif chain chooses one branch. Test boundary values 59, 60, 79 and 80.',
'What grades result for 60 and 80?','B and A respectively; >= includes the threshold.')
topic('counted-loops','Counted loops and range','loops',
'range(start, stop, step) excludes stop. Defaults are start 0 and step 1. This guide defines pseudocode FOR i = a TO b as inclusive at both ends; STEP changes the increment.',
'''for number in range(1, 4):
    print(number)
for number in range(6, 1, -2):
    print(number)''',
'''FOR number = 1 TO 3
    OUTPUT number
END FOR
FOR number = 6 TO 2 STEP -2
    OUTPUT number
END FOR''','1\n2\n3\n6\n4\n2',
'range(1, 3) produces 1 and 2. A zero step is invalid. Make sure the step moves towards the stop value.',
'Write a loop producing 0, 2, 4.','Python: for n in range(0, 6, 2): print(n). Pseudocode: FOR n = 0 TO 4 STEP 2, OUTPUT n, END FOR.')
topic('while','Pre-test loops and sentinel values','loops',
'WHILE tests before the body and may execute zero times. Update the condition variable inside the loop. A sentinel ends input and must not be included in the calculation.',
'''readings = [4, 6, -1, 99]
index = 0
total = 0
while index < len(readings) and readings[index] != -1:
    total += readings[index]
    index += 1
print(total)''',
'''readings = [4, 6, -1, 99]
index = 0
total = 0
WHILE index < readings.length AND readings[index] != -1
    total = total + readings[index]
    index = index + 1
END WHILE
OUTPUT total''','10',
'This example relies on left-to-right short-circuit AND: the bounds test occurs before indexing. State this assumption in pseudocode. A missing update may cause an infinite loop.',
'What happens with readings = [-1]?','The body executes zero times and total stays 0.')
topic('post-test','Post-test loops and validation','loops',
'REPEAT…UNTIL runs at least once and stops when its condition becomes true. Python has no built-in repeat-until; use while True and break after the test.',
'''attempts = iter([0, 12, 7])
while True:
    value = next(attempts)
    if 1 <= value <= 10:
        break
print(value)''',
'''// INPUT supplies 0, then 12, then 7
REPEAT
    INPUT value
UNTIL value >= 1 AND value <= 10
OUTPUT value''','7',
'UNTIL valid and WHILE valid have opposite continuation meanings. The finite Python fixture supplies a valid value; real input also needs type validation.',
'How many attempts are processed for 0, 12, 7?','Three; the first two fail the inclusive 1–10 range check.')
topic('accumulators','Totals, counts, averages and extrema','loops',
'Initialise totals and counters before the loop. Initialise a maximum from real data rather than zero when negative values are possible. Handle empty input before division or indexing.',
'''values = [-4, -2, -9]
total = 0
count = 0
largest = None
for value in values:
    total += value
    count += 1
    if largest is None or value > largest:
        largest = value
if count > 0:
    print(total, count, total / count, largest)
else:
    print("No data")''',
'''values = [-4, -2, -9]
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
END IF''','-15 3 -5.0 -2',
'Resetting total inside the loop loses earlier values. largest = 0 would be wrong for this all-negative dataset. NULL/None is a missing-value marker here.',
'What should an empty list produce?','No data; do not divide by zero or invent a maximum.')
topic('strings','Strings, indexing, slicing and methods','values',
'Strings are immutable sequences indexed from zero. [start:stop] excludes stop. Common methods include strip(), lower(), upper(), split() and separator.join(parts). Pseudocode SUBSTRING(text,start,length) uses a length here, not a stop index.',
'''text = "  Ada Lovelace  "
clean = text.strip()
print(clean[0], clean[0:3])
print(clean.lower())
words = clean.split()
print("-".join(words))
print(len(clean))''',
'''text = "  Ada Lovelace  "
clean = TRIM(text)
OUTPUT clean[0], SUBSTRING(clean, 0, 3)
OUTPUT LOWERCASE(clean)
words = SPLIT(clean, " ")
OUTPUT JOIN(words, "-")
OUTPUT clean.length''','A Ada\nada lovelace\nAda-Lovelace\n12',
'Methods return new strings; clean.lower() does not change clean. Indexing beyond the end raises IndexError, while a slice can safely end beyond the string.',
'What does "Python"[1:4] produce?','yth: indices 1, 2 and 3.')
topic('lists','One-dimensional lists and traversal','unit3-structures',
'A Python list is a mutable sequence. This guide implements course arrays with lists. Use append(), insert(), pop(), len(), membership with in, and indexing. Here pseudocode .append and .length are explicitly defined operations.',
'''scores = [5, 7]
scores.append(9)
scores[0] = 6
for index in range(len(scores)):
    print(index, scores[index])
print(7 in scores)''',
'''scores = [5, 7]
scores.append(9)
scores[0] = 6
FOR index = 0 TO scores.length - 1
    OUTPUT index, scores[index]
END FOR
OUTPUT 7 IN scores''','0 6\n1 7\n2 9\nTrue',
'Valid indices are 0 through len(scores)-1. append returns None. remove(value) removes by value; pop(index) removes and returns by position. Avoid changing list length while traversing it.',
'How would you append 11 and obtain the final item?','scores.append(11), then scores[-1] in Python; scores[scores.length - 1] in this pseudocode.')
topic('grids','Two-dimensional lists and nested loops','unit3-structures',
'Use grid[row][column]. Construct independent rows. Nested loops can process each row and calculate row totals; an empty row has total zero.',
'''grid = [[2, 3], [4, 1], []]
totals = []
for row in grid:
    total = 0
    for value in row:
        total += value
    totals.append(total)
print(totals)''',
'''grid = [[2, 3], [4, 1], []]
totals = []
FOR row IN grid
    total = 0
    FOR value IN row
        total = total + value
    END FOR
    totals.append(total)
END FOR
OUTPUT totals''','[5, 5, 0]',
'[[0] * 3] * 2 shares the same row twice. Use [[0] * 3 for _ in range(2)] for independent rows. Reset each row total inside the outer loop.',
'What is grid[1][0]?','4: the first item in the second row.')
topic('dictionaries','Dictionaries and keyed records','unit3-structures',
'A dictionary maps unique keys to values. Use key membership before lookup when a key may be missing. Assigning an existing key updates its value.',
'''stock = {"A01": 2, "B02": 0}
stock["A01"] += 1
if "C03" not in stock:
    stock["C03"] = 4
total = 0
for key in stock:
    total += stock[key]
print(total, stock["A01"])''',
'''stock = {"A01": 2, "B02": 0}
stock["A01"] = stock["A01"] + 1
IF "C03" NOT IN stock THEN
    stock["C03"] = 4
END IF
total = 0
FOR key IN stock.keys
    total = total + stock[key]
END FOR
OUTPUT total, stock["A01"]''','7 3',
'A missing key raises KeyError in Python. Iterating a dictionary produces keys, not values. Decide whether duplicate IDs should be rejected or updated.',
'What changes if A01 is assigned 10?','Its existing quantity is replaced; a second A01 key is not created.')
topic('functions','Functions, procedures and return values','functions',
'Define with def name(parameters): and call with arguments. return sends a result to the caller; print displays output. A procedure performs an action; Python still defines it with def and returns None when no result is returned.',
'''def area(width, height):
    return width * height

def show_area(value):
    print(f"Area: {value}")

result = area(3, 4)
show_area(result)''',
'''FUNCTION Area(width, height)
    RETURN width * height
END Area

PROCEDURE ShowArea(value)
    OUTPUT "Area: ", value
END ShowArea

result = Area(3, 4)
ShowArea(result)''','Area: 12',
'A function definition does not run the body. Do not substitute print for return when another calculation needs the result. State input assumptions, output and side effects.',
'What is area(2, 5) + 1?','11, because area returns the numeric value 10.')
topic('scope','Scope, parameters and mutable arguments','functions',
'Parameters are local names. Rebinding a numeric parameter does not rebind the caller’s variable. Mutating a shared list changes that list. Python passes object references by assignment; calling it simply pass-by-reference is misleading.',
'''def update(number, values):
    number = number + 1
    values.append(number)
    return number

score = 4
history = []
new_score = update(score, history)
print(score, new_score, history)''',
'''// Parameters are local bindings to supplied values/objects.
FUNCTION Update(number, values)
    number = number + 1
    values.append(number)
    RETURN number
END Update
score = 4
history = []
newScore = Update(score, history)
OUTPUT score, newScore, history''','4 5 [5]',
'Specify parameter semantics in pseudocode. Avoid mutable default parameters such as values=[] in Python because calls share that default object.',
'How could the caller explicitly update score?','Assign the returned value: score = update(score, history).')
topic('validation','Type checks, range checks and exceptions','testing',
'Validation checks whether data satisfies rules; verification checks faithful entry or transfer. Catch the expected exception, then test the permitted range. A validated value is not proof that a real-world claim is true.',
'''def valid_age(text):
    try:
        age = int(text)
    except ValueError:
        return False
    return 0 <= age <= 120

print(valid_age("16"), valid_age("abc"), valid_age("121"))''',
'''FUNCTION ValidAge(text)
    IF NOT CAN_CONVERT_TO_INTEGER(text) THEN
        RETURN FALSE
    END IF
    age = INTEGER(text)
    RETURN age >= 0 AND age <= 120
END ValidAge
OUTPUT ValidAge("16"), ValidAge("abc"), ValidAge("121")''','True False False',
'CAN_CONVERT_TO_INTEGER is a declared helper matching Python int(text), not a universal pseudocode built-in. Catch ValueError rather than hiding every error with a bare except.',
'Test -1, 0, 120, 121 and an empty string.','False, True, True, False, False. These include both boundaries and invalid-format cases.')
topic('files','Text files: write, read and close','unit3-fluency',
'Use with open(path, mode, encoding="utf-8") so the file closes even after an error. Modes r, w and a mean read, overwrite and append. This example creates scores.txt in the working folder; use a fresh folder when running it.',
'''with open("scores.txt", "w", encoding="utf-8") as file:
    file.write("5\\n7\\n")
total = 0
with open("scores.txt", "r", encoding="utf-8") as file:
    for line in file:
        total += int(line.strip())
print(total)''',
'''OPEN "scores.txt" FOR WRITE AS file
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
OUTPUT total''','12',
'w replaces existing content. Relative paths use the working directory, which may differ from the script folder. Blank or malformed lines need a stated reject/skip policy; missing files raise FileNotFoundError.',
'Which mode preserves earlier content while adding new lines?','a (append). Add newline characters explicitly when using write().')
topic('csv','CSV records and structured file data','unit3-fluency',
'Use Python’s csv module for comma-separated data; splitting on commas fails for quoted fields containing commas. DictReader uses the first row as field names. Convert numeric fields before arithmetic.',
'''import csv
import io

data = io.StringIO('name,score\\n"Lee, Sam",8\\nAri,6\\n')
total = 0
for record in csv.DictReader(data):
    total += int(record["score"])
print(total)''',
'''// READ_CSV parses quotes and returns records using header names.
records = READ_CSV('name,score\\n"Lee, Sam",8\\nAri,6\\n')
total = 0
FOR record IN records
    total = total + INTEGER(record["score"])
END FOR
OUTPUT total''','14',
'READ_CSV is a declared parsing helper. For a real file, use open("results.csv", newline="", encoding="utf-8"). Handle missing headers, invalid numbers and missing files deliberately.',
'Why is the comma in Lee, Sam not a field separator?','The field is enclosed in CSV double quotes, so a CSV parser treats it as one name.')
topic('linear-search','Linear search','unit3-search',
'Check items in sequence. This function returns the first matching zero-based index, or -1 if absent. It works on unsorted data and returns -1 for an empty list.',
'''def linear_search(values, target):
    for index in range(len(values)):
        if values[index] == target:
            return index
    return -1

print(linear_search([8, 3, 8], 8))
print(linear_search([], 8))''',
'''FUNCTION LinearSearch(values, target)
    FOR index = 0 TO values.length - 1
        IF values[index] == target THEN
            RETURN index
        END IF
    END FOR
    RETURN -1
END LinearSearch
OUTPUT LinearSearch([8, 3, 8], 8)
OUTPUT LinearSearch([], 8)''','0\n-1',
'Do not return -1 inside the loop after the first mismatch. -1 is a failure marker here; never use it as an index without checking, because Python values[-1] is valid.',
'What is returned when searching [4, 2, 9] for 9?','2; up to three comparisons are required. Worst-case time is O(n).')
topic('binary-search','Binary search','unit3-search',
'Requires ascending sorted data. Maintain an inclusive low/high interval and discard half after each comparison. Returns a matching index or -1. With duplicates it does not promise the first match.',
'''def binary_search(values, target):
    low = 0
    high = len(values) - 1
    while low <= high:
        middle = (low + high) // 2
        if values[middle] == target:
            return middle
        if values[middle] < target:
            low = middle + 1
        else:
            high = middle - 1
    return -1

print(binary_search([2, 4, 6, 8, 10], 8))
print(binary_search([], 8))''',
'''FUNCTION BinarySearch(values, target)
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
OUTPUT BinarySearch([], 8)''','3\n-1',
'Using / makes a float index in Python. Updating low = middle can stall. Sorting first has its own cost and can change original positions.',
'Trace the example search for 8.','middle 2 gives 6; low becomes 3. middle 3 gives 8; return 3. Worst-case search time O(log n).')
topic('bubble-sort','Bubble sort','unit3-sort',
'Compare adjacent items and swap out-of-order pairs. This implementation sorts the supplied list in place, ascending, and returns it. Each pass fixes the largest remaining item at the right.',
'''def bubble_sort(values):
    for end in range(len(values) - 1, 0, -1):
        swapped = False
        for index in range(end):
            if values[index] > values[index + 1]:
                values[index], values[index + 1] = values[index + 1], values[index]
                swapped = True
        if not swapped:
            break
    return values

print(bubble_sort([3, 1, 2, 1]))''',
'''FUNCTION BubbleSort(values)
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
OUTPUT BubbleSort([3, 1, 2, 1])''','[1, 1, 2, 3]',
'Without a temporary value or simultaneous Python assignment, a swap can lose an item. This early-exit version has best-case O(n), worst-case O(n²).',
'What does the first pass do to [3, 1, 2]?','[1, 2, 3]; 3 reaches its final position.')
topic('insertion-sort','Insertion sort','unit3-sort',
'Grow a sorted prefix. Save the current item, shift larger prefix items right, then insert it. Sorts and returns the supplied list in place; handles duplicates and empty input.',
'''def insertion_sort(values):
    for index in range(1, len(values)):
        current = values[index]
        position = index - 1
        while position >= 0 and values[position] > current:
            values[position + 1] = values[position]
            position -= 1
        values[position + 1] = current
    return values

print(insertion_sort([4, 2, 3, 2]))''',
'''FUNCTION InsertionSort(values)
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
OUTPUT InsertionSort([4, 2, 3, 2])''','[2, 2, 3, 4]',
'Test position >= 0 before indexing. Save current before shifting overwrites its original slot. Best-case O(n), worst-case O(n²).',
'After inserting the second item of [4, 2, 3], what is the list?','[2, 4, 3]; only the prefix is guaranteed sorted at that stage.')
topic('objects','Classes, constructors, attributes and methods','unit3-objects',
'A class defines attributes and behaviour; an instance is an object created from it. __init__ initialises instance state. self refers to the receiving instance. Pseudocode class notation is defined here for clarity.',
'''class Item:
    def __init__(self, name):
        self.name = name
        self.available = True

    def lend(self):
        if not self.available:
            return False
        self.available = False
        return True

item = Item("Camera")
print(item.name, item.lend(), item.lend())''',
'''CLASS Item
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
OUTPUT item.name, item.Lend(), item.Lend()''','Camera True False',
'Use instance attributes for individual state; a mutable class attribute is shared. Python convention _name signals non-public use but does not enforce access control.',
'Why does the second lend call return False?','The first call changed the same object’s available attribute to False.')
topic('inheritance','Inheritance and method overriding','unit3-inheritance',
'A subclass can reuse and specialise a base class. Overriding provides different behaviour behind the same method interface. Use inheritance for an is-a relationship rather than merely to share unrelated code.',
'''class Resource:
    def label(self):
        return "Resource"

class Book(Resource):
    def label(self):
        return "Book"

resources = [Resource(), Book()]
for resource in resources:
    print(resource.label())''',
'''CLASS Resource
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
END FOR''','Resource\nBook',
'The method is selected from the actual object. super().__init__(...) calls base initialisation when a subclass defines its own constructor. Composition expresses has-a relationships.',
'What demonstrates polymorphism here?','The same resource.label() call produces behaviour appropriate to each object type.')
topic('testing','Trace tables, assertions and test cases','testing',
'Trace variable changes by statement or iteration. Use normal, boundary and invalid cases with expected results. assert is useful for developer checks, not input validation: assertions can be disabled.',
'''def delivery(total):
    if total < 0:
        raise ValueError("Negative total")
    return 0 if total >= 50 else 5

assert delivery(49) == 5
assert delivery(50) == 0
try:
    delivery(-1)
except ValueError:
    print("Invalid rejected")
print("Checks passed")''',
'''FUNCTION Delivery(total)
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
OUTPUT "Checks passed"''','Invalid rejected\nChecks passed',
'A syntax error stops parsing; a runtime exception occurs during execution; a logic error can give a plausible but incorrect result. Passing a few examples is not proof of correctness.',
'Which extra boundary case would you add?','51 verifies behaviour just above 50; also test 0 as the minimum permitted total. Record expected outputs before running.')
topic('modules','Imports, standard-library helpers and main guards','functions',
'import module binds a module name; module.function(...) calls its function. Keep reusable definitions separate from the program entry point. The main guard runs only when a file is executed directly.',
'''import math

def distance(x, y):
    return math.sqrt(x * x + y * y)

if __name__ == "__main__":
    print(distance(3, 4))''',
'''FUNCTION Distance(x, y)
    RETURN SQRT(x * x + y * y)
END Distance
// Main program
OUTPUT Distance(3, 4)''','5.0',
'Do not name your own file math.py or csv.py; it can shadow a standard-library module. Python implementation details such as the main guard need not be copied into a language-independent algorithm.',
'What happens to the guarded print when this file is imported?','It does not execute; distance is available to the importing module.')
topic('extensions','Concise Python: comprehensions, tuples and sets','unit3-structures',
'These optional Python idioms can shorten implementations after explicit loops are understood. A tuple is an immutable sequence; a set stores unique hashable values. A comprehension constructs a new collection.',
'''squares = [number * number for number in range(4)]
point = (2, 3)
unique = set([3, 1, 3])
print(squares)
print(point[0], len(unique))''',
'''// Explicit equivalent: no comprehension syntax is assumed.
squares = []
FOR number = 0 TO 3
    squares.append(number * number)
END FOR
point = [2, 3]
unique = UNIQUE_VALUES([3, 1, 3])
OUTPUT squares
OUTPUT point[0], unique.length''','[0, 1, 4, 9]\n2 2',
'Sets have no positional index and no promised display order. A tuple can contain mutable objects even though its own element bindings cannot be reassigned. This is optional idiom support, not an extra syllabus requirement.',
'Rewrite the squares comprehension using an ordinary loop.','Initialise squares = []; loop over range(4); append number * number.',level='Extension · optional idioms')

topic('selection-sort','Selection sort','unit3-sort',
'Find the smallest item in the unsorted suffix and swap it into the next prefix position. This implementation sorts the supplied list in place and returns it. It makes n(n−1)/2 key comparisons, even for already sorted input.',
'''def selection_sort(values):
    for start in range(len(values) - 1):
        smallest = start
        for index in range(start + 1, len(values)):
            if values[index] < values[smallest]:
                smallest = index
        values[start], values[smallest] = values[smallest], values[start]
    return values

print(selection_sort([3, 1, 2, 1]))''',
'''FUNCTION SelectionSort(values)
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
OUTPUT SelectionSort([3, 1, 2, 1])''','[1, 1, 2, 3]',
'Save an index for smallest, not just its value. This swapping implementation is not stable: equal-key records may change relative order. Best and worst time are O(n²).',
'How many key comparisons does four-item selection sort make?','3 + 2 + 1 = 6, irrespective of the initial order.')
# Keep the three sorts adjacent, before objects and optional idioms.
topics.insert(next(i for i,t in enumerate(topics) if t['id']=='objects'),topics.pop())
for t in topics:
    t['chapter']={'testing':'design'}.get(t['chapter'],t['chapter'])
    if t['id'] in ['files','csv']:
        t['chapter']='files'

e=lambda s:html.escape(str(s),quote=True)
syntax=[
 ('Assignment','name = expression','name = expression'),
 ('Equality / inequality','a == b / a != b','a == b / a != b'),
 ('Logic','and / or / not','AND / OR / NOT'),
 ('Arithmetic','+ - * / // % **','+ - * / DIV MOD ^'),
 ('Text literals','"text" or \'text\'','"text" or \'text\''),
 ('Boolean / missing value','True / False / None','TRUE / FALSE / NULL'),
 ('Input','text = input("Prompt: ")','INPUT text'),
 ('Output','print(value)','OUTPUT value'),
 ('Conversion','int(text), float(text), str(value)','INTEGER(text), REAL(text), STRING(value)'),
 ('Selection','if condition: … elif condition: … else: …','IF condition THEN … ELSE IF … ELSE … END IF'),
 ('Counted loop','for i in range(start, stop, step): …','FOR i = start TO end STEP step … END FOR'),
 ('Item loop','for value in values: …','FOR value IN values … END FOR'),
 ('Pre-test loop','while condition: …','WHILE condition … END WHILE'),
 ('Post-test loop','while True: …; if condition: break','REPEAT … UNTIL condition'),
 ('Function','def name(parameter): … return result','FUNCTION Name(parameter) … RETURN result … END Name'),
 ('List / indexing','values = [1, 2]; values[0]','values = [1, 2]; values[0]'),
 ('Length / append','len(values); values.append(item)','values.length; values.append(item)'),
 ('String slice','text[start:stop]','SUBSTRING(text, start, length)'),
 ('Dictionary','lookup = {"ID": 2}; lookup["ID"]','lookup = {"ID": 2}; lookup["ID"]'),
 ('Error handling','try: … except ValueError: …','IF conversion is valid THEN … ELSE … END IF'),
 ('Class / object','class Item: …; item = Item(...)','CLASS Item … END CLASS; item = NEW Item(...)'),
 ('Comments','# explanation','// explanation'),
]
def syntax_table(language):
    column=1 if language=='python' else 2
    return '<section id="syntax"><h2>Quick syntax lookup</h2><p>Ellipses indicate a body to supply, not complete runnable code. See the full entries for indentation, block endings and contracts. The Python examples below are complete files.</p><div class="table-scroll" tabindex="0" role="region" aria-label="Syntax lookup table"><table><thead><tr><th scope="col">Purpose</th><th scope="col">Form</th></tr></thead><tbody>'+''.join('<tr><th scope="row">'+e(row[0])+'</th><td><code>'+e(row[column])+'</code></td></tr>' for row in syntax)+'</tbody></table></div></section>'
css='''body{margin:0;background:#f6f7f2;color:#182e25;font:18px/1.65 system-ui,sans-serif}header,main,footer{max-width:1140px;margin:auto;padding:24px}header nav,.actions{display:flex;flex-wrap:wrap;gap:18px}a{color:#17583b;text-underline-offset:3px}a:focus-visible,button:focus-visible,summary:focus-visible{outline:3px solid #8b4300;outline-offset:4px}h1{font-size:clamp(2.3rem,5vw,4rem);line-height:1.15}h2{line-height:1.3}main{display:grid;grid-template-columns:240px minmax(0,1fr);gap:32px}.intro{grid-column:1/-1}.contents{position:sticky;top:12px;align-self:start;max-height:85vh;overflow:auto;padding:8px}.contents a{display:block;padding:5px}.entry{background:white;border:1px solid #a8b8ac;border-radius:12px;padding:24px;margin-bottom:28px;scroll-margin-top:16px;min-width:0}.badge{font-size:.85rem;font-weight:bold;color:#304f40}pre{background:#122a22;color:#f2f7f0;padding:18px;overflow:auto;font-size:.92rem;line-height:1.6;border-radius:6px}button,.button{background:#17583b;color:white;border:2px solid #17583b;border-radius:5px;padding:10px 16px;font:inherit;cursor:pointer}details{border-top:1px solid #a8b8ac;padding-top:10px}summary{cursor:pointer;font-weight:bold;padding:8px}.skip{position:absolute;left:-9999px}.skip:focus{left:12px;top:12px;background:white;padding:12px;z-index:2}table{border-collapse:collapse;width:100%}td,th{text-align:left;border:1px solid #a8b8ac;padding:10px}.table-scroll{overflow:auto}code{overflow-wrap:anywhere}pre code{overflow-wrap:normal}footer{font-size:.9rem}@media(max-width:760px){main{display:block}header,main,footer{padding:16px}.contents{position:static;max-height:none}.entry{padding:16px}}@media print{body{background:white;color:black;font-size:10pt}header,.contents,.actions,.crosslink,.skip,button{display:none!important}main{display:block;padding:0;max-width:none}.entry{border:0;padding:0;margin-bottom:24px}pre{white-space:pre-wrap;overflow:visible;background:#f2f2f2;color:black;border:1px solid #aaa;font-size:9pt}h2,h3{break-after:avoid}pre,details{break-inside:avoid}a{color:black}footer{padding:0}}'''
(OUT/'reference.css').write_text(css,encoding='utf-8',newline='\n')
(OUT/'reference.js').write_text('''document.querySelectorAll('[data-print]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('details.answer').forEach(d=>{d.dataset.wasOpen=d.open?'yes':'no';d.open=true;});window.print();}));window.addEventListener('afterprint',()=>document.querySelectorAll('details.answer[data-was-open]').forEach(d=>{d.open=d.dataset.wasOpen==='yes';delete d.dataset.wasOpen;}));''',encoding='utf-8',newline='\n')
source='https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0003/1090875/Year-11_12_Computer-Science_ATAR_Additional-syllabus-support-booklet-.PDF'
def shell(title,content,nav=''):
    return f'''<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Python and pseudocode syntax, worked implementations, expected results and explained practice for WA Computer Science ATAR."><title>{e(title)} · CS ATAR</title><link rel="stylesheet" href="reference.css"></head><body><a class="skip" href="#main">Skip to reference</a><header><a href="../#home">← Textbook home</a><nav aria-label="Programming references"><a href="index.html">Reference hub</a><a href="python.html">Python guide</a><a href="pseudocode.html">Pseudocode guide</a><a href="../resources/">Lesson resources</a></nav></header><main id="main" tabindex="-1">{content}</main><footer>2026 foundation · 2027 revisions · Original examples; classroom reference, not an official examination specification. <a href="../licence.html">Reuse and attribution</a>. <a href="{source}">SCSA support booklet</a> · <a href="https://docs.python.org/3/tutorial/">Python documentation</a>.</footer><script src="reference.js"></script></body></html>'''
conventions='''<section id="conventions"><h2>Conventions used throughout</h2><p>Zero-based indexing; inclusive FOR … TO endpoints; a loop with a positive step and start greater than end executes zero times. AND and OR short-circuit from left to right. DIV floors; MOD is the corresponding remainder. Assignment is = and equality is ==. NULL means no value. ^ means exponentiation in pseudocode, while Python uses **.</p><p>.length, .append, .keys, INTEGER, TRIM, SUBSTRING, SPLIT, JOIN, READ_CSV and UNIQUE_VALUES are declared abstract operations, not a universal language library. SUBSTRING takes a start index and a length. FOR value IN collection visits each item. RETURN ends a function. ASSERT checks a test expectation; TRY/CATCH handles a signalled error. Procedures perform actions. Text literals may use single or double quotes; \"\\n\" represents a newline in CSV text. Class notation uses self for the current object. INPUT obtains a value; OUTPUT displays values separated for readability.</p><p>SCSA does not mandate one pseudocode grammar. Follow any conventions supplied in a question and keep your own notation consistent. Python output shown below is a deterministic check for the paired algorithm; pseudocode Boolean/list display formatting can differ without changing the values.</p></section>'''
for language,title,other in [('python','Python programming reference','pseudocode'),('pseudo','Pseudocode programming reference','python')]:
    filename='pseudocode' if language=='pseudo' else language
    intro=f'''<div class="intro"><p class="badge">PROGRAMMING DESK REFERENCE · YEARS 11–12</p><h1>{title}</h1><p>Start with the first sections, then use this guide beside a lesson. Each entry gives a worked implementation, expected result, a common mistake and practice with an explained answer. This is an ATAR-focused reference, not an exhaustive catalogue of every Python feature.</p><div class="actions"><a href="{other}.html">Open the matching {other} guide</a><button type="button" data-print>Print / save PDF with answers</button><a href="{'python-examples.zip' if language=='python' else 'pseudocode-reference.md'}" download>Download {'all runnable examples (ZIP)' if language=='python' else 'pseudocode guide (Markdown)'}</a></div><p>No drones, VR or specialist equipment required. Trace on paper, or run Python examples in an installed Python 3 interpreter. Extract the ZIP and read README.txt first. Browser reading and printing work offline when saved with the complete library.</p><p><strong>Scope labels:</strong> “Course support” explains the textbook’s programming strand; it does not mean every Python convenience shown is separately prescribed. “Extension” identifies optional idioms. Consult the <a href="../curriculum/">item-level curriculum map</a> for actual syllabus requirements.</p>{conventions if language=='pseudo' else '<p>Python blocks use indentation and colons, not END keywords. Examples use standard-library Python 3 features and no third-party packages. Compare each entry with its pseudocode counterpart using the link below it.</p>'}</div>'''
    contents='<nav class="contents" aria-label="Reference topics"><h2>Find syntax</h2><a href="#syntax">Quick syntax lookup</a>'+''.join(f'<a href="#{t["id"]}">{e(t["title"])}</a>' for t in topics)+'</nav>'
    entries=syntax_table(language)
    for t in topics:
        entries+=f'''<article class="entry" id="{t['id']}"><p class="badge">{e(t['level'])}</p><h2>{e(t['title'])}</h2><p>{e(t['explanation'])}</p><h3>Worked implementation</h3><pre tabindex="0" aria-label="{e(t['title'])} code"><code>{e(t[language])}</code></pre><h3>Expected {'Python output' if language=='pseudo' else 'output'}</h3><pre tabindex="0" aria-label="Expected output"><code>{e(t['expected'])}</code></pre><p><strong>Watch for:</strong> {e(t['pitfall'])}</p><h3>Independent practice</h3><p>{e(t['practice'])}</p><details class="answer"><summary>Check your reasoning</summary><p>{e(t['answer'])}</p></details><p class="crosslink"><a href="{other}.html#{t['id']}">Compare the {other} implementation</a> · <a href="../#{t['chapter']}">Return to the textbook</a>{' · <a href="examples/reference-'+t['id']+'.py" download>Download this Python file</a>' if language=='python' else ''}</p></article>'''
    (OUT/(filename+'.html')).write_text(shell(title,intro+contents+'<div>'+entries+'</div>'),encoding='utf-8',newline='\n')

hub='''<div class="intro"><p class="badge">READ · IMPLEMENT · CHECK · TRANSLATE</p><h1>Programming reference guides</h1><p>Two separate guides, with matching topics and examples. Use Python to implement and test; use pseudocode to express and trace an algorithm clearly.</p><p><a class="button" href="python.html">Python syntax and implementations</a></p><p><a class="button" href="pseudocode.html">Pseudocode syntax and implementations</a></p><h2>Choose your next step</h2><ol><li>Begin with structure, variables, input and operators.</li><li>Build decisions, loops, validation and reusable functions.</li><li>Process lists, grids, dictionaries and files.</li><li>Implement and trace searches, sorts, classes and inheritance.</li><li>Use expected outputs, boundary cases and explained practice to check your work.</li></ol><p>The two guides share stable topic anchors so you can switch language at the same topic. All answers are public learning support.</p><h2>Downloads and offline use</h2><ul><li><a href="python-examples.zip" download>Runnable Python examples (ZIP)</a> — extract, then open README.txt; files are numbered by topic in this guide.</li><li><a href="pseudocode-reference.md" download>Pseudocode reference (Markdown)</a> — plain text, including conventions and explained answers.</li><li><a href="../offline/">Complete offline library</a> — both web guides and their downloads, keeping local navigation intact.</li></ul><p>Use Print / save PDF in either guide for a full copy including answers. No account or specialist equipment is required.</p><h2>Scope and sources</h2><p>2026 foundation with 2027 revisions. Course-support examples complement the <a href="../curriculum/">curriculum map</a>; optional Python idioms are marked as extension. Pseudocode is an explicitly defined notation, informed by the SCSA support booklet, rather than an official compulsory grammar. The Python guide covers the programming strand used here, not every feature of the language.</p></div>'''
(OUT/'index.html').write_text(shell('Programming reference guides',hub),encoding='utf-8',newline='\n')
(OUT/'topics.json').write_text(json.dumps(topics,indent=2)+'\n',encoding='utf-8',newline='\n')
examples=OUT/'examples'; examples.mkdir(exist_ok=True)
import zipfile
with zipfile.ZipFile(OUT/'python-examples.zip','w',zipfile.ZIP_DEFLATED) as z:
    z.writestr('README.txt','Python reference examples\nUse an installed Python 3 interpreter. No extra packages.\nRun each file separately: python 01-structure.py\nExpected results and explanations are in the web guides.\nThe files example writes/overwrites scores.txt in the working folder: run it in a fresh practice folder. All other examples use supplied fixtures; input and repeat-until examples simulate keyboard entries.\nOriginal code MIT; see textbook licence.\n')
    for n,t in enumerate(topics,1):
        content='# '+t['title']+'\n# Expected output:\n'+''.join('# '+line+'\n' for line in t['expected'].splitlines())+t['python']+'\n'
        (examples/('reference-'+t['id']+'.py')).write_text(content,encoding='utf-8',newline='\n')
        z.writestr(f'{n:02}-{t["id"]}.py',content)
markdown='# Pseudocode programming reference\n\n2026 foundation · 2027 revisions. Original examples.\n\n'+ __import__('re').sub('<[^>]+>','',conventions.replace('</p>','\n\n').replace('</h2>','\n\n'))+'\n\n'
for t in topics:
    markdown+=f'## {t["title"]}\n\n{t["level"]}\n\n{t["explanation"]}\n\n```text\n{t["pseudo"]}\n```\n\nExpected values (Python formatting):\n```text\n{t["expected"]}\n```\n\nWatch for: {t["pitfall"]}\n\nPractice: {t["practice"]}\n\nExplained answer: {t["answer"]}\n\n'
markdown+='Sources: '+source+'\nhttps://docs.python.org/3/tutorial/\nOriginal text CC BY 4.0; original code MIT.\n'
(OUT/'pseudocode-reference.md').write_text(markdown,encoding='utf-8',newline='\n')
print(f'Built paired programming references: {len(topics)} topics each.')
