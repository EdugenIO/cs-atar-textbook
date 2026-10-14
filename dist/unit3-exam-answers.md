# Teacher marking guide — separate, not access-protected
Original draft 14 October 2026. Accept equivalent correct evidence; no official grade/weighting claim.

## S1 (4)
stock A01:0,A02:0 (1); snapshot A01:2,A02:1 (1); a separate shallow mapping (1) of immutable integer values, replaced in stock rather than mutating nested values (1).

## S2 (4)
A01,A03,A02 (2;1 for correct quantity grouping); strict > shifts only larger values (1); not ID-ordered, so direct ID binary search precondition fails (1).

## S3 (4)
low <= high (1); one matching record (1) returns index 0 (1); ascending order by the same searched key (1).

## S4 (4)
Subclass provides its own method implementation (1) while sharing the inherited interface/common behaviour (1); same call dispatches to actual object method (1); returning same active loan twice must not restore stock twice (1).

## S5 (4)
255.255.255.224;192.168.80.32;192.168.80.63;30 ordinary usable (1 each).

## S6 (4)
IP stays remote (1), local frame targets gateway MAC (1); TCP ordered reliable byte stream versus UDP without those delivery/order guarantees (1); neither protocol choice alone guarantees encryption (1).

## S7 (4)
120 Mbit/s (1) exceeds 100 shared link (1);24 seconds (1); overhead/other traffic/server/storage limit actual transfer (1).

## S8 (4)
VLANs separate L2 broadcast domains (1); routing rules/actual enforcement determine inter-zone permission (1); missing probe response (1) is not proof of broken forwarding when destination responds (1).

## E1 (8)
Initialises output and traverses records (1), tests quantity>0 (1), appends correct ID preserving order (1), returns without input mutation (1). Empty->[] (1), all-zero->[] (1), mixed A01:0,A02:2,A03:1 ->[A02,A03] (1). Dictionary supports direct unique-key lookup; list retains an ordered view but may need traversal (1).

## E2 (10)
Studio/26,Staff/27,Devices/28,Guests/29 (1 each:46,21,10,6 required). Example .0/26,.64/27,.96/28,.112/29: aligned (1), disjoint/inside the parent block (1). Gateways .1,.65,.97,.113 (2 all valid;1 if two/three correct; actual router interfaces required). Routed boundary firewall/filtering (1); narrow DNS/DHCP dependency (1).

Fresh retry: .82/28 network .80,broadcast .95,hosts .81–.94,14 usable ; gateway .81 subject to actual configuration. Demand is 12 × 7 = 84 Mbit/s; 250 MB × 8 ÷ 80 Mbit/s gives an ideal 25-second transfer. IDs B02,B04, source unchanged.
