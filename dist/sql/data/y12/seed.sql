INSERT INTO Instructor VALUES ('I01','Guide A'),('I02','Guide B');
INSERT INTO Workshop VALUES ('W01','Python studio'),('W02','Network design');
INSERT INTO Session VALUES ('S01','W01','I01','2026-11-02',2),
 ('S02','W01','I02','2026-11-09',3),('S03','W02','I01','2026-11-03',2);
INSERT INTO Member VALUES ('M01','Member A'),('M02','Member B'),('M03','Member C');
INSERT INTO Booking VALUES ('M01','S01','2026-10-14'),('M02','S01','2026-10-14'),
 ('M01','S02','2026-10-14');
INSERT INTO Attendance VALUES ('M01','S01',1),('M02','S01',0);
