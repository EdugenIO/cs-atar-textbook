"""Offline teaching predictions only; not a firewall, login or access-control service."""
RULES = [
    {"id":"R1","source":"Visitors","destination":"Internet","protocol":"TCP","port":443,"action":"allow"},
    {"id":"R2","source":"Staff","destination":"App","protocol":"TCP","port":443,"action":"allow"},
    {"id":"R3","source":"Staff","destination":"Printer","protocol":"TCP","port":631,"action":"allow"},
    {"id":"R4","source":"Visitors","destination":"Internal","protocol":"any","port":"any","action":"deny"}
]
GRANTS = {("Guest","view","public"),("Learner","view","own"),
          ("Facilitator","view","assigned"),("Facilitator","update_attendance","assigned"),
          ("Registrar","view","all"),("Registrar","export","all")}

def traffic_decision(source, destination, protocol, port, rules=None):
    """First matching rule for NEW initiation; default deny. No state/DNS/IPv6 model."""
    if source not in {"Visitors","Staff"} or destination not in {"Internet","App","Printer","Internal"}:
        raise ValueError("Unknown scenario zone")
    if protocol not in {"TCP","UDP"} or type(port) is not int or not 1 <= port <= 65535:
        raise ValueError("Expected TCP/UDP and valid integer destination port")
    for rule in RULES if rules is None else rules:
        if all(rule[k] == "any" or rule[k] == value for k,value in
               [("source",source),("destination",destination),("protocol",protocol),("port",port)]):
            return rule["action"], rule["id"]
    return "deny", "default"

def permission(role, action, scope):
    """Assumes role/scope already established by trusted logic; no authentication."""
    return (role,action,scope) in GRANTS

if __name__ == "__main__":
    print("Visitor web:", traffic_decision("Visitors","Internet","TCP",443))
    print("Visitor internal:", traffic_decision("Visitors","Internal","TCP",443))
    broad = {"id":"BAD","source":"Visitors","destination":"any","protocol":"any","port":"any","action":"allow"}
    print("Unsafe early allow:", traffic_decision("Visitors","Internal","TCP",443,[broad]+RULES))
    print("Learner export all:", permission("Learner","export","all"))
    print("Facilitator attendance:", permission("Facilitator","update_attendance","assigned"))
