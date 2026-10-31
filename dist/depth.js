// Original scaffolded explanations are inserted before the reader/search index uses chapters.
function renderTeachingDepth(module) {
  const later = {start:'selection, loops and functions',values:'selection, loops, functions and exception handling',representation:'loops and functions',selection:'loops, functions and exception handling',loops:'functions and exception handling',functions:'lists, loops and exception handling',arrays:'file handling and exception handling'};
  const optional = module.files.length && later[module.route];
  const e=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const files=module.files.map(name=>{
    const item=teachingDepth.examples[name];
    if(!item)throw new Error('Missing teaching example: '+name);
    return `<div class="depth-example"><p class="eyebrow">${item.kind==='sql'?'SQLITE':'PYTHON 3'} · WORKED EXAMPLE</p><p><a class="button secondary" href="depth/${e(name)}" download>Download ${e(name)}</a></p><pre data-depth-code="${e(name)}"><code>${e(item.code)}</code></pre>${item.output?`<details class="print-answer"><summary>Show expected output after your prediction</summary><pre><code>${e(item.output)}</code></pre></details>`:''}</div>`;
  }).join('');
  const checks=module.checks?`<h3>Choose a case and predict first</h3><ul>${module.checks.map(row=>`<li>${e(row[0])}</li>`).join('')}</ul><details class="print-answer"><summary>Show expected evidence and why each case matters</summary><div class="table-scroll"><table><thead><tr><th scope="col">Input / scenario</th><th scope="col">Expected evidence</th><th scope="col">Why this case?</th></tr></thead><tbody>${module.checks.map(row=>`<tr>${row.map(cell=>`<td>${e(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>`:'';
  const references=module.sources.map(key=>`<a href="${e(teachingDepth.sources[key])}">${e(key)}</a>`).join(' · ');
  const content = `<div class="teaching-depth" data-depth-route="${e(module.route)}"><div class="depth-explanation">${module.explanation}</div><div class="depth-predict"><h3>Pause and predict</h3><p>${e(module.predict)}</p></div>${checks}${files}<div class="depth-scaffold"><h3>Build understanding in steps</h3><ol><li><strong>Guided completion:</strong> ${e(module.guided)}</li><li><strong>Independent transfer:</strong> ${e(module.independent)}</li><li><strong>Delayed retrieval:</strong> ${e(module.delayed)}</li></ol><details class="print-answer"><summary>Show the explanation and checking guidance</summary><p>${e(module.answer)}</p></details></div><p class="reference">Original ungraded teaching addition · ${e(teachingDepth.edition)}. ${references?`Technical references: ${references}. `:''}<a href="depth/teaching-depth-pack.zip" download>Download examples and activity pack</a> · <a href="depth/teacher-depth-notes.md" download>Teacher guidance</a></p></div>`;
  return optional ? `<details class="optional-depth"><summary>Optional revisit after ${later[module.route]}</summary><p>This example combines later skills. Complete this chapter's main program and practical task first; return using the prerequisite chapters when ready. It is not required for today's core lesson.</p>${content}</details>` : content;
}

for(const module of teachingDepth.modules){
  if(module.route==='selection')continue;
  const chapter=chapters.find(item=>item.id===module.route);
  if(!chapter)throw new Error('Unknown teaching-depth route: '+module.route);
  if(chapter.sections.some(section=>section[0]===module.title))throw new Error('Duplicate teaching-depth heading');
  const section=[module.title,renderTeachingDepth(module)];
  if(module.anchor){
    const index=chapter.sections.findIndex(item=>item[0]===module.anchor);
    if(index<0)throw new Error('Missing teaching-depth anchor: '+module.anchor);
    chapter.sections.splice(index+1,0,section);
  }else chapter.sections.push(section);
}

// Selection is the one legacy chapter rendered by a function rather than chapter data.
const selectionBeforeTeachingDepth=selection;
selection=function(){
  const extra=teachingDepth.modules.filter(module=>module.route==='selection').map(module=>`<section><h2>${escapeDepthHeading(module.title)}</h2>${renderTeachingDepth(module)}</section>`).join('');
  return selectionBeforeTeachingDepth().replace('</article>',extra+'</article>');
};
function escapeDepthHeading(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
