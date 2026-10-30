def binary_search(values, target):
    # Contract: values are sorted in ascending order.
    low, high = 0, len(values) - 1
    while low <= high:
        mid = (low + high) // 2
        if values[mid] == target:
            return mid
        if values[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
for target in [2, 8, 14, 9]:
    print(target, binary_search([2, 5, 8, 11, 14], target))
print("empty", binary_search([], 2))
