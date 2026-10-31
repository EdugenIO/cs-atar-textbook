-- On changed data, insert B011 with label New member, then L021 for B011/E06 due 15 April 2026, not returned. In separate fresh copies, try a repeated B001 key and a NULL borrower label; explain both failures.
-- Fresh changed y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
INSERT INTO Borrower (BorrowerID, BorrowerLabel) VALUES ('B011','New member');
INSERT INTO Loan VALUES ('L021','B011','E06','2026-04-15',0);
-- Verify:
SELECT LoanID, BorrowerID, EquipmentID FROM Loan WHERE LoanID = 'L021';
