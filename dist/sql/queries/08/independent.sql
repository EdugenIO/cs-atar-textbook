-- On changed data, produce a sorted report of outstanding LoanID and equipment description. Then count all outstanding loans. Explain the join key and what each output row represents. Separately repeat the three-table construction and controlled insert/update/delete tasks before including them in assessment.
-- Fresh changed y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT Loan.LoanID, Equipment.EquipmentDescription FROM Loan INNER JOIN Equipment ON Loan.EquipmentID = Equipment.EquipmentID WHERE Loan.Returned = 0 ORDER BY Loan.LoanID;
SELECT COUNT(*) AS OutstandingLoans FROM Loan WHERE Returned = 0;
