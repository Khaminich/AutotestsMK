import { Page, Locator } from '@playwright/test';

export class ProductsFiltersFragment {
    readonly page: Page;
    readonly priceFilter: Locator;
    readonly categoryFilter: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.priceFilter = page.getByTestId('filter-price');
      this.categoryFilter = page.getByTestId('filter-category');
    }
  
    async filterByCategory(name: string) {
      await this.categoryFilter.getByText(name).click();
    }
  
    async setPriceRange(min: number, max: number) {
      await this.priceFilter.getByLabel('Min').fill(min.toString());
      await this.priceFilter.getByLabel('Max').fill(max.toString());
      await this.priceFilter.getByRole('button', { name: 'Apply' }).click();
    }
  }
  