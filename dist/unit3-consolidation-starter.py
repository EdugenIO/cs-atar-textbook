"""Offline consolidation tasks; complete functions before comparing teacher reference."""
def trace_mapping():
    counts = {"camera": 3, "projector": 1}
    alias = counts
    snapshot = counts.copy()
    alias["camera"] -= 1
    snapshot["projector"] = 9
    return counts, snapshot

def insertion_quantity(records):
    """Return a stable quantity-ordered copy of (unique_ID, quantity) records."""
    raise NotImplementedError("Complete station B")

def binary_id(records, target):
    """Ascending unique string IDs required; return index or -1."""
    raise NotImplementedError("Complete station B")

if __name__ == "__main__":
    print(trace_mapping())
