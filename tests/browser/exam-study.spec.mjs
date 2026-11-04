import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('one exam bank: study, filters, bookmarks and unchanged timed attempts',async({page})=>{
 await page.goto('/practice/#year11-pilot');await page.getByRole('button',{name:'Start practice',exact:true}).click();
 await page.locator('[data-answer="y11-1"]').fill('My original response');
 const key='cs-atar-practice-v1-year11-pilot';const before=await page.evaluate(k=>localStorage.getItem(k),key);
 await page.goto('/revision/#exam-y11-1');await expect(page).toHaveURL(/practice\/\?mode=study#study-y11-1$/);
 await expect(page.getByRole('heading',{name:'Study explained examples',exact:true})).toBeVisible();
 await expect(page.locator('.study-card')).toHaveCount(60);
 const first=page.locator('#study-y11-1');await expect(first.locator('details')).not.toHaveAttribute('open','');await first.locator('summary').click();await expect(first.locator('details')).toHaveAttribute('open','');
 expect(await page.evaluate(k=>localStorage.getItem(k),key)).toBe(before);
 await page.locator('#study-unit').selectOption('4');await page.locator('#study-type').selectOption('Extended response');
 const visible=page.locator('.study-card:visible');expect(await visible.count()).toBeGreaterThan(0);for(const c of await visible.all())await expect(c).toHaveAttribute('data-unit','4');
 await page.locator('#study-query').fill('zz-no-match');await expect(page.locator('#study-count')).toContainText('No matching questions');await page.getByRole('button',{name:'Clear filters'}).click();await expect(page.locator('.study-card:visible')).toHaveCount(60);
 // Print only questions or all guides, then restore the student's disclosure choices.
 await page.evaluate(()=>{window.print=()=>{window.printOpenCount=document.querySelectorAll('.study-card details[open]').length;};});
 await page.getByRole('button',{name:'Print questions',exact:true}).click();expect(await page.evaluate(()=>window.printOpenCount)).toBe(0);await expect(first.locator('details')).toHaveAttribute('open','');
 await page.getByRole('button',{name:'Print with explained answers'}).click();expect(await page.evaluate(()=>window.printOpenCount)).toBe(60);await expect(page.locator('.study-card details[open]')).toHaveCount(1);
 expect(await page.evaluate(k=>localStorage.getItem(k),key)).toBe(before);
 await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(axe.violations.map(v=>v.id)).toEqual([]);
 await page.goto('/practice/#year11-pilot');await expect(page.locator('[data-answer="y11-1"]')).toHaveValue('My original response');await expect(page.locator('.mark-guide')).toHaveCount(0);
 expect(JSON.parse(await page.evaluate(k=>localStorage.getItem(k),key)).deadline).toBe(JSON.parse(before).deadline);
 await page.getByRole('button',{name:'Finish and self-mark',exact:true}).first().click();await page.getByRole('button',{name:'Yes, reveal marking guides'}).click();await page.locator('[data-criterion="y11-1"]').first().check();await page.locator('[data-reviewed="y11-1"]').check();await page.locator('[data-correction="y11-1"]').fill('My correction');
 const marked=await page.evaluate(k=>localStorage.getItem(k),key);await page.goto('/practice/?mode=study');expect(await page.evaluate(k=>localStorage.getItem(k),key)).toBe(marked);await page.goto('/practice/#year11-pilot');await expect(page.locator('[data-correction="y11-1"]')).toHaveValue('My correction');await expect(page.locator('[data-answer="y11-1"]')).toHaveAttribute('readonly','');
});
