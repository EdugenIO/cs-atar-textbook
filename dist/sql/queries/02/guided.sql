-- List Camera equipment in either category C01 or C03; make grouping explicit.
-- Fresh base y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT EquipmentID FROM Equipment WHERE EquipmentDescription = 'Camera' AND (CategoryID = 'C01' OR CategoryID = 'C03') ORDER BY EquipmentID;
