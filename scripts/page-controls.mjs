import fs from 'node:fs';import path from 'node:path';
export function addPageControls(root){
 let count=0;
 function walk(folder){for(const entry of fs.readdirSync(folder,{withFileTypes:true})){const file=path.join(folder,entry.name);if(entry.isDirectory())walk(file);else if(entry.name.endsWith('.html')){const html=fs.readFileSync(file,'utf8');if(html.includes('data-page-control="back-to-top"'))continue;const src=path.relative(path.dirname(file),path.join(root,'back-to-top.js')).split(path.sep).join('/');const next=html.replace(/<\/body>/i,`<script data-page-control="back-to-top" src="${src}"></script></body>`);if(next!==html){fs.writeFileSync(file,next);count++;}}}}
 walk(root);return count;
}
