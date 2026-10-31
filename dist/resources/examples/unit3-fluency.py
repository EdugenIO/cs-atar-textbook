"""Unit 3 Week 1: non-negative integer input and threshold counting.
count_at_least assumes values and minimum are non-negative integers.
The functions do not change the input list. Python 3; no extra packages.
"""

def parse_non_negative_integer(text):
    """Return a non-negative int or None; text comes from input()."""
    try:
        value = int(text)
    except ValueError:
        return None
    if value < 0:
        return None
    return value


def count_at_least(values, minimum):
    """Count every value >= minimum, including duplicates and the boundary."""
    count = 0
    for value in values:
        if value >= minimum:
            count += 1
    return count


def main():
    values = [3, 5, 0, 8]
    minimum = 5
    print(f"At least {minimum}: {count_at_least(values, minimum)}")
    for text in ["0", "5", "-1", "five", "5.0"]:
        value = parse_non_negative_integer(text)
        if value is None:
            print(f"{text!r}: rejected")
        else:
            print(f"{text!r}: accepted {value}")


if __name__ == "__main__":
    main()

