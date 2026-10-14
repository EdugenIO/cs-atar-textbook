# Security — explained answers and teacher checkpoints

## S01

Scenario: A message urges the technician to enter credentials at an unfamiliar sign-in link. No one has clicked yet.

Mechanism: Phishing attempt

CIA: Confidentiality at risk; no compromise proven

AAA: Authentication could be undermined by stolen credentials

Control: Verify using a known channel, report the message, use MFA

Limit: A suspicious message alone is not evidence of account takeover.

## S02

Scenario: A loan status changes without approval; everyone uses the same account.

Mechanism: Unauthorised modification / shared-account weakness

CIA: Integrity

AAA: Authorisation and accounting

Control: Individual accounts, restricted changes, protected audit records

Limit: Logs need trustworthy timestamps and identity; a log alone does not prove the human actor.

## S03

Scenario: The desk database is encrypted by malware; a recent isolated backup exists.

Mechanism: Ransomware

CIA: Availability; confidentiality also possible if data was stolen

AAA: Review access/account activity during investigation

Control: Report/isolate under the incident plan, verify a clean restore

Limit: Do not assume theft occurred or that a restore removes stolen copies.

## S04

Scenario: The loan portal becomes unreachable during a request flood.

Mechanism: Denial of service

CIA: Availability

AAA: Accounting/monitoring may help analysis

Control: Rate limiting/filtering and service-provider escalation

Limit: Symptoms alone can also arise from a fault; evidence is needed.

## S05

Scenario: A web search inserts user text directly into SQL statement text.

Mechanism: SQL-injection exposure

CIA: Confidentiality and integrity; availability possible

AAA: Least privilege limits damage; authorisation still matters

Control: Parameterised statements plus validation and limited privileges

Limit: A design weakness does not prove an attack has happened.

## S06

Scenario: A note is displayed as executable content in a borrower’s browser.

Mechanism: Cross-site scripting

CIA: Confidentiality and integrity at risk

AAA: Session misuse may bypass intended authority

Control: Encode for the output context; safe rendering; sanitise permitted HTML

Limit: SQL parameters address a different execution context.

## S07

Scenario: A laptop with an accessible database is stolen from an unlocked room.

Mechanism: Physical theft

CIA: Confidentiality and availability

AAA: Device access and accountability review

Control: Physical controls, device encryption, screen lock, protected backup

Limit: Encryption needs protected keys; an unlocked signed-in device remains exposed.

## S08

Scenario: A new app vulnerability is disclosed; no patch is available and the exposed feature can be disabled.

Mechanism: Zero-day risk

CIA: Depends on what the flaw permits

AAA: Review affected access paths and logs

Control: Temporary feature restriction, monitoring and planned patch

Limit: Do not claim an update fixes a flaw before a suitable fix exists.

## Concept and cipher checks

An asset is valuable; a vulnerability is a weakness; a threat can exploit or otherwise cause harm; risk combines likelihood/consequence. A warning alone does not establish a successful attack.

Virus: host-attached spread; worm: self-propagation between systems; Trojan: deception by apparent legitimacy. A Trojan can install spyware or ransomware. Adware is not automatically malicious. SQL injection targets SQL command interpretation; XSS targets browser execution. IP identity claims do not authenticate a person. Zero-day is a vulnerability/timing description.

Password plus PIN: two knowledge secrets, not two categories. Password plus appropriately bound authenticator device can use knowledge/possession. Biometrics may be convenient but false matches, accessibility and difficult replacement of exposed traits matter. Review recovery and account removal as well as password length/uniqueness.

Symmetric: shared secret for encryption/decryption. Public-key confidentiality: verified recipient public key encrypts, recipient private key decrypts. Protect keys; encryption alone is not authorisation, backup or safe input handling.

Cipher 1: LOAN → ORDQ (14,17,3,16); subtract 3 → LOAN.
Cipher 2: RETURN → WJYZWS; R17+5=W22, E4+5=J9, T19+5=Y24, U20+5=Z25, R17+5=W22, N13+5=S18.
Cipher 3: L→S, O→G, A→Q, N→F; SGQF reverses to LOAN.
Cipher 4: LOAN + KEYK shifts 10,4,24,10 → VSYX; subtract to recover LOAN.
Cipher 5: DATA numbers 3,0,19,0 + 10,4,24,10 → 13,4,17,10 → NERK. Reverse with subtraction.
Cipher 6–8: Rotation permits trying 26 shifts. Fixed substitution preserves letter/pattern frequencies; short text/context can make frequency guesses unreliable. Vigenère varies mappings, but repeated keys leave analysable patterns. None is suitable for real database protection.

## Review and project evidence
Accept alternatives when their mechanism, evidence and limitation are justified. Do not demand exactly one CIA label. Require a distinction between known/inferred/unknown. For AAA, check identity versus permission versus records; logs do not automatically prove a human actor. Ask for actual restore evidence and the original expected record counts. Require implemented/tested/proposed status, especially where the SQLite file has no built-in user-role or application audit system.

Week 8 CIA/AAA; week 9 threats/controls; week 10 access/encryption; week 11 ciphers. Two security lessons and two project workshops each week. Week 12 privacy/ethical hacking is later content. Teacher review and full Unit 2 audit remain pending.
