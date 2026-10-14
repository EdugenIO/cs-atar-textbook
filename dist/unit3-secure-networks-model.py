"""Offline classroom predictions; not a firewall or network test."""
from math import isfinite

ZONES = {"Media", "Staff", "Devices", "Visitors", "Internet"}
def allowed(source, destination, service):
    """Predict NEW inter-zone initiation. Infrastructure/state are outside model."""
    if source not in ZONES or destination not in ZONES:
        raise ValueError("Unknown zone")
    if not isinstance(service, str):
        raise ValueError("Service must be a string")
    return ((source in {"Media", "Staff", "Visitors"} and destination == "Internet" and service == "web_tcp443")
            or (source == "Staff" and destination == "Devices" and service == "printer_tcp631"))

def _number(value, positive=False):
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not isfinite(value) or value < 0 or (positive and value == 0):
        raise ValueError("Expected finite non-negative number; capacity must be positive")
    return value

def capacity(clients, per_client_mbps, uplink_mbps):
    if isinstance(clients, bool) or not isinstance(clients, int) or clients < 1:
        raise ValueError("Clients must be a positive integer")
    demand = clients * _number(per_client_mbps)
    link = _number(uplink_mbps, True)
    return {"demand_mbps": demand, "demand_ratio": demand / link,
            "ideal_equal_share_mbps": link / clients, "fits_capacity": demand <= link}

def ideal_seconds(file_mb, link_mbps):
    return _number(file_mb) * 8 / _number(link_mbps, True)

if __name__ == "__main__":
    print(capacity(20, 8, 100))
    print("400 MB at 100 Mbit/s, ideal seconds:", ideal_seconds(400, 100))
    print("Visitors -> Staff, printer:", allowed("Visitors", "Staff", "printer_tcp631"))
    print("Staff -> Devices, printer:", allowed("Staff", "Devices", "printer_tcp631"))
