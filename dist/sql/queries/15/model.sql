-- Demonstrate positive integer capacity and a trimmed label length of 1..60 on one practice table.
-- Fresh base scratch database. Enable PRAGMA foreign_keys=ON before any BEGIN.
CREATE TABLE Sample (ID INTEGER PRIMARY KEY, Capacity INTEGER NOT NULL CHECK(typeof(Capacity)='integer' AND Capacity > 0), Label TEXT NOT NULL CHECK(length(trim(Label)) BETWEEN 1 AND 60));
-- Verify:
SELECT name, type FROM pragma_table_info('Sample') ORDER BY cid;
