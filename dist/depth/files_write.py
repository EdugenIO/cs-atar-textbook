# Run in a disposable learning folder: mode w replaces scores-demo.txt.
scores = [10, 0, 25]
with open("scores-demo.txt", "w", encoding="utf-8") as output:
    for score in scores:
        output.write(str(score) + "\n")
with open("scores-demo.txt", "r", encoding="utf-8") as source:
    print(repr(source.read()))
