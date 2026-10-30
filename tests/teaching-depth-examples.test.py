"""Execute original examples in disposable folders/in-memory databases, not real records."""
from pathlib import Path
import csv
import io
import json
import runpy
import sqlite3
import subprocess
import sys
import tempfile
import zipfile
import contextlib

ROOT = Path(__file__).resolve().parents[1]
FOLDER = ROOT / "dist" / "depth"
DATA = json.loads((FOLDER / "manifest.json").read_text(encoding="utf-8"))
for name, item in DATA["examples"].items():
    assert (FOLDER / name).read_text(encoding="utf-8") == item["code"], name
    if item["kind"] != "python":
        continue
    with tempfile.TemporaryDirectory() as temporary:
        folder = Path(temporary)
        script = folder / name
        script.write_text(item["code"], encoding="utf-8")
        if name == "clean_event_logs.py":
            (folder / "event-logs-raw.csv").write_bytes((FOLDER / "event-logs-raw.csv").read_bytes())
            raw_before = (folder / "event-logs-raw.csv").read_bytes()
        result = subprocess.run([sys.executable, str(script)], cwd=folder, capture_output=True, text=True, timeout=10)
        assert result.returncode == 0, (name, result.stderr)
        assert result.stdout == item["output"], (name, repr(result.stdout), repr(item["output"]))
        if name == "files_write.py":
            assert (folder / "scores-demo.txt").read_text() == "10\n0\n25\n"
        if name == "files_append.py":
            assert (folder / "append-demo.txt").read_text() == "10\n20\n0\n"
        if name == "clean_event_logs.py":
            assert (folder / "event-logs-raw.csv").read_bytes() == raw_before
            rows = list(csv.DictReader((folder / "worked-clean.csv").open(encoding="utf-8")))
            assert [r["EventID"] for r in rows] == ["L001", "L002", "L003", "L007", "L010", "L011"]
            assert sum(int(r["DurationMS"]) for r in rows) == 10046
            assert sum(int(r["Status"]) != 200 for r in rows) == 2
            assert len(list(csv.DictReader((folder / "worked-decisions.csv").open(encoding="utf-8")))) == 13

clean = runpy.run_path(str(FOLDER / "clean_event_logs.py"))["clean"]
with contextlib.redirect_stdout(io.StringIO()):
    pool_type = runpy.run_path(str(FOLDER / "encapsulation.py"))["TicketPool"]
pool = pool_type("Check", 3)
for invalid in [0, -1, 4, 1.5, True, "2"]:
    try:
        pool.book(invalid)
    except ValueError:
        assert pool.available() == 3
    else:
        raise AssertionError("Invalid booking accepted")
raw = list(csv.DictReader(io.StringIO((FOLDER / "event-logs-raw.csv").read_text(encoding="utf-8"))))
original = json.dumps(raw, sort_keys=True)
kept, decisions = clean(raw)
assert json.dumps(raw, sort_keys=True) == original
assert next(r for r in kept if r[0] == "L007")[4] == 9999
assert next(r for r in kept if r[0] == "L010")[4] == 0
decision_map = {row[0]: row[1] for row in decisions}
assert decision_map["R03"] == "suppress duplicate"
for row in ["R05", "R06", "R07", "R09", "R10", "R11"]:
    assert decision_map[row] == "hold"
changed = [dict(row) for row in raw]
changed[0]["Host"] = "UNKNOWN"
new, _ = clean(changed)
assert len(new) == 5 and sum(row[4] for row in new) == 10031
changed[0] = dict(raw[0], Timestamp="2027-2-01T09:00:00Z")
new, _ = clean(changed)
assert "L001" not in [row[0] for row in new], "Canonical timestamp rule must be enforced"

def database(name):
    connection = sqlite3.connect(":memory:")
    connection.executescript(DATA["examples"][name]["code"])
    return connection

connection = database("ddl_dml_lab.sql")
assert connection.execute("SELECT * FROM Item").fetchall() == [(1, "Camera", 40.0, 1, 1)]
assert connection.execute("SELECT COUNT(*) FROM Supplier").fetchone()[0] == 2
assert connection.execute("SELECT name FROM sqlite_master WHERE name='Scratch'").fetchall() == []
for statement in [
    "INSERT INTO Item VALUES (1, 'Duplicate', 1, 1, 1)",
    "INSERT INTO Item VALUES (3, 'Missing supplier', 1, 99, 1)",
    "UPDATE Item SET Cost=-1 WHERE ItemID=1",
    "DELETE FROM Supplier WHERE SupplierID=1",
]:
    try:
        connection.execute(statement)
    except sqlite3.IntegrityError:
        connection.rollback()
    else:
        raise AssertionError("Expected constraint rejection: " + statement)
    assert connection.execute("SELECT * FROM Item").fetchall() == [(1, "Camera", 40.0, 1, 1)]

connection = database("anomalies_lab.sql")
original_rows = connection.execute("SELECT * FROM FlatMembership ORDER BY StudentID, ClubID").fetchall()
reconstructed = connection.execute("SELECT * FROM ReconstructedBefore ORDER BY StudentID, ClubID").fetchall()
assert reconstructed == original_rows and len(reconstructed) == 3
assert connection.execute("SELECT ClubID FROM Club ORDER BY ClubID").fetchall() == [("C1",), ("C2",), ("C3",)]
assert connection.execute("SELECT * FROM Membership WHERE ClubID='C2'").fetchall() == []
assert connection.execute("SELECT CoachPhone FROM Coach WHERE CoachID='T1'").fetchone()[0] == "299"

connection = database("log_manipulation.sql")
assert connection.execute("SELECT EventID FROM EventLog WHERE Status <> 200 ORDER BY EventID").fetchall() == [("L003",), ("L011",)]
assert connection.execute("SELECT Host,COUNT(*),SUM(DurationMS) FROM EventLog GROUP BY Host ORDER BY Host").fetchall() == [("LAB1", 2, 35), ("LAB2", 2, 10007), ("LAB3", 2, 4)]

for name in ["teaching-depth-pack.zip", "log-cleaning-pack.zip"]:
    with zipfile.ZipFile(FOLDER / name) as archive:
        assert archive.testzip() is None
        for member in archive.namelist():
            assert not member.startswith(("/", "\\")) and ".." not in Path(member).parts
            assert archive.read(member) == (FOLDER / member).read_bytes(), (name, member)
print("All Python outputs, scope/error cases, file write/append contents, raw-preserving log cleaning, three SQL labs, constraints, anomaly preservation and both ZIPs passed.")
