"""Independent changed mini-game practice. Work in a COPY of this file.

Complete these functions without importing lab_rules. Do not use the assessment
starter. No graphics required until the rule checks pass; then use the supplied
runner as an adapter, changing its import to your rules module.
"""


def new_state():
    # CHANGED challenge: start x=40, three stations, 15 active seconds.
    return {"mode": "ready", "x": 40.0, "remaining": 15000,
            "score": 0, "active": [True, True, True], "saved": False}


def command(state, action):
    # TODO: space toggles ready/playing/paused; finished stays finished.
    # TODO: reset restores ALL initial values with a fresh list.
    raise NotImplementedError("Complete state transitions")


def overlaps(a, b):
    # TODO: strict rectangle overlap. Edge-touching is false.
    raise NotImplementedError("Complete collision predicate")


def update(state, direction, dt_ms):
    # TODO: movement 160 pixels/second; x bounded to 0..616.
    # Three stations at x=120, 300, 500, y=180, size=24.
    # Each scores 2 ONCE; maximum 6. Timeout before collection.
    # Paused/ready/finished do not move or consume active time.
    raise NotImplementedError("Complete update using your own tests")


def load_history(path):
    # TODO: read integers 0, 2, 4, 6 only; return (valid_scores, warnings).
    # Missing/empty valid; malformed lines skipped with a warning.
    raise NotImplementedError("Complete changed file policy")


def save_result(state, path):
    # TODO: finished only, append once, mark saved only after success.
    # Report failed writes, permitting an explicit retry.
    raise NotImplementedError("Complete append policy")
