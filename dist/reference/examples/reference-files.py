# Text files: write, read and close
# Expected output:
# 12
with open("scores.txt", "w", encoding="utf-8") as file:
    file.write("5\n7\n")
total = 0
with open("scores.txt", "r", encoding="utf-8") as file:
    for line in file:
        total += int(line.strip())
print(total)
