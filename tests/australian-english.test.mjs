import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
const root=path.resolve(import.meta.dirname,'..');
const files=dir=>fs.readdirSync(path.join(root,dir),{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(dir+'/'+e.name):/\.(json|md)$/.test(e.name)?[dir+'/'+e.name]:[]);
const prose=text=>text.replace(/```[\s\S]*?```/g,'').replace(/`[^`]*`/g,'').replace(/https?:\/\/[^\s"'<>]+/g,'').replace(/(?:href|src)=["'][^"']*["']/g,'');
for(const name of [...files('teaching-source'),...files('curriculum-source'),...files('activity-source')]){
 const text=prose(fs.readFileSync(path.join(root,name),'utf8'));
 assert.ok(!/\bpractis(?:e|es|ed|ing)\b/i.test(text),name+' follows the owner’s practice/practicing preference');
 assert.ok(!/\b(?:behavior|behaviors|organize|organized|organizing|analyze|analyzed|analyzing|unauthorized|parameterized)\b/i.test(text),name+' uses Australian prose');
}
const app=fs.readFileSync(path.join(root,'dist/app.js'),'utf8');assert.ok(app.includes('Read, practice and revisit'));assert.ok(app.includes('Practice and explain')||fs.readFileSync(path.join(root,'dist/reader.js'),'utf8').includes('Practice and explain'));
assert.ok(fs.readFileSync(path.join(root,'EDITORIAL_STYLE.md'),'utf8').includes('practice/practicing throughout'));
console.log('Australian English source checks and the owner’s practice/practicing house-style exception passed.');
