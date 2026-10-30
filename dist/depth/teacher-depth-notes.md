# Teacher notes: worked examples and instructional sequence

These are original ungraded activities. Choose examples within existing lesson time; this expansion does not add assessed tasks, marks or project requirements. Use a short retrieval prompt, a think-aloud worked example, paired completion, an independent changed case and a later retry. Predictions should precede output/answers. Treat a well-explained error as evidence for the next teaching step.

## Log reference

- R01: keep after permitted whitespace/host-case normalisation (L001, LAB1, 15).
- R02: keep after approved ok → 200 conversion (L002, LAB1, 20).
- R03: suppress in this report as an identical normalised L002 event; preserve the raw row.
- R04: keep L003/404/8. A 404 is relevant event evidence, not automatically dirty data.
- R05: hold; missing duration is not zero and no supplied evidence fills it.
- R06: hold; timestamp does not match the required format.
- R07: hold; negative duration violates the stated domain. Do not guess zero.
- R08: keep L007/200/9999, flag for review. Unusual is not synonymous with false.
- R09: hold; source U is unresolved despite plausible values.
- R10/R11: hold both; the same L009 ID has conflicting durations. Do not choose an arbitrary winner.
- R12: keep L010/200/0; a real zero is allowed.
- R13: keep L011/403/4; denied requests are relevant to the report.

Six retained IDs: L001, L002, L003, L007, L010, L011. Non-success: L003/404 and L011/403. LAB1: 2 events, 35 ms; LAB2: 2 events, 10007 ms; LAB3: 2 events, 4 ms. Overall total 10046 ms. The mean is about 1674.33 ms but is heavily affected by 9999; do not call it a typical response without distribution/context. Changing R01 to UNKNOWN holds it, leaving 5 retained rows, overall total 10031 and LAB1 count 1. Reruns replace worked outputs but not the raw master. Filtering is a report choice after documented cleaning, not a reason to falsify source events.

## DDL/DML reference

The final Item row is (1, Camera, 40, SupplierID 1, Active 1). Supplier has two rows. Scratch no longer exists. UPDATE's price 0 was rolled back. Test negative Cost, absent SupplierID and duplicate ItemID separately, expecting constraint rejection with previous valid records unchanged. Rerun the complete script on a fresh database because CREATE TABLE deliberately exposes an already-existing schema rather than silently reusing it.

## Anomaly reference

The flat key is (StudentID, ClubID). Student and Club facts depend on parts of the key. CoachPhone depends on ClubID transitively via CoachID. The worked 3NF relations are Student, Coach, Club and Membership. Before independent changes, ReconstructedBefore matches all original facts in both directions. The fixture is consistent; DISTINCT is not a conflict-resolution policy. After changes, T1 phone is 299, C3 exists without members, and C2 survives deletion of its last membership. Check constraints reject dangling references. A new Asset/Room example splits Room(RoomID, RoomName) from Asset(AssetID, AssetName, RoomID).

## Testing and feedback

Require students to supply actual observations, not copy the expected column and label it passed. Include normal, boundary and invalid cases where meaningful; empty, singleton, duplicate, missing and inconsistent state cases often reveal different faults. Keep the originally failing test after repair, plus unaffected behaviour and a fresh transfer. Unit tests cannot certify persistence, integration, classroom response times or acceptance. Define a local measurement target and record setup/results; do not invent measurements. Use synthetic data; any live-school trial follows school authorisation and data-handling rules.

## Language and scope

Use Australian English, with practice/practicing as the site owner's preferred exception. Python underscores express conventions/name mangling rather than enforced public/protected/private access. These details support understanding; they are not extra access-modifier project requirements. ipaddress is an optional standard-library model of subnet membership, not a network scanner. No handwritten cryptographic implementation is required. Public references and explained answers are learning supports, not formal assessment keys.
