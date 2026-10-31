# Y11 changed data dictionary, records and relationships
All records are fictional. ISO dates are text; 0/1 is the declared Boolean convention. SQLite affinity is not full domain enforcement.

## Borrower
Field | Declared type | NOT NULL flag | Primary-key position
--- | --- | --- | ---
BorrowerID | TEXT | 1 | 1
BorrowerLabel | TEXT | 1 | 0

Supplied records:
BorrowerID | BorrowerLabel
--- | ---
B001 | Learner A
B002 | Learner B
B003 | Learner C
B004 | Learner D
B005 | Learner E

## Category
Field | Declared type | NOT NULL flag | Primary-key position
--- | --- | --- | ---
CategoryID | TEXT | 1 | 1
CategoryName | TEXT | 1 | 0

Supplied records:
CategoryID | CategoryName
--- | ---
C01 | Imaging
C02 | Support
C03 | Audio

## Equipment
Field | Declared type | NOT NULL flag | Primary-key position
--- | --- | --- | ---
EquipmentID | TEXT | 1 | 1
EquipmentDescription | TEXT | 1 | 0
CategoryID | TEXT | 1 | 0
Foreign key component: Equipment.CategoryID -> Category.CategoryID; delete action NO ACTION. Components with the same FK ID 0 form one foreign key.

Supplied records:
EquipmentID | EquipmentDescription | CategoryID
--- | --- | ---
E01 | Camera | C01
E02 | Tripod | C02
E03 | Recorder | C03
E04 | Camera | C01
E05 | Microphone | C03
E06 | Sensor | C02

## Loan
Field | Declared type | NOT NULL flag | Primary-key position
--- | --- | --- | ---
LoanID | TEXT | 1 | 1
BorrowerID | TEXT | 1 | 0
EquipmentID | TEXT | 1 | 0
DueDate | TEXT | 1 | 0
Returned | INTEGER | 1 | 0
Foreign key component: Loan.EquipmentID -> Equipment.EquipmentID; delete action NO ACTION. Components with the same FK ID 0 form one foreign key.
Foreign key component: Loan.BorrowerID -> Borrower.BorrowerID; delete action NO ACTION. Components with the same FK ID 1 form one foreign key.

Supplied records:
LoanID | BorrowerID | EquipmentID | DueDate | Returned
--- | --- | --- | --- | ---
L001 | B001 | E01 | 2026-04-06 | 0
L002 | B002 | E02 | 2026-04-08 | 1
L003 | B001 | E03 | 2026-04-07 | 1
L004 | B003 | E04 | 2026-04-10 | 0
L005 | B002 | E02 | 2026-04-04 | 1
L006 | B004 | E05 | 2026-04-12 | 0
L007 | B005 | E06 | 2026-04-09 | 0
