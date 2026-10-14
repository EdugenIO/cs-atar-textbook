"""Ten original read-only reports on a fresh in-memory synthetic database."""
from pathlib import Path
import json, sqlite3

def build():
    db = sqlite3.connect(":memory:")
    db.executescript(Path(__file__).with_name("unit4-design-schema.sql").read_text(encoding="utf-8"))
    return db

def report(db, key):
    queries = json.loads(Path(__file__).with_name("unit4-sql-queries.json").read_text(encoding="utf-8"))
    return [list(row) for row in db.execute(queries[key]["sql"])]

if __name__ == "__main__":
    db = build()
    queries = json.loads(Path(__file__).with_name("unit4-sql-queries.json").read_text(encoding="utf-8"))
    for key, item in queries.items():
        print(key, item["title"], report(db, key))
    db.close()
