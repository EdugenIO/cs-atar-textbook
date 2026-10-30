# Computer Science ATAR — The Classroom Textbook

A free, open textbook for WA Computer Science ATAR Units 1–4, using Python and SQLite. It includes 50 draft chapters, 182 glossary terms, worksheets, practice questions, quizzes and explained answers. No account is required to read the book.

This is a learning resource: the website does not grade, collect submissions or track students. Revision and exam-style questions are optional practice. The book is independent and does not imply SCSA or Department endorsement.

## Read the book

- [GitHub Pages](https://edugenio.github.io/cs-atar-textbook/)
- [Sites edition](https://cs-atar-textbook-perth.stony-fir-8901.chatgpt.site/)
- [Source repository](https://github.com/EdugenIO/cs-atar-textbook)

| Unit | Chapters | Main topics |
| --- | ---: | --- |
| 1 | 16 | Programming foundations, software development and networks |
| 2 | 10 | Databases, cyber security and responsible data use |
| 3 | 14 | Advanced programming, software development and networks |
| 4 | 10 | Relational design, SQL, database development, security, cryptography and ethics |

## Reuse and contribute

Original textbook content is **CC BY 4.0**. Original website code, tests and runnable Python/SQL example code are **MIT-licensed**. Educational prose embedded in JavaScript and HTML remains CC BY 4.0. See [LICENSE.md](LICENSE.md) for scope, attribution and third-party exceptions; full texts are in [LICENSE-CONTENT.txt](LICENSE-CONTENT.txt) and [LICENSE-CODE.txt](LICENSE-CODE.txt).

Fork the repository to adapt the book. Credit Brett Sullivan and contributors, link to the source and CC BY 4.0 licence, and indicate changes to the content. Preserve the applicable software licence notices. External linked resources and official SCSA documents retain their own terms.

Corrections and improvements can be proposed through GitHub issues or pull requests. Include the affected chapter or glossary term and an explanation or source for the proposed correction. Contributions should be original or appropriately licensed and submitted under the applicable content/software licences above.

## Run locally

No installation or build step is required. With Python installed:

```sh
python -m http.server 8765 --directory dist
```

Open `http://localhost:8765/`. With Node installed, run the regression checks:

```sh
node --test tests/*.test.mjs
```

GitHub Pages publishes `dist/` through the existing `.github/workflows/pages.yml` workflow after successful checks on `main`. Sites publishing uses its separate project checkout; a GitHub push does not automatically update the Sites edition.

## Editing guide

- `dist/app.js`: catalogue, selection lesson, About page and shared footer.
- `dist/glossary.js`: alphabetised glossary definitions and chapter links.
- `dist/*chapters.js`: lesson content and resource references.
- `dist/unit4-er-interpretation.js`, `unit4-er-interpretation.html`, `unit4-er-ten-table.svg` and `er-model.json`: ten-table interpretation worksheet, diagram and 14 explained questions. The standalone pack includes printable questions/answers and licences.
- `dist/unit4-data-quality.js`, `unit4-data-quality.html` and `data-quality-model.json`: five-factor worksheet with fictional dated source evidence, raw/reference CSVs, 12 questions, explained decisions and a printable/downloadable pack.
- `dist/reader.js`: lesson rendering, downloads, practice quizzes and teaching sequence.
- `dist/navigation.js`, `chapter-navigation.js`, `content-overflow.js`, `search.js`, `printing.js`: reading navigation, search destinations, scrolling and print modes.
- `dist/style.css`, `print.css`, `index.html`: site layout, print styles and script loading.
- `dist/*.md`, `*.py`, `*.sql`, `*.csv`, `*.svg`, `*.zip`: downloadable classroom resources. Update matching ZIP members when their contents change, and retain the licence notices.
- `dist/*coverage.js`, `audit-hub.js`, `unit3-evidence.js`: editorial coverage maps and historical review notes.

## Editorial status

Working content edition 0.48, with public licensing and interface updates made on 14 October 2026. Teacher review, technical/source currency, diagram conventions and classroom trials remain ongoing. Historical audit labels and resource dates are retained as provenance; later website or licence updates do not imply new curriculum sign-off. Starter files are deliberately unfinished; reference examples use synthetic data and are for learning rather than production deployment.

Official curriculum documents: [SCSA Computer Science](https://senior-secondary.scsa.wa.edu.au/syllabus-and-support-materials/technologies/computer-science).

## Teacher lesson planner

The Teaching sequence page uses dist/teaching-planner-data.js for 256 allocated lessons. Each unit has 16 four-lesson teaching weeks and a separate two-week exam block. Edit lesson activities, objectives, checks and links there; keep teaching-lessons.csv and teaching-sequence.md aligned. The interface is in teaching-planner.js and teaching-planner.css. Project lesson counts are checked by tests/teaching-planner.test.mjs.


## Lesson slides

Unit 1 Weeks 1–8, Week 9 Lessons 1–2 and Week 10 have thirty-eight eight-slide decks. Each planner lesson links to browser presentation, editable PowerPoint and teacher notes. Shared content lives in the slide-source/unit*-week*.json files; see slide-source/README.md for editing and regeneration. Run node scripts/build-slide-web.mjs after content changes; PowerPoint regeneration is separate. Later lesson buttons appear only when files exist.





## Link sharing

The homepage includes static Open Graph and large-image card metadata for social previews. Share https://edugenio.github.io/cs-atar-textbook/ . Artwork is in dist/social-preview.svg with a 1200 x 630 PNG at dist/social-preview-v1.png. The SVG is editable; scripts/build-social-preview.mjs optionally rebuilds the PNG using sharp. Use a new versioned image filename when replacing artwork so existing social caches can be refreshed. Hash routes share the homepage preview.

## Assessment planning library

The Assessments navigation item opens `#assessments`. The 2027 planning catalogue provides two eight-task outlines with prescribed category totals, 18 project alternatives, eight standard controlled-test blueprints and four standard exam blueprints. Choice applies to projects only. Ten equivalent Pygame game themes and two database options include starters and synthetic fixtures; all resources are public drafts rather than secure issued papers or SCSA-approved tasks.

Edit `assessment-source/catalogue.json`, then run `python scripts/build-assessments.py` to regenerate browser data, Markdown briefs, CSV templates and ZIP packs. The generator owns `dist/assessments/briefs` and removes stale generated briefs there. Interface code is in `dist/assessments.js` and `dist/assessments.css`. Run `node --test tests/*.test.mjs` before publishing. Keep actual tests, unreleased marking keys and student evidence in the school's private system.

The source review identifies the 2027 Year 12 syllabus, the currently listed Year 11 syllabus effective from 2026 and the need to check the 2027 WACE Manual before issue. The linked content allocation is a family-level planning map; exact item mapping, final keys, moderation and school release review remain outstanding.





Programming Task 1 scope was revised on 26 October 2026: five identical-difficulty Pygame themes per year, common year-level functional/non-functional contracts, acceptance fixtures, item-level marking guides, AI/primitive asset policy and scope audit. Edit `assessment-source/game-projects.json` and the catalogue, then regenerate with `python scripts/build-assessments.py`. Game fixture/scaffold generation is in `scripts/game_projects.py`. Display shells are infrastructure only; core assessed behaviour remains unimplemented.


## Static exam practice pilot

The Exam practice navigation item opens `practice/`. Six original sets (three per year) each provide eight short answers and two extended responses (30 marks), optional reading/writing timers, local browser drafts, locked responses after finishing, criterion-based self-marking, separate corrections, teacher-discussion flags, text exports and print/PDF. No backend, account, API or student submission service is used. Guides are public and marks are student-awarded. Edit `dist/practice/questions.js`; increase a set revision after material content changes. See `dist/practice/README.md` for authoring, limitations and classroom review. Run `node --test tests/*.test.mjs` before publishing.

## Editorial language

Use Australian English throughout student and teacher prose, including questions, answers, slides and downloads. Preserve code/API identifiers, standard markup attributes, official titles and source URLs. Use practice/practicing throughout as the site owner’s preferred spelling, retaining Australian English for other words; use program for computer programs.

## Expanded explanations and scaffolded practice

The 30 October 2026 teaching expansion adds 92 embedded modules, 50 topic-specific checking clinics, 27 runnable Python examples and three SQLite labs. It covers Python encapsulation conventions, scope/errors, file read/write/append, dictionary versus grid choices, testing, cryptography benefits, gateways, log cleaning/manipulation, normalisation anomalies, and DDL/DML. Student/teacher lab packs are in `dist/depth/`; sources and limits are recorded there. These are ungraded learning additions, not changes to the assessment outline.

Author in `scripts/build-teaching-depth.py`, then run `python scripts/build-teaching-depth.py`. This regenerates `dist/depth-data.js` and downloadable examples/fixtures/packs. `dist/depth.js` inserts material beside existing anchors before the reader/search index runs; original chapter explanations and worked solutions remain intact. Run `node --test tests/*.test.mjs` and `python tests/teaching-depth-examples.test.py` before publishing. Keep actual results and classroom trials separate from the supplied expected outputs.

## Site audit and next steps

The 30 October 2026 site audit is linked at the top of Coverage & audits. It provides a readable report and an editable 18-task CSV, distinguishing confirmed findings, pending reviews and planned improvements. Historical coverage snapshots retain their own dates and limits. Edit `audit-source/site-audit-2026-10-30.json`, then run `python scripts/build-site-audit.py` to regenerate the report HTML, Markdown, CSV and JSON. Findings are a dated source snapshot, not automatic sign-off after later changes.
## Pygame delivery alignment (A01)

Run `python scripts/build-project-alignment.py` after rebuilding assessment contracts, then `node scripts/build-slide-web.mjs`. The alignment builder updates the existing 10 Unit 1 and 12 Unit 3 workshops, their project chapters, guides, workbooks, milestone/test templates and five-theme teaching packs. Contracts and assessment weights remain in `assessment-source/`.

Original console examples are archived under `dist/legacy-projects/`. Ten existing Unit 1 project decks retain their original editable content and are labelled legacy in the viewer, notes and complete Unit 1 bundle. Current project cards use the aligned workbook instead; replacement decks remain A06. Pygame preparation resources (A02) are implemented; actual school-machine/learner verification and classroom workload/moderation (A03) remain pending.

Check with `python tests/project-alignment.test.py`, the existing Node suites and Python package/example checks. Do not infer a completed game or classroom feasibility from the display-only starter shell.

## Pygame preparation (A02)

Editable source lives in `pygame-source/`. Run `python scripts/build-project-alignment.py` then `python scripts/build-pygame-bridge.py` to regenerate the projects followed by the pre-project teaching allocations, CSV and pack. The bridge uses four existing practice periods per year and preserves the original objective, chapter and controlled practical slots. Workbooks/HTML/code are generated under `dist/pygame/`; `verification.md` records actual checks and is deliberately preserved by the builder.

Install `pygame==2.6.1` into an isolated environment and run `python tests/pygame-bridge.test.py`; the test configures SDL dummy video/audio for reproducible rendering and loop checks. Run `node --test tests/*.test.mjs` for allocation/link and existing regressions. Local SDL checks do not establish physical keyboard input, school installation or independent learner readiness. Record those in `dist/pygame/readiness.csv`. A02 remains implemented with school validation pending; A03 is classroom workload/moderation and A06 is slides.
