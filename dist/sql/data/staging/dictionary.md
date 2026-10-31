# STAGING base data dictionary, records and relationships
All records are fictional. ISO dates are text; 0/1 is the declared Boolean convention. SQLite affinity is not full domain enforcement.

## Member
Field | Declared type | NOT NULL flag | Primary-key position
--- | --- | --- | ---
MemberID | TEXT | 1 | 1
DisplayName | TEXT | 1 | 0
Text values below are shown in quotes so surrounding/blank spaces remain visible; the quote marks are display notation, not stored characters.

Supplied records:
MemberID | DisplayName
--- | ---

## Staging
Field | Declared type | NOT NULL flag | Primary-key position
--- | --- | --- | ---
RowNo | INTEGER | 0 | 1
MemberID | TEXT | 1 | 0
DisplayName | TEXT | 1 | 0
Text values below are shown in quotes so surrounding/blank spaces remain visible; the quote marks are display notation, not stored characters.

Supplied records:
RowNo | MemberID | DisplayName
--- | --- | ---
1 | ' m04 ' | ' Dana '
2 | 'M04' | 'Different name'
3 | 'M08' | ' '
4 | 'M09' | ' Eli '
