def sum_to(n):
    total = 0
    for value in range(1, n + 1):
        total += value
    return total

def cover_cost(quantity, price):
    return quantity * price + 4

def first_minimum(values):
    if len(values) == 0:
        return None
    best = 0
    for index in range(1, len(values)):
        if values[index] < values[best]:
            best = index
    return best

def reading_total(lines):
    total = 0
    messages = []
    for line in lines:
        text = line.strip()
        if text != "":
            try:
                value = int(text)
                if 0 <= value <= 10:
                    total += value
                else:
                    messages.append(f"Out of range: {value}")
            except ValueError:
                messages.append(f"Invalid: {text}")
    return total, messages
