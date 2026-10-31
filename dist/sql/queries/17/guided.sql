-- Find sessions with no booking match.
-- Fresh base y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT s.SessionID FROM Session AS s LEFT JOIN Booking AS b ON b.SessionID = s.SessionID WHERE b.MemberID IS NULL ORDER BY s.SessionID;
