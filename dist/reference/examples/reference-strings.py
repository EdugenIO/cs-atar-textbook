# Strings, indexing, slicing and methods
# Expected output:
# A Ada
# ada lovelace
# Ada-Lovelace
# 12
text = "  Ada Lovelace  "
clean = text.strip()
print(clean[0], clean[0:3])
print(clean.lower())
words = clean.split()
print("-".join(words))
print(len(clean))
