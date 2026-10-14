# Unit 2 week 3 — normalisation workbook

Edition 0.8. Original classroom draft. Use the reservation starter and stage CSVs. This extends the equipment scenario; the earlier loan model is unchanged. No SQL setup is required.

Rules: competing reservation requests are allowed. One request per borrower/item/date. BorrowerID determines BorrowerLabel; EquipmentID determines EquipmentDescription and CategoryID; CategoryID determines CategoryName. ReservationStatus depends on the whole event key.

1. Explain the repeating group in the starter. Give an alternative repeating-column layout that has the same problem.
2. Explain an update, insert and delete anomaly using specific equipment facts.
3. Flatten into 1NF: six atomic rows. Underline (BorrowerID, EquipmentID, ReservationDate). Explain why all three are needed.
4. Write the functional dependencies and distinguish a partial dependency from a transitive dependency.
5. Form the three 2NF relations, identifying keys and FKs. State which facts moved and why.
6. Explain why the 2NF Equipment relation still fails 3NF.
7. Form four 3NF relations. Identify every PK and FK, including the three attributes forming Reservation’s PK.
8. Reconstruct B001/E01/2026-05-01 and B002/E01/2026-05-01. Explain why these are different requests.
9. Count borrowers, equipment items, categories and events. Verify that all six original rows can be reconstructed.
10. Explain why EquipmentID can legitimately repeat in Reservation. Why is deleting repeated IDs not normalisation?
11. Explain why a simple single-attribute PK does not automatically guarantee 3NF. State one rule or data-quality concern that normalisation does not enforce.
12. Solve the club transfer scenario without referring to the answers. Show 1NF, 2NF and 3NF, with dependency explanations.

Club rules: MemberID → MemberLabel; ActivityID → ActivityName, LeaderID; LeaderID → LeaderLabel; (MemberID, ActivityID, Term) → AttendanceCount. One membership per member/activity/term. A member may rejoin next term. The original register has a repeating list of activity details for each member.

Review: write one corrected misconception and a fresh example demonstrating the correction.
