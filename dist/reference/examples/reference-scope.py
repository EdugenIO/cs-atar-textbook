# Scope, parameters and mutable arguments
# Expected output:
# 4 5 [5]
def update(number, values):
    number = number + 1
    values.append(number)
    return number

score = 4
history = []
new_score = update(score, history)
print(score, new_score, history)
