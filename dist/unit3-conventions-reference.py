"""Offline original equivalents of the convention-clinic algorithms."""
def row_totals(grid):
    totals = []
    for row in grid:
        total = 0
        for value in row:
            total += value
        totals.append(total)
    return totals

def total_stock(stock):
    total = 0
    for key in stock:
        total += stock[key]
    return total

def find_id(records, target):
    low, high = 0, len(records) - 1
    while low <= high:
        middle = (low + high) // 2
        if records[middle][0] == target:
            return middle
        if records[middle][0] < target:
            low = middle + 1
        else:
            high = middle - 1
    return -1

if __name__ == "__main__":
    print(row_totals([[2, 0], [1, 4], []]))
    print(total_stock({"A01": 2, "A02": 0}))
    print(find_id([("A01", 2)], "A01"))
