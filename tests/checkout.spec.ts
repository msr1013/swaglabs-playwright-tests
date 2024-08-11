import { test, expect } from '@playwright/test';

test.describe('Checkout Process', () => {
  test('Perform Checkout', async ({ page }) => {
    // login and add items to cart (reusing previous steps)
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');


    await page.click('text=Add to cart >> nth=0');
    await page.click('text=Add to cart >> nth=1');

    // Go to cart
    await page.click('.shopping_cart_link');

    //start checkout process
    await page.click('#checkout');

    //fill checkout information
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');

    //complete checkout
    await page.click('#finish');

    //verify successful checkout
    const confirmationMessage = await page.locator('.complete-header');
    await expect(confirmationMessage).toHaveText('Thank you for your order!')

  })


})