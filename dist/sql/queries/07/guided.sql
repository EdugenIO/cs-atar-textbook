-- Delete only returned loan L003; verify the borrower survives.
-- Fresh base y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
DELETE FROM Loan WHERE LoanID = 'L003' AND Returned = 1;
-- Verify:
SELECT COUNT(*) AS LoanRows FROM Loan WHERE LoanID = 'L003';
SELECT BorrowerID FROM Borrower WHERE BorrowerID = 'B001';
