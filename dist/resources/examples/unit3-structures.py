"""Synthetic workshop bookings: independent rows and explicit mutation."""
def make_grid(rows, columns):
    if rows < 0 or columns < 0:
        raise ValueError("Dimensions must be non-negative")
    grid = []
    for row in range(rows):
        grid.append([0] * columns)
    return grid

def row_totals(grid):
    totals = []
    for row in grid:
        total = 0
        for value in row:
            total += value
        totals.append(total)
    return totals

def book(grid, workshop, day, places):
    # Contract: rectangular grid; integer indexes/places (not booleans).
    # Bad indexes or negative places raise ValueError before mutation.
    if not 0 <= workshop < len(grid):
        raise ValueError("Unknown workshop")
    if not 0 <= day < len(grid[workshop]) or places < 0:
        raise ValueError("Invalid day or places")
    grid[workshop][day] += places

def labelled_totals(grid, labels):
    # Labels are unique strings, one per row; grid contains numbers.
    if len(labels) != len(grid) or len(set(labels)) != len(labels):
        raise ValueError("One unique label is required per row")
    totals = row_totals(grid)
    report = {}
    for index in range(len(labels)):
        report[labels[index]] = totals[index]
    return report

if __name__ == "__main__":
    bookings = make_grid(2, 3)
    book(bookings, 0, 0, 2)
    book(bookings, 0, 2, 1)
    book(bookings, 1, 1, 4)
    print(bookings)
    print(labelled_totals(bookings, ["Python", "Robotics"]))

