# Data quality: five factors in practice

Unit 4 · optional worksheet · no marks, submissions or tracking

Prepare a preliminary report on equipment owned by the fictional Harbour Learning Centre, using evidence available on 14 October 2026. Use one row per EquipmentID, quantities in individual items, non-negative whole-number quantities and explicit observation dates. This is an inventory report, not a supplier-stock list, price comparison or guarantee that equipment will be available for a future session.

All organisations, records, dates and verification notes in this exercise are fictional. Treat the source-card checks as supplied scenario facts, not real authentication evidence. The raw CSV is a manually compiled working copy and can contain copying errors even when its cited source is genuine. Blank means unknown, not zero. A’s reference counts are the best supplied inventory observations, but stock movements after 10 October are not documented.

## Five factors

|Factor|Question|Evidence|
|---|---|---|
|Accuracy|Do the values agree with the best available evidence?|Compare with the source record; explain any mismatch.|
|Currency|Are the observations recent enough for this purpose?|Separate observation date from download date; consider changes since collection.|
|Relevance|Does the data describe what this decision needs?|Check population, location, time period, units and intended use.|
|Authenticity|Is the source or record what it claims to be?|Check provenance through an established channel; a filename or plausible format is insufficient.|
|Outliers|Which unusual values need investigation in their context?|Check units, source and circumstances; retain genuine extremes and flag unresolved ones.|

## Source evidence cards

|Source|Record|Observed|Received|Provenance premise|Scope / evidence|
|---|---|---|---|---|---|
|A|Centre stocktake|2026-10-10|2026-10-11|Approved centre folder and staff receipt checked|Counts of eight equipment types owned by the centre; reference rows supplied below.|
|B|Archived centre stock list|2025-11-01|2026-10-14|Approved archive; origin checked|Historical stock. Newly downloading an old file does not make its observations current.|
|C|Supplier catalogue|2026-10-13|2026-10-14|Catalogue obtained from the established supplier channel|Supplier stock and product information, not equipment owned by the centre.|
|D|Sensor-kit pack specification|2026-02-01|2026-10-11|Established supplier specification; batch/model matched|Four individual kits per sealed pack. A records three sealed packs for E05.|
|E|Chair recount note|2026-10-12|2026-10-12|Approved centre folder; counter and receipt checked|E06 independently recounted as 240 chairs held for a community event.|
|U|Inventory_FINAL_verified.csv|Claimed: 2026-10-13|2026-10-13|Unknown uploader; no original record or trusted origin supplied|Claims to be centre stock; scope and authenticity remain unverified.|

## Raw working copy

|Row|EquipmentID|Item|Quantity|Unit|Observed|Source|Location|
|---|---|---|---|---|---|---|---|
|R01|E01|Laptop|12|items|2026-10-10|A|Centre|
|R02|E02|Projector|4|items|2026-10-10|A|Centre|
|R03|E03|Microphone|80|items|2026-10-10|A|Centre|
|R04|E04|Tablet|6|items|2025-11-01|B|Centre|
|R05|E05|Sensor kit|3|packs|2026-10-10|A|Centre|
|R06|E06|Folding chair|240|items|2026-10-10|A|Centre|
|R07|E07|Webcam|-2|items|2026-10-10|A|Centre|
|R08|E08|Extension lead|[blank]|items|2026-10-10|A|Centre|
|R09|E09|Drone|5|items|2026-10-13|U|Claimed centre|
|R10|E10|Printer|999|items|2026-10-13|C|Supplier warehouse|
|R11|E02|Projector|4|items|2026-10-10|A|Centre|
|R12|E11|3D printer|120|items|2026-10-13|U|Claimed centre|

## Supplied source A reference

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

E05: three sealed packs × four matching kits per pack = 12 individual kits. E confirms 240 chairs.

## Worked example

R03 passes an integer/non-negative check: 80 is a valid-looking number. However, A’s E03 record says 8 microphones, so the working copy is inaccurate. Correct the report to 8 and log A:E03 as the evidence, preserving the raw 80. For currency, label the observation 10 October rather than the report/download date. Authenticity concerns how A’s origin was checked; it does not make every copied number accurate. The count is relevant because it describes centre-owned equipment in individual items. Investigate the unusual 80 instead of assuming every large value is wrong—R06’s 240 chairs has supporting recount evidence.

## Your evidence matrix

|Factor|Evidence / source|Conclusion or uncertainty|Next action|
|---|---|---|---|
|Accuracy|________________|________________|________________|
|Currency|________________|________________|________________|
|Relevance|________________|________________|________________|
|Authenticity|________________|________________|________________|
|Outliers|________________|________________|________________|

## Questions

### 1. Define fitness for purpose

What belongs in this inventory report? What remains uncertain even after cleaning?

Notes: ________________________________________________

### 2. Accuracy versus validation

Why is R03 inaccurate even though 80 is a non-negative integer? What evidence supports a correction?

Notes: ________________________________________________

### 3. Currency and dates

R04 was downloaded on 14 October 2026. Is its value of 6 tablets current? Which supplied observation should the report use?

Notes: ________________________________________________

### 4. Authenticity and provenance

Does the name Inventory_FINAL_verified.csv prove R09 and R12 are authentic? Name two checks you would request.

Notes: ________________________________________________

### 5. Relevance is a separate decision

Source C is recent and obtained through an established supplier channel. Why is R10 excluded? Could C be relevant for another task?

Notes: ________________________________________________

### 6. Check units before comparing

R05 says 3 packs. Use A and D to express this quantity in the report’s unit. What would you do without D?

Notes: ________________________________________________

### 7. Missing and impossible values

What should happen to R07’s −2 webcams and R08’s blank quantity? Why is replacing both with zero wrong?

Notes: ________________________________________________

### 8. Handle a duplicate transparently

Should R02 and R11 both contribute to the projector count? Explain your decision and what you keep.

Notes: ________________________________________________

### 9. Investigate two possible outliers

Compare R06’s 240 chairs with R12’s 120 3D printers. What should be retained, and what needs investigation?

Notes: ________________________________________________

### 10. Apply all five factors

Complete a matrix with one piece of evidence, a conclusion or uncertainty, and a next action for each of the five factors.

Notes: ________________________________________________

### 11. Build a defensible decision log

For every raw row, choose keep, correct/convert, supersede, hold, exclude or suppress duplicate. Which eight equipment IDs appear in the illustrative report?

Notes: ________________________________________________

### 12. Change the purpose

A coordinator wants to guarantee equipment availability for sessions on 20 October. Is the cleaned CSV enough? Apply all five factors to the new request.

Notes: ________________________________________________

Use unit4-data-quality-answers.md for explained answers and unit4-data-quality-decision-log.csv for a reasoned row-by-row example. The raw CSV is preserved.

Original fictional learning resource, 14 October 2026. Brett Sullivan and contributors. Content: CC BY 4.0; see LICENSE.md. Source: https://github.com/EdugenIO/cs-atar-textbook .
