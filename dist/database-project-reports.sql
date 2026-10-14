-- Readable active loans
SELECT l.LoanID, b.BorrowerLabel, e.EquipmentDescription, l.DueDate
FROM Loan AS l
INNER JOIN Borrower AS b ON l.BorrowerID = b.BorrowerID
INNER JOIN Equipment AS e ON l.EquipmentID = e.EquipmentID
WHERE l.Returned = 0
ORDER BY l.DueDate, l.LoanID;

-- Loan history with categories
SELECT l.LoanID, e.EquipmentID, c.CategoryName
FROM Loan AS l
INNER JOIN Equipment AS e ON l.EquipmentID = e.EquipmentID
INNER JOIN Category AS c ON e.CategoryID = c.CategoryID
ORDER BY l.LoanID;

-- Inventory summary
SELECT COUNT(*) AS ItemCount, SUM(ReplacementCost) AS TotalCost,
       AVG(ReplacementCost) AS MeanCost, MIN(ReplacementCost) AS LowestCost,
       MAX(ReplacementCost) AS HighestCost
FROM Equipment;

-- Borrowers represented in loan history
SELECT b.BorrowerID, b.BorrowerLabel, COUNT(*) AS LoanCount
FROM Borrower AS b
INNER JOIN Loan AS l ON b.BorrowerID = l.BorrowerID
GROUP BY b.BorrowerID, b.BorrowerLabel
ORDER BY b.BorrowerID;

-- Empty aggregate input
SELECT COUNT(*) AS ItemCount, SUM(ReplacementCost) AS TotalCost,
       AVG(ReplacementCost) AS MeanCost, MIN(ReplacementCost) AS LowestCost,
       MAX(ReplacementCost) AS HighestCost
FROM Equipment WHERE CategoryID = 'C99';

-- Active history per borrower
SELECT BorrowerID, COUNT(*) AS ActiveCount
FROM Loan WHERE Returned = 0
GROUP BY BorrowerID ORDER BY BorrowerID;