bits = "00101101"
total = 0
for bit in bits:
    total = total * 2 + int(bit)
print(total, int(bits, 2))
print(hex(total))
print(ord("A"), chr(65))
