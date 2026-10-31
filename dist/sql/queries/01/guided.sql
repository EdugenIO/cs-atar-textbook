-- List borrower labels and identifiers, ordered by label descending.
-- Fresh base y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT BorrowerLabel, BorrowerID FROM Borrower ORDER BY BorrowerLabel DESC, BorrowerID;
