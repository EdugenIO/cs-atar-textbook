# Lesson slide source

[Current slide availability](https://edugenio.github.io/cs-atar-textbook/resource-status.html) distinguishes 88 current lesson decks, 12 Year 12 project replacement slots and 156 other missing slots. The 88 indexed files now include ten aligned Year 11 Pygame workshop decks. Ten older console decks remain in the separate archive.

Existing files (including retained legacy project material): all 64 Unit 1 lessons across Weeks 1–16, plus twenty Unit 2 lessons across Weeks 1–5. Each lesson has eight slides and a suggested 55-minute sequence. Adapt timings to local classes.

The `unit*-week*.json` files are the shared content sources: slide titles, editable code/tables, student prompts, teacher notes, preparation and timings. `node scripts/build-slide-web.mjs` rebuilds browser data, the availability registry and teacher-note pages using Node alone. PowerPoint files in `dist/slides/` are editable native presentations with speaker notes; they were generated from this JSON using the Codex presentation runtime. To revise the shared course, update this source and regenerate both formats; keep downloaded personal PowerPoint customisations separately. Browser regeneration alone does not update the PowerPoint files.

Browser viewer: `dist/slides/index.html?lesson=u1-w01-l01` (through a local HTTP server). Arrow keys and Home/End navigate; Read all slides supports continuous reading and printing. Teacher notes contain public suggested answers. Actual classroom, PowerPoint and screen-reader trials remain teacher review activities; file/layout checks are not a substitute.

Original text and table content CC BY 4.0; example code MIT. See the repository licences. Source references are recorded in the JSON and in PowerPoint speaker notes. Later lessons receive buttons only when resources exist.







Unit 1 completion update, 15 October 2026: 26 decks added for Week 9 Lessons 3–4 and Weeks 11–16. These use ungraded practice, public explained teacher notes and the established editable eight-slide format. Network drawings still need teacher checking against the linked SCSA symbol reference.

Download the complete Unit 1 library: [64 editable PowerPoints](https://edugenio.github.io/cs-atar-textbook/slides/unit1-all-lesson-slides.zip).

Unit 2 Week 1: [four editable PowerPoints](https://edugenio.github.io/cs-atar-textbook/slides/unit2-week1-lesson-slides.zip), covering data and information, flat-file maintenance, database software, data independence and access.

Unit 2 Week 2: [four editable PowerPoints](https://edugenio.github.io/cs-atar-textbook/slides/unit2-week2-lesson-slides.zip) with the model datasets, ER diagram, workbook and explained answers. The PowerPoint ER diagram uses editable native shapes and text; the browser version uses a wider SVG adaptation of the same model with an accessible description.

Unit 2 Week 3: [four editable PowerPoints](https://edugenio.github.io/cs-atar-textbook/slides/unit2-week3-lesson-slides.zip) covering normalisation from 1NF to 3NF, preservation of reservation facts and a fresh club problem. Includes starter JSON, all eight stage CSVs, workbook and explained answers.

Unit 2 Week 4: [four editable PowerPoints](https://edugenio.github.io/cs-atar-textbook/slides/unit2-week4-lesson-slides.zip) for SELECT, WHERE, Boolean conditions, ordering, duplicates and empty results. Includes the SQLite starter, setup/worked SQL, expected results, workbook and explained answers. Worked slide queries are executed against the read-only starter in the package checks.

Unit 2 Week 5: [four editable PowerPoints](https://edugenio.github.io/cs-atar-textbook/slides/unit2-week5-lesson-slides.zip) covering inner joins, key matches and whole-inventory aggregates, with grouped category reports explicitly optional. Includes the separate project starter, setup/reports, workbook and explained answers. The queryDatabase lesson field selects the correct read-only fixture for worked-query checks.


S01 update, 9 November 2026: Unit 1 W4 L2, W5 L2, W6 L2 and W7 L3 now deliver the existing Pygame preparation labs. Each retains its Python foundation, names the exact worked files, provides faded/changed practice, expected tests and an independent exit. Browser, PPTX and teacher notes must be regenerated together. Classroom timing and school-machine readiness remain unverified; ten legacy project decks and Year 12 decks are separate pending work.


S02 update, 9 November 2026: ten Unit 1 project presentations now match the ten milestone slots and common game contract. The two Week 9 API/debugging lessons use the current game context and workbook. Each workshop reserves 25 minutes for independent milestone work within the suggested 55-minute period. Earlier console presentations are archived under legacy-projects/slides/; their requirements are separate. Year 12 project slides, classroom workload trials and independent moderation remain pending.

S03 update, 9 November 2026: all ten archived console PowerPoints carry a visible cover warning, ARCHIVED footer on every slide and a matching current Pygame replacement URL in every speaker note. Original eight-slide teaching examples remain editable historical practice. Current decks and the Unit 1 bundle continue to supply the Pygame sequence.

S04 update, 9 November 2026: Unit 2 Week 5 Lesson 4 checks core Q2a/Q3 before optional Q2b/Q4. The core exit uses ungrouped aggregates; grouped summaries and four-table independent transfer are supporting extensions for this lesson. The Year 11 syllabus does not set a maximum join count. Core readiness, local assessment scope and suggested timing still require teacher judgement.

S05 update, 9 November 2026: Unit 2 Weeks 4–5 use shared sqlHandoff metadata from teaching-source/sql-handoffs.json. Each deck cover names its primary file/task and links to setup/workbook/key; every speaker note includes exact fields and references. Browser covers, teacher notes and lesson routes use the same contract. Pathway base/changed tasks and Member/Loan print activities remain teacher-selected alternatives, not interchangeable fixtures. Rebuild decks and bundles when metadata changes.

S07 first batch: Unit 3 Week 1 now has four eight-slide 2027 lessons, a companion workbook/key and executable recovery seed. [Download the four decks and practical resources](https://edugenio.github.io/cs-atar-textbook/slides/unit3-week1-lesson-slides.zip). Year 12 authoring remains in progress; later decks are not yet supplied.
