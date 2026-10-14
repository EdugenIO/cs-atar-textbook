# Reliability pack — run guide

> Resource packaged with textbook edition 0.48 (14 October 2026): 50 draft chapters across Units 1–4; all four editorial coverage maps are available. Independent review and learner evidence remain pending. Original authoring dates below are provenance, not new sign-off; teacher keys are separate but not access-protected.

All examples are original classroom resources using synthetic records. No dependencies beyond Python3 standard library.
Keep extracted files in one folder. project_reference.py and project_support.py are the unchanged teacher reference copied from the project chapter.
- python test_booking_reliability.py -v : twelve automated component/integration tests; expected to pass the reference.
- python fault_probe.py -v : two intentionally failing probes against the isolated fault_return_lab.py. Repair that lab, then rerun unchanged probes. Separate fault_return_lab_fixed.py illustrates the repair.
- python reliability_load.py --records 100 --repeats 3 : bounded sequential workload with correctness checks and elapsed metrics.
- python reliability_load.py --records 1000 --repeats 3 --csv synthetic-load.csv : additionally create a new synthetic CSV; choose a new filename if it exists. This does not add persistence to the project.
For student assessment, distribute only agreed files and keep teacher answers/repair separate. Adapt test imports/fixtures to the student's own implementation while preserving requirement-based expectations.
