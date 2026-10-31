-- Rename a field, then verify the new name.
-- Fresh base scratch database. Enable PRAGMA foreign_keys=ON before any BEGIN.
CREATE TABLE Scratch (ID INTEGER PRIMARY KEY, OldLabel TEXT);
ALTER TABLE Scratch RENAME COLUMN OldLabel TO Label;
-- Verify:
SELECT name FROM pragma_table_info('Scratch') ORDER BY cid;
