def badge_cost(quantity, unit_price):
    return quantity * unit_price

quantity = int(input("Number of badges: "))
cost = badge_cost(quantity, 3)
print(f"Total: ${cost}")

