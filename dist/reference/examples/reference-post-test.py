# Post-test loops and validation
# Expected output:
# 7
attempts = iter([0, 12, 7])
while True:
    value = next(attempts)
    if 1 <= value <= 10:
        break
print(value)
