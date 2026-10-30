# This example creates its own fixture; do not substitute a real history file.
with open("append-demo.txt", "w", encoding="utf-8") as output:
    output.write("10\n")
with open("append-demo.txt", "a", encoding="utf-8") as output:
    output.write("20\n")
with open("append-demo.txt", "a", encoding="utf-8") as output:
    output.write("0\n")
with open("append-demo.txt", "r", encoding="utf-8") as source:
    print(source.read().splitlines())
