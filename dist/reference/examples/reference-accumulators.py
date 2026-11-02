# Totals, counts, averages and extrema
# Expected output:
# -15 3 -5.0 -2
values = [-4, -2, -9]
total = 0
count = 0
largest = None
for value in values:
    total += value
    count += 1
    if largest is None or value > largest:
        largest = value
if count > 0:
    print(total, count, total / count, largest)
else:
    print("No data")
