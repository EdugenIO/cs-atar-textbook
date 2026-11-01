# Browser, accessibility and lesson acceptance

Automated release gates run before GitHub Pages publication. They provide bounded evidence, not WCAG certification, teacher sign-off or observed learner outcomes.

## Reproduce

Run the content generators in `.github/workflows/pages.yml`, then `npm ci`, `npx playwright install --with-deps chromium firefox webkit`, `node scripts/prepare-pages.mjs` and `npm run test:browser`. Use the same pinned lockfile. The test runner serves `dist` on localhost; no student data or production account is used. Browser reports, failure screenshots and traces are retained as GitHub Actions artifacts for 14 days.

## Automated acceptance checklist

- All 50 chapter routes render one main heading, one five-step journey and practice content without uncaught page errors in Chromium, Firefox and WebKit.
- Every chapter is scanned in Chromium with axe WCAG A/AA rules; principal home, planner, assessment, resource, activity, SQL, revision, exam-practice, teacher, offline and lesson-route pages are scanned across all three engines. No rule violations are silently excluded or accepted as a baseline.
- Keyboard skip link focuses main without replacing the chapter route. Back to top returns focus to the chapter heading. Section links focus their actual destination.
- Narrow-screen chapter layout does not overflow the viewport. Code, diagram and table regions may scroll independently.
- Resource filters return correct counts; empty results and reset work.
- Example download supplies the expected filename. Print preparation and restoration retain the correct student-copy mode and hide navigation controls in print media. This does not automate the operating-system print dialog.
- All 256 scheduled lesson routes use the source schedule’s objective, activity and distinct exit question, expected reasoning and next teaching step. Two beginner SQL objectives now match their existing activities. Reading and worked destinations resolve to exact authored section titles; worked section destinations do not jump ahead of the selected reading.
- All 50 chapters appear as primary or companion readings. The licensing lesson retains its original allocation while directly reading the software-responsibility chapter.
- SQL SELECT practice precedes filters/joins/groups, with the later LEFT JOIN clinic explicitly identified. Optional specialist equipment does not become a general prerequisite.
- Controlled attempts state that feedback follows collection. These public routes do not become secure issued papers or introduce new assessment weights/contact hours.

## Manual acceptance and remaining human review

Record the actual browser, assistive technology, date and result. Leave unperformed checks pending.

| Check | Required evidence | Status |
|---|---|---|
| Keyboard: home → chapter → example → task → feedback → revision | Visible focus throughout; no traps; collapsed answers operable; destination focus and back navigation preserved | Browser automation plus manual SQL reading/feedback and offline keyboard destination checks on 1 November 2026; independent review still required |
| 375px layout and 200%/400% zoom/reflow | No clipped controls or page-wide horizontal scrolling; isolated wide content usable | Narrow-screen automation plus manual 375px lesson and 320px diagram checks; manual zoom review still required |
| Screen reader: navigation, disclosures, tables, quiz errors/results | NVDA/Firefox and VoiceOver/Safari observations with understandable names and reading order | Pending independent assistive-technology review |
| Diagrams | Text equivalent preserves relationships, optionality and the question's information | Existing descriptions retained; independent subject review pending |
| Printing | Actual student/answer PDF output is legible and answer selection is respected | Existing print checks plus browser preparation tests; representative visual review required |
| Offline library | Extract on a clean device, disconnect, follow routes, open examples and print | Integrity checks exist; clean-device classroom trial pending |
| Learning difficulty | Learner can complete the focused task within local lesson time and retry a changed case | Editorial sequencing only; teacher/learner trials pending |

## Search, performance and maintenance gates

- A cold home load requests less than 30 KB of decoded JavaScript; the browser report records the measured bytes and request count. The chapter catalogue, planner and detailed index wait for reading/search intent. This is a payload budget, not a Core Web Vitals certification or a claim that chapters are individually bundled.
- First reading navigation preserves heading focus. A failed file download offers reload and offline-download options.
- Resource search ranks meaningful titles/keywords ahead of incidental text and excludes common download labels. SQL and subnetting are acceptance examples; empty results and reset remain tested.
- Issue links prepare page-specific drafts without submitting, omit search queries and avoid local filesystem paths.
- Checklist JSON imports validate book/schema/IDs and merge ticks; unrelated or oversized files leave existing progress unchanged. No quiz scores are imported.
- Current glossary/slide counts and the availability register are generated from supplied resources; legacy project decks do not count as current project slides.

## Student course navigation

- All 50 chapter routes must highlight the correct chapter, expand the correct unit and expose valid This chapter destinations.
- Previous/next controls at the top and bottom must agree and cross unit boundaries in canonical reading order.
- The desktop sidebar must remain within the viewport while long content scrolls. Its contents scroll independently without hiding focus indicators.
- On mobile, the menu starts closed, identifies the current unit/chapter, closes after selection and returns focus to the selected reading. Escape closes it and returns focus to its summary.
- Teacher resources start grouped separately; direct teacher routes expose their active link. The lightweight home budget still applies.

## Editing routes

`teaching-source/lesson-reading-sections.json` records explicit section choices in existing lesson order. It includes a companion licensing reading without moving the project allocation. `build-lesson-routes.mjs` validates the counts and builds the printable page and JSON. `build-student-journeys.mjs` retains the four detailed activity-pack journeys and adds the other 46 chapter pathways using existing tasks and explanations. Regenerate the offline readers/library after changes. Do not infer independent approval from these generated links.
