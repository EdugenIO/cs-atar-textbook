(() => {
 const csv=document.getElementById('export-checks'),box=document.createElement('div');box.className='progress-transfer';
 const save=document.createElement('button');save.type='button';save.textContent='Save checklist backup (.json)';save.id='backup-checks';
 const label=document.createElement('label');label.textContent='Import checklist backup (.json)';label.htmlFor='import-checks';
 const input=document.createElement('input');input.id='import-checks';input.type='file';input.accept='.json,application/json';input.style.cssText='display:block;max-width:100%;margin-block:8px';
 const note=document.createElement('p');note.textContent='Backups contain checklist ticks only. Import merges ticks with this browser’s progress; it does not replace existing ticks or import quiz marks. Files stay on this device.';
 const status=document.createElement('p');status.id='transfer-status';status.setAttribute('role','status');
 box.append(save,label,input,note,status);csv.parentElement.append(box);
 save.addEventListener('click',()=>{const ids=new Set([...document.querySelectorAll('[data-check]:checked')].map(c=>c.dataset.check)),url=URL.createObjectURL(new Blob([RevisionCore.backup(ids)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='cs-atar-checklist-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 input.addEventListener('change',async()=>{const file=input.files[0];if(!file)return;try{if(file.size>256000)throw Error('Choose a JSON backup smaller than 256 KB.');const ids=RevisionCore.parseBackup(await file.text(),revisionData.checkIds);window.dispatchEvent(new CustomEvent('revision-progress-import',{detail:[...ids]}));status.textContent='Imported '+ids.size+' checklist ticks. Existing ticks were kept. These are self-checks, not verified results.';}catch(error){status.textContent=error.message;}finally{input.value='';}});
})();
