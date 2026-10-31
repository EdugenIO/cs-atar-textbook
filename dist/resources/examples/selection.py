order_total = float(input("Order total ($): "))
if order_total >= 50:
    delivery_charge = 0
else:
    delivery_charge = 5
print(f"Delivery charge: ${delivery_charge:.2f}")

