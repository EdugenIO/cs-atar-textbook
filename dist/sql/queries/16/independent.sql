-- On changed data, join Member, Booking, Session and Workshop to list member name, session ID and workshop title. Then group bookings by session and produce an aliased booking count. Explain why the report does not include sessions with no bookings. In a fresh changed copy, add M22 (Rehearsal member), update S04 capacity to 6, then delete only M22. Verify the member is gone and S04 changed.
-- Fresh changed y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT m.DisplayName, s.SessionID, w.Title FROM Booking AS b INNER JOIN Member AS m ON m.MemberID = b.MemberID INNER JOIN Session AS s ON s.SessionID = b.SessionID INNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID ORDER BY s.SessionID, b.MemberID;
SELECT SessionID, COUNT(*) AS BookingCount FROM Booking GROUP BY SessionID ORDER BY SessionID;
INSERT INTO Member VALUES ('M22','Rehearsal member');
UPDATE Session SET Capacity=6 WHERE SessionID='S04';
DELETE FROM Member WHERE MemberID='M22';
-- Verify:
SELECT COUNT(*) AS TrialMembers FROM Member WHERE MemberID='M22';
SELECT SessionID, Capacity FROM Session WHERE SessionID='S04';
