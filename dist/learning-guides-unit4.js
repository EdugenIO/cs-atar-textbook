const unit4LearningGuides = {
  'unit4-design': {
    anchor: 'Write relational notation and key rules',
    title: 'The whole booking pair matters',
    lead: 'Suppose M01 and S02 each exist, but the only booking is (M01, S01). Compare what the two reference designs would check.',
    kind: 'cards',
    nodes: [
      {label: 'Separate parent references', detail: 'Attendance(M01, S02) can pass independent references to Member and Session: each ID exists. Those checks do not prove that the pair was booked.'},
      {label: 'Joint reference to Booking', detail: 'Attendance(M01, S02) fails a required composite reference because that exact Booking pair is missing.'},
      {label: 'Optional attendance', detail: 'Booking(M01, S01) may exist without Attendance. If an Attendance row exists, its pair must match Booking; its primary key permits at most one row for that pair.'}
    ],
    caption: 'This is a comparison of key rules, not an ER diagram. An existing member and an existing session do not establish an existing booking.',
    predict: 'If you add Booking(M01, S02), does the joint foreign key require you to create Attendance(M01, S02) immediately?',
    answer: 'No. The booking may have no attendance row. The foreign key checks any attendance row you choose to create; it does not require a child row for every booking.',
    retry: 'Change the pair to (M02, S01). Explain separately which parent IDs must exist and which exact Booking row must exist before its attendance can be recorded.'
  },
  'unit4-sql': {
    anchor: 'Calculate and concatenate with aliases',
    title: 'Calculate places at session grain',
    lead: 'Read one row per session. Count an actual booking key, then use that count in the calculations.',
    kind: 'trace',
    columns: ['Session', 'Capacity', 'Booking count', 'Remaining', 'FillPercent'],
    rows: [['S01', '2', '2', '2 − 2 = 0', '100.0'], ['S02', '3', '1', '3 − 1 = 2', '33.3'], ['S03', '2', '0', '2 − 0 = 2', '0.0']],
    caption: 'S03 stays in the report through LEFT JOIN. COUNT(b.MemberID) gives 0; COUNT(*) would count its placeholder. FillPercent uses real-valued division and is rounded to one decimal place.',
    predict: 'One new booking is added to S02. What should its Remaining and FillPercent become?',
    answer: 'S02 then has two bookings out of three places. Remaining is 3 − 2 = 1. FillPercent is ROUND(100.0 × 2 / 3, 1), giving 66.7.',
    retry: 'Describe how the result changes if S03 receives its first booking. Explain why a displayed percentage alone does not enforce capacity when requests arrive together.'
  },
  'unit4-project': {
    anchor: 'Use transactions to protect a booking',
    title: 'A failed two-step change rolls back',
    lead: 'In an illustrative operation, you try to book M03 into S02 and then record attendance. Both steps belong to one explicit transaction.',
    kind: 'flow',
    nodes: [
      {label: 'Start and check', detail: 'Start the write transaction. Confirm that M03/S02 is new and S02 has room: capacity 3, initially one booking.'},
      {label: 'Insert the booking', detail: 'Insert Booking(M03, S02) inside the transaction. It has not been committed yet.'},
      {label: 'Attendance fails', detail: 'The attempted attendance uses Present = 2. The stated 0-or-1 domain constraint rejects this statement.'},
      {label: 'Roll back explicitly', detail: 'The error handler rolls back the logical operation, including the earlier booking insert.'},
      {label: 'Check the state', detail: 'M03/S02 is absent again and the earlier bookings remain. A failed statement alone would not guarantee that outcome.'}
    ],
    caption: 'This illustrative flow needs one shared transaction. The supplied book() and set_attendance() functions each use their own transaction; calling them in sequence does not combine them. Atomicity alone does not prove crash durability or disk recovery.',
    predict: 'Why must you inspect Booking after the failed attendance insert, rather than checking only the error message?',
    answer: 'The message shows that attendance failed. You still need evidence that the earlier booking insert was undone and unrelated rows stayed unchanged. That checks the transaction boundary.',
    retry: 'Change the operation to a three-row import whose final insert fails. Explain which earlier inserts should remain after the agreed all-or-none rollback.'
  },
  'unit4-analysis': {
    anchor: 'Link a mitigation to its purpose and limit',
    title: 'From an observation to a bounded conclusion',
    lead: 'The server records an allowed export of 500 rows. Build an explanation without treating that record as a verdict.',
    kind: 'flow',
    nodes: [
      {label: 'Observe', detail: 'Record the timestamp, account/session label and reported 500-row result. Keep the original evidence.'},
      {label: 'Consider alternatives', detail: 'The export could be a legitimate staff task or involve compromised credentials. The log alone does not decide.'},
      {label: 'Seek distinguishing evidence', detail: 'Check role approval, confirm through an established user channel, and examine device/session and destination records.'},
      {label: 'Choose a matched action', detail: 'Use authorised response processes. Address credential risk and excessive export rights separately when the evidence supports them.'},
      {label: 'State the limit', detail: 'Report what is established and what remains unknown about the actor, purpose, recipients and harm.'}
    ],
    caption: 'A count describes a recorded event. It does not identify a human actor, prove malicious intent or establish legal breach eligibility.',
    predict: 'Would stronger authentication alone fix a policy that gives every learner all-record export rights?',
    answer: 'No. Stronger authentication helps establish who is using an account. The overly broad export permission is an authorisation problem and still needs to change.',
    retry: 'The same account records an attendance correction. Name one piece of evidence needed to judge factual accuracy and another needed to judge authorisation.'
  },
  'unit4-controls': {
    anchor: 'Evaluate detection and operational impact',
    title: 'Check the alert and the real activity',
    lead: 'Compare the actual activity with what a detection control reports. Both kinds of error matter.',
    kind: 'cards',
    nodes: [
      {label: 'True positive', detail: 'Harmful activity is correctly flagged. Follow the authorised response process and investigate scope.'},
      {label: 'False positive', detail: 'Legitimate activity is flagged as harmful. Blocking it can disrupt the required booking workflow.'},
      {label: 'False negative', detail: 'Harmful activity is missed. No alert does not prove that the activity was safe.'},
      {label: 'True negative', detail: 'Legitimate activity is correctly left unflagged. Check required workflows as well as prohibited cases.'}
    ],
    caption: 'These terms describe detection results. An IPS may also block traffic; check its actual action, rule placement and effect rather than assuming every alert blocks.',
    predict: 'A new IPS rule blocks the legitimate booking page. Why is disabling every rule a weak repair?',
    answer: 'It may restore the page while removing other protections. Corroborate the legitimate workflow, identify the cause and use focused tuning or an appropriate narrow exception, then retest both required and prohibited activity.',
    retry: 'Give one test for a genuine prohibited request and one for a legitimate request after your proposed repair. Explain what each result can and cannot establish.'
  },
  'unit4-crypto': {
    anchor: 'Trace a simplified TLS 1.3 connection',
    title: 'Different jobs in one protected connection',
    lead: 'Follow how a browser and server agree temporary keys and check the server’s identity. This simplified TLS 1.3 example uses ephemeral, or temporary, key agreement.',
    kind: 'flow',
    nodes: [
      {label: 'Exchange choices and shares', detail: 'The browser offers supported settings and public key-agreement information, called a key share. The server chooses settings and sends its share.'},
      {label: 'Derive handshake secrets', detail: 'Each side calculates secret material from the key agreement. These derived secrets are not sent directly across the network.'},
      {label: 'Authenticate the server', detail: 'The browser checks the certificate’s trusted name/key link and the server’s handshake signature. The signature proves that the server can use its private key.'},
      {label: 'Finish the handshake', detail: 'Handshake checks confirm the negotiated exchange before ordinary application traffic in this simplified flow.'},
      {label: 'Protect application records', detail: 'Derived symmetric traffic keys provide authenticated encryption for the application records.'}
    ],
    caption: 'This omits resumption, optional client certificates and early data. TLS 1.3 does not transport a session key by encrypting it with the server RSA public key.',
    predict: 'Which step gives a logged-in learner permission to export every booking record?',
    answer: 'None. This flow authenticates and protects the configured connection. Application authorisation must separately check the authenticated user, requested action and record scope.',
    retry: 'Explain what could still go wrong if the connection is protected but the receiving device is infected. Identify where readable data may exist.'
  },
  'unit4-ethics': {
    anchor: 'Turn APP 11 into design evidence',
    title: 'Protection and retention need evidence',
    lead: 'Assume the fictional provider is an APP entity. Use these questions to turn APP 11 reasoning into checks.',
    kind: 'cards',
    nodes: [
      {label: 'Protect held information', detail: 'Match reasonable protective steps to the data sensitivity, access, system design and risk. Test the relevant permissions and workflow.'},
      {label: 'Check ongoing need', detail: 'Ask why the information is still required. Consider authorised retention schedules, legal record requirements and evidence holds.'},
      {label: 'Handle copies deliberately', detail: 'Examine backup handling before destruction or de-identification decisions. Removing one live row does not remove every copy.'},
      {label: 'Explain the evidence', detail: 'A written policy or HTTPS padlock alone does not demonstrate effective protection. State what the check shows and what remains uncertain.'}
    ],
    caption: 'APP 11 has conditions and exceptions. Establish entity coverage first; these federal assumptions do not automatically apply to a WA public school.',
    predict: 'A classroom project has ended. Does that fact alone justify deleting all of its records and backups?',
    answer: 'No. Check the authorised purpose and retention requirements, legal obligations, evidence holds and backup handling. A project end date alone does not settle whether destruction or de-identification is required or allowed.',
    retry: 'Compare an unneeded duplicate working copy with an official record that must be retained. Explain which facts you would establish before acting on each.'
  },
  'unit4-review': {
    anchor: 'Predict reports before running SQL',
    title: 'Distinct values are not distinct sessions',
    lead: 'Use the review seed. Compare the entity you want to sum with the rows produced by joining bookings.',
    kind: 'trace',
    columns: ['Workshop', 'One capacity per session', 'Capacity after joining bookings', 'SUM(DISTINCT Capacity)'],
    rows: [
      ['W01', '3 + 2 = 5', '3 + 3 + 3 + 2 = 11', '3 + 2 = 5: correct here by coincidence'],
      ['W02', '2 + 2 = 4', '2 + 2 + 2 = 6', '2: wrong because both sessions have the same capacity']
    ],
    caption: 'For scheduled capacity, sum at session grain. DISTINCT removes repeated numeric values; it does not recognise which session each value belongs to.',
    predict: 'Why does the W01 result fail to prove that SUM(DISTINCT Capacity) is a reliable repair?',
    answer: 'W01 happens to have different session capacities, so removing repeated values gives its correct total. W02 exposes the flaw: two different sessions both have capacity 2 and both must contribute.',
    retry: 'Imagine three different sessions with capacities 2, 2 and 3. Calculate the correct scheduled capacity and SUM(DISTINCT Capacity), then explain the difference.'
  },
  'unit4-consolidation': {
    anchor: 'Repair Python structures and algorithm reasoning',
    title: 'A repeated row reference shares the change',
    lead: 'Compare a grid made by repeating one inner list with a grid made from two independent inner lists.',
    kind: 'trace',
    columns: ['Construction', 'Before the change', 'After grid[0][1] = 7', 'Reason'],
    rows: [
      ['Repeated inner reference: [[0]*2]*2', '[[0, 0], [0, 0]]', '[[0, 7], [0, 7]]', 'Both outer entries refer to the same inner list.'],
      ['Independent inner lists', '[[0, 0], [0, 0]]', '[[0, 7], [0, 0]]', 'Only the first inner list is changed.']
    ],
    caption: 'Equal-looking rows do not tell you whether they are the same object. Trace references as well as displayed values.',
    predict: 'With the repeated-reference version, what happens next if you set grid[1][0] = 3?',
    answer: 'Both displayed rows become [3, 7], so the grid is [[3, 7], [3, 7]]. grid[1] and grid[0] still refer to the same inner list.',
    retry: 'Start again with independent inner lists, make those same two assignments, and explain why the result is [[0, 7], [3, 0]].'
  },
  'unit4-exam': {
    anchor: 'Read the command and use the stimulus',
    title: 'Connect the command to the supplied facts',
    lead: 'Use a small SQL prompt: explain why an all-session report should count a booking key after LEFT JOIN.',
    kind: 'flow',
    nodes: [
      {label: 'Read the command', detail: 'Explain asks for how or why. Naming LEFT JOIN alone does not complete the response.'},
      {label: 'Find the relevant fact', detail: 'The source includes a session with no bookings. The requirement still includes that session.'},
      {label: 'Trace the mechanism', detail: 'LEFT JOIN preserves a row with NULL booking fields. COUNT(*) counts that row; COUNT(b.MemberID) ignores the NULL.'},
      {label: 'Connect to the requirement', detail: 'Counting the booking key reports 0 bookings for the preserved session, which matches the all-session requirement.'},
      {label: 'Check your explanation', detail: 'Use the actual source and requested scope. Do not add an unsupported claim that the query enforces booking capacity.'}
    ],
    caption: 'An explanation joins a relevant fact to a mechanism and its effect. Use this ungraded example to practise explaining the mechanism.',
    predict: 'If the command changed from explain to identify, how would the expected response differ?',
    answer: 'Identify asks you to name the relevant point, such as counting a non-null booking key. Explain also needs the reason: the preserved outer-join row has NULL child fields, so COUNT(*) would incorrectly give one.',
    retry: 'Change the source to resources with no loans. Explain the same counting issue using Resource and LoanID rather than copying the session wording.'
  }
};
