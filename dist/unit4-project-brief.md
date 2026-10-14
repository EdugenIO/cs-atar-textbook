# Unit4 workshop database project
Original draft14October2026. Six related tables; synthetic records. Four week4foundation lessons plus16projectworkshops:5four,6–9twoeach,10four. Requirements:
R1: Create six related tables and reconcile diagram/dictionary/schema; evidence: Keys/references/domain checks and actual six-table inspection
R2: Provide required read-only reports; evidence: Four-table join, grouped count and calculated/concatenated output
R3: Book known member/session once, without exceeding capacity; evidence: Normal/last-place/full/duplicate/unknown/date tests; rejection unchanged
R4: Record or update attendance only for booked pair; evidence: Joint-key reference;0/1 validation; unrecorded distinct from absence
R5: Clean and import a synthetic member batch atomically; evidence: Mapping/normalisation log; invalid/duplicate batch leaves all rows unchanged
R6: Demonstrate controlled schema/data changes; evidence: CREATE/ALTER/INSERT/UPDATE/DELETE/cascade/DROP lab; safe transaction boundary
R7: Demonstrate recovery and evaluate fitness; evidence: Known-good copy, integrity/reference checks, content/report comparison, limitations
Core excludesGUI/login/payments/production deployment; use DBMS orconsole. School assessment outline controls weighting/conditions.
