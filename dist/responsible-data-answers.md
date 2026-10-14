# Responsible data use — explained answers and checkpoints

## R01

Scenario: A prototype desk database adds phone numbers and health notes because they might be useful later.

Issue: Unnecessary collection and sensitive information

Course lens: APP 3; collection purpose/notice

Decision: Use synthetic labels for the class prototype; justify each real field before authorised collection.

Limit: Do not assume consent makes unnecessary collection appropriate.

## R02

Scenario: Borrower names are removed from a public export, but IDs, exact dates and rare item loans remain.

Issue: Re-identification risk

Course lens: Identifiability; purpose/disclosure

Decision: Use a synthetic public example or assess aggregation/suppression and linkage risks before release.

Limit: Removing names alone does not establish de-identification.

## R03

Scenario: A developer sends the loan register to an external service for debugging without checking approval or data handling.

Issue: Unapproved disclosure/service use

Course lens: APP 6 and possibly APP 8; applicable school rules

Decision: Reproduce the fault with synthetic records in an approved environment; review access/location/retention first.

Limit: Encryption in transit does not authorise the disclosure.

## R04

Scenario: An incorrect return status leads to an unfair overdue accusation.

Issue: Quality, correction and fairness

Course lens: APP 10 and APP 13; integrity

Decision: Verify the source and use the authorised correction process; preserve an appropriate history.

Limit: A valid Boolean value can still be factually wrong.

## R05

Scenario: A classmate says it is fine to scan the production school portal to find weaknesses.

Issue: Missing authority and scope

Course lens: Ethical hacking authorisation

Decision: Do not treat a peer invitation as system-owner authority; use an explicitly authorised local lab.

Limit: Good intentions do not provide authorisation.

## R06

Scenario: A tester discovers a fault outside the agreed test system and wants to explore it further.

Issue: Scope boundary

Course lens: Rules of engagement and reporting

Decision: Stop that line of testing; report through the agreed contact and seek revised authority if needed.

Limit: Do not collect extra records merely to prove the finding.

## R07

Scenario: A student proposes deleting all project records immediately after demonstration, including material the school must retain.

Issue: Retention conflict

Course lens: APP 11 qualifications; applicable recordkeeping

Decision: Follow the authorised retention/disposal process; minimise unnecessary working copies without destroying required records.

Limit: A blanket delete-on-finish rule is not a retention policy.

## R08

Scenario: The project report claims implemented role-based access although only a visual login screen exists over an accessible SQLite file.

Issue: Unsupported evaluation claim

Course lens: AAA and evidence integrity

Decision: Mark the control proposed/unverified, test the actual access boundary and document the limitation.

Limit: A screen is not evidence that the file is protected.

## Scope answers
A: within the fictional scope, subject to actual owner authorisation and the stated conditions.
B: outside scope; peer approval is not the responsible owner's authority.
C: within the fictional scope when supplied accounts and permitted checks are used as agreed.
D: outside scope; stop and report, rather than expanding exploration.
E: excluded disclosure; testing permission does not automatically permit public release.
F: within the agreed reporting route, using minimal synthetic evidence and applicable handling rules.

Ethical testing aims to improve security within valid authorisation. Penetration testing assesses exploitable weaknesses/impact under an agreed scope. Good intention alone does not authorise activity; findings are limited by what was tested.

## Evaluation checkpoints
Evaluate each criterion as met, partly met or not met, using actual evidence. Baseline project counts: four borrowers, three categories, five equipment items, six loans; active loans four; inventory total 1400. A tested restored copy should match planned baseline/report checks. Negative-cost rejection demonstrates that constraint only. A proposed login/role system must not be labelled implemented if the actual file remains accessible.

Ask students to justify fields and recipients, identify coded-ID linkage risks, explain quality/correction and lawful retention qualifications, and distinguish APP study from actual organisational coverage. Do not require an operational legal conclusion from incomplete facts. Accept alternative decisions when evidence and conditions support them.

Four Week-12 lessons: privacy; ethical testing; evaluation workshop; demonstration/submission. This completes 14 planned project lessons when combined with week 7 and two workshops each week in weeks 8–11. Classroom evidence, independent review and full Unit 2 audit remain pending.
