def mean(values):
    if len(values) == 0:
        return None
    total = 0
    for value in values:
        total += value
    return total / len(values)
for values in [[], [0], [10, 20]]:
    print(values, mean(values))
