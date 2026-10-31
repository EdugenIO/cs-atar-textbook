-- Try an orphan loan. Predict the error and check that no row was inserted.
-- Fresh base y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
INSERT INTO Loan VALUES ('L020','B999','E01','2026-04-14',0);
-- Verify:
SELECT COUNT(*) AS MatchingRows FROM Loan WHERE LoanID = 'L020';
