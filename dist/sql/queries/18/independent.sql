-- On changed data, insert M21, insert its S04 booking, then roll back both. Verify neither remains. Explain the before/inside/after state and retain evidence from inside the transaction as well.
-- Fresh changed y12 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
BEGIN;
INSERT INTO Member VALUES ('M21','Trial member');
INSERT INTO Booking VALUES ('M21','S04','2026-10-20');
ROLLBACK;
-- Verify:
SELECT COUNT(*) AS Members FROM Member WHERE MemberID = 'M21';
SELECT COUNT(*) AS Bookings FROM Booking WHERE MemberID = 'M21';
