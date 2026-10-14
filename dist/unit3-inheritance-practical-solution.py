from unit3_equipment import Equipment

class Tablet(Equipment):
    def __init__(self, equipment_id, name, total, storage_free):
        if type(storage_free) is not int or not 0 <= storage_free <= 128:
            raise ValueError("Storage must be an integer from 0 to 128")
        super().__init__(equipment_id, name, total)
        self._storage_free = storage_free
    def preparation(self):
        if self._storage_free < 16:
            return "Free some storage"
        return "Check the screen"
    def set_storage(self, storage_free):
        if type(storage_free) is not int or not 0 <= storage_free <= 128:
            raise ValueError("Storage must be an integer from 0 to 128")
        self._storage_free = storage_free

def preparation_report(items):
    return [item.get_id() + ": " + item.preparation() for item in items]

if __name__ == "__main__":
    tablet = Tablet("T01", "Tablet", 2, 15)
    generic = Equipment("E03", "Tripod", 1)
    print(preparation_report([tablet, generic]))
    print(tablet.lend(), tablet.available())
    print(tablet.lend(2), tablet.available())
