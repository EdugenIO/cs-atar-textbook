import fs from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const data = JSON.parse(await fs.readFile(new URL('slide-source/unit1-week1.json', root), 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
await fs.mkdir(new URL('dist/slides/notes/', root), { recursive: true });
await fs.writeFile(new URL('dist/slides/slide-data.js', root), 'const weekOneSlides = ' + JSON.stringify(data).replaceAll('<','\\u003c') + ';\n');
for (const lesson of data.lessons) {
  const notes = lesson.slides.map((slide,index) => `<section><h2>${index + 1}. ${escape(slide.title)}</h2><p><strong>Suggested time:</strong> ${slide.minutes} minutes</p>${slide.strategy ? `<p><strong>Instructional strategy:</strong> ${escape(slide.strategy)}</p>` : ''}<p>${escape(slide.notes)}</p></section>`).join('');
  await fs.writeFile(new URL(`dist/slides/notes/${lesson.id}.html`, root), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Teacher notes: ${escape(lesson.title)}</title><link rel="stylesheet" href="../viewer.css"></head><body class="notes"><a href="../?lesson=${lesson.id}">← Present slides</a><h1>${escape(lesson.title)}</h1><p>Unit 1 · Week 1 · Lesson ${lesson.lesson} · Suggested 55-minute plan; adjust to local timing.</p><p><strong>Prepare:</strong> ${escape(lesson.prepare)}</p><p>Suggested answers are teacher guidance, not extra assessment tasks. These notes are public.</p>${notes}<h2>Sources and reuse</h2><p><a href="${data.source}">Textbook chapter</a> · <a href="https://docs.python.org/3/library/functions.html">Python built-in functions</a>. Original content CC BY 4.0; code MIT.</p></body></html>`);
}
await fs.writeFile(new URL('dist/lesson-slide-resources.js', root), 'const lessonSlideResources = ' + JSON.stringify(Object.fromEntries(data.lessons.map(lesson => [lesson.id, { title: lesson.title, slides: lesson.slides.length }]))) + ';\n');
console.log('Browser data and four teacher-note pages generated.');
