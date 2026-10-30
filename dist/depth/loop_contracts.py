def sum_to(limit):
    total = 0
    current = 1
    while current <= limit:
        total += current
        current += 1
    return total
for limit in [0, 1, 4]:
    print(limit, sum_to(limit))
