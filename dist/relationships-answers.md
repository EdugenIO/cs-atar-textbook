# Unit 2 week 2 — explained answers

Edition 0.7. Original classroom draft. Accept equivalent answers consistent with the stated rules.

1. Borrower is an entity type; B001 is an instance. BorrowerLabel is an attribute/column definition; Learner A is B001’s value. A row is a record. A loan is an event entity.
2. PKs: BorrowerID, CategoryID, EquipmentID, LoanID in their respective tables. FKs: Equipment.CategoryID → Category.CategoryID; Loan.BorrowerID → Borrower.BorrowerID; Loan.EquipmentID → Equipment.EquipmentID. Camera occurs twice, so description does not uniquely identify an item.
3. L003 → B001/Learner A and E03/Recorder → C03/Audio.
4. Borrower → 0..many Loans; each Loan → exactly one Borrower. Equipment → 0..many Loans over time; each Loan → exactly one equipment item. Category → zero or many equipment items; each equipment item → exactly one Category.
5. Use the worked SVG as a checking reference. Two bars mean exactly one; circle plus crow’s foot means zero or many. A category with no items is allowed. Layout may differ, but endpoints, keys and rules must match.
6. A new event can be L007/B001/E01 with its own due date/status. It must not overwrite L001. The pair repeats legitimately. Existing active loan checks and return/time rules are needed to prevent overlapping use; FK checks alone do not do this.
7. Duplicate L001 violates primary-key uniqueness; B999 is an invalid borrower reference; missing CategoryID violates the mandatory category rule.
8. Locker allocation is one-to-one if each side has at most one counterpart; optionality must be stated separately. Loan history is one-to-many from borrower to events. Borrowers and equipment are many-to-many over history, resolved by event records.
9. B001 can occur with W01 and W02; the same B001/W01 pair cannot repeat. The pair forms the PK, and each component can also be an FK.
10. LoanID Text 4, PK/required/unique; BorrowerID Text 4 required FK; EquipmentID Text 3 required FK; DueDate Date required, displayed YYYY-MM-DD; Returned Boolean required, default False for a new record. Date/Boolean storage sizes are DBMS-dependent. Text lengths are exercise design choices.
11. Integer count; float approximate mass; Boolean status; text label; date due date. Actual storage types depend on the chosen DBMS.
12. Restrict deletion of referenced borrowers and retain their historical identifier; or choose another explicit policy that preserves valid history. Do not blindly cascade-delete loan evidence.

Transfer: the current design assigns one item to each event. A multiple-item event would need a separate loan-header and loan-item structure, with justified keys and references; investigate the revised rules before designing it. The current four-table example intentionally uses single-item events.
