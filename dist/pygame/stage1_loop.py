"""Stage 1 worked loop: close with Escape or the window X. No assessed code."""
import pygame


def main():
    pygame.init()
    screen = pygame.display.set_mode((640, 360))
    pygame.display.set_caption("Practice 1: input, update, draw")
    clock = pygame.time.Clock()
    font = pygame.font.Font(None, 26)
    x = 308.0
    running = True
    while running:
        dt_ms = clock.tick(60)
        # Events happen once; held keys are inspected every frame.
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
                running = False
        keys = pygame.key.get_pressed()
        direction = int(keys[pygame.K_RIGHT]) - int(keys[pygame.K_LEFT])
        x = max(0, min(616, x + direction * 200 * dt_ms / 1000))
        screen.fill("#f8f5ec")
        pygame.draw.rect(screen, "#285747", pygame.Rect(int(x), 180, 24, 24))
        screen.blit(font.render("Left/Right: move | Esc: quit", True, "#18322d"), (20, 30))
        pygame.display.flip()
    pygame.quit()


if __name__ == "__main__":
    main()
