-- Trim and normalise a supplied staging row; this is a proposed clean result, not automatic proof of identity. Row 4 has been verified as M09 / Eli; import only that row into Member after normalisation.
-- Fresh base staging database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT upper(trim(MemberID)) AS ProposedID, trim(DisplayName) AS ProposedName FROM Staging ORDER BY RowNo;
INSERT INTO Member (MemberID, DisplayName) SELECT upper(trim(MemberID)), trim(DisplayName) FROM Staging WHERE RowNo = 4;
-- Verify:
SELECT MemberID, DisplayName FROM Member ORDER BY MemberID;
