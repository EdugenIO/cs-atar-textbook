const topicAliases = {
  'sql-basics': ['join', 'inner join', 'foreign key', 'select query'],
  'unit4-sql': ['join', 'left join', 'group by', 'aggregate'],
  'entities-relationships': ['foreign key', 'primary key', 'entity relationship diagram', 'erd'],
  'unit4-project': ['ACID', 'atomicity consistency isolation durability', 'transaction'],
  'unit4-ethics': ['APP11', 'APP 11', 'Australian Privacy Principle 11'],
  selection: ['if else', 'conditional', 'pseudocode'],
  design: ['algorithm', 'pseudocode', 'flowchart'],
  'unit3-network-models': ['OSI', 'TCP IP', 'protocol']
};

function normaliseSearch(value) {
  return String(value).normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim().replace(/\bapp\s+(\d+)\b/g, 'app$1');
}

function searchableText(html) {
  const holder = document.createElement('template');
  holder.innerHTML = html; // Authored textbook HTML only; never the search input.
  return holder.content.textContent || '';
}

function buildSearchIndex() {
  const entries = [];
  units.forEach(unit => unit.topics.forEach((title, index) => {
    const href = chapterRoute(unit, index);
    const id = href.slice(1);
    const chapter = chapters.find(item => item.id === id);
    const headings = chapter?.sections.map(([heading]) => heading) || [];
    const body = chapter
      ? [chapter.intro, ...chapter.objectives, ...chapter.sections.map(([, html]) => searchableText(html)), chapter.code || '', ...chapter.practice.map(([, question]) => question), chapter.task, chapter.recap].join(' ')
      : id === 'selection' ? searchableText(selection()) : '';
    entries.push({ title, href, label: `Unit ${unit.n}: ${title}`, headings, aliases: topicAliases[id] || [], body });
  }));
  Object.entries(terms).forEach(([term, definition]) => {
    entries.push({ title: term, href: '#glossary', label: `Glossary: ${term}`, headings: [], aliases: [], body: definition });
  });
  return entries;
}

function searchTextMatches(text, query) {
  const normalised = normaliseSearch(text);
  const words = normalised.split(' ');
  const queryWords = query.split(' ');
  // Keep phrases together: "foreign key" must not match unrelated distant words.
  return words.some((_, index) => queryWords.every((word, offset) => words[index + offset]?.startsWith(word)));
}

function findSearchResults(input, index) {
  const query = normaliseSearch(input);
  if (!query) return [];
  return index.map(entry => {
    const heading = entry.headings.find(text => searchTextMatches(text, query));
    const score = searchTextMatches(entry.title, query) ? 100
      : heading ? 70
      : entry.aliases.some(text => searchTextMatches(text, query)) ? 60
      : searchTextMatches(entry.body, query) ? 20 : 0;
    return { ...entry, score, matchedHeading: heading };
  }).filter(entry => entry.score).sort((a, b) => b.score - a.score || a.label.localeCompare(b.label));
}

const textbookSearchIndex = buildSearchIndex();
document.getElementById('search').addEventListener('input', event => {
  const results = document.getElementById('results');
  results.replaceChildren();
  const input = event.target.value.trim();
  if (!input) return;
  const matches = findSearchResults(input, textbookSearchIndex);
  const status = document.createElement('p');
  status.className = 'search-status';
  status.textContent = matches.length
    ? `${matches.length} result${matches.length === 1 ? '' : 's'}${matches.length > 12 ? '; showing the first 12' : ''}.`
    : 'No matching topic. Try a chapter title, heading or glossary term.';
  results.append(status);
  matches.slice(0, 12).forEach(match => {
    const link = document.createElement('a');
    link.href = match.href;
    link.textContent = match.label;
    if (match.matchedHeading) {
      const context = document.createElement('small');
      context.textContent = `Section: ${match.matchedHeading}`;
      link.append(context);
    }
    results.append(link);
  });
});
