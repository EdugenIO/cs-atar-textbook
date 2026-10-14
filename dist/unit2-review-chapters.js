chapters.push({
  "id": "unit2-review",
  "unit": 2,
  "week": "13–14",
  "title": "Unit 2 integrated review",
  "badge": "REVIEW / PRACTICE",
  "intro": "Repair data-quality and modelling gaps, then connect SQL, security and privacy in a new desk audit.",
  "objectives": [
    "Diagnose a gap using actual evidence.",
    "Apply concepts to changed requirements and data.",
    "Explain corrections and verify a fresh attempt."
  ],
  "sections": [
    [
      "Data-quality clinic",
      "<p>Currency asks whether evidence is current; authenticity whether its source is genuine; relevance whether the fact serves the purpose; accuracy whether it matches reality; outlier checks investigate unusual values. A rare/extreme value is not automatically an error. Preserve the source and document authorised corrections.</p><p>Task A in the workbook supplies an old status, a valid but wrong date, an unverified message, unrelated health notes and an extreme cost. Explain a verification action and justified outcome for each.</p>"
    ],
    [
      "Read a six-table extension",
      "<figure class=\"model-figure\"><div class=\"diagram-scroll\" tabindex=\"0\"><img src=\"unit2-six-table-model.svg\" alt=\"Six conceptual tables: Category and Supplier link to Equipment; Borrower and Equipment link to Loan; Equipment links to Inspection. Each parent has zero or many children; each child exactly one parent.\"></div><figcaption>Original conceptual extension. Supplier and Inspection are not in the SQLite project starter.</figcaption></figure><p>Read each connection in both directions, locate the PKs/FKs and trace a loan to Category and Supplier. Then reread the earlier four-table diagram. Compare notation with the support booklet before drawing your own.</p>"
    ],
    [
      "Create and reconcile a fresh model",
      "<p>Model Member, Activity, Leader and Participation under the workbook rules. Resolve Member–Activity history using the three-part participation key and document the fields. Compare this with a separate optional one-to-one locker allocation: a foreign key needs an appropriate uniqueness rule to constrain one-to-one.</p><p>Check the conceptual dictionary against actual starter SQL. CategoryName is not UNIQUE, TEXT alone does not enforce specified lengths/identifier patterns, and Returned has no DEFAULT despite the earlier conceptual rule. Record intended versus implemented behaviour; justify enforcement or revised documentation. Dates/overlapping loans still need separate checks.</p>"
    ],
    [
      "Integrate and explain",
      "<p><a href=\"unit2-review-workbook.md\" download>Eight-lesson workbook</a> · <a href=\"unit2-review-answers.md\" download>Explained checkpoints</a> · <a href=\"unit2-six-table-model.svg\" download>Six-table diagram</a></p><p>Use the project data and security/privacy scenarios to explain a report, an access weakness and a disclosure decision. This is review, not another major project. For week 14 controlled theory practice, use selected practice-paper questions with appropriate conditions and explained feedback.</p>"
    ]
  ],
  "practice": [
    [
      "Explain",
      "Does a mapped audit topic prove that you have mastered it?",
      "No. Mapping shows draft explanation and practice, not your independent performance."
    ],
    [
      "Distinguish",
      "Can a valid-looking record still be wrong?",
      "Yes. Format/range checks and factual accuracy are different. Verify against suitable evidence."
    ]
  ],
  "task": "Complete the linked activity independently, record evidence of errors, explain corrections and retest with a changed example.",
  "solution": "Use the linked separate checkpoints/marking guide after attempting the task. Verify original data assumptions and distinguish proposed controls from actual evidence.",
  "recap": "Use evidence to diagnose, correct and retest. Topic familiarity is not a substitute for independent modelling, query writing and justified security decisions.",
  "lessons": [
    "13.1 quality checks; 13.2 six-table interpretation; 13.3 fresh four-table creation; 13.4 schema/dictionary comparison.",
    "14.1 SQL transfer; 14.2 security/privacy audit; 14.3 controlled theory practice; 14.4 correction and feedback. Eight lessons total."
  ],
  "reference": "https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0020/1232507/Computer-Science-ATAR-Year-11-Syllabus-for-teaching-from-2026.PDF",
  "refTitle": "2026 SCSA Year 11 syllabus",
  "quiz": {
    "q": "An unusually high estimate appears in an import. What is the justified first action?",
    "options": [
      "Delete it because it is unusual",
      "Verify it against source/context and record the decision",
      "Accept it because it is numeric"
    ],
    "answer": 1,
    "explanation": "Outliers need investigation; neither unusualness nor valid format establishes truth."
  }
});
chapters.push({
  "id": "unit2-consolidation",
  "unit": 2,
  "week": 15,
  "title": "Unit 2 consolidation",
  "badge": "REVIEW / PRACTICE",
  "intro": "Use diagnosis, targeted stations and unfamiliar transfer to choose what to practise next.",
  "objectives": [
    "Diagnose a gap using actual evidence.",
    "Apply concepts to changed requirements and data.",
    "Explain corrections and verify a fresh attempt."
  ],
  "sections": [
    [
      "Diagnose without the answer key",
      "<p>Explain a key/reference, 2NF versus 3NF, an inner join, CIA/AAA, authentication factors, a cipher and a privacy/testing boundary. Record the weakest explanations rather than only a total score.</p>"
    ],
    [
      "Work through targeted stations",
      "<p>Choose two weak stations: model/normalise a fresh club case; query the project with a row-count trap and rollback; justify a security control/limit; trace a cipher and data-quality/privacy decision. Use the linked earlier workbooks, then explain your corrections.</p>"
    ],
    [
      "Retest with changed circumstances",
      "<p>An unused borrower disappears from an inner join; two cameras share a description; a returned loan has an early due date; a valid date is wrong; a suspicious message has not been clicked. Explain each before changing the model/query or making an incident claim.</p><p><a href=\"unit2-consolidation-workbook.md\" download>Consolidation workbook and revision log instructions</a> · <a href=\"#unit2-coverage\">Coverage map</a></p>"
    ]
  ],
  "practice": [
    [
      "Explain",
      "Does a mapped audit topic prove that you have mastered it?",
      "No. Mapping shows draft explanation and practice, not your independent performance."
    ],
    [
      "Distinguish",
      "Can a valid-looking record still be wrong?",
      "Yes. Format/range checks and factual accuracy are different. Verify against suitable evidence."
    ]
  ],
  "task": "Complete the linked activity independently, record evidence of errors, explain corrections and retest with a changed example.",
  "solution": "Use the linked separate checkpoints/marking guide after attempting the task. Verify original data assumptions and distinguish proposed controls from actual evidence.",
  "recap": "Use evidence to diagnose, correct and retest. Topic familiarity is not a substitute for independent modelling, query writing and justified security decisions.",
  "lessons": [
    "Lesson 1: independent diagnosis and priority selection.",
    "Lesson 2: two targeted stations with corrections.",
    "Lesson 3: unfamiliar transfer and fresh retest.",
    "Lesson 4: evidence-based revision plan and teacher feedback."
  ],
  "reference": "https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0020/1232507/Computer-Science-ATAR-Year-11-Syllabus-for-teaching-from-2026.PDF",
  "refTitle": "2026 SCSA Year 11 syllabus",
  "quiz": {
    "q": "What gives stronger evidence that a misconception was repaired?",
    "options": [
      "Rereading the answer",
      "Correctly explaining a fresh changed example",
      "Recognising the topic title"
    ],
    "answer": 1,
    "explanation": "Transfer to a changed example tests independent understanding."
  }
});
chapters.push({
  "id": "unit2-exam",
  "unit": 2,
  "week": 16,
  "title": "Unit 2 exam preparation",
  "badge": "REVIEW / PRACTICE",
  "intro": "Attempt an original sampled paper, mark the reasoning and repair gaps before the exam block.",
  "objectives": [
    "Diagnose a gap using actual evidence.",
    "Apply concepts to changed requirements and data.",
    "Explain corrections and verify a fresh attempt."
  ],
  "sections": [
    [
      "Use the original 64-mark paper",
      "<p><a class=\"button\" href=\"unit2-practice-paper.md\" download>Download student paper</a> <a class=\"button secondary\" href=\"unit2-practice-marking-guide.md\" download>Separate marking guide</a></p><p>Sixteen questions, four marks each. Suggested 80-minute attempt, or two 40-minute halves over two lessons. This is formative practice, not an official exam, prescribed duration or assessment weighting. Each question begins with unchanged project data.</p>"
    ],
    [
      "Bring the specified stimulus",
      "<p>Use the schema, loan rows and fictional costs included in the paper. Q4 uses the separate six-table conceptual diagram; do not assume those extension tables exist in the starter. SQL values use Returned 0/1 and supplied YYYY-MM-DD dates.</p><p><a href=\"unit2-six-table-model.svg\" download>Diagram for Q4</a> · <a href=\"database-project.sqlite\" download>Project database for checking after the attempt</a></p>"
    ],
    [
      "Mark, correct and explain limits",
      "<p>Compare against the separate guide after attempting. Accept equivalent accurate queries and justified explanations; do not double-count points. Rewrite weak answers with the rule and evidence, then test a changed example.</p><p>The paper samples theory and written SQL; independent ER creation, practical implementation, tests and recovery require separate evidence. Weeks 17–18 remain the blocked exam period, with no new teaching or project deadlines.</p>"
    ]
  ],
  "practice": [
    [
      "Explain",
      "Does a mapped audit topic prove that you have mastered it?",
      "No. Mapping shows draft explanation and practice, not your independent performance."
    ],
    [
      "Distinguish",
      "Can a valid-looking record still be wrong?",
      "Yes. Format/range checks and factual accuracy are different. Verify against suitable evidence."
    ]
  ],
  "task": "Complete the linked activity independently, record evidence of errors, explain corrections and retest with a changed example.",
  "solution": "Use the linked separate checkpoints/marking guide after attempting the task. Verify original data assumptions and distinguish proposed controls from actual evidence.",
  "recap": "Use evidence to diagnose, correct and retest. Topic familiarity is not a substitute for independent modelling, query writing and justified security decisions.",
  "lessons": [
    "Lesson 1: Q1–8, up to 40 minutes plus setup/collection.",
    "Lesson 2: Q9–16, up to 40 minutes plus setup/collection.",
    "Lesson 3: mark with explanations and classify gaps.",
    "Lesson 4: targeted repair, fresh transfer and readiness check."
  ],
  "reference": "https://senior-secondary.scsa.wa.edu.au/__data/assets/pdf_file/0020/1232507/Computer-Science-ATAR-Year-11-Syllabus-for-teaching-from-2026.PDF",
  "refTitle": "2026 SCSA Year 11 syllabus",
  "quiz": {
    "q": "When answering Q9 after Q6, which data state should you assume?",
    "options": [
      "The original starter specified in the paper",
      "All prior answers changed the data",
      "No data is needed"
    ],
    "answer": 0,
    "explanation": "Each question uses original data independently unless its own wording specifies a change."
  }
});