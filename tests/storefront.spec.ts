import {test,expect} from '@playwright/test';
test('five products, variants, persistence, translated checkout and PDF',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.locator('.product-card')).toHaveCount(5);
 await expect(page.locator('html')).toHaveAttribute('lang','es');
 for(const card of await page.locator('.product-card').all()) await card.locator('.add-button').click();
 await page.locator('#variant-brownies').selectOption('32');await page.locator('.product-brownies .add-button').click();
 await page.locator('.cart-trigger').click();await expect(page.locator('.cart-item')).toHaveCount(6);await expect(page.locator('.total')).toContainText('90,70');
 await page.locator('.cart-item').first().getByRole('button',{name:'Aumentar cantidad'}).click();await expect(page.locator('.total')).toContainText('102,70');
 await page.locator('.cart-item').first().getByRole('button',{name:'Reducir cantidad'}).click();await expect(page.locator('.total')).toContainText('90,70');
 await page.getByRole('button',{name:'Cerrar',exact:true}).click();await page.reload();
 await page.locator('.cart-trigger').click();await expect(page.locator('.cart-item')).toHaveCount(6);await page.getByRole('button',{name:'Cerrar',exact:true}).click();
 await page.getByRole('button',{name:'English',exact:true}).click();await expect(page.locator('html')).toHaveAttribute('lang','en');
 await page.locator('.cart-trigger').click();await page.evaluate(()=>{(window as any).__opened='';window.open=(url)=>{(window as any).__opened=String(url);return null;};});
 await page.locator('.checkout').click();let url=new URL(await page.evaluate(()=>(window as any).__opened));expect(url.pathname).toBe('/34614034687');expect(url.searchParams.get('text')).toContain('MY ORDER');expect(url.searchParams.get('text')).toContain('90.70');await expect(page.locator('.cart-item')).toHaveCount(6);
 await page.getByRole('button',{name:'Close',exact:true}).click();await page.getByRole('button',{name:'עברית',exact:true}).click();await expect(page.locator('html')).toHaveAttribute('dir','rtl');
 await page.reload();await expect(page.locator('html')).toHaveAttribute('lang','he');await page.locator('.cart-trigger').click();await page.evaluate(()=>{window.open=(url)=>{(window as any).__opened=String(url);return null;};});await page.locator('.checkout').click();url=new URL(await page.evaluate(()=>(window as any).__opened));expect(url.searchParams.get('text')).toContain('ההזמנה שלי');
 while(await page.locator('.remove-item').count())await page.locator('.remove-item').first().click();await expect(page.locator('.checkout')).toBeDisabled();
 await page.getByRole('button',{name:'סגירה',exact:true}).click();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const pdf=await page.request.get('/yami-menu.pdf');expect(pdf.ok()).toBe(true);expect((await pdf.body()).subarray(0,4).toString()).toBe('%PDF');
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('.catalog a[download]').click()]);expect(download.suggestedFilename()).toBe('Yami-Bakery-Menu.pdf');expect(await download.failure()).toBe(null);
 for(const image of await page.locator('img').all())expect(await image.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);
 expect(errors).toEqual([]);
});
test('responsive navigation and visual layout',async({page},testInfo)=>{
 await page.goto('/');await page.evaluate(()=>document.fonts.ready);await page.emulateMedia({reducedMotion:'reduce'});for(const el of await page.locator('.reveal').all()){await el.scrollIntoViewIfNeeded();}await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`tmp/${testInfo.project.name}-home.png`,fullPage:true});
 if(testInfo.project.name==='mobile'){await page.locator('.mobile-toggle').click();await page.locator('.mobile-nav a[href="#products"]').click();await expect(page.locator('.mobile-nav')).toHaveCount(0);}else await page.locator('.desktop-nav a[href="#products"]').click();
 await expect(page).toHaveURL(/#products$/);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('Spanish and Hebrew layouts fit narrow phones and tablets',async({page})=>{
 await page.goto('/');await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [320,768,1024]){
  await page.setViewportSize({width,height:900});
  for(const name of ['Español','עברית']){
   await page.getByRole('button',{name,exact:true}).click();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   for(const card of await page.locator('.product-card').all()){
    const bounds=await card.boundingBox();expect(bounds!.x).toBeGreaterThanOrEqual(0);expect(bounds!.x+bounds!.width).toBeLessThanOrEqual(width);
   }
  }
 }
 await page.setViewportSize({width:390,height:844});await page.locator('.product-challah .add-button').click();await page.locator('.cart-trigger').click();
 await page.screenshot({path:'tmp/hebrew-cart.png'});await page.keyboard.press('Escape');await expect(page.locator('.cart-drawer')).toHaveAttribute('aria-hidden','true');await expect(page.locator('.cart-trigger')).toBeFocused();
});
