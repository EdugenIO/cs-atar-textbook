"""Display-only Pygame infrastructure. No assessed game behaviour is implemented.
Run: python display_shell.py. Run headless infrastructure check: --smoke.
"""
from pathlib import Path
import json
import sys
import pygame

def main():
    folder = Path(__file__).resolve().parent
    theme = json.loads((folder / "theme.json").read_text(encoding="utf-8"))
    pygame.init()
    screen = pygame.display.set_mode((800, 600))
    pygame.display.set_caption(theme["title"] + " - display shell")
    font = pygame.font.Font(None, 28)
    clock = pygame.time.Clock()
    frames = 0
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
                running = False
        screen.fill((20, 35, 45))
        pygame.draw.rect(screen, (240, 210, 90), (60, 160, 32, 32), 2)
        pygame.draw.circle(screen, (90, 210, 180), (150, 176), 16, 2)
        screen.blit(font.render(theme["title"], True, (255, 255, 255)), (40, 40))
        screen.blit(font.render("Display shell only. Implement your game separately.", True, (255, 255, 255)), (40, 90))
        pygame.display.flip()
        clock.tick(60)
        frames += 1
        if "--smoke" in sys.argv and frames >= 3:
            running = False
    pygame.quit()

if __name__ == "__main__":
    main()
