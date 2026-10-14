# Ten-table ER model — explained answers

Use these explanations for self-checking after trying the questions. No marks or grading.

## 1. Read the whole model

The tables are Venue, Room, Workshop, Instructor, Session, Member, Booking, Attendance, Equipment and SessionEquipment. Booking bridges Member–Session; SessionEquipment bridges Session–Equipment. Attendance stores an optional follow-up event for a booking.

## 2. Read a relationship both ways

A venue has zero or many rooms; each room has exactly one venue. An empty venue is allowed. A room needs a non-null VenueID referring to an existing Venue. The diagram does not require every venue to have a room.

## 3. Separate a workshop from a session

Workshop describes the activity; Session describes one scheduled delivery. Two Session rows can reference the same WorkshopID while using different SessionIDs, RoomIDs, InstructorIDs and dates. The model does not impose unique titles or unique workshop/date combinations.

## 4. Follow several links

No. It establishes V01 only for S12. Follow S13’s own RoomID and then that room’s VenueID. The member’s identity does not determine the room or venue of every booking.

## 5. Resolve two many-to-many relationships

A member can book many sessions and a session can have many members: Booking stores each member/session pair. A session can use several equipment types and an equipment type can be used in several sessions: SessionEquipment stores each session/equipment pair. Both bridges have composite keys that prevent duplicate pairs.

## 6. Interpret the composite key

The pair identifies one equipment type allocated to one session. SessionID alone would permit only one equipment type per session; EquipmentID alone would permit use in only one session. QuantityUsed describes this particular allocation, so it belongs in SessionEquipment, not as a session-independent attribute of Equipment.

## 7. Interpret optional attendance

A booking can have zero or one Attendance row. Each Attendance row must refer to an existing Booking pair. Missing attendance means unrecorded; it is not the same as a recorded Present value of 0. The diagram does not force attendance to be entered later.

## 8. Use the exact foreign-key target

Separate references establish only that the person and session exist. The composite reference also establishes that this particular person booked this particular session. For example, M08 and S13 may exist while Booking(M08, S13) does not.

## 9. Check candidate rows

Allowed: Attendance(M07,S13,1), because that booking exists and has no attendance; SessionEquipment(S12,E02,1), because both parents exist, the pair is new and quantity is positive. Rejected: Attendance(M08,S13,1), because its booking pair is absent; another Attendance(M07,S12,0), because its primary key already exists; SessionEquipment(S12,E99,1), because E99 is absent; SessionEquipment(S13,E02,0), because zero violates the stated positive-quantity rule. These outcomes assume the stated constraints are enforced.

## 10. Identify what keys do not enforce

Possible rules include: a session’s Capacity must not exceed its room’s Capacity; booking count must not exceed session capacity; a room or instructor must not have overlapping sessions; equipment allocations across overlapping sessions must not exceed stock. PK/FK rules do not perform these cross-row checks. Dates alone cannot determine overlap because start time and duration are missing.

## 11. Trace a report

Member → Booking → Session → Workshop gives the member and activity; Session → Room → Venue supplies the location. The six tables are Member, Booking, Session, Workshop, Room and Venue. Attendance and equipment are unnecessary for this report. This is a path-reading exercise, not a requirement to write a six-table SQL join.

## 12. Check a claim about deletion

No. The relationships say what references must remain valid; they do not choose a deletion policy. A database might restrict deletion, cascade under an explicit rule, or use an agreed archive policy. Do not infer ON DELETE CASCADE from a crow’s foot.

## 13. Read a one-to-one extension

Attendance uses the same member/session pair as its primary key, so a second row for that booking duplicates the key. For multiple events, introduce an event identifier or a justified key including an event sequence/time, and change the relationship to Booking 1 → 0..many events. This is a discussion of an extension, not a diagram-creation requirement.

## 14. Explain a repeated room label

No. RoomID identifies the room; RoomLabel is not stated to be unique. If the business requires room labels to be unique within each venue, document a unique constraint on (VenueID, RoomLabel). Do not infer it from sample names.

Original learning resource, 14 October 2026. Brett Sullivan and contributors. Content: CC BY 4.0; see LICENSE.md. Source: https://github.com/EdugenIO/cs-atar-textbook .
