def count_at_least(values, minimum):
    if minimum < 0:
        raise ValueError("Minimum must be non-negative")
    count = 0
    for value in values:
        if value >= minimum:
            count += 1
    return count
for values, minimum in [([], 5), ([4, 5, 5], 5), ([0], 0)]:
    print(count_at_least(values, minimum))
