# Lesson slide source

Pilot: Unit 1, Week 1, four lessons. Each lesson has eight slides and a suggested 55-minute sequence. Adapt timings to local classes.

`unit1-week1.json` is the shared content source: slide titles, editable code/tables, student prompts, teacher notes, preparation and timings. `node scripts/build-slide-web.mjs` rebuilds browser data, the availability registry and teacher-note pages using Node alone. PowerPoint files in `dist/slides/` are editable native presentations with speaker notes; they were generated from this JSON using the Codex presentation runtime. To revise the shared course, update this source and regenerate both formats; keep downloaded personal PowerPoint customisations separately. Browser regeneration alone does not update the PowerPoint files.

Browser viewer: `dist/slides/index.html?lesson=u1-w01-l01` (through a local HTTP server). Arrow keys and Home/End navigate; Read all slides supports continuous reading and printing. Teacher notes contain public suggested answers. Actual classroom, PowerPoint and screen-reader trials remain teacher review activities; file/layout checks are not a substitute.

Original text and table content CC BY 4.0; example code MIT. See the repository licences. Source references are recorded in the JSON and in PowerPoint speaker notes. Later lessons receive buttons only when resources exist.
