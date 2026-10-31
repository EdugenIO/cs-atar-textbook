-- List loan identifiers and equipment descriptions for returned loans.
-- Fresh base y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT Loan.LoanID, Equipment.EquipmentDescription FROM Loan INNER JOIN Equipment ON Loan.EquipmentID = Equipment.EquipmentID WHERE Loan.Returned = 1 ORDER BY Loan.LoanID;
