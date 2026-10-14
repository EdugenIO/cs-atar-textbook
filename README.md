# Computer Science ATAR classroom textbook

Working edition 0.48, 14 October 2026. Public classroom preview on GitHub Pages: 50 original draft chapters across WA ATAR Units 1–4. Python is the teaching language; database examples use SQLite. Independent resource; no SCSA or Department endorsement.

| Unit | Draft chapters | Scope |
|---|---:|---|
| 1 | 16 | Programming foundations, software development, networks, review and exam preparation |
| 2 | 10 | Databases, cyber security, responsible data use, review and exam preparation |
| 3 | 14 | Advanced programming, a software project, networks, review and exam preparation |
| 4 | 10 | Relational design, advanced SQL, database development, security, ethics, integrated review, full-course consolidation and exam preparation |

## Review and classroom use

Coverage & audits provides editorial maps for all four units and a Unit 3 convention/practical evidence clinic. Drafts and reference-code checks do not certify alignment or learner achievement. Independent teacher review, conventions, learner evidence, pacing and source/legal currency remain open. Audit editions/dates are historical snapshots; interface changes do not mark those checks complete.

Each semester has 18 weeks: 16 teaching weeks at four lessons per week (64 lessons), with two exam weeks blocked. Projects, assessment slots, feedback and revision fit within those lessons. The Unit 3 project has 12 embedded supervised lessons; Unit 4 has four foundation lessons and 16 embedded workshops. Confirm contact hours and the school assessment outline. Original practice papers are formative samples, not official full examinations or grade predictions. Teacher keys are separate but not access-protected; adapt and secure materials before summative use.

Project starters are deliberately unfinished. Reference implementations illustrate the brief's classroom scope; they do not demonstrate production permissions, concurrency, recovery or deployment. Use synthetic data. See each brief/workbook for its limits.

## Preview and editing

No installation or build step is required. From this checkout run `python -m http.server 8765 --directory dist`, then open `http://localhost:8765/`. Push changes to `main` to run the regression checks and publish `dist/` through `.github/workflows/pages.yml`. GitHub Pages settings use GitHub Actions as the publishing source.

- `dist/app.js`: unit catalogue, glossary, original selection lesson and About page.
- `dist/chapters.js`, `project-chapter.js`, `network-chapters.js`, `audit-chapters.js`, `unit2-chapters.js`, `unit2-review-chapters.js`, `unit3-chapters.js`, `unit4-chapters.js`: chapter data and teaching content.
- `dist/reader.js`: rendering, downloads, quizzes and teaching sequence.
- `dist/coverage.js`, `*coverage.js`, `audit-hub.js`, `unit3-evidence.js`: editorial maps and evidence resources.
- `dist/navigation.js`, `chapter-navigation.js`, `content-overflow.js`, `search.js`, `printing.js`: skip link, route focus, scrolling, indexed search and print modes.
- `dist/style.css`, `print.css`, `index.html`: styling and navigation shell.
- `dist/*.md`, `*.py`, `*.sql`, `*.csv`, `*.svg`, `*.zip`: downloadable resources. When a resource changes, update its matching ZIP members. Preserve original dates as provenance and label historical audit snapshots.

Run relevant Node checks: `node tests/navigation.test.mjs`, `node tests/chapter-navigation.test.mjs`, `node tests/search.test.mjs`, `node tests/printing.test.mjs`. Inspect changed routes/downloads in the browser. Actual screen-reader checks and native PDF pagination/print-dialog restoration remain pending; unit checks do not replace them.

An open reuse licence has not yet been assigned. Ownership, contribution rights and third-party permissions remain under review. Official syllabus authority: https://senior-secondary.scsa.wa.edu.au/syllabus-and-support-materials/technologies/computer-science . See `dist/resource-edition.md` for current status.

## Online copy

Website: https://EdugenIO.github.io/cs-atar-textbook/

Repository: https://github.com/EdugenIO/cs-atar-textbook

This is the GitHub publication checkout. The original Sites project remains separate. Historical resource and audit descriptions may record the earlier private development phase. Teacher answer downloads are included in this preview.
