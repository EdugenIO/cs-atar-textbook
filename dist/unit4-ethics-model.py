"""Counts supplied fictional rows only. Not anonymisation or a privacy compliance test."""
from collections import Counter
from pathlib import Path
import csv

def workshop_counts(rows):
    counts = Counter()
    for row in rows:
        workshop = row["Workshop"]
        if workshop not in {"Python", "Networks", "Security"}:
            raise ValueError("Unknown workshop")
        counts[workshop] += 1
    return dict(sorted(counts.items()))

def teaching_display(counts, minimum=3):
    """Arbitrary threshold; counts are bookings, not necessarily unique people."""
    if type(minimum) is not int or minimum < 1:
        raise ValueError("Minimum must be a positive integer")
    if any(type(n) is not int or n < 0 for n in counts.values()):
        raise ValueError("Counts must be non-negative integers")
    return {name: n if n >= minimum else "suppressed" for name,n in counts.items()}

if __name__ == "__main__":
    with Path(__file__).with_name("unit4-ethics-fictional.csv").open(encoding="utf-8",newline="") as file:
        rows = list(csv.DictReader(file))
    counts = workshop_counts(rows)
    print("Internal teaching counts:", counts)
    print("Teaching display:", teaching_display(counts))
    print("Neither output proves anonymity. Do not use real student records.")
