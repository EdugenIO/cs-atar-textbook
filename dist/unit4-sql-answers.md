# Teacher SQL guide — separate, not access-protected
Original draft.

Q1 Four-table booking report
```sql
SELECT b.MemberID, m.DisplayName, s.SessionID, w.Title, s.SessionDate
FROM Booking AS b
INNER JOIN Member AS m ON m.MemberID = b.MemberID
INNER JOIN Session AS s ON s.SessionID = b.SessionID
INNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID
ORDER BY s.SessionID, b.MemberID;
```
Expected original rows:
```json
[["M01", "Member A", "S01", "Python studio", "2026-11-02"], ["M02", "Member B", "S01", "Python studio", "2026-11-02"], ["M01", "Member A", "S02", "Python studio", "2026-11-09"]]
```

Q2 Capacity summary at session grain
```sql
SELECT COUNT(*) AS SessionCount, SUM(Capacity) AS TotalPlaces,
       AVG(Capacity) AS MeanPlaces, MIN(Capacity) AS Smallest,
       MAX(Capacity) AS Largest
FROM Session;
```
Expected original rows:
```json
[[3, 7, 2.3333333333333335, 2, 3]]
```

Q3 Booked sessions only
```sql
SELECT s.SessionID, COUNT(*) AS Bookings
FROM Session AS s
INNER JOIN Booking AS b ON b.SessionID = s.SessionID
GROUP BY s.SessionID
ORDER BY s.SessionID;
```
Expected original rows:
```json
[["S01", 2], ["S02", 1]]
```

Q4 All sessions including zero bookings
```sql
SELECT s.SessionID, COUNT(b.MemberID) AS Bookings
FROM Session AS s
LEFT JOIN Booking AS b ON b.SessionID = s.SessionID
GROUP BY s.SessionID
ORDER BY s.SessionID;
```
Expected original rows:
```json
[["S01", 2], ["S02", 1], ["S03", 0]]
```

Q5 Calculated capacity and percentage
```sql
SELECT s.SessionID, s.Capacity, COUNT(b.MemberID) AS Bookings,
       s.Capacity - COUNT(b.MemberID) AS Remaining,
       ROUND(100.0 * COUNT(b.MemberID) / s.Capacity, 1) AS FillPercent
FROM Session AS s
LEFT JOIN Booking AS b ON b.SessionID = s.SessionID
GROUP BY s.SessionID, s.Capacity
ORDER BY s.SessionID;
```
Expected original rows:
```json
[["S01", 2, 2, 0, 100.0], ["S02", 3, 1, 2, 33.3], ["S03", 2, 0, 2, 0.0]]
```

Q6 Concatenated labels
```sql
SELECT b.MemberID, s.SessionID,
       m.DisplayName || ' / ' || w.Title AS BookingLabel
FROM Booking AS b
INNER JOIN Member AS m ON m.MemberID = b.MemberID
INNER JOIN Session AS s ON s.SessionID = b.SessionID
INNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID
ORDER BY s.SessionID, b.MemberID;
```
Expected original rows:
```json
[["M01", "S01", "Member A / Python studio"], ["M02", "S01", "Member B / Python studio"], ["M01", "S02", "Member A / Python studio"]]
```

Q7 Optional attendance by the whole key
```sql
SELECT b.MemberID, b.SessionID, a.Present
FROM Booking AS b
LEFT JOIN Attendance AS a
 ON a.MemberID = b.MemberID AND a.SessionID = b.SessionID
ORDER BY b.SessionID, b.MemberID;
```
Expected original rows:
```json
[["M01", "S01", 1], ["M02", "S01", 0], ["M01", "S02", null]]
```

Q8 Filter groups with HAVING
```sql
SELECT s.SessionID, COUNT(b.MemberID) AS Bookings
FROM Session AS s
LEFT JOIN Booking AS b ON b.SessionID = s.SessionID
GROUP BY s.SessionID
HAVING COUNT(b.MemberID) >= 2
ORDER BY s.SessionID;
```
Expected original rows:
```json
[["S01", 2]]
```

Q9 Rows with recorded presence
```sql
SELECT b.MemberID, b.SessionID
FROM Booking AS b
LEFT JOIN Attendance AS a
 ON a.MemberID = b.MemberID AND a.SessionID = b.SessionID
WHERE a.Present = 1
ORDER BY b.SessionID, b.MemberID;
```
Expected original rows:
```json
[["M01", "S01"]]
```

Q10 Recorded attendance totals, not unknown-as-absent
```sql
SELECT b.SessionID, COUNT(*) AS Bookings,
       COUNT(a.Present) AS Recorded,
       SUM(a.Present) AS PresentCount
FROM Booking AS b
LEFT JOIN Attendance AS a
 ON a.MemberID = b.MemberID AND a.SessionID = b.SessionID
GROUP BY b.SessionID
ORDER BY b.SessionID;
```
Expected original rows:
```json
[["S01", 2, 2, 1], ["S02", 1, 0, null]]
```

Transfer: SELECT s.SessionID,i.DisplayName FROM Session s JOIN Instructor i ON i.InstructorID=s.InstructorID ORDER BY s.SessionID ->S01GuideA,S02GuideB,S03GuideA.
Member counts: SELECT m.MemberID,COUNT(b.SessionID) FROM Member m LEFT JOIN Booking b ON b.MemberID=m.MemberID GROUP BY m.MemberID ORDER BY m.MemberID ->M01:2,M02:1,M03:0.
Workshop sessions/capacity: SELECT w.WorkshopID,COUNT(s.SessionID),SUM(s.Capacity) FROM Workshop w LEFT JOIN Session s ON s.WorkshopID=w.WorkshopID GROUP BY w.WorkshopID ORDER BY w.WorkshopID ->W01:2/5,W02:1/2. No-session workshop gives0/NULL; useCOALESCE only with explicit display meaning.
Fault capacity forW01 afterBookingjoin7 vs correct5. A newW01sessioncapacity2 makes correct7 but DISTINCTcapacitystill5. AttendanceMemberonlyjoin incorrectly givesM01/S02present1. COUNT*leftgivesS03one instead ofzero. Empty aggregate produces one summary row0,NULL,NULL,NULL,NULL; empty grouped input produces no groups.
SQLite bare nongrouped columns may return an arbitrary representative; do not teach that permissiveness as a reliable reporting rule. INNER excludes unmatched rows; LEFT preserves unmatched rows until filters remove them. Teacher reviews fresh queries and evidence; this pack does not claim completeUnit4coverage.
