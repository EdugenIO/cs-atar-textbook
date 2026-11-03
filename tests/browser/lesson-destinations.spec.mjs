import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('legacy allocations and lesson selector use canonical focused pages',async({page})=>{
 for(const [id,path] of [['u1-l15','loops'],['u1-l11','selection']]){
  await page.goto('/lessons/?unit=1#'+id);
  await expect(page).toHaveURL(new RegExp('/lessons/'+path+'/$'));
  await expect(page.locator('main h1')).toHaveCount(1);
 }
 await page.goto('/lessons/?chapter=selection');
 const card=page.locator('#u1-l11');
 await expect(card.locator('ol')).toHaveCount(0);
 await card.getByRole('link',{name:/Start the focused lesson:/}).click();
 await expect(page).toHaveURL(/\/lessons\/selection\/$/);
 await page.goto('/lessons/#u1-l12');
 await expect(page.locator('#u1-l12')).toBeVisible();
 await expect(page).toHaveURL(/#u1-l12$/);
 await page.goto('/lessons/');
 await page.evaluate(()=>{location.hash='u1-l15';});
 await expect(page).toHaveURL(/\/lessons\/loops\/$/);
});
test('teacher plan opens the focused selection lesson without another selector',async({page})=>{
 await page.goto('/teachers/?view=week&unit=1&week=3');
 const card=page.locator('.lesson-plan').filter({has:page.getByRole('heading',{name:'Implement if, elif and else for a supplied decision',exact:true})});
 await expect(card.getByRole('link',{name:'Follow this lesson',exact:true})).toHaveAttribute('href','../lessons/selection/');
 await card.getByRole('link',{name:'Follow this lesson',exact:true}).click();
 await expect(page).toHaveURL(/\/lessons\/selection\/$/);
 await page.getByRole('link',{name:'Teaching allocation',exact:true}).click();
 await expect(page).toHaveURL(/teachers\/\?view=week&unit=1&week=3$/);
 await expect(page.locator('#planner-week-select')).toHaveValue('3');
});
test('focused selection practice, feedback, downloads and student printing',async({page})=>{
 await page.goto('/lessons/selection/');
 await expect(page.locator('details[open]')).toHaveCount(0);
 await page.getByRole('link',{name:'3 Practice',exact:true}).click();
 await expect(page.locator('#practice h2')).toBeInViewport();
 await page.getByRole('link',{name:'I have attempted it — compare my work',exact:true}).click();
 const disclosure=page.getByText('Reveal the explained order solution',{exact:true});
 await disclosure.focus();await page.keyboard.press('Enter');
 await expect(page.locator('#check details').first()).toHaveAttribute('open','');
 await expect(page.locator('#check')).toContainText('Empty basket');
 const download=page.waitForEvent('download');
 await page.getByRole('link',{name:'Download independent starter · Python',exact:true}).click();
 expect((await download).suggestedFilename()).toBe('starter.py');
 await page.emulateMedia({media:'print'});
 await expect(page.locator('#check .answer').first()).toBeHidden();
 await expect(page.locator('.teacher')).toBeHidden();
 await expect(page.locator('#practice')).toBeVisible();
 await page.emulateMedia({media:'screen'});
 await expect(page.locator('#check .answer').first()).toHaveAttribute('open','');
 await page.setViewportSize({width:375,height:812});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
 expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
});
