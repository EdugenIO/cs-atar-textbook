-- List bookings for Network design only.
-- Fresh base y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT b.MemberID, s.SessionID, w.Title FROM Booking AS b INNER JOIN Session AS s ON s.SessionID = b.SessionID INNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID WHERE w.Title = 'Network design' ORDER BY s.SessionID, b.MemberID;
