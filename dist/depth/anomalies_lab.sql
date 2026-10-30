-- Fresh disposable SQLite database. Fixture dependencies are explicitly stated.
PRAGMA foreign_keys = ON;
CREATE TABLE FlatMembership (
    StudentID TEXT, StudentName TEXT, ClubID TEXT, ClubName TEXT,
    CoachID TEXT, CoachPhone TEXT,
    PRIMARY KEY (StudentID, ClubID)
);
INSERT INTO FlatMembership VALUES
('S1', 'Ari', 'C1', 'Robotics', 'T1', '200'),
('S2', 'Bo', 'C1', 'Robotics', 'T1', '200'),
('S1', 'Ari', 'C2', 'Film', 'T2', '201');
CREATE TABLE Student (StudentID TEXT PRIMARY KEY, StudentName TEXT NOT NULL);
CREATE TABLE Coach (CoachID TEXT PRIMARY KEY, CoachPhone TEXT NOT NULL);
CREATE TABLE Club (
    ClubID TEXT PRIMARY KEY, ClubName TEXT NOT NULL,
    CoachID TEXT NOT NULL REFERENCES Coach(CoachID)
);
CREATE TABLE Membership (
    StudentID TEXT NOT NULL REFERENCES Student(StudentID),
    ClubID TEXT NOT NULL REFERENCES Club(ClubID),
    PRIMARY KEY (StudentID, ClubID)
);
-- DISTINCT copies known-consistent fixture facts; it does not resolve conflicts.
INSERT INTO Student SELECT DISTINCT StudentID, StudentName FROM FlatMembership;
INSERT INTO Coach SELECT DISTINCT CoachID, CoachPhone FROM FlatMembership;
INSERT INTO Club SELECT DISTINCT ClubID, ClubName, CoachID FROM FlatMembership;
INSERT INTO Membership SELECT StudentID, ClubID FROM FlatMembership;
-- Capture a reconstruction before the independent modification activities.
CREATE TABLE ReconstructedBefore AS
SELECT s.StudentID, s.StudentName, c.ClubID, c.ClubName, t.CoachID, t.CoachPhone
FROM Membership AS m
JOIN Student AS s ON s.StudentID = m.StudentID
JOIN Club AS c ON c.ClubID = m.ClubID
JOIN Coach AS t ON t.CoachID = c.CoachID;
UPDATE Coach SET CoachPhone = '299' WHERE CoachID = 'T1';
INSERT INTO Club VALUES ('C3', 'Coding', 'T1');
DELETE FROM Membership WHERE StudentID = 'S1' AND ClubID = 'C2';
SELECT ClubID, ClubName FROM Club ORDER BY ClubID;
