import { expect, Page } from '@playwright/test';
import pagelocators from '../Locators/pageLocators.json';

class CartPage {
  private page: Page;

  private cartItem: string;
  private checkout: string;

  constructor(page: Page) {
    this.page = page;

    this.cartItem = pagelocators.cartItem;
    this.checkout = pagelocators.checkout;
  }

  async verifyProductInCart(): Promise<void> {

    await expect(
      this.page.locator(this.cartItem)
    ).toHaveCount(1);

    console.log('✓ Product verified in cart');
  }

  async proceedToCheckout(): Promise<void> {

    await this.page.locator(this.checkout).click();

    console.log('✓ Proceeded to checkout');
  }
}

export default CartPage;