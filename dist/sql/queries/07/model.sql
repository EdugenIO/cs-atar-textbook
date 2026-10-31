-- Mark L001 returned, delete only returned L005, and verify the changes plus an unchanged L002.
-- Fresh base y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
UPDATE Loan SET Returned = 1 WHERE LoanID = 'L001';
DELETE FROM Loan WHERE LoanID='L005' AND Returned=1;
-- Verify:
SELECT LoanID, Returned FROM Loan WHERE LoanID IN ('L001','L002') ORDER BY LoanID;
SELECT COUNT(*) AS RemovedLoanRows FROM Loan WHERE LoanID='L005';
