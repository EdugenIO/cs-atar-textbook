from ipaddress import ip_address, ip_network
local = ip_network("192.168.10.0/24")
for destination in ["192.168.10.50", "192.168.20.50"]:
    action = "local link" if ip_address(destination) in local else "use configured gateway"
    print(destination, action)
# This models a simple one-interface host decision; it does not send packets.
