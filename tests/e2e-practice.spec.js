import { test, expect,request } from '@playwright/test';


test('login test',async ({page})=>{

   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   await page.locator('#userEmail').fill('jyothsna123@gmail.com');
   await page.locator('[type=password]').fill('Jyothsna@123');

   await page.locator('[name=login]').click();

   await expect(page).toHaveURL(/dashboard/);
   await page.waitForLoadState('networkidle');
   await page.locator('.card-body b').first().waitFor();
   const products=page.locator('.card-body');
   const search='iphone 13 pro';
   const count=await products.count();

   for(let i=0;i<count;i++){
    const elem=await products.nth(i).locator('b').textContent();
    console.log(elem);
    if(search===elem){
        // to add product to cart
        await products.nth(i).locator('text=Add To Cart').click();
        break;
    }
   }
  await page.locator('[routerlink*=cart]').click();
  await page.locator('div li').first().waitFor();

  const bool=page.locator('[h3:has-text="iphone 13 pro"]');
  expect(bool).toBeTruthy();

  await page.locator('button[type=button]').last().click();

  await page.locator('input[placeholder*=Country]').pressSequentially('indi');

  const dropdown=page.locator('.ta-results');

  await dropdown.waitFor();

  const dcount=await dropdown.locator('button').count();

    for(let i=0;i<dcount;i++){
         const text=await dropdown.locator('button').nth(i).textContent();
          if(text===' India'){
            await dropdown.locator('button').nth(i).click();
           // const coun=await dropdown.locator('button').nth(i).textContent();
          //  console.log(coun);
            break;
          }
    }

  await expect( page.locator('.user__name [type=text]').first()).toHaveText('jyothsna123@gmail.com');

  await page.locator('input[type=text]').nth(1).fill('567');

 await page.locator('input[type=text]').nth(2).fill('jyothsna');

 await page.locator('a[class*=submit]').click();

 
  //await page.pause();
   expect(page.locator('h1:has-text("Thankyou for the order.")')).toBeTruthy();
   
   const orderid=await page.locator('.em-spacer-1 .ng-star-inserted').nth(0).textContent();

    await page.locator('button[routerlink*=orders]').click();

    const orders=page.locator('tr[class*=inserted]');

    const cnt=orders.count();
  
    for(let i=0;i<cnt;i++){
      const order=await orders.locator('th').nth(i).textContent();
      if(orderid===order){
        await order.locator('button').nth(0).click();
        break;
    }
}
// expect(page.locator('.email-title')).toHaveText(' order summary ');

//      await page.pause();
});