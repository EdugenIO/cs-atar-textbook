-- List every equipment identifier and description, ordered by identifier.
-- Fresh base y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT EquipmentID, EquipmentDescription FROM Equipment ORDER BY EquipmentID;
