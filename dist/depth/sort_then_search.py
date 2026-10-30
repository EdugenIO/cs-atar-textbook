def find_first(values, target):
    for index, value in enumerate(values):
        if value == target:
            return index
    return -1
original = [9, 2, 7]
ordered = sorted(original)
print("original", original, find_first(original, 9))
print("ordered", ordered, find_first(ordered, 9))
# sorted is a library operation here; it is not an implementation of a taught sort.
