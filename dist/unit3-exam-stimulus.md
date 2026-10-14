# Original stimulus
All records/networks synthetic.

## Stock trace
```python
stock = {"A01": 2, "A02": 1}
snapshot = stock.copy()
for key in ["A01", "A02", "A01"]:
    if stock[key] > 0:
        stock[key] -= 1
print(stock)
print(snapshot)
```
## Algorithms
Quantity records A03:2,A01:1,A02:2. Insertion sort shifts only strictly greater keys. Binary search uses inclusive low/high, unique IDs and returns index or -1.
## Software
Camera/Projector extend Equipment; label() is overridden. Loan reduces stock once, return restores once; repeated return rejected/no-op by contract.
## Network
Host 192.168.80.34/27; remote server 198.51.100.20; noNAT for the address trace.15 clients require 8 Mbit/s each on 100 Mbit/s uplink;300 MB transfer.
## Extended design
Parent 192.168.90.0/24. Studio 45endpoints,Staff 20,Devices 9,Guests 5; onegateway per group, endpoint counts already include local infrastructure. Guests must not initiate internal connections; agreed infrastructure services required.
