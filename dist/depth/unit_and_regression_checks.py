def collect(score, active):
    if active:
        return score + 10, False
    return score, active
assert collect(0, True) == (10, False)
assert collect(10, False) == (10, False)
assert collect(40, True) == (50, False)
print("3 unit checks passed")
score, active = collect(0, True)
score, active = collect(score, active)
assert (score, active) == (10, False)
print("repeated-collection regression passed")
# assert is useful in a test; do not rely on it to validate real user input.
