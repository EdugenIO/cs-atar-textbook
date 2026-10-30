"""LEGACY CONSOLE PRACTICE: not the current Pygame Task 1.
Use https://edugenio.github.io/cs-atar-textbook/#unit3-project
Retained for optional practice and compatibility.
"""
"""Student scaffold. Implement against the brief before using the console."""
from project_support import Equipment, Camera, Projector

class Loan:
    def __init__(self, loan_id, borrower_id, equipment, quantity):
        raise NotImplementedError
    def snapshot(self):
        raise NotImplementedError

class BookingSystem:
    def __init__(self, equipment, borrower_ids):
        raise NotImplementedError
    def find_equipment(self, equipment_id):
        raise NotImplementedError
    def catalogue(self):
        raise NotImplementedError
    def borrow(self, loan_id, borrower_id, equipment_id, quantity):
        raise NotImplementedError
    def return_loan(self, loan_id):
        raise NotImplementedError
    def history(self):
        raise NotImplementedError
    def outstanding(self):
        raise NotImplementedError

def demo_system():
    return BookingSystem([Camera("E01", "Camera", 2, 20),
                          Projector("E02", "Projector", 1, 999),
                          Equipment("E03", "Tripod", 3)],
                         ["B001", "B002", "B003"])
