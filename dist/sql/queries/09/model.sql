-- List member, session and workshop for each booking.
-- Fresh base y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT b.MemberID, m.DisplayName, s.SessionID, w.Title FROM Booking AS b INNER JOIN Member AS m ON m.MemberID = b.MemberID INNER JOIN Session AS s ON s.SessionID = b.SessionID INNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID ORDER BY s.SessionID, b.MemberID;
