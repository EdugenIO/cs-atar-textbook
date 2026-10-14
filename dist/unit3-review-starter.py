"""Original offline review starter. Predict outputs before running."""
def find_id(records, target):
    """Ascending unique string IDs required; index or -1. Contains deliberate fault."""
    low, high = 0, len(records) - 1
    while low < high:
        mid = (low + high) // 2
        if records[mid][0] == target:
            return mid
        if records[mid][0] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

def sort_quantity(records):
    result = list(records)
    for i in range(1, len(result)):
        item = result[i]
        j = i - 1
        while j >= 0 and result[j][1] > item[1]:
            result[j + 1] = result[j]
            j -= 1
        result[j + 1] = item
    return result

def trace_state():
    grid = [[0, 0] for _ in range(2)]
    grid[0][1] = 3
    alias = grid
    copy = [row[:] for row in grid]
    alias[1][0] = 4
    copy[0][0] = 9
    return grid, copy

if __name__ == "__main__":
    print(trace_state())
    print(sort_quantity([("C03", 2), ("C01", 1), ("C02", 2)]))
    print("Fault-revealing one-item result:", find_id([("C01", 1)], "C01"))
