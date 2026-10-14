"""Original offline workshop project reference; default demo is in memory.
Six-table teaching model; no login, payment, production use or retention policy.
Explicit transactions use isolation_level=None. Functions require no active transaction.
"""
from pathlib import Path
from datetime import date
import csv, re, sqlite3

def build():
    db = sqlite3.connect(":memory:", isolation_level=None)
    db.executescript(Path(__file__).with_name("unit4-design-schema.sql").read_text(encoding="utf-8"))
    assert db.execute("PRAGMA foreign_keys").fetchone()[0] == 1
    return db

def valid_date(text):
    if not isinstance(text, str) or not re.fullmatch(r"[0-9]{4}-[0-9]{2}-[0-9]{2}", text):
        raise ValueError("Expected YYYY-MM-DD")
    return date.fromisoformat(text)

def book(db, member_id, session_id, booked_on):
    """One booking per pair; reject unknown, duplicate, full or late-date request.
    BEGIN IMMEDIATE prevents another writer changing capacity between check/insert.
    Direct SQL writers can bypass this application rule; no trigger is installed.
    """
    when = valid_date(booked_on)
    db.execute("BEGIN IMMEDIATE")
    try:
        session = db.execute("SELECT Capacity,SessionDate FROM Session WHERE SessionID=?", (session_id,)).fetchone()
        member = db.execute("SELECT 1 FROM Member WHERE MemberID=?", (member_id,)).fetchone()
        if not session or not member:
            raise ValueError("Unknown member/session")
        if when > valid_date(session[1]):
            raise ValueError("Booking date is after session")
        if db.execute("SELECT 1 FROM Booking WHERE MemberID=? AND SessionID=?", (member_id, session_id)).fetchone():
            raise ValueError("Duplicate booking")
        count = db.execute("SELECT COUNT(*) FROM Booking WHERE SessionID=?", (session_id,)).fetchone()[0]
        if count >= session[0]:
            raise ValueError("Session full")
        db.execute("INSERT INTO Booking VALUES(?,?,?)", (member_id,session_id,booked_on))
        db.execute("COMMIT")
        return True
    except Exception:
        db.execute("ROLLBACK")
        raise

def set_attendance(db, member_id, session_id, present):
    if type(present) is not int or present not in (0,1):
        raise ValueError("Present must be integer 0/1")
    db.execute("BEGIN IMMEDIATE")
    try:
        row = db.execute("SELECT 1 FROM Booking WHERE MemberID=? AND SessionID=?", (member_id,session_id)).fetchone()
        if not row:
            raise ValueError("No booking for pair")
        existing = db.execute("SELECT 1 FROM Attendance WHERE MemberID=? AND SessionID=?", (member_id,session_id)).fetchone()
        if existing:
            db.execute("UPDATE Attendance SET Present=? WHERE MemberID=? AND SessionID=?", (present,member_id,session_id))
        else:
            db.execute("INSERT INTO Attendance VALUES(?,?,?)", (member_id,session_id,present))
        db.execute("COMMIT")
    except Exception:
        db.execute("ROLLBACK")
        raise

def import_members(db, rows):
    """Normalise agreed synthetic IDs/names; reject the whole batch on any error.
    Existing IDs are rejected, never silently overwritten. Returns imported count.
    """
    clean, seen = [], set()
    for row in rows:
        if set(row) != {"MemberID", "DisplayName"} or not all(isinstance(v,str) for v in row.values()):
            raise ValueError("Expected two text fields")
        member = row["MemberID"].strip().upper()
        name = row["DisplayName"].strip()
        if not re.fullmatch(r"M[0-9]{2}", member) or not 1 <= len(name) <= 60 or member in seen:
            raise ValueError("Invalid/duplicate import row")
        seen.add(member);clean.append((member,name))
    db.execute("BEGIN IMMEDIATE")
    try:
        for row in clean:
            db.execute("INSERT INTO Member VALUES(?,?)", row)
        db.execute("COMMIT")
        return len(clean)
    except Exception:
        db.execute("ROLLBACK")
        raise

def snapshot(db):
    return {n:db.execute(f'SELECT * FROM "{n}" ORDER BY 1,2').fetchall()
            for n in ["Instructor","Workshop","Session","Member","Booking","Attendance"]}

def recovery_copy(db):
    """Use SQLite backup API into another in-memory DB; source unchanged."""
    other = sqlite3.connect(":memory:", isolation_level=None)
    other.execute("PRAGMA foreign_keys=ON")
    db.backup(other)
    assert other.execute("PRAGMA integrity_check").fetchone()[0] == "ok"
    assert other.execute("PRAGMA foreign_key_check").fetchall() == []
    return other

def demo():
    db = build()
    print("Book M03/S02:", book(db,"M03","S02","2026-10-14"))
    before = snapshot(db)
    try:
        book(db,"M03","S01","2026-10-14")
    except ValueError as error:
        print("Rejected:", error, "; state unchanged:", before == snapshot(db))
    set_attendance(db,"M03","S02",1)
    rows = list(csv.DictReader(Path(__file__).with_name("unit4-members-clean.csv").read_text(encoding="utf-8").splitlines()))
    print("Imported:", import_members(db,rows))
    restored = recovery_copy(db)
    print("Recovery content equal:", snapshot(db)==snapshot(restored))
    restored.close();db.close()

if __name__ == "__main__":
    demo()
