-- Count bookings in sessions that have bookings.
-- Fresh base y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT SessionID, COUNT(*) AS Bookings FROM Booking GROUP BY SessionID ORDER BY SessionID;
