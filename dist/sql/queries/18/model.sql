-- Change capacity inside a transaction, then cancel it.
-- Fresh base y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
BEGIN;
UPDATE Session SET Capacity = 8 WHERE SessionID = 'S01';
ROLLBACK;
-- Verify:
SELECT SessionID, Capacity FROM Session WHERE SessionID = 'S01';
