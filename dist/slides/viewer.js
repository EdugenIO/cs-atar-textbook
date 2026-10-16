const query = new URLSearchParams(location.search);
const deck = lessonSlides.lessons.find(item => item.id === query.get('lesson'));
const main = document.getElementById('slides');
let position = 0;
let allSlides = false;
const element = (tag, text, className) => { const node = document.createElement(tag); if (text !== undefined) node.textContent = text; if (className) node.className = className; return node; };
if (!deck) {
  main.append(element('h1', 'Lesson slides not found'), element('p', 'Return to the teacher planner and choose a lesson with slides.'));
  document.querySelectorAll('button').forEach(button => { button.disabled = true; });
} else {
  document.title = `${deck.title} | CS ATAR slides`;
  deck.slides.forEach((slide, index) => {
    const article = element('article', undefined, 'slide' + (index === 0 ? ' cover' : ''));
    const heading = element('h1', slide.title); heading.tabIndex = -1; article.append(heading);
    if (slide.diagram) { const figure = element('figure', undefined, 'lesson-diagram'); const img = element('img'); img.src = slide.diagram.source; img.alt = slide.diagram.alt; figure.append(img); article.append(figure); }
    if (slide.code) { const pre = element('pre'); pre.append(element('code', slide.code)); article.append(pre); }
    if (slide.table) {
      const table = element('table');
      const head = element('thead'); const body = element('tbody');
      slide.table.forEach((row, rowIndex) => {
        const tr = element('tr'); row.forEach(value => { const cell = element(rowIndex === 0 ? 'th' : 'td', value); if (rowIndex === 0) cell.scope = 'col'; tr.append(cell); });
        (rowIndex === 0 ? head : body).append(tr);
      }); table.append(head, body); article.append(table);
    }
    (slide.body || []).forEach(line => article.append(element('p', line, 'body-line')));
    article.append(element('p', `${deck.id.toUpperCase()} · ${index + 1}/${deck.slides.length} · Content CC BY 4.0 / code MIT`, 'licence'));
    main.append(article);
  });
  const downloads = document.getElementById('downloads');
  const resources = [[`${deck.id}.pptx`, 'Download editable PowerPoint'], [`notes/${deck.id}.html`, 'Teacher notes']];
  if (deck.id.startsWith('u1-')) resources.push(['unit1-all-lesson-slides.zip', 'Download all Unit 1 PowerPoints']);
  if (deck.id.startsWith('u2-w01-')) resources.push(['unit2-week1-lesson-slides.zip', 'Download Unit 2 Week 1 PowerPoints']);
  if (deck.id.startsWith('u2-w02-')) resources.push(['unit2-week2-lesson-slides.zip', 'Download Unit 2 Week 2 PowerPoints']);
  if (deck.id.startsWith('u2-w03-')) resources.push(['unit2-week3-lesson-slides.zip', 'Download Unit 2 Week 3 PowerPoints']);
  for (const [href, label] of resources) {
    const link = element('a', label, 'download'); link.href = href; if (href.endsWith('.pptx')) link.download = ''; downloads.append(link);
  }
  function show(moveFocus = false) {
    [...main.children].forEach((article, index) => { article.hidden = !allSlides && index !== position; });
    document.getElementById('previous').disabled = allSlides || position === 0;
    document.getElementById('next').disabled = allSlides || position === deck.slides.length - 1;
    document.getElementById('all').setAttribute('aria-pressed', String(allSlides));
    document.getElementById('status').textContent = allSlides ? `${deck.title}: all ${deck.slides.length} slides` : `Slide ${position + 1} of ${deck.slides.length}: ${deck.slides[position].title}`;
    if (moveFocus) main.children[position].querySelector('h1').focus();
  }
  function move(delta) { if (!allSlides) { position = Math.max(0, Math.min(deck.slides.length - 1, position + delta)); show(true); } }
  document.getElementById('previous').onclick = () => move(-1);
  document.getElementById('next').onclick = () => move(1);
  document.getElementById('all').onclick = () => { allSlides = !allSlides; show(); };
  document.getElementById('fullscreen').onclick = async () => {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); }
    catch { document.getElementById('status').textContent = 'Full screen is unavailable in this browser. The presentation can still be used normally.'; }
  };
  document.addEventListener('keydown', event => {
    if (event.target.closest('button,a,input,select,textarea') || allSlides) return;
    if (['ArrowRight','PageDown',' '].includes(event.key)) { event.preventDefault(); move(1); }
    else if (['ArrowLeft','PageUp'].includes(event.key)) { event.preventDefault(); move(-1); }
    else if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); position = event.key === 'Home' ? 0 : deck.slides.length - 1; show(true); }
  });
  show();
}

