import { test, expect } from '@playwright/test';
import { HomePage, Category } from '../pages/HomePage';
import { ProductsSortFragment } from '../pages/fragments/ProductsSortFragment';

// Test 1 & 2: Verify user can perform sorting by name (asc & desc)
test.describe('Product Sorting', () => {
  const sortOptions = [
    { label: 'Name (A - Z)', ascending: true },
    { label: 'Name (Z - A)', ascending: false }
  ];

  for (const option of sortOptions) {
    test(`should sort products by name: ${option.label}`, async ({ page }) => {
      const homePage = new HomePage(page);
      const sortFragment = new ProductsSortFragment(page);

      await homePage.open();
      await sortFragment.selectSortOption(option.label);

  
      const productNameLocators = await page.locator('[data-testid="product-name"]').all();
      await Promise.all(productNameLocators.map(el => el.waitFor({ state: 'visible' })));

      const productNames = await Promise.all(productNameLocators.map(el => el.textContent()));
      const cleanedNames = productNames.map(name => name?.trim() || '');

      const sortedNames = [...cleanedNames].sort((a, b) =>
        option.ascending ? a.localeCompare(b) : b.localeCompare(a)
      );

      expect(cleanedNames).toEqual(sortedNames);
    });
  }
});

// Test 3 & 4: Verify user can perform sorting by price (asc & desc)
test.describe('Sorting by Price', () => {
  const sortingOptions = [
    { label: 'Price (Low - High)', ascending: true },
    { label: 'Price (High - Low)', ascending: false },
  ];

  for (const { label, ascending } of sortingOptions) {
    test(`should sort products by price: ${label}`, async ({ page }) => {
      const homePage = new HomePage(page);
      const sortFragment = new ProductsSortFragment(page);

      await homePage.open();
      await sortFragment.selectSortOption(label);

      const prices = await page.locator('[data-testid="unit-price"]').allTextContents();
      const priceNumbers = prices.map(priceText =>
        parseFloat(priceText.replace(/[^0-9.]/g, ''))
      );

      const sortedPrices = [...priceNumbers].sort((a, b) =>
        ascending ? a - b : b - a
      );

      expect(priceNumbers).toEqual(sortedPrices);
    });
  }
});

// Test 5: Verify user can filter products by category
test('Verify user can filter products by category', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();

  await homePage.selectCategoryCheckbox('Sander'); 

  const productNames = await homePage.getDisplayedProductNames();
  console.log(productNames); 

  for (const name of productNames) {
    expect(name).toContain('Sander');
  }
});
