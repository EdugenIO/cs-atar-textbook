import {test,expect} from '@playwright/test';
test('SQL chapter to named task, schema, setup and matching answer',async({page})=>{
 await page.goto('/#sql-basics');await page.locator('.sql-chapter-handoff summary').click();await page.locator('.sql-chapter-handoff a[href="sql/#step-01"]').click();
 const step=page.locator('#step-01');await expect(step.locator('.sql-handoff')).toContainText('Borrower, Category, Equipment, Loan');await expect(step.locator('a[href="data/y11/base.sqlite"]').first()).toBeVisible();
 await expect(step.locator('a[href="data/y11/changed-setup.sql"]')).toBeVisible();await expect(page.locator('#step-01-independent details')).not.toHaveAttribute('open','');await page.locator('#step-01-independent summary').click();await expect(page.locator('#step-01-independent details')).toHaveAttribute('open','');
 await step.getByText('Print/resource alternative: Activity 02',{exact:true}).click();await expect(step.locator('.sql-handoff')).toContainText('Member(member_id, name)');await step.locator('a[href="../activities/databases-sql/#lesson-02"]').click();await expect(page.locator('#lesson-02')).toContainText('This activity uses the Member/Loan schema.');
 await page.goto('/lessons/#u2-l13');await expect(page.locator('#u2-l13 .sql-lesson-handoff')).toContainText('Step 01');
 await page.goto('/sql/#step-15');await expect(page.locator('#step-15 .sql-handoff')).toContainText('write your schema in the empty scratch file');
 await page.setViewportSize({width:390,height:844});expect(await page.locator('#step-15 .sql-handoff').evaluate(e=>e.scrollWidth<=e.clientWidth)).toBe(true);
});
