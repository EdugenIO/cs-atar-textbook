import sqlite3
with sqlite3.connect(":memory:") as connection:
    connection.execute("PRAGMA foreign_keys = ON")
    connection.execute("CREATE TABLE Member (MemberID INTEGER PRIMARY KEY, Name TEXT NOT NULL)")
    connection.execute("INSERT INTO Member VALUES (?, ?)", (1, "O'Neil"))
    connection.execute("UPDATE Member SET Name = ? WHERE MemberID = ?", ("O'Neill", 1))
    rows = connection.execute("SELECT Name FROM Member WHERE MemberID = ?", (1,)).fetchall()
    print(rows)
    assert connection.execute("SELECT COUNT(*) FROM Member").fetchone()[0] == 1
print("targeted update checked")
