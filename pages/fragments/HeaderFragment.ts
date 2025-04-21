import { Page, Locator, expect } from '@playwright/test';

export class HeaderFragment {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly favoritesIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.getByTestId('nav-cart');
    this.favoritesIcon = page.getByTestId('nav-favorites');
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async assertCartCount(expectedCount: number) {
    await expect(this.cartIcon).toContainText(expectedCount.toString());
  }
}
