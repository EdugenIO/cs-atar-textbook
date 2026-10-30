# Year 12 Pygame project · teacher delivery notes

A01 alignment, 30 October 2026. Use 12 workshops with phase allocation: 1 investigate, 2 design, 6 build/integrate, 2 test/acceptance, 1 evaluate/handover.

Before issue, teach the Pygame event/draw/timing loop, Rect collisions and the provided shell in existing lessons. Core programming prerequisites come from the textbook. If that preparation is missing, re-plan class time before release; do not add mandatory home development.

A02 preparation resources are available at https://edugenio.github.io/cs-atar-textbook/pygame/. Actual learner readiness, A03 classroom trial/moderation and A06 replacement project slides remain pending. Do not infer those are complete from this document alignment.

## Run a coherent delivery path

1. Adopt the school conditions and common year-level contract/marking guide before issue. Do not change challenge by theme.
2. Select one of the five supplied starter ZIPs; inspect the README, configuration, fixtures, unfinished student interfaces and display shell. Keep the relative folder structure.
3. Use the aligned workbook and milestone/test CSVs. Model how to obtain evidence on an unrelated tiny example; do not complete assessed interfaces for students.
4. Follow the existing project slots; use the first investigation/design checkpoints to check scope and expected tests, then build in slices.
5. Authenticate individual decisions with explanations, version evidence and fresh changes according to school conditions. Peer acceptance is evidence for the same project, not another weighted task.
6. Use the full shared marking guide. Primitive shapes and permitted AI decorative assets have equal standing; media sophistication earns no marks.
7. Record real failures/limits and evaluate every FR/NFR. A static shell launch does not prove an implemented game or a feasible classroom workload.

## Expected state examples, not a completed reference game

- A collected item does not score again; restarting restores the original objects.
- Paused wall-clock time does not consume active-play time.
- A hit during the 1000 ms protection window does not remove another life.
- At zero time plus exit completion, loss takes precedence.
- Map 1 completion carries score/lives into map 2 with a fresh 90 seconds; final completion wins unless a loss condition is present. Sort retains duplicate scores and reports at most ten valid history entries.

Use the canonical acceptance CSV for all remaining checks. Source/asset policies and marking criteria are bundled unchanged. The legacy console packs and slides are explicitly separate optional practice.
