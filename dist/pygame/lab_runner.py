"""Run stages 2–4: python lab_runner.py 2 (or 3 or 4).

Stage 2: state/functions; stage 3: two-station list and collision;
stage 4: append/read history. No external assets, sound or network.
"""
from pathlib import Path
import argparse
import pygame
import lab_rules as rules


def frame(state, events, direction, dt_ms, collect=True):
    """Process a transition before updating; discard elapsed time on that frame."""
    running, changed = True, False
    retry = False
    for event in events:
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                running = False
            elif event.key in (pygame.K_SPACE, pygame.K_r):
                rules.command(state, "reset" if event.key == pygame.K_r else "space")
                changed = True
            elif event.key == pygame.K_s:
                retry = True
    if running and not changed:
        rules.update(state, direction, dt_ms, collect=collect)
    return running, retry


def draw(screen, font, state, stage, message, history):
    screen.fill("#f8f5ec")
    def text(value, y):
        screen.blit(font.render(value, True, "#18322d"), (20, y))
    text(f"CHECKPOINT LAB — practice stage {stage}", 16)
    text("Space: start/pause/resume | R: reset | Esc: quit", 48)
    text("Left/Right: move | Touch numbered stations once each", 76)
    text(f"{state['mode']} | Score {state['score']}/2 | {state['remaining']/1000:.1f}s", 112)
    if stage >= 3:
        for index, x in enumerate([80, 520]):
            rect = pygame.Rect(x, rules.PLAYER_Y, 24, 24)
            pygame.draw.rect(screen, "#785c16", rect, 0 if state["active"][index] else 2)
            screen.blit(font.render(str(index + 1), True, "#18322d"), (x, 215))
    pygame.draw.rect(screen, "#285747", (int(state["x"]), rules.PLAYER_Y, 24, 24))
    text(message[:72], 258)
    if stage == 4:
        text(f"Valid history: {history[-10:]} (file keeps all valid results)", 294)
    pygame.display.flip()


def main(stage=4, smoke_frames=None):
    pygame.init()
    screen = pygame.display.set_mode((rules.WIDTH, rules.HEIGHT))
    pygame.display.set_caption("Checkpoint lab: unrelated teaching practice")
    clock, font = pygame.time.Clock(), pygame.font.Font(None, 24)
    state, running, frames = rules.new_state(), True, 0
    history_path = Path(__file__).resolve().with_name("practice-scores.txt")
    history, warnings = rules.load_history(history_path) if stage == 4 else ([], [])
    message = warnings[0] if warnings else "Ready. Predict the result before running."
    attempted = False
    while running:
        dt_ms = clock.tick(60)
        events = pygame.event.get()
        keys = pygame.key.get_pressed()
        direction = int(keys[pygame.K_RIGHT]) - int(keys[pygame.K_LEFT])
        # Stage 2 deliberately has no station scoring; keep movement/timing only.
        if any(e.type == pygame.KEYDOWN and e.key == pygame.K_r for e in events):
            message = "Reset to ready; previous results remain in history."
        running, retry = frame(state, events, direction, dt_ms, collect=stage >= 3)
        if state["mode"] != "finished":
            attempted = False
        elif stage == 4 and (not attempted or retry):
            message = rules.save_result(state, history_path)
            attempted = True
            history, warnings = rules.load_history(history_path)
            if warnings:
                message += " " + warnings[0]
        draw(screen, font, state, stage, message, history)
        frames += 1
        if smoke_frames is not None and frames >= smoke_frames:
            running = False
    pygame.quit()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("stage", type=int, choices=[2, 3, 4], nargs="?", default=4)
    parser.add_argument("--smoke-frames", type=int)
    args = parser.parse_args()
    main(args.stage, args.smoke_frames)
