# Community Skills Hub: integrated review workbook
Original formative review; Weeks 11–12 eight lessons. Use the NEW review seed, not the earlier project seed. All names/data are fictional. SQLite syntax used for concatenation. The classroom database has no implemented website/login/TLS service; the proposed deployment below is a separate hypothetical system.

## A. Design and integrity (8 indicative marks)
A1 (4): Draw the six-table ER model using crow's-foot notation, labelled PK/FK fields and justified optionality. Explain Booking's composite key and Attendance's composite reference to Booking.
A2 (4): A flat booking sheet stores MemberID,SessionID,MemberName,WorkshopID,WorkshopTitle,InstructorID,InstructorName,SessionDate,Capacity,BookedOn. Given MemberID->MemberName; SessionID->WorkshopID,InstructorID,SessionDate,Capacity; WorkshopID->WorkshopTitle; InstructorID->InstructorName; (MemberID,SessionID)->BookedOn, explain a partial and transitive dependency and decompose to 3NF. Attendance is separately recorded. Name an update anomaly.

## B. Reports and debugging (16 indicative marks)
B1/Q1 (4): Four-table INNER JOIN report: MemberID, DisplayName concatenated with ' / ' and workshop Title as BookingLabel, SessionID; sort SessionID then MemberID. Predict rows first.
B2/Q2 (3): ALL sessions, booking count and remaining capacity, including the unbooked session. Use aliases, grouping and a calculated field. Explain COUNT(b.MemberID) versus COUNT(*).
B3/Q3 (3): Every booked member/session and attendance value. Preserve unrecorded attendance as NULL. Explain why joining on MemberID alone is wrong and NULL differs from zero.
B4/Q4 (2): Sessions with bookings at least capacity, using GROUP BY/HAVING. Predict the full-session IDs.
B5/Q5 (2): Sum scheduled capacity per workshop WITHOUT multiplying session capacity by joined bookings. Explain the faulty joined W01 sum and why SUM(DISTINCT Capacity) can fail.
B6 (2): Repair `... LEFT JOIN Attendance a ON b.MemberID=a.MemberID WHERE a.Present=1` if the requirement is every booking and its attendance value. Explain both the composite join and filtering problem.

## C. Transactions and connectivity (6 indicative marks)
C1 (3): An operation inserts a booking then inserts attendance. The attendance violates Present's domain. State expected all-or-nothing behaviour, explicit rollback, and which invariant the domain check protects. Explain that Capacity>0 alone does not enforce booking count<=capacity. Propose a concurrent capacity test.
C2 (3): Trace user request -> Python application -> database API/driver -> SQL/transaction -> result/error -> application response. Distinguish sqlite3's DB-API interface from ODBC. Explain why a backup not yet restored/tested is weak recovery evidence; a memory-only rollback test does not establish crash durability.

## D. Proposed deployment and security (8 indicative marks)
Stimulus: roles say Learner may view own bookings; Registrar may export all. The future web app accepts the browser's supplied role/scope strings. A log records learner-labelled export allowed at 10:00 UTC, 250 records returned; a second export is denied at 10:02. IPs/account labels are not proof of a person's identity. No recipient/disclosure/serious-harm finding is supplied.
D1 (3): Separate observed facts from two plausible explanations, map CIA/AAA risks, and name further evidence. Do not infer a named culprit or a notifiable breach solely from the log.
D2 (3): Recommend server-side authorisation and detection/response controls with purpose, location, limitations and positive/negative tests. Compare narrow permissions with blocking every export. A returned record count does not establish external disclosure.
D3 (2): Define a paper-only red/blue-team activity with roles, scope and a stop condition. Permission for supplied cards is not permission to test school systems.

## E. Secure communication (4 indicative marks)
E1 (2): Explain certificate binding/private-key possession and authenticated ephemeral agreement in the simplified TLS 1.3 flow; distinguish public material from derived secrets.
E2 (2): Explain symmetric authenticated application-record protection and one remaining endpoint/permission risk. Do not describe TLS 1.3 as RSA key transport or claim port 443 proves TLS.

## F. Privacy and ethical use (6 indicative marks)
Assume the fictional private hub is an APP entity covered by federal NDB obligations. It proposes overseas analytics, gives no collection notice, uses stale attendance and refuses all verified access requests. Incident date: 14 October 2026. No notification-eligibility finding is supplied.
F1 (3): Apply APP 5/8/10/11/12 to appropriate facts/actions; acknowledge overlaps and relevant missing evidence.
F2 (3): Explain suspected versus established eligible federal breach, remedial action/likely serious harm and why 30 days is not a blanket notification delay. Contrast a WA public-sector counterfactual at this date: July 2026 privacy provisions and January 2027 state breach commencement. Evaluate individual profiling versus aggregate planning, data-source acknowledgement and limits of removing names.

Total 48 indicative formative marks, distributed across lessons; not a one-period examination or new summative task. Use feedback/retry sheet and fresh transfer cards, not copied answers.
