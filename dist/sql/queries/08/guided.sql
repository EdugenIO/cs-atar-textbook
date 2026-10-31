-- Produce an equipment count, then explain whether it counts categories or items.
-- Fresh base y11 database. Enable PRAGMA foreign_keys=ON before any BEGIN.
SELECT COUNT(*) AS EquipmentItems FROM Equipment;
