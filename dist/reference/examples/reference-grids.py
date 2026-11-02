# Two-dimensional lists and nested loops
# Expected output:
# [5, 5, 0]
grid = [[2, 3], [4, 1], []]
totals = []
for row in grid:
    total = 0
    for value in row:
        total += value
    totals.append(total)
print(totals)
