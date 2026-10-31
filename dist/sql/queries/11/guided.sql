-- List a member label formed from MemberID, separator and DisplayName.
-- Fresh base y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT MemberID || ': ' || DisplayName AS MemberLabel FROM Member ORDER BY MemberID;
