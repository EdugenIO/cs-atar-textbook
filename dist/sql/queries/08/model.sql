-- Model a requirement-to-query explanation for a distinct category list.
-- Fresh base y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT DISTINCT CategoryID FROM Equipment ORDER BY CategoryID;
