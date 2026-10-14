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
INSERT INTO Instructor VALUES ('I01','Guide A'),('I02','Guide B'),('I03','Guide C');
INSERT INTO Workshop VALUES ('W01','Python studio'),('W02','Network design'),('W03','Secure practice');
INSERT INTO Session VALUES ('S01','W01','I01','2026-11-02',3),('S02','W01','I02','2026-11-09',2),
 ('S03','W02','I01','2026-11-03',2),('S04','W03','I03','2026-11-10',4),('S05','W02','I02','2026-11-11',2);
INSERT INTO Member VALUES ('M01','Member A'),('M02','Member B'),('M03','Member C'),('M04','Member D'),('M05','Member E');
INSERT INTO Booking VALUES ('M01','S01','2026-10-14'),('M02','S01','2026-10-14'),('M03','S01','2026-10-14'),
 ('M01','S02','2026-10-14'),('M04','S03','2026-10-14'),('M05','S03','2026-10-14'),('M04','S05','2026-10-14');
INSERT INTO Attendance VALUES ('M01','S01',1),('M02','S01',0),('M03','S01',1),('M04','S03',1),('M05','S03',0);
