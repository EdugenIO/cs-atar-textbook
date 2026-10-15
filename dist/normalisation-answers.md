# Unit 2 week 3 — explained answers

Edition 0.8. Classroom draft. Accept equivalent designs consistent with the specified dependencies and information-preservation requirements.

1. Multiple reservation events are nested in a borrower row. Item1/Date1/Status1 and Item2/Date2/Status2 are another repeating layout. Flatten by event, not by deleting events.
2. Update: Camera details appear repeatedly for E01. Insert: cannot store an unused item naturally in event-only rows. Delete: removing E03’s only request loses its stored description/category in the register.
3. Six atomic rows, PK (BorrowerID, EquipmentID, ReservationDate). B001/E01 repeats on another date; E01/1 May has requests by two borrowers; B001/1 May includes two items. The rules justify the key, rather than merely the sample’s appearance.
4. BorrowerID → BorrowerLabel; EquipmentID → EquipmentDescription, CategoryID; CategoryID → CategoryName; whole reservation key → ReservationStatus. Label/item facts depend on part of the composite key. EquipmentID → CategoryID → CategoryName is a transitive chain.
At the 2NF step, move facts that depend on only part of the original composite key. Keep item details together in Equipment for now. Its CategoryID → CategoryName chain is removed at the next, 3NF step.

5. Borrower(BorrowerID PK, BorrowerLabel); Equipment(EquipmentID PK, EquipmentDescription, CategoryID, CategoryName); Reservation(BorrowerID PK/FK, EquipmentID PK/FK, ReservationDate PK, ReservationStatus). Split borrower/item facts from reservation events. Do not yet claim the Equipment relation is in 3NF.
6. CategoryName depends on non-key CategoryID, which depends on EquipmentID.
7. Borrower remains; Category(CategoryID PK, CategoryName) is added; Equipment retains EquipmentID PK, EquipmentDescription and CategoryID FK; Reservation remains with its three-part PK and two FKs. Four final tables.
8. B001/E01/1 May: Learner A, Camera, C01/Imaging, Confirmed. B002/E01/1 May: Learner B, same item/category, Requested. Different borrowers make distinct requests; allocation approval is a separate rule.
9. Three borrowers, three items, three categories, six reservations. Reconstruct through identifier matches; do not join descriptions ambiguously.
10. Repeated FKs describe legitimate related events. Removing them can destroy history. Normalisation separates facts according to dependencies.
11. A single-key 1NF table can still have a non-key dependency chain, as Equipment does at 2NF. Accurate dates, valid statuses, foreign-key enforcement and conflicting confirmation checks remain necessary.
12. 1NF flattened club register has PK (MemberID, ActivityID, Term). 2NF Member(MemberID PK, MemberLabel), Activity(ActivityID PK, ActivityName, LeaderID, LeaderLabel), Participation(MemberID PK/FK, ActivityID PK/FK, Term PK, AttendanceCount). 3NF adds Leader(LeaderID PK, LeaderLabel), removes LeaderLabel from Activity and marks LeaderID FK. Partial: label depends on MemberID only. Transitive: ActivityID → LeaderID → LeaderLabel. Four tables; do not drop Term because rejoining next term is permitted.

Learning criteria: justified keys; atomic 1NF events; explained partial and transitive splits; valid references; preservation of six events; independently completed transfer. Use the explanations for self-review and revisit any step you cannot yet explain.
