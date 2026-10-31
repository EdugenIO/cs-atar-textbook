-- On changed data, delete only M01/S02. Verify that its attendance disappears, M01/S01 remains and Member M01 survives.
-- Fresh changed y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
DELETE FROM Booking WHERE MemberID = 'M01' AND SessionID = 'S02';
-- Verify:
SELECT MemberID, SessionID FROM Attendance ORDER BY SessionID, MemberID;
SELECT MemberID FROM Member WHERE MemberID = 'M01';
SELECT MemberID, SessionID FROM Booking WHERE MemberID = 'M01' ORDER BY SessionID;
