-- Include sessions with no bookings and count real booking keys.
-- Fresh base y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT s.SessionID, COUNT(b.MemberID) AS Bookings FROM Session AS s LEFT JOIN Booking AS b ON b.SessionID = s.SessionID GROUP BY s.SessionID ORDER BY s.SessionID;
