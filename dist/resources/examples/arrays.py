scores = [12, 7, 19, 19]
total = 0
for score in scores:
    total += score
print("Total:", total)

if len(scores) == 0:
    print("No maximum: the list is empty")
else:
    best_index = 0
    for index in range(1, len(scores)):
        if scores[index] > scores[best_index]:
            best_index = index
    print("First maximum index:", best_index)
    print("Maximum value:", scores[best_index])

