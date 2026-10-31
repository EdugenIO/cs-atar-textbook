-- Produce a concatenated session/date label, with a meaningful alias.
-- Fresh base y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT SessionID || ' / ' || SessionDate AS SessionLabel FROM Session ORDER BY SessionID;
