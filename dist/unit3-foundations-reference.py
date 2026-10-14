"""Original offline foundation retrieval examples."""
from itertools import product

def loop_counts(n):
    """Non-negative integer n required; fixed/pre/post body counts."""
    if isinstance(n, bool) or not isinstance(n, int) or n < 0:
        raise ValueError("n must be a non-negative integer")
    fixed = 0
    for _ in range(n):
        fixed += 1
    remaining, pre = n, 0
    while remaining > 0:
        pre += 1
        remaining -= 1
    post = 0
    while True:
        post += 1
        if post >= n:
            break
    return fixed, pre, post

def policies(blocked, trained, supervisor):
    return (not blocked and trained or supervisor,
            not blocked and (trained or supervisor))

LIMIT = 5
def change(number, values):
    number = number + LIMIT
    values.append(number)
    values = [99]
    return number

def scope_trace():
    number, values = 2, [1]
    result = change(number, values)
    return number, values, result, LIMIT

if __name__ == "__main__":
    print("Loop counts:", loop_counts(0), loop_counts(3))
    print("Scope:", scope_trace())
    print("blocked trained supervisor | loose strict")
    for flags in product([False, True], repeat=3):
        print(*flags, "|", *policies(*flags))
