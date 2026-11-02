# Pre-test loops and sentinel values
# Expected output:
# 10
readings = [4, 6, -1, 99]
index = 0
total = 0
while index < len(readings) and readings[index] != -1:
    total += readings[index]
    index += 1
print(total)
