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
 await expect(page.locator('.course-chapter[aria-current="page"]')).toHaveAttribute('data-chapter',chapter.id);
 await expect(page.locator('.course-unit[data-unit="'+chapter.unit+'"]')).toHaveAttribute('open','');
 await expect(page.locator('.chapter-route-controls')).toHaveCount(1);
 await page.locator('#this-chapter > summary').click();
 for(const href of await page.locator('#chapter-shortcuts a[href^="#"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')))){const id=decodeURIComponent(href.split('/')[1]);await expect(page.locator('[id="'+id+'"]')).toHaveCount(1);}
 await expect(page.locator('main')).toContainText('Practice');
 const destinations=lessons.flatMap(l=>[l.readHref,l.workedHref,...(l.also||[]).map(a=>a.href)]).filter(h=>h.split('#')[1]?.split('/')[0]===chapter.id).map(h=>h.split('/').at(-1));
 for(const id of new Set(destinations))await expect(page.locator('[id="'+id+'"]')).toHaveCount(1);
 if(info.project.name==='chromium')await accessible(page);
 expect(errors).toEqual([]);
});
test('course tree, chapter boundaries and teacher separation',async({page})=>{
 await page.goto('/#exam-preparation');await expect(page.locator('.course-chapter[aria-current="page"]')).toHaveAttribute('data-chapter','exam-preparation');
 const next=page.locator('.chapter-navigation-top a[href="#database-foundations"]');await expect(next).toBeVisible();await next.click();await expect(page.locator('.course-chapter[aria-current="page"]')).toHaveAttribute('data-chapter','database-foundations');
 await expect(page.locator('.chapter-nav a[href="#exam-preparation"]')).toBeVisible();await expect(page.locator('.teacher-tools')).not.toHaveAttribute('open','');
 await page.locator('.teacher-tools > summary').click();await page.locator('.teacher-tools a[href="#assessments"]').click();await expect(page.locator('.teacher-tools a[aria-current="page"]')).toHaveAttribute('href','#assessments');
});
test('mobile course navigation, destination focus and Escape',async({page})=>{
 await page.setViewportSize({width:375,height:812});await page.goto('/#loops');await expect(page.locator('.chapter-route-controls')).toBeVisible();
 await expect(page.locator('.shelf-menu')).not.toHaveAttribute('open','');await expect(page.locator('#course-mobile-location')).toContainText('Unit 1');
 await page.locator('.shelf-menu > summary').click();await page.locator('.course-chapter[data-chapter="functions"]').click();
 await expect(page.locator('.shelf-menu')).not.toHaveAttribute('open','');await expect(page.locator('main h1')).toBeFocused();await expect(page.locator('.course-chapter[aria-current="page"]')).toHaveAttribute('data-chapter','functions');
 await page.locator('.shelf-menu > summary').click();await page.locator('.course-sidebar-scroll').focus();await page.keyboard.press('Escape');await expect(page.locator('.shelf-menu')).not.toHaveAttribute('open','');await expect(page.locator('.shelf-menu > summary')).toBeFocused();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await accessible(page);
});
test('desktop sidebar stays available and feedback opens its target',async({page})=>{
 await page.goto('/#functions');await page.evaluate(()=>window.scrollTo({top:2500,behavior:'instant'}));const box=await page.locator('.course-sidebar').boundingBox();expect(box.y).toBeGreaterThanOrEqual(0);expect(box.y).toBeLessThan(40);expect(box.height).toBeLessThanOrEqual(page.viewportSize().height);
 await page.locator('#this-chapter > summary').click();await page.locator('#chapter-shortcuts').getByRole('link',{name:'Feedback',exact:true}).click();await expect(page.locator('#chapter-feedback-guide')).toHaveAttribute('open','');await expect(page.locator('#chapter-feedback-guide')).toBeFocused();
 await page.locator('.course-primary a[href="#home"]').click();await expect.poll(()=>page.locator('.course-sidebar-scroll').evaluate(e=>e.scrollTop)).toBe(0);
});
test('chapter shortcuts preserve an interactive attempt',async({page})=>{
 await page.goto('/#selection');await page.locator('#total').fill('35');await page.locator('#this-chapter > summary').click();await page.locator('#chapter-shortcuts').getByRole('link',{name:'Reading',exact:true}).click();await expect(page.locator('#total')).toHaveValue('35');
 await page.goto('/#functions');await page.locator('#chapter-quiz button').first().click();const feedback=await page.locator('#chapter-feedback').textContent();expect(feedback.length).toBeGreaterThan(0);if(await page.locator('#this-chapter').getAttribute('open')===null)await page.locator('#this-chapter > summary').click();await page.locator('#chapter-shortcuts').getByRole('link',{name:'Worked example',exact:true}).click();await expect(page.locator('#chapter-feedback')).toHaveText(feedback);
});
test('lesson deep link, focused feedback and companion reading filter',async({page})=>{
 await page.goto('/lessons/#u2-l13');await expect(page.locator('#u2-l13')).toBeFocused();
 await page.locator('#u2-l13 .print-answer summary').click();await expect(page.locator('#u2-l13 details')).toContainText('SELECT Name FROM Equipment ORDER BY EquipmentID');
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
 await page.goto(route);if(route==='/#teaching')await expect(page).toHaveURL(/teachers\/\?view=week/);await expect(page.locator('main h1')).toHaveCount(1);await accessible(page);
});
test('lightweight home, deferred reading and page-specific report',async({page},info)=>{
 const scripts=[];page.on('response',r=>{if(new URL(r.url()).pathname.endsWith('.js'))scripts.push(r);});
 await page.goto('/#home');await expect(page.locator('.site-problem-report')).toBeVisible();
 expect(scripts.some(r=>r.url().includes('/chapters.js'))).toBe(false);const bytes=(await Promise.all(scripts.map(async r=>(await r.body()).length))).reduce((a,b)=>a+b,0);expect(bytes).toBeLessThan(30000);
 console.log('Initial home JavaScript: '+bytes+' bytes in '+scripts.length+' requests');
 await info.attach('initial-home-javascript.json',{body:JSON.stringify({requests:scripts.length,bytes}),contentType:'application/json'});
 await page.locator('.home-unit[href="#start"]').click();await expect(page.locator('.student-journey')).toHaveCount(1);await expect(page.locator('main h1')).toContainText('Your first Python');
 await expect(page.locator('main h1')).toBeFocused();
 const link=page.locator('.site-problem-report a');await link.focus();expect(new URL(await link.getAttribute('href')).searchParams.get('body')).toContain('#start');
 await page.locator('#search').fill('foreign key');await expect(page.locator('#results a').first()).toBeVisible();
});
test('interrupted textbook download offers recovery',async({page})=>{
 await page.route('**/chapters.js*',route=>route.abort());await page.goto('/#start');await expect(page.getByRole('alert')).toContainText('could not finish loading');await expect(page.getByRole('alert').getByRole('link',{name:'Use offline downloads'})).toBeVisible();await expect(page.getByRole('button',{name:'Reload textbook'})).toBeVisible();
});
test('issue draft retains the selected slide deck without search text',async({page})=>{
 await page.goto('/slides/?lesson=u1-w01-l01&query=PRIVATE');const report=page.locator('.site-problem-report a');await report.focus();const body=new URL(await report.getAttribute('href')).searchParams.get('body');expect(body).toContain('lesson=u1-w01-l01');expect(body).not.toContain('PRIVATE');
});
test('ranked topic search excludes generic download labels',async({page})=>{
 await page.goto('/resources/?query=SQL');await expect(page.locator('.resource-card:not([hidden])').first().locator('h2')).toContainText('SQL');expect(await page.locator('.resource-card:not([hidden])').count()).toBeLessThan(20);
 await page.locator('#query').fill('subnetting');await expect(page.locator('.resource-card:not([hidden])')).toHaveCount(1);
 await page.locator('#query').fill('sql-worked-queries.sql');expect(await page.locator('.resource-card:not([hidden])').count()).toBeGreaterThan(0);
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
