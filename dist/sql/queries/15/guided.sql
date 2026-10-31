-- Try a negative capacity against that rule.
-- Fresh base scratch database. Enable PRAGMA foreign_keys=ON before any BEGIN.
CREATE TABLE Sample (ID INTEGER PRIMARY KEY, Capacity INTEGER NOT NULL CHECK(typeof(Capacity)='integer' AND Capacity > 0));
INSERT INTO Sample VALUES (1,-1);
-- Verify:
SELECT COUNT(*) AS AcceptedRows FROM Sample;
