"""Illustrative repaired isolated lab; never imported by the project model."""
class ReturnLab:
    def __init__(self):
        self.total = 3
        self.available = 2
        self.quantity = 1
        self.active = True

    def return_loan(self):
        if not self.active:
            return False
        self.available += self.quantity
        self.active = False
        return True
