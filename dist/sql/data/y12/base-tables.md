# Y12 base data dictionary, records and relationships
All records are fictional. ISO dates are text; 0/1 is the declared Boolean convention. SQLite affinity is not full domain enforcement.

Domain rules: Instructor.DisplayName and Member.DisplayName have trimmed lengths 1..60; Workshop.Title has trimmed length 1..80. Session.Capacity must be stored as an integer greater than zero. Attendance.Present must be an integer 0 or 1. All displayed required fields must be NOT NULL. Booking uses the whole (MemberID, SessionID) primary key; Attendance uses the same composite key and references Booking with ON DELETE CASCADE. Other displayed foreign keys use the default restrictive delete action.

## Attendance
Field | Declared type | NOT NULL flag | Primary-key position
--- | --- | --- | ---
MemberID | TEXT | 1 | 1
SessionID | TEXT | 1 | 2
Present | INTEGER | 1 | 0
Foreign key component: Attendance.MemberID -> Booking.MemberID; delete action CASCADE. Components with the same FK ID 0 form one foreign key.
Foreign key component: Attendance.SessionID -> Booking.SessionID; delete action CASCADE. Components with the same FK ID 0 form one foreign key.

Supplied records:
MemberID | SessionID | Present
--- | --- | ---
M01 | S01 | 1
M02 | S01 | 0

## Booking
Field | Declared type | NOT NULL flag | Primary-key position
--- | --- | --- | ---
MemberID | TEXT | 1 | 1
SessionID | TEXT | 1 | 2
BookedOn | TEXT | 1 | 0
Foreign key component: Booking.SessionID -> Session.SessionID; delete action NO ACTION. Components with the same FK ID 0 form one foreign key.
Foreign key component: Booking.MemberID -> Member.MemberID; delete action NO ACTION. Components with the same FK ID 1 form one foreign key.

Supplied records:
MemberID | SessionID | BookedOn
--- | --- | ---
M01 | S01 | 2026-10-14
M02 | S01 | 2026-10-14
M01 | S02 | 2026-10-14

## Instructor
Field | Declared type | NOT NULL flag | Primary-key position
--- | --- | --- | ---
InstructorID | TEXT | 1 | 1
DisplayName | TEXT | 1 | 0

Supplied records:
InstructorID | DisplayName
--- | ---
I01 | Guide A
I02 | Guide B

## Member
Field | Declared type | NOT NULL flag | Primary-key position
--- | --- | --- | ---
MemberID | TEXT | 1 | 1
DisplayName | TEXT | 1 | 0

Supplied records:
MemberID | DisplayName
--- | ---
M01 | Member A
M02 | Member B
M03 | Member C

## Session
Field | Declared type | NOT NULL flag | Primary-key position
--- | --- | --- | ---
SessionID | TEXT | 1 | 1
WorkshopID | TEXT | 1 | 0
InstructorID | TEXT | 1 | 0
SessionDate | TEXT | 1 | 0
Capacity | INTEGER | 1 | 0
Foreign key component: Session.InstructorID -> Instructor.InstructorID; delete action NO ACTION. Components with the same FK ID 0 form one foreign key.
Foreign key component: Session.WorkshopID -> Workshop.WorkshopID; delete action NO ACTION. Components with the same FK ID 1 form one foreign key.

Supplied records:
SessionID | WorkshopID | InstructorID | SessionDate | Capacity
--- | --- | --- | --- | ---
S01 | W01 | I01 | 2026-11-02 | 2
S02 | W01 | I02 | 2026-11-09 | 3
S03 | W02 | I01 | 2026-11-03 | 2

## Workshop
Field | Declared type | NOT NULL flag | Primary-key position
--- | --- | --- | ---
WorkshopID | TEXT | 1 | 1
Title | TEXT | 1 | 0

Supplied records:
WorkshopID | Title
--- | ---
W01 | Python studio
W02 | Network design
