total = 0
for donation_number in range(1, 4):
    donation = int(input(f"Donation {donation_number}: "))
    total = total + donation
print(f"Total donations: ${total}")

