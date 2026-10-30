class TicketPool:
    def __init__(self, name, capacity):
        if isinstance(capacity, bool) or not isinstance(capacity, int) or capacity < 0:
            raise ValueError("Capacity must be a non-negative whole number")
        self.name = name             # public interface
        self._label = "places"      # non-public convention
        self.__remaining = capacity  # name mangled
    def available(self):
        return self.__remaining
    def book(self, quantity):
        if isinstance(quantity, bool) or not isinstance(quantity, int) or quantity <= 0 or quantity > self.__remaining:
            raise ValueError("Invalid booking quantity")
        self.__remaining -= quantity
pool = TicketPool("Robotics", 3)
print(pool.name, pool.available())
pool.book(2)
print(pool.available())
try:
    pool.book(2)
except ValueError:
    print("rejected", pool.available())
try:
    print(pool.__remaining)
except AttributeError:
    print("ordinary double-underscore access fails")
print("mangled access is possible", pool._TicketPool__remaining)
