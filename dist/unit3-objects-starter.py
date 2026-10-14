class Equipment:
    def __init__(self, equipment_id, name, total):
        raise NotImplementedError
    def get_id(self):
        raise NotImplementedError
    def get_name(self):
        raise NotImplementedError
    def available(self):
        raise NotImplementedError
    def lend(self, quantity=1):
        raise NotImplementedError
    def return_units(self, quantity=1):
        raise NotImplementedError

def find_equipment(items, equipment_id):
    raise NotImplementedError
def availability_report(items):
    raise NotImplementedError
