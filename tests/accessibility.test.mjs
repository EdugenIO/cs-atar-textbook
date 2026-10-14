import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const luminance = hex => {
  const [r,g,b] = hex.match(/../g).map(x => parseInt(x,16)/255)
    .map(x => x <= .04045 ? x/12.92 : ((x+.055)/1.055)**2.4);
  return .2126*r+.7152*g+.0722*b;
};
const contrast = (a,b) => (Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);
const css = fs.readFileSync(new URL('../dist/style.css',import.meta.url),'utf8');
const focus = [...css.matchAll(/outline-color:#([\da-f]{6})/g)].at(-1)[1];
const border = css.match(/input,textarea,\.button.secondary\{border-color:#([\da-f]{6})/)[1];
for (const background of ['ffffff','fcfbf7','edf3ed']) {
  assert.ok(contrast(focus,background)>=3,'Keyboard focus contrast');
  assert.ok(contrast(border,background)>=3,'Input boundary contrast');
}
assert.ok(contrast('63736a','fcfbf7')>=4.5,'Muted reading text');

const headers = [{tagName:'TH'},{tagName:'TH'}];
headers.forEach(h=>h.setAttribute=(key,value)=>{h[key]=value;});
const headerRow = {cells:headers};
const dataRow = {cells:[{tagName:'TD'}]};
let promoted = 0;
const makeTable = row => ({
  rows:[row], parentElement:{classList:{contains:()=>true}},
  createTHead(){ promoted++; return this.tHead={append:r=>assert.equal(r,row)}; },
  querySelectorAll(){return this.tHead ? row.cells.filter(c=>!c.scope) : [];}
});
const tables = [makeTable(headerRow),makeTable(dataRow)];
const main = {querySelectorAll(selector){return selector==='table'?tables:[];}};
let routeHandler;
vm.runInNewContext(fs.readFileSync(new URL('../dist/content-overflow.js',import.meta.url),'utf8'),{
  document:{getElementById:()=>main}, window:{addEventListener:(name,handler)=>{routeHandler=handler;}}
});
assert.equal(promoted,1,'Promote only all-header rows');
assert.ok(headers.every(h=>h.scope==='col'));
routeHandler();
assert.equal(promoted,1,'Repeated setup retains a single header');
console.log('Contrast and conservative table-header semantics passed.');
