-- Q1
SELECT m.MemberID, m.DisplayName || ' / ' || w.Title AS BookingLabel, s.SessionID
FROM Member AS m INNER JOIN Booking AS b ON m.MemberID=b.MemberID
INNER JOIN Session AS s ON b.SessionID=s.SessionID
INNER JOIN Workshop AS w ON s.WorkshopID=w.WorkshopID
ORDER BY s.SessionID,m.MemberID;

-- Q2
SELECT s.SessionID,COUNT(b.MemberID) AS Bookings,
s.Capacity-COUNT(b.MemberID) AS PlacesLeft
FROM Session AS s LEFT JOIN Booking AS b ON s.SessionID=b.SessionID
GROUP BY s.SessionID,s.Capacity ORDER BY s.SessionID;

-- Q3
SELECT b.MemberID,b.SessionID,a.Present
FROM Booking AS b LEFT JOIN Attendance AS a
ON b.MemberID=a.MemberID AND b.SessionID=a.SessionID
ORDER BY b.SessionID,b.MemberID;

-- Q4
SELECT s.SessionID,COUNT(b.MemberID) AS Bookings,s.Capacity
FROM Session AS s INNER JOIN Booking AS b ON s.SessionID=b.SessionID
GROUP BY s.SessionID,s.Capacity HAVING COUNT(b.MemberID)>=s.Capacity
ORDER BY s.SessionID;

-- Q5
SELECT w.WorkshopID,SUM(s.Capacity) AS TotalCapacity
FROM Workshop AS w INNER JOIN Session AS s ON w.WorkshopID=s.WorkshopID
GROUP BY w.WorkshopID ORDER BY w.WorkshopID;