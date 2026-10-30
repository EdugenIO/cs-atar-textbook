def delivery(order_total):
    if order_total < 0:
        raise ValueError("Total must be non-negative")
    if order_total >= 50:
        return 0
    return 5
for total in [49, 50, 51]:
    print(total, delivery(total))
try:
    delivery(-1)
except ValueError:
    print("negative rejected")
