// Keep the skip link separate from the hash-based chapter router.
// A native anchor remains available if JavaScript has not loaded.
document.querySelector('.skip').addEventListener('click', event => {
  event.preventDefault();
  const main = document.getElementById('main');
  main.focus({ preventScroll: true });
  main.scrollIntoView({ block: 'start' });
});
