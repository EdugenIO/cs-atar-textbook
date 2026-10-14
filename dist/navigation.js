// Search destinations share the chapter hash, followed by an optional heading.
function currentTextbookRoute() {
  return location.hash.slice(1).split('/')[0] || 'home';
}

function textbookHeadingId(text) {
  return 'heading-' + String(text).normalize('NFKC').toLowerCase()
    .replace(/^\d+\.\s*/, '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
}

// Keep the skip link separate from the hash-based chapter router.
// A native anchor remains available if JavaScript has not loaded.
document.querySelector('.skip').addEventListener('click', event => {
  event.preventDefault();
  const main = document.getElementById('main');
  main.focus({ preventScroll: true });
  main.scrollIntoView({ block: 'start' });
});
