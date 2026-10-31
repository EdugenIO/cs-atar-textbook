-- Add a new parent borrower to the equipment database.
-- Fresh base y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
INSERT INTO Borrower (BorrowerID, BorrowerLabel) VALUES ('B010','Practice member');
-- Verify:
SELECT BorrowerID, BorrowerLabel FROM Borrower WHERE BorrowerID = 'B010';
