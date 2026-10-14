# Unit 3 week 14 — integrated review workbook
Four lessons, original draft 14 October 2026.

## Diagnostic
Record confidence before answering; mark only afterwards.
D1: Trace the grid/alias/copy example below. Explain why only one grid changes after copy[0][0] = 9.
D2: What goes wrong with [[0,0]] * 2 when one row is changed?
D3: A dictionary maps unique equipment IDs to objects. What must happen before inserting a duplicate ID?
D4: Trace insertion sorting by the second tuple item. Why is C03 still before C02?
D5: May binary search by ID be applied to that quantity-sorted result?
D6: Repair find_id and give a smallest revealing test.
D7: Two objects inherit Equipment and override label(). What does calling item.label() through a mixed list illustrate?
D8: A return operation increments stock twice when the same loan is returned twice. What test and guard are needed?
D9: For host 192.168.50.70/27 give network, broadcast, ordinary capacity and a valid candidate gateway.
D10: Explain IP destination versus next-hop MAC when .70/27 sends to 198.51.100.20 through .65, with no NAT.
D11: 20 clients each require 8 Mbit/s through a 100 Mbit/s uplink. Can it meet demand?
D12: Traceroute has an unanswered middle hop but the destination responds. What can you conclude?

Grid trace:
```python
grid = [[0, 0] for _ in range(2)]
grid[0][1] = 3
alias = grid
copy = [row[:] for row in grid]
alias[1][0] = 4
copy[0][0] = 9
print(grid)
print(copy)
```
Quantity sort:
```python
records = [("C03", 2), ("C01", 1), ("C02", 2)]
for i in range(1, len(records)):
    item = records[i]
    j = i - 1
    while j >= 0 and records[j][1] > item[1]:
        records[j + 1] = records[j]
        j -= 1
    records[j + 1] = item
print(records)
```
Search fault:
```python
def find_id(records, target):
    low, high = 0, len(records) - 1
    while low < high:  # deliberate fault
        mid = (low + high) // 2
        if records[mid][0] == target:
            return mid
        if records[mid][0] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
```

## Guided case
Use Media .10/26 gateway.1; Staff.64/27, Devices.96/28 printer.98, Visitors.112/28 within192.168.50.0/24. Draw the logical network with specified Cisco symbols, prefixes, gateways, policy boundary and representative end devices. Trace permitted Staff printing and denied Visitor initiation. Explain remote IP/next-hop MAC, TCP/UDP suitability and IPv6 notation. Calculate20x8 demand through100Mbit/s and identify assumptions.
## Evidence cases
A: assigned IP ping succeeds, name unresolved. B: ping succeeds, web fails. C: unanswered middle traceroute hop followed by destination response. D: guest-to-internal ping times out. For each give observation, two hypotheses, next test and a limited conclusion.
## Fresh transfer (after correction)
Sort [C07:1,C05:1,C06:3] stably by quantity and justify ID search choice. Compute all ordinary subnet details for192.168.60.34/28. Compare12clients x6Mbit/s with100Mbit/s. Estimate400MB at80Mbit/s. Explain one condition that could make the observed transfer slower.
## Reflection
Use the CSV error log: answer/confidence, misconception, corrected rule, evidence, fresh retry and priority. Finish with two specific next actions for week15.
