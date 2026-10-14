"""Refactor this supplied valid-input stock model into Equipment.
Input validation belongs at the boundary; retain the valid-input behaviour.
"""
def available(item):
    return item["total"] - item["on_loan"]
def lend(item, quantity=1):
    if type(quantity) is not int or quantity <= 0:
        raise ValueError("Quantity must be a positive integer")
    if quantity > available(item):
        return False
    item["on_loan"] += quantity
    return True
def return_units(item, quantity=1):
    if type(quantity) is not int or quantity <= 0:
        raise ValueError("Quantity must be a positive integer")
    if quantity > item["on_loan"]:
        return False
    item["on_loan"] -= quantity
    return True
camera = {"id": "E01", "name": "Camera", "total": 2, "on_loan": 0}
