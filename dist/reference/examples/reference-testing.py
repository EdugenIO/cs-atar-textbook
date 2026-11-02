# Trace tables, assertions and test cases
# Expected output:
# Invalid rejected
# Checks passed
def delivery(total):
    if total < 0:
        raise ValueError("Negative total")
    return 0 if total >= 50 else 5

assert delivery(49) == 5
assert delivery(50) == 0
try:
    delivery(-1)
except ValueError:
    print("Invalid rejected")
print("Checks passed")
