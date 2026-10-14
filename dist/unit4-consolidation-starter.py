"""Student starter: replace each NotImplementedError; compare tests after prediction."""
def row_totals(grid):
    raise NotImplementedError("Validate rectangular non-negative integer counts and total rows")
def binary_search(values,target):
    raise NotImplementedError("Sorted input precondition; return any match or -1")
def insertion_sort(records,key=lambda value:value):
    raise NotImplementedError("Stable sort on a shallow list copy")
class Session:
    def __init__(self,capacity):
        raise NotImplementedError("Validate capacity and initialise booking count")
    def reserve(self):
        raise NotImplementedError("Refuse when full")
    def location(self):return "Room"
class OnlineSession(Session):
    def location(self):
        raise NotImplementedError("Override for online delivery")
