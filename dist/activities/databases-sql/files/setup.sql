PRAGMA foreign_keys = ON;
CREATE TABLE Member (
 member_id INTEGER PRIMARY KEY,
 name TEXT NOT NULL
);
CREATE TABLE Loan (
 loan_id INTEGER PRIMARY KEY,
 member_id INTEGER NOT NULL REFERENCES Member(member_id),
 item TEXT NOT NULL,
 days INTEGER NOT NULL CHECK(days >= 0),
 returned INTEGER NOT NULL CHECK(returned IN (0,1))
);
INSERT INTO Member VALUES (1,'Ari'),(2,'Bo'),(3,'Cleo');
INSERT INTO Loan VALUES
 (101,1,'Camera',3,1),
 (102,1,'Headset',5,0),
 (103,2,'Camera',2,1),
 (104,2,'Tripod',5,0);
