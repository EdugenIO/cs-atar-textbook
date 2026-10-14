import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const context = vm.createContext({});
const source = fs.readFileSync(new URL('../dist/search.js', import.meta.url), 'utf8');
vm.runInContext(source.split('const textbookSearchIndex =')[0], context);
const index = [
  { title: 'SQL reports', label: 'SQL reports', href: '#unit4-sql', headings: ['Join four tables'], aliases: ['left join'], body: 'Select a foreign key.' },
  { title: 'JOIN reference', label: 'JOIN reference', href: '#reference', headings: [], aliases: [], body: '' },
  { title: 'Privacy', label: 'Privacy', href: '#unit4-ethics', headings: ['Turn APP 11 into design evidence'], aliases: [], body: '' },
  { title: 'Unrelated', label: 'Unrelated', href: '#other', headings: [], aliases: [], body: 'Foreign material and a keyboard. Application 11.' }
];
context.index = index;
const find = query => { context.query = query; return vm.runInContext('findSearchResults(query, index)', context); };
assert.equal(find('JOIN')[0].href, '#reference', 'Title matches rank before heading matches');
assert.equal(find('JOIN')[1].matchedHeading, 'Join four tables');
assert.equal(find('foreign key').length, 1, 'Phrase matching excludes distant/unrelated words');
assert.equal(find('foreign key')[0].href, '#unit4-sql');
assert.equal(find('APP11').length, 1);
assert.equal(find('APP 11')[0].href, find('APP11')[0].href);
assert.equal(find('  sQl REPORTS  ')[0].href, '#unit4-sql');
assert.equal(find('LEFT_JOIN')[0].href, '#unit4-sql');
assert.equal(find('').length, 0);
assert.equal(find('!!!').length, 0);
assert.equal(find('<img src=x onerror=alert(1)>').length, 0);
console.log('Search title ranking, section matches, aliases, phrase boundaries and empty input passed.');
