-- Try to add attendance for a non-existent M03/S02 booking.
-- Fresh base y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
INSERT INTO Attendance VALUES ('M03','S02',1);
-- Verify:
SELECT COUNT(*) AS AttendanceRows FROM Attendance WHERE MemberID = 'M03' AND SessionID = 'S02';
