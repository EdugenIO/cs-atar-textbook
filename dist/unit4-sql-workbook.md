# Advanced SQL workbook — Unit4 weeks2–3
Eight lessons, four each week. All reports start from unchanged design schema; data synthetic.
A: write grain, required tables/keys and expected rows for Q1. Trace one booking through all four tables. Compare names-only output with key-bearing report.
B: implement grouped bookings by session; explain excluded S03. Write all-session version and compare COUNT(*)/COUNT(b.MemberID). Predict empty-input COUNT/SUM/AVG/MIN/MAX.
C: calculate remaining/fill, using real division; concatenate member/workshop labels with aliases. Explain ORDER BY and dialect-specific ||.
D: join Attendance by both keys. Explain 0/NULL. Compare presence condition in ON versus WHERE. Write a grouped recorded/present report with a stated rate denominator and zero guard.
E: distinguish WHERE/HAVING; report sessions with at least 2 bookings. Repair a query joining attendance only by member and a capacity sum at booking grain. Explain why SUM(DISTINCT capacity) fails when equal capacities belong to different sessions.
F fresh transfer: report session/instructor names (two tables); show each member's booking count including M03 (LEFT JOIN); show each workshop's session count and total capacity including workshops with no sessions. Preserve keys and define grain. Predict original outputs, then add an equal-label member/unbooked equal-capacity session only in an in-memory/disposable copy and retest. Record expected/actual and explain changed rows.
Keep your SQL and a short explanation of expected and actual results for your own review. Try fresh data to check your reasoning rather than copying the worked outputs. No source database files change.
