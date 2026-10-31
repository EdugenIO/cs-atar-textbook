# Current curriculum provision review

The current written-evidence record is built from the 111 earlier source-demand reviews, the explicit selections/closure notes in `provision-decisions.json`, the original follow-up lessons in `teaching-repairs.json`, and `scope-register.json`. It accounts for 519 detailed unit-content items; the 129 parent/context rows are retained without double counting.

`build-provision-review.py` validates real chapter sections, tasks, answer locations and local files. `provision-snapshot.json` freezes fingerprints for four nominated evidence roles per group. CI uses the normal build and fails if those teaching/practice sources drift. After a substantive change, inspect affected groups against the official syllabus and use `--record` only after re-review; do not automatically refresh fingerprints to silence a failure.

Run these in order:

1. `python scripts/build-editorial-review.py`
2. `python scripts/build-provision-review.py` (or `--record` after a deliberate source re-review)
3. `python scripts/build-curriculum-map.py`
4. Rebuild resource/revision/teacher hubs, standalone readers and offline library.
5. Run `tests/curriculum-provision.test.py` and the existing suites.

The 13 initial partial groups are covered by the earlier additions, now rechecked. Six further focused clinics make primitive types, paired array algorithms, maintainability, address/version comparison, device/media roles and access/performance diagnosis explicit. There are 17 clinics in total. All are included in standalone readers as well as the live reader and follow-up workbook.

Current confirmation is an AI-assisted editorial judgement about written resources. Independent teacher sign-off, school-issued assessment adoption and actual learner execution remain separate. Do not populate reviewer/approval fields merely because a build passes. Network-symbol instruction uses the official support-booklet reference; no independent symbol-fidelity approval is inferred from role-box diagrams.

The live scope guide distinguishes required unit skills, official support-booklet conventions/examples, implementation/context choices and enrichment. In particular, HAVING is in the support booklet; LEFT JOIN is additional to the explicit unit INNER JOIN work; ACID remains required knowledge; detailed subnet allocation is required in Year 12 even if introduced as a bridge in Year 11.
