-- On changed data, report member display name, session date and workshop title for Network design bookings, sorted by session date then member ID.
-- Fresh changed y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT m.DisplayName, s.SessionDate, w.Title FROM Booking AS b INNER JOIN Member AS m ON m.MemberID = b.MemberID INNER JOIN Session AS s ON s.SessionID = b.SessionID INNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID WHERE w.Title = 'Network design' ORDER BY s.SessionDate, b.MemberID;
