# Site audit and next steps · 30 October 2026

The sampled technical foundation is working. The next priority is coherence between the Pygame assessment route, teaching sequence and learner preparation, followed by classroom validation and easier navigation through the expanded content.

Audited site: https://edugenio.github.io/cs-atar-textbook/

Audited source: `d7fa2deb158be768eba7215857228847760c0201`. This report is a dated snapshot, not automatic teacher/curriculum sign-off.

**17 open tasks; 1 completed: 3 P1, 12 P2, 2 P3.** P1 = address before formal project issue; P2 = next delivery/usability/reliability work; P3 = later maintenance/discovery. Types: 8 confirmed findings, 5 reviews required and 5 planned improvements.

## What passed

- All 17 Node regression files and the three Python package/example checks passed against the audited source.
- 1,618 HTML/rendered-page href/src references resolved to 322 local targets; no missing local files were found in that crawl.
- 405 sampled published resource URLs returned HTTP 200, including all 84 published PowerPoints. This was not an exhaustive external-site audit.
- Isolated browser practice tests passed for saved draft/reload, timer continuity and expiry, overtime, original-response locking, self-awarded totals, reset cancellation and fresh setup.
- Sampled 320 px chapter, library and marking layouts did not overflow the whole page horizontally; tables/code retain local scroll regions.
- Keyboard Skip to content retained the current chapter URL and focused main; sampled search/deep links and live planner controls worked.
- The original topic-practice sets are clearly labelled as formative samples; answer keys are public and marks are explicitly self-assessed.

## Recommended order

### 1 · Make the course coherent before issuing projects

A01, A02, A03, A04

### 2 · Improve reading, resilience and verification

A05, A07, A09, A10, A11, A12, A13, A14, A15, A16

### 3 · Expand delivery resources from the agreed sequence

A06, A08, A17, A18

## Task summary

| ID | Priority | Type | Task |
| --- | --- | --- | --- |
| A01 | P1 | Confirmed finding | Align programming teaching sequences with the Pygame assessment route |
| A02 | P1 | Confirmed finding | Teach the Pygame skills needed before the assessed project |
| A03 | P1 | Review required | Trial workload and moderate the common project evidence |
| A04 | P1 | Review required | Make the 2027 teaching target and item-level coverage explicit |
| A05 | P2 | Confirmed finding | Add local contents and separate core lessons from extensions |
| A06 | P2 | Confirmed finding | Complete the slide sequence after freezing lesson alignment |
| A07 | P2 | Review required | Moderate question coverage, difficulty and self-marking criteria |
| A08 | P2 | Planned improvement | Add original full practice papers after the blueprint is agreed |
| A09 | P2 | Confirmed finding | Identify GitHub Pages as current and label the older Sites edition |
| A10 | P2 | Confirmed finding | Refresh the resource inventory and separate build dates from review dates |
| A11 | P2 | Confirmed finding | Allow a clear in-memory reset when browser storage is unavailable |
| A12 | P2 | Planned improvement | Warn before replacing an incompatible saved attempt |
| A13 | P2 | Planned improvement | Add optional local JSON backup and restore |
| A14 | P2 | Review required | Complete an assistive-technology and keyboard audit |
| A15 | P2 | Review required | Verify real student and teacher print/PDF output |
| A16 | P2 | Confirmed finding | Add automated real-browser smoke tests to CI |
| A17 | P3 | Planned improvement | Maintain an external-reference review register |
| A18 | P3 | Planned improvement | Provide a concise resource index within the existing teacher navigation |

## Evidence and completion checks

### A01 · P1 — Align programming teaching sequences with the Pygame assessment route

Type: Confirmed finding · Status: Complete · Suggested owner: Course editor · Dependencies: none

**Evidence:** Live Unit 3 Week 7 opens “Investigate the equipment-loan brief and constraints”. Its later workshops build catalogue/search and issue/return behaviour. Unit 1 still integrates a session summary and organiser acceptance trial. Both link the older workbooks. assessment-source/catalogue.json now defines Pygame Task 1 for each year, using 10/12 project lessons.

**Action:** Update the Unit 1/3 project lesson activities, chapter brief, workbooks, linked resources and downloadable lesson plan. Either replace legacy contexts or label them clearly as separate practice so students know which brief they are following.

**Complete when:** Every project workshop links to the correct year-level game contract and workbook; all five themes follow the same core requirements. Existing 10/12 workshop allocations remain explicit. Click through both semester sequences and verify that no assessed instruction accidentally sends students to the previous project.

**Resolution (30 October 2026):** Aligned all 22 Unit 1/3 project workshops, both project chapters/visual guides, workbooks, briefs, milestone/test templates and five-theme teaching packs to the existing shared Pygame contracts. Every workshop links its year-level contract and workbook. Preserved 10/12 workshops; retained console examples as labelled optional legacy practice. Ten old project decks are labelled legacy and excluded from current project-card slide links. A02 preparation, A03 trial/moderation and A06 replacement slides remain open.

**Verification:** 17 Node regression suites and four Python checks passed, including new A01 resource/contract/pack checks. Browser checks covered both year-level workshop/chapter paths and legacy slide notices. All 234 other lessons and 13 other Unit 3 chapters were preserved.

### A02 · P1 — Teach the Pygame skills needed before the assessed project

Type: Confirmed finding · Status: Implemented; school validation pending · Suggested owner: Programming author · Dependencies: A01

**Evidence:** The new depth pack provides ordinary Python examples. A repository scan finds import pygame in the ten scenario display_shell.py files; these are deliberately static infrastructure and student_game.py contains unfinished interfaces. No dedicated worked Pygame gameplay teaching route was located in this audit.

**Action:** Build a small unrelated teaching game in stages: event loop, input/movement, timing, collision, scoring, game states/pause/reset, then year-appropriate structures and persistence. Include faded starters and expected behaviour, keeping the assessed theme tasks independent.

**Complete when:** The agreed sequence explicitly allocates time before assessed implementation. Students can independently complete a changed mini-game from partial support. Worked code runs on the nominated school environment; demonstrations and tests cover state/reset/pause boundaries. Additional GUI learning does not silently consume extra project workshops.

**Resolution (30 October 2026):** Added eight timed, ungraded practice lessons before project issue: Unit 1 W4L2/W5L2/W6L2/W7L3 and Unit 3 W1L2/W2L3/W5L3/W6L3. Preserved Python objectives, controlled practical slots and all 10/12 project workshops. Published a staged unrelated mini-game, Year 12 data/OOP adapter, changed faded task, workbook, expected/actual tests, setup guide and readiness record. Linked from the planner and relevant chapters.

**Verification:** 18 Node regression suites passed. Eleven real-Pygame/SDL automated test methods cover display runners, rules, pause/reset/timeout/collision boundaries, persistence/failure and Year 12 data/OOP/search/sort. Local verification uses Windows Python 3.12/Pygame 2.6.1 with dummy SDL drivers. Physical input on the nominated school setup and observed independent student transfer are still required; A02 is not marked fully complete.

### A03 · P1 — Trial workload and moderate the common project evidence

Type: Review required · Status: Open · Suggested owner: Teacher and independent moderator · Dependencies: A01, A02

**Evidence:** Automated game-package checks verify fixture equality, syntax, map reachability and shell launch infrastructure; they do not implement or verify the students’ complete game. Classroom timing, requirement feasibility and independent moderation are still recorded as pending.

**Action:** Trial one full common core per year, using the fixed requirements and stated school conditions. Record where learners need support and compare expected evidence against the shared marking guide. Confirm local assessment conditions and outline before issue.

**Complete when:** A dated trial records actual time, setup and observed outcomes against functional/non-functional requirements; a second teacher reviews scope, marking and theme equivalence. Any reduction or scaffold is applied equally across themes, and remaining limits are documented before formal use.

### A04 · P1 — Make the 2027 teaching target and item-level coverage explicit

Type: Review required · Status: Open · Suggested owner: Curriculum reviewer · Dependencies: none

**Evidence:** The assessment library and new depth pack target Year 12 teaching from 2027, while About still describes a 2026 Year 12 syllabus basis. The coverage hub deliberately retains older grouped snapshots and states that no unit is signed off. The SCSA course page separately lists Year 11 from 2026 and Year 12 from 2027.

**Action:** Create a current item-level matrix covering syllabus item, explanation, example, independent task, assessment/practice evidence and review status. Clearly distinguish the current teaching edition from historic audit snapshots and check the school-adopted assessment documents.

**Complete when:** Each current syllabus item has a referenced location or an explicit gap, with reviewer/date and evidence limits. The site states which teaching year applies. Historical audit dates remain intact; nothing is labelled SCSA-approved or fully aligned without the required independent review.

### A05 · P2 — Add local contents and separate core lessons from extensions

Type: Confirmed finding · Status: Open · Suggested owner: Site editor and instructional designer · Dependencies: none

**Evidence:** The Unit 4 project page contains approximately 6,799 whitespace-delimited text tokens including code/hidden answers and measures about 45,395 px high in the sampled 320 px view. It has no local chapter contents list. Search can reach section anchors, but the learner lacks an at-a-glance route through the expanded page.

**Action:** Add a compact in-page contents list and label core teaching, optional depth, worked examples and independent activities. Consider smaller linked lesson sections where this improves pacing. Preserve existing section URLs and keyboard focus.

**Complete when:** A learner can identify the next core activity, jump to it and return to the contents on desktop/mobile using keyboard or pointer. Essential instructions remain discoverable. Existing search/deep links continue to work and print output stays readable.

### A06 · P2 — Complete the slide sequence after freezing lesson alignment

Type: Confirmed finding · Status: Open · Suggested owner: Presentation author · Dependencies: A01, A02, A04

**Evidence:** The planner allocates 256 lessons. The resource registry contains 84 decks: all 64 Unit 1 lessons, 20 Unit 2 lessons and zero for Units 3/4. Therefore 172 planned lessons currently lack decks: Unit 2 has 44 remaining, Units 3 and 4 have 64 each. Available downloads are working; this is a coverage gap, not broken links.

**Action:** Map existing decks to the revised lesson outcomes first. Then complete Unit 2 Weeks 6–16 and Units 3/4 in the agreed teaching order. Incorporate selected new examples and strategies rather than placing every extension on slides.

**Complete when:** The planner accurately shows availability for each lesson; newly completed decks have matching editable PowerPoint, browser presentation and notes. Code/SQL traces and packages pass checks, and visual/teacher reviews are recorded. No placeholder link claims an unwritten deck exists.

### A07 · P2 — Moderate question coverage, difficulty and self-marking criteria

Type: Review required · Status: Open · Suggested owner: Assessment author and second marker · Dependencies: A04

**Evidence:** Six topic practice sets provide 60 original questions and 180 possible self-assessed marks. They have chapter links, examples and criteria, and are clearly labelled formative samples. This audit did not independently moderate all question interpretations or establish item-level syllabus/difficulty coverage.

**Action:** Create a question-bank matrix by year/unit, syllabus item, command word, skill, demand and misconception. Have another teacher mark a range of responses, including correct alternative wording and partial answers.

**Complete when:** Each item has reviewed criteria and acceptable alternatives; discrepancies and revisions are logged. The bank identifies genuine coverage gaps and avoids unintended double credit. Changed sets use safe revision handling rather than silently discarding saved responses.

### A08 · P2 — Add original full practice papers after the blueprint is agreed

Type: Planned improvement · Status: Open · Suggested owner: Assessment author · Dependencies: A04, A07

**Evidence:** Current sets are ten-question, 30-mark topic samples with a locally suggested 45-minute allowance. They explicitly do not claim to be full official-format examinations.

**Action:** Develop original Year 11/12 full practice papers using the school-adopted structure and applicable current exam documents. Provide reading/writing settings, section navigation, realistic stimuli and moderated self-marking support.

**Complete when:** Paper structure and timing are documented against the adopted reference, every item has reviewed criteria, and students can finish, self-mark, export and repeat. Topic practice retains its clear label. Do not present an unreviewed mock as an official SCSA paper.

### A09 · P2 — Identify GitHub Pages as current and label the older Sites edition

Type: Confirmed finding · Status: Open · Suggested owner: Site owner · Dependencies: none

**Evidence:** README lists both GitHub Pages and a Sites edition without an archive distinction. The live Sites sidebar shows Overview, Units 1–4, Teaching sequence, Coverage & audits and Start reading, but lacks the Assessments and Exam practice entries present on GitHub Pages.

**Action:** Choose the current canonical sharing URL and place a clear archived-edition notice/link on the older site, or maintain a documented synchronisation process. Update the README and sharing guidance accordingly.

**Complete when:** A teacher arriving through either published link can immediately identify and reach the current edition. No old site is presented as equivalent unless it actually contains the same released resources. Preserve historical material rather than deleting it without a deliberate decision.

### A10 · P2 — Refresh the resource inventory and separate build dates from review dates

Type: Confirmed finding · Status: Open · Suggested owner: Maintainer · Dependencies: none

**Evidence:** The footer still reads edition 0.48 / 14 October 2026 while depth additions are dated 30 October. README advertises 182 glossary terms, whereas the checked glossary has 191. Its headline slide paragraph describes only part of the now-available collection. Historical audit provenance is already correctly labelled.

**Action:** Generate current resource counts and a release/change log from one manifest. Distinguish content review dates, historical snapshot dates and current build/release dates.

**Complete when:** Displayed counts agree with the repository: 50 chapters, 191 terms, 84 decks, six practice sets and the currently generated teaching resources. Update procedures prevent future count drift. Historical audits retain their original dates and limits.

### A11 · P2 — Allow a clear in-memory reset when browser storage is unavailable

Type: Confirmed finding · Status: Open · Suggested owner: Site developer · Dependencies: none

**Evidence:** In dist/practice/practice.js, confirm-clear catches localStorage.removeItem failure and returns before state=null/setup(). This can prevent a learner resetting the current in-memory attempt when storage access is blocked. The existing failure test covers writes, not this reset branch. This finding is from code inspection, not a live blocked-storage reproduction.

**Action:** Separate resetting the current tab from confirming that persisted data was removed. Give an honest warning if the browser cannot remove a stored copy and explain any reload consequences.

**Complete when:** Tests cover getItem/setItem/removeItem failures. A learner can start a clean in-memory attempt where appropriate, receives an accurate persistence warning, and is never falsely told that saved browser data was deleted. Normal reset/cancel behaviour and other sets remain intact.

### A12 · P2 — Warn before replacing an incompatible saved attempt

Type: Planned improvement · Status: Open · Suggested owner: Site developer · Dependencies: none

**Evidence:** PracticeCore.restore returns null when a set revision/version no longer matches. The interface then offers a fresh setup without explaining the incompatible saved record. Starting a new attempt can replace it. Current original set IDs/revisions remain compatible; no actual lost student work was observed.

**Action:** Detect incompatible saved work and offer a response-only recovery/download plus an explicit start-new choice. Never apply an old marking guide silently to a changed question.

**Complete when:** A seeded old-revision attempt produces a clear message and preserves answers until the learner chooses an action. Recovery safely escapes text and makes old marks/criteria distinguishable from the new set. Normal compatible attempts still resume.

### A13 · P2 — Add optional local JSON backup and restore

Type: Planned improvement · Status: Open · Suggested owner: Site developer · Dependencies: A12

**Evidence:** The current plain-text download is useful evidence but cannot be imported to resume an attempt on another browser/device. localStorage can be cleared, and the documentation accurately states that exports are not re-importable backups.

**Action:** Keep the static architecture: offer a versioned JSON backup/import in addition to readable text, with size limits, schema checks, compatible set IDs/revisions and a clear overwrite confirmation.

**Complete when:** A round trip preserves the permitted responses/corrections and clearly self-assessed marks. Invalid or mismatched files are rejected or recovered safely. Imports cannot inject HTML or invent teacher-verified results. No accounts, backend or automatic student-data transmission are introduced.

### A14 · P2 — Complete an assistive-technology and keyboard audit

Type: Review required · Status: Open · Suggested owner: Accessibility reviewer · Dependencies: none

**Evidence:** Sampled keyboard skip behaviour preserves the chapter and focuses main. Search/section navigation worked. Sampled chapter, practice-library and marking layouts reflowed at 320 px without whole-page horizontal overflow. These checks do not establish WCAG conformance or screen-reader usability across all routes, diagrams and controls.

**Action:** Audit the full route/interaction set with keyboard and an actual screen reader, including tables, SVG alternatives, timed status announcements, focus after confirmation/cancel, collapsed guidance and form labels. Check applicable WCAG 2.2 AA criteria systematically.

**Complete when:** Record browser/tool versions, pages, outcomes and fixes. Resolve confirmed failures and retest them. Separate supported evidence from remaining manual checks; do not replace the review with a blanket accessibility claim.

### A15 · P2 — Verify real student and teacher print/PDF output

Type: Review required · Status: Open · Suggested owner: Teacher and site tester · Dependencies: A05

**Evidence:** Print logic regression tests use controlled DOM mocks; answer-hiding classes are present. This audit did not produce and inspect actual student/teacher PDFs for the expanded long chapters, ER worksheet, SQL tables, new log lab or self-marked responses.

**Action:** Run a representative print matrix and inspect actual output for pagination, clipped code/tables, useful page lengths and the intended answer visibility. Check both print and cancel paths.

**Complete when:** Student copies omit the designated answers while retaining intended worked teaching examples; teacher copies reveal the correct material. Diagrams/tables/code are readable, responses survive cancel, and PDF samples plus defects/fixes are recorded.

### A16 · P2 — Add automated real-browser smoke tests to CI

Type: Confirmed finding · Status: Open · Suggested owner: Maintainer · Dependencies: none

**Evidence:** The Pages workflow runs 17 Node test files and three Python package/example scripts. These are valuable but do not launch a real browser. Browser checks in this audit were separate manual tool-driven samples.

**Action:** Automate representative navigation, search/deep links, mobile reflow, guide reveal, saved-draft restore, reading/writing timers, finish/self-mark, reset/cancel and storage-error cases. Keep tests focused on user-observable behaviour.

**Complete when:** CI runs the agreed real-browser checks with deterministic fixtures and reports actionable failures before deployment. Existing fast unit/package checks remain. The suite includes the previously fragile state transitions rather than only asserting that source strings exist.

### A17 · P3 — Maintain an external-reference review register

Type: Planned improvement · Status: Open · Suggested owner: Content maintainer · Dependencies: none

**Evidence:** The current audit verified 405 internal live URLs and sampled the official SCSA listing. It did not exhaustively verify every external reference or every linked document’s current applicability.

**Action:** Record external URL, purpose, applicable teaching year/version, checked date and owner. Add bounded link checks and a periodic human review for syllabus, legal/policy and technical references.

**Complete when:** Broken or superseded references have owners and follow-up dates. A 200 response is not treated as proof that content remains applicable. Preserve original-source provenance and clearly distinguish archival references.

### A18 · P3 — Provide a concise resource index within the existing teacher navigation

Type: Planned improvement · Status: Open · Suggested owner: Site editor · Dependencies: A01, A05, A10

**Evidence:** Examples, workbooks, fixtures, answers, packs and editable slides are distributed across chapters and planner links. The links checked successfully, but there is no single filtered inventory showing all resource types with unit/lesson and review status.

**Action:** Add a compact teacher resource index/filter inside Teaching sequence or the existing reference hub, rather than adding several new top-level navigation items. Include format, student/teacher purpose, related lesson and download/review date.

**Complete when:** A teacher can find a workbook, starter, model answer or editable deck for a chosen unit/lesson in a short tested path. Availability/status are accurate, original chapter links remain, and the navigation stays concise.

## Scope and limits

- This is an engineering/editorial audit and prioritised work plan, not SCSA endorsement, formal assessment approval, WCAG certification or proof of learner achievement.
- No real student responses or school logs were used. Mutating practice checks ran on a separate localhost origin, preserving live users’ saved attempts.
- Manual browser samples covered the homepage, long Unit 4 project page, practice library/marking flow, teaching planner and audit hub, plus the older Sites navigation. This is not a visual review of every page/device.
- Actual screen-reader testing, printed PDFs, school-device performance, classroom workload trials, complete item-level syllabus mapping and independent question/marking moderation remain pending.
- Word/length measurements include code and hidden answers and are approximate content-volume indicators, not estimated reading times. The 45,395 px sample is specific to the measured 320 px browser view.
- Existing historical coverage maps retain their original dates and status. Adding this current site audit does not re-sign those maps.

## References

- [Current SCSA Computer Science course listing](https://senior-secondary.scsa.wa.edu.au/syllabus-and-support-materials/technologies/computer-science)
- [W3C explanation: reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- [W3C explanation: visible focus](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)

Original audit text CC BY 4.0. Software MIT. This audit records evidence and next steps; it does not mark the open tasks complete.
