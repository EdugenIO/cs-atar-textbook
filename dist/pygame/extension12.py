"""Year 12 worked data/OOP lab, not an assessed map/actor implementation.

Run python extension12.py for a console trace; the caller supplies elapsed time.
"""


class Indicator:
    def __init__(self, label):
        self.label = label
        self.visible = True

    def update(self, dt_ms):
        if dt_ms < 0:
            raise ValueError("Elapsed time cannot be negative")


class Pulse(Indicator):
    def __init__(self, label, interval=500):
        super().__init__(label)
        if interval <= 0:
            raise ValueError("Positive interval required")
        self.interval, self.elapsed = interval, 0

    def update(self, dt_ms):
        super().update(dt_ms)
        self.elapsed += dt_ms
        # Preserve leftover time; a slow frame can cross multiple boundaries.
        while self.elapsed >= self.interval:
            self.elapsed -= self.interval
            self.visible = not self.visible


def make_board():
    return [[0 for _ in range(3)] for _ in range(2)]


def find_label(records, wanted):
    for index in range(len(records)):
        if records[index].label == wanted:
            return index
    return -1


def ordered_copy(values):
    result = values[:]
    for position in range(1, len(result)):
        value, index = result[position], position - 1
        while index >= 0 and result[index] > value:
            result[index + 1] = result[index]
            index -= 1
        result[index + 1] = value
    return result


if __name__ == "__main__":
    board = make_board()
    board[0][1] = 1
    metadata = {"A": "north station", "B": "south station"}
    indicators = [Indicator("A"), Pulse("B")]
    for indicator in indicators:
        indicator.update(500)
    print(board)  # [[0, 1, 0], [0, 0, 0]]: second row independent
    print([(item.label, item.visible) for item in indicators])
    print(metadata.get("C", "unknown"), find_label(indicators, "B"))
    print(ordered_copy([2, 0, 2, 1]))
