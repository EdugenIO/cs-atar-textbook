rows = [["E01", "Camera", 2], ["E02", "Tripod", 0]]
found = None
for row in rows:
    if row[0] == "E02":
        found = row[2]
        break
equipment = {"E01": {"name": "Camera", "available": 2},
             "E02": {"name": "Tripod", "available": 0}}
print("row lookup", found)
print("key lookup", equipment["E02"]["available"])
print("missing", equipment.get("E99"))
grid = [[0, 1, 0], [0, 0, 1]]
print("tile", grid[1][2])
