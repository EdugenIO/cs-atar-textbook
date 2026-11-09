"""Small recovery exercise, version 1. Code MIT."""
VERSION = 1
MINIMUM = 5


def count_ready(values):
    count = 0
    for value in values:
        if value >= MINIMUM:
            count += 1
    return count
