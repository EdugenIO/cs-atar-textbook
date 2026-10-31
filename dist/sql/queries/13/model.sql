-- Create Scratch, add Notes, inspect the fields, then drop only this scratch table and verify its absence.
-- Fresh base scratch database. Enable PRAGMA foreign_keys=ON before any BEGIN.
CREATE TABLE Scratch (ID INTEGER PRIMARY KEY, Label TEXT NOT NULL);
ALTER TABLE Scratch ADD COLUMN Notes TEXT;
SELECT name, type FROM pragma_table_info('Scratch') ORDER BY cid;
DROP TABLE Scratch;
-- Verify:
SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;
