"""Search integer IDs. Return an index, or None when absent."""
def linear_search(values, target):
    for index in range(len(values)):
        if values[index] == target:
            return index
    return None

def binary_search(values, target):
    # Precondition: values is sorted in ascending order.
    low = 0
    high = len(values) - 1
    while low <= high:
        mid = (low + high) // 2
        if values[mid] == target:
            return mid
        elif values[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return None

if __name__ == "__main__":
    ids = [101, 104, 108, 112, 117, 123, 130]
    for target in [101, 117, 999]:
        print(target, linear_search(ids, target), binary_search(ids, target))

