BEGIN;
SELECT loan_id, returned FROM Loan WHERE loan_id = 102;
UPDATE Loan SET returned = 1 WHERE loan_id = 102;
SELECT loan_id, returned FROM Loan WHERE loan_id = 102;
ROLLBACK;
