"""Unfinished suggested interfaces. Adapt your design and implement your own code.
The display shell supplies only infrastructure. These stubs deliberately fail.
"""
def new_run(difficulty):
    raise NotImplementedError("Design/reset state")
def update_game(state, commands, active_elapsed_ms):
    raise NotImplementedError("Movement, collisions, scoring and terminal rules")
def read_history(path):
    raise NotImplementedError("Read/validate scores with the documented policy")
def save_result(path, score):
    raise NotImplementedError("Append once and report failures")
def run_game():
    raise NotImplementedError("Implement the interactive game")


class Actor:
    def move(self, row_delta, column_delta, tiles):
        raise NotImplementedError("Shared bounds/wall behaviour")
class Player(Actor):
    def update(self, commands, elapsed_ms, tiles):
        raise NotImplementedError("Player update")
class Hazard(Actor):
    def update(self, commands, elapsed_ms, tiles):
        raise NotImplementedError("Predictable patrol update")
def find_item(items, item_id):
    raise NotImplementedError("Student-written linear search")
def order_scores(scores):
    raise NotImplementedError("Student-written taught sorting algorithm")

if __name__ == "__main__":
    run_game()
