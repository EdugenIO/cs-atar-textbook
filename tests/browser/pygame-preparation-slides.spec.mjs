import {test,expect} from '@playwright/test';import AxeBuilder from '@axe-core/playwright';
const lessons=[['u1-w04-l02','y11-1'],['u1-w05-l02','y11-2'],['u1-w06-l02','y11-3'],['u1-w07-l03','y11-4']];
for(const [id,anchor] of lessons)test('Pygame preparation slides '+id,async({page})=>{
 await page.goto('/slides/?lesson='+id);await expect(page.locator('.slide')).toHaveCount(8);
 const lab=page.getByRole('link',{name:'Matching Pygame lab',exact:true});await expect(lab).toHaveAttribute('href','../pygame/index.html#'+anchor);
 await page.locator('#next').click();await expect(page.locator('#status')).toContainText('Slide 2 of 8');
 await page.locator('#all').click();await expect(page.locator('.slide:visible')).toHaveCount(8);
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations.map(v=>v.id)).toEqual([]);
 await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.getByRole('link',{name:'Teacher notes',exact:true}).click();await expect(page.getByRole('link',{name:'Open the matching Pygame lab'})).toHaveAttribute('href','../../pygame/index.html#'+anchor);await expect(page.locator('body')).toContainText('faded_practice.py');
 await page.getByRole('link',{name:'Open the matching Pygame lab'}).click();await expect(page.locator('#'+anchor)).toContainText('Present this preparation lesson');
});
