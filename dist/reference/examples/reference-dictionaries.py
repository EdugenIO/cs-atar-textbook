# Dictionaries and keyed records
# Expected output:
# 7 3
stock = {"A01": 2, "B02": 0}
stock["A01"] += 1
if "C03" not in stock:
    stock["C03"] = 4
total = 0
for key in stock:
    total += stock[key]
print(total, stock["A01"])
