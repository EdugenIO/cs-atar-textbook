SELECT r.ResourceID,COUNT(l.LoanID) AS TotalLoans
FROM Resource r LEFT JOIN Loan l ON r.ResourceID=l.ResourceID
GROUP BY r.ResourceID ORDER BY r.ResourceID;