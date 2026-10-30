"""Year 12 worked adapter: polymorphic update in an ungraded Pygame window."""
import argparse
import pygame
import lab_rules as rules
from lab_runner import frame, draw
from extension12 import Indicator, Pulse


def indicators():
    return [Indicator('steady'), Pulse('pulse', 500)]


def main(smoke_frames=None):
    pygame.init()
    screen = pygame.display.set_mode((640, 360))
    pygame.display.set_caption('Year 12 practice: shared update, different behaviour')
    font, clock = pygame.font.Font(None, 24), pygame.time.Clock()
    state, lights = rules.new_state(), indicators()
    running, frames = True, 0
    while running:
        dt = clock.tick(60)
        events = pygame.event.get()
        keys = pygame.key.get_pressed()
        transition = any(e.type == pygame.KEYDOWN and e.key in (pygame.K_SPACE, pygame.K_r) for e in events)
        if any(e.type == pygame.KEYDOWN and e.key == pygame.K_r for e in events):
            lights = indicators()  # Reset subclass state too.
        running, _ = frame(state, events, int(keys[pygame.K_RIGHT])-int(keys[pygame.K_LEFT]), dt)
        if running and state['mode'] == 'playing' and not transition:
            for light in lights:
                light.update(dt)  # Same interface, different update behaviour.
        draw(screen, font, state, 3, 'Year 12: steady / pulse (outline = off)', [])
        for index, light in enumerate(lights):
            pygame.draw.rect(screen, '#18322d', (290+index*115, 230, 20, 20), 0 if light.visible else 2)
            screen.blit(font.render(light.label, True, '#18322d'), (315+index*115, 230))
        pygame.display.flip()
        frames += 1
        if smoke_frames is not None and frames >= smoke_frames:
            running = False
    pygame.quit()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--smoke-frames', type=int)
    main(parser.parse_args().smoke_frames)
