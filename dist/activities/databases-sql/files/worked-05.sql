SELECT member_id, COUNT(*) AS loans, SUM(days) AS total_days
FROM Loan
GROUP BY member_id
ORDER BY member_id;
