-- Create Trial(ID INTEGER PRIMARY KEY, Label TEXT NOT NULL), insert one row, add Notes TEXT, inspect it, then DROP only Trial. Verify that the table no longer exists. Explain DROP versus DELETE.
-- Fresh changed scratch database. Enable PRAGMA foreign_keys=ON before any BEGIN.
CREATE TABLE Trial (ID INTEGER PRIMARY KEY, Label TEXT NOT NULL);
INSERT INTO Trial VALUES (1,'Sample');
ALTER TABLE Trial ADD COLUMN Notes TEXT;
DROP TABLE Trial;
-- Verify:
SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;
