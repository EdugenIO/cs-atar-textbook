values = [8, 3, 3, 6]
best = 0
for index in range(1, len(values)):
    if values[index] < values[best]:
        best = index
print(best, values[best])
