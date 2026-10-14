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


class Camera(Equipment):
    def __init__(self, equipment_id, name, total, charge):
        if type(charge) is not int or not 0 <= charge <= 100:
            raise ValueError("Charge must be an integer from 0 to 100")
        super().__init__(equipment_id, name, total)
        self._charge = charge

    def set_charge(self, charge):
        if type(charge) is not int or not 0 <= charge <= 100:
            raise ValueError("Charge must be an integer from 0 to 100")
        self._charge = charge

    def preparation(self):
        if self._charge < 20:
            return "Charge the camera"
        return "Check the lens"

class Projector(Equipment):
    def __init__(self, equipment_id, name, total, lamp_hours):
        if type(lamp_hours) is not int or lamp_hours < 0:
            raise ValueError("Lamp hours must be a non-negative integer")
        super().__init__(equipment_id, name, total)
        self._lamp_hours = lamp_hours

    def add_usage(self, hours):
        if type(hours) is not int or hours < 0:
            raise ValueError("Hours must be a non-negative integer")
        self._lamp_hours += hours

    def preparation(self):
        if self._lamp_hours >= 1000:
            return "Arrange a projector check"
        return "Check the ventilation"

def preparation_report(items):
    # Each item supports get_id() and preparation(), returning strings.
    report = []
    for item in items:
        report.append(item.get_id() + ": " + item.preparation())
    return report

if __name__ == "__main__":
    # Fictional teaching thresholds, not real equipment advice.
    camera = Camera("E01", "Camera", 2, 19)
    projector = Projector("E02", "Projector", 1, 999)
    generic = Equipment("E03", "Tripod", 1)
    items = [camera, projector, generic]
    for line in preparation_report(items):
        print(line)
    print(camera.lend(), camera.available())
    camera.set_charge(20)
    projector.add_usage(1)
    for line in preparation_report(items):
        print(line)


class AudioRecorder(Equipment):
    def preparation(self):
        return "Check recording space"

if __name__ == "__main__":
    recorder = AudioRecorder("E04", "Recorder", 1)
    print(preparation_report([recorder])[0])
