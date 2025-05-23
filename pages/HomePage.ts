import { Page, Locator } from '@playwright/test';

export enum Category {
  HandTools = 'Hand Tools',
  PowerTools = 'Power Tools',
  Other = 'Other'
}

export class HomePage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByTestId('product-name');
    this.productPrice = page.getByTestId('unit-price'); 
  }

  async open() {
    await this.page.goto('/');
  }

  async clickProductByName(name: string) {
    await this.productName.filter({ hasText: name }).click();
  }

  async selectCategoryCheckbox(category: string) {
    const checkbox = this.page.getByLabel(category);
    await checkbox.click();
    await this.page.waitForTimeout(1000);
  }

  async getDisplayedProductNames(): Promise<string[]> {
    const elements = await this.productName.all();
    await Promise.all(elements.map(el => el.waitFor({ state: 'visible' })));
    const names = await Promise.all(elements.map(el => el.textContent()));
    return names.map(name => name?.trim() || '');
  }

  async getDisplayedProductPrices(): Promise<number[]> {
    const priceTexts = await this.productPrice.allTextContents();
    return priceTexts.map(text =>
      parseFloat(text.replace(/[^0-9.]/g, ''))
    );
  }
}
