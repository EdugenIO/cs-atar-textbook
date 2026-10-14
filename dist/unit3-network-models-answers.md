# Unit 3 week 11 — Teacher answers
Original draft, 14 October 2026. Four explicit lessons; no extra project or task weighting. Teacher review/full-unit audit remain pending.

## Layers and route
OSI high→low: application,presentation,session,transport,network,data link,physical. TCP/IP application groups5–7; transport4; internet3; network/link1–2. Match functions, not a rigid real-protocol placement. Data encapsulates in transport then IP then local frame, carried as signals/bits. TCP is byte-stream transport; UDP retains datagram boundaries.
Client/server IPs remain192.0.2.10/198.51.100.20 and ports51500/443. First two observations frameC→RA/TTL64; router outgoing and after switchB frameRB→S/TTL63. IPv4 checksum updates; new outgoing FCS. Switches do not do ordinary router TTL decrement or rewrite these MACs. ARP obtains local next-hop MAC; DNS obtains name/address information. Documentation prefixes are not RFC 1918 private space; no real school endpoints are used. No NAT/fragmentation/VLAN/tunnel in the trace.

## TCP/UDP
TCP reliable ordered byte stream, recovery/control mechanisms, minimum20-byte header; UDP 8-byte header, no built-in ordering/retry/duplicate suppression. Both include ports/checksum; TCP additional sequence/ack/control/window/header-offset fields, UDP length includes header+payload. Neither inherently encrypts. TCP cannot promise success through all failures. Application protocols over UDP can add reliability: HTTP3 uses QUIC. DNS supports both UDP and TCP.
SYN seq1000 consumes one, SYNACK seq5000/ack1001 consumes one, finalACK seq1001/ack5001 consumes none.40 data bytes seq1001..1040 =>next expected1041; server pureACK seq5001/ack1041. ACK means next byte expected, not packet count. Real packetisation and acknowledgements can differ; this is one synthetic trace.

## Sizing
160 transport payload: TCP180/IP200/frame218/bits1744; UDP168/IP188/frame206/bits1648. Empty TCP IP40 needs6 padding; empty UDP IP28 needs18; both frame64/bits512. Max model TCP payload1460/UDP1472 gives IP1500/frame1518/bits12144. Reject larger IP packets in this model. Options/tags/fragmentation omitted; Ethernet header 14/FCS 4/min payload46, preamble/SFD and inter-frame gap excluded. Transport payload may include TLS bytes, not equal readable text.
Check arithmetic/assumptions, changed/unchanged fields and causal explanations rather than matching terminology alone. Offline script has no capture/transmission or checksum encoding. Use separate teacher traces/answers when sampling independently.

UDP/IPv4 checksum detail: zero can indicate no checksum supplied; checksum rules must be distinguished from delivery/order and from encryption.
