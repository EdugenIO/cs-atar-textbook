# Binary search
# Expected output:
# 3
# -1
def binary_search(values, target):
    low = 0
    high = len(values) - 1
    while low <= high:
        middle = (low + high) // 2
        if values[middle] == target:
            return middle
        if values[middle] < target:
            low = middle + 1
        else:
            high = middle - 1
    return -1

print(binary_search([2, 4, 6, 8, 10], 8))
print(binary_search([], 8))
