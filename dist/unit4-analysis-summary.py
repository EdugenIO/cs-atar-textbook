"""Offline synthetic log counts; no verdict, network traffic or secret data."""
from pathlib import Path
from collections import Counter
import csv

def summarise(rows):
    events = Counter()
    quantities = Counter()
    for row in rows:
        events[(row["event"],row["outcome"])] += 1
        if row["event"] in {"export","update"} and row["outcome"] == "allow":
            quantities[row["event"]] += int(row["quantity"])
    return dict(events), dict(quantities)

if __name__ == "__main__":
    rows = list(csv.DictReader(Path(__file__).with_name("unit4-analysis-log.csv").read_text(encoding="utf-8").splitlines()))
    print("Synthetic event counts / recorded quantities:", summarise(rows))
    print("These counts do not establish compromise, identity, intent or disclosure.")
