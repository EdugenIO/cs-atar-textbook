-- On changed data, include every session, count real booking keys and return only groups with fewer than two bookings.
-- Fresh changed y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT s.SessionID, COUNT(b.MemberID) AS Bookings FROM Session AS s LEFT JOIN Booking AS b ON b.SessionID = s.SessionID GROUP BY s.SessionID HAVING COUNT(b.MemberID) < 2 ORDER BY s.SessionID;
