# Comparisons and Boolean logic
# Expected output:
# True
# True
age = 16
has_permission = True
eligible = age >= 16 and has_permission
print(eligible)
print(not (age < 16 or not has_permission))
