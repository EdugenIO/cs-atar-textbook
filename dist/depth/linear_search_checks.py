def find_first(values, target):
    for index in range(len(values)):
        if values[index] == target:
            return index
    return -1
for values, target in [([], 7), ([4, 7, 7], 7), ([4, 7], 5)]:
    print(find_first(values, target))
