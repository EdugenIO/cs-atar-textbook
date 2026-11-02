# Selection sort
# Expected output:
# [1, 1, 2, 3]
def selection_sort(values):
    for start in range(len(values) - 1):
        smallest = start
        for index in range(start + 1, len(values)):
            if values[index] < values[smallest]:
                smallest = index
        values[start], values[smallest] = values[smallest], values[start]
    return values

print(selection_sort([3, 1, 2, 1]))
