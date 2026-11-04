import {test,expect} from '@playwright/test';
test('review stages retain chapter routes and distinguish topic review',async({page})=>{
 await page.goto('/#unit3-review');await expect(page.locator('.review-pathway')).toContainText('This chapter: Diagnose.');
 await page.locator('.review-pathway a[href="#unit3-consolidation"]').click();await expect(page.locator('main h1')).toHaveText('Unit 3 consolidation');await expect(page.locator('.review-pathway [aria-current="step"]')).toContainText('Repair and transfer');
 await page.locator('.review-pathway a[href="#unit3-exam"]').click();await expect(page.locator('.review-pathway')).toContainText('This chapter: Timed practice.');
 await page.setViewportSize({width:390,height:844});await expect(page.locator('.review-pathway')).toBeVisible();expect(await page.locator('.review-pathway').evaluate(e=>e.scrollWidth<=e.clientWidth)).toBe(true);
 await page.goto('/#network-review');await expect(page.locator('.review-pathway')).toContainText('not a whole-unit diagnostic');await expect(page.locator('.review-pathway')).toContainText('no separate whole-unit review');
 await page.goto('/#unit4-consolidation');await expect(page.locator('.review-pathway')).toContainText('Units 1–4');
});
