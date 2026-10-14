-- Run only in a fresh disposable copy of the design database.
-- Predict each operation; this lab ends with ROLLBACK, preserving starting data/schema.
BEGIN;
CREATE TABLE ScratchNote (NoteID INTEGER PRIMARY KEY, NoteText TEXT NOT NULL);
INSERT INTO ScratchNote VALUES (1,'temporary lab');
ALTER TABLE Member ADD COLUMN Notes TEXT;
UPDATE Member SET Notes='reviewed synthetic record' WHERE MemberID='M03';
SELECT MemberID,Notes FROM Member ORDER BY MemberID;
DELETE FROM Booking WHERE MemberID='M01' AND SessionID='S01';
SELECT * FROM Attendance ORDER BY SessionID,MemberID;
DROP TABLE ScratchNote;
ROLLBACK;
-- Member has no Notes column again; original booking/attendance remain.
