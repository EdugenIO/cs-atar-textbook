PRICE = 3
def cost(quantity):
    return quantity * PRICE
for quantity, expected in [(0, 0), (1, 3), (4, 12)]:
    actual = cost(quantity)
    print(quantity, actual, actual == expected)
