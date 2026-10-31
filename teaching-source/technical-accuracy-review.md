# Technical accuracy review — 31 October 2026

Scope: console/algorithm examples, supplied SQL reports, quantitative network examples and selected explained answers. This supplements the earlier editorial and student-journey audits; it does not certify every narrative answer, external legal assertion, live network, GUI platform or learner outcome.

## Findings

The booking-design model answer `y12-10` correctly required a foreign key and a unique workshop/student pair, but did not explicitly require non-NULL identifiers. A fresh SQLite counterexample accepted an absent workshop reference as NULL and repeated `(7, NULL)` pairs. The answer, its existing marking criteria and misconception feedback now require `NOT NULL` on Booking.WorkshopID and StudentID, as well as the foreign key and composite UNIQUE constraint. It also states that SQLite foreign-key enforcement must be enabled and verified per connection. The original seven criteria remain seven; no marks were added.

Tests now demonstrate acceptance by the weaker schema and rejection of duplicates, missing identifiers and unknown workshops by the corrected constraints, with the original booking preserved. The revised explanation also appears in the revision hub and downloadable explained-answer collection.

No further discrepancies were found within the cases listed below. This is bounded evidence, not a claim that testing proves all inputs or all prose correct.

## Independent checks added

- Executed all 13 chapter Python listings, compiled their supplied solutions, checked the separate selection download below/at/above its threshold, and independently checked the seven introductory demo outputs, append validation and normal/empty file totals. Existing depth-example checks additionally execute 27 Python examples and three SQL labs against their published outputs and content/constraint checks.
- Enumerated all 1,093 integer lists of length 0–6 over {-1, 0, 1}. Checked each of three sorts against Python's trusted sorted result (3,279 sort cases), including repeated/negative values and empty inputs. Checked linear search's first occurrence and binary search's matching occurrence on five targets per list (5,465 cases for each search).
- Checked best/reverse comparison counts and worst-case search probes for declared sizes, including 16/32-item binary counts of 5/6. Independently reconstructed the published first-pass bubble, insertion and selection traces.
- Checked labelled-record stability, independent grid rows, row/column totals without mutation, stock conservation on successful/failed lends and returns, and subclass boundaries at camera charge 19/20 and projector hours 999/1000.
- Recalculated ordinary IPv4 masks/network/broadcast/host ranges with integer bit arithmetic rather than the ipaddress library used by the calculator: all prefixes /0–/30 on five addresses. Checked 20 host-capacity requirements, six gateway boundary cases, the four published VLSM rows and non-overlap.
- Recalculated packet sizes for TCP/UDP payloads, Ethernet minimum padding, maximum payload/MTU rejection, bits versus bytes, shared-link demand and ideal transfer time. These use the explicitly stated header/overhead model; /31, /32 LAN allocation and IPv6 host allocation are outside that calculator's scope.
- Reconstructed all ten advanced SQL reports with Python dictionaries, joins and counts at their stated grain. Compared base, changed-data, five equal-capacity variants and empty-session cases (80 report comparisons). Changed cases include an unbooked session, duplicate display labels, multiple bookings per member and recorded absence versus missing attendance. The base JSON answer file was independently checked against that reconstruction.
- Executed five formative model SQL answers on fresh changed/NULL/duplicate fixtures and checked that the targeted UPDATE leaves unrelated rows unchanged. Existing pathway checks replay all 54 downloaded query references against ten databases, with additional independently specified result/constraint/rollback cases.

The new independent suite completed 19,571 assertions. Counts include multiple invariants per case and are not counts of textbook questions. Original published expected-result files are not the oracle for the new exhaustive/arithmetic/relational checks.

## Primary references checked

- Python list mutation, copying and sorting: https://docs.python.org/3/tutorial/datastructures.html
- SQLite SELECT, joins and grouping: https://www.sqlite.org/lang_select.html
- SQLite NULL foreign-key exception and enforcement: https://www.sqlite.org/foreignkeys.html
- SQLite UNIQUE and NOT NULL constraints: https://www.sqlite.org/lang_createtable.html
- TCP byte sequence and acknowledgement semantics: https://www.rfc-editor.org/rfc/rfc9293
- IPv6 base-header/addressing behaviour: https://www.rfc-editor.org/rfc/rfc8200

## Reproduction and limits

Run `python tests/technical-accuracy.test.py`, `python tests/sql-pathway.test.py`, `python tests/extended-packs.test.py` and `python tests/teaching-depth-examples.test.py`, plus the JavaScript suite. The independent suite uses only Python's standard library and Node for loading the published chapter/question data. It runs generated file examples in a disposable folder; it does not scan or configure a network.

School-specific environments, timed assessment conditions, human marking of equivalent explanations and a full independent subject-specialist review remain separate work. The existing classroom-draft and 2026-foundation/2027-revision labels remain in place.
