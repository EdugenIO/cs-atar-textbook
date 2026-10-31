-- On changed data, group Session by WorkshopID and show session count and total capacity. Separately count bookings per MemberID; explain why those are different grains.
-- Fresh changed y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT WorkshopID, COUNT(*) AS Sessions, SUM(Capacity) AS Places FROM Session GROUP BY WorkshopID ORDER BY WorkshopID;
SELECT MemberID, COUNT(*) AS Bookings FROM Booking GROUP BY MemberID ORDER BY MemberID;
