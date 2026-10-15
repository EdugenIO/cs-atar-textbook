// Native text/HTML visuals stay readable without images, colour or a mouse.
const textbookLearningGuides = {...unit1LearningGuides,...unit2LearningGuides,...unit3LearningGuides,...unit4LearningGuides};
function renderLearningGuide(id) {
  const guide = textbookLearningGuides[id];
  if (!guide) return '';
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let visual;
  if (guide.kind === 'trace') {
    visual = `<table><thead><tr>${guide.columns.map(c=>`<th scope="col">${escape(c)}</th>`).join('')}</tr></thead><tbody>${guide.rows.map(row=>`<tr>${row.map(c=>`<td>${escape(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  } else {
    const tag = guide.kind === 'flow' ? 'ol' : 'ul';
    visual = `<${tag} role="list" class="learning-nodes learning-${escape(guide.kind)}" style="--learning-columns:${guide.nodes.length}">${guide.nodes.map((node,i)=>`<li><strong>${escape(node.label)}</strong><span>${escape(node.detail)}</span>${guide.kind==='flow'&&i<guide.nodes.length-1?'<span class="learning-arrow" aria-hidden="true">→</span>':''}</li>`).join('')}</${tag}>`;
  }
  return `<div class="learning-block" data-learning-guide="${escape(id)}"><p class="learning-label">Visual walkthrough</p><h3>${escape(guide.title)}</h3><p>${escape(guide.lead)}</p><figure class="learning-visual">${visual}<figcaption>${escape(guide.caption)}</figcaption></figure><div class="learning-recall"><p><strong>Pause and predict:</strong> ${escape(guide.predict)}</p><details class="learning-explanation print-answer-only"><summary>Show the explanation</summary><p>${escape(guide.answer)}</p></details><p><strong>Try a small change:</strong> ${escape(guide.retry)}</p></div></div>`;
}
// Insert beside the related explanation, before the router/search index uses it.
for (const chapter of chapters) {
  const guide = textbookLearningGuides[chapter.id];
  if (!guide) continue;
  const section = chapter.sections.find(([heading]) => heading === guide.anchor);
  if (section) section[1] += renderLearningGuide(chapter.id);
}
