-- Model a three-table design for devices, skills and dated device-skill records. Inspect the junction key and foreign keys before the independent transfer.
-- Fresh base scratch database. Enable PRAGMA foreign_keys=ON before any BEGIN.
CREATE TABLE Device (DeviceID TEXT PRIMARY KEY NOT NULL, Label TEXT NOT NULL);
CREATE TABLE Skill (SkillID TEXT PRIMARY KEY NOT NULL, SkillName TEXT NOT NULL);
CREATE TABLE DeviceSkill (DeviceID TEXT NOT NULL REFERENCES Device(DeviceID), SkillID TEXT NOT NULL REFERENCES Skill(SkillID), RecordedOn TEXT NOT NULL, PRIMARY KEY(DeviceID, SkillID));
-- Verify:
SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;
SELECT name, type, pk FROM pragma_table_info('DeviceSkill') ORDER BY cid;
PRAGMA foreign_key_list(DeviceSkill);
