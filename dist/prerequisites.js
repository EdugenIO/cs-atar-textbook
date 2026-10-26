// Learning guidance only: these links never lock a chapter or record progress.
const lessonPreparation = {
  start: ['Have a Python editor ready. This chapter introduces the first programming steps.', []],
  values: ['Be able to run a program and recognise input and output.', ['start']],
  representation: ['Recognise integers and text, and use basic arithmetic.', ['values']],
  selection: ['Read variables and convert numeric input.', ['values']],
  loops: ['Follow a condition and trace changes to a variable.', ['selection']],
  functions: ['Follow selection and repetition in a short program.', ['selection','loops']],
  arrays: ['Use a loop and a running total.', ['loops']],
  files: ['Trace a loop and convert input to an integer.', ['loops','values']],
  design: ['Write functions, process lists and read or save text records.', ['functions','arrays','files']],
  'software-responsibility': ['Recognise source code and explain what you have written or reused.', ['design']],
  networks: ['No earlier networking lesson is required. The key network terms are introduced here.', []],
  addressing: ['Explain the jobs of the network layers.', ['networks']],
  'network-design': ['Distinguish local and routed traffic, device roles and connection media.', ['addressing']],
  'network-review': ['Explain addressing, security controls and possible bottlenecks.', ['network-design']],
  consolidation: ['Review the programming and network skills you want to practice.', ['arrays','files','network-review']],
  'exam-preparation': ['Use the consolidation activities to choose areas for revision.', ['consolidation']],
  'database-foundations': ['No earlier database lesson is required. Use the supplied fictional records.', []],
  'entities-relationships': ['Distinguish a table, a record and a field.', ['database-foundations']],
  normalisation: ['Identify primary keys, foreign keys and relationships.', ['entities-relationships']],
  'sql-basics': ['Read related tables and recognise their identifiers.', ['entities-relationships']],
  'database-solution': ['Write SELECT queries and explain table keys and dependencies.', ['sql-basics','normalisation']],
  'security-threats': ['Recognise the equipment-desk records and use a separate database copy for recovery practice.', ['database-foundations','database-solution']],
  'responsible-data': ['Explain confidentiality, integrity, availability and access permissions.', ['security-threats']],
  'unit2-review': ['Review database queries, protective controls and responsible data use.', ['database-solution','security-threats','responsible-data']],
  'unit2-consolidation': ['Use the integrated review to identify a skill to revisit.', ['unit2-review']],
  'unit2-exam': ['Choose revision priorities and compare your work with explained answers.', ['unit2-consolidation']],
  'unit3-fluency': ['Revisit functions, list traversal and text-file processing.', ['functions','arrays','files']],
  'unit3-structures': ['Use lists and functions, and trace changes to stored values.', ['arrays','functions']],
  'unit3-search': ['Use list indices, loops and functions with returned results.', ['arrays','functions']],
  'unit3-sort': ['Trace list indices, comparisons and repeated updates.', ['arrays','loops']],
  'unit3-objects': ['Use functions and distinguish stored data from operations on it.', ['functions','unit3-structures']],
  'unit3-inheritance': ['Explain instances, attributes, methods and their contracts.', ['unit3-objects']],
  'unit3-project': ['Combine design, reliable input and object-oriented programming.', ['design','files','unit3-inheritance']],
  'unit3-reliability': ['Read the software-project requirements and test expectations.', ['unit3-project']],
  'unit3-network-models': ['Explain basic protocol layers, addresses and device roles.', ['networks','addressing']],
  'unit3-addressing': ['Use binary place values and explain an IPv4 address and mask.', ['representation','addressing']],
  'unit3-secure-networks': ['Trace network traffic and calculate subnet requirements.', ['unit3-network-models','unit3-addressing']],
  'unit3-review': ['Revisit object design, algorithm traces and network decisions.', ['unit3-inheritance','unit3-sort','unit3-secure-networks']],
  'unit3-consolidation': ['Use the review to identify what needs more practice.', ['unit3-review']],
  'unit3-exam': ['Choose and practice the skills identified during consolidation.', ['unit3-consolidation']],
  'unit4-design': ['Read relationships and keys, and explain normalisation decisions.', ['entities-relationships','normalisation']],
  'unit4-sql': ['Read the workshop model and write joined and grouped reports.', ['unit4-design','database-solution']],
  'unit4-project': ['Interpret the workshop design and predict SQL report results.', ['unit4-design','unit4-sql']],
  'unit4-analysis': ['Distinguish threats, weaknesses, CIA goals and AAA functions.', ['security-threats']],
  'unit4-controls': ['Separate observations from hypotheses and explain the risk being addressed.', ['unit4-analysis']],
  'unit4-crypto': ['Recognise basic encryption roles and the limits of network controls.', ['security-threats','unit4-controls']],
  'unit4-ethics': ['Explain responsible data use and evidence-based security analysis.', ['responsible-data','unit4-analysis']],
  'unit4-review': ['Revisit design, queries, protective controls and cryptography.', ['unit4-sql','unit4-controls','unit4-crypto']],
  'unit4-consolidation': ['Use both Year 12 unit reviews to identify revision priorities.', ['unit3-review','unit4-review']],
  'unit4-exam': ['Practice the priorities identified during full-course consolidation.', ['unit4-consolidation']]
};

function renderLessonPreparation(id) {
  const entry = lessonPreparation[id];
  if (!entry) return '';
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const links = entry[1].map(route => {
    const title = route === 'selection' ? 'Making decisions with selection' : chapters.find(ch => ch.id === route)?.title;
    return title ? `<a href="#${escape(route)}">${escape(title)}</a>` : '';
  }).filter(Boolean);
  return `<div class="notice lesson-preparation" role="note" aria-label="Before you start"><p><strong>Before you start:</strong> ${escape(entry[0])}</p>${links.length ? `<p>Revisit if needed: ${links.join(' · ')}.</p>` : ''}</div>`;
}
