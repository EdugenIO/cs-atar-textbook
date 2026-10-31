# Curriculum follow-up workbook

2026 foundation · 2027 revisions · Original formative additions, 31 October 2026. Expected outcomes are not observed learner results. Independent review remains pending.

## Apply a character code in three bases

A code point is an identifier for a character, not a byte count. Worked example: C has decimal code point 67 = 64 + 2 + 1 = binary 01000011 = hexadecimal 43. UTF-8 encodes this character in one byte; that does not establish a one-byte rule for other characters.

### Worked example

```text
C: decimal 67 → binary 01000011 → hexadecimal 43 → decimal 4×16+3 = 67.
```

### Independent task

Given character B has decimal code point 66, write its eight-bit binary and hexadecimal code point. Check both conversions by converting back. Explain why the character é can use two UTF-8 bytes even though its code point is one number.

### Explained answer (review after attempting)

B: 01000010 and 42 hexadecimal; 64+2=66 and 4×16+2=66. The code point identifies the character; encoding determines its byte representation. One number does not imply one byte.

## Express the same arithmetic in pseudocode and Python

Pseudocode describes the algorithm independently of a language. Define DIV as whole-number quotient for these non-negative counts and MOD as remainder. Python uses // and %. A count is an integer; the measured/price value in this teaching example is a float. Pseudocode conventions must be clear rather than copied as runnable Python.

### Worked example

```text
Pseudocode (illustrative):
count = 17
full = count DIV 4
left = count MOD 4
cost = count * 2.5
OUTPUT full, left, cost

Python:
count = 17
full = count // 4
left = count % 4
cost = count * 2.5
print(full, left, cost)

Expected: 4, 1, 42.5
```

### Independent task

For 23 tickets packed five per envelope at $2.50 each, write pseudocode and Python to compute full envelopes, tickets left and total price. Name the types. Change the count to zero and predict again.

### Explained answer (review after attempting)

4 full envelopes, 3 left, cost 57.5; count/full/left are integer, price/cost float. With zero: 0, 0, 0.0. Use DIV/MOD in clearly defined pseudocode and //,% in Python. Binary floats are a learning simplification for financial amounts.

## Build and revise a Gantt schedule

A Gantt chart places tasks on rows and time slots on columns. Bars show duration; dependencies constrain the earliest start. This separate eight-slot practice example is not a change to the assessed game's workshop budget. Investigation must finish before design, then code, test and evaluation follow. A longer predecessor shifts later tasks unless scope, resources or sequencing genuinely change.

### Worked example

```text
Task       1 2 3 4 5 6 7 8
Investigate ■ · · · · · · ·
Design      · ■ · · · · · ·
Code        · · ■ ■ ■ · · ·
Test        · · · · · ■ ■ ·
Evaluate    · · · · · · · ■
Dependencies: Investigate → Design → Code → Test → Evaluate.
```

### Independent task

Redraw this chart if coding takes four slots instead of three. State the revised finish and propose a defensible response to the original eight-slot deadline. Do not assume testing can disappear.

### Explained answer (review after attempting)

Code occupies 3–6, test 7–8 and evaluation 9: finish slips one slot. Negotiate scope/deadline or a justified resource change, then retest the plan; merely overlapping dependent tasks or removing testing does not solve the dependency.

## Explain what structured design improves

A named calculation function separates one responsibility from input/output. Develop and test it once, call it from several places, read the name to understand intent, and change its rule in one implementation. Repetition can create inconsistent fixes. Modules still need clear inputs/results; hidden global changes can undermine these benefits.

### Worked example

```text
Repeated version: two separate copies of the delivery threshold both need editing.
Function version: delivery_charge(total) implements the threshold once; two callers use its return value.
Test the threshold independently before integrating either caller.
```

### Independent task

Compare repeated delivery calculations with one delivery_charge function called twice. Explain one benefit each for development, comprehension and modification, plus a limitation of poor modular design.

### Explained answer (review after attempting)

Develop/test reusable calculation once; a meaningful function name exposes responsibility; update the threshold in one place. Poor names, unclear interfaces or hidden mutable globals can still make the program difficult to understand and change.

## Use a structure chart and replace a stub

A structure chart shows the module hierarchy and the data passed, rather than execution-time decisions. Main calls LoadScores, Total and Display in this example. LoadScores returns a list to Main; Main passes that list to Total, receives a number and passes it to Display. A stub temporarily supplies a predictable result so callers can be developed before the real input module is finished. It is not a finished file reader.

### Worked example

```text
Main
├── LoadScores() → scores
├── Total(scores) → total
└── Display(total)

# Runnable Python stub example
def load_scores():
    return [2, 5]  # Temporary known input, not a file reader

def total_scores(scores):
    total = 0
    for score in scores:
        total += score
    return total

def display(total):
    print(total)

display(total_scores(load_scores()))  # 7
```

### Independent task

Draw your own labelled structure chart for loading scores, finding the maximum and displaying it. State empty-input behaviour. Replace a loader stub with a text-file reader using the file chapter; test a valid file, missing file and malformed line, and explain how callers use the same interface.

### Explained answer (review after attempting)

Main receives a score list, passes it to a maximum function and passes the result/message to display. Define empty as no maximum before indexing. The loader returns the promised list or follows a documented failure policy, closes the file and validates lines. Use [2,5]→5 and []→no readings; record actual file tests separately. A new implementation behind the same contract need not change correct callers.

## Compare a paper trace, debugger steps and output probes

Predict first on paper. In the school-approved IDE, set a breakpoint on the update line, start its debugger and inspect value/total before stepping over the line. Continue to the next iteration and record the new values. Debugger button names vary by IDE. Diagnostic output is a separate method: an execution marker confirms a branch/body ran, while value prints expose changing state. Neither substitutes for a known expected result.

### Worked example

```text
total = 0
for value in [4, -1, 3]:
    total += value  # Set breakpoint here
print(total)

Expected debugger/paper rows (value, total before, total after):
(4, 0, 4), (-1, 4, 3), (3, 3, 6).
Actual debugger observations: record only after running.

Fault to investigate:
for value in [2, 3]:
    total = 0
    print('ENTER LOOP', value, 'before', total)
    total += value
    print('after', total)
print(total)  # Wrong final 3; intended sum is 5
```

### Independent task

Use a debugger on the first program and compare actual observations with your paper trace. For the faulty program, add or inspect branch/body markers and before/after values, identify the first wrong state, repair initialisation, remove temporary probes and retest [2,3], [] and [-2,1]. If debugger access is unavailable, mark the actual stepping exercise pending and ask for an approved environment.

### Explained answer (review after attempting)

The second iteration resets total from 2 to 0; move initialisation before the loop. Correct sums are 5, 0 and -1. Execution markers show entered code; value probes show state. The first program ends 6. A paper prediction is not a claim that the debugger was run.

## Read and use a library API contract

An application programming interface specifies how a caller uses a component: available operations, parameters, results and relevant failure behaviour. Its implementation supplies the internal steps. An API can be a local Python library; it need not be an internet service. Consult documentation for the installed version. Do not infer valid input ranges only from one successful call.

### Worked example

```text
Example documented contract: library_api.fee(weight) accepts a non-negative number of kilograms and returns a float charge in dollars. Negative input raises ValueError.
Caller: charge = library_api.fee(2.5)
The caller needs the contract; the fee calculation is library implementation. This is an illustrative interface, not an installed package or a fixed fee formula.
```

### Independent task

Write a caller using 2.5 kg. Explain interface versus implementation, where to find permitted arguments, and a valid/boundary/invalid test. Then inspect one actual documented Pygame call used in your practice program and identify its inputs/result.

### Explained answer (review after attempting)

charge = library_api.fee(2.5); contract documents accepted input/result/ValueError while implementation computes charge. Use versioned API docs. Test 2.5 and 0 as accepted, -1 rejected; exact numeric fees need a documented formula. For the real call, cite its actual documentation rather than inventing an output.

## Check a diagram against the course symbol conventions

A logical diagram communicates devices, links and network boundaries; physical room placement is a different view. Use the Cisco-style device symbols shown in the official additional syllabus support booklet, not an unlabeled chain of generic boxes. Read its legend and distinguish router, switch, access point, host and server. Labels and explained traffic paths remain necessary even with correct symbols.

### Worked example

```text
Worked logical roles: wireless client → access point → switch → router → remote service. The AP supplies wireless access; the switch forwards LAN frames; the router connects networks. In the booklet, locate each device symbol and annotate this same path with those symbols before attempting the changed network.
```

### Independent task

Using the official support booklet as the symbol reference, draw a fresh network for 20 wired and 10 wireless clients, a local server and internet access. Label devices, links, network/gateway addresses and an unauthorised-access control. Trace one local and one remote request. Compare symbol shapes with the booklet and record any mismatch before revision.

### Explained answer (review after attempting)

Wired clients/server connect via appropriate switching, wireless clients via APs, remote path via router/gateway. Addresses must be coherent and unique, links/roles explicit, control justified. Symbol fidelity requires visual comparison with the official booklet and teacher review; a text-only path is not evidence of a completed convention-correct drawing.

## Create a fresh relational database independently

Running a supplied creation script demonstrates setup, not independent schema construction. Use a fresh context after the worked equipment database: Author has many Titles, and each Title has exactly one Author. Define a required foreign key with compatible types and test enforcement on the actual connection. The independent task below adds a different many-to-many design rather than merely renaming this example.

### Worked example

```text
-- Worked example: run only in a new disposable SQLite database
PRAGMA foreign_keys = ON;
CREATE TABLE Author(AuthorID TEXT PRIMARY KEY NOT NULL, Name TEXT NOT NULL);
CREATE TABLE Title(TitleID TEXT PRIMARY KEY NOT NULL, AuthorID TEXT NOT NULL REFERENCES Author(AuthorID), Name TEXT NOT NULL);
INSERT INTO Author VALUES('A1','Mia');
INSERT INTO Title VALUES('T1','A1','Robots');
SELECT t.TitleID,a.Name FROM Title t INNER JOIN Author a ON t.AuthorID=a.AuthorID;
-- Expected: T1 | Mia
```

### Independent task

Independently create Member(MemberID text PK, Name required), Workshop(WorkshopID text PK, Title required) and Enrolment with required MemberID/WorkshopID foreign keys and a composite primary key. Insert M1/Ari, W1/Robotics and their enrolment. Write a joined report and demonstrate duplicate-pair and missing-M9 rejection with foreign keys enabled before the transaction.

### Explained answer (review after attempting)

Use three CREATE TABLE statements; text keys explicitly NOT NULL; Enrolment PRIMARY KEY(MemberID,WorkshopID) plus two NOT NULL REFERENCES constraints. Insert parent rows before child. Report joins all three using their IDs and returns Ari/Robotics. Duplicate pair fails uniqueness; M9 fails the FK. Predict these results, then record actual SQL and observed outcomes.

## Transfer the reliability example to the current game

The equipment-loan code in this chapter is a separate worked reliability example. Its R5/R9 labels, request counts and project_reference.py are not the current Pygame task or evidence that a game passes. Transfer the testing method to the current Year 12 game FR1–FR10 and NFR1–NFR7 in the aligned workbook. Use the specified object count for assessed acceptance; additional synthetic load explores limits rather than adding assessed mechanics.

### Worked example

```text
Method transfer:
Loan operation invariant → game score/lives/state invariant.
Failed loan leaves records unchanged → paused update leaves active timer/positions unchanged.
Loan workload + file bytes → declared game workload + history/map size + measured input response.
Database restore → separate version restore, then actual game acceptance/retest.
Keep measured environments and workloads separate; loan timing is not game timing.
```

### Independent task

In the current game workbook, predict pause/resume and restart state tests, including score, lives, active time and actors. Pause three seconds, resume, restart and record actual results. Separately design a bounded synthetic many-actor and large-resource case; state machine/version, workload, measurement and limitations. Link assessed tests to the existing contract, not new requirements.

### Explained answer (review after attempting)

Pause freezes gameplay state/time while input remains responsive; resume continues, restart restores initial contract values. Actual declared-machine response observations, file handling and regression results must be recorded, not inferred from FPS. Extra-load results describe the synthetic trial only; do not change project scope or claim universal performance.

## Trace application connectivity through ODBC

ODBC provides a common database-access interface with an appropriate DBMS driver. An application requests a connection and operation through the interface/driver manager; the selected driver communicates with its DBMS and returns results or errors. Driver/data-source configuration, credentials, supported types and some SQL may change for a different DBMS. ODBC does not make all SQL dialects identical or bypass authorisation.

### Worked example

```text
Request: Attendance app → ODBC interface/driver manager → selected DBMS driver → DBMS/database
Result/error: DBMS → driver → ODBC → attendance app
Example: application requests attendance rows; configured driver connects to the named data source; DBMS checks access and executes supported SQL; rows/errors return along the path.
Direct alternative: Python app → sqlite3 DB-API module → SQLite database. This is not an ODBC connection.
```

### Independent task

Draw both paths for an attendance application and explain what may change when moving an ODBC application to another supported DBMS. Identify two possible failure points. Explain why running this textbook's direct sqlite3 reference does not demonstrate an installed ODBC driver.

### Explained answer (review after attempting)

ODBC path includes interface/driver selection and DBMS; direct sqlite3 does not. Driver/configuration and possibly SQL/types differ. Missing driver, wrong data source, unavailable server or denied credentials can fail at different stages. Inspect the relevant error without assuming every failure is an SQL syntax issue. This is a worked conceptual example, not a claim that ODBC has been installed or tested.

## Review a program against programming conventions

Maintainability comes from connected decisions: validate before processing, choose meaningful names and named constants, explain intent in comments, indent standard control structures, give each clearly named module one responsibility and handle expected failures narrowly. A program that happens to print the right answer once can still be hard to understand or maintain.

### Worked example

```text
BADGE_PRICE = 3

def read_quantity(text):
    # Validate the count before calculating the cost.
    try:
        quantity = int(text)
    except ValueError:
        return None
    if quantity < 0:
        return None
    return quantity

def cost(quantity):
    return quantity * BADGE_PRICE

quantity = read_quantity("4")
if quantity is not None:
    print(cost(quantity))  # 12
# "bad" and "-1" return None; neither reaches processing.
```

### Independent task

Review the worked program against all nine conventions in the explanation. Then independently write a validated rectangle-area program: accept two measured lengths, reject nonnumeric or negative input, separate parsing from area calculation and display. Name the modules, justify a comment and use normal/zero/invalid tests. Explain why a broad except that hides every error is inappropriate.

### Explained answer (review after attempting)

Map validation and narrow ValueError handling to read_quantity; quantity/BADGE_PRICE/cost express purpose; the comment explains intent; indentation and if show structure; read_quantity and cost each have one role and meaningful names. An area solution may use parse_length(text) returning a non-negative float or None, area(width,height) returning their product, and a separate caller/display. For 2.5 and 4 expect 10.0; zero and 4 expect 0.0; negative or unsuitable text is rejected before area calculation. A broad except can hide unrelated programming faults.

## Compare address versions and local delivery independently

An IP address identifies an interface at the network layer. IPv4 has 32 bits and IPv6 has 128. Under the supplied IPv4 /24 mask, compare network prefixes to decide local delivery versus a routed destination. This example does not turn all subnet masks into a rule about the first three octets; that shortcut applies only to this /24.

### Worked example

```text
Host 192.168.40.10/24, mask 255.255.255.0.
192.168.40.20 is local: network 192.168.40.0.
192.168.41.20 is remote: network 192.168.41.0.
Use the configured reachable gateway for the remote network.
IPv6 2001:db8::20 uses hexadecimal notation and a 128-bit address.
More address bits do not imply encryption or a faster connection.
```

### Independent task

For 192.168.60.12/24, classify destinations 192.168.60.80 and 192.168.61.80 and justify each using the mask. Explain the roles of the host address and gateway. Compare IPv4 and IPv6 address lengths and notation, and explain why an IPv6 address is not a guarantee of secure communication.

### Explained answer (review after attempting)

The first destination shares network 192.168.60.0 and is local; the second is on 192.168.61.0 and needs routing through the configured gateway. The mask identifies the network portion; the address identifies the interface. IPv4 is 32-bit dotted decimal; IPv6 is 128-bit hexadecimal groups with permitted compression. Address size is not encryption, authentication or permission.

## Match every network component to a responsibility

A labelled path is a model of responsibilities, not a rule that each physical appliance has only one function. UTP supports ordinary copper Ethernet links; fibre suits suitable long or electrically isolated links; wireless provides radio access. A modem matches the access technology, a router forwards between IP networks, a switch forwards local frames, an access point bridges wireless access, and a firewall applies traffic policy. Place the trust boundary explicitly and check the course symbol table when drawing.

### Worked example

```text
Illustrative DSL access: ISP/access medium -> modem -> router -> perimeter firewall -> trusted LAN switch.
The switch connects wired clients, a server and an access point; wireless clients connect through the AP.
UTP can connect fixed desks; a suitable fibre link can connect buildings.
Router: IP forwarding. Switch: local frame forwarding. Firewall: permitted/denied flows.
Use the official support-booklet symbols for the final logical diagram, rather than copying these text boxes.
```

### Independent task

Create a responsibility table for UTP, fibre, wireless, modem, router, switch, access point and firewall. For each, name a suitable use in a two-building school, explain what it does and one thing it does not establish. Draw a changed logical LAN/WLAN/WAN design with the official symbols, label the trust boundary and trace one local and one remote request. State the assumed ISP access technology before requiring a modem.

### Explained answer (review after attempting)

UTP carries suitable copper LAN signalling, fibre optical links, and wireless radio access; none by itself grants permission. A modem serves the specified provider technology, not every internet service. A router routes IP packets, a switch forwards local frames, an AP supplies wireless-to-LAN access, and a firewall filters traffic according to policy. A valid design places the perimeter outside the trusted LAN and labels media, endpoints and boundaries; local traffic follows local switching and remote traffic follows routing. Devices can combine these roles. Match the official symbol reference and justify alternatives against distance, capacity and access needs.

## Diagnose performance and justify access controls

Separate a capacity limit, a poor traffic path, collisions on a shared half-duplex link and excess broadcast traffic. Modern switched full-duplex Ethernet does not have the shared-medium collision behaviour; Wi-Fi shares airtime with collision avoidance. A firewall can restrict unwanted flows, while operating-system account permissions, updates and secure configuration protect hosts. Neither replaces the other.

### Worked example

```text
Case A: 20 clients each need 8 Mbit/s on a 100 Mbit/s uplink: demand 160, above capacity.
Case B: a local file transfer unnecessarily traverses a constrained remote path: inspect the design and service location.
Case C: a legacy shared half-duplex segment reports collisions: investigate the shared access design.
Case D: excessive broadcast traffic uses a LAN broadcast domain: inspect source/rate and segmentation.
Access example: deny a guest-to-staff file service at the firewall; keep staff files protected by individual accounts/OS permissions even on permitted paths.
```

### Independent task

For each of the four cases, identify the main performance factor, request one observation and justify one remedy with a limitation. Then explain why unauthorised access must be prevented, give a concrete firewall allow/deny pair and name two OS-level protections. Explain why a successful ping cannot prove that file permissions or web access are correct.

### Explained answer (review after attempting)

A: bandwidth/capacity; compare measured utilisation and demand, then address the constrained link or demand, recognising other bottlenecks. B: network design; trace the actual path and place/route the service appropriately. C: data collisions; inspect duplex/shared-medium evidence and modernise or correct the link, without attributing full-duplex or every Wi-Fi delay to this cause. D: excess broadcasts; inspect counts/sources and control or segment broadcast scope, without assuming an ordinary switch removes broadcasts. Restrict unauthorised disclosure/change/disruption with policy: permit an authorised staff service and deny guest-to-staff access; use least-privilege individual OS accounts, permissions and maintained updates/configuration. ICMP response is not evidence of application authorisation.

## Choose and use all four primitive types independently

Choose a type from the meaning of a value, rather than how it looks when printed. Integer counts are whole quantities; floats represent fractional measurements in these examples; a string identifier preserves characters such as leading zeros; a Boolean represents a true/false state. A numeric-looking identifier is not automatically a quantity.

### Worked example

```text
# Python 3: four different meanings
item_count = 3
measured_length = 2.5
reference = "0042"
has_permission = True
print(item_count * measured_length)  # 7.5
print(reference)  # 0042
print(has_permission)  # True

Pseudocode declarations:
item_count = 3
measured_length = 2.5
reference = "0042"
has_permission = TRUE
PRINT(item_count * measured_length, reference, has_permission)
```

### Independent task

Choose and justify a type for each fresh requirement: the number of seats booked, a measured distance that can include fractions, a postcode whose first character may be zero, and whether permission has been granted. Write both clear pseudocode and Python assignments for 6 seats, distance 3.75, postcode 0600 and permission granted. Calculate seats multiplied by distance, display the postcode without losing its leading zero, and state the permission value when permission is refused.

### Explained answer (review after attempting)

Use integer seats = 6; float distance = 3.75; string postcode = "0600"; Boolean permitted = True (TRUE in pseudocode). Multiplication gives 22.5; displaying the string gives 0600. Refused permission is False/FALSE. Counts, fractional measures, identifiers and states have different roles; converting the postcode to an integer would discard a meaningful leading character.

## Construct array algorithms in both representations

Practice must include loading/printing, accumulating every element and finding a position, not only naming a list. Use zero-based indices in these examples and define empty and tie cases. Strict comparisons retain the first tied position. Pseudocode represents the same steps as Python; a different spelling of the loop does not change its contract.

### Worked example

```text
Pseudocode (FOR bounds inclusive):
values = [3, 7, 7]
total = 0
best = -1
IF values.length > 0 THEN
    best = 0
END IF
FOR i = 0 TO values.length - 1
    PRINT(i, values[i])
    total = total + values[i]
    IF values[i] > values[best] THEN
        best = i
    END IF
END FOR
PRINT(total, best)
# No loop passes for an empty array; best -1 is a sentinel, not an index to use.

Python 3
values = [3, 7, 7]
total = 0
best = None
for index in range(len(values)):
    print(index, values[index])
    total += values[index]
    if best is None or values[index] > values[best]:
        best = index
print(total, best)
# Lines: 0 3; 1 7; 2 7; then 17 1.
```

### Independent task

Independently write pseudocode and Python to read three valid integers into an array, print each zero-based index/value, calculate their total, and return the first minimum and first maximum positions without min/max built-ins. Test inputs -4, -1, -1. Then adapt the processing part for an empty array and one value. State how the caller distinguishes no position from index 0 before indexing. Explain how strict comparisons affect the two equal -1 values.

### Explained answer (review after attempting)

For [-4,-1,-1], printed pairs are (0,-4),(1,-1),(2,-1), total -6, first minimum index 0 and first maximum index 1. For an empty array, total is 0 and no min/max position exists: use None or a documented sentinel and check it before indexing. With one value at index 0, both positions are 0 and the total equals that value. Load with a three-pass input loop; traverse the resulting array once, initialise total before traversal, initialise extrema from a real first value only when nonempty, and update positions only on strict < or >. Match the same contracts and bounds in pseudocode and Python.
