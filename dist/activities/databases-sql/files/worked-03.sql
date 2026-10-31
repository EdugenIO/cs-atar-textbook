SELECT loan_id, item, days
FROM Loan
WHERE returned = 0 AND days BETWEEN 3 AND 5
ORDER BY loan_id;
