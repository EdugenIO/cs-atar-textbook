-- Run in a working project copy, outside an existing transaction.
PRAGMA foreign_keys = ON;
BEGIN;
INSERT INTO Borrower (BorrowerID, BorrowerLabel) VALUES ('B005', 'Learner E');
SELECT * FROM Borrower WHERE BorrowerID = 'B005';
SELECT LoanID, Returned FROM Loan WHERE LoanID = 'L001';
UPDATE Loan SET Returned = 1 WHERE LoanID = 'L001';
SELECT LoanID, Returned FROM Loan WHERE LoanID = 'L001';
DELETE FROM Borrower WHERE BorrowerID = 'B005';
SELECT COUNT(*) AS RemainingTestBorrowers FROM Borrower WHERE BorrowerID = 'B005';
ROLLBACK;
-- Original four borrowers and L001 Returned = 0 are restored.
