# Interpreting a ten-table ER model

Unit 4 · optional practice · no marks or submission

Open unit4-er-interpretation.html or view unit4-er-ten-table.svg alongside this worksheet.

## Model and rules

- Venue has zero or many Room rows; every Room row belongs to exactly one Venue.
- Room has zero or many Session rows; every Session row belongs to exactly one Room.
- Workshop has zero or many Session rows; every Session row belongs to exactly one Workshop.
- Instructor has zero or many Session rows; every Session row belongs to exactly one Instructor.
- Session has zero or many Booking rows; every Booking row belongs to exactly one Session.
- Member has zero or many Booking rows; every Booking row belongs to exactly one Member.
- Session has zero or many SessionEquipment rows; every SessionEquipment row belongs to exactly one Session.
- Equipment has zero or many SessionEquipment rows; every SessionEquipment row belongs to exactly one Equipment.
- Booking has zero or one Attendance rows; every Attendance row belongs to exactly one Booking.

IDs are globally unique within each parent table. Names, room labels and dates are not assumed unique. Every foreign key shown is required. Capacity and QuantityUsed are positive integers; StockQuantity is a non-negative integer. Present is 0 or 1. The two PK/FK fields in each bridge form one composite primary key. Attendance uses one joint foreign key to Booking, not independent references to Member and Session.

## Worked example

To locate the venue of a booked session, follow Member → Booking → Session → Room → Venue. For example, Booking(M07, S12) refers to Session S12. If S12 has RoomID R02 and R02 has VenueID V01, the booked session is at V01. Each booking identifies one session and that session identifies one room and venue. This does not mean a member can attend only one venue: different bookings can follow different paths.

## Relational notation

```text
Venue(VenueID PK, VenueName)
Room(RoomID PK, VenueID FK, RoomLabel, Capacity)
Workshop(WorkshopID PK, Title)
Instructor(InstructorID PK, DisplayName)
Session(SessionID PK, WorkshopID FK, InstructorID FK, RoomID FK, SessionDate, Capacity)
Member(MemberID PK, DisplayName)
Booking(MemberID PK/FK, SessionID PK/FK, BookedOn)
Attendance(MemberID PK/FK, SessionID PK/FK, Present)
Equipment(EquipmentID PK, ItemName, StockQuantity)
SessionEquipment(SessionID PK/FK, EquipmentID PK/FK, QuantityUsed)
Attendance(MemberID, SessionID) jointly references Booking(MemberID, SessionID).
```

## Snapshot for question 9

```text
Member IDs: M07, M08
Session IDs: S12, S13
Equipment IDs: E01, E02
Booking pairs: (M07,S12), (M07,S13), (M08,S12)
Attendance pairs: (M07,S12), with Present = 1
SessionEquipment pairs: (S12,E01), (S13,E01), each with QuantityUsed = 2
```

## Questions

### 1. Read the whole model

Name the ten tables. Which two are bridge tables, and which table stores an optional follow-up event?

Notes: ________________________________________________

### 2. Read a relationship both ways

Read Venue–Room in both directions. Can a venue exist before any rooms are recorded? Can a room exist without a venue?

Notes: ________________________________________________

### 3. Separate a workshop from a session

Why are Workshop and Session separate? Could one workshop run twice, in different rooms, with different instructors?

Notes: ________________________________________________

### 4. Follow several links

Session S12 refers to Room R02; R02 refers to Venue V01. Member M07 is booked in S12 and S13. Does this prove both sessions use V01?

Notes: ________________________________________________

### 5. Resolve two many-to-many relationships

Explain Member–Session and Session–Equipment. Where is each relationship resolved?

Notes: ________________________________________________

### 6. Interpret the composite key

Why does SessionEquipment use the pair (SessionID, EquipmentID)? Where should QuantityUsed be stored?

Notes: ________________________________________________

### 7. Interpret optional attendance

Can a booking exist without attendance? Can attendance exist without a booking? Does no attendance row mean Present = 0?

Notes: ________________________________________________

### 8. Use the exact foreign-key target

Why is Attendance’s joint reference to Booking stronger than separate references to Member and Session?

Notes: ________________________________________________

### 9. Check candidate rows

Use the stored-key snapshot below. For each candidate, say whether it is allowed by the stated key/domain rules: Attendance(M07,S13,1); Attendance(M08,S13,1); another Attendance(M07,S12,0); SessionEquipment(S12,E02,1); SessionEquipment(S12,E99,1); SessionEquipment(S13,E02,0).

Notes: ________________________________________________

### 10. Identify what keys do not enforce

Name three scheduling, capacity or stock rules that these relationships alone do not enforce.

Notes: ________________________________________________

### 11. Trace a report

A report lists member name, workshop title, room label and venue name for each booking. Which six tables must it follow?

Notes: ________________________________________________

### 12. Check a claim about deletion

A reader says deleting a session must delete all its bookings. Is that specified by the ER diagram?

Notes: ________________________________________________

### 13. Read a one-to-one extension

Explain why Attendance’s primary key limits a booking to one Attendance row. What would need to change to record multiple check-in events?

Notes: ________________________________________________

### 14. Explain a repeated room label

Two rows use RoomLabel “Studio”, one at each of two venues. Is that forbidden by the model?

Notes: ________________________________________________

Explained answers are in unit4-er-interpretation-answers.md and the printable HTML copy.

Original learning resource, 14 October 2026. Brett Sullivan and contributors. Content: CC BY 4.0; see LICENSE.md. Source: https://github.com/EdugenIO/cs-atar-textbook .
