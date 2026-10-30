"""Original worked examples and scaffolded teaching expansion, 30 October 2026.

Run from the repository root. Author content here; generated files live in dist/depth.
Only original examples and fictional records are packaged. No external dependencies.
"""
from pathlib import Path
import csv
import io
import json
import textwrap
import zipfile

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "dist" / "depth"
OUT.mkdir(exist_ok=True)
examples = {}
modules = []


def example(name, code, output="", kind="python"):
    examples[name] = {"code": textwrap.dedent(code).strip() + "\n", "output": output, "kind": kind}
    return name


def module(route, title, explanation, files, predict, guided, independent, answer, delayed, anchor=None, sources=None):
    modules.append(dict(route=route, title=title, explanation=explanation, files=files,
                        predict=predict, guided=guided, independent=independent,
                        answer=answer, delayed=delayed, anchor=anchor, sources=sources or []))


PY = "https://docs.python.org/3/"
SOURCES = {
    "classes": PY + "tutorial/classes.html",
    "scope": PY + "faq/programming.html#what-are-the-rules-for-local-and-global-variables-in-python",
    "files": PY + "tutorial/inputoutput.html#reading-and-writing-files",
    "errors": PY + "tutorial/errors.html",
    "types": PY + "library/stdtypes.html",
    "structures": PY + "tutorial/datastructures.html",
    "sql": "https://www.sqlite.org/lang.html",
    "create": "https://www.sqlite.org/lang_createtable.html",
    "update": "https://www.sqlite.org/lang_update.html",
    "delete": "https://www.sqlite.org/lang_delete.html",
    "tls": "https://www.rfc-editor.org/rfc/rfc8446.html#section-2",
    "crypto": "https://www.cloudflare.com/learning/ssl/what-is-asymmetric-encryption/",
    "session": "https://www.cloudflare.com/learning/ssl/what-is-a-session-key/",
    "gateway": "https://www-cloud-cdn.cisco.com/site/us/en/learn/topics/networking/what-is-a-network-gateway.html",
    "routing": "https://www.rfc-editor.org/rfc/rfc1122.html#section-3.3.1",
}

example("sequence_checks.py", '''
    PRICE = 3
    def cost(quantity):
        return quantity * PRICE
    for quantity, expected in [(0, 0), (1, 3), (4, 12)]:
        actual = cost(quantity)
        print(quantity, actual, actual == expected)
''', "0 0 True\n1 3 True\n4 12 True\n")

example("conversion_checks.py", '''
    def read_quantity(text):
        quantity = int(text)
        if quantity < 0:
            raise ValueError("Quantity must be non-negative")
        return quantity
    for text in ["0", " 4 ", "-1", "three", "2.5"]:
        try:
            print(repr(text), read_quantity(text))
        except ValueError:
            print(repr(text), "rejected")
''', "'0' 0\n' 4 ' 4\n'-1' rejected\n'three' rejected\n'2.5' rejected\n")

example("selection_boundaries.py", '''
    def delivery(order_total):
        if order_total < 0:
            raise ValueError("Total must be non-negative")
        if order_total >= 50:
            return 0
        return 5
    for total in [49, 50, 51]:
        print(total, delivery(total))
    try:
        delivery(-1)
    except ValueError:
        print("negative rejected")
''', "49 5\n50 0\n51 0\nnegative rejected\n")

example("loop_contracts.py", '''
    def sum_to(limit):
        total = 0
        current = 1
        while current <= limit:
            total += current
            current += 1
        return total
    for limit in [0, 1, 4]:
        print(limit, sum_to(limit))
''', "0 0\n1 1\n4 10\n")

example("scope_and_return.py", '''
    score = 10
    def add_bonus(current, bonus):
        updated = current + bonus
        return updated
    result = add_bonus(score, 5)
    print(score, result)
    # updated belongs to the call, not the module's namespace.
    try:
        print(updated)
    except NameError:
        print("updated is local")
    def broken_bonus():
        score = score + 5
        return score
    try:
        broken_bonus()
    except UnboundLocalError:
        print("local score read before assignment")
''', "10 15\nupdated is local\nlocal score read before assignment\n")

example("list_summary.py", '''
    def summary(values):
        if not values:
            return 0, 0, None
        total = 0
        best = values[0]
        for value in values:
            total += value
            if value > best:
                best = value
        return len(values), total, best
    for values in [[], [0], [4, 9, 9]]:
        print(values, summary(values))
''', "[] (0, 0, None)\n[0] (1, 0, 0)\n[4, 9, 9] (3, 22, 9)\n")

example("files_write.py", '''
    # Run in a disposable learning folder: mode w replaces scores-demo.txt.
    scores = [10, 0, 25]
    with open("scores-demo.txt", "w", encoding="utf-8") as output:
        for score in scores:
            output.write(str(score) + "\\n")
    with open("scores-demo.txt", "r", encoding="utf-8") as source:
        print(repr(source.read()))
''', "'10\\n0\\n25\\n'\n")

example("files_append.py", '''
    # This example creates its own fixture; do not substitute a real history file.
    with open("append-demo.txt", "w", encoding="utf-8") as output:
        output.write("10\\n")
    with open("append-demo.txt", "a", encoding="utf-8") as output:
        output.write("20\\n")
    with open("append-demo.txt", "a", encoding="utf-8") as output:
        output.write("0\\n")
    with open("append-demo.txt", "r", encoding="utf-8") as source:
        print(source.read().splitlines())
''', "['10', '20', '0']\n")

example("files_read_validate.py", '''
    with open("read-demo.txt", "w", encoding="utf-8") as fixture:
        fixture.write("10\\nwrong\\n-1\\n0\\n50\\n51\\n\\n")
    scores = []
    with open("read-demo.txt", "r", encoding="utf-8") as source:
        for line_number, line in enumerate(source, start=1):
            try:
                score = int(line.strip())
                if not 0 <= score <= 50:
                    raise ValueError("Score outside 0..50")
            except ValueError:
                print("Check line", line_number)
            else:
                scores.append(score)
    print("Accepted", scores)
''', "Check line 2\nCheck line 3\nCheck line 6\nCheck line 7\nAccepted [10, 0, 50]\n")

example("python_error_cases.py", '''
    # Small isolated demonstrations: these are not a policy of hiding every error.
    def local_error():
        amount = amount + 1
    cases = [
        ("syntax", lambda: compile("if True print(1)", "demo", "exec")),
        ("indentation", lambda: compile("if True:\\nprint(1)", "demo", "exec")),
        ("name", lambda: missing_name),
        ("local", local_error),
        ("type", lambda: "2" + 1),
        ("value", lambda: int("two")),
        ("zero", lambda: 4 / 0),
        ("index", lambda: [10][1]),
        ("key", lambda: {"A": 10}["B"]),
    ]
    for label, operation in cases:
        try:
            operation()
        except (SyntaxError, NameError, TypeError, ValueError,
                ZeroDivisionError, IndexError, KeyError) as error:
            print(label, type(error).__name__)
''', "syntax SyntaxError\nindentation IndentationError\nname NameError\nlocal UnboundLocalError\ntype TypeError\nvalue ValueError\nzero ZeroDivisionError\nindex IndexError\nkey KeyError\n")

example("validation_pipeline.py", '''
    def count_at_least(values, minimum):
        if minimum < 0:
            raise ValueError("Minimum must be non-negative")
        count = 0
        for value in values:
            if value >= minimum:
                count += 1
        return count
    for values, minimum in [([], 5), ([4, 5, 5], 5), ([0], 0)]:
        print(count_at_least(values, minimum))
''', "0\n2\n1\n")

example("dictionary_or_grid.py", '''
    rows = [["E01", "Camera", 2], ["E02", "Tripod", 0]]
    found = None
    for row in rows:
        if row[0] == "E02":
            found = row[2]
            break
    equipment = {"E01": {"name": "Camera", "available": 2},
                 "E02": {"name": "Tripod", "available": 0}}
    print("row lookup", found)
    print("key lookup", equipment["E02"]["available"])
    print("missing", equipment.get("E99"))
    grid = [[0, 1, 0], [0, 0, 1]]
    print("tile", grid[1][2])
''', "row lookup 0\nkey lookup 0\nmissing None\ntile 1\n")

example("dictionary_update.py", '''
    scores = {"Ari": 10, "Bo": 0}
    scores["Ari"] += 5
    new_name = "Ari"
    if new_name in scores:
        print("duplicate rejected")
    else:
        scores[new_name] = 0
    print(scores["Ari"], scores["Bo"])
    print("Eli" in scores)
''', "duplicate rejected\n15 0\nFalse\n")

example("linear_search_checks.py", '''
    def find_first(values, target):
        for index in range(len(values)):
            if values[index] == target:
                return index
        return -1
    for values, target in [([], 7), ([4, 7, 7], 7), ([4, 7], 5)]:
        print(find_first(values, target))
''', "-1\n1\n-1\n")

example("binary_search_checks.py", '''
    def binary_search(values, target):
        # Contract: values are sorted in ascending order.
        low, high = 0, len(values) - 1
        while low <= high:
            mid = (low + high) // 2
            if values[mid] == target:
                return mid
            if values[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return -1
    for target in [2, 8, 14, 9]:
        print(target, binary_search([2, 5, 8, 11, 14], target))
    print("empty", binary_search([], 2))
''', "2 0\n8 2\n14 4\n9 -1\nempty -1\n")

example("bubble_sort_checks.py", '''
    def bubble_sort(values):
        result = values[:]
        for end in range(len(result) - 1, 0, -1):
            for index in range(end):
                if result[index] > result[index + 1]:
                    result[index], result[index + 1] = result[index + 1], result[index]
        return result
    for values in [[], [2], [3, 1, 3], [4, 3, 2, 1]]:
        print(bubble_sort(values), "original", values)
''', "[] original []\n[2] original [2]\n[1, 3, 3] original [3, 1, 3]\n[1, 2, 3, 4] original [4, 3, 2, 1]\n")

example("encapsulation.py", '''
    class TicketPool:
        def __init__(self, name, capacity):
            if isinstance(capacity, bool) or not isinstance(capacity, int) or capacity < 0:
                raise ValueError("Capacity must be a non-negative whole number")
            self.name = name             # public interface
            self._label = "places"      # non-public convention
            self.__remaining = capacity  # name mangled
        def available(self):
            return self.__remaining
        def book(self, quantity):
            if isinstance(quantity, bool) or not isinstance(quantity, int) or quantity <= 0 or quantity > self.__remaining:
                raise ValueError("Invalid booking quantity")
            self.__remaining -= quantity
    pool = TicketPool("Robotics", 3)
    print(pool.name, pool.available())
    pool.book(2)
    print(pool.available())
    try:
        pool.book(2)
    except ValueError:
        print("rejected", pool.available())
    try:
        print(pool.__remaining)
    except AttributeError:
        print("ordinary double-underscore access fails")
    print("mangled access is possible", pool._TicketPool__remaining)
''', "Robotics 3\n1\nrejected 1\nordinary double-underscore access fails\nmangled access is possible 1\n")

example("inheritance_conventions.py", '''
    class Actor:
        def __init__(self, x):
            self._x = x
        def position(self):
            return self._x
        def move(self, distance):
            self._x += distance
        def update(self):
            self.move(0)
    class Hazard(Actor):
        def update(self):
            self.move(1)
    first, second = Hazard(0), Hazard(0)
    first.update()
    print(first.position(), second.position())
    # A leading underscore requests cooperation; it does not prevent access.
    print(first._x)
''', "1 0\n1\n")

example("unit_and_regression_checks.py", '''
    def collect(score, active):
        if active:
            return score + 10, False
        return score, active
    assert collect(0, True) == (10, False)
    assert collect(10, False) == (10, False)
    assert collect(40, True) == (50, False)
    print("3 unit checks passed")
    score, active = collect(0, True)
    score, active = collect(score, active)
    assert (score, active) == (10, False)
    print("repeated-collection regression passed")
    # assert is useful in a test; do not rely on it to validate real user input.
''', "3 unit checks passed\nrepeated-collection regression passed\n")

example("parameterised_database.py", '''
    import sqlite3
    with sqlite3.connect(":memory:") as connection:
        connection.execute("PRAGMA foreign_keys = ON")
        connection.execute("CREATE TABLE Member (MemberID INTEGER PRIMARY KEY, Name TEXT NOT NULL)")
        connection.execute("INSERT INTO Member VALUES (?, ?)", (1, "O'Neil"))
        connection.execute("UPDATE Member SET Name = ? WHERE MemberID = ?", ("O'Neill", 1))
        rows = connection.execute("SELECT Name FROM Member WHERE MemberID = ?", (1,)).fetchall()
        print(rows)
        assert connection.execute("SELECT COUNT(*) FROM Member").fetchone()[0] == 1
    print("targeted update checked")
''', '[("O\'Neill",)]\ntargeted update checked\n')

example("grid_transfer.py", '''
    def count_walls(grid):
        total = 0
        for row in grid:
            for tile in row:
                if tile == 1:
                    total += 1
        return total
    for grid in [[], [[0]], [[1, 0], [1, 1]]]:
        print(count_walls(grid))
''', "0\n0\n3\n")

example("network_decision.py", '''
    from ipaddress import ip_address, ip_network
    local = ip_network("192.168.10.0/24")
    for destination in ["192.168.10.50", "192.168.20.50"]:
        action = "local link" if ip_address(destination) in local else "use configured gateway"
        print(destination, action)
    # This models a simple one-interface host decision; it does not send packets.
''', "192.168.10.50 local link\n192.168.20.50 use configured gateway\n")

# Labs and chapter expansions are registered below before the generator writes files.

module("files", "Read, write and append: three different contracts", """
<p>A file is persistent storage; a list is working state in memory. Decide whether the requirement is to replace a report, add a new event, or read existing records before choosing a mode. Work in a disposable learning folder: the examples deliberately create their own small fixture files.</p>
<table><thead><tr><th scope="col">Mode</th><th scope="col">Existing file</th><th scope="col">Missing file</th><th scope="col">Suitable job</th></tr></thead><tbody>
<tr><td>r</td><td>Reads without replacing it</td><td>Raises FileNotFoundError</td><td>Load a history</td></tr><tr><td>w</td><td>Truncates on opening, even before the first write</td><td>Creates a file</td><td>Produce a replacement report</td></tr><tr><td>a</td><td>Adds at the end</td><td>Creates a file</td><td>Add an event to a history</td></tr></tbody></table>
<p>Use <code>with</code> so the file is closed when the block finishes. A text write needs text: convert an integer with <code>str</code>. Include a newline when storing one score per record. Appending does not insert a separator automatically, so check whether the existing last record ends in a newline. State UTF-8 explicitly so the format is reproducible.</p>
<p>Inspect actual file contents as well as screen output. Run an append twice: two additional records should be present. Run a replacement twice: only the replacement report should remain. Handle a missing optional history differently from a missing compulsory input. Catch expected conversion/file failures narrowly; do not hide programming defects with an empty catch-all handler.</p>
""", ["files_write.py", "files_append.py", "files_read_validate.py"],
"Predict the exact lines after the two append operations. Would changing either append to w preserve the first score?",
"Change the write example to store 5 and 15. Add 0 with append. Draw the file after each operation, then compare your prediction with the actual file.",
"Write save_score(path, score) for valid integer scores 0..50. Append one line only after validation; reject 51 without changing the file. Test a new file, existing file, repeated append, and rejected input.",
"The append example ends with 10, 20 and 0 on separate lines. A w open removes previous records. For the independent task, compare the entire file before and after rejecting 51; unchanged output is part of the requirement. A missing history may start empty, but a permission failure needs a clear error rather than a false success message.",
"Without reopening the examples, explain why a blank line is neither a valid score nor automatically zero, then test a fresh file containing 50, blank, and bad.",
anchor="Choose the mode deliberately", sources=["files", "errors"])

module("functions", "Scope faults: trace the name before changing the code", """
<p>A name belongs to a namespace. A function call has its own local names; a parameter receives the supplied argument. Returning a result makes that result available to the caller, rather than making every local name global.</p>
<table><thead><tr><th scope="col">Situation</th><th scope="col">Outcome</th><th scope="col">Reasoned repair</th></tr></thead><tbody><tr><td>Read a name never defined in an accessible scope</td><td>NameError</td><td>Check spelling, definition and where the value should come from</td></tr><tr><td>Read a local name before assigning it in that function</td><td>UnboundLocalError, a NameError subclass</td><td>Pass the needed value in and return the changed value</td></tr><tr><td>Assign a local name matching a module-level name</td><td>Usually no exception; two different bindings may surprise the reader</td><td>Trace both scopes and make data flow explicit</td></tr><tr><td>Access an object's missing attribute</td><td>AttributeError</td><td>Check the object's interface, construction and attribute spelling</td></tr></tbody></table>
<p>An assignment anywhere in a function generally makes that name local throughout that function unless declared otherwise. Therefore <code>score = score + 5</code> reads a not-yet-bound local score in the broken example. Adding <code>global</code> may change which binding is used, but it increases shared-state dependencies. Prefer an explicit parameter and return for this task. NameError and UnboundLocalError are concrete diagnostic examples, not extra assessment categories.</p>
""", ["scope_and_return.py"],
"Will calling add_bonus change the module-level score? Which scope owns updated?",
"Make a two-column trace for module score and function current/updated. Change bonus to 0 and then -2; predict both printed values before running.",
"Repair the broken function by accepting current as a parameter and returning the new score. Call it for two independent players and demonstrate that one call does not silently change the other player's value.",
"The original score remains 10 and result is 15. updated is local. The broken assignment causes UnboundLocalError. A suitable repair is def bonus(current): return current + 5, followed by score = bonus(score) in the caller. Separate parameters/returns make each player's update explicit.",
"Explain to a partner why changing a variable name can repair a spelling fault but does not, by itself, fix the intended flow of data between scopes.",
anchor="Names belong to scopes", sources=["scope"])

module("design", "Classify, isolate, repair and retest Python errors", """
<p>Debugging changes a defective program; testing supplies evidence that a requirement is or is not met. A program can run without an exception and still be wrong. Start with the smallest input that exposes a mismatch and record the expected result independently.</p>
<table><thead><tr><th scope="col">Category / example</th><th scope="col">What it tells you</th><th scope="col">Useful next step</th></tr></thead><tbody>
<tr><td>SyntaxError / IndentationError</td><td>Python cannot parse the source</td><td>Inspect the indicated line and preceding brackets/colon/indentation</td></tr><tr><td>TypeError</td><td>An operation received an unsuitable type</td><td>Trace the type before conversion or arithmetic</td></tr><tr><td>ValueError</td><td>A value cannot be used for that operation, such as int('two')</td><td>Check conversion and domain rules</td></tr><tr><td>ZeroDivisionError</td><td>A divisor is zero</td><td>Define the empty/zero case before dividing</td></tr><tr><td>IndexError / KeyError</td><td>A sequence position / dictionary key is absent</td><td>Check bounds, membership and the missing-item contract</td></tr><tr><td>FileNotFoundError / PermissionError</td><td>A path is absent / access is denied</td><td>Check the named resource and report the appropriate failure</td></tr><tr><td>Logic error, such as &gt; instead of &gt;=</td><td>The code runs but violates the requirement</td><td>Compare a boundary trace with the independently predicted result</td></tr></tbody></table>
<p>Read the final traceback line for the exception type and use the traceback to locate the relevant call. Add a temporary print of the suspect value/type or a breakpoint before the first incorrect state. Repair one cause, repeat the failing test, then rerun previously passing cases to detect regressions. An exception is a runtime event; the Python class named RuntimeError is not the name of every runtime error.</p>
""", ["python_error_cases.py", "unit_and_regression_checks.py"],
"Which case cannot normally begin execution as a script, and which failures occur only when their operations run?",
"Classify each demonstration before running it. Choose one conversion fault and one missing-key fault; explain their causes and propose a targeted repair rather than catching every exception.",
"Deliberately change collect so it always adds 10. Record the first failing test, repair the cause, and rerun the repeated-collection check plus a fresh score of 20.",
"The syntax/indentation examples fail during compile; the others fail during execution. collect must leave an inactive item unchanged. After repair collect(20, True) returns (30, False), and a second call returns the same pair. The error demonstration catches a chosen list of exceptions solely to compare them in one run; that is not a production error-handling template.",
"Given a new traceback, state the category, concrete exception where present, first state to inspect, and a regression test to retain after repair.",
anchor="Debug: isolate the first incorrect state", sources=["errors", "scope"])

module("unit3-objects", "Public, protected and private: intention, interface and Python conventions", """
<p><strong>Encapsulation</strong> groups state with the operations that maintain its rules. Information hiding reduces a caller's dependence on representation. For a ticket pool, the important invariant is that remaining places cannot become negative through a valid booking operation. Choose access according to responsibilities, not because every attribute needs a getter and setter.</p>
<table><thead><tr><th scope="col">Design term</th><th scope="col">Intended access</th><th scope="col">Typical Python notation</th><th scope="col">Important limit</th></tr></thead><tbody>
<tr><td>Public</td><td>Callers use the supported interface</td><td>name, book(), available()</td><td>Document its contract; public need not mean every change is sensible</td></tr><tr><td>Protected</td><td>Class implementation and cooperating subclasses</td><td>_label or _x conventionally marks non-public state</td><td>Python has no enforced protected access modifier</td></tr><tr><td>Private</td><td>Implementation detail of the defining class</td><td>__remaining triggers name mangling</td><td>Mangling helps avoid accidental clashes; it is not access security</td></tr></tbody></table>
<p>The plus, hash and minus signs in a conceptual class diagram commonly denote public, protected and private visibility respectively. In Python, ordinary attributes remain accessible; a single underscore is a cooperation convention. Double-leading underscores rewrite the name inside a class. An informed caller can still reach a mangled name, so neither convention protects secrets from hostile code.</p>
<p>The supported <code>book</code> method checks the quantity before changing state. Reading via <code>available</code> exposes the result without asking the caller to understand the stored attribute. The example deliberately shows a mangled access to explain its limit, not to recommend it. Compare the benefits: callers have one reliable rule-enforcing entry point, internal representation can change behind the interface, and tests can target observable behaviour.</p>
<p>This section connects requested design vocabulary to Python's actual behaviour. Access-modifier syntax and property machinery from other languages are not additional project requirements.</p>
""", ["encapsulation.py", "inheritance_conventions.py"],
"After a pool of 3 books 2 places, what should happen to an attempted booking of 2 more? Does name mangling make the remaining count secret?",
"Annotate each public method and internal attribute. Draw the invariant before/after each operation. Explain why the rejected booking must leave 1 place rather than changing state first.",
"Add a cancellation method that cannot increase remaining places above the original capacity. Specify valid/invalid inputs and test both rejection and unchanged state. Decide which capacity field is an implementation detail and justify the public interface.",
"The first booking leaves 1. The second is rejected and must leave 1. Ordinary pool.__remaining access fails, but the mangled name remains accessible. For cancellation, store the original capacity, validate the requested positive quantity and upper bound before mutation, and check that a rejected cancellation leaves the previous value intact. Equivalent documented class designs are acceptable.",
"From a blank page, contrast design intention with enforcement for name, _name and __name. Explain why authorisation for a real system is separate from these naming conventions.",
sources=["classes"])

module("unit3-structures", "Choose dictionaries for labelled lookup and grids for position", """
<p>Choose a structure from the operations the solution must support. A list of rows can hold equipment records, but a search by EquipmentID must locate the matching row before accessing its count. A dictionary keyed by EquipmentID makes the lookup intention explicit and replaces unexplained column numbers with meaningful field names.</p>
<table><thead><tr><th scope="col">Need</th><th scope="col">Dictionary benefit or limit</th><th scope="col">2D list benefit or limit</th></tr></thead><tbody><tr><td>Find a record by a unique ID</td><td>Direct key-based access; membership and get make missing cases explicit</td><td>Usually scan rows unless another index is maintained</td></tr><tr><td>Read a map tile at row and column</td><td>Possible, but compound keys add unnecessary representation choices</td><td>Natural position-based access such as grid[row][column]</td></tr><tr><td>Keep record fields understandable</td><td>Named fields reduce reliance on column-number conventions</td><td>Column meanings must be documented and used consistently</td></tr><tr><td>Store repeated labels</td><td>Keys must be unique; an assignment to an existing key replaces its value</td><td>Rows can contain repeated labels; the design must define which row is intended</td></tr></tbody></table>
<p>For ID lookup, a hash-based dictionary typically avoids a full row scan; it is not a promise that dictionaries are always faster or smaller. A grid already provides direct row/column access and often suits spatial traversal. Dictionaries carry representation overhead. Dictionary insertion order is retained in current Python, but keys are not automatically sorted. A dictionary is not a relational database: it does not automatically enforce foreign keys or prevent unsuitable updates.</p>
<p>Make a missing ID different from a present ID whose count is zero. Use membership when that distinction matters. Keys must be hashable; a mutable list is not a suitable dictionary key. Keep the chosen unique-ID rule in the design and test duplicate insertion explicitly.</p>
""", ["dictionary_or_grid.py", "dictionary_update.py"],
"Will looking up E02 return zero or a missing result? What happens if you assign an existing key rather than checking for a duplicate?",
"Replace one positional equipment row with named dictionary fields. Complete a missing-ID branch and demonstrate that 0 available items is not treated as an unknown ID.",
"Choose structures for an 8 × 10 game map and an item catalogue keyed by unique ID. Write add_item so a duplicate ID is rejected rather than silently overwritten. Test an existing zero-valued item, unknown ID and duplicate ID.",
"E02 exists and has 0 available. get('E99') returns None in this example. A grid suits map coordinates; a dictionary suits catalogue IDs. The duplicate check must happen before assignment, and rejecting a duplicate must preserve the earlier record. Do not use if catalogue.get(id) as the only existence check when legitimate stored values can be false-like.",
"Given a new problem, justify the structure using access operations, uniqueness, missing cases and traversal, rather than saying a dictionary is always better.",
sources=["structures", "types"])

module("unit4-crypto", "Why use symmetric and asymmetric cryptography together?", """
<table><thead><tr><th scope="col">Approach</th><th scope="col">Benefits</th><th scope="col">Costs and limits</th><th scope="col">Suitable role</th></tr></thead><tbody><tr><td>Symmetric encryption</td><td>Efficient bulk protection with relatively low processing cost</td><td>Communicating parties need appropriate shared secret key material; theft or poor distribution undermines protection</td><td>Large files, backups and application traffic</td></tr><tr><td>Asymmetric/public-key techniques</td><td>Public keys can be distributed without revealing private keys; supports authenticated key establishment and digital signatures</td><td>Greater computational cost for suitable operations; public keys must be bound to the intended identity</td><td>Establish trust/key material and verify signatures</td></tr></tbody></table>
<p>With symmetric encryption, the shared secret must remain secret from outsiders. It is efficient for substantial data, but securely agreeing and managing keys is a separate problem. Public-key encryption lets a sender protect data for a recipient without knowing that recipient's private key. Signature algorithms support a different job: the private key signs and the public key verifies. Do not describe a signature as encrypting the whole message with a private key.</p>
<p>In a typical certificate-authenticated TLS 1.3 connection, certificate/signature checks authenticate the server and a public-key agreement derives shared secrets. Derived symmetric traffic keys then protect application records efficiently. The private key is never sent. TLS 1.3 does not use the older RSA transport of an encrypted premaster secret. Pre-shared-key modes also exist; the illustrated certificate flow is not every possible handshake.</p>
<p>The practical benefit is a division of labour: authenticate and establish appropriate key material, then protect bulk traffic efficiently. A certificate needs a valid trust chain and the expected identity; seeing any certificate is insufficient. Encryption does not repair a compromised endpoint or decide who is allowed to read decrypted data. Authenticated encryption addresses tampering as well as confidentiality; a plain hash is not encryption.</p>
""", [],
"A school sends a large backup to an approved remote service. Why is 'use public-key encryption for every byte because it is more secure' a weak justification?",
"Sort cards labelled public key, private key, certificate check, key agreement and symmetric traffic protection into a simplified connection flow. Explain who keeps each secret and what each step achieves.",
"Write a benefit–mechanism–limitation paragraph for stored backups and another for a web session. Include key management for the backup and identity validation for the session. Distinguish confidentiality from authentication.",
"Bulk symmetric encryption is efficient; public-key mechanisms can establish trust/key material without distributing a private key. A sound answer explains identity checks and secure key storage/distribution rather than claiming one family is universally more secure. For backups, recovery also depends on retaining authorised access to the decryption keys. For a typical TLS 1.3 session, authenticate the server, agree/derive keys, then protect application data with symmetric traffic keys.",
"Explain why a leaked symmetric key, a substituted public key and a compromised endpoint are three different problems requiring different controls.",
anchor="Keep key roles separate", sources=["crypto", "session", "tls"])

GATEWAY_TEXT = """
<p>The word <strong>gateway</strong> needs context. A host's <strong>default gateway</strong> is the next-hop router used when no more specific route is available. A <strong>protocol/application gateway</strong> can translate between systems, such as an analogue telephone service and a VoIP service. One physical appliance may provide routing, translation, firewalling and other services, but those functions are not interchangeable.</p>
<p>Consider a simple host with address 192.168.10.20/24 and default gateway 192.168.10.1. A destination 192.168.10.50 is on the local subnet; a destination 192.168.20.50 is off-link. For the latter, the host sends a frame to the gateway's local interface, while the IP packet still names the remote destination. In ordinary IPv4 Ethernet this involves resolving the next hop's MAC address. NAT, if present later on the route, is a separate address-translation function.</p>
<table><thead><tr><th scope="col">Observation</th><th scope="col">Reasonable hypothesis</th><th scope="col">Next controlled check</th></tr></thead><tbody><tr><td>Local service works, remote IP service fails</td><td>Gateway/routing or an intervening policy may be involved</td><td>Check host mask/gateway and the allowed route with authorised tools</td></tr><tr><td>Remote IP works but a name fails</td><td>Name resolution may be involved</td><td>Check the configured DNS service; do not change the gateway blindly</td></tr><tr><td>An IoT device uses a protocol the target service does not accept</td><td>Protocol translation may be needed</td><td>Identify both endpoints' protocols and the gateway's supported translation</td></tr></tbody></table>
<p>A reachable gateway does not prove that every remote service is permitted or available. A failed ping may reflect filtering; it does not prove a device is offline. The Python example models address membership only and sends no traffic. Use simulated/authorised classroom checks, not arbitrary scanning of a live network.</p>
"""
for route in ["addressing", "unit3-network-models", "unit3-addressing"]:
    module(route, "Gateways: next-hop routing versus protocol translation", GATEWAY_TEXT,
           ["network_decision.py"],
           "For the stated /24 host, which destination is local? Does an off-link packet change its destination IP to the gateway's IP?",
           "Draw the host, switch, gateway and remote network. Label the next-hop frame recipient separately from the remote IP destination. Then change the destination to 192.168.10.99.",
           "Explain the difference between a wrong default gateway, an unavailable DNS service and a missing IoT protocol translator. For each, give an observation and a check that could distinguish it from another cause.",
           "192.168.10.50 is local; 192.168.20.50 uses the gateway in this simple model. The packet retains the remote IP destination; the local frame targets the next hop. 192.168.10.99 is local. A protocol gateway translates a communication format; a default gateway routes off-link traffic. Do not infer the cause from one failed ping.",
           "Given a new host and mask, draw the first hop and explain why a router, switch, DNS service and protocol translator are different roles.",
           sources=["gateway", "routing"])

example("representation_checks.py", '''
    bits = "00101101"
    total = 0
    for bit in bits:
        total = total * 2 + int(bit)
    print(total, int(bits, 2))
    print(hex(total))
    print(ord("A"), chr(65))
''', "45 45\n0x2d\n65 A\n")

example("mean_without_zero_division.py", '''
    def mean(values):
        if len(values) == 0:
            return None
        total = 0
        for value in values:
            total += value
        return total / len(values)
    for values in [[], [0], [10, 20]]:
        print(values, mean(values))
''', "[] None\n[0] 0.0\n[10, 20] 15.0\n")

example("sort_then_search.py", '''
    def find_first(values, target):
        for index, value in enumerate(values):
            if value == target:
                return index
        return -1
    original = [9, 2, 7]
    ordered = sorted(original)
    print("original", original, find_first(original, 9))
    print("ordered", ordered, find_first(ordered, 9))
    # sorted is a library operation here; it is not an implementation of a taught sort.
''', "original [9, 2, 7] 0\nordered [2, 7, 9] 2\n")

example("project_stub_contract.py", '''
    def load_scores():
        # Temporary fixture stub: real file handling is not implemented here.
        return [0, 10, 50]
    def count_completed(scores):
        return len(scores)
    print(count_completed(load_scores()))
    assert count_completed([]) == 0
    assert count_completed([0]) == 1
    print("processing contract checked; file integration still pending")
''', "3\nprocessing contract checked; file integration still pending\n")

# Each coding page gets an additional runnable, testable example in its own context.
CODING = [
    ("start", "sequence_checks.py", "A test harness for a sequence", "What does a zero-item order cost under this example's rule?", "Add (6, 18), then deliberately change the multiplier to 4. Identify which tests expose the change.", "Zero costs zero here; all listed cases compare actual output with independently stated expected values."),
    ("values", "conversion_checks.py", "Trace types and validate the domain", "Which strings convert to integers, and which violate the non-negative rule?", "Add '05' and an empty string; explain the different outcomes before running.", "'05' becomes integer 5; an empty string is rejected. A successful conversion alone does not establish the allowed range."),
    ("representation", "representation_checks.py", "Verify a representation by a second method", "Will manual place-value accumulation equal int(bits, 2)?", "Replace the binary text with 11111111 and predict decimal and hexadecimal before running.", "The new decimal value is 255 and hexadecimal is 0xff. Character code 65 represents A; text encoding still matters when storing bytes."),
    ("selection", "selection_boundaries.py", "Executable checks at the decision boundary", "Which of 49, 50 and 51 should have no delivery charge?", "Temporarily replace >= with >. Record the single boundary case that exposes the fault.", "50 and 51 have free delivery. The faulty > comparison fails at exactly 50; rejecting a negative total must not be confused with charging delivery."),
    ("loops", "loop_contracts.py", "Test zero, one and several iterations", "How many times does the body run for limits 0, 1 and 4?", "Add a trace column for current and total. Change <= to <, then isolate the first differing state.", "The correct totals are 0, 1 and 10. With <, the final intended value is skipped. A zero-iteration path is a useful test, not an error by itself."),
    ("arrays", "list_summary.py", "Specify empty and repeated-value cases", "What represents no maximum, and is that different from a maximum of zero?", "Complete a trace for [4, 9, 9]. Add a singleton and explain why the maximum initialises from a real item.", "An empty list returns (0, 0, None). [0] returns (1, 0, 0), so absence and a genuine zero stay distinct."),
    ("consolidation", "mean_without_zero_division.py", "Repair a zero-data case before averaging", "Can a mean be computed from no observations?", "Write expected results for [], [0] and [10, 20], then remove the empty check and classify the failure.", "No observations produce None in this contract; [0] has a genuine mean of 0.0. Removing the guard produces ZeroDivisionError for an empty list."),
    ("exam-preparation", "scope_and_return.py", "Explain a trace rather than memorise output", "Which result changes in the caller, and which name is unavailable outside its function?", "Cover the output and produce a two-scope trace before checking the guide.", "The module score is 10 and returned result is 15. State which name is bound in which scope; a return does not export every local name."),
    ("unit3-fluency", "validation_pipeline.py", "Keep parsing, processing and tests separate", "Does a value exactly equal to minimum qualify?", "Add [5, 5, 4] at minimum 5, and explain why duplicates count separately.", "The result is 2; equality qualifies. The processing contract assumes numeric observations and checks a non-negative minimum."),
    ("unit3-search", "linear_search_checks.py", "Test the search result contract", "Which duplicate index is returned, and how is absence represented?", "Add a match at the final index and a singleton missing case. Write expected indices before running.", "The function returns the first matching index or -1. Check the -1 result before indexing a list, because Python accepts negative indices."),
    ("unit3-search", "binary_search_checks.py", "Trace shrinking bounds without skipping the target", "Why must the input be sorted, and what happens when it is empty?", "Trace low, high and mid for target 14. Add a target below the minimum and above the maximum.", "14 is at index 4. Empty input returns -1; the loop starts with high = -1. Sorting is a precondition, not something this function verifies."),
    ("unit3-sort", "bubble_sort_checks.py", "Check order, duplicates and the mutation contract", "Does the function modify its argument? Which duplicate values must survive?", "Complete the first pass for [3, 1, 3]. Compare result, length, value counts and the original list.", "The result is [1, 3, 3], with both 3s retained. The function sorts a shallow copy; it promises not to reorder the argument."),
    ("unit3-inheritance", "inheritance_conventions.py", "Test an overridden method and independent objects", "Does updating first move second? Does the underscore block access?", "Create a third Hazard at 5, update it twice and trace the inherited position state.", "first reaches 1 and second stays 0. A third Hazard moves 5 to 6 to 7. The underscore requests non-public use but does not enforce it."),
    ("unit3-project", "project_stub_contract.py", "Use a stub without mistaking it for completed integration", "Which part has evidence, and which part remains unimplemented?", "Replace the fixture with [] and [0]. Keep a test ledger separating processing from file integration.", "Processing handles both fixture cases. The stub proves nothing about a missing file, encoding, permissions or persistence; those need integration checks when implemented."),
    ("unit3-reliability", "unit_and_regression_checks.py", "From a unit check to a regression check", "What should the second collection of an inactive item do?", "Break the active guard, observe the failing test, repair it and rerun all earlier cases.", "Only the first collection scores. Repeating the failing case verifies the repair; rerunning earlier cases checks for unintended effects."),
    ("unit3-review", "sort_then_search.py", "Keep record identity separate from an index", "Is the index of 9 the same before and after sorting?", "Draw the two lists and annotate each index. Explain how returning an index into a changed list affects a caller.", "9 moves from index 0 to 2. An index belongs to a particular sequence state; it is not a permanent record ID."),
    ("unit3-consolidation", "grid_transfer.py", "Transfer traversal to a fresh map", "Does an empty grid have any wall tiles?", "Complete a row-by-row trace and add an all-floor grid before checking output.", "The outputs are 0, 0 and 3. Each matching tile is counted once; row count alone is not the wall count."),
    ("unit3-exam", "binary_search_checks.py", "Write a trace and state the precondition", "Which bounds change after each non-matching midpoint?", "Trace target 9 without running, then justify why discarding half is valid only for ordered data.", "The search returns -1 for 9. Explain the interval invariant and compare with a fresh missing target such as 3."),
    ("database-solution", "parameterised_database.py", "Bridge Python to a controlled SQL change", "Will the apostrophe be part of the stored name or break the statement?", "Change the target ID to a missing ID. Predict the row count and result before querying.", "Bound parameters treat the apostrophe as data. An update of a missing ID changes no matching record; check effects rather than assuming success from no exception."),
    ("unit4-project", "parameterised_database.py", "Verify a parameterised update at the interface", "What evidence shows that only the intended record changed?", "Add a second member and test an update to one ID, a missing ID and an apostrophe-containing name.", "Inspect both records and the count before/after. Parameter binding separates values from statement syntax; it does not replace authorisation or business validation."),
    ("unit4-review", "parameterised_database.py", "Rehearse the program–database boundary", "Which operation changes data and which retrieves evidence?", "Write a fresh expected-result table for two IDs and test targeted changes using bound parameters.", "UPDATE changes the targeted row; SELECT checks state. Keep an unaffected-record check so an omitted WHERE cannot pass unnoticed."),
    ("unit4-consolidation", "grid_transfer.py", "Repair a nested-loop count with a fresh stimulus", "Why must every row be visited rather than only the first row?", "Use [[0, 0], [1, 1]] to expose a first-row-only implementation, then rerun a zero-wall case.", "The new grid has 2 walls. A test with walls only in the second row exposes incomplete traversal."),
    ("unit4-exam", "dictionary_update.py", "Explain a duplicate-key rule from evidence", "Would unconditional assignment preserve the earlier score?", "Cover the result, trace the duplicate branch and give an independent test using a new name.", "Ari remains 15 because duplicate insertion is rejected. A new name can be inserted at 0; the existing zero for Bo is not absence."),
]
for route, name, title, predict, guided, answer in CODING:
    module(route, title,
           "<p>Use the example as a worked model, then fade the support: predict on paper, trace one execution together, change one requirement and test independently. The code is ordinary Python 3 and runs offline. Work in a disposable learning folder. These are ungraded practice examples, not additional assessment requirements.</p><p>Record the input or initial state, expected outcome, actual outcome, pass/fail and a reason. Where an invalid input is outside the function's stated contract, explain that precondition rather than silently inventing behaviour.</p>",
           [name], predict, guided,
           "Create one new normal case, one boundary/empty case and one missing/invalid case relevant to this example. State any preconditions. Predict independently, run, explain the first mismatch if present, and keep the cases for regression after your change.",
           answer,
           "After a gap, solve a changed version without copying the example. Explain one design decision and use a new test to demonstrate transfer.",
           sources=["sql"] if "database" in name else ["types"])

# A fictional log-cleaning activity with provenance, a decision trail and independent outputs.
RAW_FIELDS = ["RawRow", "EventID", "Timestamp", "Host", "Status", "DurationMS", "Source"]
RAW_ROWS = [
    ["R01", "L001", "2027-02-01T09:00:00Z", " lab1 ", "200", " 15 ", "S1"],
    ["R02", "L002", "2027-02-01T09:01:00Z", "LAB1", "ok", "20", "S1"],
    ["R03", "L002", "2027-02-01T09:01:00Z", " lab1", "200", "20", "S1"],
    ["R04", "L003", "2027-02-01T09:02:00Z", "lab2", "404", "8", "S1"],
    ["R05", "L004", "2027-02-01T09:03:00Z", "lab2", "200", "", "S1"],
    ["R06", "L005", "not-a-date", "lab2", "200", "7", "S1"],
    ["R07", "L006", "2027-02-01T09:04:00Z", "lab2", "500", "-2", "S1"],
    ["R08", "L007", "2027-02-01T09:05:00Z", "lab2", "200", "9999", "S1"],
    ["R09", "L008", "2027-02-01T09:06:00Z", "lab3", "200", "10", "U"],
    ["R10", "L009", "2027-02-01T09:07:00Z", "lab3", "200", "7", "S1"],
    ["R11", "L009", "2027-02-01T09:07:00Z", "lab3", "200", "9", "S1"],
    ["R12", "L010", "2027-02-01T09:08:00Z", "lab3", "200", "0", "S1"],
    ["R13", "L011", "2027-02-01T09:09:00Z", "lab3", "403", "4", "S1"],
]

example("clean_event_logs.py", '''
    """Run beside event-logs-raw.csv in a disposable learning folder.
    Fictional reference rules: EventID unique; trusted S1; UTC Z timestamps;
    hosts LAB1..LAB3; approved 'ok' alias means 200; status 200/403/404/500;
    duration is a non-negative integer; >1000 is reviewed, never auto-deleted.
    Raw data is read only. Outputs go to separate worked-*.csv files.
    """
    import csv
    from datetime import datetime
    from pathlib import Path

    def normalise(row):
        if row["Source"] != "S1":
            raise ValueError("unverified source")
        event_id = row["EventID"].strip()
        if not event_id:
            raise ValueError("missing event ID")
        stamp = row["Timestamp"].strip()
        parsed = datetime.strptime(stamp, "%Y-%m-%dT%H:%M:%SZ")
        if parsed.strftime("%Y-%m-%dT%H:%M:%SZ") != stamp:
            raise ValueError("timestamp must use the stated canonical format")
        stamp = parsed.strftime("%Y-%m-%dT%H:%M:%SZ")
        host = row["Host"].strip().upper()
        if host not in {"LAB1", "LAB2", "LAB3"}:
            raise ValueError("unknown host")
        status_text = row["Status"].strip().lower()
        status = 200 if status_text == "ok" else int(status_text)
        if status not in {200, 403, 404, 500}:
            raise ValueError("unknown status")
        duration = int(row["DurationMS"].strip())
        if duration < 0:
            raise ValueError("negative duration")
        return (event_id, stamp, host, status, duration, "S1")

    def clean(rows):
        candidates, decisions = [], {}
        for row in rows:
            try:
                record = normalise(row)
            except ValueError:
                decisions[row["RawRow"]] = ("hold", "verify source, format or domain against rules")
            else:
                candidates.append((row["RawRow"], record))
        versions = {}
        for raw_id, record in candidates:
            versions.setdefault(record[0], set()).add(record)
        kept, seen = [], set()
        for raw_id, record in candidates:
            if len(versions[record[0]]) > 1:
                decisions[raw_id] = ("hold", "conflicting records share an event ID")
            elif record in seen:
                decisions[raw_id] = ("suppress duplicate", "same normalised event already retained")
            else:
                kept.append(record)
                seen.add(record)
                note = "review unusually long duration; preserve original value" if record[4] > 1000 else "matches stated rules after documented normalisation"
                decisions[raw_id] = ("keep", note)
        return kept, [(row["RawRow"],) + decisions[row["RawRow"]] for row in rows]

    if __name__ == "__main__":
        folder = Path(__file__).resolve().parent
        with (folder / "event-logs-raw.csv").open(newline="", encoding="utf-8") as source:
            rows = list(csv.DictReader(source))
        kept, decisions = clean(rows)
        for filename, header, records in [
            ("worked-clean.csv", ["EventID", "Timestamp", "Host", "Status", "DurationMS", "Source"], kept),
            ("worked-decisions.csv", ["RawRow", "Decision", "Reason"], decisions),
        ]:
            with (folder / filename).open("w", newline="", encoding="utf-8") as output:
                writer = csv.writer(output)
                writer.writerow(header)
                writer.writerows(records)
        print("Retained", len(kept))
        print("Non-success", sum(record[3] != 200 for record in kept))
        print("Total duration", sum(record[4] for record in kept))
''', "Retained 6\nNon-success 2\nTotal duration 10046\n")

LOG_TEXT = """
<p>Clean for a stated purpose: summarise this fictional teaching service's events on 1 February 2027. S1 is a supplied trusted fixture export; U has unresolved provenance. EventID must be unique; UTC timestamps end in Z; approved hosts are LAB1–LAB3; durations are non-negative whole milliseconds. The supplied mapping permits <code>ok → 200</code>. Status 403/404/500 can be genuine evidence of denied access, missing resources or failures, not dirty data to erase.</p>
<p>Keep the raw 13 rows unchanged. First inspect them on paper. Normalise only documented equivalents (whitespace, host case and approved status aliases), validate formats/domains, distinguish exact duplicates from conflicting IDs, and hold unresolved rows. A missing duration is unknown, not zero. A very long duration may be genuine: retain and flag R08 for investigation. Do not make a security report look successful by deleting failed events.</p>
<table><thead><tr><th scope="col">Stage</th><th scope="col">Student evidence</th><th scope="col">Check</th></tr></thead><tbody><tr><td>Inspect and predict</td><td>Raw-row decision matrix with reasons</td><td>Every raw row has a treatment</td></tr><tr><td>Clean without overwriting raw</td><td>Separate clean file plus decisions</td><td>Conflicting L009 rows are both held</td></tr><tr><td>Manipulate for a report</td><td>Filter non-success events; group counts by host; total durations</td><td>Do not confuse row count, total and mean</td></tr><tr><td>Evaluate fitness for purpose</td><td>Report retained/held counts and the long-duration flag</td><td>State that excluded unresolved rows may change conclusions</td></tr></tbody></table>
<p>Use the <a href="depth/event-log-workbook.md" download>student log workbook</a>, <a href="depth/event-logs-raw.csv" download>raw CSV</a> and <a href="depth/log-cleaning-pack.zip" download>complete log lab</a>. Teacher reference files and explanations are public learning resources. Source labels establish only this invented exercise's rules; they are not evidence about real school systems.</p>
"""
for route in ["unit4-project", "unit4-analysis"]:
    module(route, "Clean and manipulate a fictional event-log table", LOG_TEXT,
           ["clean_event_logs.py"],
           "Which of a missing duration, a genuine zero duration and a high duration should be treated as the same thing? Are matching IDs sufficient proof of duplicate events?",
           "In pairs, annotate R01–R04 and agree normalised fields. Continue independently for the remaining rows, recording evidence and unresolved questions. Compare decisions before viewing the worked output.",
           "Create a clean output and decision log, filter retained non-success events, then group retained events by host. Change one input to create an unknown host and rerun from the untouched raw copy. Explain how the report changes and what remains uncertain.",
           "The worked rules retain L001, L002, L003, L007, L010 and L011. R03 is an exact normalised duplicate. R05/R06/R07/R09 are held for missing/invalid/unverified data. R10 and R11 are both held because L009 conflicts. There are 6 retained rows, 2 non-success events and 2 retained events per host. Total duration is 10046 ms; the 9999 ms event strongly affects the total and must be reported, not guessed away.",
           "Using a fresh log with a different purpose, decide which cleaning rules still apply. Explain why a report of successful requests only cannot answer a question about all attempted access.",
           sources=["files", "sql"])

example("ddl_dml_lab.sql", '''
    -- Run on a fresh disposable SQLite database, not a school production database.
    PRAGMA foreign_keys = ON;
    CREATE TABLE Supplier (
        SupplierID INTEGER PRIMARY KEY,
        SupplierName TEXT NOT NULL
    );
    CREATE TABLE Item (
        ItemID INTEGER PRIMARY KEY,
        ItemName TEXT NOT NULL,
        Cost REAL NOT NULL CHECK (Cost >= 0),
        SupplierID INTEGER NOT NULL REFERENCES Supplier(SupplierID)
    );
    ALTER TABLE Item ADD COLUMN Active INTEGER NOT NULL DEFAULT 1 CHECK (Active IN (0, 1));
    INSERT INTO Supplier VALUES (1, 'North Supplies'), (2, 'West Supplies');
    INSERT INTO Item (ItemID, ItemName, Cost, SupplierID)
    VALUES (1, 'Camera', 40, 1), (2, 'Cable', 10, 1);
    UPDATE Item SET Cost = 12 WHERE ItemID = 2;
    DELETE FROM Item WHERE ItemID = 2 AND ItemName = 'Cable';
    BEGIN TRANSACTION;
    UPDATE Item SET Cost = 0 WHERE ItemID = 1;
    ROLLBACK;
    CREATE TABLE Scratch (Note TEXT);
    DROP TABLE Scratch;
    SELECT ItemID, ItemName, Cost, Active FROM Item ORDER BY ItemID;
''', kind="sql")

example("anomalies_lab.sql", '''
    -- Fresh disposable SQLite database. Fixture dependencies are explicitly stated.
    PRAGMA foreign_keys = ON;
    CREATE TABLE FlatMembership (
        StudentID TEXT, StudentName TEXT, ClubID TEXT, ClubName TEXT,
        CoachID TEXT, CoachPhone TEXT,
        PRIMARY KEY (StudentID, ClubID)
    );
    INSERT INTO FlatMembership VALUES
    ('S1', 'Ari', 'C1', 'Robotics', 'T1', '200'),
    ('S2', 'Bo', 'C1', 'Robotics', 'T1', '200'),
    ('S1', 'Ari', 'C2', 'Film', 'T2', '201');
    CREATE TABLE Student (StudentID TEXT PRIMARY KEY, StudentName TEXT NOT NULL);
    CREATE TABLE Coach (CoachID TEXT PRIMARY KEY, CoachPhone TEXT NOT NULL);
    CREATE TABLE Club (
        ClubID TEXT PRIMARY KEY, ClubName TEXT NOT NULL,
        CoachID TEXT NOT NULL REFERENCES Coach(CoachID)
    );
    CREATE TABLE Membership (
        StudentID TEXT NOT NULL REFERENCES Student(StudentID),
        ClubID TEXT NOT NULL REFERENCES Club(ClubID),
        PRIMARY KEY (StudentID, ClubID)
    );
    -- DISTINCT copies known-consistent fixture facts; it does not resolve conflicts.
    INSERT INTO Student SELECT DISTINCT StudentID, StudentName FROM FlatMembership;
    INSERT INTO Coach SELECT DISTINCT CoachID, CoachPhone FROM FlatMembership;
    INSERT INTO Club SELECT DISTINCT ClubID, ClubName, CoachID FROM FlatMembership;
    INSERT INTO Membership SELECT StudentID, ClubID FROM FlatMembership;
    -- Capture a reconstruction before the independent modification activities.
    CREATE TABLE ReconstructedBefore AS
    SELECT s.StudentID, s.StudentName, c.ClubID, c.ClubName, t.CoachID, t.CoachPhone
    FROM Membership AS m
    JOIN Student AS s ON s.StudentID = m.StudentID
    JOIN Club AS c ON c.ClubID = m.ClubID
    JOIN Coach AS t ON t.CoachID = c.CoachID;
    UPDATE Coach SET CoachPhone = '299' WHERE CoachID = 'T1';
    INSERT INTO Club VALUES ('C3', 'Coding', 'T1');
    DELETE FROM Membership WHERE StudentID = 'S1' AND ClubID = 'C2';
    SELECT ClubID, ClubName FROM Club ORDER BY ClubID;
''', kind="sql")

SQL_TEXT = """
<p><strong>DDL</strong> changes database structure: CREATE TABLE defines a table, ALTER TABLE changes supported parts of its structure, and DROP TABLE removes a table. <strong>DML</strong> changes stored records: INSERT adds rows, UPDATE changes matching rows and DELETE removes matching rows. SELECT retrieves data; some classifications call it DQL, while others include retrieval within DML. State the operation's effect rather than relying only on a label.</p>
<table><thead><tr><th scope="col">Operation</th><th scope="col">Example purpose</th><th scope="col">Evidence to inspect</th></tr></thead><tbody><tr><td>CREATE / ALTER</td><td>Add the Item schema and an Active field</td><td>Column definitions, defaults and rejected invalid data</td></tr><tr><td>INSERT</td><td>Add two identified items</td><td>Keys, row count and relationship validity</td></tr><tr><td>UPDATE ... WHERE</td><td>Change the cable price only</td><td>Target record and unchanged camera record</td></tr><tr><td>DELETE ... WHERE</td><td>Remove the disposable cable fixture</td><td>Its absence and other records' survival</td></tr><tr><td>ROLLBACK</td><td>Undo a trial price change</td><td>Previously committed value restored</td></tr><tr><td>DROP TABLE</td><td>Remove the Scratch structure</td><td>Table no longer exists; unlike DELETE, it does not retain an empty table</td></tr></tbody></table>
<p>Run the download only in a fresh disposable SQLite database. Predict the affected rows before modifying data and SELECT the target plus a non-target afterwards. A WHERE clause can still be wrong: its presence alone is not proof of correctness. SQLite uses ALTER TABLE for supported structural changes; do not paste another DBMS's MODIFY syntax without checking its documentation. Transactions manage a related change; authorisation, validation and constraints remain separate responsibilities.</p>
"""
for route in ["sql-basics", "database-solution", "unit4-sql", "unit4-project"]:
    module(route, "DDL and DML: change the structure, change the records", SQL_TEXT,
           ["ddl_dml_lab.sql"],
           "After the trial camera price update is rolled back, is its price 0 or 40? Does DELETE remove the Item table?",
           "Colour-code schema statements and record statements on paper. For each modification, identify target rows, expected state and one record/structure that should remain unchanged.",
           "Use a fresh copy. Add an item, update only its cost, reject a negative cost using the constraint, and delete the disposable item. Inspect state after each operation. Compare DELETE FROM Scratch with DROP TABLE Scratch in separate fresh trials.",
           "The final Item row is (1, Camera, 40, 1). The cable row was removed; rollback restores the camera price. Supplier still contains two rows. Scratch has been dropped. A negative cost is rejected by CHECK and must not alter the previously stored valid row. DELETE changes rows; DROP removes the structure.",
           "Without looking at the labels, explain what each SQL statement changes and design an unaffected-row test that would expose a missing or incorrect WHERE.",
           sources=["sql", "create", "update", "delete"])

ANOMALY_TEXT = """
<p>Begin with business dependencies, not a rule that every repeated value is wrong. In the supplied flat membership table the key is (StudentID, ClubID). StudentID determines StudentName; ClubID determines ClubName and CoachID; CoachID determines CoachPhone. Each student may join many clubs, each club may have many students, and each club currently has one coach.</p>
<table><thead><tr><th scope="col">Anomaly</th><th scope="col">Flat-table problem</th><th scope="col">Resolution and check</th></tr></thead><tbody><tr><td>Update</td><td>Changing T1's phone in only one membership leaves conflicting copies</td><td>Update one Coach row; all related clubs obtain that phone through a join</td></tr><tr><td>Insertion</td><td>A new club with no members cannot be represented without inventing a student or breaking the membership key</td><td>Insert the Club independently, then add Membership rows when students join</td></tr><tr><td>Deletion</td><td>Deleting the last Film membership loses Film's club/coach facts from the flat table</td><td>Delete the Membership only; Club and Coach records remain</td></tr></tbody></table>
<p>The rows already have atomic values, so they can be in 1NF while still having anomalies. To reach 2NF for this composite-key design, separate Student and Club facts from Membership because they depend on only part of the key. At that stage Club may still store CoachPhone. To reach 3NF, separate Coach because ClubID determines CoachID which determines CoachPhone. The final relations are Student, Coach, Club and Membership. Keep linking keys and enforce relationships so decomposition does not disconnect facts.</p>
<p>Reconstruct the original memberships with a join <em>before</em> the independent insert/update/delete activities, checking both missing and extra rows. The fixture's repeated facts are consistent; real conflicting records require investigation. SELECT DISTINCT can suppress identical projections but cannot decide which conflicting phone number is true. A repeated foreign key is expected in a one-to-many relationship and is not by itself a normalisation error.</p>
"""
for route in ["normalisation", "entities-relationships", "unit4-design"]:
    module(route, "Resolve update, insertion and deletion anomalies with evidence", ANOMALY_TEXT,
           ["anomalies_lab.sql"],
           "If the final Film membership is deleted in the flat table, which facts disappear? Should deleting a membership mean the club no longer exists?",
           "Draw arrows for each stated dependency. Complete the 1NF → 2NF → 3NF table splits, keeping keys visible. Predict a join that reconstructs each original membership exactly once.",
           "Use the SQL fixture to add Coding with no members, update T1's phone once, and remove Film's last membership. Verify the club and coach survive. Transfer to Asset(AssetID, AssetName, RoomID, RoomName), where each RoomID determines one RoomName.",
           "The final Club relation retains C1 Robotics, C2 Film and C3 Coding. C2 has no memberships but still exists. T1's phone becomes 299 in one Coach row. The asset transfer splits Room(RoomID PK, RoomName) and Asset(AssetID PK, AssetName, RoomID FK). Prove the relationships preserve the intended facts; do not delete repeated foreign keys.",
           "Given a new scenario, name the dependency causing each anomaly before proposing a split. Explain why atomic fields alone do not establish 3NF.",
           sources=["create", "sql"])

module("unit3-reliability", "Build a testing argument from units to realistic use", """
<table><thead><tr><th scope="col">Testing focus</th><th scope="col">Concrete example</th><th scope="col">Evidence and limit</th></tr></thead><tbody><tr><td>Desk check</td><td>Trace score, active flag and expected state without running</td><td>Find the first wrong state; a correct trace does not prove file integration</td></tr><tr><td>Unit</td><td>Call collect with active/inactive items</td><td>Small repeatable input/output checks</td></tr><tr><td>Integration</td><td>Save a score, close/reopen, read it and refresh the display</td><td>Verify boundaries between modules, not only each isolated function</td></tr><tr><td>User acceptance</td><td>A peer follows a stated restart requirement without teacher hints</td><td>Record observed behaviour against user needs</td></tr><tr><td>Load/response</td><td>Use representative larger histories and mixed transactions on a named school computer</td><td>Measure against a locally stated target; report setup, sample sizes and limits</td></tr><tr><td>Regression</td><td>After fixing repeated scoring, rerun prior pause/restart/save cases</td><td>Check that a repair did not break earlier behaviour</td></tr></tbody></table>
<p>Normal tests check typical valid behaviour; boundary tests probe the edges and values immediately outside them; invalid tests check a documented rejection or recovery path. Include empty, singleton, repeated and missing-data cases when relevant. A negative test can pass by correctly rejecting an input. Do not record a blank actual-result column as a pass.</p>
<p>Use representative synthetic transactions and file sizes in this public resource. If a school trials realistic operational data, use its approved permissions and privacy controls; real names or live credentials are unnecessary for these exercises. Response targets are local requirements, not universal syllabus thresholds. One successful run on a teacher laptop is not evidence for every classroom device.</p>
""", ["unit_and_regression_checks.py"],
"Which checks could pass even if a file is never written? What would demonstrate persistence rather than an updated screen only?",
"Create a ledger: requirement ID, initial state/input, normal/boundary/invalid rationale, expected, actual, result, fix and retest. Complete one row together, two with a partner and one independently.",
"Add a save/reopen integration check and a user acceptance restart check to the unit cases. Define a modest response-time target for a named test setup and report repeated observations without inventing timing results.",
"Unit processing checks can pass with a stub. Persistence requires closing/reopening the actual output and confirming the saved value is loaded. Restart acceptance should verify score, lives, time and item state against the written requirement. An unchecked timing target is pending, not passed.",
"Choose a past repair and justify which regression cases should remain. Include an unaffected behaviour and one fresh counterexample, not only the original failing input.",
sources=["errors"])

# Topic-specific checks throughout the book, including non-code reasoning pages.
# Each tuple is stimulus/initial state, expected evidence, and why it is useful.
CHECKS = {
"start": [("0 badges at $3", "$0 under the no-handling-charge rule", "Zero is valid, not missing"), ("4 badges", "$12", "Independent normal-case prediction")],
"values": [("Text '0042' used as an ID", "Leading zeroes retained as text", "Meaning determines type"), ("Text '2.5' passed to int", "ValueError rather than integer 2", "Conversion is not arbitrary rounding")],
"representation": [("Binary 00101101", "Decimal 45; check using place values", "Two independent methods"), ("Eight one bits", "255", "Maximum unsigned eight-bit boundary")],
"selection": [("Order 49, 50, 51", "Charges 5, 0, 0", "Exposes > versus >="), ("Negative order total", "Documented rejection", "Invalid-domain path")],
"loops": [("sum_to(0)", "0 with no iterations", "Zero-iteration path"), ("sum_to(4)", "10", "Includes the final intended value")],
"functions": [("score 10, bonus 5", "Return 15; original module binding unchanged until assigned", "Scope and data flow"), ("Two separate player inputs", "Updating one does not silently change the other", "Shared-state counterexample")],
"arrays": [("[]", "No maximum under the stated contract", "Do not index before checking empty"), ("[9, 9, 4] with first-maximum contract", "Index 0", "Tie behaviour must be explicit")],
"files": [("Append 20 to a file containing 10 and a newline", "Two records: 10 and 20", "Persistence and separator"), ("Read a missing compulsory input", "Clear failure message; no fabricated data", "Failure differs from optional empty history")],
"design": [("Collect an inactive item twice", "No extra points", "Regression for repeated scoring"), ("UI updates but file cannot be written", "Report failure rather than claiming save success", "Integration and user expectation")],
"software-responsibility": [("Asset with a reusable licence and attribution condition", "Record source, licence and required credit", "Permission is evidenced"), ("Asset with no clear permission", "Seek an approved alternative or clarification", "Public visibility is not proof of reuse rights")],
"networks": [("Local print works; remote service fails", "Check routing/policy separately from local link", "One success does not prove the whole path"), ("One failed ping", "Consider filtering and other evidence", "A test has limits")],
"addressing": [("192.168.10.20/24 to 192.168.10.50", "Direct local-link delivery", "On-link case"), ("Same host to 192.168.20.50", "Use configured next-hop gateway", "Off-link case")],
"network-design": [("12 computers plus printer and uplink", "At least 14 suitable switch connections", "Include infrastructure in capacity"), ("Unauthorised printer user", "Access denied under stated policy", "Permission enforcement")],
"network-review": [("Increase users without changing uplink", "Re-evaluate shared demand and bottleneck", "Changed-stimulus transfer"), ("Name fails while permitted IP service works", "Investigate name resolution", "Distinguish causes")],
"consolidation": [("Average of []", "Document no-data behaviour before division", "Expose a zero divisor"), ("Fix one boundary then try adjacent values", "Earlier and fresh cases meet the rule", "Repair plus regression")],
"exam-preparation": [("Fresh value at a stated boundary", "Working and justified result", "Transfer rather than answer recall"), ("Explain a failed test", "Identify first wrong state and a cause", "Evidence rather than a guessed label")],
"database-foundations": [("Raw readings 18, 21, 24", "Mean recorded reading 21 in context", "Data becomes information"), ("A missing value", "Treat as unknown unless evidence supplies it", "Missing is not automatically zero")],
"entities-relationships": [("One supplier with no items yet", "Model permits supplier to exist if required", "Optionality from rules"), ("Two members sharing a surname", "Unique member IDs still distinguish them", "Counterexample to a name key")],
"normalisation": [("Change a coach phone", "One Coach update supplies joined reports", "Update anomaly resolved"), ("Delete last club membership", "Club remains if the business rule retains it", "Deletion anomaly resolved")],
"sql-basics": [("Cost 24 and 25 under Cost < 25", "Only 24 included", "Boundary filter"), ("Query with no qualifying rows", "Empty result, not necessarily a syntax error", "Explain a valid empty set")],
"database-solution": [("Update one existing item", "Only target changes; others unchanged", "Wrong WHERE detection"), ("Insert a non-existent mandatory parent key", "Enforced foreign key rejects it", "Referential integrity")],
"security-threats": [("Unexpected executable attachment", "Do not run; follow reporting process", "Preventive behaviour"), ("Restore into an infected environment", "Contain/clean first; verify clean recovery", "Backup is not prevention")],
"responsible-data": [("Report can use fictional records", "Do not collect real names unnecessarily", "Data minimisation in the exercise"), ("Proposed public dataset includes personal identifiers", "Apply approved review/de-identification before release", "Sharing needs a purpose and controls")],
"unit2-review": [("Repeated phone values in a flat table", "Find dependencies before choosing splits", "Repeated data alone is not the whole explanation"), ("Join misses an expected member", "Check relationship keys and intended optional rows", "Result-grain reasoning")],
"unit2-consolidation": [("Club added before enrolments", "Independent Club record is possible", "Fresh insertion case"), ("Query result looks plausible", "Compare exact IDs/counts to expected rows", "Plausible is not verified")],
"unit2-exam": [("Fresh relational design", "Keys, cardinality and dependency justification", "Transfer"), ("Changed filter threshold", "Recalculate inclusion of boundary rows", "Avoid memorised outputs")],
"unit3-fluency": [("Minimum 5 and [4, 5, 5]", "Count 2", "Equality and duplicates"), ("Minimum 0 and []", "Count 0", "Empty case")],
"unit3-structures": [("Existing ID with value 0", "Found value 0, not missing", "False-like value case"), ("Duplicate ID insertion", "Reject or update according to declared contract", "No silent rule change")],
"unit3-search": [("Empty input", "Declared not-found result", "No midpoint/index failure"), ("Binary search on unsorted input", "Precondition violated; not a valid correctness test", "State assumptions")],
"unit3-sort": [("[3, 1, 3]", "[1, 3, 3] with multiplicities retained", "Order alone is insufficient"), ("Already sorted input", "Same values in correct order", "Normalisation should not lose data")],
"unit3-objects": [("Book more than remaining", "Reject; remaining unchanged", "Invariant preservation"), ("Direct mangled-name access", "Possible, demonstrating no security boundary", "Convention versus enforcement")],
"unit3-inheritance": [("Update first of two hazards", "Second remains unchanged", "Independent instance state"), ("Call overridden update", "Subclass behaviour with shared invariant maintained", "Specialisation contract")],
"unit3-project": [("Stub returns known history", "Processing tested; persistence still pending", "Avoid overclaiming evidence"), ("Restart after loss", "All stated state reset together", "Integration across modules")],
"unit3-reliability": [("Repeat the originally failing input", "Corrected expected result", "Repair verification"), ("Run earlier passing cases after repair", "They still pass", "Regression")],
"unit3-network-models": [("Host sends off-link", "Next-hop frame and remote packet destinations differ", "Layer responsibilities"), ("IoT protocol differs at service boundary", "Justify translation, not simply extra bandwidth", "Gateway role")],
"unit3-addressing": [("Host and gateway are not on the intended subnet", "Check configuration and reachable next hop", "Configuration fault"), ("A more specific route exists", "Use routing decision, not always default", "Default is a fallback")],
"unit3-secure-networks": [("Guest attempts staff service", "Enforced policy denies it", "Negative security test"), ("Allowed learning service", "Still works under the policy", "Avoid controls breaking legitimate use")],
"unit3-review": [("Sort then use an old index", "Reassess index meaning after reorder", "Identity versus position"), ("Nested-list alias mutation", "Shared rows/objects can reveal unintended changes", "State and copying")],
"unit3-consolidation": [("Walls only in second row", "Both counted", "Detect incomplete traversal"), ("Duplicate catalogue key", "Original retained under rejection contract", "Fresh state test")],
"unit3-exam": [("Missing search target", "Trace termination and not-found result", "Termination reasoning"), ("Class design under changed rule", "Explain interface and invariant consequences", "Transfer")],
"unit4-design": [("Room name repeated for one RoomID", "Separate dependency and preserve relationship", "Transitive dependency"), ("Join reconstructed original facts", "No missing or additional memberships", "Lossless-intent check on fixture")],
"unit4-sql": [("Session with zero bookings", "Retained if report requires all sessions", "Join choice"), ("One parent with multiple child rows", "Aggregate at intended grain without multiplied totals", "Changed-data test")],
"unit4-project": [("Missing import duration", "Hold or obtain evidence; do not guess zero", "Cleaning decision"), ("Write fails after UI message", "Do not report a durable saved result", "Integration and recovery")],
"unit4-analysis": [("403 event in a log", "Preserve as evidence; not automatically dirty", "Purpose-aware cleaning"), ("Conflicting same-ID log entries", "Hold both for investigation", "Authenticity and conflict")],
"unit4-controls": [("Student directly requests staff update", "Reject at enforced boundary", "Hiding button is insufficient"), ("MFA unavailable during approved recovery", "Follow controlled recovery, not unverified bypass", "Control limitations")],
"unit4-crypto": [("Valid encryption, substituted recipient key", "Identity/trust check is still required", "Key binding"), ("Large application data after authenticated key establishment", "Use appropriate symmetric traffic protection", "Hybrid roles")],
"unit4-ethics": [("More data requested than the stated task needs", "Justify or reduce collection under approved rules", "Purpose and proportionality"), ("Old permission/source record", "Recheck current applicable terms and institutional process", "Currency of evidence")],
"unit4-review": [("Quoted name in parameterised SQL", "Stored as data; intended row only", "Interface test"), ("Backup exists but restore untried", "Recovery evidence remains incomplete", "Claim versus evidence")],
"unit4-consolidation": [("New stimulus after a targeted repair", "Independent correct method and explanation", "Transfer"), ("Delayed retry without the worked answer", "Retention or a newly identified gap", "Learning evidence")],
"unit4-exam": [("A question asks to justify", "Choice, mechanism and contextual reason", "Respond to the command"), ("Self-marked gap", "Correction plus a later new attempt", "Do not mistake recognition for independent recall")],
}

for route, rows in CHECKS.items():
    module(route, "Check your reasoning, test the claim and retain the evidence",
           "<p>Use the cases below as starting points, not a complete test plan. Write the expected outcome before running code, issuing SQL or revealing the explanation. For a conceptual claim, use the scenario and a counterexample; for implemented behaviour, record observed results. If the school has not run a check, label it pending.</p>",
           [], "Choose one row and justify the expected outcome without using the program's output as your answer key.",
           "Complete the first case with teacher modelling, the second with a partner, then swap explanations and challenge one assumption.",
           "Create a third case that could expose an error the first two would miss. Record the expected and actual evidence, explain any mismatch, repair one cause and repeat both the new case and earlier cases.",
           "The expected-evidence column gives the starting reference. A sound check explains the rule and its limits, not only a pass label. Keep a contrary or invalid case when appropriate, plus an unaffected case after a change. Your own actual-result evidence is still required.",
           "Return after another topic and attempt a changed case without viewing the worked explanation. Explain what transferred and what still needs support.")
    modules[-1]["checks"] = rows


def csv_text(fields, rows):
    stream = io.StringIO(newline="")
    writer = csv.writer(stream, lineterminator="\n")
    writer.writerow(fields)
    writer.writerows(rows)
    return stream.getvalue()


# Generate downloadable fixtures and an independently inspectable decision reference.
namespace = {"__name__": "log_reference"}
exec(compile(examples["clean_event_logs.py"]["code"], "clean_event_logs.py", "exec"), namespace)
clean_rows, decisions = namespace["clean"]([dict(zip(RAW_FIELDS, row)) for row in RAW_ROWS])
LOG_COLUMNS = ["EventID", "Timestamp", "Host", "Status", "DurationMS", "Source"]
log_inserts = "\n".join(
    "INSERT INTO EventLog VALUES (" + ", ".join(str(value) if isinstance(value, int) else "'" + value.replace("'", "''") + "'" for value in row) + ");"
    for row in clean_rows
)
example("log_manipulation.sql", """
-- Use a fresh disposable SQLite database. This is the worked cleaned fixture,
-- not proof that unresolved raw rows can be ignored for every reporting purpose.
CREATE TABLE EventLog (
    EventID TEXT PRIMARY KEY, Timestamp TEXT NOT NULL, Host TEXT NOT NULL,
    Status INTEGER NOT NULL, DurationMS INTEGER NOT NULL CHECK(DurationMS >= 0),
    Source TEXT NOT NULL
);
""" + log_inserts + """
SELECT EventID, Status FROM EventLog WHERE Status <> 200 ORDER BY EventID;
SELECT Host, COUNT(*) AS Events, SUM(DurationMS) AS TotalMS
FROM EventLog GROUP BY Host ORDER BY Host;
SELECT COUNT(*) AS Events, SUM(DurationMS) AS TotalMS FROM EventLog;
""", kind="sql")

assets = {
    "event-logs-raw.csv": csv_text(RAW_FIELDS, RAW_ROWS),
    "event-logs-clean-reference.csv": csv_text(LOG_COLUMNS, clean_rows),
    "event-log-decisions-reference.csv": csv_text(["RawRow", "Decision", "Reason"], decisions),
    "event-log-decision-template.csv": csv_text(["RawRow", "Proposed treatment", "Evidence/rule", "Expected output", "Question to verify"], [[row[0], "", "", "", ""] for row in RAW_ROWS]),
    "event-log-rules.md": """# Fictional event-log rules

Purpose: summarise the supplied fictional teaching service's events on 1 February 2027. These are invented records, not school telemetry. S1 denotes the trusted exercise fixture; U denotes unresolved provenance. EventID identifies one event. Timestamp must be UTC in YYYY-MM-DDTHH:MM:SSZ form. Allowed hosts are LAB1, LAB2 and LAB3. Whitespace/host case may be normalised. Approved status alias `ok` means 200; valid numeric statuses here are 200, 403, 404 and 500. DurationMS is a whole integer at least zero; missing is unknown, not zero. Durations above 1000 are reviewed and flagged, not automatically removed. The small allowed-status set is an exercise rule, not a complete list of HTTP status codes.

Preserve raw rows. Suppress only identical normalised events under this unique-ID rule. Hold both versions of a conflicting EventID until investigated. Keep denied/missing-resource events for this all-events report. Document transformed values and reasons. U cannot be approved merely because values look plausible. Run the worked cleaner beside a copied raw CSV in a disposable learning folder. It writes separate worked-clean.csv and worked-decisions.csv, replacing previous worked outputs when rerun; it never rewrites the raw file.
""",
    "event-log-workbook.md": """# Clean, manipulate and evaluate a fictional event table

Ungraded practice. Work on a copy in a disposable folder. Read event-log-rules.md first. Complete the decision template before opening the public reference answers.

1. Teacher model: annotate R01's whitespace and host case. Explain which rule permits each change.
2. Paired comparison: normalise R02/R03. Is this an exact duplicate under the event-ID rule? Keep the raw evidence.
3. Faded support: decide R04–R09 with a reason for every action. Distinguish missing, invalid, unverified and unusual values. Do not invent replacement numbers.
4. Independent conflict task: compare R10/R11. Explain why retaining the first row without investigation would be a new assumption.
5. State treatment of R12/R13. Why might deleting zeroes or non-success statuses distort the report?
6. Before running, predict retained event IDs, count, non-success count and host group counts.
7. Run clean_event_logs.py or construct a documented clean output manually. Compare it with your prediction and preserve a decision trail. Its generic hold messages need your row-specific explanation.
8. Use log_manipulation.sql in a fresh SQLite database. Retrieve non-success IDs; group count and total duration by host; calculate the overall total. Write expected results first.
9. Explain the influence of 9999 ms. Would a summary claiming typical response time be justified by the total alone? Propose additional reporting and source checks.
10. Transfer: on a fresh copy, change R01's host to UNKNOWN. Predict what changes, then rerun and compare. The untouched raw master remains available.
11. New purpose: a report of unsuccessful access attempts needs denied/failure events. Explain why cleaning by keeping only 200 statuses is unsuitable.
12. Delayed recall: without the reference, distinguish duplicate suppression, conflict resolution, validation, filtering and aggregation with a new example of each.

Download teacher-depth-notes.md for reference decisions and answers. Reference files are public; this is not a secure assessment.
""",
    "teacher-depth-notes.md": """# Teacher notes: worked examples and instructional sequence

These are original ungraded activities. Choose examples within existing lesson time; this expansion does not add assessed tasks, marks or project requirements. Use a short retrieval prompt, a think-aloud worked example, paired completion, an independent changed case and a later retry. Predictions should precede output/answers. Treat a well-explained error as evidence for the next teaching step.

## Log reference

- R01: keep after permitted whitespace/host-case normalisation (L001, LAB1, 15).
- R02: keep after approved ok → 200 conversion (L002, LAB1, 20).
- R03: suppress in this report as an identical normalised L002 event; preserve the raw row.
- R04: keep L003/404/8. A 404 is relevant event evidence, not automatically dirty data.
- R05: hold; missing duration is not zero and no supplied evidence fills it.
- R06: hold; timestamp does not match the required format.
- R07: hold; negative duration violates the stated domain. Do not guess zero.
- R08: keep L007/200/9999, flag for review. Unusual is not synonymous with false.
- R09: hold; source U is unresolved despite plausible values.
- R10/R11: hold both; the same L009 ID has conflicting durations. Do not choose an arbitrary winner.
- R12: keep L010/200/0; a real zero is allowed.
- R13: keep L011/403/4; denied requests are relevant to the report.

Six retained IDs: L001, L002, L003, L007, L010, L011. Non-success: L003/404 and L011/403. LAB1: 2 events, 35 ms; LAB2: 2 events, 10007 ms; LAB3: 2 events, 4 ms. Overall total 10046 ms. The mean is about 1674.33 ms but is heavily affected by 9999; do not call it a typical response without distribution/context. Changing R01 to UNKNOWN holds it, leaving 5 retained rows, overall total 10031 and LAB1 count 1. Reruns replace worked outputs but not the raw master. Filtering is a report choice after documented cleaning, not a reason to falsify source events.

## DDL/DML reference

The final Item row is (1, Camera, 40, SupplierID 1, Active 1). Supplier has two rows. Scratch no longer exists. UPDATE's price 0 was rolled back. Test negative Cost, absent SupplierID and duplicate ItemID separately, expecting constraint rejection with previous valid records unchanged. Rerun the complete script on a fresh database because CREATE TABLE deliberately exposes an already-existing schema rather than silently reusing it.

## Anomaly reference

The flat key is (StudentID, ClubID). Student and Club facts depend on parts of the key. CoachPhone depends on ClubID transitively via CoachID. The worked 3NF relations are Student, Coach, Club and Membership. Before independent changes, ReconstructedBefore matches all original facts in both directions. The fixture is consistent; DISTINCT is not a conflict-resolution policy. After changes, T1 phone is 299, C3 exists without members, and C2 survives deletion of its last membership. Check constraints reject dangling references. A new Asset/Room example splits Room(RoomID, RoomName) from Asset(AssetID, AssetName, RoomID).

## Testing and feedback

Require students to supply actual observations, not copy the expected column and label it passed. Include normal, boundary and invalid cases where meaningful; empty, singleton, duplicate, missing and inconsistent state cases often reveal different faults. Keep the originally failing test after repair, plus unaffected behaviour and a fresh transfer. Unit tests cannot certify persistence, integration, classroom response times or acceptance. Define a local measurement target and record setup/results; do not invent measurements. Use synthetic data; any live-school trial follows school authorisation and data-handling rules.

## Language and scope

Use Australian English, with practice/practicing as the site owner's preferred exception. Python underscores express conventions/name mangling rather than enforced public/protected/private access. These details support understanding; they are not extra access-modifier project requirements. ipaddress is an optional standard-library model of subnet membership, not a network scanner. No handwritten cryptographic implementation is required. Public references and explained answers are learning supports, not formal assessment keys.
""",
    "README.md": """# Teaching depth expansion · 30 October 2026

Original worked Python/SQLite examples, synthetic log-cleaning and anomaly labs, and scaffolded checks embedded throughout the textbook. Content is a classroom draft for teacher review, not SCSA approval or additional assessment requirements. The site remains static: code runs in the learner's approved local Python/SQLite environment, not on a server.

## Use

Copy the pack into a disposable learning folder. Run each .py file independently with Python 3. Standard library only. Write/append examples create named demo files; mode w replaces those demo files. clean_event_logs.py must be beside event-logs-raw.csv and writes separate worked output files. Use each SQL lab in a fresh disposable SQLite database. Never run these teaching modifications on operational school records. See teacher-depth-notes.md for expected evidence and event-log-workbook.md for the student activity.

## Scaffold

Predict → teacher think-aloud → paired/faded completion → independent changed case → explain/retest → delayed retrieval. Inline examples have downloadable copies and expected-output disclosures. Chapter-specific checks distinguish expected evidence from actual observations. Explanations are hidden by default and excluded from the default student print mode.

## Scope/source review

Review basis: the SCSA Year 11 syllabus for teaching from 2026 and Year 12 syllabus for teaching from 2027, as listed on the course page on 30 October 2026. They cover programming/testing, structures, network components, data management and cryptography. The expansion uses original small worked contexts; exact item-level assessment mapping and classroom pacing still need teacher review. Public/protected/private vocabulary is explained with Python-specific limits, not presented as prescribed keyword syntax. SQL uses SQLite-supported statements rather than assuming cross-DBMS equivalence. The short exercises do not replace required multi-table projects.

Author in scripts/build-teaching-depth.py and rebuild with Python. dist/depth-data.js and dist/depth/* are generated; dist/depth.js supplies the renderer/insertion logic. Module anchors preserve existing section names, source code, original answers and links. Search indexes the enriched sections. Edit neither original project requirements nor annual assessment weights through this generator.

Original content CC BY 4.0; original code MIT. See the supplied licence files. Sources are linked beside the relevant explanations and in sources.md. These fictional examples contain no personal school logs or credentials.
""",
}
assets["sources.md"] = "# Primary source register\n\nReviewed 30 October 2026. Original examples and scaffolds were authored for this resource.\n\n" + "\n".join(f"- {key}: {url}" for key, url in SOURCES.items()) + "\n\n- SCSA course page: https://senior-secondary.scsa.wa.edu.au/syllabus-and-support-materials/technologies/computer-science\n- Year 11: https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0020/1232507/Computer-Science-ATAR-Year-11-Syllabus-for-teaching-from-2026.PDF\n- Year 12 (2027): https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0005/1273190/Computer-Science-ATAR-Year-12-Syllabus-for-teaching-from-2027.PDF\n"

for name, item in examples.items():
    assets[name] = item["code"]
for name in ["LICENSE-CODE.txt", "LICENSE-CONTENT.txt"]:
    assets[name] = (ROOT / name).read_text(encoding="utf-8").rstrip() + "\n"

manifest = {"edition": "30 October 2026", "modules": modules, "examples": examples, "sources": SOURCES,
            "checkRoutes": list(CHECKS), "files": sorted(assets)}
for name, text in assets.items():
    (OUT / name).write_text(text, encoding="utf-8", newline="\n")
(OUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(ROOT / "dist" / "depth-data.js").write_text("const teachingDepth = " + json.dumps(manifest, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")


def pack(name, names):
    with zipfile.ZipFile(OUT / name, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for filename in sorted(set(names) | {"LICENSE-CODE.txt", "LICENSE-CONTENT.txt", "README.md", "sources.md"}):
            info = zipfile.ZipInfo(filename, (2026, 10, 30, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            archive.writestr(info, assets[filename].encode("utf-8"))


pack("log-cleaning-pack.zip", [name for name in assets if name.startswith("event-log") or name in {"clean_event_logs.py", "log_manipulation.sql", "teacher-depth-notes.md"}])
pack("teaching-depth-pack.zip", list(assets))
print(f"Generated {len(modules)} teaching modules, {len(CHECKS)} chapter clinics, {len(examples)} runnable examples and two resource packs.")
