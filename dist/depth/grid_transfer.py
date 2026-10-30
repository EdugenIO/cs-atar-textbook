def count_walls(grid):
    total = 0
    for row in grid:
        for tile in row:
            if tile == 1:
                total += 1
    return total
for grid in [[], [[0]], [[1, 0], [1, 1]]]:
    print(count_walls(grid))
