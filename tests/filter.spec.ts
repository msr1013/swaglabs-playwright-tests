import { test, expect } from '@playwright/test';

test.describe('Product Filtering', () => {
  test('Filter Products by Name (descending) and Price(Low to High)', async ({ page }) => {
    // Login first
    await page.goto('https://www.saucedemo.com/')
    await page.fill('#user-name', 'standard_user')
    await page.fill('#password', 'secret_sauce')
    await page.click('#login-button');

    //Filter by Name(descending)
    await page.selectOption('.product_sort_container', 'za');
    let productNames = await page.$$eval('.inventory_item_name', elements => elements.map(el => el.textContent));
    expect(productNames).toEqual(productNames.sort().reverse());

    //Filter by Price (Low to High)
    await page.selectOption('.product_sort_container', 'lohi');
    let productPrices = await page.$$eval('.inventory_item_price', elements => elements.map(el => parseFloat(el.textContent || ''.replace('$', ''))));

  })
})