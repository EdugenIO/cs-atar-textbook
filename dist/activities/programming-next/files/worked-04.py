total = 0
with open("readings.txt", encoding="utf-8") as source:
    for line in source:
        text = line.strip()
        if text != "":
            try:
                total += int(text)
            except ValueError:
                print("Invalid:", text)
print("Total:", total)
