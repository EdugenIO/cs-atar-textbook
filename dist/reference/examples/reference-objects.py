# Classes, constructors, attributes and methods
# Expected output:
# Camera True False
class Item:
    def __init__(self, name):
        self.name = name
        self.available = True

    def lend(self):
        if not self.available:
            return False
        self.available = False
        return True

item = Item("Camera")
print(item.name, item.lend(), item.lend())
