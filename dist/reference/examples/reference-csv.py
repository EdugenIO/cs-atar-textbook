# CSV records and structured file data
# Expected output:
# 14
import csv
import io

data = io.StringIO('name,score\n"Lee, Sam",8\nAri,6\n')
total = 0
for record in csv.DictReader(data):
    total += int(record["score"])
print(total)
