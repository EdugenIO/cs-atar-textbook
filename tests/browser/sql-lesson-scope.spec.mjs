import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('Year 11 SQL core and optional practice remain distinct',async({page})=>{
 await page.goto('/slides/?lesson=u2-w05-l04');
 await expect(page.getByRole('heading',{name:'Core SQL reports and optional extensions',exact:true})).toBeVisible();
 await page.locator('#all').click();
 await expect(page.getByRole('heading',{name:'Core: attempt, compare and retry',exact:true})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Optional extension: group by category',exact:true})).toBeVisible();
 await expect(page.getByText('Optional extension success is not needed for this check.',{exact:true})).toBeVisible();
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 expect(axe.violations.map(x=>x.id)).toEqual([]);
 await page.setViewportSize({width:390,height:844});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.getByRole('link',{name:'Teacher notes',exact:true}).click();
 await expect(page.locator('body')).toContainText('Core: workbook Q2a and Q3; optional extension: Q2b and Q4.');
 await page.goto('/teachers/?view=week&unit=2&week=5');
 await expect(page.getByRole('heading',{name:'Core SQL reports and optional extensions',exact:true})).toBeVisible();
});
