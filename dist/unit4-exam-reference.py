"""Original reference answers only; not independent student evidence."""
def summarise(rows):
    totals={}
    for topic,count in rows:
        if not isinstance(topic,str) or not topic.strip():
            raise ValueError("Expected non-empty topic")
        if type(count) is not int or count<0:
            raise ValueError("Expected non-negative integer count")
        totals[topic]=totals.get(topic,0)+count
    return totals

class RoomSession:
    def __init__(self,capacity):
        if type(capacity) is not int or capacity<1:raise ValueError("Bad capacity")
        self.remaining=capacity
    def reserve(self):
        if self.remaining<=0:raise ValueError("Full")
        self.remaining-=1
    def location(self):return "Room"

class OnlineSession(RoomSession):
    def location(self):return "Online"

if __name__=="__main__":
    print(summarise([["Python",2],["Network",0],["Python",3]]))
    print([item.location() for item in [RoomSession(1),OnlineSession(1)]])
