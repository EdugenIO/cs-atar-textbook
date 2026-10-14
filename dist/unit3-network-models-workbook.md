# Unit 3 week 11 — Network models and protocols
Original draft, 14 October 2026. Four lessons; paper/offline synthetic examples only.

## A — Layers and nested units
List OSI 1–7 and their responsibilities. Map to four-layer TCP/IP application/transport/internet/network . Explain why network/link differs from OSI network . Assemble data→TCP segment or UDP datagram→IP packet→frame→bits. Distinguish a conceptual mapping from actual protocol boundaries.

## B — Follow a routed message
Use unit3-routed-path.svg and blank trace. Client 192.0.2.10/24, gateway 192.0.2.1; server 198.51.100.20/24, router B 198.51.100.1. MAC aliases C,RA,RB,S. Sender TCP port 51500, destination 443, initial TTL 64. Complete all observations, then explain why switches preserve MACs/TTL and the router changes local addresses/TTL but not endpoint IPs/ports. No NAT, tags, fragmentation or tunnel. Explain local ARP versus DNS; these IPs are documentation blocks, not real/private school addresses.

## C — Transport choices and fields
Identify fields in both headers and fields unique to TCP. Trace SYN 1000/SYN ACK 5000 then 40 payload bytes from 1001. Explain ACK 1001/5001/1041, SYN sequence consumption and pure ACK. Compare file transfer versus timely media, reliability/encryption and checksum/retransmission. Discuss DNS TCP/UDP and HTTP/3 over QUIC/UDP as counterexamples to simplistic labels.

## D — Size and diagnose
Compute transport/IP/frame lengths and bits for 160 bytes TCP/UDP using the chapter assumptions. Repeat with 0 payload to discover Ethernet padding, and with maximum unfragmented payloads 1460/1472. Use unit3-network-sizing.py offline to check. Diagnose scenario cards with layer/field/device reasoning. Submit completed traces, arithmetic assumptions and a justified transport choice. No captures or network changes required.
