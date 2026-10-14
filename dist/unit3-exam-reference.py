"""Offline teacher reference for E1; valid input contract only."""
def available_ids(records):
    result = []
    for equipment_id, quantity in records:
        if quantity > 0:
            result.append(equipment_id)
    return result

def stock_trace():
    stock = {"A01": 2, "A02": 1}
    snapshot = stock.copy()
    for key in ["A01", "A02", "A01"]:
        if stock[key] > 0:
            stock[key] -= 1
    return stock, snapshot

if __name__ == "__main__":
    print(stock_trace())
    print(available_ids([("A01", 0), ("A02", 2), ("A03", 1)]))
