-- Apply all five aggregates only to records with Days at least 3.
-- Fresh base durations database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT COUNT(*) AS Records, SUM(Days) AS TotalDays, AVG(Days) AS MeanDays, MAX(Days) AS Longest, MIN(Days) AS Shortest FROM Duration WHERE Days >= 3;
