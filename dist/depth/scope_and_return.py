score = 10
def add_bonus(current, bonus):
    updated = current + bonus
    return updated
result = add_bonus(score, 5)
print(score, result)
# updated belongs to the call, not the module's namespace.
try:
    print(updated)
except NameError:
    print("updated is local")
def broken_bonus():
    score = score + 5
    return score
try:
    broken_bonus()
except UnboundLocalError:
    print("local score read before assignment")
