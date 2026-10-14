# Teacher answers — separate, not access-protected
Original formative review, 14 October 2026. Accept equivalent correct reasoning, not just these words. No official weighting/format claim.

Diagnostic:
D1: grid [[0,3],[4,0]]; copy [[9,3],[0,0]]. alias names the same outer list; copied rows are separate lists of immutable integers.
D2: Both positions reference the same row list. A comprehension creates distinct rows.
D3: Apply the contract: reject the duplicate or use an explicitly agreed update. Unchecked assignment replaces the existing value.
D4: Result C01(1), C03(2), C02(2). Strict > shifts only larger keys, preserving equal-key order.
D5: No: it is not sorted by the searched ID key. Choose linear search, dictionary lookup or a separate ID-sorted index.
D6: Use low <= high. One matching record is never checked by the faulty loop; also test empty, absent, first and last.
D7: Polymorphism: method selection depends on the actual object. Inheritance reuses a common interface/behaviour; overriding supplies subclass behaviour.
D8: Return the same loan twice; second attempt must reject/no-op under the contract and leave stock/history consistent. Check active state before changing it.
D9: Network .64, broadcast .95, capacity 30, candidate .65. It must actually be a router interface, not just fit arithmetically.
D10: IP destination remains the remote server; the local Ethernet frame targets the gateway MAC. Routing rebuilds link-layer headers for the next link.
D11: 160 Mbit/s demand exceeds 100; ideal equal share 5 Mbit/s before overhead. Faster client ports alone do not repair the shared bottleneck.
D12: That probe lacked a reply; later response shows the destination was reached. Do not infer forwarding failure at the unanswered hop alone.

Practice marking guide:
P1: grid [[0,3],[4,0]], copy [[9,3],[0,0]] (1 each); alias same object vs separate copied rows (1 each); repeated row shared plus comprehension repair (1 each).
P2: C01,C03,C02 (2 for correct full order;1 for correct quantity grouping); strict > preserves equals (1); wrong ID key order (1); <= repair (1), one matching row -> index 0 (1).
P3: inherited common interface/behaviour (1), overridden subclass method (1), same call chooses actual object's method (1), repeated return must not increment twice and test same loan twice (1).
P4: explicit unchanged loan behaviour/message criterion (1), identified before/after version (1), regression for valid and rejected operation preserving state (1), responsibility with concrete synthetic-data/attribution/accessible-feedback action (1).
N1:255.255.255.224; .64; .95; .65–.94;30; .65 or another usable nonduplicate gateway candidate that must be a configured reachable router (1 each).
N2: remote server IP stays (1), local frame goes to gateway MAC (1); routing/filtering separate from VLAN isolation (1); at routed inter-zone firewall with no bypass path (1); narrow DNS/DHCP or restricted management dependency specified (1).
N3:160 Mbit/s (1), exceeds 100 (1), ideal 5 Mbit/s (1),32 seconds ideal (1), unchanged 100 Mbit/s internet/server/other relevant bottleneck (1).
N4: no reply at intermediate probe (1), destination response disproves inference of complete forwarding failure at that hop (1), ICMP filtering/rate limiting/response prioritisation or reply loss (1), repeat authorised probes/check destination service or corroborating logs with stated purpose (1).
Do not award an unqualified claim that ping proves all traffic works or VLAN labels alone enforce security.

Fresh transfer answers: use [C07:1,C05:1,C06:3] -> quantity order C07,C05,C06; do not ID-binary-search it. Host 192.168.60.34/28 -> mask 255.255.255.240, network .32,broadcast .47,hosts .33–.46,14 ordinary capacity.12 clients x6=72 Mbit/s fits 100 in ideal capacity only;400 MB at 80 Mbit/s ->40s ideal.
Teacher: lesson 3 practice is formative; lesson 4 feedback/transfer is embedded. Confirm symbol conventions, live-tool evidence and independent review before assessed use.
