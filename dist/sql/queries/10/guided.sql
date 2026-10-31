-- Compute count, sum, average, minimum and maximum capacity directly from Session.
-- Fresh base y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT COUNT(*) AS Sessions, SUM(Capacity) AS Places, AVG(Capacity) AS MeanCapacity, MIN(Capacity) AS Smallest, MAX(Capacity) AS Largest FROM Session;
