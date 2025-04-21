import { Page, Locator } from '@playwright/test';

export class ProductsSortFragment {
  readonly page: Page;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.getByTestId('sort');
  }

  async selectSortOption(option: string) {
    await this.sortDropdown.selectOption({ label: option });
  }
}