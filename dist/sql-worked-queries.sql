-- All equipment fields
SELECT * FROM Equipment ORDER BY EquipmentID;

-- Choose fields
SELECT EquipmentID, EquipmentDescription FROM Equipment ORDER BY EquipmentID;

-- Camera items
SELECT EquipmentID, EquipmentDescription FROM Equipment WHERE EquipmentDescription = 'Camera' ORDER BY EquipmentID;

-- Active loans
SELECT LoanID, DueDate FROM Loan WHERE Returned = 0 ORDER BY DueDate ASC, LoanID ASC;

-- Overdue at 8 April
SELECT LoanID, BorrowerID, DueDate FROM Loan WHERE Returned = 0 AND DueDate < '2026-04-08' ORDER BY DueDate ASC, LoanID ASC;

-- Audio or imaging items
SELECT EquipmentID, CategoryID FROM Equipment WHERE CategoryID = 'C03' OR CategoryID = 'C01' ORDER BY EquipmentID;

-- Grouped conditions
SELECT LoanID FROM Loan WHERE Returned = 0 AND (BorrowerID = 'B001' OR BorrowerID = 'B002') ORDER BY LoanID;

-- Distinct descriptions
SELECT DISTINCT EquipmentDescription FROM Equipment ORDER BY EquipmentDescription;

-- Empty result
SELECT EquipmentID FROM Equipment WHERE CategoryID = 'C99' ORDER BY EquipmentID;