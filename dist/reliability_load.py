"""Bounded, sequential classroom workload; not a concurrency/server test.
Run python reliability_load.py --records 100 --repeats 3
Optional --csv synthetic-load.csv creates a new file only (no overwrite).
"""
import argparse
import csv
import io
import json
from pathlib import Path
from statistics import median
from time import perf_counter
from project_reference import BookingSystem, Equipment

def run_load(records, repeats=3):
    if type(records) is not int or not 1 <= records <= 5000:
        raise ValueError("Records must be an integer from 1 to 5000")
    if type(repeats) is not int or not 1 <= repeats <= 10:
        raise ValueError("Repeats must be an integer from 1 to 10")
    system = BookingSystem([Equipment("E01", "Synthetic item", records)], ["B001"])
    identifiers = [f"L{number:06d}" for number in range(records, 0, -1)]
    start = perf_counter()
    for identifier in identifiers:
        if not system.borrow(identifier, "B001", "E01", 1):
            raise AssertionError("Valid synthetic issue failed")
    issue_seconds = perf_counter() - start
    start = perf_counter()
    returned = 0
    for identifier in identifiers[::4]:
        if not system.return_loan(identifier):
            raise AssertionError("Valid synthetic return failed")
        returned += 1
    if system.borrow(identifiers[0], "B001", "E01", 1):
        raise AssertionError("Historical duplicate accepted")
    if system.find_equipment("E01") is None or system.find_equipment("E99") is not None:
        raise AssertionError("Search contract failed")
    mixed_seconds = perf_counter() - start
    timings = []
    for _ in range(repeats):
        start = perf_counter()
        report = system.outstanding()
        timings.append(perf_counter() - start)
        # Correctness checks are outside each report timing.
        if len(report) != records - returned or [r["loan_id"] for r in report] != sorted(r["loan_id"] for r in report):
            raise AssertionError("Report count/order failed")
    history = system.history()
    if len(history) != records or system.find_equipment("E01").available() != returned:
        raise AssertionError("Stock/history invariant failed")
    if [r["loan_id"] for r in history] != identifiers:
        raise AssertionError("Report reordered history")
    return {"records": records, "returns": returned, "active": records - returned,
            "duplicate_rejections": 1, "search_requests": 2,
            "issue_batch_seconds": issue_seconds, "mixed_batch_seconds": mixed_seconds,
            "report_repeats": repeats, "report_seconds_median": median(timings),
            "report_seconds_max": max(timings)}, history

def file_trial(path, history):
    fields = ["loan_id", "borrower_id", "equipment_id", "quantity", "active"]
    start = perf_counter()
    # Exclusive create: choose another filename rather than overwriting work.
    with open(path, "x", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, lineterminator="\n")
        writer.writeheader()
        writer.writerows(history)
    write_seconds = perf_counter() - start
    start = perf_counter()
    with open(path, newline="", encoding="utf-8") as handle:
        rows_read = sum(1 for _ in csv.DictReader(handle))
    read_seconds = perf_counter() - start
    if rows_read != len(history):
        raise AssertionError("CSV row count mismatch")
    return {"csv_bytes": Path(path).stat().st_size, "csv_rows": rows_read,
            "csv_write_seconds": write_seconds, "csv_read_seconds": read_seconds}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--records", type=int, default=100)
    parser.add_argument("--repeats", type=int, default=3)
    parser.add_argument("--csv", help="Optional new synthetic CSV path")
    args = parser.parse_args()
    result, history = run_load(args.records, args.repeats)
    if args.csv:
        result.update(file_trial(args.csv, history))
    print(json.dumps(result, indent=2))
