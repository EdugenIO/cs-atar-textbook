-- Summarise the fixed durations of five practice records.
-- Fresh base durations database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT COUNT(*) AS Records, SUM(Days) AS TotalDays, AVG(Days) AS MeanDays, MAX(Days) AS Longest, MIN(Days) AS Shortest FROM Duration;
