# Unit 3 Week 1: Python re-entry and evidence

2027 teaching edition · original formative activities · content CC BY 4.0, code MIT.

Four existing 55-minute lesson slots; timings are untrialled suggestions. Choose one repair target rather than completing every option. These tasks are not additional weighted assessments. All textbook resources, including teacher keys, are public. Record previous exposure and assistance; keep original responses, corrections and changed retries separately. Use fictional values. Do not overwrite your only working copy.

Download and extract the companion ZIP before running Python files. Python 3 is sufficient except Lesson 2, which uses the existing [Pygame teaching pack](https://edugenio.github.io/cs-atar-textbook/pygame/pygame-teaching-pack.zip), its pinned requirements and [bridge y12-1](https://edugenio.github.io/cs-atar-textbook/pygame/index.html#y12-1). Use school-approved installation. No external game assets or accounts are needed. The existing [foundations workbook](https://edugenio.github.io/cs-atar-textbook/unit3-foundations-workbook.md) supplies optional loop/type/scope repairs, not extra mandatory tasks.

## Lesson 1 — diagnostic before feedback

Take 10 minutes without running code or opening the teacher key. Record if these items are already familiar. Retain the original before feedback; the diagnostic is ungraded.

D1. Predict both calls and show the running count after each value.

```python
def count_ready(values):
    count = 0
    for value in values:
        if value >= 5:
            count += 1
    return count

count_ready([3, 5, 8])
count_ready([])
```

D2. Predict `result` and the caller's `count`. Explain the return and the local name.

```python
count = 10
result = count_ready([3, 5, 8])
```

D3. Classify and explain each fault: `if value >= 5` without a colon; `int("two")`; a specification says “at least 5” but the code uses `value > 5`. Give the smallest input or execution step that shows the fault.

D4. Choose an empty, exact-boundary and duplicate-values test. State expected results before running.

### Choose one targeted repair

R1 Boundary: complete `if value ___ minimum` in a counter. Trace values `[4,5,7]`, minimum 5. Remove the suggested comparison before an independent changed attempt.

R2 Return: a function counts correctly but has no `return count`. Predict the caller's result, repair the function, then check both a nonempty and empty input.

R3 Diagnosis: separate conversion of input text from the comparison rule. Reproduce one `ValueError` and one wrong boundary result. Change one cause at a time and retest.

Write expected → actual → reason → retest. A partner asks for your reasoning before supplying a fix. Optional extension for secure learners: use foundations workbook D to explain local rebinding versus shared-list mutation.

### Close the model: changed check

Write or trace a counter for values at least 6 in `[6,2,9,6]`, then an empty list. Record help, preserve the response and only then compare with feedback. Exit: count values at least 5 in `[4,5,7]` and `[]`; explain counter initialisation.

## Lesson 2 — one Pygame repair

Report whether you have used Pygame before. The four existing stages are a re-entry menu, not a checklist to finish today. New learners use stage 1 and modelling; others select a diagnosed gap. Install/run the known-good pack before editing copies. If a device is unavailable, trace on paper and record execution as pending.

1. Run `python stage1_loop.py`, then `python lab_runner.py 2` from the extracted Pygame pack. Explain events, held-key sampling, update and draw. Space starts/pauses/resumes; R resets; X/Escape quit.
2. Predict, then test with ordinary Python rules: fresh worked state starts at x308, remaining20000. Call `command(state,"space")`, then `update(state,1,250,collect=False)`. Identify pixels and milliseconds. The direct update is after the transition; the runner ignores the transition frame's elapsed delta.
3. In disposable copies/snippets, diagnose one missing colon, `int("two")`, and a movement calculation missing `/1000`. Observe raw displacement as well as a bounded screen position.
4. In a copy of `faded_practice.py`, complete only the teacher-selected movement/time portion of `update()`. Use fresh state, set mode to playing, and call with `collect=False`. Preserve validation, bounds 0..616, timeout and inactive-mode behaviour. Predict direction1/250ms at160pixels/second from x40, remaining15000. Leave unrelated TODOs pending. This does not complete the three-station graphical game; the worked runner still draws its original two-station context.
5. Close the worked calculation. Independently predict a fresh direction1/500ms call, and explain paused behaviour and reset after a long elapsed interval. Record actual runs where available.
6. Choose one short inspection if appropriate: stage3 collect-once flags, or stage4 disposable history lines `0`, `2`, `bad`, `3`. Predict accepted values/warnings. Never experiment on your only history file.

Exit: distinguish events from held keys and demonstrate pause/reset after a long elapsed interval. Use the existing practice-test/readiness records. Timings: 5-minute retrieval,10-minute model,15-minute guided work,15-minute independent practice,5-minute targeted inspection,5-minute exit. The deck divides the guided/independent phases across two slides each.

## Lesson 3 — a documented requirement change

C01: the client changes “count values at least 5” to “count values at least 6”. For `[5,6,7]`, predict before coding. Explain which requirement, design decision, comparison and expected results must change.

Model after prediction:

```python
def count_at_least(values, minimum):
    count = 0
    for value in values:
        if value >= minimum:
            count += 1
    return count
```

Complete expected results for minimum6: `[5]`, `[6]`, `[7]`, `[]`, `[6,6]`. Run the function only after recording predictions. Retest the still-supported minimum5 call on `[4,5,7]`. Explain why an intentionally changed expectation differs from an unintended regression.

Compare a linear process with a controlled return to earlier work against an iterative design/build/test revision. Both require planning, documentation and testing. Give a reason for your choice in this small changing-rule scenario.

Independent transfer: close the model. Write your own function and tests for minimum8 using `[7,8,9,8]`, `[]` and `[8,8]`; retain original and corrected work. Optional extension: state and justify a nonnumeric-input policy before implementing validation. Exit: explain how each process handles a changed threshold and give one regression case with an expected result.

## Lesson 4 — prove restoration

The ZIP contains a known small `seed-v1` program, not student work or fabricated test results. Use separate folders in a writable location:

1. Run `python check.py` **from seed-v1**. Record the printed source path, version, minimum, expected and actual result.
2. Copy all three seed files into `snapshot-v1` and `working-v2`. Keep the snapshot unchanged. Record the copies in `version-log.csv`.
3. In working-v2 only, change `MINIMUM` to6, `VERSION` to2, check.py's `expected` to1 and VERSION.txt to describe the change. Run from working-v2. Record the actual result; do not assume it passed.
4. Close the model. Restore snapshot-v1 by copying all files into a **new restored-v1 folder**. Do not overwrite working-v2. Run from restored-v1. Check the printed `rules.__file__` path; investigate if it points elsewhere.
5. Run working-v2 again. Explain the different totals. Also test empty input and each version's exact boundary. Preserve both sets of output and log the version used.

A filename alone is not evidence of a successful restore. If working files were overwritten, stop and repeat using separate destinations with a preserved source. If a device is unavailable, record a plan but leave actual restoration pending. A same-drive copy does not protect against drive failure; an approved separate storage location is an optional extension, not a required cloud account.

Exit demonstration: show the separately restored folder, run a known test, identify the actual source/version and show the current copy still working. Explain one limit of this small recovery check.

## Evidence record

For each independent check, record: prior exposure; help/resources; expected result; actual result or execution pending; first mismatch; reason; separate corrected response; changed retry. Revisit a changed item after a gap within existing teaching/support time. An immediate successful retry alone does not establish durable mastery.

Teacher feedback is in the separate public teacher key; open it after preserving the relevant original attempt.
