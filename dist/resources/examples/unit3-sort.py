"""Sort integer lists in place; return the number of key comparisons.
Index/bound checks are not counted. These are teaching implementations.
"""
def bubble_sort(values):
    comparisons = 0
    for end in range(len(values) - 1, 0, -1):
        swapped = False
        for index in range(end):
            comparisons += 1
            if values[index] > values[index + 1]:
                values[index], values[index + 1] = values[index + 1], values[index]
                swapped = True
        if not swapped:
            break
    return comparisons

def insertion_sort(values):
    comparisons = 0
    for index in range(1, len(values)):
        key = values[index]
        position = index - 1
        while position >= 0:
            comparisons += 1
            if values[position] <= key:
                break
            values[position + 1] = values[position]
            position -= 1
        values[position + 1] = key
    return comparisons

def selection_sort(values):
    comparisons = 0
    for start in range(len(values) - 1):
        smallest = start
        for index in range(start + 1, len(values)):
            comparisons += 1
            if values[index] < values[smallest]:
                smallest = index
        if smallest != start:
            values[start], values[smallest] = values[smallest], values[start]
    return comparisons

if __name__ == "__main__":
    original = [5, 2, 4, 1]
    for sort in [bubble_sort, insertion_sort, selection_sort]:
        working = original[:]
        count = sort(working)
        print(sort.__name__, working, count)
    print("Original:", original)

