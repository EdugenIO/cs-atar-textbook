# Static exam practice pilot

Two original 30-mark topic sets (Year 11 and Year 12), each with eight two-mark short answers and two seven-mark extended responses. These are formative samples, not complete examinations, official SCSA questions, a prescribed exam section ratio, certified syllabus coverage or grade predictions. The 45-minute writing allowance and optional five-minute reading period are adjustable local practice choices. Teachers should review suitability, content and workload before use.

## Student workflow

Choose a set and timed/untimed mode, optionally add reading time, and type responses or work on paper. Finish to lock original typed responses and reveal the guides. Each criterion earns one mark, selected by the student. Review all criteria, record corrections separately, and flag uncertain questions for a teacher. Marks are labelled self-assessed, with a separate reviewed-question count. Blank text boxes can represent paper responses and therefore do not prevent self-awarded marks.

Marking keys use individual demonstrable points, acceptable alternatives, model answers and common misconceptions. They are not exact-text requirements. For future questions needing level descriptors or mutually exclusive alternatives, extend the data/UI rather than forcing the rubric into independent additive checkboxes. The pilot does not automatically interpret responses, assess code execution or verify awarded marks.

## Privacy, saving and timers

No API, account, analytics, remote fonts or student submission service. Answers and marks are saved under `cs-atar-practice-v1-<set-id>` in localStorage on the website's origin. Data is per browser/device, not synchronised or teacher-accessible. Private browsing, quotas or disabled storage can prevent saving; a message warns when a save fails. Export is plain text. Clear each attempt before leaving a shared device. The download includes question prompts and original responses; once guides are revealed it also includes criterion marks, model answers, flags and corrections. Print/save PDF is available during self-marking.

Timers use timestamps rather than counting interval callbacks. Closing a tab or switching away does not pause time. Reading transitions use the original scheduled start even if the browser was asleep. On expiry responses remain available; students can finish or continue with overtime recorded. The practice timer is not tamper-proof, and a system clock change affects it. No formal assessment enforcement is claimed.

Answer keys are public source files and can be read before submission. UI hiding and locked response fields support honest self-assessment, not secure assessment. Clearing an attempt removes only that set's local storage entry after confirmation. Browser reset/removal of site data also removes work. Download files are not re-importable attempt backups in this pilot.

## Authoring and checking

Edit `questions.js`: each set has a stable ID, revision, year, suggested minutes and questions. Each question has a unique ID, type, title, topic, chapter route, prompt, optional code, an array of one-mark criteria, model answer and marking reminder. Increase a set's revision after material content/rubric changes to avoid applying a changed key to an older attempt. The pilot uses 30 marks with a 16/14 split solely as a short mixed practice activity.

Run `node --test tests/*.test.mjs` from the repository root. Practice regression checks cover rubric totals, chapter links, state restore, timer expiry/overtime, reading transitions and criterion totals. Complete browser checks for saved drafts, reading/timing modes, finish/reveal, marks/corrections, downloads, print layout and storage failure before wider release. Try a student using only keyboard navigation and discuss ambiguous marking decisions with a teacher. Browser/device and classroom trials remain ongoing.

Original questions/guides: CC BY 4.0. Software: MIT, as in the repository licences. Textbook chapters provide learning context; official syllabus and examination documents remain the authority for formal assessment requirements.
