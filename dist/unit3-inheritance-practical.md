# Unit 3 week 6 — Original controlled programming practical
20 marks; suggested working time 40 minutes, plus setup/submission within lesson 4. This is an original draft, not an SCSA paper. Teacher finalises conditions and annual weighting through the school's assessment outline.
Use supplied unit3_equipment.py and unit3-inheritance-practical-starter.py in the same folder. Use synthetic data; no internet or real equipment is required. Teacher decides allowed reference material. Do not distribute the teacher solution with the task during a controlled sitting.

## Task: Tablet stock item
1. Extend Equipment with Tablet(equipment_id,name,total,storage_free). Validate storage_free as an integer from 0 to 128 inclusive, rejecting booleans/non-integers with ValueError. Reuse base initialisation. (5 marks)
2. Override preparation() to return exactly "Free some storage" below 16 and "Check the screen" otherwise. It must not mutate state. (3 marks)
3. Implement set_storage(storage_free) with the same validation and unchanged state on invalid input. Retain inherited lend/return behaviour. (4 marks)
4. Use an unchanged preparation_report to report a Tablet and generic Equipment. Demonstrate a successful inherited lend and a rejected excessive request. Explain where polymorphism occurs. (3 marks)
5. Submit expected/actual tests for storage 15/16, rejected 129, and inherited lending; explain super() and why a kit of items suggests composition. (5 marks)

Submit source, test evidence and brief explanations. Demonstration uses T01/Tablet/total 2/storage 15 and E03/Tripod/total 1. The storage model and thresholds are fictional teaching assumptions. No date/borrower or uniqueness system is required.
