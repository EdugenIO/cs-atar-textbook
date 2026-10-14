"""Offline in-memory schema inspection; no existing database files changed."""
from pathlib import Path
import sqlite3

def build():
    connection = sqlite3.connect(":memory:")
    connection.executescript(Path(__file__).with_name("unit4-design-schema.sql").read_text(encoding="utf-8"))
    assert connection.execute("PRAGMA foreign_keys").fetchone()[0] == 1
    return connection

if __name__ == "__main__":
    with build() as db:
        for name in ["Instructor", "Workshop", "Session", "Member", "Booking", "Attendance"]:
            print(name, db.execute(f'SELECT COUNT(*) FROM "{name}"').fetchone()[0])
        print("M01/S03 booked?", bool(db.execute("SELECT 1 FROM Booking WHERE MemberID=? AND SessionID=?", ("M01", "S03")).fetchone()))
    db.close()
