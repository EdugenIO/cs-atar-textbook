# Bubble sort
# Expected output:
# [1, 1, 2, 3]
def bubble_sort(values):
    for end in range(len(values) - 1, 0, -1):
        swapped = False
        for index in range(end):
            if values[index] > values[index + 1]:
                values[index], values[index + 1] = values[index + 1], values[index]
                swapped = True
        if not swapped:
            break
    return values

print(bubble_sort([3, 1, 2, 1]))
