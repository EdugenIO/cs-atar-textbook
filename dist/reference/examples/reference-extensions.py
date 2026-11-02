# Concise Python: comprehensions, tuples and sets
# Expected output:
# [0, 1, 4, 9]
# 2 2
squares = [number * number for number in range(4)]
point = (2, 3)
unique = set([3, 1, 3])
print(squares)
print(point[0], len(unique))
