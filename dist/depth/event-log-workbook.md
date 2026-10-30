# Clean, manipulate and evaluate a fictional event table

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
