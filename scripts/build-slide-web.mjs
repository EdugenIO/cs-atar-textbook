import fs from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const sourceFolder = new URL('slide-source/', root);
const files = (await fs.readdir(sourceFolder)).filter(name => /^unit\d+-week\d+\.json$/.test(name)).sort();
const weeks = await Promise.all(files.map(name => fs.readFile(new URL(name, sourceFolder),'utf8').then(JSON.parse)));
const lessons = weeks.flatMap(week => week.lessons);
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
await fs.mkdir(new URL('dist/slides/notes/', root), { recursive: true });
await fs.writeFile(new URL('dist/slides/slide-data.js', root), 'const lessonSlides = ' + JSON.stringify({lessons}).replaceAll('<','\\u003c') + ';\n');
for (const data of weeks) for (const lesson of data.lessons) {
  const notes = lesson.slides.map((slide,index) => `<section><h2>${index + 1}. ${escape(slide.title)}</h2><p><strong>Suggested time:</strong> ${slide.minutes} minutes</p>${slide.strategy ? `<p><strong>Instructional strategy:</strong> ${escape(slide.strategy)}</p>` : ''}<p>${escape(slide.notes)}</p></section>`).join('');
  const duration = lesson.slides.reduce((sum,slide) => sum + slide.minutes,0);
  const references = data.references.map(url => `<a href="${escape(url)}">${escape(new URL(url).pathname.split('/').pop())}</a>`).join(' · ');
  await fs.writeFile(new URL(`dist/slides/notes/${lesson.id}.html`, root), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Teacher notes: ${escape(lesson.title)}</title><link rel="stylesheet" href="../viewer.css"></head><body class="notes"><a href="../?lesson=${lesson.id}">← Present slides</a><h1>${escape(lesson.title)}</h1><p>Unit ${data.unit} · Week ${data.week} · Lesson ${lesson.lesson} · Suggested ${duration}-minute plan; adjust to local timing.</p><p><strong>Prepare:</strong> ${escape(lesson.prepare)}</p><p>Suggested answers are teacher guidance, not extra assessment tasks. These notes are public.</p>${lesson.legacyProject ? '<aside class="legacy-project-notice"><strong>Legacy console practice.</strong> These slides are not the current Pygame Task 1. <a href="../../#design">Use the aligned game chapter and workbook</a>. Replacement project slides are pending (A06).</aside>' : ''}${notes}<h2>Sources and reuse</h2><p><a href="${escape(lesson.source || data.source)}">Textbook chapter</a> · ${references}. Original content CC BY 4.0; code MIT.</p></body></html>`);
}
await fs.writeFile(new URL('dist/lesson-slide-resources.js', root), 'const lessonSlideResources = ' + JSON.stringify(Object.fromEntries(lessons.map(lesson => [lesson.id, { title: lesson.title, slides: lesson.slides.length }]))) + ';\n');
console.log(`Browser data and ${lessons.length} teacher-note pages generated.`);
