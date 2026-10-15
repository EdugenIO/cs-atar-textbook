# Unit 3 week 6 — Original optional programming practice
Optional practical. Allow around 40 minutes if useful, then review your work using the separate explanations. No grade, weighting or submission is required.
Use supplied unit3_equipment.py and unit3-inheritance-practical-starter.py in the same folder. Use synthetic data; no internet or real equipment is required. Try the scaffold before reading the worked solution. Use reference material when you need it, and note what helped.

## Task: Tablet stock item
1. Extend Equipment with Tablet(equipment_id,name,total,storage_free). Validate storage_free as an integer from 0 to 128 inclusive, rejecting booleans/non-integers with ValueError. Reuse base initialisation. 
2. Override preparation() to return exactly "Free some storage" below 16 and "Check the screen" otherwise. It must not mutate state. 
3. Implement set_storage(storage_free) with the same validation and unchanged state on invalid input. Retain inherited lend/return behaviour. 
4. Use an unchanged preparation_report to report a Tablet and generic Equipment. Demonstrate a successful inherited lend and a rejected excessive request. Explain where polymorphism occurs. 
5. Keep expected/actual tests for storage 15/16, rejected 129, and inherited lending; explain super() and why a kit of items suggests composition. 

Keep source, test evidence and brief explanations. Demonstration uses T01/Tablet/total 2/storage 15 and E03/Tripod/total 1. The storage model and thresholds are fictional teaching assumptions. No date/borrower or uniqueness system is required.
