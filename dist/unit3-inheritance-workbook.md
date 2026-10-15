# Unit 3 week 6 — Inheritance workbook

Before B, connect the class relationship diagram to the method-call trace. For each item.preparation() call, name the receiver’s class and selected implementation. Explain why inherited lend() still works and why adding AudioRecorder should not require a report branch.
Lessons 1–3 guided learning; lesson 4 optional practical. Synthetic equipment and invented thresholds only.

## A — Model and initialise
Identify superclass/subclasses, inherited members and overrides. Explain why Camera is an Equipment but a kit has components. Implement subclass __init__ with validation, super() and separate instance fields. Explain why super() does not create another object and why overriding __init__ requires an explicit base initialisation call.

## B — Dispatch and abstraction
Trace preparation_report for Camera charge 19, Projector hours 999 and a generic Equipment. Change to charge 20/hours 1000 and trace again. Explain why no subtype-check branch is needed. Distinguish abstraction/encapsulation/inheritance/polymorphism and overriding/overloading. Is the base class concrete or enforced abstract here?

## C — Contracts and testing
Test inherited lend/return on all three classes, new field boundaries, invalid setters with unchanged state, an empty report and independent instances. Add AudioRecorder with preparation() returning a string, preserving the base stock contract; use the report unchanged. State composition for a kit. Save expected/actual evidence.
Lesson 4 uses the separate original practical. Use the worked solution for self-review after your first attempt; no submission or grade is needed.
