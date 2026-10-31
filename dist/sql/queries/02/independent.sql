-- On changed data, list outstanding loans due from 8 through 12 April inclusive, excluding B001. Also write a separate prefix search for descriptions beginning with S.
-- Fresh changed y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT LoanID, BorrowerID, DueDate FROM Loan WHERE Returned = 0 AND DueDate BETWEEN '2026-04-08' AND '2026-04-12' AND NOT (BorrowerID = 'B001') ORDER BY DueDate, LoanID;
SELECT EquipmentID, EquipmentDescription FROM Equipment WHERE EquipmentDescription LIKE 'S%' ORDER BY EquipmentID;
