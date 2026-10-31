/* Read-only static curriculum inventory. No pupil data or review approvals stored. */
(() => {
  const e = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let page = 0;
  const size = 20;
  const ids = ['map-unit','map-kind','map-gap','map-search','map-leaves'];
  const input = id => document.getElementById(id);
  function selected() {
    const query = input('map-search').value.trim().toLowerCase();
    return curriculumMap.rows.filter(r => {
      const roles = ['explanation','example','independentTask'];
      return (input('map-unit').value === 'all' || String(r.unit) === input('map-unit').value)
        && (input('map-kind').value === 'all' || r.kind === input('map-kind').value)
        && (!input('map-leaves').checked || !r.isParent)
        && (input('map-gap').value === 'all' || (input('map-gap').value === 'retrieval' ? roles.some(k => !r[k]) || !r.practice.length : roles.every(k => r[k])))
        && (!query || [r.id,r.focus,r.kind,...r.relatedChapters,...roles.map(k => r[k]?.label || ''),...r.practice.map(p => p.title)].join(' ').toLowerCase().includes(query));
    });
  }
  function candidate(ref) {
    return ref ? `<a href="${e(ref.url)}">${e(ref.label)}</a><small>${ref.current ? 'Current written-provision evidence; independent teacher review pending.' : 'Historical candidate; exact item demand not verified.'}</small>` : '<span class="map-gap">Not located by retrieval; review required.</span>';
  }
  function render() {
    const rows = selected();
    page = Math.min(page, Math.max(0, Math.ceil(rows.length / size) - 1));
    const slice = rows.slice(page * size, (page + 1) * size);
    input('map-status').textContent = `${rows.length} source items match; showing ${rows.length ? page * size + 1 : 0}–${Math.min((page + 1) * size, rows.length)}. All items await independent review; this is not a coverage percentage.`;
    input('map-rows').innerHTML = slice.length ? slice.map(r => `<tr><th scope="row"><a href="${e(r.sourceURL)}">${e(r.id)}</a><small>Unit ${r.unit} · ${e(r.kind)} · ${r.isParent ? 'Parent item' : 'Leaf item'}<br>Printed p${r.printedPage} / PDF p${r.pdfPage}<br>Content-list bullet ${r.bulletOnPage} · nesting ${r.markerLevel}</small><p>${e(r.focus)}</p><details><summary>Source and related lessons</summary><p>Editorial numbering, not official SCSA IDs. Open the source page and read the exact bullet with its parent context.</p><p>Related chapters: ${r.relatedChapters.map(id => `<a href="../#${e(id)}">${e(id)}</a>`).join(' · ')}</p><p>Chapter-level allocations only: ${r.lessons.map(l => `U${l.unit} W${l.week} L${l.lesson}`).join(', ') || 'No allocation located'}. Exact bullet-to-lesson teaching remains unverified.</p></details></th><td><strong>Explanation</strong>${candidate(r.provisionReview?.explanation || r.explanation)}<strong>Worked example</strong>${candidate(r.provisionReview?.example || r.example)}</td><td><strong>Independent task</strong>${candidate(r.provisionReview?.independentTask || r.independentTask)}${r.independentTask?.prompt ? `<details><summary>Inspect the historical proposed task</summary><p>${e(r.independentTask.prompt.replace(/<[^>]+>/g,' '))}</p></details>` : ''}<strong>Formative practice</strong>${r.practice.length ? r.practice.map(p => `<p><a href="${e(p.url)}">${e(p.set)} / ${e(p.id)}: ${e(p.title)}</a></p>`).join('') + '<small>Historical candidate question; current formative practice is linked above.</small>' : '<p class="map-gap">No historical question matched. Use the current independent task and feedback.</p>'}</td><td>${r.provisionReview ? `<p><strong>${e(r.provisionReview.status)}</strong> · ${e(r.provisionReview.date)}<br><a href="${e(r.provisionReview.url)}">Current demand review</a> · <a href="${e(r.provisionReview.feedback.url)}">Explained feedback</a></p>` : '<p>Parent context: inspect the associated detailed items.</p>'}${r.editorialReview ? `<details><summary>Historical retrieval and first inspection</summary><p><strong>Initial editorial judgement: ${e(r.editorialReview.judgement)}</strong><br><a href="${e(r.editorialReview.url)}">${e(r.editorialReview.demand || 'Inspect leaf reviews')}</a></p><p>${e(r.editorialReview.rationale)}</p><small>${e(r.editorialReview.followUpStatus || 'See leaf reviews')}</small></details>` : ''}<strong>Independent item review pending</strong><p>Formal assessment: school-issued task/item mapping and adopted outline not supplied.</p><p>Independent reviewer/date: not supplied.</p><small>${e(r.editorialReviewer)}<br>${e(r.editorialDate)}</small><p>Historical retrieval gaps: ${e(r.gaps.filter(g => !['formalAssessment','independentReview'].includes(g)).join(', ') || 'none; candidates still need checking')}.</p></td></tr>`).join('') : '<tr><td colspan="4">No source items match these filters. Change the filters or search.</td></tr>';
    for (const suffix of ['', '-top']) {
      input('map-previous' + suffix).disabled = page === 0;
      input('map-next' + suffix).disabled = (page + 1) * size >= rows.length;
      input('map-page' + suffix).textContent = `Page ${rows.length ? page + 1 : 0} of ${Math.ceil(rows.length / size)}`;
    }
  }
  for (const id of ids) input(id).addEventListener(id === 'map-search' ? 'input' : 'change', () => {page = 0; render();});
  for (const suffix of ['', '-top']) {
    input('map-previous' + suffix).onclick = () => {page--; render();};
    input('map-next' + suffix).onclick = () => {page++; render();};
  }
  render();
})();
