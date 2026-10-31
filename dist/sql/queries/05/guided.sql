-- Create Room(RoomID required TEXT primary key, RoomName required TEXT) and Desk(DeskID required TEXT primary key, RoomID required TEXT referencing Room). Explain the one-to-many link.
-- Fresh base scratch database. Enable PRAGMA foreign_keys=ON before any BEGIN.
CREATE TABLE Room (RoomID TEXT PRIMARY KEY NOT NULL, RoomName TEXT NOT NULL);
CREATE TABLE Desk (DeskID TEXT PRIMARY KEY NOT NULL, RoomID TEXT NOT NULL REFERENCES Room(RoomID));
-- Verify:
SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;
PRAGMA foreign_key_list(Desk);
