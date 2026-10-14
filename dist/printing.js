let selectedPrintMode = 'student';
let printSnapshot = null;

function prepareChapterPrint() {
  if (printSnapshot) return;
  printSnapshot = {
    mode: document.body.dataset.printMode,
    disclosures: [...document.querySelectorAll('main details')].map(detail => [detail, detail.open])
  };
  document.body.dataset.printMode = selectedPrintMode;
  printSnapshot.disclosures.forEach(([detail]) => { detail.open = true; });
}

function restoreChapterPrint() {
  if (!printSnapshot) return;
  printSnapshot.disclosures.forEach(([detail, open]) => { detail.open = open; });
  if (printSnapshot.mode === undefined) delete document.body.dataset.printMode;
  else document.body.dataset.printMode = printSnapshot.mode;
  printSnapshot = null;
  selectedPrintMode = 'student';
}

function printChapter(mode) {
  selectedPrintMode = mode;
  prepareChapterPrint();
  try { window.print(); } catch (error) { restoreChapterPrint(); throw error; }
}

function setupChapterPrinting() {
  restoreChapterPrint();
  const main = document.getElementById('main');
  main.querySelectorAll('details').forEach(detail => {
    const summary = detail.querySelector('summary')?.textContent || '';
    const teacher = /suggested classroom sequence|teaching notes/i.test(summary);
    detail.classList.add(teacher ? 'print-teacher' : 'print-answer');
    if (/^show /i.test(summary)) detail.classList.add('print-answer-only');
  });
  main.querySelectorAll('a').forEach(link => {
    if (/teacher|explained (?:key|answers|decision log)|marking key|illustrative cleaned/i.test(link.textContent)) link.classList.add('print-teacher');
  });
  const oldButton = main.querySelector('#chapter-print, #print');
  if (!oldButton) return;
  const controls = document.createElement('span');
  controls.className = 'print-controls';
  for (const [mode, label] of [['student', 'Print student copy'], ['answers', 'Print with answers']]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.addEventListener('click', () => printChapter(mode));
    controls.append(button);
  }
  oldButton.replaceWith(controls);
  const note = document.createElement('p');
  note.className = 'print-help';
  note.textContent = 'Student copy omits practice answers and teacher notes. Worked teaching examples remain in both copies. Choose Save as PDF in the print dialog if needed.';
  controls.parentElement.append(note);
  const chapter = chapters.find(ch => ch.id === currentTextbookRoute());
  if (chapter) {
    const key = document.createElement('p');
    key.className = 'print-only print-answer-key';
    key.textContent = `Quick-check answer: ${chapter.quiz.options[chapter.quiz.answer]}. ${chapter.quiz.explanation}`;
    main.querySelector('#chapter-quiz').after(key);
  } else if (currentTextbookRoute() === 'selection') {
    const key = document.createElement('p');
    key.className = 'print-only print-answer-key';
    key.textContent = 'Quick-check answer: total >= 50. Greater than or equal to includes the boundary value.';
    main.querySelector('#quiz').after(key);
  }
}

window.addEventListener('beforeprint', prepareChapterPrint);
window.addEventListener('afterprint', restoreChapterPrint);
window.addEventListener('hashchange', setupChapterPrinting);
setupChapterPrinting();
