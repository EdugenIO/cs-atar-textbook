import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('Attempt conditions and feedback boundary agree across lesson routes and decks',async({page})=>{
 for(const [route,deck,mode] of [['u1-l55','u1-w14-l03','School-issued theory task'],['u1-l61','u1-w16-l01','Timed formative practice: attempt'],['u1-l62','u1-w16-l02','Timed formative practice, then feedback']]){
  await page.goto('/lessons/#'+route);
  const card=page.locator('#'+route);
  await expect(card.locator('.attempt-mode')).toContainText(mode);
  await expect(card.getByText('Study the worked walkthrough:',{exact:false})).toHaveCount(0);
  await expect(card.getByRole('link',{name:'Open lesson slides'})).toHaveAttribute('href','../slides/?lesson='+deck);
  await page.goto('/slides/notes/'+deck+'.html');
  await expect(page.locator('.attempt-mode')).toContainText(mode);
 }
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 expect(axe.violations.map(v=>v.id)).toEqual([]);
 await page.setViewportSize({width:390,height:844});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.goto('/lessons/#u1-l62');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
