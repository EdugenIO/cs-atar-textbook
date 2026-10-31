# SQL pathway - expected results and feedback

Public formative references, not secure assessment materials. Results are executed against fresh fixtures. Missing/unknown is represented by JSON null and the display marker NULL.


### Step 01 model

List every equipment identifier and description, ordered by identifier.

```sql

SELECT EquipmentID, EquipmentDescription FROM Equipment ORDER BY EquipmentID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "EquipmentID",
        "EquipmentDescription"
      ],
      "rows": [
        [
          "E01",
          "Camera"
        ],
        [
          "E02",
          "Tripod"
        ],
        [
          "E03",
          "Recorder"
        ],
        [
          "E04",
          "Camera"
        ],
        [
          "E05",
          "Microphone"
        ]
      ]
    }
  ]
}

### Step 01 guided

List borrower labels and identifiers, ordered by label descending.

```sql

SELECT BorrowerLabel, BorrowerID FROM Borrower ORDER BY BorrowerLabel DESC, BorrowerID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "BorrowerLabel",
        "BorrowerID"
      ],
      "rows": [
        [
          "Learner D",
          "B004"
        ],
        [
          "Learner C",
          "B003"
        ],
        [
          "Learner B",
          "B002"
        ],
        [
          "Learner A",
          "B001"
        ]
      ]
    }
  ]
}

### Step 01 independent

On the changed database, list distinct equipment descriptions in ascending order.

```sql

SELECT DISTINCT EquipmentDescription FROM Equipment ORDER BY EquipmentDescription;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "EquipmentDescription"
      ],
      "rows": [
        [
          "Camera"
        ],
        [
          "Microphone"
        ],
        [
          "Recorder"
        ],
        [
          "Sensor"
        ],
        [
          "Tripod"
        ]
      ]
    }
  ]
}

Feedback: Compare column order, row count and ordering separately. If descriptions repeat, decide whether the requirement asks for items or distinct descriptions.

### Step 02 model

Find outstanding loans due before 8 April 2026.

```sql

SELECT LoanID, DueDate FROM Loan WHERE Returned = 0 AND DueDate < '2026-04-08' ORDER BY DueDate, LoanID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "LoanID",
        "DueDate"
      ],
      "rows": [
        [
          "L001",
          "2026-04-06"
        ],
        [
          "L006",
          "2026-04-07"
        ]
      ]
    }
  ]
}

### Step 02 guided

List Camera equipment in either category C01 or C03; make grouping explicit.

```sql

SELECT EquipmentID FROM Equipment WHERE EquipmentDescription = 'Camera' AND (CategoryID = 'C01' OR CategoryID = 'C03') ORDER BY EquipmentID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "EquipmentID"
      ],
      "rows": [
        [
          "E01"
        ],
        [
          "E04"
        ]
      ]
    }
  ]
}

### Step 02 independent

On changed data, list outstanding loans due from 8 through 12 April inclusive, excluding B001. Also write a separate prefix search for descriptions beginning with S.

```sql

SELECT LoanID, BorrowerID, DueDate FROM Loan WHERE Returned = 0 AND DueDate BETWEEN '2026-04-08' AND '2026-04-12' AND NOT (BorrowerID = 'B001') ORDER BY DueDate, LoanID;
SELECT EquipmentID, EquipmentDescription FROM Equipment WHERE EquipmentDescription LIKE 'S%' ORDER BY EquipmentID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "LoanID",
        "BorrowerID",
        "DueDate"
      ],
      "rows": [
        [
          "L007",
          "B005",
          "2026-04-09"
        ],
        [
          "L004",
          "B003",
          "2026-04-10"
        ],
        [
          "L006",
          "B004",
          "2026-04-12"
        ]
      ]
    },
    {
      "columns": [
        "EquipmentID",
        "EquipmentDescription"
      ],
      "rows": [
        [
          "E06",
          "Sensor"
        ]
      ]
    }
  ]
}

Feedback: Check each Boolean component on a known included row and an excluded row. An empty result can be correct; inspect the data before changing the query.

### Step 03 model

List each loan with its borrower label.

```sql

SELECT Loan.LoanID, Borrower.BorrowerLabel FROM Loan INNER JOIN Borrower ON Loan.BorrowerID = Borrower.BorrowerID ORDER BY Loan.LoanID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "LoanID",
        "BorrowerLabel"
      ],
      "rows": [
        [
          "L001",
          "Learner A"
        ],
        [
          "L002",
          "Learner B"
        ],
        [
          "L003",
          "Learner A"
        ],
        [
          "L004",
          "Learner C"
        ],
        [
          "L005",
          "Learner B"
        ],
        [
          "L006",
          "Learner D"
        ]
      ]
    }
  ]
}

### Step 03 guided

List loan identifiers and equipment descriptions for returned loans.

```sql

SELECT Loan.LoanID, Equipment.EquipmentDescription FROM Loan INNER JOIN Equipment ON Loan.EquipmentID = Equipment.EquipmentID WHERE Loan.Returned = 1 ORDER BY Loan.LoanID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "LoanID",
        "EquipmentDescription"
      ],
      "rows": [
        [
          "L003",
          "Recorder"
        ],
        [
          "L005",
          "Tripod"
        ]
      ]
    }
  ]
}

### Step 03 independent

On changed data, list outstanding loans with borrower labels and due dates, ordered by due date then loan identifier.

```sql

SELECT Loan.LoanID, Borrower.BorrowerLabel, Loan.DueDate FROM Loan INNER JOIN Borrower ON Loan.BorrowerID = Borrower.BorrowerID WHERE Loan.Returned = 0 ORDER BY Loan.DueDate, Loan.LoanID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "LoanID",
        "BorrowerLabel",
        "DueDate"
      ],
      "rows": [
        [
          "L001",
          "Learner A",
          "2026-04-06"
        ],
        [
          "L007",
          "Learner E",
          "2026-04-09"
        ],
        [
          "L004",
          "Learner C",
          "2026-04-10"
        ],
        [
          "L006",
          "Learner D",
          "2026-04-12"
        ]
      ]
    }
  ]
}

Feedback: If the count suddenly multiplies, inspect ON and relationship cardinality. Add one table at a time and check the intermediate rows.

### Step 04 model

Summarise the fixed durations of five practice records.

```sql

SELECT COUNT(*) AS Records, SUM(Days) AS TotalDays, AVG(Days) AS MeanDays, MAX(Days) AS Longest, MIN(Days) AS Shortest FROM Duration;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "Records",
        "TotalDays",
        "MeanDays",
        "Longest",
        "Shortest"
      ],
      "rows": [
        [
          5,
          15,
          3.0,
          5,
          0
        ]
      ]
    }
  ]
}

### Step 04 guided

Apply all five aggregates only to records with Days at least 3.

```sql

SELECT COUNT(*) AS Records, SUM(Days) AS TotalDays, AVG(Days) AS MeanDays, MAX(Days) AS Longest, MIN(Days) AS Shortest FROM Duration WHERE Days >= 3;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "Records",
        "TotalDays",
        "MeanDays",
        "Longest",
        "Shortest"
      ],
      "rows": [
        [
          3,
          13,
          4.333333333333333,
          5,
          3
        ]
      ]
    }
  ]
}

### Step 04 independent

On changed durations, summarise only completed records with all five functions. Also predict the aggregate row for Days greater than 99.

```sql

SELECT COUNT(*) AS Records, SUM(Days) AS TotalDays, AVG(Days) AS MeanDays, MAX(Days) AS Longest, MIN(Days) AS Shortest FROM Duration WHERE Completed = 1;
SELECT COUNT(*) AS Records, SUM(Days) AS TotalDays, AVG(Days) AS MeanDays, MAX(Days) AS Longest, MIN(Days) AS Shortest FROM Duration WHERE Days > 99;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "Records",
        "TotalDays",
        "MeanDays",
        "Longest",
        "Shortest"
      ],
      "rows": [
        [
          3,
          12,
          4.0,
          7,
          1
        ]
      ]
    },
    {
      "columns": [
        "Records",
        "TotalDays",
        "MeanDays",
        "Longest",
        "Shortest"
      ],
      "rows": [
        [
          0,
          null,
          null,
          null,
          null
        ]
      ]
    }
  ]
}

Feedback: Write the actual input values beside the answer. If the mean is wrong, check the divisor and the filtered rows; do not average identifiers.

### Step 05 model

Model a three-table design for devices, skills and dated device-skill records. Inspect the junction key and foreign keys before the independent transfer.

```sql

CREATE TABLE Device (DeviceID TEXT PRIMARY KEY NOT NULL, Label TEXT NOT NULL);
CREATE TABLE Skill (SkillID TEXT PRIMARY KEY NOT NULL, SkillName TEXT NOT NULL);
CREATE TABLE DeviceSkill (DeviceID TEXT NOT NULL REFERENCES Device(DeviceID), SkillID TEXT NOT NULL REFERENCES Skill(SkillID), RecordedOn TEXT NOT NULL, PRIMARY KEY(DeviceID, SkillID));

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "name"
      ],
      "rows": [
        [
          "Device"
        ],
        [
          "DeviceSkill"
        ],
        [
          "Skill"
        ]
      ]
    },
    {
      "columns": [
        "name",
        "type",
        "pk"
      ],
      "rows": [
        [
          "DeviceID",
          "TEXT",
          1
        ],
        [
          "SkillID",
          "TEXT",
          2
        ],
        [
          "RecordedOn",
          "TEXT",
          0
        ]
      ]
    },
    {
      "columns": [
        "id",
        "seq",
        "table",
        "from",
        "to",
        "on_update",
        "on_delete",
        "match"
      ],
      "rows": [
        [
          0,
          0,
          "Skill",
          "SkillID",
          "SkillID",
          "NO ACTION",
          "NO ACTION",
          "NONE"
        ],
        [
          1,
          0,
          "Device",
          "DeviceID",
          "DeviceID",
          "NO ACTION",
          "NO ACTION",
          "NONE"
        ]
      ]
    }
  ]
}

### Step 05 guided

Create Room(RoomID required TEXT primary key, RoomName required TEXT) and Desk(DeskID required TEXT primary key, RoomID required TEXT referencing Room). Explain the one-to-many link.

```sql

CREATE TABLE Room (RoomID TEXT PRIMARY KEY NOT NULL, RoomName TEXT NOT NULL);
CREATE TABLE Desk (DeskID TEXT PRIMARY KEY NOT NULL, RoomID TEXT NOT NULL REFERENCES Room(RoomID));

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "name"
      ],
      "rows": [
        [
          "Desk"
        ],
        [
          "Room"
        ]
      ]
    },
    {
      "columns": [
        "id",
        "seq",
        "table",
        "from",
        "to",
        "on_update",
        "on_delete",
        "match"
      ],
      "rows": [
        [
          0,
          0,
          "Room",
          "RoomID",
          "RoomID",
          "NO ACTION",
          "NO ACTION",
          "NONE"
        ]
      ]
    }
  ]
}

### Step 05 independent

From the stated dependencies, create Student(StudentID, StudentName), Club(ClubID, ClubName), Membership(StudentID, ClubID, JoinedOn). Use required TEXT fields, a composite Membership primary key and both foreign keys. JoinedOn stores ISO date text. Explain why names belong in the parent tables.

```sql

CREATE TABLE Student (StudentID TEXT PRIMARY KEY NOT NULL, StudentName TEXT NOT NULL);
CREATE TABLE Club (ClubID TEXT PRIMARY KEY NOT NULL, ClubName TEXT NOT NULL);
CREATE TABLE Membership (StudentID TEXT NOT NULL REFERENCES Student(StudentID), ClubID TEXT NOT NULL REFERENCES Club(ClubID), JoinedOn TEXT NOT NULL, PRIMARY KEY(StudentID, ClubID));

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "name"
      ],
      "rows": [
        [
          "Club"
        ],
        [
          "Membership"
        ],
        [
          "Student"
        ]
      ]
    },
    {
      "columns": [
        "name",
        "type",
        "pk"
      ],
      "rows": [
        [
          "StudentID",
          "TEXT",
          1
        ],
        [
          "ClubID",
          "TEXT",
          2
        ],
        [
          "JoinedOn",
          "TEXT",
          0
        ]
      ]
    }
  ]
}

Feedback: Check the data dictionary against PRAGMA table_info and foreign_key_list. The three-table construction is independent learner work; downloading a supplied fixture does not replace it.

### Step 06 model

Add a new parent borrower to the equipment database.

```sql

INSERT INTO Borrower (BorrowerID, BorrowerLabel) VALUES ('B010','Practice member');

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "BorrowerID",
        "BorrowerLabel"
      ],
      "rows": [
        [
          "B010",
          "Practice member"
        ]
      ]
    }
  ]
}

### Step 06 guided

Try an orphan loan. Predict the error and check that no row was inserted.

```sql

INSERT INTO Loan VALUES ('L020','B999','E01','2026-04-14',0);

```

{
  "error": "FOREIGN KEY constraint failed",
  "results": [
    {
      "columns": [
        "MatchingRows"
      ],
      "rows": [
        [
          0
        ]
      ]
    }
  ]
}

### Step 06 independent

On changed data, insert B011 with label New member, then L021 for B011/E06 due 15 April 2026, not returned. In separate fresh copies, try a repeated B001 key and a NULL borrower label; explain both failures.

```sql

INSERT INTO Borrower (BorrowerID, BorrowerLabel) VALUES ('B011','New member');
INSERT INTO Loan VALUES ('L021','B011','E06','2026-04-15',0);

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "LoanID",
        "BorrowerID",
        "EquipmentID"
      ],
      "rows": [
        [
          "L021",
          "B011",
          "E06"
        ]
      ]
    }
  ]
}

Feedback: If the orphan insert succeeds, stop and check PRAGMA foreign_keys before BEGIN. For a duplicate key, inspect the existing record; do not invent a new ID without checking the requirement.

### Step 07 model

Mark L001 returned, delete only returned L005, and verify the changes plus an unchanged L002.

```sql

UPDATE Loan SET Returned = 1 WHERE LoanID = 'L001';
DELETE FROM Loan WHERE LoanID='L005' AND Returned=1;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "LoanID",
        "Returned"
      ],
      "rows": [
        [
          "L001",
          1
        ],
        [
          "L002",
          0
        ]
      ]
    },
    {
      "columns": [
        "RemovedLoanRows"
      ],
      "rows": [
        [
          0
        ]
      ]
    }
  ]
}

### Step 07 guided

Delete only returned loan L003; verify the borrower survives.

```sql

DELETE FROM Loan WHERE LoanID = 'L003' AND Returned = 1;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "LoanRows"
      ],
      "rows": [
        [
          0
        ]
      ]
    },
    {
      "columns": [
        "BorrowerID"
      ],
      "rows": [
        [
          "B001"
        ]
      ]
    }
  ]
}

### Step 07 independent

On changed data, move L007 due date to 16 April 2026, then delete only returned L005. Show both effects and an unchanged L004.

```sql

UPDATE Loan SET DueDate = '2026-04-16' WHERE LoanID = 'L007';
DELETE FROM Loan WHERE LoanID = 'L005' AND Returned = 1;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "LoanID",
        "DueDate"
      ],
      "rows": [
        [
          "L004",
          "2026-04-10"
        ],
        [
          "L007",
          "2026-04-16"
        ]
      ]
    },
    {
      "columns": [
        "RemovedLoanRows"
      ],
      "rows": [
        [
          0
        ]
      ]
    }
  ]
}

Feedback: A successful execution message is not evidence that the correct record changed. Compare expected and actual rows; restore a fresh copy after an unintended broad change.

### Step 08 model

Model a requirement-to-query explanation for a distinct category list.

```sql

SELECT DISTINCT CategoryID FROM Equipment ORDER BY CategoryID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "CategoryID"
      ],
      "rows": [
        [
          "C01"
        ],
        [
          "C02"
        ],
        [
          "C03"
        ]
      ]
    }
  ]
}

### Step 08 guided

Produce an equipment count, then explain whether it counts categories or items.

```sql

SELECT COUNT(*) AS EquipmentItems FROM Equipment;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "EquipmentItems"
      ],
      "rows": [
        [
          5
        ]
      ]
    }
  ]
}

### Step 08 independent

On changed data, produce a sorted report of outstanding LoanID and equipment description. Then count all outstanding loans. Explain the join key and what each output row represents. Separately repeat the three-table construction and controlled insert/update/delete tasks before including them in assessment.

```sql

SELECT Loan.LoanID, Equipment.EquipmentDescription FROM Loan INNER JOIN Equipment ON Loan.EquipmentID = Equipment.EquipmentID WHERE Loan.Returned = 0 ORDER BY Loan.LoanID;
SELECT COUNT(*) AS OutstandingLoans FROM Loan WHERE Returned = 0;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "LoanID",
        "EquipmentDescription"
      ],
      "rows": [
        [
          "L001",
          "Camera"
        ],
        [
          "L004",
          "Camera"
        ],
        [
          "L006",
          "Microphone"
        ],
        [
          "L007",
          "Sensor"
        ]
      ]
    },
    {
      "columns": [
        "OutstandingLoans"
      ],
      "rows": [
        [
          4
        ]
      ]
    }
  ]
}

Feedback: Use the operation checklist, not one correct report, to decide what is ready. If schema creation or any of the five aggregates has not been independently demonstrated, practise it before assessing it.

### Step 09 model

List member, session and workshop for each booking.

```sql

SELECT b.MemberID, m.DisplayName, s.SessionID, w.Title FROM Booking AS b INNER JOIN Member AS m ON m.MemberID = b.MemberID INNER JOIN Session AS s ON s.SessionID = b.SessionID INNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID ORDER BY s.SessionID, b.MemberID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "MemberID",
        "DisplayName",
        "SessionID",
        "Title"
      ],
      "rows": [
        [
          "M01",
          "Member A",
          "S01",
          "Python studio"
        ],
        [
          "M02",
          "Member B",
          "S01",
          "Python studio"
        ],
        [
          "M01",
          "Member A",
          "S02",
          "Python studio"
        ]
      ]
    }
  ]
}

### Step 09 guided

List bookings for Network design only.

```sql

SELECT b.MemberID, s.SessionID, w.Title FROM Booking AS b INNER JOIN Session AS s ON s.SessionID = b.SessionID INNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID WHERE w.Title = 'Network design' ORDER BY s.SessionID, b.MemberID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "MemberID",
        "SessionID",
        "Title"
      ],
      "rows": []
    }
  ]
}

### Step 09 independent

On changed data, report member display name, session date and workshop title for Network design bookings, sorted by session date then member ID.

```sql

SELECT m.DisplayName, s.SessionDate, w.Title FROM Booking AS b INNER JOIN Member AS m ON m.MemberID = b.MemberID INNER JOIN Session AS s ON s.SessionID = b.SessionID INNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID WHERE w.Title = 'Network design' ORDER BY s.SessionDate, b.MemberID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "DisplayName",
        "SessionDate",
        "Title"
      ],
      "rows": [
        [
          "Member C",
          "2026-11-03",
          "Network design"
        ]
      ]
    }
  ]
}

Feedback: Check one booking key through every table. If a member appears unexpectedly many times, inspect each intermediate join before adding DISTINCT to hide the issue.

### Step 10 model

Count bookings in sessions that have bookings.

```sql

SELECT SessionID, COUNT(*) AS Bookings FROM Booking GROUP BY SessionID ORDER BY SessionID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "SessionID",
        "Bookings"
      ],
      "rows": [
        [
          "S01",
          2
        ],
        [
          "S02",
          1
        ]
      ]
    }
  ]
}

### Step 10 guided

Compute count, sum, average, minimum and maximum capacity directly from Session.

```sql

SELECT COUNT(*) AS Sessions, SUM(Capacity) AS Places, AVG(Capacity) AS MeanCapacity, MIN(Capacity) AS Smallest, MAX(Capacity) AS Largest FROM Session;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "Sessions",
        "Places",
        "MeanCapacity",
        "Smallest",
        "Largest"
      ],
      "rows": [
        [
          3,
          7,
          2.3333333333333335,
          2,
          3
        ]
      ]
    }
  ]
}

### Step 10 independent

On changed data, group Session by WorkshopID and show session count and total capacity. Separately count bookings per MemberID; explain why those are different grains.

```sql

SELECT WorkshopID, COUNT(*) AS Sessions, SUM(Capacity) AS Places FROM Session GROUP BY WorkshopID ORDER BY WorkshopID;
SELECT MemberID, COUNT(*) AS Bookings FROM Booking GROUP BY MemberID ORDER BY MemberID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "WorkshopID",
        "Sessions",
        "Places"
      ],
      "rows": [
        [
          "W01",
          2,
          5
        ],
        [
          "W02",
          2,
          6
        ]
      ]
    },
    {
      "columns": [
        "MemberID",
        "Bookings"
      ],
      "rows": [
        [
          "M01",
          2
        ],
        [
          "M02",
          1
        ],
        [
          "M03",
          1
        ]
      ]
    }
  ]
}

Feedback: List the rows entering each group. Repair a join or choose the correct source grain before changing SUM to SUM(DISTINCT), which can incorrectly merge equal capacities.

### Step 11 model

Show a labelled session and half its capacity using a real divisor.

```sql

SELECT SessionID || ' / ' || SessionDate AS SessionLabel, ROUND(Capacity / 2.0, 1) AS HalfCapacity FROM Session ORDER BY SessionID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "SessionLabel",
        "HalfCapacity"
      ],
      "rows": [
        [
          "S01 / 2026-11-02",
          1.0
        ],
        [
          "S02 / 2026-11-09",
          1.5
        ],
        [
          "S03 / 2026-11-03",
          1.0
        ]
      ]
    }
  ]
}

### Step 11 guided

List a member label formed from MemberID, separator and DisplayName.

```sql

SELECT MemberID || ': ' || DisplayName AS MemberLabel FROM Member ORDER BY MemberID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "MemberLabel"
      ],
      "rows": [
        [
          "M01: Member A"
        ],
        [
          "M02: Member B"
        ],
        [
          "M03: Member C"
        ]
      ]
    }
  ]
}

### Step 11 independent

On changed data, show SessionID as Code, Capacity times 15.0 as BudgetDollars, and SessionID plus date separated by @ as SessionLabel. Name all calculated and concatenated fields. Then report only booked sessions: SessionID, remaining places (capacity minus bookings), fill percentage rounded to one decimal, and a concatenated session/workshop label. Use INNER JOIN and GROUP BY, and explain why unbooked S04 is omitted.

```sql

SELECT SessionID AS Code, Capacity * 15.0 AS BudgetDollars, SessionID || ' @ ' || SessionDate AS SessionLabel FROM Session ORDER BY SessionID;
SELECT s.SessionID, s.Capacity - COUNT(b.MemberID) AS RemainingPlaces, ROUND(100.0 * COUNT(b.MemberID) / s.Capacity, 1) AS FillPercent, s.SessionID || ' / ' || w.Title AS SessionLabel FROM Session AS s INNER JOIN Booking AS b ON b.SessionID = s.SessionID INNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID GROUP BY s.SessionID, s.Capacity, w.Title ORDER BY s.SessionID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "Code",
        "BudgetDollars",
        "SessionLabel"
      ],
      "rows": [
        [
          "S01",
          30.0,
          "S01 @ 2026-11-02"
        ],
        [
          "S02",
          45.0,
          "S02 @ 2026-11-09"
        ],
        [
          "S03",
          30.0,
          "S03 @ 2026-11-03"
        ],
        [
          "S04",
          60.0,
          "S04 @ 2026-11-10"
        ]
      ]
    },
    {
      "columns": [
        "SessionID",
        "RemainingPlaces",
        "FillPercent",
        "SessionLabel"
      ],
      "rows": [
        [
          "S01",
          0,
          100.0,
          "S01 / Python studio"
        ],
        [
          "S02",
          2,
          33.3,
          "S02 / Python studio"
        ],
        [
          "S03",
          1,
          50.0,
          "S03 / Network design"
        ]
      ]
    }
  ]
}

Feedback: If a fraction becomes zero, inspect numeric types and integer division. If concatenation becomes NULL, inspect missing operands before replacing them with an invented value.

### Step 12 model

Trim and normalise a supplied staging row; this is a proposed clean result, not automatic proof of identity. Row 4 has been verified as M09 / Eli; import only that row into Member after normalisation.

```sql

SELECT upper(trim(MemberID)) AS ProposedID, trim(DisplayName) AS ProposedName FROM Staging ORDER BY RowNo;
INSERT INTO Member (MemberID, DisplayName) SELECT upper(trim(MemberID)), trim(DisplayName) FROM Staging WHERE RowNo = 4;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "ProposedID",
        "ProposedName"
      ],
      "rows": [
        [
          "M04",
          "Dana"
        ],
        [
          "M04",
          "Different name"
        ],
        [
          "M08",
          ""
        ],
        [
          "M09",
          "Eli"
        ]
      ]
    },
    {
      "columns": [
        "MemberID",
        "DisplayName"
      ],
      "rows": [
        [
          "M09",
          "Eli"
        ]
      ]
    }
  ]
}

### Step 12 guided

Detect duplicate proposed identifiers before importing.

```sql

SELECT upper(trim(MemberID)) AS ProposedID, COUNT(*) AS Records FROM Staging GROUP BY upper(trim(MemberID)) ORDER BY ProposedID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "ProposedID",
        "Records"
      ],
      "rows": [
        [
          "M04",
          2
        ],
        [
          "M08",
          1
        ],
        [
          "M09",
          1
        ]
      ]
    }
  ]
}

### Step 12 independent

On changed staging data, identify valid-looking rows, blank names and duplicate proposed IDs. Preserve raw rows and write a retain/quarantine reason for each before any INSERT. Produce a report of non-blank proposed names only. Row 4 has now been verified as M07 / Gia. Import only that reviewed row into Member using an explicit column mapping and verify the stored row.

```sql

SELECT RowNo, upper(trim(MemberID)) AS ProposedID, trim(DisplayName) AS ProposedName FROM Staging WHERE trim(DisplayName) <> '' ORDER BY RowNo;
INSERT INTO Member (MemberID, DisplayName) SELECT upper(trim(MemberID)), trim(DisplayName) FROM Staging WHERE RowNo = 4;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "RowNo",
        "ProposedID",
        "ProposedName"
      ],
      "rows": [
        [
          1,
          "M05",
          "Faye"
        ],
        [
          2,
          "M05",
          "Conflicting person"
        ],
        [
          4,
          "M07",
          "Gia"
        ]
      ]
    },
    {
      "columns": [
        "MemberID",
        "DisplayName"
      ],
      "rows": [
        [
          "M07",
          "Gia"
        ]
      ]
    }
  ]
}

Feedback: A duplicate report does not decide which person is correct. For changed rows, quarantine both M05 candidates pending verification, quarantine the blank M06 name, and retain M07 provisionally after source verification. Do not claim SQL has established authenticity.

### Step 13 model

Create Scratch, add Notes, inspect the fields, then drop only this scratch table and verify its absence.

```sql

CREATE TABLE Scratch (ID INTEGER PRIMARY KEY, Label TEXT NOT NULL);
ALTER TABLE Scratch ADD COLUMN Notes TEXT;
SELECT name, type FROM pragma_table_info('Scratch') ORDER BY cid;
DROP TABLE Scratch;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "name",
        "type"
      ],
      "rows": [
        [
          "ID",
          "INTEGER"
        ],
        [
          "Label",
          "TEXT"
        ],
        [
          "Notes",
          "TEXT"
        ]
      ]
    },
    {
      "columns": [
        "name"
      ],
      "rows": []
    }
  ]
}

### Step 13 guided

Rename a field, then verify the new name.

```sql

CREATE TABLE Scratch (ID INTEGER PRIMARY KEY, OldLabel TEXT);
ALTER TABLE Scratch RENAME COLUMN OldLabel TO Label;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "name"
      ],
      "rows": [
        [
          "ID"
        ],
        [
          "Label"
        ]
      ]
    }
  ]
}

### Step 13 independent

Create Trial(ID INTEGER PRIMARY KEY, Label TEXT NOT NULL), insert one row, add Notes TEXT, inspect it, then DROP only Trial. Verify that the table no longer exists. Explain DROP versus DELETE.

```sql

CREATE TABLE Trial (ID INTEGER PRIMARY KEY, Label TEXT NOT NULL);
INSERT INTO Trial VALUES (1,'Sample');
ALTER TABLE Trial ADD COLUMN Notes TEXT;
DROP TABLE Trial;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "name"
      ],
      "rows": []
    }
  ]
}

Feedback: For a syntax error near MODIFY, use the supported ALTER syntax. Do not retry DROP against a real project database; open a new scratch file.

### Step 14 model

Remove booking M01/S01 and inspect remaining booking and attendance keys.

```sql

DELETE FROM Booking WHERE MemberID = 'M01' AND SessionID = 'S01';

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "MemberID",
        "SessionID"
      ],
      "rows": [
        [
          "M02",
          "S01"
        ],
        [
          "M01",
          "S02"
        ]
      ]
    },
    {
      "columns": [
        "MemberID",
        "SessionID"
      ],
      "rows": [
        [
          "M02",
          "S01"
        ]
      ]
    }
  ]
}

### Step 14 guided

Try to add attendance for a non-existent M03/S02 booking.

```sql

INSERT INTO Attendance VALUES ('M03','S02',1);

```

{
  "error": "FOREIGN KEY constraint failed",
  "results": [
    {
      "columns": [
        "AttendanceRows"
      ],
      "rows": [
        [
          0
        ]
      ]
    }
  ]
}

### Step 14 independent

On changed data, delete only M01/S02. Verify that its attendance disappears, M01/S01 remains and Member M01 survives.

```sql

DELETE FROM Booking WHERE MemberID = 'M01' AND SessionID = 'S02';

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "MemberID",
        "SessionID"
      ],
      "rows": [
        [
          "M01",
          "S01"
        ],
        [
          "M02",
          "S01"
        ]
      ]
    },
    {
      "columns": [
        "MemberID"
      ],
      "rows": [
        [
          "M01"
        ]
      ]
    },
    {
      "columns": [
        "MemberID",
        "SessionID"
      ],
      "rows": [
        [
          "M01",
          "S01"
        ]
      ]
    }
  ]
}

Feedback: If unrelated attendance disappears, check both WHERE fields. If the dependent record survives, check enforcement and the actual declared foreign key action.

### Step 15 model

Demonstrate positive integer capacity and a trimmed label length of 1..60 on one practice table.

```sql

CREATE TABLE Sample (ID INTEGER PRIMARY KEY, Capacity INTEGER NOT NULL CHECK(typeof(Capacity)='integer' AND Capacity > 0), Label TEXT NOT NULL CHECK(length(trim(Label)) BETWEEN 1 AND 60));

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "name",
        "type"
      ],
      "rows": [
        [
          "ID",
          "INTEGER"
        ],
        [
          "Capacity",
          "INTEGER"
        ],
        [
          "Label",
          "TEXT"
        ]
      ]
    }
  ]
}

### Step 15 guided

Try a negative capacity against that rule.

```sql

CREATE TABLE Sample (ID INTEGER PRIMARY KEY, Capacity INTEGER NOT NULL CHECK(typeof(Capacity)='integer' AND Capacity > 0));
INSERT INTO Sample VALUES (1,-1);

```

{
  "error": "CHECK constraint failed: typeof(Capacity)='integer' AND Capacity > 0",
  "results": [
    {
      "columns": [
        "AcceptedRows"
      ],
      "rows": [
        [
          0
        ]
      ]
    }
  ]
}

### Step 15 independent

Build all six tables from dictionary.md, then insert parent records before child records using the supplied seed rows. Test duplicate Booking keys, orphan Attendance and invalid Capacity in separate copies. Compare your schema and stored rows against the reference only after your attempt.

```sql

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


```

{
  "error": null,
  "results": [
    {
      "columns": [
        "name"
      ],
      "rows": [
        [
          "Attendance"
        ],
        [
          "Booking"
        ],
        [
          "Instructor"
        ],
        [
          "Member"
        ],
        [
          "Session"
        ],
        [
          "Workshop"
        ]
      ]
    },
    {
      "columns": [
        "Bookings"
      ],
      "rows": [
        [
          3
        ]
      ]
    }
  ]
}

Feedback: Retain your authored schema and constraint-failure evidence. Matching table names alone is insufficient: check data types, nullability, primary/foreign keys, checks and cascade behaviour.

### Step 16 model

Model a grouped capacity report at workshop grain.

```sql

SELECT WorkshopID, SUM(Capacity) AS Places FROM Session GROUP BY WorkshopID ORDER BY WorkshopID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "WorkshopID",
        "Places"
      ],
      "rows": [
        [
          "W01",
          5
        ],
        [
          "W02",
          2
        ]
      ]
    }
  ]
}

### Step 16 guided

Produce a concatenated session/date label, with a meaningful alias.

```sql

SELECT SessionID || ' / ' || SessionDate AS SessionLabel FROM Session ORDER BY SessionID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "SessionLabel"
      ],
      "rows": [
        [
          "S01 / 2026-11-02"
        ],
        [
          "S02 / 2026-11-09"
        ],
        [
          "S03 / 2026-11-03"
        ]
      ]
    }
  ]
}

### Step 16 independent

On changed data, join Member, Booking, Session and Workshop to list member name, session ID and workshop title. Then group bookings by session and produce an aliased booking count. Explain why the report does not include sessions with no bookings. In a fresh changed copy, add M22 (Rehearsal member), update S04 capacity to 6, then delete only M22. Verify the member is gone and S04 changed.

```sql

SELECT m.DisplayName, s.SessionID, w.Title FROM Booking AS b INNER JOIN Member AS m ON m.MemberID = b.MemberID INNER JOIN Session AS s ON s.SessionID = b.SessionID INNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID ORDER BY s.SessionID, b.MemberID;
SELECT SessionID, COUNT(*) AS BookingCount FROM Booking GROUP BY SessionID ORDER BY SessionID;
INSERT INTO Member VALUES ('M22','Rehearsal member');
UPDATE Session SET Capacity=6 WHERE SessionID='S04';
DELETE FROM Member WHERE MemberID='M22';

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "DisplayName",
        "SessionID",
        "Title"
      ],
      "rows": [
        [
          "Member A",
          "S01",
          "Python studio"
        ],
        [
          "Member B",
          "S01",
          "Python studio"
        ],
        [
          "Member A",
          "S02",
          "Python studio"
        ],
        [
          "Member C",
          "S03",
          "Network design"
        ]
      ]
    },
    {
      "columns": [
        "SessionID",
        "BookingCount"
      ],
      "rows": [
        [
          "S01",
          2
        ],
        [
          "S02",
          1
        ],
        [
          "S03",
          1
        ]
      ]
    },
    {
      "columns": [
        "TrialMembers"
      ],
      "rows": [
        [
          0
        ]
      ]
    },
    {
      "columns": [
        "SessionID",
        "Capacity"
      ],
      "rows": [
        [
          "S04",
          6
        ]
      ]
    }
  ]
}

Feedback: Complete separate demonstrated evidence for calculated fields, import decisions, structure changes and cascading deletes. A correct joined report alone does not establish readiness for every operation.

### Step 17 model

Include sessions with no bookings and count real booking keys.

```sql

SELECT s.SessionID, COUNT(b.MemberID) AS Bookings FROM Session AS s LEFT JOIN Booking AS b ON b.SessionID = s.SessionID GROUP BY s.SessionID ORDER BY s.SessionID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "SessionID",
        "Bookings"
      ],
      "rows": [
        [
          "S01",
          2
        ],
        [
          "S02",
          1
        ],
        [
          "S03",
          0
        ]
      ]
    }
  ]
}

### Step 17 guided

Find sessions with no booking match.

```sql

SELECT s.SessionID FROM Session AS s LEFT JOIN Booking AS b ON b.SessionID = s.SessionID WHERE b.MemberID IS NULL ORDER BY s.SessionID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "SessionID"
      ],
      "rows": [
        [
          "S03"
        ]
      ]
    }
  ]
}

### Step 17 independent

On changed data, include every session, count real booking keys and return only groups with fewer than two bookings.

```sql

SELECT s.SessionID, COUNT(b.MemberID) AS Bookings FROM Session AS s LEFT JOIN Booking AS b ON b.SessionID = s.SessionID GROUP BY s.SessionID HAVING COUNT(b.MemberID) < 2 ORDER BY s.SessionID;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "SessionID",
        "Bookings"
      ],
      "rows": [
        [
          "S02",
          1
        ],
        [
          "S03",
          1
        ],
        [
          "S04",
          0
        ]
      ]
    }
  ]
}

Feedback: A zero-booking session still produces a preserved join row. If it shows count one, check COUNT(*) versus COUNT(b.MemberID). Never turn unknown attendance into confirmed absence without a rule.

### Step 18 model

Change capacity inside a transaction, then cancel it.

```sql

BEGIN;
UPDATE Session SET Capacity = 8 WHERE SessionID = 'S01';
ROLLBACK;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "SessionID",
        "Capacity"
      ],
      "rows": [
        [
          "S01",
          2
        ]
      ]
    }
  ]
}

### Step 18 guided

Insert a practice member, commit it and verify the saved row.

```sql

BEGIN;
INSERT INTO Member VALUES ('M20','Transaction member');
COMMIT;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "MemberID",
        "DisplayName"
      ],
      "rows": [
        [
          "M20",
          "Transaction member"
        ]
      ]
    }
  ]
}

### Step 18 independent

On changed data, insert M21, insert its S04 booking, then roll back both. Verify neither remains. Explain the before/inside/after state and retain evidence from inside the transaction as well.

```sql

BEGIN;
INSERT INTO Member VALUES ('M21','Trial member');
INSERT INTO Booking VALUES ('M21','S04','2026-10-20');
ROLLBACK;

```

{
  "error": null,
  "results": [
    {
      "columns": [
        "Members"
      ],
      "rows": [
        [
          0
        ]
      ]
    },
    {
      "columns": [
        "Bookings"
      ],
      "rows": [
        [
          0
        ]
      ]
    }
  ]
}

Feedback: If a row is still present, check whether a previous COMMIT occurred or whether you inspected a different file. Repeat on a new copy and record the transaction boundary.
