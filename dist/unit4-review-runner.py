"""Offline checks of supplied reference SQL; not learner or deployment evidence."""
from pathlib import Path
import json,sqlite3
HERE=Path(__file__).resolve().parent

def build():
    db=sqlite3.connect(":memory:",isolation_level=None)
    db.executescript((HERE/"unit4-review-schema.sql").read_text(encoding="utf-8"))
    return db

def main():
    queries=json.loads((HERE/"unit4-review-queries.json").read_text(encoding="utf-8"))
    expected=json.loads((HERE/"unit4-review-expected.json").read_text(encoding="utf-8"))
    with build() as db:
        for name,sql in queries.items():
            actual=[list(row) for row in db.execute(sql)]
            if actual != expected[name]:
                raise AssertionError(f"{name}: expected {expected[name]}, got {actual}")
            print(name,"reference matches",actual)
        assert db.execute("PRAGMA foreign_keys").fetchone()[0]==1
        assert db.execute("PRAGMA foreign_key_check").fetchall()==[]
    print("Reference outputs checked. Write and test your own queries; a reference pass is not your evidence.")

if __name__ == "__main__":main()
