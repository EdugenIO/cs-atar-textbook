SELECT Member.name, Loan.loan_id, Loan.item
FROM Member INNER JOIN Loan
ON Member.member_id = Loan.member_id
ORDER BY Loan.loan_id;
