-- On the changed database, list distinct equipment descriptions in ascending order.
-- Fresh changed y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT DISTINCT EquipmentDescription FROM Equipment ORDER BY EquipmentDescription;
