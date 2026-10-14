# Fictional media-centre design brief
Unit 3 week 13. Four lessons, original draft 14 October 2026.
Use previous addressing: Media .0/26 (50 endpoints + gateway), Staff .64/27 (25 + gateway), Devices .96/28 (12 + gateway), Visitors .112/28 (6 + gateway), all in 192.168.50.0/24. Reserve .128/25. Printer is .98. Infrastructure endpoints are included in the supplied group counts.
Media, Staff and Visitors require internet web access. Staff needs IPP to the Devices printer. Visitors must not initiate internal connections. Document the DNS/DHCP arrangements and a restricted management path as design additions. No public internal server is required.
20 simultaneous Media clients need 8 Mbit/s each; compare a 100 Mbit/s shared uplink with 1 Gbit/s. State whether traffic crosses the internet. Internet edge is 100 Mbit/s for the comparison.
Deliver a requirements table, Cisco-convention logical diagram, physical link plan, addressing/VLAN table, service policy, capacity reasoning, acceptance tests and evaluation. No purchase or real school configuration is required.
