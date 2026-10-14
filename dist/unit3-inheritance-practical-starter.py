from unit3_equipment import Equipment

class Tablet(Equipment):
    def __init__(self, equipment_id, name, total, storage_free):
        raise NotImplementedError
    def preparation(self):
        raise NotImplementedError
    def set_storage(self, storage_free):
        raise NotImplementedError

def preparation_report(items):
    report = []
    for item in items:
        report.append(item.get_id() + ": " + item.preparation())
    return report
