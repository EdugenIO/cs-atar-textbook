// Registered after rendering, scroll-area setup and print controls.
// Focus the new heading on route changes, while leaving initial-load focus alone.
function prepareChapterDestination(moveFocus = true) {
  const main = document.getElementById('main');
  const usedIds = new Map();
  main.querySelectorAll('h2, h3').forEach(heading => {
    const base = textbookHeadingId(heading.textContent);
    const count = (usedIds.get(base) || 0) + 1;
    usedIds.set(base, count);
    if (!heading.id) heading.id = count === 1 ? base : `${base}-${count}`;
  });
  if (!moveFocus) return;
  const heading = main.querySelector('h1');
  let anchor = location.hash.slice(1).split('/')[1];
  try { anchor = anchor && decodeURIComponent(anchor); } catch { anchor = null; }
  const destination = anchor ? document.getElementById(anchor) : null;
  const target = (destination && main.contains(destination) ? destination : null) || heading || main;
  target.tabIndex = -1;
  target.focus({ preventScroll: true });
  target.scrollIntoView({ block: 'start' });
}
window.addEventListener('hashchange', () => prepareChapterDestination());
prepareChapterDestination(location.hash.includes('/'));
