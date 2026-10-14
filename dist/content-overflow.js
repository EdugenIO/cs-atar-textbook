// Run after the chapter router so every route gets the same local scroll support.
function prepareContentScrollAreas() {
  const main = document.getElementById('main');
  main.querySelectorAll('table').forEach(table => {
    // Only promote an unambiguous all-header first row. Leave complex tables intact.
    const firstRow = table.rows[0];
    if (!table.tHead && firstRow && [...firstRow.cells].every(cell => cell.tagName === 'TH')) {
      table.createTHead().append(firstRow);
    }
    table.querySelectorAll('thead th:not([scope])').forEach(cell => cell.setAttribute('scope', 'col'));
    if (!table.parentElement.classList.contains('table-scroll')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'table-scroll';
      table.before(wrapper);
      wrapper.append(table);
    }
  });
  main.querySelectorAll('figure img').forEach(image => {
    if (!image.parentElement.classList.contains('diagram-scroll')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'diagram-scroll';
      image.before(wrapper);
      wrapper.append(image);
    }
  });
  const counts = { table: 0, diagram: 0, code: 0 };
  main.querySelectorAll('.table-scroll, .diagram-scroll, pre').forEach(area => {
    const kind = area.matches('pre') ? 'code' : area.classList.contains('table-scroll') ? 'table' : 'diagram';
    const number = ++counts[kind];
    area.tabIndex = 0;
    area.setAttribute('role', 'region');
    area.setAttribute('aria-label', `${kind[0].toUpperCase() + kind.slice(1)} ${number}: scroll horizontally if needed`);
  });
}
window.addEventListener('hashchange', prepareContentScrollAreas);
prepareContentScrollAreas();
