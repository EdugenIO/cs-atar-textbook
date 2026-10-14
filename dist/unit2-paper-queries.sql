-- Teacher validation queries; answers, not student paper.
SELECT LoanID, BorrowerID, DueDate FROM Loan WHERE Returned=0 AND DueDate<'2026-04-08' ORDER BY DueDate, LoanID;
SELECT l.LoanID, b.BorrowerLabel FROM Loan AS l INNER JOIN Borrower AS b ON l.BorrowerID=b.BorrowerID WHERE l.Returned=0 ORDER BY l.LoanID;
SELECT COUNT(*), SUM(ReplacementCost), AVG(ReplacementCost), MIN(ReplacementCost), MAX(ReplacementCost) FROM Equipment;
