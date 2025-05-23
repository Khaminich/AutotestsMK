import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { HomePage } from '../pages/HomePage';

test('Verify login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.getByTestId('page-title')).toContainText("My account");
});

test('Verify user can view product details', async ({ page }) => {
  const productPage = new ProductPage(page);

  await page.goto('/');
  await productPage.openProductByName('Combination Pliers');
  await expect(page.url()).toContain('/product');

  await productPage.assertProductDetails('Combination Pliers', '14.15');
  await expect(productPage.addToCart).toBeVisible();
  await expect(productPage.addToFavorites).toBeVisible();
});



test('Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.open();
  await homePage.clickProductByName('Slip Joint Pliers');

  // Assert1
  await expect(page.url()).toContain('https://practicesoftwaretesting.com/product');
  await productPage.assertProductDetails('Slip Joint Pliers', '9.17');

  // Assert2
  await productPage.addToCartProduct();
  await productPage.assertProductAddedAlert();

  const cartIcon = page.getByTestId('nav-cart');
  await expect(cartIcon).toContainText('1');

  // Assert3
  await cartIcon.click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');

  const productQuantity = page.getByTestId('product-quantity');
  await expect(productQuantity).toHaveCount(1);

  const productTitle = page.getByTestId('product-title');
  await expect(productTitle).toContainText('Slip Joint Pliers');

  const proceedButton = page.getByTestId('proceed-1');
  await expect(proceedButton).toBeVisible();
})


