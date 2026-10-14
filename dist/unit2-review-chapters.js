chapters.push({
  "id": "unit2-review",
  "unit": 2,
  "week": "13–14",
  "title": "Unit 2 integrated review",
  "badge": "REVIEW / PRACTICE",
  "intro": "Bring the Unit 2 ideas together in a fresh equipment-desk example. You will check data quality, read a larger model and compare a planned design with what the database actually enforces.",
  "objectives": [
    "Diagnose a gap using actual evidence.",
    "Apply concepts to changed requirements and data.",
    "Explain corrections and verify a fresh attempt."
  ],
  "sections": [
    [
      "Data-quality clinic",
      "<p>Before changing a suspicious value, decide what needs checking:</p><ul><li><strong>Currency:</strong> is the evidence up to date?</li><li><strong>Authenticity:</strong> is its source genuine?</li><li><strong>Relevance:</strong> does it serve the purpose?</li><li><strong>Accuracy:</strong> does it match reality?</li><li><strong>Outliers:</strong> does an unusual value need investigation?</li></ul><p>An extreme value may be correct. Preserve the source and record any authorised correction rather than deleting it just because it looks unusual.</p><p>Task A in the workbook supplies an old status, a valid but wrong date, an unverified message, unrelated health notes and an extreme cost. Explain a verification action and justified outcome for each.</p>"
    ],
    [
      "Read a six-table extension",
      "<figure class=\"model-figure\"><div class=\"diagram-scroll\" tabindex=\"0\"><img src=\"unit2-six-table-model.svg\" alt=\"Six conceptual tables: Category and Supplier link to Equipment; Borrower and Equipment link to Loan; Equipment links to Inspection. Each parent has zero or many children; each child exactly one parent.\"></div><figcaption>Original conceptual extension. Supplier and Inspection are not in the SQLite project starter.</figcaption></figure><p>Work through the diagram in a fixed order:</p><ol><li>Locate the primary keys (PKs) and foreign keys (FKs).</li><li>Read each relationship in both directions, including its minimum and maximum participation.</li><li>Start at a Loan record and follow its references through Equipment to Category and Supplier.</li><li>Compare it with the earlier four-table diagram. Identify which two tables are new.</li></ol><p>Check the support booklet’s notation before drawing your own model.</p>"
    ],
    [
      "Create and reconcile a fresh model",
      "<p>Model Member, Activity, Leader and Participation under the workbook rules. Resolve Member–Activity history using the three-part participation key and document the fields. Compare this with a separate optional one-to-one locker allocation: a foreign key needs an appropriate uniqueness rule to constrain one-to-one.</p><p>Now compare your conceptual data dictionary with the actual starter SQL. Look for these differences:</p><ul><li>CategoryName is not UNIQUE.</li><li>TEXT alone does not enforce the specified lengths or identifier patterns.</li><li>Returned has no DEFAULT, despite the earlier conceptual rule.</li></ul><p>For each difference, record the intended rule and what the code actually enforces. Then justify a constraint or a change to the documentation. Calendar dates and overlapping loans still need separate checks.</p>"
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
  "recap": "Use the review to find specific gaps. Check data against suitable evidence, read each relationship in both directions and compare design rules with actual constraints. Explain a correction, then try a changed example to check that you understand it.",
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
  "intro": "Choose what you need to practise by trying a short explanation first. Then use focused activities and new examples to strengthen the ideas you find hardest.",
  "objectives": [
    "Diagnose a gap using actual evidence.",
    "Apply concepts to changed requirements and data.",
    "Explain corrections and verify a fresh attempt."
  ],
  "sections": [
    [
      "Diagnose without the answer key",
      "<p>Without checking the answers, explain a key and its reference, 2NF versus 3NF, an inner join, CIA and AAA, authentication factors, a cipher, and a privacy or testing boundary.</p><p>Notice where you hesitate or rely on a label without explaining it. Write a precise question, such as “Why does an inner join leave out a borrower with no loans?” That question helps you choose useful practice.</p>"
    ],
    [
      "Work through targeted stations",
      "<p>Choose two stations that match the gaps you identified:</p><ul><li><strong>Modelling:</strong> normalise a fresh club register.</li><li><strong>SQL:</strong> find a row-count trap and practise a controlled change with rollback.</li><li><strong>Security:</strong> explain a control and a situation it does not cover.</li><li><strong>Ciphers and responsible data:</strong> trace a cipher, then explain a data-quality or privacy decision.</li></ul><p>Use the earlier workbooks. Afterwards, explain what you corrected and why the new answer works.</p>"
    ],
    [
      "Retest with changed circumstances",
      "<p>Try a new example before deciding that a gap is fixed. Explain each situation:</p><ul><li>A borrower with no loans is omitted from an inner-join loan report.</li><li>Two cameras share a description.</li><li>A returned loan has an early due date.</li><li>A valid-looking date is factually wrong.</li><li>A suspicious message has not been clicked.</li></ul><p>Identify the relevant rule or evidence before changing the model or query, or claiming that an incident occurred.</p><p><a href=\"unit2-consolidation-workbook.md\" download>Consolidation workbook and revision log instructions</a> · <a href=\"#unit2-coverage\">Coverage map</a></p>"
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
  "recap": "Find a specific gap, choose practice that addresses it and explain your correction. Then try a new example with different conditions. Recognising a topic is useful, but explaining why an answer works gives stronger evidence of understanding.",
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
      "Correctly explaining a new example with changed conditions",
      "Recognising the topic title"
    ],
    "answer": 1,
    "explanation": "Applying the idea to a new example with changed conditions checks independent understanding."
  }
});
chapters.push({
  "id": "unit2-exam",
  "unit": 2,
  "week": 16,
  "title": "Unit 2 exam preparation",
  "badge": "REVIEW / PRACTICE",
  "intro": "Use an original practice paper to find what you can explain independently. Compare your reasoning with the guide, revisit unclear ideas and try a changed example.",
  "objectives": [
    "Diagnose a gap using actual evidence.",
    "Apply concepts to changed requirements and data.",
    "Explain corrections and verify a fresh attempt."
  ],
  "sections": [
    [
      "Use the original 64-mark paper",
      "<p><a class=\"button\" href=\"unit2-practice-paper.md\" download>Download student paper</a> <a class=\"button secondary\" href=\"unit2-practice-marking-guide.md\" download>Separate marking guide</a></p><p>The paper has sixteen questions worth four marks each. You can try it in 80 minutes or split it into two 40-minute halves over two lessons.</p><p>Use it as optional practice. It is not an official exam, a prescribed duration or an assessment weighting. Every question starts with the original project data, so a change in one answer does not carry into the next question.</p>"
    ],
    [
      "Bring the specified stimulus",
      "<p>Keep the supplied schema, loan rows and fictional costs beside you. In the SQL data, Returned uses 0/1 and dates use YYYY-MM-DD.</p><p>For Q4, use the separate six-table conceptual diagram. Supplier and Inspection are part of that diagram, but they are not tables in the project starter. Read the question’s supplied model before choosing which tables to discuss.</p><p><a href=\"unit2-six-table-model.svg\" download>Diagram for Q4</a> · <a href=\"database-project.sqlite\" download>Project database for checking after the attempt</a></p>"
    ],
    [
      "Mark, correct and explain limits",
      "<p>After you try a question, use the separate guide to check your reasoning:</p><ol><li>Compare the rule, query or explanation, allowing equivalent accurate answers.</li><li>Identify what was missing or incorrect. Do not count the same point twice.</li><li>Rewrite the answer using the rule and the evidence.</li><li>Try an example with changed data to see whether the correction transfers.</li></ol><p>The paper samples theory and written SQL; independent ER creation, practical implementation, tests and recovery require separate evidence. The suggested teaching sequence reserves weeks 17–18 for the school’s exam period; it adds no new teaching or project deadlines.</p>"
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
  "recap": "Start each question from the supplied original data. Use the guide after trying an answer, explain the correction and apply it to a changed example. Written questions sample your understanding; they do not replace hands-on modelling, database creation, testing or recovery practice.",
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