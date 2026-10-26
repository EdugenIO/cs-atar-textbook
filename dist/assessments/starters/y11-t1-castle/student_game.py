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


if __name__ == "__main__":
    run_game()
