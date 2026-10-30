class Actor:
    def __init__(self, x):
        self._x = x
    def position(self):
        return self._x
    def move(self, distance):
        self._x += distance
    def update(self):
        self.move(0)
class Hazard(Actor):
    def update(self):
        self.move(1)
first, second = Hazard(0), Hazard(0)
first.update()
print(first.position(), second.position())
# A leading underscore requests cooperation; it does not prevent access.
print(first._x)
