import {test,expect} from '@playwright/test';import AxeBuilder from '@axe-core/playwright';
test('current game workshops are available and archive links remain separate',async({page})=>{
 await page.goto('/teachers/?view=week&unit=1&week=8');await expect(page.getByRole('link',{name:'Present slides',exact:true})).toHaveCount(4);
 await page.goto('/slides/?lesson=u1-w08-l01');await expect(page.locator('.legacy-project-notice')).toHaveCount(0);await expect(page.getByRole('link',{name:'Current project workbook'})).toHaveAttribute('href','../project-workbook.md');
 await page.locator('#all').click();const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(axe.violations.map(v=>v.id)).toEqual([]);
 await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.goto('/legacy-projects/');await expect(page.getByRole('link',{name:'u1-w08-l01: archived console PowerPoint'})).toHaveAttribute('href','slides/u1-w08-l01.pptx');
 await page.goto('/slides/notes/u1-w09-l01.html');await expect(page.getByRole('link',{name:'Current project workbook'})).toHaveAttribute('href','../../project-workbook.md');
});
