"""Run beside event-logs-raw.csv in a disposable learning folder.
Fictional reference rules: EventID unique; trusted S1; UTC Z timestamps;
hosts LAB1..LAB3; approved 'ok' alias means 200; status 200/403/404/500;
duration is a non-negative integer; >1000 is reviewed, never auto-deleted.
Raw data is read only. Outputs go to separate worked-*.csv files.
"""
import csv
from datetime import datetime
from pathlib import Path

def normalise(row):
    if row["Source"] != "S1":
        raise ValueError("unverified source")
    event_id = row["EventID"].strip()
    if not event_id:
        raise ValueError("missing event ID")
    stamp = row["Timestamp"].strip()
    parsed = datetime.strptime(stamp, "%Y-%m-%dT%H:%M:%SZ")
    if parsed.strftime("%Y-%m-%dT%H:%M:%SZ") != stamp:
        raise ValueError("timestamp must use the stated canonical format")
    stamp = parsed.strftime("%Y-%m-%dT%H:%M:%SZ")
    host = row["Host"].strip().upper()
    if host not in {"LAB1", "LAB2", "LAB3"}:
        raise ValueError("unknown host")
    status_text = row["Status"].strip().lower()
    status = 200 if status_text == "ok" else int(status_text)
    if status not in {200, 403, 404, 500}:
        raise ValueError("unknown status")
    duration = int(row["DurationMS"].strip())
    if duration < 0:
        raise ValueError("negative duration")
    return (event_id, stamp, host, status, duration, "S1")

def clean(rows):
    candidates, decisions = [], {}
    for row in rows:
        try:
            record = normalise(row)
        except ValueError:
            decisions[row["RawRow"]] = ("hold", "verify source, format or domain against rules")
        else:
            candidates.append((row["RawRow"], record))
    versions = {}
    for raw_id, record in candidates:
        versions.setdefault(record[0], set()).add(record)
    kept, seen = [], set()
    for raw_id, record in candidates:
        if len(versions[record[0]]) > 1:
            decisions[raw_id] = ("hold", "conflicting records share an event ID")
        elif record in seen:
            decisions[raw_id] = ("suppress duplicate", "same normalised event already retained")
        else:
            kept.append(record)
            seen.add(record)
            note = "review unusually long duration; preserve original value" if record[4] > 1000 else "matches stated rules after documented normalisation"
            decisions[raw_id] = ("keep", note)
    return kept, [(row["RawRow"],) + decisions[row["RawRow"]] for row in rows]

if __name__ == "__main__":
    folder = Path(__file__).resolve().parent
    with (folder / "event-logs-raw.csv").open(newline="", encoding="utf-8") as source:
        rows = list(csv.DictReader(source))
    kept, decisions = clean(rows)
    for filename, header, records in [
        ("worked-clean.csv", ["EventID", "Timestamp", "Host", "Status", "DurationMS", "Source"], kept),
        ("worked-decisions.csv", ["RawRow", "Decision", "Reason"], decisions),
    ]:
        with (folder / filename).open("w", newline="", encoding="utf-8") as output:
            writer = csv.writer(output)
            writer.writerow(header)
            writer.writerows(records)
    print("Retained", len(kept))
    print("Non-success", sum(record[3] != 200 for record in kept))
    print("Total duration", sum(record[4] for record in kept))
