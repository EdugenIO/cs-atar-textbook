-- On changed data, list outstanding loans with borrower labels and due dates, ordered by due date then loan identifier.
-- Fresh changed y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT Loan.LoanID, Borrower.BorrowerLabel, Loan.DueDate FROM Loan INNER JOIN Borrower ON Loan.BorrowerID = Borrower.BorrowerID WHERE Loan.Returned = 0 ORDER BY Loan.DueDate, Loan.LoanID;
