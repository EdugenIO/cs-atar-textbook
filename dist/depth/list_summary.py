def summary(values):
    if not values:
        return 0, 0, None
    total = 0
    best = values[0]
    for value in values:
        total += value
        if value > best:
            best = value
    return len(values), total, best
for values in [[], [0], [4, 9, 9]]:
    print(values, summary(values))
