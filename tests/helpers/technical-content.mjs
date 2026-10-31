import fs from 'node:fs';import vm from 'node:vm';
const c=vm.createContext({});
for(const f of ['app','chapters','project-chapter','network-chapters','audit-chapters','unit2-chapters','unit2-review-chapters','unit3-chapters','unit4-chapters','unit4-er-interpretation','unit4-data-quality','practice/questions'])vm.runInContext(fs.readFileSync(new URL('../../dist/'+f+'.js',import.meta.url),'utf8'),c);
process.stdout.write(vm.runInContext('JSON.stringify({chapters,practiceSets})',c));
