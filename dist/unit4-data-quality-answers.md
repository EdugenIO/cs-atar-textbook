# Data quality — explained answers

Use these for self-checking. The records are fictional and not operational inventory.

## 1. Define fitness for purpose

Use centre-owned stock, one row per EquipmentID, quantities in items and dated evidence. The cleaned example describes the supplied 10 October stocktake, not guaranteed stock on 14 or 20 October. Undocumented movements, condition and reservations remain uncertain. Data quality depends on this purpose.

## 2. Accuracy versus validation

Format/domain validation can accept 80. The supplied A:E03 reference says 8 microphones, establishing a copying mismatch. Correct to 8 with a decision-log entry; do not claim integer validation proved factual accuracy.

## 3. Currency and dates

R04’s observation is from 1 November 2025; the recent download does not refresh it. A:E04 records 7 tablets on 10 October 2026. Use the newer observation with its actual date and source, preserving the old B record as history. Four-day-old evidence can still need a new stocktake for a time-critical decision.

## 4. Authenticity and provenance

No. Request the original record through an established centre channel and confirm who supplied it and how it was produced. Reconcile it with an approved stocktake or responsible custodian. A checksum is useful only against a trusted expected value and does not prove the inventory facts are true. Hold both rows while provenance and scope remain unresolved.

## 5. Relevance is a separate decision

R10 reports supplier warehouse stock, not equipment owned by the centre. Its provenance and age do not fix this scope mismatch. It could help investigate a purchasing decision, after checking product, unit, price and availability details for that new purpose.

## 6. Check units before comparing

A records three sealed packs and D confirms four matching kits per pack: 3 × 4 = 12 individual kits. Record both evidence references. Without a verified matching pack size, retain the raw unit and hold conversion pending clarification; do not assume one pack equals one item.

## 7. Missing and impossible values

Negative physical counts fail the specified domain; a blank is unknown. A:E07 supplies 12 webcams and A:E08 supplies 9 extension leads, so those corrections can be justified and logged. Zero would invent a fact. Without the references, hold the rows for clarification rather than guessing.

## 8. Handle a duplicate transparently

No: this report requires one row per equipment ID, and the records duplicate the same observation and source. Use R02 once, suppress R11 in the report and keep both original rows plus the decision log. Do not apply a universal delete-duplicates rule to unrelated transaction data, where repeated events may be legitimate.

## 9. Investigate two possible outliers

Retain R06’s 240: A and the independent E recount support it, with a community-event explanation. Hold R12 because the source and context are unverified. Do not silently drop either row or change 120 to 12. Equipment categories have different typical quantities, so one numerical threshold across all categories would be misleading.

## 10. Apply all five factors

Example: accuracy—R03 differs from A:E03, correct 80 to 8; currency—B is an old observation, use A:E04 and disclose its date; relevance—C describes supplier stock, exclude from this inventory report; authenticity—U has unknown provenance, obtain an approved original; outliers—E confirms 240 chairs, retain with annotation while holding the unverified printer count. These judgements can overlap; they are not five independent pass/fail scores.

## 11. Build a defensible decision log

E01–E08 appear once each. Keep R01/R02; keep and annotate R06. Correct R03/R07, complete R08 from evidence, supersede R04 and convert R05. Hold R09/R12, exclude R10 for this purpose and suppress duplicate R11. The supplied decision-log CSV records references and reasons; the raw CSV remains unchanged.

## 12. Change the purpose

No. Seek a sufficiently recent stock/condition check (currency), reconcile actual usable counts (accuracy), collect session requirements and existing reservations (relevance), use approved records and verified custodians (authenticity), and investigate unusual changes or quantities (outliers). The current inventory observations do not establish future availability. Report the uncertainty rather than converting this worksheet’s illustrative data into an operational guarantee.

## Illustrative report

|EquipmentID|Item|Quantity|Unit|Observed|Source|
|---|---|---|---|---|---|
|E01|Laptop|12|items|2026-10-10|A|
|E02|Projector|4|items|2026-10-10|A|
|E03|Microphone|8|items|2026-10-10|A|
|E04|Tablet|7|items|2026-10-10|A|
|E05|Sensor kit|12|items|2026-10-10|A|
|E06|Folding chair|240|items|2026-10-10|A|
|E07|Webcam|12|items|2026-10-10|A|
|E08|Extension lead|9|items|2026-10-10|A|

## Explained row decisions

|Row|Decision|Evidence|Treatment|Reason|
|---|---|---|---|---|
|R01|Keep|A:E01|12 items|Matches the supplied centre count.|
|R02|Keep|A:E02|4 items|Matches the supplied centre count.|
|R03|Correct|A:E03|8 items|80 is a transcription mismatch against the reference count of 8.|
|R04|Supersede|A:E04; B archive|7 items; observed 2026-10-10; source A|Replace the historical observation with the supplied current observation; retain B as history.|
|R05|Convert units|A:E05; D pack specification|12 items|Three sealed packs × four kits per pack = 12 individual kits.|
|R06|Keep; annotate|A:E06; E recount|240 items|Large count is supported by the recount and event context. Preserve the original A observation date.|
|R07|Correct|A:E07|12 items|Negative physical stock violates the stated domain; use the supplied evidence, not a guessed zero.|
|R08|Complete from evidence|A:E08|9 items|Missing quantity is not zero; the reference supplies 9.|
|R09|Hold for verification|U provenance unresolved|Not in the planning report|Plausible quantity and a recent claimed date do not establish source identity or local stock.|
|R10|Exclude from this report|C supplier catalogue|Not centre-owned stock|Authentic, recent supplier data is irrelevant to this report; retain it for possible purchasing use.|
|R11|Suppress duplicate in report|R02; A:E02|No second E02 row|Same equipment, date, units, location and source as R02; retain the raw row and decision log.|
|R12|Hold for verification|U provenance unresolved|Not in the planning report|Unusual count needs context and an authentic original source; do not change 120 to 12 or silently delete it.|

Original fictional learning resource, 14 October 2026. Brett Sullivan and contributors. Content: CC BY 4.0; see LICENSE.md. Source: https://github.com/EdugenIO/cs-atar-textbook .
