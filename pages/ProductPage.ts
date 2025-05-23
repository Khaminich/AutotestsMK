import { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly addToCart: Locator;
  readonly addToFavorites: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByTestId('product-name');
    this.productPrice = page.getByTestId('unit-price');
    this.addToCart = page.getByTestId('add-to-cart');
    this.addToFavorites = page.getByTestId('add-to-favorites');
  }

  async openProductByName(name: string) {
    await this.page.getByTestId('product-name').filter({ hasText: name }).click();
  }

  async assertProductDetails(expectedName: string, expectedPrice: string) {
    await expect(this.productName).toContainText(expectedName);
    await expect(this.productPrice).toContainText(expectedPrice);
  }

async addToCartProduct() {
    await this.addToCart.click();
  }

  async assertProductAddedAlert() {
    await expect(this.page.getByRole('alert')).toHaveText('Product added to shopping cart.');
  }
}