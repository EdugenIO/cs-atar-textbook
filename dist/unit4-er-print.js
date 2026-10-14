// Preserve answer disclosures when printing or cancelling the worksheet.
const worksheetDisclosures = [...document.querySelectorAll('main details')];
worksheetDisclosures.forEach(detail => detail.classList.add('print-answer-only'));
let worksheetAnswers = false;
let worksheetSnapshot = null;
function prepareWorksheetPrint() {
  if (worksheetSnapshot) return;
  worksheetSnapshot = worksheetDisclosures.map(detail => [detail, detail.open]);
  document.body.classList.toggle('print-with-answers', worksheetAnswers);
  worksheetDisclosures.forEach(detail => { detail.open = true; });
}
function restoreWorksheetPrint() {
  worksheetSnapshot?.forEach(([detail, open]) => { detail.open = open; });
  worksheetSnapshot = null;
  worksheetAnswers = false;
  document.body.classList.remove('print-with-answers');
}
function printWorksheet(answers) {
  worksheetAnswers = answers;
  prepareWorksheetPrint();
  try { window.print(); } catch (error) { restoreWorksheetPrint(); throw error; }
}
document.getElementById('questions-print').onclick = () => printWorksheet(false);
document.getElementById('answers-print').onclick = () => printWorksheet(true);
window.addEventListener('beforeprint', prepareWorksheetPrint);
window.addEventListener('afterprint', restoreWorksheetPrint);
