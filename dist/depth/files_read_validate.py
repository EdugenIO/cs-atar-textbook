with open("read-demo.txt", "w", encoding="utf-8") as fixture:
    fixture.write("10\nwrong\n-1\n0\n50\n51\n\n")
scores = []
with open("read-demo.txt", "r", encoding="utf-8") as source:
    for line_number, line in enumerate(source, start=1):
        try:
            score = int(line.strip())
            if not 0 <= score <= 50:
                raise ValueError("Score outside 0..50")
        except ValueError:
            print("Check line", line_number)
        else:
            scores.append(score)
print("Accepted", scores)
