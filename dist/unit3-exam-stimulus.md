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
Quantity records A03:2,A01:1,A02:2. Insertion sort shifts only strictly greater keys. Binary search uses inclusive low/high, unique IDs and returns index or-1.
## Software
Camera/Projector extend Equipment; label() is overridden. Loan reduces stock once, return restores once; repeated return rejected/no-op by contract.
## Network
Host192.168.80.34/27; remote server198.51.100.20; noNAT for the address trace.15clients require8Mbit/s each on100Mbit/s uplink;300MB transfer.
## Extended design
Parent192.168.90.0/24. Studio45endpoints,Staff20,Devices9,Guests5; onegateway per group, endpoint counts already include local infrastructure. Guests must not initiate internal connections; agreed infrastructure services required.
