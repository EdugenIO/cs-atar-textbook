# Unit 2 integrated review — weeks 13–14

Eight lessons; formative, no extra major project.

Task A: data-quality clinic
An import file claims L001 was returned yesterday but the desk confirmation is a month old; L002's date is syntactically valid but conflicts with the signed due-date record; a supplier message has not been verified; a form adds unrelated health notes; The replacement estimate for E02 is 8000 rather than its usual 80. For each: check currency, authenticity, relevance, accuracy or outlier status as appropriate; explain verification and action. More than one factor can apply. Preserve the source, record proposed corrections and authority, and do not delete a rare/extreme value just because it is unusual.

Task B: six-table interpretation
Use unit2-six-table-model.svg. State all PKs/FKs, read each connection in both directions, and trace a Loan through Equipment to Category/Supplier. Can a supplier have no items? Can an inspection exist without equipment? Can multiple inspections refer to one item? State which two tables are not implemented in the project starter.

Task C: fresh four-table creation
A club has Member, Activity, Leader and Participation. Each activity has exactly one leader; a leader can have no/many activities. Each participation requires one member and one activity; either parent can have no/many participations. One participation per member/activity/term. Draw crow's-foot relationships, underline keys/mark FKs, write the Participation dictionary (MemberID/ActivityID text; Term text; AttendanceCount integer), and explain how the bridge resolves Member–Activity M:N. Include a one-to-one optional Locker allocation as a separate conceptual comparison; do not add it to the four-table task.

Task D: intended versus implemented
Compare the earlier dictionary with database-project-setup.sql. Check CategoryName uniqueness, text sizes/identifier formats and Returned default. Record intended rule, actual enforced constraint, test and consequence. Distinguish required/type representation from factual truth and application validation. The starter does not enforce all conceptual dictionary rules. Propose justified enforcement/revised documentation, not a false claim of completion.

Task E: integrated desk audit
Use a fresh project copy. Reproduce active/overdue reports for 8 April 2026; explain the strict-date boundary; check inventory summaries use equipment rows. Diagnose shared access, unapproved modification and a proposed public screenshot using CIA/AAA and privacy reasoning. Demonstrate a separate restore and evaluate evidence/limits.

Suggested lessons: 13.1 quality; 13.2 six-table reading; 13.3 fresh model/dictionary; 13.4 schema comparison. 14.1 SQL transfer; 14.2 security/privacy audit; 14.3 controlled theory practice; 14.4 explained feedback and correction. Use the explained checkpoints to review your understanding and decide what to practise next.
