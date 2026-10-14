# Teacher design answers — separate, not access-protected
Original draft: 14 October 2026.

Dependencies: MemberID → MemberName; SessionID → WorkshopID, InstructorID, SessionDate, Capacity; WorkshopID → Title; InstructorID → Name; (MemberID, SessionID) → BookedOn. Partial and transitive dependencies in the flat booking relation explain decomposition; adding a surrogate key alone does not remove them.

Five relationships: Workshop and Instructor each have zero or many Sessions; every Session has exactly one of each. Member and Session each have zero or many Bookings; every Booking has exactly one of each. A Booking has zero or one Attendance record; every Attendance record belongs to exactly one Booking. Joint PK and FK pairs matter. No attendance record means unrecorded, not false. A separate optional table is justified by the workflow, but a nullable state can be an alternative.

Checks reject a duplicate Booking pair, an orphan reference, Attendance(M01, S03) without that booking, Present = 2, capacity values of 0 or 1.5, and blank labels. Malformed date TEXT is accepted; the schema does not enforce calendar validity, date order, ID format, clashes or booking counts within capacity. SQLite affinity can convert suitable numeric text before a typeof check; this constrains stored values, not raw input. Deleting a Booking cascades to Attendance; deleting a Member or Session with dependent Bookings is blocked. Retention policies need agreement.

Fresh model: Artist and Venue each have zero or many Exhibits; every Exhibit has one of each. Visitor and Exhibit each have zero or many Reservations; every Reservation has one of each. A Reservation has zero or one CheckIn; each CheckIn belongs to one Reservation. Reservation uses (VisitorID, ExhibitID) as its PK; CheckIn uses the same pair as its PK and joint FK. ExhibitID determines the Artist, Venue and exhibit details; VisitorID determines visitor details; the reservation pair determines the reservation date. Accept justified alternatives that meet the exact rules.

Review the explanation and independent design, rather than matching variable spellings. This six-table clinic does not provide full Unit 4 coverage or a complete project by itself.
