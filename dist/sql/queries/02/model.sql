-- Find outstanding loans due before 8 April 2026.
-- Fresh base y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT LoanID, DueDate FROM Loan WHERE Returned = 0 AND DueDate < '2026-04-08' ORDER BY DueDate, LoanID;
