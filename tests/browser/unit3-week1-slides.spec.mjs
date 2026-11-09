import {test,expect} from '@playwright/test';import AxeBuilder from '@axe-core/playwright';
for(let n=1;n<=4;n++)test('Year 12 Week 1 lesson '+n+' has editable and practical resources',async({page})=>{
 const id='u3-w01-l0'+n;
 await page.goto('/slides/?lesson='+id);await expect(page.locator('.slide')).toHaveCount(8);
 await expect(page.getByRole('link',{name:'Download editable PowerPoint',exact:true})).toHaveAttribute('href',id+'.pptx');
 await expect(page.getByRole('link',{name:'Week 1 student workbook',exact:true})).toHaveAttribute('href','../slides/practice/u3-week1/student-workbook.md');
 await expect(page.getByRole('link',{name:'Download Unit 3 Week 1 PowerPoints and resources',exact:true})).toHaveAttribute('href','unit3-week1-lesson-slides.zip');
 await page.locator('#all').click();await expect(page.locator('.slide:visible')).toHaveCount(8);
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(axe.violations.map(v=>v.id)).toEqual([]);
 await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.getByRole('link',{name:'Teacher notes',exact:true}).click();await expect(page.locator('.practice-companion')).toContainText('preserve each unaided response');
 await expect(page.getByRole('link',{name:'Student workbook',exact:true})).toHaveAttribute('href','../../slides/practice/u3-week1/student-workbook.md');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.goto('/lessons/#u3-l'+n);await expect(page.locator('#u3-l'+n+' .practice-companion')).toContainText('Preserve the unaided response');
 if(n===2){await page.goto('/pygame/#y12-1');await expect(page.locator('#y12-1').getByRole('link',{name:'Present this preparation lesson'})).toHaveAttribute('href','../slides/?lesson='+id);}
});
