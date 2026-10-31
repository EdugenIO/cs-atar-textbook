-- Model a grouped capacity report at workshop grain.
-- Fresh base y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT WorkshopID, SUM(Capacity) AS Places FROM Session GROUP BY WorkshopID ORDER BY WorkshopID;
