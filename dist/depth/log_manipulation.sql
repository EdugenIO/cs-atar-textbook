-- Use a fresh disposable SQLite database. This is the worked cleaned fixture,
-- not proof that unresolved raw rows can be ignored for every reporting purpose.
CREATE TABLE EventLog (
    EventID TEXT PRIMARY KEY, Timestamp TEXT NOT NULL, Host TEXT NOT NULL,
    Status INTEGER NOT NULL, DurationMS INTEGER NOT NULL CHECK(DurationMS >= 0),
    Source TEXT NOT NULL
);
INSERT INTO EventLog VALUES ('L001', '2027-02-01T09:00:00Z', 'LAB1', 200, 15, 'S1');
INSERT INTO EventLog VALUES ('L002', '2027-02-01T09:01:00Z', 'LAB1', 200, 20, 'S1');
INSERT INTO EventLog VALUES ('L003', '2027-02-01T09:02:00Z', 'LAB2', 404, 8, 'S1');
INSERT INTO EventLog VALUES ('L007', '2027-02-01T09:05:00Z', 'LAB2', 200, 9999, 'S1');
INSERT INTO EventLog VALUES ('L010', '2027-02-01T09:08:00Z', 'LAB3', 200, 0, 'S1');
INSERT INTO EventLog VALUES ('L011', '2027-02-01T09:09:00Z', 'LAB3', 403, 4, 'S1');
SELECT EventID, Status FROM EventLog WHERE Status <> 200 ORDER BY EventID;
SELECT Host, COUNT(*) AS Events, SUM(DurationMS) AS TotalMS
FROM EventLog GROUP BY Host ORDER BY Host;
SELECT COUNT(*) AS Events, SUM(DurationMS) AS TotalMS FROM EventLog;
