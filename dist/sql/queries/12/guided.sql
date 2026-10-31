-- Detect duplicate proposed identifiers before importing.
-- Fresh base staging database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT upper(trim(MemberID)) AS ProposedID, COUNT(*) AS Records FROM Staging GROUP BY upper(trim(MemberID)) ORDER BY ProposedID;
