# Unit 3 week 12 — Addressing and subnetting workbook
Original draft 14 October 2026. Four lessons; hypothetical paper/offline networks.
A: compare32/128-bit addresses, IPv4 decimal/IPv6 hex notation; list RFC 1918 ranges and special non-public counterexamples. Explain prefix/mask and private-address limitations.
B: show binary AND and ranges for 192.168.50.70/27; give mask,network,broadcast,first/last ordinary host and capacity. Transfer to 10.1.18.200/20. Compare.94/.100 destinations from.70/27 and validate.65/.1/.64/.95/.70 gateway candidates. Distinguish membership/allocation/reachability.
C: split a /24 into four /26 blocks; then complete unit3-addressing-plan-blank.csv inside 192.168.50.0/24. Counts include endpoints plus one gateway:51,26,13,7. Allocate larger blocks first, align them, avoid overlaps and name spare space. Explain why Visitors cannot fit /29 and why Staff .32/27 overlaps Media .0/26.
D: expand/compress2001:db8:50:1::70, identify /64 prefix and distinguish the second subnet. Explain why :: only once, why hex70 is not decimal70, and why IPv6 does not use the ordinary IPv4 subtract-two rule. Solve scenario cards and verify manual work with the offline script.
Record assumptions, calculations, design evidence and corrected misconceptions. No live configuration changes are required.
