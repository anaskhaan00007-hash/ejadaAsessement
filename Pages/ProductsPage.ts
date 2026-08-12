import { expect, Page } from '@playwright/test';
import pagelocators from '../Locators/pageLocators.json';

class ProductsPage {
  private page: Page;

  private product: string;
  private addToCart: string;
  private cart: string;

  constructor(page: Page) {
    this.page = page;

    this.product = pagelocators.product;
    this.addToCart = pagelocators.addToCart;
    this.cart = pagelocators.cart;
  }

  async verifyProductsPage() {

    await expect(
      this.page.locator(this.product)
    ).toBeVisible();

    console.log('Products page displayed');
  }

  async addProductToCart(){

    await this.page.locator(this.addToCart).click();

    console.log('✓ Product added to cart');
  }

  async openCart(){

    await this.page.locator(this.cart).click();

    console.log('Cart opened');
  }
}

export default ProductsPage;