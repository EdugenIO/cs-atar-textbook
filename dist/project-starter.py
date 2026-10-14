"""Club-order learning project: unfinished starter, not a complete solution.
Use synthetic IDs and a dedicated practice folder. Replace the stubs.
"""
BADGE_PRICE_CENTS = 300

def read_order_id():
    """Return a non-empty synthetic label without commas or newlines."""
    raise NotImplementedError("Design and implement ID validation")

def read_quantity():
    """Return a non-negative integer; let the user retry invalid input."""
    raise NotImplementedError("Design and implement quantity validation")

def order_cost(quantity):
    """Return the cost in cents for a valid quantity."""
    raise NotImplementedError("Implement and unit-test the calculation")

def save_order(order_id, quantity, cost_cents):
    """Append one newline-terminated record; define write-error behaviour."""
    raise NotImplementedError("Implement storage in a practice folder")

def summarise_orders(quantities):
    """Return totals and first largest index; handle an empty session."""
    raise NotImplementedError("Implement array processing")

def main():
    raise NotImplementedError("Coordinate the modules using your pseudocode")

if __name__ == "__main__":
    print("Unfinished project starter: implement the stubs before running main.")
