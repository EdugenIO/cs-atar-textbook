"""Historical cipher and fingerprint activities only. No production encryption."""
import hashlib

def caesar(text, shift):
    if type(shift) is not int:
        raise ValueError("Shift must be an integer")
    result = []
    for character in text:
        if "A" <= character <= "Z":
            result.append(chr((ord(character)-65+shift)%26+65))
        elif "a" <= character <= "z":
            result.append(chr((ord(character)-97+shift)%26+97))
        else:
            result.append(character)
    return "".join(result)

def candidates(ciphertext):
    return [(shift, caesar(ciphertext, -shift)) for shift in range(26)]

def fingerprint(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()

if __name__ == "__main__":
    message = "Meet at 3, Room B!"
    encrypted = caesar(message, 3)
    print(encrypted)
    print(caesar(encrypted, -3))
    print(*candidates(encrypted), sep="\n")
    print("Equal fingerprints:", fingerprint(message) == fingerprint(message))
    print("Edited fingerprint equal:", fingerprint(message) == fingerprint(message+" "))
