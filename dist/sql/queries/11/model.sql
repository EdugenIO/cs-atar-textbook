-- Show a labelled session and half its capacity using a real divisor.
-- Fresh base y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT SessionID || ' / ' || SessionDate AS SessionLabel, ROUND(Capacity / 2.0, 1) AS HalfCapacity FROM Session ORDER BY SessionID;
