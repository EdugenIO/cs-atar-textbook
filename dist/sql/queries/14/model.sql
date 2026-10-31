-- Remove booking M01/S01 and inspect remaining booking and attendance keys.
-- Fresh base y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
DELETE FROM Booking WHERE MemberID = 'M01' AND SessionID = 'S01';
-- Verify:
SELECT MemberID, SessionID FROM Booking ORDER BY SessionID, MemberID;
SELECT MemberID, SessionID FROM Attendance ORDER BY SessionID, MemberID;
