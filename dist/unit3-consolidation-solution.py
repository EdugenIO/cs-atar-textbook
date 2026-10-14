"""Offline consolidation tasks; complete functions before comparing teacher reference."""
def trace_mapping():
    counts = {"camera": 3, "projector": 1}
    alias = counts
    snapshot = counts.copy()
    alias["camera"] -= 1
    snapshot["projector"] = 9
    return counts, snapshot

def insertion_quantity(records):
    """Return a stable quantity-ordered copy of (unique_ID, quantity) records."""
    result = list(records)
    for i in range(1, len(result)):
        item = result[i]
        j = i - 1
        while j >= 0 and result[j][1] > item[1]:
            result[j + 1] = result[j]
            j -= 1
        result[j + 1] = item
    return result

def binary_id(records, target):
    """Ascending unique string IDs required; return index or -1."""
    low, high = 0, len(records) - 1
    while low <= high:
        mid = (low + high) // 2
        if records[mid][0] == target:
            return mid
        if records[mid][0] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

if __name__ == "__main__":
    print(trace_mapping())
