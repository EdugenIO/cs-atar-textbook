# Unit4 week1 — relational design workbook
Original draft14October2026. Four lessons.
A: list booking-system rules, entities and dependencies. Flat relation key(MemberID,SessionID): identify partial/transitive dependencies and three anomalies; decompose to3NF under stated dependencies. Do not infer uniqueness from sample names/dates.
B: read all five relationships both ways, including optional parent participation. Explain bridge/composite key and optional attendance. Compare separate Attendance with nullable attendance on Booking. Write relational notation and a crow’s-foot diagram with legend.
C: reconcile every dictionary field with SQL. Predict duplicate pair, orphan session/member, attendance without booking,Present2,capacity0/1.5,emptyname and malformeddate outcomes. Run the offline checker after prediction. Explain foreign_keys per connection and default/cascade deletion policies. Name at least three unenforced rules.
D: independently model Artist,Exhibit,Visitor,Reservation,CheckIn,Venue under the chapter rules. Six entities; resolveM:N, composite CheckIn reference and optional1:1. Produce dependencies, notation, dictionary, crow’s-foot diagram, constraints and one business-rule implementation plan. Record revision after feedback.
No real people or production DB changes. Independent symbol fidelity and learner evidence remain pending until reviewed.
