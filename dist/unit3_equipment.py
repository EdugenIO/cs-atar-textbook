"""Synthetic stock counts, not a borrower or calendar booking system."""
class Equipment:
    def __init__(self, equipment_id, name, total):
        if not isinstance(equipment_id, str) or not equipment_id.strip():
            raise ValueError("A non-empty equipment ID is required")
        if not isinstance(name, str) or not name.strip():
            raise ValueError("A non-empty name is required")
        if type(total) is not int or total < 0:
            raise ValueError("Total must be a non-negative integer")
        self._equipment_id = equipment_id.strip()
        self._name = name.strip()
        self._total = total
        self._on_loan = 0

    def get_id(self):
        return self._equipment_id

    def get_name(self):
        return self._name

    def available(self):
        return self._total - self._on_loan

    def lend(self, quantity=1):
        if type(quantity) is not int or quantity <= 0:
            raise ValueError("Quantity must be a positive integer")
        if quantity > self.available():
            return False
        self._on_loan += quantity
        return True

    def return_units(self, quantity=1):
        if type(quantity) is not int or quantity <= 0:
            raise ValueError("Quantity must be a positive integer")
        if quantity > self._on_loan:
            return False
        self._on_loan -= quantity
        return True

    def preparation(self):
        return "Check the item before use"
