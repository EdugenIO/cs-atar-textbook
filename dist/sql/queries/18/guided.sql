-- Insert a practice member, commit it and verify the saved row.
-- Fresh base y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
BEGIN;
INSERT INTO Member VALUES ('M20','Transaction member');
COMMIT;
-- Verify:
SELECT MemberID, DisplayName FROM Member WHERE MemberID = 'M20';
