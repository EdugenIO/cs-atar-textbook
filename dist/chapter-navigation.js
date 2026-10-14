// Registered after rendering, scroll-area setup and print controls.
// Focus the new heading on route changes, while leaving initial-load focus alone.
window.addEventListener('hashchange', () => {
  const main = document.getElementById('main');
  const heading = main.querySelector('h1');
  const target = heading || main;
  target.tabIndex = -1;
  target.focus({ preventScroll: true });
  main.scrollIntoView({ block: 'start' });
});
