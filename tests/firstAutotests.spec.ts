import { test, expect } from '@playwright/test';


test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');

  await page.getByPlaceholder('Your email').fill('customer@practicesoftwaretesting.com');
  await page.getByPlaceholder('Your password').fill('welcome01');

  await page.click('.btnSubmit');

  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');

  const myAcc = page.getByTestId('page-title');
  await expect(myAcc).toContainText("My account");

  const userName = page.getByTestId('nav-menu');
  await expect(userName).toContainText('Jane Doe');

});

test('Verify user can view product details', async ({ page }) => {
  await page.goto('/');

  await page.getByText('Combination Pliers').click()
  await expect(page.url()).toContain('https://practicesoftwaretesting.com/product');

  const productName = page.getByTestId('product-name');
  await expect(productName).toContainText("Combination Pliers");

  const productPrice = page.getByTestId('unit-price');
  await expect(productPrice).toContainText("14.15");

  const addToCart = page.getByTestId('add-to-cart');
  await expect(addToCart).toBeVisible();

  const AddToFavorites = page.getByTestId('add-to-favorites');
  await expect(AddToFavorites).toBeVisible();

});

test('Verify user can add product to cart', async ({ page }) => {
  await page.goto('/');

  //Assert1
  await page.getByTestId('product-name').filter({ hasText: 'Slip Joint Pliers' }).click();
  await expect(page.url()).toContain('https://practicesoftwaretesting.com/product');

  const productName = page.getByTestId('product-name');
  await expect(productName).toContainText("Slip Joint Pliers");

  const productPrice = page.getByTestId('unit-price');
  await expect(productPrice).toContainText("9.17");



  //Assert2
  await page.getByTestId('add-to-cart').click()

  const alert = page.getByRole('alert', { name: 'Product added to shopping' });
  await expect(alert).toBeVisible();
  await expect(alert).toContainText("Product added to shopping cart");
  await expect(alert).toBeHidden({ timeout: 8000 });

  const cartIcon = page.getByTestId('nav-cart');
  await expect (cartIcon).toContainText('1');


  //Assert3
  await page.getByTestId('nav-cart').click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');

  const productQuantity = page.getByTestId('product-quantity');
  await expect(productQuantity).toHaveCount(1);
  

  const productTitle = page.getByTestId('product-title');
  await expect(productTitle).toContainText('Slip Joint Pliers');

  const proceedButton = page.getByTestId('proceed-1');
  await expect(proceedButton).toBeVisible();

});