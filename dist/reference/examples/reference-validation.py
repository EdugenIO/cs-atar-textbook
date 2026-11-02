# Type checks, range checks and exceptions
# Expected output:
# True False False
def valid_age(text):
    try:
        age = int(text)
    except ValueError:
        return False
    return 0 <= age <= 120

print(valid_age("16"), valid_age("abc"), valid_age("121"))
