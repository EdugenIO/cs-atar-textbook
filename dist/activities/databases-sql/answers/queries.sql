SELECT name, member_id FROM Member ORDER BY name DESC;
SELECT loan_id, days FROM Loan ORDER BY days DESC, loan_id ASC;
SELECT DISTINCT days FROM Loan ORDER BY days;
SELECT loan_id, item FROM Loan WHERE item = 'Camera' OR returned = 0 ORDER BY loan_id;
SELECT loan_id, item FROM Loan WHERE item = 'Camera' AND returned = 0 ORDER BY loan_id;
SELECT Member.name, Loan.loan_id, Loan.item FROM Member INNER JOIN Loan ON Member.member_id = Loan.member_id WHERE Loan.returned = 0 ORDER BY Loan.loan_id;
SELECT item, COUNT(*), MAX(days) FROM Loan GROUP BY item ORDER BY item;
SELECT item, COUNT(*), MAX(days) FROM Loan WHERE returned = 0 GROUP BY item ORDER BY item;
SELECT member_id, SUM(days) FROM Loan GROUP BY member_id HAVING SUM(days) >= 8 ORDER BY member_id;
