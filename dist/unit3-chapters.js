chapters.push({
  "id": "unit3-fluency",
  "unit": 3,
  "week": 1,
  "title": "Rebuilding Python fluency",
  "badge": "PYTHON 3 / DIAGNOSTIC",
  "intro": "Find what needs repair, explain the fix and prove it with a fresh test. Rebuild the programming habits needed for Year 12 before moving to richer data structures.",
  "objectives": [
    "Trace selection, iteration and function results.",
    "Validate input and test empty/duplicate/boundary cases.",
    "Isolate syntax, runtime and logic faults methodically.",
    "Compare linear and iterative development choices.",
    "Record useful versions and demonstrate restoration."
  ],
  "sections": [
    [
      "Use diagnosis to choose practice",
      "<p>Year 12 builds on the earlier units. Start with an independent 20-minute diagnostic before running code or looking at answers. Record item-level errors and confidence; the 16-mark total is a guide to practice, not an automatic grade or readiness cutoff.</p><p><a class=\"button\" href=\"unit3-diagnostic.md\" download>Download diagnostic</a> <a class=\"button secondary\" href=\"unit3-fluency-answers.md\" download>Separate answers</a></p><p>The new scenario counts synthetic observations meeting a threshold. It revisits types, comparisons, loops, functions, files and tests before richer structures are introduced.</p>"
    ],
    [
      "Choose and trace loop forms",
      "<p>A fixed loop has an agreed iteration count; a pre-test loop checks before its body and may run zero times; a post-test loop checks after its body and runs at least once. Python has no dedicated do/while statement: an unconditional loop with a condition and break after the body models the post-test behaviour.</p><pre><code># Fixed count: zero iterations when n == 0\nfor i in range(n):\n    print(i)\n\n# Pre-test: may execute zero times\nremaining = n\nwhile remaining &gt; 0:\n    remaining -= 1\n\n# Post-test equivalent: body executes at least once\nattempts = 0\nwhile True:\n    attempts += 1\n    if attempts &gt;= n:\n        break</code></pre><p>Trace n=0 and n=3. The fixed/pre-test forms execute 0/0 or 3/3 bodies; the post-test form executes 1 or 3. Do not move its test above the body if the requirement says “ask at least once”. In illustrative pseudocode, REPEAT body UNTIL finished terminates when finished is true; WHILE condition continues while condition is true. Keep termination polarity explicit. Formal SCSA syntax verification remains separate.</p>"
    ],
    [
      "Retrieve types, operators and Boolean precedence",
      "<p>Choose an integer for a count, a float for an approximate measured quantity, a string for an identifier with meaningful leading zeros, and a Boolean for a true/false state. Python float uses finite binary precision; do not assume every decimal is represented exactly. Converting \"007\" to an integer loses its formatting; input text \"False\" is nonempty and therefore truthy, so parse agreed tokens rather than using bool(text).</p><pre><code>7 / 2       # 3.5\n7 // 2      # 3 (extra Python floor-division operator)\n7 % 2       # 1\n&quot;7&quot; + &quot;2&quot;   # &quot;72&quot;\n7 &gt;= 7      # True\n\n# Python Boolean precedence: not, then and, then or\nallowed = not blocked and trained or supervisor\nstrict = not blocked and (trained or supervisor)</code></pre><p>Arithmetic precedes comparisons; comparisons precede not/and/or. Parentheses make the intended grouping visible. With blocked=True, trained=False and supervisor=True, allowed is True but strict is False. In the first expression supervisor overrides the blocked condition; in the second, a blocked person is never allowed. Test all eight Boolean combinations before selecting the expression for the requirement. Python and/or can return operands rather than always bool; these examples deliberately use Boolean inputs.</p><p><a href=\"unit3-foundations-workbook.md\" download>Foundation repair workbook</a> · <a href=\"unit3-foundations-answers.md\" download>Explained answers</a> · <a href=\"unit3-foundations-reference.py\" download>Offline reference</a>. Embed these targeted retrieval tasks in the existing week 1 diagnosis/repair lessons; choose from the earlier tasks rather than adding lessons.</p>"
    ],
    [
      "State the contract before writing code",
      "<p>Count every observation <strong>at least</strong> the supplied minimum. Equality counts; repeated values are separate observations; an empty list returns zero. For the counting function, values and minimum are assumed non-negative integers. Convert/validate input separately.</p><p>Example: [3, 5, 0, 8], minimum 5, returns 2. Compare [4, 5, 6] at minimum 5: two qualify. A strict-greater requirement would instead give one. Translate the wording before choosing the operator.</p><pre><code>count = 0\nFOR EACH value IN values\n    IF value &gt;= minimum THEN\n        count = count + 1\n    END IF\nEND FOR\nRETURN count</code></pre>"
    ],
    [
      "Trace and isolate faults",
      "<p>For [3, 5, 0, 8] at minimum 5, count progresses 0 → 1 → 1 → 2. The accumulator starts at zero and changes only for qualifying values.</p><p>A strict &gt; condition is a logic error for this contract. Indexing values[i] using range(len(values)+1) eventually uses index len(values), causing IndexError. Repair one fault at a time, compare actual with expected output and test the boundary again.</p><p>A missing colon or incorrect indentation can prevent parsing; a conversion or indexing error happens during execution; a plausible wrong count may run without an exception. Use traces, breakpoints or carefully placed diagnostic output to isolate the cause.</p>"
    ],
    [
      "Separate validation, processing and display",
      "<p>Input supplies text. int converts suitable integer text; int(\"5.0\") raises ValueError. Range checking then rejects negatives. Our parser returns an integer or None; 0 is valid, so reject using <code>value is None</code>, not <code>not value</code>.</p><p>The counting function returns a result; the mainline displays it. A local parameter name does not automatically reassign a caller variable. Detailed parameter behaviour and mutable structures follow next week.</p><p>Use the separate unfinished scaffold before reading the solution. A NotImplementedError marks a deliberate stub, not a completed function.</p>"
    ],
    [
      "Compare development processes",
      "<p>A linear process moves through planned stages; stable requirements can support clear checkpoints, while late changes can require expensive rework. An iterative process revisits a solution through feedback; it helps refine uncertain needs, but needs priorities and version discipline. Neither removes the need for requirements, design, testing or evaluation.</p><p>Apply investigate → design → develop → evaluate to the counter. Then an organiser changes “at least” to “strictly greater”. Record the changed criterion, algorithm, boundary tests and version. Compare how each process accommodates that change; do not claim every project needs the same process.</p>"
    ],
    [
      "Preserve versions and prove recovery",
      "<p>Keep meaningful known-good versions with a short record of requirement, change and passing tests. Version control tracks history; a backup provides another recoverable copy. Copies kept only on the same disk do not protect against losing that disk.</p><p>Use your school-approved storage and workflow. Restore a selected practice version into a separate folder, run its known tests and explain which requirement it implements. Preserve current work. A backup file’s presence does not prove that recovery has been checked.</p><p>Text-file revision: w creates/truncates, a appends. Check paths and existing work before writing. Detailed file operations are in the <a href=\"#files\">Unit 1 files chapter</a>.</p>"
    ],
    [
      "Complete the repair and transfer pack",
      "<p><a href=\"unit3-fluency-workbook.md\" download>Workbook</a> · <a href=\"unit3-fluency-starter.py\" download>Unfinished Python scaffold</a> · <a href=\"unit3-fluency-solution.py\" download>Separate worked solution</a> · <a href=\"unit3-repair-log.csv\" download>Repair log</a> · <a href=\"unit3-fluency-pack.zip\" download>Complete pack</a></p><p>Demonstrate ordinary, empty, duplicate, zero and boundary cases; separate invalid input text from valid processing inputs. Make a fresh requirement change and explain the retest.</p><p>Four lessons total. This is prerequisite repair and an introduction to maintenance/development choices, not complete Unit 3 coverage. Next: two-dimensional arrays and dictionaries, with more detailed function/parameter behaviour.</p>"
    ]
  ],
  "code": "\"\"\"Unit 3 Week 1: non-negative integer input and threshold counting.\ncount_at_least assumes values and minimum are non-negative integers.\nThe functions do not change the input list. Python 3; no extra packages.\n\"\"\"\n\ndef parse_non_negative_integer(text):\n    \"\"\"Return a non-negative int or None; text comes from input().\"\"\"\n    try:\n        value = int(text)\n    except ValueError:\n        return None\n    if value < 0:\n        return None\n    return value\n\n\ndef count_at_least(values, minimum):\n    \"\"\"Count every value >= minimum, including duplicates and the boundary.\"\"\"\n    count = 0\n    for value in values:\n        if value >= minimum:\n            count += 1\n    return count\n\n\ndef main():\n    values = [3, 5, 0, 8]\n    minimum = 5\n    print(f\"At least {minimum}: {count_at_least(values, minimum)}\")\n    for text in [\"0\", \"5\", \"-1\", \"five\", \"5.0\"]:\n        value = parse_non_negative_integer(text)\n        if value is None:\n            print(f\"{text!r}: rejected\")\n        else:\n            print(f\"{text!r}: accepted {value}\")\n\n\nif __name__ == \"__main__\":\n    main()\n",
  "solution": "\"\"\"Unit 3 Week 1: non-negative integer input and threshold counting.\ncount_at_least assumes values and minimum are non-negative integers.\nThe functions do not change the input list. Python 3; no extra packages.\n\"\"\"\n\ndef parse_non_negative_integer(text):\n    \"\"\"Return a non-negative int or None; text comes from input().\"\"\"\n    try:\n        value = int(text)\n    except ValueError:\n        return None\n    if value < 0:\n        return None\n    return value\n\n\ndef count_at_least(values, minimum):\n    \"\"\"Count every value >= minimum, including duplicates and the boundary.\"\"\"\n    count = 0\n    for value in values:\n        if value >= minimum:\n            count += 1\n    return count\n\n\ndef main():\n    values = [3, 5, 0, 8]\n    minimum = 5\n    print(f\"At least {minimum}: {count_at_least(values, minimum)}\")\n    for text in [\"0\", \"5\", \"-1\", \"five\", \"5.0\"]:\n        value = parse_non_negative_integer(text)\n        if value is None:\n            print(f\"{text!r}: rejected\")\n        else:\n            print(f\"{text!r}: accepted {value}\")\n\n\nif __name__ == \"__main__\":\n    main()\n",
  "practice": [
    [
      "Trace",
      "What count is returned for [5,5] at minimum 5?",
      "Two. Duplicate observations are separate values, and both meet equality."
    ],
    [
      "Validate",
      "Why is if not value wrong for this parser?",
      "Zero is falsey but valid. Use value is None to identify rejection."
    ],
    [
      "Distinguish",
      "Does returning a value automatically change an outside variable with the same name?",
      "No. A return supplies a result; the caller must use/assign it as needed."
    ],
    [
      "Recover",
      "Does a same-disk snapshot guarantee recovery after disk loss?",
      "No. Backup placement and a tested restore matter; version history and backup serve related but different purposes."
    ]
  ],
  "task": "Attempt the diagnostic, repair the scaffold, record expected/actual tests, compare development approaches, then restore and retest a known-good version. Explain one assumption and one fresh requirement change.",
  "recap": "State the contract, trace before changing code, separate validation from processing and retest the boundary. Preserve meaningful history and verify recovery. Use diagnostic evidence to choose the next practice.",
  "lessons": [
    "Lesson 1: independent diagnostic, item-level feedback and count trace.",
    "Lesson 2: targeted repairs and independent ordinary/empty/boundary/invalid-input checks.",
    "Lesson 3: linear/iterative comparison, requirement change and transfer test.",
    "Lesson 4: version record, separate restore/retest and exit explanation."
  ],
  "reference": "https://docs.python.org/3/tutorial/controlflow.html",
  "refTitle": "Python control-flow and function reference",
  "next": "#plan-3-1",
  "quiz": {
    "q": "The parser returns 0 for valid zero and None for invalid input. Which condition correctly identifies rejection?",
    "options": [
      "not value",
      "value is None",
      "value == 0"
    ],
    "answer": 1,
    "explanation": "None is the rejection sentinel. Zero is a valid value even though it is falsey."
  }
});
chapters.push({
  "id": "unit3-structures",
  "unit": 3,
  "week": 2,
  "title": "Advanced data structures",
  "badge": "PYTHON 3 / STRUCTURES",
  "intro": "Organise data by position and by key, then explain precisely what a function changes.",
  "objectives": [
    "Read, update and traverse two-dimensional arrays using nested lists.",
    "Create, update, delete and traverse dictionary entries.",
    "Explain parameter scope, mutation and rebinding in Python.",
    "Avoid aliased rows and test structure-based solutions."
  ],
  "sections": [
    [
      "Choose the structure for the question",
      "<p>A one-dimensional array holds a sequence; a two-dimensional array uses row and column positions. In Python we model these with lists and lists of lists: they are dynamic collections, rather than a fixed-size typed array. A dictionary maps unique keys to values. Choose by the operations you need: positional traversal or lookup by a meaningful key.</p><p>Our synthetic workshop grid has two workshop rows and three day columns. A dictionary will label the totals. These structures are in-memory data, not relational tables with enforced foreign keys.</p>"
    ],
    [
      "Read and update a two-dimensional grid",
      "<pre><code>bookings = [[2, 0, 1], [0, 4, 0]]\nprint(bookings[1][1])  # 4\nbookings[0][2] = 3</code></pre><p>Indexes start at zero. The first index selects a row; the second selects a cell in that row. Two rows have indexes 0–1; three columns have indexes 0–2. Python permits negative indexes, but the booking interface deliberately rejects them. Lists of lists can be ragged; our grid contract requires equal row lengths.</p><table><tr><th>Workshop / row</th><th>Day 0</th><th>Day 1</th><th>Day 2</th></tr><tr><td>Python / 0</td><td>2</td><td>0</td><td>1</td></tr><tr><td>Robotics / 1</td><td>0</td><td>4</td><td>0</td></tr></table>"
    ],
    [
      "Traverse rows and columns",
      "<pre><code>totals = []\nfor row in bookings:\n    total = 0\n    for value in row:\n        total = total + value\n    totals.append(total)</code></pre><p>Reset the accumulator inside the outer loop so each row gets its own total. The original grid produces [3, 4]. To total day 1, traverse each row and add row[1]: 0 + 4 = 4.</p><pre><code>SET totals TO empty array\nFOR EACH row IN bookings\n    SET total TO 0\n    FOR EACH value IN row\n        SET total TO total + value\n    END FOR\n    APPEND total TO totals\nEND FOR</code></pre><p>This language-neutral pseudocode mirrors the algorithm. Follow the current SCSA support booklet when formal assessment requires specific conventions.</p>"
    ],
    [
      "Build and use a dictionary",
      "<pre><code>totals = {&quot;Python&quot;: 3, &quot;Robotics&quot;: 4}\ntotals[&quot;Python&quot;] = 5\ntotals[&quot;Networks&quot;] = 0\nfor label, total in totals.items():\n    print(label, total)\nif &quot;Security&quot; in totals:\n    print(totals[&quot;Security&quot;])\nelse:\n    print(&quot;Unknown workshop&quot;)\ndel totals[&quot;Networks&quot;]</code></pre><p>A repeated key replaces its previous value; it does not create a second entry. Keys must be hashable: strings and integers work; lists do not. Values may themselves be lists or dictionaries. A missing key accessed with square brackets raises KeyError. Use membership or get() deliberately; get(key, 0) can conceal a missing record when zero is a valid result. Dictionaries preserve insertion order, but that order is not a numeric index or an automatic sort.</p>"
    ],
    [
      "Parameters: mutation and rebinding",
      "<pre><code>def change(number, values):\n    number = number + 1\n    values.append(9)\n    values = [100]\n\ncount = 3\nitems = [1, 2]\nchange(count, items)\nprint(count)  # 3\nprint(items)  # [1, 2, 9]</code></pre><p>In the general value model, a procedure receives a copy of a value; in the reference model, it can affect the referenced caller data. Python arguments are passed by assignment: each parameter is a local name bound to the same object supplied by the caller. Integers are immutable; number + 1 creates a new integer and rebinds the local name. append changes the shared list. The later assignment values = [100] only rebinds the local parameter. It does not replace the caller’s list. Calling Python simply “all pass by reference” fails to explain this behaviour.</p><p>A local variable name can refer to an object shared outside the function. Name scope and object mutability are different ideas. Return a result and assign it explicitly when the caller should replace a value.</p><p><a href=\"https://docs.python.org/3/faq/programming.html#how-do-i-write-a-function-with-output-parameters-call-by-reference\">Python FAQ: argument passing</a>. Curriculum: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 Year 12 syllabus, Unit 3 programming</a>.</p>"
    ],
    [
      "Avoid shared rows and shallow-copy traps",
      "<pre><code>bad = [[0] * 3] * 2\nbad[0][0] = 7\nprint(bad)  # [[7, 0, 0], [7, 0, 0]]\n\ngood = []\nfor row in range(2):\n    good.append([0] * 3)\ncopy = [row[:] for row in good]\ncopy[0][0] = 7\nprint(good)  # [[0, 0, 0], [0, 0, 0]]</code></pre><p>Multiplication in bad repeats references to one inner list. Create each row independently. good[:] copies only the outer list, so inner rows remain shared. Copying each row is sufficient here because the cells are immutable numbers; deeper nested mutable objects need a different copy strategy.</p>"
    ],
    [
      "Build a small booking report",
      "<p>Use the worked functions below. The contract accepts numeric grid cells, unique string labels and integer dimensions/indexes/place counts; it does not validate arbitrary object types. book mutates its input deliberately and returns None; row_totals and labelled_totals create new results without changing the grid. Empty grids produce [] and {}. A zero-column grid is permitted, but no booking can be made into it.</p><p>Predict the output: [[2, 0, 1], [0, 4, 0]], then {'Python': 3, 'Robotics': 4}. Record expected and actual results before changing the code.</p><p><a class=\"button\" href=\"unit3-structures-pack.zip\" download>Download classroom pack</a> · <a href=\"unit3-structures-workbook.md\" download>Student workbook</a> · <a href=\"unit3-structures-answers.md\" download>Teacher answers</a>. Teacher answers are separated from the workbook, not access-protected.</p>"
    ],
    [
      "Scope and Python argument binding",
      "<pre><code>LIMIT = 5\ndef change(number, values):\n    number = number + LIMIT\n    values.append(number)\n    values = [99]\n    return number\n\nnumber = 2\nvalues = [1]\nresult = change(number, values)\nprint(number, values, result, LIMIT)</code></pre><p>Predict output: 2 [1, 7] 7 5. LIMIT is a module-level name read by the function; number and values are local parameter names. Local rebinding of number does not replace the caller’s number. append mutates the shared list object; rebinding values to a new list does not redirect the caller’s values. The caller receives the result only because it assigns the returned value.</p><p>Python passes arguments by assignment: parameter names bind to objects. This is often called object sharing. It is misleading to say that integers are passed by value but lists are passed by reference as two Python calling mechanisms. Traditional value/reference models describe copying a value versus accessing caller storage; explain the syllabus terminology while tracing Python’s actual mutation and rebinding behaviour. A local assignment normally shadows an outer name; global explicitly changes the binding scope and should not replace clear parameter/result design. Binding a name anywhere in a function normally makes it local unless declared global or nonlocal, which can cause UnboundLocalError if read before assignment.</p><p>Transfer: change values.append(number) to values = values + [number]. Now the caller’s list remains [1], because concatenation creates a new list and the local name is rebound. Write the before/after reference explanation and a fresh scalar/list/dictionary example. <a href=\"unit3-foundations-workbook.md\">Scope practice</a>. Use existing week 2 parameter/copy practice time.</p><p>Sources: <a href=\"https://docs.python.org/3/tutorial/classes.html\">Python scope and aliasing</a> and <a href=\"https://docs.python.org/3/tutorial/controlflow.html\">Python function arguments/control flow</a>.</p>"
    ],
    [
      "Convention-focused transfer",
      "<p>The SCSA guidance uses = for assignment and == for equality, with explicit block endings. Earlier illustrative algorithms focus on logic; their None/-1 contracts must be preserved when translating. Use the <a href=\"#unit3-evidence\">convention clinic and independent evidence tasks</a> for a source-checked notation exercise. The booklet does not prescribe one compulsory pseudocode grammar.</p>"
    ]
  ],
  "code": "\"\"\"Synthetic workshop bookings: independent rows and explicit mutation.\"\"\"\ndef make_grid(rows, columns):\n    if rows < 0 or columns < 0:\n        raise ValueError(\"Dimensions must be non-negative\")\n    grid = []\n    for row in range(rows):\n        grid.append([0] * columns)\n    return grid\n\ndef row_totals(grid):\n    totals = []\n    for row in grid:\n        total = 0\n        for value in row:\n            total += value\n        totals.append(total)\n    return totals\n\ndef book(grid, workshop, day, places):\n    # Contract: rectangular grid; integer indexes/places (not booleans).\n    # Bad indexes or negative places raise ValueError before mutation.\n    if not 0 <= workshop < len(grid):\n        raise ValueError(\"Unknown workshop\")\n    if not 0 <= day < len(grid[workshop]) or places < 0:\n        raise ValueError(\"Invalid day or places\")\n    grid[workshop][day] += places\n\ndef labelled_totals(grid, labels):\n    # Labels are unique strings, one per row; grid contains numbers.\n    if len(labels) != len(grid) or len(set(labels)) != len(labels):\n        raise ValueError(\"One unique label is required per row\")\n    totals = row_totals(grid)\n    report = {}\n    for index in range(len(labels)):\n        report[labels[index]] = totals[index]\n    return report\n\nif __name__ == \"__main__\":\n    bookings = make_grid(2, 3)\n    book(bookings, 0, 0, 2)\n    book(bookings, 0, 2, 1)\n    book(bookings, 1, 1, 4)\n    print(bookings)\n    print(labelled_totals(bookings, [\"Python\", \"Robotics\"]))\n",
  "solution": "\"\"\"Synthetic workshop bookings: independent rows and explicit mutation.\"\"\"\ndef make_grid(rows, columns):\n    if rows < 0 or columns < 0:\n        raise ValueError(\"Dimensions must be non-negative\")\n    grid = []\n    for row in range(rows):\n        grid.append([0] * columns)\n    return grid\n\ndef row_totals(grid):\n    totals = []\n    for row in grid:\n        total = 0\n        for value in row:\n            total += value\n        totals.append(total)\n    return totals\n\ndef book(grid, workshop, day, places):\n    # Contract: rectangular grid; integer indexes/places (not booleans).\n    # Bad indexes or negative places raise ValueError before mutation.\n    if not 0 <= workshop < len(grid):\n        raise ValueError(\"Unknown workshop\")\n    if not 0 <= day < len(grid[workshop]) or places < 0:\n        raise ValueError(\"Invalid day or places\")\n    grid[workshop][day] += places\n\ndef labelled_totals(grid, labels):\n    # Labels are unique strings, one per row; grid contains numbers.\n    if len(labels) != len(grid) or len(set(labels)) != len(labels):\n        raise ValueError(\"One unique label is required per row\")\n    totals = row_totals(grid)\n    report = {}\n    for index in range(len(labels)):\n        report[labels[index]] = totals[index]\n    return report\n\nif __name__ == \"__main__\":\n    bookings = make_grid(2, 3)\n    book(bookings, 0, 0, 2)\n    book(bookings, 0, 2, 1)\n    book(bookings, 1, 1, 4)\n    print(bookings)\n    print(labelled_totals(bookings, [\"Python\", \"Robotics\"]))\n\n\ndef day_totals(grid):\n    # Contract: rectangular grid of numbers; input is not mutated.\n    if not grid:\n        return []\n    totals = []\n    for column in range(len(grid[0])):\n        total = 0\n        for row in grid:\n            total += row[column]\n        totals.append(total)\n    return totals\n",
  "practice": [
    [
      "TRACE",
      "For [[2, 0, 1], [0, 4, 0]], what are grid[0][2] and the row totals?",
      "1 and [3, 4]. Select row 0 before column 2; reset the accumulator for each row."
    ],
    [
      "DIAGNOSE",
      "Why does [[0] * 3] * 2 change both rows after one cell assignment?",
      "Both outer entries reference the same inner list. Create a new inner list on each iteration."
    ],
    [
      "EXPLAIN",
      "A function appends to a list and then assigns its parameter to []. What does the caller see?",
      "The append remains visible in the shared list. Rebinding the local parameter does not replace the caller’s variable."
    ],
    [
      "CHOOSE",
      "A report must retrieve a workshop total by its name. Which structure fits?",
      "A dictionary keyed by workshop name; keys must be unique. An indexed grid fits the day-by-workshop counts."
    ]
  ],
  "task": "Implement the booking report from the starter. Add a day_totals function, leaving the input unchanged. Specify the rectangular-grid contract. Test an empty grid, zero columns, ordinary data, duplicate labels and invalid indexes. Explain one deliberate mutation and one rebinding.",
  "recap": "Use row/column indexes for grids and unique keys for dictionaries. Distinguish a local name from a shared object. Create independent rows, state contracts and verify side effects.",
  "lessons": [
    "Lesson 1: retrieve 1D arrays; model row/column indexes; trace nested loops; complete workbook A.",
    "Lesson 2: choose keys; create/update/delete/traverse dictionaries; diagnose missing and duplicate keys; workbook B.",
    "Lesson 3: predict mutation/rebinding; run aliasing and copy experiments; explain results; workbook C.",
    "Lesson 4: build the booking report and day totals; test edge cases; peer-review contracts and submit evidence. This is a short formative practical, not an additional major project."
  ],
  "reference": "https://docs.python.org/3/tutorial/datastructures.html",
  "refTitle": "Python data structures",
  "quiz": {
    "q": "Which statement explains why a list append inside a function remains visible to the caller?",
    "options": [
      "All local names become global.",
      "The parameter and caller name refer to the same mutable list.",
      "Assigning a new list to the parameter replaces the caller variable."
    ],
    "answer": 1,
    "explanation": "append mutates the shared list object. Assignment to the parameter would only rebind the local name."
  },
  "next": "#plan-3-2"
});
chapters.push({
  "id": "unit3-search",
  "unit": 3,
  "week": 3,
  "title": "Searching: linear and binary",
  "badge": "PYTHON 3 / ALGORITHMS",
  "intro": "Find a record, explain each step and compare how the work grows as the data grows.",
  "objectives": [
    "Implement and trace linear and binary search.",
    "State sorting, result and duplicate-handling contracts.",
    "Compare best/worst cases and Big O growth.",
    "Test boundaries and diagnose non-shrinking search intervals."
  ],
  "sections": [
    [
      "Specify what finding means",
      "<p>Search answers whether a target occurs and, here, returns its zero-based index. Our functions accept a list of integer IDs and an integer target, return None when absent, and leave the input unchanged. Linear search returns the first matching index. The binary search used here returns a matching index, which may not be the first when duplicates exist. Choose this behaviour explicitly before writing code.</p><p>Index 0 is a successful result. Use <code>result is not None</code>, not <code>if result</code>, to distinguish it from failure. A returned -1 would also need deliberate handling because Python treats -1 as the last index.</p>"
    ],
    [
      "Linear search: check in order",
      "<p>Start at index 0, compare each item with the target and stop at the first match. If every item has been checked, return None. Sorting is unnecessary.</p><pre><code>FUNCTION linearSearch(values, target)\n    FOR index FROM 0 TO LENGTH(values) - 1\n        IF values[index] = target THEN\n            RETURN index\n        END IF\n    END FOR\n    RETURN NONE\nEND FUNCTION</code></pre><p>The FOR range is inclusive in this illustrative pseudocode; an empty list performs zero iterations. Python range(len(values)) excludes its upper endpoint. These are language-neutral algorithm notes; use current SCSA conventions for formal assessments.</p><p>For [101, 104, 108, 112, 117, 123, 130], searching 117 checks indexes 0, 1, 2, 3, 4 and returns 4 after five item probes.</p>"
    ],
    [
      "Binary search: discard half",
      "<p>The binary search used here requires ascending order under the same comparison rule used by the search. Keep inclusive low/high bounds. Choose the middle index with integer division; equality finishes. If the middle value is smaller than the target, only the right side can contain it; otherwise keep the left side. Exclude the tested middle item with +1 or -1 so the interval shrinks. Stop when low exceeds high.</p><pre><code>FUNCTION binarySearch(values, target)\n    SET low TO 0\n    SET high TO LENGTH(values) - 1\n    WHILE low &lt;= high\n        SET mid TO (low + high) DIV 2\n        IF values[mid] = target THEN\n            RETURN mid\n        ELSE IF values[mid] &lt; target THEN\n            SET low TO mid + 1\n        ELSE\n            SET high TO mid - 1\n        END IF\n    END WHILE\n    RETURN NONE\nEND FUNCTION</code></pre><p>With an empty list, high is -1 and the loop never accesses a cell. While searching sorted input, a target still present must lie inside the remaining interval: this is the invariant that justifies discarding data. Sorting or checking order inside every search would add work not included in the search bound.</p>"
    ],
    [
      "Desk-check the bounds",
      "<p>Search 117 in [101, 104, 108, 112, 117, 123, 130]. Bounds below are recorded before each probe.</p><table><tr><th>Probe</th><th>low</th><th>high</th><th>mid</th><th>value</th><th>Action</th></tr><tr><td>1</td><td>0</td><td>6</td><td>3</td><td>112</td><td>low = 4</td></tr><tr><td>2</td><td>4</td><td>6</td><td>5</td><td>123</td><td>high = 4</td></tr><tr><td>3</td><td>4</td><td>4</td><td>4</td><td>117</td><td>return 4</td></tr></table><p>For missing target 119, the same first two probes lead to mid 4/value 117, then low = 5 and high = 4: return None. A condition low &lt; high would skip a final single candidate. Updating low = mid can repeat the same bounds indefinitely.</p>"
    ],
    [
      "Compare growth, not just a stopwatch",
      "<p>Big O describes an asymptotic upper bound on resource growth as input size n increases. For these iterative implementations with constant-time indexing and integer comparisons, the usual tight worst-case time bounds are O(n) for linear search and O(log n) for binary search. Both can find their first probed item in O(1); best-case speed does not change the worst-case classification. Both use O(1) extra space.</p><table><tr><th>n items</th><th>Linear: max probes</th><th>Binary: max probes</th></tr><tr><td>8</td><td>8</td><td>4</td></tr><tr><td>16</td><td>16</td><td>5</td></tr><tr><td>32</td><td>32</td><td>6</td></tr><tr><td>1024</td><td>1024</td><td>11</td></tr></table><p>For n &gt; 0, binary search makes at most floor(log2(n)) + 1 item probes; an empty list makes zero. Doubling n doubles linear worst-case probes but adds one binary probe. One binary probe may evaluate equality and then ordering: item probes are not identical to counts of individual Boolean comparisons. Use a consistent measure in your experiment.</p><p>These bounds concern the search, not preparation. Sorting a fresh list just for one lookup can outweigh the saving; sorting also changes index meanings. For many lookups in already sorted data, binary search is attractive. Timing small inputs reflects overhead and the environment as well as algorithm growth.</p>"
    ],
    [
      "Choose and test a search",
      "<p>Choose linear search for a short unsorted list or when the first original occurrence matters. Choose binary search for repeated lookups in sorted indexed data when any matching occurrence is sufficient. A dictionary can suit lookup by a unique ID, but that is a different structure and contract.</p><p>Do not silently sort the caller’s list: a result would then refer to the reordered list. If a separate sorted view is required, retain original identifiers/index mappings. A sortedness check is O(n), so keep the validated-data boundary separate from a repeated-search routine.</p><p>Test empty, singleton hit/miss, index 0, last item, absent below/between/above values and duplicates. A deliberately unsorted example such as [3, 1, 2] with target 3 demonstrates a violated binary-search precondition: linear search returns 0 while this binary search returns None. That is not a correctness test of binary search on valid input.</p><p><a class=\"button\" href=\"unit3-search-pack.zip\" download>Download classroom pack</a> · <a href=\"unit3-search-workbook.md\" download>Student workbook</a> · <a href=\"unit3-search-answers.md\" download>Teacher answers</a>. Answers are separate files, not access-protected.</p><p>Curriculum reference: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 Year 12 syllabus: structured algorithms</a>. The Python bisect library locates insertion positions; it is a technical extension, not a replacement for writing and tracing these searches.</p>"
    ],
    [
      "Convention-focused transfer",
      "<p>The SCSA guidance uses = for assignment and == for equality, with explicit block endings. Earlier illustrative algorithms focus on logic; their None/-1 contracts must be preserved when translating. Use the <a href=\"#unit3-evidence\">convention clinic and independent evidence tasks</a> for a source-checked notation exercise. The booklet does not prescribe one compulsory pseudocode grammar.</p>"
    ]
  ],
  "code": "\"\"\"Search integer IDs. Return an index, or None when absent.\"\"\"\ndef linear_search(values, target):\n    for index in range(len(values)):\n        if values[index] == target:\n            return index\n    return None\n\ndef binary_search(values, target):\n    # Precondition: values is sorted in ascending order.\n    low = 0\n    high = len(values) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if values[mid] == target:\n            return mid\n        elif values[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return None\n\nif __name__ == \"__main__\":\n    ids = [101, 104, 108, 112, 117, 123, 130]\n    for target in [101, 117, 999]:\n        print(target, linear_search(ids, target), binary_search(ids, target))\n",
  "solution": "\"\"\"Search integer IDs. Return an index, or None when absent.\"\"\"\ndef linear_search(values, target):\n    for index in range(len(values)):\n        if values[index] == target:\n            return index\n    return None\n\ndef binary_search(values, target):\n    # Precondition: values is sorted in ascending order.\n    low = 0\n    high = len(values) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if values[mid] == target:\n            return mid\n        elif values[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return None\n\nif __name__ == \"__main__\":\n    ids = [101, 104, 108, 112, 117, 123, 130]\n    for target in [101, 117, 999]:\n        print(target, linear_search(ids, target), binary_search(ids, target))\n\n\ndef probe_count(values, target, binary=False):\n    # Count examined items, not equality/ordering operations or elapsed time.\n    probes = 0\n    if not binary:\n        for index in range(len(values)):\n            probes += 1\n            if values[index] == target:\n                return index, probes\n        return None, probes\n    low, high = 0, len(values) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        probes += 1\n        if values[mid] == target:\n            return mid, probes\n        elif values[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return None, probes\n",
  "practice": [
    [
      "TRACE",
      "How many item probes does each algorithm need to find 117 in the seven-ID example?",
      "Linear: 5, returning index 4. Binary: 3, probing indexes 3, 5, 4 and returning 4."
    ],
    [
      "BOUNDARY",
      "Why must the binary loop include low == high?",
      "One candidate remains when the bounds are equal. Excluding equality can miss a valid result."
    ],
    [
      "CONTRACT",
      "Can binary search guarantee the first occurrence in [2, 2, 2]?",
      "This implementation returns index 1, a matching occurrence. Linear search returns index 0. Finding the first by binary search needs a modified algorithm."
    ],
    [
      "GROWTH",
      "What happens to worst-case probes when input grows from 16 to 32 items?",
      "Linear doubles from 16 to 32. Binary increases from 5 to 6. Count item probes consistently."
    ]
  ],
  "task": "Implement both searches from the starter, then add probe counters without changing the result contract. Compare ordinary, empty, duplicate and boundary cases. Investigate n = 8, 16, 32 and 1024 using range(n) and an absent target n. Record predictions, actual probes and a justified algorithm choice for one lookup in unsorted data versus repeated lookups in already sorted data.",
  "recap": "Linear search scans in order; binary search repeatedly halves a sorted interval. State what index means, shrink the bounds, handle index 0 explicitly and compare growth with a consistent cost measure.",
  "lessons": [
    "Lesson 1: retrieve lists/functions; specify result contracts; model and trace linear search; complete workbook A.",
    "Lesson 2: model sorted intervals; trace binary search; diagnose final-candidate and bound-update faults; complete workbook B.",
    "Lesson 3: implement and test both algorithms; cover empty/singleton/duplicate/boundary cases; complete workbook C.",
    "Lesson 4: count probes and compare Big O growth; justify preparation costs and algorithm choices; peer-review evidence. The practical fits inside these four lessons."
  ],
  "reference": "https://docs.python.org/3/library/bisect.html",
  "refTitle": "Python bisect: sorted-data bisection and performance notes",
  "quiz": {
    "q": "What must be true before this binary search runs correctly?",
    "options": [
      "The list is sorted ascending using the search comparison rule.",
      "The list has an even number of items.",
      "The target appears exactly once."
    ],
    "answer": 0,
    "explanation": "The ordering lets the algorithm safely discard half the interval. Odd sizes and duplicate values are allowed."
  },
  "next": "#plan-3-3"
});
chapters.push({
  "id": "unit3-sort",
  "unit": 3,
  "week": 4,
  "title": "Sorting algorithms",
  "badge": "PYTHON 3 / ALGORITHMS",
  "intro": "Reorder data with three different strategies, trace what changes and justify the work each algorithm does.",
  "objectives": [
    "Implement and trace bubble, insertion and selection sort.",
    "Explain sorted regions, swaps, shifts and termination.",
    "Compare best/worst growth, stability and movement costs.",
    "Test order, duplicate preservation and intentional mutation."
  ],
  "sections": [
    [
      "Define the sorting contract",
      "<p>A sort rearranges items into an agreed order. Our examples sort a list of integers into ascending order, retain every value and duplicate, and deliberately mutate that list. Each function returns a count of comparisons between data values, not a sorted list. Index/bound checks are excluded. Use the same measure when comparing algorithms.</p><pre><code>working = original[:]\ncomparisons = bubble_sort(working)\n# working is now sorted; original is unchanged.</code></pre><p>The copy is made at the caller boundary. The sorting routine itself uses constant extra space; preserving the original this way adds O(n) space and copying work to the whole task. Do not assign working = bubble_sort(working): that replaces the list name with an integer count.</p>"
    ],
    [
      "Bubble sort: move the largest to the end",
      "<p>Compare neighbouring items from left to right. Swap only if they are out of order. After one pass the largest remaining item is in its final position at the right. Shorten the next pass to exclude that sorted suffix. Reset swapped for each pass; if a complete pass makes no swaps, the list is sorted and the algorithm can stop.</p><pre><code>FUNCTION bubbleSort(values)\n    FOR end FROM LENGTH(values) - 1 DOWN TO 1\n        SET swapped TO FALSE\n        FOR index FROM 0 TO end - 1\n            IF values[index] &gt; values[index + 1] THEN\n                SWAP values[index], values[index + 1]\n                SET swapped TO TRUE\n            END IF\n        END FOR\n        IF swapped = FALSE THEN\n            EXIT FOR\n        END IF\n    END FOR\nEND FUNCTION</code></pre><p>These illustrative pseudocode ranges include both endpoints; impossible ranges perform zero iterations. Python range excludes its stop value. The pseudocode shows the sorting logic; the Python implementation additionally counts key comparisons. Follow current SCSA support conventions in formal assessment.</p>"
    ],
    [
      "Insertion sort: grow a sorted prefix",
      "<p>Begin with the first item as a sorted prefix. Save the next item as key, then shift larger prefix items one position to the right until the key fits. Insert the saved key into the gap. The prefix is sorted after each insertion; the untouched suffix still awaits processing. Save key before shifting so it is not overwritten.</p><pre><code>FUNCTION insertionSort(values)\n    FOR index FROM 1 TO LENGTH(values) - 1\n        SET key TO values[index]\n        SET position TO index - 1\n        WHILE position &gt;= 0\n            IF values[position] &lt;= key THEN\n                EXIT WHILE\n            END IF\n            SET values[position + 1] TO values[position]\n            SET position TO position - 1\n        END WHILE\n        SET values[position + 1] TO key\n    END FOR\nEND FUNCTION</code></pre><p>The boundary check occurs before reading values[position], so a negative index is not accidentally treated as a valid Python element. A shift copies one item; it is not the same operation as swapping two items.</p>"
    ],
    [
      "Selection sort: place the smallest remaining item",
      "<p>Scan the unsorted suffix to find the index of its minimum. Swap that item into the next position only after finishing the scan. The sorted prefix grows by one. Track the smallest index, rather than confusing a minimum value with a position. This version avoids swapping an item with itself.</p><pre><code>FUNCTION selectionSort(values)\n    FOR start FROM 0 TO LENGTH(values) - 2\n        SET smallest TO start\n        FOR index FROM start + 1 TO LENGTH(values) - 1\n            IF values[index] &lt; values[smallest] THEN\n                SET smallest TO index\n            END IF\n        END FOR\n        IF smallest != start THEN\n            SWAP values[start], values[smallest]\n        END IF\n    END FOR\nEND FUNCTION</code></pre><p>Even an already sorted list still needs the minimum scan on every pass. One long-distance swap can reorder items with equal keys, unlike the adjacent swaps in this bubble sort.</p>"
    ],
    [
      "Trace the same data three ways",
      "<p>Use [5, 2, 4, 1]. Each row below records the list after one complete outer-loop pass. “Comparisons” refers to key comparisons made by the worked Python functions during that pass.</p><table><tr><th>Pass</th><th>Bubble / comparisons</th><th>Insertion / comparisons</th><th>Selection / comparisons</th></tr><tr><td>1</td><td>[2, 4, 1, 5] / 3</td><td>[2, 5, 4, 1] / 1</td><td>[1, 2, 4, 5] / 3</td></tr><tr><td>2</td><td>[2, 1, 4, 5] / 2</td><td>[2, 4, 5, 1] / 2</td><td>[1, 2, 4, 5] / 2</td></tr><tr><td>3</td><td>[1, 2, 4, 5] / 1</td><td>[1, 2, 4, 5] / 3</td><td>[1, 2, 4, 5] / 1</td></tr></table><p>All three make six key comparisons on this particular input. This does not prove equal performance on other inputs. For a desk check, also record the inner index, compared values, swap/shift decision and the current sorted region.</p>"
    ],
    [
      "Compare growth and the work being counted",
      "<p>Big O describes a growth bound as input size n increases, not a precise time in seconds. Under constant-time integer comparisons/indexing, these implementations have the following usual tight time bounds. Best cases refer to already sorted input; empty and singleton inputs need zero key comparisons.</p><table><tr><th>Algorithm</th><th>Best time</th><th>Worst time</th><th>Extra space inside routine</th></tr><tr><td>Bubble, with early exit</td><td>O(n)</td><td>O(n²)</td><td>O(1)</td></tr><tr><td>Insertion</td><td>O(n)</td><td>O(n²)</td><td>O(1)</td></tr><tr><td>Selection</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td></tr></table><p>For n ≥ 1, sorted input needs n − 1 key comparisons in this bubble and insertion sort. Selection always makes n(n − 1)/2. Strictly reverse-sorted distinct values make all three perform n(n − 1)/2 key comparisons. Optimised bubble therefore differs from a version that always completes every pass.</p><table><tr><th>n</th><th>Sorted bubble/insertion</th><th>Selection (any order) / reverse all three</th></tr><tr><td>8</td><td>7</td><td>28</td></tr><tr><td>16</td><td>15</td><td>120</td></tr><tr><td>32</td><td>31</td><td>496</td></tr></table><p>Quadratic worst-case work grows roughly fourfold when n doubles for large n. Comparison counts alone omit movement: selection makes at most n − 1 swaps, whereas reverse input makes bubble perform n(n − 1)/2 swaps and insertion perform that many shifts, plus key placements. They are different operations with different costs. Use both ordering and size when designing experiments.</p>"
    ],
    [
      "Equal keys, stability and a practical choice",
      "<p>A stable sort retains the original relative order of records with equal sort keys. For example, [(2, A), (2, B), (1, C)] becomes [(1, C), (2, A), (2, B)] under a stable sort by the numeric key. Our bubble rule swaps only greater values; insertion shifts only greater values, so both are stable. This selection strategy is not: its first swap puts C before B before A, reversing A and B. The record labels are explanatory tags; the worked code sorts integers.</p><p>For a short or nearly sorted list, insertion is often a useful teaching choice. If minimising swaps matters and stability is unnecessary, selection offers few swaps but still scans quadratically. Bubble is straightforward to trace but can require many swaps. No choice is universally fastest: justify requirements, data order, size and movement costs.</p><p>For ordinary application code, Python provides <code>sorted(values)</code> for a new list and <code>values.sort()</code> to change the existing list and return None. Both are stable and support keys. They are not these three teaching algorithms. Practise writing and tracing the required algorithms here; use built-in sorting when the application requirements allow it.</p>"
    ],
    [
      "Test, explain and connect back to searching",
      "<p>Check ascending order and preservation of the full input multiset, including duplicate counts. Test [], [7], sorted, reverse, duplicates, all equal and negative values. Test both the intentional mutation and the unchanged original when a caller makes a copy. Ascending output alone is insufficient: a broken sort might drop a repeated value.</p><p>Sort a separate ID list, then reuse last chapter’s binary search. State that its returned index belongs to the sorted list. Include sorting cost in a one-off lookup; do not describe the whole sort-and-search task as O(log n). These three sorts have O(n²) worst-case time.</p><p><a class=\"button\" href=\"unit3-sort-pack.zip\" download>Download classroom pack</a> · <a href=\"unit3-sort-workbook.md\" download>Student workbook</a> · <a href=\"unit3-sort-answers.md\" download>Teacher answers</a>. Teacher files are separate, not access-protected.</p><p>Curriculum reference: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 Year 12 syllabus, structured algorithms</a>. This original chapter remains a draft for teacher review.</p>"
    ],
    [
      "Convention-focused transfer",
      "<p>The SCSA guidance uses = for assignment and == for equality, with explicit block endings. Earlier illustrative algorithms focus on logic; their None/-1 contracts must be preserved when translating. Use the <a href=\"#unit3-evidence\">convention clinic and independent evidence tasks</a> for a source-checked notation exercise. The booklet does not prescribe one compulsory pseudocode grammar.</p>"
    ]
  ],
  "code": "\"\"\"Sort integer lists in place; return the number of key comparisons.\nIndex/bound checks are not counted. These are teaching implementations.\n\"\"\"\ndef bubble_sort(values):\n    comparisons = 0\n    for end in range(len(values) - 1, 0, -1):\n        swapped = False\n        for index in range(end):\n            comparisons += 1\n            if values[index] > values[index + 1]:\n                values[index], values[index + 1] = values[index + 1], values[index]\n                swapped = True\n        if not swapped:\n            break\n    return comparisons\n\ndef insertion_sort(values):\n    comparisons = 0\n    for index in range(1, len(values)):\n        key = values[index]\n        position = index - 1\n        while position >= 0:\n            comparisons += 1\n            if values[position] <= key:\n                break\n            values[position + 1] = values[position]\n            position -= 1\n        values[position + 1] = key\n    return comparisons\n\ndef selection_sort(values):\n    comparisons = 0\n    for start in range(len(values) - 1):\n        smallest = start\n        for index in range(start + 1, len(values)):\n            comparisons += 1\n            if values[index] < values[smallest]:\n                smallest = index\n        if smallest != start:\n            values[start], values[smallest] = values[smallest], values[start]\n    return comparisons\n\nif __name__ == \"__main__\":\n    original = [5, 2, 4, 1]\n    for sort in [bubble_sort, insertion_sort, selection_sort]:\n        working = original[:]\n        count = sort(working)\n        print(sort.__name__, working, count)\n    print(\"Original:\", original)\n",
  "solution": "\"\"\"Sort integer lists in place; return the number of key comparisons.\nIndex/bound checks are not counted. These are teaching implementations.\n\"\"\"\ndef bubble_sort(values):\n    comparisons = 0\n    for end in range(len(values) - 1, 0, -1):\n        swapped = False\n        for index in range(end):\n            comparisons += 1\n            if values[index] > values[index + 1]:\n                values[index], values[index + 1] = values[index + 1], values[index]\n                swapped = True\n        if not swapped:\n            break\n    return comparisons\n\ndef insertion_sort(values):\n    comparisons = 0\n    for index in range(1, len(values)):\n        key = values[index]\n        position = index - 1\n        while position >= 0:\n            comparisons += 1\n            if values[position] <= key:\n                break\n            values[position + 1] = values[position]\n            position -= 1\n        values[position + 1] = key\n    return comparisons\n\ndef selection_sort(values):\n    comparisons = 0\n    for start in range(len(values) - 1):\n        smallest = start\n        for index in range(start + 1, len(values)):\n            comparisons += 1\n            if values[index] < values[smallest]:\n                smallest = index\n        if smallest != start:\n            values[start], values[smallest] = values[smallest], values[start]\n    return comparisons\n\nif __name__ == \"__main__\":\n    original = [5, 2, 4, 1]\n    for sort in [bubble_sort, insertion_sort, selection_sort]:\n        working = original[:]\n        count = sort(working)\n        print(sort.__name__, working, count)\n    print(\"Original:\", original)\n\n\ndef comparison_report():\n    for size in [8, 16, 32]:\n        datasets = {\n            \"sorted\": list(range(size)),\n            \"reverse\": list(range(size - 1, -1, -1)),\n        }\n        for order, original in datasets.items():\n            for sort in [bubble_sort, insertion_sort, selection_sort]:\n                working = original[:]\n                count = sort(working)\n                assert working == sorted(original)\n                print(size, order, sort.__name__, count)\n\nif __name__ == \"__main__\":\n    comparison_report()\n",
  "practice": [
    [
      "TRACE",
      "What is the list after the first complete pass of each algorithm on [5, 2, 4, 1]?",
      "Bubble [2,4,1,5]; insertion [2,5,4,1]; selection [1,2,4,5]. Each strategy establishes a different sorted region."
    ],
    [
      "DIAGNOSE",
      "Why must insertion sort save key before shifting values?",
      "The shift can overwrite its original cell. Saving key preserves the item that must be inserted into the final gap."
    ],
    [
      "GROWTH",
      "Why is best-case selection sort still O(n²)?",
      "It scans the entire remaining suffix to find a minimum on every pass, even if no swaps are needed."
    ],
    [
      "CONTRACT",
      "Why is result = bubble_sort(values) not a sorted list in this chapter?",
      "The function mutates values and returns an integer comparison count. Inspect values for the ordered data."
    ],
    [
      "TEST",
      "Why must a sort test check duplicates as well as ascending order?",
      "A result can be ascending while losing values. Compare the output multiset or a trusted sorted reference to ensure every occurrence remains."
    ]
  ],
  "task": "Implement all three routines from the starter. Trace the four-item example and reproduce its comparison counts. Use fresh copies of sorted and reverse lists at n = 8, 16 and 32, record key comparisons and verify output against sorted(original). Explain stability with labelled records, choose a sort for a stated scenario, then connect the sorted IDs to binary search without confusing original and sorted indexes.",
  "recap": "Bubble builds a sorted suffix, insertion grows a prefix by shifting, and selection places successive minima. Count a defined operation, preserve duplicates, distinguish mutation from return values and justify choices against the data and requirements.",
  "lessons": [
    "Lesson 1: retrieve search/order prerequisites; model bubble passes and early exit; trace and implement bubble sort.",
    "Lesson 2: model insertion shifts and saved key; trace prefix growth; implement and compare sorted/reverse data.",
    "Lesson 3: model minimum selection; implement selection sort; test empty/singleton/duplicate/negative cases and mutation contracts.",
    "Lesson 4: compare key counts and Big O; discuss stability/movement; justify a scenario choice and connect to binary search. All practical work fits inside these four lessons."
  ],
  "reference": "https://docs.python.org/3/howto/sorting.html",
  "refTitle": "Python sorting: built-ins, keys and stability",
  "quiz": {
    "q": "Why can this bubble sort stop after a complete pass with no swaps?",
    "options": [
      "Every neighbouring pair in the remaining region is already in order, and the suffix is already fixed.",
      "It has completed exactly half its passes.",
      "No swaps means all values are equal."
    ],
    "answer": 0,
    "explanation": "An ordered remaining region plus the already sorted suffix means the whole list is sorted. The values need not be equal."
  },
  "next": "#plan-3-4"
});
chapters.push({
  "id": "unit3-objects",
  "unit": 3,
  "week": 5,
  "title": "Objects and classes in Python",
  "badge": "PYTHON 3 / OBJECTS",
  "intro": "Give each object its own state and a clear interface, then prove that its methods preserve the rules.",
  "objectives": [
    "Distinguish classes, objects, instances, attributes and methods.",
    "Instantiate objects and explain __init__ and self.",
    "Apply encapsulation and abstraction through a defined interface.",
    "Trace independent state and aliases, and test a class against its contract."
  ],
  "sections": [
    [
      "From separate data to an object",
      "<p>Previously we combined lists, dictionaries and functions. A class lets us define a kind of object with both state and behaviour. For a stock item, the state includes an ID, name, total units and units on loan. Behaviour includes lending units, returning them and reporting availability. Keep these responsibilities together when they belong to one concept.</p><p>A class is the definition; an instance is a particular object made from it. Equipment is our class. The camera and tripod are two instances with their own state. An attribute stores state; a method implements behaviour. Object-oriented design is useful when it makes responsibilities clearer; a small calculation may still need only a function.</p>"
    ],
    [
      "Design the class before coding",
      "<p>This original stock-count model uses synthetic equipment only. It does not record borrowers, dates, reservations or authorisation, and it cannot verify who returned an item. Those responsibilities belong in a fuller booking design later.</p><table><tr><th>Member</th><th>Responsibility / contract</th></tr><tr><td>_equipment_id, _name</td><td>Non-empty strings; surrounding whitespace removed</td></tr><tr><td>_total, _on_loan</td><td>Non-negative integer stock; on-loan initially 0</td></tr><tr><td>get_id(), get_name()</td><td>Return identifying strings; do not change state</td></tr><tr><td>available()</td><td>Return total − on-loan; do not change state</td></tr><tr><td>lend(quantity=1)</td><td>Increase on-loan if enough units; return True or False</td></tr><tr><td>return_units(quantity=1)</td><td>Decrease on-loan if enough are currently loaned; return True or False</td></tr></table><p>The invariant is 0 ≤ on_loan ≤ total. Positive integer quantities are required; booleans and non-integers are rejected. Invalid input raises ValueError before a change. A valid quantity that exceeds availability or units on loan returns False with state unchanged. Choose one clear contract and test it consistently.</p>"
    ],
    [
      "Instantiate and initialise",
      "<pre><code>camera = Equipment(&quot;E01&quot;, &quot;Camera&quot;, 2)\ntripod = Equipment(&quot;E02&quot;, &quot;Tripod&quot;, 1)\nprint(camera.available())  # 2\nprint(tripod.available())  # 1</code></pre><p>Calling Equipment(...) instantiates an object and runs its __init__ method to initialise state. In classroom terminology this is often discussed as construction; precisely, __init__ initialises an already created instance and must return None. It does not return the new object itself.</p><p>self is the conventional first parameter of an instance method. It refers to the object receiving the call. self._total = total stores the supplied total on that instance; total alone is a local parameter. In camera.available(), Python supplies camera as self automatically. Do not pass it again.</p>"
    ],
    [
      "Methods: queries and commands",
      "<p>A query reports state without changing it; available() is a query. A command changes state deliberately; lend() and return_units() are commands that also report whether the change succeeded. Avoid input() or print() inside these methods so their logic can be reused and tested separately from the interface.</p><pre><code>camera = Equipment(&quot;E01&quot;, &quot;Camera&quot;, 2)\nprint(camera.lend())       # True; available now 1\nprint(camera.lend(2))      # False; still 1\nprint(camera.return_units())  # True; available now 2</code></pre><p>The default quantity of 1 lets lend() request one unit; lend(2) supplies an explicit argument. available() can be called from another method as self.available(). Missing parentheses refer to the method rather than calling it.</p>"
    ],
    [
      "Encapsulation and abstraction",
      "<p>Encapsulation groups state with the methods responsible for keeping it valid. Callers use lend() rather than editing _on_loan directly. Abstraction lets a caller ask for availability without repeating the arithmetic or knowing every internal field. The public interface states what an operation does; the implementation supplies how it works.</p><p>In Python, a single leading underscore signals an internal implementation detail by convention. It does not prevent direct access. Assigning camera._on_loan = 99 can bypass our checks and break the invariant. Double-underscore name mangling also is not a security boundary. This design relies on callers respecting the interface; it is not access control for real users. Properties can offer managed attributes later, but are unnecessary for this opening example.</p>"
    ],
    [
      "Separate instances, shared aliases and class attributes",
      "<pre><code>first = Equipment(&quot;E01&quot;, &quot;Camera&quot;, 2)\nsecond = Equipment(&quot;E02&quot;, &quot;Tripod&quot;, 1)\nalias = first\nalias.lend()\nprint(first.available())   # 1\nprint(second.available())  # 1\nprint(alias is first)      # True</code></pre><p>Assignment alias = first does not copy the instance. Both names refer to one object, so a method call through either changes the same state. A new Equipment(...) call makes a separate instance. The class does not enforce catalogue-wide ID uniqueness; a catalogue must check that rule separately.</p><pre><code>class BadLog:\n    events = []  # Shared mutable class attribute\n\nclass GoodLog:\n    def __init__(self):\n        self.events = []  # New list for each instance</code></pre><p>A class attribute belongs to the class and can be shared by its instances. An instance attribute set through self belongs to that instance. For separate histories, create the list inside __init__; a shared class-level list makes one item’s appended event appear in other items’ histories. Intentional shared constants can be class attributes, but per-item mutable state should be independent.</p>"
    ],
    [
      "Trace state and test the interface",
      "<p>The worked example below prints the following sequence. Failed lending leaves state unchanged and the tripod remains independent.</p><table><tr><th>Operation</th><th>Result/output</th><th>Camera on-loan</th><th>Camera available</th></tr><tr><td>Create, report ID/availability</td><td>E01 2</td><td>0</td><td>2</td></tr><tr><td>lend(), report availability</td><td>True 1</td><td>1</td><td>1</td></tr><tr><td>lend(2), report availability</td><td>False 1</td><td>1</td><td>1</td></tr><tr><td>return_units(), report availability</td><td>True 2</td><td>0</td><td>2</td></tr><tr><td>Report tripod ID/availability</td><td>E02 1</td><td>0</td><td>2</td></tr></table><p>Test zero stock, lending exactly all available units, a valid excessive request, returning too many, repeated return and invalid quantities. Compare state before and after rejected operations. Two objects and an alias test different things: independence versus shared identity.</p>"
    ],
    [
      "Refactor and connect to earlier algorithms",
      "<p>Move the stock operations from a dictionary-and-functions version into Equipment. Retain the requirements and compare both versions with the same test cases; adding class syntax alone is not evidence of an improved design.</p><p>Extension: store Equipment instances in a list. Write find_equipment(items, equipment_id) as a linear search returning the matching object or None. Require unique IDs in the catalogue. The returned object is shared with the list, so lending through it updates that catalogue item. Build a list of dictionaries for an availability report; that report contains current values, not live Equipment instances.</p><p><a class=\"button\" href=\"unit3-objects-pack.zip\" download>Download classroom pack</a> · <a href=\"unit3-objects-workbook.md\" download>Student workbook</a> · <a href=\"unit3-objects-answers.md\" download>Teacher answers</a>. Teacher solutions are separate files, not access-protected.</p><p>Week 5 establishes classes, instances and encapsulation. Week 6 will extend the design into inheritance, polymorphism and further abstraction. Curriculum reference: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 Year 12 syllabus, object-oriented programming</a>.</p>"
    ]
  ],
  "code": "\"\"\"Synthetic stock counts, not a borrower or calendar booking system.\"\"\"\nclass Equipment:\n    def __init__(self, equipment_id, name, total):\n        if not isinstance(equipment_id, str) or not equipment_id.strip():\n            raise ValueError(\"A non-empty equipment ID is required\")\n        if not isinstance(name, str) or not name.strip():\n            raise ValueError(\"A non-empty name is required\")\n        if type(total) is not int or total < 0:\n            raise ValueError(\"Total must be a non-negative integer\")\n        self._equipment_id = equipment_id.strip()\n        self._name = name.strip()\n        self._total = total\n        self._on_loan = 0\n\n    def get_id(self):\n        return self._equipment_id\n\n    def get_name(self):\n        return self._name\n\n    def available(self):\n        return self._total - self._on_loan\n\n    def lend(self, quantity=1):\n        if type(quantity) is not int or quantity <= 0:\n            raise ValueError(\"Quantity must be a positive integer\")\n        if quantity > self.available():\n            return False\n        self._on_loan += quantity\n        return True\n\n    def return_units(self, quantity=1):\n        if type(quantity) is not int or quantity <= 0:\n            raise ValueError(\"Quantity must be a positive integer\")\n        if quantity > self._on_loan:\n            return False\n        self._on_loan -= quantity\n        return True\n\nif __name__ == \"__main__\":\n    camera = Equipment(\"E01\", \"Camera\", 2)\n    tripod = Equipment(\"E02\", \"Tripod\", 1)\n    print(camera.get_id(), camera.available())\n    print(camera.lend(), camera.available())\n    print(camera.lend(2), camera.available())\n    print(camera.return_units(), camera.available())\n    print(tripod.get_id(), tripod.available())\n",
  "solution": "\"\"\"Synthetic stock counts, not a borrower or calendar booking system.\"\"\"\nclass Equipment:\n    def __init__(self, equipment_id, name, total):\n        if not isinstance(equipment_id, str) or not equipment_id.strip():\n            raise ValueError(\"A non-empty equipment ID is required\")\n        if not isinstance(name, str) or not name.strip():\n            raise ValueError(\"A non-empty name is required\")\n        if type(total) is not int or total < 0:\n            raise ValueError(\"Total must be a non-negative integer\")\n        self._equipment_id = equipment_id.strip()\n        self._name = name.strip()\n        self._total = total\n        self._on_loan = 0\n\n    def get_id(self):\n        return self._equipment_id\n\n    def get_name(self):\n        return self._name\n\n    def available(self):\n        return self._total - self._on_loan\n\n    def lend(self, quantity=1):\n        if type(quantity) is not int or quantity <= 0:\n            raise ValueError(\"Quantity must be a positive integer\")\n        if quantity > self.available():\n            return False\n        self._on_loan += quantity\n        return True\n\n    def return_units(self, quantity=1):\n        if type(quantity) is not int or quantity <= 0:\n            raise ValueError(\"Quantity must be a positive integer\")\n        if quantity > self._on_loan:\n            return False\n        self._on_loan -= quantity\n        return True\n\nif __name__ == \"__main__\":\n    camera = Equipment(\"E01\", \"Camera\", 2)\n    tripod = Equipment(\"E02\", \"Tripod\", 1)\n    print(camera.get_id(), camera.available())\n    print(camera.lend(), camera.available())\n    print(camera.lend(2), camera.available())\n    print(camera.return_units(), camera.available())\n    print(tripod.get_id(), tripod.available())\n\n\ndef find_equipment(items, equipment_id):\n    # IDs must be unique in the supplied catalogue. No list mutation.\n    for item in items:\n        if item.get_id() == equipment_id:\n            return item\n    return None\n\ndef availability_report(items):\n    report = []\n    for item in items:\n        report.append({\"id\": item.get_id(), \"name\": item.get_name(),\n                       \"available\": item.available()})\n    return report\n\nif __name__ == \"__main__\":\n    catalogue = [Equipment(\"E01\", \"Camera\", 2),\n                 Equipment(\"E02\", \"Tripod\", 1)]\n    found = find_equipment(catalogue, \"E01\")\n    if found is not None:\n        found.lend()\n    print(availability_report(catalogue))\n",
  "practice": [
    [
      "IDENTIFY",
      "In camera = Equipment(\"E01\", \"Camera\", 2), identify the class and instance.",
      "Equipment is the class. The new object referred to by camera is an instance. E01, Camera and 2 are arguments used during initialisation."
    ],
    [
      "TRACE",
      "After a two-unit camera lends one unit then rejects lend(2), how many remain?",
      "One. The first operation increases on-loan to 1; the excessive request returns False without changing it."
    ],
    [
      "EXPLAIN",
      "Does an underscore make _on_loan impossible to access outside the class?",
      "No. It marks an internal detail by convention. Direct assignment can bypass validation; encapsulation here relies on using the intended methods."
    ],
    [
      "ALIAS",
      "Does alias = camera make a second independent camera?",
      "No. It binds another name to the same object. Changes through either name are visible through the other."
    ],
    [
      "DIAGNOSE",
      "Why should a separate history list be created as self.events = [] in __init__?",
      "Each instance receives its own list. A mutable list at class scope would be shared when accessed and mutated by instances."
    ]
  ],
  "task": "Implement Equipment from the starter and verify the interface contracts. Test boundary and rejected operations, two independent instances and an alias. Refactor the supplied procedural version while retaining its behaviour. Extend with a linear object lookup and an availability report, then explain why lookup returns a shared object but the report is a snapshot of values.",
  "recap": "A class defines a kind of object; an instance holds particular state. Methods use self, queries report state and commands change it. Initialise instance data deliberately, respect the interface and test both valid changes and unchanged rejected operations.",
  "lessons": [
    "Lesson 1: retrieve dictionaries/functions; design state and responsibility table; distinguish class/instance; instantiate and inspect two objects.",
    "Lesson 2: explain __init__/self; implement queries and commands; trace boundaries and rejected operations.",
    "Lesson 3: encapsulation/abstraction; investigate aliases and shared class lists; refactor the procedural stock example.",
    "Lesson 4: independently complete/test the class, object lookup and report; peer-review contracts and evidence. Extension work can be scaled to diagnostic readiness; no extra major project is introduced."
  ],
  "reference": "https://docs.python.org/3/tutorial/classes.html",
  "refTitle": "Python classes: instances, methods and attributes",
  "quiz": {
    "q": "What does camera.lend() pass automatically as the method’s self argument?",
    "options": [
      "The Equipment class definition.",
      "The instance referred to by camera.",
      "The number of units available."
    ],
    "answer": 1,
    "explanation": "The bound method receives the camera instance as self; the default quantity is supplied separately."
  },
  "next": "#plan-3-5"
});
chapters.push({
  "id": "unit3-inheritance",
  "unit": 3,
  "week": 6,
  "title": "Extending object-oriented design",
  "badge": "PYTHON 3 / INHERITANCE",
  "intro": "Reuse a common interface, specialise behaviour and explain which method a mixed collection calls.",
  "objectives": [
    "Extend a superclass with subclass attributes and initialisation.",
    "Override methods while preserving shared contracts.",
    "Demonstrate polymorphism and distinguish it from abstraction.",
    "Choose inheritance or composition and test inherited behaviour."
  ],
  "sections": [
    [
      "Extend a responsibility, not just a name",
      "<p>Camera and Projector are specialised kinds of Equipment. They keep the stock interface from week 5 and add preparation state and behaviour. The superclass supplies common operations; subclasses extend or override selected parts. A subclass instance is still an Equipment instance and should remain usable wherever that stock contract is expected.</p><figure><img src=\"unit3-inheritance-model.svg\" alt=\"Camera and Projector inherit stock operations from Equipment and override preparation; hollow triangle points to Equipment.\" style=\"width:100%;height:auto\"><figcaption>Original class relationship sketch. The hollow triangle points to the superclass.</figcaption></figure><p>A Kit that contains several equipment items is composed of Equipment items rather than being one stock item itself: store those items as attributes or a list. This is composition. Do not choose inheritance merely because two things share a field or because it saves a few lines.</p>"
    ],
    [
      "Initialise common state with super()",
      "<pre><code>class Camera(Equipment):\n    def __init__(self, equipment_id, name, total, charge):\n        # Validate charge first.\n        super().__init__(equipment_id, name, total)\n        self._charge = charge</code></pre><p>This abbreviated design sketch omits validation; the worked implementation includes it. Camera(Equipment) declares the inheritance relationship. The subclass __init__ does not automatically run the superclass __init__. super().__init__(...) reuses its validation and stock initialisation for the same instance, then the subclass stores its extra state. It does not construct a separate Equipment object.</p><p>In this single-inheritance hierarchy, super() continues method lookup to the superclass. More generally it follows Python’s method resolution order; it is not a command to copy all parent fields. If the subclass defines no __init__, it inherits the existing initialiser, as the AudioRecorder extension demonstrates.</p>"
    ],
    [
      "Override behaviour while keeping the interface",
      "<pre><code>def preparation(self):\n    if self._charge &lt; 20:\n        return &quot;Charge the camera&quot;\n    return &quot;Check the lens&quot;</code></pre><p>Equipment.preparation() returns a general message. Camera and Projector each define a method with the same name and caller-facing arguments, supplying their own implementation. This is overriding. An inherited method such as lend() remains available because the subclass does not replace it.</p><p>Preserve the expected meaning, result type and valid calls. An override that needs an extra required caller argument or returns an unrelated result breaks the shared report interface. Defining two same-named methods with different parameter counts in one Python class does not create signature-based overloading: the later definition replaces the earlier name.</p>"
    ],
    [
      "Polymorphism: one call, different implementations",
      "<pre><code>for item in items:\n    print(item.get_id(), item.preparation())</code></pre><p>The caller uses one preparation() interface for a mixed collection. Python resolves the method on the particular object: Camera supplies the camera message, Projector the projector message and Equipment the general message. The report does not need an if/elif chain checking every subclass. Add another conforming kind of equipment and the loop can remain unchanged.</p><p>Polymorphism is not limited to inheritance in Python: another object with compatible get_id() and preparation() methods could also work here. This chapter demonstrates it through a shared superclass. Subclassing alone is not the demonstration; calling the shared method and observing type-appropriate behaviour is.</p>"
    ],
    [
      "Abstraction and a consistent stock contract",
      "<p>The report needs an ID and a preparation message; it does not need to know how charge or lamp hours are stored. That interface is an abstraction. Encapsulation keeps each implementation’s state and operations together. Inheritance organises shared and specialised behaviour. Polymorphism lets a shared call select the appropriate implementation. Explain these four ideas separately.</p><p>Equipment is a concrete class in this model: it can be instantiated and its preparation method works. Abstraction does not require making an abstract base class. Python’s abc tools can enforce abstract-method requirements in a later extension, but are not needed to understand this interface.</p><p>All classes retain the stock invariant 0 ≤ on_loan ≤ total. We do not override lending to add an undocumented camera-only rejection. Preparation is a query and never changes stock. Each subclass has its own instance data; underscore attributes remain a convention, not enforced privacy.</p>"
    ],
    [
      "Trace dispatch and boundary changes",
      "<p>Our fictional classroom model uses charge &lt; 20 and lamp hours ≥ 1000 to choose messages. These invented thresholds are for tracing code, not manufacturer guidance. Charge must be an integer from 0 to 100; hours must be a non-negative integer. Booleans and non-integers are rejected with ValueError before state changes.</p><table><tr><th>Object / before</th><th>Method selected</th><th>Message</th><th>Change / next message</th></tr><tr><td>E01 Camera, charge 19</td><td>Camera.preparation</td><td>Charge the camera</td><td>set_charge(20) → Check the lens</td></tr><tr><td>E02 Projector, hours 999</td><td>Projector.preparation</td><td>Check the ventilation</td><td>add_usage(1) → Arrange a projector check</td></tr><tr><td>E03 Equipment</td><td>Equipment.preparation</td><td>Check the item before use</td><td>No change</td></tr></table><p>The intervening camera.lend() returns True and leaves one unit available. Both preparation changes leave that availability unchanged. Trace the actual receiver and selected method as well as the returned string.</p>"
    ],
    [
      "Test common and specialised behaviour",
      "<p>Run the inherited lending/return tests on Equipment, Camera and Projector, not only on the superclass. Check zero stock, exact stock, insufficient stock, excessive return and invalid quantities. Then test camera charge 0, 19, 20, 100 and rejected −1/101/non-integer; test projector hours 0, 999, 1000 and rejected negative/non-integer input. Invalid setters must leave the instance unchanged.</p><p>Test a mixed report, an empty list and a new subtype using the existing report unchanged. Confirm preparation queries do not mutate state and that changes to one instance do not affect another. A successful demonstration output is useful but does not replace boundary tests.</p>"
    ],
    [
      "Practise, then complete the controlled task",
      "<p>Extend the supplied base class using inheritance, initialisation and overriding. Add AudioRecorder with its own preparation query while keeping the inherited stock contract. Use the mixed report to demonstrate polymorphism. Explain a separate composition design for a kit containing items.</p><p><a class=\"button\" href=\"unit3-inheritance-pack.zip\" download>Download classroom pack</a> · <a href=\"unit3-inheritance-workbook.md\" download>Student workbook</a> · <a href=\"unit3-inheritance-practical.md\" download>Controlled practical</a> · <a href=\"unit3-inheritance-answers.md\" download>Teacher guide</a>.</p><p>The pack supplies a self-contained base module, scaffold, worked solution and an original 20-mark practical with a separate marking guide. The controlled practical replaces lesson 4’s usual practice; it is already reserved in the teaching outline. Its duration, allowed resources and annual assessment contribution require the school’s final assessment outline. Teacher files are separate, not access-protected.</p><p>Curriculum reference: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 Year 12 syllabus, object-oriented programming</a>. Inheritance, abstraction and polymorphism are practised here; independent review and classroom evidence remain pending.</p>"
    ]
  ],
  "code": "\"\"\"Synthetic stock counts, not a borrower or calendar booking system.\"\"\"\nclass Equipment:\n    def __init__(self, equipment_id, name, total):\n        if not isinstance(equipment_id, str) or not equipment_id.strip():\n            raise ValueError(\"A non-empty equipment ID is required\")\n        if not isinstance(name, str) or not name.strip():\n            raise ValueError(\"A non-empty name is required\")\n        if type(total) is not int or total < 0:\n            raise ValueError(\"Total must be a non-negative integer\")\n        self._equipment_id = equipment_id.strip()\n        self._name = name.strip()\n        self._total = total\n        self._on_loan = 0\n\n    def get_id(self):\n        return self._equipment_id\n\n    def get_name(self):\n        return self._name\n\n    def available(self):\n        return self._total - self._on_loan\n\n    def lend(self, quantity=1):\n        if type(quantity) is not int or quantity <= 0:\n            raise ValueError(\"Quantity must be a positive integer\")\n        if quantity > self.available():\n            return False\n        self._on_loan += quantity\n        return True\n\n    def return_units(self, quantity=1):\n        if type(quantity) is not int or quantity <= 0:\n            raise ValueError(\"Quantity must be a positive integer\")\n        if quantity > self._on_loan:\n            return False\n        self._on_loan -= quantity\n        return True\n\n    def preparation(self):\n        return \"Check the item before use\"\n\n\nclass Camera(Equipment):\n    def __init__(self, equipment_id, name, total, charge):\n        if type(charge) is not int or not 0 <= charge <= 100:\n            raise ValueError(\"Charge must be an integer from 0 to 100\")\n        super().__init__(equipment_id, name, total)\n        self._charge = charge\n\n    def set_charge(self, charge):\n        if type(charge) is not int or not 0 <= charge <= 100:\n            raise ValueError(\"Charge must be an integer from 0 to 100\")\n        self._charge = charge\n\n    def preparation(self):\n        if self._charge < 20:\n            return \"Charge the camera\"\n        return \"Check the lens\"\n\nclass Projector(Equipment):\n    def __init__(self, equipment_id, name, total, lamp_hours):\n        if type(lamp_hours) is not int or lamp_hours < 0:\n            raise ValueError(\"Lamp hours must be a non-negative integer\")\n        super().__init__(equipment_id, name, total)\n        self._lamp_hours = lamp_hours\n\n    def add_usage(self, hours):\n        if type(hours) is not int or hours < 0:\n            raise ValueError(\"Hours must be a non-negative integer\")\n        self._lamp_hours += hours\n\n    def preparation(self):\n        if self._lamp_hours >= 1000:\n            return \"Arrange a projector check\"\n        return \"Check the ventilation\"\n\ndef preparation_report(items):\n    # Each item supports get_id() and preparation(), returning strings.\n    report = []\n    for item in items:\n        report.append(item.get_id() + \": \" + item.preparation())\n    return report\n\nif __name__ == \"__main__\":\n    # Fictional teaching thresholds, not real equipment advice.\n    camera = Camera(\"E01\", \"Camera\", 2, 19)\n    projector = Projector(\"E02\", \"Projector\", 1, 999)\n    generic = Equipment(\"E03\", \"Tripod\", 1)\n    items = [camera, projector, generic]\n    for line in preparation_report(items):\n        print(line)\n    print(camera.lend(), camera.available())\n    camera.set_charge(20)\n    projector.add_usage(1)\n    for line in preparation_report(items):\n        print(line)\n",
  "solution": "\"\"\"Synthetic stock counts, not a borrower or calendar booking system.\"\"\"\nclass Equipment:\n    def __init__(self, equipment_id, name, total):\n        if not isinstance(equipment_id, str) or not equipment_id.strip():\n            raise ValueError(\"A non-empty equipment ID is required\")\n        if not isinstance(name, str) or not name.strip():\n            raise ValueError(\"A non-empty name is required\")\n        if type(total) is not int or total < 0:\n            raise ValueError(\"Total must be a non-negative integer\")\n        self._equipment_id = equipment_id.strip()\n        self._name = name.strip()\n        self._total = total\n        self._on_loan = 0\n\n    def get_id(self):\n        return self._equipment_id\n\n    def get_name(self):\n        return self._name\n\n    def available(self):\n        return self._total - self._on_loan\n\n    def lend(self, quantity=1):\n        if type(quantity) is not int or quantity <= 0:\n            raise ValueError(\"Quantity must be a positive integer\")\n        if quantity > self.available():\n            return False\n        self._on_loan += quantity\n        return True\n\n    def return_units(self, quantity=1):\n        if type(quantity) is not int or quantity <= 0:\n            raise ValueError(\"Quantity must be a positive integer\")\n        if quantity > self._on_loan:\n            return False\n        self._on_loan -= quantity\n        return True\n\n    def preparation(self):\n        return \"Check the item before use\"\n\n\nclass Camera(Equipment):\n    def __init__(self, equipment_id, name, total, charge):\n        if type(charge) is not int or not 0 <= charge <= 100:\n            raise ValueError(\"Charge must be an integer from 0 to 100\")\n        super().__init__(equipment_id, name, total)\n        self._charge = charge\n\n    def set_charge(self, charge):\n        if type(charge) is not int or not 0 <= charge <= 100:\n            raise ValueError(\"Charge must be an integer from 0 to 100\")\n        self._charge = charge\n\n    def preparation(self):\n        if self._charge < 20:\n            return \"Charge the camera\"\n        return \"Check the lens\"\n\nclass Projector(Equipment):\n    def __init__(self, equipment_id, name, total, lamp_hours):\n        if type(lamp_hours) is not int or lamp_hours < 0:\n            raise ValueError(\"Lamp hours must be a non-negative integer\")\n        super().__init__(equipment_id, name, total)\n        self._lamp_hours = lamp_hours\n\n    def add_usage(self, hours):\n        if type(hours) is not int or hours < 0:\n            raise ValueError(\"Hours must be a non-negative integer\")\n        self._lamp_hours += hours\n\n    def preparation(self):\n        if self._lamp_hours >= 1000:\n            return \"Arrange a projector check\"\n        return \"Check the ventilation\"\n\ndef preparation_report(items):\n    # Each item supports get_id() and preparation(), returning strings.\n    report = []\n    for item in items:\n        report.append(item.get_id() + \": \" + item.preparation())\n    return report\n\nif __name__ == \"__main__\":\n    # Fictional teaching thresholds, not real equipment advice.\n    camera = Camera(\"E01\", \"Camera\", 2, 19)\n    projector = Projector(\"E02\", \"Projector\", 1, 999)\n    generic = Equipment(\"E03\", \"Tripod\", 1)\n    items = [camera, projector, generic]\n    for line in preparation_report(items):\n        print(line)\n    print(camera.lend(), camera.available())\n    camera.set_charge(20)\n    projector.add_usage(1)\n    for line in preparation_report(items):\n        print(line)\n\n\nclass AudioRecorder(Equipment):\n    def preparation(self):\n        return \"Check recording space\"\n\nif __name__ == \"__main__\":\n    recorder = AudioRecorder(\"E04\", \"Recorder\", 1)\n    print(preparation_report([recorder])[0])\n",
  "practice": [
    [
      "TRACE",
      "Which preparation() runs for a Camera stored in a list of Equipment objects?",
      "Camera.preparation runs for the Camera instance. The collection does not convert the object to its superclass."
    ],
    [
      "INITIALISE",
      "Does super().__init__(...) create a second Equipment object?",
      "No. It reuses the superclass initialisation on the same instance, setting common state before subclass state is added."
    ],
    [
      "DESIGN",
      "Should a kit containing a camera and tripod inherit from Camera?",
      "Usually no: the kit has component items rather than being a camera. Store components and use composition; justify the model against its required operations."
    ],
    [
      "CONTRACT",
      "Why should preparation() return a string for every subtype?",
      "The shared report expects compatible behaviour. A different result type or extra required caller argument would break the interface."
    ],
    [
      "DISTINGUISH",
      "Is Equipment abstract simply because callers see an abstraction?",
      "No. Equipment is concrete and can be instantiated here. Abstraction is the useful interface; an enforced abstract base class is a separate mechanism."
    ]
  ],
  "task": "Implement Camera and Projector from the scaffold, reuse the inherited stock methods, trace the mixed report and test boundary changes. Add AudioRecorder without modifying preparation_report. Explain a composition design for a kit. After guided practice, use the separate controlled practical in lesson 4.",
  "recap": "Inheritance shares a base contract; overriding supplies specialised behaviour. super() reuses base initialisation on the same instance, and polymorphism lets one interface call the appropriate method. Preserve contracts, use composition for component relationships and test both inherited and new behaviour.",
  "lessons": [
    "Lesson 1: retrieve Equipment and state contracts; design hierarchy versus composition; initialise subclasses with super(); trace inherited methods.",
    "Lesson 2: override preparation; trace mixed-object dispatch; distinguish inheritance, encapsulation, abstraction and polymorphism.",
    "Lesson 3: guided implementation and boundary testing; add a conforming subtype; rehearse the practical format and discuss feedback.",
    "Lesson 4: original controlled programming practical in the school’s allocated lesson. Suggested 40 minutes plus setup/submission time; adjust to actual period length and school conditions. No major new concept is introduced during the task."
  ],
  "reference": "https://docs.python.org/3/tutorial/classes.html#inheritance",
  "refTitle": "Python classes: inheritance and overriding",
  "quiz": {
    "q": "Which demonstrates polymorphism in this chapter?",
    "options": [
      "Every item stores the same equipment ID.",
      "The same item.preparation() call uses different subtype implementations.",
      "The report checks every subtype using an if/elif chain."
    ],
    "answer": 1,
    "explanation": "The mixed collection uses a common interface while each object supplies its appropriate preparation behaviour."
  },
  "next": "#plan-3-6"
});
chapters.push({
  "id": "unit3-project",
  "unit": 3,
  "week": "7–10",
  "title": "Developing a software solution",
  "badge": "PYTHON 3 / PROJECT",
  "intro": "Investigate, design, build and evaluate a small equipment-loan application with evidence for every requirement.",
  "objectives": [
    "Translate a problem into measurable requirements and acceptance checks.",
    "Design purposeful classes, data structures and algorithm boundaries.",
    "Build a console solution in twelve supervised project lessons.",
    "Test state transitions, authenticate work and evaluate against requirements."
  ],
  "sections": [
    [
      "A project small enough to finish",
      "<p>A fictional school media club needs a console tool for same-session equipment loans. Users select a known synthetic borrower, find a stock item, issue a loan and record its complete return. Existing stock classes supply availability and preparation messages; a coordinator keeps stock and loan history consistent.</p><p>This is a scaled classroom booking application, not a future-reservation calendar. Core scope excludes dates, partial returns, real people, login, concurrency, GUI, database and persistent storage. Quitting loses the session; the interface must say so. Persistence can be negotiated as an extension only after core evidence is complete. Do not quietly expand the project beyond its supervised time.</p>"
    ],
    [
      "Turn the problem into measurable requirements",
      "<p>Clarify what counts as a successful issue, a duplicate ID, a return and an outstanding report. Assign each requirement an ID so design decisions and tests can point to it.</p><table><tr><th>ID</th><th>Required behaviour</th><th>Acceptance evidence</th></tr><tr><td>R1</td><td>Show a synthetic catalogue and available units</td><td>Initial availability E01=2, E02=1, E03=3</td></tr><tr><td>R2</td><td>Find equipment by ID without rearranging the catalogue</td><td>E01 found; E99 missing; catalogue order unchanged</td></tr><tr><td>R3</td><td>Issue a uniquely identified loan to a known borrower</td><td>L001/B001/E01/quantity 1 succeeds; availability falls by 1</td></tr><tr><td>R4</td><td>Reject invalid or impossible requests without state change</td><td>Unknown IDs, duplicate loan ID, invalid quantity and insufficient stock</td></tr><tr><td>R5</td><td>Return an active loan once and restore its stored quantity</td><td>First return succeeds; repeated return fails without increasing stock</td></tr><tr><td>R6</td><td>Report active loans in ascending loan-ID order</td><td>New report is ordered; retained history stays in issue order</td></tr><tr><td>R7</td><td>Use a common interface across purposeful equipment subclasses</td><td>Mixed preparation report uses overridden methods</td></tr><tr><td>R8</td><td>Provide a repeatable console workflow with clear feedback</td><td>Catalogue/search/issue/return/report/quit; bad menu/input recovers</td></tr><tr><td>R9</td><td>Provide evidence of testing, versions and evaluation</td><td>Expected/actual logs, repairs, restore check and requirement evaluation</td></tr></table><p>IDs are non-empty strings, trimmed and compared case-insensitively through uppercase normalisation. Loan IDs are unique across the whole retained history, including returned loans. Quantities are positive integers; booleans are not quantities. Text input is converted before model processing. A missing known record or insufficient stock is a business rejection, distinct from malformed input.</p>"
    ],
    [
      "Design responsibilities and shared references",
      "<p>Equipment owns its stock rules. Camera and Projector inherit them and override preparation. Loan stores a loan ID, borrower ID, equipment reference, quantity and active status. BookingSystem has a collection of equipment and loans, coordinates requests and produces reports. The console handles input/output; the model contains no input() or print().</p><pre><code>Console → BookingSystem\nBookingSystem has Equipment instances and Loan records\nCamera / Projector inherit from Equipment\nLoan refers to one Equipment instance</code></pre><p>Draw a class/responsibility sketch and a structure chart of menu operations before implementation. The kit/coordinator relationship is composition, not a reason to inherit BookingSystem from Equipment. A Loan stores the quantity needed for the later return; asking the user to re-enter that quantity could restore the wrong stock.</p><p>Each successful issue decreases one item’s availability and adds exactly one active record. Rejected requests do neither. A successful return increases availability by the stored quantity and marks that record inactive. All stock-changing operations must go through the coordinator; shared references and underscore conventions are not a security boundary.</p>"
    ],
    [
      "Choose and justify the algorithms",
      "<p>Use a linear catalogue lookup for this small unsorted collection. It preserves original order and has O(n) worst-case search time. Build a new outstanding-report list and insertion-sort its rows by loan ID: easy to trace and reasonable for a small report, with O(m²) worst-case sorting time. Explain n as catalogue size and m as active-loan count.</p><p>Report creation and copying also cost time/space: if h is the number of retained history records, filtering plus sorting costs O(h + m²) worst-case time and O(m) report space. The reference returns value snapshots and leaves stored history in issue order. Sorting directly on the history would change its meaning. IDs are strings; L002 precedes L010 using fixed-width sample IDs. Arbitrary IDs are ordered lexicographically, not by extracting a numeric suffix.</p><pre><code>VALIDATE IDs and positive integer quantity\nIF loan ID already exists OR borrower/item unknown THEN reject\nCREATE the prospective loan record\nIF equipment cannot lend quantity THEN reject\nAPPEND the loan record\nRETURN success</code></pre><p>This illustrative pseudocode identifies the mutation boundary. The model checks every condition before changing live state where possible. Keep algorithm design, input conversion and error feedback separate.</p>"
    ],
    [
      "Develop one tested slice at a time",
      "<p>Start with a catalogue query and search. Next implement issue/return and prove their invariants, then reports and the menu. Use stubs that raise NotImplementedError rather than silently returning success. For each slice, save a useful version, run a normal and a rejected case, and record the change before proceeding.</p><pre><code># Illustrative design boundary: validate before changing stock/history.\ndef issue_loan(system, loan_id, borrower_id, equipment_id, quantity_text):\n    try:\n        quantity = int(quantity_text)\n        issued = system.borrow(loan_id, borrower_id, equipment_id, quantity)\n    except ValueError:\n        return &quot;Invalid request; no loan issued&quot;\n    return &quot;Issued&quot; if issued else &quot;Rejected; no loan issued&quot;\n</code></pre><p>This small boundary example assumes a BookingSystem satisfying R1–R9; it is not the entire application. int() conversion accepts surrounding whitespace and signs. If the stakeholder needs a stricter text format, specify and test that rule. The class still checks positive integer quantities, preventing direct callers from bypassing the core contract.</p><p>The pack’s runnable teacher reference illustrates one design, not the only valid solution. Its Loan fields are internal records accessed by the coordinator; object identity is shared with the catalogue. The single-session model assumes trusted code and sequential requests. It is not transactional persistence or a production permission system.</p>"
    ],
    [
      "Use the twelve supervised project lessons",
      "<p>These workshops are embedded in the existing semester allocation. Week 7 has four project lessons; weeks 8 and 9 have two each alongside explicit reliability/maintenance teaching; week 10 has four. Total: 12 project lessons, not 12 extra lessons. Weeks 17–18 remain the blocked exam period.</p><table><tr><th>Week / lesson</th><th>Project milestone</th></tr><tr><td>7 / 1</td><td>Investigate the supplied problem; agree scope and stakeholder questions</td></tr><tr><td>7 / 2</td><td>Write measurable requirements and acceptance checks</td></tr><tr><td>7 / 3</td><td>Design classes, data structures, menu and algorithm pseudocode</td></tr><tr><td>7 / 4</td><td>Design checkpoint, schedule and stub plan</td></tr><tr><td>8 / 3</td><td>Build catalogue/search and test queries</td></tr><tr><td>8 / 4</td><td>Build issue/return transitions and test rejected requests</td></tr><tr><td>9 / 3</td><td>Integrate menu, reports and inherited preparation behaviour</td></tr><tr><td>9 / 4</td><td>Review code; test mixed operations; document sources and repairs</td></tr><tr><td>10 / 1</td><td>Run requirement-linked acceptance scenarios</td></tr><tr><td>10 / 2</td><td>Repair, retest and restore a saved version</td></tr><tr><td>10 / 3</td><td>Demonstrate and explain individual work</td></tr><tr><td>10 / 4</td><td>Submit, evaluate and record a retrospective</td></tr></table><p>Use a short Gantt-style schedule and dependency list: requirements → class/API design → model → interface/report integration → acceptance → evaluation. Review scope at the week 7 checkpoint and reduce optional features when delays occur; do not rely on extensive homework for core completion.</p>"
    ],
    [
      "Test the state transitions, not just the menu",
      "<p>Use fixture stock E01=2, E02=1 and E03=3 with borrowers B001–B003. Issue L002 for one E01 to B001 and L001 for one E02 to B002. Reject a further E02 loan because availability is zero. The outstanding report must list L001 then L002. Return L002: E01 availability becomes 2. Returning L002 again must fail and leave it at 2.</p><p>Test duplicate loan IDs including closed ones, unknown borrowers/items, zero/negative/text/bool quantity, empty catalogue/reports and repeated returns. Compare full state before/after rejection, not only the message. Verify that sorting a report preserves history order and that editing a report snapshot does not alter live stock/loans.</p><p>Separate unit tests of model operations from user acceptance scenarios. In weeks 8–9, the reliability chapter will extend test planning and review; this brief already needs expected/actual evidence. A larger synthetic report can reveal growth, but a school threshold or load target must be specified rather than invented.</p>"
    ],
    [
      "Submit evidence and evaluate against the requirements",
      "<p>Keep the problem statement, R1–R9 mapping, class/structure design, search/sort pseudocode, workshop schedule, source code, tests and repair/version records. Demonstrate a fresh successful issue, a rejected request, a complete return and a sorted active report. Explain a method override, a shared object reference and one algorithm choice.</p><p>The teacher guide supplies an original 40-mark analytic rubric across investigation, design, implementation, testing and evaluation/authentication. It is a draft project rubric, not an official SCSA marking key. The planning outline proposes a 20% annual contribution for this semester project; the school must confirm its adopted assessment outline and conditions.</p><p>Evaluation names each requirement as met/partly met/not met and cites evidence, then identifies a realistic next improvement. Record consulted code/resources and assistance honestly. Use synthetic borrower IDs and explain why a session-only tool would be inadequate for real loan accountability.</p><p><a class=\"button\" href=\"unit3-project-pack.zip\" download>Download complete project pack</a> · <a href=\"unit3-project-brief.md\" download>Student brief</a> · <a href=\"unit3-project-workbook.md\" download>Design/evidence workbook</a> · <a href=\"unit3-project-teacher-guide.md\" download>Teacher rubric and reference notes</a>. Teacher files are separate, not access-protected. Copy only student files into a controlled assessment workspace.</p><p>Curriculum reference: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 Year 12 syllabus, programming development and assessment</a>. This project samples skills; it is not a full-unit coverage certification.</p>"
    ],
    [
      "Worked Gantt schedule and dependencies",
      "<p>The chart maps the existing twelve workshops. Each occupied cell is one project lesson, not a full week. Requirements precede design, core transitions precede integration, and acceptance precedes evaluation. Reliability teaching occupies the other two lessons in weeks 8–9.</p><figure><img src=\"unit3-project-gantt.svg\" alt=\"Twelve project workshops: investigate 7.1–7.2, design 7.3–7.4, core build 8.3–8.4, integrate 9.3–9.4, acceptance 10.1, repair and restore 10.2, demonstration 10.3, evaluation 10.4.\" style=\"width:100%;height:auto\"><figcaption>Original baseline schedule; dependency list and editable CSV are in the pack.</figcaption></figure><p>If core build slips one workshop, do not silently add a thirteenth. At the checkpoint, reduce optional scope or revise the internal allocation while retaining agreed core requirements and acceptance/evaluation evidence. Record planned versus actual progress and the reason for any change. The chart demonstrates scheduling, not actual student completion.</p><p><a href=\"unit3-project-gantt.csv\" download>Editable schedule CSV</a> · <a href=\"unit3-foundations-pack.zip\" download>Foundation and scheduling pack</a>. Use the editable schedule to practise planning your own work.</p>"
    ]
  ],
  "practice": [
    [
      "REQUIREMENT",
      "Why should an unsuccessful borrow leave both stock and history unchanged?",
      "An issue must be an all-or-nothing state transition in this model. Reducing stock without a corresponding active loan creates inconsistent records."
    ],
    [
      "DESIGN",
      "Why store the issued quantity in the Loan record?",
      "The return operation must restore exactly what was issued. A new user-entered quantity could over-return or under-return stock."
    ],
    [
      "ALGORITHM",
      "Why sort a new report rather than the stored loan history?",
      "The report needs loan-ID order, while history records issue order. A copied report preserves the underlying history semantics."
    ],
    [
      "SCOPE",
      "Can the core tool promise future dated reservations or reliable storage after quitting?",
      "No. These are explicitly outside the single-session brief. State that limitation and negotiate extensions separately."
    ]
  ],
  "task": "Complete the student brief and evidence workbook using the twelve workshop milestones. Implement and demonstrate R1–R9, preserve the stock/loan invariants and explain your design decisions. Use the student scaffold; keep the teacher reference separate during assessment.",
  "solution": "One illustrative design uses Equipment/Camera/Projector, Loan and BookingSystem with a separate console. Linear lookup preserves catalogue order; insertion sorting a copied active report preserves issue history. Rejections do not change stock or loans; complete returns use the stored quantity once. The teacher reference and rubric in the pack show one possible implementation and evidence set, not a required code listing.",
  "recap": "A project is more than working code: measurable requirements guide design, state invariants guide implementation, tests provide evidence and evaluation explains fitness for purpose. Keep scope inside the allocated workshops and document limitations honestly.",
  "lessons": [
    "Week 7 lessons 1–4: investigate, specify, design and checkpoint; four project lessons.",
    "Week 8 lessons 3–4: build catalogue/search and issue/return; two project workshops alongside reliability teaching.",
    "Week 9 lessons 3–4: integrate, review and test; two project workshops alongside maintenance/ethics teaching.",
    "Week 10 lessons 1–4: acceptance, repair/restore, demonstration and evaluation/submission; four project lessons. Twelve in total, already embedded in the semester."
  ],
  "reference": "https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF",
  "refTitle": "SCSA Year 12 syllabus: development process and project assessment",
  "quiz": {
    "q": "Which is the strongest evidence that repeated returns are handled correctly?",
    "options": [
      "A screenshot of the menu.",
      "One successful borrow operation.",
      "Expected/actual tests showing the first return succeeds and the second leaves stock unchanged."
    ],
    "answer": 2,
    "explanation": "Test the required transition and the rejected repeat, including state before and after."
  },
  "next": "#plan-3-7"
});
chapters.push({
  "id": "unit3-reliability",
  "unit": 3,
  "week": "8–9",
  "title": "Reliable software: testing and review",
  "badge": "PYTHON 3 / RELIABILITY",
  "intro": "Choose meaningful tests, isolate defects and review changes using evidence from the equipment-loan project.",
  "objectives": [
    "Distinguish unit, integration, acceptance, regression and load testing.",
    "Choose normal/boundary/rejected data and check expected state changes.",
    "Automate component checks and diagnose syntax/runtime/logic faults.",
    "Measure a defined workload, review code and explain developer responsibilities."
  ],
  "sections": [
    [
      "Start with a requirement and an expected result",
      "<p>Reliable software needs evidence that it behaves correctly under the conditions that matter. Begin with the contract rather than the output you happen to observe. Project requirement R5 says a complete return succeeds once, restores the recorded quantity and rejects a repeat without another stock increase.</p><p>Record requirement ID, starting state, input, expected result and expected final state before running the test. Then record actual result/state, pass/fail, the defect reference and a retest. A screenshot of a friendly menu cannot establish this state transition. Tests sample behaviour; a passing set does not prove the absence of all faults.</p><table><tr><th>Category</th><th>Purpose</th><th>Loan-project example</th></tr><tr><td>Unit</td><td>Check a small operation’s contract</td><td>Equipment.lend(2) at exactly two available units</td></tr><tr><td>Integration</td><td>Check cooperating parts</td><td>Coordinator changes Equipment and Loan consistently</td></tr><tr><td>User acceptance</td><td>Check the solution meets agreed user needs</td><td>User issues, returns and locates a loan through the console</td></tr><tr><td>Regression</td><td>Recheck established behaviour after a change</td><td>Repeat-return rejection still works after report refactoring</td></tr><tr><td>Load / performance</td><td>Check a defined representative workload and measured resources</td><td>Increasing synthetic history volume and mixed transactions</td></tr></table><p>These categories can overlap: a regression suite can include unit and integration tests. A user acceptance trial needs the interface and a scenario, not only method calls.</p>"
    ],
    [
      "Choose normal, boundary and rejected data",
      "<p>For a fresh item with two units, quantities 1 and 2 are valid; 0 is outside the positive-integer domain and 3 is well-formed but exceeds stock. Test both boundaries and the different rejection paths. Text conversion belongs at the console boundary; model tests should also try direct invalid arguments, including True because Python treats booleans as a kind of integer.</p><table><tr><th>Input / setup</th><th>Expected</th><th>State check</th></tr><tr><td>Fresh E01, quantity 2</td><td>True</td><td>Availability 0; exactly one active loan</td></tr><tr><td>Fresh E01, quantity 3</td><td>False</td><td>Stock/history unchanged</td></tr><tr><td>Quantity 0, −1, text or bool in model call</td><td>ValueError</td><td>No stock/history change</td></tr><tr><td>Valid request, unknown B999 or E99</td><td>False</td><td>No stock/history change</td></tr><tr><td>Closed loan ID reused</td><td>False</td><td>History and stock unchanged</td></tr><tr><td>Empty history</td><td>[] active report</td><td>No invented record</td></tr></table><p>Use a fresh fixture for independent tests. Deliberately sequenced tests instead document every preceding operation, so a repeat return is tested after a successful issue and first return. Include duplicates, empty collections, the largest agreed workload and mixed valid/rejected transactions.</p>"
    ],
    [
      "Automate a component check with unittest",
      "<pre><code>import unittest\nfrom project_reference import demo_system\n\nclass ReturnTests(unittest.TestCase):\n    def setUp(self):\n        self.system = demo_system()  # Fresh fixture for every test.\n\n    def test_return_only_once(self):\n        self.assertTrue(self.system.borrow(&quot;L001&quot;, &quot;B001&quot;, &quot;E01&quot;, 2))\n        self.assertTrue(self.system.return_loan(&quot;L001&quot;))\n        self.assertEqual(self.system.find_equipment(&quot;E01&quot;).available(), 2)\n        before = self.system.catalogue(), self.system.history()\n        self.assertFalse(self.system.return_loan(&quot;L001&quot;))\n        self.assertEqual((self.system.catalogue(), self.system.history()), before)\n\nif __name__ == &quot;__main__&quot;:\n    unittest.main()\n</code></pre><p>Run this example beside the project pack’s project_reference.py and project_support.py. The full twelve-test suite is included in this chapter’s pack. setUp supplies a fresh system for each test; methods beginning test_ are discovered by the runner. assertEqual checks expected values, assertTrue/assertFalse check success/rejection, and assertRaises checks an expected exception.</p><p>This example uses real cooperating Equipment/Loan objects, so it is a integration check rather than an isolated unit test. The framework’s TestCase inheritance gives us assertion and runner behaviour. A failed assertion reports a failure; an unexpected exception reports an error. A caught expected ValueError can be a passing test.</p><p>For your own project, adapt the import and fixture to your implementation while keeping requirement-based expectations. Do not merely copy the current implementation’s result into the expected column. Retain separate user acceptance evidence and tests you designed yourself.</p>"
    ],
    [
      "Isolate a fault before changing code",
      "<p>Classify the observed problem: syntax faults prevent parsing, runtime faults occur while executing, and logic faults run but produce incorrect behaviour. A missing colon, division by zero and an out-of-range index are different failures. Use the traceback location, the smallest reproducing input and a prediction of state to narrow the cause.</p><pre><code>values = [101, 104]\n# print(values[2]) would raise IndexError: valid indexes are 0 and 1.\n# total / count would raise ZeroDivisionError when count is 0.</code></pre><p>For a logic fault, desk-check a trace table, add temporary prints or set a breakpoint immediately before the disputed update. Observe the condition, active flag, stored quantity and availability. Step through one operation at a time. Form a specific hypothesis and change one relevant part, then rerun the reproducer and the broader regression suite.</p><p>The isolated fault lab starts with total 3, availability 2, quantity 1 and an active loan. Its bad routine adds quantity every time, even after the first return.</p><table><tr><th>Call</th><th>Expected result / availability</th><th>Faulty actual result / availability</th></tr><tr><td>First return</td><td>True / 3</td><td>True / 3</td></tr><tr><td>Second return</td><td>False / 3</td><td>True / 4</td></tr></table><p>An early guard for an inactive loan must run before the stock update. The lab’s two probes intentionally fail before repair; keep the expectations intact. The lab is separate from the project reference and is not imported by it.</p>"
    ],
    [
      "Plan a representative load and file-size trial",
      "<p>Specify what is being exercised: record count, mix of issues/returns/searches/rejections/reports, file bytes, environment and response measurements. Represent the intended operating conditions, including transaction types and larger files; do not describe a three-record demonstration as a production load trial.</p><p>The bounded sequential harness creates descending synthetic loan IDs, returns every fourth loan, rejects a historical duplicate, performs known/missing searches and times repeated outstanding reports. It checks stock, counts, ordering and retained history alongside timing. It has no concurrent users or network, so it cannot measure a server’s concurrency capacity.</p><pre><code>python reliability_load.py --records 100 --repeats 3\npython reliability_load.py --records 1000 --repeats 3\npython reliability_load.py --records 1000 --repeats 3 --csv synthetic-load.csv</code></pre><p>The optional CSV experiment creates a new synthetic file without overwriting an existing one, checks its row count and records bytes plus separate write/read timings. This tests generated file handling; it does not add persistence or reload to the session-only project. The classroom harness accepts 1–5000 records and 1–10 report repeats.</p><p>perf_counter measures elapsed duration. Record environment, version, workload and repeat count; compare like-for-like trials and investigate outliers. Median and maximum here summarise only the small set of report repeats, not a promised service percentile. State a stakeholder-agreed acceptance limit before claiming performance meets a requirement. No hardware-independent timing threshold is supplied.</p><p>For h history records and m active rows, this reference’s report takes O(h + m²) worst-case time and O(m) report space. Descending IDs exercise insertion sort’s expensive ordering. Timing supports an experiment; it does not replace the algorithm’s growth analysis. Synthetic representative data is used here; the trial is not evidence from a live deployment.</p>"
    ],
    [
      "Review a change and retain regression evidence",
      "<p>Code review checks whether the change meets its requirement and preserves existing contracts. Read the changed code and affected callers, explain a concrete defect or trade-off, and propose a focused repair. “Looks good” or a preference for different variable spelling is weak evidence.</p><table><tr><th>Review question</th><th>Evidence to inspect</th></tr><tr><td>Does rejection precede mutation?</td><td>Validation/guards; before/after tests</td></tr><tr><td>Are stock and history consistent?</td><td>Recorded quantity, active flag and repeat-return guard</td></tr><tr><td>Does a report preserve source order?</td><td>Snapshot creation, copy sorting and history regression</td></tr><tr><td>Are subclass calls compatible?</td><td>Method signatures, result types, mixed-object tests</td></tr><tr><td>Can errors be understood and repaired?</td><td>Clear responsibilities, precise exceptions and input feedback</td></tr><tr><td>Are reuse and assistance recorded?</td><td>Source/permission records and authorship explanation</td></tr></table><p>A review comment names the trigger, affected requirement, incorrect behaviour and proposed correction. After fixing it, rerun the focused test and relevant established tests. Retesting checks the particular correction; regression checking asks what else changed. Tests and review complement each other: neither automatically replaces the other.</p>"
    ],
    [
      "Maintain versions, backups and honest limitations",
      "<p>Give each tested change a meaningful version record: what changed, why, evidence and remaining limitations. A version history helps recover or compare earlier source; a backup provides a separate recovery copy. A second file on the same failing device is not sufficient protection from that device’s loss. Demonstrate restoration by running known behaviour from the recovered version.</p><p>Keep the project’s session-loss message. A request for future dated bookings or durable records changes the requirements and data design; it is not a small wording fix. Evaluate maintenance choices against stakeholders, scope, data handling and available time. Link the restored result and defect log to R9 rather than claiming that merely saving a file proves recoverability.</p><p>When a user reports a fault, record how to reproduce it, its impact and the affected version. Prioritise correction, preserve relevant evidence and communicate actual limitations. Do not silently change a test expectation to hide a failure or call an unfinished scaffold complete.</p>"
    ],
    [
      "Review developer responsibilities through scenarios",
      "<p>Software choices affect people as well as code. Use the following original scenarios to identify a benefit/risk, affected stakeholders and a developer response. Record the evidence and limitations rather than assuming technical correctness resolves every responsibility.</p><table><tr><th>Scenario</th><th>Responsibility to explain</th></tr><tr><td>An unofficial replacement installer unexpectedly modifies files</td><td>Malware risk: inspect source/provenance, stop using the suspicious copy and use an appropriate trusted recovery process</td></tr><tr><td>A club relies on a session-only tool as its sole loan record</td><td>Reliance: disclose data-loss limits and design a suitable record/recovery process before operational use</td></tr><tr><td>A public social post exposes identifiable borrower records</td><td>Social networking/cyber safety: minimise disclosure, use synthetic examples and apply the school’s response process</td></tr><tr><td>A copied web answer confidently states an unverified stock fact</td><td>Information quality: verify against authoritative evidence and distinguish verified data from unsupported claims</td></tr><tr><td>A reused code example has its source and permission information removed</td><td>Intellectual property/authorship: acknowledge contributions, retain permission/licence records and check reuse conditions; attribution alone does not grant permission</td></tr><tr><td>A report hides repeated-return failures from the customer</td><td>Quality and user feedback: report known defects honestly, reproduce/correct them and verify the repair</td></tr><tr><td>The interface uses tiny text, colour-only feedback and unclear prompts</td><td>Ergonomics/inclusivity: use readable presentation, keyboard-friendly interaction and explicit text feedback; test with different user needs</td></tr><tr><td>A team hides assistance, disregards its code of conduct or proposes sharing a harmful file</td><td>Conduct: document contributions, respect professional/school rules and do not generate or transmit malware</td></tr></table><p>These are discussion cases, not instructions to run unknown software or publish records. Developers should receive recognition for their own contributions as well as acknowledging others. Relate the response to developer rights/responsibilities, the quality of a solution and its effect on users. This textbook’s original content is shared under CC BY 4.0 and its original code under the MIT licence. Check any separately credited third-party material against its own reuse conditions.</p>"
    ],
    [
      "Fit the work alongside the project",
      "<p>There are four explicit lessons across weeks 8–9: two each week. The other two lessons each week remain the previously allocated project workshops. Week 10 keeps its four acceptance/refinement/demonstration/evaluation project lessons. This chapter adds no extra assessment or major project.</p><p><a class=\"button\" href=\"unit3-reliability-pack.zip\" download>Download classroom pack</a> · <a href=\"unit3-reliability-workbook.md\" download>Student workbook</a> · <a href=\"unit3-reliability-acceptance.md\" download>Acceptance scenarios</a> · <a href=\"unit3-reliability-answers.md\" download>Teacher guide</a>. The pack contains runnable reference tests, the isolated faulty/repaired lab, workload tools and evidence templates. Teacher files are separate, not access-protected.</p><p>Technical references: <a href=\"https://docs.python.org/3/library/unittest.html\">Python unittest</a> and <a href=\"https://docs.python.org/3/library/time.html#time.perf_counter\">perf_counter</a>. Curriculum reference: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 Year 12 syllabus: testing, debugging and developer responsibilities</a>. Teacher review, classroom evidence and a full Unit 3 coverage audit remain pending.</p>"
    ]
  ],
  "practice": [
    [
      "CHOOSE",
      "Why does an acceptance trial need more than calling return_loan directly?",
      "The trial checks the user’s agreed workflow through the interface. A model/component test checks internal contracts but can miss confusing input or feedback."
    ],
    [
      "DIAGNOSE",
      "The faulty lab succeeds twice and increases availability from 3 to 4. What must the repair do?",
      "Reject the inactive loan before adding stock. Retain a regression check for both the False result and unchanged state."
    ],
    [
      "LOAD",
      "Can a sequential 1000-record harness establish safe concurrent server capacity?",
      "No. It measures its specified local workload and environment. Concurrency, networking and deployment conditions require a different planned trial."
    ],
    [
      "REVIEW",
      "Why does a passing repair test not end regression checking?",
      "The fix may affect other previously correct paths. Rerun relevant established cases and inspect affected callers as well as the reproducer."
    ],
    [
      "RESPONSIBILITY",
      "Does adding an author’s name automatically permit reusing their code?",
      "No. Acknowledge the source and also check and retain the applicable permission/licence conditions."
    ]
  ],
  "task": "Complete the four explicit lessons: build expected/actual component evidence, reproduce and repair the isolated return fault, run a documented representative load/file experiment, review a change and respond to a developer-responsibility scenario. Apply the evidence to R1–R9 in the project workshops without adding project periods.",
  "solution": "A defensible evidence set includes fresh fixtures and boundary/rejection state checks, a failing reproducer retained after repair, passing focused and regression tests, separately documented user acceptance scenarios, workload/environment/timing records without unsupported capacity claims, and specific code-review and responsibility responses. The pack supplies a twelve-test reference suite and an illustrative repair; student tests and explanations still need individual evidence.",
  "recap": "Test against requirements, not accidental output. Use the right scope, inspect state, isolate a cause and retain regression evidence. Measure a specified workload, review affected contracts and report the solution’s limits honestly.",
  "lessons": [
    "Week 8 lesson 1: test scope/data; worked unittest component checks; isolate and repair the return fault with trace/breakpoint evidence.",
    "Week 8 lesson 2: acceptance versus load; mixed transaction/CSV experiment; record workload, environment, correctness and timings. Week 8 lessons 3–4 remain project workshops.",
    "Week 9 lesson 1: peer review an affected contract; focused retest/regression; version and restore evidence.",
    "Week 9 lesson 2: developer impact/rights/responsibilities scenarios; user feedback and maintenance choices. Week 9 lessons 3–4 remain project workshops; week 10 project completion is unchanged."
  ],
  "reference": "https://docs.python.org/3/library/unittest.html",
  "refTitle": "Python unittest: fixtures, assertions and runners",
  "quiz": {
    "q": "Which gives the strongest regression evidence after fixing the repeated-return defect?",
    "options": [
      "Change the expected output to match the faulty routine.",
      "Recheck only that the menu opens.",
      "Keep the repeat-return result/state tests and rerun relevant established loan/report checks."
    ],
    "answer": 2,
    "explanation": "Preserve the requirement-based reproducer and check affected existing behaviour after the change."
  },
  "next": "#plan-3-8"
});
chapters.push({
  "id": "unit3-network-models",
  "unit": 3,
  "week": 11,
  "title": "Network models and protocols",
  "badge": "NETWORKS / PACKET TRACING",
  "intro": "Follow a message through layered responsibilities, distinguish switching from routing and explain TCP/UDP transport.",
  "objectives": [
    "Compare all seven OSI layers with the four-layer DoD TCP/IP model.",
    "Trace encapsulation, local link forwarding and routed IP traffic.",
    "Compare TCP/UDP behaviour, header fields and sequence/acknowledgement meaning.",
    "Calculate model packet/frame lengths and justify protocol choices."
  ],
  "sections": [
    [
      "Use layers to explain a communication",
      "<p>A protocol sets rules for communication; a layer groups related responsibilities. This helps us describe what an application, transport protocol, router, switch and medium each contribute without treating a message as one undifferentiated packet. A model is a way to reason about the system, not a program installed on the network.</p><p>Start with a concrete request: a client contacts a media server on another LAN. Ask which service it wants, which host it targets, how the next local hop is reached and how the bits cross the medium. These are different questions, answered by different parts of the stack.</p>"
    ],
    [
      "Compare the seven-layer OSI and four-layer TCP/IP models",
      "<figure><img src=\"unit3-layer-model.svg\" alt=\"OSI layers 7 to 5 correspond broadly to TCP-IP application, layer 4 to transport, layer 3 to internet and layers 2 to 1 to network/link.\" style=\"width:100%;height:auto\"><figcaption>Original teaching correspondence between the models.</figcaption></figure><table><tr><th>OSI layer</th><th>Main responsibility</th><th>DoD TCP/IP group</th></tr><tr><td>7 Application</td><td>Network services for application processes</td><td>Application</td></tr><tr><td>6 Presentation</td><td>Represent data: encoding, format, compression/security-related transformations</td><td>Application</td></tr><tr><td>5 Session</td><td>Organise dialogue/session coordination</td><td>Application</td></tr><tr><td>4 Transport</td><td>End-to-end transport, ports and protocol-specific delivery behaviour</td><td>Transport</td></tr><tr><td>3 Network</td><td>Logical addressing and forwarding between networks</td><td>Internet</td></tr><tr><td>2 Data link</td><td>Local framing, media access and link addressing</td><td>Network / link</td></tr><tr><td>1 Physical</td><td>Carry bits as signals over a medium</td><td>Network / link</td></tr></table><p>Use the four-layer DoD TCP/IP convention in this course: application, transport, internet and network. The bottom layer is also called link or network access in other references; it is not the OSI network layer. A five-layer teaching model sometimes splits the bottom group into data link and physical, but that is a different convention.</p><p>The correspondence is broad rather than exact: internet protocols do not always fit neat OSI boundaries. For example, data representation and session functions may be handled by application libraries. Match the responsibility being performed rather than forcing every real protocol or multifunction device into exactly one box.</p>"
    ],
    [
      "Follow encapsulation and decapsulation",
      "<pre><code>Application data\n    ↓ add TCP header (or UDP header)\nTCP segment / UDP datagram\n    ↓ add IP header\nIP packet\n    ↓ add link header and trailer\nEthernet frame\n    ↓ encode for the medium\nBits carried as signals</code></pre><p>Encapsulation carries a higher-layer unit inside a lower-layer one. At the receiving endpoint, the stack checks and removes the relevant framing/headers and delivers the payload upwards: decapsulation. A TCP segment and UDP datagram are transport units; an IP packet is an internet-layer unit; a frame belongs to a local link. “Packet” is sometimes used broadly, so identify the precise layer in an explanation.</p><p>The layers do not each create an independent copy of the same message. A link frame contains an IP packet, which contains the transport header and payload. TCP presents a byte stream and does not preserve application message boundaries; the application defines its records. UDP presents separate datagrams. Neither description implies one file equals one frame.</p>"
    ],
    [
      "Separate ports, IP addresses and link addresses",
      "<table><tr><th>Identifier / service</th><th>Question answered</th><th>Example in this chapter</th></tr><tr><td>Port</td><td>Which transport endpoint/service on the host?</td><td>Client port 51500, server TCP port 443</td></tr><tr><td>IP address</td><td>Which host/interface across routed networks?</td><td>192.0.2.10 to 198.51.100.20</td></tr><tr><td>Ethernet MAC address</td><td>Which local-link sender and next-hop destination?</td><td>C→RA on LAN A, then RB→S on LAN B</td></tr><tr><td>DNS</td><td>Which address does a domain name resolve to?</td><td>Resolve a server name; a cached result may already exist</td></tr><tr><td>ARP (IPv4/Ethernet)</td><td>Which local MAC is associated with the next-hop IPv4 address?</td><td>Client learns gateway RA, not remote server S</td></tr></table><p>Ports are 16-bit transport identifiers, not physical switch sockets. DNS can use UDP or TCP; it is not a “UDP-only” service. For the trace below, name resolution and neighbour mappings are already available. DHCP supplies configuration; ARP supplies a local IPv4-to-link-address association. They serve different purposes.</p><p>When a destination lies outside the local subnet, the client sends the frame to a suitable gateway while keeping the remote server as the IP destination. It does not replace that IP destination with the gateway’s address. MAC aliases C, RA, RB and S are synthetic labels for interfaces; MAC addresses are not computed from the numerical IP address. Subnet calculation and IPv4/IPv6 addressing follow in the next chapter.</p>"
    ],
    [
      "Distinguish layer 2 switching from layer 3 routing",
      "<figure><img src=\"unit3-routed-path.svg\" alt=\"Client and switch A on LAN A, router with two interfaces, switch B and server on LAN B; no NAT in the trace.\" style=\"width:100%;height:auto\"><figcaption>Two synthetic Ethernet LANs with a single router between them.</figcaption></figure><p>A layer 2 switch learns source MAC addresses on incoming ports and forwards a known unicast frame towards the destination MAC. An unknown unicast may be flooded within the relevant VLAN. Ordinary layer 2 forwarding does not rewrite the frame’s source/destination MACs or decrement IP TTL.</p><p>A router removes incoming link framing, selects a route using the destination IP address, decrements IPv4 TTL and builds suitable outgoing link framing. Its interfaces also use physical/data-link functions: calling routing “layer 3” describes its forwarding decision, not every function in the device. A multilayer switch can route too.</p><table><tr><th>Observation</th><th>IP source</th><th>IP destination</th><th>TCP source port</th><th>TCP destination port</th><th>TTL</th><th>Frame source</th><th>Frame destination</th></tr><tr><td>C sends on LAN A</td><td>192.0.2.10</td><td>198.51.100.20</td><td>51500</td><td>443</td><td>64</td><td>C</td><td>RA</td></tr><tr><td>After switch A</td><td>192.0.2.10</td><td>198.51.100.20</td><td>51500</td><td>443</td><td>64</td><td>C</td><td>RA</td></tr><tr><td>R sends on LAN B</td><td>192.0.2.10</td><td>198.51.100.20</td><td>51500</td><td>443</td><td>63</td><td>RB</td><td>S</td></tr><tr><td>After switch B</td><td>192.0.2.10</td><td>198.51.100.20</td><td>51500</td><td>443</td><td>63</td><td>RB</td><td>S</td></tr></table><p>The router changes local frame addressing from C→RA to RB→S. In this ordinary forwarding trace, the endpoint IP addresses and transport ports remain unchanged; TTL falls from 64 to 63 and the IPv4 header checksum must reflect the changed header. The outgoing Ethernet FCS covers the outgoing frame. This scenario explicitly excludes NAT, tunnelling, fragmentation and VLAN tags.</p><p>192.0.2.0/24 and 198.51.100.0/24 are documentation address blocks. They are not examples of RFC 1918 private address space or addresses to use on a real school LAN. The trace is a paper/offline model, not a capture from an operational network.</p>"
    ],
    [
      "Compare TCP and UDP behaviour",
      "<table><tr><th>Feature</th><th>TCP</th><th>UDP</th></tr><tr><td>Service</td><td>Connection-oriented, reliable ordered byte stream</td><td>Connectionless datagrams</td></tr><tr><td>Recovery/order</td><td>Sequence/acknowledgement and retransmission; ordered delivery to application</td><td>No built-in retransmission, ordered delivery or duplicate suppression</td></tr><tr><td>Control</td><td>Flow and congestion-control mechanisms</td><td>No built-in flow/congestion control; applications need suitable behaviour</td></tr><tr><td>Header</td><td>At least 20 bytes, with options extending it</td><td>8 bytes</td></tr><tr><td>Boundaries</td><td>Application must frame its own messages in the byte stream</td><td>Datagram boundaries are retained</td></tr><tr><td>Decision</td><td>Useful when missing/out-of-order bytes must be recovered</td><td>Useful when the application handles loss/timing or supplies its own reliability</td></tr></table><p>TCP can recover missing data while a connection succeeds; it cannot guarantee delivery through every failure. UDP includes a checksum field for corruption detection; UDP over IPv4 permits a zero field to indicate that no checksum was supplied. Thus “UDP has no error checking” is misleading. A checksum is not an acknowledgement, retransmission mechanism or authentication. TCP and UDP themselves do not encrypt application content.</p><p>A complete file transfer often benefits from reliable byte recovery. For timely voice/media, late data can be less useful than a missing sample, so the application may choose a datagram transport and its own controls. Justify requirements rather than claiming UDP is always faster or always appropriate for video.</p><p>A protocol built over UDP can add reliability: HTTP/3 uses QUIC over UDP. In this chapter’s TCP port 443 example we are considering an HTTPS-over-TCP connection, not claiming that every HTTPS exchange uses TCP. Port numbers suggest a configured service but do not by themselves prove the traffic’s actual application.</p>"
    ],
    [
      "Read transport fields and trace a TCP connection",
      "<figure><img src=\"unit3-transport-headers.svg\" alt=\"TCP minimum header five 32-bit rows; UDP header two 32-bit rows. Source and destination ports appear in both, TCP also has sequence/ack/control/window fields.\" style=\"width:100%;height:auto\"><figcaption>Schematic minimum headers; TCP options are omitted.</figcaption></figure><p>Both transport headers carry source/destination ports and a checksum. TCP additionally carries byte sequence and acknowledgement numbers, control flags, header-length information and a receive window; the window supports receiver flow control and is different from the sender’s congestion window. UDP’s length includes its eight-byte header plus its payload.</p><table><tr><th>Step</th><th>Sender</th><th>Receiver</th><th>Flags</th><th>Sequence</th><th>Acknowledgement</th><th>TCP payload bytes</th><th>Meaning</th></tr><tr><td>1</td><td>Client</td><td>Server</td><td>SYN</td><td>1000</td><td>not valid (ACK flag unset)</td><td>0</td><td>Start connection; SYN consumes one sequence number</td></tr><tr><td>2</td><td>Server</td><td>Client</td><td>SYN ACK</td><td>5000</td><td>1001</td><td>0</td><td>Acknowledge client SYN and send server SYN</td></tr><tr><td>3</td><td>Client</td><td>Server</td><td>ACK</td><td>1001</td><td>5001</td><td>0</td><td>Acknowledge server SYN; no sequence consumed by pure ACK</td></tr><tr><td>4</td><td>Client</td><td>Server</td><td>ACK</td><td>1001</td><td>5001</td><td>40</td><td>40 transport payload bytes; next client byte sequence is 1041</td></tr><tr><td>5</td><td>Server</td><td>Client</td><td>ACK</td><td>5001</td><td>1041</td><td>0</td><td>Cumulative acknowledgement of the 40 bytes</td></tr></table><p>The SYN consumes one sequence number; a pure ACK with no payload consumes none. Forty payload bytes beginning at sequence 1001 make the next expected byte 1041. A cumulative acknowledgement 1041 says all earlier bytes have been received in order, not that 1041 is a count of packets.</p><p>This synthetic trace shows separate packets for clarity; real acknowledgements can be combined with payload, delayed or follow other valid sequences. If data is lost, TCP may retransmit the same byte range. The router does not acknowledge application data as the receiving endpoint; end-to-end transport behaviour belongs to the endpoint stacks.</p>"
    ],
    [
      "Calculate sizes using explicit assumptions",
      "<p>For the offline size model, take 160 bytes of transport payload, minimum TCP 20/UDP 8 and IPv4 20-byte headers, an untagged Ethernet II header 14 and FCS 4. Ignore TCP/IP options, VLAN tags, fragmentation, preamble/SFD and the inter-frame gap. If the payload is from a secure protocol, the 160 transport bytes may already include TLS framing; they are not necessarily 160 readable application characters.</p><table><tr><th>Unit</th><th>TCP example</th><th>UDP example</th></tr><tr><td>Transport unit</td><td>160+20=180 bytes</td><td>160+8=168 bytes</td></tr><tr><td>IPv4 packet</td><td>180+20=200 bytes</td><td>168+20=188 bytes</td></tr><tr><td>Ethernet frame</td><td>200+14+4=218 bytes</td><td>188+14+4=206 bytes</td></tr><tr><td>Frame bits</td><td>218×8=1744 bits</td><td>206×8=1648 bits</td></tr></table><p>Ethernet may need padding: its minimum data field is 46 bytes in this model. An empty TCP payload makes a 40-byte IPv4 packet, so add 6 padding bytes before the FCS; the complete frame is 64 bytes. For empty UDP payload, the IP packet is 28 bytes and padding is 18. The sizing script handles this case instead of blindly adding headers.</p><p>The model caps the IP packet at the 1500-byte Ethernet MTU and rejects larger examples rather than pretending to implement fragmentation. Under these assumptions maximum payload is 1460 bytes for TCP or 1472 for UDP. Link signalling overhead and inter-frame gap must be considered separately for an on-the-wire timing calculation.</p><pre><code>python unit3-network-sizing.py\n# TCP: transport180, IP200, padding0, frame218, bits1744\n# UDP: transport168, IP188, padding0, frame206, bits1648</code></pre><p><a href=\"unit3-network-sizing.py\" download>Download offline sizing script</a>. It calculates lengths only; it does not build valid checksummed packets, open sockets or transmit data.</p>"
    ],
    [
      "Explain and diagnose a scenario",
      "<p>Describe a failure using evidence and the affected responsibility. A disconnected medium suggests checking physical connectivity; a wrong gateway can stop off-subnet reachability; failed name resolution differs from reaching the correct IP with no listening service. These are hypotheses for a supplied scenario, not a reason to change a school network.</p><p>For a complete answer, identify the unit/layer, state what address or field matters, describe the device action and justify its effect. Correct the common mistakes: sending the remote frame to the remote server MAC, rewriting the IP destination as the gateway, decrementing TTL at every ordinary switch, assuming DNS is UDP-only and equating a checksum with secure delivery.</p><p><a class=\"button\" href=\"unit3-network-models-pack.zip\" download>Download classroom pack</a> · <a href=\"unit3-network-models-workbook.md\" download>Student workbook</a> · <a href=\"unit3-network-models-answers.md\" download>Teacher answers</a>. Use synthetic diagrams/traces; no live capture or network changes are required. Teacher files are separate, not access-protected.</p><p>Sources: <a href=\"https://www.itu.int/rec/T-REC-X.200-199407-I/en\">ITU-T X.200 (OSI)</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc1122.html\">RFC 1122 (internet layers)</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc9293.html\">RFC 9293 (TCP)</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc768.html\">RFC 768 (UDP)</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc791.html\">RFC 791 (IPv4)</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc826.html\">RFC 826 (ARP)</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc7766.html\">RFC 7766 (DNS over TCP)</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc9114.html\">RFC 9114 (HTTP/3)</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc894.html\">RFC 894 (IPv4 over Ethernet)</a>, <a href=\"https://www.cisco.com/en/US/docs/internetworking/troubleshooting/guide/tr1904.html\">Cisco Ethernet frame fields</a> and <a href=\"https://www.rfc-editor.org/rfc/rfc5737.html\">RFC 5737 (documentation addresses)</a>. Curriculum: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 Year 12 syllabus, networking models</a>.</p>"
    ]
  ],
  "practice": [
    [
      "MAP",
      "Which OSI layers correspond broadly to the bottom layer of the four-layer TCP/IP model?",
      "Data link and physical (2 and 1). The course calls the TCP/IP group network; link/network access are other common names. It is distinct from OSI network layer 3."
    ],
    [
      "TRACE",
      "The remote server is 198.51.100.20. Which destination belongs in the first Ethernet frame?",
      "The local gateway interface MAC RA. The IP destination remains 198.51.100.20; the frame addresses the next local hop."
    ],
    [
      "COMPARE",
      "Does UDP having a checksum mean it guarantees delivery and order?",
      "No. Corruption detection differs from acknowledgement, retransmission and ordered delivery. Applications may add suitable behaviour over UDP."
    ],
    [
      "SEQUENCE",
      "Forty TCP payload bytes begin at sequence 1001. What cumulative acknowledgement is expected after receiving them in order?",
      "1041, the next expected byte. It is not a packet count."
    ],
    [
      "SIZE",
      "For 160 bytes of TCP payload under the stated minimum-header assumptions, what is the Ethernet frame size?",
      "218 bytes or 1744 bits. The IPv4 packet is 200 bytes; add Ethernet header 14 and FCS 4. Preamble and inter-frame gap are excluded."
    ]
  ],
  "task": "Complete the four lessons using the synthetic layer, route and transport diagrams. Fill a blank hop trace, explain changed/unchanged fields, desk-check the TCP exchange, compare transport choices and verify sizing arithmetic. Use the offline script as a model check, not as a live network tool.",
  "solution": "A complete explanation maps OSI functions to the four TCP/IP groups, distinguishes nested units, shows C→RA then RB→S frame addressing with unchanged endpoint IPs/ports and TTL 64→63, interprets the handshake/ACK 1041 as byte sequencing, and states all sizing assumptions. The 160-byte examples yield TCP frame 218/UDP frame 206; empty payloads require padding to 64 bytes. Choose transport behaviour against the application’s requirements rather than by a slogan.",
  "recap": "Layers divide responsibilities. Ports identify transport endpoints, IP supports routed delivery and link addresses identify local hops. A router replaces framing while forwarding a packet; TCP and UDP provide different services. Trace fields and calculate sizes only with stated assumptions.",
  "lessons": [
    "Lesson 1: retrieve Year 11 network knowledge; compare OSI/TCP-IP functions; assemble encapsulation units and explain boundaries.",
    "Lesson 2: ports/DNS/gateway/ARP; trace the two-LAN route; explain layer 2 switching and layer 3 routing with changed/unchanged fields.",
    "Lesson 3: compare TCP/UDP services and header architecture; desk-check connection and byte acknowledgements; justify scenarios.",
    "Lesson 4: packet/frame sizing and padding; unfamiliar trace/fault diagnosis; workbook feedback and retrieval. Four lessons in week 11; no new network project."
  ],
  "reference": "https://www.rfc-editor.org/rfc/rfc9293.html",
  "refTitle": "RFC 9293: TCP specification",
  "quiz": {
    "q": "In this no-NAT trace, which changes when the router forwards from LAN A to LAN B?",
    "options": [
      "The destination IP becomes the gateway IP.",
      "Link source/destination addresses change and IPv4 TTL decreases; endpoint IPs/ports stay the same.",
      "Every ordinary switch decreases TTL and replaces both endpoint IPs."
    ],
    "answer": 1,
    "explanation": "The router builds outgoing link framing and decrements TTL. Ordinary routing in this stated scenario preserves endpoint IPs and ports."
  },
  "next": "#plan-3-9"
});
chapters.push({
  "id": "unit3-addressing",
  "unit": 3,
  "week": 12,
  "title": "Addressing and subnetting",
  "badge": "NETWORKS / CIDR",
  "intro": "Read the prefix, calculate the range and design an address plan that includes every required interface.",
  "objectives": [
    "Distinguish RFC 1918 private space from public and special-purpose addresses.",
    "Convert IPv4 prefixes/masks and find network, broadcast and ordinary host ranges.",
    "Choose aligned, non-overlapping subnets and validate gateway allocations.",
    "Compare IPv4/IPv6 notation and explain the limits of the ordinary IPv4 host formula."
  ],
  "sections": [
    [
      "An address needs a prefix",
      "<p>IPv4 uses 32 bits, normally written as four decimal octets from 0 to 255. The prefix tells us which leading bits describe the network and which remaining bits distinguish addresses inside it. In 192.168.50.70/27, the slash number means 27 network bits and 5 host bits. It does not mean 27 devices.</p><p>CIDR is classless notation. Do not infer a subnet mask from a historical class or assume that sharing the first three octets always means sharing a subnet. The supplied prefix controls the calculation. These exercises design a fictional paper network; they do not assign or change addresses on the school network.</p>"
    ],
    [
      "Distinguish RFC 1918 private, public and special addresses",
      "<table><tr><th>RFC 1918 block</th><th>Inclusive range</th></tr><tr><td>10.0.0.0/8</td><td>10.0.0.0–10.255.255.255</td></tr><tr><td>172.16.0.0/12</td><td>172.16.0.0–172.31.255.255</td></tr><tr><td>192.168.0.0/16</td><td>192.168.0.0–192.168.255.255</td></tr></table><p>Private IPv4 addresses can be reused in separate organisations and are not globally routed as ordinary public destinations. Internal routers can still route between private subnets. Access to external services may use mechanisms such as NAT or a proxy. Private addressing is not encryption and does not replace access controls.</p><p>“Not RFC 1918” does not automatically mean publicly reachable. Loopback 127.0.0.0/8, link-local 169.254.0.0/16 and the previous chapter’s documentation blocks are special-purpose space. Public address allocation, routing and filtering also matter; do not select an arbitrary public range for a school plan. Consult IANA’s registry for unfamiliar cases.</p><p>The offline helper tests membership in the three RFC 1918 blocks specifically. Python’s is_private property has broader non-global semantics, so it should not be treated as an exact synonym for RFC 1918.</p>"
    ],
    [
      "Convert a prefix to a mask and a capacity",
      "<p>A subnet mask has contiguous 1 bits for the network followed by 0 bits for the host portion. /27 becomes 255.255.255.224: the last octet 11100000 has three more network bits after the first 24. A longer prefix leaves fewer host bits and therefore a smaller block.</p><table><tr><th>Prefix</th><th>Mask</th><th>Total addresses</th><th>Ordinary LAN usable</th></tr><tr><td>24</td><td>255.255.255.0</td><td>256</td><td>254</td></tr><tr><td>25</td><td>255.255.255.128</td><td>128</td><td>126</td></tr><tr><td>26</td><td>255.255.255.192</td><td>64</td><td>62</td></tr><tr><td>27</td><td>255.255.255.224</td><td>32</td><td>30</td></tr><tr><td>28</td><td>255.255.255.240</td><td>16</td><td>14</td></tr><tr><td>29</td><td>255.255.255.248</td><td>8</td><td>6</td></tr><tr><td>30</td><td>255.255.255.252</td><td>4</td><td>2</td></tr></table><p>For an ordinary IPv4 LAN in this chapter, h=32−prefix, total addresses=2^h and usable unicast host addresses=2^h−2: reserve the all-zero host part for the network and all-one host part for directed broadcast. Count gateways, static infrastructure and growth within the usable total.</p><p>This is a LAN model, not a universal rule. /31 point-to-point links can use both addresses under their specified convention; /32 identifies one address and is commonly used as a host route. IPv6 has no broadcast address, so do not apply this subtract-two formula to it. The helper intentionally restricts ordinary LAN ranges to prefixes 0–30.</p>"
    ],
    [
      "Work a host address into its subnet",
      "<figure><img src=\"unit3-subnet-bits.svg\" alt=\"192.168.50.70/27 final octet01000110 AND mask11100000 gives01000000, network64, with five host bits.\" style=\"width:100%;height:auto\"><figcaption>Original bitwise-AND example; the first three octets are already in the prefix.</figcaption></figure><p>Use 192.168.50.70/27. Mask 224 gives a block size of 256−224=32 in the fourth octet. Boundaries are 0,32,64,96,…; 70 lies in the 64–95 block.</p><table><tr><th>Result</th><th>Value</th><th>Reason</th></tr><tr><td>Network</td><td>192.168.50.64</td><td>Host bits all zero</td></tr><tr><td>Directed broadcast</td><td>192.168.50.95</td><td>Last address before next boundary 96</td></tr><tr><td>Ordinary host range</td><td>192.168.50.65–192.168.50.94</td><td>Exclude network/broadcast</td></tr><tr><td>Total / usable</td><td>32 / 30</td><td>Five host bits; reserve two</td></tr><tr><td>Chosen gateway</td><td>192.168.50.65</td><td>A design choice inside the host range</td></tr></table><p>Network=address AND mask. Broadcast keeps the prefix and sets all host bits to 1. The 256−mask shortcut applies to the octet where the prefix ends; do not blindly use the last octet for every prefix. For 10.1.18.200/20, the mask is 255.255.240.0 and the third-octet block size is 16: network 10.1.16.0, broadcast 10.1.31.255, 4096 addresses and 4094 ordinary usable.</p><p>A network allocation must name its aligned network address, such as 192.168.50.64/27. The host notation 192.168.50.70/27 includes an interface address and its prefix; it does not rename the network as .70.</p>"
    ],
    [
      "Decide local versus routed and validate a gateway",
      "<p>For the ordinary directly connected LAN examples, apply the sender’s mask to both its own address and the destination. Matching network values mean the destination lies in that local prefix; otherwise choose an appropriate route, commonly the default gateway when there is no more specific route. Prefix membership is not proof that the destination is a usable host, awake or reachable.</p><table><tr><th>Source 192.168.50.70/27</th><th>Decision</th><th>Explanation</th></tr><tr><td>Destination 192.168.50.94</td><td>Local prefix</td><td>Both belong to .64/27</td></tr><tr><td>Destination 192.168.50.100</td><td>Different prefix</td><td>Destination lies in .96/27</td></tr><tr><td>Gateway 192.168.50.65</td><td>Valid plan candidate</td><td>Different from source; usable in .64/27</td></tr><tr><td>Gateway 192.168.50.1</td><td>Invalid for this ordinary LAN plan</td><td>Outside source subnet</td></tr><tr><td>Gateway .64,.95 or .70</td><td>Invalid allocation</td><td>Network, broadcast or duplicate source address</td></tr></table><p>The gateway must actually be a configured router interface reachable on the link; a mathematically valid address does not establish that fact. It need not be the first or last host address: this plan deliberately chooses the first. Keep the remote IP destination when sending a frame to the gateway, as the previous packet trace showed.</p><p>Different masks can cause hosts to make inconsistent on-link decisions. Check the address, prefix, duplicates, link/VLAN membership, gateway and return route before blaming DNS. Separate an addressing hypothesis from proof of a DNS or application fault.</p>"
    ],
    [
      "Choose a subnet from the requirement",
      "<p>The media group needs 50 endpoint addresses plus one gateway, so it requires 51 usable addresses. /27 gives 30 and is too small; /26 gives 62 and is the smallest suitable ordinary-LAN block. The endpoints in this scenario already include local printers/access points that need addresses; additional infrastructure and desired growth must be added if the requirements change.</p><pre><code>Required = endpoints + gateway + other agreed static/growth addresses\nChoose smallest h where 2^h - 2 &gt;= Required\nPrefix = 32 - h\nAllocate an aligned block of 2^h addresses\nCheck containment, overlap, gateway and spare capacity</code></pre><p>Borrowing two prefix bits from a /24 creates four equal /26 subnets at .0,.64,.128 and .192. Each has 64 addresses and 62 ordinary usable. Equal-size subnetting is simple; variable-length subnet masks (VLSM) can fit differing group sizes more closely. Allocate larger requirements first and preserve aligned boundaries in this classroom plan.</p>"
    ],
    [
      "Build and check a variable-length address plan",
      "<figure><img src=\"unit3-vlsm-plan.svg\" alt=\"192.168.50.0/24 divided into Media /26, Staff /27, Devices /28 and Visitors /28; the upper half /25 is reserved.\" style=\"width:100%;height:auto\"><figcaption>Original hypothetical private address plan; it is not a school deployment instruction.</figcaption></figure><table><tr><th>Group</th><th>Endpoints + gateway</th><th>Subnet (usable)</th><th>Gateway</th><th>Broadcast</th></tr><tr><td>Media</td><td>50 + 1 = 51</td><td>192.168.50.0/26 (62)</td><td>192.168.50.1</td><td>192.168.50.63</td></tr><tr><td>Staff</td><td>25 + 1 = 26</td><td>192.168.50.64/27 (30)</td><td>192.168.50.65</td><td>192.168.50.95</td></tr><tr><td>Devices</td><td>12 + 1 = 13</td><td>192.168.50.96/28 (14)</td><td>192.168.50.97</td><td>192.168.50.111</td></tr><tr><td>Visitors</td><td>6 + 1 = 7</td><td>192.168.50.112/28 (14)</td><td>192.168.50.113</td><td>192.168.50.127</td></tr></table><p>The visitor group needs 6 endpoints plus one gateway: 7 usable addresses. /29 supplies only 6, so it must receive a /28 here. This is a common planning error when only devices are counted.</p><p>Verify that every block is inside 192.168.50.0/24, aligned, non-overlapping and large enough. Media .0/26 already covers .0–.63, so assigning Staff .32/27 would overlap. The unused range .128–.255 is a contiguous 192.168.50.128/25 reserve, not an accidentally forgotten host pool. Document spare space and reassess the plan when demands grow.</p><p>Address separation alone does not enforce access policy. Routing between groups can still be allowed; segmentation, rules, services and performance choices follow in the network-design chapter.</p>"
    ],
    [
      "Compare IPv6 and read its notation",
      "<table><tr><th>Feature</th><th>IPv4</th><th>IPv6</th></tr><tr><td>Address length</td><td>32 bits</td><td>128 bits</td></tr><tr><td>Typical notation</td><td>Four decimal octets</td><td>Eight 16-bit hexadecimal groups before compression</td></tr><tr><td>Example</td><td>192.168.50.70/27</td><td>2001:db8:50:1::70/64</td></tr><tr><td>LAN neighbour discovery</td><td>ARP for IPv4/Ethernet</td><td>Neighbour Discovery using ICMPv6</td></tr><tr><td>Broadcast</td><td>Broadcast exists; ordinary subnet model reserves its address</td><td>No broadcast; multicast provides relevant group communication</td></tr><tr><td>Base header</td><td>At least 20 bytes; options may add length</td><td>Fixed 40-byte base; extension headers may follow</td></tr></table><p>Expand 2001:db8:50:1::70 as 2001:0db8:0050:0001:0000:0000:0000:0070. Each hexadecimal digit represents four bits. The final 70 is hexadecimal, not the decimal IPv4 host number 70. Leading zeros may be omitted within a group; :: compresses a contiguous run of zero groups and may appear only once in an address. Canonical style selects the longest run, using the leftmost when lengths tie.</p><p>A commonly used IPv6 LAN prefix is /64. In 2001:db8:50:1::/64, the first four groups identify the prefix; 2001:db8:50:2::/64 names a different one. The mathematical address count is 2^(128−prefix), but ordinary IPv4 network/broadcast reservations do not define IPv6 host allocation. The calculator below does not claim to allocate IPv6 hosts.</p><p>Unicast identifies one interface; multicast addresses a group; anycast delivers to one of the interfaces sharing an address according to routing. These are different delivery roles.</p><p>2001:db8::/32 is documentation-only IPv6 space, not an operational public allocation. IPv6 also has addresses with different scopes and purposes. Its larger address space is not automatic encryption or a replacement for security controls. Neighbour Discovery handles local address/router discovery; it is not a DNS replacement.</p>"
    ],
    [
      "Verify the arithmetic and diagnose mistakes",
      "<p>Write the manual calculation first, then use the offline helper to check it. Run the supplied file for the /27 example or explore another address from the same folder:</p><pre><code>python unit3-addressing-calculator.py\n\n# In Python, inspect a new worked example:\nfrom runpy import run_path\ntools = run_path(&quot;unit3-addressing-calculator.py&quot;)\nprint(tools[&quot;lan_details&quot;](&quot;10.1.18.200/20&quot;))</code></pre><p><a href=\"unit3-addressing-calculator.py\" download>Download offline calculator</a>. It returns ranges, checks ordinary gateway candidates, chooses capacity and tests RFC 1918 membership. It does not discover a school’s actual configuration, test reachability, change interfaces or send traffic. /31,/32 and IPv6 are outside its ordinary IPv4 LAN-range function.</p><p><a class=\"button\" href=\"unit3-addressing-pack.zip\" download>Download classroom pack</a> · <a href=\"unit3-addressing-workbook.md\" download>Student workbook</a> · <a href=\"unit3-addressing-answers.md\" download>Teacher answers</a>. The pack includes worked/blank plans, diagrams, scenario cards and source/run notes. Teacher files are separate, not access-protected.</p><p>Sources: <a href=\"https://www.rfc-editor.org/rfc/rfc1918.html\">RFC 1918 private space</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc4632.html\">RFC 4632 CIDR</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc3021.html\">RFC 3021 /31 links</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc4291.html\">RFC 4291 IPv6 addressing</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc5952.html\">RFC 5952 IPv6 text</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc8200.html\">RFC 8200 IPv6</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc4861.html\">RFC 4861 neighbour discovery</a>, <a href=\"https://www.rfc-editor.org/rfc/rfc3849.html\">RFC 3849 IPv6 documentation</a>, <a href=\"https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml\">IANA special IPv4 space</a> and <a href=\"https://docs.python.org/3/library/ipaddress.html\">Python ipaddress</a>. Curriculum: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 Year 12 syllabus, IP addressing and subnetting</a>.</p>"
    ]
  ],
  "practice": [
    [
      "CALCULATE",
      "What subnet contains 192.168.50.70/27?",
      "192.168.50.64/27; mask 255.255.255.224, broadcast .95, ordinary hosts .65–.94, 30 usable."
    ],
    [
      "PLAN",
      "Why do six endpoints plus a gateway need /28 rather than /29?",
      "Seven usable addresses are needed. /29 gives six in this ordinary LAN model; /28 gives fourteen."
    ],
    [
      "GATEWAY",
      "Can 192.168.50.1 be the ordinary directly connected gateway for 192.168.50.70/27?",
      "No. It is outside the .64/27 subnet. A candidate such as .65 fits the range, but must actually be a router interface with appropriate connectivity."
    ],
    [
      "SCOPE",
      "Is every IPv4 address outside RFC 1918 publicly reachable?",
      "No. Special-purpose ranges such as loopback, link-local and documentation space are counterexamples; allocation/routing/policy also matter."
    ],
    [
      "IPv6",
      "Why is applying 2^(128−prefix)−2 as an IPv6 usable-host rule incorrect?",
      "IPv6 has no broadcast address and different reserved roles/scopes. The IPv4 ordinary-LAN two-address reservation does not describe IPv6 allocation."
    ]
  ],
  "task": "Calculate the /27 and /20 examples manually, verify with the offline helper, complete the blank four-group address plan and justify capacity/gateway/non-overlap. Expand/compress the IPv6 example and diagnose an addressing scenario with explicit assumptions.",
  "solution": "For .70/27: network .64, broadcast .95, hosts .65–.94, mask 255.255.255.224 and 30 usable addresses. For 10.1.18.200/20: network 10.1.16.0, broadcast 10.1.31.255 and 4094 ordinary usable addresses. The plan allocates .0/26, .64/27, .96/28 and .112/28, and reserves .128/25. Include the gateway in each capacity; IPv6 compression produces 2001:db8:50:1::70, without applying IPv4 subtraction rules.",
  "recap": "An address and prefix define a block. Work from bits and aligned boundaries, count required interfaces and check overlap/gateways. Special-purpose scope matters, and IPv6 must be reasoned about using its own notation and allocation rules.",
  "lessons": [
    "Lesson 1: retrieve IP/MAC/gateway roles; IPv4/IPv6 and address scope; convert prefixes and masks.",
    "Lesson 2: bitwise AND, block boundaries and /27 worked range; transfer to /20 and local/remote gateway checks.",
    "Lesson 3: equal-size versus variable-length subnetting; four-group capacity/alignment/non-overlap plan and feedback.",
    "Lesson 4: IPv6 expansion/compression, addressing scenario diagnosis and independent plan verification. Four lessons in week 12; no extra network project."
  ],
  "reference": "https://www.rfc-editor.org/rfc/rfc4632.html",
  "refTitle": "RFC 4632: classless addressing and aggregation",
  "quiz": {
    "q": "In this ordinary IPv4 LAN plan, six endpoints and one gateway require which smallest subnet?",
    "options": [
      "/29, because only the endpoints count.",
      "/28, because seven usable addresses are needed.",
      "/32, because one gateway routes all devices."
    ],
    "answer": 1,
    "explanation": "The gateway consumes an address too. /29 has six ordinary usable addresses; /28 has fourteen."
  },
  "next": "#plan-3-10"
});
chapters.push({
  "id": "unit3-secure-networks",
  "unit": 3,
  "week": 13,
  "title": "Designing secure networks",
  "badge": "NETWORK DESIGN",
  "intro": "Turn an address plan into a network design: justify components, restrict traffic, calculate capacity and test your predictions.",
  "objectives": [
    "Select components and media for stated requirements.",
    "Draw physical/logical topology with addressing, segmentation and specified diagram conventions.",
    "Explain broadcast domains and service-specific filtering.",
    "Calculate bottlenecks and interpret ping/traceroute evidence."
  ],
  "sections": [
    [
      "Start with measurable requirements",
      "<p>A secure and efficient network begins with requirements: users, services, locations, traffic, access restrictions, growth and acceptable downtime. Choose a design and then test it against those requirements. A larger advertised link rate alone does not establish a better solution.</p><p>Continue the fictional media-centre plan: Media has 50 endpoints, Staff 25, Devices 12 and Visitors 6; each subnet also needs one gateway. Staff may print to Devices, Media may use the internet, and Visitors may use the internet but must not initiate connections to internal groups. All groups need the agreed DHCP/DNS services. Add a protected administration path and record exactly who may use it. This is a classroom model, not the school’s actual network.</p><p>Performance requirement: 20 Media clients each need 8 Mbit/s concurrently across their shared uplink. State whether that traffic stays local or crosses the internet before choosing the link. Security requirement: demonstrate both permitted services and blocked cross-group attempts.</p>"
    ],
    [
      "Choose components by their role",
      "<table><tr><th>Component</th><th>Role and design consequence</th></tr><tr><td>Transmission media</td><td>Copper/fibre carry signals; wireless uses radio. Consider supported distance/rate, interference, mobility, installation and cost. Fibre is useful for distance and electrical isolation; wireless airtime is shared.</td></tr><tr><td>Modem / service termination</td><td>Connects to an access service using its required signalling. An optical network terminal is not simply a telephone-line modem. Provider access equipment and home all-in-one devices can combine roles.</td></tr><tr><td>Layer 2 switch</td><td>Forwards frames using MAC information within a VLAN. A VLAN is a separate logical broadcast domain; separate switch ports alone do not create separate broadcast domains.</td></tr><tr><td>Router / layer 3 switch</td><td>Routes IP packets between subnets. A multilayer switch can route too. Document where routing occurs and where access rules are enforced.</td></tr><tr><td>Default gateway</td><td>The host’s route towards other networks, usually a router interface on its local subnet. Gateway describes a role; it need not be a separate box.</td></tr><tr><td>Wireless access point</td><td>Connects wireless clients to a LAN. It need not route or provide internet access itself. An SSID can map to a VLAN; a different SSID alone does not prove isolation.</td></tr><tr><td>Firewall</td><td>Enforces traffic policy at defined boundaries; implementations can inspect several layers. A firewall is neither an automatic encryption service nor proof that every host is safe.</td></tr></table><p>Explain each component’s main OSI role without claiming a multifunction appliance belongs exclusively to one layer. Layer 1 media, layer 2 switching and layer 3 routing are useful starting points. Firewalls can also make transport/application decisions.</p>"
    ],
    [
      "Draw physical and logical topology",
      "<figure><img src=\"unit3-secure-topology.svg\" alt=\"Internet through edge router and firewall to managed switch, with four VLANs and labelled private subnets; routing and rules at firewall.\" style=\"width:100%;height:auto\"><figcaption>Original conceptual diagram. Redraw with the specified Cisco conventions for assessed diagram work.</figcaption></figure><p>A physical diagram shows equipment, ports, links and locations. A logical diagram shows subnets, VLANs, gateways, services and allowed paths. One managed switch can carry several logical networks. Label intermediary devices and representative end devices, link media/rates, prefixes and the routing/filtering point. Use a legend, not colour alone.</p><p>A switched star makes individual access-link failures local, but its central switch/uplink can be a single point of failure. A hierarchical star scales access switches but needs adequate aggregation capacity. Redundant paths can improve availability when loop prevention, routing and failover are correctly configured; drawing an extra cable is not enough. Compare cost, complexity and recovery time.</p><p>The syllabus specifies Cisco conventions. Use the <a href=\"https://www.cisco.com/c/en/us/about/brand-center/network-topology-icons.html\">official Cisco topology icon reference</a> for cloud, router, switch, firewall, server, PC and access-point symbols in the final student diagram. The original diagrams here explain the structure; they are not a certified substitute for that symbol set. Include a symbol-identification and redraw check in lesson 1.</p>"
    ],
    [
      "Separate broadcast domains and enforce policy",
      "<p>In this design VLAN 10 is Media, VLAN 20 Staff, VLAN 30 Devices and VLAN 40 Visitors. Each uses its own IPv4 subnet. Access ports carry a selected VLAN; a configured trunk carries multiple VLANs to the routing/firewall device. Layer 2 broadcasts are normally contained within their VLAN; routers do not forward them as ordinary routed traffic. DHCP across a routing boundary may need an explicitly configured relay.</p><p>Subnetting is an addressing plan; VLAN membership is link-layer separation; routing and firewall rules govern traffic between groups. They work together but are not interchangeable. Once routing is enabled, separate VLANs do not automatically block cross-group access. Traffic between two hosts in the same VLAN may bypass the central firewall, requiring endpoint controls or other isolation if that traffic must be restricted.</p><table><tr><th>VLAN / group</th><th>Subnet</th><th>Gateway</th><th>Ordinary capacity</th></tr><tr><td>10 / Media</td><td>192.168.50.0/26</td><td>192.168.50.1</td><td>62</td></tr><tr><td>20 / Staff</td><td>192.168.50.64/27</td><td>192.168.50.65</td><td>30</td></tr><tr><td>30 / Devices</td><td>192.168.50.96/28</td><td>192.168.50.97</td><td>14</td></tr><tr><td>40 / Visitors</td><td>192.168.50.112/28</td><td>192.168.50.113</td><td>14</td></tr></table><p>Keep 192.168.50.128/25 reserved. Gateways in this model are VLAN interfaces on the firewall/router, not invented addresses on a separate PC. NAT may translate private IPv4 addresses at the internet edge, but it is not encryption or a replacement for explicit filtering.</p>"
    ],
    [
      "Write a service-specific traffic policy",
      "<p>Begin with the smallest set of required flows and deny other new inter-zone connections. Document source, destination, protocol/service, action and reason. Evaluate rule order; a broad early allow can defeat a later deny. Stateful return traffic for an allowed session is distinct from permission to initiate a new session in the opposite direction.</p><table><tr><th>Initiating source</th><th>Destination / service</th><th>Action</th><th>Reason</th></tr><tr><td>Media</td><td>Internet / agreed web service</td><td>Allow</td><td>Learning resources</td></tr><tr><td>Staff</td><td>Device printer 192.168.50.98 / TCP 631</td><td>Allow</td><td>Scenario uses IPP printing</td></tr><tr><td>Visitors</td><td>Internet / agreed web service</td><td>Allow</td><td>Guest access</td></tr><tr><td>Visitors</td><td>Any internal group / new session</td><td>Deny</td><td>Protect internal systems</td></tr><tr><td>Any group</td><td>Agreed DNS/DHCP service</td><td>Allow narrowly</td><td>Required infrastructure; specify local/relay path</td></tr><tr><td>Unlisted inter-zone flow</td><td>Any</td><td>Deny</td><td>Default-deny policy</td></tr></table><p>This is a requirements matrix, not a deployable firewall configuration. A real ruleset must specify actual destinations, DNS transports, DHCP broadcast/relay handling, IPv4/IPv6 and stateful return handling. TCP 443 is a conventional HTTPS service; HTTP/3 can use UDP 443. Our offline model deliberately simplifies web to TCP 443. Port numbers alone do not prove application identity or encryption.</p><p>Use separate guest access, appropriate wireless authentication/encryption, maintained software, restricted device management and physically secured equipment. Match controls to the risk and environment. Private addresses, hidden SSIDs and MAC filtering do not provide a complete security design. Record remaining risks and service dependencies.</p>"
    ],
    [
      "Calculate capacity and identify bottlenecks",
      "<figure><img src=\"unit3-secure-capacity.svg\" alt=\"Twenty clients need 160 Mbit per second across a 100 Mbit shared uplink; upgrading access links alone does not remove the uplink bottleneck.\" style=\"width:100%;height:auto\"><figcaption>Original conceptual diagram. Redraw with the specified Cisco conventions for assessed diagram work.</figcaption></figure><p>Bandwidth is link capacity; throughput is achieved transfer rate; latency is delay. Jitter is variation in delay. Compare measurements under stated loads. Units matter: eight bits make one byte, and this chapter uses decimal Mbit/s and MB.</p><pre><code>20 clients × 8 Mbit/s = 160 Mbit/s demand\n100 Mbit/s shared uplink: demand / capacity = 1.6 (160%)\nIdeal equal-share ceiling = 100 / 20 = 5 Mbit/s per client\n400 MB file × 8 / 100 Mbit/s = 32 seconds ideal minimum</code></pre><p>A 1 Gbit/s uplink removes the stated 100 Mbit/s bottleneck, but does not guarantee each application rate. Protocol overhead, competing traffic, storage, firewall processing, wireless airtime and server capacity still matter. If this traffic crosses a 100 Mbit/s internet link, a faster local uplink leaves that external bottleneck in place. The file estimate excludes overhead and other activity.</p><p>For latency-sensitive calls, low and stable delay may matter more than bulk-transfer speed. QoS can prioritise selected traffic during contention; it does not create capacity. Compare wired stability with wireless mobility, and test peak concurrent use rather than one idle client.</p>"
    ],
    [
      "Use ping and traceroute as evidence",
      "<p>Ping uses ICMP echo to test a response and report round-trip time (RTT). It does not measure bulk bandwidth, authenticate a user or prove that a website works. A timeout can result from filtering, lost replies or an unavailable path/host. An IP success combined with a name-resolution failure suggests checking DNS; it is not proof from one observation.</p><p>Windows tracert sends probes with increasing TTL/hop limits and observes responses. It exposes some routed hops, not layer 2 switches. Asterisks mean no response to that probe; a later responding hop can still show forwarding continued. Probe type differs among implementations. Hop RTTs are round trips from the source; do not subtract them as reliable per-link delays.</p><pre><code>Synthetic example only — do not run against these documentation targets:\ntracert -d 198.51.100.20\n 1    1 ms   1 ms   1 ms   192.168.50.1\n 2    *      *      *      Request timed out.\n 3   12 ms  13 ms  12 ms   198.51.100.20</code></pre><p>Hop 2 did not answer the probes, but the destination responded. This output alone does not show that hop 2 dropped ordinary forwarded traffic. A high RTT at one responding hop followed by lower later RTTs can reflect control-plane response priority rather than a path bottleneck.</p><p>In a teacher-controlled lab, practise with an explicitly assigned responding target. Windows forms: <code>ping -n 4 TARGET</code> and <code>tracert -d TARGET</code>. Record the target, timestamp, load, sent/received counts and RTTs, then state a limited conclusion. Use supplied synthetic logs when a lab is unavailable. Never treat a deliberately blocked guest-to-internal ping as a fault simply because it times out.</p>"
    ],
    [
      "Test, evaluate and revise the design",
      "<p>Write acceptance tests before changing the design: valid addressing, allowed services, blocked initiation, DNS/DHCP availability, performance under the required load, and recovery after an agreed failure. Distinguish predicted results, simulator observations and real measurements. Ping/traceroute evidence must be interpreted with filtering and probe limits in mind.</p><p>Use the offline Python model to predict the simplified traffic matrix and calculate capacity. It opens no sockets and changes no configuration. A passed prediction is not evidence that a deployed firewall enforces it. For an authorised lab or simulator, capture both allowed and denied outcomes, then compare with requirements. Record unresolved controls and a retest plan.</p><p><a class=\"button\" href=\"unit3-secure-networks-pack.zip\" download>Download classroom pack</a> · <a href=\"unit3-secure-networks-workbook.md\" download>Student workbook</a> · <a href=\"unit3-secure-networks-answers.md\" download>Teacher answers</a> · <a href=\"unit3-secure-networks-model.py\" download>Offline model</a>. The pack includes a design brief, synthetic troubleshooting logs, policy CSV, two diagrams and source/run notes. Teacher files are separate, not access-protected.</p>"
    ],
    [
      "Sources and curriculum connection",
      "<p>Curriculum: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">SCSA 2026 Year 12 syllabus, network components/performance</a>. Technical references: <a href=\"https://www.cyber.gov.au/ism/2026-09/guidelines-for-networking\">ASD networking guidance</a>, <a href=\"https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ping\">Microsoft ping</a>, <a href=\"https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert\">Microsoft tracert</a> and <a href=\"https://www.cisco.com/c/en/us/about/brand-center/network-topology-icons.html\">Cisco topology icons</a>. Explanations, diagrams and scenario data are original. This chapter prepares network design; Unit 4 develops security analysis further.</p>"
    ],
    [
      "Course diagram convention and live evidence",
      "<p>For the formal course redraw, place the perimeter firewall outside the trusted network without an IP label, and show router interfaces as gateways, following the SCSA support booklet. The earlier combined-device concept is an engineering explanation; use the separate-device convention for the classroom diagram. Internal restrictions still require appropriate inter-zone policy enforcement. <a href=\"#unit3-evidence\">Six activities and evidence records</a> include diagram checks, isolated addressing application and authorised live diagnostics. Symbol-image fidelity and learner demonstrations remain pending.</p>"
    ]
  ],
  "practice": [
    [
      "SEGMENT",
      "Do two VLANs automatically stop all traffic between their users?",
      "No. VLANs separate layer 2 broadcast domains, but routing and access rules determine cross-VLAN traffic."
    ],
    [
      "CAPACITY",
      "Twenty clients need 8 Mbit/s each over a 100 Mbit/s uplink. What is the problem?",
      "Demand is 160 Mbit/s, exceeding 100 Mbit/s. Ideal equal share is at most 5 Mbit/s before overhead."
    ],
    [
      "EVIDENCE",
      "Hop 2 times out, but hop 3 is the responding destination. Is the route broken at hop 2?",
      "The probe did not receive a response at hop 2. Later response shows traffic reached the destination; do not infer a forwarding failure from the asterisks alone."
    ],
    [
      "POLICY",
      "Why is a guest-to-internal ping timeout not sufficient proof of isolation?",
      "Only that probe lacked a reply. Test the required service policy and inspect evidence; other protocols or paths might still be allowed."
    ],
    [
      "DESIGN",
      "Why can a faster local switch leave internet downloads slow?",
      "An unchanged internet link, server, storage, wireless or firewall can remain the limiting resource. Identify the actual traffic path."
    ]
  ],
  "task": "Use the media-centre brief to produce a Cisco-convention logical diagram and a physical link plan, a narrow traffic matrix, a capacity calculation and an acceptance-test table. Interpret the supplied logs and revise one design weakness. Practise ping/tracert only in the assigned lab.",
  "solution": "Allocate the four previous subnets to VLANs 10/20/30/40 with gateway interfaces at the routed firewall boundary. Allow required web/printing and infrastructure paths; deny other new cross-zone flows. A 100 Mbit/s uplink cannot meet 160 Mbit/s demand. Evaluate a faster uplink while checking the internet/server path. Validate positive and negative tests and retain uncertainty for ICMP timeouts.",
  "recap": "A diagram is a testable design. Addressing, VLAN membership, routing and service policy must agree. Capacity calculations expose bottlenecks; diagnostic probes support limited conclusions that require follow-up evidence.",
  "lessons": [
    "Lesson 1: requirements and components; interpret physical/logical topology; identify Cisco symbols and redraw the example.",
    "Lesson 2: VLANs/broadcast domains, gateways and service policy; test the simplified offline traffic matrix.",
    "Lesson 3: demand/bottleneck calculations, media/topology tradeoffs and capacity feedback.",
    "Lesson 4: interpret synthetic logs, practise ping/tracert in the assigned lab, evaluate and revise the design. Four lessons in week 13; practical work is embedded."
  ],
  "reference": "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert",
  "refTitle": "Microsoft: tracert and response limitations",
  "quiz": {
    "q": "What actually enforces the guest-to-internal restriction in this routed design?",
    "options": [
      "Giving the guest network a private IP prefix.",
      "A different SSID name by itself.",
      "Correctly placed and tested traffic rules at the relevant boundary."
    ],
    "answer": 2,
    "explanation": "Separate addressing and labels do not enforce the policy. Routing, filtering and the actual traffic path must be configured and tested."
  },
  "next": "#plan-3-11"
});
chapters.push({
  "id": "unit3-review",
  "unit": 3,
  "week": 14,
  "title": "Unit 3 integrated review",
  "badge": "RETRIEVE / APPLY / REFLECT",
  "intro": "Bring code, software design and network reasoning together, then turn each error into a precise revision action.",
  "objectives": [
    "Trace structures, aliases and object state.",
    "Choose algorithms from their contracts and repair boundary faults.",
    "Apply addressing, topology, policy and capacity reasoning to a shared scenario.",
    "Use test evidence and corrected attempts to set revision priorities."
  ],
  "sections": [
    [
      "Diagnose before revising",
      "<p>Use the 12-question diagnostic without notes, then check the explanations. Record confidence before marking: low, medium or high. A confident incorrect answer deserves attention because it may indicate a misconception; one correct answer does not establish mastery.</p><p>For each error, write what you thought, the corrected rule, the evidence and a fresh question to retry. Keep programming and networking evidence separate while connecting their design/testing methods. These are original formative activities, not an official examination or a full syllabus audit.</p><table><tr><th>Focus</th><th>Evidence to produce</th></tr><tr><td>Programming</td><td>Trace state; justify key/order; repair a contract; test boundaries</td></tr><tr><td>Software design</td><td>Explain objects/overriding; preserve invariants; record regression/version evidence</td></tr><tr><td>Networks</td><td>Calculate prefix/range; trace addresses/layers; justify capacity and policy</td></tr><tr><td>Evaluation</td><td>Distinguish predictions from measurements; state limits and choose next test</td></tr></table>"
    ],
    [
      "Trace data structures and state",
      "<pre><code>grid = [[0, 0] for _ in range(2)]\ngrid[0][1] = 3\nalias = grid\ncopy = [row[:] for row in grid]\nalias[1][0] = 4\ncopy[0][0] = 9\nprint(grid)\nprint(copy)</code></pre><p>Predict both outputs before running. An alias binds another name to the same object. Copying each row separates the row lists here, but it is not a general deep copy of arbitrary nested mutable objects. Explain that limit with a counterexample containing a mutable object inside a row.</p><details><summary>Compare the trace</summary><pre><code>grid: [[0, 3], [4, 0]]\ncopy: [[9, 3], [0, 0]]</code></pre><p>The alias mutation updates grid. The copied row mutation does not. If row entries themselves were mutable lists, this one-level row copy would still share those entries.</p></details><p>Continue with dictionaries: an ID key must remain unique. Decide whether duplicate insertion is a rejection or an update before implementing it. A 2D availability grid and an ID dictionary solve different access problems; justify each from the required operations.</p>"
    ],
    [
      "Connect sorting, searching and contracts",
      "<pre><code>records = [(&quot;C03&quot;, 2), (&quot;C01&quot;, 1), (&quot;C02&quot;, 2)]\nfor i in range(1, len(records)):\n    item = records[i]\n    j = i - 1\n    while j &gt;= 0 and records[j][1] &gt; item[1]:\n        records[j + 1] = records[j]\n        j -= 1\n    records[j + 1] = item\nprint(records)</code></pre><p>The result is sorted by quantity, with the two equal quantities preserving their original order. That does not make it suitable for binary search by ID. Algorithms depend on their preconditions; a sorting key and a searching key must agree.</p><pre><code>def find_id(records, target):\n    low, high = 0, len(records) - 1\n    while low &lt; high:  # deliberate fault\n        mid = (low + high) // 2\n        if records[mid][0] == target:\n            return mid\n        if records[mid][0] &lt; target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1</code></pre><p>The faulty loop skips the final candidate when low equals high. Repair it, trace a one-item success and test empty/absent/first/last cases. State whether an arbitrary matching index or the first duplicate is required. This exercise assumes unique IDs and ascending ID order.</p><p>Use operation counts to compare growth, with the counted operation defined. Binary search has logarithmic search growth on an appropriate sorted sequence; arranging data first has a cost. Repeated dictionary ID lookups may fit this scenario better, while a display sorted by quantity can be a separate view. Do not claim one algorithm is always fastest from one tiny timing sample.</p>"
    ],
    [
      "Review objects and reliable changes",
      "<p>Return to the equipment-loan project. Separate the equipment object’s stock state from the system’s loan records. A successful loan cannot make stock negative; returning one active loan restores stock once; repeating a return must preserve the agreed state. Write expected results before running tests.</p><p>For a mixed collection of Camera and Projector objects, explain inherited common behaviour and overridden methods. Demonstrate polymorphism by calling the same method name through each object. Reassigning a local parameter differs from mutating the object it references; include this distinction in your trace.</p><p>Propose one maintenance change, such as a clearer rejection message, without adding a new project. Record the requirement, implementation version, failing example, fix and regression evidence. Use synthetic records; cite permitted external help, protect privacy and consider inclusive/ergonomic presentation. Passing a component test does not replace acceptance evidence for the whole user workflow.</p>"
    ],
    [
      "Work an integrated network case",
      "<p>A Media client is 192.168.50.10/26, gateway 192.168.50.1. Staff uses .64/27, Devices .96/28 and Visitors .112/28. The printer is .98; the default-deny policy permits Staff printing but denies new Visitor-to-internal sessions. Keep the four previous gateway/subnet allocations.</p><table><tr><th>Question</th><th>Expected reasoning</th></tr><tr><td>Which block contains Media .10/26?</td><td>Network .0, broadcast .63, ordinary hosts .1–.62,62 usable</td></tr><tr><td>Is printer .98 local to Media?</td><td>No; .98 belongs to .96/28. Send towards gateway if an appropriate route/policy exists</td></tr><tr><td>Does another VLAN alone block printing?</td><td>No. Routing/filtering enforce inter-zone permission</td></tr><tr><td>What happens to remote IP and local frame destination?</td><td>Without NAT, remote IP remains; next-hop frame uses gateway MAC</td></tr><tr><td>20 × 8 Mbit/s over 100 Mbit/s?</td><td>160 demand;100 bottleneck; identify local versus internet path</td></tr><tr><td>IPv6 2001:db8:50:1::70/64?</td><td>128-bit notation; hexadecimal groups; no IPv4 subtract-two broadcast convention</td></tr></table><p>Redraw the logical topology using the specified Cisco symbols, including intermediary and end devices, prefixes, gateway location, traffic-policy boundary and labelled links. The conceptual diagram in the previous chapter is a guide to structure; check symbol fidelity separately.</p><p>Choose TCP or UDP from application needs and explain the tradeoff. TCP provides an ordered reliable byte stream, but is not automatic encryption. UDP does not supply TCP-style delivery/order guarantees; applications can build mechanisms above it. Do not describe every web application as TCP-only.</p>"
    ],
    [
      "Interpret evidence and diagnose layers",
      "<p>Case A: ping to an assigned server IP succeeds but a name cannot be resolved. Check DNS/client configuration and records; success with an IP does not prove application health. Case B: ping succeeds but the web connection fails. Investigate transport policy, listening service and application/TLS conditions rather than claiming the whole network is healthy.</p><p>Case C: an unanswered traceroute hop is followed by a responding destination. Report the missing probe reply, not a proven broken link. Case D: Visitor-to-Staff ping times out. This is consistent with filtering but does not prove every prohibited service/path is blocked. Compare positive and negative tests against the intended policy.</p><p>Every conclusion should cite an observation, acknowledge alternative explanations and propose a discriminating next test. Use teacher-assigned targets for live-tool practice. Supplied logs are synthetic and do not complete the live ping/traceroute skill by themselves.</p>"
    ],
    [
      "Complete a controlled practice and feedback cycle",
      "<p>The pack contains an original 40-mark practice: 20 marks for programming/design and 20 for networking. Allow 40 minutes, then use the remaining lesson time for marking and feedback. This is a formative classroom allocation, not a claim about the official examination format or assessment weighting.</p><p>Attempt in lesson 3 after two guided-review lessons. Lesson 4 is for correction and a fresh transfer task. Marks identify missing evidence; students should finish with two specific priorities and one successful retry for each. Teacher answers are separate, not access-protected.</p><p><a class=\"button\" href=\"unit3-review-pack.zip\" download>Download integrated review pack</a> · <a href=\"unit3-review-workbook.md\" download>Student workbook</a> · <a href=\"unit3-review-practice.md\" download>40-mark practice</a> · <a href=\"unit3-review-answers.md\" download>Teacher answers</a> · <a href=\"unit3-review-starter.py\" download>Python starter</a>.</p>"
    ],
    [
      "Plan the next revision from evidence",
      "<p>Use the diagnostic/marking record to choose targeted stations in week 15, then attempt a new question without the answer visible. Record skill, evidence, next action and retry outcome. A low total score alone is less useful than a precise error such as “binary search applied to the wrong key order”.</p><p>Reference chapters: <a href=\"#unit3-structures\">data structures</a>, <a href=\"#unit3-search\">searching</a>, <a href=\"#unit3-sort\">sorting</a>, <a href=\"#unit3-inheritance\">objects/inheritance</a>, <a href=\"#unit3-reliability\">reliability</a>, <a href=\"#unit3-network-models\">network models</a>, <a href=\"#unit3-addressing\">addressing</a> and <a href=\"#unit3-secure-networks\">network design</a>. Technical references: <a href=\"https://docs.python.org/3/tutorial/classes.html\">Python classes and shared state</a> and <a href=\"https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert\">Microsoft tracert</a>. Curriculum: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 SCSA Year 12 syllabus</a>. Activities and marking notes are original drafts for teacher review.</p>"
    ]
  ],
  "practice": [
    [
      "D1",
      "Trace the grid/alias/copy example below. Explain why only one grid changes after copy[0][0] = 9.",
      "grid [[0,3],[4,0]]; copy [[9,3],[0,0]]. alias names the same outer list; copied rows are separate lists of immutable integers."
    ],
    [
      "D2",
      "What goes wrong with [[0,0]] * 2 when one row is changed?",
      "Both positions reference the same row list. A comprehension creates distinct rows."
    ],
    [
      "D3",
      "A dictionary maps unique equipment IDs to objects. What must happen before inserting a duplicate ID?",
      "Apply the contract: reject the duplicate or use an explicitly agreed update. Unchecked assignment replaces the existing value."
    ],
    [
      "D4",
      "Trace insertion sorting by the second tuple item. Why is C03 still before C02?",
      "Result C01(1), C03(2), C02(2). Strict > shifts only larger keys, preserving equal-key order."
    ],
    [
      "D5",
      "May binary search by ID be applied to that quantity-sorted result?",
      "No: it is not sorted by the searched ID key. Choose linear search, dictionary lookup or a separate ID-sorted index."
    ],
    [
      "D6",
      "Repair find_id and give a smallest revealing test.",
      "Use low <= high. One matching record is never checked by the faulty loop; also test empty, absent, first and last."
    ],
    [
      "D7",
      "Two objects inherit Equipment and override label(). What does calling item.label() through a mixed list illustrate?",
      "Polymorphism: method selection depends on the actual object. Inheritance reuses a common interface/behaviour; overriding supplies subclass behaviour."
    ],
    [
      "D8",
      "A return operation increments stock twice when the same loan is returned twice. What test and guard are needed?",
      "Return the same loan twice; second attempt must reject/no-op under the contract and leave stock/history consistent. Check active state before changing it."
    ],
    [
      "D9",
      "For host 192.168.50.70/27 give network, broadcast, ordinary capacity and a valid candidate gateway.",
      "Network .64, broadcast .95, capacity 30, candidate .65. It must actually be a router interface, not just fit arithmetically."
    ],
    [
      "D10",
      "Explain IP destination versus next-hop MAC when .70/27 sends to 198.51.100.20 through .65, with no NAT.",
      "IP destination remains the remote server; the local Ethernet frame targets the gateway MAC. Routing rebuilds link-layer headers for the next link."
    ],
    [
      "D11",
      "20 clients each require 8 Mbit/s through a 100 Mbit/s uplink. Can it meet demand?",
      "160 Mbit/s demand exceeds 100; ideal equal share 5 Mbit/s before overhead. Faster client ports alone do not repair the shared bottleneck."
    ],
    [
      "D12",
      "Traceroute has an unanswered middle hop but the destination responds. What can you conclude?",
      "That probe lacked a reply; later response shows the destination was reached. Do not infer forwarding failure at the unanswered hop alone."
    ]
  ],
  "task": "Complete the diagnostic, repair and test the supplied search function, explain object invariants, solve the media-centre network case and attempt the 40-mark controlled practice. Mark your evidence, correct two misconceptions and retry fresh questions.",
  "solution": "The grid/alias trace gives [[0,3],[4,0]] while the row copy gives [[9,3],[0,0]]. Stable quantity order is C01,C03,C02 and is unsuitable for ID binary search. Repair <= and test the final candidate. Network and performance conclusions must include prefix arithmetic, actual filtering location and the limits of probe evidence. Use the pack’s marking points for the practice.",
  "recap": "Good review produces evidence: a trace, a contract, a tested correction, an accurate network calculation and a limited conclusion. Use those results to choose the next task rather than rereading everything equally.",
  "lessons": [
    "Lesson 1: closed-note diagnostic, confidence record and guided programming/state/algorithm correction.",
    "Lesson 2: integrated network case, diagram/policy/capacity reasoning and evidence interpretation.",
    "Lesson 3: 40-minute original controlled practice, followed by initial marking and feedback.",
    "Lesson 4: corrections, fresh transfer tasks and two evidence-based revision priorities. Four lessons in week 14; no additional project."
  ],
  "reference": "https://docs.python.org/3/tutorial/classes.html",
  "refTitle": "Python tutorial: classes and shared state",
  "quiz": {
    "q": "Records are sorted by quantity. What must you check before binary searching by ID?",
    "options": [
      "Nothing: any sorted list is suitable.",
      "The sequence is sorted by the same ID key used in the search.",
      "The quantities have no duplicates."
    ],
    "answer": 1,
    "explanation": "Binary search depends on the searched key being ordered consistently. Quantity order does not establish ID order."
  },
  "next": "#plan-3-12"
});
chapters.push({
  "id": "unit3-consolidation",
  "unit": 3,
  "week": 15,
  "title": "Unit 3 consolidation",
  "badge": "TARGET / TRANSFER / RETRY",
  "intro": "Use the evidence from your review to repair misconceptions, transfer the rules to fresh cases and plan the final revision week.",
  "objectives": [
    "Choose precise revision priorities from errors and confidence.",
    "Transfer state, algorithm and object reasoning to unfamiliar examples.",
    "Apply subnetting, capacity and policy reasoning with stated limits.",
    "Document independent retries and practical evidence still needed."
  ],
  "sections": [
    [
      "Choose two priorities from evidence",
      "<p>Bring the week 14 error log and marked practice. Select one programming priority and one networking priority. Name the error precisely, cite the question/test that exposed it and decide what a successful fresh attempt would demonstrate. A confident misconception takes priority over a familiar task you already solve reliably.</p><table><tr><th>Weak target</th><th>Useful target</th></tr><tr><td>Revise Python</td><td>Trace alias versus shallow copy correctly on a new dictionary example</td></tr><tr><td>Learn algorithms</td><td>Explain why ID binary search fails on quantity order, then choose an appropriate structure</td></tr><tr><td>Get better at networks</td><td>Calculate /28 boundaries and validate a gateway independently</td></tr><tr><td>Practise troubleshooting</td><td>Separate an unanswered probe from proof of a forwarding fault</td></tr></table><p>Start with a short unaided attempt, then consult the relevant chapter, explain the correction and retry different values. Record help used. This chapter supports consolidation; it is not a full syllabus audit or a new project.</p>"
    ],
    [
      "Use targeted practice stations",
      "<table><tr><th>Station</th><th>Focus</th><th>Evidence</th></tr><tr><td>A</td><td>State and data structures</td><td>Trace dictionary alias/copy; repair a shared-row grid; justify an ID dictionary.</td></tr><tr><td>B</td><td>Algorithms and contracts</td><td>Trace bubble/insertion/selection passes; match search key/order; test boundaries.</td></tr><tr><td>C</td><td>Objects and reliability</td><td>Explain overriding; test stock/return invariants; record a regression change.</td></tr><tr><td>D</td><td>Addressing and packet path</td><td>Calculate a fresh subnet; select gateway; trace remote IP and next-hop MAC.</td></tr><tr><td>E</td><td>Network design and evidence</td><td>Check VLAN/policy location, bandwidth assumptions and diagnostic limitations.</td></tr></table><p>In lesson 2, work at your two selected stations for about 18 minutes each, with retrieval and reflection around them. Choose the exact allocation to fit your school’s period length. Students who finish accurately take an extension question, while the teacher checks the most important misconceptions. Do not require every student to rotate through all five stations in one lesson.</p><p>Station B revisits all three prescribed sorting methods using the earlier sorting chapter; this pack’s executable example focuses on insertion sort and search contracts. Explain what the algorithm counts and whether the source data changes. Station C uses existing project state and tests, rather than expanding its requirements.</p>"
    ],
    [
      "Work a state correction",
      "<pre><code>counts = {&quot;camera&quot;: 3, &quot;projector&quot;: 1}\nalias = counts\nsnapshot = counts.copy()\nalias[&quot;camera&quot;] -= 1\nsnapshot[&quot;projector&quot;] = 9\nprint(counts)\nprint(snapshot)</code></pre><p>Predict the final dictionaries before running. The alias refers to the same dictionary, so its camera update changes counts. The copied mapping is separate; assigning its projector value does not change counts. The values here are immutable integers, so a shallow mapping copy suffices for this task. It would still share a nested mutable value.</p><details><summary>Compare and explain</summary><pre><code>counts: {&#x27;camera&#x27;: 2, &#x27;projector&#x27;: 1}\nsnapshot: {&#x27;camera&#x27;: 3, &#x27;projector&#x27;: 9}</code></pre><p>A fresh transfer task uses a dictionary whose value is a list. Copy the dictionary, append to the shared list, and explain why both mappings observe the change. Select a copying strategy from the required independence, rather than assuming copy() recursively duplicates everything.</p></details><p>Use the workbook’s shared-row repair and nested-copy question to demonstrate that your rule transfers beyond this one trace.</p>"
    ],
    [
      "Make algorithm and object reasoning explicit",
      "<p>Given records X03:4, X01:2, X02:4, stable insertion sorting by quantity yields X01, X03, X02. That sequence is unsuitable for ID binary search. Keep a separate ID-ordered view or use a dictionary for repeated unique-ID lookup; preserve a quantity-ordered display view for a different requirement.</p><p>For a one-off search of an unsorted collection, linear search avoids a sorting precondition. Explain preparation and update costs before claiming binary search is the best choice. Trace empty, one-item, first, last and absent cases against the documented index-or-minus-one contract.</p><p>For Equipment subclasses, identify common state/behaviour, overriding and polymorphic calls. Check the stock invariant after a rejected loan and after a repeated return. A changed rejection message needs regression evidence that valid loans and stock behaviour still work; component success alone is not complete acceptance evidence.</p>"
    ],
    [
      "Transfer subnet and performance reasoning",
      "<p>Work a new host: 192.168.60.130/28. Show mask, aligned network, broadcast, ordinary host range and capacity before selecting a gateway. Then decide whether destination .145 belongs to the same prefix.</p><table><tr><th>Check</th><th>Explained result</th></tr><tr><td>Mask / block size</td><td>255.255.255.240 /16 addresses</td></tr><tr><td>Network / broadcast</td><td>192.168.60.128 /192.168.60.143</td></tr><tr><td>Ordinary hosts / capacity</td><td>.129–.142 /14</td></tr><tr><td>Candidate gateway</td><td>.129, provided it is an actual reachable router interface and not duplicated</td></tr><tr><td>Destination .145</td><td>Different prefix: .144/28</td></tr><tr><td>Nine endpoints + gateway</td><td>10 usable needed; /29 gives 6, /28 gives 14</td></tr></table><p>For a remote destination with no NAT, keep the remote IP destination but send the local frame to the gateway MAC. Separate layer 2 switching from layer 3 routing. IPv6 remains 128-bit hexadecimal notation; IPv4 network/broadcast subtraction is not its general allocation rule.</p><p>Sixteen clients at 6 Mbit/s need 96 Mbit/s. A 100 Mbit/s uplink fits the stated ideal demand with only 4 Mbit/s spare before overhead or other traffic. A 300 MB file at 80 Mbit/s has a 30-second ideal minimum. Explain why nominal capacity alone cannot promise the real result.</p>"
    ],
    [
      "Evaluate a network answer against evidence",
      "<p>A design places Staff and Visitors in different VLANs, enables routing between them and adds no filtering. Explain why it has not enforced the guest restriction. Place service-specific rules at a relevant routing boundary, test allowed and denied initiation, and consider paths that bypass it. DNS/DHCP and authorised management dependencies still need narrow treatment.</p><p>If ping works but web fails, investigate the service, transport policy and application/TLS conditions. If traceroute has an unanswered intermediate hop but later replies, record that missing response without declaring the link broken. Ping does not measure bulk throughput or prove every service works.</p><p>Use a Cisco-convention diagram with intermediary/end devices, prefixes, gateway roles, link labels and a policy boundary. Synthetic scenarios are adequate for reasoning practice, but teacher-assigned live ping/traceroute practice and diagram symbol fidelity remain separate evidence requirements.</p>"
    ],
    [
      "Attempt fresh mixed transfer",
      "<p>Lesson 3 uses a fresh mixed task before answers are shown. The workbook supplies different IDs, a /27 subnet, a capacity limit and a software test requirement. Allow roughly 25 minutes for the attempt, then mark with explanations and use remaining time for corrections. This is formative practice, with no official examination-format or assessment-weighting claim.</p><p><a class=\"button\" href=\"unit3-consolidation-pack.zip\" download>Download consolidation pack</a> · <a href=\"unit3-consolidation-workbook.md\" download>Student workbook</a> · <a href=\"unit3-consolidation-answers.md\" download>Teacher answers</a> · <a href=\"unit3-consolidation-starter.py\" download>Python starter</a>. The pack includes station cards, teacher reference code and a revision-plan CSV. Teacher files are separate, not access-protected.</p>"
    ],
    [
      "Build an evidence-based revision plan",
      "<p>In lesson 4, complete one delayed retry for each selected priority and a short mixed check. Record the outcome, help used and remaining uncertainty. A successful repetition immediately after reading an answer is useful practice, but weaker evidence than an independent fresh attempt later.</p><p>Plan week 16 exam preparation from specific needs: task, reason, resource, time and success evidence. Keep unresolved practical skills visible. Avoid recording mastery merely because a page was read or a model output matched a prediction.</p><p>Earlier resources: <a href=\"#unit3-review\">integrated review</a>, <a href=\"#unit3-sort\">sorting</a>, <a href=\"#unit3-inheritance\">inheritance</a>, <a href=\"#unit3-addressing\">subnetting</a> and <a href=\"#unit3-secure-networks\">network design</a>. Technical reference: <a href=\"https://docs.python.org/3/tutorial/datastructures.html\">Python data structures</a>. Curriculum: <a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">2026 SCSA Year 12 syllabus</a>. Questions and explanations are original drafts for classroom review.</p>"
    ]
  ],
  "practice": [
    [
      "COPY",
      "Why can a copied dictionary still share a list value?",
      "The mapping copy is shallow: it copies references to values. Appending to a shared nested list is visible through both mappings."
    ],
    [
      "SEARCH",
      "Is X01,X03,X02 suitable for binary search by ID?",
      "No. IDs are not ascending. Use a correctly ordered ID view or another suitable search structure."
    ],
    [
      "CAPACITY",
      "Does 96 Mbit/s demand on a 100 Mbit/s link guarantee success?",
      "No. It fits the ideal arithmetic, with only 4 Mbit/s spare; overhead/other traffic/endpoint limits still matter."
    ],
    [
      "SUBNET",
      "What subnet contains 192.168.60.130/28?",
      "192.168.60.128/28; broadcast .143, ordinary hosts .129–.142, 14 usable."
    ],
    [
      "POLICY",
      "Separate VLANs with unrestricted routing: are guests isolated from staff?",
      "Layer 2 broadcast domains are separate, but routed traffic can pass. Enforce and test the required inter-zone policy."
    ],
    [
      "EVIDENCE",
      "What is stronger than rereading the answer and repeating it immediately?",
      "An independent fresh question later, with reasoning and a recorded result; use it to check transfer and retention."
    ]
  ],
  "task": "Choose one programming and one networking priority, complete the matching station cards, attempt the fresh mixed transfer and record a delayed retry. Produce a revision plan with two concrete next actions and practical evidence still outstanding.",
  "solution": "Use the error log to justify priorities. Dictionary copy is shallow; sorting and searching keys must agree. For .130/28: network .128, broadcast .143, 14 ordinary usable addresses. A demand of 96 Mbit/s fits 100 Mbit/s ideally but does not guarantee throughput. A network restriction requires actual policy enforcement and evidence. Record a fresh independent retry for each priority.",
  "recap": "Consolidation turns a broad weakness into a specific correction and a fresh demonstration. Keep assumptions, evidence and unresolved skills visible as you prepare for week 16.",
  "lessons": [
    "Lesson 1: retrieve week 14 evidence, attempt baseline questions and choose one programming plus one networking priority.",
    "Lesson 2: two targeted stations, teacher feedback and explained correction; extensions for secure skills.",
    "Lesson 3: fresh mixed transfer, marking and correction within the same lesson.",
    "Lesson 4: delayed retries, mixed retrieval and a concrete week 16 revision plan. Four lessons in week 15; no additional project."
  ],
  "reference": "https://docs.python.org/3/tutorial/datastructures.html",
  "refTitle": "Python tutorial: data structures and shallow copying",
  "quiz": {
    "q": "Which is the most useful next action after a binary-search error?",
    "options": [
      "Reread every programming chapter without checking anything.",
      "Identify the failed precondition, correct it and solve a fresh case independently.",
      "Memorise the original output only."
    ],
    "answer": 1,
    "explanation": "A precise correction and fresh independent attempt provide evidence that the underlying rule transfers."
  },
  "next": "#plan-3-13"
});
chapters.push({
  "id": "unit3-exam",
  "unit": 3,
  "week": 16,
  "title": "Unit 3 exam preparation",
  "badge": "ATTEMPT / MARK / RETRY",
  "intro": "Practise reading, pacing and showing your reasoning, then correct the gaps exposed by an original Unit 3 paper.",
  "objectives": [
    "Distinguish Unit 3 practice from the full Year 12 examination.",
    "Plan written evidence for trace, explain, justify and evaluate tasks.",
    "Attempt and mark an original timed sample.",
    "Verify correction through fresh retries and a final revision plan."
  ],
  "sections": [
    [
      "Understand the scope of this preparation",
      "<p>This chapter prepares Unit 3 within four week 16 lessons. The official Year 12 ATAR examination samples both Units 3 and 4; these original Unit 3 exercises do not replace a full-course examination or your school’s assessment instructions.</p><p>The verified 2026 design brief specifies 10 minutes of reading and 3 hours of working time. Short answer contributes 40%, with 20–30 questions and a suggested 70 minutes; extended answer contributes 60%, with 4–6 questions and a suggested 110 minutes. Check the current SCSA instructions and school directions for the actual assessment.</p><p><a href=\"https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF\">SCSA 2026 Year 12 syllabus and examination design brief</a>. The pack below deliberately uses a shorter classroom format and a different mark split.</p>"
    ],
    [
      "Read the task and plan the evidence",
      "<p>Identify the command, scenario constraints, marks and required representation before answering. Trace means show the successive state; explain needs a mechanism or reason; justify connects a choice to requirements; evaluate weighs evidence, alternatives and limitations. Read the whole question because later parts can define a needed assumption.</p><table><tr><th>Question type</th><th>Useful evidence</th></tr><tr><td>Code trace</td><td>Variable/index/state table and final output</td></tr><tr><td>Algorithm choice</td><td>Precondition, data key/order, preparation/update cost</td></tr><tr><td>Software testing</td><td>Input, expected result, actual result and invariant</td></tr><tr><td>Subnet calculation</td><td>Mask, aligned boundary, range, capacity and gateway caveat</td></tr><tr><td>Network evaluation</td><td>Diagram/policy/path, units, observed evidence and limits</td></tr></table><p>Allocate time from the task’s demands and marks, keeping time to check. If stuck, leave a visible partial method, move on and return. Use any reading period only as the supervisor permits; do not assume classroom practice rules override examination instructions.</p>"
    ],
    [
      "Practise a trace and a contract",
      "<pre><code>stock = {&quot;A01&quot;: 2, &quot;A02&quot;: 1}\nsnapshot = stock.copy()\nfor key in [&quot;A01&quot;, &quot;A02&quot;, &quot;A01&quot;]:\n    if stock[key] &gt; 0:\n        stock[key] -= 1\nprint(stock)\nprint(snapshot)</code></pre><p>Use a trace table for each requested key. The successful updates leave A01 and A02 at zero; the separate snapshot retains the starting integer values. Explain why this differs from copying a mapping whose values are mutable lists.</p><p>For <code>available_ids(records)</code>, define valid input, ordering, output and mutation rules before coding. Return IDs with positive quantity in input order; zero quantity is excluded. Test empty, all-zero and mixed data. Add malformed-data validation only if the requirement asks for it; do not silently change the contract.</p>"
    ],
    [
      "Attempt the original timed practice",
      "<p>The downloadable paper has eight short tasks and two extended tasks: 32 + 18 = 50 marks. Allow 40 minutes for writing after a short teacher-led setup. It is a formative Unit 3 sample, not the official 40%/60% examination format and not a prediction of likely questions.</p><p>Lesson 1 rehearses reading, pacing and a worked trace. Lesson 2 contains the complete practice attempt with time left for an initial reflection. Lesson 3 is marking and targeted correction; lesson 4 is fresh retries and final readiness checks. There is no additional project or extra examination scheduled inside these lessons.</p><p><a class=\"button\" href=\"unit3-exam-pack.zip\" download>Download exam-preparation pack</a> · <a href=\"unit3-exam-practice.md\" download>Original 50-mark practice</a> · <a href=\"unit3-exam-stimulus.md\" download>Stimulus</a> · <a href=\"unit3-exam-answers.md\" download>Teacher marking guide</a>. Teacher files are separate, not access-protected. The paper tests a sample; earlier resources remain necessary for broader Unit 3 preparation.</p>"
    ],
    [
      "Mark the method and diagnose the error",
      "<p>Mark against the supplied points, accepting equivalent correct reasoning. Separate missing knowledge, failed preconditions, arithmetic/unit errors, unclear explanations and time-management issues. Do not award yourself a point for a claim unsupported by your written evidence.</p><p>For a network calculation, show address bits or block boundaries and verify alignment/capacity. For a policy answer, identify actual filtering and dependencies rather than assuming private addresses or VLAN labels provide security. For a diagnostic answer, do not claim a ping reply proves the web service or that an unanswered traceroute probe proves a broken hop.</p><p>Rewrite two lost-mark answers with the missing evidence, then solve the pack’s different-value retry without the guide. Keep the attempt, correction and retry result together.</p>"
    ],
    [
      "Use a fresh retry to check transfer",
      "<p>Fresh case: host 192.168.100.82/28. Find network, broadcast, ordinary range and a gateway candidate. Compare 12 clients at 7 Mbit/s with a 100 Mbit/s uplink, then estimate 250 MB at 80 Mbit/s. Explain why an ideal fit is not measured throughput.</p><details><summary>Compare after attempting</summary><p>Network .80, broadcast .95, hosts .81–.94, 14 usable; .81 is a mathematical gateway candidate, subject to actual router configuration and no duplicate. Demand 84 Mbit/s fits 100 ideally with 16 Mbit/s spare; 250 × 8 ÷ 80 = 25 seconds ideally.</p></details><p>Programming retry: B01:0,B02:3,B03:0,B04:1 should produce B02,B04 without modifying input. Explain search/key ordering separately from a quantity-ordered display. Use previous sorting, object and network-model packs for priorities not represented in this small sample.</p>"
    ],
    [
      "Complete the final readiness check",
      "<p>Check that you can explain and apply data structures, search/sort contracts, object behaviour and reliable testing; address prefixes/ranges; layer/address roles; network components, segmentation, capacity and evidence limits. Use the week 15 plan for any remaining priority. Make a manageable final plan rather than introducing new project features.</p><p>Confirm school-specific assessment instructions, permitted equipment and arrangements with the teacher. Written practice cannot stand in for any outstanding live-tool or practical evidence. Unit 3 editorial coverage, Cisco symbol fidelity, independent teacher review and classroom evidence still need checking before claiming complete coverage.</p><p><a href=\"#unit3-consolidation\">Return to consolidation</a> · <a href=\"#unit3-review\">Integrated review</a> · <a href=\"#contents\">Units 1–4 contents</a>. Use the coverage map to identify remaining editorial reviews and practical checks across Units 3 and 4.</p>"
    ]
  ],
  "practice": [
    [
      "CONTRACT",
      "Should available_ids reorder records by quantity?",
      "No. Its contract requires input order and no mutation; sorting changes the required behaviour."
    ],
    [
      "TIME",
      "Is this 50-mark classroom paper the official examination format?",
      "No. It is a shorter formative Unit 3 sample; the Year 12 examination covers Units 3 and 4 under the current SCSA brief."
    ],
    [
      "SUBNET",
      "Why show the mask and boundary calculation rather than only a final network?",
      "It supports the method, lets you verify alignment and makes an arithmetic error easier to diagnose."
    ],
    [
      "EVIDENCE",
      "Does rewriting the marking guide prove transfer?",
      "No. Attempt a new case independently and record its result."
    ],
    [
      "POLICY",
      "What is missing from saying “Guests have another VLAN, therefore secure”?",
      "Routing/filtering enforcement, allowed services/dependencies, bypass considerations and positive/negative test evidence."
    ]
  ],
  "task": "Complete the stimulus and 50-mark practice under the classroom timing, mark each evidence point, correct two errors and attempt fresh programming/network retries. Complete a final readiness checklist and identify any practical or coverage evidence still pending.",
  "solution": "Follow the separate marking guide. Trace stock to zero while the snapshot retains 2 and 1; available_ids preserves positive-quantity IDs in input order. Network answers must show prefixes, ranges and actual policy enforcement. The fresh case .82/28 belongs to .80/28 with 14 ordinary usable addresses; 84 Mbit/s fits 100 Mbit/s ideally, and 250 MB at 80 Mbit/s takes 25 seconds ideally.",
  "recap": "Preparation is an attempt, a diagnosis and a fresh demonstration. Write the method, match the contract and state what the evidence can support. Keep full-course and school assessment instructions distinct from this classroom sample.",
  "lessons": [
    "Lesson 1: assessment scope, commands, pacing and worked trace/contract rehearsal.",
    "Lesson 2: teacher setup, 40-minute original practice and initial reflection.",
    "Lesson 3: point-based marking, error diagnosis and targeted correction.",
    "Lesson 4: fresh independent retries, final readiness checklist and revision plan. Four lessons in week 16; weeks 17–18 remain blocked for examinations."
  ],
  "reference": "https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0013/1211323/_Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-January-2026.PDF",
  "refTitle": "SCSA 2026 Year 12 syllabus: examination design brief",
  "quiz": {
    "q": "What best demonstrates that you corrected an error?",
    "options": [
      "Copying the model answer neatly.",
      "Solving a fresh case independently and explaining the corrected rule.",
      "Reading the chapter twice without attempting anything."
    ],
    "answer": 1,
    "explanation": "An independent fresh attempt shows whether the reasoning transfers beyond the original answer."
  },
  "next": "#contents"
});
