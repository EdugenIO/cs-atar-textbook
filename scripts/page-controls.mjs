import fs from 'node:fs';import path from 'node:path';
export function addPageControls(root){
 let count=0;
 function walk(folder){for(const entry of fs.readdirSync(folder,{withFileTypes:true})){const file=path.join(folder,entry.name);if(entry.isDirectory())walk(file);else if(entry.name.endsWith('.html')){const html=fs.readFileSync(file,'utf8');let next=html;for(const control of ['back-to-top','report-problem']){if(next.includes('data-page-control="'+control+'"'))continue;const src=path.relative(path.dirname(file),path.join(root,control+'.js')).split(path.sep).join('/');next=next.replace(/<\/body>/i,`<script data-page-control="${control}" src="${src}"></script></body>`);}if(next!==html){fs.writeFileSync(file,next);count++;}}}}
 walk(root);return count;
}
