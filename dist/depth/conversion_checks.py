def read_quantity(text):
    quantity = int(text)
    if quantity < 0:
        raise ValueError("Quantity must be non-negative")
    return quantity
for text in ["0", " 4 ", "-1", "three", "2.5"]:
    try:
        print(repr(text), read_quantity(text))
    except ValueError:
        print(repr(text), "rejected")
