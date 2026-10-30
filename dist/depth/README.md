# Teaching depth expansion · 30 October 2026

Original worked Python/SQLite examples, synthetic log-cleaning and anomaly labs, and scaffolded checks embedded throughout the textbook. Content is a classroom draft for teacher review, not SCSA approval or additional assessment requirements. The site remains static: code runs in the learner's approved local Python/SQLite environment, not on a server.

## Use

Copy the pack into a disposable learning folder. Run each .py file independently with Python 3. Standard library only. Write/append examples create named demo files; mode w replaces those demo files. clean_event_logs.py must be beside event-logs-raw.csv and writes separate worked output files. Use each SQL lab in a fresh disposable SQLite database. Never run these teaching modifications on operational school records. See teacher-depth-notes.md for expected evidence and event-log-workbook.md for the student activity.

## Scaffold

Predict → teacher think-aloud → paired/faded completion → independent changed case → explain/retest → delayed retrieval. Inline examples have downloadable copies and expected-output disclosures. Chapter-specific checks distinguish expected evidence from actual observations. Explanations are hidden by default and excluded from the default student print mode.

## Scope/source review

Review basis: the SCSA Year 11 syllabus for teaching from 2026 and Year 12 syllabus for teaching from 2027, as listed on the course page on 30 October 2026. They cover programming/testing, structures, network components, data management and cryptography. The expansion uses original small worked contexts; exact item-level assessment mapping and classroom pacing still need teacher review. Public/protected/private vocabulary is explained with Python-specific limits, not presented as prescribed keyword syntax. SQL uses SQLite-supported statements rather than assuming cross-DBMS equivalence. The short exercises do not replace required multi-table projects.

Author in scripts/build-teaching-depth.py and rebuild with Python. dist/depth-data.js and dist/depth/* are generated; dist/depth.js supplies the renderer/insertion logic. Module anchors preserve existing section names, source code, original answers and links. Search indexes the enriched sections. Edit neither original project requirements nor annual assessment weights through this generator.

Original content CC BY 4.0; original code MIT. See the supplied licence files. Sources are linked beside the relevant explanations and in sources.md. These fictional examples contain no personal school logs or credentials.
