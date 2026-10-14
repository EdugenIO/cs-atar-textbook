"""Offline ordinary-IPv4-LAN calculator; no network configuration or traffic.
CIDR prefix 0..30 only. /31 point-to-point and /32 host routes are outside this
LAN host-range model. IPv6 is taught separately; do not apply subtract-two to it.
"""
from ipaddress import IPv4Interface, IPv4Address, IPv4Network

def _lan(cidr):
    if not isinstance(cidr, str) or "/" not in cidr:
        raise ValueError("Use an IPv4 address with /prefix")
    address, prefix = cidr.strip().split("/", 1)
    if not prefix.isdecimal() or not 0 <= int(prefix) <= 30:
        raise ValueError("This ordinary LAN model uses integer prefixes 0..30")
    return IPv4Interface(address + "/" + prefix)

def lan_details(cidr):
    interface = _lan(cidr)
    net = interface.network
    return {"network": str(net.network_address), "prefix": net.prefixlen,
            "mask": str(net.netmask), "broadcast": str(net.broadcast_address),
            "first_host": str(net.network_address + 1),
            "last_host": str(net.broadcast_address - 1),
            "total_addresses": net.num_addresses, "usable_hosts": net.num_addresses - 2}

def same_subnet(source_cidr, destination):
    return IPv4Address(destination) in _lan(source_cidr).network

def gateway_valid(host_cidr, gateway):
    host = _lan(host_cidr)
    candidate = IPv4Address(gateway)
    net = host.network
    # Ordinary directly-connected LAN assumptions, not proof of reachability.
    low, high = net.network_address + 1, net.broadcast_address - 1
    return low <= host.ip <= high and low <= candidate <= high and candidate != host.ip

def smallest_lan_prefix(required_addresses):
    # Requirement includes gateway, devices, static infrastructure and growth.
    if type(required_addresses) is not int or not 1 <= required_addresses <= 2**32 - 2:
        raise ValueError("Require a positive integer count within IPv4 LAN capacity")
    for prefix in range(30, -1, -1):
        if 2**(32 - prefix) - 2 >= required_addresses:
            return prefix

def is_rfc1918(address):
    item = IPv4Address(address)
    return any(item in IPv4Network(block) for block in
               ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"])

if __name__ == "__main__":
    print(lan_details("192.168.50.70/27"))
    print("Gateway .65:", gateway_valid("192.168.50.70/27", "192.168.50.65"))
    print("Gateway .1:", gateway_valid("192.168.50.70/27", "192.168.50.1"))
    print("51 addresses need /", smallest_lan_prefix(51), sep="")
