-- On changed data, move L007 due date to 16 April 2026, then delete only returned L005. Show both effects and an unchanged L004.
-- Fresh changed y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
UPDATE Loan SET DueDate = '2026-04-16' WHERE LoanID = 'L007';
DELETE FROM Loan WHERE LoanID = 'L005' AND Returned = 1;
-- Verify:
SELECT LoanID, DueDate FROM Loan WHERE LoanID IN ('L004','L007') ORDER BY LoanID;
SELECT COUNT(*) AS RemovedLoanRows FROM Loan WHERE LoanID = 'L005';
