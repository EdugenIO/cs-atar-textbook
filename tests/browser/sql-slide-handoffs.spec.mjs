import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for(const week of [4,5])test('SQL slides and lesson route use one primary schema: week '+week,async({page})=>{
 const file=week===4?'sql-starter.sqlite':'database-project.sqlite';
 const prefix=week===4?'sql':'database-project';
 for(let lesson=1;lesson<=4;lesson++){
  const id=`u2-w0${week}-l0${lesson}`;
  await page.goto('/slides/?lesson='+id);
  await expect(page.getByText('Primary: '+file+' · ',{exact:false})).toBeVisible();
  await expect(page.getByRole('link',{name:'Primary workbook',exact:true})).toHaveAttribute('href','../'+prefix+'-workbook.md');
  await expect(page.getByRole('link',{name:'Primary answer key',exact:true})).toHaveAttribute('href','../'+prefix+'-answers.md');
 }
 await page.getByRole('link',{name:'Exact schema and alternative choices',exact:true}).click();
 await expect(page.locator('#sql-primary')).toContainText(file);
 await expect(page.locator('#sql-primary')).toContainText('do not substitute pathway changed data');
 await page.getByText('Exact table and field contract',{exact:true}).click();
 await expect(page.locator('#sql-primary')).toContainText('EquipmentDescription');
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(axe.violations.map(v=>v.id)).toEqual([]);
 await page.setViewportSize({width:390,height:844});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const route='u2-l'+((week-1)*4+4);
 await page.goto('/lessons/#'+route);
 await expect(page.locator('#'+route+' .sql-primary-handoff')).toContainText(file);
 await expect(page.locator('#'+route+' .sql-lesson-handoff')).toContainText('Teacher choice: alternative SQL practice');
});
