while True:
    try:
        quantity = int(input("Non-negative quantity: "))
    except ValueError:
        print("Enter a whole number.")
        continue
    if quantity < 0:
        print("Quantity cannot be negative.")
        continue
    break

with open("quantities.txt", "a", encoding="utf-8") as file:
    file.write(f"{quantity}\n")
print("Quantity saved.")

