# Explained revision answers

Accept equivalent correct reasoning. Original formative practice, not official SCSA exam questions. Diagnose the first wrong step and try a changed case later.


## Your first Python program

Badges cost $3 each with no fixed charge. For quantity 6, identify input, processing and output.

Input 6; multiply 6 by 3; output a total of $18. State the input domain separately.

## Values, types and operators

Calculate 23 // 5 and 23 % 5. Explain the relationship between the results.

Quotient 4 and remainder 3: 23 = 4 * 5 + 3. // performs floor division; % gives the remainder for these positive operands.

## Numbers and characters in a computer

Convert unsigned 8-bit binary 00011001 to decimal and hexadecimal. Show the place values.

16 + 8 + 1 = 25; hexadecimal 19. Leading zeros preserve the unsigned value while declaring the width.

## Making decisions with selection

A delivery fee is $0 for order totals at least $50, otherwise $5. Give tests just below, at and above the boundary.

49.99 gives $5; 50 gives $0; 50.01 gives $0. The comparison is >= 50, so equality belongs to the free branch.

## Repeating work with loops

Which values does range(2, 6) produce, and how many loop iterations does that give?

2, 3, 4, 5: four iterations. The stop value is excluded.

## Functions and scope

For def area(width, height) and the call area(5, 2), identify parameters and arguments. What does return do?

width and height are parameters; 5 and 2 are arguments. return sends a result to the caller and ends that function call.

## Working with one-dimensional arrays

An algorithm starts best = 0 and replaces it only when a later value is strictly greater. What index does it return for [5, 9, 9], and why?

Index 1, the first maximum. The equal value at index 2 does not satisfy a strictly greater comparison. State a non-empty-list precondition or handle empty input.

## Text files and reliable input

Does successfully converting "-4" with int establish valid non-negative input? Explain a complete check.

No. Conversion succeeds but the value is outside the declared domain. Check conversion and then the non-negative range rule; report unsuitable input without silently accepting it.

## Designing and testing solutions

A client says a program must be reliable. Write a measurable requirement and explain how a test would challenge it.

For example: reject an empty quantity without crashing and display a stated message. Supply an empty quantity, predict the message, run the test and compare. A vague adjective alone cannot be checked.

## Network foundations

Why is HTTP alone insufficient to deliver a web page across networks?

HTTP specifies application messages; transport, IP and local-link mechanisms perform other communication jobs. Identify the responsibilities rather than naming HTTP for every layer.

## Addresses, devices and media

Are 192.168.20.10/24 and 192.168.21.10/24 in the same ordinary IPv4 subnet?

No: their network addresses are 192.168.20.0 and 192.168.21.0. Communication between those networks needs routing.

## Designing and protecting a network

A school has slow internet downloads. Why might replacing its switch fail to help?

The bottleneck could be the internet link, wireless airtime, storage or remote server. Use evidence to identify the limiting part before selecting an upgrade.

## Network scenarios and review

A fictional client is 192.168.40.12/24 with gateway 192.168.41.1. What mismatch should be investigated?

The configured gateway is outside the client subnet. Check the intended plan and the correct reachable local gateway; a supplied mismatch is evidence to investigate, not permission to change a real network.

## Software, ownership and licensing

Does crediting the author give permission to reuse code under any conditions?

No. Acknowledgement and licence permission are distinct. Check the licence terms, comply with permitted reuse and record assistance honestly.

## Unit 1 consolidation

How can you test whether feedback repaired a misconception rather than just helping you copy an answer?

Try a changed case without the model, explain the steps and compare with independently prepared expectations. Retain the original error and later attempt.

## Unit 1 exam preparation

An exam-style prompt says identify a layer and explain its role. Why is a correct layer name insufficient?

The command has two parts. Supply the layer and a causal explanation of what that layer does in the given scenario.

## Relational database foundations

A returned loan has a due date before the stated reference date. Is it necessarily overdue under a rule requiring an earlier date AND an outstanding loan?

No. Both conditions must hold; a returned loan fails the outstanding condition. State the reference date and declared rule.

## Modelling entities and relationships

Two equipment records are both described as Camera. Why is the description unsuitable as their primary key?

A primary key must identify one record uniquely. A repeated description identifies a kind of item; use a unique equipment identifier.

## Normalisation

A composite key is (MemberID, EventID), but MemberName depends only on MemberID. What dependency causes a 2NF problem?

A partial dependency: the non-key MemberName depends on only part of the composite key. Put member facts in a Member table and retain the relationship through MemberID.

## Getting started with SQL

Does SELECT EquipmentID FROM Equipment delete the other stored columns? What controls result order?

No. SELECT chooses result columns; the stored table is unchanged. ORDER BY specifies result order, including a tie-breaker where necessary.

## Building a database solution

Two loan events refer to the same equipment identifier. Why may an INNER JOIN report contain that item twice?

The report has one row per loan event, not per unique item. Repetition can be correct one-to-many behaviour; inspect the join key and intended grain.

## Threats and protective measures

Is a password plus a PIN necessarily two-factor authentication?

No. Both are knowledge factors. Two-factor authentication uses two distinct factor categories, such as knowledge and possession.

## Responsible data use

Does replacing real names with codes guarantee that a dataset is anonymous?

No. A mapping or other context may identify people. Minimise data and consider linkage and access; invented classroom data is different from relabelled real data.

## Unit 2 integrated review

A club stores member names on every loan row. Name an update anomaly and explain a relational repair.

Updating only some repeated names leaves conflicting values. Store the member name once in Member, keyed by MemberID, and reference that key from each Loan.

## Unit 2 consolidation

How do validation and checking against a source differ, and can either guarantee that the original fact is true?

Validation tests declared rules. Comparing with a source checks faithful copying. A plausible value or an accurately copied false source can still be wrong.

## Unit 2 exam preparation

An SQL practical includes UPDATE. What should you retain to show that the intended row changed and other rows did not?

Record the requirement, target SELECT, expected change, actual verification query and a non-target check. An execution-success message alone is insufficient.

## Rebuilding Python fluency

A function counts values greater than or equal to minimum. What count should [5, 5] produce for minimum 5?

2. Each observation is counted separately and equality is included.

## Advanced data structures

For grid = [[2, 0, 1], [0, 4, 0]], what are grid[0][2] and the two row totals?

The element is 1 and row totals are [3, 4]. Select the row before the column and reset each row accumulator.

## Searching: linear and binary

Why must the searched range be sorted before applying an ordinary binary search?

The comparison must tell you which half can be discarded. Without the ordering precondition, that half can still contain the target.

## Sorting algorithms

Using ascending adjacent-swap bubble sort, what is [5, 2, 4, 1] after its first full left-to-right pass?

[2, 4, 1, 5]. Successive comparisons move the largest value to the final position; that does not mean the entire list is sorted.

## Objects and classes in Python

In camera = Equipment("E01", "Camera", 2), distinguish class, instance and arguments.

Equipment is the class; the created object referred to by camera is an instance; E01, Camera and 2 are initialisation arguments.

## Extending object-oriented design

A Camera overrides preparation(). Which method runs when preparation() is called on a Camera in a list of Equipment objects?

The Camera override runs for that instance. Placing it in a collection does not convert it into a base-class instance.

## Developing a software solution

Why should a software requirement be linked to an acceptance test before implementation?

It makes success observable and connects client needs to evidence. A test can expose a requirement or design problem early, rather than merely confirming that code runs.

## Reliable software: testing and review

Why can a passing component test still leave a user acceptance problem?

A component test checks a local contract. A user workflow can still have unclear input, confusing feedback or unmet needs across components.

## Network models and protocols

Broadly, which OSI layers correspond to the bottom layer of the four-layer TCP/IP model?

Physical and data link (layers 1 and 2). Course terminology for this TCP/IP grouping can be network; link/network-access are common alternatives. Distinguish it from OSI network layer 3.

## Addressing and subnetting

For ordinary LAN subnet 192.168.50.64/27, give broadcast, usable range and usable count.

Broadcast .95; usable .65 through .94; 30 usable addresses. /27 leaves five host bits and 32 total addresses, with network/broadcast reserved in this ordinary LAN case.

## Designing secure networks

Do two VLANs alone prove that no traffic can pass between their users?

No. VLANs separate layer-2 broadcast domains; routing and access policy govern traffic between them. Test allowed and prohibited paths against the requirements.

## Unit 3 integrated review

Why does alias = grid differ from copying each row when grid is a nested list?

Assignment gives another reference to the same object. Copying each row creates separate row lists; explain which nested objects remain shared for the chosen copy method.

## Unit 3 consolidation

Why can a shallow dictionary copy still share a list value with the original?

It copies references to the values, not every nested object. Appending to a shared list is visible through both mappings.

## Unit 3 exam preparation

A function contract requires preserving input order and not mutating records. Why may sorting be an incorrect repair?

Sorting changes required order and may mutate input. A faster or tidier implementation still fails if it violates the contract.

## Refining relational database designs

Why can (MemberID, SessionID) be a useful Booking primary key when each component repeats?

The pair identifies the permitted one-booking-per-member/session relationship. Each component alone does not identify one booking; both are needed for the declared rule.

## Advanced SQL queries

Why can SUM(Session.Capacity) over a booking join inflate total places?

A session capacity is repeated once per matched booking. Aggregate at session grain; SUM(DISTINCT Capacity) can wrongly merge separate sessions with equal capacities.

## Database development and evaluation

What evidence would show that a database constraint is enforced rather than merely written in a design document?

Run a deliberate invalid case on a disposable copy, record the actual failure and verify stored rows. Compare it with a valid case; a diagram alone does not enforce a rule.

## Cyber security analysis

Does a successful account login prove which person performed the action?

No. Credentials or session context can be compromised. Treat the log as evidence of an event and investigate attribution using other relevant observations.

## Security controls and responses

In a first-match rule model, why can an early Visitor-to-any allow defeat a later internal-network deny?

The broad allow matches first, so the later deny is never applied to that request. Check rule order and both allowed and denied test cases.

## Secure communication and cryptography

Which key verifies a digital signature, and what else is needed to associate that key with an identity?

The corresponding public key verifies the signature. Identity depends on a trustworthy binding between the key and the claimed signer, not merely a mathematically valid signature.

## Ethical and legal considerations

Why should a privacy analysis identify the entity, jurisdiction and date before applying a framework?

Different entities and contexts can be subject to different obligations, and commencement dates matter. Use the supplied facts and current authoritative sources before reaching a conclusion.

## Unit 4 integrated review

Why is a grouped report wrong if it selects an ungrouped description with no justified dependency on the grouping key?

The description may not identify a unique value for each group. Group at the required grain and include suitable grouping keys rather than relying on permissive DBMS behaviour.

## Full-course consolidation

Why does grid = [[0]*2]*2 share changes between its rows?

Both outer entries reference the same inner list. Construct independent row lists when changes must be separate.

## Full-course exam preparation

What makes a justified security recommendation stronger than a list of control names?

Connect the chosen mechanism to the case requirements, evidence and limitations. Explain why it addresses the stated risk and acknowledge what it does not establish.

## Exam-style y11-1 - Trace a selection

Write the exact output, in order, for this Python program.

9
False
The condition is true, so 2 is added to 7. Nine is not greater than ten.

Criteria (one mark each):

- First output is 9.

- Second output is False (Python Boolean spelling).

Common mistake: Do not execute both branches or print the condition instead of the final comparison.

## Exam-style y11-2 - Represent a value

Convert decimal 45 to an eight-bit binary value. Show a place-value calculation to support your answer.

00101101
32 + 8 + 4 + 1 = 45. The 128, 64, 16 and 2 positions are zero.

Criteria (one mark each):

- Binary result is 00101101.

- Working correctly combines place values 32 + 8 + 4 + 1 = 45.

Common mistake: Write all eight bits. Correct equivalent place-value working is acceptable.

## Exam-style y11-3 - Validation and verification

A club enters member ages from paper forms. Explain the difference between validating an age and verifying the entered age.

Validation checks an age against rules, such as a permitted numeric range. Verification compares the entered age with the paper form to check it was copied accurately. An incorrect age on the form can still be copied correctly.

Criteria (one mark each):

- Validation checks whether an age meets stated rules, such as an integer within an allowed range.

- Verification checks that the entered age matches the source form; it does not establish that the original age is true.

Common mistake: A valid value is not necessarily the true age. Award equivalent explanations without requiring the model wording.

## Exam-style y11-4 - Choose a primary key

A Member table has MemberID, GivenName and FamilyName. MemberID is unique and never empty. Explain why MemberID is a better primary key than FamilyName.

Each MemberID identifies exactly one member. Two members can share a family name, making FamilyName unsuitable as a unique identifier.

Criteria (one mark each):

- MemberID uniquely identifies each member record.

- Family names may repeat, so FamilyName cannot reliably identify one record.

Common mistake: Do not assume names are unique. A primary key also cannot be null.

## Exam-style y11-5 - Filter a table

Loan(LoanID, MemberID, Returned) stores Returned as 0 for an active loan and 1 for a returned loan. Write SQL to display only LoanID for active loans.

SELECT LoanID
FROM Loan
WHERE Returned = 0;
SQL keyword case and a missing final semicolon do not affect these marks. Equivalent SQL that returns the requested result is acceptable.

Criteria (one mark each):

- SELECT LoanID FROM Loan identifies the required field and table.

- WHERE Returned = 0 correctly filters active loans.

Common mistake: Returned = 1 selects completed loans. Selecting every field does not meet the requested output.

## Exam-style y11-6 - Respond to phishing

An unexpected email demands your school password through an unfamiliar link. Identify one warning sign from the scenario and one suitable response.

The unfamiliar link requesting a password is suspicious. Do not follow it or send credentials; report the message using the school process. Independently contact support through a known address if needed.

Criteria (one mark each):

- Identifies the unexpected password request, unfamiliar link or pressure to act as a warning sign.

- Does not use the link or disclose the password; reports it through the school process or verifies through a known independent channel.

Common mistake: Replying to the suspicious sender is not independent verification. A warning sign is evidence for caution, not proof on its own.

## Exam-style y11-7 - Trace a list

Write the final values of total and len(values) after this code runs.

total = 8
len(values) = 3
The loop visits three items and adds each value once.

Criteria (one mark each):

- Final total is 8.

- len(values) is 3.

Common mistake: The length counts items, not their sum. The loop does not alter the list.

## Exam-style y11-8 - Test a boundary

A program accepts an integer only when 1 <= quantity <= 5. Give one valid boundary input and one invalid input immediately outside a boundary, with the expected acceptance result for each.

1 → accepted.
0 → rejected.
Alternatively, 5 → accepted and 6 → rejected. Either appropriate boundary can be used for each part.

Criteria (one mark each):

- Gives 1 or 5 and correctly expects acceptance.

- Gives 0 or 6 and correctly expects rejection.

Common mistake: A typical valid value such as 3 does not test a boundary. Include the expected result.

## Exam-style y11-9 - Design a score summary

A Pygame game stores each round score in a one-dimensional list. Scores are whole numbers from 0 to 50. Design an algorithm, using pseudocode or Python, to display the number of rounds, total score and highest score. Handle an empty list explicitly. Explain two useful tests, including inputs and expected results. You do not need to write Pygame drawing code.

IF length(scores) = 0 THEN
    DISPLAY "No rounds", 0, 0, "No highest score"
ELSE
    total ← 0
    highest ← scores[0]
    FOR EACH score IN scores
        total ← total + score
        IF score > highest THEN
            highest ← score
        ENDIF
    NEXT score
    DISPLAY length(scores), total, highest
ENDIF

Test [10, 0, 30]: 3 rounds, total 40, highest 30. Test []: zero rounds and total, no highest score. Correct equivalent algorithms are acceptable, including suitable built-ins because this question does not prohibit them.

Criteria (one mark each):

- Checks for an empty list before trying to read its first item.

- For an empty list, reports zero rounds/total and no highest score (or a clear no-rounds message).

- For a non-empty list, correctly obtains the number of rounds.

- Correctly accumulates the total across all items.

- Correctly finds the maximum, with valid initialisation (for example, the first item).

- Gives a non-empty test with correct expected count, total and maximum.

- Gives an empty-list test with the expected no-rounds behaviour.

Common mistake: Do not index scores[0] before checking for an empty list. A test needs expected results, not just an input.

## Exam-style y11-10 - Protect a club loan register

A school club records members and equipment loans. Each member may have many loans; each loan belongs to one member. Design two related tables, identifying a primary key for each and the foreign key. Explain how the design avoids repeating member details in every loan. Then propose a staff access control and a recovery measure, explaining how each helps.

Member(MemberID PK, GivenName, FamilyName)
Loan(LoanID PK, MemberID FK, ItemDescription, DueDate, Returned)
Loan.MemberID references Member.MemberID. One member can have many loans, while each loan references one member. Names are stored once in Member, so updating a name does not require editing every loan. Limit editing to authorised club staff using individual accounts and suitable permissions. Make regular separate backups and test restoration so records can be recovered after loss or corruption. Equivalent field choices and suitable explained controls are acceptable.

Criteria (one mark each):

- Defines a Member table with MemberID as its primary key and suitable member fields.

- Defines a Loan table with LoanID as its primary key and suitable loan fields.

- Places MemberID as a foreign key in Loan referencing Member.MemberID.

- Correctly describes the one-member-to-many-loans relationship.

- Explains that storing member details once reduces duplication or inconsistent updates.

- Proposes restricted staff accounts/permissions and explains limiting unauthorised access or changes.

- Proposes regular backups with restore testing and explains recovery after loss/corruption.

Common mistake: Do not place a single LoanID in Member to represent all loans. Backups support recovery; they do not prevent unauthorised access.

## Exam-style y12-1 - Trace a two-dimensional list

State the final value of grid and the output of print.

grid = [[1, 2], [7, 4]]
Output: 7
The right side reads 2, adds 5, and writes to row 1, column 0 using zero-based indices.

Criteria (one mark each):

- Final grid is [[1, 2], [7, 4]].

- Printed output is 7.

Common mistake: Row and column indices are zero-based. Only one item changes.

## Exam-style y12-2 - Select a dictionary

A game needs to retrieve item descriptions using unique item IDs. Explain why a dictionary is suitable, and what must be true about its keys.

A dictionary maps each item ID to its description, allowing retrieval by that ID rather than finding its position in a list. Each key must be unique; assigning an existing key replaces its associated value in Python.

Criteria (one mark each):

- Explains mapping an item ID directly to its description/value for retrieval by that ID.

- States that keys must be unique; duplicate IDs cannot represent two distinct entries under the same key.

Common mistake: A dictionary key is not a numeric position. Do not claim dictionaries automatically reject duplicate assignments.

## Exam-style y12-3 - Prepare for binary search

A list of unique scores will be searched with binary search. State its required ordering condition and explain why that condition matters.

The scores must be sorted in the order assumed by the search, such as ascending order. A comparison with the middle score then identifies which half can contain the target, allowing the other half to be discarded.

Criteria (one mark each):

- States that the list must be sorted according to the comparison order used by the algorithm.

- Explains that comparing with the middle item then permits eliminating the half that cannot contain the target.

Common mistake: A list being indexed is insufficient. Without ordering, discarding half can discard the target.

## Exam-style y12-4 - Trace a bubble-sort pass

Starting with [5, 2, 4, 1], perform one left-to-right bubble-sort pass for ascending order. Compare adjacent pairs at indices (0,1), (1,2), then (2,3), swapping each out-of-order pair. State the resulting list and the value now at the final position.

[5,2,4,1] → [2,5,4,1] → [2,4,5,1] → [2,4,1,5].
The largest value, 5, reaches the final position after this pass.

Criteria (one mark each):

- Resulting list is [2, 4, 1, 5].

- Identifies 5 as the value at the final position.

Common mistake: One pass does not fully sort this list. Follow the specified left-to-right convention.

## Exam-style y12-5 - Explain method overriding

Player and Hazard inherit from Actor. Both subclasses define update(). Explain inheritance and overriding in this example.

Actor can define shared position and movement behaviour that Player and Hazard inherit. Each subclass overrides update() to specialise its behaviour, such as player input or a hazard patrol.

Criteria (one mark each):

- Explains that Player and Hazard inherit shared Actor behaviour/attributes, avoiding repeated common code.

- Explains that a subclass supplies its own update implementation to specialise behaviour inherited from Actor.

Common mistake: Overriding changes a subclass implementation; it does not mean copying every base-class method.

## Exam-style y12-6 - Join related records

Member(MemberID, Name) and Loan(LoanID, MemberID) are related by MemberID. Write SQL to display Name and LoanID for matching members and loans.

SELECT Member.Name, Loan.LoanID
FROM Member
INNER JOIN Loan ON Member.MemberID = Loan.MemberID;
Equivalent correct joins and aliases are acceptable. Keyword case and a missing final semicolon do not affect these marks.

Criteria (one mark each):

- Selects Member.Name and Loan.LoanID from the two tables, allowing suitable aliases.

- Correctly joins on Member.MemberID = Loan.MemberID.

Common mistake: Joining Name to LoanID or omitting the relationship condition does not match the related records.

## Exam-style y12-7 - Referential integrity

Loan.MemberID is a mandatory foreign key referencing Member.MemberID, and foreign-key enforcement is enabled. Explain what happens when a loan references a MemberID that does not exist, and why.

The operation is rejected because its MemberID does not reference an existing member. This prevents an orphan loan and maintains referential integrity.

Criteria (one mark each):

- States that the insert/update is rejected under the stated enforced constraint.

- Explains that the constraint prevents an orphan loan and preserves references to existing members.

Common mistake: Do not assume a foreign-key label enforces itself in every environment; this question explicitly states enforcement is enabled.

## Exam-style y12-8 - Choose a security control

A stolen password allows an attacker to attempt a staff account login. Propose one additional login control and explain one limitation of it.

Use phishing-resistant multi-factor authentication such as an appropriately configured security key. A stolen password alone would then be insufficient, but account recovery or an already-stolen authenticated session can still be attacked. If proposing one-time codes or push MFA, explain a limitation relevant to that method.

Criteria (one mark each):

- Proposes an additional authentication factor, preferably phishing-resistant MFA, that is independent of the stolen password.

- Explains a relevant limitation such as recovery-channel compromise, stolen sessions, or phishing/push approval attacks for susceptible MFA methods.

Common mistake: Changing password length alone does not add a factor. No control removes every attack path.

## Exam-style y12-9 - Model an interactive game

A Pygame game uses an 8 × 10 tile map, item descriptions indexed by item ID, a keyboard-controlled player and patrolling hazards. Explain suitable data structures and a class design using Actor, Player and Hazard. Describe how one frame separates state updates from drawing. Propose two tests with expected results. You do not need to implement the complete game.

Store tiles in a 2D list accessed as tiles[row][column], and descriptions in a dictionary such as items["key1"]. Actor holds common position and movement behaviour; Player and Hazard inherit it. Player.update reads input and Hazard.update advances a predictable patrol. Each frame processes events and updates game state before drawing that state. Drawing the HUD must not increment the score. For example, moving right into a wall must leave the player position unchanged; looking up "key1" must return its stated description. Equivalent designs and concrete tests meeting these requirements are acceptable.

Criteria (one mark each):

- Uses a two-dimensional list/array for tile values accessed by row and column.

- Uses a dictionary mapping unique item IDs to descriptions or metadata.

- Places shared position/movement behaviour in Actor and uses inheritance for Player and Hazard.

- Explains overridden update behaviour for input-driven Player and patrol-driven Hazard.

- Describes updating state before drawing that state, with drawing not changing gameplay values.

- Gives a movement or wall-boundary test with a specific expected outcome.

- Gives an item lookup or patrol test with a specific expected outcome.

Common mistake: Naming classes is insufficient: explain responsibilities and inherited/overridden behaviour. A test requires an expected outcome.

## Exam-style y12-10 - Design a reliable booking change

A booking service stores Workshop(WorkshopID, Title, Capacity) and Booking(BookingID, WorkshopID, StudentID). A booking must refer to an existing workshop; a student must not book the same workshop twice. Staff can change capacity. Explain suitable database constraints, how the application should safely use user-supplied values in SQL, one suitable staff access control, and a recovery measure. Include an example check for the duplicate-booking rule.

Use WorkshopID and BookingID as primary keys. Enforce the WorkshopID foreign key, and a UNIQUE(WorkshopID, StudentID) constraint. Use parameterised SQL, such as placeholders bound to user-supplied values, so those values are treated as data rather than SQL instructions. Test a second booking of the same workshop for the same student: the duplicate must be rejected and the original retained. Restrict capacity updates to authorised staff roles. Keep separate regular backups and test restoration to support recovery. Equivalent constraints, tests and explained controls are acceptable; exact SQL syntax is not required.

Criteria (one mark each):

- Identifies suitable primary keys for Workshop and Booking.

- Enforces Booking.WorkshopID as a foreign key to an existing Workshop.

- Uses a unique constraint on the pair (WorkshopID, StudentID) to prevent duplicate student bookings.

- Uses parameterised SQL to pass user-supplied values separately from the SQL statement, rather than concatenating them.

- Tests a second booking for the same StudentID and WorkshopID and expects rejection, with the original booking preserved.

- Restricts capacity edits to authorised staff with suitable roles/permissions and explains protecting the data.

- Proposes separate regular backups with tested restoration and explains recovery after loss/corruption.

Common mistake: A foreign key alone does not stop the same student booking twice. Parameterised SQL helps prevent SQL injection; it does not replace access control or validation.

## Exam-style y11-p1 - Trace a while loop

State the printed total and the final value of n.

Printed output: 6. Final n: 4. The loop adds 1, 2 and 3, then stops when n becomes 4.

Criteria (one mark each):

- Printed total is 6.

- Final n is 4.

Common mistake: The terminating condition is checked again after n changes. The final n is not the last value added.

## Exam-style y11-p2 - Convert input before calculating

A price calculator uses quantity = input("Quantity: ") and then total = quantity * 3. If the user enters 4, explain the problem and give a corrected quantity assignment. Assume valid whole-number input.

input returns a string. "4" * 3 produces "444". Use quantity = int(input("Quantity: ")) before multiplying to obtain 12.

Criteria (one mark each):

- Explains that input returns the string "4", so multiplying by 3 repeats it to produce "444" instead of numeric 12.

- Converts the input to an integer, for example quantity = int(input("Quantity: ")).

Common mistake: Changing the prompt does not convert the value. Validation of invalid input is outside this question.

## Exam-style y11-p3 - Evaluate a combined condition

Admission requires age >= 12 and has_permission. Evaluate the condition for age = 11 and has_permission = True, then explain why.

False. Permission is true, but the age requirement is false. An and expression requires both conditions to be true.

Criteria (one mark each):

- The combined condition evaluates to False.

- Explains that both parts must be true with and, but 11 >= 12 is false.

Common mistake: Permission does not override the age requirement. That would require a different admission rule.

## Exam-style y11-p4 - Use a function return value

State the printed result and identify the argument passed to double.

double(6) returns 12, so result becomes 13. The argument is 6; number is the parameter name.

Criteria (one mark each):

- Printed result is 13.

- The argument passed is 6.

Common mistake: An argument is the supplied value. A return value can be used in a larger expression.

## Exam-style y11-p5 - Check list indices

names = ["Ari", "Bo", "Cam"]. State the value of names[1] and explain what happens when names[3] is evaluated.

names[1] is "Bo". names[3] is outside the list and raises IndexError; the last item is names[2].

Criteria (one mark each):

- names[1] is "Bo".

- names[3] raises IndexError because valid indices are 0, 1 and 2.

Common mistake: List indices start at zero. Index 3 does not refer to the third item.

## Exam-style y11-p6 - Preserve a score history

A game must add a score to the end of an existing text file without removing earlier scores. State a suitable Python file mode and explain why write mode "w" is unsuitable.

Use mode "a" to append. Mode "w" empties an existing file when it is opened, losing earlier history.

Criteria (one mark each):

- Uses append mode "a".

- Explains that opening an existing file in mode "w" truncates its existing contents.

Common mistake: Appending still requires a newline separator when storing one score per line.

## Exam-style y11-p7 - Handle an invalid conversion

A user types "three" when int(input("Lives: ")) runs. Name the exception and describe a suitable response that keeps the program usable.

The conversion raises ValueError. Handle it with try/except, display a clear whole-number message and allow another attempt.

Criteria (one mark each):

- Names ValueError.

- Catches the conversion failure and explains the whole-number requirement before requesting another input, or returns safely to an input screen.

Common mistake: Do not silently substitute a valid value without telling the user. This is not a file-not-found error.

## Exam-style y11-p8 - Expose an incorrect comparison

The requirement says orders of $50 or more receive free delivery. The code incorrectly uses order_total > 50. Give the input that exposes this error and state both the required and incorrect outcomes.

Test $50. Expected: free delivery. Actual with > 50: charged delivery. The comparison should include equality.

Criteria (one mark each):

- Uses an order total of exactly $50.

- States that free delivery is required, but the incorrect comparison selects the charged-delivery branch.

Common mistake: $49 and $51 do not distinguish > from >= at this boundary.

## Exam-style y11-p9 - Summarise reading sessions

A list stores non-negative whole minutes for each reading session. Write pseudocode or Python to display the number of sessions, total minutes and number of sessions lasting at least 20 minutes. Handle an empty list. Give one non-empty test containing exactly 20 and one empty-list test, with all expected outputs.

total = 0
long_sessions = 0
for minutes in sessions:
    total = total + minutes
    if minutes >= 20:
        long_sessions = long_sessions + 1
print(len(sessions), total, long_sessions)

[10, 20, 25] → 3 sessions, total 55, 2 sessions of at least 20 minutes. [] → 0, 0, 0. The loop naturally handles an empty list. Equivalent algorithms are acceptable.

Criteria (one mark each):

- Correctly obtains the number of sessions.

- Initialises total and the qualifying-session count to zero.

- Visits every session and adds its minutes to the total.

- Increments the qualifying count only for values >= 20.

- Handles the empty list without indexing errors and displays zero for all three results.

- Gives a correct non-empty test containing 20, with all three expected outputs.

- Gives [] with expected count 0, total 0 and qualifying count 0.

Common mistake: Exactly 20 qualifies. Count qualifying sessions separately from their combined duration.

## Exam-style y11-p10 - Plan a manageable game feature

A Pygame collection game adds 10 points when an active item is collected. Each item can score only once; a new game starts at zero. Describe two functional requirements and one measurable usability requirement. Design a function interface for collecting an item, including inputs, returned values and the repeated-collection rule. Give a repeated-collection test with expected results. No drawing code is required.

Functional: an active collected item awards 10 points; a new game begins at zero. Usability: in an 800 × 600 window, a peer can read the score throughout a two-minute trial. A collect(score, active) function returns score and active. If active, add 10 and set active to False; otherwise leave both unchanged. Test collect(0, True) → (10, False), then collect(10, False) → (10, False). Other measurable usability targets and equivalent function designs are acceptable.

Criteria (one mark each):

- States that collecting an active item increases score by exactly 10.

- States that starting a new game resets the score to zero.

- States a measurable usability requirement, such as score text remaining readable at a specified window size during a peer trial.

- Identifies score and item-active status as function inputs or equivalent explicit state.

- Returns the updated score and item-active status, or an equivalent clearly defined result.

- Awards points only if active and then marks the item inactive, so later calls do not award them again.

- Tests repeated collection: for example score 0 with an active item becomes 10/inactive, then remains 10/inactive.

Common mistake: A requirement should be checkable. A function that increases the score every frame while overlapping an item violates the one-award rule.

## Exam-style y11-d1 - Turn data into information

A sensor stores temperatures 18, 21 and 24 degrees Celsius at three stated times. Distinguish these readings as data from one useful piece of information produced from them.

The individual readings are data. Calculating their mean produces the information that the mean recorded temperature was 21 degrees Celsius during those three observations.

Criteria (one mark each):

- Identifies the individual recorded readings as data.

- Derives a useful contextual statement, such as the mean recorded temperature being 21 degrees Celsius or the readings increasing over the three times.

Common mistake: Information needs meaning in context. Do not claim the readings establish temperatures outside the observed times.

## Exam-style y11-d2 - Distinguish network scope

Computers in one school building share a local network. The school connects to a campus in another city through a provider network. Identify the local network type and the wider network type.

The building uses a local area network (LAN). Communication across distant sites uses a wide area network (WAN).

Criteria (one mark each):

- Identifies the building network as a LAN.

- Identifies the network spanning the distant sites as a WAN.

Common mistake: Wireless describes a connection medium, not the distinction between local and wide geographic scope.

## Exam-style y11-d3 - Choose a switch and a router

Explain the different roles of a switch connecting classroom computers and a router connecting the school LAN to another IP network.

The switch connects local devices and forwards frames using MAC-address information. The router forwards packets between the school network and other IP networks.

Criteria (one mark each):

- Explains that a switch forwards frames between devices on the local network, typically using destination MAC addresses.

- Explains that a router forwards IP packets between networks using network addressing/routing information.

Common mistake: A switch and a router do not perform identical forwarding roles.

## Exam-style y11-d4 - Distinguish addressing roles

Explain the role of an IP address and a MAC address when communicating across networks.

IP addresses support routing to the destination across networks. MAC addresses support frame delivery on the local link. As a packet crosses routed links, link-layer addressing changes.

Criteria (one mark each):

- Explains that an IP address supports logical addressing and routing between IP networks.

- Explains that a MAC address identifies a network interface for local-link frame delivery.

Common mistake: Do not describe a MAC address as the Internet-wide routing address or assume it can never be changed.

## Exam-style y11-d5 - Explain packet sequence information

A reliable transport protocol divides a message into numbered pieces. Explain why sequence information is useful if pieces arrive out of order, and what should happen if a piece is missing.

Sequence information lets the receiver order the data correctly. Missing data must be detected and retransmitted by the reliable protocol.

Criteria (one mark each):

- Explains that sequence information supports placing pieces back into the correct order.

- Explains that the reliable protocol detects missing data and arranges retransmission, rather than treating the incomplete message as complete.

Common mistake: Not every protocol guarantees reliable delivery. This question explicitly describes a reliable transport protocol.

## Exam-style y11-d6 - Avoid repeated supplier details

A Stock table repeats SupplierName and SupplierPhone on every stock-item row. Each SupplierID identifies one supplier. Identify an update problem and explain a suitable design improvement.

Partial updates can leave different phone numbers for the same supplier. Store SupplierID, SupplierName and SupplierPhone once in Supplier, with SupplierID referenced from Stock.

Criteria (one mark each):

- Explains that changing a supplier phone in only some rows creates inconsistent supplier details.

- Moves supplier details to a separate Supplier table keyed by SupplierID and references it from Stock.

Common mistake: Removing repeated phone numbers without retaining the supplier relationship loses useful data.

## Exam-style y11-d7 - Order a filtered report

Book(BookID, Title, Available) stores Available as 1 or 0. Write SQL to list Title for available books, sorted alphabetically by Title.

SELECT Title
FROM Book
WHERE Available = 1
ORDER BY Title ASC;
Equivalent correct SQL is acceptable.

Criteria (one mark each):

- Selects Title from Book with WHERE Available = 1.

- Uses ORDER BY Title ASC (or omits ASC because ascending is the default).

Common mistake: ORDER BY sorts the result; it does not select which books qualify.

## Exam-style y11-d8 - Reduce malware risk

Students are asked to run an unexpected executable attachment on school computers. Propose one preventive action and one recovery measure if malware damages local files.

Do not execute the attachment; report it to school support. Following containment and clean-up, recover damaged data from a separate known-clean backup.

Criteria (one mark each):

- Does not run the untrusted attachment and reports it through the school process, or explains an appropriate application-control measure.

- Uses a known-clean separate backup to restore damaged files after the device has been appropriately contained/cleaned.

Common mistake: A backup does not stop malware executing. Restoring onto an actively infected device may damage the restored files again.

## Exam-style y11-d9 - Design an equipment catalogue

A club stores equipment items and their suppliers. One supplier supplies many items; each item has one supplier. Design Supplier and Item tables with suitable fields, keys and a relationship. Explain one benefit of separating supplier details. Write SQL to list item names costing less than $25 from Item(ItemID, ItemName, Cost, SupplierID). Include expected results for a $24 item and a $25 item.

Supplier(SupplierID PK, SupplierName, SupplierPhone). Item(ItemID PK, ItemName, Cost, SupplierID FK). Item.SupplierID references Supplier.SupplierID, giving one supplier many items. Changing a phone number needs one supplier update.
SELECT ItemName FROM Item WHERE Cost < 25;
A $24 item is included; a $25 item is excluded. Equivalent fields and correct SQL are acceptable.

Criteria (one mark each):

- Defines Supplier with SupplierID as primary key and suitable supplier details.

- Defines Item with ItemID as primary key and the stated item fields.

- Identifies Item.SupplierID as a foreign key referencing Supplier.SupplierID.

- Explains that storing supplier details once reduces duplication or inconsistent updates.

- Uses SELECT ItemName FROM Item with WHERE Cost < 25.

- Correctly expects the $24 item to be included.

- Correctly expects the $25 item to be excluded.

Common mistake: Less than excludes exactly $25. The supplier key belongs in each item record to express this relationship.

## Exam-style y11-d10 - Plan a small classroom network

A classroom needs 12 fixed computers to share a printer and reach another school network. Describe a suitable wired layout, device roles, one reason for the chosen connection medium, one access control and two checks with expected outcomes. Address both local communication and communication beyond the LAN.

Connect the 12 computers and a network-capable printer to a suitably sized switch in a star. Connect the switch to the school router for other IP networks. Suitable Ethernet cabling suits fixed workstations and avoids relying on shared radio conditions. Apply individual accounts and appropriate printer permissions. Test that an authorised workstation prints a test page, and that it reaches a known permitted service on another network. Other justified media and concrete checks meeting these requirements are acceptable.

Criteria (one mark each):

- Describes a suitable star layout with fixed computers connected to a central switch.

- Explains how the switch supports communication among local computers and the printer.

- Uses a router to reach another IP network and explains its role.

- Gives a justified wired-medium choice, such as suitable Ethernet cabling for stable fixed workstations.

- Proposes individual accounts or suitable printer/network permissions and explains restricting unauthorised access.

- Gives a local test with an expected result, such as an authorised computer successfully printing a test page.

- Gives an external-network test with an expected result, such as reaching a known permitted school service through the router.

Common mistake: A successful local print test alone does not prove routing works. Device counts must fit the available switch ports, including uplinks.

## Exam-style y12-p1 - Update a dictionary entry

State the final value of items["gem"] and the number of dictionary entries.

The existing "gem" value is replaced with 15. Adding the new "coin" key gives three entries.

Criteria (one mark each):

- items["gem"] is 15.

- The dictionary has 3 entries.

Common mistake: Assigning to an existing key updates it; it does not create a second entry with that key.

## Exam-style y12-p2 - Trace an alias

State the final value of grid and explain why alias affects it.

grid becomes [[0, 9], [2, 3]]. alias = grid binds another name to the same object, so the indexed change is visible through both names.

Criteria (one mark each):

- Final grid is [[0, 9], [2, 3]].

- Explains that alias and grid reference the same list object; assignment did not copy it.

Common mistake: A second variable name is not automatically an independent copy.

## Exam-style y12-p3 - Trace a linear search

A linear search visits [9, 4, 7, 2] from left to right and stops at the first match for 7. State the returned zero-based index and number of item-to-target comparisons.

Index 2, after comparisons with 9, 4 and 7. The search stops on the match.

Criteria (one mark each):

- Returns index 2.

- Makes 3 item-to-target comparisons.

Common mistake: The returned index and number of comparisons differ because indices start at zero.

## Exam-style y12-p4 - Insert into a sorted prefix

During ascending insertion sort, [3, 6] is the sorted prefix of [3, 6, 2, 5]. Insert the next value, 2. State the resulting full list and identify which existing values shift right.

[2, 3, 6, 5]. Shift 6 and then 3 right, leaving the insertion position for 2. The final 5 is not processed in this step.

Criteria (one mark each):

- The list becomes [2, 3, 6, 5].

- Both 6 and 3 shift one position right before 2 is inserted.

Common mistake: This is one insertion step, not a request to finish sorting the whole list.

## Exam-style y12-p5 - Trace a binary-search step

An ascending list is [2, 5, 8, 11, 14, 17, 20]. Binary search for 17 starts with low = 0 and high = 6 and uses mid = (low + high) // 2. State the first midpoint value and the updated low/high bounds after comparing it with 17.

mid = 3, so compare 11 with 17. Since the target is larger, set low = 4; high remains 6.

Criteria (one mark each):

- The first midpoint value is 11 (at index 3); the required answer is the value.

- Updates low to 4 and leaves high at 6.

Common mistake: The midpoint index is not the midpoint value. Exclude the already-compared midpoint from the next interval.

## Exam-style y12-p6 - Keep object state separate

Two Player objects each initialise self.score = 0 in their constructor. Explain what self.score represents and what happens to the second player’s score when only the first player’s score increases to 10.

self.score is an instance attribute. Updating the first instance to 10 leaves the second instance at 0.

Criteria (one mark each):

- Identifies self.score as an instance attribute belonging to an individual Player object.

- The second player remains at 0 because the two instances maintain separate score attributes.

Common mistake: Do not confuse instance attributes with a shared class attribute.

## Exam-style y12-p7 - Justify an inheritance relationship

A design proposes Player inherits from Actor, while ScoreFile inherits from Player. Identify the suitable relationship and explain why the other is unsuitable.

A Player is an Actor, so shared actor movement can be inherited. A ScoreFile is not a Player; it has a different responsibility and should be separate.

Criteria (one mark each):

- Player inheriting from Actor is suitable when a player is a kind of actor with shared actor state/behaviour.

- ScoreFile is not a kind of Player; file handling should have a separate responsibility or be used by another object rather than inheriting player behaviour.

Common mistake: Wanting to reuse a method is not by itself a sound is-a relationship.

## Exam-style y12-p8 - Handle a missing optional history file

On the first run, a game has no optional score-history file. Name the exception raised by attempting to open the missing file for reading and describe a suitable recovery response.

Catch FileNotFoundError. Treat history as empty on the first run and allow normal play, explaining the absence if appropriate.

Criteria (one mark each):

- Names FileNotFoundError.

- Starts with an empty history and an appropriate message/default while allowing the game to continue.

Common mistake: Do not crash or fabricate past scores. Other file errors may need a different message or response.

## Exam-style y12-p9 - Process a grid of readings

A non-empty rectangular grid contains non-negative whole sensor readings, with at least one item in each row. Write pseudocode or Python to find the total and count readings greater than 10. Use nested iteration. Give one test grid containing exactly 10 with expected results, and explain how a grid containing only zeroes is handled.

total = 0
above = 0
for row in grid:
    for reading in row:
        total = total + reading
        if reading > 10:
            above = above + 1
print(total, above)

[[10, 11], [0, 15]] → total 36, count 2. [[0, 0], [0, 0]] → total 0, count 0. Equivalent nested algorithms are acceptable.

Criteria (one mark each):

- Initialises total and the greater-than-10 count to zero.

- Uses an outer loop to visit every row.

- Uses an inner loop to visit each item in the current row.

- Adds every visited reading to the total exactly once.

- Increments the count only for values > 10, excluding exactly 10.

- Gives a grid containing 10 with the correct total and qualifying count.

- Explains that an all-zero grid returns total 0 and qualifying count 0 without errors.

Common mistake: Do not add a row list to a numeric total or use >= when the requirement says greater than.

## Exam-style y12-p10 - Separate game responsibilities

A game has a player, patrolling hazards and collectible items indexed by unique IDs. Explain shared Actor state, inheritance and specialised update behaviour. Specify a suitable item lookup structure. Describe how drawing stays separate from gameplay changes, then give one test for independent object state and one test for an overridden update method, with expected outcomes.

Actor holds position and common movement/bounds logic. Player and Hazard inherit it, overriding update for keyboard input and a timed patrol respectively. A dictionary maps item IDs to item data. draw reads the current state and renders it, without moving actors or adding score. Test two players initially at x=10: moving one to x=20 leaves the other at x=10. For a Hazard at x=0 moving one tile right per update, one permitted update produces x=1 tile. Equivalent explicit designs and tests are acceptable.

Criteria (one mark each):

- Places shared position and suitable movement/bounds behaviour in Actor.

- Makes Player and Hazard subclasses that inherit the shared actor features.

- Explains specialised update implementations for keyboard-driven Player and predictable-patrol Hazard.

- Uses a dictionary mapping unique item IDs to item data for lookup.

- Drawing reads state without changing score, position or other gameplay state.

- Tests two instances and expects changing one position/score not to change the other instance.

- Tests a subclass update with a stated input/initial state and a concrete expected movement or patrol result.

Common mistake: Drawing that changes gameplay can make behaviour depend on how often the screen is redrawn. Test responsibilities, not only class names.

## Exam-style y12-d1 - Identify a functional dependency

Each ProductID determines exactly one ProductName and Price. State one functional dependency and explain what it means.

ProductID → ProductName. For a given ProductID, there is one associated ProductName under the stated business rule.

Criteria (one mark each):

- States ProductID → ProductName or ProductID → Price (or the combined dependency).

- Explains that a particular ProductID determines one associated value for the dependent attribute under the stated rule.

Common mistake: A sample table alone cannot establish every business dependency; use the rule supplied in the question.

## Exam-style y12-d2 - Use a composite key

Enrolment(StudentID, CourseID, EnrolmentDate) stores at most one enrolment for a student in a course. A student can take many courses and each course has many students. Identify a suitable composite primary key and explain why either individual ID is insufficient.

Use (StudentID, CourseID). Neither field alone is unique, but the pair is unique under the stated one-enrolment rule.

Criteria (one mark each):

- Uses the pair (StudentID, CourseID) as the composite primary key.

- Explains that StudentID repeats across courses and CourseID repeats across students, while the pair identifies one enrolment.

Common mistake: Do not claim StudentID or CourseID alone uniquely identifies an enrolment in this many-to-many relationship.

## Exam-style y12-d3 - Count bookings by workshop

Booking(BookingID, WorkshopID, StudentID) contains confirmed bookings only. Write SQL to display WorkshopID and the number of bookings for each WorkshopID present in Booking.

SELECT WorkshopID, COUNT(*) AS BookingCount
FROM Booking
GROUP BY WorkshopID;
Aliases and equivalent correct aggregate queries are acceptable.

Criteria (one mark each):

- Selects WorkshopID and COUNT(*) from Booking.

- Groups the result using GROUP BY WorkshopID.

Common mistake: This query reports workshops present in Booking. Including zero-booking workshops would require their separate workshop records and a suitable join.

## Exam-style y12-d4 - Target an update

Workshop(WorkshopID, Title, Capacity) has a unique WorkshopID. Write SQL to set Capacity to 24 only for WorkshopID 7.

UPDATE Workshop
SET Capacity = 24
WHERE WorkshopID = 7;

Criteria (one mark each):

- Uses UPDATE Workshop SET Capacity = 24.

- Uses WHERE WorkshopID = 7 to restrict the change.

Common mistake: Without WHERE, the update changes every workshop row.

## Exam-style y12-d5 - Use a transaction

An application must insert an Order row and its OrderLine rows together. Explain the role of a transaction and the response if one required insert fails.

Run the related inserts in one transaction. Commit after all required inserts succeed; roll back if any fails so the database does not retain only part of the order.

Criteria (one mark each):

- Explains that the related changes are treated as one unit and committed together only when all required operations succeed.

- Rolls back the transaction on failure so a partial order is not left committed.

Common mistake: A transaction does not automatically validate every business rule. The application still needs suitable error handling and constraints.

## Exam-style y12-d6 - Distinguish encryption and hashing

Distinguish encrypting a message for later recovery from hashing a message to produce a comparison digest.

Encryption transforms plaintext into ciphertext that can be decrypted with the appropriate key. Hashing produces a digest; comparing digests can help detect changes, but does not recover the message.

Criteria (one mark each):

- Explains that encryption can be reversed using the appropriate key to recover the message.

- Explains that hashing produces a digest for comparison and is not designed to recover the original message.

Common mistake: Hashing is not encryption without a key. A digest alone does not establish who created the message.

## Exam-style y12-d7 - Compare key arrangements

State the key arrangement used by symmetric encryption and by asymmetric encryption.

Symmetric encryption uses a shared secret key. Asymmetric encryption uses a public/private key pair; a message encrypted with a recipient’s public key is decrypted using the corresponding private key.

Criteria (one mark each):

- Symmetric encryption uses a shared secret key for encryption and decryption.

- Asymmetric encryption uses a related public/private key pair; in public-key encryption the public key encrypts and the corresponding private key decrypts.

Common mistake: Do not describe the public key as secret. Digital signatures use the pair for a different operation from encrypting a confidential message.

## Exam-style y12-d8 - Separate authentication and authorisation

A staff member signs in successfully but cannot change a student record. Explain authentication and authorisation in this example.

Authentication establishes the claimed account identity. Authorisation checks whether that account is allowed to edit the record; an authenticated account can still lack permission.

Criteria (one mark each):

- Authentication checks the staff member’s claimed identity during sign-in.

- Authorisation determines permitted actions, so successful sign-in does not itself grant record-editing rights.

Common mistake: Access permissions and identity checks solve different problems.

## Exam-style y12-d9 - Remove a transitive dependency

Asset(AssetID, AssetName, RoomID, RoomName) stores one room per asset. AssetID is the primary key, RoomID determines RoomName, and room names may repeat. Explain the transitive dependency and an update anomaly. Decompose the table into two suitable tables with keys and a relationship. Explain a rule preventing an asset from referencing a non-existent room. Assume all attributes hold atomic values.

AssetID → RoomID and RoomID → RoomName, so RoomName depends transitively on AssetID. Partial room-name edits can make the same RoomID appear with different names. Decompose into Room(RoomID PK, RoomName) and Asset(AssetID PK, AssetName, RoomID FK). Reference Room.RoomID from Asset.RoomID and enforce the foreign-key constraint. RoomName is stored once per room; a name change no longer requires edits to each asset. RoomName is not a suitable key because names may repeat.

Criteria (one mark each):

- Identifies AssetID → RoomID → RoomName as the transitive dependency.

- Explains an update anomaly: changing a room name in only some asset rows leaves inconsistent names for the same RoomID.

- Defines Room(RoomID, RoomName) with RoomID as primary key.

- Defines Asset(AssetID, AssetName, RoomID) with AssetID as primary key.

- Identifies Asset.RoomID as a foreign key referencing Room.RoomID.

- Explains that storing the room name once removes this transitive dependency from Asset and avoids repeated room-name updates.

- Requires an enforced foreign-key constraint so a non-null Asset.RoomID must refer to an existing Room row.

Common mistake: Keep the linking RoomID in Asset. Decomposition without the relationship loses which room contains each asset.

## Exam-style y12-d10 - Protect a school booking service

A school booking service faces stolen staff passwords, accidental record deletion and attempts by student accounts to edit capacity. Propose and justify controls for each risk, plus useful audit logging. Describe one permission test and one recovery test with expected outcomes. Explain one remaining limitation after the controls are applied.

Use suitable MFA for staff sign-in; enforce staff-only capacity-edit permissions at the application/database boundary. Keep separate regular backups for recovery and log who changed a booking or capacity, when, and whether the operation succeeded. Test that a student edit is rejected and capacity remains unchanged. Restore a known backup into a safe test environment and compare recovered records with expected records. Some changes since the last backup may still be lost; controls reduce risk rather than eliminate it. Equivalent justified controls, concrete tests and relevant limitations are acceptable.

Criteria (one mark each):

- Proposes multi-factor authentication and explains why a stolen password alone should be insufficient to sign in.

- Restricts capacity changes to authorised staff and explains least privilege for student accounts.

- Uses separate regular backups and explains recovery after accidental deletion.

- Logs relevant changes with actor, time and action/result to support investigation.

- Tests a student capacity-edit attempt and expects rejection with capacity unchanged.

- Tests restoration from a known backup in a safe test environment and expects the selected records to be recovered correctly.

- Explains a relevant residual limitation, such as deletion after the latest backup causing some data loss, compromised recovery channels, or logs needing review/protection.

Common mistake: Hiding a button is not an enforced permission check. A backup must be restorable, and logging alone does not prevent an unauthorised change.

## Quiz item q01

2

17 = 3 * 5 + 2, so the remainder is 2.

Other choice: 3 is the whole-number quotient, not the remainder.

Other choice: 3.4 is the ordinary division result.

## Quiz item q02

score >= 1 and score <= 5

Both bounds must hold and equality is included.

Other choice: This excludes both boundary values.

Other choice: OR accepts values outside the permitted interval.

## Quiz item q03

1, 2, 3

The start is included and stop excluded.

Other choice: The stop is excluded.

Other choice: The specified start is 1, not 0.

## Quiz item q04

None

A function that reaches its end without return implicitly returns None.

Other choice: Displayed output is different from a returned value.

Other choice: No rule supplies an empty string.

## Quiz item q05

2

Three elements have indices 0, 1 and 2.

Other choice: 3 equals the length and is out of range.

Other choice: 9 is a value, not its index.

## Quiz item q06

42

32 + 8 + 2 = 42.

Other choice: The bit weights are not read as decimal digits.

Other choice: That would double the represented value.

## Quiz item q07

Routing

Routing forwards packets between networks.

Other choice: Encoding represents data; it does not choose inter-network paths.

Other choice: A local switch does not by itself provide inter-network routing.

## Quiz item q08

Permission and attribution are separate checks

Attribution does not override the applicable permission terms.

Other choice: Acknowledgement is not a grant of permission.

Other choice: Renaming variables does not resolve permission restrictions.

## Quiz item q09

A unique, non-empty MemberID

A key must uniquely identify each record under the declared rules.

Other choice: Names can repeat.

Other choice: Many people share a postcode.

## Quiz item q10

A partial dependency

Partial dependencies are addressed when moving toward 2NF.

Other choice: A join combines rows; it is not this dependency.

Other choice: Ordering rows does not remove dependencies.

## Quiz item q11

Returns a result column without deleting stored columns

Projection changes the result shape, not the stored schema.

Other choice: SELECT does not delete stored columns.

Other choice: Renaming is a schema operation.

## Quiz item q12

The one-to-many result can be correct

The report grain is one loan event, not one item.

Other choice: The equipment key can remain unique in its own table.

Other choice: Removing a distinct loan would lose information.

## Quiz item q13

3, 15, 5

There are three rows, sum 15 and average 15 / 3 = 5.

Other choice: COUNT and SUM have been reversed.

Other choice: Divide by three rows, not two.

## Quiz item q14

Verify the target and a non-target record

Execution success does not establish that the intended rows changed.

Other choice: The wrong rows can change successfully.

Other choice: Dropping the table destroys the evidence and structure.

## Quiz item q15

One: knowledge

Both are things the user knows.

Other choice: Two secrets can be the same category.

Other choice: The prompt supplies no third category.

## Quiz item q16

A value can satisfy rules and still be factually wrong

A plausible but incorrect value may satisfy the domain rules.

Other choice: Rule compliance is not factual truth.

Other choice: Authenticity requires other evidence.

## Quiz item q17

3

Choose row 1, then column 0.

Other choice: This is row 0, column 1.

Other choice: This is row 1, column 1.

## Quiz item q18

The searched range is sorted

Ordering lets a comparison eliminate a half.

Other choice: Binary search can be defined for repeated values, with a stated match contract.

Other choice: An absent target must also be handled.

## Quiz item q19

[1, 2, 3]

Swap 3/1, then swap 3/2; the largest moves to the end.

Other choice: That is only the first comparison.

Other choice: That is descending order.

## Quiz item q20

An instance

An object created from a class is an instance of it.

Other choice: A database key is a different concept.

Other choice: A licence specifies permissions.

## Quiz item q21

Camera.preparation

Method lookup uses the instance type and its class hierarchy.

Other choice: An override specialises the inherited behaviour.

Other choice: Alphabetical order is irrelevant.

## Quiz item q22

Values may still reference the same nested list

A shallow copy does not recursively copy every value.

Other choice: A shallow copy is not inherently immutable.

Other choice: Dictionary keys need not be integers.

## Quiz item q23

30

Five host bits give 32 total addresses; reserve two for this ordinary LAN case.

Other choice: 32 includes the reserved addresses.

Other choice: The prefix length is not the host count.

## Quiz item q24

That tested component behaviour met that test expectation

The evidence is limited to the tested contract and conditions.

Other choice: A user workflow may still fail.

Other choice: Acceptance and integration evidence can still be needed.

## Quiz item q25

It must reference the actual booking pair

Both components identify the declared member/session booking relationship.

Other choice: Each component can repeat across different bookings.

Other choice: Referential integrity is different from result order.

## Quiz item q26

20

At session grain, add 10 + 10 = 20.

Other choice: 50 sums capacity once per booking.

Other choice: 10 wrongly merges equal capacities with DISTINCT.

## Quiz item q27

Produces a capacity total for each workshop group

Rows are grouped by workshop before each aggregate is evaluated.

Other choice: That describes an ungrouped total.

Other choice: A SELECT report does not update stored values.

## Quiz item q28

ID || ' / ' || Label

SQLite uses || for text concatenation; the literal supplies the separator.

Other choice: AND is Boolean logic.

Other choice: Multiplication is not text concatenation.

## Quiz item q29

Deletes its matching dependent Attendance when enforcement is enabled

The declared cascade follows that parent-child relationship.

Other choice: The action does not imply deleting the independent member parent.

Other choice: The cascade is not a whole-database delete.

## Quiz item q30

That the system recorded an accepted login event

Attribution needs further evidence; credentials or session context may be compromised.

Other choice: An accepted event does not identify a person with certainty.

Other choice: An account identifier is not conclusive personal attribution.

## Quiz item q31

The corresponding public key

Verification uses the corresponding public key; trusted identity binding remains necessary.

Other choice: A random key will not verify that signature.

Other choice: The private signing key should remain private.

## Quiz item q32

The entity, jurisdiction and relevant date

Applicability depends on the stated entity/context and current authoritative sources.

Other choice: Obligations are not automatically identical in every context.

Other choice: A file extension does not establish legal applicability.

## Supporting extension - LEFT JOIN and HAVING

The outer join preserves one row with NULL child fields. COUNT(child_key) instead counts non-NULL matches.

## Supporting extension - Explicit SQLite transaction control

No. Recovery depends on the DBMS/error and transaction boundary. Use an explicit, tested rollback strategy for the logical operation.

## Supporting extension - Drone, VR and network-pod contexts

Apply the same declared rules to supplied request cards and predict outcomes. Label this as a model, not evidence of an executed network configuration.

## Supporting extension - Additional computer-systems context

It grows by 3 MB/s and fills after 24 / 3 = 8 seconds under the stated constant-rate assumptions.
