-- List each loan with its borrower label.
-- Fresh base y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT Loan.LoanID, Borrower.BorrowerLabel FROM Loan INNER JOIN Borrower ON Loan.BorrowerID = Borrower.BorrowerID ORDER BY Loan.LoanID;
