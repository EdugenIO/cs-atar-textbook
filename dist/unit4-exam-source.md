# Original practice source booklet — Sets A and B
All information is fictional. Use this exam seed, not the consolidation, review or project seed. These lesson-size sets sample Year 12 Units 3–4; they are not complete examinations, predictions or endorsed tasks.

Python rows: [["Python",2],["Network",0],["Python",3]]. Counts must be non-negative exact integers, excluding bool; topics must be non-empty strings. An empty rows list returns {}. Repeated exact topic strings accumulate; no case or whitespace normalisation is requested.

Five-table model: Category(CategoryID PK, Name); Resource(ResourceID PK, Label, CategoryID FK); Member(MemberID PK, Name); Loan(LoanID PK, ResourceID FK, MemberID FK, StartDate, nullable ReturnDate); Inspection(InspectionID PK, ResourceID FK, InspectionDate, Passed integer 0/1). PK and FK fields are non-null. The supplied schema does not fully enforce calendar validity, chronological order or a single active loan per resource.

Resources: R01 Camera, C01 Media; R02 Microphone, C01 Media; R03 Router, C02 Network; R04 Switch, C02 Network. Members: M01 PersonA, M02 PersonB, M03 PersonC. Loans: L01 uses R01/M01, starts 2026-10-01 and has NULL ReturnDate; L02 uses R01/M02, starts 2026-09-01 and returns 2026-09-05; L03 uses R02/M01, starts 2026-10-02 and has NULL ReturnDate. Inspections: X01 checks R01 with Passed = 1; X02 checks R02 with Passed = 0. A resource can have zero or many loans and inspections; each loan belongs to one resource and one member. The same resource/member pair can recur over time.

Network: allocate conventional IPv4 subnets within 192.168.80.0/24 for 45 staff and 18 guest total assigned hosts, including gateways. Allocate largest first and choose the first usable address as each gateway. Client 192.168.80.10/26 connects to documentation address 203.0.113.20. Assume no NAT for this explanation. Hostname resolution fails, but a separately verified connection to the intended IP/service succeeds. No real traffic is generated.

Security: a proposed web service trusts browser-supplied role='Registrar'. Logs show a learner-labelled export allowed with 250 records returned, followed by a denied export. Labels and IP addresses do not establish a person's identity. No recipient, disclosure or serious-harm finding is supplied. The classroom SQLite project does not implement this web, login or TLS service.

Privacy: the fictional private provider is assumed to be an APP entity covered by federal NDB obligations. The incident date is 14 October 2026. No eligibility finding is supplied unless a retry explicitly adds one. A WA public-sector counterfactual requires separate coverage/date analysis. There are no real student records, keys, school-system tests or regulator notices.
