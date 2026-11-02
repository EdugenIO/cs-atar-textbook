# Insertion sort
# Expected output:
# [2, 2, 3, 4]
def insertion_sort(values):
    for index in range(1, len(values)):
        current = values[index]
        position = index - 1
        while position >= 0 and values[position] > current:
            values[position + 1] = values[position]
            position -= 1
        values[position + 1] = current
    return values

print(insertion_sort([4, 2, 3, 2]))
