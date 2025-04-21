import { Page, Locator } from '@playwright/test';

export enum Category {
  HandTools = 'Hand Tools',
  PowerTools = 'Power Tools',
  Other = 'Other'
}

export class HomePage {
  readonly page: Page;
  readonly productName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByTestId('product-name');
  }

  async open() {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }

  async clickProductByName(name: string) {
    await this.productName.filter({ hasText: name }).click();
  }

  async selectCategoryCheckbox(category: string) {
   
    const checkbox = this.page.getByLabel(`Sander`);
    await checkbox.click();
    await this.page.waitForTimeout(1000);
  }

  async getDisplayedProductNames(): Promise<string[]> {
    return this.productName.allTextContents();
  }
}
