-- On changed staging data, identify valid-looking rows, blank names and duplicate proposed IDs. Preserve raw rows and write a retain/quarantine reason for each before any INSERT. Produce a report of non-blank proposed names only. Row 4 has now been verified as M07 / Gia. Import only that reviewed row into Member using an explicit column mapping and verify the stored row.
-- Fresh changed staging database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT RowNo, upper(trim(MemberID)) AS ProposedID, trim(DisplayName) AS ProposedName FROM Staging WHERE trim(DisplayName) <> '' ORDER BY RowNo;
INSERT INTO Member (MemberID, DisplayName) SELECT upper(trim(MemberID)), trim(DisplayName) FROM Staging WHERE RowNo = 4;
-- Verify:
SELECT MemberID, DisplayName FROM Member ORDER BY MemberID;
