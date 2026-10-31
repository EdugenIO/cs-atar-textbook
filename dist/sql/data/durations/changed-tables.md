# DURATIONS changed data dictionary, records and relationships
All records are fictional. ISO dates are text; 0/1 is the declared Boolean convention. SQLite affinity is not full domain enforcement.

## Duration
Field | Declared type | NOT NULL flag | Primary-key position
--- | --- | --- | ---
RecordID | INTEGER | 0 | 1
Days | INTEGER | 1 | 0
Completed | INTEGER | 1 | 0

Supplied records:
RecordID | Days | Completed
--- | --- | ---
1 | 1 | 1
2 | 4 | 1
3 | 4 | 0
4 | 7 | 1
5 | 0 | 0
