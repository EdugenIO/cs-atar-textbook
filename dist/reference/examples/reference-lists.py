# One-dimensional lists and traversal
# Expected output:
# 0 6
# 1 7
# 2 9
# True
scores = [5, 7]
scores.append(9)
scores[0] = 6
for index in range(len(scores)):
    print(index, scores[index])
print(7 in scores)
