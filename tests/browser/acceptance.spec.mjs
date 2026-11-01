import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
const chapters=JSON.parse(fs.readFileSync('dist/resources/catalogue.json','utf8'));
const lessons=JSON.parse(fs.readFileSync('dist/lessons/routes.json','utf8'));
async function accessible(page){
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
 expect(result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))).toEqual([]);
}
for(const chapter of chapters)test('chapter '+chapter.id,async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/#'+chapter.id);
 await expect(page.locator('main h1')).toHaveCount(1);
 await expect(page.locator('.student-journey')).toHaveCount(1);
 await expect(page.locator('main')).toContainText('Practice');
 const destinations=lessons.flatMap(l=>[l.readHref,l.workedHref,...(l.also||[]).map(a=>a.href)]).filter(h=>h.split('#')[1]?.split('/')[0]===chapter.id).map(h=>h.split('/').at(-1));
 for(const id of new Set(destinations))await expect(page.locator('[id="'+id+'"]')).toHaveCount(1);
 if(info.project.name==='chromium')await accessible(page);
 expect(errors).toEqual([]);
});
test('lesson deep link, focused feedback and companion reading filter',async({page})=>{
 await page.goto('/lessons/#u2-l13');await expect(page.locator('#u2-l13')).toBeFocused();
 await page.locator('#u2-l13 summary').click();await expect(page.locator('#u2-l13 details')).toContainText('SELECT Name FROM Equipment ORDER BY EquipmentID');
 await page.evaluate(()=>{window.print=()=>window.dispatchEvent(new Event('beforeprint'));});
 await page.locator('#print').click();await page.emulateMedia({media:'print'});await expect(page.locator('#u2-l13 details p').first()).toBeHidden();
 await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));await page.emulateMedia({media:'screen'});await expect(page.locator('#u2-l13 details')).toHaveAttribute('open','');
 await page.locator('#print-answers').click();await page.emulateMedia({media:'print'});await expect(page.locator('#u2-l13 details p').first()).toBeVisible();
 await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));await page.emulateMedia({media:'screen'});
 await page.locator('#unit').selectOption('4');await page.reload();await expect(page.locator('#count')).toHaveText('64 of 256 lessons');await expect(page).not.toHaveURL(/#u2-l13/);
 await page.goto('/lessons/?chapter=software-responsibility');await expect(page.locator('#count')).toHaveText('1 of 256 lessons');
 await expect(page.locator('#u1-l33')).toBeVisible();
});
for(const unit of [1,2,3,4])test('self-contained offline reader '+unit,async({page,context},info)=>{
 await page.goto('/offline/unit-'+unit+'-reader.html');await context.setOffline(true);
 const journey=page.locator('.student-journey').first();await journey.locator('summary').click();const link=journey.locator('a[href^="#"]').first();const destination=await link.getAttribute('href');await link.click();
 await expect(page.locator('[id="'+destination.slice(1)+'"]')).toBeInViewport();
 await context.setOffline(false);if(info.project.name==='chromium')await accessible(page);
});
test('revision quiz unanswered feedback and checklist persistence',async({page})=>{
 await page.goto('/revision/');const check=page.locator('[data-check]').first();await check.check();await page.reload();await expect(page.locator('[data-check]').first()).toBeChecked();
 await page.locator('[data-view="quizzes"]').click();await page.locator('#start-quiz').click();await accessible(page);
 await page.locator('#quiz-form button[type="submit"]').click();await expect(page.locator('#quiz-status')).toContainText('unanswered');await accessible(page);
});
for(const route of ['/#home','/#teaching','/#assessments','/resources/','/activities/','/sql/','/revision/','/practice/','/teachers/','/offline/','/lessons/','/accessibility.html','/resource-status.html'])test('page '+route,async({page})=>{
 await page.goto(route);await expect(page.locator('main h1')).toHaveCount(1);await accessible(page);
});
test('lightweight home, deferred reading and page-specific report',async({page},info)=>{
 const scripts=[];page.on('response',r=>{if(new URL(r.url()).pathname.endsWith('.js'))scripts.push(r);});
 await page.goto('/#home');await expect(page.locator('.site-problem-report')).toBeVisible();
 expect(scripts.some(r=>r.url().includes('/chapters.js'))).toBe(false);const bytes=(await Promise.all(scripts.map(async r=>(await r.body()).length))).reduce((a,b)=>a+b,0);expect(bytes).toBeLessThan(30000);
 await info.attach('initial-home-javascript.json',{body:JSON.stringify({requests:scripts.length,bytes}),contentType:'application/json'});
 await page.locator('a[href="#start"]').first().click();await expect(page.locator('.student-journey')).toHaveCount(1);await expect(page.locator('main h1')).toContainText('Your first Python');
 const link=page.locator('.site-problem-report a');await link.focus();expect(new URL(await link.getAttribute('href')).searchParams.get('body')).toContain('#start');
 await page.locator('#search').fill('foreign key');await expect(page.locator('#results a').first()).toBeVisible();
});
test('ranked topic search excludes generic download labels',async({page})=>{
 await page.goto('/resources/?query=SQL');await expect(page.locator('.resource-card:not([hidden])').first().locator('h2')).toContainText('SQL');expect(await page.locator('.resource-card:not([hidden])').count()).toBeLessThan(20);
 await page.locator('#query').fill('subnetting');await expect(page.locator('.resource-card:not([hidden])')).toHaveCount(1);
});
test('checklist backup import merges and rejects unrelated files',async({page})=>{
 await page.goto('/revision/');await page.locator('[data-check]').first().check();const second=page.locator('[data-check]').nth(1),id=await second.getAttribute('data-check');
 const upload=value=>page.locator('#import-checks').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(value))});
 await upload({book:'cs-atar-textbook',kind:'revision-self-checks',version:1,checked:[id]});await expect(second).toBeChecked();await expect(page.locator('[data-check]').first()).toBeChecked();
 await upload({version:99,checked:['unknown']});await expect(page.locator('#transfer-status')).toContainText('does not match');await expect(second).toBeChecked();
 const download=page.waitForEvent('download');await page.locator('#backup-checks').click();expect((await download).suggestedFilename()).toBe('cs-atar-checklist-backup.json');
});
test('keyboard, chapter anchor, return to top and narrow-screen reflow',async({page})=>{
 await page.setViewportSize({width:375,height:812});await page.goto('/#start');
 await page.locator('.skip').focus();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();
 await expect(page).toHaveURL(/#start$/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 // Establish a deterministic scroll position: native End can keep animating after
 // the key is released, and WebKit uses a different document-end shortcut.
 await page.evaluate(()=>window.scrollTo({top:1500,behavior:'instant'}));await expect.poll(()=>page.evaluate(()=>Math.abs(scrollY-1500))).toBeLessThan(1);await expect(page.locator('#back-to-top')).toBeVisible();
 await page.locator('#back-to-top').focus();await page.keyboard.press('Enter');await expect(page.locator('main h1')).toBeFocused();
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBeLessThan(1);
 await page.locator('.student-journey summary').click();
 const read=page.locator('.student-journey a[href^="#start/"]').first();await read.click();
 const hash=await page.evaluate(()=>location.hash.split('/')[1]);await expect(page.locator('[id="'+hash+'"]').first()).toBeFocused();
});
test('resource filters, empty state and reset',async({page})=>{
 await page.goto('/resources/');await page.locator('#unit').selectOption('4');await expect(page.locator('#count')).toHaveText('10 of 50 chapters');
 await page.locator('#query').fill('no-such-topic-123');await expect(page.locator('#empty')).toBeVisible();
 await page.locator('#reset').click();await expect(page.locator('#count')).toHaveText('50 of 50 chapters');
});
test('example download and print preparation/restoration',async({page})=>{
 await page.goto('/#start');const pending=page.waitForEvent('download');await page.locator('#chapter-download').click();expect((await pending).suggestedFilename()).toBe('start_example.py');
 await page.evaluate(()=>{window.print=()=>{window.dispatchEvent(new Event('beforeprint'));};});
 await page.getByRole('button',{name:'Print student copy',exact:true}).click();await expect(page.locator('body')).toHaveAttribute('data-print-mode','student');
 await page.emulateMedia({media:'print'});await expect(page.locator('#back-to-top')).toBeHidden();
 await page.evaluate(()=>window.dispatchEvent(new Event('afterprint')));await expect(page.locator('body')).not.toHaveAttribute('data-print-mode');
});
