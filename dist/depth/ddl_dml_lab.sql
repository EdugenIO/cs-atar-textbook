-- Run on a fresh disposable SQLite database, not a school production database.
PRAGMA foreign_keys = ON;
CREATE TABLE Supplier (
    SupplierID INTEGER PRIMARY KEY,
    SupplierName TEXT NOT NULL
);
CREATE TABLE Item (
    ItemID INTEGER PRIMARY KEY,
    ItemName TEXT NOT NULL,
    Cost REAL NOT NULL CHECK (Cost >= 0),
    SupplierID INTEGER NOT NULL REFERENCES Supplier(SupplierID)
);
ALTER TABLE Item ADD COLUMN Active INTEGER NOT NULL DEFAULT 1 CHECK (Active IN (0, 1));
INSERT INTO Supplier VALUES (1, 'North Supplies'), (2, 'West Supplies');
INSERT INTO Item (ItemID, ItemName, Cost, SupplierID)
VALUES (1, 'Camera', 40, 1), (2, 'Cable', 10, 1);
UPDATE Item SET Cost = 12 WHERE ItemID = 2;
DELETE FROM Item WHERE ItemID = 2 AND ItemName = 'Cable';
BEGIN TRANSACTION;
UPDATE Item SET Cost = 0 WHERE ItemID = 1;
ROLLBACK;
CREATE TABLE Scratch (Note TEXT);
DROP TABLE Scratch;
SELECT ItemID, ItemName, Cost, Active FROM Item ORDER BY ItemID;
