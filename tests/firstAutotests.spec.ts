import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');

  await page.getByPlaceholder('Your email').fill('customer@practicesoftwaretesting.com');
  await page.getByPlaceholder('Your password').fill('welcome01');

  await page.click('.btnSubmit');

  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');

  const MyAcc = page.locator('[data-test="page-title"]');
  await expect(MyAcc).toContainText("My account");

  const userName = page.locator('[data-test="nav-menu"]');
  await expect(userName).toContainText('Jane Doe');

});

test('Verify user can view product details', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');

  await page.getByText('Combination Pliers').click()
  await expect(page.url()).toContain('https://practicesoftwaretesting.com/product');

  const ProductName = page.locator('[data-test="product-name"]');
  await expect(ProductName).toContainText("Combination Pliers");

  const ProductPrice = page.locator('[data-test="unit-price"]');
  await expect(ProductPrice).toContainText("14.15");

  const AddToCart = page.locator('[data-test="add-to-cart"]');
  await expect(AddToCart).toBeVisible();

  const AddToFavorites = page.locator('[data-test="add-to-favorites"]');
  await expect(AddToFavorites).toBeVisible();

});

test('Verify user can add product to cart', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');

  //Assert1
  await page.getByText('Slip Joint Pliers').click()
  await expect(page.url()).toContain('https://practicesoftwaretesting.com/product');

  const ProductName = page.locator('[data-test="product-name"]');
  await expect(ProductName).toContainText("Slip Joint Pliers");

  const ProductPrice = page.locator('[data-test="unit-price"]');
  await expect(ProductPrice).toContainText("9.17");



  //Assert2
  await page.locator('[data-test="add-to-cart"]').click()

  const alert = page.getByRole('alert', { name: 'Product added to shopping' });
  await expect(alert).toBeVisible();
  await expect(alert).toContainText("Product added to shopping cart");
  await expect(alert).toBeHidden({ timeout: 8000 });

  const CartIcon = page.locator('[data-test="nav-cart"]');
  await expect (CartIcon).toContainText('1');


  //Assert3
  await page.locator('[data-test="nav-cart"]').click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');

  const ProductQuantity = page.locator('[data-test="product-quantity"]');
  await expect(ProductQuantity).toHaveCount(1);
  

  const ProductTitle = page.locator('.col-md-4');
  await expect(ProductTitle).toContainText('Slip Joint Pliers');

  const ProceedButton = page.locator('[data-test="proceed-1"]');
  await expect(ProceedButton).toBeVisible();

});