CREATE TABLE Staging (RowNo INTEGER PRIMARY KEY, MemberID TEXT NOT NULL, DisplayName TEXT NOT NULL);
INSERT INTO Staging VALUES (1,' m04 ',' Dana '),(2,'M04','Different name'),(3,'M08',' '),(4,'M09',' Eli ');
CREATE TABLE Member (MemberID TEXT PRIMARY KEY NOT NULL, DisplayName TEXT NOT NULL CHECK(length(trim(DisplayName)) > 0));
