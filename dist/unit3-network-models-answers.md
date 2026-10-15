# Unit 3 week 11 — Explained answers
Original draft, 14 October 2026. Four explicit lessons; no extra project. Teacher review/full-unit audit remain pending.

## Layers and route
OSI high→low: application,presentation,session,transport,network,data link,physical. TCP/IP application groups 5–7; transport 4; internet 3; network/link 1–2. Match functions, not a rigid real-protocol placement. Data encapsulates in transport then IP then local frame, carried as signals/bits. TCP is byte-stream transport; UDP retains datagram boundaries.
Client/server IPs remain 192.0.2.10/198.51.100.20 and ports 51500/443. First two observations frameC→RA/TTL 64; router outgoing and after switchB frameRB→S/TTL 63. IPv4 checksum updates; new outgoing FCS. Switches do not do ordinary router TTL decrement or rewrite these MACs. ARP obtains local next-hop MAC; DNS obtains name/address information. Documentation prefixes are not RFC 1918 private space; no real school endpoints are used. No NAT/fragmentation/VLAN/tunnel in the trace.

## TCP/UDP
TCP reliable ordered byte stream, recovery/control mechanisms, minimum 20-byte header; UDP 8-byte header, no built-in ordering/retry/duplicate suppression. Both include ports/checksum; TCP additional sequence/ack/control/window/header-offset fields, UDP length includes header+payload. Neither inherently encrypts. TCP cannot promise success through all failures. Application protocols over UDP can add reliability: HTTP/3 uses QUIC. DNS supports both UDP and TCP.
SYN seq 1000 consumes one, SYNACK seq 5000/ack 1001 consumes one, finalACK seq 1001/ack 5001 consumes none.40 data bytes seq 1001..1040 =>next expected 1041; server pureACK seq 5001/ack 1041. ACK means next byte expected, not packet count. Real packetisation and acknowledgements can differ; this is one synthetic trace.

## Sizing
160 transport payload: TCP 180/IP200/frame 218/bits 1744; UDP 168/IP188/frame 206/bits 1648. Empty TCP IP40 needs 6 padding; empty UDP IP28 needs 18; both frame 64/bits 512. Max model TCP payload 1460/UDP 1472 gives IP1500/frame 1518/bits 12144. Reject larger IP packets in this model. Options/tags/fragmentation omitted; Ethernet header 14/FCS 4/min payload 46, preamble/SFD and inter-frame gap excluded. Transport payload may include TLS bytes, not equal readable text.
Check arithmetic/assumptions, changed/unchanged fields and causal explanations rather than matching terminology alone. Offline script has no capture/transmission or checksum encoding. Use separate teacher traces/answers when sampling independently.

UDP/IPv4 checksum detail: zero can indicate no checksum supplied; checksum rules must be distinguished from delivery/order and from encryption.
