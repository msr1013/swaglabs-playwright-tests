import { test, expect } from '@playwright/test'

test.describe('Shopping Cart Funtionality', () => {
  test('Add items to the Cart', async ({ page }) => {
    //login first
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    //add two items to the cart
    await page.click('text=Add to cart >> nth=0');
    await page.click('text=Add to cart >> nth=1');

    //verify items in the cart
    const cartBadge = await page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');

    // go to cart and verify items
    await page.click('.shopping_cart_link');
    const cartItems = await page.$$('.cart_item');
    expect(cartItems).toHaveLength(2)

  });
});