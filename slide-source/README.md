# Lesson slide source

Available: all 64 Unit 1 lessons across Weeks 1–16, plus twelve Unit 2 lessons across Weeks 1–3. Each lesson has eight slides and a suggested 55-minute sequence. Adapt timings to local classes.

The `unit*-week*.json` files are the shared content sources: slide titles, editable code/tables, student prompts, teacher notes, preparation and timings. `node scripts/build-slide-web.mjs` rebuilds browser data, the availability registry and teacher-note pages using Node alone. PowerPoint files in `dist/slides/` are editable native presentations with speaker notes; they were generated from this JSON using the Codex presentation runtime. To revise the shared course, update this source and regenerate both formats; keep downloaded personal PowerPoint customisations separately. Browser regeneration alone does not update the PowerPoint files.

Browser viewer: `dist/slides/index.html?lesson=u1-w01-l01` (through a local HTTP server). Arrow keys and Home/End navigate; Read all slides supports continuous reading and printing. Teacher notes contain public suggested answers. Actual classroom, PowerPoint and screen-reader trials remain teacher review activities; file/layout checks are not a substitute.

Original text and table content CC BY 4.0; example code MIT. See the repository licences. Source references are recorded in the JSON and in PowerPoint speaker notes. Later lessons receive buttons only when resources exist.







Unit 1 completion update, 15 October 2026: 26 decks added for Week 9 Lessons 3–4 and Weeks 11–16. These use ungraded practice, public explained teacher notes and the established editable eight-slide format. Network drawings still need teacher checking against the linked SCSA symbol reference.

Download the complete Unit 1 library: [64 editable PowerPoints](https://edugenio.github.io/cs-atar-textbook/slides/unit1-all-lesson-slides.zip).

Unit 2 Week 1: [four editable PowerPoints](https://edugenio.github.io/cs-atar-textbook/slides/unit2-week1-lesson-slides.zip), covering data and information, flat-file maintenance, database software, data independence and access.

Unit 2 Week 2: [four editable PowerPoints](https://edugenio.github.io/cs-atar-textbook/slides/unit2-week2-lesson-slides.zip) with the model datasets, ER diagram, workbook and explained answers. The PowerPoint ER diagram uses editable native shapes and text; the browser version uses a wider SVG adaptation of the same model with an accessible description.

Unit 2 Week 3: [four editable PowerPoints](https://edugenio.github.io/cs-atar-textbook/slides/unit2-week3-lesson-slides.zip) covering normalisation from 1NF to 3NF, preservation of reservation facts and a fresh club problem. Includes starter JSON, all eight stage CSVs, workbook and explained answers.
