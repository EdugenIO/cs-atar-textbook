PRAGMA foreign_keys = ON;
CREATE TABLE Instructor (
 InstructorID TEXT NOT NULL PRIMARY KEY,
 DisplayName TEXT NOT NULL CHECK(length(trim(DisplayName)) BETWEEN 1 AND 60)
);
CREATE TABLE Workshop (
 WorkshopID TEXT NOT NULL PRIMARY KEY,
 Title TEXT NOT NULL CHECK(length(trim(Title)) BETWEEN 1 AND 80)
);
CREATE TABLE Session (
 SessionID TEXT NOT NULL PRIMARY KEY,
 WorkshopID TEXT NOT NULL REFERENCES Workshop(WorkshopID),
 InstructorID TEXT NOT NULL REFERENCES Instructor(InstructorID),
 SessionDate TEXT NOT NULL,
 Capacity INTEGER NOT NULL CHECK(typeof(Capacity)='integer' AND Capacity > 0)
);
CREATE TABLE Member (
 MemberID TEXT NOT NULL PRIMARY KEY,
 DisplayName TEXT NOT NULL CHECK(length(trim(DisplayName)) BETWEEN 1 AND 60)
);
CREATE TABLE Booking (
 MemberID TEXT NOT NULL REFERENCES Member(MemberID),
 SessionID TEXT NOT NULL REFERENCES Session(SessionID),
 BookedOn TEXT NOT NULL,
 PRIMARY KEY(MemberID, SessionID)
);
CREATE TABLE Attendance (
 MemberID TEXT NOT NULL,
 SessionID TEXT NOT NULL,
 Present INTEGER NOT NULL CHECK(typeof(Present)='integer' AND Present IN (0,1)),
 PRIMARY KEY(MemberID, SessionID),
 FOREIGN KEY(MemberID, SessionID) REFERENCES Booking(MemberID, SessionID)
 ON DELETE CASCADE
);
INSERT INTO Instructor VALUES ('I01','Guide A'),('I02','Guide B');
INSERT INTO Workshop VALUES ('W01','Python studio'),('W02','Network design');
INSERT INTO Session VALUES ('S01','W01','I01','2026-11-02',2),
 ('S02','W01','I02','2026-11-09',3),('S03','W02','I01','2026-11-03',2);
INSERT INTO Member VALUES ('M01','Member A'),('M02','Member B'),('M03','Member C');
INSERT INTO Booking VALUES ('M01','S01','2026-10-14'),('M02','S01','2026-10-14'),
 ('M01','S02','2026-10-14');
INSERT INTO Attendance VALUES ('M01','S01',1),('M02','S01',0);
INSERT INTO Member VALUES ('M04','Member D');
INSERT INTO Booking VALUES ('M03','S03','2026-10-15');
INSERT INTO Attendance VALUES ('M01','S02',0);
INSERT INTO Session VALUES ('S04','W02','I02','2026-11-10',4);
