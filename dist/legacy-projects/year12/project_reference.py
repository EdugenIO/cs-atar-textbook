"""Teacher reference: synthetic, single-session loans; no persistence.
All stock-changing requests go through BookingSystem. Not a production service.
"""
from project_support import Equipment, Camera, Projector

def normalise_id(value):
    if not isinstance(value, str) or not value.strip():
        raise ValueError("A non-empty ID is required")
    return value.strip().upper()

class Loan:
    # Internal record: BookingSystem supplies validated values.
    def __init__(self, loan_id, borrower_id, equipment, quantity):
        self._loan_id = loan_id
        self._borrower_id = borrower_id
        self._equipment = equipment
        self._quantity = quantity
        self._active = True

    def snapshot(self):
        return {"loan_id": self._loan_id, "borrower_id": self._borrower_id,
                "equipment_id": self._equipment.get_id(),
                "quantity": self._quantity, "active": self._active}

class BookingSystem:
    def __init__(self, equipment, borrower_ids):
        items = list(equipment)
        seen = set()
        for item in items:
            if not isinstance(item, Equipment):
                raise ValueError("Catalogue entries must be Equipment")
            identifier = normalise_id(item.get_id())
            if identifier in seen:
                raise ValueError("Duplicate equipment ID")
            if item.available() != item._total:
                raise ValueError("Start with unloaned equipment")
            seen.add(identifier)
        borrowers = [normalise_id(value) for value in borrower_ids]
        if len(set(borrowers)) != len(borrowers):
            raise ValueError("Duplicate borrower ID")
        self._equipment = items
        self._borrowers = set(borrowers)
        self._loans = []

    def find_equipment(self, equipment_id):
        target = normalise_id(equipment_id)
        # Linear search: preserves the original catalogue order.
        for item in self._equipment:
            if normalise_id(item.get_id()) == target:
                return item
        return None

    def _find_loan(self, loan_id):
        for loan in self._loans:
            if loan._loan_id == loan_id:
                return loan
        return None

    def catalogue(self):
        return [{"equipment_id": item.get_id(), "name": item.get_name(),
                 "available": item.available(), "preparation": item.preparation()}
                for item in self._equipment]

    def borrow(self, loan_id, borrower_id, equipment_id, quantity):
        loan_id = normalise_id(loan_id)
        borrower_id = normalise_id(borrower_id)
        equipment_id = normalise_id(equipment_id)
        if type(quantity) is not int or quantity <= 0:
            raise ValueError("Quantity must be a positive integer")
        item = self.find_equipment(equipment_id)
        if (self._find_loan(loan_id) is not None or
                borrower_id not in self._borrowers or item is None):
            return False
        loan = Loan(loan_id, borrower_id, item, quantity)
        if not item.lend(quantity):
            return False
        self._loans.append(loan)
        return True

    def return_loan(self, loan_id):
        loan = self._find_loan(normalise_id(loan_id))
        if loan is None or not loan._active:
            return False
        if not loan._equipment.return_units(loan._quantity):
            raise ValueError("Stock and loan records are inconsistent")
        loan._active = False
        return True

    def history(self):
        return [loan.snapshot() for loan in self._loans]

    def outstanding(self):
        rows = [loan.snapshot() for loan in self._loans if loan._active]
        # Insertion sort of new report rows; stored history stays in issue order.
        for index in range(1, len(rows)):
            key = rows[index]
            position = index - 1
            while position >= 0 and rows[position]["loan_id"] > key["loan_id"]:
                rows[position + 1] = rows[position]
                position -= 1
            rows[position + 1] = key
        return rows

def demo_system():
    return BookingSystem([Camera("E01", "Camera", 2, 20),
                          Projector("E02", "Projector", 1, 999),
                          Equipment("E03", "Tripod", 3)],
                         ["B001", "B002", "B003"])

if __name__ == "__main__":
    system = demo_system()
    print(system.borrow("L002", "B001", "E01", 1))
    print(system.borrow("L001", "B002", "E02", 1))
    print(system.borrow("L003", "B003", "E02", 1))
    print(system.outstanding())
    print(system.return_loan("L002"))
    print(system.return_loan("L002"))
    print(system.find_equipment("E01").available())
