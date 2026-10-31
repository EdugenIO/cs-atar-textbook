import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
const chapters=JSON.parse(fs.readFileSync('dist/resources/catalogue.json','utf8'));
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
 if(info.project.name==='chromium')await accessible(page);
 expect(errors).toEqual([]);
});
for(const route of ['/#home','/#teaching','/#assessments','/resources/','/activities/','/sql/','/revision/','/practice/','/teachers/','/offline/','/lessons/'])test('page '+route,async({page})=>{
 await page.goto(route);await expect(page.locator('main h1')).toHaveCount(1);await accessible(page);
});
test('keyboard, chapter anchor, return to top and narrow-screen reflow',async({page})=>{
 await page.setViewportSize({width:375,height:812});await page.goto('/#start');
 await page.locator('.skip').focus();await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();
 await expect(page).toHaveURL(/#start$/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.locator('body').press('ControlOrMeta+End');await expect(page.locator('#back-to-top')).toBeVisible();
 await page.locator('#back-to-top').focus();await page.keyboard.press('Enter');await expect(page.locator('main h1')).toBeFocused();
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBe(0);
 await page.locator('.student-journey summary').click();
 const read=page.locator('.student-journey a').first();await read.click();
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
