-- On changed durations, summarise only completed records with all five functions. Also predict the aggregate row for Days greater than 99.
-- Fresh changed durations database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT COUNT(*) AS Records, SUM(Days) AS TotalDays, AVG(Days) AS MeanDays, MAX(Days) AS Longest, MIN(Days) AS Shortest FROM Duration WHERE Completed = 1;
SELECT COUNT(*) AS Records, SUM(Days) AS TotalDays, AVG(Days) AS MeanDays, MAX(Days) AS Longest, MIN(Days) AS Shortest FROM Duration WHERE Days > 99;
