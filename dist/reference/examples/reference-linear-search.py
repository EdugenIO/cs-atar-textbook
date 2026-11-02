# Linear search
# Expected output:
# 0
# -1
def linear_search(values, target):
    for index in range(len(values)):
        if values[index] == target:
            return index
    return -1

print(linear_search([8, 3, 8], 8))
print(linear_search([], 8))
