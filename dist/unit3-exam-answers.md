# Explained answers — separate, not access-protected
Original draft 14 October 2026. Accept equivalent correct evidence; Use the explanations for self-review.

## S1 
stock A01:0,A02:0; snapshot A01:2,A02:1; a separate shallow mapping  of immutable integer values, replaced in stock rather than mutating nested values.

## S2 
A01,A03,A02; strict > shifts only larger values; not ID-ordered, so direct ID binary search precondition fails.

## S3 
low <= high; one matching record  returns index 0; ascending order by the same searched key.

## S4 
Subclass provides its own method implementation  while sharing the inherited interface/common behaviour; same call dispatches to actual object method; returning same active loan twice must not restore stock twice.

## S5 
255.255.255.224;192.168.80.32;192.168.80.63;30 ordinary usable.

## S6 
IP stays remote, local frame targets gateway MAC; TCP ordered reliable byte stream versus UDP without those delivery/order guarantees; neither protocol choice alone guarantees encryption.

## S7 
120 Mbit/s  exceeds 100 shared link;24 seconds; overhead/other traffic/server/storage limit actual transfer.

## S8 
VLANs separate L2 broadcast domains; routing rules/actual enforcement determine inter-zone permission; missing probe response  is not proof of broken forwarding when destination responds.

## E1 
Initialises output and traverses records, tests quantity>0, appends correct ID preserving order, returns without input mutation. Empty->[], all-zero->[], mixed A01:0,A02:2,A03:1 ->[A02,A03]. Dictionary supports direct unique-key lookup; list retains an ordered view but may need traversal.

## E2 
Studio/26,Staff/27,Devices/28,Guests/29 (needs: 46, 21, 10 and 6 usable addresses). Example.0/26,.64/27,.96/28,.112/29: aligned, disjoint/inside the parent block. Gateways.1,.65,.97,.113 (these must be actual router interfaces). Routed boundary firewall/filtering; narrow DNS/DHCP dependency.

Fresh retry:.82/28 network.80,broadcast.95,hosts.81–.94,14 usable; gateway.81 subject to actual configuration. Demand is 12 × 7 = 84 Mbit/s; 250 MB × 8 ÷ 80 Mbit/s gives an ideal 25-second transfer. IDs B02,B04, source unchanged.
