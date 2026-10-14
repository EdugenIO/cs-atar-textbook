from unit3_equipment import Equipment

class Camera(Equipment):
    def __init__(self, equipment_id, name, total, charge):
        raise NotImplementedError
    def set_charge(self, charge):
        raise NotImplementedError
    def preparation(self):
        raise NotImplementedError

class Projector(Equipment):
    def __init__(self, equipment_id, name, total, lamp_hours):
        raise NotImplementedError
    def add_usage(self, hours):
        raise NotImplementedError
    def preparation(self):
        raise NotImplementedError

def preparation_report(items):
    report = []
    for item in items:
        report.append(item.get_id() + ": " + item.preparation())
    return report
