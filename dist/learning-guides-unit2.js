const unit2LearningGuides = {
  'database-foundations': {
    anchor: 'Turn records into information', title: 'Which loans are overdue?',
    lead: 'Apply the two checks to a loan. Use 8 April 2026 as the reporting date.', kind: 'trace',
    columns: ['Loan', 'Returned?', 'Due before 8 April?', 'Overdue?'],
    rows: [['L001: due 6 April', 'No', 'Yes', 'Yes'], ['L002: due 8 April', 'No', 'No', 'No'], ['L003: due 7 April', 'Yes', 'Yes', 'No']],
    caption: 'Overdue requires both an unreturned loan and an earlier due date. A loan due today is excluded by this rule.',
    predict: 'Why is L003 excluded even though 7 April is before the reporting date?',
    answer: 'It has already been returned. An earlier due date alone does not make it overdue.',
    retry: 'Move the reporting date to 9 April. Explain why L002 now qualifies, assuming it is still unreturned.'
  },
  'entities-relationships': {
    anchor: 'Four tables from the familiar register', title: 'Follow one loan through its identifiers',
    lead: 'Use L001 to retrieve related facts. This is a lookup sequence, not an ER diagram.', kind: 'flow',
    nodes: [{label: 'Loan L001', detail: 'BorrowerID B001; EquipmentID E01.'}, {label: 'Borrower B001', detail: 'BorrowerLabel is Learner A. Return to L001 to follow its EquipmentID.'}, {label: 'Equipment E01', detail: 'Description is Camera; CategoryID is C01.'}, {label: 'Category C01', detail: 'CategoryName is Imaging.'}],
    caption: 'The sequence follows two references from Loan, then the category reference from Equipment. Borrower does not link directly to Equipment.',
    predict: 'Which identifier lets you find the category for L001?',
    answer: 'Loan.EquipmentID E01 finds the item. Equipment.CategoryID C01 then finds Imaging in Category.',
    retry: 'Trace L003 to its borrower and category. Name each identifier you follow.'
  },
  'normalisation': {
    anchor: 'Dependencies explain the next split', title: 'Which key does each fact depend on?',
    lead: 'The reservation key is BorrowerID + EquipmentID + ReservationDate.', kind: 'cards',
    nodes: [{label: 'BorrowerLabel', detail: 'Depends on BorrowerID alone: only part of the reservation key.'}, {label: 'EquipmentDescription', detail: 'Depends on EquipmentID alone: another partial dependency.'}, {label: 'ReservationStatus', detail: 'Depends on the complete borrower, item and date combination.'}, {label: 'CategoryName', detail: 'EquipmentID determines CategoryID, which determines CategoryName: a transitive chain.'}],
    caption: 'Dependencies come from the rules. Repeated values alone do not tell you which normal form a table meets.',
    predict: 'Why does BorrowerLabel move out of Reservation when you form 2NF?',
    answer: 'It depends on BorrowerID alone, not on the complete three-part key. Borrower gives that fact its own home.',
    retry: 'Explain why ReservationStatus stays with the complete reservation key.'
  },
  'sql-basics': {
    anchor: 'Combine conditions and test boundaries', title: 'Trace an AND condition',
    lead: 'Condition: Returned = 0 AND DueDate is before 8 April 2026.', kind: 'trace',
    columns: ['Loan', 'Returned = 0', 'DueDate before 8 April', 'Keep row?'],
    rows: [['L001', 'True', 'True', 'Yes'], ['L002', 'True', 'False', 'No'], ['L005', 'False', 'True', 'No']],
    caption: 'AND keeps a row only when both conditions are true.',
    predict: 'Which shown loans would an OR condition keep instead?',
    answer: 'All three. Each satisfies at least one condition: L002 is unreturned and L005 has an earlier due date.',
    retry: 'Explain why OR would be the wrong condition for this overdue rule.'
  },
  'database-solution': {
    anchor: 'Summarise the right records', title: 'One item can appear in several loan events',
    lead: 'E02 has an estimated replacement cost of 80 whole dollars.', kind: 'cards',
    nodes: [{label: 'Equipment row E02', detail: 'One physical tripod: count its 80 once for inventory value.'}, {label: 'Loan L002', detail: 'A loan event referencing E02. Joining it to Equipment brings in the same 80.'}, {label: 'Loan L005', detail: 'Another event referencing E02. A history join brings in that 80 again.'}],
    caption: 'Adding joined event costs counts the tripod twice. Inventory totals need one row per item.',
    predict: 'Why does the full joined loan-history total equal 1480 rather than the inventory total of 1400?',
    answer: 'E02 appears in two loan events, so its 80 is included twice. The other items appear once in this supplied history.',
    retry: 'Suppose E01 gets another loan event. Explain how the joined-history total changes while the inventory total stays the same.'
  },
  'security-threats': {
    anchor: 'Protect authentication and set a useful policy', title: 'Count factor categories, not secrets',
    lead: 'Two-factor authentication uses evidence from two different categories.', kind: 'cards',
    nodes: [{label: 'Something you know', detail: 'Password or PIN. Using both still uses one factor category.'}, {label: 'Something you have', detail: 'A device registered to your account, such as an authenticator.'}, {label: 'Something you are', detail: 'A biometric characteristic, such as a fingerprint.'}],
    caption: 'How devices are registered and accounts are recovered still matters. Deception can also defeat some protections. Two factors reduce risk without guaranteeing safety.',
    predict: 'Does a password plus a second password provide two-factor authentication?',
    answer: 'No. Both are knowledge factors. You need evidence from two distinct categories.',
    retry: 'Describe a knowledge-plus-possession combination, then explain one remaining risk.'
  },
  'responsible-data': {
    anchor: 'Work through a disclosure decision', title: 'Check before sharing a loan screenshot',
    lead: 'The report can demonstrate a working query without exposing real borrower records.', kind: 'flow',
    nodes: [{label: 'State the purpose', detail: 'You want to show that the overdue query works.'}, {label: 'Check who is identifiable', detail: 'IDs, dates and unusual loans may identify real borrowers.'}, {label: 'Choose safer evidence', detail: 'Recreate the report with invented records for the public demonstration.'}, {label: 'Check authority', detail: 'Any operational release still needs the relevant purpose, recipient, authority and policy checks.'}],
    caption: 'Encrypting an upload protects transport. It does not grant permission to disclose the records.',
    predict: 'Why is deleting the name column insufficient on its own?',
    answer: 'Other details or a separate mapping can still identify people. Removing names alone does not establish de-identification.',
    retry: 'Explain how a synthetic screenshot can demonstrate the query while avoiding real borrower disclosure.'
  },
  'unit2-review': {
    anchor: 'Create and reconcile a fresh model', title: 'Planned rule versus actual constraint',
    lead: 'A data dictionary describes the intended design. Inspect the SQL before claiming that each rule is enforced.', kind: 'trace',
    columns: ['Intended rule', 'Starter implementation', 'What you should conclude'],
    rows: [['CategoryName is unique', 'NOT NULL, without UNIQUE', 'Required does not mean unique.'], ['Identifiers have fixed patterns', 'TEXT alone', 'A text type does not enforce the pattern.'], ['New loans default to False', 'Returned has no DEFAULT', 'The conceptual default is not implemented.']],
    caption: 'Record each difference, then justify a constraint or revised documentation. Do not claim enforcement without checking it.',
    predict: 'Does NOT NULL on CategoryName prevent two categories having the same name?',
    answer: 'No. NOT NULL prevents a missing value. A separate uniqueness rule is needed to prevent repeated names.',
    retry: 'Explain a test you could use to check whether an identifier-pattern rule is enforced.'
  },
  'unit2-consolidation': {
    anchor: 'Work through targeted stations', title: 'Turn a gap into useful practice',
    lead: 'Choose practice that addresses a question you cannot yet explain.', kind: 'flow',
    nodes: [{label: 'Name the gap', detail: 'Why does an inner join omit a borrower with no loans?'}, {label: 'Try a small example', detail: 'Use a fresh project copy and add unused B005 in a transaction.'}, {label: 'Explain the result', detail: 'There is no matching Loan row, so the inner-join report omits B005. Roll back afterwards.'}, {label: 'Change the example', detail: 'Predict whether an inner join from Equipment to Loan includes an item with no loans.'}],
    caption: 'A changed example checks whether you can apply the rule beyond the answer you just read.',
    predict: 'Would an unused equipment item appear in an inner-join loan-history report?',
    answer: 'No. Without a matching Loan row, that equipment item is omitted from this inner join.',
    retry: 'Explain the same rule without using table names from the equipment-desk project.'
  },
  'unit2-exam': {
    anchor: 'Mark, correct and explain limits', title: 'Use a correction to build understanding',
    lead: 'Example: you used OR for a report that needs two conditions to hold.', kind: 'flow',
    nodes: [{label: 'Locate the mistake', detail: 'OR admits rows meeting either condition, including returned old loans.'}, {label: 'Explain the rule', detail: 'Overdue requires both unreturned status and an earlier due date: use AND.'}, {label: 'Check a boundary', detail: 'L002 is due on 8 April, so it is excluded on the 8 April reporting date.'}, {label: 'Try changed data', detail: 'Move the reporting date to 9 April and predict the result again.'}],
    caption: 'Use the original supplied data for each practice-paper question. Changes in one answer do not carry into another.',
    predict: 'With a reporting date of 9 April, does unreturned L002 qualify under the same strict-before rule?',
    answer: 'Yes. Its due date of 8 April is now earlier than the reporting date, and it remains unreturned.',
    retry: 'Explain which overdue test would fail if L002 were instead marked returned.'
  }
};
