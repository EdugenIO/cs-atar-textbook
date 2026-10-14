-- Q1 Four-table booking report
SELECT b.MemberID, m.DisplayName, s.SessionID, w.Title, s.SessionDate
FROM Booking AS b
INNER JOIN Member AS m ON m.MemberID = b.MemberID
INNER JOIN Session AS s ON s.SessionID = b.SessionID
INNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID
ORDER BY s.SessionID, b.MemberID;

-- Q2 Capacity summary at session grain
SELECT COUNT(*) AS SessionCount, SUM(Capacity) AS TotalPlaces,
       AVG(Capacity) AS MeanPlaces, MIN(Capacity) AS Smallest,
       MAX(Capacity) AS Largest
FROM Session;

-- Q3 Booked sessions only
SELECT s.SessionID, COUNT(*) AS Bookings
FROM Session AS s
INNER JOIN Booking AS b ON b.SessionID = s.SessionID
GROUP BY s.SessionID
ORDER BY s.SessionID;

-- Q4 All sessions including zero bookings
SELECT s.SessionID, COUNT(b.MemberID) AS Bookings
FROM Session AS s
LEFT JOIN Booking AS b ON b.SessionID = s.SessionID
GROUP BY s.SessionID
ORDER BY s.SessionID;

-- Q5 Calculated capacity and percentage
SELECT s.SessionID, s.Capacity, COUNT(b.MemberID) AS Bookings,
       s.Capacity - COUNT(b.MemberID) AS Remaining,
       ROUND(100.0 * COUNT(b.MemberID) / s.Capacity, 1) AS FillPercent
FROM Session AS s
LEFT JOIN Booking AS b ON b.SessionID = s.SessionID
GROUP BY s.SessionID, s.Capacity
ORDER BY s.SessionID;

-- Q6 Concatenated labels
SELECT b.MemberID, s.SessionID,
       m.DisplayName || ' / ' || w.Title AS BookingLabel
FROM Booking AS b
INNER JOIN Member AS m ON m.MemberID = b.MemberID
INNER JOIN Session AS s ON s.SessionID = b.SessionID
INNER JOIN Workshop AS w ON w.WorkshopID = s.WorkshopID
ORDER BY s.SessionID, b.MemberID;

-- Q7 Optional attendance by the whole key
SELECT b.MemberID, b.SessionID, a.Present
FROM Booking AS b
LEFT JOIN Attendance AS a
 ON a.MemberID = b.MemberID AND a.SessionID = b.SessionID
ORDER BY b.SessionID, b.MemberID;

-- Q8 Filter groups with HAVING
SELECT s.SessionID, COUNT(b.MemberID) AS Bookings
FROM Session AS s
LEFT JOIN Booking AS b ON b.SessionID = s.SessionID
GROUP BY s.SessionID
HAVING COUNT(b.MemberID) >= 2
ORDER BY s.SessionID;

-- Q9 Rows with recorded presence
SELECT b.MemberID, b.SessionID
FROM Booking AS b
LEFT JOIN Attendance AS a
 ON a.MemberID = b.MemberID AND a.SessionID = b.SessionID
WHERE a.Present = 1
ORDER BY b.SessionID, b.MemberID;

-- Q10 Recorded attendance totals, not unknown-as-absent
SELECT b.SessionID, COUNT(*) AS Bookings,
       COUNT(a.Present) AS Recorded,
       SUM(a.Present) AS PresentCount
FROM Booking AS b
LEFT JOIN Attendance AS a
 ON a.MemberID = b.MemberID AND a.SessionID = b.SessionID
GROUP BY b.SessionID
ORDER BY b.SessionID;