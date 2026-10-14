"""Offline byte model. No sockets, capture, transmission or school network access.
IPv4/TCP minimum headers, UDP, untagged Ethernet II; no fragmentation.
Preamble/SFD and inter-frame gap are excluded. TCP payload may include TLS bytes.
"""
def packet_sizes(payload_bytes, protocol="TCP"):
    if type(payload_bytes) is not int or payload_bytes < 0:
        raise ValueError("Payload must be a non-negative integer byte count")
    if protocol not in ("TCP", "UDP"):
        raise ValueError("Use TCP or UDP")
    transport_header = 20 if protocol == "TCP" else 8
    transport_bytes = transport_header + payload_bytes
    ip_bytes = 20 + transport_bytes
    if ip_bytes > 1500:
        raise ValueError("IPv4 packet exceeds this model's Ethernet MTU; fragmentation is outside scope")
    padding_bytes = max(0, 46 - ip_bytes)
    frame_bytes = 14 + ip_bytes + padding_bytes + 4
    return {"transport_bytes": transport_bytes, "ip_bytes": ip_bytes,
            "padding_bytes": padding_bytes, "frame_bytes": frame_bytes,
            "frame_bits": frame_bytes * 8}

if __name__ == "__main__":
    for protocol in ["TCP", "UDP"]:
        print(protocol, packet_sizes(160, protocol))
