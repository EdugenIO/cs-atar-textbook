"""Original offline consolidation examples; not deployment or learner evidence."""
def row_totals(grid):
    width=len(grid[0]) if grid else 0
    if any(len(row)!=width for row in grid):
        raise ValueError("Expected rectangular rows")
    if any(type(value) is not int or value<0 for row in grid for value in row):
        raise ValueError("Expected non-negative integers")
    totals=[]
    for row in grid:
        total=0
        for value in row:
            total+=value
        totals.append(total)
    return totals

def binary_search(values,target):
    """Precondition: nondecreasing comparable values. Returns any match, else -1."""
    low,high=0,len(values)-1
    while low<=high:
        mid=(low+high)//2
        if values[mid]==target:return mid
        if values[mid]<target:low=mid+1
        else:high=mid-1
    return -1

def insertion_sort(records,key=lambda value:value):
    """Stable insertion sort on a shallow list copy; records themselves are shared."""
    result=list(records)
    for i in range(1,len(result)):
        item=result[i]
        j=i-1
        while j>=0 and key(result[j])>key(item):
            result[j+1]=result[j]
            j-=1
        result[j+1]=item
    return result

class Session:
    def __init__(self,capacity):
        if type(capacity) is not int or capacity<1:
            raise ValueError("Expected positive integer capacity")
        self._capacity=capacity
        self._booked=0
    @property
    def remaining(self):return self._capacity-self._booked
    def reserve(self):
        if self.remaining<=0:raise ValueError("Full session")
        self._booked+=1
    def location(self):return "Room"

class OnlineSession(Session):
    def location(self):return "Online"

if __name__=="__main__":
    print(row_totals([[1,2],[0,3]]))
    print(binary_search([3,6,9,12,15],12))
    print(insertion_sort([5,2,4,2]))
    print([session.location() for session in [Session(2),OnlineSession(2)]])
