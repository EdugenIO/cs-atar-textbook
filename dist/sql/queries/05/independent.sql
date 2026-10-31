-- From the stated dependencies, create Student(StudentID, StudentName), Club(ClubID, ClubName), Membership(StudentID, ClubID, JoinedOn). Use required TEXT fields, a composite Membership primary key and both foreign keys. JoinedOn stores ISO date text. Explain why names belong in the parent tables.
-- Fresh changed scratch database. Enable PRAGMA foreign_keys=ON before any BEGIN.
CREATE TABLE Student (StudentID TEXT PRIMARY KEY NOT NULL, StudentName TEXT NOT NULL);
CREATE TABLE Club (ClubID TEXT PRIMARY KEY NOT NULL, ClubName TEXT NOT NULL);
CREATE TABLE Membership (StudentID TEXT NOT NULL REFERENCES Student(StudentID), ClubID TEXT NOT NULL REFERENCES Club(ClubID), JoinedOn TEXT NOT NULL, PRIMARY KEY(StudentID, ClubID));
-- Verify:
SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;
SELECT name, type, pk FROM pragma_table_info('Membership') ORDER BY cid;
