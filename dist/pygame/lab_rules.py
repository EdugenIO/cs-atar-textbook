"""Worked practice: two stations on a horizontal strip, not assessed Task 1.

Rules use ordinary Python. Positions are pixels; elapsed values are milliseconds.
Content CC BY 4.0; code MIT.
"""
from pathlib import Path

WIDTH, HEIGHT = 640, 360
PLAYER_Y, PLAYER_SIZE = 180, 24
DURATION_MS, SPEED = 20000, 200  # milliseconds; pixels per second


def new_state():
    return {"mode": "ready", "x": 308.0, "remaining": DURATION_MS,
            "score": 0, "active": [True, True], "saved": False}


def command(state, action):
    """Discrete key events: start/pause/resume; R resets to READY."""
    if action == "reset":
        state.clear()
        state.update(new_state())
    elif action == "space":
        state["mode"] = {"ready": "playing", "playing": "paused",
                         "paused": "playing"}.get(state["mode"], state["mode"])


def overlaps(a, b):
    """Same strict edge convention as Rect.colliderect: touching is not overlap."""
    ax, ay, aw, ah = a
    bx, by, bw, bh = b
    return ax < bx + bw and ax + aw > bx and ay < by + bh and ay + ah > by


def update(state, direction, dt_ms, collect=True):
    """Update once per frame. Do not call this from drawing code.

    A pause/start/reset event consumes its frame without update (see the runner).
    Timeout has precedence over collecting in the same update.
    """
    if direction not in (-1, 0, 1) or dt_ms < 0:
        raise ValueError("Use direction -1, 0 or 1 and non-negative elapsed time")
    if state["mode"] != "playing":
        return
    state["remaining"] = max(0, state["remaining"] - dt_ms)
    if state["remaining"] == 0:
        state["mode"] = "finished"
        return
    state["x"] = max(0, min(WIDTH - PLAYER_SIZE,
                           state["x"] + direction * SPEED * dt_ms / 1000))
    if not collect:
        return
    player = (int(state["x"]), PLAYER_Y, PLAYER_SIZE, PLAYER_SIZE)
    for index, x in enumerate([80, 520]):
        if state["active"][index] and overlaps(player, (x, PLAYER_Y, 24, 24)):
            state["active"][index] = False
            state["score"] += 1
    if not any(state["active"]):
        state["mode"] = "finished"


def load_history(path):
    """Only whole scores 0–2. Missing/empty is valid; bad lines are reported."""
    values, warnings = [], []
    try:
        with Path(path).open(encoding="utf-8") as source:
            for line_number, line in enumerate(source, 1):
                try:
                    value = int(line.strip())
                    if not 0 <= value <= 2:
                        raise ValueError("out of range")
                    values.append(value)
                except ValueError:
                    warnings.append(f"Skipped line {line_number}: expected score 0–2")
    except FileNotFoundError:
        pass
    except (OSError, UnicodeError) as error:
        warnings.append(f"History unavailable: {error}")
    return values, warnings


def save_result(state, path):
    """Append once, only after finishing. Failed writes remain visibly unsaved."""
    if state["mode"] != "finished" or state["saved"]:
        return ""
    try:
        with Path(path).open("a", encoding="utf-8") as target:
            target.write(str(state["score"]) + "\n")
    except OSError as error:
        return f"Not saved: {error}. Press S to retry."
    state["saved"] = True
    return "Saved one result."
